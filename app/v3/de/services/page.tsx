import V3ServicesPage from '../../../components/v3/V3ServicesPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'de',
  '/services',
  'Leistungen | Quantiva Advisory',
  'Beratung für SAP, Cloud, KI, Integration, Security, Testautomatisierung und kontrollierte Transformation.',
);

export default function Page() {
  return <V3ServicesPage locale="de" />;
}
