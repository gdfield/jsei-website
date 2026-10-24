# julessteinlabs.org: Current State of the Website

Snapshot date: 2026-10-04 (trainee section updated 2026-10-14; search/SEO changes live 2026-10-16, see 9b; publication-date and Publications speed fixes merged to `main` 2026-10-13). Based on the repository at commit `7bdeb27` on `main` (in sync with `origin/main`, last commit 2026-08-31) and a review of the live site at https://julessteinlabs.org on the same date.

**Update 2026-10-04 (uncommitted working-tree changes, not yet deployed):** Au research-area typo fixed and his ORCID added; "Eye Mobility and Rehabilitation" used everywhere; Education, Outreach, and People moved to `app/_unpublished/` (no longer routed); Funding page search fixed to stop missing new and competitively renewed grants (it intentionally excludes non-competing continuations); `CLAUDE.md` rewritten. Sections below are updated to reflect these changes; see section 12 for the issue status.

## 0. Working preferences (Greg, 2026-10-14)

For any work on this site, load and follow the relevant skills before making changes: `vercel-react-best-practices` for Next.js/React code; `frontend-design`, `make-interfaces-feel-better`, `emil-design-engineering`, and `web-design-guidelines` for visual and UI work; `design:accessibility-review` (WCAG 2.1 AA) for anything user-facing; `web-animation-design` for motion. Say which skills were used when reporting back. Add this rule to the repo's CLAUDE.md with the next code change.

## 1. What the site is

The research website for the Jules Stein Eye Institute (JSEI), an Organized Research Unit of the University of California at UCLA. It presents the institute's research areas, faculty laboratories, P30-supported core facilities, publications, and grant funding.

## 2. Technology and deployment

| Item | Detail |
|---|---|
| Framework | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS 3 with custom design tokens (`paper`, `ink`, `sea`, `gold`, `mist`, etc.); fonts Spectral (display), Inter (body), IBM Plex Mono (labels) via `next/font` |
| Icons / UI | `lucide-react`, `@headlessui/react` |
| Hosting | Vercel, auto-deploys from `main` via GitHub |
| Domain / DNS | julessteinlabs.org, DNS on Cloudflare |
| Content model | Hardcoded in page files plus `app/data/faculty.js`. No CMS. |
| Live data | Publications and Funding pages fetch from ORCID and NIH RePORTER at build/request time, cached with `revalidate: 86400` (refresh daily). Most lab pages also pull recent publications from ORCID. |
| SEO | `metadataBase`, title template "%s \| Jules Stein Eye Institute, UCLA", `ResearchOrganization` JSON-LD in `app/layout.tsx`, Person JSON-LD on lab pages, `app/sitemap.js` (`/sitemap.xml`), `app/robots.js` (`/robots.txt`), and `pageMeta()` in `app/lib/seo.js` on every page (canonical URL, Open Graph, Twitter card). See 9b. |
| Accessibility | Targets WCAG 2.1 AA. `npm run test:contrast` (design-token contrast) and `npm run test:a11y` (pa11y-ci, axe + HTMLCS). CI workflow `.github/workflows/accessibility.yml` runs on push/PR to `main` and weekly (Mondays 13:00 UTC). See `ACCESSIBILITY.md`. |
| Tests | Accessibility checks above, plus `npm run test:funding` (offline checks of the Funding page grant-matching logic, added 2026-10-04). |

Commands: `npm run dev`, `npm run build`, `npm start`, `npm run test:contrast`, `npm run test:a11y`, `npm run test:funding`, `npm run test:trainees`, `npm run sync:trainees`, `npm run trainees:lab-choices` (`npm run lint` is not configured).

## 3. Site map

### Primary navigation (header and footer)

Research Areas, Scientists, Core Facilities, Publications, Funding (plus Trainees once profiles exist). The wordmark links home ("Jules Stein Eye Institute / UCLA · Vision Research").

### Pages

| Route | Source | In nav? | Notes |
|---|---|---|---|
| `/` | `app/page.js` | Home | Hero carousel, thesis + stats band, five "ways into the institute" cards, "Join the work" closing band |
| `/researchAreas` | `app/researchAreas/page.js` | Yes | Index of 8 research areas |
| `/researchAreas/regeneration` | | via index | Therapeutics and Regeneration |
| `/researchAreas/retinalbio` | | via index | Retinal Cell and Molecular Biology |
| `/researchAreas/visualneuro` | | via index | Visual Neuroscience |
| `/researchAreas/ocular` | | via index | Ocular Imaging |
| `/researchAreas/surface` | | via index | Eye Surface and Lens |
| `/researchAreas/AI` | | via index | Artificial Intelligence and Robotics |
| `/researchAreas/health` | | via index | Bioinformatics and Population Health |
| `/researchAreas/rehab` | | via index | Eye Mobility and Rehabilitation |
| `/researchAreas/bioinfo` | | No | Legacy page; duplicates the AI page (see Issues) |
| `/scientists` | `app/scientists/page.js` | Yes | Renamed from Laboratories 2026-10-22 (old `/laboratories` address redirects). Faculty cards in Basic Science, Clinical Science, Project Scientists, and Emeritus groups. The Project Scientists group (shown once it has anyone) combines `projectScientist: true` entries in `faculty.js` and approved form responses with Role "Project Scientist" (profiles at `/scientists/<slug>`) |
| `/laboratories/<slug>` | 33 lab page folders | via cards | Self-contained server-component pages; template is `app/laboratories/field/page.js` |
| `/core` | `app/core/page.js` | Yes | Four P30 Vision Research Cores |
| `/publications` | `app/publications/page.js` | Yes | ORCID-driven, last 5 years |
| `/funding` | `app/funding/page.js` | Yes | NIH RePORTER + ORCID fundings, last 5 years |
| (unpublished) | `app/_unpublished/education/page.js` | No | Not routed (EyeSTAR, NIH T32, residency, fellowships) |
| (unpublished) | `app/_unpublished/outreach/page.js` | No | Not routed |
| (unpublished) | `app/_unpublished/people/page.js` | No | Not routed (leadership) |

Education, Outreach, and People were first removed from navigation on the `hide-education-outreach-leadership` branch but stayed reachable by URL. They now live in `app/_unpublished/`, which Next.js does not route, so they return 404 once deployed. The code is kept for future work; `app/_unpublished/README.md` explains how to restore a page.

## 4. Home page content

- Hero eyebrow: "Organized Research Unit · University of California". Title: "Jules Stein Eye Institute". Subtitle: "Advancing vision science through basic and clinical research". Auto-rotating banner carousel with pause/play and dot controls.
- "The Institute" section: "One question, studied from every angle: how do we see?" with a short paragraph on molecular biologists, physiologists, engineers, and clinician-scientists working from bench to clinic.
- Stats: 8 research areas; laboratories (computed from non-emeritus entries in `faculty.js`, currently 24); 4 core facilities; founded 1966.
- "Five ways into the institute": Research Areas and Laboratories as large feature cards; Core Facilities, Publications, Funding as resource cards.
- Closing band "Join the work" with a link to browse laboratories.
- Footer: 100 Stein Plaza, Los Angeles, CA 90095; "An Organized Research Unit of the University of California"; copyright 2026.

## 5. Faculty and laboratories

Source of truth for listings: `app/data/faculty.js` (29 entries). Fields: `name`, `title`, `research`, `description`, `profileImage`, `pageUrl`, `researchAreas`, plus optional `basicScience`, `clinicalScience`, `emeritus`, `orcid`, `nihName`. Grouping logic: Basic = `basicScience && !emeritus`; Clinical = `(clinicalScience || !basicScience) && !emeritus`; Emeritus = `emeritus`.

### Basic Science Laboratories (12)

| Faculty | Title | Research | Lab URL | ORCID |
|---|---|---|---|---|
| Gordon Fain | Professor | Photoreceptor Physiology | /laboratories/fain | yes |
| Greg D. Field | Associate Professor In-Residence | Retinal Circuits and Vision | /laboratories/field | yes |
| Michael J Gilhooley | Assistant Professor in Residence | Optic Neuropathies and Circadian Biology | /laboratories/gilhooley | yes (also in Clinical) |
| Yi-Rong Peng | Assistant Professor In-Residence | Visual System Development and Degeneration | /laboratories/peng | yes |
| Roxana A. Radu | Associate Professor In-Residence | Retina Biochemistry and Disease Modeling | /laboratories/radu | yes |
| Alapakkam Sampath | Professor | Phototransduction and Synaptic Transmission | /laboratories/sampath | yes |
| Hui Sun | Professor | Chemical Biology of Novel Membrane Receptors | /laboratories/sun | yes |
| Gabriel Travis | Professor | Photoreceptor Biochemistry | /laboratories/travis | yes |
| David Williams | Professor In-Residence | Retinal Cell Biology | /laboratories/williams | yes |
| Xian-Jie Yang | Professor In-Residence | Retinal Development and Gene Therapy | /laboratories/yang | yes |
| Jie J. Zheng | Professor In-Residence | Therapeutic Development and AI-Powered Analysis in Vision Research | /laboratories/zhang | yes |
| Joel Zylberberg | Associate Professor In-Residence | Computational Neuroscience and Vision | /laboratories/zylberberg | yes |

### Clinical Science Laboratories (13)

| Faculty | Title | Research | Lab URL | ORCID |
|---|---|---|---|---|
| Anthony Aldave | Professor | Corneal Dystrophies and Gene Therapy | /laboratories/aldave | yes |
| Adrian Au | Assistant Professor | Imaging, AI, and Retinal Genomics | /laboratories/au | yes (added 2026-10-04) |
| Aya Barzelay-Wollman | Assistant Professor | Robotic Microsurgery and Retinal Regeneration | /laboratories/barzalay | no |
| Ava Bittner | Professor | Low Vision Rehabilitation | /laboratories/bittner | yes |
| Anne Coleman | Professor and Director | Public Health and Clinical Research in Ophthalmology | /laboratories/coleman | yes |
| Joseph Demer | Professor | Ocular Motility | /laboratories/demer | yes |
| Sophie Deng | Professor | Cornea | /laboratories/deng | yes |
| Michael J Gilhooley | (see above) | | /laboratories/gilhooley | yes |
| Ben Glasgow | Professor | Ophthalmic Pathology | /laboratories/glasgow | no |
| Kouros Nouri-Mahdavi | Professor | Glaucoma diagnostics and AI | /laboratories/nouri-mahdavi | yes |
| Victoria Tseng | Assistant Professor | Epidemiology and Public Health | /laboratories/tseng | no |
| Edmund Tsui | Associate Professor | Uveitis and Ocular Inflammation | /laboratories/tsui-e | yes |
| Irena Tsui | Associate Professor | Clinical Research in Retinal Disease | /laboratories/tsui-i | yes |

### Emeritus Faculty (5)

Suraj Bhat, Dean Bok, Deborah Farber, Wayne L. Hubbell, Steven Nusinowitz. Emeritus faculty are excluded from the Research Area pages and from the home-page lab count.

### Lab pages not in `faculty.js`

Two lab pages exist in `app/laboratories/` and are live by direct URL, but by design have no card on `/scientists`, are not in the sitemap, and are not linked anywhere: `/laboratories/gorin` (Michael Gorin), `/laboratories/huk` (Alex Huk). The Brecha and Piri pages were removed on 2026-10-23 (Greg's decision); their addresses redirect to `/scientists`.

### Lab page structure (Field page as canonical example)

Compact `LabBanner` with lab name and subtitle; `LabProfile` block (photo, name, titles, and email; research text with lab website, PubMed, UCLA profile, and ORCID links beneath it); "Lab Members" (approved trainee profiles); "Recent Publications" (10 most recent, pulled from ORCID + CrossRef, with DOI links).

## 6. Research areas

| Area (index title) | Route | `faculty.js` tag filtered on |
|---|---|---|
| Therapeutics and Regeneration | /researchAreas/regeneration | `Therapeutics and Regeneration` |
| Retinal Cell and Molecular Biology | /researchAreas/retinalbio | `Retinal Biology` |
| Visual Neuroscience | /researchAreas/visualneuro | `Visual Neuroscience` |
| Ocular Imaging | /researchAreas/ocular | `Ocular Imaging` |
| Eye Surface and Lens | /researchAreas/surface | `Eye Surface and Lens` |
| Artificial Intelligence and Robotics | /researchAreas/AI | `AI and Robotics` |
| Bioinformatics and Population Health | /researchAreas/health | `Bioinformatics and Population Health` |
| Eye Mobility and Rehabilitation | /researchAreas/rehab | `Eye Mobility and Rehabilitation` |

Each area page has a hero, a "Research Focus" paragraph, "Key Research Areas" bullets, and a grid of FacultyCards for matching non-emeritus faculty.

## 7. Core facilities (`/core`)

Hero: "The instruments behind the discoveries" / "P30 Vision Research Core at UCLA". Section: "Four cores, open to every lab".

| Core | Director | Staff listed |
|---|---|---|
| Microscopy and Image Analysis | David Williams, Ph.D. | Yuekan Jiao, Ph.D. & Duc Hoang, Ph.D. |
| Molecular Biology and Gene Delivery | Xian-Jie Yang, Ph.D. | Duc Hoang, Ph.D. |
| Live Imaging and Functional Evaluation (LIFE) | Greg D. Field, Ph.D. | Eduardo Araujo |
| Prototype Construction | Joseph L. Demer, M.D., Ph.D. | Jose Gomez Godinez |

## 8. Publications (`/publications`)

Pulls works for every faculty member with an ORCID iD from `pub.orcid.org`, from (current year minus 5) to present, refreshed daily. Grouped by year, then attributed to lab(s), with title, authors, journal, and DOI link. On 2026-10-04 the live page reported 343 publications (2021 to 2026). Faculty without an ORCID iD in `faculty.js` (Barzelay-Wollman, Glasgow, Tseng, and all emeritus) contribute nothing to this page. Au was added on 2026-10-04.

## 9. Funding (`/funding`)

Lists **new and competitively renewed** awards only (Greg's decision, 2026-10-04), not every active grant. Combines NIH RePORTER (`api.reporter.nih.gov`, matched by `nihName` and filtered to UCLA-affiliated PIs, deduplicated by core project number) with ORCID funding records. Window is the last five fiscal years (2022 to 2026), grouped by year.

- NIH: application types 1 (new), 2 (competing renewal), and 7 (change of grantee institution, only when the grant moves to UCLA; Greg's decision, 2026-10-04). Type 5 non-competing continuations, supplements (3), extensions (4), and other administrative changes (6, 9) are excluded. A grant is listed under the fiscal year of its most recent qualifying award.
- ORCID (non-NIH): listed under its start year if that year is in the window; ORCID cannot mark renewals.

On 2026-10-04 (before the changes below) the live page listed roughly 33 grants (about 10 in 2026), from an automated page read.

Changes made 2026-10-04 (not yet deployed), which can only add grants that were wrongly missed, not continuation years: (1) RePORTER results were capped at 100 records per faculty member with no paging; now pages 500 at a time, so common names (Sun, Yang, Zheng, Williams) no longer risk truncation. (2) Name matching ignores hyphens, spaces, and case and searches hyphenated variants (Peng, Yang, Barzelay-Wollman, Nouri-Mahdavi), plus `altFirstNames` (Glasgow: "Ben"). (3) Au now has an ORCID iD, so his non-NIH grants can appear. (4) ORCID entries duplicating an NIH grant are matched on normalized grant numbers. (5) The hardcoded 2022 cutoff follows the rolling window. (6) Page and home-page copy now say "new and competitively renewed". The effect on counts could not be measured in this session because NIH RePORTER was not reachable; check the page after deployment.

## 9a. Trainee profiles (LIVE on `main` as of 2026-10-14; 13 profiles as of 2026-10-16)

Adds a `/trainees` directory, per-person profile pages, and a Lab Members section on every lab page for postdocs, graduate students, and staff research associates. Decisions (Greg, 2026-10-04): intake by Google Form with headshot upload (UCLA Google sign-in required), Greg approves every submission in the Sheet, nightly GitHub Action syncs approved profiles into the repo. Optional fields: start/expected end dates (profiles auto-hide after the end date), links (website, ORCID, Scholar, LinkedIn), pronouns, public email. The nav link appears only once a profile is published. Full guide: `docs/TRAINEES.md`.

Setup completed 2026-10-14 (all under gregfield@g.ucla.edu):
- Form (share link): https://docs.google.com/forms/d/e/1FAIpQLSdP63CmXt6qb7O5nghDO6lRyOmA3Ucl4PjqKRVJnvHeU4S3qA/viewform ; edit: https://docs.google.com/forms/d/129yAx-I8MbZuLC_1tWM2d3GUokM47BokmMUvdSkCH6g/edit . Responders limited to UCLA Google accounts; one response per person, editable (editing clears approval). Lab dropdown has all 28 labs (e.g. "Field Lab (Greg D. Field)", "Sampath Lab (Alapakkam Sampath)").
- Sheet `10aRR_KSeMPXlze9Sf5ZMGDUmYrJVKoJ72V6KXqNt3Sg`: tabs "Form Responses 1" (approve by ticking Approved) and "Published" (what the sync reads). Apps Script project "JSEI trainee form" handles approval.
- Google Cloud project `jsei-website-trainee-sync` (UCLA org) with Sheets and Drive APIs on; service account `jsei-trainee-sync@jsei-website-trainee-sync.iam.gserviceaccount.com`, no roles, Viewer on the Sheet and on the "Headshot (File responses)" Drive folder. Greg created the JSON key and added GitHub secrets `GOOGLE_SERVICE_ACCOUNT_JSON` and `TRAINEE_SHEET_ID`; the key never passed through Claude.
- Workflow `.github/workflows/sync-trainees.yml`: nightly ~3:23am Pacific plus manual Run workflow. Inputs: `allow_shrink` (needed to drop to under half, or to zero, profiles) and `preview_branch` (e.g. `trainee-preview`: pushes to that branch for a Vercel preview instead of `main`; leave blank to publish). The sync deletes headshots no longer used.
- End-to-end test 2026-10-14: test row "John Test Trainee" published to `main` (c19043d), then unapproved and removed with allow_shrink (76deaac). Pipeline verified. Test row remains unapproved in Form Responses; its slug stays reserved in `scripts/trainees/slug-registry.json`.
- First real profile (Maya Carleton, Field Lab) published 2026-10-14. Form sent to the Field and Sampath labs.
- 2026-10-14, commits dd9cc20 and f4005fb on `main`: Lab Members now sits inside the page container directly above the publications section on all 33 lab pages; design-token colors now support Tailwind opacity modifiers (R G B channel vars `--x-rgb` in `globals.css`, `rgb(var(--x-rgb) / <alpha-value>)` in `tailwind.config.js`, extra `opacity: { 8 }` step). This fixed the no-photo placeholder tint and about 25 previously dead classes site-wide (frosted header, navy scrim on lab banners, tag pills, hover borders).
- 2026-10-14, commit becccd9 on `main`: added roles Project Scientist (`projsci`) and Medical Student (`med`); Greg adds the matching choices to the form by hand. Headshot question made optional in the form (site already shows the initial when there is no photo).
- 2026-10-16 (Greg's decision), commit 41c52d3: the Project Scientist and Medical Student groups were removed from the site; the form still offers both, and they are listed under Postdoctoral Scholars and Graduate Students. Each person's Title field shows their exact position.
- 2026-10-22 (Greg's decision): added Undergraduate Students (`ugrad`). Choosing "Undergraduate Student" in the form leads to a section with a required "Expected graduation date", used as their end date so they drop off after graduating; the sync also refuses any undergraduate without a date. Greg runs `addUndergraduateSection` once in the form's Apps Script project to update the live form.
- 2026-10-22 (Greg's decision): form Role "Project Scientist" now has its own role (`projsci`). Those profiles appear on the Scientists page (Project Scientists group, after Clinical Science and before Emeritus) and in their lab's Lab Members, with profiles at `/scientists/<slug>`; they are not on the Trainees page. No form change needed (the choice already existed); nobody had chosen it yet.
- 2026-10-14: `design/lab-profile-layout` (merged to `main`; email later moved back under the name and titles) moved all 33 lab pages to a shared `LabProfile` component: desktop shows photo, name, and titles left with links in a row under the research text; phone shows a two-column link grid above the text. Lab banners were also unified to the compact `LabBanner` component (all labs like Greg's page). Pre-existing content issues noticed: Au's email link shows AAu@mednet.ucla.edu but points to adrianau@jsei.ucla.edu; Nouri-Mahdavi title typo "Advaced".
- Parked (Greg, 2026-10-14): a "Headshot override" Sheet column so Greg can add photos by hand that survive response edits. Code was written and tested (commit 32b3ae5 on a local branch, patch `headshot-override.patch`) but not applied; revisit only if many people cannot upload photos. Also not yet applied: `docs/TRAINEES.md` still says to mark Headshot Required.
- Known minor item: `actions/checkout@v4` and `setup-node@v4` trigger a Node 20 deprecation warning (bump versions).

## 9b. Search engine optimization (LIVE on `main` 2026-10-16)

Commits 4dbd730 (robots.txt) and ea1f82b (titles, descriptions, canonical URLs, share previews), applied by Greg from `seo.patch`.

- `app/robots.js`: production allows all crawlers and lists `https://julessteinlabs.org/sitemap.xml`; Vercel preview deployments (`VERCEL_ENV` not `production`) return `Disallow: /` so previews are not indexed.
- `app/lib/seo.js` `pageMeta({ path, title, description, image?, imageAlt?, absoluteTitle?, noindex? })` used by every page. Titles render as "<title> | Jules Stein Eye Institute, UCLA" (home uses an absolute title). `app/researchAreas/layout.js` no longer sets metadata, because its title string was resetting the template.
- New complete-sentence descriptions (160 characters or fewer) for all 33 lab pages, the 9 research-area pages, and the top-level pages. Lab pages use the faculty photo as the share image; trainee profiles use their headshot and a word-boundary snippet of their bio. Greg to review the lab descriptions for accuracy.
- Sitemap now includes the eight research-area pages. `/researchAreas/bioinfo` has canonical `/researchAreas/AI` and `noindex`.
- Pre-push audit of 58 built pages: every page has a title containing "UCLA", a canonical URL, an existing og:image, and a description of 160 characters or fewer.
- Still to do (Greg, manual): Google Search Console Domain property (TXT record in Cloudflare), submit the sitemap; optionally import into Bing Webmaster Tools.

## 9c. Institute History page (unlisted, 2026-10-23)

`/history` is live by direct link only for colleague review: no menu/footer link, not in the sitemap, `noindex`. Content in `app/data/history.js` (12 PubMed-verified discoveries, 9 milestones, bios of Jules Stein, Straatsma, Mondino, Coleman). Review copy: `JSEI-History-page-for-review.docx` (open questions listed there and in `claude/leadership-bios-draft.md`). Portraits: only Coleman's on hand. To launch: remove `noindex`, add History to `Navbar.js`, `Footer.js`, and `app/sitemap.js`.

## 9d. Publication accuracy audit (2026-10-23)

Prompted by a Wikipedia-feasibility review. Findings and fixes (branch fix/publication-accuracy, patch publication-accuracy.patch):
- Hui Sun's ORCID iD 0009-0006-9866-9846 belonged to a different Hui Sun (Xiamen / Chengdu); removed from his page and faculty.js (also stops wrong works on /publications and /funding). Page now lists 6 PubMed-verified papers by hand. His own iD is not yet known.
- All four citations on the Brecha, Glasgow and Gorin pages did not exist in PubMed (made up when the pages were written), with made-up citation counts; replaced with recent PubMed-verified first/last-author papers. Citation counts removed site-wide.
- Wrong PubMed links fixed: Hubbell (4), Huk (1), Piri (3, plus titles/authors on 3). Title fixes: Tseng (salt/glaucoma), Bhat (alphaB-crystallin), Barzelay-Wollman (hyphen). Tseng years match PubMed print years.
- ORCID-driven pages now use app/lib/orcidPublications.js: CrossRef author lists, and works without the investigator's surname are dropped (fixes Williams "et al.", Nouri-Mahdavi first authors, Travis's misattributed 2025 review).
- Zheng: page heading, name, and photo alt said "Zhang"; fixed (slug stays /laboratories/zhang).
- Williams: chair updated to Dolly Green Chair in Ophthalmology (UCLA Profiles: since 9/1/2025; Kirchgessner chair ended 8/31/2025).
- Chairs settled by Greg 2026-10-23: Field keeps Fran and Ray Stark Chair (UCLA Profiles is out of date); Yang added as Dolly Green Chair in Vision Science. Brecha and Piri pages removed.
- Open: named chairs for Nouri-Mahdavi and Aldave (not public); Hui Sun's ORCID; Travis should remove the misattributed review from his ORCID (it may still appear on /publications); Barzelay-Wollman's 2 conference items are not in PubMed (could not check); NIH grants on /funding could not be re-checked this session (no access to NIH RePORTER).

## 10. Repository documentation

- `CLAUDE.md`: architecture and conventions for AI-assisted editing. Rewritten 2026-10-04 to match current behavior (live ORCID/RePORTER/CrossRef data, data-model fields, funding logic, unpublished pages, design tokens).
- `ACCESSIBILITY.md`: WCAG 2.1 AA policy, checks, and known items.
- `README.md`: unmodified `create-next-app` boilerplate.
- `.github/PULL_REQUEST_TEMPLATE.md`: accessibility checklist for PRs.

## 11. Branches

`main` (production), plus local branches `a11y/phase-0`, `a11y/phase-1`, `a11y/phase-2`, `a11y/statement-page`, `accessibility`, `design/unify-consistency`, `hide-education-outreach-leadership`, `redesign/modern-interactive`. Only `accessibility` and `hide-education-outreach-leadership` are also on the remote. The `a11y/statement-page` work (an `/accessibility` statement page) is not on `main`; a stale build of it exists in the local `.next/` folder but there is no `app/accessibility/` source on `main`.

## 12. Issues and inconsistencies found

| # | Issue | Status (2026-10-04) |
|---|---|---|
| 1 | Adrian Au missing from AI and Robotics page (`"AI and Robostics"` typo) | Fixed |
| 2 | `/researchAreas/bioinfo` duplicates the AI page; unlinked but live | Mitigated 2026-10-16: `noindex`, canonical points to `/researchAreas/AI`; page still exists |
| 3 | Rehab area named inconsistently | Fixed: "Eye Mobility and Rehabilitation" everywhere |
| 4 | Brecha, Gorin, Huk, Piri pages have no card or sitemap entry | Intentional, no change |
| 5 | Slug mismatches (`/zhang` for Zheng, `/barzalay`), Hubbell `pageUrl` trailing slash | Open |
| 6 | Missing ORCID iDs | Au added (0000-0001-8110-9988, supplied by Greg; checksum valid). Barzelay-Wollman, Glasgow, Tseng still missing: could not be verified from accessible sources |
| 7 | Placeholder photo for Ben Glasgow | Open |
| 8 | Education, Outreach, People live by URL | Fixed: moved to `app/_unpublished/` |
| 9 | Research-area tags to review (e.g. Peng and Radu under Bioinformatics and Population Health) | Open |
| 10 | Stale `CLAUDE.md` and boilerplate `README.md` | `CLAUDE.md` fixed; `README.md` open |
| 11 | Unused assets: `Unknown.psd`, `areas/old/` referenced nowhere; `arnold.jpg`, `holland.jpg`, `lin.jpg`, `miller.jpg`, `pineles.jpg`, `rootman.jpg` used only by the unpublished People page | Open |
| 12 | Site copy uses em dashes in several places | Open |
| 13 | Funding page could miss new/renewed grants (100-record cap, hyphenated and nickname variants, missing Au ORCID) | Fixed in code; page intentionally shows only NIH types 1, 2, and 7 (to UCLA); verify after deploy |
| 14 | `npm run lint` is not configured (Next 14 prompts for ESLint setup) | Open |
| 16 | Content: Au email label AAu@mednet.ucla.edu vs href adrianau@jsei.ucla.edu; Nouri-Mahdavi "Advaced" typo; Duc Hoang vs Huang spelling to confirm | Open |
| 15 | Trainee profiles | Live on `main` 2026-10-14; Google setup done; 13 profiles published as of 2026-10-16 |
