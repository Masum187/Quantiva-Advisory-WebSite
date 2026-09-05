import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CareerAreaPage from '../../../components/pages/CareerAreaPage';
import { careerAreaSlugs, getCareerArea } from '../../../lib/data/careerAreas';

export const dynamicParams = false;

export async function generateStaticParams() {
  return careerAreaSlugs.map((slug) => ({ slug }));
}

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getCareerArea(slug);

  if (!area) {
    return {};
  }

  return {
    title: `${area.de.title} – Karriere | Quantiva Advisory`,
    description: area.de.subtitle,
    alternates: {
      canonical: `/de/career/${area.slug}`,
      languages: {
        'de-DE': `/de/career/${area.slug}`,
        'en-US': `/en/career/${area.slug}`,
      },
    },
  };
}

export default async function CareerAreaDePage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const area = getCareerArea(slug);

  if (!area) {
    notFound();
  }

  return <CareerAreaPage lang="de" slug={area.slug} />;
}
