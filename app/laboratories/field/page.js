'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function FieldPage() {
  const publications = [
    {
      title: "GABAergic inhibition controls receptive field size, sensitivity and response polarity of direction selective ganglion cells near the threshold of vision",
      authors: "Roy S, Yao X, Rathinavelu J, Field GD",
      journal: "Journal of Neuroscience",
      year: "2024",
      doi: "https://doi.org/10.1523/JNEUROSCI.1979-23.2023"
    },
    {
      title: "Late gene therapy limits the restoration of retinal function in a mouse model of retinitis pigmentosa",
      authors: "Scalabrino ML, Thapa M, Wang T, Sampath AP, Chen J, Field GD",
      journal: "Nature Communications",
      year: "2023",
      doi: "https://www.nature.com/articles/s41467-023-44063-8"
    },
    {
      title: "Large scale interrogation of retinal cell function by 1-photon light sheet microscopy",
      authors: "Roy S, Wang D, Rudzite AM, Perry B, Scalabrino ML, Gong YY, Sher A, Field GD",
      journal: "Cell Reports Methods",
      year: "2023",
      doi: "https://doi.org/10.1016/j.crmeth.2023.100453"
    },
    {
      title: "Inter-mosaic coordination of retinal receptive fields",
      authors: "Roy S, Jun NY, Davis EL, Pearson J, Field GD",
      journal: "Nature",
      year: "2021",
      doi: "https://doi.org/10.1038/s41586-021-03317-5"
    },
    {
      title: "Ignoring correlated activity causes a failure of retinal population codes",
      authors: "Ruda K, Zylberberg J, Field GD",
      journal: "Nature Communications",
      year: "2020",
      doi: "https://doi.org/10.1038/s41467-020-18436-2"
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
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">Greg D. Field Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Visual Processing and Retinal Circuits</h2>
          <p className="text-lg md:text-4xl text-center">Understanding neural computation in the retina</p>
        </div>
      </div>
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/field.jpg"
              alt="Dr. Gregory Field"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Greg D. Field, Ph.D.</h3>
              <p className="text-gray-600">Associate Professor</p>
              <p className="text-gray-600">Joan and Jerome Snyder Vision Science Chair</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Assistant Director of Research</p>
              <p className="text-gray-600">Director, Live Imaging and Functional Evaluation Core</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="http://www.retinalcircuits.com" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laboratory Website
                </a> 
                <a 
                  href="https://www.ncbi.nlm.nih.gov/myncbi/gregory.field.1/bibliography/public/" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publications
                </a>
                <a 
                  href="https://profiles.ucla.edu/greg.field" 
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
              The Field laboratory investigates how neural circuits in the retina process visual information and adapt to different environmental conditions. Our research combines electrophysiology, imaging, and computational approaches to understand the fundamental principles of retinal computation.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Research Focus Areas:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  Neural circuits for motion processing
                </li>
                <li>
                  Adaptation to different light levels
                </li>
                <li>
                  Parallel processing in retinal pathways
                </li>
                <li>
                  Computational models of retinal function
                </li>
                <li>
                  Visual signal processing and encoding
                </li>
              </ul>
            </div>

            <p className="text-gray-800">
              Our research aims to understand how the retina performs complex computations and adapts to changing environmental conditions. This work provides insights into both fundamental principles of neural computation and potential therapeutic strategies for vision restoration.
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