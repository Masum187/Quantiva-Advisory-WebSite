import V3CareerPage from '../../../components/v3/V3CareerPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'en',
  '/career',
  'Career | Quantiva Advisory',
  'Open roles for people who structure complex transformation and take ownership.',
);

export default function Page() {
  return <V3CareerPage locale="en" />;
}
