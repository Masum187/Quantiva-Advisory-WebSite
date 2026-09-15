import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_TAGS = new Set(['content', 'jobs']);

export async function POST(req: NextRequest) {
  const secret =
    req.headers.get('x-revalidate-secret') || req.nextUrl.searchParams.get('secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let tags = ['content', 'jobs'];
  try {
    const body = (await req.json()) as { tags?: string[] };
    if (Array.isArray(body.tags) && body.tags.length) {
      tags = body.tags.filter((tag) => ALLOWED_TAGS.has(tag));
    }
  } catch {
    // Contentful webhooks may send a large payload; default tags are fine.
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true, tags });
}
