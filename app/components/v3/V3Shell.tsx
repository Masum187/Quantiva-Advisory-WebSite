'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import {
  otherV3Locale,
  V3_MORE_NAV,
  V3_NAV,
  v3Path,
  type V3Locale,
} from '../../lib/data/v3-content';

type V3ShellProps = {
  children: ReactNode;
  locale: V3Locale;
};

export default function V3Shell({ children, locale }: V3ShellProps) {
  const pathname = usePathname() ?? v3Path(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(false);
  const nav = V3_NAV[locale];
  const mobileNav = [...nav, ...V3_MORE_NAV[locale]];
  const isHome = pathname === v3Path(locale) || pathname === `${v3Path(locale)}/`;
  const alternateLocale = otherV3Locale(locale);
  const localeSuffix = pathname.startsWith(`/v3/${locale}`)
    ? pathname.slice(`/v3/${locale}`.length)
    : '';
  const alternatePath = v3Path(alternateLocale, localeSuffix);

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = locale;

    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [locale]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const main = document.getElementById('v3-main');
    const dialog = dialogRef.current;
    const opener = openerRef.current;

    const closeMenu = () => {
      restoreFocusRef.current = true;
      setMenuOpen(false);
    };

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) {
        event.preventDefault();
        return;
      }

      if (!dialog?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    main?.setAttribute('inert', '');
    window.addEventListener('keydown', trapFocus);
    dialog?.querySelector<HTMLElement>('button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute('inert');
      window.removeEventListener('keydown', trapFocus);

      if (restoreFocusRef.current) {
        restoreFocusRef.current = false;
        opener?.focus();
      }
    };
  }, [menuOpen]);

  return (
    <div className={`v3-reskin${isHome ? ' v3-home-shell' : ''}`}>
      <a className="v3-skip-link" href="#v3-main">
        {locale === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}
      </a>

      <header className="v3-header">
        <div className="v3-nav-frame">
          <Link className="v3-wordmark" href={v3Path(locale)} prefetch={false}>
            <span className="v3-mark" aria-hidden="true">Q</span>
            <span className="v3-wordmark-label">Quantiva Advisory</span>
          </Link>

          <nav className="v3-desktop-nav" aria-label={locale === 'de' ? 'Hauptnavigation' : 'Primary navigation'}>
            {nav.slice(1, -1).map((item) => (
              <Link key={item.href} href={v3Path(locale, item.href)} prefetch={false}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="v3-nav-actions">
            <Link className="v3-locale-link" href={alternatePath} prefetch={false}>
              {alternateLocale.toUpperCase()}
            </Link>
            <Link className="v3-nav-cta" href={v3Path(locale, '/contact')} prefetch={false}>
              {locale === 'de' ? 'Kontakt' : 'Contact'}
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <button
              ref={openerRef}
              className="v3-menu-trigger"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="v3-mobile-menu"
              aria-label={locale === 'de' ? 'Menü öffnen' : 'Open menu'}
              onClick={() => setMenuOpen(true)}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          ref={dialogRef}
          id="v3-mobile-menu"
          className="v3-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'de' ? 'Mobiles Hauptmenü' : 'Mobile navigation'}
        >
          <div className="v3-mobile-top">
            <span className="v3-wordmark">
              <span className="v3-mark" aria-hidden="true">Q</span>
              <span className="v3-wordmark-label">Quantiva Advisory</span>
            </span>
            <button
              className="v3-menu-close"
              type="button"
              aria-label={locale === 'de' ? 'Menü schließen' : 'Close menu'}
              onClick={() => {
                restoreFocusRef.current = true;
                setMenuOpen(false);
              }}
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label={locale === 'de' ? 'Mobile Navigation' : 'Mobile navigation'}>
            {mobileNav.map((item, index) => (
              <Link key={item.href || 'home'} href={v3Path(locale, item.href)} prefetch={false}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="v3-mobile-locale" href={alternatePath} prefetch={false}>
            {alternateLocale === 'de' ? 'Deutsch' : 'English'}
          </Link>
        </div>
      ) : null}

      <main id="v3-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
