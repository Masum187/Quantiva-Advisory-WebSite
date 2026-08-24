import V3TeamPage from '../../../components/v3/V3TeamPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'en',
  '/team',
  'Team | Quantiva Advisory',
  'The Quantiva Advisory team for strategy, technology, and controlled transformation.',
);

export default function Page() {
  return <V3TeamPage locale="en" />;
}
