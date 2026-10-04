import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// Card used in the trainee directory and on lab pages. `showLab` is false on a
// lab's own page, where the lab name would be redundant.
const TraineeCard = ({ trainee, showLab = true, headingLevel = 3 }) => {
  const Heading = `h${headingLevel}`;
  return (
    <Link
      href={`/trainees/${trainee.slug}`}
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
          {showLab && trainee.labName && (
            <p className="mt-0.5 text-sm font-medium text-sea-600">{trainee.labName}</p>
          )}
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
