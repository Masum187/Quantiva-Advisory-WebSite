'use client';

/**
 * Veya — „Editorial Ascent“-Layout.
 * Monochrom, viel Weißraum, dünne Typografie, römische Ziffern.
 * Der Flow (Action → Evidence → Capability → Opportunity) ist eine
 * aufsteigende Treppe — Progression als visuelles Motiv.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import VentureCanvas from '../VentureCanvas';
import type { Venture, Lang } from '../../../../lib/data/projects';
import {
  EASE,
  ScrollProgress,
  Topbar,
  MaskedHeadline,
  TiltCard,
  LogoPanel,
  ScrollStatement,
  NextFooter,
} from './shared';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const COPY: Record<
  Lang,
  {
    topbarLabel: string;
    thesis: string;
    demarcation: string;
    graphLabel: string;
    cycleNote: string;
    constitution: string;
  }
> = {
  de: {
    topbarLabel: 'Workforce Progression',
    thesis: 'I — These',
    demarcation: 'II — Abgrenzung',
    graphLabel: 'III — Der Progressionsgraph',
    cycleNote: '… und der Kreislauf beginnt von vorn ↺',
    constitution: 'IV — Product Constitution',
  },
  en: {
    topbarLabel: 'Workforce Progression',
    thesis: 'I — Thesis',
    demarcation: 'II — Demarcation',
    graphLabel: 'III — The Progression Graph',
    cycleNote: '… and the cycle begins again ↺',
    constitution: 'IV — Product Constitution',
  },
};

export default function VeyaLayout({
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
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.96]);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <ScrollProgress accent="#ffffff" />

      {/* HERO — reduziert, große dünne Typo */}
      <section ref={heroRef} className="relative flex h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <VentureCanvas effect="network" accent="#9ca3af" />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(70% 60% at 50% 45%, transparent 0%, #050505 100%)' }}
        />
        <Topbar label={copy.topbarLabel} lang={lang} />

        <motion.div
          style={{
            opacity: reduceMotion ? 1 : heroOpacity,
            scale: reduceMotion ? 1 : heroScale,
          }}
          className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1.4, ease: EASE }}
            className="font-mono text-xs uppercase text-gray-400"
          >
            Action · Evidence · Capability · Opportunity
          </motion.p>
          <h1 className="mt-8 text-[clamp(4rem,15vw,12rem)] font-extralight uppercase leading-none tracking-[0.18em]">
            <MaskedHeadline text={venture.name} />
          </h1>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
            className="mt-8 block h-px w-40 bg-white/50"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="mt-8 max-w-md text-lg font-light text-gray-300"
          >
            {venture.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
            className="mt-12"
          >
            <TiltCard
              accent="#ffffff"
              className="relative w-[200px] overflow-hidden rounded-xl border border-white/20"
            >
              <LogoPanel venture={venture} sizes="200px" />
            </TiltCard>
          </motion.div>
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

      {/* STATEMENT — editorial zentriert */}
      <section className="mx-auto max-w-3xl px-6 py-32 text-center md:py-44">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.4em] text-gray-500">
          {copy.thesis}
        </p>
        <ScrollStatement
          text={venture.intro}
          className="text-[clamp(1.5rem,3.2vw,2.6rem)] font-extralight leading-relaxed"
        />
      </section>

      {/* PROBLEME — drei schmale Spalten mit Trennlinien */}
      <section className="border-t border-white/10 py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-mono text-xs uppercase tracking-[0.4em] text-gray-500">
            {copy.demarcation}
          </p>
          <h2 className="mt-6 text-center text-[clamp(1.8rem,4vw,3.2rem)] font-extralight tracking-wide">
            <MaskedHeadline text={venture.problemTitle} />
          </h2>
          <div className="mt-20 grid gap-14 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
            {venture.problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: EASE }}
                className="md:px-10"
              >
                <span className="font-mono text-4xl font-extralight text-gray-600">
                  {ROMAN[i]}
                </span>
                <h3 className="mt-6 text-xl font-light text-white">{p.title}</h3>
                <p className="mt-4 text-sm leading-loose text-gray-400">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW — aufsteigende Treppe */}
      <section className="border-t border-white/10 py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center font-mono text-xs uppercase tracking-[0.4em] text-gray-500">
            {copy.graphLabel}
          </p>
          <h2 className="mt-6 text-center text-[clamp(1.8rem,4vw,3.2rem)] font-extralight tracking-wide">
            <MaskedHeadline text={venture.flowTitle} />
          </h2>

          <div className="mt-24 space-y-2">
            {venture.flow.map((s, i) => {
              const indent = i * 8; // Treppenstufe in %
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                  className="relative"
                  style={{ marginLeft: `${indent}%`, width: `${100 - indent * 1.4}%` }}
                >
                  <div className="group flex items-center gap-6 border-t border-white/25 py-7 transition-colors hover:border-white md:gap-10">
                    <span className="font-mono text-sm text-gray-500">{ROMAN[i]}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-light tracking-wide text-white md:text-2xl">
                        {s.label}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
                        {s.desc}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 -rotate-45 text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-white" />
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 text-right font-mono text-xs uppercase tracking-[0.3em] text-gray-500"
          >
            {copy.cycleNote}
          </motion.p>
        </div>
      </section>

      {/* PRINZIPIEN — Constitution, zentriert */}
      <section className="border-t border-white/10 py-28 md:py-36">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-gray-500">
            {copy.constitution}
          </p>
          <div className="mt-16 space-y-12">
            {venture.principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <span className="font-mono text-sm text-gray-600">Art. {ROMAN[i]}</span>
                <p className="mt-3 text-xl font-extralight leading-relaxed text-gray-100 md:text-2xl">
                  {p}
                </p>
                <span className="mx-auto mt-8 block h-px w-16 bg-white/20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NextFooter accent={accent} next={next} lang={lang} />
    </div>
  );
}
