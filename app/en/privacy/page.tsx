import LegalPage from '../../components/pages/legal/LegalPage';
import { pageMeta } from '../../lib/seo';

export const metadata = {
  ...pageMeta({
    title: 'Privacy Policy',
    description: 'Privacy policy of Quantiva Advisory — contact forms, analytics and your rights.',
    path: '/privacy',
    lang: 'en',
  }),
  alternates: {
    canonical: '/en/privacy',
    languages: { 'de-DE': '/de/datenschutz', en: '/en/privacy' },
  },
};

export default function PrivacyPage() {
  return <LegalPage lang="en" kind="privacy" />;
}
