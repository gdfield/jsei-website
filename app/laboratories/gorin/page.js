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
  path: '/laboratories/gorin',
  title: "Michael Gorin Laboratory",
  description: "The Gorin lab studies the genetic basis of complex eye diseases, including glaucoma and age-related macular degeneration, to guide personalized treatment.",
  image: "/images/faculty/gorin.jpg",
  imageAlt: "Dr. Michael Gorin",
});

export default function GorinPage() {
  // Checked against PubMed, October 2026. Earlier entries here could not be
  // found in PubMed and were replaced.
  const publications = [
    {
      title: "Safety and Effects of Gildeuretinol Acetate on Retinal Atrophic Lesions in Stargardt Disease: The TEASE-1 Randomized Clinical Trial.",
      authors: "Kay CN, Saad L, DeBartolomeo G, Bressler N, Tsang SH, Stepien K, …, Gorin MB",
      journal: "JAMA Ophthalmology",
      year: "2026",
      doi: "https://doi.org/10.1001/jamaophthalmol.2026.3662", // PMID 42690655
    },
    {
      title: "Assessing Variant Causality and Severity Using Retinal Pigment Epithelial Cells Derived from Stargardt Disease Patients.",
      authors: "Matynia A, Wang J, Kim S, Li Y, Dimashkie A, Jiang Z, …, Gorin MB",
      journal: "Translational Vision Science & Technology",
      year: "2022",
      doi: "https://doi.org/10.1167/tvst.11.3.33", // PMID 35348597
    },
    {
      title: "Assessing the Clinical Utility of Expanded Macular OCTs Using Machine Learning.",
      authors: "Lin AC, Lee CS, Blazes M, Lee AY, Gorin MB",
      journal: "Translational Vision Science & Technology",
      year: "2021",
      doi: "https://doi.org/10.1167/tvst.10.6.32", // PMID 34038502
    },
    {
      title: "Predictive genetics for AMD: Hype and hopes for genetics-based strategies for treatment and prevention.",
      authors: "Gorin MB, daSilva MJ",
      journal: "Experimental Eye Research",
      year: "2020",
      doi: "https://doi.org/10.1016/j.exer.2019.107894", // PMID 31862397
    },
  ];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Michael Gorin",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/gorin",
  "description": "Dr. Gorin's research centers on identifying and understanding genetic factors in inherited eye diseases, particularly age-related macular degeneration and retinal degenerations, combining clinical genetics with molecular biology.",
  "knowsAbout": [
    "Genetics",
    "Age-Related Macular Degeneration",
    "Retinal Degeneration",
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
        image="/images/laboratory-banners/radu.jpg"
        position="center 10%"
        title="UNDER CONSTRUCTION"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/gorin.jpg"
          alt="Dr. Michael Gorin"
          name="Michael B. Gorin, M.D., Ph.D."
          titles={[
            "Professor",
            "Department of Ophthalmology",
          ]}
          links={[
          ]}
        >
            <p className="text-ink-soft">
              The Gorin laboratory focuses on understanding the genetic basis of complex eye diseases, particularly glaucoma and age-related macular degeneration. Our research combines advanced genomic approaches with clinical expertise to identify genetic risk factors and develop personalized treatment strategies.
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Research Focus Areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>
                  Genetic risk factors in glaucoma
                </li>
                <li>
                  Population genetics of eye diseases
                </li>
                <li>
                  Genomic medicine in ophthalmology
                </li>
                <li>
                  Pharmacogenetics of eye disease treatments
                </li>
                <li>
                  Biomarker development for eye diseases
                </li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Our work aims to translate genetic discoveries into clinical applications, improving risk assessment and treatment selection for patients with inherited eye diseases. We collaborate extensively with clinical and basic science researchers worldwide.
            </p>
        </LabProfile>

        <LabTrainees lab="gorin" />

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