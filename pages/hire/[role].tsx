import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import { hireRoles, HireRole } from '../../lib/hire';
import { services } from '../../lib/services';
import { projects, personalInfo, clientProof } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SITE_URL } from '../../lib/site';
import { seoTitle, seoDescription } from '../../lib/seo';


interface Props {
  role: HireRole;
  proof: typeof projects;
  otherRoles: HireRole[];
  relatedService: { slug: string; title: string } | null;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: hireRoles.map((r) => ({ params: { role: r.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.role as string;
  const role = hireRoles.find((r) => r.slug === slug);
  if (!role) return { notFound: true };
  const proof = projects.filter((p) => role.proofProjectIds.includes(p.id));
  const svc = services.find((s) => s.slug === role.relatedServiceSlug);
  return {
    props: {
      role,
      proof,
      otherRoles: hireRoles.filter((r) => r.slug !== slug),
      relatedService: svc ? { slug: svc.slug, title: svc.title } : null,
    },
    revalidate: 86400,
  };
};

export default function HirePage({ role, proof, otherRoles, relatedService }: Props) {
  const url = `${SITE_URL}/hire/${role.slug}`;
  const ogImage = proof[0] ? `${SITE_URL}${proof[0].image}` : `${SITE_URL}/og-image.png`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${role.role} — ${personalInfo.name}`,
    description: role.metaDescription,
    url,
    image: `${SITE_URL}/photo.jpg`,
    priceRange: '$$',
    areaServed: 'Worldwide',
    serviceType: role.role,
    provider: {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: personalInfo.name,
      url: SITE_URL,
      jobTitle: role.role,
      sameAs: [personalInfo.github],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: role.faq.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Hire', item: `${SITE_URL}/hire` },
      { '@type': 'ListItem', position: 3, name: role.role, item: url },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle(`${role.metaTitle} · ${personalInfo.name}`)}</title>
        <meta name="description" content={seoDescription(role.metaDescription)} />
        <meta name="keywords" content={role.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={role.metaTitle} />
        <meta property="og:description" content={role.metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={role.metaTitle} />
        <meta name="twitter:description" content={role.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main id="main-content" className="mx-auto max-w-5xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/hire" className="hover:text-white">Hire</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{role.role}</span>
          </nav>

          <header className="grid md:grid-cols-[1fr_200px] gap-10 items-start mb-16">
            <div>
              <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3 font-semibold">{role.role}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{role.h1}</h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">{role.intro}</p>
              <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
                <span className="text-amber-400">★★★★★</span>
                <span>{clientProof.delivered} projects delivered · {clientProof.average} rating · {clientProof.repeatClients} repeat clients</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
                  Send a brief
                </Link>
                {relatedService && (
                  <Link href={`/services/${relatedService.slug}`} className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
                    Service details
                  </Link>
                )}
              </div>
            </div>
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-2xl overflow-hidden border border-indigo-500/30">
              <Image src="/photo.jpg" alt={`${personalInfo.name} — ${role.role}`} fill className="object-cover object-top" sizes="192px" />
            </div>
          </header>

          <section className="mb-14 p-6 rounded-xl border-l-4 border-indigo-500 bg-slate-900/40">
            <h2 className="text-xl font-semibold text-white mb-3">The part most people get wrong</h2>
            <p className="text-slate-300 leading-relaxed">{role.theRealProblem}</p>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">What you get</h2>
            <ul className="space-y-3">
              {role.whatIBring.map((item, i) => (
                <li key={i} className="flex gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-indigo-400 font-bold shrink-0">→</span>
                  <span className="text-slate-200 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {proof.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-semibold text-white mb-6">Proof — shipped and in production</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {proof.map((p) => (
                  <Link key={p.id} href={`/projects/${p.id}`} className="block group rounded-xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition">
                    <div className="relative aspect-video bg-slate-900">
                      <Image src={p.image} alt={`${p.title} — ${p.tech.slice(0, 3).join(', ')}`} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 mb-2">{p.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-3">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently asked</h2>
            <div className="space-y-4">
              {role.faq.map((f, i) => (
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

          <section className="mb-14">
            <h2 className="text-lg font-semibold text-white mb-3">This role is also called</h2>
            <ul className="flex flex-wrap gap-2">
              {role.alsoSearchedAs.map((alt) => (
                <li key={alt} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-sm text-slate-400">{alt}</li>
              ))}
            </ul>
          </section>

          <section className="mb-14 p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
            <h2 className="text-2xl font-semibold text-white mb-3">Start with a written brief</h2>
            <p className="text-slate-300 mb-6">
              Describe what the business is losing today and what the target outcome looks like. I come back with a concrete plan against that document — in English, Spanish or Portuguese.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${personalInfo.email}`} className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">Email</a>
              <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">WhatsApp</a>
              <Link href="/faq" className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">Read the FAQ</Link>
            </div>
          </section>

          <section className="mt-16 pt-10 border-t border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-6">Other roles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherRoles.map((r) => (
                <Link key={r.slug} href={`/hire/${r.slug}`} className="block p-4 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition">
                  <h3 className="text-base font-semibold text-white">{r.role}</h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">{r.intro}</p>
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
