import JsonLd from '../../components/JsonLd';
import { breadcrumbListJsonLd, pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Strategy & Consulting',
  description:
    'Strategy and IT consulting at Quantiva Advisory: roadmaps, transformation programmes and delivery in Cloud, Data & AI and ERP.',
  path: '/strategy-consulting',
  lang: 'en',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('en', [{ name: 'Strategy & Consulting', path: '/strategy-consulting' }])} />
      {children}
    </>
  );
}
