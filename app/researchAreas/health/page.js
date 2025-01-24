import React from 'react';
import Hero from '../../components/Hero';
import Navbar from '../../components/Navbar';
import FacultyCard from '../../components/FacultyCard';
import { facultyData } from '../../data/faculty';

const DevelopmentPage = () => {
  // Filter faculty members who work in Development, Disease, and Aging
  const areaFaculty = facultyData.filter(faculty => 
    faculty.researchAreas.includes("Eye Disease and Population Health")
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="Eye Diseases and Population Health"
        subtitle="Finding new ways to treat a range of eye conditions and low vision"
        description="JSEI includes critical research on a range of eye diseases, including the develop and analysis of different treatment approaches. This research is spearheaded by to clinician-scientists who unit science and medicine."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Focus</h2>
          <p className="text-gray-700">
          JSEI includes critical research on a range of eye diseases, including the develop and analysis of different treatment
        approaches. This research is spearheaded by to clinician-scientists who unit science and medicine."

          </p>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Key Research Areas:</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Eye Diseases</li>
              <li>Ocular Genetics</li>
              <li>Population Health</li>
              <li>Low Vision</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">Faculty</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {areaFaculty.map((faculty) => (
            <FacultyCard key={faculty.name} faculty={faculty} />
          ))}
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
};

export default DevelopmentPage;