// app/page.js
'use client'
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const EducationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero section */}
      <Hero 
        title="Education @ JSEI"
        subtitle="An Organized Research Unit of UCLA"
        description="Advancing Vision Science Through Innovative Research"
      />

      {/* Education Overview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Educational Excellence</h2>
          <p className="text-gray-700 mb-4">
            The Jules Stein Eye Institute is committed to training the next generation of clinician-scientists, 
            ophthalmologists, and vision researchers. Our educational programs are designed to foster innovation,
            clinical excellence, and scientific discovery in vision science and ophthalmology.
          </p>
          <p className="text-gray-700 mb-4">
            Our flagship educational programs include the unique EyeSTAR program that bridges research and clinical 
            care, and the NIH-funded Vision Science Training Program (T32) supporting predoctoral and postdoctoral 
            trainees. These programs, alongside our comprehensive residency and fellowship opportunities, make 
            JSEI a premier institution for education in ophthalmology and vision science.
          </p>
        </div>

        {/* Featured Program Section - EyeSTAR */}
        <div className="mb-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">EyeSTAR Program</h2>
                <p className="text-gray-700 mb-4">
                  The <strong>Specialty Training and Advanced Research (EyeSTAR)</strong> program is a unique educational 
                  opportunity that combines clinical ophthalmic practice with basic science or ophthalmic genetic research. 
                  This distinctive 7-year curriculum is designed for physicians who are committed to academic careers in 
                  ophthalmology, blending basic science or genetics with clinical practice.
                </p>
                <p className="text-gray-700 mb-4">
                  Trainees select their faculty mentors and laboratories or research groups from a wide range of 
                  participants throughout the UCLA David Geffen School of Medicine, the UCLA College of Letters and 
                  Science, the UCLA Fielding School of Public Health, and the independent Pardee RAND Graduate School.
                </p>
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-700">
                  "EyeSTAR graduates are trained to compete not just with clinical scientists but with top basic scientists from all institutions."
                  <footer className="text-gray-600 mt-1">— Joseph L. Demer, MD, PhD, EyeSTAR Program Chair</footer>
                </blockquote>
                <div className="mt-6">
                  <Link href="https://www.uclahealth.org/departments/eye/training-and-education/training-programs/ophthalmology-residency-training-program/eyestar-program" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors duration-300">
                    Learn more about EyeSTAR
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
                      <span className="ml-2 text-gray-700">7-year integrated curriculum</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">PhD or postdoctoral research</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Full salary and benefits support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Model program recognized by NEI</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NIH T32 Vision Science Training Program Section */}
        <div className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NIH T32 Vision Science Training Program</h2>
                <p className="text-gray-700 mb-4">
                  The <strong>Vision Science Training Program (VSTP)</strong> has its home in the Stein Eye Institute and has been 
                  continuously active for more than 40 years. During this period, the VSTP has trained nearly 140 scientists, 
                  a large portion of whom have gone on to distinguished careers in vision science.
                </p>
                <p className="text-gray-700 mb-4">
                  The Program covers the training of both predoctoral and postdoctoral fellows and takes place in the 
                  laboratories of 17 faculty mentors. These vision scientists possess expertise in a wide range of disciplines 
                  and hold academic appointments in 11 departments at UCLA.
                </p>
                <p className="text-gray-700 mb-4">
                  Given the interdisciplinary nature of vision research, the overall goal of the VSTP is to bring together 
                  faculty with a wide range of expertise (including anatomy, biochemistry, biophysics, chemistry, molecular 
                  biology, physiology, pharmacology, cell biology, and developmental biology) to provide interdisciplinary 
                  experimental and conceptual training to predoctoral and postdoctoral candidates seeking to develop careers 
                  in vision science.
                </p>
                <div className="mt-6">
                  <Link href="https://www.uclahealth.org/departments/eye/training-and-education/training-programs/vision-science-training-programs" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors duration-300">
                    Learn more about the Vision Science Training Program
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Program Offerings</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Fundamentals of Vision Research course</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Weekly Vision Science Seminar Series</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Vision Science Journal Club</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Annual Vision Science Retreat</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Grant writing workshops (F31, F32, K99/R00)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="ml-2 text-gray-700">Translational Grand Rounds</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Educational Programs - Card Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Educational Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ophthalmology Residency Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ophthalmology Residency</h3>
                <p className="text-gray-700 mb-6">
                  Our three-year ophthalmology residency program provides exceptional clinical and surgical 
                  training across all subspecialty areas. Residents gain experience at multiple clinical sites 
                  including UCLA Ronald Reagan Medical Center, Harbor-UCLA Medical Center, Olive View-UCLA 
                  Medical Center, and the VA Greater Los Angeles Healthcare System.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href="https://www.uclahealth.org/departments/eye/training-and-education/training-programs/ophthalmology-residency-training-program" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors duration-300">
                    Learn more about Residency Programs
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Medical Student Education Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Medical Student Education</h3>
                <p className="text-gray-700 mb-6">
                  We offer elective rotations and research opportunities for medical students interested in 
                  ophthalmology. Students participate in clinical activities, observe surgeries, and engage 
                  in mentored research projects with faculty members.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href="https://www.uclahealth.org/departments/eye/training-and-education/training-programs/medical-student-programs" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors duration-300">
                    Explore Medical Student Programs
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Clinical Fellowships Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Clinical Fellowships</h3>
                <p className="text-gray-700 mb-6">
                  Advanced subspecialty training is available in cornea and external ocular disease, 
                  glaucoma, neuro-ophthalmology, orbital and ophthalmic plastic surgery, pediatric 
                  ophthalmology and strabismus, uveitis and inflammatory eye diseases, and vitreoretinal 
                  diseases and surgery.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href="https://www.uclahealth.org/departments/eye/training-and-education/training-programs/ophthalmology-fellowship-training-programs" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors duration-300">
                    View Clinical Fellowship Opportunities
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* International Fellowships Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">International Fellowships</h3>
                <p className="text-gray-700 mb-6">
                  Our international fellowship program brings ophthalmologists from around the world to 
                  JSEI for specialized training and research opportunities. These programs foster global 
                  collaboration and the exchange of knowledge in vision science and ophthalmology.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href="https://www.uclahealth.org/departments/eye/training-and-education/training-programs/international-fellowship-training-programs" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors duration-300">
                    Learn about International Programs
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Link>
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

export default EducationPage;