import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import VenturesOverview from '../../components/pages/projects/VenturesOverview';
import { breadcrumbListJsonLd, OG_CASES, pageMeta } from '../../lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Projekte & Ventures',
  description:
    'Das Venture-Portfolio der Quantiva GmbH: SolutionGate, ShiftGate AI, LUMENA AI, Procuvera, LIMEN, Veya, Nuvora und WEFTLINE. Proof statt Promise.',
  path: '/cases',
  lang: 'de',
  image: OG_CASES,
});

export default function CasesPage() {
  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('de', [{ name: 'Projekte', path: '/cases' }])} />
      <VenturesOverview />
    </>
  );
}
