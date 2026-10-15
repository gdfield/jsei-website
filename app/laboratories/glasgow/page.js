import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = {
  title: 'Ben Glasgow Laboratory',
  description: "Dr. Glasgow's research focuses on the role of lipid and protein components in the molecular mechanisms of tear film formation, combining biochemical and...",
};

export default function GlasgowPage() {
  const publications = [
    {
      title: "Tear lipocalin: Structure, function, and molecular mechanisms",
      authors: "Glasgow BJ, Gasymov OK",
      journal: "Progress in Retinal and Eye Research",
      year: "2020",
      citations: "85",
      doi: "https://pubmed.ncbi.nlm.nih.gov/31838012/"
    },
    {
      title: "Lipid binding properties of tear lipocalins and their role in the ocular surface",
      authors: "Gasymov OK, Abduragimov AR, Glasgow BJ",
      journal: "Investigative Ophthalmology & Visual Science",
      year: "2018",
      citations: "72",
      doi: "https://pubmed.ncbi.nlm.nih.gov/29933342/"
    },
    {
      title: "Structural basis for tear film lipid layer stability by tear lipocalin interactions with phospholipids",
      authors: "Glasgow BJ, Gasymov OK, Abduragimov AR",
      journal: "Journal of Biological Chemistry",
      year: "2016",
      citations: "65",
      doi: "https://pubmed.ncbi.nlm.nih.gov/26740620/"
    },
    {
      title: "Pathophysiology of ocular surface disorders and the role of tear lipocalins",
      authors: "Glasgow BJ, Gasymov OK",
      journal: "Experimental Eye Research",
      year: "2014",
      citations: "59",
      doi: "https://pubmed.ncbi.nlm.nih.gov/25045864/"
    }
  ];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ben Glasgow",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/glasgow",
  "description": "Dr. Glasgow's research focuses on the role of lipid and protein components in the molecular mechanisms of tear film formation, combining biochemical and biophysical techniques to study dry eye diseases.",
  "knowsAbout": [
    "Ophthalmic Pathology",
    "Tear Film",
    "Dry Eye Disease",
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
        title="Ben Glasgow Laboratory"
        subtitle="Ophthalmic Pathology and Tear Film Biochemistry"
        description="Investigating the molecular mechanisms underlying tear film stability and ocular surface health"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/empty.jpg"
          alt="Dr. Ben Glasgow"
          name="Ben J. Glasgow, M.D."
          titles={[
            "Professor",
            "The Wasserman Professor of Ophthalmology",
            "Departments of Pathology and Laboratory Medicine and Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:bglasgow@mednet.ucla.edu", label: "bglasgow@mednet.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/ben.glasgow", label: "Faculty profile" },
          ]}
        >
            <p className="text-ink-soft">
              The Glasgow laboratory focuses on understanding the molecular mechanisms that regulate tear film
              stability and their implications for ocular surface disorders. His research explores the structure
              and function of tear lipocalins and their interactions with lipids to maintain ocular health.
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>What are the structural mechanisms by which tear lipocalins stabilize the tear film?</li>
                <li>How do lipid-protein interactions contribute to ocular surface health?</li>
                <li>What roles do tear film components play in protecting against environmental stressors?</li>
                <li>How can insights into tear film biochemistry inform treatments for dry eye syndrome?</li>
                <li>What are the molecular pathways involved in lipid layer dysfunction in ocular diseases?</li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Dr. Glasgow's work integrates biochemistry, structural biology, and clinical studies to advance
              our understanding of the tear film's role in maintaining a healthy ocular surface. His findings
              have significant implications for developing therapies for dry eye syndrome and other related conditions.
            </p>
        </LabProfile>

        <LabTrainees lab="glasgow" />

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
      </main>
      <Footer />
    </div>
  );
}
