'use client';
import { useEffect, useRef } from 'react';
import { blockchainHighlights } from '../lib/data';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon    from '@mui/icons-material/Description';
import BoltIcon           from '@mui/icons-material/Bolt';
import BuildIcon          from '@mui/icons-material/Build';
import SecurityIcon       from '@mui/icons-material/Security';

const CHAIN_SKILLS = [
  { name: 'Solidity',            color: '#818cf8' },
  { name: 'ERC-20 / ERC-721',   color: '#34d399' },
  { name: 'Polygon PoS',        color: '#c084fc' },
  { name: 'Web3.js',            color: '#22d3ee' },
  { name: 'Chainlink Functions', color: '#818cf8' },
  { name: 'Solana / SPL',       color: '#fbbf24' },
  { name: 'DeFi Protocols',     color: '#34d399' },
  { name: 'Smart Contracts',    color: '#22d3ee' },
];

const CHAIN_ICONS = [
  <MonetizationOnIcon key="coin" style={{ fontSize: '1.4rem' }} />,
  <DescriptionIcon    key="desc" style={{ fontSize: '1.4rem' }} />,
  <BoltIcon           key="bolt" style={{ fontSize: '1.4rem' }} />,
];

// ── Cylinder geometry ─────────────────────────────────────────
const CARD_COUNT = blockchainHighlights.length;   // 3
const ANGLE_STEP = 360 / CARD_COUNT;              // 120°
const RADIUS     = 360;
const CARD_W     = 340;
const CARD_H     = 290;

export default function Blockchain() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);

  const drag = useRef({
    active:     false,
    lastX:      0,
    rotY:       0,
    velocity:   0,
    lastDragAt: 0,
  });

  // ── rAF rotation loop ─────────────────────────────────────────
  useEffect(() => {
    const AUTO_SPEED   = 0.18;
    const RESUME_DELAY = 1800;
    const FRICTION     = 0.94;
    let raf: number;

    function tick() {
      const d   = drag.current;
      const now = Date.now();

      if (!d.active) {
        if (now - d.lastDragAt > RESUME_DELAY) {
          d.rotY    -= AUTO_SPEED;
          d.velocity = 0;
        } else {
          d.velocity *= FRICTION;
          d.rotY     += d.velocity;
        }
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(-10deg) rotateY(${d.rotY}deg)`;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Scroll-reveal ─────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.bc-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.1}s both`;
          });
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Drag helpers ─────────────────────────────────────────────
  const startDrag = (x: number) => {
    drag.current.active   = true;
    drag.current.lastX    = x;
    drag.current.velocity = 0;
    if (carouselRef.current) carouselRef.current.style.cursor = 'grabbing';
  };

  const moveDrag = (x: number) => {
    if (!drag.current.active) return;
    const dx = x - drag.current.lastX;
    drag.current.velocity = dx * 0.35;
    drag.current.rotY    += drag.current.velocity;
    drag.current.lastX    = x;
  };

  const endDrag = () => {
    drag.current.active     = false;
    drag.current.lastDragAt = Date.now();
    if (carouselRef.current) carouselRef.current.style.cursor = 'grab';
  };

  return (
    <section id="blockchain" className="section-wrapper hex-bg relative overflow-hidden" ref={sectionRef}>
      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Heading */}
        <div className="text-center mb-16 bc-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">
            Web3 &amp; DeFi
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Blockchain &amp; <span className="gradient-text-green">Web3</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#10b981,#06b6d4)' }} />
          <p className="text-[#eee] mt-4 max-w-xl mx-auto">
            Stablecoins, tokens and exchanges. Money moves through these systems, so the
            security model gets decided before the first line of code.
          </p>
        </div>

        {/* ── Desktop: draggable cylinder carousel ── */}
        <div
          ref={carouselRef}
          className="hidden lg:flex items-center justify-center mb-14 bc-reveal"
          style={{
            opacity: 0,
            height: '560px',
            perspective: '1100px',
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
          <div
            ref={innerRef}
            style={{
              position: 'relative',
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              transformStyle: 'preserve-3d',
            }}
          >
            {blockchainHighlights.map((item, ci) => (
              <div
                key={item.title}
                style={{
                  position: 'absolute',
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  transform: `rotateY(${ci * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                  background: 'rgba(10,25,20,0.90)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${item.color}35`,
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `0 0 30px ${item.color}15, inset 0 1px 0 ${item.color}20`,
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}
                  >
                    {CHAIN_ICONS[ci]}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug">{item.title}</h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: item.color }}>{item.subtitle}</p>
                  </div>
                </div>
                <p className="text-[#eee] text-sm leading-relaxed flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile / tablet: regular grid ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 lg:hidden">
          {blockchainHighlights.map((item, i) => (
            <div
              key={item.title}
              className="glass-emerald p-6 skill-card bc-reveal"
              style={{ opacity: 0, borderColor: `${item.color}30` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${item.color}60`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${item.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${item.color}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}
                >
                  {CHAIN_ICONS[i]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <p className="text-xs font-medium mt-0.5" style={{ color: item.color }}>{item.subtitle}</p>
                </div>
              </div>
              <p className="text-[#eee] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Skills + security */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Skills */}
          <div className="bc-reveal" style={{ opacity: 0 }}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BuildIcon style={{ fontSize: '1.4rem', color: '#34d399' }} />
              Blockchain Stack
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {CHAIN_SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 p-3 rounded-xl skill-card cursor-default"
                  style={{ background: `${skill.color}08`, border: `1px solid ${skill.color}25` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}60`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${skill.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}25`;
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: skill.color }} />
                  <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security principles */}
          <div className="bc-reveal" style={{ opacity: 0 }}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <SecurityIcon style={{ fontSize: '1.4rem', color: '#34d399' }} />
              Security-First Approach
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Role-Based Access Control',  desc: 'Granular permissions for every contract function.' },
                { title: 'Pausable Contracts',          desc: 'Emergency stop mechanism on all deployed contracts.' },
                { title: 'Proof of Reserves',           desc: 'Real-time verification via Chainlink Functions.' },
                { title: 'Full Audit Trail',            desc: 'On-chain events for complete transparency.' },
                { title: 'Reentrancy Guards',           desc: 'OpenZeppelin standards with custom checks.' },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-3 items-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', color: '#34d399' }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white">{item.title}</span>
                    <span className="text-slate-500 text-sm">. {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
