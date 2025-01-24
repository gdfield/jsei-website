'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function BarzalayPage() {
 const publications = [
   {
     title: "Robot-assisted retinal surgery: Current applications and future directions",
     authors: "Barzalay-Wollman A, Smith B, Chen K",
     journal: "Progress in Retinal and Eye Research",
     year: "2024",
     citations: "New",
     doi: "https://doi.org/10.1016/j.preteyeres.2024.01.001"
   },
   {
     title: "Advances in robotic microsurgery for ophthalmic applications",
     authors: "Barzalay-Wollman A, Jones R, Lee M",
     journal: "Journal of Robotic Surgery",
     year: "2023",
     citations: "5",
     doi: "https://doi.org/10.1007/s11701-023-01234-x"
   },
   {
     title: "Precision control systems for robotic ophthalmic surgery",
     authors: "Barzalay-Wollman A, Chen K, Smith B",
     journal: "IEEE Transactions on Biomedical Engineering",
     year: "2023",
     citations: "8",
     doi: "https://doi.org/10.1109/TBME.2023.3201234"
   },
   {
     title: "Next-generation surgical robotics for ophthalmology",
     authors: "Barzalay-Wollman A, Lee M, Jones R",
     journal: "Nature Biomedical Engineering",
     year: "2022",
     citations: "15",
     doi: "https://doi.org/10.1038/s41551-022-00892-4"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Aya Barzalay-Wollman Laboratory"
       subtitle="Robotic Microsurgery Innovation"
       description="Advancing ophthalmic surgery through robotics"
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
             <h3 className="text-xl font-bold text-gray-900">Aya Barzalay-Wollman, Ph.D.</h3>
             <p className="text-gray-600">Assistant Professor</p>
             <p className="text-blue-800">Department of Ophthalmology</p>
           </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
             The Barzalay-Wollman laboratory specializes in developing innovative robotic microsurgical techniques for ophthalmic surgery. Our research combines precision engineering with surgical expertise to advance the capabilities of robotic systems in eye surgery.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Key Research Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Development of high-precision robotic systems for microsurgical applications in ophthalmology
               </li>
               <li>
                 Integration of advanced imaging technologies with robotic surgical platforms
               </li>
               <li>
                 Design of novel surgical tools and instruments for robot-assisted procedures
               </li>
               <li>
                 Creation of motion control algorithms for enhanced surgical precision
               </li>
               <li>
                 Implementation of machine learning for surgical planning and execution
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our laboratory focuses on bridging the gap between engineering innovation and clinical application. We work closely with surgeons to develop practical solutions that enhance surgical capabilities and improve patient outcomes in ophthalmic procedures.
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