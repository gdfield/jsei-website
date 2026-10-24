import React from 'react';
import LabTrainees from '@/app/components/LabTrainees';
import LabProfile from '@/app/components/LabProfile';
import LabBanner from '@/app/components/LabBanner';
import { pageMeta } from '@/app/lib/seo';
import { fetchRecentPublications } from '@/app/lib/orcidPublications';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const FACULTY_ORCID = '0000-0001-8110-9988';



// Re-evaluate daily so the Lab Members section follows trainee start/end dates.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/laboratories/au',
  title: "Adrian Au Laboratory",
  description: "Dr. Au's lab combines ophthalmic imaging, retinal genomics, and artificial intelligence to predict retinal disease outcomes and find new therapeutic targets.",
  image: "/images/faculty/au2.jpg",
  imageAlt: "Dr. Adrian Au",
});

export default async function AuPage() {
  const orcidPublications = await fetchRecentPublications(FACULTY_ORCID, 10, { surname: 'Au' });

  // Fallback list shown only if the ORCID record returns nothing.
  const fallbackPublications = [
    {
      title: "Systemic and ocular outcomes in patients with young-onset type 2 diabetes",
      authors: "Au A, Bajar BT, Wong BM, Daskivich LP, Hosseini H, Prasad PS",
      journal: "J Diabetes Complications",
      year: "2024",
      doi: "https://pubmed.ncbi.nlm.nih.gov/38219336/"
    },
    {
      title: "OCT Grading System of Macular Infarction Predicts Vision in Participants With Central Retinal or Hemiretinal Vein Occlusion: A Secondary Analysis of SCORE2",
      authors: "Au A, Ip M, Blodi BA, Scott IU, Oden NL, Van Veldhuisen PC, Sarraf D",
      journal: "Am J Ophthalmol",
      year: "2023",
      doi: "https://pubmed.ncbi.nlm.nih.gov/37544495/"
    },
    {
      title: "Relationship Between Drusen Height and OCT Biomarkers of Atrophy in Non-Neovascular AMD",
      authors: "Au A, Santina A, Abraham N, Levin MF, Corradetti G, Sadda S, Sarraf D",
      journal: "Invest Ophthalmol Vis Sci",
      year: "2022",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36306145/"
    },
    {
      title: "Non-neovascular age-related macular degeneration with subretinal fluid",
      authors: "Hilely A, Au A, Freund KB, Loewenstein A, Souied EH, Zur D, Sacconi R, Borrelli E, Peiretti E, Iovino C, Sugiura Y, Ellabban AA, Monés J, Waheed NK, Ozdek S, Yalinbas D, Thiele S, de Moura Mendonça LS, Lee MY, Lee WK, Turcotte P, Capuano V, Filali Ansary M, Chakravarthy U, Lommatzsch A, Gunnemann F, Pauleikhoff D, Ip MS, Querques G, Holz FG, Spaide RF, Sadda S, Sarraf D",
      journal: "Br J Ophthalmol",
      year: "2021",
      doi: "https://pubmed.ncbi.nlm.nih.gov/32920528/"
    },
    {
      title: "Relationship Between Nerve Fiber Layer Hemorrhages and Outcomes in Central Retinal Vein Occlusion",
      authors: "Au A, Hilely A, Scharf J, Gunnemann F, Wang D, Chehaibou I, Iovino C, Grondin C, Farecki ML, Falavarjani KG, Phasukkijwatana N, Battista M, Borrelli E, Sacconi R, Powell B, Hom G, Greenlee TE, Conti TF, Ledesma-Gil G, Teke MY, Choudhry N, Fung AT, Krivosic V, Baek J, Lee MY, Sugiura Y, Querques G, Peiretti E, Rosen R, Lee WK, Yannuzzi LA, Zur D, Loewenstein A, Pauleikhoff D, Singh R, Modi Y, Hubschman JP, Ip M, Sadda S, Freund KB, Sarraf D",
      journal: "Invest Ophthalmol Vis Sci",
      year: "2020",
      doi: "https://pubmed.ncbi.nlm.nih.gov/32460316/"
    }
  ];

  const publications = orcidPublications.length > 0
    ? orcidPublications.map((p) => ({
        title: p.title,
        authors: p.authors.join(', '),
        journal: p.journal,
        year: p.year,
        doi: p.doi ? `https://doi.org/${p.doi}` : null,
      }))
    : fallbackPublications;

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Adrian Au",
  "jobTitle": "Assistant Professor",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/au",
  "sameAs": [`https://orcid.org/${FACULTY_ORCID}`],
  "description": "Dr. Au's research leverages advanced ophthalmic imaging, retinal genomics, and artificial intelligence to improve disease prognostication and identify novel therapeutic targets in retinal disease.",
  "knowsAbout": [
    "AI",
    "Ocular Imaging",
    "Retinal Genomics",
    "Bioinformatics"
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
        image="/images/laboratory-banners/sampath.jpg"
        position="center 50%"
        title="Adrian Au Laboratory"
        subtitle="Ophthalmic Imaging, AI, and Retinal Genomics"
        description="Integrating AI, imaging, and genomics for curing retinal disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LabProfile
          photo="/images/faculty/au2.jpg"
          alt="Dr. Adrian Au"
          name="Adrian Au, M.D., Ph.D."
          titles={[
            "Assistant Professor",
            "Department of Ophthalmology",
            "Jules Stein Eye Institute",
          ]}
          links={[
            { kind: "email", href: "mailto:adrianau@jsei.ucla.edu", label: "AAu@mednet.ucla.edu" },
            { kind: "profile", href: "https://profiles.ucla.edu/adrian.au", label: "Faculty profile" },
            { kind: "orcid", href: `https://orcid.org/${FACULTY_ORCID}`, label: "ORCID" },
          ]}
        >
            <p className="text-ink-soft">
              Dr. Adrian Au applies machine learning algorithms to ocular imaging modalities, including fundus photography and optical coherence tomography (OCT), to extract and quantify retinal biomarkers associated with disease phenotypes. His research emphasizes the integration of these imaging-derived features with genomic datasets to elucidate the molecular and genetic underpinnings of retinal pathology.
            </p>
            
            <p className="text-ink-soft">
              Through the fusion of deep learning-based image analysis and genomic frameworks, Dr. Au seeks to advance our understanding of the biological mechanisms driving disease onset, progression, and therapeutic response. His work operates at the intersection of ophthalmology, computational biology, and precision medicine, with the aim of developing clinically translatable tools for personalized diagnostics and targeted interventions in retinal disease.
            </p>

            <div className="space-y-3">
              <p className="text-ink font-semibold">Research Focus Areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink-soft">
                <li>
                  Machine learning and deep learning for ocular imaging analysis
                </li>
                <li>
                  Integration of imaging biomarkers with genomic data
                </li>
                <li>
                  Computational approaches to understanding retinal disease mechanisms
                </li>
                <li>
                  Development of AI-driven diagnostic and prognostic tools
                </li>
                <li>
                  Precision medicine approaches for personalized retinal disease treatment
                </li>
              </ul>
            </div>
        </LabProfile>

        <LabTrainees lab="au" />

        {publications.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-ink mb-4">
              {orcidPublications.length > 0 ? 'Recent Publications' : 'Selected Publications'}
            </h2>
            <div className="space-y-3">
              {publications.map((pub, index) => (
                <div key={index} className="rounded-xl border border-mist bg-surface p-4 shadow-card transition-shadow hover:shadow-lift">
                  <h3 className="text-lg font-bold text-ink mb-2">{pub.title}</h3>
                  {pub.authors && <p className="text-ink-soft mb-1">{pub.authors}</p>}
                  <p className="text-muted">
                    {pub.journal}{pub.journal && pub.year ? ` (${pub.year})` : pub.year}
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
        )}
      </div>

      </main>
      <Footer />
    </div>
  );
}