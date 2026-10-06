// Buyer-intent landing pages. These target how clients search when they are
// ready to pay ("hire a blockchain developer") rather than definitional head
// terms ("software engineer") which are owned by Wikipedia/Indeed and carry
// zero purchase intent.

export interface HireRole {
  slug: string;
  role: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  intro: string;
  theRealProblem: string;
  whatIBring: string[];
  proofProjectIds: string[];
  relatedServiceSlug: string;
  alsoSearchedAs: string[];
  faq: { q: string; a: string }[];
}

export const hireRoles: HireRole[] = [
  {
    slug: 'full-stack-developer',
    role: 'Full-Stack Developer',
    h1: 'Hire a senior full-stack developer',
    metaTitle: 'Hire a Senior Full-Stack Developer — Next.js, Node, PostgreSQL',
    metaDescription:
      'Hire Ariam Garcia Balmaseda, senior full-stack developer with 10+ years and 50+ delivered projects at a 5.00 rating. Next.js, Node/NestJS, PostgreSQL. Code the client owns, on infrastructure the client controls.',
    keywords:
      'hire full stack developer, hire senior developer, freelance full stack developer, nextjs developer for hire, node.js developer hire, react developer freelance, postgresql developer, remote full stack engineer, contract developer, hire web developer',
    intro:
      'One person who owns the whole thing — database schema, API, frontend, deployment, and the production incident at 2am. No handoffs between a backend contractor and a frontend contractor who blame each other when something breaks.',
    theRealProblem:
      'Most projects do not fail on code quality. They fail because responsibility is split across people who each did their part correctly and nobody owned the seam between them. A single senior full-stack engineer removes every seam.',
    whatIBring: [
      '10+ years shipping production software. 50+ projects delivered across direct clients and platforms, 5.00 average rating, 11+ clients who came back.',
      'Next.js 14/15/16 + TypeScript on the front, Node.js or NestJS on the back, PostgreSQL with Prisma underneath.',
      'Deployment included — Docker, Caddy, systemd, Let\'s Encrypt, zero-downtime redeploys with schema-drift guards.',
      'Playwright E2E suites so a schema change never silently breaks a production flow.',
      'The repository is transferred to your GitHub organization at delivery. You own it outright.',
      'Written daily updates in your timezone. English, Spanish or Portuguese.',
      '60-day warranty on behavioral defects, free of charge.',
    ],
    proofProjectIds: ['articket', 'distrialma', 'agendux', 'bookproof'],
    relatedServiceSlug: 'operations-automation-development',
    alsoSearchedAs: ['software engineer', 'web developer', 'backend developer', 'frontend developer', 'application developer', 'product engineer'],
    faq: [
      { q: 'What does "full-stack" actually mean in your case?', a: 'Database design, API architecture, frontend implementation, UI design, deployment, monitoring, and the incident response when something breaks. I do not hand off the design to a designer or the deploy to a DevOps contractor. The whole thing is one person\'s responsibility, which is why nothing falls through a seam.' },
      { q: 'Do you work on existing codebases or only greenfield?', a: 'Both. Roughly half of my engagements are inheriting someone else\'s code — finishing an abandoned project, fixing a broken integration, or modernizing something that outgrew its original shape. For legacy work the first deliverable is a written read of what is actually there before a line is changed.' },
      { q: 'How do you price?', a: 'Honest scope × USD 10/hour, delivered as a written budget in the proposal. The rate does not vary by client or by country. What varies is the scope, and you are always shown which pieces would slide out to hit a specific number.' },
    ],
  },
  {
    slug: 'ai-engineer',
    role: 'AI Engineer',
    h1: 'Hire an AI engineer who ships to production',
    metaTitle: 'Hire an AI Engineer — Claude, RAG, LLM Cost Routing, WhatsApp Assistants',
    metaDescription:
      'Hire an AI engineer for production LLM systems. Anthropic Claude Sonnet 5 + Haiku 4.5 with complexity routing (60-80% cost cut), RAG grounded on live catalogs, hard guards against price hallucination, multi-channel inbox.',
    keywords:
      'hire AI engineer, hire LLM developer, claude api developer for hire, anthropic developer, RAG developer, hire chatbot developer, AI integration freelancer, openai developer hire, AI automation engineer, production LLM engineer, AI consultant for hire',
    intro:
      'Not a prompt consultant. An engineer who puts an LLM inside a process that already runs money through it — with cost routing, grounding, guardrails, escalation to humans, and a test suite that catches regressions before customers do.',
    theRealProblem:
      'The demo always works. What breaks in month two is cost (an unrouted Sonnet-only pipeline is 4x more expensive than it needs to be), hallucinated prices that turn into refunds, and the absence of any way to know the AI gave a bad answer until a customer complains.',
    whatIBring: [
      'Complexity-classifier model routing — Claude Haiku 4.5 for simple turns, Sonnet 5 for reasoning. Measured 74% token cost reduction over 4 weeks of production traffic with no measurable quality drop.',
      'RAG grounded on the live catalog, with the assistant instructed to refuse rather than guess when the source cannot confirm a SKU or a price.',
      'Hard guards against hallucinated prices, stock levels and promises the business cannot keep.',
      'Multi-channel unified inbox — WhatsApp Cloud API official, MercadoLibre, TiendaNube, Facebook, Instagram, web widget.',
      'Human handoff that fires before the customer gets frustrated, with full conversation state pre-loaded for the agent.',
      'Audit log of every AI message and every prompt version, so a bad answer on Tuesday is traceable to the prompt that caused it.',
      '263-test Playwright E2E sweep before every deploy.',
      'The Anthropic API key lives in your account, billed to your card. No markup, no lock-in.',
    ],
    proofProjectIds: ['servifibras', 'matheus-saas', 'lince', 'volodymyr-bot'],
    relatedServiceSlug: 'ai-crm-and-chatbot-development',
    alsoSearchedAs: ['AI expert', 'AI professional', 'machine learning engineer', 'LLM engineer', 'chatbot developer', 'AI automation specialist'],
    faq: [
      { q: 'Which model do you build on?', a: 'Anthropic Claude Sonnet 5 for reasoning and Haiku 4.5 for routing and simple turns, selected per turn by a complexity classifier. GPT-5 and Gemini are wired as fallbacks when a client requires vendor diversity. For strict data-residency requirements, Llama 3.3 70B via Ollama on a dedicated GPU droplet.' },
      { q: 'How do you stop the AI from inventing prices?', a: 'The assistant never has a price list in its context window. Every price question triggers a RAG lookup against the live catalog, and the system prompt instructs it to refuse and escalate if the catalog does not confirm the SKU. This single design decision is the difference between a sales AI and a liability.' },
      { q: 'What does a production AI system actually cost to run?', a: 'The Servifibras CRM replaced a USD 2,000/month AI SaaS and runs at roughly USD 180/month in Anthropic API spend at ~74% Haiku routing. Exact numbers depend on conversation volume, but routing is the lever that moves it most.' },
    ],
  },
  {
    slug: 'blockchain-developer',
    role: 'Blockchain Developer',
    h1: 'Hire a blockchain developer with shipped mainnet contracts',
    metaTitle: 'Hire a Blockchain Developer — Solidity, Solana/Anchor, Stablecoin Engineering',
    metaDescription:
      'Hire a blockchain developer with production mainnet deployments. Creator of the Vetra USD-backed stablecoin on Polygon with Chainlink Functions. ERC-20/721, Solana AMM DEX with Anchor, ESG protocol with Stripe Split.',
    keywords:
      'hire blockchain developer, hire solidity developer, solana developer for hire, anchor rust developer, smart contract developer hire, stablecoin developer, defi developer freelance, chainlink developer, web3 developer for hire, ERC-20 token developer, smart contract audit',
    intro:
      'Contracts that shipped to mainnet and held real value — not a tutorial fork with the variable names changed. Vetra, a USD-backed stablecoin on Polygon with Chainlink Functions verifying reserves in real time, is the reference.',
    theRealProblem:
      'Blockchain projects fail in public and permanently. A missing pausable modifier, a role granted to the wrong address, an oracle feed nobody verified — any one of them becomes a headline and there is no rollback. The premium is not in writing the contract, it is in the controls around it.',
    whatIBring: [
      'Creator of Vetra (VTR), a USD-backed stablecoin on Polygon PoS where Chainlink Functions writes verified reserve balances on-chain every 4 hours and auto-pauses transfers if reserves fall below supply.',
      'Solidity with pausable, ownable and role-based access as design defaults, not afterthoughts.',
      'Solana + Anchor + Rust — shipped a Raydium-style AMM DEX with SPL token support and Jupiter Aggregator routing.',
      'Multisig upgrade authority (Gnosis Safe on EVM, Squads on Solana). No single key can push a new version.',
      'Full test coverage before deploy — Hardhat + Foundry for EVM, Anchor tests for Solana.',
      'A written deployment checklist executed in front of two people, plus a written incident response plan.',
      'Stripe Connect / Split integration when on-chain flows need real-world commission distribution.',
      'Contract audits of other developers\' code as a standalone defined-scope engagement.',
    ],
    proofProjectIds: ['dexspeed', 'impact-processor', 'spraicoin', 'kateryna-scanner'],
    relatedServiceSlug: 'blockchain-and-smart-contract-development',
    alsoSearchedAs: ['blockchain engineer', 'smart contract engineer', 'web3 developer', 'DeFi engineer', 'crypto developer', 'tokenization specialist'],
    faq: [
      { q: 'Have you deployed to mainnet with real value at stake?', a: 'Yes. Vetra is live on Polygon PoS with real USD reserves behind it. DexSpeed is a live AMM DEX on Solana. Impact Processor CSR26 is an ESG plastic-credit protocol with a 5/45/50 vesting rule and Stripe Split commission distribution. These are not testnet demos.' },
      { q: 'Will you build a memecoin or an anonymous project?', a: 'No. Every engagement requires a legal counterparty, a stated real-world use case, and a contract with a stop mechanism. This is permanent policy — reputation compounds, and reputation is the whole business.' },
      { q: 'Do you audit contracts written by someone else?', a: 'Yes, as a separate defined-scope engagement. Code review plus threat model plus written report, typically 5-10 business days depending on surface area. That is independent of writing the contract myself.' },
    ],
  },
  {
    slug: 'security-engineer',
    role: 'Security Engineer',
    h1: 'Hire a security engineer for incident response and hardening',
    metaTitle: 'Hire a Security Engineer — Incident Response, CVE Mitigation, Hardening',
    metaDescription:
      'Hire a security engineer for compromised production systems. Malware eradication, custom CVE patches when the vendor fix has not shipped, penetration testing, fail2ban and firewalld hardening, weekly SOC monitoring.',
    keywords:
      'hire security engineer, incident response consultant, hire cybersecurity expert, compromised server help, malware removal server, CVE mitigation, penetration tester for hire, server hardening consultant, SOC monitoring freelance, cybersecurity freelancer, hacked server recovery',
    intro:
      'When a production server is owned, the clock matters more than the credential. I do the full incident response workflow — evidence-preserving triage, eradication, credential rotation, patching (including hand-written patches when the vendor fix has not shipped), and hardening that makes round two expensive.',
    theRealProblem:
      'The instinct when a server is compromised is to reboot it. That destroys the volatile evidence — running processes, open connections, mapped memory — that tells you what the attacker took and how they got in. The first two hours decide whether you learn anything.',
    whatIBring: [
      'Evidence-preserving triage: full process tree, network connections, auth logs, crontabs, SSH trust audit and a raw disk image before anything is killed.',
      'Eradication of cryptominers, reverse shells, persistence crontabs, unauthorized SSH keys and modified rc.local.',
      'Custom CVE patches when the vendor fix is pending — CVE-2024-45519 was closed on a live Zimbra server with a hand-written 40-line Perl patch, same-day, 12 minutes of downtime.',
      'Full credential rotation on the assumption the attacker already has everything.',
      'fail2ban + firewalld + SSH key-only auth + root login disabled + auditd rules on sensitive paths.',
      'Application-layer hardening: AES-256-GCM at rest, JWT refresh-token rotation, RBAC, TOTP 2FA, audit logging.',
      'Authorized penetration testing with an agreed written scope and a findings report ranked by exploitability.',
      'A written incident report with timeline, actions and residual risks — the document your insurer and counsel will ask for.',
    ],
    proofProjectIds: ['hilong-ecuador', 'valee', 'articket'],
    relatedServiceSlug: 'security-engineering-and-incident-response',
    alsoSearchedAs: ['cyber security expert', 'cybersecurity consultant', 'infosec engineer', 'incident responder', 'penetration tester', 'security consultant'],
    faq: [
      { q: 'Our server is compromised right now. What do we do first?', a: 'Do not reboot it. Do not kill the suspicious process. Isolate it at the network switch level if you can — that stops the attacker from reacting while preserving the running state. Then send access. The first two hours are observation, because that is where the answers live.' },
      { q: 'Do you do offensive security work?', a: 'Authorized penetration testing against systems whose owner signs a written scope, yes. Anything without that authorization, no — that is the line between security work and a crime, and it is not negotiable regardless of the budget.' },
      { q: 'Is a one-off cleanup enough?', a: 'Rarely. A server that was owned once is a known-reachable target. The eradication is the emergency; the hardening plus weekly SOC review is what changes the odds. Most clients who go through an incident take the monitoring retainer afterward.' },
    ],
  },
  {
    slug: 'business-automation-engineer',
    role: 'Business Automation Engineer',
    h1: 'Hire an engineer to automate your operations',
    metaTitle: 'Hire a Business Automation Engineer — Replace Spreadsheets with Software',
    metaDescription:
      'Hire an automation engineer to replace spreadsheets, WhatsApp groups and paper forms with software. ERP over existing POS, AFIP invoicing, Google Sheets sync, multi-channel inbox, bulk Excel operations.',
    keywords:
      'hire automation engineer, business process automation consultant, replace excel with software, internal tools developer hire, ERP integration consultant, workflow automation developer, operations automation freelancer, custom CRM developer, back office automation',
    intro:
      'Not a Zapier consultant. An engineer who replaces the spreadsheet, the WhatsApp group and the clipboard with software the team stops having to think about — written in code you own, on infrastructure you control, with no per-execution billing.',
    theRealProblem:
      'The spreadsheet works until the company doubles. Then it starts losing invoices, dropping stock counts and hiding the balance sheet — silently, which is the dangerous part. Every manual step is a place the operation can fail without anyone noticing until month-end.',
    whatIBring: [
      'ERP layer built over the POS you already run — Distrialma has a live SQL Server sync feeding a Next.js back-office with tesorería, cheques lifecycle and a live Cuadro de Cuentas Mayores.',
      'AFIP electronic invoicing (RG 5616) issued directly from your system with your own certificate — no per-invoice SaaS fee.',
      'Google Sheets ↔ database sync so the team keeps the spreadsheet they know while the database stays the source of truth.',
      'Unified inbox across WhatsApp, MercadoLibre, TiendaNube, Facebook and Instagram with 5-role RBAC.',
      'Bulk stock and price Excel operations — a 3,000-SKU update that took 3 hours now runs in 30 seconds.',
      'Automated cierre de caja with discrepancy alerts to the owner\'s morning email.',
      'Scheduled offsite backups via rclone plus daily sanity-check emails.',
      'No Zapier, Make, n8n or Power Automate — written directly in Node/Python/TypeScript with real logging and error handling, on your own server.',
    ],
    proofProjectIds: ['distrialma', 'servifibras', 'famacon-m2', 'eduardo-portals'],
    relatedServiceSlug: 'operations-automation-development',
    alsoSearchedAs: ['business automation professional', 'process automation consultant', 'internal tools engineer', 'RPA alternative', 'operations engineer', 'back-office developer'],
    faq: [
      { q: 'Why not Zapier or Make? They are cheaper to start.', a: 'They are, until volume arrives. Every step becomes a per-execution charge that scales with your growth, and every debugging session is a black box. Written directly in code on your own server, the same workflow costs a fixed hosting fee regardless of volume and you can read the logs when something goes wrong.' },
      { q: 'Do we have to abandon our current spreadsheets?', a: 'No. A Google Sheets sync layer keeps the spreadsheet as an editable front-end where that actually fits — bulk price updates, for example — while the database holds the truth. Nobody is forced off a tool that works.' },
      { q: 'Can you integrate with our accounting system?', a: 'Yes. Contabilium, Xubio, Bejerman, Tango and most others expose a REST API, a database export or a CSV drop. Integration is typically 3-5 days.' },
    ],
  },
  {
    slug: 'fintech-developer',
    role: 'Fintech Developer',
    h1: 'Hire a fintech developer for payments and financial systems',
    metaTitle: 'Hire a Fintech Developer — Stripe Connect, MercadoPago, AFIP, Reconciliation',
    metaDescription:
      'Hire a fintech developer for payment systems that hold up under real volume. Stripe Connect/Split/MSI, MercadoPago with signed HMAC webhooks, Payway, AFIP invoicing, reconciliation engines, immutable ledgers.',
    keywords:
      'hire fintech developer, payment integration developer, stripe connect developer hire, mercadopago integration developer, hire payments engineer, subscription billing developer, financial reconciliation developer, escrow system developer, wallet system developer, AFIP integration',
    intro:
      'The money layer, built with the paranoia it deserves. Signed webhooks, idempotent handlers, integer minor units, append-only ledgers, row-level locks. The boring rules that prevent the entire class of "the numbers do not add up" tickets.',
    theRealProblem:
      'Every payment integration has a happy path that takes an afternoon and an edge-case surface that takes weeks — duplicate webhooks, partial refunds, chargebacks, currency conversion, installments, split payouts, tax compliance. Most freelancers ship the afternoon version. The difference surfaces in month one of real volume.',
    whatIBring: [
      'Stripe — Checkout, Billing, Connect for marketplace payouts, Split for automated commission distribution, MSI (meses sin intereses) for Mexican cards.',
      'MercadoPago with HMAC signature verification, transaction-ID idempotency and replay protection. Skipping signature verification is the most common payment bug in LATAM.',
      'Payway / Decidir as a second Argentine card rail alongside MercadoPago.',
      'AFIP electronic invoicing (RG 5616) via WSFEv1 SOAP with your own X.509 certificate — zero rejections across Distrialma\'s production volume since 2026-03.',
      'Reconciliation engines that cross-reference bank statements against internal records and surface only the discrepancies.',
      'Financial PDF parsing across dozens of bank statement formats.',
      'Internal wallet and escrow with an immutable append-only ledger — a balance is the sum of its entries, never a mutable column.',
      'Money stored as integer minor units, never floats. Every money write takes a row-level lock.',
    ],
    proofProjectIds: ['distrialma', 'milena-fintech', 'impact-processor', 'articket', 'bookproof'],
    relatedServiceSlug: 'fintech-and-payment-systems',
    alsoSearchedAs: ['finance project expert', 'payments engineer', 'billing systems developer', 'financial software developer', 'banking integration developer'],
    faq: [
      { q: 'Which payment provider is right for LATAM?', a: 'MercadoPago converts best in Argentina, Mexico, Brazil, Chile and Colombia because buyers already have accounts and it supports local installments. Stripe is better for marketplace payouts, sophisticated subscription logic and international cards. Serious projects usually run both.' },
      { q: 'What is the most common payment bug you fix?', a: 'Unverified webhook signatures — anyone who finds the endpoint URL can forge a paid-order confirmation. Second is non-idempotent webhook handling: the provider retries on timeout and the handler double-credits the customer. Both are small fixes that nobody makes until it has already cost money.' },
      { q: 'How do you store money in the database?', a: 'Integer minor units, never floating point. Ledger tables are append-only. Every money-touching write takes a row-level lock. Those three rules eliminate essentially every reconciliation bug before it exists.' },
    ],
  },
  {
    slug: 'whatsapp-api-developer',
    role: 'WhatsApp API Developer',
    h1: 'Hire a WhatsApp Business API developer',
    metaTitle: 'Hire a WhatsApp Business Cloud API Developer — Official Integration',
    metaDescription:
      'Hire a WhatsApp Business Cloud API developer. Official Meta integration via BSP — never Baileys or Evolution. Automated reminders, AI assistants, multi-agent inbox, template approval, Meta Business verification.',
    keywords:
      'hire whatsapp api developer, whatsapp business cloud api integration, whatsapp automation developer, whatsapp chatbot developer hire, meta business api developer, whatsapp reminders integration, BSP integration developer, whatsapp crm developer',
    intro:
      'Official WhatsApp Business Cloud API via a Meta-approved BSP. Not Baileys, not Evolution, not a QR-scanning wrapper that gets the client\'s number banned in a week. The integration that survives contact with a real business.',
    theRealProblem:
      'Unofficial WhatsApp libraries demo beautifully and die in production. Meta detects automation on personal-API numbers and bans them, usually within days of real volume. The client loses the number their customers have saved for years. That is not a technical setback, it is a business amputation.',
    whatIBring: [
      'WhatsApp Business Cloud API official, provisioned through a Meta-approved BSP (Gupshup, 360dialog, Wati or Twilio).',
      'Meta Business Manager verification handled end to end — the 2-3 day review process, document submission, and display-name approval.',
      'Message template design and submission that passes Meta review the first time.',
      'Automated reminders, confirmations and follow-ups that read like the business wrote them, not like a bot.',
      'AI assistant on the channel with Claude, RAG-grounded so it cannot invent prices.',
      'Multi-agent inbox so a team shares one number with assignment, internal notes and full history.',
      'Voice-note handling via Whisper transcription into the same pipeline.',
      'Webhook reliability — signature verification, idempotency, retry handling, dead-letter queue.',
    ],
    proofProjectIds: ['agendux', 'servifibras', 'famacon-m2', 'matheus-saas'],
    relatedServiceSlug: 'ai-crm-and-chatbot-development',
    alsoSearchedAs: ['whatsapp integration specialist', 'whatsapp bot developer', 'messaging API developer', 'conversational commerce developer'],
    faq: [
      { q: 'Can you use Baileys or Evolution to save on Meta fees?', a: 'No, and you should not want to. Both violate WhatsApp\'s terms and get real business numbers banned once volume arrives. Meta charges per conversation on the official API, which is cheaper than any third-party BSP markup and does not risk the number your customers already have saved.' },
      { q: 'How long does Meta Business verification take?', a: 'Typically 2-3 business days once the documents are submitted correctly. The delays come from mismatched business names, unreadable document scans, or a display name that violates Meta\'s naming policy. I handle the submission so it passes the first time.' },
      { q: 'What does it cost to run?', a: 'Meta bills per 24-hour conversation window, priced by country and category (marketing, utility, authentication, service). Utility and service conversations are substantially cheaper than marketing. Exact numbers depend on your volume and market — I model it before you commit.' },
    ],
  },
  {
    slug: 'industrial-automation-engineer',
    role: 'Industrial Automation & IoT Engineer',
    h1: 'Hire an industrial automation and IoT engineer',
    metaTitle: 'Hire an Industrial Automation & IoT Engineer — MQTT, Telemetry, Sensor Alerting',
    metaDescription:
      'Hire an industrial automation and IoT engineer. MQTT sensor telemetry, threshold alerting over WhatsApp, anomaly detection with AI, GPS device integration, FastAPI ingest pipelines, real-time dashboards.',
    keywords:
      'hire industrial automation engineer, IoT developer for hire, MQTT developer, sensor telemetry developer, industrial IoT consultant, SCADA alternative developer, remote monitoring system developer, telemetry dashboard developer, GPS device integration, predictive maintenance developer, water treatment monitoring, livestock monitoring system',
    intro:
      'Sensors are cheap now. The expensive part is turning a telemetry firehose into an alert that reaches the right person before the damage is done — and not one alert per reading, which trains everyone to ignore them.',
    theRealProblem:
      'Most industrial monitoring projects fail one of two ways: they alert on everything until staff mute the channel, or they alert on nothing until a failure has already cost money. The engineering is in the thresholds, the debounce logic, and the escalation path — not in reading the sensor.',
    whatIBring: [
      'MQTT and HTTP telemetry ingest with signature validation, built on FastAPI workers that survive a flaky field connection.',
      'Threshold alerting that fires to WhatsApp before anyone has to physically check — Famacon replaced a dawn walk across cattle fields.',
      'AI anomaly detection on live sensor streams so failures surface while they are still cheap to fix — LINCE catches water-treatment drift that paper reports found days later.',
      'GPS device integration including Eview pendants, with location, battery and fall-detection events fanned out to a call center and family members simultaneously.',
      'Debounce and hysteresis logic so a sensor bouncing around a threshold does not generate 400 alerts.',
      'Escalation chains — if nobody acknowledges in N minutes, it goes to the next person, then the next.',
      'Real-time dashboards with historical charting, so an operator can see whether today is abnormal or just Tuesday.',
      'Offline-tolerant buffering — field devices queue readings and flush when connectivity returns, nothing is silently lost.',
    ],
    proofProjectIds: ['famacon-m2', 'lince', 'sensu-angela', 'famacon-p1'],
    relatedServiceSlug: 'operations-automation-development',
    alsoSearchedAs: ['industry automation expert', 'industrial IoT engineer', 'telemetry engineer', 'remote monitoring developer', 'SCADA integration developer', 'embedded systems integrator'],
    faq: [
      { q: 'Do you work with the hardware itself, or only the software side?', a: 'The software side — ingest, processing, alerting, dashboards, escalation. I integrate with hardware that already speaks MQTT, HTTP, Modbus or a vendor API. I do not design PCBs or manufacture devices. For Famacon the sensors were sourced by the client; for Sensu the Eview GPS pendants were off-the-shelf. That split keeps the project moving.' },
      { q: 'What happens when the field connection drops?', a: 'Devices buffer locally and flush on reconnect, and the ingest layer deduplicates by device ID plus timestamp so a replayed batch does not double-count. The dashboard also shows last-seen per device, so a silent sensor is itself an alert rather than an absence nobody noticed.' },
      { q: 'How do you stop alert fatigue?', a: 'Hysteresis and debounce on every threshold, severity tiers so routine deviations do not page anyone at 3am, and escalation chains rather than broadcast. The goal is that when a message arrives, someone actually reads it.' },
    ],
  },
  {
    slug: 'booking-system-developer',
    role: 'Booking System Developer',
    h1: 'Hire a developer to build your booking system',
    metaTitle: 'Hire a Booking System Developer — Calendar Sync, WhatsApp Reminders, Payments',
    metaDescription:
      'Hire a developer for a custom booking and scheduling system. Real-time Google Calendar sync, WhatsApp reminders that cut no-shows in half, cancellation slot reuse, MercadoPago and Stripe subscriptions, multi-tenant.',
    keywords:
      'hire booking system developer, custom appointment system developer, scheduling software developer for hire, calendly alternative custom build, appointment booking developer, clinic booking system developer, salon booking software developer, multi tenant booking saas',
    intro:
      'The booking engine your business actually runs on — owned outright, not rented per seat. Real-time calendar sync, WhatsApp reminders in your voice, payments into your own account, and a cancellation queue that refills the slot before the front desk even notices.',
    theRealProblem:
      'No-shows and unfilled cancellations are the two invisible leaks in every appointment business. Measured across three pilot clinics: WhatsApp reminders cut no-shows from 18% to 8%, and an automatic waitlist offer refilled 22% of cancelled slots the same day. That is pure margin nobody was capturing.',
    whatIBring: [
      'Real-time bidirectional Google Calendar sync per professional via push notifications, not polling — bookings appear in under 2 seconds and personal events block slots automatically.',
      'WhatsApp Business Cloud API reminders at 24h and 2h, as a conversation (reply 1 to confirm, 2 to cancel) not a broadcast.',
      'Cancellation slot-reuse queue that offers the freed slot to the waitlist with a 15-minute claim window, cascading automatically.',
      'Postgres advisory locks on slot claims so two patients clicking 200ms apart cannot both win.',
      'WebSockets for live availability so the picker updates the instant a slot is taken.',
      'MercadoPago, Stripe or Payway subscriptions with plans, trials and MSI.',
      'Multi-tenant from day one — one deployment serves 1 clinic or 400 with isolated data.',
      'Encrypted patient records with RBAC, TOTP 2FA and a full audit log.',
    ],
    proofProjectIds: ['agendux', 'if7sports', 'articket', 'sensu-angela'],
    relatedServiceSlug: 'custom-booking-and-scheduling-systems',
    alsoSearchedAs: ['appointment software developer', 'scheduling system engineer', 'reservation system developer', 'calendar integration developer'],
    faq: [
      { q: 'Why build instead of paying for Calendly or Acuity?', a: 'For a single professional, do not build — use the SaaS. Build when you have 3+ practitioners, need custom reminder templates, split payments to different accounts, insurance-specific flows, or a bilingual patient experience. At that point every SaaS workaround becomes maintenance debt, and ownership pays back in 8-12 months by eliminating per-user fees.' },
      { q: 'How long until it is live?', a: 'The MVP — calendar, booking flow, WhatsApp reminders, one payment integration, admin panel — ships in 3-4 weeks. Multi-tenant, subscription plans, waitlist and cancellation logic add 2-3 more.' },
      { q: 'Does it integrate with the calendar the team already uses?', a: 'Google Calendar, bidirectionally and in real time. Outlook/Microsoft 365 is also supported. The professionals keep the calendar they already live in; the booking system just stops colliding with it.' },
    ],
  },
];
