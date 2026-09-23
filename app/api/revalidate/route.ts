import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_TAGS = new Set(['content', 'jobs', 'events', 'news']);

function localizedString(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (!value || typeof value !== 'object') return undefined;
  const rec = value as Record<string, unknown>;
  for (const key of ['en-US', 'de-DE', 'de', 'en']) {
    const inner = rec[key];
    if (typeof inner === 'string' && inner.trim()) return inner.trim();
  }
  return undefined;
}

function cacheTagsFromBody(body: unknown): string[] | null {
  if (!body || typeof body !== 'object') return null;
  const tags = (body as { tags?: unknown }).tags;
  if (!Array.isArray(tags) || !tags.length) return null;
  if (!tags.every((tag) => typeof tag === 'string')) return null;
  const ours = tags.filter((tag) => ALLOWED_TAGS.has(tag));
  return ours.length ? ours : null;
}

export async function POST(req: NextRequest) {
  const secret =
    req.headers.get('x-revalidate-secret') || req.nextUrl.searchParams.get('secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let tags = ['content', 'jobs'];
  let slug: string | undefined;
  try {
    const body = await req.json();
    tags = cacheTagsFromBody(body) ?? tags;
    slug = localizedString((body as { fields?: { slug?: unknown } }).fields?.slug);
  } catch {
    // Contentful may send an empty or non-JSON body; default tags still apply.
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  revalidatePath('/de/content');
  revalidatePath('/en/content');
  revalidatePath('/de/career');
  revalidatePath('/en/career');
  revalidatePath('/de/news');
  revalidatePath('/en/news');
  revalidatePath('/de/content/[slug]', 'page');
  revalidatePath('/en/content/[slug]', 'page');
  if (slug) {
    revalidatePath(`/de/content/${slug}`);
    revalidatePath(`/en/content/${slug}`);
  }

  return NextResponse.json({ revalidated: true, tags, slug: slug ?? null });
}
