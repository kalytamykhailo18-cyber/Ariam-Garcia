import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo, projects, testimonials, clientProof } from '../../lib/data';
import { services } from '../../lib/services';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SITE_URL = 'https://ariam-garcia.vercel.app';
const URL = `${SITE_URL}/es`;
const TITLE = 'Ariam Garcia Balmaseda · Ingeniero de Software · IA, Ciberseguridad, Blockchain, Automatización';
const DESCRIPTION = 'Ingeniero de software senior en full-stack, ingeniería de IA, ciberseguridad, blockchain, automatización de operaciones e industrial, y fintech. 50+ proyectos entregados en producción con 5.00 de calificación.';
const KEYWORDS = 'ingeniero de software, desarrollador full-stack, ingeniero de IA, experto en IA, experto en ciberseguridad, ingeniero de seguridad, respuesta a incidentes, ingeniero blockchain, contratos inteligentes, automatización de procesos, automatización industrial, ingeniero IoT, desarrollador fintech, programador freelance argentina, desarrollador next.js, sistema de reservas a medida, CRM con IA, desarrollador claude, whatsapp business api, contratar programador argentina';

const spanishTestimonials = testimonials.filter((t) => !t.translatedFrom || t.translatedFrom === 'Spanish').slice(0, 6);

const localizedProjects = [
  { id: 'articket', title: 'Plataforma de venta de entradas ArTicket', desc: 'Operadora de venta de entradas dejó de rentar la plataforma. Motor propio de mapas 2D corriendo a 39fps sobre 10.000+ butacas.' },
  { id: 'servifibras', title: 'Servifibras CRM + IA', desc: 'Empresa de materiales compuestos dejó de rentar el asistente de IA. Agente propio con Claude atiende ventas en 5 canales.' },
  { id: 'sensu-angela', title: 'Sensu Ángela', desc: 'Botones SOS para adultos mayores. Alertan a un call center 24/7 y a toda la familia en tiempo real, en iOS y Android.' },
  { id: 'distrialma', title: 'ERP Mayorista Distrialma', desc: 'Mayorista corría el POS sin visibilidad contable. Un ERP sobre SQL Server muestra balance en vivo y factura en AFIP.' },
  { id: 'agendux', title: 'Agendux', desc: 'Los no-shows son el costo silencioso de cada negocio con turnos. Recordatorios por WhatsApp y turnos cancelados reofrecidos.' },
  { id: 'joaoclaudiomiranda', title: 'Sitio médico Dr. João Cláudio Miranda', desc: 'Cirujano ortopédico quería un sitio que generara pacientes por Google. 40+ páginas SEO con CMS inline y contenido CFM.' },
];

const localizedServices = [
  { slug: 'custom-booking-and-scheduling-systems', label: 'Sistemas de Reservas y Turnos a Medida' },
  { slug: 'operations-automation-development', label: 'Automatización de Operaciones' },
  { slug: 'ai-crm-and-chatbot-development', label: 'CRM con IA y Asistentes de WhatsApp' },
  { slug: 'blockchain-and-smart-contract-development', label: 'Blockchain y Contratos Inteligentes' },
  { slug: 'mobile-app-development-ios-android', label: 'Apps Móviles iOS y Android' },
];

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: URL,
  image: `${SITE_URL}/photo.jpg`,
  jobTitle: 'Ingeniero de Software Senior',
  description: DESCRIPTION,
  sameAs: [personalInfo.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Louisville', addressRegion: 'KY', addressCountry: 'USA' },
  knowsLanguage: ['es', 'en', 'pt', 'uk', 'pl'],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ariam Garcia Balmaseda · Desarrollo de Software a Medida',
  url: URL,
  image: `${SITE_URL}/photo.jpg`,
  description: DESCRIPTION,
  priceRange: '$$',
  areaServed: ['Argentina', 'México', 'Chile', 'Colombia', 'España', 'Ecuador', 'Perú', 'Worldwide'],
  provider: { '@type': 'Person', name: personalInfo.name },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: clientProof.average, reviewCount: clientProof.ratedProjects, bestRating: '5', worstRating: '1' },
  inLanguage: 'es',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Español', item: URL },
  ],
};

export default function HomeES() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta httpEquiv="content-language" content="es" />
        <link rel="canonical" href={URL} />

        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="es" href={URL} />
        <link rel="alternate" hrefLang="pt" href={`${SITE_URL}/pt`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:locale:alternate" content="es_MX" />
        <meta property="og:locale:alternate" content="es_ES" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="pt_BR" />

        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div lang="es" className="bg-dark text-slate-100 min-h-screen">
        <Navbar />

        <main className="mx-auto max-w-5xl px-6 py-24">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home (EN)</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Español</span>
            <span className="mx-4">·</span>
            <Link href="/pt" className="hover:text-white">Português</Link>
          </nav>

          <header className="grid md:grid-cols-[1fr_240px] gap-12 items-center mb-20">
            <div>
              <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3 font-semibold">Ingeniero de Software Senior</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Software a medida para empresas de servicios.
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Sistemas de reservas y turnos, automatización de operaciones, CRMs con IA, plataformas blockchain y apps móviles. Cada proyecto arranca desde lo que la empresa está perdiendo hoy, no desde una lista de features.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Entregado en salud, retail, deportes, educación, fintech, ticketing, ERP mayorista y monitoreo de adultos mayores. Siempre como código que el cliente es dueño.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#contacto" className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
                  Contactar
                </a>
                <Link href="/services" className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
                  Ver servicios
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1 text-amber-400">★★★★★</div>
                <span>{clientProof.delivered} proyectos entregados · {clientProof.average} de calificación · {clientProof.repeatClients} clientes que recontrataron</span>
              </div>
            </div>
            <div className="relative w-56 h-56 md:w-60 md:h-60 mx-auto rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
              <Image src="/photo.jpg" alt={`${personalInfo.name} — Ingeniero de Software Senior`} fill className="object-cover object-top" priority />
            </div>
          </header>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Servicios</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {localizedServices.map((s) => (
                <Link key={s.slug} href={`/es/services/${s.slug}`} className="block p-5 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition group">
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 mb-1">{s.label}</h3>
                  <p className="text-sm text-slate-400">Ver detalles del servicio →</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Proyectos destacados</h2>
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

          {spanishTestimonials.length > 0 && (
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-8">Testimonios de clientes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {spanishTestimonials.map((t) => (
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

          <section id="contacto" className="p-8 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
            <h2 className="text-2xl font-semibold text-white mb-3">Empezar</h2>
            <p className="text-slate-300 mb-6">
              Mandame un brief escrito con el problema de negocio a resolver. Vuelvo con un plan concreto sobre ese documento, en el idioma que prefieras.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${personalInfo.email}`} className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
                Escribir por email
              </a>
              <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
                WhatsApp
              </a>
              <Link href="/faq" className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:border-indigo-500/50 transition">
                Ver preguntas frecuentes
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
