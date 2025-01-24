import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import FacultyCard from '../components/FacultyCard';
import { facultyData } from '../data/faculty';

const LaboratoriesPage = () => {
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
          {facultyData.map((faculty) => (
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

export default LaboratoriesPage;