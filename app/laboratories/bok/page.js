import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = {
  title: 'Dean Bok Laboratory',
  description: "Dr. Bok's research focused on the structure and function of the retinal pigment epithelium (RPE) and its critical role in supporting photoreceptor cells...",
};

export default function BokPage() {
  const publications = [];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dean Bok",
  "jobTitle": "Professor Emeritus",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/bok",
  "description": "Dr. Bok's research focused on the structure and function of the retinal pigment epithelium (RPE) and its critical role in supporting photoreceptor cells, including RPE phagocytosis and age-related macular degeneration.",
  "knowsAbout": [
    "Retinal Pigment Epithelium",
    "Photoreceptors",
    "Retinal Degeneration"
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
        title="Dean Bok Laboratory"
        subtitle="Retinal Pigment Epithelium Biology"
        description="Investigating the structure and function of the RPE and its role in retinal health and disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/bok.webp"
          alt="Dr. Dean Bok"
          name="Dean Bok, Ph.D."
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
              Dr. Bok's research focused on the structure and function of the retinal pigment
              epithelium (RPE) and its critical role in supporting photoreceptor cells. The RPE
              is a monolayer of cells that forms the outer blood-retinal barrier, providing
              essential metabolic support to the overlying photoreceptors.
            </p>
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>What are the molecular mechanisms governing RPE phagocytosis of shed photoreceptor outer segments?</li>
                <li>How do visual cycle biochemical pathways operate within the RPE?</li>
                <li>What RPE cellular defects underlie age-related macular degeneration and other retinal degenerations?</li>
                <li>How can understanding RPE biology inform therapeutic strategies for retinal disease?</li>
              </ul>
            </div>
            <p className="text-ink-soft">
              Dr. Bok's contributions have provided foundational insights into RPE biology and the
              pathogenesis of retinal degenerative diseases, establishing a framework for
              cell-based and pharmacological therapies targeting the RPE.
            </p>
        </LabProfile>

        <LabTrainees lab="bok" />

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
