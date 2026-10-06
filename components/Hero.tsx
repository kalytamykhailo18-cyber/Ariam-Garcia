'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { personalInfo, clientProof } from '../lib/data';

// Disciplines, not frameworks. A clinic owner does not care that you know Solidity.
const TITLES = [
  'Software Engineer',
  'AI Engineer',
  'Security Engineer',
  'Blockchain Engineer',
  'Automation Engineer',
  'Fintech Engineer',
];

// Deterministic star positions (avoids SSR hydration mismatch)
const STARS = Array.from({ length: 20 }, (_, i) => ({
  w:     (((i * 137 + 23) % 30) / 10 + 1).toFixed(1),
  h:     (((i * 137 + 23) % 30) / 10 + 1).toFixed(1),
  top:   ((i * 13.7) % 100).toFixed(1),
  left:  ((i * 17.3) % 100).toFixed(1),
  dur:   (((i * 137) % 40) / 10 + 2).toFixed(1),
  delay: ((i * 0.2) % 4).toFixed(1),
}));

// Real measured results from delivered projects. Every one is defensible.
const OUTCOMES = [
  { metric: '18% → 8%',   label: 'no-show rate',        color: '#34d399' },
  { metric: '$2,000 → $180', label: 'monthly AI cost',  color: '#818cf8' },
  { metric: '+22%',       label: 'capacity recovered',  color: '#22d3ee' },
  { metric: '3 hrs → 30s', label: 'bulk price updates', color: '#fbbf24' },
];

// Discipline badges around the photo — what he does, not what he types.
const DISCIPLINES = [
  { label: 'AI',         color: '#c084fc' },
  { label: 'Security',   color: '#f87171' },
  { label: 'Blockchain', color: '#34d399' },
  { label: 'Automation', color: '#fbbf24' },
];

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentTitle = TITLES[titleIdx];

    if (!deleting && displayed.length < currentTitle.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(currentTitle.slice(0, displayed.length + 1));
      }, 55);
    } else if (!deleting && displayed.length === currentTitle.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, titleIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center grid-bg overflow-hidden"
    >
      {/* Background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-orb"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none animate-orb"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '3s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full pointer-events-none animate-orb"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '6s' }}
      />

      {STARS.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            width:  `${s.w}px`,
            height: `${s.h}px`,
            top:    `${s.top}%`,
            left:   `${s.left}%`,
            '--dur':   `${s.dur}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — the pitch */}
          <div className="flex-1 text-center lg:text-left" style={{ animation: 'slideInLeft 0.8s ease-out forwards' }}>

            {/* Availability + rating, side by side */}
            <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available now · replies same day
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
                ★★★★★ {clientProof.average} on {clientProof.source}
              </span>
            </div>

            {/* Name as eyebrow, promise as the headline */}
            <h1 className="mb-5">
              <span className="block text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-primary-light mb-3">
                {personalInfo.name}
                <span className="block mt-1 text-xs md:text-sm tracking-[0.15em] text-slate-400">
                  Software Engineer · Louisville, KY
                </span>
              </span>
              <span className="block text-4xl md:text-5xl xl:text-6xl font-black leading-[1.08] text-white">
                I fix what your business
              </span>
              <span className="block text-4xl md:text-5xl xl:text-6xl font-black leading-[1.08] gradient-text">
                is losing today.
              </span>
            </h1>

            {/* Rotating discipline */}
            <div className="h-8 mb-5 flex items-center justify-center lg:justify-start">
              <span className="text-lg md:text-xl font-semibold text-slate-300">
                {displayed}
                <span className="animate-blink text-primary-light ml-0.5">|</span>
              </span>
            </div>

            {/* One sentence, business language */}
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
              Booking systems, operations automation, AI that actually holds up in production,
              blockchain, and security. Delivered as{' '}
              <span className="text-white font-medium">code you own</span>, on infrastructure you control.
            </p>

            {/* Proof numbers — the 3-second credibility hit */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center lg:justify-start mb-7">
              <Stat value={clientProof.delivered} label="projects delivered" />
              <Stat value={clientProof.repeatClients} label="clients came back" />
              <Stat value="10+" label="years shipping" />
              <Stat value="9" label="countries served" />
            </div>

            {/* Measured outcomes — proof it pays for itself */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {OUTCOMES.map((o) => (
                <span
                  key={o.label}
                  className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                  style={{ background: 'rgba(15,23,42,0.6)', border: `1px solid ${o.color}30` }}
                >
                  <span className="font-bold" style={{ color: o.color }}>{o.metric}</span>
                  <span className="text-slate-500">{o.label}</span>
                </span>
              ))}
            </div>

            {/* CTAs — consultant framing, not job-seeker */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <a
                href="#contact"
                className="btn-primary"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                Start a project
              </a>
              <Link href="/blog" className="btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
                Read case studies
              </Link>
            </div>

            {/* Social */}
            <div className="flex gap-3 justify-center lg:justify-start">
              <SocialLink href={personalInfo.github} icon="github" label="GitHub" />
              <SocialLink href={`mailto:${personalInfo.email}`} icon="email" label="Email" />
              <SocialLink href={personalInfo.whatsapp} icon="whatsapp" label="WhatsApp" />
            </div>
          </div>

          {/* Right — Photo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6" style={{ animation: 'slideInRight 0.8s ease-out forwards' }}>
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #06b6d4, #6366f1)',
                  padding: '2px',
                  borderRadius: '50%',
                  margin: '-8px',
                }}
              >
                <div className="w-full h-full rounded-full bg-dark" />
              </div>

              <div
                className="absolute rounded-full"
                style={{ inset: '-16px', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '50%' }}
              />

              <div
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden"
                style={{ border: '3px solid rgba(99,102,241,0.5)', boxShadow: '0 0 40px rgba(99,102,241,0.3), 0 0 80px rgba(168,85,247,0.15)' }}
              >
                <Image
                  src="/photo.jpg"
                  alt={`${personalInfo.name} — software engineer specializing in AI, security, blockchain, business automation and fintech`}
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover object-top"
                  priority
                  fetchPriority="high"
                />
              </div>

              {/* Floating discipline badges */}
              {DISCIPLINES.map((d, i) => {
                const positions = [
                  { top: '8%',  left:  '-78px' },
                  { top: '42%', left:  '-90px' },
                  { top: '8%',  right: '-78px' },
                  { top: '42%', right: '-90px' },
                ];
                return (
                  <div
                    key={d.label}
                    className="absolute hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold animate-float"
                    style={{
                      ...positions[i],
                      background: 'rgba(15,23,42,0.9)',
                      border: `1px solid ${d.color}40`,
                      color: d.color,
                      animationDelay: `${i * 0.5}s`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                    {d.label}
                  </div>
                );
              })}
            </div>

            {/* Trust line under the photo */}
            <p className="text-xs text-slate-500 text-center max-w-[16rem] leading-relaxed">
              Live systems in Argentina, Mexico, Brazil, Spain,
              Ecuador, Italy, USA and Colombia.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1px solid rgba(99,102,241,0.3)' }}
        >
          <div
            className="w-1 h-2 rounded-full bg-primary-light"
            style={{ animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center lg:text-left">
      <div className="text-2xl md:text-3xl font-black gradient-text leading-none mb-1">{value}</div>
      <div className="text-xs text-slate-500 leading-tight">{label}</div>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  const icons: Record<string, React.ReactNode> = {
    github: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    star: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.9 6.26 6.85.72-5.1 4.6 1.42 6.72L12 16.9l-6.07 3.4 1.42-6.72-5.1-4.6 6.85-.72z"/>
      </svg>
    ),
    whatsapp: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.99 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
    email: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,12 2,6"/>
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target={icon !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(99,102,241,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {icons[icon]}
    </a>
  );
}
