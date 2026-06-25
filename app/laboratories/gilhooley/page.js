import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0003-4109-5336';

async function fetchRecentPublications(orcid, limit = 10) {
  try {
    const summaryRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!summaryRes.ok) return [];
    const summaryData = await summaryRes.json();

    const sorted = (summaryData.group || [])
      .map((g) => ({
        putCode: g['work-summary'][0]['put-code'],
        year: parseInt(g['work-summary'][0]['publication-date']?.year?.value ?? '0'),
        month: parseInt(g['work-summary'][0]['publication-date']?.month?.value ?? '0'),
      }))
      .sort((a, b) => b.year - a.year || b.month - a.month)
      .slice(0, limit * 2 + 5);

    if (sorted.length === 0) return [];

    const putCodes = sorted.map((s) => s.putCode);
    const fullRes = await fetch(
      `https://pub.orcid.org/v3.0/${orcid}/works/${putCodes.join(',')}`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 86400 } }
    );
    if (!fullRes.ok) return [];
    const fullData = await fullRes.json();

    const pubs = (fullData.bulk || [])
      .map((item) => {
        const work = item.work;
        const authors = (work?.contributors?.contributor || [])
          .filter((c) => { const role = c['contributor-attributes']?.['contributor-role']; return !role || role === 'author'; })
          .map((c) => c['credit-name']?.value)
          .filter(Boolean);
        const doiEntry = (work?.['external-ids']?.['external-id'] || [])
          .find((id) => id['external-id-type'] === 'doi');
        return {
          title: work?.title?.title?.value ?? '',
          journal: work?.['journal-title']?.value ?? '',
          year: work?.['publication-date']?.year?.value ?? '',
          doi: doiEntry?.['external-id-value'] ?? null,
          authors,
        };
      })
      .filter((p) => {
        if (!p.title) return false;
        const journal = p.journal.toLowerCase();
        if (journal.includes('biorxiv') || journal.includes('arxiv')) return false;
        if (p.doi && /^10\.(1101|48550)\//.test(p.doi)) return false;
        return true;
      })
      .sort((a, b) => (b.year || '0').localeCompare(a.year || '0'))
      .slice(0, limit);

    await Promise.all(
      pubs
        .filter((p) => (!p.journal || p.authors.length === 0) && p.doi)
        .map(async (p) => {
          try {
            const r = await fetch(`https://api.crossref.org/works/${encodeURIComponent(p.doi)}`, {
              headers: { 'User-Agent': 'JSEI-Website/1.0 (mailto:gregfield@ucla.edu)' },
              next: { revalidate: 86400 },
            });
            if (!r.ok) return;
            const data = await r.json();
            const msg = data?.message;
            if (!p.journal) {
              const containerTitle = msg?.['container-title']?.[0];
              if (containerTitle) p.journal = containerTitle;
            }
            if (p.authors.length === 0 && msg?.author) {
              p.authors = msg.author
                .map((a) => [a.given, a.family].filter(Boolean).join(' '))
                .filter(Boolean);
            }
          } catch {}
        })
    );

    return pubs;
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'Michael J Gilhooley Laboratory',
  description: "Dr. Gilhooley's laboratory focuses on intrinsically photosensitive retinal ganglion cells (ipRGCs) in the context of mitochondrial optic neuropathies su...",
};

export default async function GilhooleyPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Michael J Gilhooley",
  "jobTitle": "Assistant Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/gilhooley",
  "description": "Dr. Gilhooley's laboratory focuses on intrinsically photosensitive retinal ganglion cells (ipRGCs) in the context of mitochondrial optic neuropathies such as Leber Hereditary Optic Neuropathy (LHON) and Dominant Optic Atrophy (DOA).",
  "knowsAbout": [
    "Mitochondrial Optic Neuropathies",
    "ipRGC Biology",
    "Visual Neuroscience",
    "Neuroprotection"
  ],
  "worksFor": {
    "@type": "CollegeOrUniversity",
    "name": "University of California, Los Angeles",
    "alternateName": "UCLA"
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Navbar />
      <main id="main-content">
      <Hero
        title="Gilhooley Laboratory"
        subtitle="Mitochondrial Optic Neuropathies & ipRGC Biology"
        description="Understanding intrinsically photosensitive retinal ganglion cells' (ipRGCs) resistance to disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img
              src="/images/faculty/gilhooley.jpg"
              alt="Dr. Michael Gilhooley"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Michael J Gilhooley MD PhD</h3>
              <p className="text-gray-600">Assistant Professor in Residence</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <p className="text-gray-600">University of California, Los Angeles</p>
              <div className="flex flex-col space-y-2 pt-2">
                <a
                  href="https://profiles.ucla.edu/michael.gilhooley"
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <a
                  href="https://www.uclahealth.org/providers/michael-gilhooley"
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clinic Profile
                </a>
                <a
                  href="https://www.ncbi.nlm.nih.gov/myncbi/michael.gilhooley.1/bibliography/public/"
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publications
                </a>
                <a
                  href={`https://orcid.org/${FACULTY_ORCID}`}
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ORCID Profile
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Research in our lab centers on the intrinsically photosensitive retinal ganglion
              cells of the optic nerve (ipRGCs) and the fascinating protein that renders them
              sensitive to light (melanopsin). We are particularly interested in defining the
              mechanisms by which ipRGCs survive in optic nerve disease, in some cases long after
              vision is lost as more conventional types of retinal ganglion cell die.
            </p>
            <p className="text-gray-800">
              This survival is particularly notable in the inherited optic neuropathies —{' '}
              <em>Leber Hereditary Optic Neuropathy</em> (LHON) and{' '}
              <em>Dominant Optic Atrophy (DOA)</em>, caused by mutations in genes central to
              mitochondrial function (such as <em>OPA1</em> in DOA). Uncovering why ipRGCs are
              so resilient to mitochondrial dysfunction in these eye diseases is essential not only
              to develop novel treatments to protect sight, but potentially in more common forms
              of neurodegeneration where mitochondrial dysfunction is implicated.
            </p>
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Why are ipRGCs selectively resistant to degeneration in inherited optic neuropathies?</li>
                <li>What role does melanopsin signaling play in conferring neuroprotection?</li>
                <li>Can the survival mechanisms of ipRGCs be harnessed to protect conventional retinal ganglion cells from disease?</li>
                <li>How does ipRGC biology differ across disease states such as OPA1 and LHON?</li>
              </ul>
            </div>
            <p className="text-gray-800">
              Dr. Gilhooley combines his clinical expertise in inherited optic neuropathies with
              basic science investigation to translate findings from ipRGC biology toward
              neuroprotective therapies for patients.
            </p>
          </div>
        </div>

        {publications.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Publications</h2>
            <div className="space-y-3">
                  {publications.map((pub, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
        {pub.authors.length > 0 && (
          <p className="text-gray-700 mb-1">{pub.authors.join(', ')}</p>
        )}
        <p className="text-gray-600">
          {pub.journal}{pub.journal && pub.year ? ` (${pub.year})` : pub.year}
        </p>
        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            className="text-blue-600 hover:text-blue-800 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Publication
          </a>
        )}
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
