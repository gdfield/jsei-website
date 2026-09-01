# Accessibility

The Jules Stein Eye Institute research site targets **WCAG 2.1 Level AA**. That
single standard satisfies the obligations that apply to a UCLA unit: the U.S. DOJ
ADA Title II web rule (2024), UC policy **IMT-1300**, and California **AB 434**.
Because our visitors include the low-vision community, we treat AA as a floor and
adopt several WCAG 2.2 AA and AAA practices where they are cheap to reach.

## How conformance is verified

Two complementary checks run in CI on every push and pull request to `main`
(`.github/workflows/accessibility.yml`), and both can be run locally:

| Check | Command | Covers |
|-------|---------|--------|
| Design-token contrast | `npm run test:contrast` | WCAG 1.4.3 for every solid-background text/background token pair |
| Page audit (pa11y-ci) | `npm run test:a11y` | axe + HTMLCS, WCAG2AA — structure, ARIA, names, labels, landmarks, alt text, headings, etc. across a page of every template |

Run the page audit locally against a production build:

```bash
npm run test:contrast
npm run build
npm start &                 # serve on http://localhost:3000
npm run test:a11y
```

`pa11y-ci` uses whatever Chrome/Chromium Puppeteer resolves. On a machine with
Google Chrome already installed you can point at it and skip a download:

```bash
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run test:a11y
```

## What's automated vs. manually verified

**Color contrast is split deliberately.** Automated page scanners cannot measure
contrast for text placed over photographs or gradients — they only return
"needs review". Our hero and lab-banner headings sit over imagery behind a
navy scrim, so those are **verified manually** (visual review at multiple
breakpoints) and the contrast rule is excluded from `test:a11y` (see the
`ignore` list and comment in `.pa11yci`). All **solid-background** contrast is
verified deterministically by `test:contrast`, which fails CI on any regression.

Also verified manually (not fully automatable):

- Keyboard-only walkthrough — visible focus, logical order, no traps.
- Screen-reader spot checks — VoiceOver + Safari, NVDA + Firefox.
- Screen magnification / browser zoom to 200–400% and reflow at 320px width.
- Windows High Contrast / `forced-colors` mode.

## What has been done

- **Foundations** — `lang`, skip link, landmarks (`<main id="main-content">` on
  every page), logical heading order, semantic links, `prefers-reduced-motion`,
  visible focus, decorative images with empty `alt`, meaningful images labelled.
- **Navigation** — sticky nav with an accessible mobile menu: `aria-current` on
  the active link, `inert` when collapsed (kept out of the tab order and
  accessibility tree), Escape to close with focus returned to the toggle.
- **Media** — hero carousel with pause/play, dot controls with a ≥24px target
  size, live-region slide announcements, and starts paused under reduced motion.
- **Contrast** — UCLA-derived palette validated against AA; hover/badge/footer
  colors corrected; banner headings set explicitly to white over dark scrims.
- **Automation** — the two CI checks above.

## Known items / manual review

- Text over hero and lab-banner imagery: keep the navy scrim strong enough for
  legible white/gold type; re-check when banner images change.
- New faculty/lab content: add descriptive `alt` text, keep the heading order,
  and use the design tokens (the checks above will catch contrast regressions).
- PDFs linked or hosted by the site must themselves be tagged and accessible.

## Reporting a barrier

An **Accessibility Statement** page (conformance target, known issues, and a
contact for reporting barriers) and the biennial **AB 434** certification should
be published with, and coordinated through, UCLA's Digital Accessibility office:
<https://dts.ucla.edu/digital-accessibility>.

_This document is engineering guidance, not legal advice; confirm controlling
deadlines and the certification process with UCLA's Digital Accessibility office
and the Office of General Counsel._
