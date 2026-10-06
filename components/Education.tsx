'use client';
import { useEffect, useRef } from 'react';
import { education, certifications } from '../lib/data';
import SchoolIcon        from '@mui/icons-material/School';
import MilitaryTechIcon  from '@mui/icons-material/MilitaryTech';
import MenuBookIcon      from '@mui/icons-material/MenuBook';
import HubIcon           from '@mui/icons-material/Hub';
import BoltIcon          from '@mui/icons-material/Bolt';
import PaletteIcon       from '@mui/icons-material/Palette';

// One MUI icon per certification (matches order in data.ts)
const CERT_ICONS = [
  <HubIcon     key="hub"     style={{ fontSize: '1.25rem' }} />,
  <BoltIcon    key="bolt"    style={{ fontSize: '1.25rem' }} />,
  <PaletteIcon key="palette" style={{ fontSize: '1.25rem' }} />,
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.edu-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.12}s both`;
          });
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="section-wrapper" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16 edu-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-primary-light mb-3 block">
            Background
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Education &amp; <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Degrees */}
          <div className="space-y-6 edu-reveal" style={{ opacity: 0 }}>
            {education.map((edu) => (
            <div
              key={edu.university}
              className="glass p-8 skill-card"
              style={{ borderColor: 'rgba(99,102,241,0.25)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(99,102,241,0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.25)';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#818cf8' }}
                >
                  <SchoolIcon style={{ fontSize: '1.5rem' }} />
                </div>
                <h3 className="text-sm font-bold text-primary-light uppercase tracking-wide">Academic Degree</h3>
              </div>

              <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
              <a
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light hover:text-white transition-colors text-sm font-medium"
              >
                {edu.university} ↗
              </a>
              <p className="text-slate-500 text-sm mt-0.5">{edu.location}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}
                >
                  {edu.period}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}
                >
                  {edu.field}
                </span>
              </div>
            </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4 edu-reveal" style={{ opacity: 0 }}>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <MilitaryTechIcon style={{ fontSize: '1.4rem', color: '#fbbf24' }} />
              Certifications
            </h3>
            {certifications.map((cert, i) => (
              <div
                key={cert.name}
                className="glass p-5 flex items-center gap-4 skill-card"
                style={{ borderColor: `${cert.color}25` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}55`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${cert.color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}25`;
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}30`, color: cert.color }}
                >
                  {CERT_ICONS[i]}
                </div>
                <p className="text-sm font-semibold text-white">{cert.name}</p>
              </div>
            ))}

            {/* Continuous learning */}
            <div
              className="glass p-5 mt-4"
              style={{ borderColor: 'rgba(168,85,247,0.2)', background: 'rgba(168,85,247,0.04)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MenuBookIcon style={{ fontSize: '1.2rem', color: '#c084fc' }} />
                <span className="text-sm font-bold text-accent-light">Continuous Learning</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Keeping up with the latest in AI/LLMs, zero-knowledge proofs, Layer 2 scaling
                solutions, and modern React patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
