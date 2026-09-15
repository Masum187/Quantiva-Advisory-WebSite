import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPageClient from '../../components/pages/search/SearchPageClient';
import { getSearchItems } from '../../lib/utils/searchIndex';

export const metadata: Metadata = {
  title: 'Search | Quantiva Advisory',
  description: 'Discover content, services and industry solutions from Quantiva Advisory.',
  alternates: {
    canonical: '/en/search',
    languages: {
      'en-US': '/en/search',
      'de-DE': '/de/search',
    },
  },
};

export default async function SearchPage() {
  const items = await getSearchItems('en');
  return (
    <Suspense fallback={null}>
      <SearchPageClient items={items} lang="en" />
    </Suspense>
  );
}
