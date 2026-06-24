import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { facultyData } from '../data/faculty';

export const metadata = {
  title: 'Research Funding',
  description:
    'Active NIH grants awarded to Jules Stein Eye Institute faculty at UCLA, supporting research in vision science, retinal disease, cornea, glaucoma, and neuro-ophthalmology.',
};

const CURRENT_YEAR = new Date().getFullYear();
const FISCAL_YEARS = Array.from({ length: 4 }, (_, i) => CURRENT_YEAR - i);

async function fetchGrants(faculty) {
  try {
    const res = await fetch('https://api.reporter.nih.gov/v2/projects/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        criteria: {
          pi_names: [{ last_name: faculty.nihName.lastName, first_name: faculty.nihName.firstName }],
          org_names: ['UNIVERSITY OF CALIFORNIA LOS ANGELES'],
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
      .map((g) => ({ ...g, _facultyName: faculty.name }));
  } catch {
    return [];
  }
}

function formatCurrency(amount) {
  if (!amount) return null;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
  return `$${(amount / 1_000).toFixed(0)}K`;
}

export default async function FundingPage() {
  const facultyWithNih = facultyData.filter((f) => f.nihName && !f.emeritus);

  const allGrants = (
    await Promise.all(facultyWithNih.map((f) => fetchGrants(f)))
  ).flat();

  // Deduplicate by core project number — NIH Reporter has one row per fiscal year
  const seen = new Set();
  const unique = allGrants.filter((g) => {
    const key = g.core_project_num ?? g.project_num;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort by project end date, latest first
  unique.sort(
    (a, b) => new Date(b.project_end_date || 0) - new Date(a.project_end_date || 0)
  );

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
      <Hero
        title="Research Funding"
        subtitle="Active NIH Grants"
        description={`Research funding for Jules Stein Eye Institute faculty, FY${CURRENT_YEAR - 3}–${CURRENT_YEAR}`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-400 text-sm mb-8">
          {unique.length} active grant{unique.length !== 1 ? 's' : ''} · sourced from NIH Reporter · refreshed daily
        </p>

        {FISCAL_YEARS.map((fy) => {
          const grants = unique.filter((g) => g.fiscal_year === fy);
          if (grants.length === 0) return null;
          return (
            <div key={fy} className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {fy}
              </h2>
              <div className="space-y-4">
          {grants.map((grant, i) => {
            const pis = grant.principal_investigators || [];

            // JSEI faculty on this grant, in contact-PI-first order
            const jseiPiNames = pis
              .sort((a, b) => (b.is_contact_pi ? 1 : 0) - (a.is_contact_pi ? 1 : 0))
              .map((pi) => {
                const key = `${pi.last_name?.toLowerCase()}:${pi.first_name?.toLowerCase()}`;
                return facultyByName[key];
              })
              .filter(Boolean);
            const displayJseiNames = jseiPiNames.length > 0 ? jseiPiNames : [grant._facultyName ?? '—'];

            // All PIs for display under the title
            const allPiNames = pis
              .sort((a, b) => (b.is_contact_pi ? 1 : 0) - (a.is_contact_pi ? 1 : 0))
              .map((pi) => titleCase(pi.full_name));

            const startYear = grant.project_start_date?.slice(0, 4);
            const endYear = grant.project_end_date?.slice(0, 4);
            const amount = formatCurrency(grant.award_amount);

            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6">
                  {/* Left: JSEI faculty PI(s) */}
                  <div className="w-36 shrink-0 border-r border-gray-100 pr-6">
                    {displayJseiNames.map((name, j) => (
                      <p key={j} className="font-bold text-blue-700 leading-tight">{name}</p>
                    ))}
                  </div>

                  {/* Middle: title, all PIs, amount, badges */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                      {grant.project_title}
                    </h3>
                    {allPiNames.length > 0 && (
                      <p className="text-gray-600 text-sm mb-1">{allPiNames.join(', ')}</p>
                    )}
                    {amount && (
                      <p className="text-gray-800 font-medium text-sm mb-2">{amount} · FY{grant.fiscal_year}</p>
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

                  {/* Right: NIH Reporter link */}
                  {grant.project_detail_url && (
                    <a
                      href={grant.project_detail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                    >
                      NIH Reporter →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
              </div>
            </div>
          );
        })}

        {unique.length === 0 && (
          <p className="text-gray-500 italic text-center py-16">
            No active grants found.
          </p>
        )}
      </div>

      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}
