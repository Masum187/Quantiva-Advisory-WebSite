'use client';

/**
 * LUMENA AI — „Audit Scan“-Layout.
 * Split-Hero mit animierter AI-Act-Checkliste, Probleme als Glas-Tiles
 * mit Scanline-Hover, Flow als Sticky-Split (linke Spalte klebt).
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, CheckCircle2, ShieldCheck } from 'lucide-react';
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
  ScrollStatement,
  NextFooter,
  SectionLabel,
} from './shared';

const AUDIT_CHECKS = [
  { art: 'Art. 13', label: 'Transparenz & Information', state: 'BESTANDEN' },
  { art: 'Art. 14', label: 'Menschliche Aufsicht', state: 'BESTANDEN' },
  { art: 'Art. 15', label: 'Robustheit & Genauigkeit', state: 'GEPRÜFT' },
  { art: 'Art. 12', label: 'Aufzeichnungspflichten', state: 'EVIDENZ' },
];

export default function LumenaLayout({ venture, next }: { venture: Venture; next: Venture }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const accent = venture.accent;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const canvasScale = useTransform(heroProgress, [0, 1], [1, 1.12]);

  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      <ScrollProgress accent={accent} />

      {/* HERO — Split: Text links, Audit-Checkliste rechts, Radar dahinter */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <motion.div style={{ scale: reduceMotion ? 1 : canvasScale }} className="absolute inset-0">
          <VentureCanvas effect="radar" accent={accent} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(75% 65% at 50% 45%, transparent 0%, #06060f 100%)`,
            }}
          />
        </motion.div>
        <Topbar label="EU-souverän · EU-only Hosting" />

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 py-16 md:grid-cols-2 md:px-12"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
              style={{ borderColor: `${accent}44`, color: accent }}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {venture.category}
            </motion.p>
            <h1 className="mt-7 text-[clamp(3rem,7vw,6.2rem)] font-bold uppercase leading-[0.92] tracking-tight">
              <LetterHeadline text="Lumena" delay={0.3} />
              <span className="block" style={{ color: accent }}>
                <LetterHeadline text="AI" delay={0.75} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              className="mt-7 max-w-md text-lg text-gray-300 md:text-xl"
            >
              {venture.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
              className="mt-10"
            >
              <TiltCard
                accent={accent}
                className="relative inline-block w-[240px] overflow-hidden rounded-xl border border-white/15"
              >
                <LogoPanel venture={venture} sizes="240px" />
              </TiltCard>
            </motion.div>
          </div>

          {/* Audit-Checkliste mit einlaufenden Checks */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.35, delayChildren: 1 } } }}
            className="space-y-3"
          >
            {AUDIT_CHECKS.map((c, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="rounded-md px-2.5 py-1 font-mono text-xs font-bold"
                    style={{ background: `${accent}22`, color: accent }}
                  >
                    {c.art}
                  </span>
                  <span className="text-sm text-gray-200 md:text-base">{c.label}</span>
                </div>
                <span className="flex items-center gap-2 font-mono text-xs" style={{ color: accent }}>
                  <CheckCircle2 className="h-4 w-4" />
                  {c.state}
                </span>
              </motion.div>
            ))}
            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="pt-2 text-center font-mono text-xs uppercase tracking-[0.3em] text-gray-500"
            >
              Auditierbare Evidenz je Artikel — nicht Selbstauskunft
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

      {/* PROBLEME — Glas-Tiles mit Scanline */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel num="02" accent={accent}>
            Problemraum
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
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors hover:border-white/25"
              >
                {/* Scanline beim Hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-0.5 -translate-y-2 opacity-0 transition-all duration-700 group-hover:translate-y-[280px] group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                <span
                  className="font-mono text-xs uppercase tracking-[0.3em]"
                  style={{ color: accent }}
                >
                  Scan {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW — Sticky-Split */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[1fr_1.3fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <SectionLabel num="03" accent={accent}>
              Funktionsweise
            </SectionLabel>
            <h2 className="mt-4 text-[clamp(1.9rem,4vw,3.2rem)] font-bold uppercase tracking-tight">
              <MaskedHeadline text={venture.flowTitle} />
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-gray-400">
              Compliance-by-Proof und Use-Case-ROI greifen ineinander: erst der technische
              Nachweis, dann die wirtschaftliche Entscheidung — und LUMENA governt das Dazwischen.
            </p>
          </div>
          <div className="space-y-5">
            {venture.flow.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 pl-16"
              >
                <span
                  className="absolute left-6 top-7 font-mono text-sm font-bold"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-white">{s.label}</h3>
                <p className="mt-2 leading-relaxed text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINZIPIEN — große Quote-Blöcke */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl space-y-16 px-6">
          <SectionLabel num="04" accent={accent}>
            Prinzipien
          </SectionLabel>
          {venture.principles.map((p, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className={`max-w-2xl text-xl font-light leading-relaxed text-gray-200 md:text-2xl ${
                i % 2 === 0 ? '' : 'ml-auto text-right'
              }`}
            >
              <span
                className="mb-3 block font-mono text-xs uppercase tracking-[0.3em]"
                style={{ color: accent }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {p}
            </motion.blockquote>
          ))}
        </div>
      </section>

      <NextFooter accent={accent} next={next} />
    </div>
  );
}
