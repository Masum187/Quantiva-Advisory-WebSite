import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import AboutRedesign from '../../components/pages/about/AboutRedesign';
import { breadcrumbListJsonLd, pageMeta } from '../../lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Über uns',
  description:
    'Proof statt Promise: Quantiva Advisory ist Beratung und Venture Studio in einem Haus. Wir begleiten Transformation und bauen Produkte, die Entscheidungen beweisbar machen.',
  path: '/about',
  lang: 'de',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('de', [{ name: 'Über uns', path: '/about' }])} />
      <AboutRedesign />
    </>
  );
}
