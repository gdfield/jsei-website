'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function BittnerPage() {
  const publications = [
    {
      title: "Outcomes of Telerehabilitation versus In-Office Training with Magnification Devices for Low Vision: A Randomized Controlled Trial",
      authors: "Bittner AK, Kaminski JE, Yoshinaga PD, Shepherd JD, Chan TL, Malkin AG, Deemer AD, Gobeille M, Thoene SJ, Rossi A, Ross NC, and the BeST-AID study team",
      journal: "Transl Vis Sci Technol",
      year: "2024",
      doi: "https://pubmed.ncbi.nlm.nih.gov/38214688/"
    },
    {
      title: "Factors Related to Training Time and Achieving Proficiency with Visual Assistive Mobile Applications in Visually-Impaired Older Adults",
      authors: "Malkin AG, Bittner AK, Ho J, Idman-Rait C, Estabrook M, Ross NC",
      journal: "Optom Vis Sci",
      year: "2024",
      doi: "https://pubmed.ncbi.nlm.nih.gov/38820379/"
    },
    {
      title: "Bluetooth low energy beacon sensors to document hand-held magnifier use at home by people with low vision",
      authors: "Bittner AK, Estabrook M, Dennis N",
      journal: "Sensors",
      year: "2021",
      doi: "https://pubmed.ncbi.nlm.nih.gov/34770374/"
    },
    {
      title: "Designing a Socially Assistive Robot to Support Older Adults with Low Vision",
      authors: "Zhou E, Shi Z, Qiao X, Mataric MJ, Bittner AK",
      journal: "Conference proceedings: The 13th International Conference on Social Robotics (ICSR 2021)",
      year: "2021",
      doi: "https://link.springer.com/chapter/10.1007/978-3-030-90525-5_38"
    },
    {
      title: "U.S. Optometrists' Reported Practices and Perceived Barriers for Low Vision Care for Mild Visual Loss",
      authors: "Malkin AG, Ross NC, Chan TL, Protosow K, Bittner AK",
      journal: "Optom Vis Sci",
      year: "2020",
      doi: "https://pubmed.ncbi.nlm.nih.gov/31895277/"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Ava Bittner Laboratory"
        subtitle="Low Vision Rehabilitation"
        description="Advancing the field of low vision care."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/bittner.jpg"
              alt="Dr. Ava Bittner"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Ava K. Bittner, Ph.D., O.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Smotrich Family Optometric Clinician-Scientist Chair </p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <a 
                  href="mailto:ABittner@mednet.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ABittner@mednet.ucla.edu
                </a>
                <br />
              <a 
                  href="https://profiles.ucla.edu/ava.bittner" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <br />
                <a 
                  href="https://www.uclahealth.org/departments/eye/about-us/academic-centers/vision-rehabilitation" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vision Rehabilitation
                </a>
            </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
            Dr. Ava K. Bittner is an internationally renowned professor in the field of vision rehabilitation research whose 
            collaborative work aims to improve visual ability and functioning in patients with vision loss. She leads the design
             and conduct of multicenter clinical trials involving innovative interventions, such as telerehabilitation and other
              technologies. Her team's pioneering work has significantly advanced our understanding of visual impairment,
               including its assessment, impact on individuals, and management strategies.
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
