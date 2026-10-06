import { GetServerSideProps } from 'next';
import { posts } from '../lib/blog';
import { personalInfo } from '../lib/data';

const SITE_URL = 'https://ariam-garcia.vercel.app';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildFeed(): string {
  const sorted = [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const lastBuild = new Date(sorted[0]?.updatedAt || sorted[0]?.publishedAt || new Date()).toUTCString();

  const items = sorted
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <dc:creator>${esc(personalInfo.name)}</dc:creator>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(personalInfo.name)} · Case Studies</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>In-depth case studies of shipped software: custom ticketing platforms, AI CRMs with Claude, Solana DEXes, wholesale ERPs, security incident response.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <managingEditor>${personalInfo.email} (${esc(personalInfo.name)})</managingEditor>
    <webMaster>${personalInfo.email} (${esc(personalInfo.name)})</webMaster>
    <image>
      <url>${SITE_URL}/photo.jpg</url>
      <title>${esc(personalInfo.name)}</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = buildFeed();
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.write(feed);
  res.end();
  return { props: {} };
};

export default function RSS() {
  return null;
}
