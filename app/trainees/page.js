import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import TraineeDirectory from '../components/TraineeDirectory';
import { activeTrainees, ROLES } from '../data/trainees';
import { labs } from '../data/labs';
import { pageMeta } from '../lib/seo';

// Re-evaluate daily so trainees drop off after their end date without a deploy.
export const revalidate = 86400;

export const metadata = pageMeta({
  path: '/trainees',
  title: "Trainees and Research Staff",
  description: "Project scientists, postdoctoral scholars, graduate and medical students, and research staff in the laboratories of the Jules Stein Eye Institute, UCLA.",
});

export default function TraineesPage() {
  const trainees = activeTrainees();
  const counts = ROLES.map((r) => ({ ...r, n: trainees.filter((t) => t.role === r.key).length }));

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
        <Hero
          eyebrow="Our Trainees"
          title="Trainees and Research Staff"
          subtitle="The scientists behind the science"
          description="Project scientists, postdoctoral scholars, graduate and medical students, and research staff working across the institute's laboratories."
          compact
        />

        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="People"
              title="A research community in training"
              intro="Every JSEI laboratory is powered by trainees and staff scientists. Browse by role or by lab."
            />
          </Reveal>

          {trainees.length === 0 ? (
            <p className="mt-10 text-ink-soft">Profiles are on their way. Please check back soon.</p>
          ) : (
            <>
              <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {counts.map((c) => (
                  <div key={c.key} className="rounded-2xl border border-mist bg-surface p-5 shadow-card">
                    <dt className="text-sm text-muted">{c.label}</dt>
                    <dd className="mt-1 font-display text-3xl font-semibold text-ink">{c.n}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <TraineeDirectory
                  trainees={trainees}
                  roles={ROLES}
                  labs={labs.map(({ slug, labName }) => ({ slug, labName }))}
                />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
