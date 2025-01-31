'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function PiriPage() {
  const publications = [
    {
      title: "A nonsense mutation in a novel gene is associated with retinitis pigmentosa in a family linked to the RP1 locus",
      authors: "Guillonneau X, Piriev NI, Danciger M, Kozak CA, Cideciyan AV, Jacobson SG, Farber DB",
      journal: "Human Molecular Genetics",
      year: "1999",
      citations: "450",
      doi: "https://pubmed.ncbi.nlm.nih.gov/10441338/"
    },
    {
      title: "A deletion in a photoreceptor-specific nuclear receptor mRNA causes retinal degeneration in rd7 mouse",
      authors: "Piriev NI, Akhmedov NB, Chang B, Rapoport A, Hawes NL, Nishina PM, et al.",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2000",
      citations: "390",
      doi: "https://pubmed.ncbi.nlm.nih.gov/10805796/"
    },
    {
      title: "Regulation of rod photoreceptor cGMP-phosphodiesterase alpha and beta subunits expression: mRNA and protein levels",
      authors: "Piri N, Yamashita CK, Shih J, Akhmedov NB, Farber DB",
      journal: "Journal of Biological Chemistry",
      year: "2003",
      citations: "320",
      doi: "https://pubmed.ncbi.nlm.nih.gov/12832427/"
    },
    {
      title: "Focus on HSP70 and alpha crystallins in ganglion cell survival",
      authors: "Piri N, Gao Y, Danciger M, Mendoza E, Fishman GA, Farber DB",
      journal: "Progress in Retinal and Eye Research",
      year: "2016",
      citations: "511",
      doi: "https://pubmed.ncbi.nlm.nih.gov/27017896/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="UNDER CONSTRUCTION"
        subtitle=""
        description=""
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/piri.jpg"
              alt="Dr. Natik Piri"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Natik Piri, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-blue-800">Stein Eye Institute</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Natik Piri's research focuses on understanding the molecular mechanisms leading to retinal ganglion cell (RGC) death in glaucoma. His lab is dedicated to identifying the genetic and biochemical pathways underlying RGC apoptosis and exploring novel genes expressed preferentially in RGCs. By employing advanced techniques such as DNA microarrays, proteomics, and molecular biology methods, Dr. Piri aims to uncover therapeutic targets for neuroprotection.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>What are the molecular pathways driving retinal ganglion cell apoptosis in glaucoma?</li>
                <li>How can novel RGC-specific genes be leveraged to develop targeted therapies?</li>
                <li>What roles do heat shock proteins (e.g., HSP70) play in enhancing RGC survival?</li>
                <li>How can proteomic technologies advance our understanding of glaucomatous neuropathy?</li>
                <li>What are the effects of age and stress on retinal ganglion cell health?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Piri's work has significant implications for understanding the pathophysiology of glaucoma
              and developing neuroprotective strategies to prevent or delay vision loss.
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
