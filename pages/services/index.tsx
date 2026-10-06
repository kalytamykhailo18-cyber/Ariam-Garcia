import Head from 'next/head';
import Link from 'next/link';
import { services } from '../../lib/services';
import { personalInfo } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SITE_URL } from '../../lib/site';
import { seoTitle, seoDescription } from '../../lib/seo';

const URL = `${SITE_URL}/services`;
const TITLE = `Services · ${personalInfo.name}`;
const DESCRIPTION = 'Custom software development services: booking systems, operations automation, AI CRMs, blockchain platforms, mobile apps. Delivered as code the client owns.';

export default function ServicesIndex() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: URL },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Custom Software Development Services',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/services/${s.slug}`,
      name: s.title,
    })),
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Services</span>
          </nav>

          <header className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Services</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              Five services, delivered as code the client owns, on infrastructure the client controls. Every engagement starts from what the business is losing today, not from a feature list.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="block p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition group"
              >
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300">{s.title}</h2>
                <p className="text-indigo-400 text-sm mb-3">{s.tagline}</p>
                <p className="text-sm text-slate-400 line-clamp-3">{s.metaDescription}</p>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
