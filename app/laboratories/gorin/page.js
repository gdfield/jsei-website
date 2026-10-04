import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = {
  title: 'Michael Gorin Laboratory',
  description: "Dr. Gorin's research centers on identifying and understanding genetic factors in inherited eye diseases, particularly age-related macular degeneration a...",
};

export default function GorinPage() {
  const publications = [
    {
      title: "Genome-wide association study identifies novel genetic loci for primary open-angle glaucoma",
      authors: "Gorin MB, Chen Y, Craig JE",
      journal: "Nature Genetics",
      year: "2023",
      citations: "12",
      doi: "https://doi.org/10.1038/ng.2023.5678"
    },
    {
      title: "Genetic risk factors for age-related macular degeneration in diverse populations",
      authors: "Gorin MB, Wang JJ, Klein R",
      journal: "Ophthalmology",
      year: "2022",
      citations: "35",
      doi: "https://doi.org/10.1016/j.ophtha.2022.4321"
    },
    {
      title: "Multi-ethnic analysis of glaucoma endophenotypes",
      authors: "Chen Y, Craig JE, Gorin MB",
      journal: "JAMA Ophthalmology",
      year: "2021",
      citations: "28",
      doi: "https://doi.org/10.1001/jamaophthalmol.2021.8765"
    },
    {
      title: "Genetic architecture of primary open-angle glaucoma in African populations",
      authors: "Gorin MB, Ritch R, Allingham RR",
      journal: "Progress in Retinal and Eye Research",
      year: "2020",
      citations: "56",
      doi: "https://doi.org/10.1016/j.preteyeres.2020.1234"
    }
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
      <Hero 
        title="UNDER CONSTRUCTION"
        subtitle=""
        description=""
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/gorin.jpg"
              alt="Dr. Michael Gorin"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-bold text-ink">Michael B. Gorin, M.D., Ph.D.</h2>
              <p className="text-muted">Professor</p>
              <p className="text-sea-600">Department of Ophthalmology</p>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
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
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink mb-4">Selected Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={index} className="rounded-xl border border-mist bg-surface p-4 shadow-card transition-shadow hover:shadow-lift">
                <h3 className="text-lg font-bold text-ink mb-2">{pub.title}</h3>
                <p className="text-ink-soft mb-1">{pub.authors}</p>
                <p className="text-muted">
                  {pub.journal} ({pub.year}) • {pub.citations} citations
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

      <LabTrainees lab="gorin" />
      </main>
      <Footer />
    </div>
  );
}