'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function NouriMahdaviPage() {
  const publications = [
    {
      title: "Pointwise Methods to Measure Long-Term Visual Field Progression in Glaucoma",
      authors: "Salazar D, Morales E, Rabiolo A, Capistrano V, Lin M, Afifi AA, Yu F, Nouri-Mahdavi K, Caprioli J",
      journal: "JAMA Ophthalmology",
      year: "2020",
      citations: "85",
      doi: "https://pubmed.ncbi.nlm.nih.gov/32239185/"
    },
    {
      title: "Macular Imaging with Optical Coherence Tomography in Glaucoma",
      authors: "Mohammadzadeh V, Fatehi N, Yarmohammadi A, Lee JW, Sharifipour F, Daneshvar R, Caprioli J, Nouri-Mahdavi K",
      journal: "Survey of Ophthalmology",
      year: "2020",
      citations: "72",
      doi: "https://pubmed.ncbi.nlm.nih.gov/32199939/"
    },
    {
      title: "Optic Nerve Traction During Adduction in Open Angle Glaucoma with Normal versus Elevated Intraocular Pressure",
      authors: "Demer JL, Clark RA, Suh SY, Giaconi JA, Nouri-Mahdavi K, et al.",
      journal: "Current Eye Research",
      year: "2020",
      citations: "65",
      doi: "https://pubmed.ncbi.nlm.nih.gov/31453714/"
    },
    {
      title: "Longitudinal Macular Structure-Function Relationships in Glaucoma",
      authors: "Mohammadzadeh V, Rabiolo A, Fu Q, Morales E, Coleman AL, Law SK, Caprioli J, Nouri-Mahdavi K",
      journal: "Ophthalmology",
      year: "2020",
      citations: "59",
      doi: "https://pubmed.ncbi.nlm.nih.gov/32173112/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Kouros Nouri-Mahdavi Laboratory"
        subtitle="Glaucoma Diagnostics and Advanced Imaging"
        description="Advancing the early detection and treatment of glaucoma through innovative imaging and AI technologies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/kouros.jpg"
              alt="Dr. Kouros Nouri-Mahdavi"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Kouros Nouri-Mahdavi, M.D., M.Sc.</h3>
              <p className="text-gray-600">Chief of Glaucoma Division</p>
              <p className="text-blue-800">Stein Eye Institute, UCLA</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Kouros Nouri-Mahdavi is a clinician-scientist specializing in glaucoma diagnostics
              and advanced imaging techniques. His research focuses on optimizing the detection of glaucoma progression,
              leveraging optical coherence tomography (OCT) imaging and artificial intelligence (AI) to improve diagnostic accuracy.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How can OCT imaging be optimized for early detection of glaucoma progression?</li>
                <li>What are the structural and functional relationships in advanced glaucoma?</li>
                <li>How can AI improve the accuracy of glaucoma diagnostics?</li>
                <li>What are the predictors of long-term visual field progression in glaucoma patients?</li>
                <li>How can surgical outcomes be enhanced for complex glaucoma cases?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              Dr. Nouri-Mahdavi’s work integrates clinical expertise with cutting-edge research methodologies
              to advance the understanding and management of glaucoma. His contributions have significantly impacted
              the field of ophthalmology.
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
