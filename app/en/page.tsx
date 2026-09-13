import JsonLd from '../components/JsonLd';
import HomeRedesign from '../components/pages/home/HomeRedesign';
import { organizationJsonLd, pageMeta } from '../lib/seo';

export const metadata = pageMeta({
  title: 'Quantiva Advisory – SAP, Cloud & AI Consulting',
  description:
    'Professional consulting for SAP, Cloud, AI, Integration and Cyber Security. Strategic consulting, technical excellence and sustainable solutions for your digital success.',
  path: '/',
  lang: 'en',
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <HomeRedesign lang="en" />
    </>
  );
}
