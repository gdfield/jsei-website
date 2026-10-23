'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, ChevronUp, Pause, Play } from 'lucide-react';

const VISIBLE = 3; // rows in view at once
const INTERVAL_MS = 6000;
const SLIDE_MS = 600;

// Vertical ticker: three discoveries in view, moving up one row at a time.
// Every discovery is also listed in the "See all" disclosure below, so nothing
// depends on the motion. Pauses while hovered or focused; never moves on its own
// under prefers-reduced-motion. Items are plain props: [{ year, who, text, paper }].
export default function DiscoveryCarousel({ items }) {
  const n = items.length;
  // The first rows are repeated at the end so the list can loop seamlessly.
  const rows = [...items, ...items.slice(0, VISIBLE)];
  const [index, setIndex] = useState(0); // first visible row, 0..n
  const [animate, setAnimate] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const regionRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // After sliding onto the repeated rows, jump back to the real start unseen.
  useEffect(() => {
    if (index !== n) return undefined;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, reduced ? 0 : SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, n, reduced]);

  useEffect(() => {
    if (animate) return undefined;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(r);
  }, [animate]);

  const next = useCallback(() => setIndex((i) => (i >= n ? 1 : i + 1)), [n]);
  const prev = useCallback(() => {
    setIndex((i) => {
      if (i > 0) return i - 1;
      // From the start, step back to the last row without a visible wrap.
      setAnimate(false);
      return n - 1;
    });
  }, [n]);

  const rotating = playing && !held && !reduced;
  useEffect(() => {
    if (!rotating) return undefined;
    const t = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(t);
  }, [rotating, index, next]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); next(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); prev(); }
  };

  const first = index % n;
  const shown = Array.from({ length: VISIBLE }, (_, k) => (first + k) % n);
  const btn =
    'grid h-10 w-10 place-items-center rounded-full border border-mist bg-surface text-sea-600 transition-colors duration-200 hover:border-sea/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea';

  return (
    <div>
      <div
        ref={regionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Discoveries"
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={(e) => { if (!regionRef.current?.contains(e.relatedTarget)) setHeld(false); }}
        className="rounded-2xl border border-mist bg-surface px-6 py-4 shadow-card [--row:11rem] sm:px-10 sm:[--row:7.5rem]"
      >
        {/* The window is exactly three rows tall; the list moves up inside it. */}
        <div className="relative overflow-hidden" style={{ height: `calc(var(--row) * ${VISIBLE})` }}>
          <ul
            className="m-0 list-none p-0"
            aria-live={rotating ? 'off' : 'polite'}
            style={{
              transform: `translateY(calc(var(--row) * -${index}))`,
              transition: animate && !reduced ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
            }}
          >
            {rows.map((a, i) => {
              const inView = i >= index && i < index + VISIBLE;
              return (
                <li
                  key={i}
                  aria-hidden={!inView}
                  inert={inView ? undefined : ''}
                  className={`flex items-center gap-5 sm:gap-10 ${i > 0 ? 'border-t border-mist' : ''}`}
                  style={{ height: 'var(--row)' }}
                >
                  <span className="w-16 flex-none font-display text-3xl font-semibold leading-none tabular-nums text-sea-600 sm:w-28 sm:text-5xl">
                    {a.year}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-base leading-snug text-ink [text-wrap:pretty] sm:text-xl">{a.text}</p>
                    <p className="mt-1.5 text-sm text-ink-soft">
                      {a.who}
                      {a.paper && (
                        <>
                          {' '}
                          <a
                            href={a.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded font-medium text-sea hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
                          >
                            Read the paper<span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-3 flex items-center gap-3 border-t border-mist pt-4">
          <button type="button" className={btn} onClick={prev} aria-label="Previous discovery">
            <ChevronUp size={18} aria-hidden="true" />
          </button>
          <button type="button" className={btn} onClick={next} aria-label="Next discovery">
            <ChevronDown size={18} aria-hidden="true" />
          </button>
          {!reduced && (
            <button
              type="button"
              className={btn}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause scrolling' : 'Resume scrolling'}
            >
              {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            </button>
          )}
          <p data-status className="ml-2 text-sm tabular-nums text-muted">
            {shown.map((s) => items[s].year).join(', ')}
            <span className="sr-only"> shown, of {n} discoveries</span>
          </p>
        </div>
      </div>

      <details className="group mt-6">
        <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded font-medium text-sea hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea [&::-webkit-details-marker]:hidden">
          <ChevronRight size={16} aria-hidden="true" className="transition-transform duration-200 group-open:rotate-90" />
          See all {n} discoveries
        </summary>
        <ul className="mt-6 grid list-none grid-cols-1 gap-x-12 gap-y-6 p-0 md:grid-cols-2">
          {items.map((a) => (
            <li key={a.year + a.who} className="flex gap-5 border-t border-mist pt-4">
              <span className="w-14 flex-none font-display text-xl font-semibold tabular-nums text-sea-600">{a.year}</span>
              <p className="leading-relaxed text-ink-soft [text-wrap:pretty]">
                <span className="font-medium text-ink">{a.who}.</span> {a.text}
              </p>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
