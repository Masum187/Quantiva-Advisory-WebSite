import V3AboutPage from '../../../components/v3/V3AboutPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'de',
  '/about',
  'Über Quantiva Advisory | Klarheit in Transformation',
  'Quantiva verbindet strategische Perspektive mit operativer Verantwortung für kontrollierte Transformation.',
);

export default function Page() {
  return <V3AboutPage locale="de" />;
}
