# Unpublished pages

These pages are kept for future development but are **not routed** (Next.js ignores folders whose names start with `_`), so they are not reachable on julessteinlabs.org and are excluded from the build.

- `education/` (EyeSTAR, NIH T32, residency and fellowship programs)
- `outreach/`
- `people/` (institute leadership)

To publish one again, move its folder back to `app/` (for example `mv app/_unpublished/education app/education`), add it to `links` in `app/components/Navbar.js` and `app/components/Footer.js`, add it to `app/sitemap.js`, and add its URL to `.pa11yci`.
