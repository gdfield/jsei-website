// Recent publications for a lab page, from the investigator's public ORCID record.
//
// ORCID records can contain mistakes: works claimed by the wrong person, or
// author lists typed by hand (e.g. just "Williams DS et al."). So for every work
// with a DOI, the author list is taken from CrossRef (supplied by the publisher),
// and the work is dropped if the investigator's surname is not among its authors.
// If CrossRef cannot be reached, the work is kept with ORCID's own author list.
//
// Usage: fetchRecentPublications(orcid, 10, { surname: 'Nouri-Mahdavi' })
//   surname  family name as it appears on papers (required for the author check)
//   exclude  optional list of DOIs to hide by hand

const MAX_AUTHORS = 6; // longer lists are shortened, keeping the investigator visible

const norm = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');

const isPreprint = (p) => {
  const journal = p.journal.toLowerCase();
  if (journal.includes('biorxiv') || journal.includes('arxiv') || journal.includes('medrxiv')) return true;
  // bioRxiv/medRxiv DOIs start with 10.1101/, arXiv with 10.48550/
  return Boolean(p.doi && /^10\.(1101|48550)\//.test(p.doi));
};

async function crossref(doi) {
  try {
    const r = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
      headers: { 'User-Agent': 'JSEI-Website/1.0 (mailto:gregfield@ucla.edu)' },
      next: { revalidate: 86400 },
    });
    if (!r.ok) return null;
    return (await r.json())?.message ?? null;
  } catch {
    return null;
  }
}

// "Given Family" names, shortened to MAX_AUTHORS plus the investigator if they
// come later in the list, then "et al."
export function shortenAuthors(names, surname) {
  if (names.length <= MAX_AUTHORS + 2) return names;
  const head = names.slice(0, MAX_AUTHORS);
  const key = norm(surname);
  const pi = key ? names.findIndex((n, i) => i >= MAX_AUTHORS && norm(n).endsWith(key)) : -1;
  return pi >= 0 ? [...head, '…', names[pi], 'et al.'] : [...head, 'et al.'];
}

export async function fetchRecentPublications(orcid, limit = 10, { surname = '', exclude = [] } = {}) {
  const skip = new Set(exclude.map((d) => d.toLowerCase()));
  const key = norm(surname);
  try {
    const summaryRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!summaryRes.ok) return [];
    const summaryData = await summaryRes.json();

    // Fetch more candidates than needed, since preprints and mismatches are dropped.
    const sorted = (summaryData.group || [])
      .map((g) => ({
        putCode: g['work-summary'][0]['put-code'],
        year: parseInt(g['work-summary'][0]['publication-date']?.year?.value ?? '0'),
        month: parseInt(g['work-summary'][0]['publication-date']?.month?.value ?? '0'),
      }))
      .sort((a, b) => b.year - a.year || b.month - a.month)
      .slice(0, limit * 2 + 5);
    if (sorted.length === 0) return [];

    const fullRes = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works/${sorted.map((s) => s.putCode).join(',')}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });
    if (!fullRes.ok) return [];
    const fullData = await fullRes.json();

    const candidates = (fullData.bulk || [])
      .map((item) => {
        const work = item.work;
        const authors = (work?.contributors?.contributor || [])
          .filter((c) => {
            const role = c['contributor-attributes']?.['contributor-role'];
            return !role || role === 'author';
          })
          .map((c) => c['credit-name']?.value)
          .filter(Boolean);
        const doiEntry = (work?.['external-ids']?.['external-id'] || []).find((id) => id['external-id-type'] === 'doi');
        return {
          title: work?.title?.title?.value ?? '',
          journal: work?.['journal-title']?.value ?? '',
          year: work?.['publication-date']?.year?.value ?? '',
          doi: doiEntry?.['external-id-value'] ?? null,
          authors,
        };
      })
      .filter((p) => p.title && !isPreprint(p) && !(p.doi && skip.has(p.doi.toLowerCase())))
      .sort((a, b) => (b.year || '0').localeCompare(a.year || '0'))
      .slice(0, limit + 8);

    const checked = await Promise.all(
      candidates.map(async (p) => {
        if (!p.doi) return p;
        const msg = await crossref(p.doi);
        if (!msg) return p; // CrossRef unreachable: keep ORCID's version
        const names = (msg.author || [])
          .map((a) => [a.given, a.family].filter(Boolean).join(' ') || a.name)
          .filter(Boolean);
        if (key && names.length > 0) {
          const families = (msg.author || []).map((a) => norm(a.family || a.name));
          if (!families.some((f) => f === key || f.endsWith(key) || f.startsWith(key))) return null; // not this investigator's paper
        }
        if (names.length > 0) p.authors = names;
        if (!p.journal) p.journal = msg['container-title']?.[0] ?? '';
        if (isPreprint(p)) return null;
        return p;
      })
    );

    return checked
      .filter(Boolean)
      .slice(0, limit)
      .map((p) => ({ ...p, authors: shortenAuthors(p.authors, surname) }));
  } catch {
    return [];
  }
}
