import React from 'react';
import Hero from '../components/Hero';

export const metadata = pageMeta({
  path: '/laboratories',
  title: "Research Laboratories",
  description: "The basic science and clinical research laboratories of the Jules Stein Eye Institute, UCLA, spanning retina, visual neuroscience, cornea, glaucoma, and more.",
});
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import FacultyCard from '../components/FacultyCard';
import { facultyData } from '../data/faculty';
import { pageMeta } from '../lib/seo';

const LaboratoriesPage = () => {
  const basicScience = facultyData.filter((f) => f.basicScience && !f.emeritus);
  const clinicalScience = facultyData.filter((f) => (f.clinicalScience || !f.basicScience) && !f.emeritus);
  const emeritusFaculty = facultyData.filter((f) => f.emeritus);

  const groups = [
    {
      eyebrow: 'Basic Science',
      title: 'Basic Science Laboratories',
      intro: 'Laboratories working at the molecular, cellular, and circuit level to understand how vision works.',
      faculty: basicScience,
    },
    {
      eyebrow: 'Clinical Science',
      title: 'Clinical Science Laboratories',
      intro: 'Clinician-scientists translating discovery into diagnosis and treatment for patients.',
      faculty: clinicalScience,
    },
    ...(emeritusFaculty.length > 0
      ? [{
          eyebrow: 'Emeritus',
          title: 'Emeritus Faculty',
          intro: 'Faculty whose foundational work continues to shape vision science at JSEI.',
          faculty: emeritusFaculty,
        }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
        <Hero
          eyebrow="The Laboratories"
          title="Research Laboratories"
          subtitle="Independent labs, shared purpose"
          description="Advancing our understanding of vision through innovative research."
          compact
        />

        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {groups.map((group, gi) => (
            <section key={group.title} className={gi > 0 ? 'mt-20' : ''}>
              <Reveal>
                <SectionHeading eyebrow={group.eyebrow} title={group.title} intro={group.intro} />
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {group.faculty.map((faculty, i) => (
                  <Reveal key={faculty.name} delay={(i % 2) * 100}>
                    <FacultyCard faculty={faculty} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LaboratoriesPage;
