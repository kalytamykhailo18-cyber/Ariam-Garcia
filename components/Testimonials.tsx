'use client';
import { useEffect, useRef } from 'react';
import { testimonials, clientProof } from '../lib/data';
import StarIcon           from '@mui/icons-material/Star';
import FormatQuoteIcon    from '@mui/icons-material/FormatQuote';
import TranslateIcon      from '@mui/icons-material/Translate';
import ChevronLeftIcon    from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon   from '@mui/icons-material/ChevronRight';
import AutorenewIcon      from '@mui/icons-material/Autorenew';

const CARD_W = 380;
const CARD_H = 330;
const GAP    = 20;

// Accent per card, cycled from the site palette
const ACCENTS = ['#818cf8', '#22d3ee', '#c084fc', '#34d399', '#fbbf24'];

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  // offset / velocity live in a ref so the rAF loop never triggers a re-render
  const motion = useRef({ offset: 0, velocity: 0, paused: false, half: 0 });

  // ── Auto-flow loop, arrow impulses decay into it ──────────────
  useEffect(() => {
    const AUTO_SPEED = 0.45;   // px per frame while idle
    const FRICTION   = 0.92;   // decay applied to an arrow impulse
    let raf: number;

    const measure = () => {
      // the list is rendered twice, so half the track is one full cycle
      if (trackRef.current) motion.current.half = trackRef.current.scrollWidth / 2;
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);

    function tick() {
      const m = motion.current;

      if (m.half > 0) {
        if (Math.abs(m.velocity) > 0.05) {
          m.offset  += m.velocity;
          m.velocity *= FRICTION;
        } else {
          m.velocity = 0;
          if (!m.paused) m.offset -= AUTO_SPEED;
        }

        // seamless wrap in both directions
        if (m.offset <= -m.half) m.offset += m.half;
        if (m.offset > 0)        m.offset -= m.half;

        if (trackRef.current)
          trackRef.current.style.transform = `translate3d(${m.offset}px,0,0)`;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  // ── Scroll-reveal ─────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.tm-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.1}s both`;
          });
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // one click ≈ one card, carried by friction
  const nudge = (dir: -1 | 1) => { motion.current.velocity += dir * 30; };

  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="section-wrapper relative overflow-hidden" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Heading */}
        <div className="text-center mb-10 tm-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-primary-light mb-3 block">
            Client Feedback
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Reviews left by the people who paid for the work. Nothing here was written by me.
          </p>
        </div>

        {/* Proof strip */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 tm-reveal" style={{ opacity: 0 }}>
          <ProofPill
            icon={<StarIcon style={{ fontSize: '1.05rem' }} />}
            value={clientProof.average}
            label="average rating"
            color="#fbbf24"
          />
          <ProofPill
            icon={<FormatQuoteIcon style={{ fontSize: '1.05rem' }} />}
            value={clientProof.delivered}
            label="projects delivered"
            color="#818cf8"
          />
          <ProofPill
            icon={<AutorenewIcon style={{ fontSize: '1.05rem' }} />}
            value={clientProof.repeatClients}
            label="clients came back"
            color="#34d399"
          />
        </div>

        {/* Carousel */}
        <div
          className="relative tm-reveal"
          style={{ opacity: 0 }}
          onMouseEnter={() => { motion.current.paused = true; }}
          onMouseLeave={() => { motion.current.paused = false; }}
        >
          <div className="marquee-outer">
            <div
              ref={trackRef}
              className="flex"
              style={{ width: 'max-content', gap: `${GAP}px`, willChange: 'transform' }}
            >
              {doubled.map((t, i) => (
                <Card key={`${t.id}-${i}`} t={t} accent={ACCENTS[i % ACCENTS.length]} />
              ))}
            </div>
          </div>

          <Arrow side="left"  onClick={() => nudge(1)}  />
          <Arrow side="right" onClick={() => nudge(-1)} />
        </div>

        <p className="text-center text-slate-600 text-xs mt-8 tm-reveal" style={{ opacity: 0 }}>
          Verified reviews from {clientProof.source}. Quotes left in Portuguese, Spanish and Italian
          were translated into English, originals unchanged on the platform.
        </p>

      </div>
    </section>
  );
}

/* ── Proof pill ───────────────────────────────────────────────── */
function ProofPill({
  icon, value, label, color,
}: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-2.5 px-5 py-2.5 rounded-full"
      style={{ background: `${color}0f`, border: `1px solid ${color}33` }}
    >
      <span style={{ color }}>{icon}</span>
      <span className="text-lg font-black text-white leading-none">{value}</span>
      <span className="text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}

/* ── Arrow button ─────────────────────────────────────────────── */
function Arrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous testimonials' : 'Next testimonials'}
      className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-slate-300 transition-all duration-200"
      style={{
        [side]: '-6px',
        background: 'rgba(15,23,42,0.92)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(99,102,241,0.3)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(99,102,241,0.75)';
        el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.45), 0 0 20px rgba(99,102,241,0.3)';
        el.style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(99,102,241,0.3)';
        el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.45)';
        el.style.color = '';
      }}
    >
      {side === 'left'
        ? <ChevronLeftIcon  style={{ fontSize: '1.5rem' }} />
        : <ChevronRightIcon style={{ fontSize: '1.5rem' }} />}
    </button>
  );
}

/* ── Testimonial card ─────────────────────────────────────────── */
function Card({ t, accent }: { t: typeof testimonials[0]; accent: string }) {
  return (
    <article
      className="glass flex flex-col p-6 flex-shrink-0"
      style={{ width: `${CARD_W}px`, height: `${CARD_H}px`, borderColor: `${accent}22` }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accent}66`;
        el.style.boxShadow = `0 0 30px ${accent}14`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accent}22`;
        el.style.boxShadow = '';
      }}
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3" style={{ color: '#fbbf24' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} style={{ fontSize: '1rem' }} />
        ))}
        <FormatQuoteIcon
          style={{ fontSize: '1.6rem', color: `${accent}55`, marginLeft: 'auto' }}
        />
      </div>

      {/* Quote */}
      <p className="text-slate-300 text-sm leading-relaxed flex-1 overflow-hidden">
        {t.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ background: `${accent}1a`, border: `1px solid ${accent}44`, color: accent }}
        >
          {initials(t.author)}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white truncate">{t.author}</div>
          <div className="text-xs text-slate-500 truncate">{t.project}</div>
        </div>
        {t.translatedFrom && (
          <span
            className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full text-[0.65rem] font-semibold flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
            title={`Originally written in ${t.translatedFrom}`}
          >
            <TranslateIcon style={{ fontSize: '0.75rem' }} />
            {t.translatedFrom.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
    </article>
  );
}
