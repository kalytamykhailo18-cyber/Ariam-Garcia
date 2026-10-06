export interface Service {
  slug: string;
  title: string;
  tagline: string;
  metaDescription: string;
  keywords: string;
  heroBody: string;
  whyItMatters: string;
  whatYouGet: string[];
  stack: string[];
  featuredProjectIds: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'custom-booking-and-scheduling-systems',
    title: 'Custom Booking & Scheduling System Development',
    tagline: 'Own the appointment engine your business already runs on.',
    metaDescription:
      'Custom booking and scheduling system development. Real-time Google Calendar sync, WhatsApp reminders, MercadoPago and Stripe subscriptions, multi-tenant SaaS. 5.00 rating on Workana.',
    keywords:
      'custom booking system, appointment scheduling software, booking software developer, calendar sync, google calendar API, whatsapp reminders, mercadopago subscriptions, custom saas booking, hire booking system developer, freelance booking developer',
    heroBody:
      'No-shows and double-bookings are the quiet cost of every appointment business. A generic Calendly plan hits its wall the day you need per-professional schedules, WhatsApp reminders in your voice, tenant isolation for multiple locations, or a payment link that keeps the money in your MercadoPago account. I build the booking system your business already runs on — as code you own, on infrastructure you control.',
    whyItMatters:
      'The moment your booking flow depends on a SaaS you rent, every future decision (a new professional, a new payment method, a change in the confirmation SMS) becomes a support ticket. When the platform lifts prices, changes limits, or deprecates an integration, the business has no answer. Owning the code closes that door.',
    whatYouGet: [
      'Real-time bidirectional Google Calendar sync per professional, so bookings never collide with personal events.',
      'WhatsApp Business Cloud API reminders (official — never Baileys or Evolution) in the tone the business already uses.',
      'MercadoPago, Stripe or Payway subscriptions with plans, trial periods, MSI (meses sin intereses) and signed HMAC webhooks.',
      'Multi-tenant architecture — one deployment serves 1 clinic or 400 clinics, each with isolated data.',
      'PostgreSQL on a DigitalOcean droplet the client owns. No AWS lock-in, no Supabase surprise bills.',
      'Cancellation slot reuse — a slot released 4 hours before is offered again automatically to the waitlist.',
      'Encrypted patient / client data with role-based access, TOTP 2FA and full audit log.',
      'WebSockets for live-slot updates on the booking page so two clients cannot claim the same slot.',
    ],
    stack: ['Next.js 14/15', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'WhatsApp Cloud API', 'Google Calendar API', 'MercadoPago', 'Stripe', 'Socket.io', 'Docker', 'DigitalOcean'],
    featuredProjectIds: ['agendux', 'if7sports', 'articket', 'sensu-angela'],
    faq: [
      {
        q: 'How long does a production-ready custom booking system take?',
        a: 'The MVP (calendar, booking flow, WhatsApp reminders, one payment integration, one admin panel) ships in 3–4 weeks. Multi-tenant, subscription plans, waitlist and cancellation logic add another 2–3 weeks. Everything is delivered as code the client owns, deployed to their own DigitalOcean droplet.',
      },
      {
        q: 'Why not use Calendly, Cal.com, Acuity or SimplyBook?',
        a: 'For a single professional they are fine. For a business with 3+ practitioners, custom reminder templates, split payments to different accounts, insurance-specific flows, or a bilingual patient experience, the SaaS ceiling comes fast. Every workaround becomes a maintenance debt. Owning the code costs slightly more upfront and pays back inside 8–12 months by removing every per-user fee.',
      },
      {
        q: 'Can WhatsApp reminders send automatically without paying per message?',
        a: 'They use WhatsApp Business Cloud API official (via a Business Solution Provider), which is what Meta requires for automated flows. The per-conversation cost is Meta official pricing — much lower than any third-party BSP markup, and there is no per-contact SaaS fee on top.',
      },
      {
        q: 'What happens when the booking system is live?',
        a: 'A 60-day warranty covers any behavioral defect free of charge. After that, ongoing maintenance is optional and charged per hour actually worked, not a subscription. Most clients stay in touch for evolution (new features, new payment methods, new integrations), not for keep-it-running work.',
      },
      {
        q: 'Where does the code and the data live?',
        a: 'On a DigitalOcean droplet in the client\'s own account. PostgreSQL runs on the same droplet as the application (never a separate Supabase / RDS instance). The GitHub repository is transferred to the client\'s organization at delivery.',
      },
    ],
  },
  {
    slug: 'operations-automation-development',
    title: 'Operations Automation — Replace Spreadsheets, Paper and Manual Workflows',
    tagline: 'Software the team stops having to think about.',
    metaDescription:
      'Custom operations automation development. Replace spreadsheets, WhatsApp groups and paper forms with software that runs itself. AFIP invoicing, Google Sheets sync, MercadoPago, ERP integrations.',
    keywords:
      'operations automation, business process automation, custom internal tool, ERP integration, AFIP invoicing, google sheets automation, mercadopago integration, custom CRM development, hire automation developer, replace excel with software',
    heroBody:
      'The spreadsheet works. The WhatsApp group works. The clipboard works. Until the day the company doubles in size and the same tools start losing invoices, dropping stock counts and hiding the balance sheet. That is when automation stops being a nice-to-have and becomes the only way to keep growing. I replace those workflows with software the team stops having to think about.',
    whyItMatters:
      'Every hour spent on manual re-typing is an hour not spent selling, serving, or building. More dangerously, every manual step is a place where the operation can fail silently. Automation is not about removing people from the loop — it is about removing the fragile steps between them.',
    whatYouGet: [
      'ERP layer over the POS you already own (Distrialma has a live SQL Server sync running under a Next.js dashboard).',
      'AFIP electronic invoicing (RG 5616) with Comprobantes A, B, C, Notas de Crédito, per-day cierre de caja.',
      'Google Sheets ↔ database sync — the team keeps editing the spreadsheet they know, the app just reads / writes.',
      'MercadoLibre v1, TiendaNube v1, Facebook, Instagram, WhatsApp — all unified into one inbox with 5-role RBAC.',
      'Bulk stock and price Excel operations that used to take 3 hours now run in 30 seconds.',
      'Live Cuadro de Cuentas Mayores balance sheet computed from the same POS the store already runs.',
      'Automated PDF / receipt generation with per-branch branding.',
      'Cron-scheduled backups to Google Drive via rclone, plus daily sanity-check emails.',
    ],
    stack: ['Next.js 14/15', 'NestJS', 'Node.js', 'PostgreSQL', 'SQL Server', 'MySQL', 'AFIP SOAP', 'MercadoPago', 'MercadoLibre API', 'TiendaNube API', 'WhatsApp Cloud API', 'rclone', 'Docker'],
    featuredProjectIds: ['distrialma', 'servifibras', 'articket', 'famacon-m2'],
    faq: [
      {
        q: 'What is the shape of an operations-automation project?',
        a: 'The first week is a walk-through of what is being done manually today, followed by a written map of every touchpoint. The MVP replaces one workflow (the one that hurts most) in weeks 2–4. From there each new automation is a 3–7 day increment. Nothing is built without a business consequence attached.',
      },
      {
        q: 'Do you build on Zapier, Make, n8n, Power Automate?',
        a: 'No. Those tools are excellent for hobbyist personal automation. In a business context, every new step becomes a per-execution charge and every debug becomes a black-box adventure. I write it in Node / Python / TypeScript directly, hosted on the client\'s own infrastructure, with proper logging and error handling. It costs less to run and much less to maintain.',
      },
      {
        q: 'Can you integrate with our existing accounting system (Contabilium, Xubio, Bejerman, Tango)?',
        a: 'Yes. Every one of those exposes either a REST API, a database export, or a CSV drop. Integration is usually a 3–5 day job. AFIP electronic invoicing directly to the taxpayer with their own certificate is also standard.',
      },
      {
        q: 'What happens to the spreadsheet the team already uses?',
        a: 'It stays. A Google Sheets sync layer keeps the spreadsheet as an editable front-end where that fits (e.g. bulk price updates), while the database is the source of truth. Nobody is forced to abandon a tool that works.',
      },
    ],
  },
  {
    slug: 'ai-crm-and-chatbot-development',
    title: 'AI CRM & WhatsApp Assistant Development',
    tagline: 'AI put inside the process that already runs, not on top of it.',
    metaDescription:
      'Custom AI CRM and WhatsApp chatbot development with Anthropic Claude Sonnet 5 + Haiku 4.5, complexity-router model routing, RAG grounded on live catalogs, hard guards against price hallucination.',
    keywords:
      'AI CRM development, custom chatbot developer, whatsapp AI assistant, claude API integration, anthropic developer, RAG chatbot, langchain developer, openai integration, hire AI developer, freelance AI CRM, multichannel inbox, sales AI',
    heroBody:
      'Renting an AI assistant SaaS gets you to demo quickly. It also caps you at what that SaaS decides to build, prices you per contact, and hallucinates prices on the products it never saw. I build the AI CRM that lives inside your business — grounded on your real catalog, with hard guards against making up numbers, on infrastructure you own.',
    whyItMatters:
      'Every hallucinated price is a lost sale, a refund, or a lawsuit. Every locked contact list is a moat someone else built around your customers. Every $2,000/month AI SaaS bill scales with growth in the wrong direction. Owning the pipe fixes all three.',
    whatYouGet: [
      'Anthropic Claude Sonnet 5 (for reasoning) + Haiku 4.5 (for routing) with a complexity-classifier that picks the model per turn — 60–80% cost reduction vs Sonnet-only.',
      'RAG grounded on the live product catalog, so the assistant only quotes prices it actually verified against the source.',
      'Hard guards: the assistant is not allowed to invent a SKU, a price, a stock level, or a promise the business cannot keep.',
      'Unified inbox across WhatsApp Business Cloud API, MercadoLibre v1, TiendaNube v1, Facebook Messenger, Instagram, plus a web widget.',
      '5-role RBAC (owner, admin, agent, viewer, bot) with full audit log per conversation.',
      'Handoff to human — the assistant knows when to escalate, and does so before frustrating the customer.',
      'A 263-test Playwright E2E sweep so a schema change never silently breaks a production flow.',
      'Zero-downtime deploy with schema-drift guard — the AI stays online while the underlying database migrates.',
    ],
    stack: ['Anthropic Claude Sonnet 5', 'Claude Haiku 4.5', 'OpenAI GPT-5', 'LangChain', 'Whisper', 'Next.js 15', 'NestJS', 'PostgreSQL', 'pgvector', 'Socket.io', 'WhatsApp Cloud API', 'MercadoLibre API', 'TiendaNube API', 'Playwright'],
    featuredProjectIds: ['servifibras', 'matheus-saas', 'volodymyr-bot', 'pinboatapp'],
    faq: [
      {
        q: 'What model do you use — GPT, Claude, Gemini, Llama?',
        a: 'Claude Sonnet 5 for reasoning and Haiku 4.5 for routing / simple turns, chosen per turn by a complexity classifier. This routing routinely cuts LLM cost by 60–80% without any measurable quality loss. GPT-5 and Gemini are available as fallbacks when a client requires vendor diversity or when a specific benchmark favors them.',
      },
      {
        q: 'How do you prevent the AI from making up product prices or stock levels?',
        a: 'The assistant does not have direct access to a price list in its context. Every price question triggers a RAG query against the live catalog (product API or database), and the assistant is instructed at the prompt level to refuse to answer if the catalog does not confirm the SKU. If it cannot verify, it escalates to a human. This is the single most important design decision in a sales AI.',
      },
      {
        q: 'What about WhatsApp — Baileys, Evolution, Chatwoot, Whapi?',
        a: 'Only WhatsApp Business Cloud API official (via a Business Solution Provider like Gupshup, 360dialog, Wati or Twilio). Baileys, Evolution and every other unofficial method violates WhatsApp\'s ToS, is banned on any real business number within days, and is a professional non-starter. Meta charges per conversation directly — cheaper than any wrapper.',
      },
      {
        q: 'Can the AI handle voice notes?',
        a: 'Yes. Whisper transcribes the audio, the transcript enters the same LLM pipeline, and the response goes back as text (or as a synthesized voice note when the client prefers). Predia Digital runs this flow in production for a real-estate booking use case.',
      },
    ],
  },
  {
    slug: 'blockchain-and-smart-contract-development',
    title: 'Blockchain & Smart Contract Development',
    tagline: 'Real tokens, real reserves, real audit trail — no vaporware.',
    metaDescription:
      'Blockchain and smart contract development. ERC-20 tokens, Polygon PoS stablecoin with Chainlink Functions, Solana AMM DEX with Anchor, ESG protocol with Stripe Split. Vetra stablecoin creator.',
    keywords:
      'blockchain developer, smart contract development, ERC-20 token, polygon developer, solana developer, anchor rust, chainlink developer, stablecoin developer, DeFi developer, hire blockchain freelancer, web3 developer, ESG protocol, RWA tokenization',
    heroBody:
      'A token is only as trustworthy as the code that guards it and the mechanism that anchors it to something real. I have shipped the Vetra USD-backed stablecoin on Polygon with Chainlink Functions verifying reserves in real time, an AMM-style DEX on Solana with Anchor, and an ESG plastic-credit protocol with Stripe Split for commission distribution. Every contract has a stop button before launch, not after the first incident.',
    whyItMatters:
      'Blockchain projects fail publicly. A missing pausable modifier, a wrong access role, an unverified oracle feed — any one of them turns into a headline. The premium is not in writing the contract, it is in writing the surrounding controls that make the contract survive a bad day.',
    whatYouGet: [
      'Solidity ERC-20 / ERC-721 with pausable, ownable and role-based access as design defaults.',
      'Chainlink Functions and Chainlink Automation for verifiable off-chain data and scheduled on-chain jobs.',
      'Polygon PoS as the default L2 for token launches (low fees, real users, EVM-compatible tooling).',
      'Solana + Anchor for high-throughput protocols (DEXes, order books, in-game economies).',
      'SPL tokens and Jupiter Aggregator integration for real Solana DeFi liquidity.',
      'Stripe Connect / Stripe Split for automated real-world commission distribution alongside on-chain flows.',
      'Full test coverage before deployment (Hardhat / Foundry for EVM, Anchor tests for Solana).',
      'Deployment scripts, verified contracts on Etherscan / Solscan, and a written incident response plan.',
    ],
    stack: ['Solidity', 'Hardhat', 'Foundry', 'OpenZeppelin', 'Polygon PoS', 'Chainlink Functions', 'Solana', 'Rust', 'Anchor', 'SPL Tokens', 'Jupiter Aggregator', 'ethers.js', 'The Graph', 'Stripe Connect'],
    featuredProjectIds: ['dexspeed', 'impact-processor', 'spraicoin', 'kateryna-scanner', 'diva-crypto'],
    faq: [
      {
        q: 'Is Ariam Garcia Balmaseda the creator of a real stablecoin?',
        a: 'Yes. Vetra (VTR) is a USD-backed stablecoin deployed on Polygon PoS with Chainlink Functions verifying reserves in real time. It is not a hype token — it exists as a production reference of how a reserve-backed asset can be structured and how the reserve mechanism can be made publicly verifiable.',
      },
      {
        q: 'Do you deploy on mainnet, testnet, or both?',
        a: 'Both, depending on the phase. Every contract is first audited against a test suite on Hardhat / Foundry, then deployed to a public testnet (Amoy for Polygon, devnet for Solana) with client-facing end-to-end tests, then promoted to mainnet with a written deployment checklist. The client always signs the mainnet deployment transaction — nobody else touches those keys.',
      },
      {
        q: 'Do you audit contracts written by other developers?',
        a: 'Yes, as a defined-scope engagement. A code review + threat model + written report typically takes 5–10 business days depending on the surface area. This is separate from writing the contract myself — the audit engagement is priced and delivered as a standalone.',
      },
      {
        q: 'Will you build a memecoin / rug / anonymous project?',
        a: 'No. Every engagement requires a legal counterparty, a stated real-world use case, and a contract with a stop mechanism. This is a permanent policy — reputation compounds, and reputation is the whole business.',
      },
    ],
  },
  {
    slug: 'security-engineering-and-incident-response',
    title: 'Security Engineering & Incident Response',
    tagline: 'Get the attacker out, then make getting back in expensive.',
    metaDescription:
      'Security engineering and incident response for production systems. Malware eradication, CVE mitigation with custom patches, penetration testing, AES-256-GCM encryption, RBAC, TOTP 2FA, fail2ban and firewalld hardening, ongoing SOC monitoring.',
    keywords:
      'incident response, security engineer, malware eradication, CVE mitigation, penetration testing, server hardening, fail2ban firewalld, SOC monitoring, cybersecurity freelancer, compromised server recovery, AES-256-GCM encryption, RBAC, TOTP 2FA, zimbra security, cryptominer removal',
    heroBody:
      'A compromised production server is not a ticket, it is a clock. Every hour the attacker holds root is another hour of exfiltrated data, another persistence mechanism planted, another customer record at risk. I do the full incident response workflow — triage without destroying evidence, eradication, credential rotation, patching, and the hardening that makes a second compromise expensive.',
    whyItMatters:
      'Most breaches are not sophisticated. They are an unpatched CVE, a reused password, or an exposed admin panel. What separates a bad week from a company-ending event is whether anyone was watching, whether the response preserved evidence, and whether the hardening afterward was real or theatrical.',
    whatYouGet: [
      'Triage that preserves evidence — process tree, network connections, auth logs and a full disk image captured before anything is killed.',
      'Malware eradication: cryptominers, reverse shells, persistence crontabs, unauthorized SSH keys, modified rc.local.',
      'CVE mitigation — including custom patches when the vendor fix has not shipped yet (CVE-2024-45519 was closed with a hand-written Perl patch on a live Zimbra server).',
      'Full credential rotation on the assumption the attacker has everything.',
      'fail2ban + firewalld hardening, SSH key-only auth, root login disabled, auditd rules on sensitive paths.',
      'Application-layer security: AES-256-GCM encryption at rest, JWT with refresh-token rotation, RBAC, TOTP 2FA, audit logging.',
      'Penetration testing against your own stack before an attacker does it for you.',
      'A written incident report with the compromise timeline, actions taken, and residual risks — the document your lawyer and your insurer will ask for.',
      'Optional weekly SOC review on retainer for early detection of re-compromise.',
    ],
    stack: ['Incident Response', 'Perl / Bash custom patching', 'fail2ban', 'firewalld', 'auditd', 'Zimbra', 'CentOS / Ubuntu', 'Nmap', 'Burp Suite', 'AES-256-GCM', 'JWT', 'TOTP 2FA', 'Sentry', 'rclone offsite backups'],
    featuredProjectIds: ['hilong-ecuador', 'valee', 'articket', 'servifibras'],
    faq: [
      {
        q: 'Our server is compromised right now. How fast can you start?',
        a: 'Immediately. The first two hours are pure observation — no reboots, no kills — because a reboot destroys the volatile evidence that tells you what the attacker did and how they got in. Send SSH access and a description of what you observed, and triage starts the same hour.',
      },
      {
        q: 'What if the vendor has not released a patch for the CVE yet?',
        a: 'Then we write one. On the Hilong Ecuador engagement the official Zimbra fix for CVE-2024-45519 had not shipped and the mail server needed to be back online that day. A 40-line Perl patch closed the exploitable surface, logged attempts, and was removed 4 days later when the official patch landed. It is not a permanent fix — it is a bridge that keeps the business running.',
      },
      {
        q: 'Do you offer ongoing monitoring, or only one-off incident work?',
        a: 'Both. Incident response is a defined-scope engagement. Weekly SOC review — auth failures, unusual processes, outbound connections, filesystem changes on sensitive paths — is a small monthly retainer. Most clients who go through an incident take the retainer afterward.',
      },
      {
        q: 'Can you do penetration testing before anything goes wrong?',
        a: 'Yes, with written authorization from the system owner. Scope is agreed in advance, testing is non-destructive by default, and the deliverable is a written report with findings ranked by exploitability and a remediation plan. No testing happens without a signed scope — that is the line between security work and a crime.',
      },
    ],
  },
  {
    slug: 'fintech-and-payment-systems',
    title: 'Fintech & Payment System Integration',
    tagline: 'Money moves correctly, or it does not move at all.',
    metaDescription:
      'Fintech and payment system development. Stripe Connect, Split and MSI, MercadoPago with signed HMAC webhooks, Payway/Decidir, AFIP electronic invoicing RG 5616, financial PDF parsing, reconciliation engines, live balance sheets.',
    keywords:
      'fintech developer, payment integration, stripe connect developer, stripe split payments, mercadopago hmac webhook, payway decidir integration, AFIP RG 5616 electronic invoicing, meses sin intereses MSI, financial reconciliation, PDF bank statement parsing, wallet system, escrow system, subscription billing',
    heroBody:
      'Payments are the one part of a product where "mostly works" is indistinguishable from broken. A dropped webhook sells the same seat twice. An unverified signature lets anyone forge a payment confirmation. A rounding error in a commission split becomes a dispute six months later. I build the money layer with the paranoia it deserves.',
    whyItMatters:
      'Every payment integration has a happy path that takes an afternoon and an edge-case surface that takes weeks — duplicate webhooks, partial refunds, chargebacks, currency conversion, installment plans, split payouts, tax compliance. The afternoon version is what most freelancers deliver. The difference shows up in the first month of real volume.',
    whatYouGet: [
      'Stripe — Checkout, Billing, Connect (marketplace payouts), Split (automated commission distribution), and MSI (meses sin intereses) for Mexican cards.',
      'MercadoPago with signed HMAC webhook verification, idempotency by transaction ID, and replay protection. Skipping signature verification is the most common payment bug in LATAM and it is a 6-line fix.',
      'Payway / Decidir for Argentine card processing alongside MercadoPago as a fallback rail.',
      'AFIP electronic invoicing (RG 5616) via WSFEv1 SOAP with the client\'s own X.509 certificate — Comprobantes A, B, C and Notas de Crédito issued directly from your system.',
      'Reconciliation engines that cross-reference bank statements against internal records and surface only the discrepancies.',
      'Financial PDF parsing — extract and normalize transactions from bank statements across dozens of account formats.',
      'Live balance sheet / Cuadro de Cuentas Mayores computed from the same transactional data the POS already writes.',
      'Internal wallet and escrow mechanics with an immutable ledger — every balance change is an append-only row, never an UPDATE.',
      'Subscription billing with plans, trials, proration, dunning and involuntary-churn recovery.',
    ],
    stack: ['Stripe', 'Stripe Connect', 'Stripe Split', 'MercadoPago', 'Payway / Decidir', 'PayPal', 'AFIP WSFEv1 SOAP', 'PostgreSQL', 'Prisma', 'Python (pdfplumber)', 'Node.js', 'NestJS', 'Redis', 'Playwright'],
    featuredProjectIds: ['distrialma', 'impact-processor', 'milena-fintech', 'articket', 'bookproof'],
    faq: [
      {
        q: 'Which payment provider should we use in LATAM?',
        a: 'MercadoPago is the default for Argentina, Mexico, Brazil, Chile and Colombia — highest conversion because buyers already have an account and it supports local installments. Stripe is better when you need marketplace payouts (Connect), sophisticated subscription logic, or international cards. Most serious projects run both: MercadoPago as the primary rail, Stripe for international and for split payouts.',
      },
      {
        q: 'What is the most common payment integration mistake you see?',
        a: 'Not verifying the webhook signature. Both MercadoPago and Stripe sign their webhooks. If your endpoint accepts unsigned POSTs, anyone who discovers the URL can forge a paid-order confirmation and walk away with product. The second most common is non-idempotent webhook handling — the provider retries on timeout, and a non-idempotent handler double-credits the customer.',
      },
      {
        q: 'Can you handle AFIP electronic invoicing directly from our app?',
        a: 'Yes. Direct WSFEv1 SOAP integration using your own taxpayer certificate — no third-party invoicing SaaS in the middle taking a per-invoice fee. Distrialma has been issuing Comprobantes A, B, C and Notas de Crédito this way since 2026-03 with zero AFIP rejections.',
      },
      {
        q: 'How do you handle money in the database?',
        a: 'Integer minor units (centavos, cents), never floats. Ledger tables are append-only — a balance is the sum of its entries, never a mutable column. Every write that touches money takes a row-level lock. These three rules eliminate the entire class of bugs that produce "the numbers do not add up" tickets.',
      },
    ],
  },
  {
    slug: 'mobile-app-development-ios-android',
    title: 'Mobile App Development — iOS, Android, Cross-Platform',
    tagline: 'Ship to the App Store and Google Play, without the SaaS wrapper tax.',
    metaDescription:
      'Custom mobile app development for iOS and Android. React Native, Flutter, native Kotlin/Swift, Capacitor iOS wrappers and Bubblewrap Android TWA. Published to App Store and Google Play.',
    keywords:
      'mobile app developer, iOS developer, android developer, react native developer, flutter developer, capacitor iOS wrapper, android TWA, app store deployment, google play deployment, hire mobile developer, PWA to native',
    heroBody:
      'A Progressive Web App gets you the whole feature set at 5% of the cost. A native app gets you the App Store shelf and push notifications that survive the phone locking. I ship both — a Next.js PWA wrapped in Capacitor for iOS and packaged with Bubblewrap as an Android TWA — from a single codebase.',
    whyItMatters:
      'Every "we\'ll build native later" turns into two disconnected codebases and three years of divergence. The right shape for most B2B and consumer service apps is a single web codebase presented natively through the App Store and Google Play. It halves the maintenance and doubles the shipping velocity.',
    whatYouGet: [
      'Next.js 15 PWA as the single source of truth — every feature lives in one codebase.',
      'Capacitor iOS wrapper published to the App Store under the client\'s Apple Developer account.',
      'Android TWA via Bubblewrap published to Google Play under the client\'s Play Console.',
      'Native push notifications (APNs on iOS, FCM on Android) wired through the PWA layer.',
      'Biometric authentication (Face ID, Touch ID, Android Biometric) via native plugins.',
      'Offline-first data layer with IndexedDB + service worker + optimistic updates.',
      'GitHub Actions CI publishing new builds on tag push (macos-26 runner for iOS).',
      'App Store review passes on first submission — every rejection reason is anticipated before submit.',
    ],
    stack: ['React Native', 'Flutter', 'Next.js PWA', 'Capacitor iOS', 'Bubblewrap Android TWA', 'Swift', 'Kotlin', 'Java', 'APNs', 'FCM', 'GitHub Actions macos-26', 'IndexedDB', 'Workbox'],
    featuredProjectIds: ['sensu-angela', 'valee', 'ebookito-mobile', 'articket'],
    faq: [
      {
        q: 'Native vs React Native vs Flutter vs PWA — which one?',
        a: 'For 80% of business apps, a Next.js PWA wrapped in Capacitor (iOS) and packaged as Android TWA (Google Play) is the right answer. It uses one codebase, ships in weeks not quarters, and passes App Store review reliably. Native Swift / Kotlin is reserved for apps that genuinely need iOS-specific frameworks (CarPlay, HealthKit, HomeKit, deep camera access) or extreme performance (real-time video effects, games).',
      },
      {
        q: 'Do you publish under our Apple Developer / Google Play account, or yours?',
        a: 'Always under the client\'s account. Publishing under a freelancer\'s account is a red flag on future acquisitions and a mess if the freelancer relationship ends. Setup of the Apple Developer account (US$99/year) and Google Play Console (US$25 one-time) is part of the engagement.',
      },
      {
        q: 'How long does App Store review take?',
        a: 'For a well-formed submission, Apple review is typically 24–72 hours. Rejections come from missing metadata, unclear demo credentials, or IAP misconfigurations — all preventable at submit time. I have a preflight checklist that has passed first-submit reviews for Sensu Angela and Valee among others.',
      },
      {
        q: 'What about push notifications for the PWA-wrapped variant?',
        a: 'They work natively. Capacitor exposes APNs to the iOS PWA layer, and the Android TWA has full FCM support. The web codebase calls a single unified API, the platform adapter routes to the right underlying provider.',
      },
    ],
  },
];
