// The exact Google Form question titles. scripts/google/create-trainee-form.gs
// creates the form with these titles, and the sync matches Sheet columns to
// them (case-insensitive). If you rename a question in the form, update it here.
export const FIELDS = {
  timestamp: 'Timestamp',
  account: 'Email address', // the respondent's Google account; never published
  name: 'Full name',
  pronouns: 'Pronouns',
  role: 'Role',
  title: 'Title',
  lab: 'Lab',
  description: 'Research interests and role',
  startDate: 'Start date',
  endDate: 'Expected end date',
  // Undergraduates only: asked in its own required form section, and used as
  // their end date so their profile is removed automatically after graduation.
  gradDate: 'Expected graduation date',
  publicEmail: 'Public contact email',
  website: 'Personal website',
  orcid: 'ORCID iD',
  scholar: 'Google Scholar profile',
  linkedin: 'LinkedIn profile',
  headshot: 'Headshot',
  consent: 'Consent to publish',
  approved: 'Approved', // added to the Sheet by you, not part of the form
};

// Form choice text -> role key used by the site (app/data/trainees.js ROLES).
// Medical Students are listed with the graduate students (Greg's decision,
// 2026-10-16); the person's own Title field still shows their exact position.
// Project Scientists are not trainees: they appear on the Scientists page and
// their lab page (Greg's decision, 2026-10-22).
export const ROLE_CHOICES = {
  'Project Scientist': 'projsci',
  'Postdoctoral Scholar / Fellow': 'postdoc',
  'Graduate Student': 'grad',
  'Medical Student': 'grad',
  'Staff Research Associate / Research Technician': 'sra',
  'Undergraduate Student': 'ugrad',
};

export const DESCRIPTION_MAX = 1200;
