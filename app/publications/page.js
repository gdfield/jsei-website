import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { facultyData } from '../data/faculty';
import { orcidDate, fetchCrossrefMeta, sortKey, formatDate, isoDate } from '../lib/pubDates';
import { isConferenceItem, isFutureDate } from '../lib/workFilters';
import { pageMeta } from '../lib/seo';

export const metadata = pageMeta({
  path: '/publications',
  title: "Publications",
  description: "Recent publications from Jules Stein Eye Institute faculty at UCLA, covering vision science, retinal research, corneal biology, glaucoma, and ophthalmology.",
});

const CUTOFF_YEAR = new Date().getFullYear() - 5;
// Long consortium author lists are shortened on the page (the full list is at the DOI link).
const MAX_AUTHORS = 10;

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
          date: orcidDate(work?.['publication-date']),
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
  // Use the date each paper was first published (earliest of CrossRef's online
  // and print dates) when it has a DOI; otherwise keep the date from ORCID.
  // Conference abstracts and anything dated after today are left out
  // (app/lib/workFilters.js).
  const crossref = await fetchCrossrefMeta(Array.from(pubMap.values()).map((p) => p.doi));
  const unique = Array.from(pubMap.values())
    .map((p) => {
      const meta = p.doi ? crossref.get(p.doi) : null;
      const date = meta?.date || p.date;
      return { ...p, date, crossrefType: meta?.type ?? '', year: date ? String(date.year) : p.year };
    })
    .filter((p) => !p.date || p.date.year >= CUTOFF_YEAR)
    .filter((p) => !isConferenceItem(p) && !isFutureDate(p.date));

  // Newest first. Papers known only to the month or year sort after fully
  // dated papers from the same month or year.
  unique.sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)) || a.title.localeCompare(b.title));

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
    'book-chapter': 'Book Chapter',
    book: 'Book',
    'data-set': 'Dataset',
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
      <Hero
        eyebrow="Publications"
        title="The latest from the bench"
        subtitle="JSEI research output"
        description={`Peer-reviewed work from institute faculty, ${CUTOFF_YEAR}–present, newest first.`}
        compact
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.14em] text-muted">
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
            // Plain sections (no scroll animation) so every year renders immediately;
            // content-visibility lets the browser skip laying out off-screen years.
            <section key={year} className="mb-14 [content-visibility:auto] [contain-intrinsic-size:auto_2000px]">
              <div className="mb-5 flex items-center gap-4">
                <h2 className="font-display text-2xl font-semibold text-ink">{year}</h2>
                <span className="h-px flex-1 bg-mist" aria-hidden="true" />
                <span className="font-mono text-xs text-muted">{pubs.length}</span>
              </div>
              <div className="space-y-4">
                {pubs.map((pub, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-mist bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-sea/30 hover:shadow-lift"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                      {/* Left: JSEI lab(s) */}
                      <div className="shrink-0 sm:w-44 sm:border-r sm:border-mist sm:pr-6">
                        {(() => {
                          const lastNames = pub._jseiAuthors.map((n) => n.split(' ').at(-1));
                          const label = lastNames.length === 1
                            ? `${lastNames[0]} Lab`
                            : `${lastNames.slice(0, -1).join(', ')} and ${lastNames.at(-1)} Labs`;
                          return <p className="font-display font-semibold text-sea-600 leading-tight">{label}</p>;
                        })()}
                      </div>

                      {/* Middle: title, authors, journal */}
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 font-semibold leading-snug text-ink">
                          {pub.title}
                        </h3>
                        {pub.authors.length > 0 && (
                          <p className="mb-1 text-sm text-ink-soft">
                            {pub.authors.length > MAX_AUTHORS
                              ? `${pub.authors.slice(0, MAX_AUTHORS).join(', ')}, et al. (${pub.authors.length} authors)`
                              : pub.authors.join(', ')}
                          </p>
                        )}
                        <p className="text-sm text-muted">
                          {pub.journal && <span className="italic">{pub.journal}</span>}
                          {pub.journal && pub.date && ' · '}
                          {pub.date ? <time dateTime={isoDate(pub.date)}>{formatDate(pub.date)}</time> : pub.year}
                          {TYPE_LABELS[pub.type] && (
                            <span className="ml-2 inline-block rounded bg-sea/8 px-2 py-0.5 font-mono text-xs text-sea-600">
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
                          aria-label={`View publication: ${pub.title}`}
                          className="group/link inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-sea transition-colors hover:text-gold-deep"
                        >
                          View
                          <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-0.5">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

        {unique.length === 0 && (
          <p className="py-16 text-center italic text-muted">
            No publications found for the selected period.
          </p>
        )}
      </div>
      </main>

      <Footer />
    </div>
  );
}
