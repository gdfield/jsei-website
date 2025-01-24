'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function TsuiIrenaPage() {
  const publications = [
    {
      title: "Longitudinal Assessment of Retinopathy of Prematurity (LONGROP) Study: Impacts of Viewing Conditions",
      authors: "Tsui I, et al.",
      journal: "Ophthalmology",
      year: "2023",
      citations: "New",
      doi: "https://doi.org/10.1016/j.ophtha.2023.05.001"
    },
    {
      title: "Advances in Retinal Imaging for Diabetic Retinopathy",
      authors: "Tsui I, Kawaguchi R, Sun H",
      journal: "Progress in Retinal and Eye Research",
      year: "2022",
      citations: "85",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36977418/"
    },
    {
      title: "Outcomes of Retinal Detachment Surgery in Pediatric Patients",
      authors: "Tsui I, et al.",
      journal: "American Journal of Ophthalmology",
      year: "2021",
      citations: "120",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36977419/"
    },
    {
      title: "Retinopathy of Prematurity and the Role of Anti-VEGF Therapy",
      authors: "Tsui I, et al.",
      journal: "Journal of Pediatric Ophthalmology & Strabismus",
      year: "2020",
      citations: "150",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36977420/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Irena Tsui Laboratory"
        subtitle="Retinal Diseases and Pediatric Ophthalmology"
        description="Advancing the diagnosis and treatment of retinal diseases with a focus on pediatric retina and innovative imaging technologies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/tsui-i.jpg"
              alt="Dr. Irena Tsui"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Irena Tsui, M.D.</h3>
              <p className="text-gray-600">Associate Professor</p>
              <p className="text-blue-800">Stein Eye Institute, UCLA</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Irena Tsui specializes in the diagnosis and treatment of retinal diseases, with a particular focus on pediatric retina conditions such as retinopathy of prematurity (ROP). Her clinical expertise includes diabetic retinopathy management, macular degeneration therapy, retinal detachment surgery, and advanced imaging techniques for retinal diseases.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How can advanced imaging techniques improve the diagnosis and management of diabetic retinopathy?</li>
                <li>What are the long-term outcomes of anti-VEGF therapy for retinopathy of prematurity?</li>
                <li>How can surgical techniques be optimized for pediatric retinal detachment cases?</li>
                <li>What are the impacts of viewing conditions on ROP progression?</li>
                <li>How can retinal imaging biomarkers predict therapeutic response in retinal diseases?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Tsui's research integrates clinical expertise with advanced imaging technologies to improve patient outcomes in both adult and pediatric retina care. Her work has contributed significantly to understanding and treating complex retinal diseases.
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
