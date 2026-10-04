// Offline checks for the grant-matching logic in app/funding/page.js.
// No network needed: the helper functions are sliced out of the page source and
// run against synthetic NIH RePORTER / ORCID records with a mocked fetch.
// Run: npm run test:funding
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'app/funding/page.js'), 'utf8');
const slice = (from, to) => {
  const a = src.indexOf(from);
  const b = src.indexOf(to, a);
  if (a < 0 || b < 0) throw new Error(`Marker not found: ${from} .. ${to}`);
  return src.slice(a, b);
};

const mod = `
const CURRENT_YEAR = 2026;
const FISCAL_YEARS = [2026, 2025, 2024, 2023, 2022];
const MIN_YEAR = 2022;
const NIH_PAGE_SIZE = 500, NIH_MAX_RECORDS = 2000;
const NEW_AWARD_TYPES = new Set(['1', '2', '7']);
const UCLA_ORG_NAME = 'UNIVERSITY OF CALIFORNIA LOS ANGELES';
${slice('const normName', 'const UCLA_ORG_NAME')}
export function makeOrcidHelpers(nihSeen) {
${slice('  const normGrant', '  // Filter ORCID entries')}
  return { isNihDuplicate, orcidStartYear };
}
export { nameVariants, piMatchesFaculty, fetchGrants };
`;
const file = join(mkdtempSync(join(tmpdir(), 'funding-')), 'logic.mjs');
writeFileSync(file, mod);
const { nameVariants, piMatchesFaculty, fetchGrants, makeOrcidHelpers } = await import(pathToFileURL(file));

let failed = 0;
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'} ${msg}`); if (!cond) failed++; };
const F = (firstName, lastName, extra = {}) => ({ name: `${firstName} ${lastName}`, nihName: { firstName, lastName, ...extra } });

// Name matching
ok(piMatchesFaculty({ first_name: 'YIRONG', last_name: 'PENG' }, F('Yi-Rong', 'Peng')), 'Yi-Rong matches YIRONG');
ok(piMatchesFaculty({ first_name: 'AYA', last_name: 'BARZELAY WOLLMAN' }, F('Aya', 'Barzelay-Wollman')), 'hyphen vs space in last name');
ok(piMatchesFaculty({ first_name: 'AYA', last_name: 'BARZELAY' }, F('Aya', 'Barzelay-Wollman')), 'first segment of hyphenated last name');
ok(piMatchesFaculty({ first_name: 'GREGORY DARIN', last_name: 'FIELD' }, F('Greg', 'Field')), 'nickname prefix');
ok(piMatchesFaculty({ first_name: 'BEN J', last_name: 'GLASGOW' }, F('Benjamin', 'Glasgow', { altFirstNames: ['Ben'] })), 'altFirstNames');
ok(!piMatchesFaculty({ first_name: 'XINGHUI', last_name: 'SUN' }, F('Hui', 'Sun')), 'rejects substring first name');
ok(!piMatchesFaculty({ first_name: 'EDMUND', last_name: 'TSUI' }, F('Irena', 'Tsui')), 'rejects same last name');
ok(JSON.stringify(nameVariants(F('Yi-Rong', 'Peng')).firsts) === '["Yi-Rong","Yi Rong","YiRong"]', 'first-name variants');

// ORCID helpers
const { isNihDuplicate, orcidStartYear } = makeOrcidHelpers(['R01EY031059']);
ok(isNihDuplicate('5 R01 EY031059-04'), 'ORCID number with prefix/suffix is an NIH duplicate');
ok(!isNihDuplicate('RPB-12345') && !isNihDuplicate(''), 'non-NIH numbers kept');
ok(orcidStartYear({ startYear: '2024', endYear: '2029' }) === '2024', 'new ORCID grant listed under start year');
ok(orcidStartYear({ startYear: '2022', endYear: null }) === '2022', 'start in first window year included');
ok(orcidStartYear({ startYear: '2019', endYear: '2027' }) === null, 'grant started before window excluded even if running');
ok(orcidStartYear({ startYear: '2028', endYear: '2030' }) === null, 'future start excluded');
ok(orcidStartYear({ startYear: null }) === null, 'missing start excluded');

// fetchGrants: paging, and only new (1), competing renewal (2), and transfer-to-UCLA (7) awards kept
const records = [];
const mineTypes = ['1', '2', '5', '3', '4', '7', null, '7'];
let mineCount = 0;
for (let i = 0; i < 1200; i++) {
  const mine = i % 24 === 0;
  records.push({
    award_type: mine ? mineTypes[mineCount % mineTypes.length] : '1',
    // the first type-7 slot is a transfer to UCLA, the second a transfer elsewhere
    organization: { org_name: mine && mineCount++ % mineTypes.length === 7 ? 'STANFORD UNIVERSITY' : 'UNIVERSITY OF CALIFORNIA LOS ANGELES' },
    fiscal_year: 2022 + (i % 5),
    core_project_num: mine ? 'R01EY000001' : `R01XX${i}`,
    principal_investigators: [mine
      ? { first_name: 'HUI', last_name: 'SUN', profile_id: 7 }
      : { first_name: 'XINGHUI', last_name: 'SUN', profile_id: 9 }],
  });
}
const calls = [];
globalThis.fetch = async (_url, opts) => {
  const body = JSON.parse(opts.body);
  calls.push(body);
  return { ok: true, json: async () => ({ meta: { total: records.length }, results: records.slice(body.offset, body.offset + body.limit) }) };
};
const grants = await fetchGrants(F('Hui', 'Sun'));
ok(calls.length === 3, 'pages through 1200 records in 3 requests');
const expected = records.filter((r) => r.principal_investigators[0].profile_id === 7 &&
  (['1', '2'].includes(r.award_type) || (r.award_type === '7' && r.organization.org_name === 'UNIVERSITY OF CALIFORNIA LOS ANGELES'))).length;
ok(grants.length === expected && expected > 0, `keeps only type 1/2 and UCLA type 7 records (${grants.length} of 50 for this PI)`);
ok(grants.every((g) => g._matchedProfileId === 7), 'keeps the right PI only');
ok(grants.some((g) => g.award_type === '7'), 'keeps a type 7 transfer to UCLA');
ok(!grants.some((g) => g.award_type === '7' && g.organization.org_name !== 'UNIVERSITY OF CALIFORNIA LOS ANGELES'), 'drops a type 7 transfer to another institution');
ok(grants.every((g) => ['1', '2', '7'].includes(g.award_type)), 'drops type 5, 3, 4, and missing types');

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
