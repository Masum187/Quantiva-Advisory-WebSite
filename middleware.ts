import { NextRequest, NextResponse } from 'next/server';

const locales = ['de', 'en'];
const defaultLocale = 'de';

function htmlLangFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'en' || parts[1] === 'en') return 'en';
  return 'de';
}

function nextWithHtmlLang(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-html-lang', locale);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

function getLocale(request: NextRequest): string {
  // Check if locale is in pathname
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) return pathnameLocale;

  // Check saved preference in cookie
  const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (savedLocale && locales.includes(savedLocale)) {
    return savedLocale;
  }

  // Check accept-language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase();
    if (locales.includes(preferredLocale)) {
      return preferredLocale;
    }
  }

  return defaultLocale;
}

function isNoIndexPath(pathname: string): boolean {
  return (
    pathname === '/v2' ||
    pathname.startsWith('/v2/') ||
    pathname === '/v3' ||
    pathname.startsWith('/v3/') ||
    pathname.includes('/ai-test') ||
    pathname.includes('/cms') ||
    pathname.includes('/video-generation')
  );
}

function withOptionalNoIndex(response: NextResponse, pathname: string) {
  if (isNoIndexPath(pathname)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, metadata routes, and API routes
  if (
    pathname.includes('/api/') ||
    pathname.includes('/_next/') ||
    pathname.includes('/static/') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Parallel variants live under /v2 and /v3 — do not wrap with /de|/en
  if (
    pathname === '/v2' ||
    pathname.startsWith('/v2/') ||
    pathname === '/v3' ||
    pathname.startsWith('/v3/')
  ) {
    return withOptionalNoIndex(
      nextWithHtmlLang(request, htmlLangFromPath(pathname)),
      pathname
    );
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return withOptionalNoIndex(
      nextWithHtmlLang(request, htmlLangFromPath(pathname)),
      pathname
    );
  }

  // Locale prefix on the incoming request URL — never a hardcoded host.
  const locale = getLocale(request);
  const suffix = pathname === '/' ? '' : pathname;
  const response = NextResponse.redirect(new URL(`/${locale}${suffix}`, request.url));

  // Set locale cookie
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};






