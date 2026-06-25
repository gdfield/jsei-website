import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0002-9082-4796';

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
  title: 'Anthony Aldave Laboratory',
  description: "Dr. Aldave's research focuses on the development of novel gene- and cell-based therapies for corneal dystrophies, a group of inherited disorders of the ...",
};

export default async function AldavePage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Anthony Aldave",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/aldave",
  "description": "Dr. Aldave's research focuses on the development of novel gene- and cell-based therapies for corneal dystrophies, a group of inherited disorders of the cornea.",
  "knowsAbout": [
    "Eye Surface and Lens",
    "Corneal Dystrophies",
    "Gene Therapy",
    "Therapeutics and Regeneration"
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
       title="Anthony J. Aldave Laboratory"
       subtitle="Corneal Dystrophies and Gene Therapy"
       description=""
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/aldave.jpg"
             alt="Dr. Anthony Aldave"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Anthony J. Aldave, M.D.</h3>
             <p className="text-gray-600">Professor and Vice Chair</p>
             <p className="text-gray-600">Bartly J. Mondino M.D., Chair in Ophthalmology </p>
             <p className="text-gray-600">Department of Ophthalmology</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <a 
                  href="mailto:aldave@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aldave@jsei.ucla.edu
                </a>
                <br />
                <a 
                  href="https://profiles.ucla.edu/anthony.aldave" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <br />
                <a 
                  href="https://www.uclahealth.org/departments/eye/research/research-laboratories/cornea-genetics-laboratory" 
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
           <div className="space-y-3">
             <h2 className="text-xl font-bold text-gray-900">Research Areas</h2>
             <p className="text-gray-800">
               Molecular genetic basis of inherited disorders of the cornea, known as the corneal dystrophies
             </p>
           </div>
           
           <div className="space-y-3">
             <h2 className="text-xl font-bold text-gray-900">Description</h2>
             <p className="text-gray-800">
               The Cornea Genetics Laboratory focuses on identifying and characterizing the molecular genetic basis of corneal dystrophies and elucidating the normal and disease biology of corneal endothelial cells.
             </p>
             
             <p className="text-gray-800">
               The Laboratory employs an array of genetic analysis tools to identify causative mutations associated with inherited corneal disorders and utilizes mouse and cell-based disease models to study the pathomechanisms via which the identified mutations lead to loss of corneal clarity, and thus loss of vision. The identification and elucidation of the genetic basis of the corneal dystrophies has allowed Dr. Aldave and colleagues to develop and test molecular therapeutics approaches in these same cell-based and animal models. In 2023, the Laboratory was selected to participate in the Foundation for the NIH Accelerating Medicines Partnership® (AMP®) Bespoke Gene Therapy Consortium and received funding from the California Institute for Regeneration Medicine to perform preclinical studies of AAV gene therapy for congenital hereditary endothelial dystrophy.
             </p>
             
             <p className="text-gray-800">
               The Laboratory is also involved in the characterization and optimization of ex vivo expansion of corneal endothelial cells, with the goal of transplanting the cells from one individual to multiple recipients. As it is estimated that worldwide only one donor cornea is available for every 70 that are needed, the use of expanded corneal endothelial cells to restore sight to individuals with corneal endothelial dysfunction, most commonly due to corneal endothelial dystrophies, will transform the current paradigm of one donor cornea restoring sight to only one recipient.
             </p>
           </div>
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