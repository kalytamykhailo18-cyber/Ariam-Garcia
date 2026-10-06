'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { projects } from '../lib/data';

const FILTERS = [
  { label: 'All',        value: 'all'      },
  { label: 'AI',         value: 'ai'       },
  { label: 'SaaS',       value: 'saas'     },
  { label: 'Blockchain', value: 'blockchain'},
  { label: 'Full-Stack', value: 'fullstack'},
  { label: 'Trading',    value: 'trading'  },
];

export default function Projects() {
  const [active, setActive] = useState('all');
  const ref = useRef<HTMLDivElement>(null);

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.category.includes(active));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.proj-reveal').forEach((el, i) => {
            (el as HTMLElement).style.animation = `fadeInUp 0.5s ease-out ${i * 0.08}s both`;
          });
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section-wrapper grid-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12 proj-reveal" style={{ opacity: 0 }}>
          <span className="text-xs font-bold tracking-widest uppercase text-primary-light mb-3 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Every one of these started as a business losing time or money somewhere specific.
            The technology was the answer, not the point.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 proj-reveal" style={{ opacity: 0 }}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                active === f.value
                  ? {
                      background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#94a3b8',
                    }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glass project-card overflow-hidden group cursor-pointer"
      style={{ animationDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (project.link && project.link !== '#') window.open(project.link, '_blank'); }}
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-dark-2">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.tech.slice(0, 3).join(', ')} project screenshot by Ariam Garcia Balmaseda`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        {/* Overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            background: 'rgba(3,7,18,0.85)',
            opacity: hovered ? 1 : 0,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div className="text-center px-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-2"
              style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', color: 'white' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Visit Live
            </div>
          </div>
        </div>

        {/* Tags overlay */}
        <div className="absolute top-3 right-3 flex gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(3,7,18,0.85)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="px-2 py-0.5 rounded text-xs font-medium text-slate-500">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.link && project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary-light text-sm font-medium hover:gap-2.5 transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live
          </a>
          )}
          {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 text-sm font-medium hover:text-white transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
            </svg>
            Source Code
          </a>
          )}
        </div>
      </div>
    </div>
  );
}
