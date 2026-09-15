import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPageClient from '../../components/pages/search/SearchPageClient';
import { getSearchItems } from '../../lib/utils/searchIndex';

export const metadata: Metadata = {
  title: 'Suche | Quantiva Advisory',
  description: 'Durchsuchen Sie Content, Services und Branchenlösungen von Quantiva Advisory.',
  alternates: {
    canonical: '/de/search',
    languages: {
      'de-DE': '/de/search',
      'en-US': '/en/search',
    },
  },
};

export default async function SearchPage() {
  const items = await getSearchItems('de');
  return (
    <Suspense fallback={null}>
      <SearchPageClient items={items} lang="de" />
    </Suspense>
  );
}
