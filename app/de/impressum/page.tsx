import LegalPage from '../../components/pages/legal/LegalPage';
import { pageMeta } from '../../lib/seo';

export const metadata = {
  ...pageMeta({
    title: 'Impressum',
    description: 'Impressum und Anbieterkennzeichnung von Quantiva Advisory.',
    path: '/impressum',
    lang: 'de',
  }),
  alternates: {
    canonical: '/de/impressum',
    languages: { 'de-DE': '/de/impressum', en: '/en/imprint' },
  },
};

export default function ImpressumPage() {
  return <LegalPage lang="de" kind="imprint" />;
}
