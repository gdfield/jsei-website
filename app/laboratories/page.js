import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import FacultyCard from '../components/FacultyCard';
import { facultyData } from '../data/faculty';

const LaboratoriesPage = () => {
  const activeFaculty = facultyData.filter((f) => !f.emeritus);
  const emeritusFaculty = facultyData.filter((f) => f.emeritus);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero
        title="Research Laboratories"
        subtitle="Vision Science Research at JSEI"
        description="Advancing our understanding of vision through innovative research"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeFaculty.map((faculty) => (
            <FacultyCard key={faculty.name} faculty={faculty} />
          ))}
        </div>

        {emeritusFaculty.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b border-gray-200">Emeritus Faculty</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {emeritusFaculty.map((faculty) => (
                <FacultyCard key={faculty.name} faculty={faculty} />
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
};

export default LaboratoriesPage;