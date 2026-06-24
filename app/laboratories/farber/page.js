'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function FarberPage() {
  const publications = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content">
      <Hero
        title="Deborah Farber Laboratory"
        subtitle="Molecular Biology of Retinal Degenerations"
        description="Uncovering the genetic and biochemical basis of inherited retinal disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img
              src="/images/faculty/Farber.jpg"
              alt="Dr. Deborah Farber"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Deborah Farber, Ph.D.</h3>
              <p className="text-gray-600">Professor Emeritus</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <p className="text-gray-600">University of California, Los Angeles</p>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-gray-800">
              Dr. Farber's research identified the genetic and biochemical basis of inherited
              retinal degenerations. Her landmark work characterized mutations in the β-subunit
              of rod cGMP-phosphodiesterase (PDE6B) that cause retinitis pigmentosa, elucidating
              the molecular mechanisms that drive photoreceptor cell death.
            </p>
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>What genetic mutations underlie inherited photoreceptor degenerations such as retinitis pigmentosa?</li>
                <li>How does dysregulation of cGMP-phosphodiesterase lead to photoreceptor cell death?</li>
                <li>What molecular pathways can be targeted to slow or prevent photoreceptor loss?</li>
                <li>How can mouse models of retinal degeneration inform the development of gene therapies for human disease?</li>
              </ul>
            </div>
            <p className="text-gray-800">
              Dr. Farber's discoveries laid the foundation for gene therapy approaches to treating
              inherited blindness and established the Jules Stein Eye Institute as a leader in
              the molecular genetics of retinal disease.
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
