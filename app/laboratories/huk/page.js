import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = {
  title: 'Alex Huk Laboratory',
  description: "Dr. Huk investigates how the brain processes visual motion and makes decisions based on visual information, combining neurophysiology and computational ...",
};

export default function HukPage() {
  const publications = [
    {
      title: "The effect of stimulus strength on the speed and accuracy of a perceptual decision",
      authors: "J Palmer, AC Huk, MN Shadlen",
      journal: "Journal of Vision",
      year: "2005",
      citations: "817",
      doi: "https://pubmed.ncbi.nlm.nih.gov/16097871/"
    },
    {
      title: "Retinotopy and functional subdivision of human areas MT and MST",
      authors: "AC Huk, RF Dougherty, DJ Heeger",
      journal: "Journal of Neuroscience",
      year: "2002",
      citations: "729",
      doi: "https://pubmed.ncbi.nlm.nih.gov/12177214/"
    },
    {
      title: "Neural activity in macaque parietal cortex reflects temporal integration of visual motion signals during perceptual decision making",
      authors: "AC Huk, MN Shadlen",
      journal: "Journal of Neuroscience",
      year: "2005",
      citations: "616",
      doi: "https://pubmed.ncbi.nlm.nih.gov/16291934/"
    },
    {
      title: "Single-trial spike trains in parietal cortex reveal discrete steps during decision-making",
      authors: "KW Latimer, JL Yates, MLR Meister, AC Huk, JW Pillow",
      journal: "Science",
      year: "2015",
      citations: "337",
      doi: "https://pubmed.ncbi.nlm.nih.gov/26160947/"
    }
  ];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alex Huk",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/huk",
  "description": "Dr. Huk investigates how the brain processes visual motion and makes decisions based on visual information, combining neurophysiology and computational approaches to understand visual perception and decision-making.",
  "knowsAbout": [
    "Visual Neuroscience",
    "Neural Computation",
    "Visual Motion Processing"
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
        title="Alex Huk Laboratory"
        subtitle="Neuroscience, Vision, and Decision-Making"
        description="Exploring neural dynamics underlying sensory processing and perceptual decision-making"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/huk.jpg"
          alt="Dr. Alex Huk"
          name="Alexander C. Huk, Ph.D."
          titles={[
            "Professor",
            "Department of Neuroscience",
          ]}
          links={[
          ]}
        >
            <p className="text-ink-soft">
              The Huk laboratory investigates the neural dynamics underlying sensory processing,
              decision-making, and motor planning. Dr. Huk's team combines computational modeling,
              neurophysiology, and behavioral experiments to study how the brain integrates sensory
              information to guide decisions.
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>How do neural circuits in the visual cortex support motion perception?</li>
                <li>What are the mechanisms underlying temporal integration during decision-making?</li>
                <li>How does persistent neural activity encode information for delayed responses?</li>
                <li>What role does noise play in shaping neural computations during perceptual tasks?</li>
                <li>How can computational models improve our understanding of neural circuit dynamics?</li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Dr. Huk's work bridges experimental neuroscience and computational approaches to uncover
              fundamental principles of brain function. His research has implications for understanding
              sensory processing disorders and developing brain-machine interfaces.
            </p>
        </LabProfile>

        <LabTrainees lab="huk" />

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
