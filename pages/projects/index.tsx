import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { projects, personalInfo } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SITE_URL } from '../../lib/site';
import { seoTitle, seoDescription } from '../../lib/seo';

const URL = `${SITE_URL}/projects`;
const TITLE = `Portfolio · Projects · ${personalInfo.name}`;
const DESCRIPTION = 'Full portfolio of 32 shipped software projects — ticketing platforms, AI CRMs, elderly-SOS platforms, wholesale ERPs, Solana DEXes, mobile apps, security incident response. Delivered in production for clients across LATAM, Europe and the US.';

export default function ProjectsIndex() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    url: URL,
    description: DESCRIPTION,
    hasPart: projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      url: `${SITE_URL}/projects/${p.id}`,
      image: `${SITE_URL}${p.image}`,
      description: p.description,
      keywords: p.tech.join(', '),
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: URL },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main id="main-content" className="mx-auto max-w-6xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Projects</span>
          </nav>

          <header className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Portfolio</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              {projects.length} shipped software projects across ticketing, CRM, healthcare, elderly-monitoring, ERP, SaaS, blockchain and mobile. Every entry links to a case-study page with the business problem, the technical shape and the numbers after launch.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="block group">
                <article className="rounded-xl overflow-hidden border border-slate-800 group-hover:border-indigo-500/50 transition h-full flex flex-col">
                  <div className="relative aspect-video bg-slate-900">
                    <Image src={p.image} alt={`${p.title} — ${p.tech.slice(0, 3).join(', ')} project screenshot`} fill className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-white group-hover:text-indigo-300 mb-2 leading-snug">{p.title}</h2>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">{p.description}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
