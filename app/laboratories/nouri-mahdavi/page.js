'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function NouriMahdaviPage() {
  const publications = [
    {
      title: "Comparison of Retinal Nerve Fiber Layer and Ganglion Cell Complex Rates of Change in Patients With Moderate to Advanced Glaucoma",
      authors: "Mohammadi M, Su E, Mohammadzadeh V, Besharati S, Martinyan A, Coleman AL, Law SK, Caprioli J, Weiss RE, Nouri-Mahdavi K",
      journal: "American Journal of Ophthalmology",
      year: "2024",
      citations: "",
      doi: "https://doi.org/10.1016/j.ajo.2024.07.025"
    },
    {
      title: "Prediction of Visual Field Progression with Baseline and Longitudinal Structural Measurements Using Deep Learning",
      authors: "Mohammadzadeh V, Wu S, Besharati S, Davis T, Vepa A, Morales E, Edalati K, Rafiee M, Martinyan A, Zhang D, Scalzo F, Caprioli J, Nouri-Mahdavi K",
      journal: "American Journal of Ophthalmology",
      year: "2024",
      citations: "",
      doi: "https://doi.org/10.1016/j.ajo.2024.02.007"
    },
    {
      title: "Detecting Fast Progressors: Comparing a Bayesian Longitudinal Model to Linear Regression for Detecting Structural Changes in Glaucoma",
      authors: "Besharati S, Su E, Mohammadzadeh V, Mohammadi M, Caprioli J, Weiss RE, Nouri-Mahdavi K",
      journal: "American Journal of Ophthalmology",
      year: "2024",
      citations: "",
      doi: "https://doi.org/10.1016/j.ajo.2024.01.024"
    },
    {
      title: "Prediction of Central Visual Field Measures From Macular OCT Volume Scans With Deep Learning",
      authors: "Mohammadzadeh V, Vepa A, Li C, Wu S, Chew L, Mahmoudinezhad G, Maltz E, Sahin S, Mylavarapu A, Edalati K, Martinyan J, Yalzadeh D, Scalzo F, Caprioli J, Nouri-Mahdavi K",
      journal: "Translational Vision Science & Technology",
      year: "2023",
      citations: "",
      doi: "https://doi.org/10.1167/tvst.12.11.5"
    },
    {
      title: "Association of Blood Pressure With Rates of Macular Ganglion Cell Complex Thinning in Patients With Glaucoma",
      authors: "Mohammadzadeh V, Su E, Mohammadi M, Law SK, Coleman AL, Caprioli J, Weiss RE, Nouri-Mahdavi K",
      journal: "JAMA Ophthalmology",
      year: "2023",
      citations: "",
      doi: "https://doi.org/10.1001/jamaophthalmol.2022.6092"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Kouros Nouri-Mahdavi Laboratory"
        subtitle="Glaucoma Diagnostics and Advanced Imaging"
        description="Advancing the early detection and treatment of glaucoma through innovative imaging and AI technologies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/kouros2.jpg"
              alt="Dr. Kouros Nouri-Mahdavi"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Kouros Nouri-Mahdavi, M.D., M.Sc.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Kay K. Pick Endowed Chair in Glaucoma Research</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Chief, Glaucoma Division</p>
              <p className="text-gray-600">Director, Glaucoma Advaced Imaging and AI Laboratory</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="https://profiles.ucla.edu/kouros.nouri-mahdavi" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faculty Profile
                </a>
            </div>
          </div>
          </div>

          {/* Research Description */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
            Dr. Nouri-Mahdavi has an active clinical practice managing adult glaucoma patients and complex cataract surgeries. Dr. Nouri-Mahdavi's research focuses on functional and structural measurements for optimizing diagnosis of glaucoma and detection of disease progression, use of machine learning approaches in glaucoma diagnostics, and study of surgical outcomes in glaucoma. He has been the recipient of many awards including the American Academy of Ophthalmology's Secretariat and Achievement Awards, American Glaucoma Society MAPS Grant Award, the American Glaucoma Society Early and Mid-Career Clinician Scientist Awards, the Gerald Oppenheimer Family Foundation Center for Prevention of Eye Disease Award, Senior Alcon Research Award, and NIH K23 and R01 awards. He has been the co-recipient of UCLA Innovation Awards in 2018 and 2019 for translational research projects. His research is currently funded by an NIH R01 award to optimize detection of glaucoma progression in eyes with advanced glaucoma.
                      </p>
            
            <p className="text-gray-800">
            Dr. Nouri-Mahdavi is a clinician-scientist who continues to teach and publish extensively. He frequently lectures at national and international meetings. He is currently a member of the American Academy of Ophthalmology's (AAO), Association for Research in Vision and Ophthalmology, and the Chair of the AGS' Annual Meeting Committee. He serves on the Editorial Boards of Journal of Glaucoma, International Glaucoma Review, and Journal of Ophthalmic and Vision Research.
            </p>
          </div>
        </div>

        {/* Publications Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
                <p className="text-gray-700 mb-1">{pub.authors}</p>
                <p className="text-gray-600">
                  {pub.journal} ({pub.year})
                </p>
                {pub.doi && (
                  <a 
                    href={pub.doi}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Publication
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}