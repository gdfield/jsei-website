import React from 'react';
import Hero from '../components/Hero';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import FacultyCard from '../components/FacultyCard';
import { facultyData } from '../data/faculty';
import { activeProjectScientists } from '../data/trainees';
import { pageMeta } from '../lib/seo';

export const metadata = pageMeta({
  path: '/scientists',
  title: 'Scientists',
  description: 'The faculty and project scientists of the Jules Stein Eye Institute, UCLA, in basic and clinical research on the retina, vision, cornea, glaucoma, and more.',
});

// Re-check daily so project scientists from the intake form follow their
// start and end dates without a deploy.
export const revalidate = 86400;

// Project scientists who joined through the intake form, shaped for FacultyCard.
const formProjectScientists = () =>
  activeProjectScientists().map((t) => ({
    name: t.name,
    title: t.title,
    research: t.labName,
    description: t.description,
    profileImage: t.photo || null,
    pageUrl: t.path,
    projectScientist: true,
    clampDescription: true,
  }));

// Faculty who run labs are grouped Basic / Clinical / Emeritus. Project scientists
// do not run their own lab and get their own group, shown only once at least one
// is listed: from faculty.js (projectScientist: true) or from the intake form.
const ScientistsPage = () => {
  const labHeads = facultyData.filter((f) => !f.projectScientist);
  const basicScience = labHeads.filter((f) => f.basicScience && !f.emeritus);
  const clinicalScience = labHeads.filter((f) => (f.clinicalScience || !f.basicScience) && !f.emeritus);
  const projectScientists = [...facultyData.filter((f) => f.projectScientist && !f.emeritus), ...formProjectScientists()].sort(
    (a, b) => a.name.split(' ').pop().localeCompare(b.name.split(' ').pop())
  );
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
    ...(projectScientists.length > 0
      ? [{
          eyebrow: 'Project Scientists',
          title: 'Project Scientists',
          intro: 'Scientists who lead shared projects, technologies, and infrastructure across the institute.',
          faculty: projectScientists,
        }]
      : []),
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
          eyebrow="The Scientists"
          title="Scientists"
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

export default ScientistsPage;
