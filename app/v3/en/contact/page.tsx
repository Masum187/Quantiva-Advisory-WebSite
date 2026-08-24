import V3ContactPage from '../../../components/v3/V3ContactPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'en',
  '/contact',
  'Contact | Quantiva Advisory',
  'Discuss your transformation, delivery constraint, or next critical decision.',
);

export default function Page() {
  return <V3ContactPage locale="en" />;
}
