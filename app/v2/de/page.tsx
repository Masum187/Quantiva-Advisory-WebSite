import type { Metadata } from 'next';
import ForgeHome from '../../components/forge/ForgeHome';

export const metadata: Metadata = {
  title: 'S/4HANA-Transformation & Testmanagement | Quantiva Advisory',
  description:
    'Beratung für S/4HANA-Migrationen, SIT- und UAT-Testmanagement sowie kontrollierte Cutover-Steuerung.',
  alternates: {
    canonical: 'https://quantiva-advisory.vercel.app/v2/de',
    languages: {
      'de-DE': 'https://quantiva-advisory.vercel.app/v2/de',
      'en-US': 'https://quantiva-advisory.vercel.app/v2/en',
    },
  },
};

export default function V2DeHomePage() {
  return <ForgeHome locale="de" />;
}
