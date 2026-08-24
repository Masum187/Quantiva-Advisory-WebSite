'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef, Suspense } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from "framer-motion";
import dynamic from 'next/dynamic';
import {
  Menu, X, ChevronRight,
  Shield, Mail, Phone, ArrowRight,
  Brain, Boxes, Cog, Briefcase, Send, Users, BadgeCheck, Quote
} from "lucide-react";
import casesData from "../lib/data/cases.json";
import { analytics } from "../lib/utils/analytics";
import { AnimatedCard } from './services/AnimatedCard';
import IndustriesSection from './sections/IndustriesSection';

const AIImageSlider = dynamic(() => import("./AIImageSlider"), {
  ssr: false,
  loading: () => <div className="h-[100px] bg-gray-800 rounded-lg animate-pulse" />
});
import {
  useTeam,
  useHero,
  useServices,
  useNavigationContent,
  useFooterContent,
  useContactContent,
  useMeetingContent,
  useCareersContent
} from "../lib/contexts/ContentContext";

// Dynamic imports for better code splitting
const ReferencesSlider = dynamic(() => import('./ReferencesSlider'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />,
  ssr: false
});

/**
 * QuantivaWebsite – Accenture-inspired version (with i18n Context and SEO)
 * - Autoplay hero video background with overlay
 * - Cases (/cases) & Case details (/cases/:slug)
 * - Subtle parallax scroll, ScrollSpy
 * - SEO: Organization, CollectionPage, Article JSON-LD
 * - Canonical, hreflang, Open Graph, Twitter Cards per page
 * - NEW: Global LanguageContext with URL prefix /de/ /en/
 * - Analytics: Custom event tracking integrated
 */

const CAREER_FORM_URL = "https://example.com/career-form";

// helpers
const ORIGIN = (typeof window !== 'undefined' && window.location.origin) || 'https://quantivaadvisory.com';
const absUrl = (path = '/') => `${ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
const firstSeg = (pathname: string) => (pathname || '/').split('?')[0].split('#')[0].split('/').filter(Boolean)[0] || '';
const VALID_LOCALES = ['de','en'] as const;

// ────────────────────────────────────────────────────────────────────────────────
// Language Context
// ────────────────────────────────────────────────────────────────────────────────

type Locale = typeof VALID_LOCALES[number];

type LangCtx = {
  lang: Locale;
  setLang: (l: Locale, opts?: { navigate?: boolean }) => void;
  localePath: (p: string) => string;
};

const LanguageContext = createContext<LangCtx | null>(null);

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'de';
  const seg = firstSeg(window.location.pathname);
  if (VALID_LOCALES.includes(seg as Locale)) return seg as Locale;
  const saved = localStorage.getItem('qlang');
  if (saved && VALID_LOCALES.includes(saved as Locale)) return saved as Locale;
  const nav = (navigator.language || '').toLowerCase();
  return nav.startsWith('de') ? 'de' : 'en';
}

function replaceLocaleInPath(pathname: string, next: Locale): string {
  const parts = pathname.split('/');
  // ["", ...]
  if (parts.length > 1 && VALID_LOCALES.includes((parts[1] || '') as Locale)) {
    parts[1] = next;
  } else {
    parts.splice(1, 0, next);
  }
  return parts.join('/') || `/${next}`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, _setLang] = useState<Locale>(detectLocale());

  // Ensure URL carries locale prefix; redirect from "/" or missing prefix
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seg = firstSeg(window.location.pathname);
    if (!VALID_LOCALES.includes(seg as Locale)) {
      const target = replaceLocaleInPath(window.location.pathname, lang);
      window.history.replaceState({}, '', target + window.location.search + window.location.hash);
    }
  }, [lang]);

  const setLang: LangCtx['setLang'] = useCallback((l, opts) => {
    _setLang((oldLang) => {
      // Track language switch
      if (oldLang !== l) {
        analytics.trackLanguageSwitch(oldLang, l);
      }
      return l;
    });
    try { localStorage.setItem('qlang', l); } catch {}
    
    if (opts?.navigate !== false && typeof window !== 'undefined') {
      const nextPath = replaceLocaleInPath(window.location.pathname, l);
      window.location.assign(nextPath + window.location.search + window.location.hash);
    }
  }, []);

  const localePath: LangCtx['localePath'] = useCallback((p) => {
    // Konsistente Logik für Server und Client
    const normalizedPath = p.startsWith('/') ? p : `/${p}`;
    return `/${lang}${normalizedPath}`;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, localePath }), [lang, setLang, localePath]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LangCtx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

// ────────────────────────────────────────────────────────────────────────────────
// Content constants
// ────────────────────────────────────────────────────────────────────────────────
// All constants removed - now using JSON-based CMS (content.json, team.json)

// ────────────────────────────────────────────────────────────────────────────────
// Animation Components
// ────────────────────────────────────────────────────────────────────────────────

function SlideIn({ children, direction = "up", delay = 0, className = "" }: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionVariants = {
    up: { y: 100, opacity: 0 },
    down: { y: -100, opacity: 0 },
    left: { x: 100, opacity: 0 },
    right: { x: -100, opacity: 0 },
  };

  const animateTo = { x: 0, y: 0, opacity: 1 };

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={isInView ? animateTo : directionVariants[direction]}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TrustSignals() {
  const { lang, localePath } = useLanguage();

  const partners = useMemo(() => {
    if (lang === 'de') {
      return [
        { name: 'SAP PartnerEdge', badge: 'SAP', description: 'Gold Partner' },
        { name: 'Microsoft Solutions Partner', badge: 'Azure', description: 'Digital & App Innovation' },
        { name: 'AWS Select Consulting', badge: 'AWS', description: 'Migration & Modernisierung' },
        { name: 'ISO 27001', badge: 'ISO', description: 'Security & Compliance' },
      ];
    }
    return [
      { name: 'SAP PartnerEdge', badge: 'SAP', description: 'Gold Partner' },
      { name: 'Microsoft Solutions Partner', badge: 'Azure', description: 'Digital & App Innovation' },
      { name: 'AWS Select Consulting', badge: 'AWS', description: 'Migration & Modernization' },
      { name: 'ISO 27001', badge: 'ISO', description: 'Security & Compliance' },
    ];
  }, [lang]);

  const kpis = useMemo(() => (
    lang === 'de'
      ? [
          { value: '38%', label: 'Ø ROI nach 12 Monaten', detail: 'Mittelstandsprogramme' },
          { value: '92%', label: 'Kundenzufriedenheit', detail: 'NPS FY24' },
          { value: '45', label: 'Realisierte Projekte', detail: 'DACH Mittelstand' },
        ]
      : [
          { value: '38%', label: 'Avg ROI in 12 months', detail: 'Mid-market programs' },
          { value: '92%', label: 'Customer satisfaction', detail: 'NPS FY24' },
          { value: '45', label: 'Delivered projects', detail: 'DACH mid-market' },
        ]
  ), [lang]);

  const testimonials = useMemo(() => {
    return casesData
      .filter((item) => item.quote)
      .slice(0, 3)
      .map((caseItem) => ({
        author: caseItem.quote?.author ?? 'Client Executive',
        quote: lang === 'de' ? caseItem.quote?.textDe : caseItem.quote?.textEn,
        slug: caseItem.slug,
        title: lang === 'de' ? caseItem.titleDe : caseItem.titleEn,
      }));
  }, [lang]);

  return (
    <section className="relative border-y border-white/5 bg-gradient-to-br from-slate-950 via-black to-slate-950 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <SlideIn direction="up" delay={0.1}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-teal-200">
                <BadgeCheck className="h-4 w-4" />
                {lang === 'de' ? 'Vertrauen & Nachweise' : 'Proof & trust'}
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                {lang === 'de' ? 'Partnerstatus, KPIs & Kundenstimmen' : 'Partner status, KPIs & client voices'}
              </h2>
            </div>
            <Link
              href={localePath('/cases')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-teal-400/40 hover:text-teal-200"
            >
              {lang === 'de' ? 'Alle Erfolgsstories' : 'All success stories'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur md:grid-cols-4">
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                whileHover={{ y: -4 }}
                className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-teal-300">
                  {partner.badge}
                </span>
                <span className="text-base font-semibold text-white">{partner.name}</span>
                <span className="text-xs text-gray-400">{partner.description}</span>
              </motion.div>
            ))}
          </div>
        </SlideIn>

        <SlideIn direction="up" delay={0.3}>
          <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-3">
            {kpis.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/60 p-6 text-center shadow-[0_20px_60px_-30px_rgba(20,184,166,0.4)]">
                <div className="text-4xl font-black text-white">{item.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.3em] text-teal-200">{item.label}</div>
                <p className="mt-3 text-sm text-gray-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </SlideIn>

        <SlideIn direction="up" delay={0.4}>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={testimonial.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-black/50 p-6"
              >
                <Quote className="h-6 w-6 text-teal-300" />
                <p className="mt-4 text-sm leading-relaxed text-gray-300">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6">
                  <div className="text-sm font-semibold text-white">{testimonial.author}</div>
                  <div className="text-xs text-gray-400">{testimonial.title}</div>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </SlideIn>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// New Sections
// ────────────────────────────────────────────────────────────────────────────────

function AboutTeaser() {
  const { lang } = useLanguage();
  return (
    <section id="about" className="bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <SlideIn direction="left" delay={0.2}>
            <div>
              <Link href={lang==='de' ? '/de/about' : '/en/about'}>
                <h2 className="text-3xl md:text-4xl font-bold text-white hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  {lang==='de' ? 'Über Quantiva' : 'About Quantiva'}
                </h2>
              </Link>
              <p className="mt-4 text-gray-300">
                {lang==='de'
                  ? 'Wir verbinden Strategie, Engineering und Enablement für messbare Ergebnisse. Sicher, compliant und skalierbar.'
                  : 'We combine strategy, engineering and enablement for measurable outcomes. Secure, compliant and scalable.'}
              </p>
              <ul className="mt-6 grid gap-2 text-gray-200">
                <li className="flex items-start gap-2"><Users className="mt-1 h-4 w-4 text-teal-400" /> {lang==='de'?'Interdisziplinäre Teams':'Interdisciplinary teams'}</li>
                <li className="flex items-start gap-2"><Shield className="mt-1 h-4 w-4 text-teal-400" /> {lang==='de'?'Security & Compliance by Design':'Security & compliance by design'}</li>
                <li className="flex items-start gap-2"><Briefcase className="mt-1 h-4 w-4 text-teal-400" /> {lang==='de'?'Outcome-orientierte Delivery':'Outcome-oriented delivery'}</li>
              </ul>
            </div>
          </SlideIn>
          <SlideIn direction="right" delay={0.4}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-500/20 border border-teal-500/30 group">
              {/* Video Container */}
              <div className="relative w-full h-[400px] overflow-hidden">
                <video
                  src="https://res.cloudinary.com/dbrisux8i/video/upload/v1760346430/kling_20251009_Image_to_Video_A_confiden_4908_0_bimwvi.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <div className="w-0 h-0 border-l-[12px] border-l-teal-600 border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-6 left-8 w-2 h-2 bg-teal-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-8 right-6 w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Digitale Innovation</h3>
                  <p className="text-gray-300 text-sm">Entdecken Sie unsere Technologien</p>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const { lang } = useLanguage();
  const teamMembers = useTeam();

  return (
    <section id="team" className="bg-black py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SlideIn direction="up" delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-pink-600 bg-clip-text text-transparent mb-8">
            {lang === 'de' ? 'Erfahren Sie wer hinter Quantiva Advisory steht' : 'Learn who stands behind Quantiva Advisory'}
          </h2>
          <p className="text-xl text-teal-100 mb-12 max-w-2xl mx-auto">
            {lang === 'de' 
              ? 'Lernen Sie unser erfahrenes Team kennen, das Ihre digitale Transformation mit Expertise und Leidenschaft vorantreibt.'
              : 'Get to know our experienced team that drives your digital transformation with expertise and passion.'}
          </p>
          <Link 
            href={lang === 'de' ? '/de/team' : '/en/team'}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
          >
            <Users className="w-5 h-5" />
            {lang === 'de' ? 'Unser Team entdecken' : 'Discover Our Team'}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </SlideIn>
      </div>
    </section>
  );
}



function ContactFormSection() {
  const { lang } = useLanguage();
  const contact = useContactContent(lang);
  const [sent, setSent] = useState<null | "ok" | "error">(null);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: An Backend anbinden – aktuell nur Demo:
    if (form.name && form.email && form.msg) setSent("ok");
    else setSent("error");
  };

  return (
    <section id="contact" className="py-20 px-6 bg-black">
      <div className="mx-auto max-w-6xl">
        <SlideIn direction="up" delay={0.1}>
          <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl shadow-teal-500/20">
            <h2 className="text-3xl font-bold text-white">{contact.title}</h2>
            <p className="mt-2 text-gray-400">
              {contact.subtitle}
            </p>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-1 block text-sm font-medium text-gray-300" htmlFor="name">{contact.form.name}</label>
                <input id="name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})}
                  className="w-full rounded-lg border border-teal-500/30 bg-slate-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-400" placeholder={contact.form.name} />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-1 block text-sm font-medium text-gray-300" htmlFor="email">{contact.form.email}</label>
                <input id="email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})}
                  className="w-full rounded-lg border border-teal-500/30 bg-slate-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-400" placeholder="name@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-300" htmlFor="msg">{contact.form.message}</label>
                <textarea id="msg" rows={5} value={form.msg} onChange={e=>setForm({...form, msg: e.target.value})}
                  className="w-full rounded-lg border border-teal-500/30 bg-slate-900/50 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-400" placeholder={contact.form.message} />
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2 font-semibold text-white hover:bg-teal-500 shadow-lg shadow-teal-500/20 transition">
                  <Send className="h-4 w-4" /> {contact.form.submit}
                </button>
                {sent==="ok" && <span className="text-teal-400">{contact.form.success}</span>}
                {sent==="error" && <span className="text-red-400">{contact.form.error}</span>}
              </div>
            </form>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 text-gray-300">
              <a href="mailto:info@quantiva.example" className="inline-flex items-center gap-3 hover:text-teal-400 transition"><Mail className="h-5 w-5 text-teal-400"/>info@quantiva.example</a>
              <a href="tel:+491234567890" className="inline-flex items-center gap-3 hover:text-teal-400 transition"><Phone className="h-5 w-5 text-teal-400"/>+49 123 456 7890</a>
            </div>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}

function MeetingCalendlySection() {
  const { lang } = useLanguage();
  const meeting = useMeetingContent(lang);

  useEffect(() => {
    // Calendly Widget laden, falls noch nicht vorhanden
    const src = "https://assets.calendly.com/assets/external/widget.js";
    const existingScript = document.querySelector(`script[src="${src}"]`);
    
    if (!existingScript) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
    }

    // Calendly CSS laden
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }
  }, []);

  return (
    <section id="meeting" className="bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SlideIn direction="up" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            {meeting.title}
          </h2>
        </SlideIn>
        <SlideIn direction="up" delay={0.2}>
          <p className="mt-3 text-center text-gray-400">
            {meeting.subtitle}
          </p>
        </SlideIn>
        
        {/* Calendly Inline Widget */}
        <SlideIn direction="up" delay={0.3}>
          <div className="mt-10 rounded-2xl border border-teal-500/30 bg-white overflow-hidden shadow-2xl shadow-teal-500/20">
            <div
              className="calendly-inline-widget"
              data-url={`${meeting.calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1`}
              style={{ minWidth: 320, height: 720, width: '100%' }}
            />
          </div>
        </SlideIn>

        {/* Fallback Button */}
        <SlideIn direction="up" delay={0.4}>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-3">
              {lang==='de'?'Widget lädt nicht? Öffnen Sie Calendly direkt:':'Widget not loading? Open Calendly directly:'}
            </p>
            <a
              href={meeting.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-500 shadow-lg shadow-teal-500/20 transition"
              onClick={() => analytics.trackCalendlyOpen('fallback_button')}
            >
              {meeting.fallbackButton}
            </a>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────────────────────────────────────
export default function QuantivaWebsite() {
  const { lang, setLang, localePath } = useLanguage();
  const hero = useHero(lang);
  const nav = useNavigationContent(lang);
  const services = useServices(lang);
  const footer = useFooterContent(lang);

  const scrollTo = (id: string) => {
    // Track navigation
    analytics.trackNavigationClick(id, window.location.pathname);
    
    if (id === 'caseslink') { window.location.href = localePath('/cases'); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Parallax scrolling removed for simpler Accenture-style hero

  const siteTitle = 'Quantiva Advisory – Strategie · Engineering · Enablement';
  const siteDesc = 'Digitale Exzellenz mit SAP, Cloud & Compliance.';
  const canonical = absUrl(localePath('/'));
  const siteImg = absUrl('/assets/og-default.jpg');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Metadata is handled by Next.js page.tsx metadata export */}
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            {/* Quantiva Logo */}
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full text-teal-400 drop-shadow-sm">
                {/* Outer Hexagon with rounded corners */}
                <polygon 
                  points="50,8 85,25 85,75 50,92 15,75 15,25" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                
                {/* Central Hexagon */}
                <polygon 
                  points="50,25 65,35 65,65 50,75 35,65 35,35" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                />
                
                {/* Circuit Lines */}
                <line x1="50" y1="25" x2="50" y2="8" stroke="currentColor" strokeWidth="1"/>
                <line x1="65" y1="35" x2="85" y2="25" stroke="currentColor" strokeWidth="1"/>
                <line x1="65" y1="65" x2="85" y2="75" stroke="currentColor" strokeWidth="1"/>
                <line x1="50" y1="75" x2="50" y2="92" stroke="currentColor" strokeWidth="1"/>
                <line x1="35" y1="65" x2="15" y2="75" stroke="currentColor" strokeWidth="1"/>
                <line x1="35" y1="35" x2="15" y2="25" stroke="currentColor" strokeWidth="1"/>
                
                {/* Top Right - Three connected circles */}
                <circle cx="75" cy="20" r="2" fill="currentColor"/>
                <circle cx="80" cy="25" r="2" fill="currentColor"/>
                <circle cx="75" cy="30" r="2" fill="currentColor"/>
                <line x1="75" y1="20" x2="80" y2="25" stroke="currentColor" strokeWidth="0.8"/>
                <line x1="80" y1="25" x2="75" y2="30" stroke="currentColor" strokeWidth="0.8"/>
                
                {/* Bottom Right - Wrench/Spanner */}
                <g transform="translate(70, 70) rotate(45)">
                  <rect x="-1" y="-8" width="2" height="16" fill="currentColor"/>
                  <rect x="-6" y="-1" width="12" height="2" fill="currentColor"/>
                  <circle cx="0" cy="0" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                </g>
                
                {/* Top Left - Rectangular chip */}
                <rect x="20" y="20" width="8" height="5" fill="none" stroke="currentColor" strokeWidth="1"/>
                <line x1="24" y1="20" x2="24" y2="25" stroke="currentColor" strokeWidth="0.8"/>
                <line x1="20" y1="22.5" x2="28" y2="22.5" stroke="currentColor" strokeWidth="0.8"/>
                
                {/* Bottom Left - Single circle node */}
                <circle cx="25" cy="80" r="2" fill="currentColor"/>
                
                {/* Additional circuit connections */}
                <line x1="50" y1="50" x2="75" y2="25" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
                <line x1="50" y1="50" x2="25" y2="25" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
                <line x1="50" y1="50" x2="75" y2="75" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
                <line x1="50" y1="50" x2="25" y2="75" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
                
                {/* Central connection lines */}
                <line x1="50" y1="50" x2="65" y2="35" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
                <line x1="50" y1="50" x2="35" y2="35" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
                <line x1="50" y1="50" x2="65" y2="65" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
                <line x1="50" y1="50" x2="35" y2="65" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
              </svg>
            </div>
            
            {/* Company Name */}
            <div className="text-xl font-bold tracking-tight">
              Quantiva <span className="text-teal-400">Advisory</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {nav.items.map((it) => (
              <button
                key={it.id}
                onClick={() => {
                  if (it.href) {
                    if (it.href.startsWith('/')) {
                      window.location.href = it.href;
                    } else {
                      scrollTo(it.id);
                    }
                  } else {
                    scrollTo(it.id);
                  }
                }}
                className="px-4 py-2 rounded-md hover:bg-white/10 transition text-sm"
              >
                {it.label}
              </button>
            ))}
            <button
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="ml-2 rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <a
              href={localePath('/#contact')}
              className="ml-3 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-teal-600"
            >
              {lang === 'de' ? 'Kontakt' : 'Contact'}
            </a>
          </nav>

          {/* Mobile Toggle */}
          <LangMenuMobile lang={lang} switchLang={() => setLang(lang === 'de' ? 'en' : 'de')} items={nav.items} />
        </div>
      </header>

      {/* Hero - Accenture Style */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Subtle Texture Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-[45%_55%] xl:grid-cols-[48%_52%] gap-12 lg:gap-16 items-center">
            {/* Left: Main Heading - Accenture Style */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-200">
                {hero.subtitle}
              </p>
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight break-words">
                {hero.title}
              </h1>
              {hero.highlight ? (
                <p className="mt-4 text-lg font-semibold uppercase tracking-[0.4em] text-teal-300">
                  {hero.highlight}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <p className="max-w-xl leading-relaxed">
                  {hero.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={localePath('/#contact')}
                  className="inline-flex items-center gap-3 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/40 transition hover:-translate-y-1 hover:bg-teal-400"
                >
                  {hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => scrollTo('services')}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-400/60 hover:text-teal-300"
                >
                  <span>{hero.ctaSecondary}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition group-hover:border-teal-400">
                    <div className="w-0 h-0 border-l-[10px] border-l-current border-y-[7px] border-y-transparent ml-1" />
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Right: Content - Accenture Style */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-8"
            >
              {/* Subtitle with Accent */}
              <div className="border-l-4 border-teal-500 pl-6">
                <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-4">
                  {hero.subtitle}
                </h2>
              </div>

              {/* Description Text */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {lang === 'de' ? (
                  <>
                    Die Technologien, die wir entwickeln, die Strategien, die wir umsetzen, 
                    die Lösungen, die wir schaffen, die Expertise, die wir einbringen, 
                    die Prozesse, die wir optimieren, die Systeme, die wir integrieren, 
                    die Innovation, die wir vorantreiben – gemeinsam können wir alles neu erfinden.
                  </>
                ) : (
                  <>
                    The technologies we develop, the strategies we implement, 
                    the solutions we create, the expertise we bring, 
                    the processes we optimize, the systems we integrate, 
                    the innovation we drive – together we can reinvent everything.
                  </>
                )}
              </p>

              {/* AI Image Slider */}
              <AIImageSlider lang={lang} />

              {/* Stats - Minimalist */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800 text-left lg:text-left">
                {[ 
                  { value: "60%", label: lang === 'de' ? "schnellere Time-to-Value" : "faster time-to-value" },
                  { value: "30+", label: lang === 'de' ? "Mittelstandsreferenzen" : "mid-market references" },
                  { value: "ISO 27001", label: lang === 'de' ? "sicher & audit-ready" : "secure & audit-ready" }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustSignals />

      {/* About Teaser */}
      <AboutTeaser />

      {/* Team */}
      <TeamSection />

      {/* Industries */}
      <IndustriesSection lang={lang} />

      {/* Services */}
      <section id="services" className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SlideIn direction="up" delay={0.1}>
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
              {services.title}
            </h2>
          </SlideIn>
          <SlideIn direction="up" delay={0.2}>
            <p className="mx-auto mt-3 max-w-2xl text-center text-gray-400">
              {services.subtitle}
            </p>
          </SlideIn>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.slice(0, 6).map((service, index) => {
              const serviceUrls = [
                'sap',
                'cloud',
                'ai',
                'microservices',
                'cyber-security',
                'new-work'
              ];
              const serviceUrl = localePath(`/services/${serviceUrls[index]}`);
              const direction = index % 2 === 0 ? 'left' : 'right';

              return (
                <AnimatedCard
                  key={service.id}
                  direction={direction}
                  delay={index * 0.08}
                  as="article"
                  className="h-full"
                >
                  <Link
                    href={serviceUrl}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-teal-500/30 bg-slate-950/70 shadow-[0_35px_80px_-40px_rgba(45,212,191,0.45)] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/70"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <div
                        className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 group-focus-visible:scale-110"
                        style={{ backgroundImage: `url(${(service as any).image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/40 transition-opacity duration-500 group-hover:opacity-80 group-focus-visible:opacity-80" />
                    </div>

                    <div className="relative flex flex-1 flex-col justify-end p-6">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-2xl font-semibold tracking-tight text-white drop-shadow-2xl md:text-3xl">
                          {service.title}
                        </h3>
                        <ChevronRight className="h-6 w-6 text-teal-300 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                      </div>

                      <p className="mt-5 max-w-sm text-base text-gray-200 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        {service.description}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
                        {lang === 'de' ? 'Mehr erfahren' : 'Learn more'}
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Detail */}

      {/* References Slider */}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
        <ReferencesSlider lang={lang} />
      </Suspense>

      {/* CTA Band */}
      <section className="bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 py-16 text-white shadow-2xl shadow-teal-500/30">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SlideIn direction="up" delay={0.1}>
            <h2 className="text-3xl font-bold drop-shadow-lg">
            {lang === 'de' ? 'Bereit für den nächsten Schritt?' : 'Ready for the next step?'}
          </h2>
          </SlideIn>
          <SlideIn direction="up" delay={0.2}>
            <p className="mt-2 text-white/95 text-lg">
            {lang === 'de'
              ? 'Sprechen wir über messbare Ergebnisse – passend zu Ihren Zielen.'
              : "Let's talk measurable outcomes – aligned to your goals."}
          </p>
          </SlideIn>
          <SlideIn direction="up" delay={0.3}>
          <a
            href={localePath('/#contact')}
              className="mt-6 inline-block rounded-2xl bg-white px-8 py-4 font-bold text-teal-600 shadow-xl hover:bg-gray-100 hover:scale-105 transition-transform"
          >
            {lang === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}
          </a>
          </SlideIn>
        </div>
      </section>


      {/* Contact with Form */}
      <ContactFormSection />

      {/* Meeting/Calendly */}
      <MeetingCalendlySection />

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <h4 className="mb-2 font-semibold">{footer.quickLinks.title}</h4>
            <ul className="space-y-1 text-white/90">
              {footer.quickLinks.items.map((link) => (
                <li key={link.href}>
                  <a className="hover:underline" href={localePath(link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">{footer.contact.title}</h4>
            <ul className="space-y-1 text-white/90">
              <li><a className="hover:underline" href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a></li>
              <li><a className="hover:underline" href={`tel:${footer.contact.phone}`}>{footer.contact.phone}</a></li>
              <li className="text-white/70">{footer.contact.address}</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">{footer.social.title}</h4>
            <ul className="space-y-1 text-white/90">
              <li><a className="hover:underline" href={footer.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="hover:underline" href={footer.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a className="hover:underline" href={footer.social.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="bg-black/40 py-4 text-center text-sm text-white/80">
          {footer.copyright}
        </div>
      </footer>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Mobile menu
// ────────────────────────────────────────────────────────────────────────────────
function LangMenuMobile({ lang, switchLang, items }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden flex items-center gap-2">
      <button
        className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menü umschalten"
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <div className="absolute right-4 top-14 z-50 rounded-2xl border bg-white shadow-md p-3 min-w-[220px]">
          <nav className="flex flex-col gap-2">
            {items.map((it: any) => (
              <a key={it.id} href={it.id === 'caseslink' ? `/${lang}/cases` : `#${it.id}`} className="py-2 text-gray-700" onClick={() => setOpen(false)}>
                {lang === 'de' ? it.de : it.en}
              </a>
            ))}
            <button onClick={switchLang} className="mt-2 rounded-2xl border px-3 py-2 text-sm hover:bg-gray-50">
              {lang === "de" ? "EN" : "DE"}
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Cases Page – /:lng/cases
// ────────────────────────────────────────────────────────────────────────────────
export function CasesPage() {
  const { lang, localePath } = useLanguage();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [ind, setInd] = useState("all");

  const CASES = casesData.map(c => ({
    id: c.slug,
    title: lang === 'de' ? c.titleDe : c.titleEn,
    summary: lang === 'de' ? c.subtitleDe : c.subtitleEn,
    category: c.category.toLowerCase(),
    industry: c.industry.toLowerCase(),
    impact: lang === 'de' ? c.resultsDe[0] : c.resultsEn[0],
    href: `/cases/${c.slug}`,
  }));

  const filtered = CASES.filter(c =>
    (cat === 'all' || c.category === cat) &&
    (ind === 'all' || c.industry === ind) &&
    (q.trim() === '' || (c.title + ' ' + c.summary).toLowerCase().includes(q.toLowerCase()))
  );

  const title = 'Cases & Angebote – Quantiva Advisory';
  const desc = 'Ausgewählte Cases und Angebote: Cloud, Datenqualität, Integration – mit messbarem Impact.';
  const canonical = absUrl(localePath('/cases'));
  const img = absUrl('/assets/og-cases.jpg');

  return (
    <main className="min-h-screen bg-white">
      {/* Metadata handled by Next.js */}
      
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {lang === 'de' ? 'Angebote & Cases' : 'Offers & Cases'}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-3 text-gray-600 max-w-2xl">
            {lang === 'de' ? 'Ein Auszug unserer Themen – mit klarem Outcome und Beispiel‑Implementierungen.' : 'A selection of our topics – with clear outcomes and example implementations.'}
          </motion.p>

          {/* Controls */}
          <div className="mt-8 flex flex-col md:flex-row gap-3 md:items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={lang === 'de' ? 'Suchen (z. B. BTP, Audit, API)' : 'Search (e.g., BTP, audit, API)'}
              className="w-full md:w-72 rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-teal-600"
            />
            <select value={cat} onChange={(e)=>setCat(e.target.value)} className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-600">
              <option value="all">{lang==='de'?'Alle Kategorien':'All categories'}</option>
              <option value="cloud">Cloud</option>
              <option value="data">{lang==='de'?'Daten':'Data'}</option>
              <option value="integration">Integration</option>
            </select>
            <select value={ind} onChange={(e)=>setInd(e.target.value)} className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-teal-600">
              <option value="all">{lang==='de'?'Alle Branchen':'All industries'}</option>
              <option value="pharma">Pharma</option>
              <option value="healthcare">Healthcare</option>
              <option value="logistics">{lang==='de'?'Logistik':'Logistics'}</option>
            </select>
          </div>

          {/* Grid */}
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((c, i) => (
              <motion.a
                key={c.id}
                href={localePath(c.href)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="block rounded-2xl border bg-white shadow-sm hover:shadow-lg transition overflow-hidden group"
              >
                <div className="h-40 bg-gradient-to-br from-teal-100 to-white" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-700">{c.title}</h3>
                  <p className="mt-2 text-gray-600">{c.summary}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{c.impact}</span>
                    <span className="inline-flex items-center gap-1 text-teal-700 font-medium">{lang==='de'?'Mehr':'More'} <ChevronRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </motion.a>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-gray-500">{lang==='de'?'Keine Einträge – Filter anpassen oder Suchbegriff ändern.':'No entries – adjust filters or search term.'}</div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <a href={localePath('/#contact')} className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 text-white px-6 py-3 text-base font-medium shadow hover:bg-teal-700">
              {lang==='de'?'Unverbindlich sprechen':'Talk to us'} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Case Detail Page – /:lng/cases/:slug
// ────────────────────────────────────────────────────────────────────────────────
export function CaseDetailPage() {
  const { lang, localePath } = useLanguage();

  // read slug from path
  const slug = (typeof window !== 'undefined') ? window.location.pathname.split('/').filter(Boolean).pop() || '' : '';
  const caseData = casesData.find(c => c.slug === slug) as any;

  // Track case view
  useEffect(() => {
    if (caseData && slug) {
      analytics.trackCaseView(slug, caseData.category || 'unknown');
    }
  }, [slug, caseData]);

  if (!caseData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{lang==='de'?'Case nicht gefunden':'Case not found'}</h1>
          <div className="mt-6 flex gap-3 justify-center">
            <a href={localePath('/cases')} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2">Cases</a>
            <a href={localePath('/')} className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 text-white px-4 py-2">{lang==='de'?'Startseite':'Home'}</a>
          </div>
        </div>
      </main>
    );
  }

  const pageTitleText = lang === 'de' ? caseData.titleDe : caseData.titleEn;
  const subtitle = lang === 'de' ? caseData.subtitleDe : caseData.subtitleEn;
  const desc = `${pageTitleText} – ${subtitle}`;
  const canonical = absUrl(localePath(`/cases/${caseData.slug}`));
  // Use generated OG image if available, fallback to hero image or default
  const ogCandidate = `/assets/og/${caseData.slug}.jpg`;
  const image = caseData.heroImage ? ogCandidate : '/assets/og-default.jpg';

  const goals = lang === 'de' ? caseData.goalsDe : caseData.goalsEn;
  const solution = lang === 'de' ? caseData.solutionDe : caseData.solutionEn;
  const results = lang === 'de' ? caseData.resultsDe : caseData.resultsEn;
  const quote = caseData.quote && (lang === 'de' ? caseData.quote.textDe : caseData.quote.textEn);

  return (
    <main className="min-h-screen bg-white">
      {/* Metadata handled by Next.js */}
      
      {/* Hero */}
      <section className="relative h-[65vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        {(caseData as any).heroMedia ? (
          <video
            src={(caseData as any).heroMedia}
            poster={caseData.heroImage}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image 
            src={caseData.heroImage} 
            alt={pageTitleText} 
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 px-6 max-w-4xl text-center">
          <nav aria-label="breadcrumb" className="mb-3 text-white/80 text-xs md:text-sm">
            <a className="hover:underline" href={localePath('/')}>{lang==='de'?'Home':'Home'}</a>
            <span className="mx-2">/</span>
            <a className="hover:underline" href={localePath('/cases')}>{lang==='de'?'Cases':'Cases'}</a>
            <span className="mx-2">/</span>
            <span aria-current="page" className="opacity-90">{pageTitleText}</span>
          </nav>
          <div className="mb-4 flex items-center justify-center gap-3 text-xs md:text-sm text-white/90">
            <span className="rounded-full bg-white/10 px-3 py-1 border border-white/20">{lang === 'de' ? 'Kategorie' : 'Category'}: {(caseData as any).category}</span>
            <span className="rounded-full bg-white/10 px-3 py-1 border border-white/20">{lang === 'de' ? 'Branche' : 'Industry'}: {(caseData as any).industry}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">{pageTitleText}</h1>
          <p className="mt-3 md:mt-4 text-white/90 text-lg md:text-xl">{subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{lang === 'de' ? 'Ziele & Herausforderungen' : 'Goals & challenges'}</h2>
              <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
                {goals.map((g: string, i: number) => (<li key={i}>{g}</li>))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{lang === 'de' ? 'Vorgehen & Lösung' : 'Approach & solution'}</h2>
              <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
                {solution.map((s: string, i: number) => (<li key={i}>{s}</li>))}
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">{lang === 'de' ? 'Ergebnisse' : 'Results'}</h2>
            <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((r: string, i: number) => (
                <div key={i} className="rounded-xl border p-4 text-gray-800 bg-white shadow-sm">{r}</div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Tech‑Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(caseData as any).tech?.map((k: string) => (
                <span key={k} className="rounded-full border px-3 py-1 text-sm text-gray-700 bg-white">{k}</span>
              ))}
            </div>
          </motion.div>

          {quote && (
            <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 border-l-4 border-teal-600 pl-4 text-gray-800 italic">
              &ldquo;{quote}&rdquo;
              {(caseData as any).quote?.author && (
                <footer className="not-italic mt-2 text-gray-600">— {(caseData as any).quote.author}</footer>
              )}
            </motion.blockquote>
          )}

          <div className="mt-14 flex flex-wrap gap-3">
            <a href={localePath('/#contact')} className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 text-white px-5 py-3 text-sm shadow hover:bg-teal-700">
              {lang === 'de' ? 'Projekt anfragen' : 'Request project'} <ArrowRight className="h-4 w-4" />
            </a>
            <a href={localePath('/cases')} className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm hover:bg-gray-50">
              {lang === 'de' ? '← Zurück zu Cases' : '← Back to cases'}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}