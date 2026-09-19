'use client';

/**
 * SiteNav — die einheitliche Site-Navigation im Stil der Startseite
 * (Cinematic Brand-Film Design): Mono-Wortmarke, Uppercase-Links,
 * Outline-Kontakt-Pill. Wird überall verwendet.
 *
 * Varianten:
 *  - "overlay": fixed, transparent, wird beim Scrollen opak (Startseite)
 *  - "solid":   sticky, immer dunkel mit Blur (Unterseiten)
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { switchLocalePath } from '../lib/seo';

const ACCENT = '#2dd4bf';

type Lang = 'de' | 'en';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface SiteNavProps {
  lang: Lang;
  variant?: 'overlay' | 'solid';
}

const NAV_COPY: Record<Lang, { items: NavItem[]; cta: string; langLabel: string }> = {
  de: {
    items: [
      { id: 'about', label: 'Über uns', href: '/de/about' },
      { id: 'services', label: 'Services', href: '/de#services' },
      { id: 'cases', label: 'Projekte', href: '/de/cases' },
      { id: 'team', label: 'Team', href: '/de/team' },
      { id: 'career', label: 'Karriere', href: '/de/career' },
    ],
    cta: 'Kontakt',
    langLabel: 'EN',
  },
  en: {
    items: [
      { id: 'about', label: 'About us', href: '/en/about' },
      { id: 'services', label: 'Services', href: '/en#services' },
      { id: 'cases', label: 'Projects', href: '/en/cases' },
      { id: 'team', label: 'Team', href: '/en/team' },
      { id: 'career', label: 'Careers', href: '/en/career' },
    ],
    cta: 'Contact',
    langLabel: 'DE',
  },
};

export default function SiteNav({ lang, variant = 'solid' }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const copy = NAV_COPY[lang];

  useEffect(() => {
    if (variant !== 'overlay') return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  // Menü bei Routenwechsel schließen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const switchLangHref = switchLocalePath(pathname || `/${lang}`, lang === 'de' ? 'en' : 'de');

  const isDark =
    variant === 'solid' || scrolled || open;

  return (
    <header
      className={`${variant === 'overlay' ? 'fixed' : 'sticky'} inset-x-0 top-0 z-40 transition-all duration-500 ${
        isDark
          ? 'border-b border-white/10 bg-[#04060b]/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href={`/${lang}`}
          className="font-mono text-sm uppercase tracking-[0.3em] text-white"
        >
          Quantiva<span style={{ color: ACCENT }}>·</span>Advisory
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-7 md:flex">
          {copy.items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`text-[0.8rem] uppercase tracking-[0.18em] transition ${
                  active ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                style={active ? { color: ACCENT } : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={switchLangHref}
            className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 transition hover:text-white"
          >
            {copy.langLabel}
          </Link>
          <Link
            href={`/${lang}#contact`}
            className="group relative overflow-hidden rounded-full border px-6 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-black"
            style={{ borderColor: `${ACCENT}66` }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
              style={{ background: ACCENT }}
            />
            <span className="relative">{copy.cta}</span>
          </Link>
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#04060b]/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {copy.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm uppercase tracking-[0.15em] text-gray-200 transition hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-4">
              <Link
                href={switchLangHref}
                className="flex-1 rounded-full border border-white/15 px-3 py-2 text-center font-mono text-xs uppercase tracking-widest text-gray-300"
              >
                {copy.langLabel}
              </Link>
              <Link
                href={`/${lang}#contact`}
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-black"
                style={{ background: ACCENT }}
              >
                {copy.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
