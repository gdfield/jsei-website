import React from 'react';

/**
 * SectionHeading — the recurring section marker: an aperture ring +
 * mono eyebrow above an editorial serif title, with optional intro.
 */
const SectionHeading = ({ eyebrow, title, intro, align = 'left', id }) => {
  const centered = align === 'center';
  return (
    <div className={centered ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'}>
      <div className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
        <span className="aperture animate-aperture" aria-hidden="true" />
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      </div>
      <h2
        id={id}
        className="mt-5 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
