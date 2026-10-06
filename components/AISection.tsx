'use client';
import { useEffect, useRef } from 'react';
import { aiHighlights } from '../lib/data';
import SmartToyIcon      from '@mui/icons-material/SmartToy';
import RocketLaunchIcon  from '@mui/icons-material/RocketLaunch';
import PsychologyIcon    from '@mui/icons-material/Psychology';
import AutoAwesomeIcon   from '@mui/icons-material/AutoAwesome';
import AccountTreeIcon   from '@mui/icons-material/AccountTree';
import MicIcon           from '@mui/icons-material/Mic';
import PaletteIcon       from '@mui/icons-material/Palette';
import ChatIcon          from '@mui/icons-material/Chat';
import PhoneAndroidIcon  from '@mui/icons-material/PhoneAndroid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const AI_TOOLS_EXTRA = [
  { name: 'OpenAI GPT-4',        icon: <PsychologyIcon    style={{ fontSize: '1rem' }} />, color: '#818cf8' },
  { name: 'Gemini 1.5 Flash',    icon: <AutoAwesomeIcon   style={{ fontSize: '1rem' }} />, color: '#c084fc' },
  { name: 'LangChain',           icon: <AccountTreeIcon   style={{ fontSize: '1rem' }} />, color: '#22d3ee' },
  { name: 'Whisper STT',         icon: <MicIcon           style={{ fontSize: '1rem' }} />, color: '#34d399' },
  { name: 'Stable Diffusion',    icon: <PaletteIcon       style={{ fontSize: '1rem' }} />, color: '#fbbf24' },
  { name: 'WhatsApp Cloud API',  icon: <ChatIcon          style={{ fontSize: '1rem' }} />, color: '#34d399' },
  { name: 'Twilio',              icon: <PhoneAndroidIcon  style={{ fontSize: '1rem' }} />, color: '#f87171' },
  { name: 'Google Calendar API', icon: <CalendarMonthIcon style={{ fontSize: '1rem' }} />, color: '#818cf8' },
];

const ALL_AI_CARDS = [
  ...aiHighlights,
  {
    tool: 'AI-First Development',
    color: '#c084fc',
    desc: 'AI belongs where the work already happens, not bolted on at the end. I decide that on day one, with the client, before anything is built.',
    projects: [] as string[],
    catchAll: true,
  },
];

const CARD_COUNT = ALL_AI_CARDS.length;
const ANGLE_STEP = 360 / CARD_COUNT;
const RADIUS     = 380;
const CARD_W     = 290;
const CARD_H     = 280;

export default function AISection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);

  // Drag / rotation state — all in a single ref to avoid re-renders
  const drag = useRef({
    active:      false,
    lastX:       0,
    rotY:        0,
    velocity:    0,
    lastDragAt:  0,
  });

  // ── rAF rotation loop ───────────────────────────────────────
  useEffect(() => {
    const AUTO_SPEED     = 0.18;   // deg/frame auto-rotate
    const RESUME_DELAY   = 1800;   // ms after drag to resume auto-rotate
    const FRICTION       = 0.94;   // momentum decay

    let raf: number;

    function tick() {
      const d   = drag.current;
      const now = Date.now();

      if (!d.active) {
        const idle = now - d.lastDragAt;
        if (idle > RESUME_DELAY) {
          // Auto-rotate
          d.rotY    -= AUTO_SPEED;
          d.velocity = 0;
        } else {
          // Coast with momentum after drag
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

  // ── Scroll-reveal ───────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.ai-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.1}s both`;
          });
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Drag helpers ────────────────────────────────────────────
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
    drag.current.active    = false;
    drag.current.lastDragAt = Date.now();
    if (carouselRef.current) carouselRef.current.style.cursor = 'grab';
  };

  return (
    <section id="ai" className="section-wrapper relative overflow-hidden" ref={sectionRef}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(168,85,247,0.06) 0%, transparent 60%), radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Heading */}
        <div className="text-center mb-16 ai-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-accent-light mb-3 block">
            Intelligent Systems
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            AI &amp; <span className="gradient-text">Automation</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#a855f7,#6366f1)' }} />
          <p className="text-[#eee] mt-4 max-w-xl mx-auto">
            AI put inside operations that already run. Document extraction, support automation,
            anomaly detection on live data.
          </p>
        </div>

        {/* ── Desktop: draggable cylinder carousel ── */}
        <div
          ref={carouselRef}
          className="hidden lg:flex items-center justify-center mb-20 ai-reveal"
          style={{
            opacity: 0,
            height: '620px',
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
            {ALL_AI_CARDS.map((item, ci) => (
              <div
                key={item.tool}
                style={{
                  position: 'absolute',
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  transform: `rotateY(${ci * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                  background: 'rgba(20,10,30,0.88)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${item.color}35`,
                  borderRadius: '16px',
                  padding: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `0 0 30px ${item.color}15, inset 0 1px 0 ${item.color}20`,
                }}
              >
                {'catchAll' in item ? (
                  <div className="flex flex-col items-center justify-center text-center flex-1 gap-3">
                    <RocketLaunchIcon style={{ fontSize: '2.6rem', color: item.color }} />
                    <h4 className="font-bold text-white text-sm">AI-First Development</h4>
                    <p className="text-[#eee] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ) : (
                  <>
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-3 self-start"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}40`, color: item.color }}
                    >
                      <SmartToyIcon style={{ fontSize: '0.78rem' }} />
                      {item.tool}
                    </div>
                    <p className="text-[#eee] text-sm leading-relaxed mb-3 flex-1">{item.desc}</p>
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-xs text-slate-600">Used in:</span>
                      {item.projects.map((p) => (
                        <span
                          key={p}
                          className="px-1.5 py-0.5 rounded text-xs font-medium"
                          style={{ background: `${item.color}10`, border: `1px solid ${item.color}28`, color: item.color }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile / tablet: regular grid ── */}
        <div className="grid sm:grid-cols-2 lg:hidden gap-5 mb-14">
          {ALL_AI_CARDS.map((item) => (
            <div
              key={item.tool}
              className="glass-accent p-5 rounded-2xl"
              style={{ borderColor: `${item.color}25` }}
            >
              {'catchAll' in item ? (
                <div className="flex flex-col items-center text-center gap-3 py-2">
                  <RocketLaunchIcon style={{ fontSize: '2rem', color: item.color }} />
                  <h4 className="font-bold text-white text-sm">AI-First Development</h4>
                  <p className="text-[#eee] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ) : (
                <>
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}35`, color: item.color }}
                  >
                    <SmartToyIcon style={{ fontSize: '0.8rem' }} />
                    {item.tool}
                  </div>
                  <p className="text-[#eee] text-sm leading-relaxed mb-3">{item.desc}</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-xs text-slate-600">Used in:</span>
                    {item.projects.map((p) => (
                      <span
                        key={p}
                        className="px-1.5 py-0.5 rounded text-xs font-medium"
                        style={{ background: `${item.color}10`, border: `1px solid ${item.color}25`, color: item.color }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Tools marquee */}
        <div className="ai-reveal" style={{ opacity: 0 }}>
          <h3 className="text-center text-slate-500 text-xs uppercase tracking-widest mb-6 font-medium">
            Integrations &amp; APIs
          </h3>
          <div className="marquee-outer">
            <div className="marquee-track marquee-track--left" style={{ gap: '12px' }}>
              {[...AI_TOOLS_EXTRA, ...AI_TOOLS_EXTRA].map((tool, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: `${tool.color}10`, border: `1px solid ${tool.color}30`, color: tool.color }}
                >
                  {tool.icon}
                  {tool.name}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
