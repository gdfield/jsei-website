import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/brecha',
  title: "Nicholas Brecha Laboratory",
  description: "The Brecha lab studies retinal neural circuits, focusing on neurotransmitter systems, inhibitory circuits, and neuromodulation in retinal signal processing.",
  image: "/images/faculty/brecha.jpg",
  imageAlt: "Dr. Nicholas Brecha",
});

export default function BrechaPage() {
 // Checked against PubMed, October 2026. Earlier entries here could not be
  // found in PubMed and were replaced.
  const publications = [
    {
      title: "Vesicular Release of GABA by Mammalian Horizontal Cells Mediates Inhibitory Output to Photoreceptors.",
      authors: "Hirano AA, Vuong HE, Kornmann HL, Schietroma C, Stella SL, Barnes S, Brecha NC",
      journal: "Frontiers in Cellular Neuroscience",
      year: "2020",
      doi: "https://doi.org/10.3389/fncel.2020.600777", // PMID 33335476
    },
    {
      title: "Horizontal Cell Feedback to Cone Photoreceptors in Mammalian Retina: Novel Insights From the GABA-pH Hybrid Model.",
      authors: "Barnes S, Grove JCR, McHugh CF, Hirano AA, Brecha NC",
      journal: "Frontiers in Cellular Neuroscience",
      year: "2020",
      doi: "https://doi.org/10.3389/fncel.2020.595064", // PMID 33328894
    },
    {
      title: "Multiple cell types form the VIP amacrine cell population.",
      authors: "Pérez de Sevilla Müller L, Solomon A, Sheets K, Hapukino H, Rodriguez AR, Brecha NC",
      journal: "Journal of Comparative Neurology",
      year: "2019",
      doi: "https://doi.org/10.1002/cne.24234", // PMID 28472856
    },
    {
      title: "Prox1 Is a Marker for AII Amacrine Cells in the Mouse Retina.",
      authors: "Pérez de Sevilla Müller L, Azar SS, de Los Santos J, Brecha NC",
      journal: "Frontiers in Neuroanatomy",
      year: "2017",
      doi: "https://doi.org/10.3389/fnana.2017.00039", // PMID 28529477
    },
  ];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nicholas Brecha",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/brecha",
  "description": "Dr. Brecha studies the organization and function of neural circuits in the retina, focusing on neurotransmitter systems and their role in retinal signal processing.",
  "knowsAbout": [
    "Visual Neuroscience",
    "Retinal Neurobiology",
    "Retinal Biology"
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
       image="/images/laboratory-banners/radu.jpg"
       position="center 10%"
       title="UNDER CONSTRUCTION"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <LabProfile
         photo="/images/faculty/brecha.jpg"
         alt="Dr. Nicholas Brecha"
         name="Nicholas C. Brecha, Ph.D."
         titles={[
           "Professor",
           "Departments of Neurobiology, Medicine and Ophthalmology",
           "Jules Stein Eye Institute",
         ]}
         links={[
           { kind: "profile", href: "https://profiles.ucla.edu/nicholas.brecha", label: "Faculty profile" },
         ]}
       >
           <p className="text-ink-soft">
             The Brecha laboratory studies the organization and function of neural circuits in the retina. Our research focuses on understanding neurotransmitter systems and their role in retinal signal processing, with particular emphasis on inhibitory circuits and neuromodulation.
           </p>
           
           <div className="space-y-3">
             <p className="text-ink font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-ink-soft">
               <li>
                 Neurotransmitter systems in retinal circuits
               </li>
               <li>
                 Organization of GABAergic amacrine cells
               </li>
               <li>
                 Neuropeptide modulation of retinal function
               </li>
               <li>
                 Development and plasticity of retinal circuits
               </li>
               <li>
                 Retinal neurochemistry and synaptic organization
               </li>
             </ul>
           </div>

           <p className="text-ink-soft">
             Our work combines neuroanatomical, neurochemical, and functional approaches to understand how retinal circuits process visual information. These studies provide fundamental insights into retinal organization and function in health and disease.
           </p>
       </LabProfile>

       <LabTrainees lab="brecha" />

       <div className="mt-12">
         <h2 className="text-2xl font-bold text-ink mb-4">Selected Publications</h2>
         <div className="space-y-3">
           {publications.map((pub, index) => (
             <div key={index} className="rounded-xl border border-mist bg-surface p-4 shadow-card transition-shadow hover:shadow-lift">
               <h3 className="text-lg font-bold text-ink mb-2">{pub.title}</h3>
               <p className="text-ink-soft mb-1">{pub.authors}</p>
               <p className="text-muted">
                 {pub.journal} ({pub.year})
               </p>
               <a 
                 href={pub.doi}
                 className="text-sea hover:text-gold-deep text-sm"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 View Publication
               </a>
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