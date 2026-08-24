import V3Home from '../../components/v3/V3Home';
import { v3Metadata } from '../../lib/data/v3-content';

export const metadata = v3Metadata(
  'en',
  '',
  'Transformation with control | Quantiva Advisory',
  'Quantiva connects SAP transformation, test management, and cutover control in one resilient delivery model.',
);

export default function V3EnglishHomePage() {
  return <V3Home locale="en" />;
}
