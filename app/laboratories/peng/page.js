'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function PengPage() {
  const publications = [
     {
        title: "Molecular Characterization of the Sea Lamprey Retina Illuminates the Evolutionary Origin of Retinal Cell Types",
        authors: "Wang J., Zhang L., Cavallini M., Pahlevan A., Sun J., Morshedian A., Fan G.L., Sampath A.P., Peng Y.R.",
        journal: "Nature Communications",
        year: "2024",
        doi: "https://www.nature.com/articles/s41467-024-55019-x"
      },
      {
        title: "Evolutionary and Developmental Specialization of Foveal Cell Types in the Marmoset",
        authors: "Zhang L., Cavallini M., Wang J., Xin R., Zhang Q., Feng G., Sanes J.R., Peng Y.R.",
        journal: "Proceedings of the National Academy of Sciences",
        year: "2024",
        doi: "https://www.pnas.org/doi/10.1073/pnas.2313820121"
      },
      {
        title: "Binary fate choice between closely related interneuronal types is determined by a Fezf1-dependent postmitotic transcriptional switch",
        authors: "Peng Y.R.*, James R.E.*, Yan W., Kay J.N., Kolodkin A.L., Sanes J.R.",
        journal: "Neuron",
        year: "2020",
        doi: "https://www.cell.com/neuron/fulltext/S0896-6273(19)30965-1"
      },
      {
        title: "Molecular classification and comparative taxonomics of foveal and peripheral cells in primate retina",
        authors: "Peng Y.R.*, Shekhar K.*, Yan W., Herrmann D., Sappington A., Bryman G.S., Van Zyl T., Do. M.T.H., Regev A., Sanes, J.R.",
        journal: "Cell",
        year: "2019",
        doi: "https://www.cell.com/cell/fulltext/S0092-8674(19)30037-6"
      }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Yi-Rong Peng Laboratory"
        subtitle="Retinal Transcriptomics and Vision Research"
        description="Decoding the molecular mechanisms underlying retinal development, cell-type specificity, and disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/peng.jpg"
              alt="Dr. Yi-Rong Peng"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Yi-Rong Peng, Ph.D.</h3>
              <p className="text-gray-600">Assistant Professor</p>
              <p className="text-gray-600">Departments of Ophthalmology and Neurobiology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:yirongpeng@mednet.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
              yirongpeng@mednet.ucla.edu
              </a>

              <a 
                  href="https://yirongpeng.com" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory website
                </a>
                <a 
                  href="https://profiles.ucla.edu/yirong.peng" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                </div>
                </div>
          </div>

{/* Research Description */}
<div className="w-full md:w-2/3 space-y-6">
  <p className="text-gray-800">
    Cells are the building blocks of complex biological systems, exhibiting remarkable diversity in the visual system. Understanding how cell types form, connect, and degenerate is fundamental to uncover the mechanisms behind blinding diseases. The Peng lab leverages multi-omics approaches–genomics, transcriptomics, and proteomics–to decode genetic programs that define cell-type features, unravel the molecular basis of specialized human vision, and identify key signatures driving degeneration in ocular diseases.
  </p>
  
  <div className="mt-4">
    <h3 className="text-xl font-bold text-gray-900 mb-3">Research Focus Areas:</h3>
    <ul className="list-decimal pl-5 space-y-2 text-gray-800">
      <li>Genetic Regulations of Cell Type Generation and Differentiation</li>
      <li>Molecular Mechanisms of Circuit Formation and Specialization</li>
      <li>Cellular and Synaptic Adaptations During Retinal Degeneration</li>
      <li>Cellular and Circuit Principles of the Aging process in the Visual System</li>
    </ul>
  </div>
  
  <p className="text-gray-800 mt-4">
    The ultimate goal of our research is to provide a fundamental understanding of circuit formation and degeneration in the visual system and to develop therapeutic strategies to prevent or treat vision loss.
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
          {pub.journal} ({pub.year})
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
