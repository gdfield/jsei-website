import React from 'react';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0003-2866-7440';

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

export default async function YangPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  return (
    <div className="min-h-screen bg-gray-50">
 <Navbar />
      <main id="main-content">
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/yang.jpg"
          alt="Sampath Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">Xian-Jie Yang Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Retinal Development and Gene Therapy</h2>
          <p className="text-lg md:text-4xl text-center">Uncovering the mechanisms of retinal development and finding new therapeutic approaches</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/yang.png"
              alt="Dr. Xian-Jie Yang"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Xian-Jie Yang, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Director, Molecular Biology and Gene Delivery Core</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:yang@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  yang@jsei.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/xianjie.yang" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <a 
                  href="https://www.ncbi.nlm.nih.gov/myncbi/xian-jie.yang.1/bibliography/public/" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publications
                  </a>

            </div>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Mechanisms Involved in Retinal Development and Repair</h2>
            <p className="text-gray-800">
              Research of the Yang laboratory aims at understanding mechanisms regulating retinal development and maintenance. We study how intrinsic cell signaling events influence progenitor cell proliferation and neuronal fate commitment during retinal neurogenesis, and how exogenously applied growth factors affect neuronal survival under disease conditions. We also use human pluripotent stem cell-derived retinal organoids and neurons to establish disease models for inherited optic neuropathy and to facilitate treatment development.
            </p>
            
            <div>
              <p className="text-gray-900 font-semibold mb-2">I. We are using molecular genetic approaches to addresses mechanisms of neuroprotection:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Which cellular metabolic pathways contribute to neuronal maintenance?</li>
                <li>How does retinal degeneration alter mitochondrial morphology and function?</li>
                <li>What cellular signaling events are triggered by trophic factors to enhance neuronal viability?</li>
                <li>How to elicit retinal intrinsic neuroprotective potential?</li>
              </ul>
              <p className="mt-2 text-gray-800">
                Outcomes of the research will provide much needed insight for ongoing clinical trials aimed at treating retinal degenerative diseases.
              </p>
            </div>

            <div>
              <p className="text-gray-900 font-semibold mb-2">II. We are using stem cell technology and virus-mediated gene delivery to study human retinal development, elucidate disease mechanism of inherited optic neuropathy, and develop effective therapies:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How does neurogenic transcription factors regulate early retinal neuronal fates?</li>
                <li>Does mitochondrial deficiency affect human retinogenesis?</li>
                <li>What are the disease phenotypes of optic neuropathy in stem cell-based models?</li>
                <li>Can viral vector-mediated gene therapy or metabolic modulation attenuate inherited retinal degeneration?</li>
              </ul>
              <p className="mt-2 text-gray-800">
                These studies will provide more efficient methodology to produce human retinal neurons and new knowledge regarding human retinal development. Furthermore, stem cell-based human optic neuropathy disease models will be a valuable testing platform to evaluate the efficacy of novel treatment strategy prior to clinical trials.
              </p>
            </div>
          </div>
        </div>

        {/* Publications Section */}
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

      {/* Footer */}
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