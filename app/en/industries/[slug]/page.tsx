import { use } from 'react';
import JsonLd from '../../../components/JsonLd';
import IndustryLandingPage from '../../../components/pages/industries/IndustryLandingPage';
import { getIndustryDetail, getIndustrySlugs } from '../../../lib/data/industryDetails';
import { breadcrumbListJsonLd } from '../../../lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getIndustrySlugs('en').map((slug) => ({ slug }));
}

export const metadata = {
  title: 'Industry Solutions | Quantiva Advisory',
  description: 'Industry-specific consulting services for European mid-market champions – from manufacturing to financial services and retail.',
};

type PageParams = Promise<{ slug: string } | undefined>;

export default function IndustryPage({ params }: { params: PageParams }) {
  const resolved = use(params);
  const slug = resolved?.slug;

  if (!slug) {
    return null;
  }

  const industry = getIndustryDetail(slug, 'en');

  if (!industry) {
    return null;
  }

  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd('en', [
          { name: 'Industries', path: '/#industries' },
          { name: industry.name, path: `/industries/${slug}` },
        ])}
      />
      <IndustryLandingPage industry={industry} lang="en" />
    </>
  );
}
