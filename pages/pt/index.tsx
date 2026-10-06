import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo, projects, testimonials, clientProof } from '../../lib/data';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SITE_URL } from '../../lib/site';
import { seoTitle, seoDescription } from '../../lib/seo';

const URL = `${SITE_URL}/pt`;
const TITLE = 'Ariam Garcia Balmaseda · Engenheiro de Software · IA, Cibersegurança, Blockchain, Automação';
const DESCRIPTION = 'Engenheiro de software sênior em full-stack, engenharia de IA, cibersegurança, blockchain, automação de operações e industrial, e fintech. 50+ projetos entregues em produção com 5.00 de avaliação.';
const KEYWORDS = 'engenheiro de software, desenvolvedor full-stack, engenheiro de IA, especialista em IA, especialista em cibersegurança, engenheiro de segurança, resposta a incidentes, engenheiro blockchain, contratos inteligentes, automação de processos, automação industrial, engenheiro IoT, desenvolvedor fintech, programador freelancer brasil, desenvolvedor next.js, sistema de agendamento sob medida, CRM com IA, desenvolvedor claude, whatsapp business api, contratar programador brasil';

const ptTestimonials = testimonials.filter((t) => !t.translatedFrom || t.translatedFrom === 'Portuguese').slice(0, 6);

const localizedProjects = [
  { id: 'articket', title: 'Plataforma de bilheteria ArTicket', desc: 'Operadora de venda de ingressos deixou de alugar a plataforma. Motor próprio de mapas 2D rodando a 39fps sobre 10.000+ assentos.' },
  { id: 'servifibras', title: 'Servifibras CRM + IA', desc: 'Empresa de materiais compostos deixou de alugar o assistente de IA. Agente próprio com Claude atende vendas em 5 canais.' },
  { id: 'sensu-angela', title: 'Sensu Ângela', desc: 'Botões SOS para idosos. Alertam uma central 24/7 e toda a família em tempo real, em iOS e Android.' },
  { id: 'joaoclaudiomiranda', title: 'Site médico Dr. João Cláudio Miranda', desc: 'Cirurgião ortopédico queria um site que gerasse pacientes pelo Google. 40+ páginas SEO com CMS inline e conteúdo CFM.' },
  { id: 'bookproof', title: 'BookProof', desc: 'Autores comprando resenhas na Amazon eram sinalizados em massa. Fila semanal automática, prazo de 72h, política de reposição em 14 dias.' },
  { id: 'agendux', title: 'Agendux', desc: 'Faltas são o custo silencioso de todo negócio com agendamento. Lembretes por WhatsApp e horários cancelados reofertados automaticamente.' },
];

const localizedServices = [
  { slug: 'custom-booking-and-scheduling-systems', label: 'Sistemas de Agendamento Sob Medida' },
  { slug: 'operations-automation-development', label: 'Automação de Operações' },
  { slug: 'ai-crm-and-chatbot-development', label: 'CRM com IA e Assistentes no WhatsApp' },
  { slug: 'blockchain-and-smart-contract-development', label: 'Blockchain e Contratos Inteligentes' },
  { slug: 'mobile-app-development-ios-android', label: 'Apps Móveis iOS e Android' },
];

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: URL,
  image: `${SITE_URL}/photo.jpg`,
  jobTitle: 'Engenheiro de Software Sênior',
  description: DESCRIPTION,
  sameAs: [personalInfo.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Louisville', addressRegion: 'KY', addressCountry: 'USA' },
  knowsLanguage: ['pt', 'en', 'es', 'uk', 'pl'],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ariam Garcia Balmaseda · Desenvolvimento de Software Sob Medida',
  url: URL,
  image: `${SITE_URL}/photo.jpg`,
  description: DESCRIPTION,
  priceRange: '$$',
  areaServed: ['Brasil', 'Portugal', 'Worldwide'],
  provider: { '@type': 'Person', name: personalInfo.name },
  inLanguage: 'pt-BR',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Português', item: URL },
  ],
};

export default function HomePT() {
  return (
    <>
      <Head>
        <title>{seoTitle(TITLE)}</title>
        <meta name="description" content={seoDescription(DESCRIPTION)} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta httpEquiv="content-language" content="pt-BR" />
        <link rel="canonical" href={URL} />

        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/es`} />
        <link rel="alternate" hrefLang="pt" href={URL} />
        <link rel="alternate" hrefLang="pt-BR" href={URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="es_AR" />

        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div lang="pt-BR" className="bg-dark text-slate-100 min-h-screen">
        <Navbar />

        <main className="mx-auto max-w-5xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home (EN)</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Português</span>
            <span className="mx-4">·</span>
            <Link href="/es" className="hover:text-white">Español</Link>
          </nav>

          <header className="grid md:grid-cols-[1fr_240px] gap-12 items-center mb-20">
            <div>
              <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3 font-semibold">Engenheiro de Software Sênior</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Software sob medida para empresas de serviços.
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Sistemas de agendamento, automação de operações, CRMs com IA, plataformas blockchain e apps móveis. Todo projeto começa pelo que a empresa está perdendo hoje, não por uma lista de funcionalidades.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Entregue em saúde, varejo, esportes, educação, fintech, bilheteria, ERP atacado e monitoramento de idosos. Sempre como código que o cliente é dono.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#contato" className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
                  Entrar em contato
                </a>
                <Link href="/services" className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
                  Ver serviços
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1 text-amber-400">★★★★★</div>
                <span>{clientProof.delivered} projetos entregues · {clientProof.average} de avaliação · {clientProof.repeatClients} clientes que recontrataram</span>
              </div>
            </div>
            <div className="relative w-56 h-56 md:w-60 md:h-60 mx-auto rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
              <Image src="/photo.jpg" alt={`${personalInfo.name} — Engenheiro de Software Sênior`} fill className="object-cover object-top" priority />
            </div>
          </header>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Serviços</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {localizedServices.map((s) => (
                <Link key={s.slug} href={`/pt/services/${s.slug}`} className="block p-5 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition group">
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 mb-1">{s.label}</h3>
                  <p className="text-sm text-slate-400">Ver detalhes do serviço →</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Projetos em destaque</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {localizedProjects.map((p) => {
                const full = projects.find((x) => x.id === p.id);
                return (
                  <Link key={p.id} href={`/projects/${p.id}`} className="block group">
                    <div className="rounded-xl overflow-hidden border border-slate-800 group-hover:border-indigo-500/50 transition">
                      {full && (
                        <div className="relative aspect-video bg-slate-900">
                          <Image src={full.image} alt={p.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 mb-2">{p.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {ptTestimonials.length > 0 && (
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">Depoimentos de clientes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {ptTestimonials.map((t) => (
                  <blockquote key={t.id} className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
                    <p className="text-slate-300 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                    <footer className="mt-4 text-sm">
                      <strong className="text-white">{t.author}</strong>
                      <span className="text-slate-500"> · {t.project}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}

          <section id="contato" className="p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
            <h2 className="text-2xl font-semibold text-white mb-3">Começar</h2>
            <p className="text-slate-300 mb-6">
              Me manda um brief escrito com o problema de negócio a resolver. Volto com um plano concreto sobre esse documento, no idioma que preferir.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${personalInfo.email}`} className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
                Escrever por email
              </a>
              <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
                WhatsApp
              </a>
              <Link href="/faq" className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
                Ver perguntas frequentes
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
