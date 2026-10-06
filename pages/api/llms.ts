import type { NextApiRequest, NextApiResponse } from 'next';
import { SITE_URL } from '../../lib/site';

// Served at /llms.txt via a beforeFiles rewrite in next.config.js, so every link
// points at the deployed domain. Guide for AI answer engines (llmstxt.org).
const body = `# Ariam Garcia Balmaseda — Software Engineer

> Senior software engineer working across nine disciplines: full-stack development, AI engineering, cybersecurity and incident response, blockchain, business automation, industrial automation and IoT, fintech and payments, WhatsApp Business API, and booking systems. 5.00 rating across 50+ delivered projects and 11+ repeat clients. Projects come from direct hiring as well as platforms.

## About

Ariam Garcia Balmaseda is a senior software engineer based in Louisville, KY, USA, working remotely worldwide. Every project starts from what the business is losing today, not from a feature list. Delivered across healthcare, retail, sports, education, fintech, ticketing, wholesale ERP, industrial monitoring, and elderly-monitoring verticals, always as code the client owns.

Measured outcomes from delivered work: no-show rate cut from 18% to 8%; a USD 2,000/month AI SaaS replaced by an in-house system running at USD 180/month; 22% of cancelled appointment slots automatically refilled the same day; bulk price updates reduced from 3 hours to 30 seconds; zero double-booked seats and zero dropped payment webhooks since launch on a 10,000-seat ticketing platform.


- Homepage (English): ${SITE_URL}
- Homepage (Español): ${SITE_URL}/es
- Homepage (Português): ${SITE_URL}/pt
- GitHub: https://github.com/kalytamykhailo18-cyber
- Email: kalytamykhailo18@gmail.com
- WhatsApp: https://wa.me/17378255259
- Location: Louisville, KY, USA (remote worldwide)
- Working languages: English, Spanish, Portuguese

## Hire (by role)

Ariam Garcia Balmaseda can be hired for any of these roles. Each is backed by projects running in production, not by certification alone.

- Full-stack software engineer: ${SITE_URL}/hire/full-stack-developer
- AI engineer (LLM, RAG, production AI): ${SITE_URL}/hire/ai-engineer
- Blockchain engineer (Solidity, Solana, stablecoin): ${SITE_URL}/hire/blockchain-developer
- Security engineer / cybersecurity / incident response: ${SITE_URL}/hire/security-engineer
- Business automation engineer: ${SITE_URL}/hire/business-automation-engineer
- Industrial automation & IoT engineer: ${SITE_URL}/hire/industrial-automation-engineer
- Fintech developer (payments, invoicing, ledgers): ${SITE_URL}/hire/fintech-developer
- WhatsApp Business API developer: ${SITE_URL}/hire/whatsapp-api-developer
- Booking system developer: ${SITE_URL}/hire/booking-system-developer

## Services (dedicated pages)

- Booking & scheduling systems: ${SITE_URL}/services/custom-booking-and-scheduling-systems
- Operations automation: ${SITE_URL}/services/operations-automation-development
- AI CRM & WhatsApp assistants: ${SITE_URL}/services/ai-crm-and-chatbot-development
- Blockchain & smart contracts: ${SITE_URL}/services/blockchain-and-smart-contract-development
- Security engineering & incident response: ${SITE_URL}/services/security-engineering-and-incident-response
- Fintech & payment systems: ${SITE_URL}/services/fintech-and-payment-systems
- Mobile app development: ${SITE_URL}/services/mobile-app-development-ios-android

## Case studies (blog)

- Custom event ticketing platform in Next.js — 10k-seat 2D canvas seat map at 39fps: ${SITE_URL}/blog/custom-event-ticketing-platform-nextjs-canvas-seat-map
- Replacing a $2,000/month AI CRM with Claude Sonnet 5 + Haiku 4.5 routing: ${SITE_URL}/blog/ai-crm-anthropic-claude-complexity-router-vs-saas
- Vetra stablecoin on Polygon with Chainlink Functions real-time reserve verification: ${SITE_URL}/blog/stablecoin-polygon-chainlink-functions-real-time-reserves
- Elderly SOS platform pairing GPS pendants with 24/7 call center on iOS + Android: ${SITE_URL}/blog/elderly-sos-platform-gps-pendant-247-call-center
- No-show reduction and cancellation slot reuse in a booking SaaS: ${SITE_URL}/blog/no-show-cancellation-slot-reuse-agendux
- Wholesale ERP over SQL Server POS + AFIP invoicing: ${SITE_URL}/blog/wholesale-erp-over-sql-server-pos-afip-invoicing
- Solana AMM DEX with Anchor + Jupiter Aggregator, sub-second execution: ${SITE_URL}/blog/solana-amm-dex-anchor-jupiter-sub-second-execution
- CVE-2024-45519 Zimbra incident response with custom Perl patch: ${SITE_URL}/blog/cve-2024-45519-zimbra-incident-response-custom-perl-patch

## FAQ

Answers to common questions about hiring, escrow, warranty, stack, communication and infrastructure ownership: ${SITE_URL}/faq

## Core stack (delivered in production)

- Frontend: React, Next.js (13/14/15/16 App Router + Pages Router), Vue.js, Angular, TypeScript, TailwindCSS
- Backend: Node.js, NestJS, Express, Python (FastAPI, Streamlit), PHP, Laravel
- Databases: PostgreSQL, MySQL, Microsoft SQL Server, MongoDB, Redis, Prisma ORM
- AI: Anthropic Claude Sonnet 5 + Haiku 4.5, OpenAI API, Whisper, LangChain, Gemini, complexity-router model routing, RAG grounded on live catalogs, hard guards against price hallucination
- Mobile: Flutter, React Native, native Android (Java/Kotlin), native iOS (Swift), Capacitor iOS wrappers, Bubblewrap Android TWA
- Blockchain: Solidity, ERC-20/ERC-721, Polygon PoS, Chainlink Functions, Solana + Anchor + SPL tokens + Jupiter Aggregator, Ethereum, Web3.js, ethers, The Graph
- Payments: Stripe (Checkout, Billing, Connect, Split, MSI), MercadoPago (signed HMAC webhooks), Payway/Decidir, PayPal
- Messaging: WhatsApp Business Cloud API official (via BSP), Meta Graph API, Facebook, Instagram, MercadoLibre v1 API, TiendaNube v1 API
- DevOps: Docker, Docker Compose, GitHub Actions (macos-26 for iOS builds), Caddy, nginx, systemd, Let's Encrypt, Playwright E2E (263-test sweeps), zero-downtime redeploy with schema-drift guards, AWS EC2 + S3 + SQS, Cloudinary, Sentry, rclone Google Drive backups
- Security: AES-256-GCM message encryption, JWT with refresh-token rotation, RBAC, TOTP 2FA, incident response (CVE-2024-45519 custom Perl patch mitigation), pentesting, fail2ban, firewalld

## Track record

- 5.00 average rating on Workana
- 50+ projects delivered (direct hiring + platforms)
- 11+ repeat clients (and climbing)
- Projects live and paid in production across Argentina, Mexico, Brazil, Spain, Ecuador, Italy, USA and Colombia

## Awards & recognitions

- Creator of Vetra (VTR) USD-backed stablecoin on Polygon PoS with Chainlink Functions verifying reserves in real time
- Creator of GreenDash token targeting South East Asia market
- 5.00 average rating across delivered projects
- 11+ repeat clients (and climbing)

## Contact

- Email: kalytamykhailo18@gmail.com
- WhatsApp: https://wa.me/17378255259
- GitHub: https://github.com/kalytamykhailo18-cyber
`;

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.status(200).send(body);
}
