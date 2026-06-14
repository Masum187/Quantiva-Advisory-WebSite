'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationProps {
  lang: 'de' | 'en';
  items: NavigationItem[];
}

function logoMark() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-md border border-white/18 bg-white text-black">
      <svg viewBox="0 0 100 100" className="h-6 w-6" aria-hidden="true">
        <polygon
          points="50,8 85,25 85,75 50,92 15,75 15,25"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M35 37h30v26H35zM50 8v29M85 25 65 37M85 75 65 63M50 92V63M15 75l20-12M15 25l20 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function normalizeHref(href: string, lang: 'de' | 'en') {
  if (href.startsWith('#')) return `/${lang}${href}`;
  if (href.startsWith('/de') || href.startsWith('/en')) {
    return href.replace(/^\/(de|en)/, `/${lang}`);
  }
  if (href.startsWith('/')) return `/${lang}${href}`;
  return href;
}

export default function Navigation({ lang, items }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const searchLabel = lang === 'de' ? 'Suche' : 'Search';
  const searchHref = `/${lang}/search`;

  const derivedItems = useMemo(() => {
    const base = items.some((item) => item.id === 'search')
      ? items
      : [...items, { id: 'search', label: searchLabel, href: searchHref }];

    return base.map((item) => ({
      ...item,
      href: normalizeHref(item.href, lang),
    }));
  }, [items, lang, searchHref, searchLabel]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const switchLang = () => {
    const currentPath = pathname;
    const newLang = lang === 'de' ? 'en' : 'de';
    const pathSegments = currentPath.split('/');

    if (pathSegments[1] === lang) {
      pathSegments[1] = newLang;
    } else {
      pathSegments.splice(1, 0, newLang);
    }

    window.location.href = pathSegments.join('/');
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-lg border border-white/10 bg-[#111]/92 px-4 py-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <Link href={`/${lang}`} className="flex items-center gap-3" aria-label="Quantiva Advisory">
          {logoMark()}
          <span className="text-base font-semibold md:text-lg">Quantiva Advisory</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {derivedItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? 'bg-white text-black'
                    : 'text-white/72 hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={switchLang}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-[#d9ff80] hover:text-[#d9ff80]"
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
          <Link
            href={`/${lang}#contact`}
            className="group inline-flex items-center gap-2 rounded-full bg-[#d9ff80] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white"
          >
            {lang === 'de' ? 'Kontakt' : 'Contact'}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white lg:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-x-3 top-[76px] z-50 rounded-lg border border-white/12 bg-[#111] p-4 text-white shadow-2xl lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile primary">
            {derivedItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between border-b border-white/10 py-4 text-xl font-semibold"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">
                  {String(index + 1).padStart(2, '0')} / {String(derivedItems.length).padStart(2, '0')}
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={switchLang}
              className="flex-1 rounded-full border border-white/20 px-4 py-3 text-sm"
            >
              {lang === 'de' ? 'English' : 'Deutsch'}
            </button>
            <Link
              href={`/${lang}#contact`}
              className="flex-1 rounded-full bg-[#d9ff80] px-4 py-3 text-center text-sm font-semibold text-black"
            >
              {lang === 'de' ? 'Kontakt' : 'Contact'}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
