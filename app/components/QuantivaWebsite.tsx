'use client';

import React, {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Briefcase,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Mail,
  Menu,
  Minus,
  Phone,
  Plus,
  Shield,
  X,
} from 'lucide-react';
import ContactForm from './ContactForm';
import casesData from '../lib/data/cases.json';
import postsData from '../lib/data/posts.json';
import { industriesDe, industriesEn } from '../lib/data/industries';
import { analytics } from '../lib/utils/analytics';
import {
  useAbout,
  useContactContent,
  useFooterContent,
  useHero,
  useMeetingContent,
  useNavigationContent,
  useServices,
} from '../lib/contexts/ContentContext';

const ORIGIN =
  (typeof window !== 'undefined' && window.location.origin) ||
  'https://quantivaadvisory.com';
const VALID_LOCALES = ['de', 'en'] as const;
const SERVICE_SLUGS = ['sap', 'cloud', 'ai', 'microservices', 'cyber-security', 'new-work'];
const VM_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const VM_SECTION_PAD = 'px-4 py-20 md:px-8 lg:py-32';

type Locale = (typeof VALID_LOCALES)[number];

type LangCtx = {
  lang: Locale;
  setLang: (l: Locale, opts?: { navigate?: boolean }) => void;
  localePath: (p: string) => string;
};

const LanguageContext = createContext<LangCtx | null>(null);

function firstSeg(pathname: string) {
  return (
    (pathname || '/')
      .split('?')[0]
      .split('#')[0]
      .split('/')
      .filter(Boolean)[0] || ''
  );
}

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'de';
  const seg = firstSeg(window.location.pathname);
  if (VALID_LOCALES.includes(seg as Locale)) return seg as Locale;
  const saved = localStorage.getItem('qlang');
  if (saved && VALID_LOCALES.includes(saved as Locale)) return saved as Locale;
  return (navigator.language || '').toLowerCase().startsWith('de') ? 'de' : 'en';
}

function replaceLocaleInPath(pathname: string, next: Locale): string {
  const parts = pathname.split('/');
  if (parts.length > 1 && VALID_LOCALES.includes((parts[1] || '') as Locale)) {
    parts[1] = next;
  } else {
    parts.splice(1, 0, next);
  }
  return parts.join('/') || `/${next}`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setInternalLang] = useState<Locale>(detectLocale());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seg = firstSeg(window.location.pathname);
    if (!VALID_LOCALES.includes(seg as Locale)) {
      const target = replaceLocaleInPath(window.location.pathname, lang);
      window.history.replaceState(
        {},
        '',
        target + window.location.search + window.location.hash,
      );
    }
  }, [lang]);

  const setLang: LangCtx['setLang'] = useCallback((next, opts) => {
    setInternalLang((current) => {
      if (current !== next) analytics.trackLanguageSwitch(current, next);
      return next;
    });

    try {
      localStorage.setItem('qlang', next);
    } catch {}

    if (opts?.navigate !== false && typeof window !== 'undefined') {
      const nextPath = replaceLocaleInPath(window.location.pathname, next);
      window.location.assign(nextPath + window.location.search + window.location.hash);
    }
  }, []);

  const localePath: LangCtx['localePath'] = useCallback(
    (path) => {
      const normalized = path.startsWith('/') ? path : `/${path}`;
      if (normalized === `/${lang}` || normalized.startsWith(`/${lang}/`)) {
        return normalized;
      }
      if (normalized.startsWith('/de/') || normalized.startsWith('/en/')) {
        return normalized.replace(/^\/(de|en)/, `/${lang}`);
      }
      return `/${lang}${normalized}`;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, localePath }),
    [lang, setLang, localePath],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LangCtx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

function absUrl(path = '/') {
  return `${ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

function resolveHref(href: string, lang: Locale) {
  if (href.startsWith('#')) return `/${lang}${href}`;
  if (href.startsWith('/de') || href.startsWith('/en')) {
    return href.replace(/^\/(de|en)/, `/${lang}`);
  }
  if (href.startsWith('/')) return `/${lang}${href}`;
  return href;
}

function useHeaderScrollState() {
  const [state, setState] = useState({ hidden: false, scrolled: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let lastY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const directionDown = currentY > lastY + 6;
        setState({
          hidden: currentY > 110 && directionDown,
          scrolled: currentY > 16,
        });
        lastY = currentY;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return state;
}

function Counter({ index, total }: { index: number; total: number }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.14em] text-current/60">
      {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  );
}

function SectionKicker({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.14em] ${
        dark ? 'text-white/55' : 'text-black/55'
      }`}
    >
      {children}
    </p>
  );
}

function Preloader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === 'undefined') return;

    const alreadyShown = sessionStorage.getItem('qa-preloader-shown') === '1';
    if (alreadyShown) return;

    sessionStorage.setItem('qa-preloader-shown', '1');
    setVisible(true);
    setProgress(0);

    let value = 0;
    const interval = window.setInterval(() => {
      value = Math.min(100, value + Math.ceil((100 - value) * 0.18));
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => setVisible(false), 260);
      }
    }, 42);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: VM_EASE } }}
          className="fixed inset-0 z-[1000000] grid bg-[#111] text-white"
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between px-4 py-5 md:px-8 md:py-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
              loading...
            </span>
            <div>
              <div className="mb-5 flex items-end justify-between gap-6">
                <span className="text-[clamp(3rem,12vw,11rem)] font-semibold leading-none">
                  {String(progress).padStart(2, '0')}
                  <span className="text-[0.35em] text-[#d9ff80]">%</span>
                </span>
                <span className="hidden max-w-xs text-right text-sm uppercase leading-relaxed tracking-[0.12em] text-white/45 sm:block">
                  Quantiva Advisory
                </span>
              </div>
              <div className="h-px overflow-hidden bg-white/15">
                <motion.div
                  className="h-full bg-[#d9ff80]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.18, ease: VM_EASE }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HomeHeader() {
  const { lang, setLang } = useLanguage();
  const nav = useNavigationContent(lang);
  const services = useServices(lang);
  const industries = lang === 'de' ? industriesDe : industriesEn;
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<'services' | 'industries' | null>(null);
  const [openGroup, setOpenGroup] = useState<'services' | 'industries' | null>(null);
  const { hidden, scrolled } = useHeaderScrollState();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const rawLinks = nav.items.map((item) => ({
    ...item,
    href: resolveHref(item.href, lang),
  }));
  const serviceLinks = services.items.slice(0, 6).map((service: any, index: number) => ({
    label: service.title,
    href: resolveHref(`/services/${SERVICE_SLUGS[index]}`, lang),
    description: service.description,
  }));
  const industryLinks = industries.map((industry) => ({
    label: industry.title,
    href: resolveHref(`/industries/${industry.slug}`, lang),
    description: industry.description,
  }));
  const primaryLinks = [
    { id: 'services', label: lang === 'de' ? 'Capabilities' : 'Capabilities', href: `/${lang}#services`, menu: 'services' as const },
    { id: 'industries', label: lang === 'de' ? 'Branchen' : 'Industries', href: `/${lang}#industries`, menu: 'industries' as const },
    { id: 'cases', label: lang === 'de' ? 'Projekte' : 'Projects', href: resolveHref('/cases', lang) },
    { id: 'insights', label: lang === 'de' ? 'Insights' : 'Insights', href: resolveHref('/content', lang) },
  ];
  const utilityLinks = rawLinks.filter((link) => !['home', 'services', 'cases', 'contact'].includes(link.id));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9999] px-3 pt-2 transition-transform duration-500 ${
        hidden && !open ? '-translate-y-[120%]' : 'translate-y-0'
      }`}
      onMouseLeave={() => setMega(null)}
    >
      <div
        className={`mx-auto max-w-[1440px] overflow-hidden rounded-[10px] border px-4 text-white backdrop-blur-xl transition ${
          scrolled || open || mega
            ? 'border-white/12 bg-[#111]/96 shadow-[0_18px_70px_rgba(0,0,0,0.28)]'
            : 'border-black/8 bg-[#111]/90'
        }`}
      >
        <div className="flex min-h-[58px] items-center justify-between gap-5">
          <Link
            href={`/${lang}`}
            className="group flex items-center gap-3"
            aria-label="Quantiva Advisory"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-10 w-10 place-items-center rounded-[6px] bg-white text-black transition group-hover:bg-[#d9ff80]">
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
            <span className="hidden text-base font-semibold uppercase tracking-[0.02em] sm:block">
              Quantiva
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-[6px] px-4 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-white/76 transition hover:bg-white/8 hover:text-white"
                onMouseEnter={() => setMega(('menu' in item ? item.menu : null) ?? null)}
                onFocus={() => setMega(('menu' in item ? item.menu : null) ?? null)}
                onClick={() => analytics.trackNavigationClick(item.id, item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="rounded-[6px] border border-white/14 px-4 py-3 text-sm font-semibold uppercase text-white transition hover:border-[#d9ff80] hover:text-[#d9ff80]"
            >
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <Link
              href={`/${lang}#contact`}
              className="group inline-flex items-center gap-3 rounded-[6px] bg-[#d9ff80] px-5 py-3 text-sm font-semibold uppercase text-black transition hover:bg-white"
            >
              {lang === 'de' ? 'Kontakt' : 'Contact'}
              <ArrowRight className="h-4 w-4 transition group-hover:-rotate-45" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="relative grid h-11 w-11 place-items-center rounded-[6px] border border-white/18 text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mega ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: VM_EASE }}
              className="hidden overflow-hidden border-t border-white/8 lg:block"
            >
              <div className="grid gap-8 py-6 lg:grid-cols-[0.35fr_1fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/42">
                    {mega === 'services'
                      ? lang === 'de'
                        ? 'Capabilities'
                        : 'Capabilities'
                      : lang === 'de'
                        ? 'Branchen'
                        : 'Industries'}
                  </p>
                  <p className="mt-4 max-w-xs text-2xl font-semibold leading-tight text-white">
                    {mega === 'services'
                      ? lang === 'de'
                        ? 'Beratung, Plattformen und Delivery als ein System.'
                        : 'Advisory, platforms and delivery as one system.'
                      : lang === 'de'
                        ? 'Sektorlogik mit technischer Umsetzung verbinden.'
                        : 'Connecting sector logic with technical execution.'}
                  </p>
                </div>
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {(mega === 'services' ? serviceLinks : industryLinks).map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group rounded-[6px] bg-[#191919] p-4 transition hover:bg-[#252525]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-base font-semibold leading-tight text-white/92">
                          {item.label}
                        </span>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[5px] bg-[#d9ff80] text-black opacity-0 transition group-hover:opacity-100">
                          <ArrowRight className="h-4 w-4 -rotate-45" />
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/48">
                        {item.description}
                      </p>
                      <Counter index={index + 1} total={mega === 'services' ? serviceLinks.length : industryLinks.length} />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: VM_EASE }}
            className="fixed inset-x-3 top-[76px] z-[9998] max-h-[calc(100svh-86px)] overflow-hidden rounded-[10px] border border-white/10 bg-[#111] text-white shadow-2xl lg:hidden"
          >
            <div className="max-h-[calc(100svh-205px)] overflow-y-auto p-4">
              <nav className="grid" aria-label="Mobile primary">
                {[
                  { id: 'services' as const, label: lang === 'de' ? 'Capabilities' : 'Capabilities', items: serviceLinks },
                  { id: 'industries' as const, label: lang === 'de' ? 'Branchen' : 'Industries', items: industryLinks },
                ].map((group) => {
                  const isOpen = openGroup === group.id;
                  return (
                    <div key={group.id} className="border-t border-white/6">
                      <button
                        type="button"
                        onClick={() => setOpenGroup(isOpen ? null : group.id)}
                        className="flex w-full items-center justify-between gap-5 py-5 text-left text-[2rem] font-semibold uppercase leading-none"
                        aria-expanded={isOpen}
                      >
                        {group.label}
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[6px] bg-[#d9ff80] text-black">
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </button>
                      {isOpen ? (
                        <div className="grid gap-2 pb-4">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="rounded-[6px] bg-[#191919] px-4 py-4 text-lg font-semibold text-white/82"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {[...primaryLinks.filter((item) => !('menu' in item)), ...utilityLinks].map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-t border-white/6 py-5 text-[2rem] font-semibold uppercase leading-none"
                  >
                    <span>{item.label}</span>
                    <Counter index={index + 1} total={primaryLinks.length + utilityLinks.length} />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="grid gap-3 border-t border-white/8 p-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                className="rounded-[6px] border border-white/16 px-4 py-4 text-sm font-semibold uppercase"
              >
                {lang === 'de' ? 'English' : 'Deutsch'}
              </button>
              <Link
                href={`/${lang}#contact`}
                onClick={() => setOpen(false)}
                className="rounded-[6px] bg-[#d9ff80] px-4 py-4 text-center text-sm font-semibold uppercase text-black"
              >
                {lang === 'de' ? 'Kontakt' : 'Contact'}
              </Link>
            </div>

            <div className="overflow-hidden border-t border-white/8 py-4 text-[clamp(2.5rem,16vw,7rem)] font-semibold uppercase leading-none text-white/8">
              <motion.div
                className="flex w-max gap-10"
                animate={reduceMotion ? { x: '0%' } : { x: ['0%', '-50%'] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                {[...Array(2)].map((_, loop) => (
                  <span key={loop}>Quantiva / SAP / Cloud / AI / Security /</span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function HeroFrameSequence({ services }: { services: any[] }) {
  const reduceMotion = useReducedMotion();
  const frames = services.slice(0, 5);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion || frames.length < 2) return;
    const interval = window.setInterval(() => {
      setActive((value) => (value + 1) % frames.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [frames.length, reduceMotion]);

  return (
    <div className="relative mx-auto aspect-[302/454] h-[min(52svh,32rem)] min-h-[21rem] max-h-[34rem] w-auto">
      <div className="absolute -inset-4 rounded-[18px] border border-black/8" />
      <div className="absolute inset-0 rounded-[15px] bg-[#111]" />
      {frames.map((service, index) => {
        const isActive = index === active;
        return (
          <motion.figure
            key={service.id}
            className="absolute inset-0 overflow-hidden rounded-[14px]"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.96,
              y: isActive ? 0 : 18,
            }}
            transition={{ duration: 0.65, ease: VM_EASE }}
          >
            {service.image ? (
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 68vw, 25vw"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/20 to-black/10" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
              <Counter index={index + 1} total={frames.length} />
              <p className="mt-3 text-2xl font-semibold leading-none">{service.title}</p>
            </figcaption>
          </motion.figure>
        );
      })}
      <div className="absolute -left-8 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
        {frames.map((service, index) => (
          <button
            key={service.id}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === active ? 'scale-125 bg-[#5241d4]' : 'bg-black/18 hover:bg-black/45'
            }`}
            aria-label={`Show ${service.title}`}
          />
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const { lang, localePath } = useLanguage();
  const hero = useHero(lang);
  const services = useServices(lang);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-svh overflow-hidden bg-[#f7f6ff] pt-[92px] text-black"
    >
      <div className="absolute inset-x-0 top-0 h-[18rem] bg-white" />
      <div className="relative mx-auto grid min-h-[calc(100svh-92px)] max-w-[1440px] gap-10 px-4 pb-12 pt-10 md:px-8 lg:grid-cols-[1.05fr_0.55fr_0.78fr] lg:items-center lg:pb-16 lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: VM_EASE }}
          className="max-w-4xl"
        >
          <SectionKicker>{hero.subtitle}</SectionKicker>
          <h1 className="mt-6 text-[clamp(3.7rem,9vw,7.25rem)] font-semibold leading-[0.92] tracking-normal">
            {hero.title}
          </h1>
          {hero.highlight ? (
            <p className="mt-6 max-w-xl text-[clamp(1.4rem,2vw,2rem)] font-semibold leading-tight text-[#5241d4]">
              {hero.highlight}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: VM_EASE }}
          className="order-last lg:order-none"
        >
          <HeroFrameSequence services={services.items} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: VM_EASE }}
          className="self-end lg:pb-12"
        >
          <p className="max-w-[31rem] text-lg leading-[1.45] text-black/70">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localePath('/#contact')}
              className="group inline-flex items-center gap-3 rounded-[10px] bg-[#111] px-5 py-4 text-sm font-semibold uppercase text-white transition hover:bg-[#d9ff80] hover:text-black"
            >
              {hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition group-hover:-rotate-45" />
            </Link>
            <Link
              href={localePath('/cases')}
              className="group inline-flex items-center gap-3 rounded-[10px] border border-black/14 px-5 py-4 text-sm font-semibold uppercase text-black transition hover:bg-[#5241d4] hover:text-white"
            >
              {hero.ctaSecondary}
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById('social-proof')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-black/16 p-3 text-black/60 transition hover:border-black hover:text-black md:grid"
        aria-label={lang === 'de' ? 'Weiter scrollen' : 'Scroll down'}
      >
        <ChevronDown className="h-5 w-5" />
      </button>

      <div className="relative overflow-hidden border-y border-black/8 bg-white py-4">
        <motion.div
          className="flex w-max gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-black/45"
          animate={reduceMotion ? { x: '0%' } : { x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, loop) => (
            <span key={loop} className="flex gap-8">
              <span>SAP Transformation</span>
              <span>Cloud Operating Model</span>
              <span>AI & Data Products</span>
              <span>Security & Compliance</span>
              <span>Mid-Market Delivery</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProofSection() {
  const { lang, localePath } = useLanguage();
  const proofItems =
    lang === 'de'
      ? [
          ['SAP', 'Core Modernisierung'],
          ['Cloud', 'Operating Models'],
          ['AI', 'Produktive Use Cases'],
          ['ISO', 'Compliance-ready Delivery'],
          ['BTP', 'Integration & Platforms'],
          ['Data', 'Analytics & Automation'],
        ]
      : [
          ['SAP', 'Core modernization'],
          ['Cloud', 'Operating models'],
          ['AI', 'Production use cases'],
          ['ISO', 'Compliance-ready delivery'],
          ['BTP', 'Integration & platforms'],
          ['Data', 'Analytics & automation'],
        ];

  return (
    <section id="social-proof" className="relative overflow-hidden bg-[#d9ff80] text-black">
      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[#5241d4]" />
      <div className="relative mx-auto min-h-svh max-w-[1440px] px-4 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <SectionKicker>{lang === 'de' ? 'Proof ohne Logo-Wall' : 'Proof without a logo wall'}</SectionKicker>
          <h2 className="mt-6 text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-none">
            {lang === 'de'
              ? 'Vertrauen entsteht, wenn Strategie, Technologie und Umsetzung dieselbe Sprache sprechen.'
              : 'Trust compounds when strategy, technology and delivery speak the same language.'}
          </h2>
          <Link
            href={localePath('/cases')}
            className="mt-8 inline-flex items-center gap-3 rounded-[10px] bg-[#111] px-5 py-4 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black"
          >
            {lang === 'de' ? 'Projekte ansehen' : 'View projects'}
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </Link>
        </div>

        <div className="relative mt-12 min-h-[28rem] md:mt-20">
          {proofItems.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.07, duration: 0.55, ease: VM_EASE }}
              className={`absolute grid aspect-square place-items-center rounded-full bg-white text-center shadow-[0_24px_70px_rgba(0,0,0,0.12)] ${
                [
                  'left-[4%] top-[12%] w-36 md:w-44',
                  'right-[6%] top-[2%] w-32 md:w-40',
                  'left-[30%] top-[38%] w-40 md:w-56',
                  'right-[24%] top-[52%] w-32 md:w-44',
                  'left-[8%] bottom-[0%] w-28 md:w-36',
                  'right-[4%] bottom-[6%] w-36 md:w-52',
                ][index]
              }`}
            >
              <div className="px-4">
                <p className="text-[clamp(1.7rem,4vw,3rem)] font-semibold leading-none text-[#5241d4]">
                  {value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase leading-tight tracking-[0.08em] text-black/55">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandManifestSection() {
  const { lang } = useLanguage();
  const services = useServices(lang);
  const media = services.items[2]?.image || services.items[0]?.image;

  return (
    <section className="relative min-h-svh overflow-hidden bg-[#111] text-white">
      {media ? (
        <Image
          src={media}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-42"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/58" />
      <div className="relative mx-auto flex min-h-svh max-w-[1440px] items-center justify-center px-4 py-20 text-center md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.75, ease: VM_EASE }}
          className="max-w-5xl text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[1.02]"
        >
          {lang === 'de'
            ? 'Wir formen digitale Systeme, die entscheiden, lernen und im Betrieb standhalten.'
            : 'We shape digital systems that decide, learn and hold up in production.'}
        </motion.h2>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const { lang, localePath } = useLanguage();
  const services = useServices(lang);
  const reduceMotion = useReducedMotion();
  const slides = services.items.slice(0, 6);
  const [active, setActive] = useState(0);
  const activeService = slides[active];

  useEffect(() => {
    if (reduceMotion || slides.length < 2) return;
    const interval = window.setInterval(() => {
      setActive((value) => (value + 1) % slides.length);
    }, 7200);
    return () => window.clearInterval(interval);
  }, [reduceMotion, slides.length]);

  const go = (direction: -1 | 1) => {
    setActive((value) => (value + direction + slides.length) % slides.length);
  };

  return (
    <section id="services" className="relative overflow-hidden bg-[#f7f6ff] text-black">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:min-h-svh lg:py-0">
        <div className="grid gap-0 lg:min-h-svh lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[24rem] overflow-hidden rounded-[14px] bg-[#111] lg:my-20 lg:min-h-0 lg:rounded-[14px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={activeService?.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: VM_EASE }}
                className="absolute inset-0"
              >
                {activeService?.image ? (
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/25" />
              </motion.figure>
            </AnimatePresence>
            <div className="absolute left-5 top-5 rounded-[8px] bg-white px-3 py-2">
              <Counter index={active + 1} total={slides.length} />
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[#f7f6ff] py-10 lg:px-12">
            <SectionKicker>{services.subtitle}</SectionKicker>
            <div className="mt-6 min-h-[14rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService?.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: VM_EASE }}
                >
                  <h2 className="max-w-[34rem] text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-none">
                    {activeService?.title || services.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-[1.45] text-black/70">
                    {activeService?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 grid gap-2">
              {slides.map((service: any, index: number) => (
                <Link
                key={service.id}
                href={localePath(`/services/${SERVICE_SLUGS[index]}`)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group relative flex min-h-[3.5rem] items-center justify-between overflow-hidden rounded-[6px] px-4 py-3 text-left transition ${
                  index === active ? 'bg-[#ebe9fa] text-[#111]' : 'bg-[#f0f7e0] text-black/72 hover:text-black'
                }`}
              >
                <span className="max-w-[75%] text-base font-semibold leading-tight">
                  {service.title}
                </span>
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-[6px] bg-[#111] text-[#d9ff80] transition group-hover:bg-[#d9ff80] group-hover:text-black">
                  <ArrowRight className="h-4 w-4 transition group-hover:-rotate-45" />
                </span>
                <figure className="pointer-events-none absolute right-[4.5rem] top-1/2 hidden h-[3.875rem] w-[3.875rem] -translate-y-1/2 overflow-hidden rounded-[6px] opacity-0 transition group-hover:opacity-100 md:block">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="62px"
                      className="object-cover"
                    />
                  ) : null}
                </figure>
              </Link>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid h-12 w-12 place-items-center rounded-[6px] border border-black/12 transition hover:bg-black hover:text-white"
                aria-label="Previous capability"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid h-12 w-12 place-items-center rounded-[6px] bg-[#111] text-white transition hover:bg-[#d9ff80] hover:text-black"
                aria-label="Next capability"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="ml-auto text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriesShowcase() {
  const { lang, localePath } = useLanguage();
  const industries = lang === 'de' ? industriesDe : industriesEn;
  const [active, setActive] = useState(0);
  const activeIndustry = industries[active] || industries[0];

  return (
    <section id="industries" className="relative overflow-hidden bg-[#111] text-white">
      <AnimatePresence mode="wait">
        <motion.figure
          key={activeIndustry.slug}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: VM_EASE }}
          className="absolute inset-0"
        >
          <Image
            src={activeIndustry.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/62" />
        </motion.figure>
      </AnimatePresence>

      <div className={`relative mx-auto grid min-h-svh max-w-[1440px] gap-10 ${VM_SECTION_PAD} lg:grid-cols-[0.82fr_1.18fr] lg:items-center`}>
        <div className="max-w-lg">
          <SectionKicker dark>{lang === 'de' ? 'Branchen' : 'Industries'}</SectionKicker>
          <h2 className="mt-5 text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-none">
            {lang === 'de' ? 'Branchen, die wir befähigen' : 'Industries we empower'}
          </h2>
          <p className="mt-7 text-lg leading-[1.45] text-white/70">
            {lang === 'de'
              ? 'Wir begleiten mittelständische Marktführer in regulierten und wachstumsstarken Branchen.'
              : 'We partner with mid-market leaders in regulated and fast-scaling industries.'}
          </p>
          <Link
            href={localePath(`/industries/${activeIndustry.slug}`)}
            className="mt-8 inline-flex items-center gap-3 rounded-[10px] bg-[#d9ff80] px-5 py-4 text-sm font-semibold uppercase text-black transition hover:bg-white"
          >
            {lang === 'de' ? 'Branche ansehen' : 'View industry'}
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </Link>
        </div>

        <div className="grid gap-1">
          {industries.map((industry, index) => {
            const isActive = index === active;
            return (
              <Link
                key={industry.slug}
                href={localePath(`/industries/${industry.slug}`)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group relative flex items-center justify-between gap-6 border-t border-white/10 py-4 transition last:border-b md:py-5 ${
                  isActive ? 'text-[#d9ff80]' : 'text-white/72 hover:text-white'
                }`}
              >
                <span className="text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-none">
                  {industry.title}
                </span>
                <span className={`hidden max-w-[14rem] text-sm leading-relaxed md:block ${
                  isActive ? 'text-[#d9ff80]/72' : 'text-white/42'
                }`}>
                  {industry.description}
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-[6px] bg-[#d9ff80] text-black transition ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </span>
                <span className="absolute -left-10 top-1/2 hidden -translate-y-1/2 lg:block">
                  <Counter index={index + 1} total={industries.length} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AtAGlanceSection() {
  const { lang, localePath } = useLanguage();
  const about = useAbout(lang);
  const stats = Object.values(about.stats);

  return (
    <section className="relative overflow-hidden bg-[#d9ff80] text-black">
      <div className="absolute inset-0 grid grid-cols-4 opacity-30 md:grid-cols-8">
        {Array.from({ length: 32 }).map((_, index) => (
          <span key={index} className="aspect-square rounded-full border border-[#5241d4]/25" />
        ))}
      </div>
      <div className={`relative mx-auto grid max-w-[1440px] gap-12 ${VM_SECTION_PAD} lg:grid-cols-[0.8fr_1.2fr] lg:items-center`}>
        <div>
          <SectionKicker>{lang === 'de' ? 'Quantiva at a glance' : 'Quantiva at a glance'}</SectionKicker>
          <h2 className="mt-5 max-w-3xl text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-none">
            {about.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.45] text-black/70">
            {about.text}
          </p>
          <Link
            href={localePath('/about')}
            className="mt-8 inline-flex items-center gap-3 rounded-[10px] bg-black px-5 py-4 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black"
          >
            {lang === 'de' ? 'Mehr über Quantiva' : 'More about Quantiva'}
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat: any, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: VM_EASE }}
              className={`flex min-h-[17rem] flex-col rounded-[10px] bg-[#5241d4] p-5 text-white ${
                index === 1 ? 'sm:mt-20' : index === 2 ? 'sm:mt-8' : ''
              }`}
            >
              <Counter index={index + 1} total={stats.length} />
              <p className="mt-auto text-[clamp(3.5rem,7vw,6.25rem)] font-semibold leading-none text-[#d9ff80]">
                {stat.value}
              </p>
              <p className="mt-4 max-w-[12rem] text-base leading-tight text-white/78">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { lang, localePath } = useLanguage();
  const reduceMotion = useReducedMotion();
  const testimonials = useMemo(
    () =>
      casesData
        .filter((item) => item.quote)
        .slice(0, 5)
        .map((item) => ({
          slug: item.slug,
          title: lang === 'de' ? item.titleDe : item.titleEn,
          quote: lang === 'de' ? item.quote?.textDe : item.quote?.textEn,
          author: item.quote?.author || (lang === 'de' ? 'Kunde' : 'Client'),
          image: item.heroImage,
        })),
    [lang],
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion || testimonials.length < 2) return;
    const interval = window.setInterval(() => {
      setActive((value) => (value + 1) % testimonials.length);
    }, 6800);
    return () => window.clearInterval(interval);
  }, [reduceMotion, testimonials.length]);

  if (!testimonials.length) return null;

  const current = testimonials[active] || testimonials[0];
  const move = (direction: -1 | 1) => {
    setActive((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section id="references" className="relative overflow-hidden bg-[#f7f6ff] text-black">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden text-[clamp(9rem,29vw,29rem)] font-semibold uppercase leading-none text-[#5241d4]/10">
        <motion.div
          className="flex w-max gap-12"
          animate={reduceMotion ? { x: '0%' } : { x: ['0%', '-50%'] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, loop) => (
            <span key={loop}>{current.title} / Quantiva / </span>
          ))}
        </motion.div>
      </div>

      <div className={`relative mx-auto max-w-[1440px] ${VM_SECTION_PAD}`}>
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionKicker>{lang === 'de' ? 'Kundenstimmen' : 'Client voices'}</SectionKicker>
            <h2 className="mt-5 max-w-2xl text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-none">
              {lang === 'de' ? 'Was unsere Partner sagen' : 'What our partners say'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              className="grid h-12 w-12 place-items-center rounded-[6px] border border-black/12 transition hover:bg-black hover:text-white"
              aria-label="Previous testimonial"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="grid h-12 w-12 place-items-center rounded-[6px] bg-black text-white transition hover:bg-[#d9ff80] hover:text-black"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Link
            href={localePath(`/cases/${current.slug}`)}
            className="group relative mx-auto grid aspect-square w-full max-w-[34rem] place-items-center overflow-hidden rounded-full bg-[#111] text-white"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.slug}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, ease: VM_EASE }}
                className="absolute inset-0"
              >
                {current.image ? (
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 34rem"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/28 to-transparent" />
              </motion.figure>
            </AnimatePresence>
            <span className="relative z-10 grid h-16 w-16 place-items-center rounded-[10px] bg-white text-black transition group-hover:bg-[#d9ff80]">
              <ArrowRight className="h-6 w-6 -rotate-45" />
            </span>
          </Link>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: VM_EASE }}
              >
                <Counter index={active + 1} total={testimonials.length} />
                <p className="mt-8 max-w-4xl text-[clamp(2rem,4.7vw,4.6rem)] font-semibold leading-[1.05]">
                  &quot;{current.quote}&quot;
                </p>
                <p className="mt-8 text-base font-semibold uppercase text-black">
                  {current.author}
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.08em] text-black/50">
                  {current.title}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`rounded-[6px] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                    index === active ? 'bg-[#5241d4] text-white' : 'bg-white text-black/50 hover:text-black'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <Link
              href={localePath('/cases')}
              className="mt-10 inline-flex items-center gap-3 rounded-[10px] border border-black/12 px-5 py-4 text-sm font-semibold uppercase transition hover:bg-black hover:text-white"
            >
              {lang === 'de' ? 'Referenzen ansehen' : 'View case studies'}
              <ArrowRight className="h-4 w-4 -rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightsSection() {
  const { lang, localePath } = useLanguage();
  const posts = (postsData as any[])
    .filter((post) => post.language === lang)
    .slice(0, 4);
  const [active, setActive] = useState(0);

  if (!posts.length) return null;
  const current = posts[active] || posts[0];

  return (
    <section id="insights" className="relative overflow-hidden bg-white text-black">
      <div className="bg-[#f7f6ff] px-4 py-20 text-center md:px-8 lg:py-28">
        <SectionKicker>{lang === 'de' ? 'Content Hub' : 'Content Hub'}</SectionKicker>
        <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-none">
          {lang === 'de'
            ? 'Impulse, Playbooks und Projekteinblicke'
            : 'Insights, playbooks and project takeaways'}
        </h2>
      </div>

      <div className="relative bg-[#5241d4] text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden py-8 text-center text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-none text-white/16">
          {lang === 'de'
            ? 'Impulse, Playbooks und Projekteinblicke'
            : 'Insights, playbooks and project takeaways'}
        </div>
        <div className={`relative mx-auto grid min-h-svh max-w-[1440px] gap-10 ${VM_SECTION_PAD} lg:grid-cols-[0.78fr_0.7fr_0.82fr] lg:items-center`}>
          <div>
            <Counter index={active + 1} total={posts.length} />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: VM_EASE }}
              >
                <h3 className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08]">
                  {current.title}
                </h3>
                <p className="mt-5 text-lg leading-[1.45] text-white/74">
                  {current.excerpt}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {(current.tags || [current.contentType]).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-[6px] bg-white/12 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/72"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <Link
              href={localePath(`/content/${current.slug}`)}
              className="mt-9 inline-flex items-center gap-3 rounded-[10px] bg-[#d9ff80] px-5 py-4 text-sm font-semibold uppercase text-black transition hover:bg-white"
            >
              {lang === 'de' ? 'Lesen' : 'Read'}
              <ArrowRight className="h-4 w-4 -rotate-45" />
            </Link>
          </div>

          <div className="relative mx-auto aspect-[290/436] w-full max-w-[19rem]">
            <div className="absolute inset-0 rounded-[18px] border border-white/18" />
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.slug}
                initial={{ opacity: 0, y: 24, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -18, rotate: -3 }}
                transition={{ duration: 0.55, ease: VM_EASE }}
                className="absolute inset-4 overflow-hidden rounded-[14px] bg-[#111]"
              >
                {current.heroImage ? (
                  <Image
                    src={current.heroImage}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 80vw, 19rem"
                    className="object-cover"
                  />
                ) : null}
              </motion.figure>
            </AnimatePresence>
            {posts.slice(0, 3).map((post, index) => (
              <figure
                key={post.slug}
                className="absolute left-1/2 top-1/2 -z-10 aspect-[290/436] w-[72%] -translate-x-1/2 overflow-hidden rounded-[10px] opacity-30"
                style={{ transform: `translate(-50%, calc(-50% + ${index * 28}px)) scale(${1 - index * 0.08})` }}
              >
                {post.heroImage ? (
                  <Image src={post.heroImage} alt="" fill sizes="12rem" className="object-cover" />
                ) : null}
              </figure>
            ))}
          </div>

          <div className="grid gap-2">
            {posts.map((post, index) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => setActive(index)}
                className={`group flex items-center justify-between gap-5 rounded-[6px] px-4 py-4 text-left transition ${
                  index === active ? 'bg-white text-black' : 'bg-white/10 text-white/70 hover:bg-white/16 hover:text-white'
                }`}
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] opacity-55">
                    {post.contentType}
                  </span>
                  <span className="mt-2 block text-lg font-semibold leading-tight">
                    {post.title}
                  </span>
                </span>
                <Counter index={index + 1} total={posts.length} />
              </button>
            ))}

            <Link
              href={localePath('/content')}
              className="mt-5 inline-flex items-center justify-center gap-3 rounded-[10px] border border-white/18 px-5 py-4 text-sm font-semibold uppercase text-white transition hover:bg-white hover:text-black"
            >
              {lang === 'de' ? 'Alle Inhalte' : 'All insights'}
              <ArrowRight className="h-4 w-4 -rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
function FaqSection() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const items =
    lang === 'de'
      ? [
          {
            q: 'Wie startet ein Quantiva-Projekt?',
            a: 'Wir beginnen mit einem unverbindlichen Gespräch, klären Ziele und priorisieren die nächsten Schritte passend zu SAP, Cloud, AI oder Compliance.',
          },
          {
            q: 'Bleiben bestehende Systeme im Betrieb?',
            a: 'Unsere Programme sind auf planbare Transformation ausgelegt: Migrationspfade, Testautomatisierung und Security-by-Design werden früh kombiniert.',
          },
          {
            q: 'Welche Branchen unterstützt Quantiva?',
            a: 'Der Fokus liegt auf mittelständischen Marktführern in Financial Services, Automotive, Health & Life Sciences sowie Retail & E-Commerce.',
          },
          {
            q: 'Wie schnell entsteht ein belastbarer Fahrplan?',
            a: 'In der Regel liefern wir nach zwei bis drei Workshops eine priorisierte Roadmap mit Aufwand, Risiken, Abhängigkeiten und messbaren Erfolgsindikatoren.',
          },
          {
            q: 'Kann Quantiva auch die Umsetzung übernehmen?',
            a: 'Ja. Wir verbinden Advisory mit Engineering, Architektur, Testautomatisierung und Enablement, damit Konzepte nicht in der Übergabe stecken bleiben.',
          },
          {
            q: 'Wie wird Governance im Projekt gesichert?',
            a: 'Jedes Programm bekommt klare Entscheidungswege, Security- und Compliance-Leitplanken sowie ein transparentes Reporting für Fachbereich und IT.',
          },
        ]
      : [
          {
            q: 'How does a Quantiva project start?',
            a: 'We begin with a non-binding conversation, clarify goals and prioritise next steps across SAP, Cloud, AI or Compliance.',
          },
          {
            q: 'Do existing systems stay operational?',
            a: 'Our programmes are built for predictable transformation: migration paths, test automation and security-by-design are combined early.',
          },
          {
            q: 'Which industries does Quantiva support?',
            a: 'The focus is on mid-market leaders in Financial Services, Automotive, Health & Life Sciences and Retail & E-Commerce.',
          },
          {
            q: 'How quickly can we get a reliable roadmap?',
            a: 'Usually after two to three workshops we provide a prioritised roadmap with effort, risks, dependencies and measurable success indicators.',
          },
          {
            q: 'Can Quantiva also deliver the implementation?',
            a: 'Yes. We combine advisory with engineering, architecture, test automation and enablement so concepts do not get stuck at handover.',
          },
          {
            q: 'How is project governance handled?',
            a: 'Each programme gets clear decision paths, security and compliance guardrails and transparent reporting for business and IT stakeholders.',
          },
        ];
  const visibleItems = showAll ? items : items.slice(0, 4);

  return (
    <section className="bg-[#f7f6ff] text-black">
      <div className={`mx-auto grid max-w-[1440px] gap-10 ${VM_SECTION_PAD} lg:grid-cols-[0.75fr_1.25fr]`}>
        <div>
          <SectionKicker>{lang === 'de' ? 'FAQ' : 'FAQ'}</SectionKicker>
          <h2 className="mt-5 text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-none">
            {lang === 'de' ? 'Fragen, die Sie haben könnten' : 'Questions you may have'}
          </h2>
        </div>
        <div>
          <div className="grid gap-3">
          {visibleItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className="overflow-hidden rounded-[10px] bg-[#ebe9fa]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="relative flex min-h-[5.5rem] w-full items-center justify-between gap-6 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl font-semibold leading-tight md:text-2xl">{item.q}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] bg-[#5241d4] text-[#d9ff80]">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.35, ease: VM_EASE }}
                    className="px-5 pb-5 text-lg leading-[1.45] text-black/68"
                  >
                    {item.a}
                  </motion.div>
                ) : null}
              </div>
            );
          })}
          </div>
          {items.length > 4 ? (
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="mt-7 inline-flex items-center gap-3 rounded-[10px] bg-[#111] px-5 py-4 text-sm font-semibold uppercase text-white transition hover:bg-[#d9ff80] hover:text-black"
            >
              {showAll ? (lang === 'de' ? 'Weniger Fragen' : 'Fewer questions') : (lang === 'de' ? 'Mehr Fragen' : 'More questions')}
              <ArrowRight className={`h-4 w-4 transition ${showAll ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { lang } = useLanguage();
  const contact = useContactContent(lang);
  const services = useServices(lang);
  const reduceMotion = useReducedMotion();
  const mediaItems = services.items.slice(0, 5);

  return (
    <section id="contact" className="relative overflow-hidden bg-[#5241d4] text-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-16 overflow-hidden py-6 opacity-40">
        <motion.div
          className="flex w-max gap-5"
          animate={reduceMotion ? { x: '0%' } : { x: ['0%', '-50%'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, loop) => (
            <span key={loop} className="flex gap-5">
              {mediaItems.map((item: any) => (
                <figure key={`${loop}-${item.id}`} className="relative h-44 w-44 overflow-hidden rounded-full border border-white/15 bg-white/10">
                  {item.image ? (
                    <Image src={item.image} alt="" fill sizes="11rem" className="object-cover" />
                  ) : null}
                </figure>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-[1440px] flex-col items-center justify-center px-4 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <SectionKicker dark>{lang === 'de' ? 'Kontakt' : 'Contact'}</SectionKicker>
          <h2 className="mt-5 text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-none">
            {contact.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.45] text-white/78">
            {contact.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.08em] text-white/72">
            <a href="mailto:info@quantivaadvisory.com" className="inline-flex items-center gap-3 transition hover:text-[#d9ff80]">
              <Mail className="h-5 w-5" />
              info@quantivaadvisory.com
            </a>
            <a href="tel:+490123456789" className="inline-flex items-center gap-3 transition hover:text-[#d9ff80]">
              <Phone className="h-5 w-5" />
              +49 (0) 123 456789
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-10 w-full max-w-[37.125rem] rounded-[10px] bg-white p-5 text-black shadow-[0_28px_90px_rgba(0,0,0,0.22)] md:p-6">
          <ContactForm lang={lang} />
        </div>
      </div>
    </section>
  );
}

function MeetingCalendlySection() {
  const { lang } = useLanguage();
  const meeting = useMeetingContent(lang);

  useEffect(() => {
    const src = 'https://assets.calendly.com/assets/external/widget.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }

    const href = 'https://assets.calendly.com/assets/external/widget.css';
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <section id="meeting" className="bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:py-28">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionKicker>{lang === 'de' ? 'Termin' : 'Meeting'}</SectionKicker>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {meeting.title}
            </h2>
            <p className="mt-5 text-lg text-black/65">{meeting.subtitle}</p>
          </div>
          <a
            href={meeting.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackCalendlyOpen('fallback_button')}
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d9ff80] hover:text-black"
          >
            {meeting.fallbackButton}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <div className="overflow-hidden rounded-[10px] border border-black/12 bg-[#f7f6ff]">
          <div
            className="calendly-inline-widget"
            data-url={`${meeting.calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1`}
            style={{ minWidth: 320, height: 720, width: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const { lang } = useLanguage();
  const footer = useFooterContent(lang);
  const reduceMotion = useReducedMotion();

  const footerLink = (href: string) => resolveHref(href, lang);

  return (
    <footer className="relative overflow-hidden bg-[#111] text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[92rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#171717]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden text-[clamp(8rem,26vw,28rem)] font-semibold uppercase leading-none text-white/[0.025]">
        <motion.div
          className="flex w-max gap-12"
          animate={reduceMotion ? { x: '0%' } : { x: ['0%', '-50%'] }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, loop) => (
            <span key={loop}>Quantiva Advisory / </span>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <Link href={`/${lang}`} className="text-3xl font-semibold uppercase">
              Quantiva Advisory
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/58">
              {footer.tagline}
            </p>
            <a
              href={`mailto:${footer.contact.email}`}
              className="mt-8 inline-flex items-center gap-3 rounded-[10px] bg-white px-5 py-4 text-sm font-semibold uppercase text-black transition hover:bg-[#d9ff80]"
            >
              {lang === 'de' ? 'Im Austausch bleiben' : 'Stay in touch'}
              <ArrowRight className="h-4 w-4 -rotate-45" />
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:min-w-[52rem]">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                {footer.quickLinks.title}
              </h4>
              <ul className="mt-4 grid gap-2 text-lg leading-tight text-white">
                {footer.quickLinks.items.map((link) => (
                  <li key={link.href}>
                    <Link className="transition hover:text-[#d9ff80]" href={footerLink(link.href)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                {footer.contact.title}
              </h4>
              <ul className="mt-4 grid gap-2 text-lg leading-tight text-white">
                <li>
                  <a className="transition hover:text-[#d9ff80]" href={`mailto:${footer.contact.email}`}>
                    {footer.contact.email}
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-[#d9ff80]" href={`tel:${footer.contact.phone}`}>
                    {footer.contact.phone}
                  </a>
                </li>
                <li>{footer.contact.address}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                {footer.social.title}
              </h4>
              <ul className="mt-4 grid gap-2 text-lg leading-tight text-white">
                <li>
                  <a className="transition hover:text-[#d9ff80]" href={footer.social.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-[#d9ff80]" href={footer.social.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-[#d9ff80]" href={footer.social.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-y border-white/10 py-6 text-sm uppercase text-white/45 md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <a href="#home" className="inline-flex items-center gap-3 transition hover:text-[#d9ff80]">
            {lang === 'de' ? 'Nach oben' : 'Back to top'}
            <span className="grid h-10 w-10 place-items-center rounded-[6px] bg-white text-black">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
      <div className="relative overflow-hidden border-t border-white/12 py-4">
        <motion.div
          className="flex w-max gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/38"
          animate={reduceMotion ? { x: '0%' } : { x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, loop) => (
            <span key={loop}>
              Quantiva Advisory / SAP / Cloud / AI / Compliance / Digital Transformation /
            </span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}

export default function QuantivaWebsite() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.classList.add('valmax-reskin');
    return () => document.documentElement.classList.remove('valmax-reskin');
  }, []);

  const siteTitle =
    lang === 'de'
      ? 'Quantiva Advisory - SAP, Cloud & AI Consulting'
      : 'Quantiva Advisory - SAP, Cloud & AI Consulting';
  const siteDesc =
    lang === 'de'
      ? 'Professionelle Beratung fuer SAP, Cloud, AI, Integration und Cyber Security.'
      : 'Professional consulting for SAP, Cloud, AI, Integration and Cyber Security.';
  const canonical = absUrl(`/${lang}`);

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Quantiva Advisory',
            url: canonical,
            description: siteDesc,
          }),
        }}
      />
      <Preloader />
      <HomeHeader />
      <HeroSection />
      <ProofSection />
      <BrandManifestSection />
      <CapabilitiesSection />
      <IndustriesShowcase />
      <AtAGlanceSection />
      <TestimonialsSection />
      <InsightsSection />
      <FaqSection />
      <ContactSection />
      <Suspense fallback={null}>
        <MeetingCalendlySection />
      </Suspense>
      <SiteFooter />
      <span className="sr-only">{siteTitle}</span>
    </div>
  );
}
