'use client';
import { useEffect, useRef, useState } from 'react';
import { languages } from '../lib/data';
import TranslateIcon from '@mui/icons-material/Translate';

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => setWidth(pct), 300);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}, ${color}99)`, boxShadow: `0 0 8px ${color}50` }}
      />
    </div>
  );
}

export default function Languages() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.lang-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.15}s both`;
          });
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="languages" className="py-20" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12 lang-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-secondary mb-3 block">
            Communication
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text-cyan">Languages</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#06b6d4,#6366f1)' }} />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {languages.map((lang, i) => {
            const color = i === 0 ? '#818cf8' : '#34d399';
            return (
              <div
                key={lang.name}
                className="glass p-6 skill-card lang-reveal"
                style={{ opacity: 0, borderColor: `${color}25` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}55`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${color}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}25`;
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {/* Language code badge replaces flag emoji */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}
                  >
                    {lang.code}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{lang.name}</h3>
                    <p className="text-sm" style={{ color }}>{lang.level}</p>
                  </div>
                  <div className="flex items-center gap-1" style={{ color }}>
                    <TranslateIcon style={{ fontSize: '1rem' }} />
                    <span className="text-lg font-black">{lang.pct}%</span>
                  </div>
                </div>
                <ProgressBar pct={lang.pct} color={color} />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-slate-600">Beginner</span>
                  <span className="text-xs text-slate-600">Native</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
