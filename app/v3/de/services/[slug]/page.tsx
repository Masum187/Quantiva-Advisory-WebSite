import { notFound } from 'next/navigation';
import V3CapabilityPage from '../../../../components/v3/V3CapabilityPage';
import { servicesOverview } from '../../../../lib/data/servicesOverview';
import { v3Metadata } from '../../../../lib/data/v3-content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicesOverview
    .filter((service) => service.language === 'de')
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicesOverview.find((item) => item.language === 'de' && item.slug === slug);
  return v3Metadata(
    'de',
    `/services/${slug}`,
    `${service?.title ?? 'Leistung'} | Quantiva Advisory`,
    service?.description ?? 'Quantiva Advisory Leistung für kontrollierte Transformation.',
  );
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = servicesOverview.find((item) => item.language === 'de' && item.slug === slug);
  if (!service) notFound();
  return <V3CapabilityPage locale="de" service={service} />;
}
