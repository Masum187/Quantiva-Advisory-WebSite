import V3TeamPage from '../../../components/v3/V3TeamPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'de',
  '/team',
  'Team | Quantiva Advisory',
  'Das Quantiva Advisory Team für Strategie, Technologie und kontrollierte Transformation.',
);

export default function Page() {
  return <V3TeamPage locale="de" />;
}
