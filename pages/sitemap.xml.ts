import { GetServerSideProps } from 'next';
import { projects } from '../lib/data';
import { services } from '../lib/services';
import { posts } from '../lib/blog';
import { hireRoles } from '../lib/hire';
import { SITE_URL, SITE_UPDATED } from '../lib/site';

function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}


function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlBlock(loc: string, lastmod: string, changefreq: string, priority: string, alts?: { hreflang: string; href: string }[], images?: { loc: string; title: string; caption: string }[]): string {
  const altXml = alts
    ? alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n')
    : '';
  const imageXml = images
    ? images.map((img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${xmlEscape(img.title)}</image:title>
      <image:caption>${xmlEscape(img.caption)}</image:caption>
    </image:image>`).join('\n')
    : '';
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${altXml ? '\n' + altXml : ''}${imageXml ? '\n' + imageXml : ''}
  </url>`;
}

function buildSitemap(): string {
  // A stable date: a lastmod that changes on every request teaches Google to ignore it.
  const today = SITE_UPDATED;

  const homeAlts = [
    { hreflang: 'en', href: SITE_URL + '/' },
    { hreflang: 'es', href: SITE_URL + '/es' },
    { hreflang: 'pt', href: SITE_URL + '/pt' },
    { hreflang: 'pt-BR', href: SITE_URL + '/pt' },
    { hreflang: 'x-default', href: SITE_URL + '/' },
  ];

  const urls: string[] = [];

  // Home in three languages
  urls.push(urlBlock(SITE_URL + '/', today, 'weekly', '1.0', homeAlts));
  urls.push(urlBlock(SITE_URL + '/es', today, 'weekly', '0.9', homeAlts));
  urls.push(urlBlock(SITE_URL + '/pt', today, 'weekly', '0.9', homeAlts));

  // Hub pages
  urls.push(urlBlock(SITE_URL + '/hire', today, 'weekly', '0.95'));
  urls.push(urlBlock(SITE_URL + '/services', today, 'monthly', '0.9'));
  urls.push(urlBlock(SITE_URL + '/projects', today, 'weekly', '0.9'));
  urls.push(urlBlock(SITE_URL + '/blog', today, 'weekly', '0.9'));
  urls.push(urlBlock(SITE_URL + '/about', today, 'monthly', '0.8'));
  urls.push(urlBlock(SITE_URL + '/contact', today, 'monthly', '0.8'));
  urls.push(urlBlock(SITE_URL + '/uses', today, 'monthly', '0.7'));
  urls.push(urlBlock(SITE_URL + '/faq', today, 'monthly', '0.7'));

  // Hire cluster — highest commercial intent, highest priority after home
  hireRoles.forEach((r) => urls.push(urlBlock(SITE_URL + '/hire/' + r.slug, today, 'weekly', '0.9')));

  // Services — English + localized ES/PT, cross-linked with hreflang alternates
  services.forEach((s) => {
    const alts = [
      { hreflang: 'en', href: `${SITE_URL}/services/${s.slug}` },
      { hreflang: 'es', href: `${SITE_URL}/es/services/${s.slug}` },
      { hreflang: 'pt', href: `${SITE_URL}/pt/services/${s.slug}` },
      { hreflang: 'x-default', href: `${SITE_URL}/services/${s.slug}` },
    ];
    urls.push(urlBlock(SITE_URL + '/services/' + s.slug, today, 'monthly', '0.8', alts));
    urls.push(urlBlock(SITE_URL + '/es/services/' + s.slug, today, 'monthly', '0.7', alts));
    urls.push(urlBlock(SITE_URL + '/pt/services/' + s.slug, today, 'monthly', '0.7', alts));
  });

  // Blog posts
  posts.forEach((p) =>
    urls.push(urlBlock(SITE_URL + '/blog/' + p.slug, p.updatedAt || p.publishedAt, 'monthly', '0.7')),
  );

  // Blog tag pages (long-tail SEO)
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  tagSet.forEach((t) => urls.push(urlBlock(SITE_URL + '/blog/tag/' + tagSlug(t), today, 'monthly', '0.6')));

  // Projects with image sitemap entries
  projects.forEach((p) => {
    const imgs = p.image
      ? [{ loc: SITE_URL + p.image, title: p.title, caption: p.description }]
      : undefined;
    urls.push(urlBlock(SITE_URL + '/projects/' + p.id, today, 'monthly', '0.7', undefined, imgs));
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = buildSitemap();
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.write(sitemap);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
