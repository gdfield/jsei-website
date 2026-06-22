'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function GilhooleyPage() {
  const publications = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero
        title="Gilhooley Laboratory"
        subtitle="Neuro-ophthalmology and ipRGC Biology"
        description="Understanding why intrinsically photosensitive retinal ganglion cells survive optic nerve disease"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img
              src="/images/faculty/Gilhooley.jpeg"
              alt="Dr. Michael Gilhooley"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Michael Gilhooley, MBBChir, PhD</h3>
              <p className="text-gray-600">Assistant Professor In-Residence</p>
              <p className="text-gray-600">Department of Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <p className="text-gray-600">University of California, Los Angeles</p>
              <div className="flex flex-col space-y-2 pt-2">
                <a
                  href="https://profiles.ucla.edu/michael.gilhooley"
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
              The Gilhooley laboratory investigates intrinsically photosensitive retinal ganglion
              cells (ipRGCs) — a specialized subset of retinal ganglion cells that express the
              photopigment melanopsin — and their remarkable resilience in inherited optic
              neuropathies. In diseases such as dominant optic atrophy (OPA1) and Leber
              hereditary optic neuropathy (LHON), conventional retinal ganglion cells are lost
              in large numbers, yet ipRGCs are selectively spared.
            </p>
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Key research questions include:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Why are ipRGCs selectively resistant to degeneration in inherited optic neuropathies?</li>
                <li>What role does melanopsin signaling play in conferring neuroprotection?</li>
                <li>Can the survival mechanisms of ipRGCs be harnessed to protect conventional retinal ganglion cells from disease?</li>
                <li>How does ipRGC biology differ across disease states such as OPA1 and LHON?</li>
              </ul>
            </div>
            <p className="text-gray-800">
              Dr. Gilhooley combines his expertise in neuro-ophthalmology and adult strabismus
              with basic science investigation to translate findings from ipRGC biology toward
              neuroprotective therapies for patients with optic nerve disease.
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

      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}
