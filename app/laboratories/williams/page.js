'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function WilliamsPage() {
 const publications = [
   {
     title: "Productive infection of the retinal pigment epithelium by SARS-CoV-2: Initial effects and consideration of long-term consequences",
     authors: "Hultgren NW, Petcherski A, Torriano S, Komirisetty R, Sharma M, Zhou T, Burgess BL, Ngo J, Osto C, Shabane B, Shirihai OS, Kelesidis T, Williams DS",
     journal: "PNAS Nexus",
     year: "2025",
     doi: "https://pubmed.ncbi.nlm.nih.gov/39712068/"
   },
   {
     title: "Spatiotemporal live-cell analysis of photoreceptor outer segment membrane ingestion by the retinal pigment epithelium reveals actin-regulated scission",
     authors: "Umapathy A, Torten G, Paniagua, AE, Chung J, Tomlinson M, Lim C, Williams DS",
     journal: "Journal of Neuroscience",
     year: "2023",
     doi: "https://pubmed.ncbi.nlm.nih.gov/36878726/"
   },
   {
     title: "The cell biology of the retinal pigment epithelium",
     authors: "Lakkaraju A, Umapathy A, Tan LX, Daniele L, Philp NJ, Boesze-Battaglia K, Williams DS",
     journal: "Progress in Retina and Eye Research",
     year: "2020",
     doi: "https://pubmed.ncbi.nlm.nih.gov/32105772/"
   },
   {
     title: "Microtubule motors transport phagosomes in the RPE, and lack of KLC1 leads to AMD-like pathogenesis",
     authors: "Jiang M, Esteve-Rudd J, Lopes VS, Diemer T, Lillo C, Rump A, Williams DS",
     journal: "Journal of Cell Biology",
     year: "2015",
     doi: "https://pubmed.ncbi.nlm.nih.gov/26261180/"
   },
   {
     title: "Three-dimensional organization of nascent rod outer segment disk membranes",
     authors: "Volland S, Hughes LC, Kong C, Burgess BL, Linberg KA, Luna G, Zhou AH, Fisher SK, Williams DS",
     journal: "Proceedings of the National Academy Sciences",
     year: "2015",
     doi: "https://pubmed.ncbi.nlm.nih.gov/26578801/"
   }
 ];

 return (
   <div className="min-h-screen bg-gray-50">
 <Navbar />
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/williams.jpg"
          alt="Williams Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">David Williams Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Retinal Cell Biology</h2>
        </div>
      </div>

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="flex flex-col md:flex-row gap-8 mb-12">
         <div className="w-full md:w-1/3">
           <img 
             src="/images/faculty/williams.jpg"
             alt="Dr. David Williams"
             className="w-full rounded-lg shadow-lg"
           />
           <div className="mt-4 space-y-1">
             <h3 className="text-xl font-bold text-gray-900">David S. Williams, Ph.D.</h3>
             <p className="text-gray-600">Professor</p>
             <p className="text-gray-600">Departments of Ophthalmology and Neurobiology</p>
             <p className="text-gray-600">Director, Microscopy and Image Analysis Core</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <a 
                  href="https://profiles.ucla.edu/david.williams" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
                <br />
                <a 
                  href="https://www.uclahealth.org/eye/photoreceptor-rpe-cell-biology" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   Laboratory Website 
                </a>
           </div>
         </div>

         <div className="w-full md:w-2/3 space-y-6">
           <p className="text-gray-800">
           The Williams laboratory studies dynamic cellular processes in photoreceptor and RPE cells, with the aim of understanding basic cellular functions within these most highly specialized cells. Emphasis is on using advanced microscopy methods, including high-speed live-cell imaging and 3-D electron microscopy. 
                      </p>
           
           <div className="space-y-3">
             <p className="text-gray-900 font-semibold">Current Research Areas:</p>
             <ul className="list-disc pl-6 space-y-2 text-gray-800">
               <li>
               The delivery of opsin to the photoreceptor cilium and membrane shaping to form the disk membranes the photoreceptor outer segment.               </li>
               <li>
               RPE cell biology, especially the motility and interactions of organelles, such as mitochondria, melanosomes, phagosomes and endolysosomes.                </li>
               <li>
               Cell metabolism in relation to RPE cell differentiation. 
                              </li>
               <li>
               Retinal degeneration in Usher syndrome, involving the differentiation of patient-derived iPSCs into retinal cells, studies of MYO7A, and strategies for treatments via gene therapy.
               </li>
               <li>
               Mechanisms of other retinal degenerations, including choroideremia and macular degeneration.  
                            </li>
             </ul>
           </div>

           <p className="text-gray-800">
           By studying fundamental cellular processes that are essential for photoreceptor and RPE cell function, the lab's research is advancing general cell biological principles. It also provides an understanding of how defects in these processes lead to retinal degeneration.  This knowledge is critical for developing treatments for inherited retinal diseases.  
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