import { notFound } from 'next/navigation';
import V3IndustryPage from '../../../../components/v3/V3IndustryPage';
import { industriesDe } from '../../../../lib/data/industries';
import { v3Metadata } from '../../../../lib/data/v3-content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industriesDe.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = industriesDe.find((item) => item.slug === slug);
  return v3Metadata(
    'de',
    `/industries/${slug}`,
    `${industry?.title ?? 'Branche'} | Quantiva Advisory`,
    industry
      ? `Kontrollierte Transformation für ${industry.title}: ${industry.description}.`
      : 'Branchenspezifische Transformationsberatung von Quantiva Advisory.',
  );
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const industry = industriesDe.find((item) => item.slug === slug);
  if (!industry) notFound();
  return <V3IndustryPage locale="de" industry={industry} />;
}
