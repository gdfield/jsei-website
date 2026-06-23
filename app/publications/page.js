import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { facultyData } from '../data/faculty';

async function fetchPublications(orcid) {
  try {
    const res = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();

    return (data.group || [])
      .map((group) => {
        const summary = group['work-summary']?.[0];
        const doiEntry = (group['external-ids']?.['external-id'] || []).find(
          (id) => id['external-id-type'] === 'doi'
        );
        return {
          title: summary?.title?.title?.value ?? '',
          journal: summary?.['journal-title']?.value ?? '',
          year: summary?.['publication-date']?.year?.value ?? '',
          doi: doiEntry?.['external-id-value'] ?? null,
          type: summary?.type ?? '',
        };
      })
      .filter((p) => p.title)
      .sort((a, b) => (b.year || '').localeCompare(a.year || ''));
  } catch {
    return [];
  }
}

export default async function PublicationsPage() {
  const facultyWithOrcid = facultyData.filter((f) => f.orcid && !f.emeritus);

  const results = await Promise.all(
    facultyWithOrcid.map(async (faculty) => ({
      faculty,
      publications: await fetchPublications(faculty.orcid),
    }))
  );

  const TYPE_LABELS = {
    'journal-article': 'Journal Article',
    preprint: 'Preprint',
    'conference-paper': 'Conference Paper',
    'book-chapter': 'Book Chapter',
    book: 'Book',
    'data-set': 'Dataset',
    other: 'Other',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero
        title="Publications"
        subtitle="JSEI Research Output"
        description="Recent publications from Jules Stein Eye Institute faculty"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {results.map(({ faculty, publications }) => (
          <div key={faculty.name}>
            <div className="flex items-center gap-4 mb-6 pb-3 border-b border-gray-200">
              <img
                src={faculty.profileImage}
                alt={faculty.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{faculty.name}</h2>
                <p className="text-gray-500 text-sm">{faculty.research}</p>
              </div>
              <a
                href={`https://orcid.org/${faculty.orcid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-sm text-green-700 hover:text-green-900 font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.947.947 0 0 1 0-1.894zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.435h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.713-4.097-3.713h-2.222z"/>
                </svg>
                ORCID
              </a>
            </div>

            {publications.length === 0 ? (
              <p className="text-gray-500 italic">No publications found.</p>
            ) : (
              <div className="space-y-3">
                {publications.map((pub, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                          {pub.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {pub.journal && (
                            <span className="italic">{pub.journal}</span>
                          )}
                          {pub.journal && pub.year && ' · '}
                          {pub.year && <span>{pub.year}</span>}
                          {pub.type && pub.type !== 'journal-article' && (
                            <span className="ml-2 inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                              {TYPE_LABELS[pub.type] ?? pub.type}
                            </span>
                          )}
                        </p>
                      </div>
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-sm text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                        >
                          View →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-3 text-xs text-gray-400 text-right">
              {publications.length} publication{publications.length !== 1 ? 's' : ''} · sourced from ORCID
            </p>
          </div>
        ))}
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
