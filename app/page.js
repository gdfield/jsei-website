// app/page.js
import React from 'react';

export const metadata = {
  title: { absolute: 'Jules Stein Eye Institute | UCLA Vision Research' },
  description:
    'The Jules Stein Eye Institute (JSEI) at UCLA advances vision science through innovative basic and clinical research in retinal disease, cornea, glaucoma, and neuro-ophthalmology.',
};
import { ArrowUpRight } from 'lucide-react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

const ResearchDivisionPage = () => {
  const sections = [
    {
      title: "Research Areas",
      description: "JSEI spans numerous research areas that include understanding the function of the visual system to treating a wide variety of eye and vision related diseases. Click here to learn more about the different research areas covered by JSEI scientists and the cutting-edge methods they develop and deploy.",
      linkUrl: "/researchAreas",
      imageUrl: "/images/mission/research.jpg"
    },
    {
      title: "Laboratories",
      description: "Diverse laboratories operate independently and collaboratively to make cutting-edge discoveries in eye biology and vision science. Click here for a complete list of JSEI scientists and clinician scientists",
      linkUrl: "/laboratories",
      imageUrl: "/images/mission/laboratories.jpg"
    },
    {
      title: "Core Facilities",
      description: "JSEI has exceptional Core Facilities that assist the scientists and clinicians in accelerating research and innovation. Click here to learn more.",
      linkUrl: "/core",
      imageUrl: "/images/mission/cores.jpg"
    },
    {
      title: "Publications",
      description: "View the latest publications for Scientists at JSEI.",
      linkUrl: "/publications",
      imageUrl: "/images/mission/publications.jpg"
    },
    {
      title: "Funding",
      description: "View the latest federal grants to JSEI Scientists.",
      linkUrl: "/funding",
      imageUrl: "/images/mission/pyramid.png"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
            <Navbar /> {/* Add the Navbar here */}
      {/* Replace the old hero section with the Hero component */}
      <Hero 
        title="Jules Stein Eye Institute"
        subtitle="An Organized Research Unit of the University of California"
        description="Advancing Vision Science Through Innovative Research"
      />

      {/* Main Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div 
              key={section.title} 
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 p-6"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={section.imageUrl} 
                    alt={section.title}
                    className="w-24 h-24 rounded-lg object-cover object-center"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-700 mb-4 flex-grow">
                  {section.description}
                </p>
                <div className="flex justify-end">
                  <a 
                    href={section.linkUrl}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn More
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

export default ResearchDivisionPage;