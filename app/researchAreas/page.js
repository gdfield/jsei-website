import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';



const ResearchPage = () => {
  const researchAreas = [
    {
      title: "Retinal Biology",
      description: "Investigation of cellular and molecular mechanisms in the retina, focusing on photoreceptor function and retinal degeneration.",
      projects: [
        "Photoreceptor outer segment renewal",
        "Signal transduction in vision",
        "Retinal development and disease"
      ]
    },
    {
      title: "Neural Circuits and Visual Processing",
      description: "Study of neural networks in the visual system, combining electrophysiology and imaging approaches.",
      projects: [
        "Circuit mapping in the retina",
        "Visual information processing",
        "Synaptic mechanisms"
      ]
    },
    {
      title: "Computational Vision",
      description: "Development of mathematical models and computational approaches to understand visual processing.",
      projects: [
        "Machine learning in vision science",
        "Neural coding models",
        "Visual perception algorithms"
      ]
    },
    {
      title: "Ocular Genetics",
      description: "XXXXXXXXX.",
      projects: [
        "Machine learning in vision science",
        "Neural coding models",
        "Visual perception algorithms"
      ]
    },
    {
      title: "Oculoplastics",
      description: "XXXXXXXXX.",
      projects: [
        "Machine learning in vision science",
        "Neural coding models",
        "Visual perception algorithms"
      ]
    },
    {
      title: "Cornea",
      description: "XXXXXXXXX.",
      projects: [
        "Machine learning in vision science",
        "Neural coding models",
        "Visual perception algorithms"
      ]
    },
    {
      title: "Glaucoma",
      description: "XXXXXXXXX.",
      projects: [
        "Machine learning in vision science",
        "Neural coding models",
        "Visual perception algorithms"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar /> {/* Add the Navbar here */}
      {/* Replace the old hero section with the Hero component */}
      <Hero 
        title="Research Areas at JSEI"
        subtitle="Interdiciplinary and Multidisciplinary Research"
        description="Advancing vision research, eduation and training with diverse perspectives"
      />

      {/* Research Areas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area) => (
            <div 
              key={area.title}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
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

      {/* Footer */}
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

