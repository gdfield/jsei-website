// app/core-facilities/page.js
import React from 'react';
import Image from 'next/image';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import { ArrowUpRight } from 'lucide-react';

const CoreFacilitiesPage = () => {
  const coreFacilities = [
    {
      title: "Microscopy and Image Analysis",
      description: "The Vision Core provides a wide range of state-of-the-art microscopy services. Features high-resolution confocal microscopy, two-photon microscopy, and advanced image analysis capabilities for researchers studying retinal structure and function.",
      equipment: [
        "Zeiss LSM 880 Confocal Microscope",
        "Advanced Image Analysis Software",
        "3D Reconstruction Capabilities"
      ],
      imageUrl: "/images/cores/microscopy.jpg"
    },
    {
      title: "Live Imaging and Functional Evaluation (LIFE)",
      description: "Specialized facility for in vivo imaging and functional assessment of the visual system. Provides comprehensive analysis of retinal structure and function in animal models of eye disease.",
      equipment: [
        "Electroretinography (ERG)",
        "Optical Coherence Tomography (OCT)",
        "Visual Behavior Testing Equipment"
      ],
      imageUrl: "/images/cores/life.jpg"
    },
    {
      title: "Molecular Biology and Gene Delivery",
      description: "Advanced molecular biology facility supporting genetic and genomic research in vision science. Offers services for gene modification, viral vector production, and cellular analysis.",
      equipment: [
        "Vector Production Facility",
        "DNA/RNA Analysis Equipment",
        "Cell Culture Facilities"
      ],
      imageUrl: "/images/cores/Gene-delivery.jpg"
    },
    {
      title: "Prototype Construction",
      description: "Custom design and fabrication facility for specialized research equipment and tools. Supports innovative research by creating unique apparatus and modifications to existing equipment.",
      equipment: [
        "3D Printing Capabilities",
        "Custom Electronics Fabrication",
        "Precision Machine Shop"
      ],
      imageUrl: "/images/cores/prototype.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Core Facilities @ JSEI"
        subtitle="Vision Research Core at UCLA"
        description="Supporting innovative vision research through state-of-the-art technology"
      />

      {/* Core Facilities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreFacilities.map((facility) => (
            <div 
              key={facility.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={facility.imageUrl}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {facility.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {facility.description}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Equipment & Capabilities:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {facility.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex justify-end">
                  <a 
                    href="#contact"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Contact Core
                    <ArrowUpRight size={20} className="ml-1" />
                  </a>
                </div>
              </div>
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

export default CoreFacilitiesPage;