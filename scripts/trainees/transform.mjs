// Pure functions that turn rows of the trainee intake Sheet into the public
// records written to app/data/trainees.json. No network or file access here,
// so it can be tested offline (npm run test:trainees).
import { createHash } from 'node:crypto';
import { FIELDS, ROLE_CHOICES, DESCRIPTION_MAX } from './fields.mjs';

const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/\s*\(optional\)\s*$/, '');

// Map each FIELDS key to its column index, matching headers case-insensitively.
export function columnIndex(headerRow) {
  const idx = {};
  const headers = headerRow.map(norm);
  for (const [key, title] of Object.entries(FIELDS)) {
    const i = headers.indexOf(norm(title));
    if (i >= 0) idx[key] = i;
  }
  return idx;
}

// Sheets serial dates count days from 1899-12-30.
export function toIsoDate(v) {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number' && Number.isFinite(v)) {
    const ms = Math.round((v - 25569) * 86400 * 1000);
    return new Date(ms).toISOString().slice(0, 10);
  }
  const s = String(v).trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/); // US M/D/YYYY
  if (m) return `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}`;
  return null;
}

const toNumberTime = (v) => {
  if (typeof v === 'number') return v;
  const d = Date.parse(String(v ?? ''));
  return Number.isNaN(d) ? 0 : d / 86400000 + 25569;
};

export const isTruthy = (v) => v === true || ['true', 'yes', 'y', 'x', '1', '✓'].includes(norm(v));

const clean = (v) => String(v ?? '').replace(/\s+/g, ' ').trim();
// Names and titles are plain text; drop angle brackets so they can never form markup.
const cleanText = (v) => clean(v).replace(/[<>]/g, '');
const cleanParagraphs = (v) =>
  String(v ?? '')
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n\n');

export function slugify(name) {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// "Maria de la Cruz" -> "Cruz Maria de la" for alphabetizing by family name.
export function sortNameOf(name) {
  const parts = name.split(' ');
  return parts.length > 1 ? `${parts[parts.length - 1]} ${parts.slice(0, -1).join(' ')}` : name;
}

export function orcidId(v) {
  const m = String(v ?? '').toUpperCase().match(/(\d{4})-?(\d{4})-?(\d{4})-?(\d{3}[\dX])/);
  if (!m) return null;
  const id = `${m[1]}-${m[2]}-${m[3]}-${m[4]}`;
  const digits = id.replace(/-/g, '');
  let total = 0;
  for (const c of digits.slice(0, -1)) total = (total + Number(c)) * 2;
  const r = (12 - (total % 11)) % 11;
  const check = r === 10 ? 'X' : String(r);
  return check === digits.slice(-1) ? id : null;
}

export function httpUrl(v, hostPattern) {
  let s = clean(v);
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    if (!['http:', 'https:'].includes(u.protocol)) return null;
    if (hostPattern && !hostPattern.test(u.hostname)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Google Forms stores uploads as "https://drive.google.com/open?id=<id>" (one or
// more, comma-separated). Return the first file id.
export function driveFileId(v) {
  const m = String(v ?? '').match(/[?&]id=([A-Za-z0-9_-]{10,})|\/d\/([A-Za-z0-9_-]{10,})/);
  return m ? m[1] ?? m[2] : null;
}

export const photoHash = (fileId) => createHash('sha256').update(fileId).digest('hex').slice(0, 10);

export const accountKeyOf = (email) => {
  const e = norm(email);
  return e ? createHash('sha256').update(`jsei-trainee:${e}`).digest('hex').slice(0, 16) : null;
};

// Pick one row per person (by Google account email, falling back to name):
// the most recent APPROVED row. A newer, not-yet-approved edit leaves the
// previously approved version live until you approve the new one.
export function pickApprovedRows(rows, idx) {
  const latest = new Map();
  for (const row of rows) {
    if (!isTruthy(row[idx.approved])) continue;
    const key = norm(row[idx.account]) || norm(row[idx.name]);
    if (!key) continue;
    const t = toNumberTime(row[idx.timestamp]);
    const prev = latest.get(key);
    if (!prev || t >= prev.t) latest.set(key, { row, t });
  }
  return [...latest.values()].map((v) => v.row);
}

// Convert one approved row into a public record. Returns { record } or
// { error } explaining why the row was skipped. Only fields meant for the
// public site are copied; the respondent's Google account email is not.
export function rowToRecord(row, idx, labByFormLabel) {
  const get = (k) => (idx[k] === undefined ? '' : row[idx[k]]);
  const name = cleanText(get('name'));
  if (!name) return { error: 'missing name' };
  if (idx.consent === undefined || !clean(get('consent'))) return { error: `${name}: no consent` };

  const role = ROLE_CHOICES[clean(get('role'))];
  if (!role) return { error: `${name}: unrecognized role "${clean(get('role'))}"` };

  const lab = labByFormLabel[clean(get('lab'))];
  if (!lab) return { error: `${name}: unrecognized lab "${clean(get('lab'))}"` };
  // Additional labs: unknown labels are ignored (e.g. a lab removed from the site).
  const labSlugs = [lab.slug];
  for (const label of String(get('otherLabs') ?? '').split(/,\s*/)) {
    const other = labByFormLabel[clean(label)];
    if (other && !labSlugs.includes(other.slug)) labSlugs.push(other.slug);
  }

  const title = cleanText(get('title'));
  if (!title) return { error: `${name}: missing title` };

  let description = cleanParagraphs(get('description'));
  if (description.length > DESCRIPTION_MAX) description = `${description.slice(0, DESCRIPTION_MAX - 1).trimEnd()}…`;

  const startDate = toIsoDate(get('startDate'));
  let endDate = toIsoDate(get('endDate'));
  // Undergraduates must give a graduation date; it is their end date, so their
  // profile disappears on its own. Without one they are not published.
  if (role === 'ugrad') {
    endDate = toIsoDate(get('gradDate')) || endDate;
    if (!endDate) return { error: `${name}: undergraduate without an expected graduation date (not published)` };
  }
  if (startDate && endDate && endDate < startDate) return { error: `${name}: end date before start date` };

  const email = clean(get('publicEmail'));
  const links = {
    website: httpUrl(get('website')),
    orcid: orcidId(get('orcid')),
    scholar: httpUrl(get('scholar'), /^scholar\.google\.[a-z]{2,3}(\.[a-z]{2})?$/i),
    linkedin: httpUrl(get('linkedin'), /^([a-z]{2,3}\.)?linkedin\.com$/i),
  };
  for (const k of Object.keys(links)) if (!links[k]) delete links[k];

  return {
    record: {
      slug: slugify(name),
      name,
      sortName: sortNameOf(name),
      pronouns: cleanText(get('pronouns')) || null,
      role,
      title,
      lab: lab.slug, // primary lab (the Lab question)
      labs: labSlugs, // primary first, then any additional labs
      description,
      startDate,
      endDate,
      email: emailOk(email) ? email : null,
      links,
      photoFileId: driveFileId(get('headshot')),
      // Stable per-person key (hash of the Google account email) used only to keep
      // each person's URL slug stable between syncs. Removed before publishing.
      accountKey: accountKeyOf(get('account')),
    },
  };
}

// Give every record a unique, stable slug. `registry` maps accountKey -> slug
// from earlier syncs, so a person keeps their URL even when someone with the
// same name is added later. Newcomers get "jane-doe", else "jane-doe-<lab>",
// else "jane-doe-2", ... Returns the updated registry.
export function assignSlugs(records, registry = {}) {
  const taken = new Set();
  const next = { ...registry };
  const sorted = [...records].sort((a, b) => a.sortName.localeCompare(b.sortName) || a.lab.localeCompare(b.lab));
  // First pass: people who already have a slug keep it.
  for (const r of sorted) {
    const prev = r.accountKey && registry[r.accountKey];
    if (prev && !taken.has(prev)) {
      r.slug = prev;
      taken.add(prev);
      r._assigned = true;
    }
  }
  // Second pass: everyone else.
  for (const r of sorted) {
    if (r._assigned) {
      delete r._assigned;
      continue;
    }
    const base = r.slug || 'trainee';
    let slug = base;
    if (taken.has(slug)) slug = `${base}-${r.lab}`;
    let n = 2;
    while (taken.has(slug)) slug = `${base}-${n++}`;
    r.slug = slug;
    taken.add(slug);
    if (r.accountKey) next[r.accountKey] = slug;
  }
  return next;
}

// Full pipeline from Sheet values (header row first) to records + warnings.
export const REQUIRED_COLUMNS = ['account', 'name', 'role', 'lab', 'title', 'consent', 'approved'];

export function buildRecords(values, labByFormLabel, registry = {}) {
  const [header = [], ...rows] = values;
  const idx = columnIndex(header);
  const warnings = [];
  const missing = REQUIRED_COLUMNS.filter((k) => idx[k] === undefined).map((k) => FIELDS[k]);
  if (missing.length) {
    // A renamed or missing column must stop the sync, not silently publish nothing.
    throw new Error(`Sheet is missing required column(s): ${missing.join(', ')}`);
  }
  const records = [];
  for (const row of pickApprovedRows(rows, idx)) {
    const { record, error } = rowToRecord(row, idx, labByFormLabel);
    if (error) warnings.push(`Skipped: ${error}`);
    else records.push(record);
  }
  const slugRegistry = assignSlugs(records, registry);
  return { records, warnings, slugRegistry };
}
