import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { facultyData } from '../data/faculty';

const CUTOFF_YEAR = new Date().getFullYear() - 5;

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

async function fetchPublications(faculty) {
  const orcid = faculty.orcid;
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
          _facultyName: faculty.name,
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
    await Promise.all(facultyWithOrcid.map((f) => fetchPublications(f)))
  ).flat();

  // Deduplicate by DOI, merging JSEI author names when the same paper
  // appears in multiple faculty ORCIDs
  const pubMap = new Map();
  allPublications.forEach((pub) => {
    const key = pub.doi ?? pub.title;
    if (pubMap.has(key)) {
      const existing = pubMap.get(key);
      if (!existing._jseiAuthors.includes(pub._facultyName)) {
        existing._jseiAuthors.push(pub._facultyName);
      }
    } else {
      pubMap.set(key, { ...pub, _jseiAuthors: [pub._facultyName] });
    }
  });
  const unique = Array.from(pubMap.values());

  unique.sort((a, b) => {
    const yearDiff = (b.year || '0').localeCompare(a.year || '0');
    if (yearDiff !== 0) return yearDiff;
    return (b.month || '00').localeCompare(a.month || '00');
  });

  // Build last-name lookup across ALL active faculty (not just those with ORCID)
  // so we can detect JSEI co-authors by scanning each paper's author list
  const facultyByLastName = {};
  facultyData.filter((f) => !f.emeritus).forEach((f) => {
    const lastName = f.name.split(' ').at(-1).toLowerCase();
    facultyByLastName[lastName] = f.name;
  });

  // Augment each publication's _jseiAuthors by scanning the author strings
  // for words that match a JSEI faculty last name
  unique.forEach((pub) => {
    const fromAuthors = pub.authors.flatMap((authorStr) =>
      authorStr.split(/[\s,.\-]+/).map((w) => facultyByLastName[w.toLowerCase()]).filter(Boolean)
    );
    const merged = [...new Set([...pub._jseiAuthors, ...fromAuthors])];
    pub._jseiAuthors = merged;
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
                    <div className="flex items-start gap-6">
                      {/* Left: JSEI lab(s) */}
                      <div className="w-44 shrink-0 border-r border-gray-100 pr-6">
                        {(() => {
                          const lastNames = pub._jseiAuthors.map((n) => n.split(' ').at(-1));
                          const label = lastNames.length === 1
                            ? `${lastNames[0]} Lab`
                            : `${lastNames.slice(0, -1).join(', ')} and ${lastNames.at(-1)} Labs`;
                          return <p className="font-bold text-blue-700 leading-tight">{label}</p>;
                        })()}
                      </div>

                      {/* Middle: title, authors, journal */}
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

                      {/* Right: DOI link */}
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
