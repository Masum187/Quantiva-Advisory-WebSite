/**
 * Root Layout
 * This is the top-level layout for the entire application
 */

import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  localeFromHtmlLangHeader,
  OG_DEFAULT,
  SITE_NAME,
  SITE_URL,
} from './lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    'Professional Consulting for SAP, Cloud, AI, Integration, and Cyber Security',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_DEFAULT,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_DEFAULT],
  },
};

export const viewport: Viewport = {
  themeColor: '#04060b',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const locale = localeFromHtmlLangHeader(headerList.get('x-html-lang'));

  return (
    <html lang={locale}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
