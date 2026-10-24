import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const FIELD_ORCID = '0000-0001-5942-2679';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/field',
  title: "Greg D. Field Laboratory",
  description: "The Field lab studies how neural circuits in the retina process visual information, combining electrophysiology, imaging, and computational approaches.",
  image: "/images/faculty/field.jpg",
  imageAlt: "Dr. Greg D. Field",
});

export default async function FieldPage() {
  const publications = await fetchRecentPublications(FIELD_ORCID, 10, { surname: 'Field' });

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Greg D. Field",
  "jobTitle": "Associate Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/field",
  "description": "Dr. Field's laboratory investigates neural circuits in the retina that process visual information, combining electrophysiology, imaging, and computational approaches to decode the neural basis of vision at the cellular level.",
  "knowsAbout": [
    "Retinal Circuits",
    "Visual Neuroscience",
    "Electrophysiology",
    "Computational Neuroscience"
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
        title="Greg D. Field Laboratory"
        subtitle="Visual Processing and Retinal Circuits"
        description="Understanding neural computation in the retina"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/field.jpg"
          alt="Dr. Greg D. Field"
          name="Greg D. Field, Ph.D."
          titles={[
            "Associate Professor",
            "Fran and Ray Stark Chair of Ophthalmology",
            "Department of Ophthalmology",
            "Assistant Director of Research",
            "Director, Live Imaging and Functional Evaluation Core",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:gregfield@ucla.edu", label: "gregfield@ucla.edu" },
            { kind: "lab", href: "http://www.retinalcircuits.com", label: "Laboratory website" },
            { kind: "pubs", href: "https://www.ncbi.nlm.nih.gov/myncbi/gregory.field.1/bibliography/public/", label: "Publications" },
            { kind: "profile", href: "https://profiles.ucla.edu/greg.field", label: "Faculty profile" },
            { kind: "orcid", href: `https://orcid.org/${FIELD_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
              The Field laboratory investigates how neural circuits in the retina process visual information and adapt to different environmental conditions. Our research combines electrophysiology, imaging, and computational approaches to understand the fundamental principles of retinal computation.
            </p>

            <div className="space-y-3">
              <p className="text-ink font-semibold">Research Focus Areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>Neural circuits for motion processing</li>
                <li>Adaptation to different light levels</li>
                <li>Parallel processing in retinal pathways</li>
                <li>Computational models of retinal function</li>
                <li>Visual signal processing and encoding</li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Our research aims to understand how the retina performs complex computations and adapts to changing environmental conditions. This work provides insights into both fundamental principles of neural computation and potential therapeutic strategies for vision restoration.
            </p>
        </LabProfile>

        <LabTrainees lab="field" />

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

      </main>
      <Footer />
    </div>
  );
}
