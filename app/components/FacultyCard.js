import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const FacultyCard = ({ faculty }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex gap-6">
        <img 
          src={faculty.profileImage} 
          alt={faculty.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-900">{faculty.name}</h3>
            <a 
              href={faculty.pageUrl}
              className="text-blue-600 hover:text-blue-800"
              aria-label={`Visit ${faculty.name}'s profile`}
            >
              <ArrowUpRight size={20} />
            </a>
          </div>
          <p className="text-gray-600 mb-2">{faculty.title}</p>
          <p className="text-blue-800 font-medium mb-2">{faculty.research}</p>
          <p className="text-gray-700 text-sm">{faculty.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;