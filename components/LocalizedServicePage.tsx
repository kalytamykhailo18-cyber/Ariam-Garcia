import Head from 'next/head';
import Link from 'next/link';
import { LocalizedService } from '../lib/services-i18n';
import { services } from '../lib/services';
import { projects, personalInfo, clientProof } from '../lib/data';
import Navbar from './Navbar';
import Footer from './Footer';
import { SITE_URL } from '../lib/site';
import { seoTitle, seoDescription } from '../lib/seo';


type Locale = 'es' | 'pt';

const COPY = {
  es: {
    home: 'Inicio',
    services: 'Servicios',
    whyItMatters: 'Por qué importa',
    whatYouGet: 'Qué recibís',
    stack: 'Stack',
    delivered: 'Proyectos entregados con este stack',
    faq: 'Preguntas frecuentes',
    ctaTitle: '¿Listo para arrancar?',
    ctaBody: 'Mandame un brief escrito con el problema de negocio a resolver. Vuelvo con un plan concreto sobre ese documento.',
    ctaButton: 'Contactar',
    other: 'Otros servicios',
    langLabel: 'English',
    altLangLabel: 'Português',
    ratingLine: (a: string, n: string, r: string) => `${n} proyectos entregados · ${a} de calificación · ${r} clientes que recontrataron`,
  },
  pt: {
    home: 'Início',
    services: 'Serviços',
    whyItMatters: 'Por que importa',
    whatYouGet: 'O que você recebe',
    stack: 'Stack',
    delivered: 'Projetos entregues com este stack',
    faq: 'Perguntas frequentes',
    ctaTitle: 'Pronto para começar?',
    ctaBody: 'Me manda um brief escrito com o problema de negócio a resolver. Volto com um plano concreto sobre esse documento.',
    ctaButton: 'Entrar em contato',
    other: 'Outros serviços',
    langLabel: 'English',
    altLangLabel: 'Español',
    ratingLine: (a: string, n: string, r: string) => `${n} projetos entregues · ${a} de avaliação · ${r} clientes que recontrataram`,
  },
} as const;

interface Props {
  locale: Locale;
  service: LocalizedService;
  otherServices: LocalizedService[];
}

export default function LocalizedServicePage({ locale, service, otherServices }: Props) {
  const t = COPY[locale];
  const altLocale: Locale = locale === 'es' ? 'pt' : 'es';
  const url = `${SITE_URL}/${locale}/services/${service.slug}`;
  const enUrl = `${SITE_URL}/services/${service.slug}`;
  const esUrl = `${SITE_URL}/es/services/${service.slug}`;
  const ptUrl = `${SITE_URL}/pt/services/${service.slug}`;

  // Reuse the English service definition for stack + featured projects (language-neutral data).
  const base = services.find((s) => s.slug === service.slug);
  const featured = base ? projects.filter((p) => base.featuredProjectIds.includes(p.id)) : [];
  const ogImage = featured[0] ? `${SITE_URL}${featured[0].image}` : `${SITE_URL}/og-image.png`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    url,
    inLanguage: locale === 'pt' ? 'pt-BR' : 'es',
    provider: {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: personalInfo.name,
      url: SITE_URL,
    },
    areaServed: locale === 'pt' ? ['Brasil', 'Portugal'] : ['Argentina', 'México', 'Chile', 'Colombia', 'España', 'Ecuador', 'Perú'],
    serviceType: service.title,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'pt' ? 'pt-BR' : 'es',
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
      { '@type': 'ListItem', position: 1, name: t.home, item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.services, item: `${SITE_URL}/${locale}/services` },
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
        <meta httpEquiv="content-language" content={locale === 'pt' ? 'pt-BR' : 'es'} />
        <link rel="canonical" href={url} />

        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="es" href={esUrl} />
        <link rel="alternate" hrefLang="pt" href={ptUrl} />
        <link rel="alternate" hrefLang="pt-BR" href={ptUrl} />
        <link rel="alternate" hrefLang="x-default" href={enUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content={locale === 'pt' ? 'pt_BR' : 'es_AR'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={service.title} />
        <meta name="twitter:description" content={service.metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div lang={locale === 'pt' ? 'pt-BR' : 'es'} className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main id="main-content" className="mx-auto max-w-5xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6 flex flex-wrap items-center gap-x-2" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-white">{t.home}</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white">{t.services}</Link>
            <span>/</span>
            <span className="text-slate-200">{service.title}</span>
            <span className="ml-auto flex gap-3">
              <Link href={enUrl.replace(SITE_URL, '')} className="hover:text-white">{t.langLabel}</Link>
              <Link href={`/${altLocale}/services/${service.slug}`} className="hover:text-white">{t.altLangLabel}</Link>
            </span>
          </nav>

          <header className="mb-14">
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3 font-semibold">{service.tagline}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{service.title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">{service.heroBody}</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <span className="text-amber-400">★★★★★</span>
              <span>{t.ratingLine(clientProof.average, clientProof.delivered, clientProof.repeatClients)}</span>
            </div>
          </header>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-4">{t.whyItMatters}</h2>
            <p className="text-slate-300 leading-relaxed max-w-3xl">{service.whyItMatters}</p>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">{t.whatYouGet}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.whatYouGet.map((item, i) => (
                <li key={i} className="flex gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-indigo-400 font-bold shrink-0">→</span>
                  <span className="text-slate-200 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {base && (
            <section className="mb-14">
              <h2 className="text-2xl font-semibold text-white mb-4">{t.stack}</h2>
              <ul className="flex flex-wrap gap-2">
                {base.stack.map((s) => (
                  <li key={s} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-sm text-slate-200">{s}</li>
                ))}
              </ul>
            </section>
          )}

          {featured.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-semibold text-white mb-6">{t.delivered}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featured.map((p) => (
                  <Link key={p.id} href={`/projects/${p.id}`} className="block p-5 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition">
                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-3">{p.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">{t.faq}</h2>
            <div className="space-y-4">
              {service.faq.map((f, i) => (
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

          <section className="mb-14 p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
            <h2 className="text-2xl font-semibold text-white mb-3">{t.ctaTitle}</h2>
            <p className="text-slate-300 mb-6">{t.ctaBody}</p>
            <a href={`mailto:${personalInfo.email}`} className="inline-block px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition mr-3">
              {t.ctaButton} →
            </a>
            <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
              WhatsApp
            </a>
          </section>

          <section className="mt-16 pt-10 border-t border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-6">{t.other}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherServices.map((s) => (
                <Link key={s.slug} href={`/${locale}/services/${s.slug}`} className="block p-4 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition">
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
