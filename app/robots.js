// Served at /robots.txt. Lets every search engine crawl the live site and
// points them to the sitemap. Vercel preview deployments (branch previews)
// are blocked so test versions never show up in search results.
const BASE = 'https://julessteinlabs.org';

export default function robots() {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
