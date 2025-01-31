'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function DengPage() {
 const publications = [
   {
     title: "Ex vivo expanded human limbal stem cells maintain phenotype and functionality in an organ-cultured corneal epithelium model",
     authors: "Deng SX, Zhang Y, Chen R, Zhu Q",
     journal: "Cell Death & Disease",
     year: "2023",
     citations: "7",
     doi: "https://doi.org/10.1038/s41419-023-05784-2"
   },
   {
     title: "Limbal Stem Cell Deficiency: Current and Future Therapeutic Approaches",
     authors: "Deng SX, Borderie V, Chan CC, Dana R",
     journal: "Ophthalmology",
     year: "2022",
     citations: "24",
     doi: "https://doi.org/10.1016/j.ophtha.2022.02.012"
   },
   {
     title: "Single-cell RNA sequencing reveals cellular heterogeneity and molecular signatures of human limbal stem cells",
     authors: "Zhang Y, Chen R, Zhu Q, Deng SX",
     journal: "Nature Communications",
     year: "2021",
     citations: "45",
     doi: "https://doi.org/10.1038/s41467-021-23793-7"
   },
   {
     title: "Global Consensus on Definition, Classification, Diagnosis, and Staging of Limbal Stem Cell Deficiency",
     authors: "Deng SX, Borderie V, Chan CC, Dana R, et al.",
     journal: "Cornea",
     year: "2019",
     citations: "187",
     doi: "https://doi.org/10.1097/ICO.0000000000001820"
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
             src="/images/faculty/deng.jpg"
             alt="Dr. Sophie Deng"
             className="w-full rounded-lg shadow-lg"
           />
<div className="mt-4 space-y-2">
  <h3 className="text-xl font-bold text-gray-900">Sophie X. Deng, M.D., Ph.D.</h3>
  <p className="text-gray-600">Professor</p>
  <p className="text-gray-600">Department of Ophthalmology</p>
  <p className="text-gray-600">Jules Stein Eye Institute</p>
  <div className="flex flex-col space-y-2">
    <a 
      href="https://profiles.ucla.edu/sophie.deng" 
      className="text-blue-600 hover:text-blue-800 inline-block"
      target="_blank"
      rel="noopener noreferrer"
    >
      Faculty Profile
    </a>
  </div>
</div>
</div>  

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
             The Deng laboratory focuses on understanding corneal stem cell biology and developing novel therapeutic strategies for corneal diseases. Our research combines stem cell biology, tissue engineering, and translational medicine to restore vision in patients with corneal blindness.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Limbal stem cell biology and regenerative medicine
               </li>
               <li>
                 Development of cell-based therapies for corneal diseases
               </li>
               <li>
                 Bioengineering approaches for corneal tissue regeneration
               </li>
               <li>
                 Clinical translation of stem cell therapies
               </li>
               <li>
                 Molecular mechanisms of corneal wound healing and regeneration
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our laboratory is pioneering new approaches to expand and characterize limbal stem cells for therapeutic applications. This work has led to significant advances in understanding corneal stem cell biology and the development of novel treatments for limbal stem cell deficiency.
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