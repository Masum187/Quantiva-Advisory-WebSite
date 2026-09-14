import LegalPage from '../../components/pages/legal/LegalPage';
import { pageMeta } from '../../lib/seo';

export const metadata = {
  ...pageMeta({
    title: 'Datenschutz',
    description: 'Datenschutzerklärung von Quantiva Advisory — Kontaktformulare, Analytics und Ihre Rechte.',
    path: '/datenschutz',
    lang: 'de',
  }),
  alternates: {
    canonical: '/de/datenschutz',
    languages: { 'de-DE': '/de/datenschutz', en: '/en/privacy' },
  },
};

export default function DatenschutzPage() {
  return <LegalPage lang="de" kind="privacy" />;
}
