import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0002-8208-5698';

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
  title: 'Joel Zylberberg Laboratory',
  description: "Dr. Zylberberg's research combines theoretical and computational approaches to understand how neural circuits process visual information, developing mat...",
};

export default async function ZylberbergPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joel Zylberberg",
  "jobTitle": "Associate Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/zylberberg",
  "description": "Dr. Zylberberg's research combines theoretical and computational approaches to understand how neural circuits process visual information, developing mathematical models of visual processing and applying machine learning to neural data.",
  "knowsAbout": [
    "Computational Neuroscience",
    "Visual Neuroscience",
    "Machine Learning",
    "Neural Circuits"
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
        title="Joel Zylberberg Laboratory"
        subtitle="Computational Neuroscience and Machine Learning"
        description="Advancing our understanding of brain function and vision with machine learning and computational models"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/zylberberg.jpg"
              alt="Dr. Joel Zylberberg"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Joel Zylberberg, Ph.D.</h3>
              <p className="text-gray-600">Associate Professor</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <a 
                  href="mailto:joelzy@ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  joelzy@ucla.edu
                </a>
                <br />
                <a 
                href="https://profiles.ucla.edu/joel.zylberberg" 
                className="text-blue-600 hover:text-blue-800 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Faculty Profile
              </a>
              <br />
              <a 
                href="http://www.jzlab.org" 
                className="text-blue-600 hover:text-blue-800 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Laboratory Website
              </a>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Joel Zylberberg is a computational neuroscientist whose work bridges neuroscience and machine learning.
              His research focuses on understanding how the brain processes information about the world and how those representations
              are learned. By combining computational modeling with experimental data, Dr. Zylberberg aims to develop
              bio-inspired machine learning algorithms and improve our understanding of sensory systems like the retina and visual cortex.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How does the brain encode and process sensory information?</li>
                <li>What are the neural mechanisms underlying robust information propagation in noisy circuits?</li>
                <li>How can bio-inspired algorithms improve artificial intelligence systems?</li>
                <li>What are the roles of synaptic plasticity in shaping neural representations?</li>
                <li>How can computational models of vision aid in developing retinal prosthetics?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Zylberberg's lab employs cutting-edge techniques in computational neuroscience,
              including deep learning frameworks and information theory, to uncover the principles
              of brain function and apply them to real-world problems in AI and medicine.
            </p>
  {/* Research Graphics */}
  <div className="my-6">
    <img
      src="/images/research/zylberberg.png"
      alt="Membrane receptor research diagrams showing protein structures, molecular pathways, and experimental results"
      className="w-full rounded-lg shadow-md"
    />
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
