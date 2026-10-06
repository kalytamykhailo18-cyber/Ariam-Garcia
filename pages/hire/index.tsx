import Head from 'next/head';
import Link from 'next/link';
import { hireRoles } from '../../lib/hire';
import { personalInfo, clientProof } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SITE_URL = 'https://ariam-garcia.vercel.app';
const URL = `${SITE_URL}/hire`;
const TITLE = `Hire ${personalInfo.name} — Full-Stack, AI, Blockchain, Security, Fintech`;
const DESCRIPTION = 'Hire Ariam Garcia Balmaseda for full-stack development, AI engineering, blockchain, security engineering, business automation, fintech, WhatsApp API or booking systems. 50+ delivered projects at a 5.00 rating.';

export default function HireIndex() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Roles you can hire Ariam Garcia Balmaseda for',
    url: URL,
    itemListElement: hireRoles.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/hire/${r.slug}`,
      name: r.role,
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Hire', item: URL },
    ],
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="website" />
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
        <main id="main-content" className="mx-auto max-w-5xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Hire</span>
          </nav>

          <header className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hire {personalInfo.name}</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mb-6">
              Nine disciplines, one engineer. Every one backed by projects running in production right now, not by a certification. Pick the one closest to your problem — or send a brief and I will tell you which it actually is.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span className="text-amber-400">★★★★★</span>
              <span>{clientProof.delivered} projects delivered · {clientProof.average} rating · {clientProof.repeatClients} repeat clients</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hireRoles.map((r) => (
              <Link key={r.slug} href={`/hire/${r.slug}`} className="block p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition group">
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300">{r.role}</h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">{r.intro}</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.alsoSearchedAs.slice(0, 3).map((alt) => (
                    <span key={alt} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">{alt}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <section className="mt-16 p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
            <h2 className="text-2xl font-semibold text-white mb-3">Not sure which one?</h2>
            <p className="text-slate-300 mb-6">
              Send a written description of what the business is losing today. I come back with which role this actually is and a concrete plan against it.
            </p>
            <Link href="/contact" className="inline-block px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
              Contact →
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
