'use client';
import React, { useMemo, useState } from 'react';
import TraineeCard from './TraineeCard';

// Filterable trainee grid. Receives already-filtered (active, approved) trainees
// from the server page, plus the role and lab lists for the filter controls.
// Keep imports here free of app/data/* so the lab/faculty data isn't bundled.
const TraineeDirectory = ({ trainees, roles, labs }) => {
  const [role, setRole] = useState('all');
  const [lab, setLab] = useState('all');

  const labsWithTrainees = useMemo(
    () => labs.filter((l) => trainees.some((t) => t.labs.includes(l.slug))),
    [labs, trainees]
  );

  const visible = trainees.filter(
    (t) => (role === 'all' || t.role === role) && (lab === 'all' || t.labs.includes(lab))
  );
  const groups = roles
    .map((r) => ({ ...r, people: visible.filter((t) => t.role === r.key) }))
    .filter((g) => g.people.length > 0);

  const chip = (active) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea ${
      active ? 'border-sea bg-sea text-white' : 'border-mist bg-surface text-ink-soft hover:border-sea/40 hover:text-ink'
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-mist bg-surface p-4 shadow-card md:flex-row md:items-center md:justify-between">
        <fieldset>
          <legend className="sr-only">Filter by role</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={role === 'all'} className={chip(role === 'all')} onClick={() => setRole('all')}>
              Everyone
            </button>
            {roles.map((r) => (
              <button
                key={r.key}
                type="button"
                aria-pressed={role === r.key}
                className={chip(role === r.key)}
                onClick={() => setRole(r.key)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="flex items-center gap-3">
          <label htmlFor="lab-filter" className="text-sm font-medium text-ink">
            Lab
          </label>
          <select
            id="lab-filter"
            value={lab}
            onChange={(e) => setLab(e.target.value)}
            className="rounded-lg border border-mist bg-paper px-3 py-2 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
          >
            <option value="all">All labs</option>
            {labsWithTrainees.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.labName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {trainees.length} {trainees.length === 1 ? 'person' : 'people'}
      </p>

      {groups.length === 0 && (
        <p className="mt-10 text-ink-soft">No one matches these filters.</p>
      )}

      {groups.map((g) => (
        <section key={g.key} aria-labelledby={`role-${g.key}`} className="mt-10">
          <h2 id={`role-${g.key}`} className="font-display text-2xl font-semibold text-ink">
            {g.label} <span className="font-mono text-sm font-normal text-muted">{g.people.length}</span>
          </h2>
          <ul className="mt-5 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {g.people.map((t) => (
              <li key={t.slug}>
                <TraineeCard trainee={t} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default TraineeDirectory;
