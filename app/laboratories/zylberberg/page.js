import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0002-8208-5698';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/zylberberg',
  title: "Joel Zylberberg Laboratory",
  description: "Dr. Zylberberg uses mathematical models and machine learning to understand how neural circuits process visual information.",
  image: "/images/faculty/zylberberg.jpg",
  imageAlt: "Dr. Joel Zylberberg",
});

export default async function ZylberbergPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Zylberberg' });

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Joel Zylberberg",
  "jobTitle": "Associate Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/zylberberg",
  "description": "Dr. Zylberberg's research combines theoretical and computational approaches to understand how neural circuits process visual information, developing mathematical models of visual processing and applying machine learning to neural data.",
  "knowsAbout": [
    "Computational Neuroscience",
    "Visual Neuroscience",
    "Machine Learning",
    "Neural Circuits"
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
        image="/images/laboratory-banners/radu.jpg"
        position="center 10%"
        title="Joel Zylberberg Laboratory"
        subtitle="Computational Neuroscience and Machine Learning"
        description="Advancing our understanding of brain function and vision with machine learning and computational models"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/zylberberg.jpg"
          alt="Dr. Joel Zylberberg"
          name="Joel Zylberberg, Ph.D."
          titles={[
            "Associate Professor",
            "Department of Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:joelzy@ucla.edu", label: "joelzy@ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/joel.zylberberg", label: "Faculty profile" },
            { kind: "lab", href: "http://www.jzlab.org", label: "Laboratory website" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
              Dr. Joel Zylberberg is a computational neuroscientist whose work bridges neuroscience and machine learning.
              His research focuses on understanding how the brain processes information about the world and how those representations
              are learned. By combining computational modeling with experimental data, Dr. Zylberberg aims to develop
              bio-inspired machine learning algorithms and improve our understanding of sensory systems like the retina and visual cortex.
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>How does the brain encode and process sensory information?</li>
                <li>What are the neural mechanisms underlying robust information propagation in noisy circuits?</li>
                <li>How can bio-inspired algorithms improve artificial intelligence systems?</li>
                <li>What are the roles of synaptic plasticity in shaping neural representations?</li>
                <li>How can computational models of vision aid in developing retinal prosthetics?</li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Dr. Zylberberg's lab employs cutting-edge techniques in computational neuroscience,
              including deep learning frameworks and information theory, to uncover the principles
              of brain function and apply them to real-world problems in AI and medicine.
            </p>
  {/* Research Graphics */}
  <div className="my-6">
    <img
      src="/images/research/zylberberg.png"
      alt="Membrane receptor research diagrams showing protein structures, molecular pathways, and experimental results"
      className="w-full rounded-lg shadow-md"
    />
          </div>
        </LabProfile>

        <LabTrainees lab="zylberberg" />

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
