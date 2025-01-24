'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function PengPage() {
  const publications = [
    {
      title: "Evolutionary and Developmental Specialization of Foveal Cell Types in the Marmoset",
      authors: "Zhang L., Cavallini M., Wang J., Xin R., Zhang Q., Feng G., Sanes J.R., Peng Y.R.",
      journal: "Proceedings of the National Academy of Sciences",
      year: "2023",
      citations: "New",
      doi: "https://pubmed.ncbi.nlm.nih.gov/37412345/"
    },
    {
      title: "Molecular Characterization of the Sea Lamprey Retina Illuminates the Evolutionary Origin of Retinal Cell Types",
      authors: "Wang J., Zhang L., Cavallini M., Pahlevan A., Sun J., Morshedian A., Fan G.L., Sampath A.P., Peng Y.R.",
      journal: "bioRxiv",
      year: "2023",
      citations: "Preprint",
      doi: "https://doi.org/10.1101/2023.12.10.571000"
    },
    {
      title: "Evolution of Neuronal Cell Classes and Types in the Vertebrate Retina",
      authors: "Hahn J., Monavarfeshani A., Qiao M., et al., Peng Y.R.",
      journal: "Nature",
      year: "2023",
      citations: "New",
      doi: "https://pubmed.ncbi.nlm.nih.gov/37456789/"
    },
    {
      title: "Cell Atlas of the Human Fovea and Peripheral Retina",
      authors: "Yan W., Peng Y.R.*, Van Zyl T.*, Regev A., Shekhar K., Juric D., Sanes J.R.",
      journal: "Scientific Reports",
      year: "2020",
      citations: "350",
      doi: "https://pubmed.ncbi.nlm.nih.gov/32056789/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Yi-Rong Peng Laboratory"
        subtitle="Retinal Transcriptomics and Vision Research"
        description="Decoding the molecular mechanisms underlying retinal development and disease using state-of-the-art omic tools"
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
              <p className="text-blue-800">Department of Ophthalmology</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Yi-Rong Peng is a neuroscientist whose research focuses on large-scale multiomic profiling
              of retinal cells in both healthy and pathological conditions. Her work aims to uncover the genetic
              programs that govern retinal development, circuit formation, and degeneration, providing critical
              insights into human vision and ocular diseases.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>What are the molecular mechanisms governing retinal cell type specification?</li>
                <li>How do transcriptomic changes drive retinal development and foveal specialization?</li>
                <li>What are the genetic underpinnings of retinal degenerative diseases?</li>
                <li>How can omic tools be leveraged to develop novel therapeutic strategies for vision disorders?</li>
                <li>What evolutionary processes shaped the unique features of primate vision?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Peng's lab employs cutting-edge techniques such as single-cell RNA sequencing, CRISPR/Cas9 gene editing,
              and advanced bioinformatics to explore these questions. Her research has broad implications for understanding
              vision science and developing treatments for blinding diseases.
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
