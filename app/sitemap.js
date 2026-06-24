import { facultyData } from './data/faculty';

const BASE = 'https://julessteinlabs.org';

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: BASE, lastModified: now, priority: 1.0 },
    { url: `${BASE}/laboratories`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/publications`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/funding`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/researchAreas`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/core`, lastModified: now, priority: 0.7 },
  ];

  const labPages = facultyData
    .filter((f) => f.pageUrl)
    .map((f) => ({
      url: `${BASE}${f.pageUrl.replace(/\/$/, '')}`,
      lastModified: now,
      priority: 0.6,
    }));

  return [...staticPages, ...labPages];
}
