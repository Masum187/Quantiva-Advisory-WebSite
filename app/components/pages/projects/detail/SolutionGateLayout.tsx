'use client';

/**
 * SolutionGate — „Pipeline“-Layout.
 * Zentrierter Hero, Scroll-Statement, Spotlight-Problemkarten und ein
 * horizontal scrollender Sticky-Pipeline-Abschnitt (Signal → Outcome).
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import VentureCanvas from '../VentureCanvas';
import type { Venture, Lang } from '../../../../lib/data/projects';
import {
  EASE,
  ScrollProgress,
  Topbar,
  LetterHeadline,
  MaskedHeadline,
  TiltCard,
  LogoPanel,
  SpotlightCard,
  MarqueeBand,
  ScrollStatement,
  GhostNumber,
  NextFooter,
  SectionLabel,
  AccentOrbs,
} from './shared';

const COPY: Record<
  Lang,
  { why: string; problemSpace: string; how: string; principles: string; scrollHint: string }
> = {
  de: {
    why: 'Warum',
    problemSpace: 'Problemraum',
    how: 'Funktionsweise',
    principles: 'Prinzipien',
    scrollHint: 'Scrollen, um die Pipeline zu durchlaufen',
  },
  en: {
    why: 'Why',
    problemSpace: 'Problem space',
    how: 'How it works',
    principles: 'Principles',
    scrollHint: 'Scroll to move through the pipeline',
  },
};

export default function SolutionGateLayout({
  venture,
  next,
  lang = 'de',
}: {
  venture: Venture;
  next: Venture;
  lang?: Lang;
}) {
  const copy = COPY[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const pipeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const accent = venture.accent;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const canvasScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, -90]);

  // Horizontale Pipeline: vertikaler Scroll → horizontale Bewegung
  const { scrollYProgress: pipeProgress } = useScroll({
    target: pipeRef,
    offset: ['start start', 'end end'],
  });
  const pipeX = useTransform(pipeProgress, [0.05, 0.95], ['2%', '-62%']);
  const lineScale = useTransform(pipeProgress, [0.05, 0.95], [0, 1]);

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <ScrollProgress accent={accent} />

      {/* HERO — zentriert über Netzwerk-Canvas */}
      <section ref={heroRef} className="relative flex h-[100svh] flex-col overflow-hidden">
        <motion.div style={{ scale: reduceMotion ? 1 : canvasScale }} className="absolute inset-0">
          <VentureCanvas effect="network" accent={accent} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(70% 60% at 50% 40%, transparent 0%, #05070f 100%), radial-gradient(40% 35% at 50% 45%, ${accent}14, transparent 70%)`,
            }}
          />
        </motion.div>
        <AccentOrbs accent={accent} />
        <Topbar lang={lang} />
        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity, y: reduceMotion ? 0 : heroY }}
          className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mb-10"
          >
            <TiltCard
              accent={accent}
              className="relative w-[240px] overflow-hidden rounded-2xl border border-white/15 md:w-[320px]"
            >
              <LogoPanel venture={venture} sizes="(max-width: 768px) 240px, 320px" />
            </TiltCard>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-xs uppercase tracking-[0.35em]"
            style={{ color: accent }}
          >
            <span className="opacity-60">[</span> {venture.category}{' '}
            <span className="opacity-60">]</span>
          </motion.p>
          <h1 className="mt-5 text-[clamp(2.8rem,9vw,7.5rem)] font-bold uppercase leading-[0.92] tracking-tight">
            <LetterHeadline text={venture.name} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="mt-6 max-w-xl text-lg text-gray-300 md:text-xl"
          >
            {venture.tagline}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="relative z-10 flex justify-center pb-8"
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-5 w-5 text-gray-500" />
          </motion.span>
        </motion.div>
      </section>

      {/* STATEMENT */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-40">
        <div className="mb-10">
          <SectionLabel num="01" accent={accent}>
            {copy.why}
          </SectionLabel>
        </div>
        <ScrollStatement text={venture.intro} />
      </section>

      <MarqueeBand venture={venture} />

      {/* PROBLEME — Spotlight-Karten */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel num="02" accent={accent}>
            {copy.problemSpace}
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.problemTitle} />
          </h2>
          <div className="mt-16 space-y-4">
            {venture.problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <SpotlightCard
                  accent={accent}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-white/20 md:p-10"
                >
                  <GhostNumber index={i} />
                  <h3 className="text-xl font-bold md:text-2xl" style={{ color: accent }}>
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-3xl leading-relaxed text-gray-300">{p.text}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE — horizontaler Sticky-Scroll */}
      <section ref={pipeRef} className="relative h-[300svh] border-t border-white/10">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-6">
            <SectionLabel num="03" accent={accent}>
              {copy.how}
            </SectionLabel>
            <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
              <MaskedHeadline text={venture.flowTitle} />
            </h2>
          </div>
          <div className="relative mt-14">
            {/* Pipeline-Linie */}
            <motion.span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[27px] h-px origin-left"
              style={{ background: `${accent}44`, scaleX: reduceMotion ? 1 : lineScale }}
            />
            <motion.div
              style={{ x: reduceMotion ? 0 : pipeX }}
              className="flex w-max gap-8 pl-[8vw] pr-[30vw]"
            >
              {venture.flow.map((s, i) => (
                <div key={i} className="w-[320px] shrink-0 md:w-[380px]">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full border font-mono text-lg font-bold"
                      style={{ borderColor: `${accent}66`, background: '#0a0f1d', color: accent }}
                    >
                      {i + 1}
                    </span>
                    {i < venture.flow.length - 1 && (
                      <ArrowRight className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                    <h3 className="text-xl font-bold" style={{ color: accent }}>
                      {s.label}
                    </h3>
                    <p className="mt-3 leading-relaxed text-gray-300">{s.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-gray-600">
            {copy.scrollHint}
          </p>
        </div>
      </section>

      {/* PRINZIPIEN */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel num="04" accent={accent}>
            {copy.principles}
          </SectionLabel>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {venture.principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                className="group relative flex items-baseline gap-6 overflow-hidden py-7 transition-transform duration-300 hover:translate-x-2 md:gap-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `${accent}88` }}
                />
                <span className="font-mono text-sm text-gray-600">
                  <span className="group-hover:hidden">P{String(i + 1).padStart(2, '0')}</span>
                  <span className="hidden group-hover:inline" style={{ color: accent }}>
                    P{String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <p className="flex-1 text-lg font-light leading-relaxed text-gray-200 md:text-xl">
                  {p}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NextFooter accent={accent} next={next} lang={lang} />
    </div>
  );
}
