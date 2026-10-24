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
  path: '/laboratories/hubbell',
  title: "Wayne L. Hubbell Laboratory",
  description: "Dr. Hubbell developed site-directed spin labeling to study protein structure and dynamics, revealing molecular mechanisms of vision and membrane proteins.",
  image: "/images/faculty/hubbell.jpg",
  imageAlt: "Dr. Wayne Hubbell",
});

export default function HubbellPage() {
  const publications = [
    {
      title: "Requirement of rigid-body motion of transmembrane helices for light activation of rhodopsin",
      authors: "DL Farrens, C Altenbach, K Yang, WL Hubbell, HG Khorana",
      journal: "Science",
      year: "1996",
      doi: "https://doi.org/10.1126/science.274.5288.768" // PMID 8864113
    },
    {
      title: "Identifying conformational changes with site-directed spin labeling",
      authors: "WL Hubbell, DS Cafiso, C Altenbach",
      journal: "Nature Structural Biology",
      year: "2000",
      doi: "https://doi.org/10.1038/78956" // PMID 10966640
    },
    {
      title: "High-resolution distance mapping in rhodopsin reveals the pattern of helix movement due to activation",
      authors: "C Altenbach, AK Kusnetzow, OP Ernst, KP Hofmann, WL Hubbell",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2008",
      doi: "https://doi.org/10.1073/pnas.0802515105" // PMID 18490656
    },
    {
      title: "Watching proteins move using site-directed spin labeling",
      authors: "WL Hubbell, HS Mchaourab, C Altenbach, MA Lietzow",
      journal: "Structure",
      year: "1996",
      doi: "https://doi.org/10.1016/s0969-2126(96)00085-8" // PMID 8805569
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
      <LabBanner
        image="/images/laboratory-banners/williams.jpg"
        position="center 20%"
        title="Wayne Hubbell Laboratory"
        subtitle="Protein Structure and Dynamics"
        description="Exploring the molecular mechanisms of protein function using advanced biophysical techniques"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/hubbell.jpg"
          alt="Dr. Wayne Hubbell"
          name="Wayne L. Hubbell, Ph.D."
          titles={[
            "Professor Emeritus",
            "Jules Stein Chair in Ophthalmology",
            "Department of Ophthalmology and Chemistry and Biochemistry",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:hubbellw@jsei.ucla.edu", label: "hubbellw@jsei.ucla.edu" },
            { kind: "lab", href: "https://www.biochemistry.ucla.edu/Faculty/Hubbell/members.html", label: "Laboratory website" },
            { kind: "web", href: "https://en.wikipedia.org/wiki/Wayne_L._Hubbell", label: "Wikipedia" },
            { kind: "profile", href: "https://bri.ucla.edu/people/wayne-hubbell/", label: "Faculty profile" },
          ]}
        >
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
        </LabProfile>

        <LabTrainees lab="hubbell" />

        {/* Publications Section */}
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
      </main>
      <Footer />
    </div>
  );
}
