'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function DengPage() {
 const publications = [
   {
     title: "Wnt activation as a potential therapeutic approach to treat partial limbal stem cell deficiency",
     authors: "Bonnet C, González S, Deng SX, Zheng JJ",
     journal: "Sci Rep",
     year: "2023",
     citations: "",
     doi: "https://doi.org/10.1038/s41598-023-42794-8",
     pubmed: "https://pubmed.ncbi.nlm.nih.gov/37735479/"
   },
   {
     title: "Stability and Function of Extracellular Vesicles Derived from Immortalized Human Corneal Stromal Stem Cells: A Proof of Concept Study",
     authors: "Lyu N, Knight R, Robertson SYT, Dos Santos A, Zhang C, Ma C, Xu J, Zheng J, Deng SX",
     journal: "AAPS J",
     year: "2022",
     citations: "",
     doi: "https://doi.org/10.1208/s12248-022-00767-1",
     pubmed: "https://pubmed.ncbi.nlm.nih.gov/36471035/"
   },
   {
     title: "Biomarkers of in vivo limbal stem cell function",
     authors: "Le Q, Chauhan T, Cordova D, Tseng CH, Deng SX",
     journal: "Ocul Surf",
     year: "2022",
     citations: "",
     doi: "https://doi.org/10.1016/j.jtos.2021.12.005",
     pubmed: "https://pubmed.ncbi.nlm.nih.gov/34902592/"
   },
   {
     title: "Wnt6 plays a complex role in maintaining human limbal stem/progenitor cells",
     authors: "Bonnet C, Oh D, Mei H, Robertson S, Chang D, Bourges JL, Behar-Cohen F, Zheng JJ, Deng SX",
     journal: "Sci Rep",
     year: "2021",
     citations: "",
     doi: "https://doi.org/10.1038/s41598-021-00273-y",
     pubmed: "https://pubmed.ncbi.nlm.nih.gov/34686698/"
   },
   {
     title: "Role of Jagged1-mediated Notch Signaling Activation in the Differentiation and Stratification of the Human Limbal Epithelium",
     authors: "González S, Halabi M, Ju D, Tsai M, Deng SX",
     journal: "Cells",
     year: "2020",
     citations: "",
     doi: "https://doi.org/10.3390/cells9091945",
     pubmed: "https://pubmed.ncbi.nlm.nih.gov/32842657/"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Sophie Deng Laboratory"
       subtitle="Cornea"
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
  <p className="text-gray-600">Walton Li Chair in Cornea and Uveitis</p>
  <p className="text-gray-600">Co-Chief, Cornea Division</p>
  <p className="text-gray-600">Vice Chair for Inspiring Excellence</p>
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

                <a 
                  href="https://www.uclahealth.org/departments/eye/research/research-laboratories/cornea-biology" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
                <a 
                  href="https://www.ncbi.nlm.nih.gov/myncbi/sophie.deng.1/bibliography/public/" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publications
                </a>
</div>
</div>
</div>  

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
           The Cornea Biology Laboratory, under Dr. Deng's direction, studies the limbal epithelial stem cells (LSCs) and their microenvironment to elucidate the mechanisms by which these cells and the niche factors aid in the regeneration of the corneal surface in patients suffering from limbal stem cell deficiency (LSCD). The role of signaling pathways such as Wnt and Notch in the regulation of LSCs and modulation of these signaling pathways in vitro and in vivo through small molecules is under investigation. 
                      </p>
           
                      <p className="text-gray-800">
                      Two clinical studies aimed to characterize the cellular changes in the cornea and limbus leading to LSCD and to study the safety and efficacy of LSC transplantation are ongoing. The first study aims to evaluate and validate in vivo parameters using multimodal imaging such as anterior segment optical coherence tomography (AS-OCT) and in vivo confocal microscopy (IVCM) to diagnose and stage LSCD and to assess LSCD treatment outcome. The second clinical study is a Phase I clinical trial to assess the safety, feasibility and efficacy of autologous cultivated LSC therapy in patients suffering from severe or total LSCD (https://classic.clinicaltrials.gov/ct2/show/NCT03957954).
                                            </p>


           <p className="text-gray-800">
           Another research project focused on the stromal cell layer of the cornea aims to treat corneal stromal scars with extracellular vesicles (EVs) derived from corneal stromal stem cells (CSSCs), which are multipotent mesenchymal stem cells that regenerate normal corneal stroma and significantly reduce corneal scarring by mediating anti-inflammatory and anti-fibrosis processes. The specific content (cargo) of the EVs and mechanism of action is also under investigation. Pre-clinical research is ongoing to develop an EV-based therapy that could be directly applied to the eye to reduce corneal stromal scarring and improve vision.
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
                 {pub.journal} ({pub.year}) {pub.citations && `• ${pub.citations} citations`}
               </p>
               <div className="flex space-x-4 mt-2">
                 <a 
                   href={pub.doi}
                   className="text-blue-600 hover:text-blue-800 text-sm"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   View Publication
                 </a>
                 <a 
                   href={pub.pubmed}
                   className="text-green-600 hover:text-green-800 text-sm"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   PubMed
                 </a>
               </div>
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