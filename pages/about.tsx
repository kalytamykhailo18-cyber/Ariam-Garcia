import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo, clientProof, experiences } from '../lib/data';
import { services } from '../lib/services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SITE_URL } from '../lib/site';
import { seoTitle, seoDescription } from '../lib/seo';

const URL = `${SITE_URL}/about`;
const TITLE = `About · ${personalInfo.name} — Full-Stack Developer`;
const DESCRIPTION = 'About Ariam Garcia Balmaseda — senior full-stack developer, 10+ years of shipping custom software for service businesses. From spreadsheets and paper workflows to Next.js + AI CRM + blockchain. 5.00 rating on Workana.';

export default function About() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: TITLE,
    url: URL,
    description: DESCRIPTION,
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: personalInfo.name,
      url: SITE_URL,
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: URL },
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
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="profile:first_name" content="Ariam" />
        <meta property="profile:last_name" content="Garcia Balmaseda" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main id="main-content" className="mx-auto max-w-4xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">About</span>
          </nav>

          <header className="grid md:grid-cols-[1fr_240px] gap-10 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Ariam Garcia Balmaseda</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Senior full-stack developer with 10+ years shipping custom software for service businesses. Working remotely from Louisville, KY, USA, with clients across Argentina, Mexico, Brazil, Spain, Ecuador, Italy, USA and Colombia.
              </p>
            </div>
            <div className="relative w-56 h-56 mx-auto rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
              <Image src="/photo.jpg" alt={`${personalInfo.name} — Full-Stack Developer, portrait`} fill className="object-cover object-top" />
            </div>
          </header>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-4">The approach</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>Every project starts from what the business is losing today, not from a feature list. The right question is never &ldquo;what does the app do&rdquo;, it is &ldquo;what would the business look like if this one specific bottleneck were solved&rdquo;.</p>
              <p>Everything ships as code the client owns, on infrastructure the client controls. Never a rented SaaS, never a lock-in stack. The repository is transferred at delivery, the database lives on the client&apos;s own DigitalOcean droplet, the API keys are in the client&apos;s own accounts.</p>
              <p>Every deliverable arrives with a 60-day warranty on behavioral defects and a written scope of what is in and out. There are no upsell menus. The proposal is the agreement.</p>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-4">Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
                <p className="text-3xl font-bold text-white mb-1">{clientProof.average}</p>
                <p className="text-sm text-slate-400">Workana rating</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
                <p className="text-3xl font-bold text-white mb-1">{clientProof.delivered}</p>
                <p className="text-sm text-slate-400">Rated projects</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
                <p className="text-3xl font-bold text-white mb-1">{clientProof.repeatClients}</p>
                <p className="text-sm text-slate-400">Repeat clients</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
                <p className="text-3xl font-bold text-white mb-1">10+</p>
                <p className="text-sm text-slate-400">Years shipping</p>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="p-5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                      <p className="text-indigo-400 text-sm">{exp.company} · {exp.location}</p>
                    </div>
                    <span className="text-sm text-slate-500">{exp.period}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-slate-300 text-sm leading-relaxed">
                    {exp.description.map((d, j) => <li key={j}>· {d}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">Services offered</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="block p-4 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition">
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 text-center">
            <h2 className="text-2xl font-semibold text-white mb-3">Ready to talk?</h2>
            <p className="text-slate-300 mb-6">Send a written brief with the business problem to solve. I come back with a concrete plan against that document.</p>
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
