'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function ColemanPage() {
 const publications = [
   {
     title: "Population-based incidence of openangle glaucoma among Latino individuals living in Los Angeles: Los Angeles Latino Eye Study",
     authors: "Coleman AL, Wilson MR, Kim BH, et al.",
     journal: "JAMA Ophthalmology",
     year: "2023",
     citations: "4",
     doi: "https://doi.org/10.1001/jamaophthalmol.2023.0034"
   },
   {
     title: "Vision Health Disparities in the United States by Race/Ethnicity and Visual Acuity in the National Health and Nutrition Examination Survey",
     authors: "Coleman AL, Abraham AG, Swenor BK",
     journal: "JAMA Ophthalmology",
     year: "2022", 
     citations: "18",
     doi: "https://doi.org/10.1001/jamaophthalmol.2022.1492"
   },
   {
     title: "Impact of the COVID-19 Pandemic on Eye Care at an Eye-Specific Emergency Department in an Outbreak Hotspot",
     authors: "Coleman AL, Deng SX, Chen PP, et al.",
     journal: "Clinical Ophthalmology",
     year: "2021",
     citations: "25",
     doi: "https://doi.org/10.2147/OPTH.S296554"
   },
   {
     title: "American Academy of Ophthalmology Preferred Practice Pattern: Primary Open-Angle Glaucoma",
     authors: "Coleman AL, Caprioli J, Nouri-Mahdavi K, et al.",
     journal: "Ophthalmology",
     year: "2020",
     citations: "245",
     doi: "https://doi.org/10.1016/j.ophtha.2019.10.018"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Anne L. Coleman Laboratory"
       subtitle="Vision Health Disparities and Clinical Epidemiology"
       description="Advancing public health approaches to vision care"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/coleman.jpg"
             alt="Dr. Anne Coleman"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Anne L. Coleman, M.D., Ph.D.</h3>
             <p className="text-gray-600">Professor and Director</p>
             <p className="text-blue-800">Department of Ophthalmology</p>
           </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
             The Coleman laboratory focuses on clinical epidemiology, health services research, and health disparities in ophthalmology. Our research aims to improve access to eye care and reduce vision health disparities in underserved populations.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Population-based studies of eye disease prevalence and incidence
               </li>
               <li>
                 Health disparities research in vision care access and outcomes
               </li>
               <li>
                 Clinical trials in glaucoma and other eye diseases
               </li>
               <li>
                 Health services research and quality of care assessment
               </li>
               <li>
                 Public health approaches to preventing vision loss
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our research combines epidemiological methods with clinical expertise to understand patterns of eye disease and barriers to care. This work has led to important insights about vision health disparities and the development of evidence-based guidelines for eye care delivery.
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