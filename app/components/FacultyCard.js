import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const FacultyCard = ({ faculty }) => {
  return (
    <a
      href={faculty.pageUrl}
      aria-label={`Visit ${faculty.name}'s ${faculty.projectScientist ? 'profile' : 'laboratory'} page`}
      className="group relative flex gap-5 rounded-2xl border border-mist bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-sea/30 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
    >
      <div className="relative flex-none">
        <img
          src={faculty.profileImage}
          alt={faculty.name}
          className="h-24 w-24 rounded-full object-cover ring-2 ring-mist transition-all duration-300 group-hover:ring-gold/60"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink">
            {faculty.name}
          </h3>
          <span
            className="mt-1 flex-none text-sea transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
            aria-hidden="true"
          >
            <ArrowUpRight size={20} />
          </span>
        </div>
        <p className="text-sm text-muted">{faculty.title}</p>
        <p className="mt-1 font-medium text-sea-600">{faculty.research}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {faculty.description}
        </p>

        {Array.isArray(faculty.researchAreas) && faculty.researchAreas.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {faculty.researchAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-sea/8 px-2.5 py-0.5 text-xs font-medium text-sea-600"
              >
                {area}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export default FacultyCard;
