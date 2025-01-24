'use client'
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';



const ResearchPage = () => {
  const researchAreas = [
    {
      title: "Development, Disease, and Aging",
      description: "These research teams work to understand the normal mechanisms by which the eye and visual system develops, how it changes with age, and how degenerative conditions alter its function.",
      projects: [
        "Gene networks in retinal development",
        "Photoreceptor and macular degeneration",
        "Glaucoma and optic neuropathies"
      ],
      imageUrl: "/images/areas/aging.jpg",
      pageUrl: "/researchAreas/development"  // Add this line
    },
    {
      title: "Rescue and Regeneration",
      description: "Curing blindness and vision loss requires halting the disease and regenerating or repairing the damaged tissues. These lab pursue innovative approaches from gene therapies to pharmacuetical treat vision loss.",
      projects: [
        "Gene therapies",
        "Transplantation",
        "Stem Cells"
      ],
      imageUrl: "/images/areas/regeneration.jpg",
      pageUrl: "/researchAreas/regeneration"  // Add this line
    },    {
      title: "Retinal Biology",
      description: "A long-standing area of excellence at JSEI is understanding the fundamental biology and biochemistry that makes vision possible. These labs reveal the basic processes that make vision possible.",
      projects: [
        "Photoreceptor biology and phototransduction",
        "The retinal pigment epithelium",
        "Metabolism and gene regulation"
      ],
      imageUrl: "/images/areas/biology.jpg",
      pageUrl: "/researchAreas/retinalbio"  // Add this line

    },
    {
      title: "Visual Neuroscience",
      description: "Much of the human brain is devoted to vision and the retina is part of the brain. These labs aim to understand how the operation of the neurons that comprise the visual system produce our ability to see.",
      projects: [
        "Circuit mapping in the retina and brain",
        "Visual infomration processing",
        "Synaptic transmission"
      ],
      imageUrl: "/images/areas/vision.jpg",
      pageUrl: "/researchAreas/visualneuro"  // Add this line

    },
    /*
    {
      title: "Computational Vision",
      description: "Development of mathematical models and computational approaches to understand visual processing. These labs generate knowledge and models crictical for generating artificial vision systema and visual prosthetics.",
      projects: [
        "Machine learning in vision science",
        "Neural coding models",
        "Visual perception algorithms"
      ],
      imageUrl: "/images/areas/compute.jpg",
      pageUrl: "/researchAreas/compvision"
    },
    */
    {
      title: "Cornea and Lens",
      description: "Without a clear and healthy window from the front of the eye to the retina at the back, vision is not possible. These labs aims to understand how to repair this critical and all-to-often damaged part of the eye.",
      projects: [
        "Development and aging",
        "Stem cells",
        "Transplantation"
      ],
      imageUrl: "/images/areas/cornea.jpg",
      pageUrl: "/researchAreas/cornea"
    },
    {
      title: "Eye Disease and Population Health",
      description: "JSEI includes critical research on a range of eye diseases, including the develop and analysis of different treatment approaches. This research is spearheaded by to clinician-scientists who unit science and medicine.",
      projects: [
        "Disease Genetics",
        "Low Vision",
        "Improving Outcomes"
      ],
      imageUrl: "/images/areas/pophealth.jpg",
      pageUrl: "/researchAreas/health"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Research Areas @ JSEI"
        subtitle="Interdiciplinary and Multidisciplinary Research"
        description="Advancing vision research, eduation and training with diverse perspectives"
      />

      {/* Research Areas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area) => (
            <div 
              key={area.title}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = area.pageUrl}
            >
              <div className="mb-4">
                <img 
                  src={area.imageUrl} 
                  alt={area.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{area.title}</h2>
              <p className="text-gray-700 mb-4">{area.description}</p>
              <ul className="space-y-2">
                {area.projects.map((project, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
};


export default ResearchPage;

