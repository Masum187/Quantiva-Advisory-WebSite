'use client';

/**
 * Nuvora — „Layer Stack“-Layout.
 * Die sieben Schichten R1–R7 stapeln sich beim Scrollen als Sticky-Cards
 * übereinander — das Architekturmodell wird physisch erlebbar.
 * Prinzipien als Code-Block (Architecture Contract).
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, Layers } from 'lucide-react';
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
  ScrollStatement,
  NextFooter,
  SectionLabel,
} from './shared';

const CONTRACT = [
  'R1 represents.',
  'R2 decides.',
  'R3 determines current state.',
  'R4 computes capacity.',
  'R5 optimizes.',
  'R6 simulates.',
  'R7 learns from execution.',
];

const COPY: Record<
  Lang,
  {
    topbarLabel: string;
    why: string;
    problemSpace: string;
    how: string;
    flowNote: string;
    layerLabel: string;
    contractLabel: string;
  }
> = {
  de: {
    topbarLabel: 'Computational Model',
    why: 'Warum',
    problemSpace: 'Problemraum',
    how: 'Funktionsweise',
    flowNote:
      'Sieben Schichten, jede baut auf der vorherigen auf. Beim Scrollen stapelt sich das Modell — genau wie in der Architektur.',
    layerLabel: 'Layer',
    contractLabel: 'Architecture Contract',
  },
  en: {
    topbarLabel: 'Computational Model',
    why: 'Why',
    problemSpace: 'Problem space',
    how: 'How it works',
    flowNote:
      'Seven layers, each building on the one below. As you scroll, the model stacks up — exactly as it does in the architecture.',
    layerLabel: 'Layer',
    contractLabel: 'Architecture Contract',
  },
};

export default function NuvoraLayout({
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
  const reduceMotion = useReducedMotion();
  const accent = venture.accent;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#050b07] text-white">
      <ScrollProgress accent={accent} />

      {/* HERO — Schichtbänder hinter zentriertem Inhalt */}
      <section ref={heroRef} className="relative flex h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          <VentureCanvas effect="threads" accent={accent} />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(70% 60% at 50% 42%, transparent 0%, #050b07 100%), radial-gradient(35% 30% at 50% 48%, ${accent}12, transparent 70%)`,
          }}
        />
        {/* Aufsteigende Schichtbänder */}
        {!reduceMotion && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="absolute inset-x-[8%] h-px"
                style={{ bottom: `${12 + i * 9}%`, background: `${accent}${(3 - i) * 8 + 12}` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, delay: 0.6 + i * 0.2, ease: EASE }}
              />
            ))}
          </div>
        )}
        <Topbar label={copy.topbarLabel} lang={lang} />

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <TiltCard
              accent={accent}
              className="relative w-[250px] overflow-hidden rounded-2xl border border-white/15 md:w-[300px]"
            >
              <LogoPanel venture={venture} sizes="300px" />
            </TiltCard>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.35em]"
            style={{ color: accent }}
          >
            <Layers className="h-4 w-4" />
            {venture.category}
          </motion.p>
          <h1 className="mt-5 text-[clamp(3rem,9vw,7.5rem)] font-bold uppercase leading-[0.92] tracking-tight">
            <LetterHeadline text={venture.name} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
            className="mt-6 max-w-xl text-lg text-gray-300 md:text-xl"
          >
            {venture.tagline}
          </motion.p>
        </motion.div>

        <div className="relative z-10 flex justify-center pb-8">
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-5 w-5 text-gray-500" />
          </motion.span>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-36">
        <div className="mb-10">
          <SectionLabel num="01" accent={accent}>
            {copy.why}
          </SectionLabel>
        </div>
        <ScrollStatement text={venture.intro} />
      </section>

      {/* PROBLEME — drei Karten nebeneinander */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel num="02" accent={accent}>
            {copy.problemSpace}
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.problemTitle} />
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {venture.problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/20"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-bold"
                  style={{ background: `${accent}1a`, color: accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW — Sticky-Stack: R1–R7 stapeln sich */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <SectionLabel num="03" accent={accent}>
            {copy.how}
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.flowTitle} />
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-gray-400">{copy.flowNote}</p>

          <div className="mt-16">
            {venture.flow.map((s, i) => (
              <div key={i} className="sticky" style={{ top: `${96 + i * 44}px` }}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mb-6 rounded-2xl border p-7 shadow-2xl backdrop-blur-sm md:p-9"
                  style={{
                    background: `linear-gradient(135deg, #0a1410f2, #07100af6)`,
                    borderColor: `${accent}${30 + i * 8}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-md px-3 py-1 font-mono text-sm font-bold"
                      style={{ background: `${accent}1c`, color: accent }}
                    >
                      {s.label.split(' · ')[0]}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
                      {copy.layerLabel} {i + 1} / {venture.flow.length}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white md:text-2xl">
                    {s.label.split(' · ')[1] ?? s.label}
                  </h3>
                  <p className="mt-2 leading-relaxed text-gray-400">{s.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINZIPIEN — Architecture Contract als Code-Block */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <SectionLabel num="04" accent={accent}>
              {copy.contractLabel}
            </SectionLabel>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-8 overflow-hidden rounded-xl border border-white/15 bg-black/60"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-xs text-gray-500">architecture.contract</span>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
                className="space-y-2 p-6 font-mono text-sm leading-relaxed"
              >
                {CONTRACT.map((line, i) => (
                  <motion.p
                    key={i}
                    variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-gray-600">{String(i + 1).padStart(2, '0')}</span>{' '}
                    <span style={{ color: accent }}>{line.split(' ')[0]}</span>{' '}
                    <span className="text-gray-300">{line.split(' ').slice(1).join(' ')}</span>
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </div>
          <div className="space-y-6 md:pt-16">
            {venture.principles.slice(1).map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="border-l-2 pl-5 text-lg font-light leading-relaxed text-gray-200"
                style={{ borderColor: `${accent}55` }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <NextFooter accent={accent} next={next} lang={lang} />
    </div>
  );
}
