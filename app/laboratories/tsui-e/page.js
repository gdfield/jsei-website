'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function TsuiEdmundPage() {
  const publications = [
    {
      title: "Automated quantification of anterior chamber cells using swept-source anterior segment optical coherence tomography",
      authors: "Pillar S, Kadomoto S, Chen K, Gonzalez SS, Cherian N, Privratsky JK, Zargari N, Jackson NJ, Corradetti G, Chen JL, Sadda SR, Holland GN, Tsui E",
      journal: "Journal of Ophthalmic Inflammation and Infection",
      year: "2025",
      doi: "https://joii-journal.springeropen.com/articles/10.1186/s12348-025-00456-y"
    },
    {
      title: "Establishment of a Standard Technique for Determining Laser Flare Photometry Values during Assessment of Intraocular Inflammation",
      authors: "Tsui E, Jackson NJ, Chen JL, Holland GN",
      journal: "Ophthalmology Science",
      year: "2024",
      doi: "https://www.ophthalmologyscience.org/article/S2666-9145(24)00226-4/fulltext"
    },
    {
      title: "The Use of Large Language Models to Generate Education Materials about Uveitis",
      authors: "Kianian R, Sun D, Crowell EL, Tsui E",
      journal: "Ophthalmology Retina",
      year: "2024",
      doi: "https://www.sciencedirect.com/science/article/pii/S2468653023004499?via%3Dihub"
    },
    {
      title: "Pathogen Surveillance for Acute Infectious Conjunctivitis",
      authors: "Tsui E, Sella R, Tham V, Kong AW, McClean E, Goren L, Bahar I, Cherian N, Ramirez J, Hughes RE Jr, Privratsky JK, Onclinx T, Feit-Leichman R, Cheng A, Molina I, Kim P, Yu C, Ruder K, Tan A, Chen C, Liu Y, Abraham T, Hinterwirth A, Zhong L, Porco TC, Lietman TM, Seitzman GD, Doan T; SCORPIO Study Group",
      journal: "JAMA Ophthalmology",
      year: "2023",
      doi: "https://jamanetwork.com/journals/jamaophthalmology/fullarticle/2811380"
    },
    {
      title: "Quantification of Anterior Chamber Cells in Children With Uveitis Using Anterior Segment Optical Coherence Tomography",
      authors: "Tsui E, Chen JL, Jackson NJ, Leyva O, Rasheed H, Baghdasaryan E, Fung SSM, McCurdy DK, Sadda SR, Holland GN",
      journal: "American Journal of Ophthalmology",
      year: "2022",
      doi: "https://www.ajo.com/article/S0002-9394(22)00209-4/fulltext"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Edmund Tsui Laboratory"
        subtitle="Uveitis and Ocular Inflammatory Diseases"
        description="Advancing the diagnosis and treatment of uveitis through cutting-edge imaging technologies and clinical trials"
      />

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/tsui-e.jpg"
              alt="Dr. Edmund Tsui"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Edmund Tsui, M.D., M.S.</h3>
              <p className="text-gray-600">Associate Professor</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:etsui@mednet.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  etsui@mednet.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/edmund.tsui" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <a 
                  href="https://x.com/EdmundTsuiMD" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (Twitter)
                </a>
                <a 
                  href="https://www.linkedin.com/in/edmundtsui/" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=edmund+tsui&sort=date" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publications
                </a>
              </div>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
            The Tsui Research Group is committed to advancing the field of uveitis through innovative imaging analysis, improved diagnostic tools, and clinical trials. By leveraging advanced imaging modalities such as optical coherence tomography, we aim to quantify objectively intraocular inflammation and enhance diagnostic accuracy in uveitis. Our work also includes developing standardized methodologies for assessing inflammation, and conducting clinical trials to evaluate novel therapeutics in the treatment of uveitis and ocular inflammatory disease. 
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Our research focuses on these areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Image Analysis: Develop and validate imaging biomarkers using optical coherence tomography (OCT) and other advanced imaging modalities to quantify intraocular inflammation and monitor disease activity in uveitis. This work aims to improve the objectivity of diagnostic assessments, enhance disease monitoring, and guide treatment decisions by leveraging cutting-edge imaging technologies.</li>
                <li>Advanced Diagnostics: Utilize ocular fluid sampling techniques, such as aqueous and vitreous humor analysis, to improve the diagnosis of uveitis. This includes cytokine profiling, pathogen detection, and biomarker discovery to enable precision diagnostics and uncover underlying etiologies of ocular inflammation.</li>
                <li>Clinical Trials: Design and conduct clinical trials to evaluate novel therapies and refine treatment strategies for uveitis and other ocular inflammatory diseases. Our research encompasses immune-modulating therapies, biologics, small molecules, and targeted immunotherapies aimed at reducing inflammation, preventing vision loss, and improving patient outcomes.</li>
              </ul>
            </div>

            <p className="text-gray-800">
            These research areas reflect our group’s mission to advance the understanding, diagnosis, and treatment of uveitis and ocular inflammatory diseases through innovation and collaboration.
            </p>
          </div>
        </div>

        {/* Publications Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
                <p className="text-gray-700 mb-1">{pub.authors}</p>
                <p className="text-gray-600">
                  {pub.journal} ({pub.year}) • {pub.citations} citations
                </p>
                {pub.doi && (
                  <a 
                    href={pub.doi}
                    className="text-blue-600 hover:text-blue-800 text-sm"
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
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}
