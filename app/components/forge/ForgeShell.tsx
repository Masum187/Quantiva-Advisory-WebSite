'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import {
  FORGE_NAV,
  ForgeLocale,
  forgePath,
  otherLocale,
} from '../../lib/data/forge-content';

type Props = {
  locale: ForgeLocale;
  children: React.ReactNode;
};

export default function ForgeShell({ locale, children }: Props) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = FORGE_NAV[locale];

  useEffect(() => {
    document.documentElement.classList.add('forge-reskin');
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.documentElement.classList.remove('forge-reskin');
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const switchHref = pathname.replace(`/v2/${locale}`, `/v2/${otherLocale(locale)}`);

  return (
    <div className="forge-reskin min-h-svh">
      <a
        href="#forge-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-[var(--forge-signal)] focus:px-4 focus:py-2 focus:text-[var(--forge-signal-ink)]"
      >
        {locale === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-[var(--forge-line)] bg-[rgba(10,10,10,0.88)] backdrop-blur-md' : ''
        }`}
      >
        <div className="forge-container flex h-[4.25rem] items-center justify-between gap-4">
          <Link href={forgePath(locale)} className="group flex items-baseline gap-2">
            <span className="forge-display text-[1.65rem] text-[var(--forge-ink)]">Quantiva</span>
            <span className="forge-meta hidden sm:inline">Advisory</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const href = forgePath(locale, item.href);
              const active =
                item.href === ''
                  ? pathname === forgePath(locale) || pathname === forgePath(locale, '/')
                  : pathname.startsWith(href);
              return (
                <Link
                  key={item.href || 'home'}
                  href={href}
                  className={`text-sm transition ${
                    active ? 'text-[var(--forge-ink)]' : 'text-[var(--forge-muted)] hover:text-[var(--forge-ink)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={switchHref.startsWith('/v2/') ? switchHref : forgePath(otherLocale(locale))}
              className="forge-meta hover:text-[var(--forge-ink)]"
            >
              {otherLocale(locale).toUpperCase()}
            </Link>
            <Link href={forgePath(locale, '/contact')} className="forge-cta hidden sm:inline-flex">
              {locale === 'de' ? 'Kontakt' : 'Contact'}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--forge-line)] lg:hidden"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-[var(--forge-line)] bg-[var(--forge-bg)] lg:hidden">
            <div className="forge-container flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href || 'home-m'}
                  href={forgePath(locale, item.href)}
                  className="rounded-lg px-3 py-3 text-base text-[var(--forge-ink)] hover:bg-[var(--forge-bg-soft)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main id="forge-main" tabIndex={-1}>
        {children}
      </main>

      <footer className="border-t border-[var(--forge-line)]">
        <div className="forge-container flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="forge-display text-3xl">Quantiva</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--forge-muted)]">
              {locale === 'de'
                ? 'SAP · Cloud · KI für den Mittelstand. Parallel zur Valmax-Site unter /de.'
                : 'SAP · Cloud · AI for mid-market. Parallel to the Valmax site at /en.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-[var(--forge-muted)]">
            <Link href={forgePath(locale, '/services')} className="hover:text-[var(--forge-ink)]">
              Services
            </Link>
            <Link href={forgePath(locale, '/cases')} className="hover:text-[var(--forge-ink)]">
              {locale === 'de' ? 'Projekte' : 'Cases'}
            </Link>
            <Link href={forgePath(locale, '/contact')} className="hover:text-[var(--forge-ink)]">
              Kontakt
            </Link>
            <Link
              href={`/${locale}`}
              className="text-[var(--forge-signal)] hover:opacity-80"
            >
              {locale === 'de' ? '← Valmax-Version' : '← Valmax version'}
            </Link>
          </div>
        </div>
        <div className="forge-container border-t border-[var(--forge-line)] py-5">
          <p className="forge-meta">
            © {new Date().getFullYear()} Quantiva Advisory · Forge variant /v2 · 45PX GRID
          </p>
        </div>
      </footer>
    </div>
  );
}
