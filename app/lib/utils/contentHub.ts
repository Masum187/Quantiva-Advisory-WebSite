import { unstable_cache } from 'next/cache';
import postsData from '../data/posts.json';
import { fetchEntries, getAssetUrl, isContentfulEnabled, richTextToPlainText } from './contentful';

export type SupportedLanguage = 'de' | 'en';
export type ContentType = 'article' | 'whitepaper' | 'case-study' | 'report';

export interface ContentPost {
  slug: string;
  language: SupportedLanguage;
  title: string;
  excerpt: string;
  tags: string[];
  industry?: string;
  contentType?: ContentType;
  publishedAt: string;
  readingTime?: number;
  heroImage?: string | null;
  highlight?: boolean;
  featured?: boolean;
  author?: string;
  body?: string;
  downloadUrl?: string;
}

const FALLBACK_POSTS: ContentPost[] = postsData as unknown as ContentPost[];

const contentfulFieldsByLang = (lang: SupportedLanguage) => ({
  title: lang === 'de' ? 'titleDe' : 'titleEn',
  excerpt: lang === 'de' ? 'excerptDe' : 'excerptEn',
  body: lang === 'de' ? 'bodyDe' : 'bodyEn',
});

const mapContentfulPost = (entry: any, lang: SupportedLanguage): ContentPost | null => {
  if (!entry?.fields) return null;
  const { fields } = entry;
  const fieldMap = contentfulFieldsByLang(lang);
  const language = (fields.language || lang) as SupportedLanguage;
  if (language !== lang) return null;

  const bodyField = fields[fieldMap.body] || fields.body;

  return {
    slug: fields.slug,
    language,
    title: fields[fieldMap.title] || fields.title || '',
    excerpt: fields[fieldMap.excerpt] || fields.excerpt || '',
    tags: Array.isArray(fields.tags) ? fields.tags : [],
    industry: fields.industry || undefined,
    contentType: fields.contentType || 'article',
    publishedAt: fields.publishedAt || new Date().toISOString(),
    readingTime: typeof fields.readingTime === 'number' ? fields.readingTime : undefined,
    heroImage: getAssetUrl(fields.heroImage) || fields.heroImageUrl || null,
    highlight: typeof fields.highlight === 'boolean' ? fields.highlight : undefined,
    featured: typeof fields.featured === 'boolean' ? fields.featured : undefined,
    author: fields.author || undefined,
    body: bodyField ? richTextToPlainText(bodyField) : undefined,
    downloadUrl: fields.downloadUrl || undefined,
  };
};

const mapFallbackPosts = (lang: SupportedLanguage) =>
  FALLBACK_POSTS.filter((post) => post.language === lang).sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

async function loadContentPosts(lang: SupportedLanguage): Promise<ContentPost[]> {
  if (!isContentfulEnabled) {
    return mapFallbackPosts(lang);
  }

  const entries = await fetchEntries('contentPost', {
    'fields.language': lang,
    order: '-fields.publishedAt',
  });

  const posts = (entries || [])
    .map((entry) => mapContentfulPost(entry, lang))
    .filter((post): post is ContentPost => Boolean(post));

  if (!posts.length) {
    return mapFallbackPosts(lang);
  }

  return posts;
}

export async function getContentPosts(lang: SupportedLanguage): Promise<ContentPost[]> {
  return unstable_cache(() => loadContentPosts(lang), ['content-posts', lang], {
    tags: ['content'],
    revalidate: 300,
  })();
}

async function loadContentPost(lang: SupportedLanguage, slug: string): Promise<ContentPost | null> {
  if (!isContentfulEnabled) {
    return mapFallbackPosts(lang).find((post) => post.slug === slug) || null;
  }

  const entries = await fetchEntries('contentPost', {
    'fields.slug': slug,
    'fields.language': lang,
    limit: 1,
  });

  if (!entries?.length) {
    return mapFallbackPosts(lang).find((post) => post.slug === slug) || null;
  }

  const post = mapContentfulPost(entries[0], lang);
  return post ?? mapFallbackPosts(lang).find((item) => item.slug === slug) ?? null;
}

export async function getContentPost(lang: SupportedLanguage, slug: string): Promise<ContentPost | null> {
  return unstable_cache(() => loadContentPost(lang, slug), ['content-post', lang, slug], {
    tags: ['content'],
    revalidate: 300,
  })();
}
