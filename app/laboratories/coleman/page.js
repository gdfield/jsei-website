'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function ColemanPage() {
 const publications = [
   {
     title: "Vision Impairment and Combined Vision and Hearing Impairment Predict Cognitive and Functional Decline in Older Women",
     authors: "Lin MY, Gutierrez PR, Stone KL, Yaffe K, Ensrud KE, Fink HA, Sarkisian CA, Coleman AL, Mangione CM",
     journal: "Journal of the American Geriatrics Society",
     year: "2004",
     volume: "52",
     issue: "12",
     pages: "1996-2002",
     doi: "https://doi.org/10.1111/j.1532-5415.2004.52554.x"
   },
   {
     title: "Disparities in Vision Health and Eye Care",
     authors: "Elam AR, Tseng VL, Rodriguez TM, Mike EV, Warren AK, Coleman AL",
     journal: "Ophthalmology",
     year: "2022",
     volume: "129",
     issue: "10",
     pages: "e89-e113",
     doi: "https://doi.org/10.1016/j.ophtha.2022.07.010"
   },
   {
     title: "Predictive factors for glaucomatous visual field progression in the Advanced Glaucoma Intervention Study",
     authors: "Nouri-Mahdavi K, Hoffman D, Coleman AL, Liu G, Li G, Gaasterland D, Caprioli J",
     journal: "Ophthalmology",
     year: "2004",
     volume: "111",
     issue: "9",
     pages: "1627-1635",
     doi: "https://doi.org/10.1016/j.ophtha.2004.02.017"
   },
   {
     title: "Intraocular Pressure Fluctuation: A Risk Factor for Visual Field Progression at Low Intraocular Pressures in the Advanced Glaucoma Intervention Study",
     authors: "Caprioli J, Coleman AL",
     journal: "Ophthalmology",
     year: "2008",
     volume: "115",
     issue: "7",
     pages: "1123-1129.e3",
     doi: "https://doi.org/10.1016/j.ophtha.2007.10.031"
   },
   {
     title: "Initial Clinical Experience With the Ahmed Glaucoma Valve Implant",
     authors: "Coleman AL, Hill R, Wilson MR, Choplin N, Kotas-Neumann R, Tam M, Bacharach J, Panek WC",
     journal: "American Journal of Ophthalmology",
     year: "1995",
     volume: "120",
     issue: "1",
     pages: "23-31",
     doi: "https://doi.org/10.1016/S0002-9394(14)73755-9"
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
             <p className="text-gray-600">Professor</p>
             <p className="text-gray-600">Departments of Ophthalmology (Chair) and Epidemiology</p>
             <p className="text-gray-600">Director</p>
             <p className="text-gray-600">Jules Stein Eye Institute</p>
             <a 
                  href="https://profiles.ucla.edu/anne.coleman" 
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
           Dr. Coleman’s research areas of expertise include ophthalmology, health policy, community-based interventions, health disparities, big data, and behavioral health factors as they relate to ophthalmology, eye health, and vision research.  Dr. Coleman has investigated a number of risk factors and systemic outcomes of age-related eye diseases using multiple population-based studies including the National Health and Nutrition Examination Survey (NHANES), Thessaloniki Eye Study (TES) and Study of Osteoporotic Fractures (SOF).  In 2005-2008 NHANES data, she and collaborators found that an estimated 2.4 million persons in the US have undetected and untreated glaucoma, with a higher burden in minorities and the elderly. Other studies using the NHANES data include the association between atopic disease and glaucoma, association of exercise intensity and glaucoma, and dietary fatty acid intake with glaucoma in the US and the association of e-cigarette use and glaucoma. In the TES, the prevalence of pseudoexfoliation syndrome in Greece was 9% at baseline, and the 12-year incidence was 19.6%. In TES, we also examined prevalence and risk factors for age-related macular degeneration (AMD), and associations between ocular perfusion pressure and glaucoma. In SOF, the progression of AMD was associated with declining vision-specific quality of life, and AMD was a predictor of poor survival in women 80 years and older. Additional AMD risk factors examined in SOF included smoking, alcohol use, and postmenopausal hormonal therapy. As a whole these studies contribute information about the prevalence and incidence of age-related eye diseases in multiple populations worldwide, and associations between lifestyle, systemic factors, and age-related eye diseases.
                      </p>
          

           <p className="text-gray-800">
           Dr. Coleman was the Principal Investigator for the UCLA Preschool Vision Program (UPVP), funded by a 4.1 million dollar grant from First 5LA. During this five-year program, we screened 90,000 children with the handheld auto-refractometer (Retinomax 3; Righton, Japan) and examined 9,713 of them with a comprehensive eye examination. There were 8,281 pairs of free eyeglasses given for refractive error and referrals were given to specialists for further care if needed. This study found that there is a large proportion of preschoolers with uncorrected refractive errors that have unmet needs in terms of refractive correction, and identified barriers, limitations and challenges for a successful vision screening programs. The study also suggested that the vision screening of preschoolers using the Retinomax machine did lead to the diagnosis and early treatment of uncorrected refractive errors and amblyopia.
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
                 {pub.journal} {pub.year}; {pub.volume}({pub.issue}): {pub.pages}
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