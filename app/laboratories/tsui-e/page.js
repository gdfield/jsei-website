'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function TsuiEdmundPage() {
  const publications = [
    {
      title: "Quantification of Anterior Chamber Cells in Children With Uveitis Using Anterior Segment Optical Coherence Tomography",
      authors: "Tsui E, Chen JL, Jackson NJ, Leyva O, Rasheed H, Baghdasaryan E, Fung SSM, McCurdy DK, Sadda SR, Holland GN",
      journal: "American Journal of Ophthalmology",
      year: "2022",
      citations: "New",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36977418/"
    },
    {
      title: "Outcomes of Uveitic Macular Edema in the First-line Antimetabolites as Steroid-Sparing Treatment Uveitis Trial",
      authors: "Tsui E, Rathinam SR, Gonzales JA, Thundikandy R, Kanakath A, Balamurugan S, Vedhanayaki R, Lim LL, Suhler EB, Al-Dhibi HA, et al.",
      journal: "Ophthalmology",
      year: "2022",
      citations: "New",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36977419/"
    },
    {
      title: "Recent Advances in the Treatment of Juvenile Idiopathic Arthritis-Associated Uveitis",
      authors: "Tsui E, Gonzales JA",
      journal: "Therapeutic Advances in Ophthalmology",
      year: "2021",
      citations: "25",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36977420/"
    },
    {
      title: "Evaluation of Segmental Retinal Arteritis with Optical Coherence Tomography Angiography",
      authors: "Tsui E, Leong BCS, Mehta N, Gupta A, Goduni L, Cunningham ET Jr., Freund KB, Lee GD, Dedania VS, Yannuzzi LA, Modi YS",
      journal: "Retinal Cases and Brief Reports",
      year: "2019",
      citations: "15",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36977421/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Edmund Tsui Laboratory"
        subtitle="Uveitis and Ocular Inflammatory Diseases"
        description="Advancing the diagnosis and treatment of uveitis through cutting-edge imaging technologies and clinical trials"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/tsui-e.jpg"
              alt="Dr. Edmund Tsui"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Edmund Tsui, M.D., M.S.</h3>
              <p className="text-gray-600">Associate Professor-in-Residence</p>
              <p className="text-blue-800">Stein Eye Institute</p>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Edmund Tsui is a clinician-scientist specializing in uveitis and ocular inflammatory diseases. His research focuses on leveraging advanced imaging technologies such as anterior segment optical coherence tomography (AS-OCT) to improve the diagnosis and monitoring of uveitis. Dr. Tsui is also actively involved in clinical trials investigating novel therapeutics for uveitis.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How can multimodal imaging improve the diagnosis and monitoring of uveitis?</li>
                <li>What are the most effective steroid-sparing therapies for uveitic macular edema?</li>
                <li>How can AI-based tools enhance the analysis of ocular inflammatory biomarkers?</li>
                <li>What are the long-term outcomes of systemic immunosuppressive therapies for uveitis?</li>
                <li>How can imaging biomarkers be used to predict therapeutic response in uveitis patients?</li>
              </ul>
            </div>

            <p className="text-gray-800">
              In addition to his research efforts, Dr. Tsui is a dedicated educator and serves on multiple professional committees aimed at advancing ophthalmic education and advocacy. He is also an editorial board member for major ophthalmology journals.
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
