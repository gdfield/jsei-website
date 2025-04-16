'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function FieldPage() {
  const publications = [
    {
      title: "Prevalence and severity of glaucoma in the California Medicare population",
      authors: "Tseng VL, Kitayama K, Yu F, Coleman AL",
      journal: "American Journal of Ophthalmology",
      year: "2024",
      doi: "https://pubmed.ncbi.nlm.nih.gov/37898281/"
    },
    {
      title: "Social vulnerability, prevalence of glaucoma, and incidence of glaucoma surgery in the California Medicare Population",
      authors: "Tseng VL, Kitayama K, Yu F, Pan D, Coleman AL",
      journal: "Ophthalmology Glaucoma",
      year: "2023",
      doi: "https://pubmed.ncbi.nlm.nih.gov/37211091/"
    },
    {
      title: "Disparities in vision health and eye care",
      authors: "Elam AR, Tseng VL, Rodriguez TM, Mike EV, Warren AK, Coleman AL",
      journal: "Ophthalmology",
      year: "2022",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36058735/"
    },
    {
      title: "Association between dietary salt intake and open and glaucoma in the Thessaloniki Eye Study",
      authors: "Tseng VL, Topouzis F, Yu F, Keskini C, Pappas T, Founti P, Anastasopoulos E, Harris A, Wilson MR, Coleman AL",
      journal: "Journal of Glaucoma",
      year: "2022",
      doi: "https://pubmed.ncbi.nlm.nih.gov/35474047/"
    },
    {
      title: "Racial and ethnic differences in the prevalence and treatment patterns for neovascular glaucoma in the American Academy of Ophthalmology IRIS Registry",
      authors: "Tseng VL, Pan D, Kitayama K, Yu F, Coleman AL",
      journal: "Ophthalmology Glaucoma",
      year: "2024",
      doi: "https://pubmed.ncbi.nlm.nih.gov/39032697/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/field.jpg"
          alt="Sampath Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 60%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">Victoria Tseng Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Epidemiology and Public Health in Ophthalmology</h2>
          <p className="text-lg md:text-4xl text-center">Risk factors and outcomes for eye diseases from a population-based perspective</p>
        </div>
      </div>
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/tseng.jpg"
              alt="Dr. Victoria Tseng"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Victoria Tseng M.D., Ph.D.</h3>
              <p className="text-gray-600">Assistant Professor</p>
              <p className="text-gray-600">Joan and Jerome Snyder Chair in Ophthalmology</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:vtseng@mednet.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vtseng@mednet.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/victoria.tseng" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
            Dr. Tseng is an Assistant Professor in Residence in the UCLA Department of Ophthalmology. 
            Her goal is to become an independent clinician-scientist focused on improving the quality 
            of glaucoma care in the United States. Specifically, Dr. Tseng focuses on leveraging data 
            to develop deeper understanding of individual and structural-level factors that influence
             glaucoma risk, management, and outcomes, and to use these findings to design targeted
              interventions to improve the quality of glaucoma care. To build a strong epidemiologic
               research foundation fully integrated with ophthalmology, Dr. Tseng completed training
                in the EyeSTAR program at UCLA, during which she completed a PhD in epidemiology at the UCLA Fielding
                 School of Public Health under the mentorship of Dr. Anne Coleman along with ophthalmology residency at
                  the UCLA Stein Eye Institute. During this time, she gained in-depth experience working with large datasets,
                   with a PhD dissertation focused on cataract surgery outcomes, and also performed several observational studies
                    of risk factors for glaucoma. Several of Dr. Tseng's early career research initiatives focused on
                     demographic and social factors as they relate to glaucoma care. She was a member of the White Paper 
                     Sub Task Force of the American Academy of Ophthalmology Task Force for Disparities in Eye Care, during 
                     which she performed a comprehensive review of glaucoma care disparities in the literature. Additionally, 
                     she received an American Glaucoma Society Mentoring for the Advancement of Physician Scientists Award, 
                     Research to Prevent Blindness and American Academy of Ophthalmology Award for IRIS Registry Research, 
                     and Research to Prevent Blindness Career Development Award and to examine various demographic and 
                     socioeconomic factors as they relate to glaucoma care and outcomes. With her future research, Dr. 
                     Tseng aims to continue performing large-scale data-driven studies individual and structural level 
                     factors as they relate to the quality of care for glaucoma and other chronic eye diseases. 
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