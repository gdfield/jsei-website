import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-9498-2230';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/bittner',
  title: "Ava Bittner Laboratory",
  description: "Dr. Bittner develops and tests rehabilitation strategies, visual aids, and assistive technologies to improve quality of life for people with low vision.",
  image: "/images/faculty/bittner.jpg",
  imageAlt: "Dr. Ava Bittner",
});

export default async function BittnerPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Bittner' });

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ava Bittner",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/bittner",
  "description": "Dr. Bittner's research focuses on improving quality of life and visual ability for individuals with low vision through innovative rehabilitation strategies with visual aids and devices.",
  "knowsAbout": [
    "Low Vision Rehabilitation",
    "Clinical Trials",
    "Eye Mobility and Rehabilitation"
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
        image="/images/laboratory-banners/yang.jpg"
        position="center 20%"
        title="Ava Bittner Laboratory"
        subtitle="Low Vision Rehabilitation"
        description="Advancing the field of low vision care."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/bittner.jpg"
          alt="Dr. Ava Bittner"
          name="Ava K. Bittner, Ph.D., O.D."
          titles={[
            "Professor",
            "Smotrich Family Optometric Clinician-Scientist Chair",
            "Department of Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:ABittner@mednet.ucla.edu", label: "ABittner@mednet.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/ava.bittner", label: "Faculty profile" },
            { kind: "web", href: "https://www.uclahealth.org/departments/eye/about-us/academic-centers/vision-rehabilitation", label: "Vision Rehabilitation" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
            Dr. Ava K. Bittner is an internationally renowned professor in the field of vision rehabilitation research whose 
            collaborative work aims to improve visual ability and functioning in patients with vision loss. She leads the design
             and conduct of multicenter clinical trials involving innovative interventions, such as telerehabilitation and other
              technologies. Her team's pioneering work has significantly advanced our understanding of visual impairment,
               including its assessment, impact on individuals, and management strategies.
            </p>
        </LabProfile>

        <LabTrainees lab="bittner" />

        {/* Publications Section */}
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

      {/* Footer */}
      </main>
      <Footer />
    </div>
  );
}
