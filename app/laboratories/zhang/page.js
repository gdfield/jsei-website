'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function ZhangPage() {
 const publications = [
   {
     title: "Corneal Stromal Stem Cell-Derived Extracellular Vesicles Attenuate ANGPTL7 Expression in the Human Trabecular Meshwork",
     authors: "Moujane F, Zhang C, Knight R, Lee JY, Deng SX, Zheng JJ",
     journal: "Transl Vis Sci Technol",
     year: "2025",
     doi: "https://doi.org/10.1167/tvst.14.1.21"
   },
   {
     title: "Somatic Mutations within Myocilin due to Aging May Be a Potential Risk Factor for Glaucoma",
     authors: "Sazhnyev Y, Venkat A, Zheng JJ",
     journal: "Genes (Basel)",
     year: "2024",
     doi: "https://doi.org/10.3390/genes15020203"
   },
   {
     title: "Wnt activation as a potential therapeutic approach to treat partial limbal stem cell deficiency",
     authors: "Bonnet C, González S, Deng SX, Zheng JJ",
     journal: "Sci Rep",
     year: "2023",
     doi: "https://doi.org/10.1038/s41598-023-42794-8"
   },
   {
     title: "Applying Protein-Protein Interactions and Complex Networks to Identify Novel Genes in Retinitis Pigmentosa Pathogenesis",
     authors: "Yoon SB, Ma YC, Venkat A, Liu CA, Zheng JJ",
     journal: "Int J Mol Sci",
     year: "2022",
     doi: "https://doi.org/10.3390/ijms23073962"
   },
   {
     title: "Oxidative stress upregulates Wnt signaling in human retinal microvascular endothelial cells through activation of dishevelled",
     authors: "Zhang C, Tannous E, Zheng JJ",
     journal: "J Cell Biochem",
     year: "2019",
     doi: "https://doi.org/10.1002/jcb.28679"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Jie J. Zhang Laboratory"
       subtitle="Therapeutic Development and AI-Powered Analysis in Vision Research"
       description=""
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
             <h3 className="text-xl font-bold text-gray-900">Jie J. Zhang, Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-gray-600">Department of Ophthalmology</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <div className="flex flex-col space-y-2">
             <a 
                  href="mailto:jzheng@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jzheng@jsei.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/jie.zheng" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <a 
                  href="https://www.uclahealth.org/departments/eye/research/research-laboratories/therapeutic-development-ophthalmology" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory Website
                </a>
             </div>
         </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
           Glaucoma and intraocular pressure (IOP).  Trabecular meshwork (TM) cells play a pivotal role in maintaining TM structure and regulating aqueous humor outflow. When TM cell function is compromised, structural disruptions lead to increased IOP, the primary risk factor for both primary open-angle glaucoma and steroid-induced glaucoma. Despite its significance, there remains a critical unmet need for effective, clinically viable therapies that target TM dysfunction. Their research focuses on developing transformative approaches to restore TM integrity, enhance aqueous humor drainage, and achieve sustained IOP reduction.
           </p>
           
           <p className="text-gray-800">
           Wnt Signaling and Retinal Neovascularization Diseases. Proliferative retinal neovascularization is a defining feature of several major retinal diseases, including diabetic retinopathy (DR) and retinopathy of prematurity (ROP). Wnt signaling plays a pivotal role in retinal vascular development, with Dishevelled (Dvl) acting as a key regulator of neovascularization, as demonstrated in the oxygen-induced retinopathy (OIR) mouse model. His laboratory has developed a series of small-molecule Wnt inhibitors that selectively target the Dvl PDZ domain, effectively blocking oxidative stress-induced neovascularization in human retinal vascular endothelial cells. These compounds provide a robust platform for further optimization and preclinical development, offering a promising therapeutic strategy for retinal neovascularization disorders.
           </p>

           <p className="text-gray-800">
           Small-Molecule Wnt Mimics for Corneal Limbal Stem Cell Regulation. Transplantation of cultured autologous limbal stem cells (LSCs) has revolutionized the treatment of limbal stem cell deficiency (LSCD), a leading cause of vision loss and blindness in corneal disorders, including aniridia. To enhance this approach, they have developed novel small-molecule Wnt mimics that activate Wnt signaling and strengthen the progenitor characteristics of LSCs. Since maintaining stem cell properties during expansion is crucial for successful ocular surface reconstruction, these small molecules hold significant promise for LSCD therapy and the development of new treatments for other corneal epithelial disorders.
           </p>

           <p className="text-gray-800">
           Inherited Retinal Dystrophies and Protein Interaction Network Analysis. Most inherited retinal dystrophies (IRDs) are monogenic disorders in which mutations in different causal genes lead to similar clinical manifestations. They hypothesize that the causal genes of a given IRD must be interconnected at the molecular level to drive the shared disease phenotype. To explore this, they developed an algorithm to integrate and analyze these causal genes within a protein interaction network. By dissecting the resulting network, they aim to uncover the underlying molecular mechanisms of IRDs, shedding light on disease pathogenesis and potential therapeutic targets.
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
                 {pub.journal} ({pub.year})
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