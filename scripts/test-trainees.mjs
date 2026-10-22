// Offline checks for the trainee intake pipeline (scripts/trainees/transform.mjs).
// Run: npm run test:trainees
import { buildRecords, orcidId, httpUrl, toIsoDate, driveFileId, assignSlugs, slugify, columnIndex, pickApprovedRows, accountKeyOf } from './trainees/transform.mjs';
import { labByFormLabel, labs } from '../app/data/labs.js';
import { readFileSync } from 'node:fs';
import { ROLE_CHOICES } from './trainees/fields.mjs';

let failed = 0;
const ok = (c, m) => { console.log(`${c ? 'PASS' : 'FAIL'} ${m}`); if (!c) failed++; };

// Helpers
ok(orcidId('https://orcid.org/0000-0001-8110-9988') === '0000-0001-8110-9988', 'ORCID from URL with valid checksum');
ok(orcidId('0000-0001-8110-9987') === null, 'ORCID with bad checksum rejected');
ok(httpUrl('example.org') === 'https://example.org/', 'website without scheme gets https');
ok(httpUrl('javascript:alert(1)') === null, 'non-http URL rejected');
ok(httpUrl('https://scholar.google.evil.com/x', /^scholar\.google\.[a-z]{2,3}(\.[a-z]{2})?$/i) === null, 'look-alike Scholar host rejected');
ok(toIsoDate(45658) === '2025-01-01', 'Sheets serial date');
ok(toIsoDate('9/1/2024') === '2024-09-01', 'US date string');
ok(toIsoDate('') === null, 'blank date');
ok(driveFileId('https://drive.google.com/open?id=1AbC_dEf-123456') === '1AbC_dEf-123456', 'Drive id from form upload URL');
ok(slugify('José  Núñez-Ortiz') === 'jose-nunez-ortiz', 'slug strips accents');
const mk = (slug, lab, acct) => ({ slug, sortName: 'Doe Jane', lab, accountKey: accountKeyOf(acct) });
const reg1 = assignSlugs([mk('jane-doe', 'peng', 'a@x.org')], {});
const later = [mk('jane-doe', 'field', 'b@x.org'), mk('jane-doe', 'peng', 'a@x.org'), mk('jane-doe', 'peng', 'c@x.org')];
assignSlugs(later, reg1);
ok(later[1].slug === 'jane-doe', 'existing person keeps their slug when a same-named person is added');
ok(later[0].slug === 'jane-doe-field' && later[2].slug === 'jane-doe-peng', 'newcomers get lab-suffixed slugs');
const fresh = [mk('a-b', 'field', '1@x'), mk('a-b', 'peng', '2@x'), mk('a-b', 'peng', '3@x')];
assignSlugs(fresh, {});
ok(JSON.stringify(fresh.map((r) => r.slug)) === '["a-b","a-b-peng","a-b-2"]', 'duplicate names get unique slugs');
ok(new Set(labs.map((l) => l.formLabel)).size === labs.length, 'lab form labels are unique');
ok(labs.find((l) => l.slug === 'tsui-e').labName !== labs.find((l) => l.slug === 'tsui-i').labName, 'two Tsui labs get distinct names');

// Latest approved row per person
const header = ['Timestamp', 'Email Address', 'Full name', 'Approved'];
const idx = columnIndex(header);
const rows = [
  [1, 'a@x.org', 'Old approved', true],
  [2, 'a@x.org', 'New unapproved edit', false],
  [3, 'b@x.org', 'B first', true],
  [4, 'B@X.org', 'B second', true],
];
const picked = pickApprovedRows(rows, idx).map((r) => r[2]).sort();
ok(JSON.stringify(picked) === '["B second","Old approved"]', 'keeps latest approved row per account');

// Full pipeline on the fictional fixture
const values = JSON.parse(readFileSync(new URL('./trainees/fixtures/sample-sheet.json', import.meta.url), 'utf8'));
const { records, warnings } = buildRecords(values, labByFormLabel);
const names = records.map((r) => r.name);
ok(records.length === 4, `4 approved records (got ${records.length})`);
ok(!names.includes('Example Not Approved'), 'unapproved row excluded');
const pd = records.find((r) => r.name === 'Example Postdoc');
ok(pd.role === 'postdoc' && pd.lab === 'field' && pd.startDate === '2025-01-01', 'role, lab, and date mapped');
ok(pd.links.orcid === '0000-0001-8110-9988' && pd.links.website === 'https://example.org/', 'links normalized');
ok(pd.description.includes('\n\n'), 'paragraph breaks kept');
ok(!('account' in pd) && !JSON.stringify(records).includes('example.two@example.com'), 'login email never copied');
const gs = records.find((r) => r.name === 'Example Graduate Student');
ok(!gs.links.orcid && !gs.links.scholar, 'invalid ORCID and off-site Scholar link dropped');
ok(records.find((r) => r.name === 'Example Research Associate').lab === 'tsui-i', 'lab label with same last name resolves correctly');
// Every role offered on the form maps to a role the site knows how to show.
const siteRoleKeys = [...readFileSync(new URL('../app/data/trainees.js', import.meta.url), 'utf8').matchAll(/key: '([a-z]+)'/g)].map((m) => m[1]);
ok(Object.values(ROLE_CHOICES).every((k) => siteRoleKeys.includes(k)), `every form role has a site role (${siteRoleKeys.join(', ')})`);
ok(ROLE_CHOICES['Medical Student'] === 'grad' && ROLE_CHOICES['Project Scientist'] === 'postdoc', 'Medical Students list as grad, Project Scientists as postdoc');
ok(warnings.length === 0, `no warnings (${warnings.join('; ')})`);

let threw = false;
try { buildRecords([['Full name', 'Role']], labByFormLabel); } catch (e) { threw = /Approved/.test(e.message); }
ok(threw, 'missing required column stops the sync');
const evil = JSON.parse(JSON.stringify(values));
evil[1][2] = '</script><script>alert(1)</script>Example Postdoc';
const { records: er } = buildRecords(evil, labByFormLabel);
ok(!er.some((r) => /[<>]/.test(r.name)), 'angle brackets stripped from names');
// Undergraduates: graduation date required and used as the end date.
{
  const h = [...values[0], 'Expected graduation date'];
  const base = [...values[1], ''];
  const ug = (acct, grad, end = '') => {
    const r = [...base];
    r[h.indexOf('Email address')] = acct;
    r[h.indexOf('Full name')] = `Example Undergrad ${acct}`;
    r[h.indexOf('Role')] = 'Undergraduate Student';
    r[h.indexOf('Expected end date')] = end;
    r[h.indexOf('Expected graduation date')] = grad;
    return r;
  };
  const out = buildRecords([h, ug('u1@x.org', '6/15/2027'), ug('u2@x.org', ''), ug('u3@x.org', '', '6/1/2028')], labByFormLabel);
  const u1 = out.records.find((r) => r.name.endsWith('u1@x.org'));
  ok(u1 && u1.role === 'ugrad' && u1.endDate === '2027-06-15', 'undergraduate graduation date becomes end date');
  ok(!out.records.some((r) => r.name.endsWith('u2@x.org')), 'undergraduate without a graduation date is not published');
  ok(out.warnings.some((w) => /u2@x\.org.*graduation date/.test(w)), 'missing graduation date is reported');
  ok(out.records.find((r) => r.name.endsWith('u3@x.org'))?.endDate === '2028-06-01', 'falls back to Expected end date if no graduation date');
  const old = buildRecords([values[0], ug('u4@x.org', '').slice(0, -1)], labByFormLabel);
  ok(old.records.length === 0, 'Sheet without the graduation-date column still refuses dateless undergrads');
}
ok(records.every((r) => r.accountKey && !String(r.accountKey).includes('@')), 'account key is a hash, not an email');
console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
