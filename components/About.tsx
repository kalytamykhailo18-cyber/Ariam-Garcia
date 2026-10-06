'use client';
import { useEffect, useRef } from 'react';
import { personalInfo } from '../lib/data';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon       from '@mui/icons-material/Work';
import SchoolIcon     from '@mui/icons-material/School';
import PublicIcon     from '@mui/icons-material/Public';
import BoltIcon          from '@mui/icons-material/Bolt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SmartToyIcon      from '@mui/icons-material/SmartToy';
import CodeIcon          from '@mui/icons-material/Code';
import PaymentIcon       from '@mui/icons-material/Payment';
import WavingHandIcon    from '@mui/icons-material/WavingHand';

const FACTS = [
  { icon: <LocationOnIcon style={{ fontSize: '1.1rem', color: '#818cf8' }} />, label: 'Location',     value: personalInfo.location },
  { icon: <WorkIcon       style={{ fontSize: '1.1rem', color: '#22d3ee' }} />, label: 'Experience',   value: '8+ Years'            },
  { icon: <SchoolIcon     style={{ fontSize: '1.1rem', color: '#c084fc' }} />, label: 'Education',    value: 'B.Sc. Software Eng.' },
  { icon: <PublicIcon     style={{ fontSize: '1.1rem', color: '#34d399' }} />, label: 'Availability', value: 'Remote / Worldwide'  },
];

const HIGHLIGHTS = [
  { icon: <CalendarMonthIcon style={{ fontSize: '1.4rem' }} />, color: '#818cf8', title: 'Booking & Scheduling', desc: 'Five systems for salons, clinics, sports venues and installation services. The problem is never the calendar.' },
  { icon: <BoltIcon          style={{ fontSize: '1.4rem' }} />, color: '#22d3ee', title: 'Operations Automation', desc: 'Work that repeats every day becomes a system nobody on the team has to think about again.' },
  { icon: <SmartToyIcon      style={{ fontSize: '1.4rem' }} />, color: '#c084fc', title: 'AI Where Work Happens', desc: 'Document extraction, support automation, anomaly detection on live data. Not a chatbot on a homepage.' },
  { icon: <CodeIcon          style={{ fontSize: '1.4rem' }} />, color: '#34d399', title: 'Code You Own',          desc: 'No platform fee that grows with your customer list. No ceiling you find out about in month eight.' },
  { icon: <PaymentIcon       style={{ fontSize: '1.4rem' }} />, color: '#fbbf24', title: 'Payments & Billing',    desc: 'Stripe, Mercado Pago and PayPal wired into billing that runs without anyone watching it.' },
];

// ── Cylinder geometry ──────────────────────────────────────────
const CARD_COUNT = HIGHLIGHTS.length;   // 5
const ANGLE_STEP = 360 / CARD_COUNT;    // 72°
const RADIUS     = 430;
const CARD_W     = 260;
const CARD_H     = 230;
const SUMMARY_W  = 520;
const SUMMARY_H  = 420;

export default function About() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);
  // Summary lives INSIDE the preserve-3d hub and is counter-rotated each frame
  // so it always faces the viewer while still sharing Z-depth with the orbiting cards.
  const summaryRef   = useRef<HTMLDivElement>(null);

  const drag = useRef({ active: false, lastX: 0, rotY: 0, velocity: 0, lastDragAt: 0 });

  // ── rAF rotation loop ──────────────────────────────────────
  useEffect(() => {
    const AUTO_SPEED = 0.18, RESUME_DELAY = 1800, FRICTION = 0.94;
    let raf: number;

    function tick() {
      const d = drag.current, now = Date.now();
      if (!d.active) {
        if (now - d.lastDragAt > RESUME_DELAY) { d.rotY -= AUTO_SPEED; d.velocity = 0; }
        else { d.velocity *= FRICTION; d.rotY += d.velocity; }
      }

      // Rotate the cylinder hub
      if (innerRef.current)
        innerRef.current.style.transform = `rotateX(-10deg) rotateY(${d.rotY}deg)`;

      // Counter-rotate the summary card to keep it upright:
      // Hub applies rotateX(-10) * rotateY(rotY).
      // Inverse is rotateY(-rotY) * rotateX(10) — cancels to identity.
      if (summaryRef.current)
        summaryRef.current.style.transform = `rotateY(${-d.rotY}deg) rotateX(10deg)`;

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Scroll-reveal ───────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting)
        entry.target.querySelectorAll('.reveal').forEach((el, i) => {
          (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.1}s both`;
        });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Drag helpers ────────────────────────────────────────────
  const startDrag = (x: number) => {
    drag.current.active = true; drag.current.lastX = x; drag.current.velocity = 0;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };
  const moveDrag = (x: number) => {
    if (!drag.current.active) return;
    const dx = x - drag.current.lastX;
    drag.current.velocity = dx * 0.35; drag.current.rotY += drag.current.velocity; drag.current.lastX = x;
  };
  const endDrag = () => {
    drag.current.active = false; drag.current.lastDragAt = Date.now();
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  return (
    <section id="about" className="section-wrapper overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16 reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-primary-light mb-3 block">Who I Am</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
        </div>

        {/* ── Desktop: 3D scene ── */}
        <div
          ref={containerRef}
          className="hidden lg:block relative reveal"
          style={{
            opacity: 0,
            height: '680px',
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
            cursor: 'grab',
            userSelect: 'none',
          }}
          onMouseDown={(e) => startDrag(e.clientX)}
          onMouseMove={(e) => moveDrag(e.clientX)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={(e) => startDrag(e.touches[0].clientX)}
          onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX); }}
          onTouchEnd={endDrag}
        >
          {/*
           * Single preserve-3d hub — summary AND orbiting cards are all children here.
           * They share the same Z-depth space, so:
           *   front card (Z = +RADIUS) → renders in front of summary (Z = 0)
           *   back  card (Z = -RADIUS) → renders behind  summary (Z = 0)
           *
           * The summary is counter-rotated each frame (rotateY(-rotY) rotateX(10deg))
           * to exactly cancel the hub's own rotation, keeping it upright.
           */}
          <div
            ref={innerRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* ── Summary card — counter-rotated, stationary at Z = 0 ── */}
            <div
              ref={summaryRef}
              style={{
                position: 'absolute',
                width: `${SUMMARY_W}px`,
                height: `${SUMMARY_H}px`,
                marginLeft: `-${SUMMARY_W / 2}px`,
                marginTop: `-${SUMMARY_H / 2 + 100}px`,
                // transform updated by rAF every frame
              }}
              onMouseDown={(e) => { e.stopPropagation(); startDrag(e.clientX); }}
            >
              <div
                className="glass p-6 h-full flex flex-col justify-between"
                style={{ boxShadow: '0 0 60px rgba(99,102,241,0.15), 0 0 120px rgba(168,85,247,0.07)' }}
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <WavingHandIcon style={{ fontSize: '1.4rem', color: '#818cf8' }} />
                    Professional Summary
                  </h3>
                  <p className="text-[#eee] leading-relaxed text-sm mb-3">
                    I build custom systems for{' '}
                    <span className="text-primary-light font-semibold">service businesses</span>. Booking and
                    scheduling, <span className="text-secondary font-medium">operations automation</span>, and{' '}
                    <span className="text-accent-light font-medium">AI</span> put inside processes that already run.
                  </p>
                  <p className="text-[#eee] text-sm leading-relaxed">
                    Every project starts with what the business is{' '}
                    <span className="text-emerald-400 font-medium">losing today</span>, not with a feature list.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {FACTS.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {fact.icon}
                      <div>
                        <div className="text-xs text-[#eee]">{fact.label}</div>
                        <div className="text-sm font-semibold text-[#eee] leading-tight">{fact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Orbiting highlight cards ── */}
            {HIGHLIGHTS.map((item, ci) => (
              <div
                key={item.title}
                style={{
                  position: 'absolute',
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  marginLeft: `-${CARD_W / 2}px`,
                  marginTop: `-${CARD_H / 2}px`,
                  transform: `rotateY(${ci * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                  background: 'rgba(15,23,42,0.90)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${item.color}35`,
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: `0 0 28px ${item.color}15, inset 0 1px 0 ${item.color}20`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}30`, color: item.color }}
                >
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm" style={{ color: item.color }}>{item.title}</h4>
                <p className="text-[#eee] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: stacked layout ── */}
        <div className="lg:hidden space-y-6">
          <div className="glass p-8 reveal" style={{ opacity: 0 }}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <WavingHandIcon style={{ fontSize: '1.5rem', color: '#818cf8' }} />
              Professional Summary
            </h3>
            <p className="text-[#eee] leading-relaxed text-lg">
              I build custom systems for{' '}
              <span className="text-primary-light font-semibold">service businesses</span>. Booking and scheduling,{' '}
              <span className="text-secondary font-medium">operations automation</span>, and{' '}
              <span className="text-accent-light font-medium">AI</span> put inside processes that already run.
              Every project starts with what the business is{' '}
              <span className="text-emerald-400 font-medium">losing today</span>, not with a feature list.
            </p>
            <p className="text-[#eee] leading-relaxed text-lg mt-4">
              Delivered across{' '}
              <span className="text-primary-light font-medium">healthcare, retail, sports, education and fintech</span>,
              always as code the client owns.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {FACTS.map((fact, i) => (
              <div key={fact.label} className="glass p-4 reveal" style={{ opacity: 0, animationDelay: `${i * 0.1 + 0.3}s` }}>
                <div className="mb-1">{fact.icon}</div>
                <div className="text-xs text-[#eee] uppercase tracking-wide">{fact.label}</div>
                <div className="text-sm font-semibold text-[#eee]">{fact.value}</div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={item.title}
                className="glass p-5 flex gap-4 items-start reveal skill-card cursor-default"
                style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${item.color}50`; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${item.color}15`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}30`, color: item.color }}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: item.color }}>{item.title}</h4>
                  <p className="text-[#eee] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
