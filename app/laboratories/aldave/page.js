'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function AldavePage() {
  const publications = [
    {
      title: "Investigation of the functional impact of CHED- and FECD4-associated *SLC4A11* mutations in human corneal endothelial cells",
      authors: "Chung DD, Chen AC, Choo CH, Zhang W, Williams D, Griffis CG, Bonezzi P, Jatavallabhula K, Kurtz I, Sampath AP, Aldave AJ",
      journal: "PLOS ONE",
      year: "2024",
      citations: "",
      doi: "https://doi.org/10.1371/journal.pone.0296928"
    },
    {
      title: "Energy shortage in human and mouse models of SLC4A11-associated corneal endothelial dystrophies",
      authors: "Zhang W, Frausto R, Chung D, Griffis CG, Kao L, Chen A, Azimov R, Sampath AP, Kurtz I, Aldave A",
      journal: "Invest Ophthalmol Vis Sci",
      year: "2020",
      citations: "",
      doi: "https://doi.org/10.1167/iovs.61.8.39"
    },
    {
      title: "Phenotypic and functional characterization of corneal endothelial cells during in vitro expansion",
      authors: "Frausto RF, Swamy VS, Peh GSL, Boere PM, Hanser EM, Chung DD, George BL, Morselli M, Kao L, Azimov R, Pellegrini M, Kurtz I, Mehta JS, Aldave AJ",
      journal: "Sci Rep",
      year: "2020",
      citations: "",
      doi: "https://doi.org/10.1038/s41598-020-64311-x"
    },
    {
      title: "ZEB1 insufficiency causes corneal endothelial cell state transition and altered cellular processing",
      authors: "Frausto RF, Chung DD, Boere PM, Swamy VS, Duong HNV, Kao L, Azimov R, Zhang W, Carrigan L, Wong D, Morselli M, Zakharevich M, Hanser EM, Kassels A, Kurtz I, Pellegrini M, Aldave AJ",
      journal: "PLOS ONE",
      year: "2019",
      citations: "",
      doi: "https://doi.org/10.1371/journal.pone.0218279"
    },
    {
      title: "Posterior amorphous corneal dystrophy is associated with a deletion of small leucine-rich proteoglycans on chromosome 12",
      authors: "Kim M, Frausto RF, Rosenwasser GOD, Bui T, Le D, Stone EM, Aldave AJ",
      journal: "PLOS ONE",
      year: "2014",
      citations: "",
      doi: "https://doi.org/10.1371/journal.pone.0095037"
    }
  ];

 return (
   <div className="min-h-screen bg-gray-50">
     <Navbar />
     <Hero 
       title="Anthony J. Aldave Laboratory"
       subtitle="Corneal Dystrophies and Gene Therapy"
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
             <p className="text-gray-600">Bartly J. Mondino M.D., Chair in Ophthalmology </p>
             <p className="text-gray-600">Department of Ophthalmology</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <a 
                  href="mailto:aldave@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aldave@jsei.ucla.edu
                </a>
                <br />
                <a 
                  href="https://profiles.ucla.edu/anthony.aldave" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <br />
                <a 
                  href="https://www.uclahealth.org/departments/eye/research/research-laboratories/cornea-genetics-laboratory" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory Website
                </a>
           </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <div className="space-y-3">
             <h2 className="text-xl font-bold text-gray-900">Research Areas</h2>
             <p className="text-gray-800">
               Molecular genetic basis of inherited disorders of the cornea, known as the corneal dystrophies
             </p>
           </div>
           
           <div className="space-y-3">
             <h2 className="text-xl font-bold text-gray-900">Description</h2>
             <p className="text-gray-800">
               The Cornea Genetics Laboratory focuses on identifying and characterizing the molecular genetic basis of corneal dystrophies and elucidating the normal and disease biology of corneal endothelial cells.
             </p>
             
             <p className="text-gray-800">
               The Laboratory employs an array of genetic analysis tools to identify causative mutations associated with inherited corneal disorders and utilizes mouse and cell-based disease models to study the pathomechanisms via which the identified mutations lead to loss of corneal clarity, and thus loss of vision. The identification and elucidation of the genetic basis of the corneal dystrophies has allowed Dr. Aldave and colleagues to develop and test molecular therapeutics approaches in these same cell-based and animal models. In 2023, the Laboratory was selected to participate in the Foundation for the NIH Accelerating Medicines Partnership® (AMP®) Bespoke Gene Therapy Consortium and received funding from the California Institute for Regeneration Medicine to perform preclinical studies of AAV gene therapy for congenital hereditary endothelial dystrophy.
             </p>
             
             <p className="text-gray-800">
               The Laboratory is also involved in the characterization and optimization of ex vivo expansion of corneal endothelial cells, with the goal of transplanting the cells from one individual to multiple recipients. As it is estimated that worldwide only one donor cornea is available for every 70 that are needed, the use of expanded corneal endothelial cells to restore sight to individuals with corneal endothelial dysfunction, most commonly due to corneal endothelial dystrophies, will transform the current paradigm of one donor cornea restoring sight to only one recipient.
             </p>
           </div>
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