import Head from 'next/head';
import Link from 'next/link';
import { personalInfo } from '../lib/data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SITE_URL } from '../lib/site';
import { seoTitle, seoDescription } from '../lib/seo';

const URL = `${SITE_URL}/contact`;
const TITLE = `Contact · ${personalInfo.name}`;
const DESCRIPTION = 'Contact Ariam Garcia Balmaseda — senior full-stack developer. Reply same day by email or WhatsApp, in English, Spanish or Portuguese.';

export default function Contact() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: TITLE,
    url: URL,
    description: DESCRIPTION,
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: personalInfo.name,
      email: personalInfo.email,
      telephone: personalInfo.phone,
      url: SITE_URL,
      contactPoint: [
        { '@type': 'ContactPoint', contactType: 'sales', email: personalInfo.email, telephone: personalInfo.phone, availableLanguage: ['English', 'Spanish', 'Portuguese'], areaServed: 'Worldwide' },
        { '@type': 'ContactPoint', contactType: 'technical support', email: personalInfo.email, availableLanguage: ['English', 'Spanish', 'Portuguese'] },
      ],
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: URL },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle(TITLE)}</title>
        <meta name="description" content={seoDescription(DESCRIPTION)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main id="main-content" className="mx-auto max-w-3xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Contact</span>
          </nav>

          <header className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact</h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Same-day reply during your working hours, in English, Spanish or Portuguese. Text-only until a project is contracted, then whatever channel works.
            </p>
          </header>

          <section className="grid md:grid-cols-2 gap-6 mb-14">
            <a href={`mailto:${personalInfo.email}`} className="p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition group">
              <p className="text-sm text-indigo-400 mb-2 font-semibold uppercase tracking-widest">Email</p>
              <p className="text-lg text-white group-hover:text-indigo-300 break-all">{personalInfo.email}</p>
              <p className="text-sm text-slate-400 mt-2">Best for detailed briefs and written scopes.</p>
            </a>

            <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition group">
              <p className="text-sm text-indigo-400 mb-2 font-semibold uppercase tracking-widest">WhatsApp</p>
              <p className="text-lg text-white group-hover:text-indigo-300">{personalInfo.phone}</p>
              <p className="text-sm text-slate-400 mt-2">Best for quick questions after a first email.</p>
            </a>



            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition group">
              <p className="text-sm text-indigo-400 mb-2 font-semibold uppercase tracking-widest">GitHub</p>
              <p className="text-lg text-white group-hover:text-indigo-300">See the code</p>
              <p className="text-sm text-slate-400 mt-2">Open source work and this site&apos;s own source.</p>
            </a>
          </section>

          <section className="mb-14 p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4">What to include in the first message</h2>
            <ul className="space-y-2 text-slate-300 text-sm leading-relaxed">
              <li>· What the business is losing today (in one or two sentences).</li>
              <li>· What the target outcome looks like (as concretely as you can).</li>
              <li>· Any constraints — hard deadlines, existing stack, integrations required.</li>
              <li>· Preferred language for the working conversation.</li>
            </ul>
            <p className="text-slate-400 text-sm mt-4">
              A structured brief cuts the discovery phase in half and produces a much sharper first-scope reply.
            </p>
          </section>

          <section className="text-center">
            <p className="text-slate-400 mb-4">Before writing, browse the answers most clients ask for first:</p>
            <Link href="/faq" className="inline-block px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
              Read the FAQ →
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
