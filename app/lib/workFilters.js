// Rules for which ORCID works the site lists, shared by the lab pages
// (app/lib/orcidPublications.js) and the Publications page.
//
// Left out:
// - conference abstracts and other meeting items. ORCID marks many of them with a
//   "conference-*" work type. ARVO meeting abstracts are published in IOVS without
//   an IOVS article DOI (real IOVS articles have DOIs starting 10.1167/iovs.), and
//   Vision Sciences Society abstracts in Journal of Vision have article numbers of
//   1000 or more (10.1167/jov.24.10.1234), while regular JOV articles are numbered
//   1, 2, 3, ... CrossRef "proceedings-article" records are left out too.
// - anything dated after today (early ORCID or CrossRef dates for issues to come).

const CONFERENCE_TYPES = new Set([
  'conference-abstract',
  'conference-paper',
  'conference-poster',
  'conference-presentation',
  'conference-proceedings',
  'conference-output',
  'lecture-speech',
]);

const IOVS = /investigative ophthalmology|^iovs\b|invest ophthalmol vis sci/i;

export function isConferenceItem({ type = '', journal = '', doi = '', crossrefType = '' } = {}) {
  if (CONFERENCE_TYPES.has(type)) return true;
  if (crossrefType === 'proceedings-article') return true;
  const d = (doi || '').toLowerCase();
  if (IOVS.test(journal) && !d.startsWith('10.1167/iovs.')) return true;
  const jov = d.match(/^10\.1167\/jov\.\d+\.\d+\.(\d+)$/);
  if (jov && Number(jov[1]) >= 1000) return true;
  return false;
}

// date = { year, month, day } with month/day possibly null (see pubDates.js).
// A date known only to the month counts as future only if that month is ahead.
export function isFutureDate(date, now = new Date()) {
  if (!date?.year) return false;
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth() + 1;
  const d = now.getUTCDate();
  if (date.year !== y) return date.year > y;
  if (!date.month) return false;
  if (date.month !== m) return date.month > m;
  return Boolean(date.day && date.day > d);
}
