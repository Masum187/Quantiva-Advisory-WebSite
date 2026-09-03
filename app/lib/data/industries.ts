export type IndustryShowcase = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Looping background clip shown in the card (muted, autoplay). */
  video?: string;
  projects: number;
};

const industryVideos: Record<string, string> = {
  'financial-services': '/assets/industries/finance.mp4',
  manufacturing: '/assets/industries/automotive.mp4',
  'health-life-sciences': '/assets/industries/health.mp4',
  'retail-ecommerce': '/assets/industries/retail.mp4',
};

const withVideos = (list: IndustryShowcase[]): IndustryShowcase[] =>
  list.map((industry) => ({ ...industry, video: industryVideos[industry.slug] }));

export const industriesDe: IndustryShowcase[] = withVideos([
  {
    slug: 'financial-services',
    title: 'Finanzdienstleistungen',
    description: 'Banking, Versicherung, FinTech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
    projects: 45,
  },
  {
    slug: 'manufacturing',
    title: 'Automotive',
    description: 'OEM, Zulieferer, Mobility',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=400&auto=format&fit=crop',
    projects: 32,
  },
  {
    slug: 'health-life-sciences',
    title: 'Health & Life Sciences',
    description: 'Pharma, MedTech, Kliniken',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop',
    projects: 28,
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    description: 'Omnichannel, Digital Commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&auto=format&fit=crop',
    projects: 38,
  },
]);

export const industriesEn: IndustryShowcase[] = withVideos([
  {
    slug: 'financial-services',
    title: 'Financial Services',
    description: 'Banking, Insurance, FinTech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
    projects: 45,
  },
  {
    slug: 'manufacturing',
    title: 'Automotive & Mobility',
    description: 'OEM, suppliers, mobility services',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=400&auto=format&fit=crop',
    projects: 32,
  },
  {
    slug: 'health-life-sciences',
    title: 'Health & Life Sciences',
    description: 'Pharma, MedTech, hospitals',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop',
    projects: 28,
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    description: 'Omnichannel, digital commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&auto=format&fit=crop',
    projects: 38,
  },
]);
