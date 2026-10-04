// app/page.js
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import SectionHeading from './components/SectionHeading';
import CountUp from './components/CountUp';
import { facultyData } from './data/faculty';

export const metadata = {
  title: { absolute: 'Jules Stein Eye Institute | UCLA Vision Research' },
  description:
    'The Jules Stein Eye Institute (JSEI) at UCLA advances vision science through innovative basic and clinical research in retinal disease, cornea, glaucoma, and neuro-ophthalmology.',
};

const labCount = facultyData.filter((f) => !f.emeritus).length;

const stats = [
  { value: 8, suffix: '', label: 'Research areas' },
  { value: labCount, suffix: '', label: 'Laboratories' },
  { value: 4, suffix: '', label: 'Core facilities' },
  { value: 1966, suffix: '', label: 'Founded', plain: true },
];

// Feature pillars (Research Areas + Laboratories) lead; the three
// resource pillars follow. Copy is tightened to say what each section is.
const featurePillars = [
  {
    title: 'Research Areas',
    description:
      'Eight interconnected domains — from photoreceptor biology to AI-guided surgery — mapping how JSEI scientists study sight and the diseases that threaten it.',
    linkUrl: '/researchAreas',
    imageUrl: '/images/mission/research.jpg',
  },
  {
    title: 'Laboratories',
    description:
      'Independent labs, shared purpose. The basic and clinical scientists driving discovery across the institute.',
    linkUrl: '/laboratories',
    imageUrl: '/images/mission/laboratories.jpg',
  },
];

const resourcePillars = [
  {
    title: 'Core Facilities',
    description:
      'A P30-supported suite of imaging, molecular, in vivo, and fabrication cores that accelerate every project.',
    linkUrl: '/core',
    imageUrl: '/images/mission/cores.jpg',
  },
  {
    title: 'Publications',
    description:
      "The institute's latest peer-reviewed work, drawn live from ORCID and refreshed daily.",
    linkUrl: '/publications',
    imageUrl: '/images/mission/publications.jpg',
  },
  {
    title: 'Funding',
    description:
      'New and competitively renewed NIH and foundation awards powering vision research, sourced from NIH Reporter and ORCID.',
    linkUrl: '/funding',
    imageUrl: '/images/mission/pyramid.png',
  },
];

const ResearchDivisionPage = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
        <Hero
          eyebrow="Organized Research Unit · University of California"
          title="Jules Stein Eye Institute"
          subtitle="Advancing vision science through basic and clinical research"
          description="How the eye sees — and how sight is lost, protected, and restored."
        />

        {/* Thesis + stats band */}
        <section className="border-b border-mist bg-surface">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <Reveal>
                <SectionHeading
                  eyebrow="The Institute"
                  title="One question, studied from every angle: how do we see?"
                />
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  At JSEI, molecular biologists, physiologists, engineers, and
                  clinician-scientists work the same problem from opposite ends —
                  tracing vision from a single photoreceptor to the circuits of the
                  brain, and from the bench to the clinic. The result is a research
                  division where fundamental discovery and patient care sharpen each
                  other.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-mist bg-mist">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-surface p-6 sm:p-8">
                      <div className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                        {stat.plain ? (
                          stat.value
                        ) : (
                          <CountUp end={stat.value} suffix={stat.suffix} />
                        )}
                      </div>
                      <div className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Explore JSEI"
              title="Five ways into the institute"
              intro="Everything the research division does, organized into the paths researchers, trainees, and collaborators actually follow."
            />
          </Reveal>

          {/* Feature pillars */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featurePillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100}>
                <a
                  href={pillar.linkUrl}
                  aria-label={`Explore ${pillar.title}`}
                  className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border border-mist shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
                >
                  <img
                    src={pillar.imageUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(6,38,63,0.05) 0%, rgba(6,38,63,0.35) 45%, rgba(6,38,63,0.92) 100%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative p-8">
                    <h3 className="font-display text-3xl font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-md text-white/80">{pillar.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                      Explore
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Resource pillars */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {resourcePillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100}>
                <a
                  href={pillar.linkUrl}
                  aria-label={`Explore ${pillar.title}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-sea/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={pillar.imageUrl}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(6,38,63,0) 40%, rgba(6,38,63,0.35) 100%)',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-semibold text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {pillar.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-sea transition-colors group-hover:text-gold-deep">
                      Explore
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Closing band */}
        <section className="relative overflow-hidden bg-ink">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(60% 120% at 85% 0%, rgba(30,111,168,0.5) 0%, rgba(6,38,63,0) 60%)',
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="max-w-2xl">
              <p className="eyebrow !text-gold">Join the work</p>
              <h2 className="mt-5 font-display text-3xl font-semibold text-white sm:text-4xl">
                Vision research is a team science — and JSEI is hiring, training, and
                collaborating.
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Explore the laboratories to find a research home, or browse the core
                facilities open to investigators across UCLA and beyond.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/laboratories"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-ink transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Browse laboratories
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a
                  href="/core"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Core facilities
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResearchDivisionPage;
