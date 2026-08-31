"use client"
import React, { useState, useEffect } from 'react';

/**
 * Hero — the signature "aperture" treatment. Rotating research imagery
 * sits behind a deep ocular-navy gradient and a radial vignette that
 * draws the eye to a focal center, framed by a thin gold focus-ring.
 * Fully accessible: pause/play, dot nav, live region, reduced motion.
 *
 * Props: title, subtitle, description, eyebrow, compact (shorter interior hero).
 */
const Hero = ({ title, subtitle, description, eyebrow, compact = false }) => {
  const backgroundImages = [
    '/images/hero-background-1.jpg',
    '/images/laboratory-banners/radu.jpg',
    '/images/laboratory-banners/sampath.jpg',
    '/images/laboratory-banners/yang.jpg',
    '/images/laboratory-banners/field.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [paused, setPaused] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (paused) return;
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === backgroundImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [paused]);

  return (
    <section
      className={`relative overflow-hidden bg-ink ${compact ? 'min-h-[380px]' : 'min-h-[560px] lg:min-h-[640px]'}`}
      role="region"
      aria-label="Featured research imagery"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Image {currentImageIndex + 1} of {backgroundImages.length}
      </div>

      {/* Crossfading imagery */}
      {backgroundImages.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}

      {/* Aperture vignette + navy gradient: focus the center, sink the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 38%, rgba(6,38,63,0.40) 0%, rgba(6,38,63,0.60) 55%, rgba(6,38,63,0.92) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,38,63,0.35) 0%, rgba(6,38,63,0) 30%, rgba(6,38,63,0) 62%, rgba(6,38,63,0.9) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Left scrim: guarantees contrast for the (left-aligned) headline and
          copy even when a bright image frame is showing (WCAG 1.4.3). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,38,63,0.86) 0%, rgba(6,38,63,0.66) 45%, rgba(6,38,63,0.25) 75%, rgba(6,38,63,0) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Thin gold focus-ring framing the aperture */}
      <div
        className="pointer-events-none absolute inset-4 rounded-[2rem] border border-gold/25 sm:inset-6"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex min-h-[inherit] items-center">
        <div className="mx-auto w-full max-w-content px-6 sm:px-8 lg:px-12 py-20">
          <div className="hero-rise hero-content max-w-4xl">
            {eyebrow && (
              <p className="eyebrow !text-gold">{eyebrow}</p>
            )}
            <h1
              className={`mt-5 font-display font-semibold leading-[1.02] tracking-tight text-white ${
                compact
                  ? 'text-4xl sm:text-5xl'
                  : 'text-5xl sm:text-6xl lg:text-7xl'
              }`}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-2xl text-lg sm:text-xl font-medium text-sky">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="mt-3 max-w-2xl font-display text-xl sm:text-2xl italic text-white/80">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-7 right-7 z-10">
        <div className="flex items-center gap-3 rounded-full bg-ink/40 px-3 py-2 backdrop-blur-md ring-1 ring-white/10">
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play image rotation' : 'Pause image rotation'}
            className="grid h-7 w-7 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {paused ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </button>
          <div className="flex items-center gap-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === currentImageIndex ? 'true' : undefined}
                className="group/dot grid h-6 w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'w-6 bg-gold' : 'w-2 bg-white/45 group-hover/dot:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
