import { use } from 'react';
import JsonLd from '../../../components/JsonLd';
import IndustryLandingPage from '../../../components/pages/industries/IndustryLandingPage';
import { getIndustryDetail, getIndustrySlugs } from '../../../lib/data/industryDetails';
import { breadcrumbListJsonLd } from '../../../lib/seo';
import React from 'react';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getIndustrySlugs('de').map((slug) => ({ slug }));
}

export const metadata = {
  title: 'Branchen-Lösungen | Quantiva Advisory',
  description: 'Branchenfokussierte Beratungsleistungen für den deutschsprachigen Mittelstand – von Manufacturing über Financial Services bis hin zu Retail.',
};

type PageParams = Promise<{ slug: string } | undefined>;

export default function IndustryPage({ params }: { params: PageParams }) {
  const resolved = use(params);
  const slug = resolved?.slug;

  if (!slug) {
    return null;
  }

  const industry = getIndustryDetail(slug, 'de');

  if (!industry) {
    return null;
  }

  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd('de', [
          { name: 'Branchen', path: '/#industries' },
          { name: industry.name, path: `/industries/${slug}` },
        ])}
      />
      <IndustryLandingPage industry={industry} lang="de" />
    </>
  );
}
