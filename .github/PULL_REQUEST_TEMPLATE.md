<!-- Describe your change above this line. -->

## Accessibility checklist

The site targets **WCAG 2.1 AA** (see `ACCESSIBILITY.md`). CI runs `test:contrast`
and `pa11y-ci`, but they can't judge everything — please confirm:

- [ ] **Images**: every meaningful image has descriptive `alt`; decorative images use `alt=""`.
- [ ] **Headings**: one `<h1>` per page; heading levels don't skip.
- [ ] **Color**: text/background use the design tokens (no raw `gray-*` / `blue-*`); nothing relies on color alone.
- [ ] **Links & buttons**: text says where it goes / what it does (no bare "click here"); external links open sensibly.
- [ ] **Keyboard**: new interactive elements are reachable and operable by keyboard, with a visible focus state.
- [ ] **Text over images** (hero/banner): the scrim keeps white/gold text readable — checked visually.
- [ ] **Local checks pass**: `npm run test:contrast`, and (with the site running) `npm run test:a11y`.

_Delete items that don't apply to this change._
