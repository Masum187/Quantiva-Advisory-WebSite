import { notFound } from 'next/navigation';
import ForgeCapabilityPage from '../../../../components/forge/ForgeCapabilityPage';
import { servicesOverview } from '../../../../lib/data/servicesOverview';
import type { ForgeLocale } from '../../../../lib/data/forge-content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const slugs = Array.from(
    new Set(servicesOverview.filter((s) => s.language === 'en').map((s) => s.slug)),
  );
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicesOverview.find((s) => s.slug === slug && s.language === 'en');
  return { title: `${service?.title ?? slug} — Quantiva Forge` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const locale: ForgeLocale = 'en';
  const service = servicesOverview.find((s) => s.slug === slug && s.language === locale);
  if (!service) notFound();
  return (
    <ForgeCapabilityPage
      locale={locale}
      slug={service.slug}
      title={service.title}
      description={service.description}
      tags={service.tags}
    />
  );
}
