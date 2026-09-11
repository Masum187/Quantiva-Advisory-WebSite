import type { Metadata } from 'next';
import VenturesOverview from '../../components/pages/projects/VenturesOverview';

export const metadata: Metadata = {
  title: 'Projects & Ventures – Quantiva Advisory',
  description:
    'The venture portfolio of Quantiva GmbH: SolutionGate, ShiftGate AI, LUMENA AI, Procuvera, LIMEN, Veya, Nuvora and WEFTLINE. Proof statt Promise.',
  openGraph: {
    title: 'Projects & Ventures – Quantiva Advisory',
    description:
      'Eight products, one principle: every claim needs evidence. The venture portfolio of Quantiva GmbH.',
    type: 'website',
  },
};

export default function CasesPage() {
  return <VenturesOverview lang="en" />;
}
