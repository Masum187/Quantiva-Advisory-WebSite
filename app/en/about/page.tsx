import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import AboutRedesign from '../../components/pages/about/AboutRedesign';
import { breadcrumbListJsonLd, pageMeta } from '../../lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'About us',
  description:
    'Proof statt Promise: Quantiva Advisory is a consultancy and venture studio under one roof. We guide transformation and build products that make decisions provable.',
  path: '/about',
  lang: 'en',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('en', [{ name: 'About us', path: '/about' }])} />
      <AboutRedesign lang="en" />
    </>
  );
}
