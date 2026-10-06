import Head from 'next/head';
import Link from 'next/link';
import { personalInfo } from '../lib/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SITE_URL = 'https://ariam-garcia.vercel.app';
const URL = `${SITE_URL}/uses`;
const TITLE = `Uses · Developer Stack · ${personalInfo.name}`;
const DESCRIPTION = 'The tools, editors, terminals, extensions, hardware, and services Ariam Garcia Balmaseda actually uses day-to-day for shipping custom software — Next.js, VS Code, DigitalOcean, PostgreSQL, Claude API and more.';

interface UsesItem {
  name: string;
  desc: string;
  url?: string;
}
interface UsesSection {
  title: string;
  items: UsesItem[];
}

const SECTIONS: UsesSection[] = [
  {
    title: 'Editor & terminal',
    items: [
      { name: 'VS Code', desc: 'Primary editor. Pinned settings sync via GitHub Gist.', url: 'https://code.visualstudio.com' },
      { name: 'GitHub Copilot', desc: 'Inline suggestions on. Autocomplete off in prose.' },
      { name: 'Claude Code CLI', desc: 'Agentic terminal for repo-wide edits and refactors.', url: 'https://claude.com/claude-code' },
      { name: 'Windows Terminal + PowerShell 5.1', desc: 'Primary shell on Windows.' },
      { name: 'Git Bash', desc: 'POSIX scripts and pipelines that PowerShell cannot express cleanly.' },
      { name: 'oh-my-posh', desc: 'Prompt with git status, node/python version, exit code.' },
    ],
  },
  {
    title: 'Web framework & runtime',
    items: [
      { name: 'Next.js 14/15/16', desc: 'Default for every full-stack web project. Pages Router unless the client asks for App Router.', url: 'https://nextjs.org' },
      { name: 'TypeScript 5.x', desc: 'Strict mode enabled by default.' },
      { name: 'Node.js 20 LTS', desc: 'On the server, in Docker containers.' },
      { name: 'NestJS 10', desc: 'When the backend is complex enough to earn dependency injection.', url: 'https://nestjs.com' },
      { name: 'TailwindCSS 3', desc: 'Every project. Handwritten CSS only for hard cases.', url: 'https://tailwindcss.com' },
      { name: 'Framer Motion', desc: 'Interaction and page transitions on marketing sites.' },
    ],
  },
  {
    title: 'Database & ORM',
    items: [
      { name: 'PostgreSQL 16', desc: 'Default DB. Runs on the same droplet as the app for most projects.', url: 'https://www.postgresql.org' },
      { name: 'Prisma', desc: 'Type-safe ORM. Migrations in production behind a schema-drift guard.', url: 'https://www.prisma.io' },
      { name: 'Redis 7', desc: 'Sessions, rate limits, ephemeral job queues.' },
      { name: 'pgvector', desc: 'Embeddings when RAG grounds an AI feature on a live catalog.' },
    ],
  },
  {
    title: 'AI & LLM',
    items: [
      { name: 'Anthropic Claude Sonnet 5', desc: 'Primary reasoning model for AI CRMs.', url: 'https://www.anthropic.com/claude' },
      { name: 'Anthropic Claude Haiku 4.5', desc: 'Router / classifier model. 60-80% cost cut vs Sonnet-only.' },
      { name: 'OpenAI Whisper', desc: 'Voice-note transcription in WhatsApp bots.' },
      { name: 'LangChain', desc: 'Occasional — when the pipeline needs it and only then.' },
      { name: 'Ollama + Llama 3.3 70B', desc: 'Local inference for data-residency clients.', url: 'https://ollama.com' },
    ],
  },
  {
    title: 'Infrastructure & deploy',
    items: [
      { name: 'DigitalOcean', desc: 'Default droplet host. USD 6-24 covers most small SaaS.', url: 'https://www.digitalocean.com' },
      { name: 'Vercel', desc: 'Marketing sites and portfolios. This site runs on it.', url: 'https://vercel.com' },
      { name: 'Docker + Docker Compose', desc: 'One compose file per project. app + db + reverse proxy.' },
      { name: 'Caddy', desc: 'Automatic HTTPS, sane defaults. Preferred over nginx for new projects.', url: 'https://caddyserver.com' },
      { name: 'GitHub Actions', desc: 'CI/CD, Lighthouse audits, sitemap pings.' },
      { name: 'macos-26 runner', desc: 'For iOS Xcode builds on GitHub Actions.' },
      { name: 'rclone', desc: 'Google Drive backups from every production droplet.', url: 'https://rclone.org' },
    ],
  },
  {
    title: 'Testing & observability',
    items: [
      { name: 'Playwright', desc: 'E2E on every serious project. 263-test sweep on the Servifibras CRM.', url: 'https://playwright.dev' },
      { name: 'Vitest', desc: 'Unit test runner for TypeScript projects.' },
      { name: 'Sentry', desc: 'Error tracking. Free tier is generous.' },
      { name: 'Vercel Speed Insights', desc: 'Real User Monitoring for Core Web Vitals.' },
    ],
  },
  {
    title: 'Payments & messaging',
    items: [
      { name: 'Stripe', desc: 'Checkout, Billing, Connect, Split, MSI for Mexico.', url: 'https://stripe.com' },
      { name: 'MercadoPago', desc: 'LATAM default. Signed HMAC webhooks are the boring part that matters.', url: 'https://www.mercadopago.com' },
      { name: 'WhatsApp Business Cloud API', desc: 'Official — via a Business Solution Provider. Never Baileys, never Evolution.' },
      { name: 'Twilio', desc: 'Outbound voice calls when a call-center escalation is part of the product.' },
    ],
  },
  {
    title: 'Blockchain',
    items: [
      { name: 'Foundry + Hardhat', desc: 'EVM contract development and testing.', url: 'https://book.getfoundry.sh' },
      { name: 'Anchor + Rust', desc: 'Solana program framework of choice.', url: 'https://www.anchor-lang.com' },
      { name: 'OpenZeppelin', desc: 'ERC-20 / ERC-721 base contracts.' },
      { name: 'Chainlink Functions', desc: 'Off-chain data on-chain — reserve verification, oracle updates.' },
    ],
  },
  {
    title: 'Browser & productivity',
    items: [
      { name: 'Chrome', desc: 'Development. Real Chromium for headless screenshots too.' },
      { name: 'Notion', desc: 'Personal notes and client-facing briefs.', url: 'https://www.notion.so' },
      { name: 'AnyDesk', desc: 'When a client needs help configuring their own machine.' },
      { name: 'DBeaver', desc: 'Universal DB client. Postgres, MySQL, SQL Server, MongoDB in one app.', url: 'https://dbeaver.io' },
    ],
  },
  {
    title: 'Hardware',
    items: [
      { name: 'Supermicro X9DRD bare-metal server', desc: 'Dev host — 128 GB RAM, dual Xeon E5-2689.' },
      { name: 'Jump Desktop', desc: 'Remote desktop to the dev host from anywhere.', url: 'https://jumpdesktop.com' },
    ],
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Developer stack used by Ariam Garcia Balmaseda',
  url: URL,
  itemListElement: SECTIONS.flatMap((section, si) =>
    section.items.map((item, ii) => ({
      '@type': 'ListItem',
      position: si * 100 + ii + 1,
      item: {
        '@type': 'Thing',
        name: item.name,
        description: item.desc,
        ...(item.url ? { url: item.url } : {}),
      },
    })),
  ),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Uses', item: URL },
  ],
};

export default function UsesPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main id="main-content" className="mx-auto max-w-4xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Uses</span>
          </nav>

          <header className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Uses</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              The tools, editors, services and hardware I actually use day-to-day. This page is part of the <a href="https://uses.tech" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">uses.tech</a> directory of developer stacks.
            </p>
          </header>

          {SECTIONS.map((section) => (
            <section key={section.title} className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <div key={item.name} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-indigo-300">{item.name} ↗</a>
                    ) : (
                      <span className="font-semibold text-white">{item.name}</span>
                    )}
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-16 p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
            <h2 className="text-xl font-semibold text-white mb-3">Want to see any of these in action?</h2>
            <p className="text-slate-300 mb-6">Every project on the portfolio is built with a subset of the stack above. Read a case study or send a brief.</p>
            <Link href="/blog" className="inline-block px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition mr-3">Case studies</Link>
            <Link href="/contact" className="inline-block px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">Contact</Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
