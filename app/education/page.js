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

const EducationPage = () => {


  return (
  <div className="min-h-screen bg-gray-50">
                <Navbar /> {/* Add the Navbar here */}

      {/* Replace the old hero section with the Hero component */}
      <Hero 
        title="Education @ JSEI"
        subtitle="An Organized Research Unit of UCLA"
        description="Advancing Vision Science Through Innovative Research"
      />



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

export default EducationPage;
