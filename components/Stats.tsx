'use client';
import { useEffect, useRef, useState } from 'react';
import { stats } from '../lib/data';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiEventsIcon  from '@mui/icons-material/EmojiEvents';
import HubIcon          from '@mui/icons-material/Hub';
import LanguageIcon     from '@mui/icons-material/Language';

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.ceil(target / 50);
          const interval = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(current);
            if (current >= target) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

const STAT_STYLES = [
  { gradient: 'linear-gradient(135deg,#6366f1,#818cf8)', glow: 'rgba(99,102,241,0.3)',  icon: <RocketLaunchIcon style={{ fontSize: '2rem', color: '#818cf8' }} /> },
  { gradient: 'linear-gradient(135deg,#a855f7,#c084fc)', glow: 'rgba(168,85,247,0.3)',  icon: <EmojiEventsIcon  style={{ fontSize: '2rem', color: '#c084fc' }} /> },
  { gradient: 'linear-gradient(135deg,#10b981,#34d399)', glow: 'rgba(16,185,129,0.3)',  icon: <HubIcon          style={{ fontSize: '2rem', color: '#34d399' }} /> },
  { gradient: 'linear-gradient(135deg,#06b6d4,#22d3ee)', glow: 'rgba(6,182,212,0.3)',   icon: <LanguageIcon     style={{ fontSize: '2rem', color: '#22d3ee' }} /> },
];

export default function Stats() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(99,102,241,0.04), rgba(168,85,247,0.04), rgba(6,182,212,0.04))' }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const s = STAT_STYLES[i];
            return (
              <div
                key={stat.label}
                className="glass p-6 text-center skill-card cursor-default"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${s.glow}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div
                  className="text-4xl md:text-5xl font-black mb-2"
                  style={{ background: s.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
