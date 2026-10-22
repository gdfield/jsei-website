#!/usr/bin/env node
// Sync approved trainee profiles from the intake Google Sheet into the site.
//
//   Reads:  the Sheet linked to the trainee Google Form (approved rows only)
//           and each approved person's headshot from Google Drive
//   Writes: app/data/trainees.json, app/data/trainees-meta.json,
//           public/images/trainees/<slug>-<hash>.jpg (600x600, metadata stripped)
//
// Environment:
//   GOOGLE_SERVICE_ACCOUNT_JSON  service-account key (the JSON text itself)
//   TRAINEE_SHEET_ID             id from the Sheet URL (/spreadsheets/d/<id>/edit)
//   TRAINEE_SHEET_RANGE          optional, default "Published" (the tab of
//                                approved rows maintained by the form's script)
//
// Options:
//   --fixture <file.json>  read Sheet values from a local JSON file instead of
//                          Google; for testing. Implies --dry-run unless --write
//                          is also given (photos are never downloaded).
//   --write                with --fixture: actually write the data files
//   --dry-run              report what would change without writing anything
//   --allow-shrink         permit the sync to remove more than half of the
//                          published profiles at once (or all of them); also
//                          ALLOW_SHRINK=true in the environment
//
// Files are only rewritten when their content changes, so a nightly run with no
// new approvals makes no commit and triggers no deploy.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRecords, photoHash } from './trainees/transform.mjs';
import { labByFormLabel } from '../app/data/labs.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(root, 'app/data/trainees.json');
const REGISTRY = join(root, 'scripts/trainees/slug-registry.json');
const META = join(root, 'app/data/trainees-meta.json');
const PHOTO_DIR = join(root, 'public/images/trainees');
const PHOTO_URL = '/images/trainees';

const args = process.argv.slice(2);
const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : fallback);
const fixture = args.includes('--fixture') ? args[args.indexOf('--fixture') + 1] : null;
const dryRun = args.includes('--dry-run') || (fixture && !args.includes('--write'));
const allowShrink = args.includes('--allow-shrink') || process.env.ALLOW_SHRINK === 'true';

async function googleClient() {
  const { GoogleAuth } = await import('google-auth-library');
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set');
  const auth = new GoogleAuth({
    credentials: JSON.parse(raw),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
    ],
  });
  return auth.getClient();
}

async function readSheet(client) {
  const id = process.env.TRAINEE_SHEET_ID;
  if (!id) throw new Error('TRAINEE_SHEET_ID is not set');
  const range = encodeURIComponent(process.env.TRAINEE_SHEET_RANGE || 'Published');
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}` +
    '?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER';
  const res = await client.request({ url });
  return res.data.values ?? [];
}

async function downloadPhoto(client, fileId) {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&supportsAllDrives=true`;
  const res = await client.request({ url, responseType: 'arraybuffer' });
  return Buffer.from(res.data);
}

async function toHeadshot(buffer) {
  const { default: sharp } = await import('sharp');
  return sharp(buffer)
    .rotate() // honor camera orientation, then drop EXIF (sharp strips metadata by default)
    .resize(600, 600, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

const today = () => new Date().toISOString().slice(0, 10);
const isActive = (t, d = today()) => !(t.startDate && t.startDate > d) && !(t.endDate && t.endDate < d);

async function main() {
  const client = fixture ? null : await googleClient();
  const values = fixture ? JSON.parse(readFileSync(fixture, 'utf8')) : await readSheet(client);
  const registry = readJson(REGISTRY, {});
  const { records, warnings, slugRegistry } = buildRecords(values, labByFormLabel, registry);
  const previous = readJson(DATA, { generatedAt: null, trainees: [] });
  const prevBySlug = Object.fromEntries(previous.trainees.map((t) => [t.slug, t]));

  // Guard against an emptied or broken Published tab wiping the site.
  const before = previous.trainees.length;
  if (!allowShrink && before > 0 && (records.length === 0 || records.length < before / 2)) {
    throw new Error(
      `Refusing to drop from ${before} to ${records.length} profiles. If this is intended, ` +
        're-run with --allow-shrink (in GitHub: Run workflow with "allow_shrink" ticked).'
    );
  }

  if (!dryRun) mkdirSync(PHOTO_DIR, { recursive: true });
  const keepPhotos = new Set();
  for (const r of records) {
    const fileId = r.photoFileId;
    delete r.photoFileId; // Drive ids and account keys stay out of the public data
    delete r.accountKey;
    r.photo = null;
    if (fixture) continue;
    if (!fileId) {
      warnings.push(`${r.name}: no headshot uploaded`);
      continue;
    }
    const file = `${r.slug}-${photoHash(fileId)}.jpg`;
    keepPhotos.add(file);
    r.photo = `${PHOTO_URL}/${file}`;
    if (existsSync(join(PHOTO_DIR, file)) || dryRun) continue;
    try {
      writeFileSync(join(PHOTO_DIR, file), await toHeadshot(await downloadPhoto(client, fileId)));
    } catch (e) {
      // Keep the previous photo (if any) rather than flapping to "no photo".
      const status = e?.response?.status ? `HTTP ${e.response.status}` : e?.code || 'unreadable image';
      keepPhotos.delete(file);
      const prevPhoto = prevBySlug[r.slug]?.photo;
      const prevFile = prevPhoto?.split('/').pop();
      if (prevFile && existsSync(join(PHOTO_DIR, prevFile))) {
        r.photo = prevPhoto;
        keepPhotos.add(prevFile);
        warnings.push(`${r.name}: new headshot could not be processed (${status}); kept the previous photo`);
      } else {
        r.photo = null;
        warnings.push(`${r.name}: headshot could not be processed (${status}); ask for a JPEG or PNG`);
      }
    }
  }

  const changed = JSON.stringify(previous.trainees) !== JSON.stringify(records);
  // Trainees only: project scientists are listed on the Scientists page instead.
  const meta = { count: records.filter((r) => isActive(r) && r.role !== 'projsci').length };
  const metaChanged = JSON.stringify(readJson(META, {})) !== JSON.stringify(meta);

  const stalePhotos =
    existsSync(PHOTO_DIR) && !fixture
      ? readdirSync(PHOTO_DIR).filter((f) => f.endsWith('.jpg') && !keepPhotos.has(f))
      : [];
  const registryChanged = JSON.stringify(registry) !== JSON.stringify(slugRegistry);

  console.log(`Approved profiles: ${records.length} (${meta.count} currently active)`);
  for (const w of warnings) console.log(`  warning: ${w}`);
  if (dryRun) {
    console.log(`Dry run: trainees.json ${changed ? 'would change' : 'unchanged'}; ${stalePhotos.length} photo(s) would be removed`);
    return;
  }
  if (changed) {
    writeFileSync(DATA, `${JSON.stringify({ generatedAt: new Date().toISOString(), trainees: records }, null, 2)}\n`);
    console.log('Updated app/data/trainees.json');
  }
  if (metaChanged) {
    writeFileSync(META, `${JSON.stringify(meta)}\n`);
    console.log('Updated app/data/trainees-meta.json');
  }
  if (registryChanged && !fixture) {
    const sorted = Object.fromEntries(Object.entries(slugRegistry).sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(REGISTRY, `${JSON.stringify(sorted, null, 2)}\n`);
    console.log('Updated scripts/trainees/slug-registry.json');
  }
  for (const f of stalePhotos) {
    unlinkSync(join(PHOTO_DIR, f));
    console.log(`Removed photo ${f}`);
  }
  if (!changed && !metaChanged && !registryChanged && stalePhotos.length === 0) console.log('No changes');
}

main().catch((e) => {
  console.error(`Trainee sync failed: ${e.message}`);
  process.exit(1);
});
