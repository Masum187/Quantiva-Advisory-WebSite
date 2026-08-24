import V3IndustriesPage from '../../../components/v3/V3IndustriesPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'de',
  '/industries',
  'Branchen | Quantiva Advisory',
  'Branchenspezifische Transformationssteuerung für Finanzdienstleistungen, Automotive, Health und Retail.',
);

export default function Page() {
  return <V3IndustriesPage locale="de" />;
}
