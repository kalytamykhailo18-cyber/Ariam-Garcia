'use client';
import { useEffect, useRef } from 'react';
import { skillCategories } from '../lib/data';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SettingsIcon        from '@mui/icons-material/Settings';
import HubIcon             from '@mui/icons-material/Hub';
import SmartToyIcon        from '@mui/icons-material/SmartToy';
import StorageIcon         from '@mui/icons-material/Storage';
import CloudIcon           from '@mui/icons-material/Cloud';
import PaymentIcon         from '@mui/icons-material/Payment';
import LockIcon            from '@mui/icons-material/Lock';

const IC = { fontSize: '1.2rem' };

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Frontend':          <DesktopWindowsIcon style={IC} />,
  'Backend':           <SettingsIcon       style={IC} />,
  'Blockchain':        <HubIcon            style={IC} />,
  'AI & Automation':   <SmartToyIcon       style={IC} />,
  'Databases':         <StorageIcon        style={IC} />,
  'DevOps & Cloud':    <CloudIcon          style={IC} />,
  'Payment Systems':   <PaymentIcon        style={IC} />,
  'Security':          <LockIcon           style={IC} />,
};

// ── same overlap formula as ForAuthorsSection ──────────────────
const N       = skillCategories.length; // 8
const OVERLAP = 120;
const TOTAL_OVERLAP = OVERLAP * (N - 1);

// ── Marquee data ────────────────────────────────────────────────
const ALL_SKILLS = skillCategories.flatMap((cat) =>
  cat.skills.map((skill) => ({ skill, color: cat.color, bg: cat.bg, border: cat.border }))
);
const ALL_SKILLS_REV = [...ALL_SKILLS].reverse();

function MarqueeRow({
  direction,
  skills,
}: {
  direction: 'left' | 'right';
  skills: { skill: string; color: string; bg: string; border: string }[];
}) {
  // Duplicate for seamless infinite loop
  const doubled = [...skills, ...skills];
  return (
    <div className="marquee-outer">
      <div className={`marquee-track marquee-track--${direction}`}>
        {doubled.map((item, idx) => (
          <span
            key={idx}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{
              background: item.bg,
              border: `1px solid ${item.border}`,
              color: item.color,
            }}
          >
            {item.skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.5s ease-out ${i * 0.07}s both`;
          });
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-wrapper grid-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Heading ── */}
        <div className="text-center mb-16 skill-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-secondary mb-3 block">
            Technologies
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Tech <span className="gradient-text-cyan">Arsenal</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#06b6d4,#6366f1)' }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            The tools behind the work. What matters to a client is that none of it locks
            them into a platform they cannot leave.
          </p>
        </div>

        {/* ── Desktop: 3D fanned overlapping cards ── */}
        <div className="hidden lg:flex items-stretch justify-center mb-14 skill-reveal" style={{ opacity: 0 }}>
          {skillCategories.map((cat, i) => (
            <div
              key={cat.name}
              className="relative flex-shrink-0 flex flex-col p-5 rounded-2xl"
              style={{
                width: `calc((100% + ${TOTAL_OVERLAP}px) / ${N})`,
                marginLeft: i === 0 ? 0 : -OVERLAP,
                zIndex: i + 1,
                /* default: angled like ForAuthorsSection */
                transform: 'perspective(700px) rotateY(45deg)',
                transformOrigin: 'center center',
                transition: 'transform 0.4s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.35s ease, background 0.3s ease, border-color 0.3s ease',
                background: 'rgba(10,12,28,0.82)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: `1px solid ${cat.border}`,
                boxShadow: '-8px 0 28px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.zIndex = '50';
                el.style.transform = 'perspective(700px) rotateY(0deg) scale(1.18) translateY(-10px)';
                el.style.boxShadow = `0 40px 80px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.4), 0 0 40px ${cat.color}30`;
                el.style.background = 'rgba(15,23,42,0.98)';
                el.style.borderColor = `${cat.color}80`;
                const line = el.querySelector<HTMLDivElement>('.accent-line');
                if (line) line.style.width = '100%';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.zIndex = String(i + 1);
                el.style.transform = 'perspective(700px) rotateY(45deg) scale(1)';
                el.style.boxShadow = '-8px 0 28px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)';
                el.style.background = 'rgba(10,12,28,0.82)';
                el.style.borderColor = cat.border;
                const line = el.querySelector<HTMLDivElement>('.accent-line');
                if (line) line.style.width = '0%';
              }}
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}
              >
                {CATEGORY_ICONS[cat.name]}
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm text-white mb-3" style={{ color: cat.color }}>
                {cat.name}
              </h3>

              {/* Skills */}
              <ul className="space-y-1.5 flex-1">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-slate-300 text-xs">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: cat.color }}
                    />
                    {skill}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line — grows on hover (JS-controlled via .accent-line) */}
              <div
                className="accent-line mt-4 h-0.5 rounded-sm"
                style={{
                  background: `linear-gradient(90deg, ${cat.color}, transparent)`,
                  transition: 'width 0.35s ease',
                  width: '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Mobile / tablet: regular grid ── */}
        <div className="grid sm:grid-cols-2 lg:hidden gap-5 mb-14">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.name}
              className="glass p-6 rounded-2xl skill-card skill-reveal cursor-default"
              style={{
                opacity: 0,
                animationDelay: `${i * 0.07}s`,
                borderColor: cat.border,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = cat.color + '80';
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${cat.color}18`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = cat.border;
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}
                >
                  {CATEGORY_ICONS[cat.name]}
                </div>
                <h3 className="font-bold text-sm" style={{ color: cat.color }}>
                  {cat.name}
                </h3>
              </div>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── All-skills marquee (2 rows, bi-directional) ── */}
        <div className="skill-reveal" style={{ opacity: 0 }}>
          <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-6 font-medium">
            All technologies at a glance
          </p>

          <MarqueeRow direction="left"  skills={ALL_SKILLS} />
          <div className="mt-3">
            <MarqueeRow direction="right" skills={ALL_SKILLS_REV} />
          </div>
        </div>

      </div>
    </section>
  );
}
