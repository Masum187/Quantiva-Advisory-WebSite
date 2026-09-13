import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VentureDetailPage from '../../../components/pages/projects/VentureDetailPage';
import { ventures, getVenture, getNextVenture } from '../../../lib/data/projects';
import JsonLd from '../../../components/JsonLd';
import { breadcrumbListJsonLd, OG_CASES, pageMeta } from '../../../lib/seo';

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug, 'en');
  if (!venture) return {};
  return pageMeta({
    title: `${venture.name} – ${venture.category}`,
    description: venture.intro.slice(0, 160),
    path: `/cases/${slug}`,
    lang: 'en',
    image: venture.logo || OG_CASES,
  });
}

export default async function VenturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = getVenture(slug, 'en');
  if (!venture) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd('en', [
          { name: 'Projects', path: '/cases' },
          { name: venture.name, path: `/cases/${slug}` },
        ])}
      />
      <VentureDetailPage venture={venture} next={getNextVenture(slug, 'en')} lang="en" />
    </>
  );
}
