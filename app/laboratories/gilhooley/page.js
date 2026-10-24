import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0003-4109-5336';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/gilhooley',
  title: "Michael J Gilhooley Laboratory",
  description: "Dr. Gilhooley studies why intrinsically photosensitive retinal ganglion cells (ipRGCs) survive in mitochondrial optic neuropathies such as LHON and DOA.",
  image: "/images/faculty/gilhooley.jpg",
  imageAlt: "Dr. Michael Gilhooley",
});

export default async function GilhooleyPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Gilhooley' });

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Michael J Gilhooley",
  "jobTitle": "Assistant Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/gilhooley",
  "description": "Dr. Gilhooley's laboratory focuses on intrinsically photosensitive retinal ganglion cells (ipRGCs) in the context of mitochondrial optic neuropathies such as Leber Hereditary Optic Neuropathy (LHON) and Dominant Optic Atrophy (DOA).",
  "knowsAbout": [
    "Mitochondrial Optic Neuropathies",
    "ipRGC Biology",
    "Visual Neuroscience",
    "Neuroprotection"
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
        title="Gilhooley Laboratory"
        subtitle="Mitochondrial Optic Neuropathies & ipRGC Biology"
        description="Understanding intrinsically photosensitive retinal ganglion cells' (ipRGCs) resistance to disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/gilhooley.jpg"
          alt="Dr. Michael Gilhooley"
          name="Michael J Gilhooley MD PhD"
          titles={[
            "Assistant Professor in Residence",
            "Jules Stein Eye Institute",
            "University of California, Los Angeles",
          ]}
          links={[
            { kind: "profile", href: "https://profiles.ucla.edu/michael.gilhooley", label: "Faculty profile" },
            { kind: "profile", href: "https://www.uclahealth.org/providers/michael-gilhooley", label: "Clinic profile" },
            { kind: "pubs", href: "https://www.ncbi.nlm.nih.gov/myncbi/michael.gilhooley.1/bibliography/public/", label: "Publications" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
              Research in our lab centers on the intrinsically photosensitive retinal ganglion
              cells of the optic nerve (ipRGCs) and the fascinating protein that renders them
              sensitive to light (melanopsin). We are particularly interested in defining the
              mechanisms by which ipRGCs survive in optic nerve disease, in some cases long after
              vision is lost as more conventional types of retinal ganglion cell die.
            </p>
            <p className="text-ink-soft">
              This survival is particularly notable in the inherited optic neuropathies —{' '}
              <em>Leber Hereditary Optic Neuropathy</em> (LHON) and{' '}
              <em>Dominant Optic Atrophy (DOA)</em>, caused by mutations in genes central to
              mitochondrial function (such as <em>OPA1</em> in DOA). Uncovering why ipRGCs are
              so resilient to mitochondrial dysfunction in these eye diseases is essential not only
              to develop novel treatments to protect sight, but potentially in more common forms
              of neurodegeneration where mitochondrial dysfunction is implicated.
            </p>
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>Why are ipRGCs selectively resistant to degeneration in inherited optic neuropathies?</li>
                <li>What role does melanopsin signaling play in conferring neuroprotection?</li>
                <li>Can the survival mechanisms of ipRGCs be harnessed to protect conventional retinal ganglion cells from disease?</li>
                <li>How does ipRGC biology differ across disease states such as OPA1 and LHON?</li>
              </ul>
            </div>
            <p className="text-ink-soft">
              Dr. Gilhooley combines his clinical expertise in inherited optic neuropathies with
              basic science investigation to translate findings from ipRGC biology toward
              neuroprotective therapies for patients.
            </p>
        </LabProfile>

        <LabTrainees lab="gilhooley" />

        {publications.length > 0 && (
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
        )}
      </div>

      </main>
      <Footer />
    </div>
  );
}
