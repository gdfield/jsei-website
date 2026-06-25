import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export const metadata = {
  title: 'Adrian Au Laboratory',
  description: "Dr. Au's research leverages advanced ophthalmic imaging, retinal genomics, and artificial intelligence to improve disease prognostication and identify n...",
};

export default function AuPage() {
  const publications = [
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
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Navbar />
      <main id="main-content">
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/sampath.jpg"
          alt="Sampath Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 50%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">Adrian Au Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Ophthalmic Imaging, AI, and Retinal Genomics</h2>
          <p className="text-lg md:text-4xl text-center">Integrating AI, imaging, and genomics for curing retinal disease</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/au2.jpg"
              alt="Dr. Adrian Au"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Adrian Au, M.D., Ph.D.</h3>
              <p className="text-gray-600">Assistant Professor</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="mailto:adrianau@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AAu@mednet.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/adrian.au" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Adrian Au applies machine learning algorithms to ocular imaging modalities, including fundus photography and optical coherence tomography (OCT), to extract and quantify retinal biomarkers associated with disease phenotypes. His research emphasizes the integration of these imaging-derived features with genomic datasets to elucidate the molecular and genetic underpinnings of retinal pathology.
            </p>
            
            <p className="text-gray-800">
              Through the fusion of deep learning-based image analysis and genomic frameworks, Dr. Au seeks to advance our understanding of the biological mechanisms driving disease onset, progression, and therapeutic response. His work operates at the intersection of ophthalmology, computational biology, and precision medicine, with the aim of developing clinically translatable tools for personalized diagnostics and targeted interventions in retinal disease.
            </p>

            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
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
          </div>
        </div>

        {publications.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Publications</h2>
            <div className="space-y-3">
              {publications.map((pub, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
                  <p className="text-gray-700 mb-1">{pub.authors}</p>
                  <p className="text-gray-600">
                    {pub.journal} ({pub.year})
                  </p>
                  <a 
                    href={pub.doi}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Publication
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      </main>
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}