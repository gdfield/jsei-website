import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-9082-4796';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/aldave',
  title: "Anthony Aldave Laboratory",
  description: "Dr. Aldave develops gene- and cell-based therapies for corneal dystrophies, combining clinical genetics with molecular techniques to find their genetic causes.",
  image: "/images/faculty/aldave.jpg",
  imageAlt: "Dr. Anthony Aldave",
});

export default async function AldavePage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Aldave' });

  
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
   <div className="min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
     <Navbar />
      <main id="main-content">
     <LabBanner
       image="/images/laboratory-banners/field.jpg"
       position="center 60%"
       title="Anthony J. Aldave Laboratory"
       subtitle="Corneal Dystrophies and Gene Therapy"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <LabProfile
         photo="/images/faculty/aldave.jpg"
         alt="Dr. Anthony Aldave"
         name="Anthony J. Aldave, M.D."
         titles={[
           "Professor and Vice Chair",
           "Bartly J. Mondino M.D., Chair in Ophthalmology",
           "Department of Ophthalmology",
           "Jules Stein Eye Institute",
         ]}
         links={[
           { kind: "email", href: "mailto:aldave@jsei.ucla.edu", label: "aldave@jsei.ucla.edu" },
           { kind: "profile", href: "https://profiles.ucla.edu/anthony.aldave", label: "Faculty profile" },
           { kind: "lab", href: "https://www.uclahealth.org/departments/eye/research/research-laboratories/cornea-genetics-laboratory", label: "Laboratory website" },
           { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
         ]}
       >
           <div className="space-y-3">
             <h2 className="text-xl font-bold text-ink">Research Areas</h2>
             <p className="text-ink-soft">
               Molecular genetic basis of inherited disorders of the cornea, known as the corneal dystrophies
             </p>
           </div>
           
           <div className="space-y-3">
             <h2 className="text-xl font-bold text-ink">Description</h2>
             <p className="text-ink-soft">
               The Cornea Genetics Laboratory focuses on identifying and characterizing the molecular genetic basis of corneal dystrophies and elucidating the normal and disease biology of corneal endothelial cells.
             </p>
             
             <p className="text-ink-soft">
               The Laboratory employs an array of genetic analysis tools to identify causative mutations associated with inherited corneal disorders and utilizes mouse and cell-based disease models to study the pathomechanisms via which the identified mutations lead to loss of corneal clarity, and thus loss of vision. The identification and elucidation of the genetic basis of the corneal dystrophies has allowed Dr. Aldave and colleagues to develop and test molecular therapeutics approaches in these same cell-based and animal models. In 2023, the Laboratory was selected to participate in the Foundation for the NIH Accelerating Medicines Partnership® (AMP®) Bespoke Gene Therapy Consortium and received funding from the California Institute for Regeneration Medicine to perform preclinical studies of AAV gene therapy for congenital hereditary endothelial dystrophy.
             </p>
             
             <p className="text-ink-soft">
               The Laboratory is also involved in the characterization and optimization of ex vivo expansion of corneal endothelial cells, with the goal of transplanting the cells from one individual to multiple recipients. As it is estimated that worldwide only one donor cornea is available for every 70 that are needed, the use of expanded corneal endothelial cells to restore sight to individuals with corneal endothelial dysfunction, most commonly due to corneal endothelial dystrophies, will transform the current paradigm of one donor cornea restoring sight to only one recipient.
             </p>
           </div>
       </LabProfile>

       <LabTrainees lab="aldave" />

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