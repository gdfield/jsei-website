// app/core/page.js
import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

export const metadata = {
  title: 'Core Facilities',
  description:
    'Shared core facilities at the Jules Stein Eye Institute at UCLA, providing advanced tools and resources to accelerate vision science research.',
};

const coreFacilities = [
  {
    title: 'Microscopy and Image Analysis',
    description:
      'State-of-the-art microscopy for studies of retinal structure and function — from high-resolution confocal and super-resolution to electron microscopy and advanced 3D image analysis, including live-cell imaging.',
    equipment: [
      'Wide-field and high-resolution microscopy',
      'Tissue and sample preparation',
      'Advanced image analysis, including 3D reconstruction',
    ],
    director: 'David Williams, Ph.D.',
    staff: 'Yuekan Jiao, Ph.D. & Jane Coffman, Ph.D.',
    imageUrl: '/images/cores/microscopy.jpg',
  },
  {
    title: 'Molecular Biology and Gene Delivery',
    description:
      'Advanced molecular biology supporting genetic and genomic research — gene modification, viral vector production, cellular analysis, and a full array of equipment for molecular and biochemical assays.',
    equipment: [
      'Vector production and cell culture',
      'DNA/RNA analysis equipment',
      'Electroporation',
    ],
    director: 'Xian-Jie Yang, Ph.D.',
    staff: 'Duc Hoang, Ph.D. & Jane Coffman, Ph.D.',
    imageUrl: '/images/cores/Gene-delivery.jpg',
  },
  {
    title: 'Live Imaging and Functional Evaluation (LIFE)',
    description:
      'In vivo imaging and functional assessment of the visual system, providing comprehensive analysis of retinal structure and function in animal models of eye disease.',
    equipment: [
      'Electroretinography (ERG)',
      'Optical Coherence Tomography (OCT)',
      'Visual behavior testing',
    ],
    director: 'Greg D. Field, Ph.D.',
    staff: 'Eduardo Araujo',
    imageUrl: '/images/cores/life.jpg',
  },
  {
    title: 'Prototype Construction',
    description:
      'Custom design and fabrication of specialized research equipment — creating unique apparatus and modifications to existing instruments to make new experiments possible.',
    equipment: [
      '3D printing capabilities',
      'Precision machine shop',
      'Expert machinist',
    ],
    director: 'Joseph L. Demer, M.D., Ph.D.',
    staff: 'Jose Gomez Godinez',
    imageUrl: '/images/cores/prototype.jpg',
  },
];

const CoreFacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
        <Hero
          eyebrow="Core Facilities"
          title="The instruments behind the discoveries"
          subtitle="P30 Vision Research Core at UCLA"
          description="Shared technology that accelerates every project at JSEI."
          compact
        />

        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Shared resources"
              title="Four cores, open to every lab"
              intro="Funded by an NEI P30 Core Grant, these modules give JSEI investigators access to capabilities no single lab could sustain alone."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {coreFacilities.map((facility, i) => (
              <Reveal key={facility.title} delay={(i % 2) * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={facility.imageUrl}
                      alt={facility.title}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, rgba(6,38,63,0) 45%, rgba(6,38,63,0.45) 100%)' }}
                      aria-hidden="true"
                    />
                    <h3 className="absolute bottom-4 left-5 right-5 font-display text-2xl font-semibold text-white">
                      {facility.title}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-ink-soft">{facility.description}</p>

                    <dl className="mt-5 space-y-1.5 text-sm">
                      <div className="flex gap-2">
                        <dt className="font-semibold text-ink">Director</dt>
                        <dd className="text-muted">{facility.director}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold text-ink">Staff</dt>
                        <dd className="text-muted">{facility.staff}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 border-t border-mist pt-5">
                      <p className="eyebrow mb-3">Key capabilities</p>
                      <ul className="space-y-2">
                        {facility.equipment.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoreFacilitiesPage;
