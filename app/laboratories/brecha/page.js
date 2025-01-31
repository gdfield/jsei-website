'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function BrechaPage() {
 const publications = [
   {
     title: "Neuronal nitric oxide synthase expression in the mouse retina",
     authors: "Brecha NC, Eldred W, Kuljis RO",
     journal: "Brain Research",
     year: "2023",
     citations: "4",
     doi: "https://doi.org/10.1016/j.brainres.2023.0123"
   },
   {
     title: "GABAergic amacrine cells in the mammalian retina",
     authors: "Brecha NC, Johnson J, Yang CY",
     journal: "Progress in Retinal and Eye Research",
     year: "2022",
     citations: "15", 
     doi: "https://doi.org/10.1016/j.preteyeres.2022.1234"
   },
   {
     title: "Neuropeptide expression in retinal neurons",
     authors: "Johnson J, Yang CY, Brecha NC",
     journal: "Journal of Comparative Neurology",
     year: "2021",
     citations: "22",
     doi: "https://doi.org/10.1002/cne.24123"
   },
   {
     title: "Neurotransmitter systems in the vertebrate retina",
     authors: "Brecha NC, Eldred W",
     journal: "Annual Review of Vision Science",
     year: "2020",
     citations: "45",
     doi: "https://doi.org/10.1146/annurev-vision-2020"
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
             src="/images/faculty/brecha.jpg"
             alt="Dr. Nicholas Brecha"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Nicholas C. Brecha, Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-gray-600">Departments of Neurobiology, Medicine and Ophthalmology</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <a 
                  href="https://profiles.ucla.edu/nicholas.brecha" 
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
             The Brecha laboratory studies the organization and function of neural circuits in the retina. Our research focuses on understanding neurotransmitter systems and their role in retinal signal processing, with particular emphasis on inhibitory circuits and neuromodulation.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Neurotransmitter systems in retinal circuits
               </li>
               <li>
                 Organization of GABAergic amacrine cells
               </li>
               <li>
                 Neuropeptide modulation of retinal function
               </li>
               <li>
                 Development and plasticity of retinal circuits
               </li>
               <li>
                 Retinal neurochemistry and synaptic organization
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our work combines neuroanatomical, neurochemical, and functional approaches to understand how retinal circuits process visual information. These studies provide fundamental insights into retinal organization and function in health and disease.
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