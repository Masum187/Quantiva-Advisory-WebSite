import V3Home from '../../components/v3/V3Home';
import { v3Metadata } from '../../lib/data/v3-content';

export const metadata = v3Metadata(
  'de',
  '',
  'Transformation mit Kontrolle | Quantiva Advisory',
  'Quantiva verbindet SAP-Transformation, Testmanagement und Cutover-Steuerung zu einem belastbaren Delivery-Modell.',
);

export default function V3GermanHomePage() {
  return <V3Home locale="de" />;
}
