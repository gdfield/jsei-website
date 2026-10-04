import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = {
  title: 'Wayne L. Hubbell Laboratory',
  description: "Dr. Hubbell's research focuses on the development and application of site-directed spin labeling to investigate protein structure and dynamics, providin...",
};

export default function HubbellPage() {
  const publications = [
    {
      title: "Requirement of rigid-body motion of transmembrane helices for light activation of rhodopsin",
      authors: "DL Farrens, C Altenbach, K Yang, WL Hubbell, HG Khorana",
      journal: "Science",
      year: "1996",
      citations: "1548",
      doi: "https://pubmed.ncbi.nlm.nih.gov/8895462/"
    },
    {
      title: "Identifying conformational changes with site-directed spin labeling",
      authors: "WL Hubbell, DS Cafiso, C Altenbach",
      journal: "Nature Structural Biology",
      year: "2000",
      citations: "1045",
      doi: "https://pubmed.ncbi.nlm.nih.gov/10966641/"
    },
    {
      title: "High-resolution distance mapping in rhodopsin reveals the pattern of helix movement due to activation",
      authors: "C Altenbach, AK Kusnetzow, OP Ernst, KP Hofmann, WL Hubbell",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2008",
      citations: "574",
      doi: "https://pubmed.ncbi.nlm.nih.gov/18474870/"
    },
    {
      title: "Watching proteins move using site-directed spin labeling",
      authors: "WL Hubbell, HS Mchaourab, C Altenbach, MA Lietzow",
      journal: "Structure",
      year: "1996",
      citations: "584",
      doi: "https://pubmed.ncbi.nlm.nih.gov/8805552/"
    }
  ];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Wayne L. Hubbell",
  "jobTitle": "Professor Emeritus",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/hubbell",
  "description": "Dr. Hubbell's research focuses on the development and application of site-directed spin labeling to investigate protein structure and dynamics, providing crucial insights into the molecular mechanisms of vision.",
  "knowsAbout": [
    "Molecular Biophysics",
    "Rhodopsin",
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
      <Hero 
        title="Wayne Hubbell Laboratory"
        subtitle="Protein Structure and Dynamics"
        description="Exploring the molecular mechanisms of protein function using advanced biophysical techniques"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/hubbell.jpg"
              alt="Dr. Wayne Hubbell"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-bold text-ink">Wayne L. Hubbell, Ph.D.</h2>
              <p className="text-muted">Professor Emeritus</p>
              <p className="text-muted">Jules Stein Chair in Ophthalmology</p>
              <p className="text-muted">Department of Ophthalmology and Chemistry and Biochemistry</p>
              <p className="text-muted">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:hubbellw@jsei.ucla.edu" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hubbellw@jsei.ucla.edu
                </a>
                <a 
                  href="https://www.biochemistry.ucla.edu/Faculty/Hubbell/members.html" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory Website
                </a>
                <a 
                  href="https://en.wikipedia.org/wiki/Wayne_L._Hubbell" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
                <a 
                  href="https://bri.ucla.edu/people/wayne-hubbell/" 
                  className="text-sea hover:text-gold-deep inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
            </div>
          </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-ink-soft">
              The Hubbell laboratory investigates the relationship between protein structure, dynamics,
              and function. A key focus is on membrane proteins that act as molecular switches,
              such as rhodopsin in photoreceptor cells. Using innovative techniques like
              site-directed spin labeling (SDSL) and electron paramagnetic resonance (EPR),
              Dr. Hubbell's team has advanced our understanding of protein conformational changes
              during activation.
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>How do molecular switches like rhodopsin undergo conformational changes to activate signaling pathways?</li>
                <li>What are the structural dynamics of retinoid-carrying proteins involved in vitamin A transport?</li>
                <li>How can SDSL and EPR be used to map protein structures in real time?</li>
                <li>What are the mechanisms regulating protein-lipid interactions in biological membranes?</li>
                <li>How do structural changes in proteins relate to their functional states?</li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Dr. Hubbell's groundbreaking work has not only elucidated fundamental principles
              of protein dynamics but also contributed to advancements in understanding visual
              system disorders and developing novel biophysical methodologies.
            </p>
          </div>
        </div>

        {/* Publications Section */}
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
                {pub.doi && (
                  <a 
                    href={pub.doi}
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

      {/* Footer */}
      <LabTrainees lab="hubbell" />
      </main>
      <Footer />
    </div>
  );
}
