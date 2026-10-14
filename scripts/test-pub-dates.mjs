// Offline checks for publication-date ordering (app/lib/pubDates.js).
// Run: npm run test:pubdates
import { orcidDate, crossrefDate, sortKey, formatDate, isoDate, fetchCrossrefDates } from '../app/lib/pubDates.js';

let failed = 0;
const ok = (c, m) => { console.log(`${c ? 'PASS' : 'FAIL'} ${m}`); if (!c) failed++; };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

ok(eq(orcidDate({ year: { value: '2025' }, month: { value: '08' }, day: { value: '18' } }), { year: 2025, month: 8, day: 18 }), 'ORCID full date');
ok(eq(orcidDate({ year: { value: '2025' }, month: null, day: { value: '3' } }), { year: 2025, month: null, day: null }), 'ORCID day ignored without month');
ok(orcidDate(null) === null, 'ORCID missing date');

const cr = {
  'published-print': { 'date-parts': [[2026, 1, 15]] },
  'published-online': { 'date-parts': [[2025, 12, 2]] },
  issued: { 'date-parts': [[2025, 12, 2]] },
};
ok(eq(crossrefDate(cr), { year: 2025, month: 12, day: 2 }), 'CrossRef: earliest of online and print');
ok(eq(crossrefDate({ 'published-print': { 'date-parts': [[2025, 3]] }, 'published-online': { 'date-parts': [[2025, 3, 9]] } }), { year: 2025, month: 3, day: 9 }), 'CrossRef: same month prefers the more precise date');
ok(eq(crossrefDate({ issued: { 'date-parts': [[2024]] } }), { year: 2024, month: null, day: null }), 'CrossRef: issued fallback');
ok(crossrefDate({}) === null, 'CrossRef: no dates');

const list = [
  { t: 'year only', d: { year: 2025, month: null, day: null } },
  { t: 'mar 9', d: { year: 2025, month: 3, day: 9 } },
  { t: 'mar only', d: { year: 2025, month: 3, day: null } },
  { t: 'dec 2', d: { year: 2025, month: 12, day: 2 } },
  { t: '2026 jan 15', d: { year: 2026, month: 1, day: 15 } },
  { t: 'mar 21', d: { year: 2025, month: 3, day: 21 } },
];
const order = list.sort((a, b) => sortKey(b.d).localeCompare(sortKey(a.d))).map((x) => x.t);
ok(eq(order, ['2026 jan 15', 'dec 2', 'mar 21', 'mar 9', 'mar only', 'year only']), `newest first, less precise last (${order.join(' > ')})`);

ok(formatDate({ year: 2025, month: 8, day: 18 }) === 'Aug 18, 2025', 'format full date');
ok(formatDate({ year: 2025, month: 8, day: null }) === 'Aug 2025', 'format month');
ok(formatDate({ year: 2025, month: null, day: null }) === '2025', 'format year');
ok(isoDate({ year: 2025, month: 8, day: 5 }) === '2025-08-05', 'ISO date for <time>');

const calls = [];
const fakeFetch = async (url) => {
  calls.push(url);
  if (url.includes('bad')) return { ok: false };
  if (url.includes('throw')) throw new Error('network');
  return { ok: true, json: async () => ({ message: cr }) };
};
const m = await fetchCrossrefDates(['10.1/a', '10.1/a', '10.1/bad', '10.1/throw', null], { fetchImpl: fakeFetch, concurrency: 2 });
ok(calls.length === 3, 'duplicate and empty DOIs fetched once/skipped');
ok(m.size === 1 && eq(m.get('10.1/a'), { year: 2025, month: 12, day: 2 }), 'failures are skipped, successes kept');
ok(calls[0] === 'https://api.crossref.org/works/10.1%2Fa', 'DOI is URL-encoded');

console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
