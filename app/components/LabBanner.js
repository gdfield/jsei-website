import React from 'react';

// Compact banner at the top of each lab page: a research image under a navy
// scrim with the lab name, research area, and an optional one-line tagline.
// The height grows with the text, so long names wrap instead of being cut off.
export default function LabBanner({ image, position = 'center 50%', title, subtitle, description }) {
  return (
    <div className="relative flex min-h-[16rem] w-full overflow-hidden md:min-h-[24rem]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div className="relative flex w-full flex-col items-center justify-center bg-ink/60 px-4 py-10 text-center text-white">
        <h1 className="mb-2 text-4xl font-bold text-white [text-wrap:balance] md:text-8xl">{title}</h1>
        {subtitle && (
          <p className="mb-2 text-xl font-semibold text-white [text-wrap:balance] md:text-5xl">{subtitle}</p>
        )}
        {description && <p className="text-lg [text-wrap:balance] md:text-4xl">{description}</p>}
      </div>
    </div>
  );
}
