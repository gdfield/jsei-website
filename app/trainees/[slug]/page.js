import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { allTraineeSlugs, traineeBySlug, isActive, roleByKey } from '../../data/trainees';
import { labBySlug } from '../../data/labs';

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return allTraineeSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const t = traineeBySlug(params.slug);
  if (!t || !isActive(t)) return {};
  const lab = labBySlug[t.lab];
  return {
    title: `${t.name}, ${t.title}`,
    description: t.description?.slice(0, 155) || `${t.name}, ${t.title}${lab ? `, ${lab.labName}` : ''}, Jules Stein Eye Institute.`,
  };
}

const LINKS = [
  ['website', 'Personal website'],
  ['orcid', 'ORCID'],
  ['scholar', 'Google Scholar'],
  ['linkedin', 'LinkedIn'],
];

export default function TraineeProfilePage({ params }) {
  const t = traineeBySlug(params.slug);
  if (!t || !isActive(t)) notFound();
  const lab = labBySlug[t.lab];
  if (!lab) notFound();
  const role = roleByKey[t.role];

  const links = LINKS.filter(([k]) => t.links?.[k]).map(([k, label]) => ({
    label,
    href: k === 'orcid' ? `https://orcid.org/${t.links.orcid}` : t.links[k],
  }));

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t.name,
    jobTitle: t.title,
    url: `https://julessteinlabs.org/trainees/${t.slug}`,
    ...(t.photo ? { image: `https://julessteinlabs.org${t.photo}` } : {}),
    ...(links.length ? { sameAs: links.map((l) => l.href) } : {}),
    affiliation: {
      '@type': 'ResearchOrganization',
      name: 'Jules Stein Eye Institute',
      url: 'https://julessteinlabs.org',
    },
  };

  return (
    <div className="min-h-screen bg-paper">
      <script
        type="application/ld+json"
        // Escape "<" so text from the form can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, '\\u003c') }}
      />
      <Navbar />
      <main id="main-content" className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Link
          href="/trainees"
          className="inline-flex items-center gap-2 text-sm font-medium text-sea hover:text-gold-deep"
        >
          <ArrowLeft size={16} aria-hidden="true" /> All trainees
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,280px)_1fr]">
          <div>
            {t.photo ? (
              <img
                src={t.photo}
                alt={`Portrait of ${t.name}`}
                width={600}
                height={600}
                className="aspect-square w-full max-w-[280px] rounded-2xl object-cover shadow-card"
              />
            ) : (
              <div
                className="grid aspect-square w-full max-w-[280px] place-items-center rounded-2xl bg-sea/10 font-display text-6xl font-semibold text-sea-600"
                aria-hidden="true"
              >
                {t.name.charAt(0)}
              </div>
            )}
          </div>

          <div>
            {role && <p className="eyebrow">{role.singular}</p>}
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {t.name}
            </h1>
            {t.pronouns && <p className="mt-2 text-muted">{t.pronouns}</p>}
            <p className="mt-4 text-lg text-ink">{t.title}</p>
            <p className="mt-1 text-lg">
              <Link href={lab.pageUrl} className="font-medium text-sea hover:text-gold-deep">
                {lab.labName}
              </Link>
              <span className="text-muted"> · {lab.piName}</span>
            </p>

            {t.description && (
              <div className="mt-8 max-w-prose">
                <h2 className="sr-only">About</h2>
                {t.description.split(/\n{2,}/).map((para, i) => (
                  <p key={i} className="mb-4 leading-relaxed text-ink-soft">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {(links.length > 0 || t.email) && (
              <div className="mt-8">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sea-600">Links</h2>
                <ul className="mt-3 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
                  {t.email && (
                    <li>
                      <a href={`mailto:${t.email}`} className="text-sea hover:text-gold-deep">
                        {t.email}
                      </a>
                    </li>
                  )}
                  {links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sea hover:text-gold-deep">
                        {l.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
