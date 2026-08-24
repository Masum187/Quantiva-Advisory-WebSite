import type { Metadata } from 'next';
import ForgeHome from '../../components/forge/ForgeHome';

export const metadata: Metadata = {
  title: 'S/4HANA Transformation & Test Management | Quantiva Advisory',
  description:
    'Advisory for S/4HANA migrations, SIT and UAT test management, and controlled cutover delivery.',
  alternates: {
    canonical: 'https://quantiva-advisory.vercel.app/v2/en',
    languages: {
      'de-DE': 'https://quantiva-advisory.vercel.app/v2/de',
      'en-US': 'https://quantiva-advisory.vercel.app/v2/en',
    },
  },
};

export default function V2EnHomePage() {
  return <ForgeHome locale="en" />;
}
