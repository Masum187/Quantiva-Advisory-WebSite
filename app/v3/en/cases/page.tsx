import V3CasesPage from '../../../components/v3/V3CasesPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'en',
  '/cases',
  'Anonymised Engagement Types | Quantiva Advisory',
  'Anonymised archetypes for SAP, test, cutover, hypercare, cloud, and AI transformation.',
);

export default function Page() {
  return <V3CasesPage locale="en" />;
}
