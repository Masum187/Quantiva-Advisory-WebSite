import { getIndustryDetail, getIndustrySlugs } from './industryDetails';

export type IndustryShowcase = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Looping background clip shown in the card (muted, autoplay). */
  video?: string;
  /** Two clips shown side by side as a split screen (overrides `video`). */
  splitVideos?: [string, string];
  /** Playback speed for the card videos (default 1). */
  playbackRate?: number;
  projects: number;
};

const industryVideos: Record<
  string,
  Pick<IndustryShowcase, 'video' | 'splitVideos' | 'playbackRate'>
> = {
  'financial-services': { video: '/assets/industries/finance.mp4' },
  manufacturing: { video: '/assets/industries/automotive.mp4' },
  'health-life-sciences': { video: '/assets/industries/health.mp4' },
  'retail-ecommerce': {
    // Left: crowd of shoppers in a busy street; right: ordering from a webshop
    splitVideos: [
      '/assets/industries/retail-store.mp4',
      '/assets/industries/retail-online.mp4',
    ],
    playbackRate: 0.9,
  },
};

const withVideos = (list: IndustryShowcase[]): IndustryShowcase[] =>
  list.map((industry) => ({ ...industry, ...industryVideos[industry.slug] }));

export const industriesDe: IndustryShowcase[] = withVideos([
  {
    slug: 'financial-services',
    title: 'Finanzdienstleistungen',
    description: 'Banking, Versicherung, FinTech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
    projects: 45,
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing & Industrie 4.0',
    description: 'OEM, Zulieferer, Mobility',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400&auto=format&fit=crop',
    projects: 32,
  },
  {
    slug: 'health-life-sciences',
    title: 'Health & Life Sciences',
    description: 'Pharma, MedTech, Kliniken',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1400&auto=format&fit=crop',
    projects: 28,
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    description: 'Omnichannel, Digital Commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400&auto=format&fit=crop',
    projects: 38,
  },
]);

export const industriesEn: IndustryShowcase[] = withVideos([
  {
    slug: 'financial-services',
    title: 'Financial Services',
    description: 'Banking, Insurance, FinTech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
    projects: 45,
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing & Industry 4.0',
    description: 'OEM, suppliers, mobility services',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400&auto=format&fit=crop',
    projects: 32,
  },
  {
    slug: 'health-life-sciences',
    title: 'Health & Life Sciences',
    description: 'Pharma, MedTech, hospitals',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1400&auto=format&fit=crop',
    projects: 28,
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    description: 'Omnichannel, digital commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400&auto=format&fit=crop',
    projects: 38,
  },
]);

/**
 * Every industry that has a real detail page, with card media + official names.
 * Curated showcase order first, then any additional slugs from `industryDetails`.
 */
export function getIndustryShowcase(lang: 'de' | 'en'): IndustryShowcase[] {
  const catalog = lang === 'de' ? industriesDe : industriesEn;
  const bySlug = new Map(catalog.map((item) => [item.slug, item]));
  const pageSlugs = getIndustrySlugs(lang);
  const seen = new Set<string>();
  const ordered: string[] = [];

  for (const item of catalog) {
    if (pageSlugs.includes(item.slug) && !seen.has(item.slug)) {
      ordered.push(item.slug);
      seen.add(item.slug);
    }
  }
  for (const slug of pageSlugs) {
    if (!seen.has(slug)) {
      ordered.push(slug);
      seen.add(slug);
    }
  }

  return ordered.map((slug) => {
    const card = bySlug.get(slug);
    const detail = getIndustryDetail(slug, lang);
    return {
      slug,
      title: detail?.name ?? card?.title ?? slug,
      description: card?.description ?? detail?.hero.subtitle ?? '',
      image: card?.image ?? '',
      video: card?.video,
      splitVideos: card?.splitVideos,
      playbackRate: card?.playbackRate,
      projects: card?.projects ?? 0,
    };
  });
}
