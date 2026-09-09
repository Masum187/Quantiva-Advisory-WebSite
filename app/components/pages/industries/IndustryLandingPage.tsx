'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Phone } from 'lucide-react';
import type { IndustryDetail } from '../../../lib/data/industryDetails';

interface IndustryLandingPageProps {
  industry: IndustryDetail;
  lang: 'de' | 'en';
}

/** Looping hero clips per industry (same footage as the homepage cards). */
const heroVideos: Record<string, string> = {
  'financial-services': '/assets/industries/finance.mp4',
  manufacturing: '/assets/industries/automotive.mp4',
  'health-life-sciences': '/assets/industries/health.mp4',
  'retail-ecommerce': '/assets/industries/retail-store.mp4',
};

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Headline that reveals word by word from a masked container. */
function MaskedHeadline({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? { y: 0 } : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: delay + i * 0.06, duration: 0.9, ease: easeOutExpo }}
            aria-hidden="true"
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** Filmbot-style bracketed eyebrow label: [ LABEL ] */
function BracketLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.35em] ${className}`}>
      <span className="text-teal-400">[</span>
      <span>{children}</span>
      <span className="text-teal-400">]</span>
    </span>
  );
}

/** Extracts the leading figure from a stat value, e.g. "+24 %" from "+24 % OEE ...". */
function splitStatValue(value: string): { big: string; rest: string } {
  const match = value.match(/^([+\-<>]?\s?\d+[.,]?\d*\s?%?)/);
  if (!match) return { big: value, rest: '' };
  return { big: match[1].trim(), rest: value.slice(match[0].length).trim() };
}

export default function IndustryLandingPage({ industry, lang }: IndustryLandingPageProps) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);

  // Scroll choreography: the hero video zooms in and the copy dissolves
  // while the visitor scrolls into the page.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduce) return;
    el.play().catch(() => {});
  }, [reduce]);

  const heroVideo = heroVideos[industry.slug];

  const t = {
    de: {
      focusKicker: 'Fokusthemen',
      statsKicker: 'Ergebnisse',
      statsTitle: 'Zahlen, die bleiben',
      capabilitiesKicker: 'Leistungen',
      capabilitiesTitle: 'Was wir liefern',
      casesKicker: 'Referenzen',
      casesTitle: 'Aus der Praxis',
      contactKicker: 'Kontakt',
      contactTitle: 'Lassen Sie uns sprechen',
      contactCta: 'Intro-Gespräch vereinbaren',
      contactSecondary: 'Alle Leistungen ansehen',
      scrollCue: 'Scrollen',
      andCounting: 'und mehr',
    },
    en: {
      focusKicker: 'Focus topics',
      statsKicker: 'Results',
      statsTitle: 'Numbers that stick',
      capabilitiesKicker: 'Capabilities',
      capabilitiesTitle: 'What we deliver',
      casesKicker: 'Client stories',
      casesTitle: 'Proven in practice',
      contactKicker: 'Contact',
      contactTitle: "Let's talk",
      contactCta: 'Schedule intro call',
      contactSecondary: 'View all services',
      scrollCue: 'Scroll',
      andCounting: 'and counting',
    },
  }[lang];

  // Decorative bar widths for the stat rows (Filmbot-style survey bars).
  const barWidths = ['88%', '68%', '78%'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ---------- Hero: full-bleed video, giant display type ---------- */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <motion.div style={{ scale: videoScale }} className="absolute inset-0">
          {heroVideo && videoOk && !reduce ? (
            <video
              ref={videoRef}
              src={heroVideo}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              onError={() => setVideoOk(false)}
              aria-hidden="true"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-teal-900/50 via-black to-black" />
          )}
        </motion.div>
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(45,212,191,0.18),_transparent_55%)]" />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 flex h-full flex-col justify-end"
        >
          <div className="mx-auto w-full max-w-7xl px-6 pb-20 md:pb-28">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <BracketLabel className="text-teal-200">{industry.hero.badge}</BracketLabel>
            </motion.div>
            <MaskedHeadline
              text={industry.hero.title}
              delay={0.15}
              className="mt-6 max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] font-black uppercase leading-[0.95] tracking-tight"
            />
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: easeOutExpo }}
              className="mt-6 max-w-2xl text-lg text-gray-200 md:text-xl"
            >
              {industry.hero.subtitle}
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 right-8 z-10 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 md:flex"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          {t.scrollCue}
          <span className="block h-8 w-px bg-white/40" />
        </motion.div>
      </section>

      {/* ---------- Technology ticker band ---------- */}
      <div className="industry-ticker overflow-hidden border-y border-white/10 bg-white/[0.03] py-4" aria-hidden="true">
        <div className="industry-ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {[...industry.technologies, ...industry.technologies].map((tech, i) => (
                <span
                  key={`${copy}-${tech}-${i}`}
                  className="flex items-center gap-6 px-6 font-mono text-sm uppercase tracking-[0.25em] text-gray-400"
                >
                  {tech}
                  <span className="text-teal-400">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Intro statement ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="max-w-4xl text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-snug text-white"
        >
          {industry.overview.introduction}
        </motion.p>
      </section>

      {/* ---------- Numbered focus sections (Filmbot "Audience Engine (01)") ---------- */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        {industry.overview.focusAreas.map((area, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <motion.article
              key={area.title}
              initial={reduce ? false : { opacity: 0, x: fromLeft ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: easeOutExpo }}
              className="grid items-center gap-8 border-t border-white/10 py-16 md:grid-cols-[1fr_2fr] md:py-20"
            >
              <div className={fromLeft ? '' : 'md:order-2 md:text-right'}>
                <span className="font-mono text-sm uppercase tracking-[0.3em] text-teal-300">
                  {t.focusKicker}
                  <span className="text-white/50">({String(index + 1).padStart(2, '0')})</span>
                </span>
                <div
                  className="mt-4 select-none text-[clamp(4rem,10vw,9rem)] font-black leading-none text-white/[0.06]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
              <div className={fromLeft ? '' : 'md:order-1'}>
                <h2 className="text-3xl font-bold md:text-5xl">{area.title}</h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">{area.description}</p>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* ---------- Stats: giant leading figure + survey-style bars ---------- */}
      <section className="border-y border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <BracketLabel className="text-gray-400">{t.statsKicker}</BracketLabel>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">{t.statsTitle}</h2>
          </motion.div>

          <div className="mt-16 space-y-12">
            {industry.stats.map((stat, index) => {
              const { big, rest } = splitStatValue(stat.value);
              return (
                <motion.div
                  key={stat.label}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: index * 0.12, ease: easeOutExpo }}
                >
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">{stat.label}</p>
                      <p className="mt-2 text-[clamp(3rem,7vw,5.5rem)] font-black leading-none text-teal-300">
                        {big}
                      </p>
                    </div>
                    {rest ? (
                      <p className="max-w-xs pb-2 text-right text-sm text-gray-400 md:text-base">{rest}</p>
                    ) : null}
                  </div>
                  <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-purple-500"
                      initial={reduce ? { width: barWidths[index % barWidths.length] } : { width: 0 }}
                      whileInView={{ width: barWidths[index % barWidths.length] }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 1.2, delay: 0.2 + index * 0.12, ease: easeOutExpo }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Capabilities as a feature menu list ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <BracketLabel className="text-gray-400">{t.capabilitiesKicker}</BracketLabel>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">{t.capabilitiesTitle}</h2>
        </motion.div>

        <div className="mt-14">
          {industry.capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: easeOutExpo }}
              className="group grid items-baseline gap-3 border-t border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[80px_1fr_1.2fr_48px] md:gap-8 md:py-10"
            >
              <span className="font-mono text-sm text-teal-300">
                ({String(index + 1).padStart(2, '0')})
              </span>
              <h3 className="text-2xl font-bold transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                {capability.title}
              </h3>
              <p className="text-gray-400 md:text-lg">{capability.description}</p>
              <ArrowUpRight
                className="hidden h-6 w-6 justify-self-end text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-300 md:block"
                aria-hidden="true"
              />
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </section>

      {/* ---------- Case studies as big quote panels ---------- */}
      <section className="border-t border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <BracketLabel className="text-gray-400">{t.casesKicker}</BracketLabel>
            <h2 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl">{t.casesTitle}</h2>
          </motion.div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {industry.caseStudies.map((caseStudy, index) => (
              <motion.blockquote
                key={caseStudy.client}
                initial={reduce ? false : { opacity: 0, y: 50, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: index * 0.15, ease: easeOutExpo }}
                className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-10 md:p-12"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl" aria-hidden="true" />
                <div>
                  <BracketLabel className="text-gray-400">{caseStudy.client}</BracketLabel>
                  <p className="mt-6 text-2xl font-bold leading-snug md:text-3xl">
                    &ldquo;{caseStudy.headline}&rdquo;
                  </p>
                  <p className="mt-5 text-gray-400 leading-relaxed">{caseStudy.description}</p>
                </div>
                <p className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-teal-400/30 bg-teal-500/10 px-5 py-2 text-sm font-semibold text-teal-200">
                  {caseStudy.impact}
                </p>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA + contact ---------- */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center text-[18vw] font-black uppercase leading-none text-white/[0.03]"
          aria-hidden="true"
        >
          {industry.hero.badge}
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <BracketLabel className="text-gray-400">{t.contactKicker}</BracketLabel>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
              {t.contactTitle}
            </h2>
          </motion.div>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_360px]">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: easeOutExpo }}
            >
              <p className="text-xl text-gray-300">
                {industry.contact.name} · {industry.contact.role}
              </p>
              <div className="mt-6 flex flex-col gap-3 text-gray-400">
                <a
                  href={`mailto:${industry.contact.email}`}
                  className="w-fit border-b border-white/20 pb-1 transition-colors hover:border-teal-400 hover:text-teal-300"
                >
                  {industry.contact.email}
                </a>
                {industry.contact.phone ? (
                  <p className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-teal-300" aria-hidden="true" />
                    {industry.contact.phone}
                  </p>
                ) : null}
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`mailto:${industry.contact.email}`}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 px-8 py-4 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-lg hover:shadow-teal-500/40"
                >
                  {t.contactCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={`/${lang}/#services`}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15"
                >
                  {t.contactSecondary}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.2, ease: easeOutExpo }}
              className="relative h-80 overflow-hidden rounded-3xl border border-white/10"
            >
              <Image
                src={industry.contact.image}
                alt={industry.contact.name}
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <p className="font-semibold text-white">{industry.contact.name}</p>
                <p className="text-sm text-gray-300">{industry.contact.role}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
