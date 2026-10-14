import React from 'react';
import { traineesForLab, ROLES } from '@/app/data/trainees';
import TraineeCard from './TraineeCard';

// "Lab Members" section for a lab page, placed inside the page container just
// above the publications list.
// Renders nothing until the lab has at least one active, approved trainee profile.
const LabTrainees = ({ lab }) => {
  const members = traineesForLab(lab);
  if (members.length === 0) return null;
  const groups = ROLES.map((r) => ({ ...r, people: members.filter((t) => t.role === r.key) })).filter(
    (g) => g.people.length > 0
  );
  return (
    <section aria-labelledby="lab-members-heading" className="mt-12">
      <h2 id="lab-members-heading" className="mb-6 text-2xl font-bold text-ink">
        Lab Members
      </h2>
      {groups.map((g) => (
        <div key={g.key} className="mb-8">
          <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sea-600">{g.label}</h3>
          <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {g.people.map((t) => (
              <li key={t.slug}>
                <TraineeCard trainee={t} showLab={false} headingLevel={4} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default LabTrainees;
