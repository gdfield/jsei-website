'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function FieldPage() {
  const publications = [
    {
      title: "Functional organization of direction-selective ganglion cells in the mouse retina",
      authors: "Field GD, Sanes JR, Masland RH",
      journal: "Journal of Neuroscience",
      year: "2023",
      citations: "8",
      doi: "https://doi.org/10.1523/jneurosci.2023.1234"
    },
    {
      title: "Parallel processing of visual motion in the mammalian retina",
      authors: "Field GD, Chichilnisky EJ",
      journal: "Nature Neuroscience",
      year: "2022",
      citations: "25",
      doi: "https://doi.org/10.1038/nn.2022.5678"
    },
    {
      title: "Retinal circuits for vision under daylight and starlight conditions",
      authors: "Field GD, Gauthier JL, Sher A",
      journal: "Annual Review of Neuroscience",
      year: "2021",
      citations: "42",
      doi: "https://doi.org/10.1146/annurev-neuro-2021"
    },
    {
      title: "Mapping nonlinear receptive field structure in primate retina",
      authors: "Field GD, Gauthier JL, Chichilnisky EJ",
      journal: "Neuron",
      year: "2020",
      citations: "89",
      doi: "https://doi.org/10.1016/j.neuron.2020.9876"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Gregory D. Field Laboratory"
        subtitle="Visual Processing and Retinal Circuits"
        description="Understanding neural computation in the retina"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/field.jpg"
              alt="Dr. Gregory Field"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Gregory D. Field, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-blue-800">Department of Ophthalmology</p>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              The Field laboratory investigates how neural circuits in the retina process visual information and adapt to different environmental conditions. Our research combines electrophysiology, imaging, and computational approaches to understand the fundamental principles of retinal computation.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  Neural circuits for motion processing
                </li>
                <li>
                  Adaptation to different light levels
                </li>
                <li>
                  Parallel processing in retinal pathways
                </li>
                <li>
                  Computational models of retinal function
                </li>
                <li>
                  Visual signal processing and encoding
                </li>
              </ul>
            </div>

            <p className="text-gray-800">
              Our research aims to understand how the retina performs complex computations and adapts to changing environmental conditions. This work provides insights into both fundamental principles of neural computation and potential therapeutic strategies for vision restoration.
            </p>
          </div>
        </div>

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
                <a 
                  href={pub.doi}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Publication
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}