import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VentureDetailPage from '../../../components/pages/projects/VentureDetailPage';
import { ventures, getVenture, getNextVenture } from '../../../lib/data/projects';

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
  return {
    title: `${venture.name} – ${venture.category} | Quantiva Ventures`,
    description: venture.intro.slice(0, 160),
    openGraph: {
      title: `${venture.name} – ${venture.tagline}`,
      description: venture.intro.slice(0, 200),
      images: [venture.logo],
      type: 'website',
    },
  };
}

export default async function VenturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = getVenture(slug, 'en');
  if (!venture) notFound();
  return <VentureDetailPage venture={venture} next={getNextVenture(slug, 'en')} lang="en" />;
}
