import Link from 'next/link';
import { personalInfo } from '../lib/data';
import { services } from '../lib/services';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Home-page sections. Absolute hrefs so they resolve from any page.
const SECTION_LINKS = [
  { hash: '#disciplines',  label: 'Disciplines' },
  { hash: '#about',        label: 'About'       },
  { hash: '#skills',       label: 'Skills'      },
  { hash: '#experience',   label: 'Experience'  },
  { hash: '#projects',     label: 'Projects'    },
  { hash: '#blockchain',   label: 'Blockchain'  },
  { hash: '#ai',           label: 'AI'          },
  { hash: '#testimonials', label: 'Clients'     },
];

const PAGE_LINKS = [
  { href: '/hire',     label: 'Hire me'      },
  { href: '/services', label: 'All services' },
  { href: '/projects', label: 'Portfolio'    },
  { href: '/blog',     label: 'Blog'         },
  { href: '/about',    label: 'About'        },
  { href: '/uses',     label: 'Uses'         },
  { href: '/contact',  label: 'Contact'      },
  { href: '/faq',      label: 'FAQ'          },
];

const LANG_LINKS = [
  { href: '/',    label: 'English'    },
  { href: '/es',  label: 'Español'    },
  { href: '/pt',  label: 'Português'  },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Hrefs are always absolute ("/#about") so they work from any of the 103 pages.
  // Smooth-scroll is only intercepted when we are already on the home page.
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (typeof window === 'undefined' || window.location.pathname !== '/') return;
    e.preventDefault();
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-8" style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(99,102,241,0.03), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Top row */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
              >
                {personalInfo.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
              </div>
              <span className="font-bold text-white text-lg">{personalInfo.name}</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Custom software for service businesses.<br />
              Booking, operations automation, AI. Built from {personalInfo.location}.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Pages</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {PAGE_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-slate-400 hover:text-white transition-colors py-0.5"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-6 mb-3">On this page</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {SECTION_LINKS.map((l) => (
                <a
                  key={l.hash}
                  href={`/${l.hash}`}
                  onClick={(e) => scrollTo(e, l.hash)}
                  className="text-sm text-slate-400 hover:text-white transition-colors py-0.5"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-6 mb-3">Language</h4>
            <div className="flex gap-2">
              {LANG_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Services</h4>
            <div className="space-y-1.5">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="block text-sm text-slate-400 hover:text-white transition-colors py-0.5 leading-snug"
                >
                  {s.title.split(' — ')[0].split(' & ')[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact quick */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Contact</h4>
            <div className="space-y-2">
              <a href={`mailto:${personalInfo.email}`} className="block text-sm text-slate-400 hover:text-white transition-colors">
                {personalInfo.email}
              </a>
              <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-400 hover:text-white transition-colors">
                {personalInfo.phone}
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-primary-light hover:text-white transition-colors">
                GitHub ↗
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all duration-200"
                style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                View Resume
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-700 text-xs flex items-center gap-1">
              Made with{' '}
              <FavoriteIcon style={{ fontSize: '0.875rem', color: '#ef4444', verticalAlign: 'middle' }} />{' '}
              in {personalInfo.location.split(',')[0]}
            </span>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.25)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.1)'; }}
              aria-label="Back to top"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
