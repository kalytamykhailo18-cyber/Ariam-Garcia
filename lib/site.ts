// Single source of truth for the public site URL.
// Resolved at build time in next.config.js: NEXT_PUBLIC_SITE_URL if set, otherwise
// Vercel's production domain (VERCEL_PROJECT_PRODUCTION_URL), otherwise the fallback.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ariam-garcia.vercel.app').replace(/\/$/, '');
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

// Bump when site content changes meaningfully — drives sitemap <lastmod> for static pages.
export const SITE_UPDATED = '2026-10-06';
