"use client"
import React, { useState, useEffect } from 'react';

const Hero = ({ title, subtitle, description }) => {
  const backgroundImages = [
    '/images/hero-background-1.jpg',
    '/images/laboratory-banners/radu.jpg',
    '/images/laboratory-banners/sampath.jpg',
    '/images/laboratory-banners/yang.jpg',
    '/images/laboratory-banners/field.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Start paused if the user prefers reduced motion
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
    }, 3000);
    return () => clearInterval(intervalId);
  }, [paused]);

  return (
    <div
      className="relative h-[500px] overflow-hidden"
      role="region"
      aria-label="Image carousel"
    >
      {/* Hidden live region announces slide changes to screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Image {currentImageIndex + 1} of {backgroundImages.length}
      </div>

      {backgroundImages.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Hero Background ${index + 1}`}
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: '50% 50%' }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-8xl font-bold text-center mb-4 text-white"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {title}
          </h1>
          <h2
            className="text-4xl text-center mb-2 text-white"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {subtitle}
          </h2>
          <p
            className="text-3xl text-center text-blue-200"
            style={{ fontFamily: 'Open Sans, sans-serif', fontStyle: 'italic' }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center items-center gap-3">
          {/* Pause / Play button */}
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play carousel' : 'Pause carousel'}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {paused ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </button>

          {/* Slide dot navigation */}
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentImageIndex ? 'true' : undefined}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                index === currentImageIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
