'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function HukPage() {
  const publications = [
    {
      title: "The effect of stimulus strength on the speed and accuracy of a perceptual decision",
      authors: "J Palmer, AC Huk, MN Shadlen",
      journal: "Journal of Vision",
      year: "2005",
      citations: "817",
      doi: "https://pubmed.ncbi.nlm.nih.gov/16097871/"
    },
    {
      title: "Retinotopy and functional subdivision of human areas MT and MST",
      authors: "AC Huk, RF Dougherty, DJ Heeger",
      journal: "Journal of Neuroscience",
      year: "2002",
      citations: "729",
      doi: "https://pubmed.ncbi.nlm.nih.gov/12177214/"
    },
    {
      title: "Neural activity in macaque parietal cortex reflects temporal integration of visual motion signals during perceptual decision making",
      authors: "AC Huk, MN Shadlen",
      journal: "Journal of Neuroscience",
      year: "2005",
      citations: "616",
      doi: "https://pubmed.ncbi.nlm.nih.gov/16291934/"
    },
    {
      title: "Single-trial spike trains in parietal cortex reveal discrete steps during decision-making",
      authors: "KW Latimer, JL Yates, MLR Meister, AC Huk, JW Pillow",
      journal: "Science",
      year: "2015",
      citations: "337",
      doi: "https://pubmed.ncbi.nlm.nih.gov/26160947/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Alex Huk Laboratory"
        subtitle="Neuroscience, Vision, and Decision-Making"
        description="Exploring neural dynamics underlying sensory processing and perceptual decision-making"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/huk.jpg"
              alt="Dr. Alex Huk"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Alexander C. Huk, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-blue-800">Department of Neuroscience</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              The Huk laboratory investigates the neural dynamics underlying sensory processing,
              decision-making, and motor planning. Dr. Huk's team combines computational modeling,
              neurophysiology, and behavioral experiments to study how the brain integrates sensory
              information to guide decisions.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How do neural circuits in the visual cortex support motion perception?</li>
                <li>What are the mechanisms underlying temporal integration during decision-making?</li>
                <li>How does persistent neural activity encode information for delayed responses?</li>
                <li>What role does noise play in shaping neural computations during perceptual tasks?</li>
                <li>How can computational models improve our understanding of neural circuit dynamics?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Huk's work bridges experimental neuroscience and computational approaches to uncover
              fundamental principles of brain function. His research has implications for understanding
              sensory processing disorders and developing brain-machine interfaces.
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
