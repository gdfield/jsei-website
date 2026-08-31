import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

export const metadata = {
  title: 'Research Areas',
  description:
    'Explore the interdisciplinary vision-science research areas at the Jules Stein Eye Institute at UCLA, from retinal biology and visual neuroscience to ocular imaging, AI, and regenerative therapies.',
};

const researchAreas = [
  {
    title: 'Therapeutics and Regeneration',
    description:
      'Curing blindness requires both halting disease and repairing damaged tissue. These labs pursue gene therapies, transplantation, and pharmacology to restore sight.',
    projects: ['Gene therapies', 'Transplantation', 'Stem cells'],
    imageUrl: '/images/areas/therapies.jpg',
    pageUrl: '/researchAreas/regeneration',
  },
  {
    title: 'Retinal Cell and Molecular Biology',
    description:
      'A long-standing area of excellence: understanding the specialized molecular and cellular interactions in the retina that make vision possible.',
    projects: ['Photoreceptor biology', 'Retinal pigment epithelium', 'Molecular signaling'],
    imageUrl: '/images/areas/mobio.jpg',
    pageUrl: '/researchAreas/retinalbio',
  },
  {
    title: 'Visual Neuroscience',
    description:
      'The retina is part of the brain. These labs decode how the neurons of the visual system produce our ability to see.',
    projects: ['Circuit mapping', 'Visual information processing', 'Synaptic transmission'],
    imageUrl: '/images/areas/neuro.jpg',
    pageUrl: '/researchAreas/visualneuro',
  },
  {
    title: 'Ocular Imaging',
    description:
      'Imaging is central to diagnosis and to understanding biology. These labs push resolution and precision across diverse imaging techniques.',
    projects: ['Fundus imaging', 'Optical coherence tomography', 'Advanced microscopy'],
    imageUrl: '/images/areas/imaging.jpg',
    pageUrl: '/researchAreas/ocular',
  },
  {
    title: 'Eye Surface and Lens',
    description:
      'Vision needs a clear window from the front of the eye to the retina. These labs study the maintenance, deterioration, and repair of the eye surface and lens.',
    projects: ['Tear films', 'Cornea', 'Ocular transparency'],
    imageUrl: '/images/areas/surface.jpg',
    pageUrl: '/researchAreas/surface',
  },
  {
    title: 'Artificial Intelligence and Robotics',
    description:
      'Machine learning and robotics are reshaping science and medicine. These labs apply them to understand biology and improve surgical and clinical practice.',
    projects: ['Neural network models', 'Machine learning', 'Surgical innovation'],
    imageUrl: '/images/areas/bioinformatics.jpg',
    pageUrl: '/researchAreas/AI',
  },
  {
    title: 'Bioinformatics and Population Health',
    description:
      'Using large genetic, clinical, and health datasets, these labs learn how to better target diagnostics and treatments to individuals and communities.',
    projects: ['Disease genetics', 'Epidemiology', 'Improving outcomes'],
    imageUrl: '/images/areas/health.jpg',
    pageUrl: '/researchAreas/health',
  },
  {
    title: 'Rehabilitation and Eye Motility',
    description:
      'How we look at the world shapes what we see. From magnifiers to eye movements, these labs study what lands on the retina moment to moment — and how it shapes long-term sight.',
    projects: ['Ocular muscles and biomechanics', 'Amblyopia', 'Low vision'],
    imageUrl: '/images/areas/motility.jpg',
    pageUrl: '/researchAreas/rehab',
  },
];

const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
        <Hero
          eyebrow="Research Areas"
          title="Eight domains, one visual system"
          subtitle="Interdisciplinary and multidisciplinary research"
          description="Studying sight from the molecule to the clinic."
          compact
        />

        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Explore the areas"
              title="Where JSEI science concentrates"
              intro="Each area gathers labs that share methods and questions — and most investigators work across several at once."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {researchAreas.map((area, i) => (
              <Reveal key={area.title} delay={(i % 2) * 100}>
                <a
                  href={area.pageUrl}
                  aria-label={`Explore ${area.title}`}
                  className="group flex h-full overflow-hidden rounded-2xl border border-mist bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-sea/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
                >
                  <div className="relative w-28 flex-none overflow-hidden sm:w-40">
                    <img
                      src={area.imageUrl}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(90deg, rgba(6,38,63,0) 60%, rgba(6,38,63,0.12) 100%)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-ink">{area.title}</h3>
                      <span
                        className="mt-1 flex-none text-sea transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
                        aria-hidden="true"
                      >
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{area.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {area.projects.map((project) => (
                        <li
                          key={project}
                          className="rounded-full bg-sea/8 px-2.5 py-0.5 text-xs font-medium text-sea-600"
                        >
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResearchPage;
