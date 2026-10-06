import Head from 'next/head';
import Link from 'next/link';
import { personalInfo } from '../lib/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SITE_URL = 'https://ariam-garcia.vercel.app';
const URL = `${SITE_URL}/faq`;
const TITLE = `Frequently Asked Questions · ${personalInfo.name}`;
const DESCRIPTION = 'Answers to the most common questions about hiring Ariam Garcia Balmaseda — pricing, workflow, stack, warranty, escrow, communication, portfolio access.';

const FAQ: { section: string; items: { q: string; a: string }[] }[] = [
  {
    section: 'Hiring & workflow',
    items: [
      {
        q: 'What is the smallest engagement you take?',
        a: 'A single deliverable — a landing page, a fix to a broken integration, a Playwright suite for an existing app. Small engagements are usually 5–20 hours and often turn into longer relationships. There is no minimum budget wall.',
      },
      {
        q: 'How do you price fixed-price projects?',
        a: 'Honest scope × USD 10/hour, delivered as a written budget in the proposal document. The rate does not vary. What varies is the scope, and the client is always shown which pieces would slide out to hit a specific number.',
      },
      {
        q: 'How does Workana escrow work in a fixed-price project?',
        a: 'Workana locks the full project budget in escrow at the moment the client accepts the proposal. From there, each milestone I complete triggers a release from that already-locked escrow — the client is never asked for additional funds mid-project. The client controls the release timing and the sign-off on each milestone.',
      },
      {
        q: 'Do you work hourly?',
        a: 'Yes, on Workana Hourly contracts. The client approves the logged hours when they want and releases payment at their own pace — there is no automatic weekly billing (that is Upwork). Hourly is the right shape for open-ended maintenance and evolution work; fixed-price is the right shape for a defined deliverable.',
      },
      {
        q: 'Do you sign an NDA?',
        a: 'Yes, when there is genuinely proprietary information to protect. In practice, most "secret ideas" are variations of known patterns and the moat is in execution speed, not in secrecy. An NDA does not delay the work — it is signed the same day it is requested.',
      },
    ],
  },
  {
    section: 'Stack, infrastructure & ownership',
    items: [
      {
        q: 'What stack do you use by default?',
        a: 'Next.js 14/15 (Pages or App Router) + NestJS or Node.js + PostgreSQL + Prisma + TailwindCSS + TypeScript. This is the stack that has shipped the most reliably across 50+ delivered projects. It is also the stack most other senior developers can pick up if the client ever needs to hand it over.',
      },
      {
        q: 'Where does the code and the data live?',
        a: 'On the client\'s own DigitalOcean droplet by default. Never on AWS, never on Vercel, never on Supabase. PostgreSQL runs on the same droplet as the application. The GitHub repository is transferred to the client\'s organization at delivery — the client owns everything.',
      },
      {
        q: 'Do you use no-code / low-code tools?',
        a: 'No. Not Bubble, Webflow, Wix, WordPress, Shopify, Odoo, Zoho, Zapier, Make, n8n, PowerBI, Airtable, FlutterFlow, Glide, Memberstack, PrestaShop, Moodle. Every project is written in code the client owns and can hand to any other senior developer without training.',
      },
      {
        q: 'What about AI stack — GPT, Claude, Gemini, local models?',
        a: 'Anthropic Claude Sonnet 5 for reasoning, Haiku 4.5 for routing, chosen per turn by a complexity classifier. GPT-5 and Gemini available as fallbacks. Local models are considered when a client has strict data-residency requirements — usually Llama 3.3 70B via Ollama on a dedicated GPU droplet.',
      },
    ],
  },
  {
    section: 'Communication & timezone',
    items: [
      {
        q: 'What timezone do you work in?',
        a: 'The client\'s timezone. I sync to their working hours so the daily written update lands before their morning standup, not after their day is over.',
      },
      {
        q: 'Do you take calls or video meetings?',
        a: 'Not before the contract is active. Two reasons: Workana policy requires conversations to stay on-platform until the project is contracted, and written alignment produces higher-quality decisions than a 20-minute sales call. After the contract is signed, an async written cadence works better than recurring meetings — but if a call is genuinely useful, it happens.',
      },
      {
        q: 'How fast do you reply?',
        a: 'Same day during the client\'s working hours, usually within 2–4 hours. If a reply will take longer (because I am mid-flow on a shipping task), the client gets a one-line acknowledgment with the ETA. Silence is never the answer.',
      },
      {
        q: 'What languages do you write in?',
        a: 'English, Spanish and Portuguese in writing. I reply in the client\'s preferred language. Voice conversations happen in English.',
      },
    ],
  },
  {
    section: 'Warranty & after delivery',
    items: [
      {
        q: 'Is there a warranty?',
        a: 'Yes. A 60-day warranty covers any behavioral defect free of charge from the delivery date. Warranty covers "the code does something other than what was specified" — it does not cover new feature requests, which are quoted separately.',
      },
      {
        q: 'Do you offer ongoing maintenance?',
        a: 'Yes, on demand, charged per hour actually worked. No monthly subscription unless the client specifically requests one. Most clients stay in touch for evolution work (new features, new integrations), not for keep-it-running maintenance.',
      },
      {
        q: 'What happens if I want to add a feature 6 months later?',
        a: 'Send a written description of the feature. I come back with a written scope, an hours estimate, and a target ship date. If it fits inside a day, it is often absorbed as a courtesy. If it is a real feature, it is quoted at the same USD 10/hour rate.',
      },
      {
        q: 'Can I see the source code of your other projects?',
        a: 'No. Every client project is owned by that client — I do not distribute the source of paid work. Public URLs, screenshots, video walkthroughs and testimonials are the artifacts I share. A fresh 5-hour prototype for the new engagement is often faster than any tour of prior work anyway.',
      },
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.flatMap((section) =>
    section.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  ),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: URL },
  ],
};

export default function FAQPage() {
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">FAQ</span>
          </nav>

          <header className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently asked questions</h1>
            <p className="text-lg text-slate-300 leading-relaxed">Answers to what almost every prospective client asks before hiring.</p>
          </header>

          {FAQ.map((section) => (
            <section key={section.section} className="mb-14">
              <h2 className="text-2xl font-semibold text-white mb-6">{section.section}</h2>
              <div className="space-y-4">
                {section.items.map((f, i) => (
                  <details key={i} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 group">
                    <summary className="font-semibold text-white cursor-pointer flex justify-between items-center gap-4">
                      <span>{f.q}</span>
                      <span className="text-indigo-400 group-open:rotate-45 transition-transform shrink-0">+</span>
                    </summary>
                    <p className="mt-4 text-slate-300 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-16 pt-10 border-t border-slate-800">
            <p className="text-slate-300 mb-6">
              Have a question that is not answered here? Send it in writing — I reply the same day in the client&apos;s language.
            </p>
            <Link href="/#contact" className="inline-block px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
              Contact →
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
