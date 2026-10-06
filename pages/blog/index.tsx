import Head from 'next/head';
import Link from 'next/link';
import { posts } from '../../lib/blog';
import { personalInfo } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SITE_URL = 'https://ariam-garcia.vercel.app';
const URL = `${SITE_URL}/blog`;
const TITLE = `Blog · Case Studies · ${personalInfo.name}`;
const DESCRIPTION = 'In-depth case studies of shipped software: custom ticketing platforms, AI CRMs with Claude, Solana DEXes, wholesale ERPs, elderly-SOS platforms, security incident response. Written by Ariam Garcia Balmaseda.';

function slugify(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const tagCounts = new Map<string, number>();
  posts.forEach((p) => p.tags.forEach((t) => tagCounts.set(t, (tagCounts.get(t) || 0) + 1)));
  const tags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: TITLE,
    url: URL,
    description: DESCRIPTION,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
      url: SITE_URL,
    },
    blogPost: sorted.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt || p.publishedAt,
      description: p.description,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: URL },
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
        <link rel="alternate" type="application/rss+xml" title={TITLE} href={`${SITE_URL}/rss.xml`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Blog</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Case studies</h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              Long-form writeups of shipped projects — what the business problem was, what shape the solution took, and what the numbers looked like after launch.
            </p>
          </header>

          <nav aria-label="Browse by tag" className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Browse by tag</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(([tag, count]) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${slugify(tag)}`}
                  className="text-sm px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/50 text-slate-200 hover:border-indigo-500/50 hover:text-indigo-300 transition"
                >
                  {tag} <span className="text-slate-500 ml-1">({count})</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="space-y-8">
            {sorted.map((p) => (
              <article key={p.slug} className="p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition">
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">{t}</span>
                    ))}
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 leading-tight">{p.title}</h2>
                  <p className="text-slate-400 leading-relaxed mb-4">{p.description}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <time dateTime={p.publishedAt}>{new Date(p.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span>·</span>
                    <span>{p.readingMinutes} min read</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
            <p className="text-sm text-slate-400">Subscribe via RSS</p>
            <Link href="/rss.xml" className="text-sm text-indigo-400 hover:text-indigo-300">RSS feed →</Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
