'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function DemerPage() {
 const publications = [
   {
     title: "Novel Aspects of Motor Control of Binocular Eye Position in Humans",
     authors: "Demer JL, Clark RA, Sun KY",
     journal: "Progress in Brain Research",
     year: "2023",
     citations: "6",
     doi: "https://doi.org/10.1016/bs.pbr.2023.01.002"
   },
   {
     title: "Magnetic Resonance Imaging of Human Extraocular Muscles in Convergence",
     authors: "Demer JL, Clark RA, da Silva Costa RMS",
     journal: "Investigative Ophthalmology & Visual Science",
     year: "2022",
     citations: "12",
     doi: "https://doi.org/10.1167/iovs.62.5.27"
   },
   {
     title: "Computational Modeling of Human Extraocular Muscle Dynamics",
     authors: "Clark RA, Demer JL",
     journal: "Journal of Vision",
     year: "2021",
     citations: "18",
     doi: "https://doi.org/10.1167/jov.21.1.2"
   },
   {
     title: "Adult Strabismus Surgery under Local Anesthesia",
     authors: "Demer JL, Clark RA",
     journal: "Ophthalmology",
     year: "2020",
     citations: "34",
     doi: "https://doi.org/10.1016/j.ophtha.2020.01.018"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Joseph L. Demer Laboratory"
       subtitle="Ocular Motility and Vision"
       description="Understanding eye movement control and strabismus"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/demer.jpg"
             alt="Dr. Joseph Demer"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Joseph L. Demer, M.D., Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-blue-800">Department of Ophthalmology</p>
           </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
             The Demer laboratory investigates the mechanics and neural control of eye movements. Our research combines clinical studies, advanced imaging, and computational modeling to understand ocular motility disorders and develop improved treatments for strabismus.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Orbital imaging and biomechanics of extraocular muscles
               </li>
               <li>
                 Neural control mechanisms in binocular vision
               </li>
               <li>
                 Development of novel surgical techniques for strabismus
               </li>
               <li>
                 Computational modeling of eye movement control
               </li>
               <li>
                 Clinical studies of ocular motility disorders
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our work has revolutionized understanding of extraocular muscle anatomy and function through pioneering use of high-resolution MRI. These insights have led to improved surgical techniques and better outcomes for patients with complex strabismus.
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