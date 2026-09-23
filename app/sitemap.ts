import type { MetadataRoute } from 'next';
import { careerAreaSlugs } from './lib/data/careerAreas';
import { careerBenefitSlugs } from './lib/data/careerBenefits';
import { careerLevelSlugs } from './lib/data/careerLevels';
import { getIndustrySlugs } from './lib/data/industryDetails';
import { getVentures } from './lib/data/projects';
import { servicesOverview } from './lib/data/servicesOverview';
import { absoluteUrl, localePath, type SiteLang } from './lib/seo';
import { getContentPosts } from './lib/utils/contentHub';

const LOCALES: SiteLang[] = ['de', 'en'];

const STATIC_PATHS = [
  '/',
  '/about',
  '/team',
  '/career',
  '/cases',
  '/strategy-consulting',
  '/content',
  '/news',
] as const;

const SERVICE_SLUGS = Array.from(
  new Set([...servicesOverview.map((service) => service.slug), 'digital-strategy']),
);

function languageAlternates(path: string): Record<string, string> {
  return {
    de: absoluteUrl(localePath('de', path)),
    en: absoluteUrl(localePath('en', path)),
    'x-default': absoluteUrl(localePath('de', path)),
  };
}

function localizedEntries(
  path: string,
  extras: Pick<MetadataRoute.Sitemap[number], 'changeFrequency' | 'priority'> = {},
): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.map((lang) => ({
    url: absoluteUrl(localePath(lang, path)),
    lastModified: now,
    changeFrequency: extras.changeFrequency ?? 'monthly',
    priority: extras.priority ?? 0.7,
    alternates: {
      languages: languageAlternates(path),
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push(
      ...localizedEntries(path, {
        changeFrequency: path === '/' ? 'weekly' : 'monthly',
        priority: path === '/' ? 1 : path === '/cases' || path === '/career' ? 0.8 : 0.7,
      }),
    );
  }

  for (const slug of careerLevelSlugs) {
    entries.push(...localizedEntries(`/career/${slug}`, { priority: 0.7 }));
  }

  for (const slug of careerAreaSlugs) {
    entries.push(...localizedEntries(`/career/${slug}`, { priority: 0.6 }));
  }

  for (const slug of careerBenefitSlugs) {
    entries.push(...localizedEntries(`/career/${slug}`, { priority: 0.6 }));
  }

  for (const venture of getVentures('de')) {
    entries.push(...localizedEntries(`/cases/${venture.slug}`, { priority: 0.7 }));
  }

  for (const slug of SERVICE_SLUGS) {
    entries.push(...localizedEntries(`/services/${slug}`, { priority: 0.7 }));
  }

  for (const slug of getIndustrySlugs('de')) {
    entries.push(...localizedEntries(`/industries/${slug}`, { priority: 0.7 }));
  }

  const [dePosts, enPosts] = await Promise.all([
    getContentPosts('de'),
    getContentPosts('en'),
  ]);

  const now = new Date();
  for (const post of dePosts) {
    entries.push({
      url: absoluteUrl(localePath('de', `/content/${post.slug}`)),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }
  for (const post of enPosts) {
    entries.push({
      url: absoluteUrl(localePath('en', `/content/${post.slug}`)),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  const nowLegal = new Date();
  entries.push(
    {
      url: absoluteUrl('/de/impressum'),
      lastModified: nowLegal,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { de: absoluteUrl('/de/impressum'), en: absoluteUrl('/en/imprint'), 'x-default': absoluteUrl('/de/impressum') } },
    },
    {
      url: absoluteUrl('/en/imprint'),
      lastModified: nowLegal,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { de: absoluteUrl('/de/impressum'), en: absoluteUrl('/en/imprint'), 'x-default': absoluteUrl('/de/impressum') } },
    },
    {
      url: absoluteUrl('/de/datenschutz'),
      lastModified: nowLegal,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { de: absoluteUrl('/de/datenschutz'), en: absoluteUrl('/en/privacy'), 'x-default': absoluteUrl('/de/datenschutz') } },
    },
    {
      url: absoluteUrl('/en/privacy'),
      lastModified: nowLegal,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { de: absoluteUrl('/de/datenschutz'), en: absoluteUrl('/en/privacy'), 'x-default': absoluteUrl('/de/datenschutz') } },
    },
  );

  return entries;
}
