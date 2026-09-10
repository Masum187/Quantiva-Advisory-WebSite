'use client';

/**
 * Procuvera — „Control Tower“-Layout.
 * Split-Hero mit Risiko-Flag-Board, Probleme als 2×2-KPI-Grid,
 * Flow als horizontaler Stepper mit verbindender Linie.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, Flag, AlertTriangle, FileWarning, TimerReset } from 'lucide-react';
import VentureCanvas from '../VentureCanvas';
import type { Venture } from '../../../../lib/data/projects';
import {
  EASE,
  ScrollProgress,
  Topbar,
  LetterHeadline,
  MaskedHeadline,
  TiltCard,
  LogoPanel,
  MarqueeBand,
  ScrollStatement,
  NextFooter,
  SectionLabel,
} from './shared';

const FLAGS = [
  { icon: Flag, label: 'Off-Contract-Einsatz', level: 'HOCH' },
  { icon: AlertTriangle, label: 'ANÜ-Signal erkannt', level: 'PRÜFEN' },
  { icon: FileWarning, label: 'Dokument unvollständig', level: 'MITTEL' },
  { icon: TimerReset, label: 'Rahmenvertrag läuft aus', level: '90 TAGE' },
];

export default function ProcuveraLayout({ venture, next }: { venture: Venture; next: Venture }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const accent = venture.accent;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#080a12] text-white">
      <ScrollProgress accent={accent} />

      {/* HERO — Text links, Flag-Board rechts über Radar */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-80">
          <VentureCanvas effect="radar" accent={accent} />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(75% 65% at 60% 45%, transparent 0%, #080a12 100%)`,
          }}
        />
        <Topbar label="Governance im Einsatzmoment" />

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:px-12"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-mono text-xs uppercase tracking-[0.35em]"
              style={{ color: accent }}
            >
              ● {venture.category}
            </motion.p>
            <h1 className="mt-6 whitespace-nowrap text-[clamp(2.4rem,5.6vw,5.2rem)] font-bold uppercase leading-[0.92] tracking-tight">
              <LetterHeadline text={venture.name} delay={0.25} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              className="mt-7 max-w-md text-xl text-gray-300 md:text-2xl"
            >
              {venture.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
              className="mt-10"
            >
              <TiltCard
                accent={accent}
                className="relative inline-block w-[260px] overflow-hidden rounded-xl border border-white/15"
              >
                <LogoPanel venture={venture} sizes="260px" />
              </TiltCard>
            </motion.div>
          </div>

          {/* Flag-Board */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.3, delayChildren: 0.9 } } }}
            className="space-y-3"
          >
            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-gray-500"
            >
              <span>Live-Risikoboard</span>
              <motion.span
                animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{ color: accent }}
              >
                ● SCAN
              </motion.span>
            </motion.p>
            {FLAGS.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 50, scale: 0.96 },
                    visible: { opacity: 1, x: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0b0f1c]/85 px-6 py-5 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-4">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: `${accent}1c`, color: accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-gray-200 md:text-base">{f.label}</span>
                  </span>
                  <span
                    className="rounded-md px-2.5 py-1 font-mono text-xs font-bold"
                    style={{ background: `${accent}22`, color: accent }}
                  >
                    {f.level}
                  </span>
                </motion.div>
              );
            })}
            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="pt-1 text-center font-mono text-xs uppercase tracking-[0.25em] text-gray-500"
            >
              Flaggt Risiko — urteilt nicht
            </motion.p>
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

      {/* STATEMENT */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-36">
        <div className="mb-10">
          <SectionLabel num="01" accent={accent}>
            Warum
          </SectionLabel>
        </div>
        <ScrollStatement text={venture.intro} />
      </section>

      <MarqueeBand venture={venture} />

      {/* PROBLEME — 2×2 KPI-Grid */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel num="02" accent={accent}>
            Problemraum
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.problemTitle} />
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {venture.problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: EASE }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all hover:-translate-y-1 hover:border-white/25 md:p-10"
                style={{ boxShadow: `0 0 0 0 transparent` }}
              >
                <span
                  className="block text-6xl font-bold leading-none md:text-7xl"
                  style={{ WebkitTextStroke: `1.5px ${accent}77`, color: 'transparent' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-xl font-bold text-white md:text-2xl">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">{p.text}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW — horizontaler Stepper */}
      <section className="relative border-t border-white/10 py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(50% 40% at 50% 30%, ${accent}0d, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel num="03" accent={accent}>
            Funktionsweise
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.flowTitle} />
          </h2>

          <div className="relative mt-20">
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: EASE }}
              className="absolute left-0 right-0 top-[23px] hidden h-px origin-left md:block"
              style={{ background: `linear-gradient(90deg, ${accent}88, ${accent}22)` }}
            />
            <div className="grid gap-10 md:grid-cols-5 md:gap-5">
              {venture.flow.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                >
                  <span
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border font-mono text-sm font-bold"
                    style={{ borderColor: `${accent}66`, background: '#0b0f1c', color: accent }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{s.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRINZIPIEN — Checkliste zweispaltig */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel num="04" accent={accent}>
            Prinzipien
          </SectionLabel>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {venture.principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: EASE }}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-6"
              >
                <Flag className="mt-1 h-5 w-5 shrink-0" style={{ color: accent }} />
                <p className="text-base font-light leading-relaxed text-gray-200 md:text-lg">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NextFooter accent={accent} next={next} />
    </div>
  );
}
