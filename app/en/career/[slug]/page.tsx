import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../../../components/JsonLd';
import CareerAreaPage from '../../../components/pages/CareerAreaPage';
import CareerBenefitPage from '../../../components/pages/CareerBenefitPage';
import { careerAreaSlugs, getCareerArea } from '../../../lib/data/careerAreas';
import { careerBenefitSlugs, getCareerBenefit } from '../../../lib/data/careerBenefits';
import { breadcrumbListJsonLd, careerChildBreadcrumb } from '../../../lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [...careerAreaSlugs, ...careerBenefitSlugs].map((slug) => ({ slug }));
}

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getCareerArea(slug);
  const benefit = area ? undefined : getCareerBenefit(slug);
  const content = area?.en ?? benefit?.en;

  if (!content) {
    return {};
  }

  return {
    title: `${content.title} – Career | Quantiva Advisory`,
    description: content.subtitle,
    alternates: {
      canonical: `/en/career/${slug}`,
      languages: {
        'de-DE': `/de/career/${slug}`,
        'en-US': `/en/career/${slug}`,
      },
    },
  };
}

export default async function CareerSlugEnPage({ params }: { params: PageParams }) {
  const { slug } = await params;

  const area = getCareerArea(slug);
  if (area) {
    return (
      <>
        <JsonLd data={breadcrumbListJsonLd('en', careerChildBreadcrumb('en', area.en.title, `/career/${slug}`))} />
        <CareerAreaPage lang="en" slug={area.slug} />
      </>
    );
  }

  const benefit = getCareerBenefit(slug);
  if (benefit) {
    return (
      <>
        <JsonLd data={breadcrumbListJsonLd('en', careerChildBreadcrumb('en', benefit.en.title, `/career/${slug}`))} />
        <CareerBenefitPage lang="en" slug={benefit.slug} />
      </>
    );
  }

  notFound();
}
