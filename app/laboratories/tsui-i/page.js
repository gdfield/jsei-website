'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function TsuiIrenaPage() {
  const publications = [
    {
      title: "Neurodevelopmental Outcomes in Infants Screened for Retinopathy of Prematurity",
      authors: "Karmouta R, Strawbridge JC, Langston S, Altendahl M, Khitri M, Chu A, Tsui I",
      journal: "JAMA Ophthalmology",
      year: "2023",
      citations: "Recent key publication",
      doi: "https://doi.org/10.1001/jamaophthalmol.2023.4787",
      pubmed: "https://pubmed.ncbi.nlm.nih.gov/37883103/"
    },
    {
      title: "Optical coherence tomography in pediatric patients: a clinical review",
      authors: "Gundlach BS, Tsui I",
      journal: "Therapeutic Advances in Ophthalmology",
      year: "2020",
      citations: "Comprehensive review",
      doi: "https://doi.org/10.1177/2515841420904612",
      pubmed: "https://pubmed.ncbi.nlm.nih.gov/32076655/"
    },
    {
      title: "Hot Topics in Retinopathy of Prematurity",
      authors: "Tsui I, Chu A",
      journal: "Pediatric Annals",
      year: "2017",
      citations: "Expert review",
      doi: "https://doi.org/10.3928/19382359-20171023-02",
      pubmed: "https://pubmed.ncbi.nlm.nih.gov/29131921/"
    },
    {
      title: "A Practical Approach to Retinal Dystrophies",
      authors: "Tsui I, Song BJ, Lin CS, Tsang SH",
      journal: "Advances in Experimental Medicine and Biology",
      year: "2018",
      citations: "Clinical guidance",
      doi: "https://doi.org/10.1007/978-3-319-95046-4_51",
      pubmed: "https://pubmed.ncbi.nlm.nih.gov/30578524/"
    },
    {
      title: "Screening for Diabetic Retinopathy",
      authors: "Rosenberg JB, Tsui I",
      journal: "New England Journal of Medicine",
      year: "2017",
      citations: "High-impact publication",
      doi: "https://doi.org/10.1056/NEJMe1701820",
      pubmed: "https://pubmed.ncbi.nlm.nih.gov/28423293/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Irena Tsui Laboratory"
        subtitle="Retinal Imaging and Ocular Health"
        description=""
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
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Irena Tsui, M.D.</h3>
              <p className="text-gray-600">Associate Professor</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:itsui@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  itsui@jsei.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/irena.tsui" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <a 
                  href="https://www.uclahealth.org/providers/irena-tsui" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UCLA Health Profile
                </a>
              </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Key Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
                <p className="text-gray-700 mb-1">{pub.authors}</p>
                <p className="text-gray-600">
                  {pub.journal} ({pub.year}) • {pub.citations}
                </p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <a 
                    href={pub.doi}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Publication
                  </a>
                  <a 
                    href={pub.pubmed}
                    className="text-green-600 hover:text-green-800 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubMed
                  </a>
                </div>
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