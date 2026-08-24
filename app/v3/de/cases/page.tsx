import V3CasesPage from '../../../components/v3/V3CasesPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'de',
  '/cases',
  'Anonymisierte Mandatstypen | Quantiva Advisory',
  'Anonymisierte Archetypen für SAP, Test, Cutover, Hypercare, Cloud und AI Transformation.',
);

export default function Page() {
  return <V3CasesPage locale="de" />;
}
