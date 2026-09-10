import type { Metadata } from 'next';
import AboutRedesign from '../../components/pages/about/AboutRedesign';

export const metadata: Metadata = {
  title: 'Über uns – Quantiva Advisory',
  description:
    'Proof statt Promise: Quantiva Advisory ist Beratung und Venture Studio in einem Haus. Wir begleiten Transformation und bauen Produkte, die Entscheidungen beweisbar machen.',
};

export default function AboutPage() {
  return <AboutRedesign />;
}
