import { facultyData } from './data/faculty';
import { activeTrainees, activeProjectScientists } from './data/trainees';
// Date each page's source last changed in git, written before every build by
// scripts/sitemap-dates.mjs. Pages without a known date get no <lastmod>:
// Google trusts an honest date or none, and learns to ignore "today" on every page.
import changed from './data/sitemap-dates.json';

const BASE = 'https://julessteinlabs.org';

// Re-evaluate daily so former trainees drop out of the sitemap.
export const revalidate = 86400;

const lastModified = (route) => (changed[route] ? { lastModified: new Date(changed[route]) } : {});

export default function sitemap() {
  const staticPages = [
    { url: BASE, ...lastModified('/'), priority: 1.0 },
    { url: `${BASE}/scientists`, ...lastModified('/scientists'), priority: 0.9 },
    { url: `${BASE}/publications`, ...lastModified('/publications'), priority: 0.8 },
    { url: `${BASE}/funding`, ...lastModified('/funding'), priority: 0.8 },
    { url: `${BASE}/researchAreas`, ...lastModified('/researchAreas'), priority: 0.8 },
    { url: `${BASE}/core`, ...lastModified('/core'), priority: 0.7 },
  ];

  // bioinfo is a legacy duplicate of the AI page (noindex), so it is left out.
  const areaPages = ['regeneration', 'retinalbio', 'visualneuro', 'ocular', 'surface', 'AI', 'health', 'rehab'].map((a) => ({
    url: `${BASE}/researchAreas/${a}`,
    ...lastModified(`/researchAreas/${a}`),
    priority: 0.6,
  }));

  const labPages = facultyData
    .filter((f) => f.pageUrl)
    .map((f) => ({
      url: `${BASE}${f.pageUrl.replace(/\/$/, '')}`,
      ...lastModified(f.pageUrl.replace(/\/$/, '')),
      priority: 0.6,
    }));

  const trainees = activeTrainees();
  const traineePages = trainees.length
    ? [
        { url: `${BASE}/trainees`, ...lastModified('/trainees'), priority: 0.7 },
        ...trainees.map((t) => ({ url: `${BASE}/trainees/${t.slug}`, priority: 0.4 })),
      ]
    : [];

  const scientistPages = activeProjectScientists().map((t) => ({ url: `${BASE}${t.path}`, priority: 0.5 }));

  return [...staticPages, ...areaPages, ...labPages, ...scientistPages, ...traineePages];
}
