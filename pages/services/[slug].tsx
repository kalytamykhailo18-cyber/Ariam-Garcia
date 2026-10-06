import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { services, Service } from '../../lib/services';
import { projects, personalInfo } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SITE_URL } from '../../lib/site';
import { seoTitle, seoDescription } from '../../lib/seo';


interface Props {
  service: Service;
  featured: typeof projects;
  otherServices: Service[];
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: services.map((s) => ({ params: { slug: s.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { notFound: true };
  const featured = projects.filter((p) => service.featuredProjectIds.includes(p.id));
  const otherServices = services.filter((s) => s.slug !== slug);
  return {
    props: { service, featured, otherServices },
    // ISR: Vercel rebuilds the page in the background once/day so lastmod stays current.
    revalidate: 86400,
  };
};

export default function ServicePage({ service, featured, otherServices }: Props) {
  const url = `${SITE_URL}/services/${service.slug}`;
  const ogImage = featured[0] ? `${SITE_URL}${featured[0].image}` : `${SITE_URL}/og-image.png`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    url,
    provider: {
      '@type': 'Person',
      name: personalInfo.name,
      url: SITE_URL,
      image: `${SITE_URL}/photo.jpg`,
      sameAs: [personalInfo.github],
    },
    areaServed: 'Worldwide',
    serviceType: service.title,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.whatYouGet.map((w, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: w },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: url },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle(`${service.title} · ${personalInfo.name}`)}</title>
        <meta name="description" content={seoDescription(service.metaDescription)} />
        <meta name="keywords" content={service.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />

        <link rel="alternate" hrefLang="en" href={url} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/es/services/${service.slug}`} />
        <link rel="alternate" hrefLang="pt" href={`${SITE_URL}/pt/services/${service.slug}`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${SITE_URL}/pt/services/${service.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.title} />
        <meta name="twitter:description" content={service.metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{service.title}</span>
          </nav>

          <header className="mb-14">
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3 font-semibold">{service.tagline}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{service.title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">{service.heroBody}</p>
          </header>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-4">Why it matters</h2>
            <p className="text-slate-300 leading-relaxed max-w-3xl">{service.whyItMatters}</p>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">What you get</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.whatYouGet.map((item, i) => (
                <li key={i} className="flex gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-indigo-400 font-bold shrink-0">→</span>
                  <span className="text-slate-200 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-4">Stack</h2>
            <ul className="flex flex-wrap gap-2">
              {service.stack.map((s) => (
                <li key={s} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-sm text-slate-200">{s}</li>
              ))}
            </ul>
          </section>

          {featured.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-semibold text-white mb-6">Delivered projects using this stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featured.map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="block p-5 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-3">{p.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently asked questions</h2>
            <div className="space-y-6">
              {service.faq.map((f, i) => (
                <details key={i} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 group">
                  <summary className="font-semibold text-white cursor-pointer flex justify-between items-center">
                    <span>{f.q}</span>
                    <span className="text-indigo-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-slate-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-14 p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
            <h2 className="text-2xl font-semibold text-white mb-3">Ready to start?</h2>
            <p className="text-slate-300 mb-6">Send a written brief with the business problem to solve. I come back with a concrete plan against that document, in the client&apos;s language.</p>
            <Link href="/#contact" className="inline-block px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
              Contact →
            </Link>
          </section>

          <section className="mt-16 pt-10 border-t border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-6">Other services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="block p-4 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition"
                >
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
