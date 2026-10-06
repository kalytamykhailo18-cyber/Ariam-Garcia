import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import { posts, BlogPost } from '../../lib/blog';
import { projects, personalInfo } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ShareArticle from '../../components/ShareArticle';
import ReadingProgress from '../../components/ReadingProgress';

const SITE_URL = 'https://ariam-garcia.vercel.app';

interface Props {
  post: BlogPost;
  related: BlogPost[];
  relatedProject: (typeof projects)[number] | null;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: posts.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { notFound: true };
  const related = posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p);
  const relatedProject = post.relatedProjectId ? projects.find((p) => p.id === post.relatedProjectId) || null : null;
  return {
    props: { post, related, relatedProject },
    revalidate: 86400,
  };
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractHeadings(body: string): { id: string; text: string; level: 2 | 3 }[] {
  const out: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const line of body.split('\n')) {
    const l = line.trimEnd();
    if (l.startsWith('## ')) {
      const text = l.slice(3);
      out.push({ id: slugify(text), text, level: 2 });
    } else if (l.startsWith('### ')) {
      const text = l.slice(4);
      out.push({ id: slugify(text), text, level: 3 });
    }
  }
  return out;
}

function renderMarkdown(body: string): JSX.Element[] {
  const lines = body.split('\n');
  const out: JSX.Element[] = [];
  let buffer: string[] = [];
  let listBuffer: string[] = [];
  let inList = false;
  let key = 0;

  const flushParagraph = () => {
    if (buffer.length) {
      out.push(
        <p key={key++} className="text-slate-300 leading-relaxed mb-5">
          {inlineMd(buffer.join(' '))}
        </p>,
      );
      buffer = [];
    }
  };
  const flushList = () => {
    if (listBuffer.length) {
      out.push(
        <ul key={key++} className="list-disc pl-6 mb-5 space-y-2 text-slate-300">
          {listBuffer.map((item, i) => (
            <li key={i} className="leading-relaxed">{inlineMd(item)}</li>
          ))}
        </ul>,
      );
      listBuffer = [];
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      const text = line.slice(3);
      const id = slugify(text);
      out.push(
        <h2 key={key++} id={id} className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4 scroll-mt-24 group">
          <a href={`#${id}`} className="no-underline">
            {text}
            <span className="ml-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
          </a>
        </h2>,
      );
    } else if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      const text = line.slice(4);
      const id = slugify(text);
      out.push(
        <h3 key={key++} id={id} className="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-24 group">
          <a href={`#${id}`} className="no-underline">
            {text}
            <span className="ml-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
          </a>
        </h3>,
      );
    } else if (/^\d+\.\s/.test(line)) {
      flushParagraph();
      listBuffer.push(line.replace(/^\d+\.\s/, ''));
      inList = true;
    } else if (line.startsWith('- ')) {
      flushParagraph();
      listBuffer.push(line.slice(2));
      inList = true;
    } else if (line === '') {
      flushParagraph();
      flushList();
    } else {
      if (inList) flushList();
      buffer.push(line);
    }
  }
  flushParagraph();
  flushList();
  return out;
}

function inlineMd(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) {
      parts.push(<strong key={i++} className="text-white font-semibold">{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('`')) {
      parts.push(<code key={i++} className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-sm">{tok.slice(1, -1)}</code>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function BlogPostPage({ post, related, relatedProject }: Props) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = relatedProject ? `${SITE_URL}${relatedProject.image}` : `${SITE_URL}/og-image.png`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url,
    image: ogImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: personalInfo.name,
      url: SITE_URL,
      image: `${SITE_URL}/photo.jpg`,
      sameAs: [personalInfo.github],
    },
    publisher: {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: personalInfo.name,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/photo.jpg`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    wordCount: post.body.split(/\s+/).length,
    keywords: post.keywords,
    articleSection: post.tags.join(', '),
    inLanguage: 'en',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <Head>
        <title>{`${post.title} · ${personalInfo.name}`}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta name="author" content={personalInfo.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt || post.publishedAt} />
        <meta property="article:author" content={personalInfo.name} />
        {post.tags.map((t) => <meta key={t} property="article:tag" content={t} />)}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <ReadingProgress />
        <Navbar />
        <main id="main-content" className="mx-auto max-w-3xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200 line-clamp-1 inline-block max-w-md align-bottom">{post.title}</span>
          </nav>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog/tag/${slugify(t)}`}
                  className="text-xs px-2 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition"
                >
                  {t}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-6">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image src="/photo.jpg" alt={personalInfo.name} fill className="object-cover" />
                </div>
                <span className="text-slate-300">{personalInfo.name}</span>
              </div>
              <span>·</span>
              <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">{post.description}</p>
          </header>

          {relatedProject && (
            <div className="mb-10 relative aspect-video rounded-xl overflow-hidden border border-slate-800">
              <Image src={relatedProject.image} alt={`${relatedProject.title} — screenshot`} fill className="object-cover" sizes="(max-width:768px) 100vw, 800px" priority />
            </div>
          )}

          {(() => {
            const toc = extractHeadings(post.body).filter((h) => h.level === 2);
            if (toc.length < 3) return null;
            return (
              <nav aria-label="Table of contents" className="mb-10 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">On this page</p>
                <ol className="space-y-1.5 text-sm">
                  {toc.map((h, i) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-slate-300 hover:text-indigo-300 transition-colors">
                        <span className="text-slate-500 mr-2">{String(i + 1).padStart(2, '0')}</span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            );
          })()}

          <article className="prose prose-invert max-w-none">
            {renderMarkdown(post.body)}
          </article>

          <div className="mt-12 pt-6 border-t border-slate-800">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Share this article</p>
            <ShareArticle url={url} title={post.title} text={post.description} />
          </div>

          {relatedProject && (
            <section className="mt-16 pt-10 border-t border-slate-800">
              <h2 className="text-xl font-semibold text-white mb-4">The project this writeup is about</h2>
              <Link
                href={`/projects/${relatedProject.id}`}
                className="block p-5 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{relatedProject.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-3">{relatedProject.description}</p>
              </Link>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-800">
              <h2 className="text-xl font-semibold text-white mb-6">Related case studies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="block p-4 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition">
                    <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{r.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{r.readingMinutes} min read</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 pt-10 border-t border-slate-800 text-center">
            <p className="text-slate-400 mb-6">Want your project written up like this?</p>
            <Link href="/services" className="inline-block px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition mr-3">
              See services
            </Link>
            <Link href="/#contact" className="inline-block px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
              Contact
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
