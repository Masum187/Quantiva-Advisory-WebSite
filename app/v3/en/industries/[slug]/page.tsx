import { notFound } from 'next/navigation';
import V3IndustryPage from '../../../../components/v3/V3IndustryPage';
import { industriesEn } from '../../../../lib/data/industries';
import { v3Metadata } from '../../../../lib/data/v3-content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industriesEn.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = industriesEn.find((item) => item.slug === slug);
  return v3Metadata(
    'en',
    `/industries/${slug}`,
    `${industry?.title ?? 'Industry'} | Quantiva Advisory`,
    industry
      ? `Controlled transformation for ${industry.title}: ${industry.description}.`
      : 'Industry-specific transformation advisory from Quantiva Advisory.',
  );
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const industry = industriesEn.find((item) => item.slug === slug);
  if (!industry) notFound();
  return <V3IndustryPage locale="en" industry={industry} />;
}
