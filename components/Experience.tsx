'use client';
import { useEffect, useRef } from 'react';
import { experiences } from '../lib/data';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.exp-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${i * 0.15}s both`;
          });
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section-wrapper" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16 exp-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-accent-light mb-3 block">
            Career
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, #6366f1, #a855f7, transparent)' }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-0 exp-reveal`}
                style={{ opacity: 0 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-6 z-10">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-dark"
                    style={{
                      background: exp.color,
                      boxShadow: `0 0 0 4px ${exp.color}25, 0 0 15px ${exp.color}60`,
                    }}
                  />
                </div>

                {/* Date — left on desktop */}
                <div className={`hidden md:flex md:w-1/2 ${i % 2 === 0 ? 'justify-end pr-12' : 'md:order-3 pl-12'}`}>
                  <div className="text-right">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}40`, color: exp.color }}
                    >
                      {exp.period}
                    </div>
                    <p className="text-slate-500 text-sm mt-1">{exp.location}</p>
                  </div>
                </div>

                {/* Card — right on desktop (or left for odd items) */}
                <div
                  className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12 md:order-3' : 'md:pr-12 md:text-right'}`}
                >
                  <div
                    className="glass p-6"
                    style={{ borderColor: `${exp.color}30` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}70`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${exp.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}30`;
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    {/* Mobile date */}
                    <div className="md:hidden mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}40`, color: exp.color }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 mb-3 flex-wrap">
                      <div>
                        <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium hover:underline"
                              style={{ color: exp.color }}
                            >
                              {exp.company} ↗
                            </a>
                          ) : (
                            <span className="text-sm font-medium" style={{ color: exp.color }}>
                              {exp.company}
                            </span>
                          )}
                          {exp.current && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <ul className={`space-y-2 ${i % 2 === 1 ? 'md:text-left' : ''}`}>
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
