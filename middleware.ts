import { NextRequest, NextResponse } from 'next/server';

// Runs at the Vercel edge. Two SEO jobs:
// 1. On preview deployments (any host that is not the canonical apex), add X-Robots-Tag: noindex.
//    Prevents Google from indexing duplicate content across *.vercel.app preview URLs.
// 2. First-time visits to `/` — if Accept-Language prefers es or pt AND no `lang` cookie is set,
//    add a hint header the client can use. We do NOT hard-redirect (that hurts SEO and can loop
//    for search bots that ignore cookies), but we set a canonical hint so the browser can offer
//    "Read this in Español / Português" via the language switcher in the layout.

const CANONICAL_HOST = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV || '';
const LANG_COOKIE = 'preferredLang';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get('host') || '';
  // On Vercel, trust the deployment environment: only preview builds are hidden.
  // Elsewhere, fall back to comparing the host against the canonical one.
  const isPreview = VERCEL_ENV
    ? VERCEL_ENV === 'preview'
    : host !== CANONICAL_HOST &&
      host !== `www.${CANONICAL_HOST}` &&
      !host.startsWith('localhost') &&
      !host.startsWith('127.0.0.1');

  const res = NextResponse.next();

  // 1. Preview / non-canonical hosts must not be indexed.
  if (isPreview) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // 2. Store a language hint cookie (does NOT redirect — SEO-safe).
  const existing = req.cookies.get(LANG_COOKIE)?.value;
  if (!existing) {
    const acceptLang = req.headers.get('accept-language') || '';
    const primary = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase();
    if (primary === 'es' || primary === 'pt') {
      res.cookies.set(LANG_COOKIE, primary, {
        maxAge: 60 * 60 * 24 * 90,
        sameSite: 'lax',
        path: '/',
      });
    }
  }

  return res;
}

export const config = {
  matcher: [
    // Run on everything except static assets and API routes.
    // Search-engine verification files and static assets must be served untouched.
    '/((?!api|_next/static|_next/image|favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|og-image.png|manifest.webmanifest|robots.txt|sitemap.xml|rss.xml|llms.txt|humans.txt|photo.jpg|photo1.jpg|resume.pdf|images).*)',
  ],
};
