import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-7758-3932';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/williams',
  title: "David Williams Laboratory",
  description: "The Williams lab studies dynamic cellular events in photoreceptor and RPE cells to understand their basic biology and the processes behind retinal degeneration.",
  image: "/images/faculty/williams.jpg",
  imageAlt: "Dr. David Williams",
});

export default async function WilliamsPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Williams' });

 
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
   <div className="min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
 <Navbar />
      <main id="main-content">
      <LabBanner
        image="/images/laboratory-banners/williams.jpg"
        position="center 20%"
        title="David Williams Laboratory"
        subtitle="Retinal Cell Biology"
      />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <LabProfile
         photo="/images/faculty/williams.jpg"
         alt="Dr. David Williams"
         name="David S. Williams, Ph.D."
         titles={[
           "Professor",
           "Dolly Green Chair in Ophthalmology",
           "Departments of Ophthalmology and Neurobiology",
           "Director, Microscopy and Image Analysis Core",
           "Jules Stein Eye Institute",
         ]}
         links={[
           { kind: "email", href: "mailto:dswilliams@ucla.edu", label: "dswilliams@ucla.edu" },
           { kind: "profile", href: "https://profiles.ucla.edu/david.williams", label: "Faculty profile" },
           { kind: "lab", href: "https://www.uclahealth.org/eye/photoreceptor-rpe-cell-biology", label: "Laboratory website" },
           { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
         ]}
       >
           <p className="text-ink-soft">
           The Williams laboratory studies dynamic cellular processes in photoreceptor and RPE cells, with the aim of understanding basic cellular functions within these most highly specialized cells. Emphasis is on using advanced microscopy methods, including high-speed live-cell imaging and 3-D electron microscopy. 
                      </p>
           
           <div className="space-y-3">
             <p className="text-ink font-semibold">Current Research Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-ink-soft">
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

           <p className="text-ink-soft">
           By studying fundamental cellular processes that are essential for photoreceptor and RPE cell function, the lab's research is advancing general cell biological principles. It also provides an understanding of how defects in these processes lead to retinal degeneration.  This knowledge is critical for developing treatments for inherited retinal diseases.  
                    </p>
       </LabProfile>

       <LabTrainees lab="williams" />

       <div className="mt-12">
         <h2 className="text-2xl font-bold text-ink mb-4">Recent Publications</h2>
         <div className="space-y-3">
               {publications.map((pub, index) => (
      <div key={index} className="rounded-xl border border-mist bg-surface p-4 shadow-card transition-shadow hover:shadow-lift">
        <h3 className="text-lg font-bold text-ink mb-2">{pub.title}</h3>
        {pub.authors.length > 0 && (
          <p className="text-ink-soft mb-1">{pub.authors.join(', ')}</p>
        )}
        <p className="text-muted">
          {pub.journal}{pub.journal && pub.year ? ` (${pub.year})` : pub.year}
        </p>
        {pub.doi && (
          <a
            href={`https://doi.org/${pub.doi}`}
            className="text-sea hover:text-gold-deep text-sm"
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
     <Footer />
   </div>
 );
}