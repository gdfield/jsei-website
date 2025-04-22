'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function FainPage() {
 const publications = [
   {
     title: "Evolution of rod bipolar cells and rod vision",
     authors: "Frederiksen R, Peng YR, Sampath AP, Fain GL",
     journal: "Journal of Physiology",
     year: "2025",
     citations: "New",
     doi: "https://doi.org/10.1113/JP287652"
   },
   {
     title: "Cones and cone pathways remain functional in advanced retinal degeneration",
     authors: "Ellis EM, Paniagua AE, Scalabrino ML, Thapa M, Rathinavelu J, Jiao Y, Williams DS, Field GD, Fain GL, Sampath AP",
     journal: "Current Biology",
     year: "2023",
     citations: "5",
     doi: "https://doi.org/10.1016/j.cub.2023.02.073"
   },
   {
     title: "Membrane conductances of mouse cone photoreceptors",
     authors: "Ingram NT, Sampath AP, Fain GL",
     journal: "Journal of General Physiology",
     year: "2020",
     citations: "New",
     doi: "https://doi.org/10.1085/jgp.201912520"
   },
   {
     title: "A kinetic analysis of mouse rod and cone photoreceptor responses",
     authors: "Reingruber J, Ingram NT, Griffis C, Fain GL",
     journal: "Journal of Physiology",
     year: "2020",
     citations: "New",
     doi: "https://physoc.onlinelibrary.wiley.com/doi/10.1113/JP279524"
   },
   {
     title: "Why are rods more sensitive than cones?",
     authors: "Ingram NT, Sampath AP, Fain GL",
     journal: "Journal of Physiology",
     year: "2016",
     citations: "New",
     doi: "https://doi.org/10.1113/JP272556"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Gordon Fain Laboratory"
       subtitle="Photoreceptor Physiology"
       description=""
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/fain.jpg"
             alt="Dr. Gordon Fain"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Gordon L. Fain, Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-gray-600">Department of Ophthalmology</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <div className="flex flex-col space-y-2">
             <a 
                  href="mailto:gfain@ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gfain@ucla.edu
                </a>

                <a 
                  href="https://bioscience.ucla.edu/people/gordon-fain/" 
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
             The Fain laboratory studies the biophysical mechanisms of photoreceptor function and adaptation. Our research focuses on understanding how photoreceptors respond to light and adapt to different lighting conditions, contributing to both normal vision and retinal disease mechanisms.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Photoreceptor light adaptation mechanisms
               </li>
               <li>
                 Calcium regulation in photoreceptor function
               </li>
               <li>
                 Energy metabolism in rods and cones
               </li>
               <li>
                 Mechanisms of photoreceptor survival and degeneration
               </li>
               <li>
                 Cellular basis of light and dark adaptation
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our work combines electrophysiology and imaging approaches to understand the fundamental mechanisms of photoreceptor function. These studies have provided key insights into how the retina processes visual information and adapts to changing light conditions.
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