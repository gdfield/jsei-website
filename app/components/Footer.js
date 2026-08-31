import React from 'react';
import Link from 'next/link';

const footerLinks = [
  { label: 'Research Areas', href: '/researchAreas' },
  { label: 'Laboratories', href: '/laboratories' },
  { label: 'Core Facilities', href: '/core' },
  { label: 'Publications', href: '/publications' },
  { label: 'Funding', href: '/funding' },
];

const Footer = () => {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="aperture !w-9 !h-9 !border-white/40" aria-hidden="true" />
              <p className="font-display text-2xl font-semibold text-white leading-tight">
                Jules Stein Eye Institute
              </p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              An Organized Research Unit of the University of California, advancing
              vision science through basic and clinical research into the biology
              and diseases of the eye.
            </p>
            <p className="mt-4 text-sm text-white/50">
              100 Stein Plaza, Los Angeles, CA 90095
            </p>
          </div>

          <nav aria-label="Footer" className="md:justify-self-end">
            <p className="eyebrow !text-gold mb-4">Explore</p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-start sm:justify-between">
          <p>© {new Date().getFullYear()} Jules Stein Eye Institute — Research Division</p>
          <p className="sm:max-w-md sm:text-right">
            Presented by the Faculty of the Jules Stein Eye Institute at the
            University of California, Los Angeles.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
