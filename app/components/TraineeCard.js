import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// Same rule as joinNames in app/data/trainees.js (not imported: this card is
// used inside a client component, which must not bundle app/data/*).
const joinNames = (n) => (n.length <= 2 ? n.join(' and ') : `${n.slice(0, -1).join(', ')}, and ${n[n.length - 1]}`);

// Card used in the trainee directory and on lab pages. On a lab's own page,
// `currentLab` is that lab's slug: its name would be redundant, so only the
// person's other labs (if any) are shown, as "Also in ...".
const TraineeCard = ({ trainee, currentLab = null, headingLevel = 3 }) => {
  const Heading = `h${headingLevel}`;
  const names = trainee.labNames ?? [];
  const others = currentLab ? names.filter((_, i) => trainee.labs[i] !== currentLab) : names;
  const labLine = others.length === 0 ? null : (currentLab ? 'Also in ' : '') + joinNames(others);
  return (
    <Link
      href={trainee.path ?? `/trainees/${trainee.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-mist bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-sea/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
    >
      <div className="flex items-center gap-4">
        {trainee.photo ? (
          <img
            src={trainee.photo}
            alt=""
            loading="lazy"
            width={80}
            height={80}
            className="h-20 w-20 flex-none rounded-full object-cover ring-2 ring-mist transition-all duration-300 group-hover:ring-gold/60"
          />
        ) : (
          <span
            className="grid h-20 w-20 flex-none place-items-center rounded-full bg-sea/10 font-display text-2xl font-semibold text-sea-600"
            aria-hidden="true"
          >
            {trainee.name.charAt(0)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <Heading className="font-display text-lg font-semibold leading-tight text-ink">
            {trainee.name}
            {trainee.pronouns && (
              <span className="ml-2 align-middle font-sans text-xs font-normal text-muted">
                ({trainee.pronouns})
              </span>
            )}
          </Heading>
          <p className="mt-1 text-sm text-muted">{trainee.title}</p>
          {labLine && <p className="mt-0.5 text-sm font-medium text-sea-600">{labLine}</p>}
        </div>
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="flex-none self-start text-sea transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
        />
      </div>
      {trainee.description && (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">{trainee.description}</p>
      )}
    </Link>
  );
};

export default TraineeCard;
