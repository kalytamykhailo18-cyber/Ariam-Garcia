'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { personalInfo } from '../lib/data';

type Locale = 'en' | 'es' | 'pt';

// One consistent nav across all 103 pages. Every destination is a real
// indexable page, so this doubles as site-wide internal linking.
const NAV = {
  en: [
    { href: '/hire',     label: 'Hire' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Work' },
    { href: '/blog',     label: 'Blog' },
    { href: '/about',    label: 'About' },
    { href: '/faq',      label: 'FAQ' },
  ],
  es: [
    { href: '/hire',     label: 'Contratar' },
    { href: '/services', label: 'Servicios' },
    { href: '/projects', label: 'Trabajos' },
    { href: '/blog',     label: 'Blog' },
    { href: '/about',    label: 'Sobre mí' },
    { href: '/faq',      label: 'FAQ' },
  ],
  pt: [
    { href: '/hire',     label: 'Contratar' },
    { href: '/services', label: 'Serviços' },
    { href: '/projects', label: 'Trabalhos' },
    { href: '/blog',     label: 'Blog' },
    { href: '/about',    label: 'Sobre' },
    { href: '/faq',      label: 'FAQ' },
  ],
} as const;

const CTA = { en: 'Contact', es: 'Contactar', pt: 'Contato' } as const;
const MENU_LABEL = { en: 'Menu', es: 'Menú', pt: 'Menu' } as const;

const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: 'en', label: 'English',    short: 'EN' },
  { code: 'es', label: 'Español',    short: 'ES' },
  { code: 'pt', label: 'Português',  short: 'PT' },
];

function detectLocale(path: string): Locale {
  if (path === '/es' || path.startsWith('/es/')) return 'es';
  if (path === '/pt' || path.startsWith('/pt/')) return 'pt';
  return 'en';
}

// Map the current page to its equivalent in another language where one exists,
// otherwise fall back to that language's home.
function localizedHref(path: string, target: Locale): string {
  const current = detectLocale(path);
  const bare = current === 'en' ? path : path.replace(/^\/(es|pt)/, '') || '/';

  if (target === 'en') return bare;
  if (bare === '/') return `/${target}`;
  // Only service pages have real ES/PT counterparts; everything else falls back
  // to that language's home rather than 404-ing on a path that does not exist.
  if (bare.startsWith('/services/')) return `/${target}${bare}`;
  return `/${target}`;
}

export default function Navbar() {
  const router = useRouter();
  const path = router.asPath.split('#')[0].split('?')[0];
  const locale = detectLocale(path);
  const links = NAV[locale];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    const close = () => { setMenuOpen(false); setLangOpen(false); };
    router.events.on('routeChangeComplete', close);
    return () => router.events.off('routeChangeComplete', close);
  }, [router.events]);

  // Escape closes, and lock body scroll while the drawer is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setLangOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = useCallback(
    (href: string) => path === href || path.startsWith(href + '/'),
    [path],
  );

  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const contactHref = locale === 'en' ? '/contact' : `${homeHref}#${locale === 'es' ? 'contacto' : 'contato'}`;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? 'rgba(3,7,18,0.92)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(99,102,241,0.15)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link href={homeHref} className="flex items-center gap-2 shrink-0 group" aria-label={personalInfo.name}>
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
            >
              {personalInfo.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
            </div>
            <span className="hidden sm:block font-semibold text-white text-sm whitespace-nowrap">
              {personalInfo.name.split(' ')[0]}{' '}
              <span className="gradient-text">{personalInfo.name.split(' ')[1]}</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 block"
                    style={{
                      color: active ? '#fff' : '#cbd5e1',
                      background: active ? 'rgba(99,102,241,0.14)' : 'transparent',
                    }}
                  >
                    {l.label}
                    {active && (
                      <span
                        className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg,#6366f1,#a855f7)' }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Language switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
                aria-label="Change language"
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 010 20a15 15 0 010-20" />
                </svg>
                {LOCALES.find((l) => l.code === locale)?.short}
              </button>

              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} aria-hidden="true" />
                  <ul
                    role="menu"
                    className="absolute right-0 mt-2 py-1 rounded-xl overflow-hidden z-20 min-w-[9rem]"
                    style={{
                      background: 'rgba(15,23,42,0.98)',
                      border: '1px solid rgba(99,102,241,0.25)',
                      backdropFilter: 'blur(14px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    }}
                  >
                    {LOCALES.map((l) => (
                      <li key={l.code} role="none">
                        <Link
                          role="menuitem"
                          href={localizedHref(path, l.code)}
                          onClick={() => setLangOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-sm transition-colors"
                          style={{ color: l.code === locale ? '#818cf8' : '#cbd5e1' }}
                        >
                          {l.label}
                          {l.code === locale && <span className="text-xs">✓</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* CTA */}
            <Link
              href={contactHref}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
            >
              {CTA[locale]}
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors shrink-0"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={MENU_LABEL[locale]}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className="block w-5 h-0.5 bg-slate-200 transition-all duration-300"
                style={menuOpen ? { transform: 'rotate(45deg) translate(4px,4px)' } : {}}
              />
              <span
                className="block w-5 h-0.5 bg-slate-200 transition-all duration-300"
                style={menuOpen ? { opacity: 0 } : {}}
              />
              <span
                className="block w-5 h-0.5 bg-slate-200 transition-all duration-300"
                style={menuOpen ? { transform: 'rotate(-45deg) translate(4px,-4px)' } : {}}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      <div
        className="lg:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: 'rgba(3,7,18,0.6)',
          backdropFilter: 'blur(2px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer — scrollable, never clips */}
      <div
        id="mobile-menu"
        className="lg:hidden fixed top-16 left-0 right-0 z-40 transition-all duration-300 origin-top overflow-y-auto"
        style={{
          maxHeight: menuOpen ? 'calc(100vh - 4rem)' : '0',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          background: 'rgba(3,7,18,0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: menuOpen ? '1px solid rgba(99,102,241,0.2)' : 'none',
        }}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-1">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors"
                style={{
                  color: active ? '#fff' : '#cbd5e1',
                  background: active ? 'rgba(99,102,241,0.14)' : 'transparent',
                }}
              >
                {l.label}
                <span className="text-slate-600">›</span>
              </Link>
            );
          })}

          <Link
            href={contactHref}
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center px-4 py-3 rounded-lg text-base font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)' }}
          >
            {CTA[locale]}
          </Link>

          {/* Language row */}
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(148,163,184,0.12)' }}>
            <p className="px-4 text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Language</p>
            <div className="flex gap-2 px-4 pb-2">
              {LOCALES.map((l) => (
                <Link
                  key={l.code}
                  href={localizedHref(path, l.code)}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: l.code === locale ? '#fff' : '#94a3b8',
                    background: l.code === locale ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${l.code === locale ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  {l.short}
                </Link>
              ))}
            </div>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 mb-2 mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300"
            style={{ border: '1px solid rgba(148,163,184,0.2)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
