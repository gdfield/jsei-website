'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function RaduPage() {
  const publications = [
    {
      title: "Impaired Cathepsin D in Retinal Pigment Epithelium Cells Mediates Stargardt Disease Pathogenesis",
      authors: "Ng ESY, Hu J, Jiang Z, Radu RA",
      journal: "FASEB Journal",
      year: "2024",
      doi: "https://doi.org/10.1096/fj.202400210RR"
    },
    {
      title: "Membrane Attack Complex Mediates Retinal Pigment Epithelium Cell Death in Stargardt Macular Degeneration",
      authors: "Ng ESY, Kady N, Hu J, Dave A, Jiang Z, Pei J, Gorin MB, Matynia A, Radu RA",
      journal: "Cells",
      year: "2022",
      doi: "https://doi.org/10.3390/cells11213462"
    },
    {
      title: "Expression of ABCA4 in Retinal Pigment Epithelium and its implications for Stargardt disease",
      authors: "Lenis TL, Hu J, Ng SY, Jiang Z, Sarfare S, Lloyd MB, Esposito N, Samuel W, Jaworski C, Bok D, Finnemann S, Radeke M, Redmond TM, Travis GH, Radu RA",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2018",
      doi: "https://doi.org/10.1073/pnas.1802519115"
    },
    {
      title: "Complement Modulation in the Retinal Pigment Epithelium Rescues Photoreceptor Degeneration in a Mouse Model of Stargardt Disease",
      authors: "Lenis TL, Sarfare S, Jiang Z, Lloyd MB, Bok D, Radu RA",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2017",
      doi: "https://doi.org/10.1073/pnas.1620299114"
    },
    {
      title: "Bisretinoid-mediated Complement Activation on Retinal Pigment Epithelial Cells is Dependent on Complement Factor H Haplotype",
      authors: "Radu RA, Hu J, Jiang Z, Bok D",
      journal: "Journal of Biological Chemistry",
      year: "2014",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3979386/"
    }
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Roxana A. Radu Laboratory"
        subtitle="Retinal Degeneration and Retinoid Biochemistry"
        description="Advancing understanding and treatment of retinal diseases through innovative research on retinoid metabolism and retinal pigment epithelium biology"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/radu.jpg"
              alt="Dr. Roxana A. Radu"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Roxana A. Radu, Ph.D.</h3>
              <p className="text-gray-600">Associate Professor</p>
              <p className="text-blue-800">Stein Eye Institute</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
            Dr. Radu leads a cutting-edge research program focused on understanding and treating degenerative macular diseases, specifically Stargardt disease (STGD1) and age-dependent macular degeneration (AMD). Dr. Radu’s group has made significant breakthroughs in understanding complex eye diseases. Key discoveries include identifying the ABCA4 gene's expression in RPE cells, developing innovative "disease-in-a-dish" models using induced pluripotent stem cells, and revealing complement system dysregulation as a common pathological pathway in both STGD1 and AMD. The laboratory is pioneering new approaches by examining retinoid-lipid processing, mitochondrial function, and cellular interactions to identify molecular targets for potential therapeutic interventions.             </p>
            
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
