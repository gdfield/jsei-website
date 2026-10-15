import React from 'react';
import Hero from '../../components/Hero';
import Navbar from '../../components/Navbar';
import Footer from '@/app/components/Footer';
import FacultyCard from '../../components/FacultyCard';
import { facultyData } from '../../data/faculty';
import { pageMeta } from '@/app/lib/seo';

export const metadata = pageMeta({
  path: '/researchAreas/retinalbio',
  title: "Retinal Cell and Molecular Biology",
  description: "Faculty at the Jules Stein Eye Institute, UCLA studying the cell and molecular biology of the retina in health and disease.",
});


const DevelopmentPage = () => {
  // Filter faculty members who work in Development, Disease, and Aging
  const areaFaculty = facultyData.filter(faculty => 
    faculty.researchAreas.includes("Retinal Biology") && !faculty.emeritus
  );

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
      <Hero 
        title="Retinal Cell and Molecular Biology"
        subtitle="Revealing and understanding the fundamental biological mechanisms of the retina"
        description=""
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-ink mb-4">Research Focus</h2>
          <p className="text-ink-soft">
            A long-standing area of excellence at JSEI is understanding the fundamental retinal biology that makes vision possible. These labs reveal the highly specialized molecular and cellular interactions that occur in the retina.
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-ink mb-2">Key Research Areas:</h3>
            <ul className="list-disc pl-6 text-ink-soft">
              <li>Photoreceptor biology</li>
              <li>The retinal pigment epithelium</li>
              <li>Molecular signaling and receptors</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-ink mb-8">Faculty</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {areaFaculty.map((faculty) => (
            <FacultyCard key={faculty.name} faculty={faculty} />
          ))}
        </div>
      </div>

      </main>

      <Footer />
    </div>
  );
};

export default DevelopmentPage;