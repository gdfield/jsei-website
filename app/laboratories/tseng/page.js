import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = {
  title: 'Victoria Tseng Laboratory',
  description: "Dr. Tseng's research examines risk factors and outcomes for eye diseases from a population-based perspective, focusing on glaucoma risk factors and clin...",
};

export default function FieldPage() {
  const publications = [
    {
      title: "Prevalence and severity of glaucoma in the California Medicare population",
      authors: "Tseng VL, Kitayama K, Yu F, Coleman AL",
      journal: "American Journal of Ophthalmology",
      year: "2024",
      doi: "https://pubmed.ncbi.nlm.nih.gov/37898281/"
    },
    {
      title: "Social vulnerability, prevalence of glaucoma, and incidence of glaucoma surgery in the California Medicare Population",
      authors: "Tseng VL, Kitayama K, Yu F, Pan D, Coleman AL",
      journal: "Ophthalmology Glaucoma",
      year: "2023",
      doi: "https://pubmed.ncbi.nlm.nih.gov/37211091/"
    },
    {
      title: "Disparities in vision health and eye care",
      authors: "Elam AR, Tseng VL, Rodriguez TM, Mike EV, Warren AK, Coleman AL",
      journal: "Ophthalmology",
      year: "2022",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36058735/"
    },
    {
      title: "Association between dietary salt intake and open and glaucoma in the Thessaloniki Eye Study",
      authors: "Tseng VL, Topouzis F, Yu F, Keskini C, Pappas T, Founti P, Anastasopoulos E, Harris A, Wilson MR, Coleman AL",
      journal: "Journal of Glaucoma",
      year: "2022",
      doi: "https://pubmed.ncbi.nlm.nih.gov/35474047/"
    },
    {
      title: "Racial and ethnic differences in the prevalence and treatment patterns for neovascular glaucoma in the American Academy of Ophthalmology IRIS Registry",
      authors: "Tseng VL, Pan D, Kitayama K, Yu F, Coleman AL",
      journal: "Ophthalmology Glaucoma",
      year: "2024",
      doi: "https://pubmed.ncbi.nlm.nih.gov/39032697/"
    }
  ];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Victoria Tseng",
  "jobTitle": "Assistant Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/tseng",
  "description": "Dr. Tseng's research examines risk factors and outcomes for eye diseases from a population-based perspective, focusing on glaucoma risk factors and clinical and surgical quality of glaucoma care.",
  "knowsAbout": [
    "Epidemiology",
    "Glaucoma",
    "Population Health",
    "Bioinformatics"
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
        title="Victoria Tseng Laboratory"
        subtitle="Epidemiology and Public Health in Ophthalmology"
        description="Risk factors and outcomes for eye diseases from a population-based perspective"
      />
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/tseng.jpg"
          alt="Dr. Victoria Tseng"
          name="Victoria Tseng M.D., Ph.D."
          titles={[
            "Assistant Professor",
            "Joan and Jerome Snyder Chair in Ophthalmology",
            "Department of Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:vtseng@mednet.ucla.edu", label: "vtseng@mednet.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/victoria.tseng", label: "Faculty profile" },
          ]}
        >
            <p className="text-ink-soft">
            Dr. Tseng is an Assistant Professor in Residence in the UCLA Department of Ophthalmology. 
            Her goal is to become an independent clinician-scientist focused on improving the quality 
            of glaucoma care in the United States. Specifically, Dr. Tseng focuses on leveraging data 
            to develop deeper understanding of individual and structural-level factors that influence
             glaucoma risk, management, and outcomes, and to use these findings to design targeted
              interventions to improve the quality of glaucoma care. To build a strong epidemiologic
               research foundation fully integrated with ophthalmology, Dr. Tseng completed training
                in the EyeSTAR program at UCLA, during which she completed a PhD in epidemiology at the UCLA Fielding
                 School of Public Health under the mentorship of Dr. Anne Coleman along with ophthalmology residency at
                  the UCLA Stein Eye Institute. During this time, she gained in-depth experience working with large datasets,
                   with a PhD dissertation focused on cataract surgery outcomes, and also performed several observational studies
                    of risk factors for glaucoma. Several of Dr. Tseng's early career research initiatives focused on
                     demographic and social factors as they relate to glaucoma care. She was a member of the White Paper 
                     Sub Task Force of the American Academy of Ophthalmology Task Force for Disparities in Eye Care, during 
                     which she performed a comprehensive review of glaucoma care disparities in the literature. Additionally, 
                     she received an American Glaucoma Society Mentoring for the Advancement of Physician Scientists Award, 
                     Research to Prevent Blindness and American Academy of Ophthalmology Award for IRIS Registry Research, 
                     and Research to Prevent Blindness Career Development Award and to examine various demographic and 
                     socioeconomic factors as they relate to glaucoma care and outcomes. With her future research, Dr. 
                     Tseng aims to continue performing large-scale data-driven studies individual and structural level 
                     factors as they relate to the quality of care for glaucoma and other chronic eye diseases. 
            </p>
        </LabProfile>

        <LabTrainees lab="tseng" />

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