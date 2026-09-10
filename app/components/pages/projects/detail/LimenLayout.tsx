'use client';

/**
 * LIMEN — „Schwelle“-Layout.
 * Split-Hero mit animierter Schwellenlinie und dem Musselintuch/Schmusetuch-
 * Vergleich, Flow als Regelpfad mit Mono-Chips, vier Ergebniszustände als
 * eigenes Panel. Die Schwelle (limen) ist das visuelle Leitmotiv.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, Scale } from 'lucide-react';
import VentureCanvas from '../VentureCanvas';
import type { Venture } from '../../../../lib/data/projects';
import {
  EASE,
  ScrollProgress,
  Topbar,
  MaskedHeadline,
  TiltCard,
  LogoPanel,
  ScrollStatement,
  NextFooter,
  SectionLabel,
} from './shared';

const STATES = [
  { label: 'entschieden', desc: 'Das Regelwerk greift eindeutig.', tone: 'ok' },
  { label: 'unentschieden', desc: 'Ein Merkmal fehlt — das System stellt die Frage.', tone: 'ask' },
  { label: 'eskaliert', desc: 'Regelkonflikt — behebbar durch Regelpflege.', tone: 'warn' },
  { label: 'normativ unbestimmt', desc: 'Die Rechtslage selbst ist strittig — ehrlich benannt.', tone: 'hard' },
];

export default function LimenLayout({ venture, next }: { venture: Venture; next: Venture }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const accent = venture.accent;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#060910] text-white">
      <ScrollProgress accent={accent} />

      {/* HERO — die Schwelle: zwei Welten, eine Linie */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <VentureCanvas effect="ledger" accent={accent} />
        </div>
        {/* Zwei Hälften */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-2">
          <div style={{ background: 'linear-gradient(180deg, #0a0f1add, #060910f2)' }} />
          <div style={{ background: `linear-gradient(180deg, ${accent}0a, #060910f2)` }} />
        </div>
        {/* Animierte Schwellenlinie */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
          className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px origin-top md:block"
          style={{ background: `linear-gradient(${accent}00, ${accent}aa 30%, ${accent}aa 70%, ${accent}00)` }}
        />
        <Topbar label="limen — lat. die Schwelle" />

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <TiltCard
              accent={accent}
              className="relative w-[260px] overflow-hidden rounded-2xl border border-white/15 md:w-[300px]"
            >
              <LogoPanel venture={venture} sizes="300px" />
            </TiltCard>
          </motion.div>

          <h1 className="mt-10 text-[clamp(3rem,9vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-tight">
            <MaskedHeadline text={venture.name} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-5 text-lg text-gray-300 md:text-xl"
          >
            {venture.tagline}
          </motion.p>

          {/* Musselintuch vs. Schmusetuch */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.25, delayChildren: 1 } } }}
            className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-gray-500">Musselintuch</p>
              <p className="mt-2 text-lg font-bold text-white">Textilie</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Textilkennzeichnungs-Verordnung. Etikett, Faserangabe — fertig.
              </p>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center justify-center"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full border"
                style={{ borderColor: `${accent}66`, color: accent }}
              >
                <Scale className="h-5 w-5" />
              </span>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.7, ease: EASE }}
              className="rounded-2xl border p-6 text-left"
              style={{ borderColor: `${accent}44`, background: `${accent}0d` }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
                Schmusetuch
              </p>
              <p className="mt-2 text-lg font-bold text-white">Spielzeug</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                VO (EU) 2025/2509: CE, EN 71, technisches Dossier, ab 2030 Produktpass.
              </p>
            </motion.div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-gray-500"
          >
            Gleiche Fabrik · gleicher Stoff · zwei Pflichtenwelten
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
            Warum
          </SectionLabel>
        </div>
        <ScrollStatement text={venture.intro} />
      </section>

      {/* PROBLEME — versetzt gestaffelt */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <SectionLabel num="02" accent={accent}>
            Problemraum
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.problemTitle} />
          </h2>
          <div className="mt-16 space-y-8">
            {venture.problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 ${
                  i % 2 === 0 ? '' : 'ml-auto'
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW — Regelpfad */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <SectionLabel num="03" accent={accent}>
            Funktionsweise
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.flowTitle} />
          </h2>
          <div className="relative mt-16 space-y-0">
            {venture.flow.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative flex gap-6 pb-10 pl-2 md:gap-10"
              >
                {/* Pfadlinie */}
                {i < venture.flow.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[21px] top-12 w-px md:left-[29px]"
                    style={{ background: `${accent}33` }}
                  />
                )}
                <span
                  className="z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold md:h-14 md:w-14 md:text-sm"
                  style={{ borderColor: `${accent}55`, background: '#0a1020', color: accent }}
                >
                  R{i + 1}
                </span>
                <div className="flex-1 border-b border-white/10 pb-8">
                  <h3 className="text-lg font-bold text-white md:text-xl">{s.label}</h3>
                  <p className="mt-2 leading-relaxed text-gray-400">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIER ERGEBNISZUSTÄNDE */}
      <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ background: `radial-gradient(50% 45% at 50% 40%, ${accent}0d, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionLabel num="04" accent={accent}>
            Vier Ergebniszustände
          </SectionLabel>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold tracking-tight">
            <MaskedHeadline text="Ein System, das sagt, wo die Rechtslage strittig ist, ist wertvoller als eines, das rät." />
          </h2>
          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {STATES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="rounded-2xl border p-6"
                style={{
                  borderColor: i === 3 ? `${accent}66` : 'rgba(255,255,255,0.1)',
                  background: i === 3 ? `${accent}0f` : 'rgba(255,255,255,0.03)',
                }}
              >
                <span
                  className="inline-block rounded-md px-2.5 py-1 font-mono text-xs font-bold uppercase"
                  style={{ background: `${accent}1c`, color: accent }}
                >
                  {s.label}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Prinzipien als kompakte Liste darunter */}
          <div className="mt-16 space-y-4">
            {venture.principles.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="border-l-2 pl-5 text-lg font-light leading-relaxed text-gray-300"
                style={{ borderColor: `${accent}55` }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <NextFooter accent={accent} next={next} />
    </div>
  );
}
