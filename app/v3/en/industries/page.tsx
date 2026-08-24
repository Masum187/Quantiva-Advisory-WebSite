import V3IndustriesPage from '../../../components/v3/V3IndustriesPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'en',
  '/industries',
  'Industries | Quantiva Advisory',
  'Industry-specific transformation control for financial services, automotive, health, and retail.',
);

export default function Page() {
  return <V3IndustriesPage locale="en" />;
}
