'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { hireRoles } from '../lib/hire';

// Short, plain-language framing per role. Keeps the homepage scannable
// while linking to the full page for each discipline.
const BLURB: Record<string, { short: string; color: string }> = {
  'full-stack-developer':        { short: 'Web platforms end to end — schema, API, UI, deploy, incident.', color: '#818cf8' },
  'ai-engineer':                 { short: 'LLM systems in production, with cost routing and real guardrails.', color: '#c084fc' },
  'security-engineer':           { short: 'Incident response, CVE mitigation, hardening, pentesting.', color: '#f87171' },
  'blockchain-developer':        { short: 'Mainnet contracts holding real value. Stablecoin, DEX, ESG protocol.', color: '#34d399' },
  'business-automation-engineer':{ short: 'Replace spreadsheets and paper with software the team forgets about.', color: '#fbbf24' },
  'industrial-automation-engineer': { short: 'Sensor telemetry, MQTT ingest, alerting that reaches a human in time.', color: '#22d3ee' },
  'fintech-developer':           { short: 'Payments, invoicing, reconciliation, ledgers that always balance.', color: '#60a5fa' },
  'whatsapp-api-developer':      { short: 'Official WhatsApp Cloud API. Never a wrapper that gets you banned.', color: '#4ade80' },
  'booking-system-developer':    { short: 'Appointment engines that cut no-shows and refill cancellations.', color: '#a78bfa' },
};

export default function Disciplines() {
  return (
    <section id="disciplines" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            One engineer, <span className="gradient-text">nine disciplines</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Each one backed by systems running in production right now — not by a certificate.
            Pick the one closest to your problem, or send a brief and I will tell you which it actually is.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hireRoles.map((r, i) => {
            const meta = BLURB[r.slug] || { short: r.intro, color: '#818cf8' };
            return (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/hire/${r.slug}`}
                  className="group block h-full p-5 rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(15,23,42,0.5)',
                    border: '1px solid rgba(148,163,184,0.12)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${meta.color}55`;
                    (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.8)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.12)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.5)';
                  }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                      style={{ background: meta.color, boxShadow: `0 0 12px ${meta.color}` }}
                    />
                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-white">
                      {r.role}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed pl-5">{meta.short}</p>
                  <p
                    className="text-xs mt-3 pl-5 opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                    style={{ color: meta.color }}
                  >
                    See details →
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/hire"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
          >
            Compare all disciplines →
          </Link>
        </div>
      </div>
    </section>
  );
}
