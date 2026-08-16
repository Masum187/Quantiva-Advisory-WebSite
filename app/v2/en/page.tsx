import type { Metadata } from 'next';
import ForgeHome from '../../components/forge/ForgeHome';

export const metadata: Metadata = {
  title: 'Quantiva Advisory — Forge',
  description:
    'SAP, Cloud, and AI for mid-market leaders. Forge variant of the Quantiva Advisory site.',
  alternates: { canonical: '/v2/en' },
};

export default function V2EnHomePage() {
  return <ForgeHome locale="en" />;
}
