import React from 'react';
import Hero from '../../components/Hero';
import Navbar from '../../components/Navbar';
import Footer from '@/app/components/Footer';
import FacultyCard from '../../components/FacultyCard';
import { facultyData } from '../../data/faculty';

const DevelopmentPage = () => {
  const areaFaculty = facultyData.filter(faculty => 
    faculty.researchAreas.includes("Bioinformatics and Population Health") && !faculty.emeritus
  );

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
      <Hero 
        title="Bioinformatics and Population Health"
        subtitle="Finding the factors that underly eye disease"
        description=""
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-ink mb-4">Research Focus</h2>
          <p className="text-ink-soft">
            Genetics and environmental factors shape the landscape and prevalence of eye conditions and diseases. 
            These labs seek to understand these genetic and environemental factors to better target diagnostics and 
            treatments to individuals and communities.
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-ink mb-2">Key Research Areas:</h3>
            <ul className="list-disc pl-6 text-ink-soft">
              <li>Disease Genetics</li>
              <li>Epidemiology</li>
              <li>Genomics, transcriptomics, and proteomics</li>
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