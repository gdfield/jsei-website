import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { facultyData } from '../data/faculty';

async function fetchGrants(nihName) {
  try {
    const res = await fetch('https://api.reporter.nih.gov/v2/projects/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        criteria: {
          pi_names: [{ last_name: nihName.lastName, first_name: nihName.firstName }],
          org_names: ['UNIVERSITY OF CALIFORNIA LOS ANGELES'],
          is_active: true,
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
    return data.results || [];
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
    await Promise.all(facultyWithNih.map((f) => fetchGrants(f.nihName)))
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero
        title="Research Funding"
        subtitle="Active NIH Grants"
        description="Current research funding for Jules Stein Eye Institute faculty"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-400 text-sm mb-8">
          {unique.length} active grant{unique.length !== 1 ? 's' : ''} · sourced from NIH Reporter · refreshed daily
        </p>

        <div className="space-y-4">
          {unique.map((grant, i) => {
            const pis = (grant.principal_investigators || [])
              .sort((a, b) => (b.is_contact_pi ? 1 : 0) - (a.is_contact_pi ? 1 : 0))
              .map((pi) => pi.full_name
                .split(' ')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(' ')
              )
              .join(', ');

            const startYear = grant.project_start_date?.slice(0, 4);
            const endYear = grant.project_end_date?.slice(0, 4);
            const amount = formatCurrency(grant.award_amount);

            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {grant.activity_code}
                      </span>
                      {grant.agency_ic_admin?.abbreviation && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {grant.agency_ic_admin.abbreviation}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 font-mono">
                        {grant.project_num}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                      {grant.project_title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">{pis}</p>
                    <p className="text-gray-500 text-sm">
                      {startYear && endYear && `${startYear}–${endYear}`}
                      {amount && ` · ${amount} (FY${grant.fiscal_year})`}
                    </p>
                  </div>
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
