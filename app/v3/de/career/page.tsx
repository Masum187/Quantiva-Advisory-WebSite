import V3CareerPage from '../../../components/v3/V3CareerPage';
import { v3Metadata } from '../../../lib/data/v3-content';

export const metadata = v3Metadata(
  'de',
  '/career',
  'Karriere | Quantiva Advisory',
  'Offene Rollen für Menschen, die komplexe Transformation strukturieren und Verantwortung übernehmen.',
);

export default function Page() {
  return <V3CareerPage locale="de" />;
}
