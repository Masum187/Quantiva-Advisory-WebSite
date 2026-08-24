import V3ContactPage from '../../../components/v3/V3ContactPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'de',
  '/contact',
  'Kontakt | Quantiva Advisory',
  'Besprechen Sie Ihre Transformation, Ihren Delivery-Engpass oder die nächste kritische Entscheidung.',
);

export default function Page() {
  return <V3ContactPage locale="de" />;
}
