// app/page.js
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
  rel="stylesheet"
></link>;

const ResearchFacultyPage = () => {
  const faculty = [

    {
      name: "Anthony Aldave",
      title: "Professor",
      research: "Cornea Genetics",
      description: "Dr. Aldave's research focuses on the genetic basis of corneal diseases and the development of novel therapeutic approaches. His work combines clinical genetics with advanced molecular techniques to understand inherited corneal disorders.",
      profileImage: "/images/faculty/aldave.jpg",
      pageUrl: "https://profiles.ucla.edu/anthony.aldave"
    },
    {
      name: "Aya Barzalay-Wollman",
      title: "Assistant Professor",
      research: "Robotic Micro-surgery",
      description: "Dr. Barzalay-Wollman specializes in developing innovative robotic microsurgical techniques for ophthalmic surgery. Her research combines robotics engineering with surgical precision to advance the field of ophthalmic microsurgery.",
      profileImage: "/images/faculty/barzalay.jpg",
      pageUrl: "https://www.uclahealth.org/providers/aya-barzelay-wollman"
    },
    {
      name: "Joseph Demer",
      title: "Professor",
      research: "Ocular Motility",
      description: "Dr. Demer investigates the mechanics and neural control of eye movements. His research encompasses both basic science and clinical applications in understanding and treating disorders of ocular motility.",
      profileImage: "/images/faculty/demer.jpg",
      pageUrl: "https://profiles.ucla.edu/joseph.demer"
    },
    {
      name: "Sophie Deng",
      title: "Professor",
      research: "Cornea",
      description: "Dr. Deng's research focuses on corneal stem cell biology and regenerative medicine. Her work aims to develop novel therapeutic strategies for corneal diseases and injuries through stem cell-based approaches.",
      profileImage: "/images/faculty/deng.jpg",
      pageUrl: "https://www.uclahealth.org/providers/sophie-deng"
    },
    {
      name: "Greg D. Field",
      title: "Associate Professor In-Residence",
      research: "Retinal Circuits and Vision",
      description:
        "Dr. Field's laboratory focuses on understanding how neural circuits in the retina process visual information. His work combines electrophysiology, imaging, and computational approaches to decode the neural basis of vision at the cellular level.",
      profileImage: "/images/faculty/field.jpg",
      pageUrl: "https://www.retinalcircuits.com",
    },
    {
      name: "Ben Glasgow",
      title: "Professor",
      research: "Ophthalmic Pathology",
      description: "Dr. Glasgow specializes in ophthalmic pathology, studying the microscopic and molecular basis of eye diseases. His research combines classical pathology with modern molecular techniques to understand disease mechanisms.",
      profileImage: "/images/faculty/glasgow.jpg",
      pageUrl: "https://profiles.ucla.edu/ben.glasgow"
    },
    {
      name: "Wayne L. Hubbell",
      title: "Professor",
      research: "Molecular Biophysics",
      description:
        "Dr. Hubbell's research focuses on the development and application of site-directed spin labeling to investigate protein structure and dynamics. His pioneering work has provided crucial insights into the molecular mechanisms of vision and membrane protein function.",
      profileImage: "/images/faculty/hubell.jpg",
      pageUrl: "https://www.biochemistry.ucla.edu/Faculty/Hubbell/",
    },
    {
      name: "Kouros Nouri-Mahdavi",
      title: "Professor",
      research: "Glaucoma Imaging",
      description: "Dr. Nouri-Mahdavi focuses on advanced imaging techniques for glaucoma diagnosis and monitoring. His research aims to improve early detection and treatment strategies through innovative imaging approaches.",
      profileImage: "/images/faculty/kouros.jpg",
      pageUrl: "https://profiles.ucla.edu/kouros.nouri-mahdavi"
    },
    {
      name: "Yirong Peng",
      title: "Assistant Professor In-Residence",
      research: "Retinal transcriptomics and bioinformatics",
      description:
        "Dr. Peng investigates the cellular and molecular mechanisms underlying retinal circuit function and development. Her research aims to understand how specific cell types in the retina contribute to visual processing and behavior.",
      profileImage: "/images/faculty/peng.jpg",
      pageUrl: "https://yirongpeng.com/",
    },
    {
      name: "Roxana Radu",
      title: "Associate Professor In-Residence",
      research: "Retinal Biochemistry and Disease Modeling",
      description:
        "Dr. Radu studies the biochemical mechanisms involved in retinal degeneration and age-related macular degeneration. Her research focuses on understanding lipid metabolism in the retina and developing therapeutic strategies for retinal diseases.",
      profileImage: "/images/faculty/radu.jpg",
      pageUrl: "https://profiles.ucla.edu/roxana.radu",
    },
    {
      name: "Alapakkam Sampath",
      title: "Professor",
      research: "Phototransduction and Synaptic Transmission",
      description:
        "Dr. Sampath's research focuses on understanding how photoreceptors and retinal circuits encode visual information. His lab uses advanced electrophysiological techniques to study the mechanisms of light adaptation and signal processing in the retina.",
      profileImage: "/images/faculty/sampath.jpg",
      pageUrl: "https://profiles.ucla.edu/alapakkam.sampath",
    },
    {
      name: "Gabriel Travis",
      title: "Professor",
      research: "Photorecetor Biochemistry",
      description:
        "Dr. Travis studies the molecular mechanisms of photoreceptor outer segment renewal and the role of specific proteins in retinal degenerative diseases. His work has important implications for understanding and treating inherited retinal disorders.",
      profileImage: "/images/faculty/travis.jpg",
      pageUrl: "https://profiles.ucla.edu/gabriel.travis",
    },
    {
      name: "David Williams",
      title: "Professor In-Residence",
      research: "Photoreceptor-RPE Biology",
      description:
        "Dr. Williams investigates the cellular mechanisms of protein transport in photoreceptors and retinal pigment epithelium. His research provides insights into the pathogenesis of inherited retinal degenerations and potential therapeutic approaches.",
      profileImage: "/images/faculty/williams.jpg",
      pageUrl: "https://www.uclahealth.org/departments/eye/research/research-laboratories/retinal-cell-biology/lab-members/david-s-williams-phd",
    },
    {
      name: "Xian-Jie Yang",
      title: "Professor In-Residence",
      research: "Retinal Development and Gene Therapy",
      description:
        "Dr. Yang studies retinal development and regeneration, focusing on the molecular mechanisms that control cell fate determination and differentiation. Her research aims to develop new strategies for treating retinal degenerative diseases.",
      profileImage: "/images/faculty/yang.png",
      pageUrl: "https://profiles.ucla.edu/xianjie.yang",
    },
    {
      name: "Joel Zylberberg",
      title: "Associate Professor In-Residence",
      research: "Computational Neuroscience and Vision",
      description:
        "Dr. Zylberberg's research combines theoretical and computational approaches to understand how neural circuits process visual information. His work focuses on developing mathematical models of visual processing and applying machine learning to analyze neural data.",
      profileImage: "/images/faculty/zylberberg.jpg",
      pageUrl: "http://www.jzlab.org/index.html",
    },
    {
      name: "Jie Zhang",
      title: "Professor In-Residence",
      research: "Therepeutic Development",
      description:
        "Dr. Zhang's laboratory investigates the neural circuits underlying visual processing and perception. Using advanced imaging and molecular techniques, her work reveals how specific neural pathways contribute to visual function.",
      profileImage: "/images/faculty/zhang.jpg",
      pageUrl: "https://www.uclahealth.org/cancer/members/jie-zheng",
    },
  ];

  return (
  <div className="min-h-screen bg-gray-50">
                <Navbar /> {/* Add the Navbar here */}

      {/* Replace the old hero section with the Hero component */}
      <Hero 
        title="Jules Stein Eye Institute"
        subtitle="An Organized Research Unit of UCLA"
        description="Advancing Vision Science Through Innovative Research"
      />

      {/* Faculty Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Research Faculty
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faculty.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 p-6"
            >
              <div className="flex gap-6 items-center">
                <Image
                  src={member.profileImage}
                  alt={`${member.name}`}
                  width={160}
                  height={160}
                  className="rounded-full object-cover"
                  quality={100}
                  priority
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <a
                      href={member.pageUrl}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Visit ${member.name}'s profile`}
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                  <p className="text-gray-600 mb-2">{member.title}</p>
                  <p className="text-blue-800 font-medium mb-2">
                    {member.research}
                  </p>
                  <p className="text-gray-700 text-sm">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
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
};

export default ResearchFacultyPage;
