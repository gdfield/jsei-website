import React from 'react';
import Hero from '../../components/Hero';
import Navbar from '../../components/Navbar';
import Footer from '@/app/components/Footer';
import FacultyCard from '../../components/FacultyCard';
import { facultyData } from '../../data/faculty';
import { pageMeta } from '@/app/lib/seo';

export const metadata = pageMeta({
  path: '/researchAreas/rehab',
  title: "Eye Mobility and Rehabilitation",
  description: "Faculty at the Jules Stein Eye Institute, UCLA studying eye movements and low vision rehabilitation to improve how patients see the world.",
});


const DevelopmentPage = () => {
  // Filter faculty members who work in Development, Disease, and Aging
  const areaFaculty = facultyData.filter(faculty => 
    faculty.researchAreas.includes("Eye Mobility and Rehabilitation") && !faculty.emeritus
  );

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
      <Hero 
        title="Eye Mobility and Rehabilitation"
        subtitle="Improving vision by understanding how patients look at the world"
        description=""
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-ink mb-4">Research Focus</h2>
          <p className="text-ink-soft">
            How we look at the world shapes what we see. From magnifiers to augmented reality to eye movements, 
            these labs aim to understand how the processes controlling what image lands on the retina from moment 
            to moment impacts our long-term ability to see.
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-ink mb-2">Key Research Areas:</h3>
            <ul className="list-disc pl-6 text-ink-soft">
              <li>Ocular muscles and biomechanics</li>
              <li>Amblyopia</li>
              <li>Low vision</li>
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