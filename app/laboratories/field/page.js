import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

const FIELD_ORCID = '0000-0001-5942-2679';

async function fetchRecentPublications(orcid, limit = 10) {
  try {
    const summaryRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!summaryRes.ok) return [];
    const summaryData = await summaryRes.json();

    // Fetch more candidates than needed to ensure enough remain after preprint filtering
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
          .filter((c) => c['contributor-attributes']?.['contributor-role'] === 'author')
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
        // bioRxiv DOIs start with 10.1101/, arXiv with 10.48550/
        if (p.doi && /^10\.(1101|48550)\//.test(p.doi)) return false;
        return true;
      })
      .sort((a, b) => (b.year || '0').localeCompare(a.year || '0'))
      .slice(0, limit);

    // Enrich missing journal names from CrossRef using the DOI
    await Promise.all(
      pubs
        .filter((p) => !p.journal && p.doi)
        .map(async (p) => {
          try {
            const r = await fetch(`https://api.crossref.org/works/${encodeURIComponent(p.doi)}`, {
              headers: { 'User-Agent': 'JSEI-Website/1.0 (mailto:gregfield@ucla.edu)' },
              next: { revalidate: 86400 },
            });
            if (!r.ok) return;
            const data = await r.json();
            const containerTitle = data?.message?.['container-title']?.[0];
            if (containerTitle) p.journal = containerTitle;
          } catch { /* leave journal blank if CrossRef fails */ }
        })
    );

    return pubs;
  } catch {
    return [];
  }
}

export default async function FieldPage() {
  const publications = await fetchRecentPublications(FIELD_ORCID, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/field.jpg"
          alt="Sampath Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 60%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">Greg D. Field Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Visual Processing and Retinal Circuits</h2>
          <p className="text-lg md:text-4xl text-center">Understanding neural computation in the retina</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img
              src="/images/faculty/field.jpg"
              alt="Dr. Greg D. Field"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Greg D. Field, Ph.D.</h3>
              <p className="text-gray-600">Associate Professor</p>
              <p className="text-gray-600">Joan and Jerome Snyder Vision Science Chair</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Assistant Director of Research</p>
              <p className="text-gray-600">Director, Live Imaging and Functional Evaluation Core</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
                <a
                  href="mailto:gregfield@ucla.edu"
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gregfield@ucla.edu
                </a>
                <a
                  href="http://www.retinalcircuits.com"
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory Website
                </a>
                <a
                  href="https://www.ncbi.nlm.nih.gov/myncbi/gregory.field.1/bibliography/public/"
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publications
                </a>
                <a
                  href="https://profiles.ucla.edu/greg.field"
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              The Field laboratory investigates how neural circuits in the retina process visual information and adapt to different environmental conditions. Our research combines electrophysiology, imaging, and computational approaches to understand the fundamental principles of retinal computation.
            </p>

            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Neural circuits for motion processing</li>
                <li>Adaptation to different light levels</li>
                <li>Parallel processing in retinal pathways</li>
                <li>Computational models of retinal function</li>
                <li>Visual signal processing and encoding</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Our research aims to understand how the retina performs complex computations and adapts to changing environmental conditions. This work provides insights into both fundamental principles of neural computation and potential therapeutic strategies for vision restoration.
            </p>
          </div>
        </div>

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
