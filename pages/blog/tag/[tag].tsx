import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { posts, BlogPost } from '../../../lib/blog';
import { personalInfo } from '../../../lib/data';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { SITE_URL } from '../../../lib/site';
import { seoTitle, seoDescription } from '../../../lib/seo';


interface Props {
  tag: string;
  slug: string;
  matches: BlogPost[];
}

function slugify(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return {
    paths: Array.from(tagSet).map((tag) => ({ params: { tag: slugify(tag) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.tag as string;
  let matchedTag = '';
  const matches = posts.filter((p) =>
    p.tags.some((t) => {
      if (slugify(t) === slug) {
        matchedTag = t;
        return true;
      }
      return false;
    }),
  );
  if (!matches.length) return { notFound: true };
  return {
    props: { tag: matchedTag, slug, matches },
    revalidate: 86400,
  };
};

export default function TagPage({ tag, slug, matches }: Props) {
  const url = `${SITE_URL}/blog/tag/${slug}`;
  const title = `${tag} · Case Studies · ${personalInfo.name}`;
  const description = `Long-form case studies tagged “${tag}” — shipped software projects with the business problem, technical shape and post-launch numbers by ${personalInfo.name}.`;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url,
    description,
    about: { '@type': 'Thing', name: tag },
    hasPart: matches.map((p) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: tag, item: url },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle(title)}</title>
        <meta name="description" content={seoDescription(description)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main id="main-content" className="mx-auto max-w-4xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{tag}</span>
          </nav>

          <header className="mb-12">
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3 font-semibold">Tag</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tag}</h1>
            <p className="text-slate-300 leading-relaxed">
              {matches.length} case {matches.length === 1 ? 'study' : 'studies'} tagged {tag}.
            </p>
          </header>

          <div className="space-y-8">
            {matches.map((p) => (
              <article key={p.slug} className="p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition">
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className={`text-xs px-2 py-1 rounded border ${t === tag ? 'bg-indigo-500/20 text-indigo-200 border-indigo-500/50' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'}`}>{t}</span>
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

          <div className="mt-12 pt-8 border-t border-slate-800">
            <Link href="/blog" className="text-indigo-400 hover:text-indigo-300">← All case studies</Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
