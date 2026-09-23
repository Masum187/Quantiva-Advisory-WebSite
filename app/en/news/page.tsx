import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import NewsEventsPage from '../../components/pages/news/NewsEventsPage';
import { getItEvents } from '../../lib/events/loadEvents';
import { getItNews } from '../../lib/news/itNews';
import { breadcrumbListJsonLd, pageMeta } from '../../lib/seo';

export const revalidate = 21600;

export const metadata: Metadata = pageMeta({
  title: 'News & Events',
  description:
    'Current IT news on AI, SAP and cloud, plus the major events worldwide — marked with whether Quantiva Advisory is attending.',
  path: '/news',
  lang: 'en',
});

export default async function NewsPage() {
  const [news, events] = await Promise.all([getItNews(), getItEvents()]);

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('en', [{ name: 'News & Events', path: '/news' }])} />
      <NewsEventsPage lang="en" news={news} events={events} />
    </>
  );
}
