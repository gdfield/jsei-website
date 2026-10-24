import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0001-7989-5174';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/tsui-i',
  title: "Irena Tsui Laboratory",
  description: "Dr. Irena Tsui studies retinal disease and oculomics, using OCT angiography to evaluate systemic conditions in premature infants and pregnant women.",
  image: "/images/faculty/tsui-i.jpg",
  imageAlt: "Dr. Irena Tsui",
});

export default async function TsuiIrenaPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Tsui' });

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Irena Tsui",
  "jobTitle": "Associate Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/tsui-i",
  "description": "Dr. Irena Tsui specializes in clinical research focused on retinal disease and oculomics, combining clinical insights with optical coherence tomography angiography to evaluate systemic conditions in premature infants and pregnant women.",
  "knowsAbout": [
    "Retinal Disease",
    "Oculomics",
    "OCT Angiography",
    "Clinical Research"
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
        title="Irena Tsui Laboratory"
        subtitle="Retinal Imaging and Ocular Health"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/tsui-i.jpg"
          alt="Dr. Irena Tsui"
          name="Irena Tsui, M.D."
          titles={[
            "Associate Professor",
            "Department of Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:itsui@jsei.ucla.edu", label: "itsui@jsei.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/irena.tsui", label: "Faculty profile" },
            { kind: "profile", href: "https://www.uclahealth.org/providers/irena-tsui", label: "UCLA Health profile" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
              Dr. Irena Tsui specializes in the diagnosis and treatment of retinal diseases, with a particular focus on pediatric retina conditions such as retinopathy of prematurity (ROP). Her clinical expertise includes diabetic retinopathy management, macular degeneration therapy, retinal detachment surgery, and advanced imaging techniques for retinal diseases.
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>How can advanced imaging techniques improve the diagnosis and management of diabetic retinopathy?</li>
                <li>What are the long-term outcomes of anti-VEGF therapy for retinopathy of prematurity?</li>
                <li>How can surgical techniques be optimized for pediatric retinal detachment cases?</li>
                <li>What are the impacts of viewing conditions on ROP progression?</li>
                <li>How can retinal imaging biomarkers predict therapeutic response in retinal diseases?</li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Dr. Tsui's research integrates clinical expertise with advanced imaging technologies to improve patient outcomes in both adult and pediatric retina care. Her work has contributed significantly to understanding and treating complex retinal diseases.
            </p>
        </LabProfile>

        <LabTrainees lab="tsui-i" />

        {/* Publications Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink mb-4">Selected Key Publications</h2>
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