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
    'Aktuelle IT-News zu KI, SAP und Cloud sowie die wichtigsten Events weltweit — mit Kennzeichnung, ob Quantiva Advisory teilnimmt.',
  path: '/news',
  lang: 'de',
});

export default async function NewsPage() {
  const [news, events] = await Promise.all([getItNews(), getItEvents()]);

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd('de', [{ name: 'News & Events', path: '/news' }])} />
      <NewsEventsPage lang="de" news={news} events={events} />
    </>
  );
}
