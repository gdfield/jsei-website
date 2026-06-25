import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export const metadata = {
  title: 'Steven Nusinowitz Laboratory',
  description: "Dr. Nusinowitz's research focused on the assessment of retinal and visual pathway function using electrophysiological methods including electroretinogra...",
};

export default function NusinowitzPage() {
  const publications = [];

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Steven Nusinowitz",
  "jobTitle": "Associate Professor Emeritus",
  "affiliation": {
    "@type": "ResearchOrganization",
    "name": "Jules Stein Eye Institute",
    "url": "https://julessteinlabs.org"
  },
  "url": "https://julessteinlabs.org/laboratories/nusinowitz",
  "description": "Dr. Nusinowitz's research focused on the assessment of retinal and visual pathway function using electrophysiological methods including electroretinography (ERG) to characterize mouse models of retinal disease.",
  "knowsAbout": [
    "Visual Electrophysiology",
    "ERG",
    "Retinal Biology"
  ],
  "worksFor": {
    "@type": "CollegeOrUniversity",
    "name": "University of California, Los Angeles",
    "alternateName": "UCLA"
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Navbar />
      <main id="main-content">
      <Hero
        title="Steven Nusinowitz Laboratory"
        subtitle="Visual Electrophysiology and Retinal Function"
        description="Characterizing retinal function and disease using advanced electrophysiological methods"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img
              src="/images/faculty/Nusinowitz.jpg"
              alt="Dr. Steven Nusinowitz"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Steven Nusinowitz, Ph.D.</h3>
              <p className="text-gray-600">Associate Professor Emeritus</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <p className="text-gray-600">University of California, Los Angeles</p>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Nusinowitz's research focused on the assessment of retinal and visual pathway
              function using electrophysiological methods, most notably electroretinography (ERG).
              His work developed and refined techniques for measuring the electrical responses of
              the retina to light in both animal models and human patients.
            </p>
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>How can electroretinography be used to sensitively detect and track retinal dysfunction in mouse models of disease?</li>
                <li>What electrophysiological signatures distinguish different forms of inherited retinal degeneration?</li>
                <li>How can ERG and visual evoked potentials assess the efficacy of experimental therapeutics in preclinical models?</li>
                <li>What functional outcomes best predict the success of gene therapy and other interventions for retinal disease?</li>
              </ul>
            </div>
            <p className="text-gray-800">
              Dr. Nusinowitz's electrophysiological expertise has supported numerous research
              programs across JSEI, providing critical functional readouts for studies of
              retinal degeneration, neuroprotection, and gene therapy.
            </p>
          </div>
        </div>

        {publications.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Publications</h2>
            <div className="space-y-3">
              {publications.map((pub, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
                  <p className="text-gray-700 mb-1">{pub.authors}</p>
                  <p className="text-gray-600">{pub.journal} ({pub.year})</p>
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
        )}
      </div>

      </main>
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}
