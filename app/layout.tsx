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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body>{children}</body>
    </html>
  );
}
