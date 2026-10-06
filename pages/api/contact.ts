import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Contact form endpoint.
 *
 * Sends through Resend's REST API directly, so there is no extra dependency
 * to keep in step with. Requires RESEND_API_KEY in the environment.
 */

const FROM = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';
const TO   = process.env.CONTACT_TO_EMAIL   || 'kalytamykhailo18@gmail.com';

// Naive per-instance limiter. Serverless spreads requests across instances,
// so this blunts floods rather than guaranteeing a hard cap.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();          // crude memory ceiling
  return recent.length > MAX_PER_WINDOW;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

type Data = { ok: true } | { ok: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'Mail is not configured yet' });
  }

  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim()
    || req.socket.remoteAddress
    || 'unknown';

  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many messages. Try again in a minute.' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) || {};

  // Honeypot. Real people never fill a hidden field.
  if (clean(body.company, 100)) return res.status(200).json({ ok: true });

  const name    = clean(body.name, 100);
  const email   = clean(body.email, 200);
  const subject = clean(body.subject, 200) || 'Portfolio inquiry';
  const message = clean(body.message, 5000);

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email and message are required' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'That email address does not look valid' });
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
      <p style="margin:0 0 18px"><strong>${escapeHtml(name)}</strong> sent a message from your portfolio.</p>
      <table style="border-collapse:collapse;margin-bottom:18px">
        <tr><td style="padding:4px 16px 4px 0;color:#64748b">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#64748b">Subject</td><td style="padding:4px 0">${escapeHtml(subject)}</td></tr>
      </table>
      <div style="white-space:pre-wrap;padding:16px;background:#f1f5f9;border-radius:8px">${escapeHtml(message)}</div>
    </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,                       // replying goes straight to the visitor
        subject: `Portfolio: ${subject}`,
        html,
        text: `${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Resend rejected the message', r.status, detail);
      return res.status(502).json({ ok: false, error: 'Could not send right now. Please email directly.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact send failed', err);
    return res.status(502).json({ ok: false, error: 'Could not send right now. Please email directly.' });
  }
}
