import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { facultyData } from '../data/faculty';

export const metadata = {
  title: 'Research Funding',
  description:
    'Active NIH grants awarded to Jules Stein Eye Institute faculty at UCLA, supporting research in vision science, retinal disease, cornea, glaucoma, and neuro-ophthalmology.',
};

const CURRENT_YEAR = new Date().getFullYear();
const FISCAL_YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

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
        endYear: s['end-date']?.year?.value ?? null,
        grantNumbers,
        url,
      }));
    });
  } catch {
    return [];
  }
}

// NIH Reporter's pi_names search matches on partial first-name substrings
// (e.g. querying "Hui Sun" also returns "Xinghui Sun"), so results must be
// re-validated: same last name, and the NIH first name must start with ours
// to allow full-name vs. nickname mismatches (e.g. "Gregory Darin" vs "Greg").
function piMatchesFaculty(pi, faculty) {
  const piLast = pi.last_name?.toLowerCase() ?? '';
  const piFirst = pi.first_name?.toLowerCase() ?? '';
  const facLast = faculty.nihName.lastName.toLowerCase();
  const facFirst = faculty.nihName.firstName.toLowerCase();
  return piLast === facLast && piFirst.startsWith(facFirst);
}

async function fetchGrants(faculty) {
  try {
    const res = await fetch('https://api.reporter.nih.gov/v2/projects/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        criteria: {
          pi_names: [{ last_name: faculty.nihName.lastName, first_name: faculty.nihName.firstName }],
          fiscal_years: FISCAL_YEARS,
        },
        fields: [
          'ProjectTitle', 'FiscalYear', 'AwardAmount', 'ProjectStartDate',
          'ProjectEndDate', 'AgencyIcAdmin', 'ActivityCode', 'ProjectNum',
          'CoreProjectNum', 'PrincipalInvestigators', 'IsActive', 'ProjectDetailUrl',
        ],
        limit: 100,
      }),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || [])
      .filter((g) => g.award_type !== '5')
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
      if (g.fiscal_year > nihByCore[key].fiscal_year) {
        nihByCore[key] = { ...nihByCore[key], ...g, _facultyNames: nihByCore[key]._facultyNames };
      }
    }
  });
  const unique = Object.values(nihByCore);
  const nihSeen = new Set(Object.keys(nihByCore));

  // Build uppercase set of NIH grant numbers for deduplication against ORCID
  const nihGrantNums = new Set([...nihSeen].map((n) => n.toUpperCase()));

  // Filter ORCID entries: exclude NIH Reporter duplicates, require start year >= 2022, then deduplicate
  const orcidSeen = new Set();
  const orcidUnique = allOrcidFunding.filter((g) => {
    if (g.grantNumbers.some((n) => nihGrantNums.has(n.toUpperCase()))) return false;
    if (!g.startYear || parseInt(g.startYear) < 2022) return false;
    const key = `${g.title}|${g.funder}`;
    if (orcidSeen.has(key)) return false;
    orcidSeen.add(key);
    return true;
  });

  const orcidGrants = orcidUnique.filter((g) => g.type === 'grant');
  const orcidAwards = orcidUnique.filter((g) => g.type !== 'grant');

  // Merge NIH and non-NIH grants into year buckets: NIH keyed by fiscal year, ORCID by start year
  const grantsByYear = {};
  unique
    .filter((g) => g.fiscal_year >= 2022)
    .forEach((g) => {
      const year = String(g.fiscal_year);
      (grantsByYear[year] ??= []).push({ _source: 'nih', data: g });
    });
  orcidGrants.forEach((g) => {
    (grantsByYear[g.startYear] ??= []).push({ _source: 'orcid', data: g });
  });
  const sortedYears = Object.keys(grantsByYear).sort((a, b) => parseInt(b) - parseInt(a));

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content">
      <Hero
        title="Research Funding"
        subtitle="Research Grants &amp; Awards"
        description={`Research funding for Jules Stein Eye Institute faculty, ${CURRENT_YEAR - 4}–${CURRENT_YEAR}`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-400 text-sm mb-8">
          {unique.length} NIH grant{unique.length !== 1 ? 's' : ''} · {orcidGrants.length} non-NIH grant{orcidGrants.length !== 1 ? 's' : ''} · {orcidAwards.length} award{orcidAwards.length !== 1 ? 's' : ''} · sourced from NIH Reporter and ORCID · refreshed daily
        </p>

        {sortedYears.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {year}
            </h2>
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
                    <div key={i} className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-6">
                        <div className="w-36 shrink-0 border-r border-gray-100 pr-6">
                          {displayJseiNames.map((name, j) => (
                            <p key={j} className="font-bold text-blue-700 leading-tight">{name}</p>
                          ))}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                            {grant.project_title}
                          </h3>
                          {allPiNames.length > 0 && (
                            <p className="text-gray-600 text-sm mb-1">{allPiNames.join(', ')}</p>
                          )}
                          {amount && (
                            <p className="text-gray-800 font-medium text-sm mb-2">{amount}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                              {grant.activity_code}
                            </span>
                            {grant.agency_ic_admin?.abbreviation && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {grant.agency_ic_admin.abbreviation}
                              </span>
                            )}
                            {startYear && endYear && (
                              <span className="text-xs text-gray-400">{startYear}–{endYear}</span>
                            )}
                          </div>
                        </div>
                        {grant.project_detail_url && (
                          <a
                            href={grant.project_detail_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${grant.project_title} on NIH Reporter`}
                            className="shrink-0 text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
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
                  <div key={i} className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-6">
                      <div className="w-36 shrink-0 border-r border-gray-100 pr-6">
                        <p className="font-bold text-blue-700 leading-tight">{grant._facultyName}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                          {grant.title ?? '—'}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {grant.funder && (
                            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                              {grant.funder}
                            </span>
                          )}
                          {grant.grantNumbers.length > 0 && (
                            <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
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
                          className="shrink-0 text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                        >
                          View grant →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {sortedYears.length === 0 && (
          <p className="text-gray-500 italic text-center py-16">
            No active grants found.
          </p>
        )}

        {orcidAwards.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-1 pb-2 border-b border-gray-200">
              Awards &amp; Fellowships
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Prizes, fellowships, and named awards · sourced from ORCID
            </p>
            <div className="space-y-4">
              {orcidAwards.map((award, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-36 shrink-0 border-r border-gray-100 pr-6">
                      <p className="font-bold text-blue-700 leading-tight">{award._facultyName}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                        {award.title ?? '—'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {award.funder && (
                          <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                            {award.funder}
                          </span>
                        )}
                        {award.startYear && (
                          <span className="text-xs text-gray-400">
                            {award.startYear}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </main>

      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}
