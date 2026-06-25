import React from 'react';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0002-7758-3932';

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
  title: 'David Williams Laboratory',
  description: "The Williams laboratory studies dynamic cellular events in photoreceptor and RPE cells, aiming to understand basic cellular functions within these highl...",
};

export default async function WilliamsPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

 
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "David Williams",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/williams",
  "description": "The Williams laboratory studies dynamic cellular events in photoreceptor and RPE cells, aiming to understand basic cellular functions within these highly specialized cells and processes in retinal degeneration.",
  "knowsAbout": [
    "Retinal Cell Biology",
    "Photoreceptors",
    "RPE",
    "Retinal Degeneration"
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
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/williams.jpg"
          alt="Williams Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">David Williams Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Retinal Cell Biology</h2>
        </div>
      </div>

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/williams.jpg"
             alt="Dr. David Williams"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-1">
             <h3 className="text-xl font-bold text-gray-900">David S. Williams, Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-gray-600">Karl Kirchgessner Foundation Chair in Vision Science </p>
             <p className="text-gray-600">Departments of Ophthalmology and Neurobiology</p>
             <p className="text-gray-600">Director, Microscopy and Image Analysis Core</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             
             <a 
                  href="mailto:dswilliams@ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dswilliams@ucla.edu
                </a>
                <br />
             <a 
                  href="https://profiles.ucla.edu/david.williams" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <br />
                <a 
                  href="https://www.uclahealth.org/eye/photoreceptor-rpe-cell-biology" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   Laboratory Website 
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

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
           The Williams laboratory studies dynamic cellular processes in photoreceptor and RPE cells, with the aim of understanding basic cellular functions within these most highly specialized cells. Emphasis is on using advanced microscopy methods, including high-speed live-cell imaging and 3-D electron microscopy. 
                      </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Current Research Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
               The delivery of opsin to the photoreceptor cilium and membrane shaping to form the disk membranes the photoreceptor outer segment.               </li>
               <li>
               RPE cell biology, especially the motility and interactions of organelles, such as mitochondria, melanosomes, phagosomes and endolysosomes.                </li>
               <li>
               Cell metabolism in relation to RPE cell differentiation. 
                              </li>
               <li>
               Retinal degeneration in Usher syndrome, involving the differentiation of patient-derived iPSCs into retinal cells, studies of MYO7A, and strategies for treatments via gene therapy.
               </li>
               <li>
               Mechanisms of other retinal degenerations, including choroideremia and macular degeneration.  
                            </li>
             </ul>
           </div>

           <p className="text-gray-800">
           By studying fundamental cellular processes that are essential for photoreceptor and RPE cell function, the lab's research is advancing general cell biological principles. It also provides an understanding of how defects in these processes lead to retinal degeneration.  This knowledge is critical for developing treatments for inherited retinal diseases.  
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