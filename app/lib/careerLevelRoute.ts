import type { Metadata } from 'next';
import { careerLevels, type CareerLevelSlug, type Lang } from './data/careerLevels';
import { pageMeta } from './seo';

export function careerLevelMetadata(lang: Lang, slug: CareerLevelSlug): Metadata {
  const copy = careerLevels[slug][lang];
  const suffix = lang === 'de' ? 'Karriere' : 'Career';
  return pageMeta({
    title: `${copy.metaTitle} – ${suffix}`,
    description: copy.metaDescription,
    path: `/career/${slug}`,
    lang,
  });
}
