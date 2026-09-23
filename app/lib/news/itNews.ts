import { unstable_cache } from 'next/cache';

export type NewsTopic = 'ai' | 'sap' | 'cloud';

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  topic: NewsTopic;
  excerpt: string;
}

const FEEDS: { source: string; url: string; topic: NewsTopic }[] = [
  { source: 'SAP News', url: 'https://news.sap.com/feed/', topic: 'sap' },
  { source: 'AWS News Blog', url: 'https://aws.amazon.com/blogs/aws/feed/', topic: 'cloud' },
  { source: 'Azure Blog', url: 'https://azure.microsoft.com/en-us/blog/feed/', topic: 'cloud' },
  { source: 'Google AI', url: 'https://blog.google/innovation-and-ai/technology/ai/rss/', topic: 'ai' },
];

const AI_RE = /\b(ai|a\.i\.|ki|künstliche intelligenz|generative|machine learning|llm|joule|copilot|gemini)\b/i;
const SAP_RE = /\b(sap|s\/4|s4hana|joule)\b/i;

function decode(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&trade;/g, '™')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tagText(block: string, name: string): string {
  const pattern = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i');
  const match = block.match(pattern);
  return match ? decode(match[1]) : '';
}

function linkOf(block: string): string {
  const atom =
    block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i) ||
    block.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["']/i);
  if (atom?.[1]) return decode(atom[1]);
  const href = block.match(/<link[^>]*href=["']([^"']+)["']/i);
  if (href?.[1] && !block.includes('<link>')) return decode(href[1]);
  return tagText(block, 'link');
}

function parseFeed(xml: string, source: string, fallbackTopic: NewsTopic): NewsItem[] {
  const chunks = xml.split(/<(?:item|entry)\b[^>]*>/i).slice(1);
  const items: NewsItem[] = [];

  for (const chunk of chunks) {
    const title = tagText(chunk, 'title');
    const url = linkOf(chunk);
    const rawDate = tagText(chunk, 'pubDate') || tagText(chunk, 'published') || tagText(chunk, 'updated');
    const published = rawDate ? new Date(rawDate) : null;
    if (!title || !url || !published || Number.isNaN(published.getTime())) continue;

    const topic: NewsTopic = AI_RE.test(title) ? 'ai' : SAP_RE.test(title) ? 'sap' : fallbackTopic;
    const excerpt = tagText(chunk, 'description') || tagText(chunk, 'summary');

    items.push({
      id: url,
      title,
      url,
      source,
      publishedAt: published.toISOString(),
      topic,
      excerpt: excerpt.slice(0, 180),
    });
  }

  return items;
}

async function loadItNews(): Promise<NewsItem[]> {
  const batches = await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const response = await fetch(feed.url, {
          headers: { Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml' },
          signal: AbortSignal.timeout(8000),
          next: { revalidate: 60 * 60 * 6 },
        });
        if (!response.ok) return [];
        const xml = await response.text();
        return parseFeed(xml, feed.source, feed.topic);
      } catch {
        return [];
      }
    }),
  );

  const seen = new Set<string>();
  const cutoff = Date.now() - 1000 * 60 * 60 * 24 * 150;
  return batches
    .flat()
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return new Date(item.publishedAt).getTime() >= cutoff;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 9);
}

export function getItNews(): Promise<NewsItem[]> {
  return unstable_cache(loadItNews, ['it-news-v2'], {
    tags: ['news'],
    revalidate: 60 * 60 * 6,
  })();
}
