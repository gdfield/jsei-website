import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { facultyData } from '../data/faculty';
import { pageMeta } from '../lib/seo';

export const metadata = pageMeta({
  path: '/funding',
  title: "Research Funding",
  description: "New and competitively renewed NIH grants awarded to Jules Stein Eye Institute faculty at UCLA for research on vision, retinal disease, cornea, and glaucoma.",
});

const CURRENT_YEAR = new Date().getFullYear();
const FISCAL_YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);
const MIN_YEAR = FISCAL_YEARS[FISCAL_YEARS.length - 1];

// Sortable "YYYY-MM-DD" keys (missing parts are "00").
const pad = (v, n) => String(parseInt(v, 10) || 0).padStart(n, '0');
const orcidStartKey = (g) => `${pad(g.startYear, 4)}-${pad(g.startMonth, 2)}-${pad(g.startDay, 2)}`;
const awardDateKey = (entry) =>
  entry._source === 'nih'
    ? (entry.data.award_notice_date || entry.data.budget_start || entry.data.project_start_date || `${entry.data.fiscal_year}-00-00`).slice(0, 10)
    : orcidStartKey(entry.data);
// NIH Reporter returns at most 500 records per request; page through anything larger.
const NIH_PAGE_SIZE = 500;
const NIH_MAX_RECORDS = 2000;
// NIH application types shown on the page: 1 = new award, 2 = competing renewal,
// 7 = change of grantee institution (a grant transferred in, e.g. by a new recruit).
const NEW_AWARD_TYPES = new Set(['1', '2', '7']);

async function fetchOrcidFunding(faculty) {
  if (!faculty.orcid) return [];
  try {
    const res = await fetch(`https://pub.orcid.org/v3.0/${faculty.orcid}/fundings`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.group || []).flatMap((g) => {
      const grantNumbers = (g['external-ids']?.['external-id'] ?? []).map(
        (e) => e['external-id-value']
      );
      const url = (g['external-ids']?.['external-id'] ?? []).find(
        (e) => e['external-id-url']?.value
      )?.['external-id-url']?.value ?? null;
      return (g['funding-summary'] || []).map((s) => ({
        _facultyName: faculty.name,
        title: s.title?.title?.value ?? null,
        type: s.type ?? 'grant',
        funder: s.organization?.name ?? null,
        startYear: s['start-date']?.year?.value ?? null,
        startMonth: s['start-date']?.month?.value ?? null,
        startDay: s['start-date']?.day?.value ?? null,
        endYear: s['end-date']?.year?.value ?? null,
        grantNumbers,
        url,
      }));
    });
  } catch {
    return [];
  }
}

// Names are compared with case, spaces, hyphens, and punctuation removed, so
// "Yi-Rong" matches "YIRONG" and "Barzelay-Wollman" matches "BARZELAY WOLLMAN".
const normName = (s) => (s ?? '').toLowerCase().replace(/[^a-z]/g, '');

// Every spelling of a faculty member's name to search NIH Reporter with.
// Hyphenated names are also tried with a space, joined, and (for last names)
// the first segment alone, because NIH records are inconsistent about these.
// `nihName.altFirstNames` / `altLastNames` in faculty.js add extra variants
// (e.g. "Ben" for "Benjamin").
function nameVariants(faculty) {
  const { firstName, lastName, altFirstNames = [], altLastNames = [] } = faculty.nihName;
  const expand = (name, isLast) => {
    const out = [name];
    if (/[-\s]/.test(name)) {
      out.push(name.replace(/-/g, ' '), name.replace(/[-\s]/g, ''));
      if (isLast) out.push(name.split(/[-\s]/)[0]);
    }
    return out;
  };
  const firsts = [...new Set([firstName, ...altFirstNames].flatMap((n) => expand(n, false)))];
  const lasts = [...new Set([lastName, ...altLastNames].flatMap((n) => expand(n, true)))];
  return { firsts, lasts };
}

// NIH Reporter's pi_names search matches on partial first-name substrings
// (e.g. querying "Hui Sun" also returns "Xinghui Sun"), so results must be
// re-validated: same last name, and the NIH first name must start with ours
// to allow full-name vs. nickname mismatches (e.g. "Gregory Darin" vs "Greg").
function piMatchesFaculty(pi, faculty) {
  const { firsts, lasts } = nameVariants(faculty);
  const piLast = normName(pi.last_name);
  const piFirst = normName(pi.first_name);
  return (
    lasts.some((l) => normName(l) === piLast) &&
    firsts.some((f) => normName(f) && piFirst.startsWith(normName(f)))
  );
}

async function fetchGrants(faculty) {
  try {
    const { firsts, lasts } = nameVariants(faculty);
    const piNames = lasts.flatMap((last_name) =>
      firsts.map((first_name) => ({ last_name, first_name }))
    );
    const results = [];
    for (let offset = 0; offset < NIH_MAX_RECORDS; offset += NIH_PAGE_SIZE) {
      const res = await fetch('https://api.reporter.nih.gov/v2/projects/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          criteria: {
            pi_names: piNames,
            fiscal_years: FISCAL_YEARS,
          },
          fields: [
            'ProjectTitle', 'FiscalYear', 'AwardAmount', 'ProjectStartDate',
            'ProjectEndDate', 'AgencyIcAdmin', 'ActivityCode', 'ProjectNum',
            'CoreProjectNum', 'PrincipalInvestigators', 'IsActive', 'ProjectDetailUrl',
            'Organization', 'AwardType', 'AwardNoticeDate', 'BudgetStart',
          ],
          offset,
          limit: NIH_PAGE_SIZE,
        }),
        next: { revalidate: 86400 },
      });
      if (!res.ok) break;
      const data = await res.json();
      const page = data.results || [];
      results.push(...page);
      const total = data.meta?.total ?? 0;
      if (page.length < NIH_PAGE_SIZE || results.length >= total) break;
    }
    // Only new awards (type 1), competing renewals (type 2), and grants transferred
    // to UCLA (type 7) are listed. Type 5 (non-competing continuation) records are the
    // routine yearly funding of an existing grant and would make an old grant look
    // new; supplements (3), extensions (4), and other administrative changes (6, 9)
    // are excluded too. A type 7 counts only when the receiving institution is UCLA,
    // so a transfer between two other institutions before a recruit arrived is skipped.
    // Grants are deduplicated by core project number in FundingPage.
    return results
      .filter((g) => {
        const type = String(g.award_type);
        if (!NEW_AWARD_TYPES.has(type)) return false;
        if (type === '7') return g.organization?.org_name?.toUpperCase() === UCLA_ORG_NAME;
        return true;
      })
      .map((g) => {
        const matchedPi = (g.principal_investigators || []).find((pi) => piMatchesFaculty(pi, faculty));
        return matchedPi ? { ...g, _facultyName: faculty.name, _matchedProfileId: matchedPi.profile_id } : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

const UCLA_ORG_NAME = 'UNIVERSITY OF CALIFORNIA LOS ANGELES';

// Confirm each matched PI is actually UCLA-affiliated by asking NIH Reporter whether
// they have any UCLA-administered project — name matching alone can't distinguish two
// different people who share a name. NIH Reporter ignores the `fields` allowlist and
// always returns full records (abstract text included), so one query per profile_id
// capped at limit:1 keeps each response small; a single combined query for ~25 PIs at
// limit:500 returns megabytes of data and can't be cached.
async function isUclaAffiliated(profileId) {
  try {
    const res = await fetch('https://api.reporter.nih.gov/v2/projects/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        criteria: { pi_profile_ids: [profileId], org_names: [UCLA_ORG_NAME] },
        limit: 1,
      }),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return false;
    const data = await res.json();
    return (data.meta?.total ?? 0) > 0;
  } catch {
    return false;
  }
}

async function verifyUclaProfileIds(profileIds) {
  const idSet = [...new Set(profileIds)];
  if (idSet.length === 0) return new Set();
  const results = await Promise.all(idSet.map(async (id) => [id, await isUclaAffiliated(id)]));
  return new Set(results.filter(([, ok]) => ok).map(([id]) => id));
}

function formatCurrency(amount) {
  if (!amount) return null;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
  return `$${(amount / 1_000).toFixed(0)}K`;
}

export default async function FundingPage() {
  const facultyWithNih = facultyData.filter((f) => f.nihName && !f.emeritus);
  const facultyWithOrcid = facultyData.filter((f) => f.orcid && !f.emeritus);

  const [allGrantsRaw, allOrcidFunding] = await Promise.all([
    Promise.all(facultyWithNih.map((f) => fetchGrants(f))).then((r) => r.flat()),
    Promise.all(facultyWithOrcid.map((f) => fetchOrcidFunding(f))).then((r) => r.flat()),
  ]);

  // Confirm each matched PI is genuinely UCLA-affiliated, not a same-named PI elsewhere
  const verifiedProfileIds = await verifyUclaProfileIds(
    allGrantsRaw.map((g) => g._matchedProfileId)
  );
  const allGrants = allGrantsRaw.filter((g) => verifiedProfileIds.has(g._matchedProfileId));

  // Deduplicate NIH grants by core project number, keeping the highest fiscal year per grant
  // and collecting all JSEI faculty names that appeared in any query for the same grant
  const nihByCore = {};
  allGrants.forEach((g) => {
    const key = g.core_project_num ?? g.project_num;
    if (!nihByCore[key]) {
      nihByCore[key] = { ...g, _facultyNames: new Set([g._facultyName]) };
    } else {
      nihByCore[key]._facultyNames.add(g._facultyName);
      // Keep the most recent new/renewal award; if two records share a fiscal year,
      // keep the larger award amount.
      const cur = nihByCore[key];
      if (
        g.fiscal_year > cur.fiscal_year ||
        (g.fiscal_year === cur.fiscal_year && (g.award_amount ?? 0) > (cur.award_amount ?? 0))
      ) {
        nihByCore[key] = { ...nihByCore[key], ...g, _facultyNames: nihByCore[key]._facultyNames };
      }
    }
  });
  const unique = Object.values(nihByCore);
  const nihSeen = new Set(Object.keys(nihByCore));

  // Normalized NIH core project numbers (e.g. "R01EY031059") for deduplication against
  // ORCID, where grant numbers are often written with spaces, dashes, or full
  // application prefixes/suffixes (e.g. "5 R01 EY031059-04").
  const normGrant = (n) => (n ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const nihGrantNums = [...nihSeen].map(normGrant).filter(Boolean);
  const isNihDuplicate = (n) => {
    const g = normGrant(n);
    return g.length > 0 && nihGrantNums.some((core) => g.includes(core));
  };

  // Non-NIH grants from ORCID count as new in the year they started. ORCID does not
  // distinguish renewals, so the start year is the only signal; grants that started
  // before the window are not listed even if still running.
  const orcidStartYear = (g) => {
    const start = parseInt(g.startYear);
    return start >= MIN_YEAR && start <= CURRENT_YEAR ? String(start) : null;
  };

  // Filter ORCID entries: exclude NIH Reporter duplicates, require a start year in the window, then deduplicate
  const orcidSeen = new Set();
  const orcidUnique = allOrcidFunding.filter((g) => {
    if (g.grantNumbers.some(isNihDuplicate)) return false;
    if (!orcidStartYear(g)) return false;
    const key = `${g.title}|${g.funder}`;
    if (orcidSeen.has(key)) return false;
    orcidSeen.add(key);
    return true;
  });

  const orcidGrants = orcidUnique.filter((g) => g.type === 'grant');
  const orcidAwards = orcidUnique.filter((g) => g.type !== 'grant');

  // Merge NIH and non-NIH grants into year buckets: NIH keyed by the fiscal year of the
  // most recent new or competing-renewal award, ORCID by start year
  const grantsByYear = {};
  unique
    .filter((g) => g.fiscal_year >= MIN_YEAR)
    .forEach((g) => {
      const year = String(g.fiscal_year);
      (grantsByYear[year] ??= []).push({ _source: 'nih', data: g });
    });
  orcidGrants.forEach((g) => {
    (grantsByYear[orcidStartYear(g)] ??= []).push({ _source: 'orcid', data: g });
  });
  const sortedYears = Object.keys(grantsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  // Within each year, newest award first: NIH by award notice date (else budget
  // or project start), ORCID by start date.
  for (const y of sortedYears) grantsByYear[y].sort((a, b) => awardDateKey(b).localeCompare(awardDateKey(a)));
  orcidAwards.sort((a, b) => orcidStartKey(b).localeCompare(orcidStartKey(a)));

  // Lookup map: "lastname:firstname" (lowercase) → preferred faculty display name
  // Keyed on both names to avoid collisions between faculty with the same last name
  const facultyByName = {};
  facultyWithNih.forEach((f) => {
    const key = `${f.nihName.lastName.toLowerCase()}:${f.nihName.firstName.toLowerCase()}`;
    facultyByName[key] = f.name;
  });

  function titleCase(str) {
    return str
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
      <Hero
        eyebrow="Research Funding"
        title="What powers the research"
        subtitle="Grants & awards"
        description={`New and competitively renewed awards to institute faculty, ${MIN_YEAR}–${CURRENT_YEAR}.`}
        compact
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {unique.length} NIH grant{unique.length !== 1 ? 's' : ''} · {orcidGrants.length} non-NIH grant{orcidGrants.length !== 1 ? 's' : ''} · {orcidAwards.length} award{orcidAwards.length !== 1 ? 's' : ''} · sourced from NIH Reporter and ORCID · refreshed daily
        </p>

        {sortedYears.map((year) => (
          <Reveal key={year} className="mb-14">
            <div className="mb-5 flex items-center gap-4">
              <h2 className="font-display text-2xl font-semibold text-ink">{year}</h2>
              <span className="h-px flex-1 bg-mist" aria-hidden="true" />
              <span className="font-mono text-xs text-muted">{grantsByYear[year].length}</span>
            </div>
            <div className="space-y-4">
              {grantsByYear[year].map((entry, i) => {
                if (entry._source === 'nih') {
                  const grant = entry.data;
                  const pis = grant.principal_investigators || [];
                  const jseiPiNames = pis
                    .sort((a, b) => (b.is_contact_pi ? 1 : 0) - (a.is_contact_pi ? 1 : 0))
                    .map((pi) => {
                      const key = `${pi.last_name?.toLowerCase()}:${pi.first_name?.toLowerCase()}`;
                      return facultyByName[key];
                    })
                    .filter(Boolean);
                  // Merge PI-lookup names with all faculty who appeared in search queries for this grant
                  const displayJseiNames = [
                    ...new Set([...jseiPiNames, ...(grant._facultyNames ?? [grant._facultyName])]),
                  ].filter(Boolean);
                  if (displayJseiNames.length === 0) displayJseiNames.push('—');
                  const allPiNames = pis
                    .sort((a, b) => (b.is_contact_pi ? 1 : 0) - (a.is_contact_pi ? 1 : 0))
                    .map((pi) => titleCase(pi.full_name));
                  const startYear = grant.project_start_date?.slice(0, 4);
                  const endYear = grant.project_end_date?.slice(0, 4);
                  const amount = formatCurrency(grant.award_amount);
                  return (
                    <div key={i} className="rounded-xl border border-mist bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-sea/30 hover:shadow-lift">
                      <div className="flex items-start gap-6">
                        <div className="w-36 shrink-0 border-r border-mist pr-6">
                          {displayJseiNames.map((name, j) => (
                            <p key={j} className="font-display font-semibold text-sea-600 leading-tight">{name}</p>
                          ))}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-ink mb-1 leading-snug">
                            {grant.project_title}
                          </h3>
                          {allPiNames.length > 0 && (
                            <p className="mb-1 text-sm text-ink-soft">{allPiNames.join(', ')}</p>
                          )}
                          {amount && (
                            <p className="mb-2 font-mono text-sm font-semibold text-ink">{amount}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded bg-sea/10 px-2 py-0.5 font-mono text-xs font-semibold text-sea-600">
                              {grant.activity_code}
                            </span>
                            {grant.agency_ic_admin?.abbreviation && (
                              <span className="rounded bg-ink/5 px-2 py-0.5 text-xs text-muted">
                                {grant.agency_ic_admin.abbreviation}
                              </span>
                            )}
                            {startYear && endYear && (
                              <span className="text-xs text-muted">{startYear}–{endYear}</span>
                            )}
                          </div>
                        </div>
                        {grant.project_detail_url && (
                          <a
                            href={grant.project_detail_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${grant.project_title} on NIH Reporter`}
                            className="shrink-0 whitespace-nowrap text-sm font-medium text-sea transition-colors hover:text-gold-deep"
                          >
                            NIH Reporter →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }
                const grant = entry.data;
                return (
                  <div key={i} className="rounded-xl border border-mist bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-sea/30 hover:shadow-lift">
                    <div className="flex items-start gap-6">
                      <div className="w-36 shrink-0 border-r border-mist pr-6">
                        <p className="font-display font-semibold text-sea-600 leading-tight">{grant._facultyName}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-ink mb-1 leading-snug">
                          {grant.title ?? '—'}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {grant.funder && (
                            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                              {grant.funder}
                            </span>
                          )}
                          {grant.grantNumbers.length > 0 && (
                            <span className="rounded bg-ink/5 px-2 py-0.5 font-mono text-xs text-muted">
                              {grant.grantNumbers[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      {grant.url && (
                        <a
                          href={grant.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 whitespace-nowrap text-sm font-medium text-sea transition-colors hover:text-gold-deep"
                        >
                          View grant →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}

        {sortedYears.length === 0 && (
          <p className="py-16 text-center italic text-muted">
            No new or renewed grants found.
          </p>
        )}

        {orcidAwards.length > 0 && (
          <Reveal className="mt-16">
            <div className="mb-1 flex items-center gap-4 border-b border-mist pb-3">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Awards &amp; Fellowships
              </h2>
            </div>
            <p className="mb-6 mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Prizes, fellowships, and named awards · sourced from ORCID
            </p>
            <div className="space-y-4">
              {orcidAwards.map((award, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-mist bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-sea/30 hover:shadow-lift"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-36 shrink-0 border-r border-gray-100 pr-6">
                      <p className="font-display font-semibold text-sea-600 leading-tight">{award._facultyName}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-ink mb-1 leading-snug">
                        {award.title ?? '—'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {award.funder && (
                          <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                            {award.funder}
                          </span>
                        )}
                        {award.startYear && (
                          <span className="text-xs text-muted">
                            {award.startYear}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
      </main>

      <Footer />
    </div>
  );
}
