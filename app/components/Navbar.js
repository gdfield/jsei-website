import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo/Home */}
            <Link 
              href="/"
              className="flex items-center px-2 text-gray-900 hover:text-blue-600"
            >
              JSEI @ UCLA
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:space-x-8">
            <Link 
              href="/researchAreas"
              className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600"
            >
              Research Areas
            </Link>
            <Link 
              href="/laboratories"
              className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600"
            >
              Laboratories
            </Link>
            <Link 
              href="/core"
              className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600"
            >
              Core Facilities
            </Link>
            <Link 
              href="/education"
              className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600"
            >
              Education
            </Link>
            <Link 
              href="/outreach"
              className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600"
            >
              Outreach
            </Link>
            <Link 
              href="/people"
              className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600"
            >
              Leadership
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;