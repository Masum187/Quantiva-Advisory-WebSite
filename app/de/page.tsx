import JsonLd from '../components/JsonLd';
import HomeRedesign from '../components/pages/home/HomeRedesign';
import { organizationJsonLd, pageMeta, websiteJsonLd } from '../lib/seo';

export const metadata = pageMeta({
  title: 'Quantiva Advisory – SAP, Cloud & AI Consulting',
  description:
    'Professionelle Beratung für SAP, Cloud, AI, Integration und Cyber Security. Strategische Beratung, technische Exzellenz und nachhaltige Lösungen für Ihren digitalen Erfolg.',
  path: '/',
  lang: 'de',
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd('de')} />
      <HomeRedesign lang="de" />
    </>
  );
}
