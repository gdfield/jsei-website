'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function WilliamsPage() {
 const publications = [
   {
     title: "Cell-biology-based therapeutic strategies for retinal degenerative disease",
     authors: "Williams DS, Chadha A, Hazim R, Gibbs D",
     journal: "Journal of Cell Biology",
     year: "2017",
     citations: "57", 
     doi: "https://doi.org/10.1083/jcb.201607025"
   },
   {
     title: "The cytoplasmic tail of rhodopsin: role in desensitization and phosphorylation",
     authors: "Azevedo AW, Doan T, Jeong H, Chan P, Williams D, Chen J, Rieke F",
     journal: "Journal of Neuroscience",
     year: "2015",  
     citations: "43",
     doi: "https://doi.org/10.1523/JNEUROSCI.3120-14.2015"
   },
   {
     title: "Molecular insights into Rep1 and choroideremia pathogenesis: A predominant role for Rab27a in RPE function",
     authors: "Wu X, Zhang H, Li W, Sallese M, Williams DS",
     journal: "Journal of Cell Biology",
     year: "2022",
     citations: "12",
     doi: "https://doi.org/10.1083/jcb.202110057" 
   },
   {
     title: "Cones and cone pathways remain functional in advanced retinal degeneration",
     authors: "Ellis EM, Paniagua AE, Scalabrino ML, Thapa M, Rathinavelu J, Jiao Y, Williams DS, Field GD, Fain GL, Sampath AP",
     journal: "Current Biology",
     year: "2023",
     citations: "New",
     doi: "https://doi.org/10.1016/j.cub.2023.02.073"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="David S. Williams Laboratory"
       subtitle="Photoreceptor Cell Biology and Retinal Disease"
       description="Understanding protein transport in retinal cells"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/williams.jpg"
             alt="Dr. David Williams"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">David S. Williams, Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-blue-800">Department of Ophthalmology</p>
           </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
             The Williams laboratory investigates the cellular mechanisms that underlie inherited retinal degenerations, focusing particularly on those involving defects in intracellular trafficking. Our studies involve molecular cell biology, with an emphasis on live-cell imaging, to study protein transport in photoreceptors and the retinal pigment epithelium (RPE).
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Current Research Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Studying the molecular regulation of protein trafficking in photoreceptors and RPE cells, especially the mechanisms involved in rhodopsin transport and turnover
               </li>
               <li>
                 Investigating choroideremia, a genetic disease caused by defects in intracellular trafficking in the RPE, and developing therapeutic strategies
               </li>
               <li>
                 Examining the role of molecular motors and their regulation in retinal cell function and survival
               </li>
               <li>
                 Developing and testing gene therapy approaches for treating inherited retinal diseases
               </li>
               <li>
                 Understanding the cellular mechanisms of photoreceptor disc renewal and their implications for retinal health
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our research aims to understand the fundamental cellular processes that are essential for photoreceptor and RPE cell function, and how defects in these processes lead to retinal degeneration. This knowledge is critical for developing treatments for inherited retinal diseases.
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