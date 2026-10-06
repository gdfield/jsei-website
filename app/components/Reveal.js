'use client';
import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveal — fades and rises its children into view on scroll via
 * IntersectionObserver. Honors prefers-reduced-motion (the CSS in
 * globals.css disables the transform/opacity for those users, so the
 * content is always readable). `delay` staggers grids of cards.
 *
 * Usage: <Reveal as="div" delay={120} className="...">{children}</Reveal>
 */
const Reveal = ({ children, className = '', delay = 0, as = 'div', ...rest }) => {
  const Tag = as;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If already in view on mount (or observer unsupported), just show it.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // threshold 0: reveal as soon as any part enters the viewport. A ratio
      // threshold (e.g. 0.12) can never be met by a block taller than about
      // eight screens, which left long lists (like a year of publications)
      // permanently invisible.
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
