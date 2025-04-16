'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function YangPage() {
  const publications = [
    {
      title: "Derivation and characterization of isogenic OPA1 mutant and control human pluripotent stem cell lines",
      authors: "Pohl KA, Zhang XM, Ji JJ, Stile L, Sadun AA, Yang XJ",
      journal: "Cells",
      year: "2025",
      doi: "https://doi.org/10.3390/cells14020137"
    },
    {
      title: "Ciliary neurotrophic factor-mediated neuroprotection involves enhanced glycolysis and anabolism in degenerating mouse retinas",
      authors: "Rhee KD, Wang Y, ten Hoeve J, Stiles L, Nguyen TTT, Zhang XM, Vergnes L, Reue K, Shirihai O, Bok D, Yang XJ",
      journal: "Nature Communications",
      year: "2022",
      doi: "https://doi.org/10.1038/s41467-022-34443-x"
    },
    {
      title: "Single cell transcriptomic analyses reveal the impact of bHLH factors on human retinal organoid development",
      authors: "Zhang XM, Mandric I, Nguyen KH, Nguyen TTT, Pellegrini M, Grove JCR, Barnes S, Yang XJ",
      journal: "Frontiers in Cell and Developmental Biology",
      year: "2021",
      doi: "https://doi.org/10.3389/fcell.2021.653305"
    },
    {
      title: "Cytokine CNTF-mediated protection of photoreceptors requires initial activation of the cytokine receptor gp130 in Müller glial cells",
      authors: "Rhee KD, Nusinowitz S, Chao K, Yu F, Bok D, Yang XJ",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2013",
      doi: "https://www.pnas.org/cgi/doi/10.1073/pnas.1303604110"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
 <Navbar />
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/yang.jpg"
          alt="Sampath Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">Xian-Jie Yang Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Retinal Development and Gene Therapy</h2>
          <p className="text-lg md:text-4xl text-center">Uncovering the mechanisms of retinal development and finding new therapeutic approaches</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/yang.png"
              alt="Dr. Xian-Jie Yang"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Xian-Jie Yang, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Director, Molecular Biology and Gene Delivery Core</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:yang@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  yang@jsei.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/xianjie.yang" 
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Mechanisms Involved in Retinal Development and Repair</h2>
            <p className="text-gray-800">
              Research of the Yang laboratory aims at understanding mechanisms regulating retinal development and maintenance. We study how intrinsic cell signaling events influence progenitor cell proliferation and neuronal fate commitment during retinal neurogenesis, and how exogenously applied growth factors affect neuronal survival under disease conditions. We also use human pluripotent stem cell-derived retinal organoids and neurons to establish disease models for inherited optic neuropathy and to facilitate treatment development.
            </p>
            
            <div>
              <p className="text-gray-900 font-semibold mb-2">I. Mechanisms of Neuroprotection:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How does neurotrophic cytokines elicit cellular signaling events to enhance neuronal viability?</li>
                <li>Which cellular metabolic pathway contribute to neuronal survival?</li>
                <li>How does retinal degeneration change mitochondrial morphology, function, and cellular energetics?</li>
                <li>How to elicit retinal intrinsic neuroprotective potential?</li>
              </ul>
              <p className="mt-2 text-gray-800">
                Outcomes of the research will provide much needed insight for ongoing clinical trials for retinal degenerative disease.
              </p>
            </div>

            <div>
              <p className="text-gray-900 font-semibold mb-2">II. Stem Cell Technology and Gene Delivery Research:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How does neurogenic transcription factors regulate early retinal neuronal fates?</li>
                <li>Does mitochondrial deficiency affect retinogenesis?</li>
                <li>What are the disease phenotypes of optic neuropathy in stem cell-based models?</li>
                <li>Can viral mediated gene therapy or metabolic modulation attenuate phenotypes of mutant neurons?</li>
              </ul>
              <p className="mt-2 text-gray-800">
                These research will provide more efficient methodology to produce human retinal projection neurons and new knowledge regarding human retinal development. Furthermore, the human optic neuropathy disease models will be valuable testing platform to evaluate the efficacy of novel treatment strategy prior to clinical trials.
              </p>
            </div>
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