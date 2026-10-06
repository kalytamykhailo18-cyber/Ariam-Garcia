# Ariam Garcia Balmaseda · Portfolio

[![Live](https://img.shields.io/badge/live-ariam-garcia.vercel.app-6366f1?style=flat-square)](https://ariam-garcia.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-000?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/deployed-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)

Portfolio website of **Ariam Garcia Balmaseda** — senior full-stack developer, 10+ years shipping custom software for service businesses. Booking and scheduling systems, operations automation, AI-powered CRMs, blockchain platforms, and mobile apps.

## Live

- **English**: https://ariam-garcia.vercel.app
- **Español**: https://ariam-garcia.vercel.app/es
- **Português**: https://ariam-garcia.vercel.app/pt

## Stack

- **Framework**: Next.js 14 (Pages Router) + TypeScript
- **Styling**: TailwindCSS + MUI Icons + Framer Motion
- **Content**: 32 portfolio projects, 5 services, 8 blog case studies, all in `lib/*.ts`
- **Deployment**: Vercel (edge network, ISR, Speed Insights)
- **Analytics**: Vercel Analytics + Vercel Speed Insights (Core Web Vitals RUM)
- **SEO**: 56+ static pages, JSON-LD across Person / ProfessionalService / Service / Article / BlogPosting / FAQPage / Review / BreadcrumbList / CollectionPage / WebSite (SearchAction) / AboutPage / ContactPage schemas

## SEO features

- Multilingual home pages (en / es / pt) with proper `hreflang` and `og:locale:alternate`
- Dynamic sitemap covering 54+ URLs with `<image:image>` entries + `xhtml:link` language alternates
- llms.txt for AI assistant discoverability (Perplexity, ChatGPT, Claude Web)
- RSS 2.0 feed for the blog (Dublin Core + Atom self-link)
- Deep case-study blog posts with `Article` schema, `wordCount`, `keywords`, `articleSection`
- 15 crawler explicit allowances in robots.txt (Applebot, ClaudeBot, GPTBot, PerplexityBot, ...)
- IndieWeb `rel=me` verification (GitHub, email)
- `.well-known/security.txt` (RFC 9116)
- Skip-to-content link + `prefers-reduced-motion` respect (WCAG)
- OG image, favicons and apple-touch-icon generated programmatically

## Vercel / GitHub deployment features

- **Edge headers** via `vercel.json`: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, per-asset Cache-Control
- **Preview no-index** via `middleware.ts`: `X-Robots-Tag: noindex` on all non-canonical hosts
- **www → apex redirect** at the edge (301)
- **ISR** on dynamic pages (services, projects, blog) — pages rebuild daily so `lastmod` stays fresh
- **GitHub Actions**:
  - `lighthouse.yml` — runs Lighthouse against every PR's Vercel preview, fails on CWV regression
  - `sitemap-ping.yml` — pings Google + Bing + IndexNow on merge to main
  - `bundle-size.yml` — enforces First Load JS budget
- **CDN caching**: 1-year immutable on `/_next/static`, 30-day + SWR on `/_next/image`, 1-day + SWR on sitemap and RSS

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Output: 56 static pages + 2 dynamic (sitemap, RSS) + 1 API route.

## Environment variables (optional)

Set in Vercel project settings or `.env.local`:

- `NEXT_PUBLIC_GSC_VERIFICATION` — Google Search Console verification meta
- `NEXT_PUBLIC_BING_VERIFICATION` — Bing Webmaster Tools verification meta
- `NEXT_PUBLIC_YANDEX_VERIFICATION` — Yandex Webmaster verification meta
- `NEXT_PUBLIC_PINTEREST_VERIFICATION` — Pinterest domain verification meta
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID (optional)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — Plausible domain for privacy-first analytics (optional)
- `INDEXNOW_KEY` — IndexNow API key (used by the sitemap-ping workflow)

## Contact

- Email: kalytamykhailo18@gmail.com
- WhatsApp: [+1 (737) 825-5259](https://wa.me/17378255259)
- GitHub: [@kalytamykhailo18-cyber](https://github.com/kalytamykhailo18-cyber)

## License

Portfolio content (text, images, project descriptions) © Ariam Garcia Balmaseda — all rights reserved.
The site source code is [MIT-licensed](./LICENSE) so anyone can learn from the structure.
