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
      description: "Provides a wide range of state-of-the-art microscopy services. Features high-resolution confocal microscopy, super-resolution microscopy, electron microscopy, and advanced image analysis capabilities for studies of retinal structure and function, including live cell imaging.",
      equipment: [
        "Wide-field and high resolution microscopy",
        "Tissue and sample preparation",
        "Advanced image analysis, including 3D reconstruction"
      ],
      director: "David Williams, Ph.D.",
      staff: "Yuekan Jiao, Ph.D. & Jane Coffman, Ph.D.",
      imageUrl: "/images/cores/microscopy.jpg"
    },
    {
      title: "Molecular Biology and Gene Delivery",
      description: "Advanced molecular biology facility supporting genetic and genomic research in vision science. Offers services for gene modification, viral vector production, and cellular analysis. The Core Module also contains an array of equipment for molecular biology and biochemstry assays.",
      equipment: [
        "Vector Production and Cell Culture",
        "DNA/RNA Analysis Equipment",
        "Electroporation"
      ],
      director: "Xian-Jie Yang, Ph.D.",
      staff: "Duc Hoang, Ph.D. & Jane Coffman, Ph.D.",
      imageUrl: "/images/cores/Gene-delivery.jpg"
    },
        {
      title: "Live Imaging and Functional Evaluation (LIFE)",
      description: "Specialized facility for in vivo imaging and functional assessment of the visual system. Provides comprehensive analysis of retinal structure and function in animal models of eye disease.",
      equipment: [
        "Electroretinography (ERG)",
        "Optical Coherence Tomography (OCT)",
        "Visual Behavior Testing"
      ],
      director: "Greg D. Field, Ph.D.",
      staff: "Eduardo Araujo",
      imageUrl: "/images/cores/life.jpg"
    },
    {
      title: "Prototype Construction",
      description: "Custom design and fabrication facility for specialized research equipment and tools. Supports innovative research by creating unique apparatus and modifications to existing equipment.",
      equipment: [
        "3D Printing Capabilities",
        "Precision Machine Shop",
        "Expert Machinist"
      ],
      director: "Joseph L. Demer, M.D., Ph.D.",
      staff: "Jose Gomez Godinez",
      imageUrl: "/images/cores/prototype.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Core Facilities @ JSEI"
        subtitle="P30 Vision Research Core at UCLA"
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
                
                {/* Core Leadership Section */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-gray-900 font-semibold mr-2">Core Module Director:</span>
                    <span className="text-gray-600">{facility.director}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-900 font-semibold mr-2">Staff:</span>
                    <span className="text-gray-600">{facility.staff}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Equipment & Capabilities:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {facility.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
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