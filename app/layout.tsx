import type { Metadata } from "next";
import { Spectral, Inter, IBM_Plex_Mono } from 'next/font/google';
import "./globals.css";

// Display: Spectral — a modern, screen-optimized editorial serif with
// scientific gravitas and a clean baseline capital J (fitting for a vision
// institute, it's named for the light spectrum). Body: Inter. Data/mono:
// IBM Plex Mono for grant numbers, DOIs, and stats across the science pages.
const display = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://julessteinlabs.org'),
  title: {
    template: '%s | Jules Stein Eye Institute',
    default: 'Jules Stein Eye Institute | UCLA Vision Research',
  },
  description:
    'The Jules Stein Eye Institute (JSEI) at UCLA is a leading center for vision science, combining basic and clinical research to understand and treat diseases of the eye.',
  keywords: [
    'Jules Stein Eye Institute',
    'JSEI',
    'UCLA ophthalmology',
    'vision research',
    'retina research',
    'eye disease',
    'UCLA eye institute',
  ],
  openGraph: {
    siteName: 'Jules Stein Eye Institute',
    locale: 'en_US',
    type: 'website',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ResearchOrganization',
  name: 'Jules Stein Eye Institute',
  alternateName: ['JSEI', 'Jules Stein Eye Institute at UCLA'],
  url: 'https://julessteinlabs.org',
  description:
    'The Jules Stein Eye Institute (JSEI) at UCLA is a leading center for vision science, combining basic and clinical research to understand and treat diseases of the eye.',
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'University of California, Los Angeles',
    alternateName: 'UCLA',
    url: 'https://www.ucla.edu',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '100 Stein Plaza',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90095',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.uclahealth.org/eye',
    'https://ophthalmology.ucla.edu',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {/* Without JS, scroll-reveal elements can't be un-hidden by the
            observer — force them visible so content is never lost. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-gold focus:text-ink focus:font-semibold focus:rounded-full focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
