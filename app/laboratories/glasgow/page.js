'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function GlasgowPage() {
  const publications = [
    {
      title: "Tear lipocalin: Structure, function, and molecular mechanisms",
      authors: "Glasgow BJ, Gasymov OK",
      journal: "Progress in Retinal and Eye Research",
      year: "2020",
      citations: "85",
      doi: "https://pubmed.ncbi.nlm.nih.gov/31838012/"
    },
    {
      title: "Lipid binding properties of tear lipocalins and their role in the ocular surface",
      authors: "Gasymov OK, Abduragimov AR, Glasgow BJ",
      journal: "Investigative Ophthalmology & Visual Science",
      year: "2018",
      citations: "72",
      doi: "https://pubmed.ncbi.nlm.nih.gov/29933342/"
    },
    {
      title: "Structural basis for tear film lipid layer stability by tear lipocalin interactions with phospholipids",
      authors: "Glasgow BJ, Gasymov OK, Abduragimov AR",
      journal: "Journal of Biological Chemistry",
      year: "2016",
      citations: "65",
      doi: "https://pubmed.ncbi.nlm.nih.gov/26740620/"
    },
    {
      title: "Pathophysiology of ocular surface disorders and the role of tear lipocalins",
      authors: "Glasgow BJ, Gasymov OK",
      journal: "Experimental Eye Research",
      year: "2014",
      citations: "59",
      doi: "https://pubmed.ncbi.nlm.nih.gov/25045864/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Ben Glasgow Laboratory"
        subtitle="Ophthalmic Pathology and Tear Film Biochemistry"
        description="Investigating the molecular mechanisms underlying tear film stability and ocular surface health"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/empty.jpg"
              alt="Dr. Ben Glasgow"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Ben J. Glasgow, M.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600"> The Wasserman Professor of Ophthalmology </p>
              <p className="text-gray-600">Departments of Pathology and Laboratory Medicine and Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:bglasgow@mednet.ucla.edu"
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
              bglasgow@mednet.ucla.edu
              </a>
                <a 
                  href="https://profiles.ucla.edu/ben.glasgow" 
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
              The Glasgow laboratory focuses on understanding the molecular mechanisms that regulate tear film
              stability and their implications for ocular surface disorders. His research explores the structure
              and function of tear lipocalins and their interactions with lipids to maintain ocular health.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>What are the structural mechanisms by which tear lipocalins stabilize the tear film?</li>
                <li>How do lipid-protein interactions contribute to ocular surface health?</li>
                <li>What roles do tear film components play in protecting against environmental stressors?</li>
                <li>How can insights into tear film biochemistry inform treatments for dry eye syndrome?</li>
                <li>What are the molecular pathways involved in lipid layer dysfunction in ocular diseases?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Glasgow's work integrates biochemistry, structural biology, and clinical studies to advance
              our understanding of the tear film's role in maintaining a healthy ocular surface. His findings
              have significant implications for developing therapies for dry eye syndrome and other related conditions.
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
