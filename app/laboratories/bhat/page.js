import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/bhat',
  title: "Suraj Bhat Laboratory",
  description: "Dr. Bhat studies how the eye's lens stays transparent and focuses light, using single-cell transcriptomics to characterize lens gene activity.",
  image: "/images/faculty/bhat.jpg",
  imageAlt: "Dr. Suraj Bhat",
});

export default function BhatPage() {
  const publications = [
    {
      title: "Transcriptional profiling of single fiber cells in a transgenic paradigm of an inherited childhood cataract reveals absence of molecular heterogeneity",
      authors: "Bhat S. P., Gangalum R. K., Kim D., Mangul S., Kashyap R. K., Zhou X., and Elashoff D.",
      journal: "Journal of Biological Chemistry",
      year: "2019",
      doi: "https://www.jbc.org/article/S0021-9258(20)33190-2/fulltext"
    },
    {
      title: "Spatial Analysis of Single Fiber Cells of the Developing Ocular Lens Reveals Regulated Heterogeneity of Gene Expression",
      authors: "Gangalum R. K., Kim D., Kashyap R. K., Mangul S., Zhou X., Elashoff D., and Bhat S. P.",
      journal: "iScience",
      year: "2018",
      doi: "https://www.sciencedirect.com/science/article/pii/S2589004218302141"
    },
    {
      title: "Inhibition of the Expression of the Small Heat Shock Protein αB-Crystallin Inhibits Exosome Secretion in Human Retinal Pigment Epithelial Cells in Culture",
      authors: "Gangalum R. K., Bhat A. M., Kohan S. A., and Bhat S. P.",
      journal: "Journal of Biological Chemistry",
      year: "2016",
      doi: "https://www.sciencedirect.com/science/article/pii/S0021925820394400?via%3Dihub"
    },
    {
      title: "Expression of the HSF4 DNA binding domain-EGFP hybrid gene recreates early childhood lamellar cataract in transgenic mice",
      authors: "Gangalum R. K., Jing Z., Bhat A. M., Lee J., Nagaoka Y., Deng S. X., Jiang M., Bhat S. P.",
      journal: "Investigative Ophthalmology & Visual Science",
      year: "2014",
      doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4231995/"
    },
    {
      title: "AlphaB-crystallin is found in detergent-resistant membrane microdomains and is secreted via exosomes from human retinal pigment epithelial cells",
      authors: "Gangalum R. K., Atanasov I. C., Zhou Z. H., and Bhat S. P.",
      journal: "Journal of Biological Chemistry",
      year: "2011",
      doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3030331/"
    },
  ];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Suraj Bhat",
  "jobTitle": "Professor Emeritus",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/bhat",
  "description": "Dr. Bhat's research focuses on understanding the molecular basis of the biological transparency and refractive ability of the lens, including gene activities by single cell transcriptomics.",
  "knowsAbout": [
    "Lens Biology",
    "Eye Surface and Lens"
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
        image="/images/laboratory-banners/williams.jpg"
        position="center 20%"
        title="Suraj Bhat Laboratory"
        subtitle="Gene activity, lens development and vision"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/bhat.jpg"
          alt="Dr. Suraj Bhat"
          name="Suraj Bhat, Ph.D."
          titles={[
            "Professor Emeritus",
            "Department of Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:bhat@jsei.ucla.edu", label: "bhat@jsei.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/suraj.bhat", label: "Faculty profile" },
            { kind: "lab", href: "https://www.uclahealth.org/departments/eye/research/research-laboratories/vision-molecular-biology", label: "Laboratory website" },
            { kind: "pubs", href: "https://www.ncbi.nlm.nih.gov/myncbi/1bwRSwe8mklkt/bibliography/public/", label: "Publications" },
          ]}
        >
            <p className="text-ink-soft">
              The Vision Molecular Biology Laboratory investigates the ocular lens (in the anterior) and the retinal pigment epithelium (RPE) in the posterior eye. Our current focus is on understanding (a) the role of the lens epithelium in maintaining a functional fiber mass of the ocular lens and (b) the role of exosome secretion in sustaining a functional RPE. These two epithelia are at the interface of systemic biology and tissue-specific physiology.
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Research Focus Areas:</p>
              <ol className="list-decimal pl-6 space-y-3 text-ink-soft">
                <li>
                  <span className="font-medium">Molecular characterization of the developing mouse lens at the single-cell level:</span>
                  <p className="mt-1">The ocular lens is characterized by a gradient of refractive index (RI), highest in the center and lowest at the periphery. We are investigating how gene activity connects to the phenotype (RI) by applying spatial transcriptomics to the mouse and the human eye.</p>
                </li>
                <li>
                  <span className="font-medium">The molecular constitution of the visual axis:</span>
                  <p className="mt-1">The visual axis must remain functional for all life. We have demonstrated spatially driven, enhanced gene activity in nuclear fiber cells of the postnatal mouse lens. We aim to catalog all gene products and their possible contributions to the refractive index of the core/visual axis.</p>
                </li>
                <li>
                  <span className="font-medium">Characterization of congenital cataracts at the molecular level:</span>
                  <p className="mt-1">We have generated a mouse model of the most prevalent childhood cataract, the lamellar cataract. We plan on assessing gene expression patterns in human genetic/congenital cataracts to confirm the role of gene expression heterogeneity in pathogenesis.</p>
                </li>
                <li>
                  <span className="font-medium">Molecular status of the aging human lens epithelium:</span>
                  <p className="mt-1">The anterior epithelium holds the metabolic keys for the health of the fiber cells by controlling nutrient circulation. We obtain central lens epithelial samples from cataract surgeries at Stein-UCLA, connecting with our investigations on the developing lens visual axis.</p>
                </li>
                <li>
                  <span className="font-medium">Molecular communications in the retinal pigment epithelium (RPE):</span>
                  <p className="mt-1">The health of photoreceptors depends on the underlying RPE. We find that the biogenesis of exosomes in the RPE depends on the active synthesis of αB-crystallin. We aim to apply spatial transcriptomics to investigate possible breakdown of the blood-retina barrier with age.</p>
                </li>
              </ol>
            </div>
        </LabProfile>
        


        <LabTrainees lab="bhat" />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink mb-4">Selected Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={index} className="rounded-xl border border-mist bg-surface p-4 shadow-card transition-shadow hover:shadow-lift">
                <h3 className="text-lg font-bold text-ink mb-2">{pub.title}</h3>
                <p className="text-ink-soft mb-1">{pub.authors}</p>
                <p className="text-muted">
                  {pub.journal} ({pub.year})
                </p>
                <a 
                  href={pub.doi}
                  className="text-sea hover:text-gold-deep text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Publication
                </a>
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