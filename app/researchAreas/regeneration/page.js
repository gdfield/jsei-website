import React from 'react';
import Hero from '../../components/Hero';
import Navbar from '../../components/Navbar';
import Footer from '@/app/components/Footer';
import FacultyCard from '../../components/FacultyCard';
import { facultyData } from '../../data/faculty';

const DevelopmentPage = () => {
  const areaFaculty = facultyData.filter(faculty => 
    faculty.researchAreas.includes("Therapeutics and Regeneration") && !faculty.emeritus
  );

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <Hero 
        title="Therapeutics and Regeneration"
        subtitle="Finding cures for vision loss"
        description=""
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-ink mb-4">Research Focus</h2>
          <p className="text-ink-soft">
          Curing blindness and vision loss requires halting the disease and regenerating or repairing the damaged tissues. These labs pursue innovative approaches from gene therapies to pharmaceutical treatments for vision loss.         
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-ink mb-2">Key Research Areas:</h3>
            <ul className="list-disc pl-6 text-ink-soft">
              <li>Gene therapies</li>
              <li>Transplantation</li>
              <li>Stem Cells</li>
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

      <Footer />
    </div>
  );
};

export default DevelopmentPage;