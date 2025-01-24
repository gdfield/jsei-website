'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function ZylberbergPage() {
  const publications = [
      {
        title: "Biophysical neural adaptation mechanisms enable artificial neural networks to capture dynamic retinal computation",
        authors: "Idrees S, Manookin M, Rieke F, Field GD, Zylberberg J",
        journal: "Nature Communications",
        year: "2024",
        doi: "https://www.nature.com/articles/s41467-024-50114-5"
      },
      {
        title: "Stimulus type shapes the topology of cellular functional networks in mouse visual cortex",
        authors: "Tang D, Zylberberg J*, Jia X*, Choi H* (*co-senior authors)",
        journal: "Nature Communications",
        year: "2024",
        doi: "https://www.nature.com/articles/s41467-024-49704-0"
      },
      {
        title: "Responses to pattern-violating visual stimuli evolve differently over days in somata and distal apical dendrites",
        authors: "Gillon C*, Pina J*, et al., Bengio Y, Lillicrap T, Richards B^, Zylberberg J^ (*co-first, ^co-senior authors)",
        journal: "Journal of Neuroscience",
        year: "2024",
        doi: "https://www.jneurosci.org/content/44/5/e1009232023"
      },
      {
        title: "Improved object recognition using neural networks trained to mimic the brain's statistical properties",
        authors: "Federer C, Xu H, Fyshe A, Zylberberg J",
        journal: "Neural Networks",
        year: "2020",
        doi: "http://www.jzlab.org/Federer_BrainTrainNN_2020.pdf"
      },
      {
        title: "A deep learning framework for neuroscience",
        authors: "Richards BA, Lillicrap T, et al., Zylberberg J, Therien D, Kording K",
        journal: "Nature Neuroscience",
        year: "2019",
        doi: "http://www.jzlab.org/RichardsEtAl_NN_DeepNeuro_2019.pdf"
      }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Joel Zylberberg Laboratory"
        subtitle="Computational Neuroscience and Machine Learning"
        description="Advancing our understanding of brain function and vision with machine learning and computational models"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/zylberberg.jpg"
              alt="Dr. Joel Zylberberg"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Joel Zylberberg, Ph.D.</h3>
              <p className="text-gray-600">Associate Professor</p>
              <p className="text-blue-800">Department of Ophthalmology</p>
              <a 
                href="http://www.jzlab.org" 
                className="text-blue-600 hover:text-blue-800 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Laboratory Website
              </a>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Joel Zylberberg is a computational neuroscientist whose work bridges neuroscience and machine learning.
              His research focuses on understanding how the brain processes information about the world and how those representations
              are learned. By combining computational modeling with experimental data, Dr. Zylberberg aims to develop
              bio-inspired machine learning algorithms and improve our understanding of sensory systems like the retina and visual cortex.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How does the brain encode and process sensory information?</li>
                <li>What are the neural mechanisms underlying robust information propagation in noisy circuits?</li>
                <li>How can bio-inspired algorithms improve artificial intelligence systems?</li>
                <li>What are the roles of synaptic plasticity in shaping neural representations?</li>
                <li>How can computational models of vision aid in developing retinal prosthetics?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Zylberberg's lab employs cutting-edge techniques in computational neuroscience,
              including deep learning frameworks and information theory, to uncover the principles
              of brain function and apply them to real-world problems in AI and medicine.
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
