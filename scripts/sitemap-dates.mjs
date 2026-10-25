// Writes app/data/sitemap-dates.json: for each page in the sitemap, the date its
// source last changed in git, so the sitemap's <lastmod> is truthful instead of
// "today" for every page. Runs automatically before `npm run build` and
// `npm run dev` (prebuild / predev in package.json).
//
// The JSON is committed as a snapshot. Vercel builds from a shallow clone (about
// the last 10 commits), so for pages whose last change is older than that, git
// cannot tell the real date; those keep the date already in the snapshot. Pages
// changed within the clone get their date from git. Running this with full
// history (any normal checkout) refreshes every date; commit the result.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'app/data/sitemap-dates.json');

const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

let shallowBoundary = new Set();
let haveGit = true;
try {
  git(['rev-parse', '--git-dir']);
  const shallowFile = join(root, git(['rev-parse', '--git-dir']), 'shallow');
  if (existsSync(shallowFile)) shallowBoundary = new Set(readFileSync(shallowFile, 'utf8').split('\n').filter(Boolean));
} catch {
  haveGit = false;
}

// Last commit date (ISO) touching any of these files, or null if unknown.
function lastChanged(files) {
  if (!haveGit) return null;
  let best = null;
  for (const f of files) {
    if (!existsSync(join(root, f))) continue;
    let line;
    try {
      line = git(['log', '-1', '--format=%H %cI', '--', f]);
    } catch {
      continue;
    }
    if (!line) continue;
    const [hash, date] = line.split(' ');
    if (shallowBoundary.has(hash)) return null; // real date is older than the clone; unknown
    if (!best || date > best) best = date;
  }
  return best;
}

const routes = {
  '/': ['app/page.js', 'app/data/faculty.js'],
  '/scientists': ['app/scientists/page.js', 'app/data/faculty.js'],
  '/publications': ['app/publications/page.js'],
  '/funding': ['app/funding/page.js'],
  '/researchAreas': ['app/researchAreas/page.js'],
  '/core': ['app/core/page.js'],
  '/trainees': ['app/trainees/page.js', 'app/data/trainees.json'],
};
for (const d of readdirSync(join(root, 'app/researchAreas'), { withFileTypes: true })) {
  if (d.isDirectory()) routes[`/researchAreas/${d.name}`] = [`app/researchAreas/${d.name}/page.js`, 'app/data/faculty.js'];
}
for (const d of readdirSync(join(root, 'app/laboratories'), { withFileTypes: true })) {
  if (d.isDirectory()) routes[`/laboratories/${d.name}`] = [`app/laboratories/${d.name}/page.js`];
}

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const out = {};
let fromGit = 0;
for (const [route, files] of Object.entries(routes)) {
  const date = lastChanged(files);
  if (date) {
    out[route] = date;
    fromGit++;
  } else if (previous[route]) {
    out[route] = previous[route]; // unknown here: keep the snapshot's date
  }
}
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`sitemap-dates: ${fromGit} of ${Object.keys(routes).length} pages dated from git, ${Object.keys(out).length - fromGit} kept from the snapshot${haveGit ? '' : ' (no git history found)'}`);
