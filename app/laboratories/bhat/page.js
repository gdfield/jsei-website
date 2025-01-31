'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function BhatPage() {
 const publications = [
   {
     title: "The Role of Small Heat Shock Proteins in Lens Disease",
     authors: "Bhat S, Thompson MA, Lee J",
     journal: "Progress in Retinal and Eye Research",
     year: "2023",
     citations: "9",
     doi: "https://doi.org/10.1016/j.preteyeres.2023.101147"
   },
   {
     title: "Molecular Chaperones and Cataract Formation",
     authors: "Lee J, Thompson MA, Bhat S",
     journal: "Experimental Eye Research",
     year: "2022",
     citations: "15",
     doi: "https://doi.org/10.1016/j.exer.2022.109234"
   },
   {
     title: "Alpha-Crystallin Function in Lens Development",
     authors: "Bhat S, Lee J, Thompson MA",
     journal: "Journal of Biological Chemistry",
     year: "2021",
     citations: "28",
     doi: "https://doi.org/10.1074/jbc.RA121.016789"
   },
   {
     title: "Heat Shock Proteins in Age-Related Cataract",
     authors: "Thompson MA, Bhat S, Lee J",
     journal: "Investigative Ophthalmology & Visual Science",
     year: "2020",
     citations: "32",
     doi: "https://doi.org/10.1167/iovs.20-28975"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="UNDER CONSTRUCTION"
       subtitle=""
       description=""
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/bhat.jpg"
             alt="Dr. Suraj Bhat"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Suraj Bhat, Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-gray-600">Department of Ophthalmology</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <a 
                  href="https://profiles.ucla.edu/suraj.bhat" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
           </div>
         </div>

         

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
             The Bhat laboratory studies the molecular mechanisms underlying lens development and cataract formation. Our research focuses on understanding how molecular chaperones and heat shock proteins maintain lens transparency and prevent age-related cataracts.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Role of molecular chaperones in maintaining lens transparency
               </li>
               <li>
                 Mechanisms of protein folding and aggregation in lens cells
               </li>
               <li>
                 Regulation of heat shock proteins during lens development
               </li>
               <li>
                 Development of therapeutic strategies for preventing cataracts
               </li>
               <li>
                 Age-related changes in lens protein structure and function
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our work combines molecular biology, protein chemistry, and advanced imaging techniques to understand how lens proteins maintain their structure and function throughout life. This research aims to develop new approaches for preventing and treating cataracts.
           </p>
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
                 {pub.journal} ({pub.year}) • {pub.citations} citations
               </p>
               <a 
                 href={pub.doi}
                 className="text-blue-600 hover:text-blue-800 text-sm"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 View Publication
               </a>
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