'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import {
  FORGE_NAV,
  FORGE_NAV_MORE,
  ForgeLocale,
  forgePath,
  otherLocale,
} from '../../lib/data/forge-content';
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from '../../lib/motion';

type Props = {
  locale: ForgeLocale;
  children: React.ReactNode;
};

export default function ForgeShell({ locale, children }: Props) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = FORGE_NAV[locale];
  const more = FORGE_NAV_MORE[locale];
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const restoreMenuFocusRef = useRef(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const nextScrolled = latest > 80;
    setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
  });

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.classList.add('forge-reskin');
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.classList.remove('forge-reskin');
      document.documentElement.lang = previousLanguage;
    };
  }, [locale]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const main = document.getElementById('forge-main');
    const footer = document.querySelector<HTMLElement>('.forge-reskin > footer');
    const menuButton = mobileMenuButtonRef.current;
    const containMenuFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        restoreMenuFocusRef.current = true;
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute('inert'));
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      const activeElement = document.activeElement;
      if (!mobileMenuRef.current?.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    window.addEventListener('keydown', containMenuFocus);
    mobileMenuRef.current?.querySelector<HTMLAnchorElement>('nav a')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      window.removeEventListener('keydown', containMenuFocus);
      if (restoreMenuFocusRef.current) {
        restoreMenuFocusRef.current = false;
        menuButton?.focus();
      }
    };
  }, [open]);

  const switchHref = pathname.replace(`/v2/${locale}`, `/v2/${otherLocale(locale)}`);
  const year = new Date().getFullYear();

  return (
    <div className="forge-reskin min-h-svh">
      <a
        href="#forge-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-[var(--forge-signal)] focus:px-4 focus:py-2 focus:text-[var(--forge-signal-ink)]"
      >
        {locale === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}
      </a>

      <header
        className="forge-header fixed inset-x-0 top-0 z-50"
        data-scrolled={scrolled ? 'true' : 'false'}
      >
        <div
          className={`forge-container relative z-20 flex items-center justify-between gap-6 ${
            scrolled ? 'h-16' : 'h-[4.5rem]'
          }`}
        >
          <Link
            href={forgePath(locale)}
            prefetch={false}
            className="flex min-h-11 items-center gap-2.5"
          >
            <span className="forge-display text-[1.85rem] leading-none tracking-[-0.04em]">
              Quantiva
            </span>
            <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--forge-faint)] sm:inline">
              Advisory
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const href = forgePath(locale, item.href);
              const active =
                item.href === ''
                  ? pathname === forgePath(locale) || pathname === `${forgePath(locale)}/`
                  : pathname.startsWith(href);
              return (
                <Link
                  key={item.href || 'home'}
                  href={href}
                  prefetch={false}
                  className="forge-nav-link"
                  data-active={active ? 'true' : 'false'}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={switchHref.startsWith('/v2/') ? switchHref : forgePath(otherLocale(locale))}
              prefetch={false}
              className="hidden min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--forge-line)] px-3 text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--forge-muted)] transition hover:border-[var(--forge-line-strong)] hover:text-[var(--forge-ink)] sm:inline-flex"
            >
              {otherLocale(locale).toUpperCase()}
            </Link>
            <Link
              href={forgePath(locale, '/contact')}
              prefetch={false}
              className="forge-cta hidden md:inline-flex"
            >
              {locale === 'de' ? 'Gespräch' : 'Talk'}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--forge-line)] bg-[rgba(14,16,19,0.72)] text-[var(--forge-ink)] backdrop-blur-md lg:hidden"
              aria-expanded={open}
              aria-controls="forge-mobile-menu"
              aria-label={
                open
                  ? locale === 'de'
                    ? 'Menü schließen'
                    : 'Close menu'
                  : locale === 'de'
                    ? 'Menü öffnen'
                    : 'Open menu'
              }
              onClick={() => {
                if (open) {
                  restoreMenuFocusRef.current = true;
                }
                setOpen((current) => !current);
              }}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open ? (
            <motion.div
              ref={mobileMenuRef}
              id="forge-mobile-menu"
              key="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={locale === 'de' ? 'Hauptmenü' : 'Main menu'}
              initial={reduceMotion ? false : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: MOTION_DURATION.base }}
              className="fixed inset-0 z-10 overflow-y-auto bg-[rgba(8,9,11,0.97)] backdrop-blur-2xl lg:hidden"
            >
              <div className="forge-grid-bg pointer-events-none absolute inset-0 opacity-50" />
              <div className="forge-container relative flex min-h-full flex-col pb-8 pt-28">
                <motion.nav
                  aria-label={locale === 'de' ? 'Mobiles Hauptmenü' : 'Mobile navigation'}
                  initial={reduceMotion ? false : 'hidden'}
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: MOTION_STAGGER.children,
                      },
                    },
                  }}
                  className="flex flex-col"
                >
                  {[...nav, ...more].map((item) => (
                    <motion.div
                      key={`m-${item.href || 'home'}`}
                      variants={{
                        hidden: { opacity: 1, y: 18 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: MOTION_DURATION.reveal,
                            ease: MOTION_EASE_OUT,
                          },
                        },
                      }}
                    >
                      <Link
                        href={forgePath(locale, item.href)}
                        prefetch={false}
                        className="flex min-h-14 items-center border-b border-[var(--forge-line)] text-[clamp(1.75rem,8vw,3rem)] font-medium tracking-[-0.04em] text-[var(--forge-ink)]"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={forgePath(locale, '/contact')}
                    prefetch={false}
                    className="forge-cta justify-center"
                  >
                    {locale === 'de' ? 'Erstgespräch vereinbaren' : 'Book an intro call'}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={
                      switchHref.startsWith('/v2/')
                        ? switchHref
                        : forgePath(otherLocale(locale))
                    }
                    prefetch={false}
                    className="flex min-h-11 items-center justify-center text-sm text-[var(--forge-muted)]"
                  >
                    {otherLocale(locale) === 'de' ? 'Deutsch' : 'English'}
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
      </header>

      <main id="forge-main" tabIndex={-1}>
        {children}
      </main>

      <footer className="border-t border-[var(--forge-line)]">
        <div className="forge-container grid gap-12 py-16 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="forge-display text-[2.5rem]">Quantiva</p>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-[var(--forge-muted)]">
              {locale === 'de'
                ? 'Beratung für S/4HANA-Transformation, Testmanagement und kontrollierte Cutover-Steuerung.'
                : 'Advisory for S/4HANA transformation, test management, and controlled cutover delivery.'}
            </p>
            <a
              href="mailto:info@quantivaadvisory.com"
              className="mt-6 inline-flex min-h-11 items-center text-sm text-[var(--forge-ink)] underline-offset-4 hover:underline"
            >
              info@quantivaadvisory.com
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="forge-meta mb-4">
                {locale === 'de' ? 'Navigation' : 'Navigate'}
              </p>
              <div className="flex flex-col gap-2.5 text-sm text-[var(--forge-muted)]">
                {nav.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    href={forgePath(locale, item.href)}
                    prefetch={false}
                    className="flex min-h-11 items-center hover:text-[var(--forge-ink)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="forge-meta mb-4">
                {locale === 'de' ? 'Unternehmen' : 'Company'}
              </p>
              <div className="flex flex-col gap-2.5 text-sm text-[var(--forge-muted)]">
                {more.map((item) => (
                  <Link
                    key={item.href}
                    href={forgePath(locale, item.href)}
                    prefetch={false}
                    className="flex min-h-11 items-center hover:text-[var(--forge-ink)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="forge-meta mb-4">
                {locale === 'de' ? 'Sprache' : 'Language'}
              </p>
              <Link
                href={switchHref.startsWith('/v2/') ? switchHref : forgePath(otherLocale(locale))}
                prefetch={false}
                className="flex min-h-11 items-center text-sm text-[var(--forge-muted)] hover:text-[var(--forge-ink)]"
              >
                {otherLocale(locale) === 'de' ? 'Deutsch' : 'English'}
              </Link>
            </div>
          </div>
        </div>
        <div className="forge-container flex flex-col gap-2 border-t border-[var(--forge-line)] py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--forge-faint)]">
            © {year} Quantiva Advisory. {locale === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
          <p className="forge-meta">S/4HANA · SIT/UAT · Cutover</p>
        </div>
      </footer>
    </div>
  );
}
