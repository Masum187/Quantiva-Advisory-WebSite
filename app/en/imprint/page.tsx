import LegalPage from '../../components/pages/legal/LegalPage';
import { pageMeta } from '../../lib/seo';

export const metadata = {
  ...pageMeta({
    title: 'Imprint',
    description: 'Legal notice and provider information for Quantiva Advisory.',
    path: '/imprint',
    lang: 'en',
  }),
  alternates: {
    canonical: '/en/imprint',
    languages: { 'de-DE': '/de/impressum', en: '/en/imprint' },
  },
};

export default function ImprintPage() {
  return <LegalPage lang="en" kind="imprint" />;
}
