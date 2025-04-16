'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function DemerPage() {
  const publications = [
    {
      title: "Eye movements and the intraorbital subarachnoid space in optic neuropathy",
      authors: "Demer JL, Clark RA, Suh SY, Giaconi JA, Nouri-Mahdavi K, Law SK, Bonelli L, Arnold AC, Quiros P, Coleman A, Caprioli J",
      journal: "Invest. Ophthalmol. Vis. Sci",
      year: "2025",
      status: "in press",
      doi: "https://pubmed.ncbi.nlm.nih.gov/39847366/"
    },
    {
      title: "Postmortem digital image correlation and finite element modeling demonstrate posterior scleral deformations during optic nerve adduction tethering",
      authors: "Lim S, Kim K, Jafari S, Park J, Garcia SS, Demer JL",
      journal: "Bioengineering",
      year: "2024",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11117839/"
    },
    {
      title: "Optical coherence tomography angiography demonstrates strain and volume effects on optic disc and peripapillary vasculature caused by horizontal duction",
      authors: "Lim S, Tran A, Garcia SS, Demer JL",
      journal: "Cur. Eye Res",
      year: "2023",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10121887/"
    },
    {
      title: "Scanning laser ophthalmoscopy demonstrates disc and peripapillary strain during horizontal eye rotation in adults",
      authors: "Park J, Moon S, Lim S, Demer JL",
      journal: "Am. J. Ophthalmol",
      year: "2023",
      pages: "114-127",
      volume: "254",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11407688/"
    },
    {
      title: "Optic nerve traction during adduction in open angle glaucoma with normal versus elevated intraocular pressure",
      authors: "Demer JL, Clark RA, Suh SY, Giaconi J, Nouri-Mahdavi K, Law SK, Bonelli L, Coleman AL, Caprioli J",
      journal: "Cur. Eye Res",
      year: "2020",
      volume: "5",
      issue: "2",
      pages: "199-210",
      doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7398593/"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Joseph L. Demer Laboratory"
        subtitle="Ocular Motility and Vision"
        description="Understanding eye movement control and strabismus"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/demer.jpg"
              alt="Dr. Joseph Demer"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">Joseph L. Demer, M.D., Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Arthur L. Rosenbaum, MD, Chair in Pediatric Ophthalmology </p>
              <p className="text-gray-600">Departments of Ophthalmology and Neurology</p>
              <p className="text-gray-600">Director, Prototype Construction Core</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <a 
                  href="mailto:jld@jsei.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jld@jsei.ucla.edu
                </a>
                <br />
              <a 
                href="https://profiles.ucla.edu/joseph.demer" 
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
              While the extraocular muscles obviously play complex roles in ocular rotation and alignment, extraocular muscle forces must mechanically balance against the eyeball, optic nerve, and a network of suspensory tissues within the orbit. The effects of eye rotation are concentrated at the optic disc and propagate from it into surrounding retina, choroid, and sclera. The optic nerve both contributes to muscle loading, and is in turn loaded by the muscles, potentially contributing to: 1) strabismus, the misalignment of the eyes often associated with double vision; 2) normal tension glaucoma associated with visual loss; and 3) pathologic myopia, the elongation and deformation of the eye causing nearsightedness. The Demer lab studies the dynamic ocular motility contribution to these disorders.
            </p>
            
            <p className="text-gray-800">
              The Demer Lab studies mechanisms of strabismus by detailed clinical measurements of ocular motility in normal volunteers and patients with specific forms of strabismus such as superior oblique palsy and masquerading conditions. Specialized magnetic resonance imaging (MRI) technique quantitatively demonstrates the anatomy and function of the extraocular muscles and associated connective tissues in the eye sockets. Lumped parameter and finite element computational models are used to test hypotheses about mechanisms of strabismus, and to guide precision diagnosis and optimize surgical therapy for strabismus. Analysis of long-term results of standardized strabismus surgeries are used to develop and test quantitative, data-driven recommendations for use by surgeons worldwide. To date, these studies have fundamentally changed the understanding of the anatomy of human muscles and associated connective tissues, elucidating common but heretofore unrecognized causes of common strabismus.
            </p>

            <p className="text-gray-800">
              The Demer lab performs MRI and optical imaging of the human eye during eye movements to measure the resulting deformations of the optic nerve, optic disc, retina, and choroid. Tissue deformations determined from the imaging using machine learning are compared with finite element computational models based on measured biomechanical properties of post-mortem human ocular tissues. Resulting models are then correlated with clinical findings in patients with glaucoma and pathological myopia. These studies suggest that eye movements significantly to both common, blinding disorders, and may eventually improve their treatments.
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
                  {pub.volume && ` • ${pub.volume}`}
                  {pub.issue && `(${pub.issue})`}
                  {pub.pages && `: ${pub.pages}`}
                  {pub.status && ` • ${pub.status}`}
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

      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>Jules Stein Eye Institute - Research Division</p>
          <p className="mt-2">University of California, Los Angeles</p>
        </div>
      </footer>
    </div>
  );
}