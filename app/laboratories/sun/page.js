'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function SunPage() {
  const publications = [
    {
      title: "Identification of PLXDC1 and PLXDC2 as the transmembrane receptors for the multifunctional factor PEDF",
      authors: "Cheng G, Zhong M, Kawaguchi R, Kassai M, Al-Ubaidi M, Deng J, Ter-Stepanian M, Sun H",
      journal: "eLife",
      year: "2014",
      citations: "350",
      doi: "https://doi.org/10.7554/eLife.05401"
    },
    {
      title: "A membrane receptor for retinol binding protein mediates cellular uptake of vitamin A",
      authors: "Kawaguchi R, Yu J, Honda J, Hu J, Whitelegge J, Ping P, Wiita P, Bok D, Sun H",
      journal: "Science",
      year: "2007",
      citations: "820",
      doi: "https://pubmed.ncbi.nlm.nih.gov/17289993/"
    },
    {
      title: "Vitamin A transport and the transmembrane pore in the cell-surface receptor for plasma retinol binding protein",
      authors: "Zhong M, Kawaguchi R, Ter-Stepanian M, Kassai M, Sun H",
      journal: "PLoS ONE",
      year: "2013",
      citations: "200",
      doi: "https://doi.org/10.1371/journal.pone.0073838"
    },
    {
      title: "Differential and isomer-specific modulation of vitamin A transport and the catalytic activities of the RBP receptor by retinoids",
      authors: "Kawaguchi R, Zhong M, Kassai M, Ter-Stepanian M, Sun H",
      journal: "Journal of Membrane Biology",
      year: "2013",
      citations: "180",
      doi: "https://pubmed.ncbi.nlm.nih.gov/23722295/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Hui Sun Laboratory"
        subtitle="Membrane Receptors and Retinoid Biochemistry"
        description="Exploring novel therapeutic targets and mechanisms underlying vitamin A transport and retinal health"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/sun.jpg"
              alt="Dr. Hui Sun"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Hui Sun, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-blue-800">Stein Eye Institute & Department of Physiology</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Hui Sun's research focuses on the discovery and mechanistic study of novel membrane receptors
              that play critical roles in vitamin A transport and retinal health. His lab has made groundbreaking
              discoveries in identifying receptors such as STRA6 and PLXDC1/PLXDC2 that mediate cellular uptake
              of vitamin A and regulate antiangiogenic pathways.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>What are the molecular mechanisms underlying vitamin A transport in cells?</li>
                <li>How do PLXDC1 and PLXDC2 mediate antiangiogenic signaling in retinal diseases?</li>
                <li>What are the therapeutic implications of targeting STRA6 in retinal degeneration?</li>
                <li>How can small molecules modulate receptor activity to treat blinding diseases and cancer?</li>
                <li>What are the broader roles of retinoid metabolism in human health?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Sun's lab employs advanced biochemical techniques, cell-based assays, and animal models to
              uncover novel insights into membrane receptor biology. His work has significant implications for
              developing therapies for retinal diseases such as age-related macular degeneration (AMD) and Stargardt disease.
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
