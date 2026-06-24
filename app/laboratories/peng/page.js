import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0002-5689-2779';

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
        if (p.doi && /^10\.(1101|48550)\//.test(p.doi)) return false;
        return true;
      })
      .sort((a, b) => (b.year || '0').localeCompare(a.year || '0'))
      .slice(0, limit);

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
          } catch {}
        })
    );

    return pubs;
  } catch {
    return [];
  }
}

export default async function PengPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content">
      <Hero 
        title="Yi-Rong Peng Laboratory"
        subtitle="Retinal Transcriptomics and Vision Research"
        description="Decoding the molecular mechanisms underlying retinal development, cell-type specificity, and disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/peng.jpg"
              alt="Dr. Yi-Rong Peng"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Yi-Rong Peng, Ph.D.</h3>
              <p className="text-gray-600">Assistant Professor</p>
              <p className="text-gray-600">Departments of Ophthalmology and Neurobiology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:yirongpeng@mednet.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
              yirongpeng@mednet.ucla.edu
              </a>

              <a 
                  href="https://yirongpeng.com" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory website
                </a>
                <a 
                  href="https://profiles.ucla.edu/yirong.peng" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                </div>
                </div>
          </div>

{/* Research Description */}
<div className="w-full md:w-2/3 space-y-6">
  <p className="text-gray-800">
    Cells are the building blocks of complex biological systems, exhibiting remarkable diversity in the visual system. Understanding how cell types form, connect, and degenerate is fundamental to uncover the mechanisms behind blinding diseases. The Peng lab leverages multi-omics approaches–genomics, transcriptomics, and proteomics–to decode genetic programs that define cell-type features, unravel the molecular basis of specialized human vision, and identify key signatures driving degeneration in ocular diseases.
  </p>
  
  <div className="mt-4">
    <h3 className="text-xl font-bold text-gray-900 mb-3">Research Focus Areas:</h3>
    <ul className="list-decimal pl-5 space-y-2 text-gray-800">
      <li>Genetic Regulations of Cell Type Generation and Differentiation</li>
      <li>Molecular Mechanisms of Circuit Formation and Specialization</li>
      <li>Cellular and Synaptic Adaptations During Retinal Degeneration</li>
      <li>Cellular and Circuit Principles of the Aging process in the Visual System</li>
    </ul>
  </div>
  
  <p className="text-gray-800 mt-4">
    The ultimate goal of our research is to provide a fundamental understanding of circuit formation and degeneration in the visual system and to develop therapeutic strategies to prevent or treat vision loss.
  </p>
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
