import React from 'react';
import { Mail, Globe, BookOpen, User, Fingerprint } from 'lucide-react';

// Top section of every lab page: photo, name, and titles on the left; the
// research description (children) on the right with the links beneath it.
// On phones the order is photo, name, titles, links (two-column grid), then
// the research description. The links are rendered once and placed with CSS
// grid areas, so screen readers hear them once and in a sensible order.
//
// links: [{ kind, href, label }] where kind is email | lab | pubs | profile | orcid | web
const ICONS = { email: Mail, lab: Globe, pubs: BookOpen, profile: User, orcid: Fingerprint, web: Globe };

export default function LabProfile({ photo, alt, name, titles = [], links = [], children }) {
  const [primary, ...more] = titles;
  return (
    <div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-6 [grid-template-areas:'side'_'links'_'text'] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:grid-rows-[auto_1fr] md:[grid-template-areas:'side_text'_'side_links']">
      <div className="[grid-area:side]">
        <img
          src={photo}
          alt={alt}
          className="w-full rounded-xl shadow-card outline outline-1 -outline-offset-1 outline-ink/10"
        />
        <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink [text-wrap:balance]">{name}</h2>
        {primary && <p className="mt-1 text-ink-soft">{primary}</p>}
        {more.length > 0 && (
          <ul className="mt-1 list-none space-y-0.5 p-0 text-sm leading-snug text-muted">
            {more.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-6 [grid-area:text]">{children}</div>

      {links.length > 0 && (
        <ul className="grid list-none grid-cols-2 content-start gap-x-4 border-t border-mist p-0 pt-2 [grid-area:links] md:flex md:flex-wrap md:items-start md:gap-x-6">
          {links.map((l) => {
            const Icon = ICONS[l.kind] || Globe;
            const external = !l.href.startsWith('mailto:');
            return (
              <li key={l.href} className="min-w-0">
                <a
                  href={l.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group inline-flex min-h-[40px] max-w-full items-center gap-2 rounded text-sm text-sea-600 transition-colors hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
                >
                  <Icon size={16} aria-hidden="true" className="flex-none text-sea/70 transition-colors group-hover:text-gold-deep" />
                  <span className="min-w-0 [overflow-wrap:anywhere]">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
