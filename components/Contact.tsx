'use client';
import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../lib/data';

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,12 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#818cf8',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    label: 'WhatsApp',
    value: personalInfo.phone,
    href: personalInfo.whatsapp,
    color: '#34d399',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: personalInfo.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
    color: '#22d3ee',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    label: 'GitHub',
    value: personalInfo.github.split('github.com/')[1]?.replace(/\/$/, '') ?? personalInfo.github,
    href: personalInfo.github,
    color: '#f1f5f9',
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', company: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.ct-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.1}s both`;
          });
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({ ok: false, error: '' }));

      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not send. Please email me directly.');
        setStatus('error');
        return;
      }

      setForm({ name: '', email: '', subject: '', message: '', company: '' });
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setError('Network problem. Please email me directly.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-wrapper grid-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16 ct-reveal" style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Tell me what the business is losing today and I will tell you whether software fixes it.
            I work in your hours and I answer in writing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Contact info */}
          <div className="space-y-4 ct-reveal" style={{ opacity: 0 }}>
            <h3 className="text-xl font-bold text-white mb-6">Contact Details</h3>
            {CONTACT_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 p-4 skill-card group"
                style={{ borderColor: `${item.color}15` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${item.color}45`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${item.color}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${item.color}15`;
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.label}</div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {item.value}
                  </div>
                </div>
                <div className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
              </a>
            ))}

            {/* Availability badge */}
            <div
              className="glass p-5 flex items-center gap-3 mt-2"
              style={{ borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.04)' }}
            >
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-emerald-400 font-bold text-sm">Available for Work</span>
                <p className="text-slate-500 text-xs mt-0.5">
                  Open to remote opportunities worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="ct-reveal" style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="glass p-8 space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wide mb-1.5 font-medium">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-dark-2 border rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-primary"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = ''; }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wide mb-1.5 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-dark-2 border rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = ''; }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wide mb-1.5 font-medium">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project inquiry / Job offer / Collaboration"
                  className="w-full bg-dark-2 border rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = ''; }}
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wide mb-1.5 font-medium">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-dark-2 border rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 resize-none"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = ''; }}
                />
              </div>

              {/* Honeypot. Hidden from people, tempting to bots. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary justify-center py-3"
                style={
                  status === 'sent'
                    ? { background: 'linear-gradient(135deg,#10b981,#34d399)', boxShadow: '0 0 25px rgba(16,185,129,0.4)' }
                    : status === 'sending'
                      ? { opacity: 0.7, cursor: 'wait' }
                      : {}
                }
              >
                {status === 'sent' ? (
                  <>✓ Message sent</>
                ) : status === 'sending' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin-slow" style={{ animationDuration: '1s' }}>
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Sending
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {status === 'sent' && (
                <p className="text-center text-sm text-emerald-400">
                  Thanks. I reply in your hours, usually the same day.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm" style={{ color: '#f87171' }}>
                  {error}{' '}
                  <a href={`mailto:${personalInfo.email}`} className="underline">
                    {personalInfo.email}
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
