import Head from 'next/head';
import { personalInfo, projects, experiences, testimonials, clientProof } from '../lib/data';
import Navbar      from '../components/Navbar';
import Hero        from '../components/Hero';
import Disciplines from '../components/Disciplines';
import About       from '../components/About';
import Skills      from '../components/Skills';
import Experience  from '../components/Experience';
import Projects    from '../components/Projects';
import Blockchain  from '../components/Blockchain';
import AISection   from '../components/AISection';
import TradingBot   from '../components/TradingBot';
import Testimonials from '../components/Testimonials';
import Education   from '../components/Education';
import Languages   from '../components/Languages';
import Contact     from '../components/Contact';
import Footer      from '../components/Footer';

const SITE_URL = 'https://ariam-garcia.vercel.app';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const TITLE = 'Ariam Garcia Balmaseda | Software Engineer · AI, Security, Blockchain, Automation';
const DESCRIPTION = 'Senior software engineer across full-stack, AI engineering, cybersecurity, blockchain, business and industrial automation, and fintech. 50+ projects delivered in production, 5.00 rating, 11+ repeat clients.';
const KEYWORDS = 'software engineer, full-stack developer, AI engineer, AI expert, cyber security expert, security engineer, incident response, blockchain engineer, smart contract developer, business automation professional, industrial automation expert, IoT engineer, fintech developer, payment integration, custom software, booking system, operations automation, AI CRM, Claude API, WhatsApp Business Cloud API, Solana, Ethereum, Next.js, React, Node.js, NestJS, PostgreSQL, hire developer, freelance engineer, Workana';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}#person`,
  name: personalInfo.name,
  givenName: 'Ariam',
  familyName: 'Garcia Balmaseda',
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/photo.jpg`,
    width: 800,
    height: 800,
    caption: `${personalInfo.name} — Software Engineer`,
  },
  jobTitle: 'Full-Stack Software Engineer',
  // Every additional title is backed by a shipped production project, not a claim:
  // security → Hilong CVE-2024-45519 IR; AI → Servifibras Claude CRM;
  // automation → Distrialma ERP; fintech → AFIP + Stripe Split + PDF reconciliation.
  additionalType: 'https://schema.org/Person',
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Software Engineering', name: '10+ years production software delivery' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Security Engineering', name: 'Production incident response, CVE-2024-45519 custom patch mitigation' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'AI Engineering', name: 'Production LLM systems with Anthropic Claude, RAG grounding and cost routing' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Blockchain Engineering', name: 'Creator of the Vetra USD-backed stablecoin on Polygon PoS' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Fintech Engineering', name: 'AFIP RG 5616 electronic invoicing, Stripe Connect/Split, MercadoPago signed webhooks' },
  ],
  description: personalInfo.summary,
  email: personalInfo.email,
  telephone: personalInfo.phone,
  worksFor: {
    '@type': 'Organization',
    name: 'Independent Software Consultancy',
    url: SITE_URL,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Louisville',
    addressRegion: 'KY',
    addressCountry: 'USA',
  },
  sameAs: [personalInfo.github],
  knowsLanguage: [
    { '@type': 'Language', name: 'English', alternateName: 'en' },
    { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
    { '@type': 'Language', name: 'Portuguese', alternateName: 'pt' },
  ],
  knowsAbout: [
    'Software Engineering',
    'Full-Stack Development',
    'AI Engineering',
    'Security Engineering',
    'Incident Response',
    'Business Process Automation',
    'Financial Technology',
    'Blockchain Engineering',
    'Next.js',
    'React',
    'Node.js',
    'NestJS',
    'TypeScript',
    'PostgreSQL',
    'Booking Systems',
    'Appointment Scheduling',
    'Operations Automation',
    'AI Integration',
    'Anthropic Claude API',
    'OpenAI GPT API',
    'Retrieval Augmented Generation',
    'WhatsApp Business Cloud API',
    'Meta Graph API',
    'MercadoLibre API',
    'Blockchain Development',
    'Solidity',
    'Solana',
    'Anchor Rust',
    'Ethereum',
    'Chainlink Functions',
    'Smart Contracts',
    'Stablecoin Engineering',
    'Mobile Development',
    'React Native',
    'Flutter',
    'Capacitor iOS',
    'Android TWA',
    'Payment Integration',
    'Stripe Connect',
    'MercadoPago Signed HMAC Webhooks',
    'Incident Response',
    'CVE Mitigation',
    'DigitalOcean',
    'Docker',
    'Playwright E2E Testing',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full-Stack Software Developer',
    occupationLocation: { '@type': 'Country', name: 'Remote worldwide' },
    skills: 'Custom software, booking and scheduling systems, operations automation, AI-powered CRMs, blockchain platforms, mobile apps, payment integrations, secure production infrastructure.',
    experienceRequirements: '10+ years professional software development',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Louisville',
      url: 'https://louisville.edu',
      location: { '@type': 'Place', name: 'Louisville, KY, USA' },
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Purdue University',
      url: 'https://www.purdue.edu',
      location: { '@type': 'Place', name: 'West Lafayette, IN, USA' },
    },
  ],
  award: [
    'Creator of Vetra (VTR) USD-backed stablecoin on Polygon PoS with Chainlink Functions',
    'Creator of GreenDash token targeting South East Asia market',
    '5.00 average rating across 50+ delivered projects',
    '11+ repeat clients',
  ],
  workExample: [
    { '@type': 'CreativeWork', name: 'Vetra Stablecoin', description: 'USD-backed stablecoin on Polygon PoS with Chainlink Functions verifying reserves in real time.' },
    { '@type': 'CreativeWork', name: 'DexSpeed DEX on Solana', description: 'AMM Raydium-style DEX with SPL tokens and Jupiter Aggregator integration.', url: 'https://www.dexspeed.com.br' },
    { '@type': 'CreativeWork', name: 'Servifibras AI CRM', description: 'Multi-channel AI + CRM with Anthropic Claude complexity-router model routing.', url: 'https://dev.servifibras.com' },
  ],
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ariam Garcia Balmaseda · Custom Software Development',
  url: SITE_URL,
  image: `${SITE_URL}/photo.jpg`,
  description: DESCRIPTION,
  priceRange: '$$',
  areaServed: 'Worldwide',
  serviceType: [
    'Custom Software Development',
    'Booking and Scheduling Systems',
    'Operations Automation',
    'AI Integration',
    'Blockchain Development',
    'Mobile App Development',
    'Payment System Integration',
    'Production Infrastructure and DevOps',
  ],
  provider: {
    '@type': 'Person',
    name: personalInfo.name,
    url: SITE_URL,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: clientProof.average,
    reviewCount: clientProof.ratedProjects,
    bestRating: '5',
    worstRating: '1',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  name: `${personalInfo.name} · Software Engineer`,
  url: SITE_URL,
  description: DESCRIPTION,
  author: { '@type': 'Person', '@id': `${SITE_URL}#person`, name: personalInfo.name },
  publisher: { '@type': 'Person', '@id': `${SITE_URL}#person`, name: personalInfo.name },
  inLanguage: ['en', 'es', 'pt'],
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Featured Projects · Ariam Garcia Balmaseda Portfolio',
  url: `${SITE_URL}#projects`,
  description: 'Portfolio of custom software projects delivered in production across ticketing, CRM, healthcare, ERP, SaaS, blockchain and mobile.',
  hasPart: projects.slice(0, 12).map((p) => ({
    '@type': 'CreativeWork',
    name: p.title,
    description: p.description,
    url: p.link,
    image: `${SITE_URL}${p.image}`,
    keywords: p.tech.join(', '),
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  })),
};

const reviewSchemas = testimonials.slice(0, 8).map((t) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  reviewBody: t.quote,
  author: {
    '@type': 'Person',
    name: t.author,
  },
  itemReviewed: {
    '@type': 'Service',
    name: t.project,
    provider: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: '5',
    bestRating: '5',
  },
}));

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}#projects` },
    { '@type': 'ListItem', position: 3, name: 'Experience', item: `${SITE_URL}#experience` },
    { '@type': 'ListItem', position: 4, name: 'Testimonials', item: `${SITE_URL}#testimonials` },
    { '@type': 'ListItem', position: 5, name: 'Contact', item: `${SITE_URL}#contact` },
  ],
};

export default function Home() {
  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="author" content={personalInfo.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b1220" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/es`} />
        <link rel="alternate" hrefLang="pt" href={`${SITE_URL}/pt`} />
        <link rel="alternate" hrefLang="pt-BR" href={`${SITE_URL}/pt`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${personalInfo.name} — Software Engineer`} />
        <meta property="og:site_name" content={personalInfo.name} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="es_AR" />
        <meta property="og:locale:alternate" content="es_MX" />
        <meta property="og:locale:alternate" content="pt_BR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={`${personalInfo.name} — Software Engineer`} />

        {/* Verification — replace REPLACE_ME with real codes from Google Search Console + Bing Webmaster Tools + Yandex Webmaster. */}
        {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && (
          <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION && (
          <meta name="p:domain_verify" content={process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION} />
        )}

        {/* Preconnect / DNS-prefetch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.workana.com" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {reviewSchemas.map((r, i) => (
          <script key={`review-schema-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(r) }} />
        ))}
      </Head>

      <div className="bg-dark text-slate-100 overflow-x-hidden">
        <Navbar />
        <main id="main-content" role="main">
          <Hero />
          <Disciplines />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Blockchain />
          <AISection />
          <TradingBot />
          <Testimonials />
          <Education />
          <Languages />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
