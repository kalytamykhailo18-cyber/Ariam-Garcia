import type { NextApiRequest, NextApiResponse } from 'next';
import { SITE_URL } from '../../lib/site';

// Served at /robots.txt via a beforeFiles rewrite in next.config.js, so the
// Sitemap line always matches the deployed domain.
// /_next/ must stay crawlable: Google needs the JS/CSS to render pages.
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot',
  'Google-Extended', 'Applebot', 'Applebot-Extended', 'Amazonbot', 'DuckAssistBot', 'CCBot',
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    // AI search / answer engines: explicitly welcome (same rules).
    ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', 'Disallow: /api/', '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.status(200).send(body);
}
