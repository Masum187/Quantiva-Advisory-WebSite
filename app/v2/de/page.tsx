import type { Metadata } from 'next';
import ForgeHome from '../../components/forge/ForgeHome';

export const metadata: Metadata = {
  title: 'Quantiva Advisory — Forge',
  description:
    'SAP, Cloud und KI für den Mittelstand. Forge-Variante der Quantiva Advisory Website.',
  alternates: { canonical: '/v2/de' },
};

export default function V2DeHomePage() {
  return <ForgeHome locale="de" />;
}
