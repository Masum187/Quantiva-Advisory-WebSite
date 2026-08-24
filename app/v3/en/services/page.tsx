import V3ServicesPage from '../../../components/v3/V3ServicesPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'en',
  '/services',
  'Services | Quantiva Advisory',
  'Advisory for SAP, cloud, AI, integration, security, test automation, and controlled transformation.',
);

export default function Page() {
  return <V3ServicesPage locale="en" />;
}
