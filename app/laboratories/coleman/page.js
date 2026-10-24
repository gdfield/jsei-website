import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-0807-5176';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/coleman',
  title: "Anne Coleman Laboratory",
  description: "Dr. Coleman leads clinical and epidemiological research on population health, health policy, and eye care outcomes, particularly in underserved populations.",
  image: "/images/faculty/coleman.jpg",
  imageAlt: "Dr. Anne Coleman",
});

export default async function ColemanPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Coleman' });

 
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
   <div className="min-h-screen bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
     <Navbar />
      <main id="main-content">
     <LabBanner
       image="/images/laboratory-banners/williams.jpg"
       position="center 20%"
       title="Anne L. Coleman Laboratory"
       subtitle="Vision Health Disparities and Clinical Epidemiology"
       description="Advancing public health approaches to vision care"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <LabProfile
         photo="/images/faculty/coleman.jpg"
         alt="Dr. Anne Coleman"
         name="Anne L. Coleman, M.D., Ph.D."
         titles={[
           "Professor",
           "Bradley R. Straatsma, MD, Endowed Chair in Ophthalmology",
           "Chair: Department of Ophthalmology",
           "Department of Epidemiology",
           "Director: Jules Stein Eye Institute",
         ]}
         links={[
           { kind: "email", href: "mailto:coleman@jsei.ucla.edu", label: "coleman@jsei.ucla.edu" },
           { kind: "profile", href: "https://profiles.ucla.edu/anne.coleman", label: "Faculty profile" },
           { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
         ]}
       >
           <p className="text-ink-soft">
           Dr. Coleman’s research areas of expertise include ophthalmology, health policy, community-based interventions, health disparities, big data, and behavioral health factors as they relate to ophthalmology, eye health, and vision research.  Dr. Coleman has investigated a number of risk factors and systemic outcomes of age-related eye diseases using multiple population-based studies including the National Health and Nutrition Examination Survey (NHANES), Thessaloniki Eye Study (TES) and Study of Osteoporotic Fractures (SOF).  In 2005-2008 NHANES data, she and collaborators found that an estimated 2.4 million persons in the US have undetected and untreated glaucoma, with a higher burden in minorities and the elderly. Other studies using the NHANES data include the association between atopic disease and glaucoma, association of exercise intensity and glaucoma, and dietary fatty acid intake with glaucoma in the US and the association of e-cigarette use and glaucoma. In the TES, the prevalence of pseudoexfoliation syndrome in Greece was 9% at baseline, and the 12-year incidence was 19.6%. In TES, we also examined prevalence and risk factors for age-related macular degeneration (AMD), and associations between ocular perfusion pressure and glaucoma. In SOF, the progression of AMD was associated with declining vision-specific quality of life, and AMD was a predictor of poor survival in women 80 years and older. Additional AMD risk factors examined in SOF included smoking, alcohol use, and postmenopausal hormonal therapy. As a whole these studies contribute information about the prevalence and incidence of age-related eye diseases in multiple populations worldwide, and associations between lifestyle, systemic factors, and age-related eye diseases.
                      </p>
          

           <p className="text-ink-soft">
           Dr. Coleman was the Principal Investigator for the UCLA Preschool Vision Program (UPVP), funded by a 4.1 million dollar grant from First 5LA. During this five-year program, we screened 90,000 children with the handheld auto-refractometer (Retinomax 3; Righton, Japan) and examined 9,713 of them with a comprehensive eye examination. There were 8,281 pairs of free eyeglasses given for refractive error and referrals were given to specialists for further care if needed. This study found that there is a large proportion of preschoolers with uncorrected refractive errors that have unmet needs in terms of refractive correction, and identified barriers, limitations and challenges for a successful vision screening programs. The study also suggested that the vision screening of preschoolers using the Retinomax machine did lead to the diagnosis and early treatment of uncorrected refractive errors and amblyopia.
                      </p>
       </LabProfile>

       <LabTrainees lab="coleman" />

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