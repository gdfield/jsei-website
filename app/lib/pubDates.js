// Publication-date helpers for the Publications page.
//
// ORCID records often carry only a year (or year + month), and the date they
// hold is whatever the author's ORCID import recorded. For papers with a DOI we
// ask CrossRef for the date the paper was first published (the earliest of its
// online and print dates), so the page can list papers in true publication order.

// A date is { year, month, day } with month/day possibly null.
export function orcidDate(pubDate) {
  const n = (v) => {
    const x = parseInt(v?.value ?? v ?? '', 10);
    return Number.isFinite(x) && x > 0 ? x : null;
  };
  const year = n(pubDate?.year);
  if (!year) return null;
  return { year, month: n(pubDate?.month), day: year && n(pubDate?.month) ? n(pubDate?.day) : null };
}

const fromParts = (parts) => {
  const [y, m, d] = parts ?? [];
  if (!Number.isInteger(y) || y < 1000) return null;
  return { year: y, month: Number.isInteger(m) ? m : null, day: Number.isInteger(m) && Number.isInteger(d) ? d : null };
};

// Comparable key (newest-first sorts compare it descending). Missing month or
// day is "00", so in a newest-first list "2025" (year only) comes after every
// dated 2025 paper, and "March 2025" after every dated March 2025 paper.
export const sortKey = (d) =>
  d ? `${String(d.year).padStart(4, '0')}-${String(d.month ?? 0).padStart(2, '0')}-${String(d.day ?? 0).padStart(2, '0')}` : '0000';

// Earliest of CrossRef's online and print dates; falls back to "published"
// and then "issued". Prefers the most precise date when two are equal.
export function crossrefDate(message) {
  const candidates = ['published-online', 'published-print', 'published', 'issued']
    .map((k) => fromParts(message?.[k]?.['date-parts']?.[0]))
    .filter(Boolean);
  if (candidates.length === 0) return null;
  // Compare on the shared precision so "2025" doesn't beat "2025-03-02".
  const firstKey = (d) => `${d.year}-${String(d.month ?? 0).padStart(2, '0')}-${String(d.day ?? 0).padStart(2, '0')}`;
  const precision = (d) => (d.day ? 3 : d.month ? 2 : 1);
  return candidates.reduce((best, d) => {
    const b = best;
    if (d.year !== b.year) return d.year < b.year ? d : b;
    if (d.month && b.month && d.month !== b.month) return d.month < b.month ? d : b;
    if (d.month && b.month && d.day && b.day && d.day !== b.day) return d.day < b.day ? d : b;
    return precision(d) > precision(b) ? d : b;
  });
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(d) {
  if (!d) return '';
  if (d.month && d.day) return `${MONTHS[d.month - 1]} ${d.day}, ${d.year}`;
  if (d.month) return `${MONTHS[d.month - 1]} ${d.year}`;
  return String(d.year);
}

export const isoDate = (d) =>
  d?.month && d?.day
    ? `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
    : d?.month
      ? `${d.year}-${String(d.month).padStart(2, '0')}`
      : d
        ? String(d.year)
        : undefined;

// Look up CrossRef dates for many DOIs with limited concurrency. Returns a
// Map doi -> date; DOIs that fail are simply absent (callers keep ORCID's date).
export async function fetchCrossrefDates(dois, { concurrency = 8, fetchImpl = fetch } = {}) {
  const out = new Map();
  const queue = [...new Set(dois.filter(Boolean))];
  async function worker() {
    while (queue.length) {
      const doi = queue.shift();
      try {
        const res = await fetchImpl(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
          headers: { 'User-Agent': 'JSEI-Website/1.0 (mailto:gregfield@ucla.edu)' },
          next: { revalidate: 86400 },
        });
        if (!res.ok) continue;
        const data = await res.json();
        const d = crossrefDate(data?.message);
        if (d) out.set(doi, d);
      } catch {
        // keep ORCID's date
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker));
  return out;
}
