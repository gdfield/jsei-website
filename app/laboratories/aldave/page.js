'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function AldavePage() {
 const publications = [
   {
     title: "Fuchs Endothelial Corneal Dystrophy: Recent advances in understanding genetic risk and pathophysiologic mechanisms",
     authors: "Aldave AJ, Chen J, Zhu AY, Han J",
     journal: "Progress in Retinal and Eye Research",
     year: "2023",
     citations: "12",
     doi: "https://doi.org/10.1016/j.preteyeres.2023.101146"
   },
   {
     title: "Clinical Outcomes of the First United States Clinical Trial of Bowman Layer Transplantation",
     authors: "Zhu AY, Marquezan MC, Kang BS, Aldave AJ",
     journal: "Ophthalmology",
     year: "2022",
     citations: "18",
     doi: "https://doi.org/10.1016/j.ophtha.2022.01.024"
   },
   {
     title: "Novel COL17A1 mutation in a family with epithelial recurrent erosion dystrophy",
     authors: "Han J, Chen J, Aldave AJ",
     journal: "American Journal of Ophthalmology Case Reports",
     year: "2021", 
     citations: "8",
     doi: "https://doi.org/10.1016/j.ajoc.2021.101016"
   },
   {
     title: "The genetics of keratoconus: a review",
     authors: "Aldave AJ, Han J, Frausto RF",
     journal: "Cornea",
     year: "2019",
     citations: "87",
     doi: "https://doi.org/10.1097/ICO.0000000000001989"
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
             src="/images/faculty/aldave.jpg"
             alt="Dr. Anthony Aldave"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Anthony J. Aldave, M.D.</h3>
             <p className="text-gray-600">Professor and Vice Chair</p>
             <p className="text-gray-600">Department of Ophthalmology</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <a 
                  href="https://profiles.ucla.edu/anthony.aldave" 
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
             The Aldave Laboratory investigates the genetic basis of inherited corneal disorders, with a particular focus on Fuchs endothelial corneal dystrophy and keratoconus. Our research combines clinical genetics with molecular biology to understand disease mechanisms and develop novel therapeutic approaches.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Identification and characterization of genetic factors in corneal diseases
               </li>
               <li>
                 Development of novel surgical techniques for corneal transplantation
               </li>
               <li>
                 Investigation of molecular pathways in corneal endothelial dysfunction
               </li>
               <li>
                 Clinical and genetic studies of rare corneal disorders
               </li>
               <li>
                 Translation of genetic discoveries into therapeutic strategies
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our laboratory combines clinical expertise with advanced genetic analysis to improve our understanding of corneal diseases. This work has led to the identification of novel disease-causing genes and the development of innovative surgical techniques for treating corneal disorders.
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