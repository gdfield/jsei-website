'use client'
import React from 'react';
import Hero from '@/app/components/Hero';
import Navbar from '@/app/components/Navbar';

export default function SunPage() {
  const publications = [
    {
      title: "A Membrane Receptor for Retinol Binding Protein Mediates Cellular Uptake of Vitamin A",
      authors: "Kawaguchi R, Yu J, Honda J, Hu J, Whitelegge J, Ping P, Wiita P, Bok D, Sun H",
      journal: "Science",
      year: "2007",
      volume: "315",
      pages: "820-825",
      doi: "https://doi.org/10.1126/science.1136244"
    },
    {
      title: "Receptor-Mediated Cellular Uptake Mechanism that is Coupled to Intracellular Storage",
      authors: "Kawaguchi R, Yu J, Ter-Stepanian M, Zhong M, Guo C, Yuan Q, Jin M, Travis G, Ong D, Sun H",
      journal: "ACS Chemical Biology",
      year: "2011",
      volume: "6",
      pages: "1041-51",
      doi: "https://doi.org/10.1021/cb200178w"
    },
    {
      title: "Identification of PLXDC1 and PLXDC2 as the Transmembrane Receptors for the Multifunctional Factor PEDF",
      authors: "Cheng G, Zhong M, Kawaguchi R, Kassai M, Al-Ubaidi M, Deng J, Ter-Stepanian M, Sun H",
      journal: "eLife",
      year: "2014",
      volume: "3",
      pages: "e05401",
      doi: "https://doi.org/10.7554/eLife.05401"
    },
    {
      title: "A Genetic Clog in the Vitamin A Transport Machinery",
      authors: "Zhong M, Sun H",
      journal: "Cell",
      year: "2015",
      volume: "161",
      pages: "435-437",
      doi: "https://www.sciencedirect.com/science/article/pii/S0092867415004377"
    },
    {
      title: "Regulatory Mechanism for the Transmembrane Receptor that Mediates Bidirectional Vitamin A Transport",
      authors: "Zhong M, Kawaguchi R, Costabile B, Tang Y, Hu J, Cheng G, Kassai M, Ribalet B, Mancia F, Bok D, Sun H",
      journal: "Proc. Natl. Acad. Sci. USA",
      year: "2020",
      volume: "117",
      pages: "9857-9864",
      doi: "https://www.pnas.org/doi/10.1073/pnas.1918540117?url_ver=Z39.88-2003&rfr_id=ori:rid:crossref.org&rfr_dat=cr_pub%20%200pubmed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Hui Sun Laboratory"
        subtitle="Chemical Biology of Novel Membrane Receptors"
        description=""
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faculty Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="w-full md:w-1/3">
            <img 
              src="/images/faculty/sun.jpg"
              alt="Dr. Hui Sun"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Hui Sun, Ph.D.</h3>
              <p className="text-gray-600">Professor</p>
              <p className="text-gray-600">Departments of Physiology and Ophthalmology</p>
              <p className="text-gray-600">Jules Stein Eye Institute</p>
              <div className="flex flex-col space-y-2">
              <a 
                  href="mailto:hsun@mednet.ucla.edu" 
                  className="text-blue-600 hover:text-blue-800 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hsun@mednet.ucla.edu
                </a>
                <a 
                  href="https://profiles.ucla.edu/hui.sun" 
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
    Many highly impactful medicines target membrane receptors (e.g., weight loss drug Ozempic and cancer drug anti-PD1).  The Sun lab has devoted its efforts to the discovery, mechanistic study and identification of chemical modulators of novel membrane receptors that play important roles in physiology and diseases.  The first endeavor is to elucidate the receptor mechanism that mediates cellular uptake of vitamin A, a multitasking chemical that is essential for human vision and human survival.  We discovered this elusive membrane receptor using a novel technique and developed novel real-time monitoring techniques to study its molecular mechanism.  We further identified potent small molecule modulators can potentially be used in treating human diseases caused by insufficient or excessive retinoid level (relevant disease areas include ophthalmology, dermatology, and oncology).  
  </p>

  {/* Research Graphics */}
  <div className="my-6">
    <img
      src="/images/research/membrane-receptors.jpg"
      alt="Membrane receptor research diagrams showing protein structures, molecular pathways, and experimental results"
      className="w-full rounded-lg shadow-md"
    />
  </div>
  
  <p className="text-gray-800">
    The second endeavor is to elucidate the molecular mechanism and to identify novel chemical agonists for a new type of membrane receptors highly enriched in pathogenic blood vessels.  After several years of unbiased and large-scale screening, we identified the receptors of the most potent endogenous anti-angiogenic factor.  These are the only proteins in the human genome that are known to confer cell-surface binding to the factor and to transduce its signal into the cells.  Their highly specific expression in pathogenic blood vessels in vision diseases and tumors matches the therapeutic targets of the endogenous factor. By developing a novel fluorescence-based technique, we identified potent chemical compounds that target this receptor to specifically kill pathogenic blood vessels in vision disease and also tumor blood vessels to lead to effective tumor killing in vivo. In addition, we also developed a novel technique to screen for receptor-activating antibodies and successfully identified antibody drug candidates after large-scale screening 10 billion antibody clones.  They are candidate drugs that can be used to treat a wide range of human diseases driven by pathogenic angiogenesis including major blinding diseases and diverse types of cancer.  
  </p>
</div>
        </div>

        {/* Publications Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Publications</h2>
          <div className="space-y-3">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pub.title}</h3>
                <p className="text-gray-700 mb-1">{pub.authors}</p>
                <p className="text-gray-600">
                  {pub.journal} {pub.volume}: {pub.pages} ({pub.year})
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
