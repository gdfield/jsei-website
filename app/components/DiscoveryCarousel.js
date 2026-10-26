'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Pause, Play } from 'lucide-react';

const VISIBLE = 3; // rows in view at once
const SPEED_PX_PER_S = 18; // slow, steady upward drift (one row about every 7 s)

// Discoveries drift slowly upward in a window three rows tall, looping
// seamlessly (the list is drawn twice). Constant linear motion, transform only,
// updated from requestAnimationFrame through a ref so React does not re-render
// every frame. It pauses while the pointer is over the moving list and with
// the pause button (WCAG 2.2.2), and it does not move at all under
// prefers-reduced-motion. The moving copy is hidden from screen readers; every
// discovery, with its paper link, is also in the "See all" list below.
// Items are plain props: [{ year, who, text, paper }].
export default function DiscoveryCarousel({ items }) {
  const n = items.length;
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const moving = playing && !held && !reduced;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    if (reduced) {
      offsetRef.current = 0;
      track.style.transform = 'translateY(0)';
      return undefined;
    }
    if (!moving) return undefined;
    let raf;
    let last = null;
    const step = (t) => {
      if (last !== null) {
        const loop = track.scrollHeight / 2; // height of one copy of the list
        offsetRef.current = (offsetRef.current + ((t - last) / 1000) * SPEED_PX_PER_S) % (loop || 1);
        track.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
      }
      last = t;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [moving, reduced]);

  const row = (a, key) => (
    <li key={key} className="flex items-center gap-5 border-b border-mist sm:gap-10" style={{ height: 'var(--row)' }}>
      <span className="w-16 flex-none font-display text-3xl font-semibold leading-none tabular-nums text-sea-600 sm:w-28 sm:text-5xl">
        {a.year}
      </span>
      <div className="min-w-0">
        <p className="font-display text-base leading-snug text-ink [text-wrap:pretty] sm:text-xl">{a.text}</p>
        <p className="mt-1.5 text-sm text-ink-soft">{a.who}</p>
      </div>
    </li>
  );

  const btn =
    'grid h-10 w-10 place-items-center rounded-full border border-mist bg-surface text-sea-600 transition-colors duration-200 hover:border-sea/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea';

  return (
    <div>
      <div
        className="rounded-2xl border border-mist bg-surface px-6 py-4 shadow-card [--row:11rem] sm:px-10 sm:[--row:7.5rem]"
      >
        <div
          aria-hidden="true"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]"
          style={{ height: `calc(var(--row) * ${VISIBLE})` }}
        >
          <ul ref={trackRef} className="m-0 list-none p-0 will-change-transform">
            {items.map((a, i) => row(a, `a${i}`))}
            {items.map((a, i) => row(a, `b${i}`))}
          </ul>
        </div>

        <div className="mt-3 flex items-center gap-3 pt-1">
          {!reduced && (
            <button
              type="button"
              className={btn}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause scrolling discoveries' : 'Resume scrolling discoveries'}
            >
              {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            </button>
          )}
          <p className="text-sm text-muted">
            {n} discoveries{reduced ? '' : playing ? ', scrolling' : ', paused'}
          </p>
        </div>
      </div>

      <details className="group mt-6">
        <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded font-medium text-sea hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea [&::-webkit-details-marker]:hidden">
          <ChevronRight size={16} aria-hidden="true" className="transition-transform duration-200 group-open:rotate-90" />
          See all {n} discoveries, with links to the papers
        </summary>
        <ul className="mt-6 grid list-none grid-cols-1 gap-x-12 gap-y-6 p-0 md:grid-cols-2">
          {items.map((a) => (
            <li key={a.year + a.who} className="flex gap-5 border-t border-mist pt-4">
              <span className="w-14 flex-none font-display text-xl font-semibold tabular-nums text-sea-600">{a.year}</span>
              <p className="leading-relaxed text-ink-soft [text-wrap:pretty]">
                <span className="font-medium text-ink">{a.who}.</span> {a.text}
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
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
