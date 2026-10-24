import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const FACULTY_ORCID = '0000-0003-2866-7440';


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/yang',
  title: "Xian-Jie Yang Laboratory",
  description: "Dr. Yang studies retinal development and repair, neuroprotection in retinal degeneration, and stem cell-derived retinal organoids to model optic neuropathies.",
  image: "/images/faculty/yang.png",
  imageAlt: "Dr. Xian-Jie Yang",
});

export default async function YangPage() {
  const publications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Yang' });

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Xian-Jie Yang",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/yang",
  "description": "Dr. Yang studies retinal development and repair using molecular genetic approaches, including cellular signaling in neuroprotection and human stem cell-derived retinal organoids to model optic neuropathies and develop therapies.",
  "knowsAbout": [
    "Retinal Development",
    "Gene Therapy",
    "Stem Cells",
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
        title="Xian-Jie Yang Laboratory"
        subtitle="Retinal Development and Gene Therapy"
        description="Uncovering the mechanisms of retinal development and finding new therapeutic approaches"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/yang.png"
          alt="Dr. Xian-Jie Yang"
          name="Xian-Jie Yang, Ph.D."
          titles={[
            "Professor",
            "Dolly Green Chair in Vision Science",
            "Department of Ophthalmology",
            "Director, Molecular Biology and Gene Delivery Core",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:yang@jsei.ucla.edu", label: "yang@jsei.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/xianjie.yang", label: "Faculty profile" },
            { kind: "pubs", href: "https://www.ncbi.nlm.nih.gov/myncbi/xian-jie.yang.1/bibliography/public/", label: "Publications" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
            <h2 className="text-2xl font-bold text-ink mb-4">Regulatory Mechanisms Involved in Retinal Development and Repair</h2>
            <p className="text-ink-soft">
              Research of the Yang laboratory aims at understanding mechanisms regulating retinal development and maintenance. We study how intrinsic cell signaling events influence progenitor cell proliferation and neuronal fate commitment during retinal neurogenesis, and how exogenously applied growth factors affect neuronal survival under disease conditions. We also use human pluripotent stem cell-derived retinal organoids and neurons to establish disease models for inherited optic neuropathy and to facilitate treatment development.
            </p>
            
            <div>
              <p className="text-ink font-semibold mb-2">I. We are using molecular genetic approaches to addresses mechanisms of neuroprotection:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>Which cellular metabolic pathways contribute to neuronal maintenance?</li>
                <li>How does retinal degeneration alter mitochondrial morphology and function?</li>
                <li>What cellular signaling events are triggered by trophic factors to enhance neuronal viability?</li>
                <li>How to elicit retinal intrinsic neuroprotective potential?</li>
              </ul>
              <p className="mt-2 text-ink-soft">
                Outcomes of the research will provide much needed insight for ongoing clinical trials aimed at treating retinal degenerative diseases.
              </p>
            </div>

            <div>
              <p className="text-ink font-semibold mb-2">II. We are using stem cell technology and virus-mediated gene delivery to study human retinal development, elucidate disease mechanism of inherited optic neuropathy, and develop effective therapies:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>How does neurogenic transcription factors regulate early retinal neuronal fates?</li>
                <li>Does mitochondrial deficiency affect human retinogenesis?</li>
                <li>What are the disease phenotypes of optic neuropathy in stem cell-based models?</li>
                <li>Can viral vector-mediated gene therapy or metabolic modulation attenuate inherited retinal degeneration?</li>
              </ul>
              <p className="mt-2 text-ink-soft">
                These studies will provide more efficient methodology to produce human retinal neurons and new knowledge regarding human retinal development. Furthermore, stem cell-based human optic neuropathy disease models will be a valuable testing platform to evaluate the efficacy of novel treatment strategy prior to clinical trials.
              </p>
            </div>
        </LabProfile>

        <LabTrainees lab="yang" />

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