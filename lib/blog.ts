export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  tags: string[];
  relatedProjectId?: string;
  body: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'custom-event-ticketing-platform-nextjs-canvas-seat-map',
    title: 'How I built a 10,000-seat event ticketing platform in Next.js — the 2D canvas seat-map engine at 39fps',
    description: 'Case study of ArTicket: replacing a licensed MuchTicket operation with a custom Next.js + PostgreSQL ticketing platform, own canvas seat-map engine, MercadoPago + Payway signed HMAC webhooks, QR access control, Chatwoot omnichannel support desk on a second VPS.',
    keywords: 'custom ticketing platform, event ticketing software, nextjs canvas seat map, mercadopago hmac webhook, payway integration, chatwoot self-hosted, QR access control, own ticketing engine, stadium seating chart',
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-26',
    readingMinutes: 12,
    tags: ['Ticketing', 'Next.js', 'PostgreSQL', 'Canvas', 'Case Study'],
    relatedProjectId: 'articket',
    body: `A Mar del Plata operator was renting its ticketing platform. Every stadium event ate 8-12% of gross revenue in per-ticket fees, and any custom flow — a two-tier season pass, a promotor split, a bilingual buyer email — was a "ticket to their support team, come back next week" story. The math stops working once you cross a few hundred events per year.

## The problem was not "build a ticketing system"

The problem was: the operator sells 300-400 events per month across venues that seat 10,000+, and their platform provider decides which features get built, when, and at what fee level. The blocker was ownership, not tickets.

## Why building this from scratch made sense

A ticketing platform sounds like a solved problem until you list the moving parts.

- **Seat map rendering** at scale: a 12,000-seat stadium is 12,000 DOM nodes if you use HTML, which is a 3-second first paint and a laggy hover. Canvas is the only viable answer.
- **Concurrent seat holds**: two buyers clicking the same seat 200ms apart cannot both succeed. This is a distributed locking problem, and the SaaS providers punt on it (they oversell and refund).
- **Payment provider webhooks**: MercadoPago and Payway both send signed HMAC webhooks. If the webhook handler drops a request, you either sell a seat twice or lose the sale entirely.
- **QR access control at the gate**: the scanner apps must sync down the current ticket list every 30 seconds, but they also must work offline for 20 minutes when the venue Wi-Fi drops (it always drops).

Every one of those has a "cheap SaaS answer" that fails at 10,000-seat scale.

## The stack

- **Next.js 16 Pages Router** as the buyer-facing app, deployed on a DigitalOcean droplet.
- **PostgreSQL 16 + Prisma** as the source of truth. All seat inventory is Postgres advisory locks — the same lock the payment webhook takes.
- **Own 2D canvas engine** for the seat map, rendering at 39fps on 12,000+ seats even on a mid-range Android.
- **MercadoPago + Payway** with signed HMAC webhooks. Every incoming webhook is verified, deduplicated by transaction ID, and idempotent.
- **QR access control** with a native scanner app (React Native) that syncs down the current ticket list via a delta API — first sync is full, later syncs only pull what changed.
- **Playwright** E2E suite that runs against a Docker Compose replica of production before every deploy.

## The canvas engine

The interesting part is the seat-map renderer. HTML-based renderers hit a wall at ~4,000 seats — the browser cannot lay out that many nodes and still respond to hover / click quickly. Canvas has no such limit, but it also does not give you free click detection.

The engine keeps a spatial hash grid keyed on canvas coordinates. Every seat is a rectangle indexed into the grid at render time. A click at (x, y) hashes to a grid cell, then does a linear check inside that cell (usually 1-8 seats). Zoom and pan re-hash lazily, so you never pay for what the user does not see.

Render is a single \`requestAnimationFrame\` loop that redraws only the dirty region (a hovered seat = 40x40 pixels, not the whole 12,000-seat map). On a Pixel 5 I measured 39fps steady during a fast pan across a 12,000-seat stadium.

## Concurrent seat holds

The hard part is not adding a seat to a cart. The hard part is preventing two buyers 200ms apart from both winning.

The design: every "add to cart" attempt takes a Postgres advisory lock keyed on the seat ID. If the lock is free, the seat moves to a per-buyer temporary hold with a 10-minute TTL. If the lock is held, the buyer sees "just taken, pick another" instantly.

The payment webhook takes the same advisory lock. When MercadoPago confirms the payment, the webhook releases the temporary hold and writes the final ticket row atomically. If the payment fails or times out, the hold expires and the seat is available again — no operator intervention.

## Signed HMAC webhooks — the boring part that matters

Both MercadoPago and Payway sign their webhooks. If you skip verification, anyone who guesses your endpoint URL can post fake payment confirmations. The verification is 6 lines of code, and every ticketing SaaS I have seen skips it. We do not.

## Chatwoot on a second VPS

Support was the missing piece. The operator was juggling 7 email mailboxes, a WhatsApp number, a Facebook page and Instagram DMs. I self-hosted Chatwoot on a second DigitalOcean droplet, wired all 10 channels to it, gave 8 agents seats, and set up rclone nightly backups to Google Drive.

Now every support conversation lives in one inbox, agents see the buyer's ticket history at open, and there is no monthly SaaS fee per seat.

## What shipped

- **300-400 events/month** running through the platform.
- **10,000+ seat stadiums** loading in under 2 seconds on 4G.
- **39fps** steady during seat-map interaction.
- **0** double-booked seats since launch.
- **0** dropped payment webhooks since launch.
- **8-12% fee → 0** per-ticket platform cost.

## What the client owns now

Everything. The Next.js repo, the PostgreSQL data, the Chatwoot instance, the QR scanner app source, the deploy scripts. If I disappear tomorrow, any senior full-stack developer can pick up the codebase in an afternoon.

That is the whole point.`,
  },
  {
    slug: 'ai-crm-anthropic-claude-complexity-router-vs-saas',
    title: 'Replacing a $2,000/month AI CRM SaaS with Claude Sonnet 5 + Haiku 4.5 — 60-80% cost cut, hard guards against price hallucination',
    description: 'Case study of Servifibras: replacing a licensed AI CRM (prometheo.ai) with an in-house Anthropic Claude Sonnet 5 + Haiku 4.5 assistant, complexity-classifier model routing, RAG grounded on live catalog, 263-test Playwright sweep, zero-downtime deploy with schema-drift guard.',
    keywords: 'anthropic claude API, claude sonnet 5, claude haiku 4.5, LLM cost optimization, complexity classifier routing, RAG live catalog, price hallucination prevention, whatsapp cloud API official, multichannel inbox, custom AI CRM, self hosted AI',
    publishedAt: '2026-09-18',
    updatedAt: '2026-09-26',
    readingMinutes: 14,
    tags: ['AI', 'Claude', 'RAG', 'Case Study'],
    relatedProjectId: 'servifibras',
    body: `A composites shop in Argentina was paying about USD 2,000/month for prometheo.ai, a hosted AI sales assistant. It worked. It also hallucinated prices on products the SaaS never saw, could not be told to escalate on specific SKUs, and locked every customer conversation inside a vendor the shop did not own.

The ask was simple: replace it with something we control, at a fraction of the cost, without giving up any capability. Here is what shipped.

## The core design decision: two models, chosen per turn

Running every message through Claude Sonnet 5 is comfortable but wasteful. Most turns in a sales conversation are trivial ("hola", "cuánto sale el 3mm", "tenés stock del gris?"). Sonnet's reasoning depth is overkill for those, and its price per million tokens reflects that.

A cheaper model — Claude Haiku 4.5 — handles the trivial turns for a fraction of the cost. The problem was: how do you decide, per turn, which model to route to?

The answer was a small classifier that runs before every LLM call. It scores each incoming message on complexity (multi-turn context needed / catalog query / structured output / just a greeting) and picks the model. In practice, ~70% of turns route to Haiku, ~30% to Sonnet.

Measured against a Sonnet-only baseline over 4 weeks of production traffic:

- 74% average token cost reduction.
- Zero measurable quality drop on the sales-conversion KPI.
- Latency dropped from 1.4s to 0.6s median (Haiku is faster).

## Hard guards against price hallucination

The single biggest risk in a sales AI is a wrong price. A hallucinated price is a lost sale, a refund, or a lawsuit — and every LLM will invent a price if you let it.

The design: the assistant does not have prices in its context window. Ever. Every price question triggers a RAG lookup against the live product catalog (Postgres, updated hourly from the shop's ERP). The assistant is instructed at the system-prompt level to refuse to answer any price question if the catalog lookup returns no result.

If the catalog cannot answer, the assistant says "un vendedor te confirma el precio ahora mismo" and hands off to a human agent, with the conversation state, the SKU asked about, and the customer's profile pre-loaded on the agent's screen.

This is boring. This is also the single most important design decision in a sales AI.

## Unified inbox across 5 channels

The old SaaS handled WhatsApp only. The shop was also getting leads on MercadoLibre, TiendaNube, Facebook Messenger, Instagram DMs, and their own website widget. Every channel was a separate tab, a separate app, a separate identity for the same customer.

The new platform runs one unified inbox:

- **WhatsApp Business Cloud API** (official — via a BSP, never Baileys or Evolution).
- **MercadoLibre v1 API** — questions on listings appear as conversations.
- **TiendaNube v1 API** — same for their online store.
- **Facebook Messenger + Instagram** via Meta Graph API.
- **A web widget** on the corporate site.

Every conversation is one thread, tagged by channel, with the customer identity de-duplicated across channels when we have a phone or email match.

## RBAC and audit log

5 roles: owner, admin, agent, viewer, bot. Owner and admin can edit prompts, agents can only handle conversations, viewer is read-only for the sales manager to review AI decisions, bot is the AI itself.

Every message the AI sends, and every prompt change, is written to an audit log. If a bad answer goes out on Tuesday, the operator can go back and see exactly which prompt version produced it.

## 263-test Playwright E2E sweep

The AI is the last thing to break. The infrastructure around it (webhook delivery, DB writes, channel integrations) is where most incidents happen. A 263-test Playwright sweep runs before every deploy — it walks a fake customer through each channel, verifies the AI response, checks the DB state, and asserts no regressions.

## Zero-downtime deploy with schema-drift guard

The AI is talking to customers 24/7. Even a 30-second downtime is a lost conversation. The deploy pipeline:

1. Runs the new build in a separate container.
2. Executes DB migrations in a schema-drift-safe transaction. If any migration would drop a column or change a type in a way the old version still uses, the deploy aborts.
3. Switches nginx traffic to the new container.
4. Drains the old container over 60 seconds.

Since launch, ~40 deploys, zero downtime, zero broken conversations mid-migration.

## What the numbers ended up being

- **USD 2,000/month → USD 180/month** in LLM costs (Anthropic API, at ~74% Haiku routing).
- **1.4s → 0.6s** median response latency.
- **1 tab → 1 tab**, but now it is the shop's own tab and the shop owns the data.
- **0** hallucinated prices reaching a customer since the RAG guard was tightened.

## What did not work the first time

The complexity classifier was originally a rule-based function ("if the message contains a price question, escalate to Sonnet"). It was 40% accurate. Replacing it with a Haiku call (yes, using Haiku to route to Haiku) got it to 91% accuracy at a rounding-error cost. The classifier itself is now the cheapest LLM call in the whole pipeline.

## What the client owns

The Next.js frontend, the NestJS backend, the PostgreSQL database, the deploy scripts, the Playwright test suite, the system prompts, the audit log, and every conversation to date. The Anthropic API key is in the client's own Anthropic account, billed to the client's card.

If Anthropic doubles their pricing tomorrow, we swap in GPT-5 or Gemini as a fallback in a day. That optionality is worth more than the monthly savings.`,
  },
  {
    slug: 'stablecoin-polygon-chainlink-functions-real-time-reserves',
    title: 'Vetra stablecoin — verifying USD reserves in real time with Chainlink Functions on Polygon',
    description: 'Behind the Vetra USD-backed stablecoin on Polygon PoS. Chainlink Functions verifies fiat reserves in real time, pausable ERC-20 with role-based access, on-chain audit trail, deployment checklist and incident response plan.',
    keywords: 'vetra stablecoin, polygon stablecoin, chainlink functions, real time reserve verification, ERC-20 pausable, stablecoin engineering, RWA tokenization, blockchain freelancer, defi developer',
    publishedAt: '2026-01-15',
    updatedAt: '2026-09-26',
    readingMinutes: 10,
    tags: ['Blockchain', 'Polygon', 'Chainlink', 'Stablecoin'],
    body: `A stablecoin is only as trustworthy as the mechanism that proves the reserves are actually there. Terra collapsed. USDT gets audited annually and everyone still asks. The design goal of Vetra was: anyone, at any time, can verify the current USD backing on-chain.

## The mechanism

Chainlink Functions is a decentralized off-chain compute layer that lets an on-chain contract request data from a real API and receive it back on-chain, signed by a decentralized oracle network. The Vetra contract calls Chainlink Functions on a schedule (every 4 hours) to fetch the current bank balance from the reserves account API, and writes the result to a public on-chain \`totalReserves\` variable.

Anyone can read \`totalReserves\`. Anyone can compare it to \`totalSupply\` on the ERC-20. If they diverge, the contract auto-pauses transfers until an admin intervenes.

This is not a full audit. A full audit still requires a human accountant reconciling bank statements. But it eliminates the "trust me bro" gap between quarterly audits.

## The contract shape

- **ERC-20** with 6 decimals (matching USDC/USDT conventions).
- **Pausable** — role-restricted to a multisig, not a single EOA.
- **AccessControl** — minter, pauser, oracle-updater roles are separate.
- **Chainlink Functions consumer** that updates \`totalReserves\` on schedule.
- **Auto-pause** if \`totalReserves < totalSupply\` for 2 consecutive updates.

## What could still go wrong

- The Chainlink Functions call is decentralized-ish. A collusion attack on the oracle nodes could report a fake balance. Chainlink's economic security makes this expensive but not impossible.
- The bank API itself could be compromised. The best-in-class solution here is dual-source: two independent bank APIs must agree before the contract accepts the update. Vetra runs single-source today because the reserves are in one bank; when they split across two, dual-source ships.
- The multisig holding the pauser role is 3-of-5 with hardware wallets across two geographies. Not perfect, materially better than a hot-wallet EOA.

## Why Polygon PoS, not Ethereum L1 or a rollup

Ethereum L1 is too expensive for retail stablecoin transfers. Optimistic rollups (Arbitrum, Optimism) have withdrawal delays that scare stablecoin holders. zk-rollups (zkSync, Starknet) are still catching up on tooling and gas subsidies. Polygon PoS is EVM-compatible, cheap, has real users, and settles fast — a pragmatic choice for a retail-facing token.

The trade-off is that Polygon PoS is not as secure as Ethereum L1. Vetra mitigates this by keeping reserves in a real bank (not a smart-contract vault), so the chain compromise scenario costs the attacker the ability to move Vetra between wallets, not the ability to drain the reserves.

## Deployment checklist

Every deployment step is written down, signed off, and executed in front of two people. No exceptions.

1. Contracts compiled with a pinned Solidity version (0.8.24). Verified against Hardhat + Foundry tests.
2. Deployed first to Polygon Amoy (testnet). 2-week client-side smoke test with fake reserves.
3. Contracts verified on Polygonscan against the exact source hash.
4. Multisig deployed and initialized with the 3-of-5 signer set.
5. Roles granted to the multisig, revoked from the deployer EOA. The deployer EOA is now powerless.
6. Chainlink Functions subscription funded with enough LINK for 6 months of updates.
7. Mainnet deployment executed by the multisig, in a video call, with a written pre-flight signed by both engineers.

Every one of those steps has failed in a real project somewhere. Writing the checklist is the whole point.

## The incident response plan

If \`totalReserves < totalSupply\` triggers an auto-pause, the plan is:

1. Auto-pause fires. Transfers stop within one block.
2. On-call engineer paged. Multisig signers alerted.
3. Public status page updated (pre-drafted).
4. Bank reconciliation started. Chainlink logs reviewed.
5. Root cause identified: (a) real reserve shortfall → resolve with the bank before unpausing, (b) Chainlink false reading → verify with a second data source, unpause after 2 consecutive good readings, (c) contract bug → coordinated upgrade via the multisig.
6. Post-mortem published within 72 hours regardless of cause.

Nobody wants to run this plan. Everybody should have one anyway.

## The client owns

The contract source, the deployment scripts, the Chainlink subscription, the multisig, the reserves account, and the operational runbook. My involvement post-launch is on-demand consulting for incidents and upgrades.`,
  },
  {
    slug: 'elderly-sos-platform-gps-pendant-247-call-center',
    title: 'Sensu Ángela — how a 24/7 elderly-SOS platform stitches a GPS pendant, a call center, iOS and Android together',
    description: 'Case study of Sensu Ángela: full platform for a 24/7 elderly-SOS monitoring service in Mexico, pairing Eview GPS pendants with a live human call center. Next.js PWA + FastAPI/MQTT ingest + Stripe MSI + Capacitor iOS + Android TWA.',
    keywords: 'elderly SOS platform, GPS pendant integration, MQTT telemetry, capacitor iOS PWA, android TWA google play, stripe MSI meses sin intereses, 24/7 call center software, pwa to app store, mexico elderly care software',
    publishedAt: '2026-09-10',
    updatedAt: '2026-09-26',
    readingMinutes: 11,
    tags: ['Mobile', 'IoT', 'Case Study', 'Healthcare'],
    relatedProjectId: 'sensu-angela',
    body: `Elderly SOS pendants used to call the family. That is the whole product for most competitors. The problem: family members are at work, on flights, or asleep. The pendant beeps, nobody picks up, the emergency escalates.

Sensu Ángela's founder wanted to change the shape entirely. Every pendant press should ping a live 24/7 call center AND every family member simultaneously. Whichever human responds first takes the case. Nobody is left alone with a button they hope somebody hears.

## The moving parts

- **Eview GPS pendants** — cellular-connected, panic button, fall detection, GPS location.
- **MQTT ingest** — pendants speak MQTT to our broker.
- **FastAPI worker** — subscribes to MQTT, writes to Postgres, fans out events.
- **Postgres** — canonical state (users, devices, alerts, subscriptions, family relationships).
- **Next.js PWA** — customer web app, admin panel, operator panel, family panel.
- **Capacitor iOS wrapper** — App Store presence.
- **Android TWA via Bubblewrap** — Google Play presence.
- **Stripe subscriptions with MSI** — Mexican-specific installment plans without interest.
- **Twilio Programmable Voice** — outbound calls to the family when a pendant fires.

## The pendant → alert → response flow

1. Elder presses the pendant (or a fall is detected).
2. Pendant sends an MQTT message with location, battery, and a signature.
3. FastAPI worker validates the signature, writes the alert to Postgres, publishes a fan-out event.
4. Three things happen in parallel:
   - The 24/7 call center operator panel gets a new red card with the elder's profile, location on a map, and next-of-kin contacts.
   - Every family member's app gets a push notification.
   - Twilio calls every family phone number in a rotation.
5. Whoever acknowledges first (operator or family) claims the alert. Everyone else's phone stops ringing.
6. The operator's ack triggers a case file (voice notes, photos, resolution). The family's ack triggers a call transcript record for the operator to review.

Median end-to-end latency from pendant press to first human seeing the alert: 3.4 seconds.

## Why PWA-wrapped, not native

Native iOS + native Android + a web admin panel = three codebases. For an early-stage company that is a maintenance disaster.

The Sensu app is a Next.js 15 PWA. On iOS, Capacitor wraps it into a native App Store submission. On Android, Bubblewrap packages it as a Trusted Web Activity for Google Play. The web admin panel is the same PWA at a different route.

One codebase, three distribution channels. Ship a feature once, it lands everywhere within a day.

## Push notifications through the wrapper

The tricky part with PWA wrapping is push. iOS Safari has strict PWA push rules; Capacitor bypasses them by exposing native APNs to the PWA layer. Android TWA uses FCM natively.

The PWA code has one \`sendPush(userId, message)\` call. A thin adapter routes to APNs on iOS Capacitor and FCM on Android TWA (and to Web Push on the desktop PWA). The app code never knows the difference.

## Stripe MSI — meses sin intereses

Mexico's retail installment culture is different from the US. Customers expect "3 meses sin intereses" or "6 MSI" as a standard option. Stripe supports this natively for Mexican cards issued by participating banks.

The subscription page shows the plans in three columns: monthly, 3 MSI, 6 MSI. Selecting MSI charges the full amount to the customer's card as a single transaction, but the bank splits it into equal monthly charges without adding interest — the bank absorbs the finance cost, the merchant gets paid up front.

The Stripe integration is 60 lines of code and the customer conversion lift was measurable.

## Publishing to the App Store on first submission

Apple rejects PWA-wrapped apps that "feel like a website". The mitigation:

- Every screen has native-feeling transitions (Capacitor's native page transitions plugin).
- Bottom tab bar uses native styling (not web).
- The onboarding flow uses native permission prompts (location, camera, notifications).
- Metadata screenshots are taken inside the wrapped app, not the browser.

Sensu Ángela passed Apple review on first submission. That is the only success metric that matters for the initial launch — every rejection round adds a week.

## What is live now

- **iOS App Store** — Sensu Ángela, live under the client's Apple Developer account.
- **Google Play** — Sensu Ángela, live under the client's Play Console.
- **app.sensu.com.mx** — the same PWA in the browser for admins.
- **24/7 call center** — 8 operators rotating shifts.
- **N pendants in service** (public number pending business milestone).

The client owns the Next.js codebase, the FastAPI worker, the iOS Xcode project, the Android Bubblewrap config, and the deployment scripts.`,
  },
  {
    slug: 'no-show-cancellation-slot-reuse-agendux',
    title: 'How I stopped no-shows and reclaimed 22% of empty slots in a booking system',
    description: 'Case study of Agendux: a SaaS appointment platform where WhatsApp reminders cut no-shows in half and a cancellation slot-reuse queue reoffers freed slots automatically. Real-time bidirectional Google Calendar sync, encrypted patient data.',
    keywords: 'no-show reduction, whatsapp appointment reminders, slot reuse queue, waitlist automation, google calendar sync bidirectional, saas booking platform, agendux, appointment scheduling software',
    publishedAt: '2026-03-10',
    updatedAt: '2026-09-26',
    readingMinutes: 9,
    tags: ['SaaS', 'Booking', 'Case Study'],
    relatedProjectId: 'agendux',
    body: `Every appointment business loses money in two invisible ways: no-shows (the appointment happened in the calendar but not in reality) and unfilled cancellations (a slot opened up 4 hours before but nobody knew).

Agendux was designed around those two problems specifically. Everything else — the calendar UI, the Stripe billing, the patient records — is table stakes.

## The no-show mechanism

Every appointment fires two reminders on WhatsApp Business Cloud API (official — never Baileys or Evolution):

- **24 hours before** — "Recordá tu turno de mañana a las 15:00 con la Dra. López. Respondé 1 para confirmar, 2 para cancelar."
- **2 hours before** — a lighter nudge with the address and a map link.

The reminder is not a broadcast. It is a conversation — the customer's reply flows into the platform, marks the appointment confirmed or freed, and (crucially) triggers the cancellation logic if the answer is 2.

Measured impact: no-show rate at 3 pilot clinics fell from an average of 18% pre-Agendux to 8% after 60 days of WhatsApp reminders being live. That is 55% of no-shows recovered.

## The cancellation slot-reuse queue

Every clinic has a waitlist of "patients who wanted the earliest available appointment". Traditionally the front desk calls them when a slot opens up. In practice that means: front desk finds out about the cancellation, front desk gets busy, front desk forgets, slot stays empty.

The Agendux flow:

1. Patient cancels via WhatsApp reply "2".
2. The system marks the slot free.
3. The system pulls the top of the waitlist (patients with matching insurance, matching provider, willing to come today).
4. The top waitlist entry gets an offer message on WhatsApp: "Se liberó un turno hoy a las 15:00 con la Dra. López. Respondé 1 para tomarlo (tenés 15 minutos)."
5. If they take it, slot filled. If they decline or the 15 minutes pass, offer moves to the next waitlist entry automatically.

Measured impact across the same 3 pilot clinics: 22% of cancelled slots got refilled within the same day. That is a 22% capacity gain on days with cancellations — pure margin.

## Real-time bidirectional Google Calendar sync

Every professional at every clinic already has a Google Calendar. Forcing them to check two calendars is a losing battle. Agendux syncs both ways in real time:

- Bookings created in Agendux appear in Google Calendar within 2 seconds.
- Events created in Google Calendar (a personal lunch, a dentist appointment for the doctor) appear in Agendux as blocked slots within 2 seconds.

The sync engine uses Google Calendar's push notifications (not polling). Each professional's calendar has a channel registered, Google POSTs a webhook on every change, and the sync engine pulls the delta.

Handling reliability: Google Calendar push channels expire. The engine re-registers 24 hours before expiration and falls back to a full sync if a webhook is dropped for more than 2 minutes.

## Encrypted patient data

All patient records are encrypted at rest with a per-tenant AES-256-GCM key. The key is stored in a separate key-management service (not in the same database as the ciphertext). A tenant-level breach of the database gives the attacker unreadable blobs.

The platform is not marketed as HIPAA-compliant — it is not audited to that standard, and pretending otherwise would be dishonest. It is engineered as if it were, which puts it ahead of most SaaS booking platforms in the same space.

## WebSockets for live-slot updates

Two patients cannot claim the same slot. The booking page shows live availability via WebSockets — the moment slot X is claimed by anyone, every other open booking page updates within 1-2 seconds and slot X disappears from the picker.

The claim itself is a Postgres advisory lock, same pattern as ArTicket. If two clicks arrive within 100ms, exactly one wins the lock and the other sees "just taken".

## What shipped

- **Agendux SaaS** live at agendux.com.
- **3 pilot clinics + expansion into 12 more** in the first year.
- **-55% no-show rate** across the pilots.
- **+22% capacity** on days with cancellations.
- **MercadoPago subscriptions** with 3 plans (small clinic / big clinic / enterprise).

The client owns the entire codebase, the marketing site, and the MercadoPago account.`,
  },
  {
    slug: 'wholesale-erp-over-sql-server-pos-afip-invoicing',
    title: 'Wholesale ERP over a SQL Server POS — live Cuadro de Cuentas Mayores + AFIP invoicing + installable PWA',
    description: 'Case study of Distrialma: SQL Server-synced online store grown into a full company-owned back-office ERP over the client PunTouch POS. Tesorería per sucursal, Cuadro de Cuentas Mayores live, cheques lifecycle, AFIP RG 5616, cierre de caja, installable customer PWA with Web Push.',
    keywords: 'wholesale ERP argentina, SQL server integration, POS integration, AFIP RG 5616 electronic invoicing, tesorería per branch, cuadro de cuentas mayores, cheques lifecycle, installable PWA web push, customer PWA',
    publishedAt: '2026-03-05',
    updatedAt: '2026-09-26',
    readingMinutes: 13,
    tags: ['ERP', 'Fullstack', 'AFIP', 'Case Study'],
    relatedProjectId: 'distrialma',
    body: `Distrialma is an Argentine food wholesaler running the PunTouch POS across multiple sucursales. PunTouch is fine for sales. It is blind to accounting, blind to inventory across branches, blind to the customer's online experience. The company was running blind by extension.

The engagement started as "an online store for our wholesale customers" and grew into a full company-owned back-office ERP that layers over PunTouch. This is the story of that growth.

## Phase 1: the online store

The first deliverable was a customer-facing storefront that showed the same catalog and prices as the physical POS. PunTouch stores everything in SQL Server on a local Windows machine at HQ.

The design: a small syncer service runs on the SQL Server machine, exports catalog + stock + price changes to a REST API in the cloud every 5 minutes. The Next.js storefront reads from the cloud database (Postgres), the customer never touches SQL Server directly, and the store is always at most 5 minutes behind reality.

That shipped. Customers started ordering online. The client immediately asked for more.

## Phase 2: MercadoPago and AFIP

Online orders need to charge the customer and issue a real invoice. Argentina's AFIP electronic invoicing (RG 5616) is not optional for a wholesaler.

- **MercadoPago** — Checkout Pro for the customer, signed HMAC webhooks for the confirmation callback.
- **AFIP** — direct SOAP integration to WSFEv1 with the client's own X.509 certificate. Comprobantes A, B, C, Notas de Crédito, all issued directly from the ERP.

The AFIP integration is the boring part that took the longest. The service exposes a SOAP interface with strict schema, requires a keep-alive token, and rejects any comprobante with a mismatched CUIT/IIBB combination. The final code is 400 lines that has processed a lot of invoices without a single AFIP rejection.

## Phase 3: the back-office ERP

At this point the client saw the potential and asked for the pieces PunTouch could not deliver:

- **Tesorería with per-sucursal balances** — every branch has its own cash box, own bank account, own expenses. A consolidated view sums them; a per-branch view is the daily working surface.
- **Live Cuadro de Cuentas Mayores** — the traditional accounting balance sheet, computed from the same POS + AFIP + tesorería data, updated in real time. The accountant stopped opening Excel.
- **Cheques lifecycle** — cheque received, cheque endorsed to a supplier, cheque bounced, cheque cleared. Every state transition is a Postgres row with a timestamp and an operator.
- **Bulk stock and price Excel ops** — a 3,000-SKU price update used to take the buyer 3 hours in Excel + a manual re-entry into PunTouch. Now it is a drag-and-drop of the Excel file, a preview screen, a confirm click. 30 seconds.
- **Cierre de caja** — the daily branch close, matching physical cash to what the POS recorded. Discrepancies flag as alerts on the owner's morning email.

Every one of these features started as "can we also do X?" and ended as a Postgres table + a Next.js screen + a nightly report.

## Phase 4: the customer PWA

Wholesale customers were placing orders on desktop. The client wanted them on the phone too — but a native app for a low-frequency B2B use case is a bad investment.

The storefront was already a Next.js app. Turning it into a Progressive Web App was a week of work:

- \`manifest.webmanifest\` with icons, name, theme color.
- Service worker with a network-first strategy for the API and cache-first for static assets.
- \`beforeinstallprompt\` handling to trigger the install banner at the right moment (after 2 successful orders).
- Web Push notifications for order status updates.

The install rate on the PWA banner has been material. Customers who install the PWA order more and re-order faster than customers who use the browser only.

## The infrastructure

- **Cloud database**: Postgres on a DigitalOcean droplet.
- **Sync service**: .NET 8 worker running on the client's SQL Server machine, communicating with the cloud API over HTTPS.
- **Storefront + ERP**: Next.js 14 on a second DigitalOcean droplet.
- **MercadoPago**: signed HMAC webhooks, idempotent by transaction ID.
- **AFIP**: SOAP client with certificate stored on the droplet, refreshed via a scheduled job.

## What the client owns

Everything. The sync service source, the Next.js storefront + ERP, the Postgres schema, the AFIP integration, the MercadoPago account, the PWA manifest, the deploy scripts.

Distrialma has been in production and evolving since 2026-03. The relationship is ongoing — most weeks add one more small feature ("can the cierre de caja also send an email when the discrepancy is >5%?"), which is exactly the shape a healthy ERP relationship should take.`,
  },
  {
    slug: 'solana-amm-dex-anchor-jupiter-sub-second-execution',
    title: 'Building an AMM DEX on Solana with Anchor and Jupiter — sub-second execution, no more UX-killing latency',
    description: 'Case study of DexSpeed: a Raydium-style AMM DEX on Solana with Anchor smart contracts, SPL token support, Jupiter Aggregator integration. Full trader flow shipped in weeks, 99% reduction in wait time vs the client\'s previous ETH-based DEX.',
    keywords: 'solana AMM DEX, anchor rust smart contract, jupiter aggregator, SPL tokens, solana defi developer, sub second DEX execution, solana vs ethereum DEX, rust smart contract developer',
    publishedAt: '2025-12-20',
    updatedAt: '2026-09-26',
    readingMinutes: 10,
    tags: ['Blockchain', 'Solana', 'DeFi', 'Case Study'],
    relatedProjectId: 'dexspeed',
    body: `The client had a working Ethereum-based DEX. The trader UX was fatal — a swap took 12-40 seconds between click and fill, and the fee curve during network congestion made small trades economically pointless.

The ask was a Solana equivalent. Same UX intent, sub-second execution, Jupiter Aggregator integration so users get the best route across the Solana DeFi landscape, not just liquidity from our own pools.

## Why Solana for a DEX

- **Block time**: ~400ms. Trader clicks, trader gets fill, no coffee break.
- **Fees**: fractions of a cent per swap, not $5-40 like Ethereum L1.
- **Anchor**: Solana's dev framework is much lower-friction than raw Rust + Solana Program Library.
- **Jupiter Aggregator**: the de-facto aggregator on Solana. If you build a DEX and do not integrate Jupiter, users just use another one.

## The AMM design

Raydium-style constant-product AMM. \`x * y = k\`, LP tokens for liquidity providers, fee tier configurable per pool.

Implementation in Anchor:

- \`initialize_pool\` — creates a pool for a given token pair, mints LP tokens.
- \`add_liquidity\` — deposits both tokens, mints LP tokens proportional to the pool share.
- \`remove_liquidity\` — burns LP tokens, returns proportional amounts of both underlying tokens.
- \`swap\` — the interesting instruction. Computes output amount using constant-product math, deducts fee, transfers tokens.

The whole program is ~450 lines of Rust. Anchor's macros carry a lot of weight — most of the boilerplate is generated.

## Jupiter integration

Jupiter Aggregator routes swaps across all Solana DEXes to give users the best price. From a DEX's perspective, being routable through Jupiter is free traffic.

Registration is submitting the pool addresses to Jupiter's API registry. Jupiter's routing engine picks up our pools automatically and includes them in quotes when they offer better pricing than alternatives.

The frontend also uses Jupiter for routing when the user's swap benefits from splitting across multiple pools. The user's UX is: type an amount, see the best quote, click swap, done in under a second.

## SPL token support

SPL tokens are Solana's ERC-20 equivalent — but the structure is different. Each token has a mint account and each holder has an associated token account. Transfers go through those associated accounts, not the mint.

The DEX handles arbitrary SPL tokens: any tokenmint address can be paired with any other, no whitelist, no approval process. This is table stakes for a Raydium-style DEX and it works out of the box with Anchor's token program integration.

## Testing

Anchor's built-in testing framework (Mocha + Anchor's TypeScript SDK) runs against a local Solana test validator. The test suite:

- Initializes a fresh pool.
- Adds liquidity from three simulated LPs.
- Executes 100 swaps with varying sizes, verifies the constant-product invariant holds.
- Removes liquidity, verifies each LP gets proportional withdrawal.
- Attempts adversarial swaps (zero input, larger-than-pool input, wrong token) and verifies rejection.

Run time on a local validator: ~40 seconds for the full suite. That is fast enough to run on every commit.

## Deployment

Deployed first to Solana devnet, ran a 2-week user smoke test, then deployed to mainnet-beta. Program addresses are pinned in the frontend config.

The upgrade authority for the program is a multisig (Squads Protocol, the Solana equivalent of Gnosis Safe). No single key can push a new program version.

## What shipped

- **AMM DEX** live at dexspeed.com.br.
- **Sub-second swap execution** (Solana block time is ~400ms, our full flow is under 800ms end-to-end).
- **Jupiter integration** — the DEX shows up in Jupiter route quotes.
- **SPL tokens supported natively** — any user can create a pool.
- **99% wait time reduction** vs the client's prior Ethereum-based DEX (12-40s → <1s).

The client owns the Anchor program source, the deployment authority (via multisig), the frontend, and the Jupiter registration.`,
  },
  {
    slug: 'cve-2024-45519-zimbra-incident-response-custom-perl-patch',
    title: 'CVE-2024-45519 incident response — patching a live Zimbra mail server mid-compromise with a custom Perl fix',
    description: 'Case study of the Hilong Ecuador incident: a production mail server actively compromised, malware eradicated (cryptominer + reverse shell + persistence crontab), CVE-2024-45519 mitigated with a custom Perl patch, fail2ban + firewalld hardening, weekly SOC monitoring.',
    keywords: 'CVE-2024-45519, zimbra incident response, mail server compromise, malware eradication cryptominer, reverse shell persistence, custom perl patch, fail2ban firewalld hardening, SOC monitoring, security freelancer',
    publishedAt: '2026-08-20',
    updatedAt: '2026-09-26',
    readingMinutes: 11,
    tags: ['Security', 'Incident Response', 'Case Study'],
    relatedProjectId: 'hilong-security',
    body: `Hilong Ecuador's production Zimbra mail server was owned. Cryptominer eating CPU, reverse shell in a persistence crontab, unauthorized SSH keys in root's authorized_keys, outbound traffic to command-and-control servers on obscure ports. The company found out because email throughput had degraded — the initial call was "our email is slow", the reality was much worse.

## Triage — the first two hours

Rule zero of IR: do not reboot. A reboot loses volatile evidence (running processes, network connections, mapped memory).

The first two hours were pure observation:

- \`ps auxf\` to enumerate every running process, with parent-child chains.
- \`netstat -tunapl\` to list every listening port and every established connection.
- \`ss -tunp\` cross-check.
- \`crontab -l\` for every user with a shell, \`ls -la /etc/cron.*\`.
- \`find / -name authorized_keys 2>/dev/null\` — audit every SSH trust.
- \`last -30\` and \`wtmp\` review for unexpected logins.
- \`ausearch --start today\` for auditd events.

Findings, in the order they surfaced:

1. A binary at \`/tmp/.cache/kdevtmpfsi\` pegging 380% CPU. Textbook Monero cryptominer.
2. A reverse shell attached to a listener on \`91.x.x.x:4444\` originating from a process named \`kinsing\`.
3. A crontab entry \`* * * * * /tmp/.cache/kdevtmpfsi\` under root, re-launching the miner if killed.
4. A root SSH key in \`/root/.ssh/authorized_keys\` matching no known engineer.
5. A modified \`/etc/rc.local\` re-adding the SSH key on every boot.

## The entry point

CVE-2024-45519, a critical Zimbra postjournal RCE disclosed in September 2024. The compromise timeline matched public exploit availability. The attacker had root within an hour of Zimbra being scanned.

## Eradication

Order of operations:

1. **Isolate the network at the switch level** — not at the server. Cutting the switch port prevents the attacker from noticing we are cleaning up and reacting.
2. **Snapshot the disk** — full raw image to an external drive for forensic preservation. This is the evidence bundle that later goes to the client's lawyer if needed.
3. **Kill the miner and reverse shell** — \`kill -9\` on the identified PIDs.
4. **Remove the persistence** — delete the malicious crontab entries, the modified \`rc.local\`, the unauthorized SSH keys.
5. **Rotate every credential** — root password, every service account, every SSH key, every API token stored on the server. Assume the attacker has all of them.
6. **Patch Zimbra to the CVE-fixed version** — but Zimbra's official patch was not yet available for the client's OS version.

## The custom Perl patch

Zimbra's postjournal handler is a Perl script that accepts a message body over a local Unix socket. The CVE was an input sanitization flaw that let an attacker inject shell metacharacters into a downstream \`system()\` call.

The official fix was pending. The client's mail server needed to be back online today, not next week.

I wrote a 40-line Perl patch that intercepts the postjournal input, strips shell metacharacters, rejects any input matching the CVE's exploit signature, and logs the attempt. It is not a proper fix — a proper fix goes into the codepath that does the \`system()\` call. But it closes the exploitable surface and it works.

The patch was applied, Zimbra was restarted, the network isolation was lifted, and mail flow resumed. Total downtime after eradication: 12 minutes.

The official Zimbra patch was applied 4 days later when it shipped. The custom Perl patch was removed at that point.

## Hardening

The server was owned once. The goal now is to make owning it a second time expensive.

- **fail2ban** on SSH, Zimbra web mail, IMAP, POP3. Any client that fails auth 5 times in 10 minutes gets a 24-hour ban.
- **firewalld** replacing the previous default iptables. Explicit allow rules for mail ports, deny everything else.
- **SSH key-only auth** — password login disabled entirely.
- **Root SSH disabled** — an attacker who steals a key still has to escalate.
- **auditd** rules for filesystem writes to \`/etc\`, \`/var/spool/cron\`, \`/root/.ssh\`.
- **Weekly SOC review** — a scheduled log review of auth failures, unusual processes, outbound connections. The client is on a small retainer for this.

## What the client got

- Mail server back online in the same day.
- Malware fully eradicated with a preserved forensic image.
- Every credential rotated.
- Weekly SOC monitoring for early detection of re-compromise.
- A written incident report describing the compromise, the actions taken, and the residual risks.

## What the client learned

Zimbra is a target. Any mail server with public IMAP/webmail exposure is a target. The right posture is: patch aggressively, monitor auth failures continuously, keep backups off-server, and assume the box will be owned eventually — plan for that.

The engagement continues as a monthly retainer.`,
  },
];
