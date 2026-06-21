# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The canonical template for faculty pages is `app/laboratories/field/page.js` — match its structure for bio, publications, and layout when creating new pages.

## Deployment
   - Hosted on Vercel, deployed from the `main` branch via GitHub integration.
   - Production domain: julessteinlabs.org (DNS managed via Cloudflare).
   - Pushing to `main` triggers an automatic production deployment — work on a branch for anything you don't want live immediately.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite exists.

## Architecture

This is a **Next.js 14 App Router** site (React 18, Tailwind CSS) for the Jules Stein Eye Institute (JSEI) at UCLA. It is deployed on Vercel.

**All content is static.** There are no API calls, no CMS, and no dynamic data fetching. Everything is hardcoded in page components or in `app/data/faculty.js`.

### Data

- `app/data/faculty.js` — exports `facultyData`, an array of faculty objects used by the Laboratories listing page (`app/laboratories/page.js`) and the `FacultyCard` component. Fields: `name`, `title`, `research`, `description`, `profileImage`, `pageUrl`, `researchAreas`.
- Individual lab pages (`app/laboratories/[lastname]/page.js`) are **self-contained** — they do not import from `faculty.js`. All bio, publications, and research details are hardcoded inside each page file.

### Shared Components

- `app/components/Navbar.js` — hardcoded navigation links; used on every page.
- `app/components/Hero.js` — client component; auto-rotating image carousel. Accepts `title`, `subtitle`, `description` props.
- `app/components/FacultyCard.js` — card linking to a lab page via `faculty.pageUrl`.

### Page Patterns

All pages follow the same structure:
1. `<Navbar />`
2. `<Hero title="..." subtitle="..." description="..." />`
3. Page content in `<div className="max-w-7xl mx-auto px-4 ...">` 
4. Simple footer

Individual lab pages are `'use client'` components. Research area sub-pages follow the same pattern.

### Adding a New Lab Page

1. Create `app/laboratories/[lastname]/page.js` as a `'use client'` component, following an existing lab page as a template (e.g., `app/laboratories/au/page.js`).
2. Add a corresponding entry to `facultyData` in `app/data/faculty.js`.
3. Place the faculty photo in `public/images/faculty/`.

### Styling Conventions

- Tailwind CSS utility classes throughout.
- Background: `bg-gray-50`; accent color: `blue-600` / `#0066cc`.
- Centered content with `max-w-7xl mx-auto`.
- Remote image optimization is configured only for `placehold.co` (see `next.config.js`). Use local images in `public/` for all real content.
