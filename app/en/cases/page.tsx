import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import VenturesOverview from '../../components/pages/projects/VenturesOverview';
import { breadcrumbListJsonLd, OG_CASES, pageMeta } from '../../lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Projects & Ventures',
  description:
    'The venture portfolio of Quantiva GmbH: SolutionGate, ShiftGate AI, LUMENA AI, Procuvera, LIMEN, Veya, Nuvora and WEFTLINE. Proof statt Promise.',
  path: '/cases',
  lang: 'en',
  image: OG_CASES,
});

export default function CasesPage() {
  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('en', [{ name: 'Projects', path: '/cases' }])} />
      <VenturesOverview lang="en" />
    </>
  );
}
