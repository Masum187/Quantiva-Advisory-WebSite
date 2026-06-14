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
import { motion } from 'framer-motion';
import {
  ArrowRight,
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

function HomeHeader() {
  const { lang, setLang } = useLanguage();
  const nav = useNavigationContent(lang);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = nav.items.map((item) => ({
    ...item,
    href: resolveHref(item.href, lang),
  }));

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-lg border border-white/10 bg-[#111]/92 px-4 py-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <Link
          href={`/${lang}`}
          className="group flex items-center gap-3"
          aria-label="Quantiva Advisory"
        >
          <span className="grid h-9 w-9 place-items-center rounded-md border border-white/18 bg-white text-black transition group-hover:bg-[#d9ff80]">
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
          <span className="text-base font-semibold tracking-normal md:text-lg">
            Quantiva Advisory
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-white/72 transition hover:bg-white/8 hover:text-white"
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
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-x-3 top-[76px] z-50 rounded-lg border border-white/12 bg-[#111] p-4 text-white shadow-2xl lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile primary">
            {links.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-4 text-xl font-semibold"
              >
                <span>{item.label}</span>
                <Counter index={index + 1} total={links.length} />
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="flex-1 rounded-full border border-white/20 px-4 py-3 text-sm"
            >
              {lang === 'de' ? 'English' : 'Deutsch'}
            </button>
            <Link
              href={`/${lang}#contact`}
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-[#d9ff80] px-4 py-3 text-center text-sm font-semibold text-black"
            >
              {lang === 'de' ? 'Kontakt' : 'Contact'}
            </Link>
          </div>
          <div className="mt-5 overflow-hidden border-y border-white/10 py-3 text-xs uppercase tracking-[0.18em] text-white/45">
            <motion.div
              className="flex w-max gap-8"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(2)].map((_, loop) => (
                <span key={loop}>
                  SAP / Cloud / AI / Compliance / Engineering / Enablement
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroVisual({ services }: { services: any[] }) {
  const featured = services.slice(0, 3);

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[14px] border border-white/12 bg-white/6 p-3">
      <div className="absolute inset-3 rounded-[10px] border border-white/10" />
      <div className="grid h-full min-h-[496px] grid-rows-[1fr_auto] gap-3">
        <div className="relative overflow-hidden rounded-[10px] bg-[#252525]">
          {featured[0]?.image ? (
            <Image
              src={featured[0].image}
              alt={featured[0].title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-80"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Counter index={1} total={featured.length || 1} />
            <h3 className="mt-3 max-w-md text-3xl font-semibold text-white">
              {featured[0]?.title}
            </h3>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {featured.slice(1).map((service, index) => (
            <div
              key={service.id}
              className="relative min-h-[150px] overflow-hidden rounded-[10px] border border-white/10 bg-[#f7f6ff] text-black"
            >
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-65 mix-blend-multiply"
                />
              ) : null}
              <div className="absolute inset-0 bg-[#f7f6ff]/55" />
              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <Counter index={index + 2} total={featured.length} />
                <p className="text-xl font-semibold leading-tight">{service.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const { lang, localePath } = useLanguage();
  const hero = useHero(lang);
  const services = useServices(lang);

  return (
    <section
      id="home"
      className="relative -mt-[76px] min-h-svh overflow-hidden bg-[#050505] pt-[116px] text-white"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-20 pt-16 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:pb-28 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl"
        >
          <SectionKicker dark>{hero.subtitle}</SectionKicker>
          <h1 className="mt-6 text-[clamp(3.4rem,8vw,6.4rem)] font-semibold leading-[0.95] tracking-normal">
            {hero.title}
          </h1>
          {hero.highlight ? (
            <p className="mt-6 max-w-xl text-2xl font-semibold text-[#d9ff80]">
              {hero.highlight}
            </p>
          ) : null}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={localePath('/#contact')}
              className="group inline-flex items-center gap-3 rounded-full bg-[#d9ff80] px-6 py-3 text-sm font-semibold text-black transition hover:bg-white"
            >
              {hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href={localePath('/cases')}
              className="group inline-flex items-center gap-3 rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              {hero.ctaSecondary}
              <span className="grid h-7 w-7 place-items-center rounded-full border border-current">
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <HeroVisual services={services.items} />
        </motion.div>
      </div>

      <div className="border-y border-white/10 py-4">
        <motion.div
          className="flex w-max gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/48"
          animate={{ x: ['0%', '-50%'] }}
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
  const kpis =
    lang === 'de'
      ? [
          ['38%', 'Ø ROI nach 12 Monaten'],
          ['92%', 'Kundenzufriedenheit'],
          ['45', 'Realisierte Projekte'],
          ['ISO', 'Security & Compliance'],
        ]
      : [
          ['38%', 'Avg ROI in 12 months'],
          ['92%', 'Customer satisfaction'],
          ['45', 'Delivered projects'],
          ['ISO', 'Security & compliance'],
        ];

  return (
    <section className="bg-white text-black">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div>
          <SectionKicker>{lang === 'de' ? 'Proof & Vertrauen' : 'Proof & trust'}</SectionKicker>
          <h2 className="mt-5 max-w-3xl text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
            {lang === 'de'
              ? 'Beratung, Engineering und Enablement als ein System.'
              : 'Advisory, engineering and enablement as one system.'}
          </h2>
          <Link
            href={localePath('/cases')}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
          >
            {lang === 'de' ? 'Alle Erfolgsstories' : 'All success stories'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[10px] border border-black/10 bg-black/10 sm:grid-cols-2">
          {kpis.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="min-h-[190px] bg-[#f7f6ff] p-6"
            >
              <Counter index={index + 1} total={kpis.length} />
              <p className="mt-8 text-5xl font-semibold leading-none">{value}</p>
              <p className="mt-4 max-w-[13rem] text-base text-black/65">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const { lang, localePath } = useLanguage();
  const services = useServices(lang);
  const serviceSlugs = ['sap', 'cloud', 'ai', 'microservices', 'cyber-security', 'new-work'];

  return (
    <section id="services" className="bg-[#050505] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <SectionKicker dark>{services.subtitle}</SectionKicker>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {services.title}
            </h2>
          </div>
          <div className="grid gap-4">
            {services.items.slice(0, 6).map((service: any, index: number) => (
              <Link
                key={service.id}
                href={localePath(`/services/${serviceSlugs[index]}`)}
                className="group grid min-h-[220px] overflow-hidden rounded-[10px] border border-white/12 bg-white text-black transition hover:border-[#d9ff80] md:grid-cols-[0.75fr_1.25fr]"
              >
                <div className="relative min-h-[220px] overflow-hidden bg-[#252525]">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 34vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/18" />
                </div>
                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <Counter index={index + 1} total={6} />
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/15 transition group-hover:bg-[#d9ff80]">
                      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                  <div className="pt-10">
                    <h3 className="text-[clamp(1.9rem,4vw,3.125rem)] font-semibold leading-none">
                      {service.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/65">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriesShowcase() {
  const { lang, localePath } = useLanguage();
  const industries = lang === 'de' ? industriesDe : industriesEn;

  return (
    <section id="industries" className="bg-[#f7f6ff] text-black">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionKicker>{lang === 'de' ? 'Branchen' : 'Industries'}</SectionKicker>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {lang === 'de' ? 'Branchen-Expertise' : 'Industry Expertise'}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-black/65">
            {lang === 'de'
              ? 'Wir begleiten mittelständische Marktführer in regulierten und wachstumsstarken Branchen.'
              : 'We partner with mid-market leaders in regulated and fast-scaling industries.'}
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <Link
              key={industry.slug}
              href={localePath(`/industries/${industry.slug}`)}
              className="group bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/18" />
              </div>
              <div className="p-6">
                <Counter index={index + 1} total={industries.length} />
                <h3 className="mt-6 text-2xl font-semibold leading-tight">
                  {industry.title}
                </h3>
                <p className="mt-3 text-sm text-black/60">{industry.description}</p>
                <div className="mt-6 inline-flex rounded-full border border-black/12 px-3 py-1 text-xs uppercase tracking-[0.12em] text-black/55">
                  {industry.projects}+ {lang === 'de' ? 'Projekte' : 'projects'}
                </div>
              </div>
            </Link>
          ))}
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
    <section className="bg-[#d9ff80] text-black">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
        <div>
          <SectionKicker>{lang === 'de' ? 'Quantiva at a glance' : 'Quantiva at a glance'}</SectionKicker>
          <h2 className="mt-5 max-w-3xl text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
            {about.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/70">
            {about.text}
          </p>
          <Link
            href={localePath('/about')}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            {lang === 'de' ? 'Mehr über Quantiva' : 'More about Quantiva'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[10px] border border-black/12 bg-black/12 sm:grid-cols-3">
          {stats.map((stat: any, index) => (
            <div key={stat.label} className="min-h-[220px] bg-[#d9ff80] p-6">
              <Counter index={index + 1} total={stats.length} />
              <p className="mt-12 text-5xl font-semibold leading-none">{stat.value}</p>
              <p className="mt-4 text-base text-black/68">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { lang, localePath } = useLanguage();
  const testimonials = useMemo(
    () =>
      casesData
        .filter((item) => item.quote)
        .slice(0, 3)
        .map((item) => ({
          slug: item.slug,
          title: lang === 'de' ? item.titleDe : item.titleEn,
          quote: lang === 'de' ? item.quote?.textDe : item.quote?.textEn,
          author: item.quote?.author || (lang === 'de' ? 'Kunde' : 'Client'),
          image: item.heroImage,
        })),
    [lang],
  );

  if (!testimonials.length) return null;

  return (
    <section id="references" className="bg-[#050505] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionKicker dark>
              {lang === 'de' ? 'Kundenstimmen' : 'Client voices'}
            </SectionKicker>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {lang === 'de' ? 'Was unsere Partner sagen' : 'What our partners say'}
            </h2>
          </div>
          <Link
            href={localePath('/cases')}
            className="inline-flex items-center gap-2 rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            {lang === 'de' ? 'Referenzen ansehen' : 'View case studies'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Link
            href={localePath(`/cases/${testimonials[0].slug}`)}
            className="group relative min-h-[520px] overflow-hidden rounded-[10px] border border-white/12 bg-white text-black"
          >
            {testimonials[0].image ? (
              <Image
                src={testimonials[0].image}
                alt={testimonials[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover opacity-30 transition duration-700 group-hover:scale-105"
              />
            ) : null}
            <div className="relative z-10 flex h-full min-h-[520px] flex-col justify-between p-8 md:p-10">
              <Counter index={1} total={testimonials.length} />
              <div>
                <p className="max-w-3xl text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.04]">
                  “{testimonials[0].quote}”
                </p>
                <p className="mt-8 text-base font-semibold">{testimonials[0].author}</p>
                <p className="text-sm text-black/60">{testimonials[0].title}</p>
              </div>
            </div>
          </Link>

          <div className="grid gap-4">
            {testimonials.slice(1).map((testimonial, index) => (
              <Link
                key={testimonial.slug}
                href={localePath(`/cases/${testimonial.slug}`)}
                className="group rounded-[10px] border border-white/12 bg-white/8 p-6 transition hover:bg-white hover:text-black"
              >
                <div className="flex items-start justify-between gap-6">
                  <Counter index={index + 2} total={testimonials.length} />
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </div>
                <p className="mt-10 text-2xl font-semibold leading-tight">
                  “{testimonial.quote}”
                </p>
                <p className="mt-8 text-sm font-semibold">{testimonial.author}</p>
                <p className="text-sm opacity-60">{testimonial.title}</p>
              </Link>
            ))}
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
    .slice(0, 3);

  if (!posts.length) return null;

  return (
    <section id="insights" className="bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionKicker>{lang === 'de' ? 'Content Hub' : 'Content Hub'}</SectionKicker>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {lang === 'de'
                ? 'Impulse, Playbooks und Projekteinblicke'
                : 'Insights, playbooks and project takeaways'}
            </h2>
          </div>
          <Link
            href={localePath('/content')}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
          >
            {lang === 'de' ? 'Alle Inhalte' : 'All insights'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[10px] border border-black/10 bg-black/10 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link key={post.slug} href={localePath(`/content/${post.slug}`)} className="group bg-white">
              <div className="relative aspect-video overflow-hidden">
                {post.heroImage ? (
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="flex min-h-[300px] flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">
                      {post.contentType}
                    </span>
                    <Counter index={index + 1} total={posts.length} />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold leading-tight">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/62">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm text-black/60">
                  <span>{post.author}</span>
                  <span>{post.publishedAt}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

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
        ];

  return (
    <section className="bg-[#f7f6ff] text-black">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 md:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
        <div>
          <SectionKicker>{lang === 'de' ? 'FAQ' : 'FAQ'}</SectionKicker>
          <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
            {lang === 'de' ? 'Fragen, die Sie haben koennten' : 'Questions you may have'}
          </h2>
        </div>
        <div className="border-t border-black/12">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className="border-b border-black/12 py-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-2xl font-semibold leading-tight">{item.q}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/14">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen ? (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 max-w-3xl text-lg leading-relaxed text-black/65"
                  >
                    {item.a}
                  </motion.p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { lang } = useLanguage();
  const contact = useContactContent(lang);

  return (
    <section id="contact" className="bg-[#050505] text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-28">
        <div>
          <SectionKicker dark>{lang === 'de' ? 'Kontakt' : 'Contact'}</SectionKicker>
          <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
            {contact.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/68">
            {contact.subtitle}
          </p>
          <div className="mt-10 grid gap-4 text-sm text-white/72">
            <a
              href="mailto:info@quantivaadvisory.com"
              className="inline-flex items-center gap-3 transition hover:text-[#d9ff80]"
            >
              <Mail className="h-5 w-5" />
              info@quantivaadvisory.com
            </a>
            <a
              href="tel:+490123456789"
              className="inline-flex items-center gap-3 transition hover:text-[#d9ff80]"
            >
              <Phone className="h-5 w-5" />
              +49 (0) 123 456789
            </a>
          </div>
        </div>
        <div className="rounded-[10px] border border-white/12 bg-white p-4 text-black md:p-6">
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

  const footerLink = (href: string) => resolveHref(href, lang);

  return (
    <footer className="bg-[#111] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <div className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <Link href={`/${lang}`} className="text-2xl font-semibold">
              Quantiva Advisory
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/58">
              {footer.tagline}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                {footer.quickLinks.title}
              </h4>
              <ul className="mt-4 grid gap-2 text-sm text-white/72">
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
              <ul className="mt-4 grid gap-2 text-sm text-white/72">
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
              <ul className="mt-4 grid gap-2 text-sm text-white/72">
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
        <div className="flex flex-col justify-between gap-4 py-6 text-sm text-white/45 md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <a href="#home" className="inline-flex items-center gap-2 transition hover:text-[#d9ff80]">
            {lang === 'de' ? 'Nach oben' : 'Back to top'}
            <ChevronDown className="h-4 w-4 rotate-180" />
          </a>
        </div>
      </div>
      <div className="overflow-hidden border-t border-white/12 py-4">
        <motion.div
          className="flex w-max gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/38"
          animate={{ x: ['0%', '-50%'] }}
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
      <HomeHeader />
      <HeroSection />
      <ProofSection />
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
