'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function BarzalayPage() {
 const publications = [
   {
     title: "Revolutionizing Vitreo-Retinal Surgery: Unveiling Advanced Robotic Surgery and Intraocular Imaging Innovations",
     authors: "Barzelay-Wollman, A.",
     journal: "EURETINA Annual Meeting, Barcelona, Spain",
     year: "2024",
     citations: "",
     doi: "#"
   },
   {
     title: "Add-On Fluidic Control System for Enhancing Intraocular Pressure Stabilization and Reducing Tissue Deformation",
     authors: "Barzelay-Wollman, A., Lai, Y.T.",
     journal: "IEEE/ASME International Conference on Advanced Intelligent Mechatronics (AIM)",
     year: "2024",
     citations: "",
     doi: "#"
   },
   {
     title: "Sequential Fabrication of a Three-Layer Retina-like Structure",
     authors: "Shechter, Y., Cohen, R., Namestnikov, M., Shapira, A., Barak, A., Barzelay-Wollman, A., Dvir, T.",
     journal: "Gels",
     year: "2024",
     citations: "",
     doi: "https://doi.org/10.3390/gels10050336"
   },
   {
     title: "Regenerative Effect of Adipose-Derived Mesenchymal Stem Cells on Ganglion Cells in the Hypoxic Organotypic Retina Culture",
     authors: "Dov, M.B., Krief, B., Benhamou, M., Klein, A., Schwartz, S., Loewenstein, A., Barak, A., Barzelay-Wollman, A.",
     journal: "International Journal of Stem Cells",
     year: "2023",
     citations: "",
     doi: "https://pubmed.ncbi.nlm.nih.gov/36581366/"
   },
   {
     title: "Retinal Lineage Therapeutic Specific Effect of Human Orbital and Abdominal Adipose-Derived Mesenchymal Stem Cells",
     authors: "Krief, B., Algor, S.W., Nakdimon, I., Elhikis, A., Benhamou, M., Kadmon, A.S., Keren, S., Ohana, O., Feldman, I., Cnaan, R., Leibovitch, I., Loewenstein, A., Barak, A., Barzelay-Wollman, A.",
     journal: "Stem Cells International",
     year: "2021",
     citations: "",
     doi: "https://doi.org/10.1155/2021/7022247"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Aya Barzalay-Wollman Laboratory"
       subtitle="Robotic Microsurgery and Retinal Regeneration"
       description=""
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/barzalay.jpg"
             alt="Dr. Aya Barzalay-Wollman"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Aya Barzelay-Wollman, M.D., Ph.D.</h3>
             <p className="text-gray-600">Assistant Professor</p>
             <p className="text-gray-600">Department of Ophthalmology</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <a 
                  href="mailto:ABarzelayWollman@mednet.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ABarzelayWollman@mednet.ucla.edu
                </a>
                <br />
                             <a 
                  href="https://www.uclahealth.org/providers/aya-barzelay-wollman" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <br />
                <a 
                  href="https://www.uclahealth.org/departments/eye/research/research-laboratories/advanced-robotic-micro-surgery-arms-laboratory" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
           </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
           Dr. Aya Barzelay-Wollman leads a translational research program focused on advancing robotic-assisted microsurgery for retinal disease. Her lab develops AI-guided robotic systems capable of performing delicate intraocular surgeries with sub-millimeter precision—enabling tasks such as retinal vein cannulation, targeted subretinal delivery of gene and drug therapies, and automated intravitreal injections that exceed human manual capabilities.
                      </p>
           
                      <p className="text-gray-800">
                      Her research also explores regenerative strategies using stem cell–derived retinal grafts to replace damaged retinal tissue in degenerative diseases like age-related macular degeneration. By combining microsurgical robotics with cell-based therapies, her team aims to improve the precision, consistency, and long-term integration of these treatments, accelerating their translation into clinical care.
                                            </p>

           <p className="text-gray-800">
           Dr. Barzelay-Wollman is the UCLA principal investigator for a national ARPA-H–funded initiative on whole eye transplantation. Her contributions focus on robotic microsurgery and intraocular tissue preservation, developing enabling technologies to support the viability and functional integration of transplanted eyes. 
                     </p>
          
          {/* Media Links */}
          <div className="mt-6 mb-4 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Media</h3>
            <div className="flex flex-col space-y-2">
              <a 
                href="https://www.youtube.com/watch?v=7KUbnv1DmiI" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Video: Principal Investigator Focus
              </a>
              <a 
                href="https://www.medscape.com/viewarticle/super-human-robot-could-be-future-eye-surgery-2024a1000ivf" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                News: Super-Human Robot Could Be Future of Eye Surgery
              </a>
            </div>
          </div>

  {/* Research Graphics */}
  <div className="my-6">
    <img
      src="/images/research/teleoperation.png"
      alt="Surgical Robot"
      className="w-full rounded-lg shadow-md"
    />
  </div>

         </div>
       </div>

       <div className="mt-12">
         <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Publications</h2>
         <div className="space-y-3">
           {publications.map((pub, index) => (
             <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
               <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
               <p className="text-gray-700 mb-1">{pub.authors}</p>
               <p className="text-gray-600">
                 {pub.journal} ({pub.year}) {pub.citations && `• ${pub.citations} citations`}
               </p>
               {pub.doi !== "#" && (
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

     <footer className="bg-gray-100 mt-16 py-8">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
         <p>Jules Stein Eye Institute - Research Division</p>
         <p className="mt-2">University of California, Los Angeles</p>
       </div>
     </footer>
   </div>
 );
}