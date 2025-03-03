'use client'
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';



const ResearchPage = () => {
  const researchAreas = [
    {
      title: "Therapeutics and Regeneration",
      description: "Curing blindness and vision loss requires halting the disease and regenerating or repairing the damaged tissues. These labs pursue innovative approaches from gene therapies to pharmaceutical treatments for vision loss.",
      projects: [
        "Gene therapies",
        "Transplantation",
        "Stem Cells"
      ],
      imageUrl: "/images/areas/therapies.jpg",
      pageUrl: "/researchAreas/regeneration"  // Add this line
    },

    {
      title: "Retinal Cell and Molecular Biology ",
      description: "A long-standing area of excellence at JSEI is understanding the fundamental retinal biology that makes vision possible. These labs reveal the highly specialized molecular and cellular interactions that occur in the retina.",
      projects: [
        "Photoreceptor biology",
        "The retinal pigment epithelium",
        "Molecular signaling and receptors"
      ],
      imageUrl: "/images/areas/mobio.jpg",
      pageUrl: "/researchAreas/retinalbio"  // Add this line
    },

    {
      title: "Visual Neuroscience",
      description: "Much of the human brain is devoted to vision and the retina is part of the brain. These labs aim to understand how the operation of the neurons that comprise the visual system produce our ability to see.",
      projects: [
        "Circuit mapping in the retina and brain",
        "Visual information processing",
        "Synaptic transmission"
      ],
      imageUrl: "/images/areas/neuro.jpg",
      pageUrl: "/researchAreas/visualneuro"  // Add this line

    },

    {
      title: "Ocular Imaging",
      description: "Imaging is central to the diagnosis of many eye diseases as well as understanding biological processes. These labs use diverse imaging techniques to understand eye disease and eye biology with ever greater resolution and precision.",
      projects: [
        "Fundus imaging",
        "Optical coherence tomography",
        "Advanced microscopy"
      ],
      imageUrl: "/images/areas/imaging.jpg",
      pageUrl: "/researchAreas/ocular"  // Add this line
    },

    {
      title: "Eye Surface and Lens",
      description: "Without a clear and healthy window from the front of the eye to the retina at the back, vision is not possible. These labs aim to understand the maintanence, deterioration and repair of the eye surface and lens.",
      projects: [
        "Tear films",
        "Cornea",
        "Ocular transparency"
      ],
      imageUrl: "/images/areas/surface.jpg",
      pageUrl: "/researchAreas/surface"
    },

    {
      title: "Bioinformatics and Artificial Intelligence",
      description: "Twenty-first century science may ultimately be known as the age of big data. These labs utilize the latest approaches from bioinformatics, biostatistics, and machine learning, to understand and model the processes that underly these data.",
      projects: [
        "Neural network models",
        "Machine learning",
        "Biostatistics"
      ],
      imageUrl: "/images/areas/bioinformatics.jpg",
      pageUrl: "/researchAreas/bioinfo"  // Add this line

    },

    {
      title: "Genetics and Population Health",
      description: "Genetics and environmental factors shape the landscape and prevalence of eye conditions and diseases. These labs seek to understand these genetic and environemental factors to better target diagnostics and treatments to individuals and communities",
      projects: [
        "Disease Genetics",
        "Epidemiology",
        "Improving Outcomes"
      ],
      imageUrl: "/images/areas/health.jpg",
      pageUrl: "/researchAreas/health"
    },

    {
      title: "Rehabilitation and Eye Motility",
      description: "How we look at the world shapes what we see. From magnifiers to augmented reality to eye movements, these labs aim to understand how the processes controlling what image lands on the retina from moment to moment impacts our long-term ability to see.",
      projects: [
        "Ocular muscles and biomechanics",
        "Amblyopia",
        "Low vision"
      ],
      imageUrl: "/images/areas/motility.jpg",
      pageUrl: "/researchAreas/rehab"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchAreas.map((area) => (
            <div 
              key={area.title}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = area.pageUrl}
            >
              <div className="flex flex-row">
                <div className="w-1/3 flex-shrink-0 overflow-hidden rounded-lg mr-4">
                  <img 
                    src={area.imageUrl} 
                    alt={area.title}
                    className="w-full object-contain"
                    style={{ marginTop: '0.25rem' }}
                  />
                </div>
                <div className="w-2/3">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">{area.title}</h2>
                  <p className="text-gray-700 mb-3 text-sm">{area.description}</p>
                  <ul className="space-y-1">
                    {area.projects.map((project, index) => (
                      <li key={index} className="text-gray-600 text-sm flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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