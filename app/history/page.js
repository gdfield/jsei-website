import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import DiscoveryCarousel from '../components/DiscoveryCarousel';
import { achievementsIntro, achievements, milestones, leaders } from '../data/history';
import { pageMeta } from '../lib/seo';

export const metadata = pageMeta({
  path: '/history',
  title: 'Institute History',
  description: 'How the Jules Stein Eye Institute began in 1966, the discoveries made there, and the founder and directors who have led it.',
  // Unlisted while colleagues review it: no menu link, not in the sitemap, and
  // search engines are asked not to index it. To launch, remove noindex and add
  // History back to Navbar.js, Footer.js, and app/sitemap.js.
  noindex: true,
});

// Portrait, or the person's initials until a photo is added in app/data/history.js.
function Portrait({ leader }) {
  if (leader.photo) {
    return (
      <img
        src={leader.photo}
        alt={`Portrait of ${leader.name}`}
        className="aspect-[4/5] w-full rounded-xl object-cover shadow-card outline outline-1 -outline-offset-1 outline-ink/10"
      />
    );
  }
  const initials = leader.name
    .replace(/,.*$/, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z][a-z]/.test(w))
    .map((w) => w[0])
    .join('');
  return (
    <div
      aria-hidden="true"
      className="grid aspect-[4/5] w-full place-items-center rounded-xl bg-sea/8 font-display text-6xl font-semibold text-sea-600 outline outline-1 -outline-offset-1 outline-ink/10"
    >
      {initials}
    </div>
  );
}

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main id="main-content">
        <Hero
          eyebrow="Since 1966"
          title="Institute History"
          subtitle="From a founder's gift to a home for vision science at UCLA"
          description="The discoveries, milestones, and leaders behind the Jules Stein Eye Institute."
          compact
        />

        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {/* Research achievements lead the page. */}
          <section aria-labelledby="achievements-heading">
            <SectionHeading id="achievements-heading" eyebrow="Discoveries" title="Discoveries that advanced vision science" />
            <p className="mt-6 max-w-3xl font-display text-2xl leading-snug text-ink [text-wrap:pretty] sm:text-3xl">
              {achievementsIntro}
            </p>
            <div className="mt-10">
              <DiscoveryCarousel items={achievements} />
            </div>
          </section>

          {/* Milestones: a real sequence, so it is drawn as a timeline. */}
          <section aria-labelledby="milestones-heading" className="mt-24">
            <SectionHeading id="milestones-heading" eyebrow="Milestones" title="How the institute grew" />
            <ol className="relative mt-12 list-none p-0 before:absolute before:bottom-2 before:left-[5.25rem] before:top-2 before:w-px before:bg-mist sm:before:left-[7.25rem]">
              {milestones.map((m) => (
                <li key={m.year + m.text} className="relative grid grid-cols-[5.25rem_1fr] items-baseline gap-x-8 pb-8 last:pb-0 sm:grid-cols-[7.25rem_1fr]">
                  <span className="pr-6 text-right font-display text-3xl font-semibold leading-none tabular-nums text-ink sm:text-5xl">
                    {m.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-[5.25rem] top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold ring-4 ring-paper sm:left-[7.25rem] sm:top-5"
                  />
                  <p className="max-w-2xl text-lg leading-relaxed text-ink-soft [text-wrap:pretty]">{m.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Founder and directors. */}
          <section aria-labelledby="leadership-heading" className="mt-24">
            <SectionHeading
              id="leadership-heading"
              eyebrow="Leadership"
              title="Founder and directors"
              intro="The founder and the three directors who have led the institute since it opened in 1966."
            />
            <div className="mt-12 space-y-16">
              {leaders.map((l) => (
                <article key={l.slug} id={l.slug} aria-labelledby={`${l.slug}-name`} className="grid scroll-mt-24 gap-8 border-t border-mist pt-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-12">
                  <div className="max-w-[10rem] md:max-w-[15rem]">
                    <Portrait leader={l} />
                  </div>
                  <div>
                    <h3 id={`${l.slug}-name`} className="font-display text-3xl font-semibold leading-tight text-ink">
                      {l.name}
                    </h3>
                    <p className="mt-1 text-ink-soft">
                      {l.role}, <span className="tabular-nums">{l.years}</span>
                    </p>
                    <div className="mt-5 max-w-[68ch] space-y-4 leading-relaxed text-ink-soft">
                      {l.bio.map((p) => (
                        <p key={p.slice(0, 32)} className="[text-wrap:pretty]">{p}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
