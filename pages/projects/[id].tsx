import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import { projects, personalInfo, Project } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SITE_URL = 'https://ariam-garcia.vercel.app';

interface Props {
  project: Project;
  related: Project[];
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map((p) => ({ params: { id: p.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  const project = projects.find((p) => p.id === id);
  if (!project) return { notFound: true };
  const related = projects.filter((p) => p.id !== id && p.category.some((c) => project.category.includes(c))).slice(0, 3);
  return {
    props: { project, related },
    revalidate: 86400,
  };
};

export default function ProjectPage({ project, related }: Props) {
  const url = `${SITE_URL}/projects/${project.id}`;
  const image = `${SITE_URL}${project.image}`;
  const title = `${project.title} — Case Study by ${personalInfo.name}`;
  const description = project.description.length > 155 ? project.description.slice(0, 152) + '...' : project.description;

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url,
    image,
    keywords: project.tech.join(', '),
    genre: project.category,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: personalInfo.name,
      url: SITE_URL,
    },
    provider: {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: personalInfo.name,
      url: SITE_URL,
    },
    ...(project.link && project.link !== '#' ? { sameAs: project.link } : {}),
  };

  const softwareSchema = project.github && !project.github.includes('#')
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.description,
        codeRepository: project.github,
        programmingLanguage: project.tech,
        author: { '@type': 'Person', '@id': `${SITE_URL}#person`, name: personalInfo.name },
        url,
      }
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}#projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: url },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {softwareSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        )}
      </Head>

      <div className="bg-dark text-slate-100 min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#projects" className="hover:text-white">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{project.title}</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed">{project.description}</p>
          </header>

          {project.image && (
            <div className="relative aspect-video mb-10 rounded-xl overflow-hidden border border-slate-800">
              <Image
                src={project.image}
                alt={`${project.title} — ${project.tech.slice(0, 3).join(', ')} project screenshot by Ariam Garcia Balmaseda`}
                fill
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Tech stack</h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 text-sm text-slate-200">{t}</li>
              ))}
            </ul>
          </section>

          {project.tags?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">Categories</h2>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li key={t} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-sm">{t}</li>
                ))}
              </ul>
            </section>
          )}

          {project.link && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">Live URL</h2>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition"
              >
                Visit {project.title} →
              </a>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-800">
              <h2 className="text-2xl font-semibold text-white mb-6">Related projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/projects/${r.id}`}
                    className="block p-5 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{r.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-3">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 pt-10 border-t border-slate-800">
            <Link href="/#projects" className="text-indigo-400 hover:text-indigo-300">
              ← Back to all projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
