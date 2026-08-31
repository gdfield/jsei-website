'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Research Areas', href: '/researchAreas' },
  { label: 'Laboratories', href: '/laboratories' },
  { label: 'Core Facilities', href: '/core' },
  { label: 'Publications', href: '/publications' },
  { label: 'Funding', href: '/funding' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-mist shadow-[0_1px_0_rgba(6,38,63,0.04)]'
          : 'bg-paper/40 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Jules Stein Eye Institute home">
            <span
              className="relative grid h-8 w-8 place-items-center rounded-full border-2 border-sea transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_0_4px_rgba(30,111,168,0.16)]" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1.05rem] font-semibold text-ink">
                Jules Stein Eye Institute
              </span>
              <span className="block font-mono text-[0.62rem] uppercase tracking-[0.28em] text-sea">
                UCLA · Vision Research
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ transformOrigin: 'left' }}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t border-mist bg-paper/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 py-3">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                  active ? 'bg-sea/8 text-ink' : 'text-ink-soft hover:bg-ink/5'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-gold' : 'bg-mist'}`}
                  aria-hidden="true"
                />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
