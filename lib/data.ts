// ─── Portfolio Data ───────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
  tags: string[];
  category: string[];
  tech: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  project: string;
  translatedFrom?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  description: string[];
  current?: boolean;
  color: string;
}

export const personalInfo = {
  name: 'Ariam Garcia Balmaseda',
  title: 'Full-Stack Software Engineer',
  titles: [
    'Full-Stack Software Engineer',
    3500,
    'AI Engineer',
    2500,
    'Security Engineer',
    2500,
    'Blockchain Engineer',
    2500,
    'Business Automation Engineer',
    2500,
    'Industrial Automation & IoT',
    2500,
    'Fintech Engineer',
    2500,
  ],
  location: 'Louisville, KY, USA',
  email: 'kalytamykhailo18@gmail.com',
  phone: '+1 (737) 825-5259',
  whatsapp: 'https://wa.me/17378255259',
  github: 'https://github.com/kalytamykhailo18-cyber',
  summary:
    'I build custom systems for service businesses. Booking and scheduling, operations automation, and AI put inside processes that already run. Every project starts with what the business is losing today, not with a feature list. Delivered across healthcare, retail, sports, education and fintech, always as code the client owns.',
};

export const stats = [
  { value: 3, suffix: '+', label: 'Blockchain Projects' },
  { value: 5, suffix: '+', label: 'Industries Served' },
];

export const skillCategories = [
  {
    name: 'Frontend',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.25)',
    skills: ['React', 'Next.js', 'Vue.js', 'Redux', 'TailwindCSS', 'TypeScript'],
  },
  {
    name: 'Backend',
    color: '#22d3ee',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.25)',
    skills: ['Node.js', 'Express.js', 'NestJS', 'Python', 'PHP', 'Laravel'],
  },
  {
    name: 'Blockchain',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    skills: ['Solidity', 'ERC-20/ERC-721', 'Polygon PoS', 'Web3.js', 'Chainlink', 'Solana / SPL'],
  },
  {
    name: 'AI & Automation',
    color: '#c084fc',
    bg: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.25)',
    skills: ['OpenAI API', 'LangChain', 'Stable Diffusion', 'Gemini AI', 'Whisper'],
  },
  {
    name: 'Databases',
    color: '#fbbf24',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
  },
  {
    name: 'DevOps & Cloud',
    color: '#22d3ee',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.25)',
    skills: ['Docker', 'AWS (EC2, S3)', 'GitHub Actions', 'Vercel', 'Cloudflare'],
  },
  {
    name: 'Payment Systems',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.25)',
    skills: ['Stripe', 'PayPal', 'Mercado Pago'],
  },
  {
    name: 'Security',
    color: '#f87171',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    skills: ['JWT', 'OAuth 2.0', 'Helmet.js', 'Input Validation'],
  },
];

export const experiences: ExperienceItem[] = [
  {
    title: 'Full-Stack Developer',
    company: 'MintyMint',
    companyUrl: 'https://www.designrush.com/agency/profile/mintymint',
    location: 'Remote',
    period: '2018 – June 2025',
    color: '#818cf8',
    description: [
      'Built custom applications and automation for companies whose manual processes had stopped scaling.',
      'Replaced spreadsheet and paper workflows with systems the team stopped having to think about.',
      'Delivered multi-tenant SaaS platforms with subscription billing and per-client data isolation.',
      'Worked directly with owners and operations leads, not only with technical teams.',
      'Kept every project on stacks the client could own and hand to anyone later.',
    ],
  },
  {
    title: 'Blockchain & Smart Contract Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'July 2024 – Present',
    current: true,
    color: '#34d399',
    description: [
      'Launched the Vetra (VTR) stablecoin on Polygon PoS, with Chainlink Functions verifying reserves in real time.',
      'Deployed ERC-20 tokens and smart contracts for fintech and SaaS clients moving real value.',
      'Treated security as a design decision, with role-based access, pausable contracts and a full on-chain audit trail.',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'articket',
    title: 'ArTicket Platform',
    description:
      'A ticketing operator was renting its platform. The own 2D canvas seat-map engine runs at 39fps on 10k+ seats, and the operator owns it now.',
    image: '/images/articket.png',
    link: 'https://tickets.articket.ar',
    github: '',
    tags: ['SaaS', 'Fullstack'],
    category: ['saas', 'fullstack'],
    tech: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma', 'MercadoPago', 'Playwright'],
  },
  {
    id: 'articket-chatwoot',
    title: 'ArTicket Support Desk',
    description:
      'ArTicket needed a self-hosted omnichannel support desk. 7 email mailboxes plus WhatsApp, Facebook, Instagram and web widget for 8 agents, nightly backups.',
    image: '/images/articket-chatwoot.png',
    link: 'https://soporte.articket.ar',
    github: '',
    tags: ['SaaS', 'DevOps'],
    category: ['saas', 'fullstack'],
    tech: ['Chatwoot', 'Docker Compose', 'Rails', 'Redis', 'WhatsApp Cloud API', 'rclone'],
  },
  {
    id: 'servifibras',
    title: 'Servifibras CRM + AI',
    description:
      'A composites shop was renting an AI assistant. Their own Claude-powered agent now handles sales across 5 channels, with hard guards against price hallucination.',
    image: '/images/servifibras.png',
    link: 'https://dev.servifibras.com',
    github: '',
    tags: ['AI', 'SaaS'],
    category: ['ai', 'saas', 'fullstack'],
    tech: ['NestJS', 'Next.js 15', 'Claude Sonnet 5', 'PostgreSQL', 'Socket.io', 'Playwright'],
  },
  {
    id: 'sensu-angela',
    title: 'Sensu Angela',
    description:
      'Elderly SOS pendants used to call the family. Now they ping a 24/7 call center and every family member in real time, live on iOS and Android.',
    image: '/images/sensu-angela.png',
    link: 'https://app.sensu.com.mx',
    github: '',
    tags: ['SaaS', 'IoT'],
    category: ['ai', 'saas', 'fullstack'],
    tech: ['Next.js 15', 'FastAPI', 'MQTT', 'Stripe', 'Capacitor iOS', 'Android TWA'],
  },
  {
    id: 'joaoclaudiomiranda',
    title: 'Dr. João Cláudio Miranda',
    description:
      'A surgeon wanted a website that generates patients through Google. 40+ SEO pages, inline CMS the doctor edits live, CFM-compliant medical content.',
    image: '/images/joaoclaudiomiranda.png',
    link: 'https://joaoclaudiomiranda.com',
    github: '',
    tags: ['SaaS', 'SEO'],
    category: ['saas', 'fullstack'],
    tech: ['Next.js 15', 'Payload CMS 3', 'PostgreSQL', 'Schema.org', 'GA4', 'Playwright'],
  },
  {
    id: 'tiendamascold',
    title: 'Tiendamascold Configurator',
    description:
      'Made-to-measure cold rooms could not be quoted online. A configurator embedded via Shadow DOM reads the real closed prices and adds to cart, no iframe.',
    image: '/images/tiendamascold.png',
    link: 'https://www.tiendamascold.com/configurador-puertas-frigorificas/',
    github: '',
    tags: ['SaaS', 'E-commerce'],
    category: ['saas', 'fullstack'],
    tech: ['Node.js 24', 'Express 5', 'WooCommerce API', 'Shadow DOM', 'sharp', 'Playwright'],
  },
  {
    id: 'hilong-ecuador',
    title: 'Hilong Ecuador Incident Response',
    description:
      'A production mail server was actively compromised. Malware eradicated, CVE-2024-45519 patched with a custom Perl fix, and weekly SOC monitoring took over.',
    image: '/images/hilong-security.png',
    link: '#',
    github: '',
    tags: ['Security', 'DevOps'],
    category: ['fullstack'],
    tech: ['Incident Response', 'Perl (CVE patch)', 'fail2ban', 'firewalld', 'Zimbra', 'CentOS'],
  },
  {
    id: 'if7sports',
    title: 'IF7Sports Platform',
    description:
      'Sports centres could not share courts across a reseller network without double-booking. Atomic tenant-isolated booking with commission accounting handles it.',
    image: '/images/if7sports.png',
    link: '#',
    github: '',
    tags: ['SaaS', 'Fullstack'],
    category: ['saas', 'fullstack'],
    tech: ['NestJS', 'MongoDB', 'Angular', 'JWT', 'TOTP 2FA', 'AWS S3'],
  },
  {
    id: 'milena-fintech',
    title: 'Financial PDF Processor',
    description:
      'Banking statement PDFs were parsed by hand across dozens of accounts. Streamlit MVP now extracts and cross-references transactions automatically.',
    image: '/images/milena-fintech.png',
    link: '',
    github: '',
    tags: ['AI', 'Fintech'],
    category: ['ai', 'fullstack'],
    tech: ['Python', 'Streamlit', 'SQLite', 'MySQL', 'PDF processing', 'AI'],
  },
  {
    id: 'famacon-m2',
    title: 'Famacon Livestock Monitor (M2)',
    description:
      'Cattle fields were checked on foot at dawn. Sensor telemetry over MQTT/HTTP fires WhatsApp alerts when a threshold breaks, before anyone leaves the house.',
    image: '/images/famacon.png',
    link: 'https://famaconcontrol.com',
    github: '',
    tags: ['IoT', 'Fullstack'],
    category: ['fullstack'],
    tech: ['PHP', 'Python', 'Node.js', 'MySQL', 'MQTT', 'WhatsApp API'],
  },
  {
    id: 'pinboatapp',
    title: 'PinBoat Pinterest Bot',
    description:
      'Affiliate posting on Pinterest hits rate limits and bans fast. A 24/7 bot with intelligent frequency controls keeps the account safe long-term.',
    image: '/images/pinboatapp.png',
    link: 'https://pinboatapp.com',
    github: '',
    tags: ['SaaS', 'Automation'],
    category: ['ai', 'fullstack'],
    tech: ['Python', 'Web Scraping', 'REST API', 'JavaScript', 'Database'],
  },
  {
    id: 'famacon-p1',
    title: 'Famacon Phase 1',
    description:
      'The first pilot for cattle-field monitoring. Backend, WhatsApp notifications and per-user data separation, before the M2 platform scaled it up.',
    image: '/images/famacon-p1.png',
    link: 'https://famaconcontrol.com',
    github: '',
    tags: ['IoT', 'Fullstack'],
    category: ['fullstack'],
    tech: ['PHP', 'MySQL', 'Node.js', 'Python', 'WhatsApp API', 'Linux'],
  },
  {
    id: 'magov',
    title: 'MaGov Angular + GraphQL',
    description:
      '21 Angular front-end components had to hit a GraphQL backend and stay pixel-perfect against Figma. Refactor, interactive map and dashboard all shipped.',
    image: '/images/magov.png',
    link: 'https://www.magov.com.br',
    github: '',
    tags: ['Fullstack', 'GovTech'],
    category: ['fullstack'],
    tech: ['Angular', 'GraphQL', 'TypeScript', 'Ionic', 'Figma'],
  },
  {
    id: 'bookproof',
    title: 'BookProof',
    description:
      'Authors buying Amazon reviews got flagged in bulk. Weekly automatic queue delivery, reader anonymity, 72h deadlines and 14-day replacement — no flags.',
    image: '/images/bookproof.png',
    link: 'https://bookproof.app',
    github: '',
    tags: ['SaaS', 'Fullstack'],
    category: ['saas', 'fullstack'],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Queue scheduler', 'JWT', 'PDF generator'],
  },
  {
    id: 'valee',
    title: 'valee.app (Secure Mobile)',
    description:
      'A mobile app needed to survive real attackers, not a checklist. Cryptography, pentesting and secure authentication baked into every layer, iOS and Android.',
    image: '/images/valee.png',
    link: 'https://valee.app',
    github: '',
    tags: ['Security', 'Mobile'],
    category: ['fullstack'],
    tech: ['Android', 'iOS', 'Java', 'Swift', 'Kotlin', 'Cryptography', 'Pentesting'],
  },
  {
    id: 'distrialma',
    title: 'Distrialma Wholesale ERP',
    description:
      'A wholesaler was running its POS blind to accounting. An ERP layered over the SQL Server POS shows a live balance sheet and files AFIP invoices.',
    image: '/images/distrialma.png',
    link: 'https://distrialma.com.ar',
    github: '',
    tags: ['ERP', 'Fullstack'],
    category: ['saas', 'fullstack'],
    tech: ['Next.js 14', 'PostgreSQL', 'SQL Server', 'AFIP SOAP', 'MercadoPago', 'PWA'],
  },
  {
    id: 'diva-dashboard',
    title: 'Diva COP/USD Dashboard',
    description:
      'A crypto dashboard needed a currency toggle and a rate updater without redeploys. Direct hire from a returning client added both without touching production.',
    image: '/images/diva-dashboard.png',
    link: '#',
    github: '',
    tags: ['SaaS', 'Fintech'],
    category: ['saas', 'fullstack'],
    tech: ['Google Sheets', 'Excel', 'Word docs'],
  },
  {
    id: 'agendux',
    title: 'Agendux',
    description:
      'No-shows are the quiet cost of every appointment business. Reminders reach clients on WhatsApp, and a cancelled slot gets offered again.',
    image: '/images/agendux.png',
    link: 'https://agendux.com',
    github: '',
    tags: ['SaaS', 'Booking'],
    category: ['saas', 'fullstack'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'WhatsApp API', 'Google Calendar', 'Mercado Pago'],
  },
  {
    id: 'eduardo-portals',
    title: 'Automotive Portals Integration',
    description:
      'Selling cars on 6 Brazilian portals meant 6 manual re-postings a day. Laravel API integrations sync each platform automatically and stay reliable.',
    image: '/images/eduardo-portals.png',
    link: '#',
    github: '',
    tags: ['Fullstack', 'Integration'],
    category: ['fullstack'],
    tech: ['PHP', 'Laravel', 'REST API'],
  },
  {
    id: 'diva-crypto-panel',
    title: 'Diva Crypto Investment Panel',
    description:
      'A crypto investment dashboard needed Web3 wallet integration and live token APIs. Key features optimized, new integrations added without breaking the panel.',
    image: '/images/diva-crypto.png',
    link: '#',
    github: '',
    tags: ['Blockchain', 'Fintech'],
    category: ['blockchain', 'fullstack'],
    tech: ['Blockchain', 'Cryptocurrency', 'Web3', 'API', 'JavaScript'],
  },
  {
    id: 'matheus-saas',
    title: 'Virtual Commercial Assistant SaaS',
    description:
      'SMBs (delivery, barbershops, clinics, retail) needed a WhatsApp assistant with STT and per-client JSON config. MVP built for stability over intelligence.',
    image: '/images/matheus-saas.png',
    link: '#',
    github: '',
    tags: ['AI', 'SaaS'],
    category: ['ai', 'saas', 'fullstack'],
    tech: ['Node.js', 'Python', 'MongoDB', 'MySQL', 'ML', 'NLP'],
  },
  {
    id: 'diva-investment',
    title: 'Diva Investment Management App',
    description:
      'Tracking stocks and foreign-currency investments across accounts was scattered. Consolidated wealth view with per-asset tracking and currency conversion.',
    image: '/images/diva-investment.png',
    link: '#',
    github: '',
    tags: ['SaaS', 'Fintech'],
    category: ['saas', 'fullstack'],
    tech: ['PHP', 'MySQL', 'Python', 'React.js', 'API', 'Data Modeling'],
  },
  {
    id: 'ana-lopez',
    title: 'Ana Lopez AI Redesign',
    description:
      'An AI-industry site needed a futuristic redesign and technical SEO. UI/UX overhauled, structure and load speed optimized, mobile compatibility fixed.',
    image: '/images/ana-lopez.png',
    link: '#',
    github: '',
    tags: ['SaaS', 'SEO'],
    category: ['fullstack'],
    tech: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Responsive Design'],
  },
  {
    id: 'impact-processor',
    title: 'Impact Processor CSR26',
    description:
      'An ESG plastic-credit protocol needed dynamic weekly pricing and a 5/45/50 vesting rule on-chain. Stripe Split handles automated commission distribution.',
    image: '/images/impact-processor.png',
    link: '#',
    github: '',
    tags: ['Blockchain', 'Fintech'],
    category: ['blockchain'],
    tech: ['Blockchain', 'Python', 'Stripe Connect', 'SQL', 'Hetzner VPS'],
  },
  {
    id: 'volodymyr-bot',
    title: 'Educational Chatbot',
    description:
      'A single-lesson pilot needed to prove the interaction model before scaling. Multiple-choice mechanics, lesson import system and lightweight CMS designed.',
    image: '/images/volodymyr-bot.png',
    link: '#',
    github: '',
    tags: ['AI', 'Education'],
    category: ['ai', 'fullstack'],
    tech: ['Python', 'JavaScript', 'SQL', 'Chatbot', 'CMS'],
  },
  {
    id: 'spraicoin',
    title: 'Spraicoin Token + Presale',
    description:
      'A new token needed a smart contract and a presale API wired into the existing site. Full implementation guaranteed API security and correct token interaction.',
    image: '/images/spraicoin.png',
    link: 'https://spraicoin.github.io',
    github: '',
    tags: ['Blockchain', 'DeFi'],
    category: ['blockchain'],
    tech: ['Cryptocurrency', 'PHP', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'lince',
    title: 'LINCE Water Monitoring',
    description:
      'Water treatment failures were found after the damage, through paper reports. AI now surfaces anomalies from live data while they are still cheap to fix.',
    image: '/images/lince.png',
    link: 'https://linceresultados.com',
    github: '',
    tags: ['AI', 'IoT'],
    category: ['ai', 'fullstack'],
    tech: ['JavaScript', 'MySQL', 'Python', 'ML', 'API', 'Bootstrap'],
  },
  {
    id: 'apoteke',
    title: 'Apoteke.me Pharmacy Locator',
    description:
      'Finding a medicine in stock meant calling pharmacies one at a time. Google Maps + Street View + radius search + data scraping built the map.',
    image: '/images/apoteke.png',
    link: 'https://apoteke.me',
    github: '',
    tags: ['Fullstack', 'Maps'],
    category: ['fullstack'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Google Maps', 'Web Scraping'],
  },
  {
    id: 'dexspeed',
    title: 'DexSpeed DEX on Solana',
    description:
      'Traders leave when the price moves between the click and the fill. Sub-second execution on Solana keeps the order book worth using.',
    image: '/images/dexspeed.png',
    link: 'https://www.dexspeed.com.br',
    github: '',
    tags: ['Blockchain', 'DeFi'],
    category: ['blockchain'],
    tech: ['Rust', 'Anchor', 'Solana', 'SPL Tokens', 'Jupiter', 'React'],
  },
  {
    id: 'ebookito-mobile',
    title: 'Ebookito Crypto Payment App',
    description:
      'A Solana DEX mobile app needed adjustments and new features on iOS and Android. High-speed EBK + SPL token swaps with minimal fees.',
    image: '/images/ebookito-mobile.png',
    link: 'https://www.dexspeed.com.br',
    github: 'https://github.com/Ebookito/dex-frontend',
    tags: ['Blockchain', 'Mobile'],
    category: ['blockchain', 'fullstack'],
    tech: ['Android', 'iOS', 'Solana', 'Java', 'Kotlin', 'Swift'],
  },
  {
    id: 'kateryna-scanner',
    title: 'Ethereum DEX Scanner',
    description:
      'Real-time swap events on Uniswap V2 needed a Node.js scanner. The Graph subgraph + ethers RPC log scanning fed analytics and alerts.',
    image: '/images/kateryna-scanner.png',
    link: '#',
    github: '',
    tags: ['Blockchain', 'DeFi'],
    category: ['blockchain'],
    tech: ['Node.js', 'JavaScript', 'Ethereum', 'The Graph', 'ethers'],
  },
  {
    id: 'trading-bot',
    title: 'MT5 Trading Bot',
    description:
      'A strategy only earns if it runs the same way every time, including at 3am and during bad news. The bot holds the rules and the risk limits.',
    image: '/images/trading-bot.png',
    link: 'https://www.tradingview.com',
    github: '',
    tags: ['Python', 'Fintech'],
    category: ['ai', 'trading'],
    tech: ['Python', 'MetaTrader5 API', 'Pandas', 'RSI', 'MACD', 'EMA'],
  },
];

export const blockchainHighlights = [
  {
    title: 'Vetra (VTR) Stablecoin',
    subtitle: 'Polygon PoS + Chainlink',
    desc: 'A stablecoin is only trusted if anyone can check the reserves at any moment. Chainlink Functions verifies them in real time.',
    color: '#34d399',
  },
  {
    title: 'ERC-20 Token Deployments',
    subtitle: 'Multiple Clients',
    desc: 'Tokens carrying real value need clear permissions and a stop button before launch, not after the first incident.',
    color: '#818cf8',
  },
  {
    title: 'DexSpeed DEX on Solana',
    subtitle: 'SPL Token Exchange',
    desc: 'Traders abandon an exchange that lags. Sub-second execution is what keeps volume on the book.',
    color: '#22d3ee',
  },
];

export const aiHighlights = [
  {
    tool: 'OpenAI API',
    projects: ['BookProof', 'Vectux AI'],
    color: '#818cf8',
    desc: 'Editing passes and course recommendations that used to require a person reading every line.',
  },
  {
    tool: 'Gemini 1.5 Flash',
    projects: ['Predia Digital'],
    color: '#c084fc',
    desc: 'Clients send voice notes on WhatsApp. The booking gets made without staff listening to any of them.',
  },
  {
    tool: 'LangChain',
    projects: ['LINCE', 'Vectux AI'],
    color: '#22d3ee',
    desc: 'Pipelines that let a system answer from the company documents it was given, instead of guessing.',
  },
  {
    tool: 'Whisper (OpenAI)',
    projects: ['Predia Digital'],
    color: '#34d399',
    desc: 'Voice messages turned into text the system can act on, so support stops being a listening job.',
  },
  {
    tool: 'Stable Diffusion',
    projects: ['Custom Tooling'],
    color: '#fbbf24',
    desc: 'Image generation built into tools clients use directly, without a designer in the loop for every asset.',
  },
];

export const tradingBotFeatures = [
  { label: 'Multi-Indicator Strategy', desc: 'RSI + MACD + EMA + Fibonacci multi-timeframe confirmations' },
  { label: 'Dual-Bot Architecture',   desc: 'Separate buy/sell bots for cleaner, isolated logic' },
  { label: 'News Filter',             desc: 'Avoids high-impact events to minimize risk exposure' },
  { label: 'Backtesting Engine',      desc: 'Detailed equity curve, drawdown, and profit factor reports' },
  { label: 'Risk Dashboard',          desc: 'Adjust lot size, SL, TP without touching code' },
  { label: 'Session Limits',          desc: 'Daily drawdown caps and automatic stop criteria' },
];

export const clientProof = {
  average: '5.00',
  // Total delivered across direct hiring AND platforms. Deliberately a "+" figure
  // so it never goes stale as the count keeps climbing.
  delivered: '50+',
  // Workana review basis. Only used for AggregateRating reviewCount so the schema
  // stays verifiable against the public profile.
  ratedProjects: 43,
  // Also a "+" figure — keeps climbing, never goes stale.
  repeatClients: '11+',
  source: 'Workana',
};

export const testimonials: Testimonial[] = [
  {
    id: 'marcello-lavalle',
    quote:
      'He is not just a developer, but a high-level technical partner able to engineer complex ESG and fintech solutions from scratch. He turned sophisticated industrial logic into a fluid digital platform. He bridges the gap between complex business requirements and clean, functional code.',
    author: 'Marcello Lavalle',
    project: 'ESG and blockchain protocol platform',
    translatedFrom: 'Italian',
  },
  {
    id: 'fabio-crypto',
    quote:
      'Every stage was delivered with precision and care, inside deadlines I did not think were possible. His dedication cut my waiting time by 99%, which saved me money and let me go live far sooner, starting to profit almost immediately.',
    author: 'Fábio Raymundo Reis de Assumpção',
    project: 'Crypto payment application',
    translatedFrom: 'Portuguese',
  },
  {
    id: 'lionel-estefan',
    quote:
      'He made Agendux the complete SaaS appointment booking platform I envisioned, fully functional, stable and production-ready. What impressed me most was his ability to solve complex technical challenges. He was always responsive and transparent, and he far exceeded the original scope.',
    author: 'Lionel Estefan',
    project: 'Agendux booking platform',
  },
  {
    id: 'deborah-lirio',
    quote:
      'From the first contact he was extremely helpful, patient and professional. What I liked most was his commitment to delivering work that is genuinely well done. The result was exactly as I imagined it, and the whole process was calmer thanks to his dedication.',
    author: 'Deborah De Carvalho Lirio',
    project: 'Sloen mobile app MVP',
    translatedFrom: 'Portuguese',
  },
  {
    id: 'volodymyr-horbat',
    quote:
      'He quickly understood the existing system, validated the lesson logic, and improved the interaction flow with a clear, structured approach. He designed a clean, database-friendly content structure that makes future imports straightforward. Well executed and delivered on time.',
    author: 'Volodymyr Horbat',
    project: 'Interactive educational bot',
  },
  {
    id: 'fabiana',
    quote:
      'Reliable, honest and fast developer. He gave solutions that were coherent with the project. Thank you.',
    author: 'Fabiana',
    project: 'Water monitoring and management system',
    translatedFrom: 'Portuguese',
  },
  {
    id: 'fabio-dex',
    quote:
      'Very competent, dedicated and committed to delivery. He showed technical command, organisation and good communication throughout. The work went beyond expectations while always respecting the resources I had available.',
    author: 'Fábio Raymundo Reis de Assumpção',
    project: 'Solana DEX with Jupiter integration',
    translatedFrom: 'Portuguese',
  },
  {
    id: 'kateryna-iliuts',
    quote:
      'He delivered ahead of schedule, with perfect technical results and a clear understanding of the requirements. The final result was accurate, clean and fully functional, showing great attention to detail and a truly professional approach.',
    author: 'Kateryna Iliuts',
    project: 'Ethereum DEX scanner',
  },
  {
    id: 'filipe-souza',
    quote:
      'He completed the project with excellence, replies very quickly, makes every step of the execution clear, and shows deep knowledge of the subject.',
    author: 'Filipe Oliveira de Souza',
    project: 'Automated Pinterest publishing system',
    translatedFrom: 'Portuguese',
  },
  {
    id: 'lucas-maeda',
    quote:
      'Very agile and fast, effective and to the point, even on complex work.',
    author: 'Lucas Maeda',
    project: 'Angular and GraphQL front-end integration',
    translatedFrom: 'Portuguese',
  },
  {
    id: 'alma-mayorista',
    quote:
      'He built a fully functional store from a local Microsoft SQL Server instance. Impressive work. I hope we can keep working together.',
    author: 'Alma Mayorista',
    project: 'Online store synced to SQL Server',
    translatedFrom: 'Spanish',
  },
  {
    id: 'matheus-costa',
    quote:
      'Excellent professional. Fast, polite, great work. Recommended.',
    author: 'Matheus da Silva Oliveira Costa',
    project: 'WhatsApp AI assistant MVP',
    translatedFrom: 'Portuguese',
  },
];

export const education = [
  {
    degree: 'Bachelor of Business Administration (BBA)',
    field: 'Business',
    university: 'Purdue University',
    location: 'West Lafayette, IN, USA',
    period: '2018 – 2024',
    graduated: '2024',
    link: 'https://www.purdue.edu',
  },
  {
    degree: 'Bachelor of Science in Information Technology',
    field: 'Computer Engineering',
    university: 'University of Louisville',
    location: 'Louisville, KY, USA',
    period: '2012 – 2017',
    graduated: '2017',
    link: 'https://louisville.edu',
  },
];

export const certifications = [
  { name: 'Certified Blockchain Developer',        color: '#34d399' },
  { name: 'JavaScript Algorithms & Data Structures', color: '#fbbf24' },
  { name: 'freeCodeCamp – Responsive Web Design',   color: '#818cf8' },
];

export const languages = [
  { name: 'English',   level: 'Native / Bilingual Proficiency',   pct: 100, code: 'EN' },
];
