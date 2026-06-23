import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { facultyData } from '../data/faculty';

const CUTOFF_YEAR = new Date().getFullYear() - 5;

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

async function fetchPublications(orcid) {
  try {
    // Step 1: fetch all summaries to filter by year before pulling full records
    const summaryRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!summaryRes.ok) return [];
    const summaryData = await summaryRes.json();

    const recentGroups = (summaryData.group || []).filter((group) => {
      const year = parseInt(
        group['work-summary']?.[0]?.['publication-date']?.year?.value ?? '0'
      );
      return year >= CUTOFF_YEAR;
    });
    if (recentGroups.length === 0) return [];

    // Step 2: batch fetch full works (max 100 per request) to get contributor data
    const putCodes = recentGroups.map((g) => g['work-summary'][0]['put-code']);
    const chunks = chunkArray(putCodes, 100);

    const bulkItems = [];
    for (const chunk of chunks) {
      const fullRes = await fetch(
        `https://pub.orcid.org/v3.0/${orcid}/works/${chunk.join(',')}`,
        {
          headers: { Accept: 'application/json' },
          next: { revalidate: 86400 },
        }
      );
      if (!fullRes.ok) continue;
      const fullData = await fullRes.json();
      bulkItems.push(...(fullData.bulk || []));
    }

    return bulkItems
      .map((item) => {
        const work = item.work;
        const authors = (work?.contributors?.contributor || [])
          .filter((c) => c['contributor-attributes']?.['contributor-role'] === 'author')
          .map((c) => c['credit-name']?.value)
          .filter(Boolean);

        const doiEntry = (work?.['external-ids']?.['external-id'] || []).find(
          (id) => id['external-id-type'] === 'doi'
        );

        return {
          title: work?.title?.title?.value ?? '',
          journal: work?.['journal-title']?.value ?? '',
          year: work?.['publication-date']?.year?.value ?? '',
          month: work?.['publication-date']?.month?.value ?? '00',
          doi: doiEntry?.['external-id-value'] ?? null,
          type: work?.type ?? '',
          authors,
        };
      })
      .filter((p) => p.title);
  } catch {
    return [];
  }
}

export default async function PublicationsPage() {
  const facultyWithOrcid = facultyData.filter((f) => f.orcid && !f.emeritus);

  const allPublications = (
    await Promise.all(facultyWithOrcid.map((f) => fetchPublications(f.orcid)))
  ).flat();

  // Deduplicate by DOI (handles co-authored papers appearing via multiple faculty ORCIDs)
  const seen = new Set();
  const unique = allPublications.filter((pub) => {
    const key = pub.doi ?? pub.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.sort((a, b) => {
    const yearDiff = (b.year || '0').localeCompare(a.year || '0');
    if (yearDiff !== 0) return yearDiff;
    return (b.month || '00').localeCompare(a.month || '00');
  });

  const TYPE_LABELS = {
    preprint: 'Preprint',
    'conference-paper': 'Conference Paper',
    'book-chapter': 'Book Chapter',
    book: 'Book',
    'data-set': 'Dataset',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero
        title="Publications"
        subtitle="JSEI Research Output"
        description={`Publications from Jules Stein Eye Institute faculty, ${CUTOFF_YEAR}–present`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-400 text-sm mb-8">
          {unique.length} publication{unique.length !== 1 ? 's' : ''} · sourced from ORCID · refreshed daily
        </p>

        {Object.entries(
          unique.reduce((acc, pub) => {
            const y = pub.year || 'Unknown';
            if (!acc[y]) acc[y] = [];
            acc[y].push(pub);
            return acc;
          }, {})
        )
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([year, pubs]) => (
            <div key={year} className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {year}
              </h2>
              <div className="space-y-4">
                {pubs.map((pub, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                    {pub.title}
                  </h3>
                  {pub.authors.length > 0 && (
                    <p className="text-gray-700 text-sm mb-1">{pub.authors.join(', ')}</p>
                  )}
                  <p className="text-gray-500 text-sm">
                    {pub.journal && <span className="italic">{pub.journal}</span>}
                    {pub.journal && pub.year && ' · '}
                    {pub.year}
                    {TYPE_LABELS[pub.type] && (
                      <span className="ml-2 inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                        {TYPE_LABELS[pub.type]}
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
            </div>
          ))}

        {unique.length === 0 && (
          <p className="text-gray-500 italic text-center py-16">
            No publications found for the selected period.
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
