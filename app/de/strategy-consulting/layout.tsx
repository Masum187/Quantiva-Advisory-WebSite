import JsonLd from '../../components/JsonLd';
import { breadcrumbListJsonLd, pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Strategy & Consulting',
  description:
    'Strategie und IT-Beratung bei Quantiva Advisory: Roadmaps, Transformationsprogramme und Umsetzung in Cloud, Data & AI und ERP.',
  path: '/strategy-consulting',
  lang: 'de',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('de', [{ name: 'Strategy & Consulting', path: '/strategy-consulting' }])} />
      {children}
    </>
  );
}
