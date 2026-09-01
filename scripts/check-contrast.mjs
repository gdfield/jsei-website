#!/usr/bin/env node
/**
 * Design-token contrast check (WCAG 2.1 AA).
 *
 * Automated page scanners (axe/HTMLCS via pa11y) cannot measure contrast for
 * text placed over photographic or gradient backgrounds — they only return
 * "needs review". This script instead verifies the site's SOLID-background
 * color-token pairs against the WCAG AA thresholds (4.5:1 normal, 3:1 large),
 * so a real contrast regression on solid backgrounds fails CI reliably.
 *
 * Text over hero/banner imagery is verified manually (see ACCESSIBILITY.md).
 *
 * Keep the token values here in sync with app/globals.css.
 */

const TOKENS = {
  ink: '#06263f',
  ink700: '#0c3557',
  inkSoft: '#24425c',
  sea: '#1e6fa8',
  sea600: '#175d8f',
  sky: '#6fb2d8',
  gold: '#ffc72c',
  goldDeep: '#7a5a00',
  paper: '#f5f8fb',
  surface: '#ffffff',
  mist: '#e1e9f1',
  muted: '#5a7184',
};

function luminance(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

// composite a foreground at `alpha` over an opaque background -> solid hex
function over(fg, alpha, bg) {
  const f = fg.replace('#', '');
  const b = bg.replace('#', '');
  const out = [0, 2, 4].map((i) => {
    const fv = parseInt(f.slice(i, i + 2), 16);
    const bv = parseInt(b.slice(i, i + 2), 16);
    return Math.round(fv * alpha + bv * (1 - alpha));
  });
  return '#' + out.map((v) => v.toString(16).padStart(2, '0')).join('');
}

const T = TOKENS;

// [label, foreground, background, minRatio]
const PAIRS = [
  ['body text — inkSoft on paper', T.inkSoft, T.paper, 4.5],
  ['body text — inkSoft on surface', T.inkSoft, T.surface, 4.5],
  ['secondary — muted on paper', T.muted, T.paper, 4.5],
  ['secondary — muted on surface', T.muted, T.surface, 4.5],
  ['link/eyebrow — sea on paper', T.sea, T.paper, 4.5],
  ['link — sea600 on surface', T.sea600, T.surface, 4.5],
  ['pill — sea600 on sea@8% over surface', T.sea600, over(T.sea, 0.08, T.surface), 4.5],
  ['hover — goldDeep on surface', T.goldDeep, T.surface, 4.5],
  ['hover — goldDeep on paper', T.goldDeep, T.paper, 4.5],
  ['CTA — ink on gold button', T.ink, T.gold, 4.5],
  ['badge ✓ — white on sea600', T.surface, T.sea600, 4.5],
  ['dark eyebrow — gold on ink', T.gold, T.ink, 4.5],
  ['footer heading — white on ink', '#ffffff', T.ink, 4.5],
  ['footer body — white@60 on ink', over('#ffffff', 0.6, T.ink), T.ink, 4.5],
  ['footer sign-off — white@70 on ink', over('#ffffff', 0.7, T.ink), T.ink, 4.5],
  ['footer link — white@75 on ink', over('#ffffff', 0.75, T.ink), T.ink, 4.5],
  ['heading — ink on paper', T.ink, T.paper, 4.5],
];

let failed = 0;
console.log('WCAG 2.1 AA contrast — solid-background design tokens\n');
for (const [label, fg, bg, min] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? '  ok ' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${label}`
  );
}
console.log('');
if (failed) {
  console.error(`✗ ${failed} contrast pair(s) below WCAG AA.`);
  process.exit(1);
}
console.log('✓ All solid-background token pairs meet WCAG AA.');
