import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-0499-3877';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/deng',
  title: "Sophie Deng Laboratory",
  description: "Dr. Deng studies corneal stem cell biology and regenerative medicine to develop new diagnostics and stem cell-based treatments for corneal disease and injury.",
  image: "/images/faculty/deng.jpg",
  imageAlt: "Dr. Sophie Deng",
});

export default async function DengPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Deng' });

 
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sophie Deng",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/deng",
  "description": "Dr. Deng's research focuses on corneal stem cell biology and regenerative medicine, developing novel diagnostic and therapeutic strategies for corneal diseases.",
  "knowsAbout": [
    "Cornea",
    "Stem Cell Biology",
    "Regenerative Medicine",
    "Eye Surface and Lens"
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
       title="Sophie Deng Laboratory"
       subtitle="Cornea"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <LabProfile
         photo="/images/faculty/deng.jpg"
         alt="Dr. Sophie Deng"
         name="Sophie X. Deng, M.D., Ph.D."
         titles={[
           "Professor",
           "Walton Li Chair in Cornea and Uveitis",
           "Co-Chief, Cornea Division",
           "Vice Chair for Inspiring Excellence",
           "Department of Ophthalmology",
           "Jules Stein Eye Institute",
         ]}
         links={[
           { kind: "profile", href: "https://profiles.ucla.edu/sophie.deng", label: "Faculty profile" },
           { kind: "lab", href: "https://www.uclahealth.org/departments/eye/research/research-laboratories/cornea-biology", label: "Laboratory website" },
           { kind: "pubs", href: "https://www.ncbi.nlm.nih.gov/myncbi/sophie.deng.1/bibliography/public/", label: "Publications" },
           { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
         ]}
       >
           <p className="text-ink-soft">
           The Cornea Biology Laboratory, under Dr. Deng's direction, studies the limbal epithelial stem cells (LSCs) and their microenvironment to elucidate the mechanisms by which these cells and the niche factors aid in the regeneration of the corneal surface in patients suffering from limbal stem cell deficiency (LSCD). The role of signaling pathways such as Wnt and Notch in the regulation of LSCs and modulation of these signaling pathways in vitro and in vivo through small molecules is under investigation. 
                      </p>
           
                      <p className="text-ink-soft">
                      Two clinical studies aimed to characterize the cellular changes in the cornea and limbus leading to LSCD and to study the safety and efficacy of LSC transplantation are ongoing. The first study aims to evaluate and validate in vivo parameters using multimodal imaging such as anterior segment optical coherence tomography (AS-OCT) and in vivo confocal microscopy (IVCM) to diagnose and stage LSCD and to assess LSCD treatment outcome. The second clinical study is a Phase I clinical trial to assess the safety, feasibility and efficacy of autologous cultivated LSC therapy in patients suffering from severe or total LSCD (<a href="https://classic.clinicaltrials.gov/ct2/show/NCT03957954" className="text-sea hover:text-gold-deep" target="_blank" rel="noopener noreferrer">more info here</a>).
                                            </p>


           <p className="text-ink-soft">
           Another research project focused on the stromal cell layer of the cornea aims to treat corneal stromal scars with extracellular vesicles (EVs) derived from corneal stromal stem cells (CSSCs), which are multipotent mesenchymal stem cells that regenerate normal corneal stroma and significantly reduce corneal scarring by mediating anti-inflammatory and anti-fibrosis processes. The specific content (cargo) of the EVs and mechanism of action is also under investigation. Pre-clinical research is ongoing to develop an EV-based therapy that could be directly applied to the eye to reduce corneal stromal scarring and improve vision.
                      </p>
       </LabProfile>

       <LabTrainees lab="deng" />

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