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
export const ROLE_CHOICES = {
  'Postdoctoral Scholar / Fellow': 'postdoc',
  'Graduate Student': 'grad',
  'Staff Research Associate / Research Technician': 'sra',
};

export const DESCRIPTION_MAX = 1200;
