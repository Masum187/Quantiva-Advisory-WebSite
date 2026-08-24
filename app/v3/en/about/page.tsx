import V3AboutPage from '../../../components/v3/V3AboutPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'en',
  '/about',
  'About Quantiva Advisory | Clarity in Transformation',
  'Quantiva connects strategic perspective with operational ownership for controlled transformation.',
);

export default function Page() {
  return <V3AboutPage locale="en" />;
}
