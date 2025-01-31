'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function SampathPage() {
  const publications = [
    {
      title: "Cones and cone pathways remain functional in advanced retinal degeneration",
      authors: "Ellis EM, Paniagua AE, Scalabrino ML, Thapa M, Rathinavelu J, Jiao Y, Williams DS, Field GD, Fain GL, Sampath AP",
      journal: "Current Biology",
      year: "2023",
      citations: "New",
      doi: "https://pubmed.ncbi.nlm.nih.gov/36977418/"
    },
    {
      title: "Rod photoreceptors avoid saturation in bright light by movement of the G protein transducin",
      authors: "Frederiksen R, Morshedian A, Tripathy SA, Zhou T, Travis GH, Fain GL, Sampath AP",
      journal: "Journal of Neuroscience",
      year: "2021",
      citations: "12",
      doi: "https://pubmed.ncbi.nlm.nih.gov/33593858/"
    },
    {
      title: "Elevated energy requirements of cone photoreceptors: Implications for retinal dysfunction",
      authors: "Ingram NT, Fain GL, Sampath AP",
      journal: "Proceedings of the National Academy of Sciences USA",
      year: "2020",
      citations: "15",
      doi: "https://pubmed.ncbi.nlm.nih.gov/32719136/"
    },
    {
      title: "Activation of rod input in a model of retinal degeneration reverses retinal remodeling and induces formation of functional synapses and recovery of visual signaling in the adult retina",
      authors: "Wang T, Pahlberg J, Cafaro J, Sampath AP*, Field GD*, Chen J*",
      journal: "Journal of Neuroscience",
      year: "2019",
      citations: "25",
      doi: "https://pubmed.ncbi.nlm.nih.gov/31285302/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
 <Navbar />
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/images/laboratory-banners/sampath.jpg"
          alt="Sampath Laboratory Banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-8xl font-bold text-center mb-2">Alapakkam Sampath Laboratory</h1>
          <h2 className="text-xl md:text-5xl font-semibold text-center mb-2">Phototransduction and Synaptic Transmission</h2>
          <p className="text-lg md:text-4xl text-center">Understanding visual processing in the retina</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/sampath.jpg"
              alt="Dr. Alapakkam Sampath"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Alapakkam Sampath, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Grace and Walter Lantz Endowed Chair in Ophthalmology</p>
              <p className="text-gray-600">Departments of Ophthalmology and Neurobiology</p>
              <p className="text-gray-600">Associate Director of Research</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="https://profiles.ucla.edu/alapakkam.sampath" 
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
              The goal of the Sampath laboratory is the elucidation of fundamental mechanisms of visual processing. 
              We have focused on generating a deeper understanding of development and signaling between photoreceptor 
              cells—the rods and cones—and their synaptic partners, the bipolar cells, to determine how information 
              is formed and processed within retinal circuits.
            </p>
            
            <div className="space-y-3">
              <p className="text-gray-900 font-semibold">Our research focuses on the following questions:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>
                  How can rod photoresponses in the mammalian retina provide such an enormous range of rod 
                  vision - from single-photon responses in few rods to light bright enough to activate thousands 
                  or tens of thousands of rhodopsin pigment molecules per second?
                </li>
                <li>
                  How do the many mechanisms of pigment regeneration influence photoreceptor and circuit-level 
                  sensitivity in steady light?
                </li>
                <li>
                  What are the molecules that determine the specificity of synaptic connections between 
                  photoreceptors and bipolar cells during development? How are rod and cone photoresponses 
                  integrated in the outer retina to provide a seamless shift from rod vision to cone vision 
                  as the light intensity increases?
                </li>
                <li>
                  What is the role of retinal remodeling in controlling visual sensitivity during photoreceptor 
                  degeneration? How is this remodeling affected when vision is restored with gene therapy?
                </li>
                <li>
                  How is retinal structure and function altered or conserved across the animal kingdom? What 
                  are the implications of these similarities and differences for the evolution of the vertebrate 
                  retina?
                </li>
              </ul>
            </div>

            <p className="text-gray-800">
              These questions remain of great interest because of the large proportion of visual deficits arising 
              from abnormal signaling, either within the phototransduction cascade or in synaptic transmission 
              from photoreceptor terminals to bipolar cells. To answer these questions, we employ classical 
              (but still state-of-the-art) physiological techniques to measure light-evoked responses of 
              photoreceptors, bipolar cells, and ganglion cells, which let us determine how the functional 
              properties of responses are constructed by the retinal circuitry.
            </p>
          </div>
        </div>

        {/* Publications Section */}
        <div className="mt-12">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Publications</h2>
  <div className="space-y-3">  {/* Changed from space-y-6 to space-y-3 */}
    {publications.map((pub, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">  {/* Changed p-6 to p-4 */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
        <p className="text-gray-700 mb-1">{pub.authors}</p>  {/* Changed mb-2 to mb-1 */}
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