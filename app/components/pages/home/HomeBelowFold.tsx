'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Mail, Phone } from 'lucide-react';
import { getIndustryShowcase } from '../../../lib/data/industries';
import type { IndustryShowcase as IndustryItem } from '../../../lib/data/industries';
import type { Lang, Venture } from '../../../lib/data/projects';
import { videoPosterFor } from '../../../lib/videoPoster';
import HomeFilmLayer from './HomeFilmLayer';
import { submitContact, validateContactClient } from '../../../lib/submitContact';
import {
  ACCENT,
  CALENDLY_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  EASE,
  FILM_INTERLUDE,
  SERVICE_META,
  SOCIAL_LINKS,
  VENTURE_GROUPS,
  type ContactCopy,
  type FooterCopy,
  type HomeCopy,
  type MeetingCopy,
  type VentureGroup,
} from './homeCopy';

/** Kapitel-Marker im Filmvorspann-Stil: dünne Linie + Mono-Caption. */
function ChapterMark({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: EASE }}
      className="flex items-center gap-6"
    >
      <span aria-hidden="true" className="h-px w-10 bg-white/25" />
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.45em] text-gray-400">
        {children}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
    </motion.div>
  );
}

function IndustryCardMedia({
  image,
  video,
  splitVideos,
  playbackRate = 1,
}: Pick<IndustryItem, 'image' | 'video' | 'splitVideos' | 'playbackRate'>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);
  const sources = splitVideos ?? (video ? [video] : []);
  const showVideo = sources.length > 0 && !reduceMotion;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !showVideo) return;

    const clips = Array.from(wrapper.querySelectorAll('video'));
    clips.forEach((clip) => {
      clip.playbackRate = playbackRate;
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        clips.forEach((clip) => {
          if (entry.isIntersecting) {
            clip.preload = 'metadata';
            clip.play().catch(() => {});
          } else {
            clip.pause();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(wrapper);
    return () => io.disconnect();
  }, [showVideo, playbackRate]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {showVideo ? (
        <div className="flex h-full w-full">
          {sources.map((src) => (
            <video
              key={src}
              src={src}
              poster={videoPosterFor(src) ?? (sources.length === 1 && image ? image : undefined)}
              muted
              loop
              playsInline
              preload="none"
              className={`h-full min-w-0 flex-1 object-cover ${
                reduceMotion ? '' : 'transition-transform duration-700 ease-out group-hover:scale-[1.04]'
              }`}
            />
          ))}
        </div>
      ) : image && !imageFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className={`h-full w-full object-cover ${
            reduceMotion ? '' : 'transition-transform duration-700 ease-out group-hover:scale-[1.04]'
          }`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background: `radial-gradient(80% 70% at 60% 30%, ${ACCENT}18 0%, transparent 55%), #0a1018`,
          }}
        />
      )}
    </div>
  );
}

function IndustryCard({
  industry,
  lang,
  index,
  projectsLabel,
  featured,
  wide,
}: {
  industry: IndustryItem;
  lang: Lang;
  index: number;
  projectsLabel: string;
  featured: boolean;
  wide?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
      className={wide ? 'md:col-span-2' : undefined}
    >
      <Link
        ref={ref}
        href={`/${lang}/industries/${industry.slug}`}
        onMouseMove={onMouseMove}
        className={`group relative flex h-full overflow-hidden rounded-lg border border-white/10 bg-[#04060b] transition-colors duration-500 hover:border-white/25 ${
          featured
            ? 'min-h-[22rem] sm:min-h-[26rem] lg:min-h-[34rem]'
            : 'min-h-[20rem] sm:min-h-[22rem] lg:min-h-[26rem]'
        }`}
      >
        <IndustryCardMedia
          image={industry.image}
          video={industry.video}
          splitVideos={industry.splitVideos}
          playbackRate={industry.playbackRate}
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${ACCENT}24 0%, transparent 65%)`,
          }}
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 z-20 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: ACCENT }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(to top, #04060bF2 0%, #04060b99 38%, #04060b26 68%, transparent 86%)' }}
        />

        <div className="relative z-20 mt-auto flex w-full flex-col p-6 md:p-8">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className={`mt-3 font-light tracking-tight text-white ${
              featured ? 'text-3xl md:text-[2.35rem]' : 'text-2xl md:text-3xl'
            }`}
          >
            {industry.title}
          </h3>
          <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-white/65">
            {industry.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/65 transition-colors duration-300 group-hover:text-white">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
            {industry.projects}+ {projectsLabel}
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function IndustryShowcaseSection({ copy, lang }: { copy: HomeCopy['industries']; lang: Lang }) {
  const industries = getIndustryShowcase(lang);
  const oddTail = industries.length % 2 === 1;

  return (
    <section id="industries" className="scroll-mt-24 py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <ChapterMark>{copy.chapter}</ChapterMark>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-8 text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white"
        >
          {copy.title}
        </motion.h2>
        <p className="mt-4 max-w-xl font-light text-gray-400">{copy.sub}</p>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {industries.map((industry, i) => (
            <IndustryCard
              key={industry.slug}
              industry={industry}
              lang={lang}
              index={i}
              projectsLabel={copy.projectsLabel}
              featured={i < 2}
              wide={oddTail && i === industries.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Venture-Showcase (Filter-Tabs + Glow-Karten) ---------- */

function VentureCard({ venture, lang, featured }: { venture: Venture; lang: Lang; featured: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={featured ? 'sm:col-span-2' : undefined}
    >
      <Link
        ref={ref}
        href={`/${lang}/cases/${venture.slug}`}
        onMouseMove={onMouseMove}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/25"
      >
        {/* Mouse-Follow-Glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${venture.accent}1f 0%, transparent 65%)`,
          }}
        />
        {/* Akzentlinie oben */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 z-20 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: venture.accent }}
        />

        {/* Logo-Motiv */}
        <div
          className={`relative overflow-hidden ${featured ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}
          style={{ background: venture.logoBg }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={venture.logo}
            alt={venture.name}
            className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.05] md:p-8"
            loading="lazy"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #04060bCC 0%, transparent 45%)' }}
          />
          <span
            className="absolute bottom-4 left-5 font-mono text-[0.6rem] uppercase tracking-[0.3em]"
            style={{ color: venture.accent }}
          >
            {venture.category}
          </span>
        </div>

        {/* Text */}
        <div className="relative z-10 flex flex-1 flex-col p-6">
          <h3 className={`font-light tracking-tight text-white ${featured ? 'text-3xl' : 'text-2xl'}`}>
            {venture.name}
          </h3>
          <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-gray-400">
            {featured ? venture.intro : venture.tagline}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gray-600 transition-colors duration-300 group-hover:text-white">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: venture.accent }} />
            {venture.verb}
            <ArrowUpRight className="ml-auto h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function VentureShowcase({
  copy,
  ventures,
  lang,
}: {
  copy: HomeCopy['ventures'];
  ventures: Venture[];
  lang: Lang;
}) {
  const [active, setActive] = useState<VentureGroup | 'all'>('all');
  const visible = active === 'all' ? ventures : ventures.filter((v) => VENTURE_GROUPS[v.slug] === active);

  return (
    <section className="py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <ChapterMark>{copy.chapter}</ChapterMark>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white"
            >
              {copy.title}
            </motion.h2>
            <p className="mt-4 max-w-xl font-light text-gray-400">{copy.sub}</p>
          </div>
        </div>

        {/* Filter-Tabs */}
        <div className="mt-12 flex flex-wrap gap-2">
          {copy.tabs.map((tab) => {
            const isActive = active === tab.id;
            const count =
              tab.id === 'all'
                ? ventures.length
                : ventures.filter((v) => VENTURE_GROUPS[v.slug] === tab.id).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative rounded-full border px-5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? 'border-transparent text-black'
                    : 'border-white/15 text-gray-400 hover:border-white/40 hover:text-white'
                }`}
                style={isActive ? { background: ACCENT } : undefined}
              >
                {tab.label}
                <span className={`ml-2 ${isActive ? 'text-black/60' : 'text-gray-600'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Karten */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((v, i) => (
              <VentureCard
                key={v.slug}
                venture={v}
                lang={lang}
                featured={active === 'all' && i === 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex justify-end">
          <Link
            href={`/${lang}/cases`}
            className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white"
          >
            {copy.allProjects}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Kontaktformular (Editorial: Unterstrich-Felder) ---------- */

interface ContactFormState {
  name: string;
  email: string;
  msg: string;
}

function ContactSection({ copy, lang }: { copy: ContactCopy; lang: Lang }) {
  const [form, setForm] = useState<ContactFormState>({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState<'ok' | 'error' | null>(null);
  const [errorText, setErrorText] = useState(copy.error);
  const [sending, setSending] = useState(false);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.msg.trim(),
        lang,
      };
      const clientError = validateContactClient(payload);
      if (clientError) {
        setSent('error');
        setErrorText(clientError);
        return;
      }

      setSending(true);
      setSent(null);
      try {
        const result = await submitContact(payload);
        if (!result.ok) {
          setSent('error');
          setErrorText(result.error || copy.error);
          return;
        }
        setSent('ok');
        setForm({ name: '', email: '', msg: '' });
      } catch {
        setSent('error');
        setErrorText(copy.error);
      } finally {
        setSending(false);
      }
    },
    [copy.error, form, lang],
  );

  const lineInput =
    'w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 text-lg text-white placeholder-gray-600 transition-colors focus:border-teal-400 focus:outline-none focus:ring-0';

  return (
    <section id="contact" className="scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-6">
        <ChapterMark>{copy.chapter}</ChapterMark>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-8 text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white"
        >
          {copy.title}
        </motion.h2>
        <p className="mt-6 max-w-xl font-light text-gray-400">{copy.sub}</p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          onSubmit={onSubmit}
          className="mt-16 grid gap-10 sm:grid-cols-2"
          noValidate
        >
          <div>
            <label htmlFor="home-name" className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gray-400">
              {copy.name}
            </label>
            <input
              id="home-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={lineInput}
              placeholder="Max Mustermann"
            />
          </div>
          <div>
            <label htmlFor="home-email" className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gray-400">
              {copy.email}
            </label>
            <input
              id="home-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={lineInput}
              placeholder="name@example.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="home-msg" className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gray-400">
              {copy.message}
            </label>
            <textarea
              id="home-msg"
              rows={4}
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
              className={`${lineInput} resize-none`}
              placeholder="…"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
            <button
              type="submit"
              disabled={sending}
              className="group relative overflow-hidden rounded-full border px-10 py-4 font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-black disabled:opacity-60"
              style={{ borderColor: ACCENT }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
                style={{ background: ACCENT }}
              />
              <span className="relative text-sm">{copy.submit}</span>
            </button>
            {sent === 'ok' && <span style={{ color: ACCENT }}>{copy.success}</span>}
            {sent === 'error' && <span className="text-red-400">{errorText}</span>}
          </div>
        </motion.form>

        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-white/10 pt-8 text-gray-300">
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-3 font-light transition hover:text-white">
            <Mail className="h-4 w-4" style={{ color: ACCENT }} />
            {CONTACT_EMAIL}
          </a>
          {CONTACT_PHONE_HREF ? (
            <a href={`tel:${CONTACT_PHONE_HREF}`} className="inline-flex items-center gap-3 font-light transition hover:text-white">
              <Phone className="h-4 w-4" style={{ color: ACCENT }} />
              {CONTACT_PHONE_DISPLAY}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------- Calendly ---------- */

function MeetingSection({ copy }: { copy: MeetingCopy }) {
  useEffect(() => {
    const src = 'https://assets.calendly.com/assets/external/widget.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
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
    <section id="meeting" className="scroll-mt-24 border-t border-white/10 py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <ChapterMark>{copy.chapter}</ChapterMark>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-8 text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white"
        >
          {copy.title}
        </motion.h2>
        <p className="mt-6 max-w-xl font-light text-gray-400">{copy.sub}</p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-14 overflow-hidden rounded-sm border border-white/10 bg-white"
          style={{ boxShadow: `0 60px 160px -60px ${ACCENT}33` }}
        >
          <div
            className="calendly-inline-widget"
            data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`}
            style={{ minWidth: 320, height: 720, width: '100%' }}
          />
        </motion.div>

        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-gray-400">{copy.fallbackHint}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white"
          >
            {copy.fallbackButton}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function HomeFooter({ copy }: { copy: FooterCopy }) {
  return (
    <footer className="border-t border-white/10 bg-[#03050a]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
            {copy.quickLinksTitle}
          </h4>
          <ul className="mt-5 space-y-2.5">
            {copy.quickLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className="text-sm font-light text-gray-300 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
            {copy.contactTitle}
          </h4>
          <ul className="mt-5 space-y-2.5 text-sm font-light text-gray-300">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </li>
            {CONTACT_PHONE_HREF ? (
              <li>
                <a href={`tel:${CONTACT_PHONE_HREF}`} className="transition hover:text-white">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
            ) : (
              <li>{copy.phoneOnRequest}</li>
            )}
            <li>
              <Link href={copy.legal.imprint.href} className="transition hover:text-white">
                {copy.legal.imprint.label}
              </Link>
            </li>
            <li>
              <Link href={copy.legal.privacy.href} className="transition hover:text-white">
                {copy.legal.privacy.label}
              </Link>
            </li>
          </ul>
        </div>
        {SOCIAL_LINKS.length > 0 ? (
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
              {copy.socialTitle}
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm font-light text-gray-300">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/5 py-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gray-600">
        <span>{copy.copyright}</span>
        <Link href={copy.legal.imprint.href} className="transition hover:text-white">
          {copy.legal.imprint.label}
        </Link>
        <Link href={copy.legal.privacy.href} className="transition hover:text-white">
          {copy.legal.privacy.label}
        </Link>
      </div>
    </footer>
  );
}

export default function HomeBelowFold({
  copy,
  lang,
  ventures,
}: {
  copy: HomeCopy;
  lang: Lang;
  ventures: Venture[];
}) {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-32 md:py-44">
        <ChapterMark>{copy.manifesto.chapter}</ChapterMark>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mt-10 text-[clamp(1.7rem,4vw,3.2rem)] font-light leading-[1.3] tracking-tight text-gray-200"
        >
          {copy.manifesto.lead.map((part, i) => {
            const isAccent = copy.manifesto.accentWords.includes(part);
            return (
              <span key={i} className={isAccent ? 'italic' : undefined} style={isAccent ? { color: ACCENT } : undefined}>
                {part}{' '}
              </span>
            );
          })}
        </motion.p>
      </section>

      <section className="relative h-[70svh] overflow-hidden md:h-[85svh]">
        <div className="absolute -inset-y-[12%] inset-x-0">
          <HomeFilmLayer src={FILM_INTERLUDE} mode="lazy" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #04060b 0%, transparent 25%, transparent 75%, #04060b 100%), rgba(4,6,11,0.35)' }}
        />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="max-w-3xl text-center"
          >
            <p className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-light italic leading-snug text-white">
              „{copy.interlude.quote}“
            </p>
            <footer className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.45em] text-gray-400">
              — {copy.interlude.source}
            </footer>
          </motion.blockquote>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 py-32 md:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <ChapterMark>{copy.services.chapter}</ChapterMark>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mt-8 text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white"
          >
            {copy.services.title}
          </motion.h2>

          <div className="mt-16">
            {copy.services.items.map((item, i) => (
              <motion.div
                key={SERVICE_META[i].path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease: EASE }}
              >
                <Link
                  href={`/${lang}${SERVICE_META[i].path}`}
                  className="group flex items-baseline gap-6 border-t border-white/10 py-7 transition-colors duration-300 last:border-b hover:border-white/30 md:gap-10 md:py-8"
                  style={{ ['--acc' as never]: SERVICE_META[i].accent }}
                >
                  <span className="font-mono text-xs text-gray-600 transition-colors duration-300 group-hover:text-[color:var(--acc)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                    <span className="text-2xl font-light tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2 md:w-[46%] md:text-3xl">
                      {item.name}
                    </span>
                    <span className="flex-1 text-sm font-light leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                      {item.desc}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 self-center text-gray-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--acc)]" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <IndustryShowcaseSection copy={copy.industries} lang={lang} />
      <VentureShowcase copy={copy.ventures} ventures={ventures} lang={lang} />

      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <ChapterMark>{copy.principles.chapter}</ChapterMark>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {copy.principles.items.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              >
                <span aria-hidden="true" className="block h-px w-12" style={{ background: ACCENT }} />
                <h3 className="mt-6 text-xl font-light tracking-tight text-white">{p.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-gray-400">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection copy={copy.contact} lang={lang} />
      <MeetingSection copy={copy.meeting} />
      <HomeFooter copy={copy.footer} />
    </>
  );
}
