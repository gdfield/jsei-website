// Every lab a trainee can be affiliated with. Used by the trainee pages, the
// trainee sync script (scripts/sync-trainees.mjs), and the Google Form builder
// (scripts/google/create-trainee-form.gs), so the form's "Lab" choices and the
// site always agree. `formLabel` is the exact text of the form option.
import { facultyData } from './faculty.js';

// Lab pages that intentionally have no entry in faculty.js.
const STANDALONE_LABS = [
  { slug: 'brecha', piName: 'Nicholas Brecha' },
  { slug: 'gorin', piName: 'Michael Gorin' },
  { slug: 'huk', piName: 'Alex Huk' },
  { slug: 'piri', piName: 'Natik Piri' },
];

const slugFromUrl = (url) => url.replace(/\/$/, '').split('/').pop();
const lastName = (name) => name.replace(/,.*$/, '').trim().split(/\s+/).pop();

const baseLabs = [
  ...facultyData
    .filter((f) => f.pageUrl && !f.emeritus)
    .map((f) => ({ slug: slugFromUrl(f.pageUrl), piName: f.name })),
  ...STANDALONE_LABS,
];

// Two PIs can share a last name (e.g. the two Tsui labs); add a first initial then.
const lastNameCounts = baseLabs.reduce((acc, l) => {
  const k = lastName(l.piName);
  acc[k] = (acc[k] ?? 0) + 1;
  return acc;
}, {});

export const labs = baseLabs
  .map((lab) => {
    const last = lastName(lab.piName);
    const short = lastNameCounts[last] > 1 ? `${lab.piName[0]}. ${last}` : last;
    return {
      ...lab,
      pageUrl: `/laboratories/${lab.slug}`,
      labName: `${short} Lab`,
      formLabel: `${last} Lab (${lab.piName})`,
    };
  })
  .sort((a, b) => a.formLabel.localeCompare(b.formLabel));

export const labBySlug = Object.fromEntries(labs.map((l) => [l.slug, l]));
export const labByFormLabel = Object.fromEntries(labs.map((l) => [l.formLabel, l]));
