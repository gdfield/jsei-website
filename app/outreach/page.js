// app/outreach/page.js
'use client'
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const OutreachPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero section */}
      <Hero 
        title="Outreach @ JSEI"
        subtitle="An Organized Research Unit of UCLA"
        description="Bringing Eye Care to Our Communities"
      />

      {/* Outreach Overview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Impact</h2>
          <p className="text-gray-700 mb-4">
            Community outreach has been integral to the Jules Stein Eye Institute since 1975. Our programs 
            bring essential eye care services to underserved populations throughout Los Angeles County 
            and surrounding areas, combining community service with innovative research and education.
          </p>
          <p className="text-gray-700 mb-4">
            Our flagship outreach initiative, the UCLA Mobile Eye Clinic, has served the community for 
            over five decades, offering free vision screenings, comprehensive eye examinations, and 
            prescription eyeglasses to patients regardless of income or documentation status.
          </p>
        </div>

        {/* Featured Program Section - Mobile Eye Clinic */}
        <div className="mb-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">UCLA Mobile Eye Clinic</h2>
                <p className="text-gray-700 mb-4">
                  Established in 1975 by an anonymous donor, the <strong>UCLA Mobile Eye Clinic (UMEC)</strong> is 
                  considered the longest continuously operating eye clinic on wheels in the USA. For more 
                  than 45 years, UMEC has been funded by donors and grants to provide patient care and 
                  screening programs in neighborhoods where poverty and vision disabilities intersect.
                </p>
                <p className="text-gray-700 mb-4">
                  UMEC plays an integral role at JSEI by combining community outreach and research. To 
                  accomplish this, UMEC and its staff of ophthalmologists, ophthalmology residents, 
                  technicians, medical students, and UCLA undergraduate student volunteers make visits 
                  to hundreds of Southern California community locations annually, including schools, free clinics, 
                  homeless shelters, and social service agencies serving vulnerable populations. The Clinic was honored as the recipient 
                  of the 2015 Innovation Award for Community Service by the Los Angeles County Medical Association and the 
                  Patient Care Foundation of Los Angeles County.
                </p>
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-700">
                  "The UCLA Mobile Eye Clinic (UMEC) envisions a world where all people have equal access to quality eye care services."
                  <footer className="text-gray-600 mt-1">— UMEC Vision Statement</footer>
                </blockquote>
                <div className="mt-6">
                  <Link href="https://www.uclahealth.org/departments/eye/mobile-eye" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors duration-300">
                    Learn more about the UCLA Mobile Eye Clinic
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Program Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Free vision screenings</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Comprehensive eye examinations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Free prescription eyeglasses with delivery</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">39-foot-long fully equipped mobile clinic</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Replacement glasses within one year if needed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Research & Education Section */}
        <div className="mb-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Research & Education</h2>
                <p className="text-gray-700 mb-4">
                  The UCLA Mobile Eye Clinic not only provides essential clinical services but also serves as an 
                  important platform for research and education at JSEI. UCLA trainees work with the research team 
                  at the Center for Eye Epidemiology to gain firsthand experience with all the steps of the research process.
                </p>
                <p className="text-gray-700 mb-4">
                  Several research studies have been performed with UMEC assessing refractive error in children 
                  in Los Angeles, including the examination of rates of uncorrected refractive error in elementary 
                  school children and assessment of the relationship between geography and refractive error in 
                  preschoolers in Southern California.
                </p>
                <p className="text-gray-700 mb-4">
                  Additionally, medical students have secured research grants with UMEC to assess eye health and 
                  access to care of LGBTQ+ populations, day laborers in Los Angeles County, farm workers in Kern 
                  County, and the effectiveness of various community outreach initiatives. 
                </p>

              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Educational Opportunities</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Clinical training for medical students</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Research experience for undergraduates</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Study design and IRB submission</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Data collection and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Scientific publication opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for any additional sections */}
        {/* Featured Program Section - Vision IN-School */}
<div className="mb-1 bg-white rounded-lg shadow-sm overflow-hidden">
  <div className="p-8 md:p-10">
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-2/3">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Vision IN-School Program</h2>
        <p className="text-gray-700 mb-4">
          The <strong>Vision IN-School</strong> program is one of JSEI's key educational outreach initiatives 
          focused on bringing vision education directly to local schools. This program promotes eye health 
          awareness among children through age-appropriate education about vision care, eye safety, and 
          the importance of regular eye examinations.
        </p>
        <p className="text-gray-700 mb-4">
          Working alongside educators, our team develops and delivers engaging presentations that teach 
          students about eye anatomy, common vision problems, and protective measures to maintain healthy 
          eyesight. The program uses interactive demonstrations, visual aids, and take-home materials to 
          reinforce important concepts about eye health and safety.
        </p>
        <p className="text-gray-700 mb-4">
          Vision IN-School helps bridge the gap between clinical care and preventive education by 
          empowering young people with knowledge about their vision health. The program reaches thousands 
          of students annually throughout Los Angeles County, with a special focus on underserved communities 
          where access to eye care information may be limited.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-700">
          "Early vision education is essential for lifelong eye health. By teaching children about their 
          eyes, we help them become advocates for their own vision care."
          <footer className="text-gray-600 mt-1">— Vision IN-School Coordinator</footer>
        </blockquote>
      </div>
      <div className="w-full md:w-1/3">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Program Components</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="ml-2 text-gray-700">Classroom vision education sessions</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="ml-2 text-gray-700">Eye anatomy and function demonstrations</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="ml-2 text-gray-700">Vision safety awareness training</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="ml-2 text-gray-700">Take-home educational materials</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
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

export default OutreachPage;