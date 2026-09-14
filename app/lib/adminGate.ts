import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_COOKIE = 'qa_admin';

export function getAdminSecret(): string | undefined {
  const secret = process.env.ADMIN_API_SECRET?.trim();
  return secret || undefined;
}

function cookieValueFromHeader(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(`${ADMIN_COOKIE}=`)) continue;
    return decodeURIComponent(trimmed.slice(ADMIN_COOKIE.length + 1));
  }
  return undefined;
}

export function isAdminAuthorized(request: NextRequest | Request): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;

  const authorization = request.headers.get('authorization');
  if (authorization === `Bearer ${secret}`) return true;

  if ('cookies' in request && typeof request.cookies?.get === 'function') {
    const fromCookieApi = request.cookies.get(ADMIN_COOKIE)?.value;
    if (fromCookieApi === secret) return true;
  }

  const fromHeader = cookieValueFromHeader(request.headers.get('cookie'));
  return fromHeader === secret;
}

export function denyAdminApi(): NextResponse {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export function requireAdminApi(request: NextRequest | Request): NextResponse | null {
  if (isAdminAuthorized(request)) return null;
  return denyAdminApi();
}

export function isAdminPagePath(pathname: string): boolean {
  return /\/(cms|ai-test|video-generation)(\/|$)/.test(pathname);
}

export function denyAdminPage(): NextResponse {
  return new NextResponse('Not Found', {
    status: 404,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
