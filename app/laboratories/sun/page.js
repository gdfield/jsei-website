import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


// Hand-checked against PubMed (October 2026). The ORCID iD this page used to
// have (0009-0006-9866-9846) belongs to a different Hui Sun, so publications
// are listed by hand until Dr. Sun's own ORCID iD is confirmed.
const PUBLICATIONS = [
  { title: 'Regulatory mechanism for the transmembrane receptor that mediates bidirectional vitamin A transport.', authors: ['Zhong M', 'Kawaguchi R', 'Costabile B', 'Tang Y', 'Hu J', 'Cheng G', '\u2026', 'Sun H'], journal: 'Proceedings of the National Academy of Sciences of the United States of America', year: '2020', doi: '10.1073/pnas.1918540117' }, // PMID 32300017
  { title: 'Peropsin modulates transit of vitamin A from retina to retinal pigment epithelium.', authors: ['Cook JD', 'Ng SY', 'Lloyd M', 'Eddington S', 'Sun H', 'Nathans J', 'et al.'], journal: 'Journal of Biological Chemistry', year: '2017', doi: '10.1074/jbc.M117.812701' }, // PMID 29109151
  { title: 'Vitamin A Transport Mechanism of the Multitransmembrane Cell-Surface Receptor STRA6.', authors: ['Kawaguchi R', 'Zhong M', 'Kassai M', 'Ter-Stepanian M', 'Sun H'], journal: 'Membranes', year: '2015', doi: '10.3390/membranes5030425' }, // PMID 26343735
  { title: 'A genetic clog in the vitamin A transport machinery.', authors: ['Zhong M', 'Sun H'], journal: 'Cell', year: '2015', doi: '10.1016/j.cell.2015.04.020' }, // PMID 25910203
  { title: 'Identification of PLXDC1 and PLXDC2 as the transmembrane receptors for the multifunctional factor PEDF.', authors: ['Cheng G', 'Zhong M', 'Kawaguchi R', 'Kassai M', 'Al-Ubaidi M', 'Deng J', 'Ter-Stepanian M', 'Sun H'], journal: 'eLife', year: '2014', doi: '10.7554/eLife.05401' }, // PMID 25535841
  { title: 'To investigate the necessity of STRA6 upregulation in T cells during T cell immune responses.', authors: ['Terra R', 'Wang X', 'Hu Y', 'Charpentier T', 'Lamarre A', 'Zhong M', '\u2026', 'Sun H', 'et al.'], journal: 'PLoS One', year: '2013', doi: '10.1371/journal.pone.0082808' }, // PMID 24391722
];


// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/sun',
  title: "Hui Sun Laboratory",
  description: "The Sun lab develops techniques to discover new membrane receptors and identify chemical modulators as potential drugs for eye and other diseases.",
  image: "/images/faculty/sun.jpg",
  imageAlt: "Dr. Hui Sun",
});

export default async function SunPage() {
  const publications = PUBLICATIONS;

  
  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hui Sun",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/sun",
  "description": "The Sun lab develops new techniques to discover novel membrane receptors and identify their chemical modulators as potential drugs for treating major diseases affecting the eye and other organs.",
  "knowsAbout": [
    "Chemical Biology",
    "Membrane Receptors",
    "Drug Discovery",
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
      <LabBanner
        image="/images/laboratory-banners/field.jpg"
        position="center 60%"
        title="Hui Sun Laboratory"
        subtitle="Chemical Biology of Novel Membrane Receptors"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/sun.jpg"
          alt="Dr. Hui Sun"
          name="Hui Sun, Ph.D."
          titles={[
            "Professor",
            "Departments of Physiology and Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:hsun@mednet.ucla.edu", label: "hsun@mednet.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/hui.sun", label: "Faculty profile" },
          ]}
        >
  <p className="text-ink-soft">
    Many highly impactful medicines target membrane receptors (e.g., weight loss drug Ozempic and cancer drug anti-PD1).  The Sun lab has devoted its efforts to the discovery, mechanistic study and identification of chemical modulators of novel membrane receptors that play important roles in physiology and diseases.  The first endeavor is to elucidate the receptor mechanism that mediates cellular uptake of vitamin A, a multitasking chemical that is essential for human vision and human survival.  We discovered this elusive membrane receptor using a novel technique and developed novel real-time monitoring techniques to study its molecular mechanism.  We further identified potent small molecule modulators can potentially be used in treating human diseases caused by insufficient or excessive retinoid level (relevant disease areas include ophthalmology, dermatology, and oncology).  
  </p>

  {/* Research Graphics */}
  <div className="my-6">
    <img
      src="/images/research/membrane-receptors.jpg"
      alt="Membrane receptor research diagrams showing protein structures, molecular pathways, and experimental results"
      className="w-full rounded-lg shadow-md"
    />
  </div>
  
  <p className="text-ink-soft">
    The second endeavor is to elucidate the molecular mechanism and to identify novel chemical agonists for a new type of membrane receptors highly enriched in pathogenic blood vessels.  After several years of unbiased and large-scale screening, we identified the receptors of the most potent endogenous anti-angiogenic factor.  These are the only proteins in the human genome that are known to confer cell-surface binding to the factor and to transduce its signal into the cells.  Their highly specific expression in pathogenic blood vessels in vision diseases and tumors matches the therapeutic targets of the endogenous factor. By developing a novel fluorescence-based technique, we identified potent chemical compounds that target this receptor to specifically kill pathogenic blood vessels in vision disease and also tumor blood vessels to lead to effective tumor killing in vivo. In addition, we also developed a novel technique to screen for receptor-activating antibodies and successfully identified antibody drug candidates after large-scale screening 10 billion antibody clones.  They are candidate drugs that can be used to treat a wide range of human diseases driven by pathogenic angiogenesis including major blinding diseases and diverse types of cancer.  
  </p>
        </LabProfile>

        <LabTrainees lab="sun" />

        {/* Publications Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink mb-4">Selected Publications</h2>
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
