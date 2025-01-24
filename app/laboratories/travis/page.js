'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function TravisPage() {
  const publications = [
    {
      title: "Rpe65 is the retinoid isomerase in bovine retinal pigment epithelium",
      authors: "Jin M, Li S, Moghrabi WN, Sun H, Travis GH",
      journal: "Cell",
      year: "2005",
      citations: "450",
      doi: "https://pubmed.ncbi.nlm.nih.gov/16112300/"
    },
    {
      title: "Light exposure stimulates formation of A2E oxiranes in a mouse model of Stargardt's macular degeneration",
      authors: "Radu RA, Mata NL, Bagla A, Travis GH",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2004",
      citations: "320",
      doi: "https://pubmed.ncbi.nlm.nih.gov/15079086/"
    },
    {
      title: "Chicken retinas contain a retinoid isomerase activity that catalyzes the direct conversion of all-trans-retinol to 11-cis-retinol",
      authors: "Mata NL, Ruiz A, Radu RA, Bui TV, Travis GH",
      journal: "Biochemistry",
      year: "2005",
      citations: "190",
      doi: "https://pubmed.ncbi.nlm.nih.gov/16112301/"
    },
    {
      title: "Photic mechanisms of visual pigment regeneration in vertebrates",
      authors: "Travis GH et al.",
      journal: "ISER Meeting Abstracts",
      year: "2024",
      citations: "New",
      doi: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Gabriel Travis Laboratory"
        subtitle="Photoreceptor Biochemistry and Retinal Degeneration"
        description="Exploring the biochemistry of vertebrate photoreceptors and mechanisms underlying retinal diseases"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/travis.jpg"
              alt="Dr. Gabriel Travis"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Gabriel H. Travis, M.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-blue-800">Department of Ophthalmology</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              The Travis laboratory investigates the biochemistry of vertebrate photoreceptors and the mechanisms
              underlying inherited retinal degenerations. Their work focuses on understanding the visual cycle,
              photoreceptor function, and the molecular basis of diseases like Stargardt's macular degeneration.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>What are the biochemical pathways involved in visual pigment regeneration?</li>
                <li>How do mutations in genes like ABCA4 lead to retinal degeneration?</li>
                <li>What role do alternative visual cycles play in maintaining vision?</li>
                <li>How can novel models and therapeutic strategies be used to treat inherited retinal diseases?</li>
                <li>What are the effects of light exposure on photoreceptor health and disease progression?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              To address these questions, Dr. Travis's team employs advanced biochemical techniques,
              genetic models, and collaborative approaches to uncover novel insights into photoreceptor biology
              and develop potential treatments for blinding diseases.
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