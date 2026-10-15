import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = {
  title: 'Deborah Farber Laboratory',
  description: "Dr. Farber's landmark research characterized mutations in the \u03b2-subunit of rod cGMP-phosphodiesterase (PDE6B) causing retinitis pigmentosa and elucidate...",
};

export default function FarberPage() {
  const publications = [];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Deborah Farber",
  "jobTitle": "Professor Emeritus",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/farber",
  "description": "Dr. Farber's landmark research characterized mutations in the \u03b2-subunit of rod cGMP-phosphodiesterase (PDE6B) causing retinitis pigmentosa and elucidated mechanisms of photoreceptor cell death.",
  "knowsAbout": [
    "Retinal Degeneration",
    "Retinitis Pigmentosa",
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
        title="Deborah Farber Laboratory"
        subtitle="Molecular Biology of Retinal Degenerations"
        description="Uncovering the genetic and biochemical basis of inherited retinal disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/Farber.jpg"
          alt="Dr. Deborah Farber"
          name="Deborah Farber, Ph.D."
          titles={[
            "Professor Emeritus",
            "Department of Ophthalmology",
            "Jules Stein Eye Institute",
            "University of California, Los Angeles",
          ]}
          links={[
          ]}
        >
            <p className="text-ink-soft">
              Dr. Farber's research identified the genetic and biochemical basis of inherited
              retinal degenerations. Her landmark work characterized mutations in the β-subunit
              of rod cGMP-phosphodiesterase (PDE6B) that cause retinitis pigmentosa, elucidating
              the molecular mechanisms that drive photoreceptor cell death.
            </p>
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>What genetic mutations underlie inherited photoreceptor degenerations such as retinitis pigmentosa?</li>
                <li>How does dysregulation of cGMP-phosphodiesterase lead to photoreceptor cell death?</li>
                <li>What molecular pathways can be targeted to slow or prevent photoreceptor loss?</li>
                <li>How can mouse models of retinal degeneration inform the development of gene therapies for human disease?</li>
              </ul>
            </div>
            <p className="text-ink-soft">
              Dr. Farber's discoveries laid the foundation for gene therapy approaches to treating
              inherited blindness and established the Jules Stein Eye Institute as a leader in
              the molecular genetics of retinal disease.
            </p>
        </LabProfile>

        <LabTrainees lab="farber" />

        {publications.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Selected Publications</h2>
            <div className="space-y-3">
              {publications.map((pub, index) => (
                <div key={index} className="rounded-xl border border-mist bg-surface p-4 shadow-card transition-shadow hover:shadow-lift">
                  <h3 className="text-lg font-bold text-ink mb-2">{pub.title}</h3>
                  <p className="text-ink-soft mb-1">{pub.authors}</p>
                  <p className="text-muted">{pub.journal} ({pub.year})</p>
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
        )}
      </div>

      </main>
      <Footer />
    </div>
  );
}
