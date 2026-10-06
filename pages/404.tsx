import Head from 'next/head';
import Link from 'next/link';
import { projects, personalInfo } from '../lib/data';
import { services } from '../lib/services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SITE_URL = 'https://ariam-garcia.vercel.app';

export default function Custom404() {
  const featured = projects.slice(0, 6);

  return (
    <>
      <Head>
        <title>{`Page not found · ${personalInfo.name}`}</title>
        <meta name="description" content="The page you looked for was not found. Explore services, portfolio projects, or the FAQ instead." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={SITE_URL} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3 font-semibold">404</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">This page moved or never existed.</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Nothing dramatic. Just pick one of the destinations below.
            </p>
          </div>

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s) => (
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

          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-white mb-6">Recent projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="block p-4 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition"
                >
                  <h3 className="text-base font-semibold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="text-center mt-16">
            <Link href="/" className="inline-block px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition mr-3">
              ← Back to home
            </Link>
            <Link href="/faq" className="inline-block px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
              Read the FAQ
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
