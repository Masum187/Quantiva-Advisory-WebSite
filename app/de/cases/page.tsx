import type { Metadata } from 'next';
import VenturesOverview from '../../components/pages/projects/VenturesOverview';

export const metadata: Metadata = {
  title: 'Projekte & Ventures – Quantiva Advisory',
  description:
    'Das Venture-Portfolio der Quantiva GmbH: SolutionGate, ShiftGate AI, LUMENA AI, Procuvera, LIMEN, Veya, Nuvora und WEFTLINE. Proof statt Promise.',
  openGraph: {
    title: 'Projekte & Ventures – Quantiva Advisory',
    description:
      'Acht Produkte, ein Prinzip: Jede Aussage braucht einen Beleg. Das Venture-Portfolio der Quantiva GmbH.',
    type: 'website',
  },
};

export default function CasesPage() {
  return <VenturesOverview />;
}
