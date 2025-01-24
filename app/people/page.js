// app/people/page.js
import React from 'react';
import Image from 'next/image';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import { ArrowUpRight } from 'lucide-react';

const PeoplePage = () => {
  const departments = [
    {
      title: "Leadership",
      people: [
        {
          name: "Anne Coleman",
          title: "Director",
          imageUrl: "/images/faculty/coleman.jpg"
        },
        {
          name: "Anthony Aldave",
          title: "Associate Director",
          imageUrl: "/images/faculty/aldave.jpg"
        },
        {
          name: "Alapakkam Sampath",
          title: "Associate Director",
          imageUrl: "/images/faculty/sampath.jpg"
        }
      ]
    },
    {
      title: "Clinical Research Center",
      people: [
        {
          name: "Gary Holland",
          title: "Director",
          imageUrl: "/images/faculty/holland.jpg"
        },
        {
          name: "Irena Tsui",
          title: "Associate Director",
          imageUrl: "/images/faculty/tsui-i.jpg"
        },
        {
          name: "Stacy Pineles",
          title: "Associate Director",
          imageUrl: "/images/faculty/pineles.jpg"
        }
      ]
    },
    {
      title: "Retina Clinical Research",
      people: [
        {
          name: "Irena Tsui",
          title: "Director",
          imageUrl: "/images/faculty/tsui-i.jpg"
        }
      ]
    },
    {
      title: "Glaucoma Clinical Research",
      people: [
        {
          name: "Kouros Nouri-Mahdavi",
          title: "Director",
          imageUrl: "/images/faculty/kouros.jpg"
        }
      ]
    },
    {
      title: "Cornea",
      people: [
        {
          name: "Anthony Aldave",
          title: "Director",
          imageUrl: "/images/faculty/aldave.jpg"
        },
        {
          name: "Sophie Deng",
          title: "Associate Director",
          imageUrl: "/images/faculty/deng.jpg"
        }
      ]
    },
    {
      title: "Center for Community Outreach and Policy & Center for Epidemiology and UMEC",
      people: [
        {
          name: "Margarita Gonzalez",
          title: "Director",
          imageUrl: "/images/people/gonzalez.jpg"
        },
        {
          name: "Fei Yu",
          title: "Associate Director",
          imageUrl: "/images/people/yu.jpg"
        }
      ]
    },
    {
      title: "Education",
      people: [
        {
          name: "Tony Arnold",
          title: "Director",
          imageUrl: "/images/people/arnold.jpg"
        },
        {
          name: "Victoria Tseng",
          title: "Associate Director",
          imageUrl: "/images/people/tseng.jpg"
        },
        {
          name: "Debbie Sato",
          title: "Program Coordinator",
          imageUrl: "/images/people/sato.jpg"
        }
      ]
    },
    {
      title: "Oculoplastics",
      people: [
        {
          name: "Dan Rootman",
          title: "Director",
          imageUrl: "/images/people/rootman.jpg"
        }
      ]
    },
    {
      title: "Genetics",
      people: [
        {
          name: "Michael Gorin",
          title: "Director",
          imageUrl: "/images/people/gorin.jpg"
        }
      ]
    },
    {
      title: "Refractive and Cataract",
      people: [
        {
          name: "Kevin Miller",
          title: "Director",
          imageUrl: "/images/people/miller.jpg"
        },
        {
          name: "Shawn Lin",
          title: "Associate Director",
          imageUrl: "/images/people/lin.jpg"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero 
        title="People @ JSEI"
        subtitle="Leadership and Administration"
        description="Leaders in Vision Research and Clinical Care"
      />

      {/* People Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {departments.map((department) => (
          <div key={department.title} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-blue-900">
              {department.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {department.people.map((person) => (
                <div 
                  key={person.name}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-40 h-40 mb-4">
                      <img
                        src={person.imageUrl}
                        alt={person.name}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {person.name}
                    </h3>
                    <p className="text-blue-800">
                      {person.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

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

export default PeoplePage;