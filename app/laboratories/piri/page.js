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
  path: '/laboratories/piri',
  title: "Natik Piri Laboratory",
  description: "Dr. Piri studies the molecular mechanisms of retinal ganglion cell death in glaucoma and genes expressed preferentially in these cells.",
  image: "/images/faculty/piri.jpg",
  imageAlt: "Dr. Natik Piri",
});

export default function PiriPage() {
  const publications = [
    {
      title: "A nonsense mutation in a novel gene is associated with retinitis pigmentosa in a family linked to the RP1 locus",
      authors: "Guillonneau X, Piriev NI, Danciger M, Kozak CA, Cideciyan AV, Jacobson SG, et al.",
      journal: "Human Molecular Genetics",
      year: "1999",
      doi: "https://doi.org/10.1093/hmg/8.8.1541" // PMID 10401003
    },
    {
      title: "A deletion in a photoreceptor-specific nuclear receptor mRNA causes retinal degeneration in the rd7 mouse",
      authors: "Akhmedov NB, Piriev NI, Chang B, Rapoport AL, Hawes NL, Nishina PM, et al.",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2000",
      doi: "https://doi.org/10.1073/pnas.97.10.5551" // PMID 10805811
    },
    {
      title: "Differential expression of rod photoreceptor cGMP-phosphodiesterase alpha and beta subunits: mRNA and protein levels",
      authors: "Piri N, Yamashita CK, Shih J, Akhmedov NB, Farber DB",
      journal: "Journal of Biological Chemistry",
      year: "2003",
      doi: "https://doi.org/10.1074/jbc.M303710200" // PMID 12871955
    },
    {
      title: "Heat shock proteins in the retina: Focus on HSP70 and alpha crystallins in ganglion cell survival",
      authors: "Piri N, Kwong JM, Gu L, Caprioli J",
      journal: "Progress in Retinal and Eye Research",
      year: "2016",
      doi: "https://doi.org/10.1016/j.preteyeres.2016.03.001" // PMID 27017896
    }
  ];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Natik Piri",
  "jobTitle": "Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/piri",
  "description": "Dr. Piri's research focuses on how glaucoma impacts retinal ganglion cell survival and the mechanisms of cell death, investigating ways to make ganglion cells more robust to glaucomatous damage.",
  "knowsAbout": [
    "Glaucoma",
    "Retinal Ganglion Cells",
    "Neurodegeneration",
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
        image="/images/laboratory-banners/yang.jpg"
        position="center 20%"
        title="UNDER CONSTRUCTION"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <LabProfile
          photo="/images/faculty/piri.jpg"
          alt="Dr. Natik Piri"
          name="Natik Piri, Ph.D."
          titles={[
            "Professor",
            "Stein Eye Institute",
          ]}
          links={[
          ]}
        >
            <p className="text-ink-soft">
              Dr. Natik Piri's research focuses on understanding the molecular mechanisms leading to retinal ganglion cell (RGC) death in glaucoma. His lab is dedicated to identifying the genetic and biochemical pathways underlying RGC apoptosis and exploring novel genes expressed preferentially in RGCs. By employing advanced techniques such as DNA microarrays, proteomics, and molecular biology methods, Dr. Piri aims to uncover therapeutic targets for neuroprotection.
            </p>
            
            <div className="space-y-3">
              <p className="text-ink font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>What are the molecular pathways driving retinal ganglion cell apoptosis in glaucoma?</li>
                <li>How can novel RGC-specific genes be leveraged to develop targeted therapies?</li>
                <li>What roles do heat shock proteins (e.g., HSP70) play in enhancing RGC survival?</li>
                <li>How can proteomic technologies advance our understanding of glaucomatous neuropathy?</li>
                <li>What are the effects of age and stress on retinal ganglion cell health?</li>
              </ul>
            </div>

            <p className="text-ink-soft">
              Dr. Piri's work has significant implications for understanding the pathophysiology of glaucoma
              and developing neuroprotective strategies to prevent or delay vision loss.
            </p>
        </LabProfile>

        <LabTrainees lab="piri" />

        {/* Publications Section */}
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
      </div>

      {/* Footer */}
      </main>
      <Footer />
    </div>
  );
}
