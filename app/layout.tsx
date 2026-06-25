import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import "./globals.css";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
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
    <html lang="en" className={openSans.className}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-700 focus:font-semibold focus:rounded focus:shadow"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
