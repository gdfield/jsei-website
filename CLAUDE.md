# CLAUDE.md

This file provides guidance to Claude (claude.ai/code and Cowork) when working with code in this repository. Keep it in sync with what the site actually does. A fuller snapshot of the site's content and known issues lives in `SITE_STATE.md`.

The canonical template for faculty lab pages is `app/laboratories/field/page.js`. Match its structure for bio, ORCID-driven publications, and layout when creating new lab pages.

## Working on this site (Claude)

Before changing code or design, load the relevant skills: `vercel-react-best-practices` for Next.js/React code; `frontend-design`, `make-interfaces-feel-better`, `emil-design-engineering`, and `web-design-guidelines` for visual and UI work; `design:accessibility-review` (WCAG 2.1 AA) for anything user-facing; `web-animation-design` for motion. Say which skills were used when reporting back.

## Deployment

- Hosted on Vercel, deployed from the `main` branch via GitHub integration.
- Production domain: julessteinlabs.org (DNS managed via Cloudflare).
- Pushing to `main` triggers an automatic production deployment. Work on a branch for anything you don't want live immediately.

## Commands

```bash
npm run dev            # Dev server at localhost:3000
npm run build          # Production build (fetches Google Fonts, ORCID, NIH RePORTER, CrossRef)
npm start              # Serve the production build
npm run test:contrast  # WCAG AA contrast check of design tokens (scripts/check-contrast.mjs)
npm run test:a11y      # pa11y-ci (axe + HTMLCS) against a running server; URLs in .pa11yci
npm run test:funding   # Offline checks of the Funding page's grant-matching logic
npm run test:trainees  # Offline checks of the trainee intake pipeline
npm run sync:trainees  # Sync approved trainee profiles from Google (needs credentials; normally run by CI)
npm run trainees:lab-choices  # Print the Lab dropdown choices for the Google Form
npm run lint           # Not yet configured: next lint prompts to set up ESLint
```

There is no general unit test suite; `test:funding` (`scripts/test-funding-logic.mjs`) covers only the Funding page helpers and should be run after editing `app/funding/page.js`. The accessibility checks run in CI (`.github/workflows/accessibility.yml`) on every push and PR to `main` and weekly on Mondays. See `ACCESSIBILITY.md`. PRs use the checklist in `.github/PULL_REQUEST_TEMPLATE.md`.

The build needs network access to fonts.googleapis.com (`next/font/google`); without it the build fails. Without access to ORCID, NIH RePORTER, or CrossRef the build still succeeds, but those sections render empty (fetch errors are caught).

## Architecture

**Next.js 14 App Router** site (React 18, Tailwind CSS 3) for the Jules Stein Eye Institute (JSEI), an Organized Research Unit of the University of California at UCLA.

There is no CMS and no database. Content is a mix of:

1. **Hardcoded content** in page components and in `app/data/faculty.js`.
2. **Live data fetched at build/render time** from public APIs, cached with `next: { revalidate: 86400 }` (ISR, refreshed daily):
   - **ORCID** (`pub.orcid.org/v3.0/<id>/works` and `/fundings`) for the Publications page, ORCID-based lab-page publication lists, and non-NIH grants/awards on the Funding page.
   - **CrossRef** (`api.crossref.org/works/<doi>`) to fill in missing journal names or authors on lab-page publications.
   - **NIH RePORTER** (`api.reporter.nih.gov/v2/projects/search`) for NIH grants on the Funding page.

### Data: `app/data/faculty.js`

Exports `facultyData`, the single source of truth for which faculty appear on the Scientists page, Research Area pages, home-page lab count, sitemap, Publications page, and Funding page.

Fields:

- `name`, `title`, `research`, `description`, `profileImage`, `pageUrl`
- `researchAreas`: array of area tags. Must exactly match one of: `Therapeutics and Regeneration`, `Retinal Biology`, `Visual Neuroscience`, `Ocular Imaging`, `Eye Surface and Lens`, `AI and Robotics`, `Bioinformatics and Population Health`, `Eye Mobility and Rehabilitation`. A typo silently drops the person from that area page.
- `projectScientist` (boolean, optional): a scientist who does not run a lab (most project scientists instead join through the trainee intake form; see below). Listed in a Project Scientists group on `/scientists` (shown only when someone has the flag), and left out of the Basic/Clinical groups, the home-page lab count, and the trainee form's Lab list. A `pageUrl` is still needed for their card to link somewhere.
- `basicScience`, `clinicalScience`, `emeritus` (booleans): drive grouping on `/scientists`. Basic = `basicScience && !emeritus`; Clinical = `(clinicalScience || !basicScience) && !emeritus`; Emeritus = `emeritus`. Emeritus faculty are excluded from Research Area pages, the home-page count, Publications, and Funding.
- `orcid` (optional): ORCID iD. Required for the person's work to appear on `/publications` and for ORCID-sourced funding.
- `nihName` (optional): `{ lastName, firstName, altFirstNames?, altLastNames? }` used to search NIH RePORTER. Hyphenated names are automatically also searched with a space, joined, and (last names) by the first segment. Use `altFirstNames`/`altLastNames` for other spellings (e.g. Glasgow has `altFirstNames: ["Ben"]`).

Not every lab page has a `faculty.js` entry: `brecha`, `gorin`, `huk`, and `piri` are intentionally standalone pages, reachable by URL only (no card, not in the sitemap).

### Pages

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.js` | Hero, stats (lab count computed from `facultyData`), five section cards |
| `/researchAreas` | `app/researchAreas/page.js` | Index of 8 areas (titles, blurbs, images, links in a local array) |
| `/researchAreas/<area>` | `app/researchAreas/*/page.js` | Each filters `facultyData` on one `researchAreas` tag. `bioinfo/` is a legacy duplicate of the AI page and is not linked |
| `/scientists` | `app/scientists/page.js` | FacultyCards grouped Basic / Clinical / Project Scientists / Emeritus. Was `/laboratories`; `next.config.js` redirects the old address (individual lab pages stay at `/laboratories/<slug>`) |
| `/laboratories/<slug>` | `app/laboratories/<slug>/page.js` | Self-contained lab pages (see below) |
| `/core` | `app/core/page.js` | Four P30 cores (directors and staff in a local array) |
| `/publications` | `app/publications/page.js` | ORCID works for all non-emeritus faculty with `orcid`, last 5 years, grouped by year |
| `/funding` | `app/funding/page.js` | NIH RePORTER + ORCID fundings, last 5 fiscal years (see below) |
| `/trainees` | `app/trainees/page.js` | Active trainee directory, filterable by role and lab (see below) |
| `/trainees/<slug>` | `app/trainees/[slug]/page.js` | One profile per trainee; 404 outside their start/end dates |
| `/scientists/<slug>` | `app/scientists/[slug]/page.js` | Profiles of project scientists from the intake form (same layout as trainee profiles) |
| `/history` | `app/history/page.js` | Institute History: discoveries (`DiscoveryCarousel`, scrolls three at a time), milestones timeline, founder and director bios. Content and sources in `app/data/history.js`. **Unlisted while under review:** no menu or footer link, not in the sitemap, `noindex` |
| `/sitemap.xml` | `app/sitemap.js` | Static pages, the eight research-area pages, every `facultyData` entry with a `pageUrl`, and active trainees |
| `/robots.txt` | `app/robots.js` | Allows all crawlers on production and lists the sitemap; Vercel previews get `Disallow: /` |

Every page exports metadata through `pageMeta({ path, title, description, image?, imageAlt?, noindex? })` from `app/lib/seo.js`, which sets the canonical URL, Open Graph, and Twitter card tags. Titles render as "<title> | Jules Stein Eye Institute, UCLA" (template in the root layout). Keep descriptions complete sentences under about 160 characters; they are the snippet shown in search results. Lab pages use the faculty photo as the share image.

Root layout (`app/layout.tsx`): fonts (Spectral display, Inter body, IBM Plex Mono labels via `next/font/google`), site metadata and Open Graph, `ResearchOrganization` JSON-LD, skip link.

### Unpublished pages

`app/_unpublished/` holds `education/`, `outreach/`, and `people/`. Next.js does not route folders whose names start with `_`, so these are kept for future work but are not built or reachable. To publish one, move it back under `app/`, add it to the `links` arrays in `Navbar.js` and `Footer.js`, `app/sitemap.js`, and `.pa11yci`. See `app/_unpublished/README.md`.

### Lab pages

Each `app/laboratories/<slug>/page.js` is self-contained: bio, links, research text, and publications live in the file and do not import from `faculty.js`. Lab pages are server components (not `'use client'`) and export `metadata` plus a Person JSON-LD block.

The top section of every lab page is `<LabProfile photo alt name titles links>` (`app/components/LabProfile.js`) wrapping the research description. Desktop: photo, name, titles, and email on the left; research text on the right with the other links (lab site, publications, profiles) in a row beneath it. Phone: photo, name, titles, email, the other links in a two-column grid, then the research text. `links` items are `{ kind, href, label }`, where `kind` (email, lab, pubs, profile, orcid, web) picks the icon. Use sentence-case labels ("Laboratory website", "Faculty profile", "ORCID").

- **ORCID-driven (21 pages):** define `FACULTY_ORCID`, include a local `fetchRecentPublications(orcid, limit)` (ORCID works, preprints filtered out, CrossRef fallback for missing journal/authors), render "Recent Publications", and link to the ORCID profile. Au's page falls back to a hardcoded list if ORCID returns nothing.
- **Hardcoded publications:** barzalay, bhat, bok, brecha, farber, glasgow, gorin, hubbell, huk, nusinowitz, piri, tseng.
- Slugs do not always match surnames: Jie J. Zheng is `/laboratories/zhang`, Aya Barzelay-Wollman is `/laboratories/barzalay`.

### Funding page logic (`app/funding/page.js`)

The page lists **new and competitively renewed** grants only, not every active grant.

- Window: the current year and the four before it (`FISCAL_YEARS`, `MIN_YEAR`).
- NIH: query RePORTER per faculty member with all name variants, paging 500 records at a time (capped at 2000). Only NIH application types 1 (new), 2 (competing renewal), and 7 (change of grantee institution, counted only when the receiving organization is UCLA, e.g. a recruit's transferred grant) are kept (`NEW_AWARD_TYPES`). Type 5 (non-competing continuation, the routine yearly funding of an existing grant) is excluded so an older grant does not appear as new; supplements (3), extensions (4), and other administrative changes (6, 9) are excluded too. Results are re-validated by name (normalized; NIH first name must start with ours), then each matched PI profile is confirmed to have at least one UCLA-administered project. Grants are deduplicated by core project number and listed under the fiscal year of their most recent qualifying (type 1, 2, or 7) award.
- ORCID: non-NIH entries whose grant number does not contain an NIH core project number already shown, listed under their start year if it falls in the window. ORCID cannot distinguish renewals, so start year is the only signal. Non-grant entries (awards, fellowships) are listed separately on the same rule.
- Run `npm run test:funding` after changing this logic.

### Trainee profiles (postdocs, graduate students, SRAs, undergraduates)

The Trainees page lists four roles (`ROLES` in `app/data/trainees.js`). The form also offers Medical Student, which `ROLE_CHOICES` in `scripts/trainees/fields.mjs` lists as grad (their own Title field shows the exact position), and Project Scientist (`projsci`, `PROJECT_SCIENTIST`). Project scientists are not trainees: they appear in the Project Scientists group on `/scientists` and in their lab's Lab Members (`LAB_ROLES`), with profiles at `/scientists/<slug>`, and never on `/trainees`; they are also left out of `trainees-meta.json` `count`. Use `profilePath()` (or the `path` field from `activeProfiles()`) for profile links. Both profile routes render `app/components/PersonProfile.js`. Undergraduates (`ugrad`) must give an "Expected graduation date" (a required form section reached only by that Role choice); `transform.mjs` uses it as their end date and skips any undergraduate without one.

Full guide: `docs/TRAINEES.md`. Trainees submit a Google Form; Greg approves rows in the linked Sheet (approved rows are copied to its "Published" tab by Apps Script triggers in `scripts/google/create-trainee-form.gs`); the nightly GitHub Action `.github/workflows/sync-trainees.yml` runs `scripts/sync-trainees.mjs`, which writes `app/data/trainees.json`, `app/data/trainees-meta.json`, `scripts/trainees/slug-registry.json`, and 600x600 headshots in `public/images/trainees/`, then commits to `main`.

- **Never hand-edit** `trainees.json`, `trainees-meta.json`, or `slug-registry.json`; the next sync overwrites them. Never commit fixture data (`--fixture ... --write` is for local previews only).
- `app/data/labs.js` is the single lab list (non-emeritus `facultyData` plus the standalone brecha, gorin, huk, piri pages) shared by the form's Lab dropdown, the sync, and the pages. Question titles live in `scripts/trainees/fields.mjs` and must match the form.
- `app/data/trainees.js`: `activeTrainees()` (between start and end date, adds `labName`), `traineesForLab()`, `traineeBySlug()`, `ROLES`.
- Every lab page renders `<LabTrainees lab="<slug>" />` inside the page container, just above the publications section, and exports `revalidate = 86400`, so the Lab Members section follows start/end dates without a deploy. Include both when creating a new lab page.
- The Trainees nav/footer link appears only when `trainees-meta.json` has `count > 0`.
- Privacy: the respondent's Google account email and Drive file IDs must never reach the public data or client bundles; `transform.mjs` builds records from an explicit field list. Keep `app/data/*` imports out of client components (`TraineeDirectory` gets plain props).

### Shared components (`app/components/`)

- `Navbar.js` (client): sticky header, hardcoded `links` (Research Areas, Scientists, Core Facilities, Publications, Funding), accessible mobile menu.
- `Footer.js`: shared footer with the same links, address, and copyright. Used on every page.
- `Hero.js` (client): auto-rotating banner carousel with pause/play. Props: `title`, `subtitle`, `description`, `eyebrow`, `compact`.
- `FacultyCard.js`: card linking to `faculty.pageUrl`.
- `SectionHeading.js`: eyebrow + title + intro heading block.
- `Reveal.js` (client): scroll-in animation wrapper (respects reduced motion).
- `CountUp.js` (client): animated number for the home-page stats.
- `TraineeCard.js`, `TraineeDirectory.js` (client), `LabTrainees.js`: trainee cards, filterable directory, and the lab-page Lab Members section.

### Page pattern

1. `<Navbar />`
2. `<main id="main-content">` (required on every page for the skip link and landmarks)
3. `<Hero ... />`, or on lab pages `<LabBanner image position title subtitle description />` (`app/components/LabBanner.js`): a compact research image under a navy scrim. Labs without their own banner use one of the four high-resolution images in `public/images/laboratory-banners/` (field, radu, williams, yang); to give a lab its own, add an image there and point `image` at it.
4. Content in `mx-auto max-w-content px-4 sm:px-6 lg:px-8` (some older pages use `max-w-7xl`)
5. `<Footer />`

### Adding a new lab page

1. Create `app/laboratories/<slug>/page.js` from `app/laboratories/field/page.js` (set `FACULTY_ORCID`, metadata, Person JSON-LD, and the `LabProfile` photo, name, titles, links, and research text).
2. Add an entry to `facultyData` in `app/data/faculty.js` with `pageUrl`, `researchAreas` (exact tags above), group flags, `orcid`, and `nihName`. Add `<LabTrainees lab="<slug>" />` and `export const revalidate = 86400` to the page, then update the form's Lab choices (`npm run trainees:lab-choices`, see `docs/TRAINEES.md`).
3. Put the photo in `public/images/faculty/` (filenames are case-sensitive on Vercel) and give it descriptive `alt` text.

### Styling conventions

- Tailwind with design tokens defined as CSS variables in `app/globals.css` and mapped in `tailwind.config.js`: colors `ink` (`ink-700`, `ink-soft`), `sea` (`sea-600`), `sky`, `gold` (`gold-deep`), `paper`, `surface`, `mist`, `muted`; fonts `font-display`, `font-sans`, `font-mono`; shadows `shadow-card`, `shadow-lift`; `max-w-content` (80rem).
- Page background `bg-paper`; cards `bg-surface border-mist shadow-card`; links `text-sea hover:text-gold-deep`.
- Use the tokens rather than raw Tailwind colors so `npm run test:contrast` covers them.
- Each token also has an R G B channel variable (`--sea-rgb` etc.) in `globals.css`, and `tailwind.config.js` maps colors as `rgb(var(--x-rgb) / <alpha-value>)`, so opacity modifiers such as `bg-sea/10` and `bg-paper/85` work. If you change a color, update both its hex and its `-rgb` value.
- Remote image optimization is configured only for `placehold.co` (`next.config.js`). Use local images in `public/` for real content.
- Accessibility target is WCAG 2.1 AA (see `ACCESSIBILITY.md`): keep heading order, label images, and keep text over banner imagery on a strong navy scrim.
