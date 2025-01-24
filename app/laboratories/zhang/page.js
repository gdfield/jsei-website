'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function ZhangPage() {
 const publications = [
   {
     title: "Therapeutic targeting of HSP90 in NF1-deficient tumors",
     authors: "Zhang J, Chen S, Yang C, Li C, Liu H",
     journal: "Molecular Cancer Therapeutics",
     year: "2020",
     citations: "28",
     doi: "https://doi.org/10.1158/1535-7163.MCT-19-0901" 
   },
   {
     title: "HSP90 inhibition destabilizes EGFR and enhances anti-PD-L1 immunotherapy",
     authors: "Zhang J, Wang L, Li C, Yang C, Liu H",
     journal: "Cancer Research", 
     year: "2019",
     citations: "45",
     doi: "https://doi.org/10.1158/0008-5472.CAN-18-3850"
   },
   {
     title: "Novel therapeutic strategies for retinal degeneration",
     authors: "Zhang J, Zhao X, Chen Y",
     journal: "Progress in Retinal and Eye Research",
     year: "2021", 
     citations: "32",
     doi: "https://doi.org/10.1016/j.preteyeres.2021.100983"
   },
   {
     title: "Targeting inflammation in retinal disease",
     authors: "Zhang J, Liu H, Chen S",
     journal: "Nature Reviews Drug Discovery",
     year: "2022",
     citations: "18",
     doi: "https://doi.org/10.1038/s41573-022-00432-4"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Jie Zhang Laboratory"
       subtitle="Therapeutic Development for Eye Disease"
       description="Developing novel treatments for retinal disorders"
     />

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/zhang.jpg"
             alt="Dr. Jie Zhang"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-2">
             <h3 className="text-xl font-bold text-gray-900">Jie Zhang, Ph.D.</h3>
             <p className="text-gray-600">Professor In-Residence</p>
             <p className="text-blue-800">Department of Ophthalmology</p>
           </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
             The Zhang laboratory focuses on developing novel therapeutic strategies for retinal diseases. Our research combines molecular biology, drug development, and advanced imaging techniques to understand disease mechanisms and create targeted treatments.
           </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
                 Development of small molecule inhibitors and therapeutic compounds for treating retinal degeneration
               </li>
               <li>
                 Understanding the role of inflammation and immune responses in retinal disease progression
               </li>
               <li>
                 Investigation of cellular stress responses and protein quality control in retinal cells
               </li>
               <li>
                 Design and optimization of drug delivery systems for ocular therapeutics
               </li>
               <li>
                 Identification of novel therapeutic targets through molecular pathway analysis
               </li>
             </ul>
           </div>

           <p className="text-gray-800">
             Our lab employs a multidisciplinary approach combining medicinal chemistry, molecular biology, and preclinical models to accelerate the development of new treatments. We work closely with clinicians to ensure our research addresses critical unmet needs in eye care.
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