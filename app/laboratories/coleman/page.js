import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';


const FACULTY_ORCID = '0000-0002-0807-5176';

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
  title: 'Anne Coleman Laboratory',
  description: "Dr. Coleman leads clinical research initiatives focused on population health, health policy, and clinical outcomes in ophthalmology, combining epidemiol...",
};

export default async function ColemanPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10);

 
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Anne Coleman",
  "jobTitle": "Professor and Director",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/coleman",
  "description": "Dr. Coleman leads clinical research initiatives focused on population health, health policy, and clinical outcomes in ophthalmology.",
  "knowsAbout": [
    "Population Health",
    "Glaucoma",
    "Epidemiology",
    "Bioinformatics and Population Health"
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
       title="Anne L. Coleman Laboratory"
       subtitle="Vision Health Disparities and Clinical Epidemiology"
       description="Advancing public health approaches to vision care"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/coleman.jpg"
             alt="Dr. Anne Coleman"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Anne L. Coleman, M.D., Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-gray-600">Bradley R. Straatsma, MD, Endowed Chair in Ophthalmology </p>
             <p className="text-gray-600">Chair: Department of Ophthalmology</p>
             <p className="text-gray-600">Department of Epidemiology</p>
             <p className="text-gray-600">Director: Jules Stein Eye Institute</p>
             <a 
                  href="mailto:coleman@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  coleman@jsei.ucla.edu
                </a>
                <br />
             <a 
                  href="https://profiles.ucla.edu/anne.coleman" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
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
           Dr. Coleman’s research areas of expertise include ophthalmology, health policy, community-based interventions, health disparities, big data, and behavioral health factors as they relate to ophthalmology, eye health, and vision research.  Dr. Coleman has investigated a number of risk factors and systemic outcomes of age-related eye diseases using multiple population-based studies including the National Health and Nutrition Examination Survey (NHANES), Thessaloniki Eye Study (TES) and Study of Osteoporotic Fractures (SOF).  In 2005-2008 NHANES data, she and collaborators found that an estimated 2.4 million persons in the US have undetected and untreated glaucoma, with a higher burden in minorities and the elderly. Other studies using the NHANES data include the association between atopic disease and glaucoma, association of exercise intensity and glaucoma, and dietary fatty acid intake with glaucoma in the US and the association of e-cigarette use and glaucoma. In the TES, the prevalence of pseudoexfoliation syndrome in Greece was 9% at baseline, and the 12-year incidence was 19.6%. In TES, we also examined prevalence and risk factors for age-related macular degeneration (AMD), and associations between ocular perfusion pressure and glaucoma. In SOF, the progression of AMD was associated with declining vision-specific quality of life, and AMD was a predictor of poor survival in women 80 years and older. Additional AMD risk factors examined in SOF included smoking, alcohol use, and postmenopausal hormonal therapy. As a whole these studies contribute information about the prevalence and incidence of age-related eye diseases in multiple populations worldwide, and associations between lifestyle, systemic factors, and age-related eye diseases.
                      </p>
          

           <p className="text-gray-800">
           Dr. Coleman was the Principal Investigator for the UCLA Preschool Vision Program (UPVP), funded by a 4.1 million dollar grant from First 5LA. During this five-year program, we screened 90,000 children with the handheld auto-refractometer (Retinomax 3; Righton, Japan) and examined 9,713 of them with a comprehensive eye examination. There were 8,281 pairs of free eyeglasses given for refractive error and referrals were given to specialists for further care if needed. This study found that there is a large proportion of preschoolers with uncorrected refractive errors that have unmet needs in terms of refractive correction, and identified barriers, limitations and challenges for a successful vision screening programs. The study also suggested that the vision screening of preschoolers using the Retinomax machine did lead to the diagnosis and early treatment of uncorrected refractive errors and amblyopia.
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