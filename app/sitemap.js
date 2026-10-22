import { facultyData } from './data/faculty';
import { activeTrainees, activeProjectScientists } from './data/trainees';

const BASE = 'https://julessteinlabs.org';

// Re-evaluate daily so former trainees drop out of the sitemap.
export const revalidate = 86400;

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: BASE, lastModified: now, priority: 1.0 },
    { url: `${BASE}/scientists`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/publications`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/funding`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/researchAreas`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/core`, lastModified: now, priority: 0.7 },
  ];

  // bioinfo is a legacy duplicate of the AI page (noindex), so it is left out.
  const areaPages = ['regeneration', 'retinalbio', 'visualneuro', 'ocular', 'surface', 'AI', 'health', 'rehab'].map((a) => ({
    url: `${BASE}/researchAreas/${a}`,
    lastModified: now,
    priority: 0.6,
  }));

  const labPages = facultyData
    .filter((f) => f.pageUrl)
    .map((f) => ({
      url: `${BASE}${f.pageUrl.replace(/\/$/, '')}`,
      lastModified: now,
      priority: 0.6,
    }));

  const trainees = activeTrainees();
  const traineePages = trainees.length
    ? [
        { url: `${BASE}/trainees`, lastModified: now, priority: 0.7 },
        ...trainees.map((t) => ({ url: `${BASE}/trainees/${t.slug}`, lastModified: now, priority: 0.4 })),
      ]
    : [];

  const scientistPages = activeProjectScientists().map((t) => ({ url: `${BASE}${t.path}`, lastModified: now, priority: 0.5 }));

  return [...staticPages, ...areaPages, ...labPages, ...scientistPages, ...traineePages];
}
