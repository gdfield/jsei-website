import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-9813-0342';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/fain',
  title: "Gordon Fain Laboratory",
  description: "Dr. Fain studies the biophysical mechanisms of photoreceptor function and how photoreceptors respond and adapt to light in normal vision and retinal disease.",
  image: "/images/faculty/fain.jpg",
  imageAlt: "Dr. Gordon Fain",
});

export default async function FainPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Fain' });

 
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gordon Fain",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/fain",
  "description": "Dr. Fain's research focuses on the biophysical mechanisms of photoreceptor function and adaptation, providing fundamental insights into how photoreceptors respond to light and adapt to different lighting conditions.",
  "knowsAbout": [
    "Photoreceptor Physiology",
    "Retinal Biology",
    "Visual Neuroscience"
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
       title="Gordon Fain Laboratory"
       subtitle="Photoreceptor Physiology"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <LabProfile
         photo="/images/faculty/fain.jpg"
         alt="Dr. Gordon Fain"
         name="Gordon L. Fain, Ph.D."
         titles={[
           "Professor",
           "Department of Ophthalmology",
           "Jules Stein Eye Institute",
         ]}
         links={[
           { kind: "email", href: "mailto:gfain@ucla.edu", label: "gfain@ucla.edu" },
           { kind: "profile", href: "https://bioscience.ucla.edu/people/gordon-fain/", label: "Faculty profile" },
           { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
         ]}
       >
           <p className="text-ink-soft">
             The Fain laboratory studies the biophysical mechanisms of photoreceptor function and adaptation. Our research focuses on understanding how photoreceptors respond to light and adapt to different lighting conditions, contributing to both normal vision and retinal disease mechanisms.
           </p>
           
           <div className="space-y-3">
             <p className="text-ink font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-ink-soft">
               <li>
                 Photoreceptor light adaptation mechanisms
               </li>
               <li>
                 Calcium regulation in photoreceptor function
               </li>
               <li>
                 Energy metabolism in rods and cones
               </li>
               <li>
                 Mechanisms of photoreceptor survival and degeneration
               </li>
               <li>
                 Cellular basis of light and dark adaptation
               </li>
             </ul>
           </div>

           <p className="text-ink-soft">
             Our work combines electrophysiology and imaging approaches to understand the fundamental mechanisms of photoreceptor function. These studies have provided key insights into how the retina processes visual information and adapts to changing light conditions.
           </p>
       </LabProfile>

       <LabTrainees lab="fain" />

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