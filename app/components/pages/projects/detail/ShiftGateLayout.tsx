'use client';

/**
 * ShiftGate AI — „Evidence Terminal“-Layout.
 * Linksbündiger Mono-Hero mit Terminal-Fenster, Probleme als CASE FILES,
 * Flow als verkettete Hash-Chain, Prinzipien als Protokollzeilen.
 * Bewusst monochrom und editorial — wie ein Prüfbericht.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
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
} from './shared';

const TERMINAL_LINES = [
  { t: '09:41:07', s: 'SNAPSHOT', d: 'Zustand erfasst — 14.203 Objekte, read-only' },
  { t: '09:41:08', s: 'HASH', d: 'sha256 4f9c…e2a1 → Kette #58 201' },
  { t: '09:41:12', s: 'DIFF', d: 'Change erkannt: 3 Transporte, 1 Konfigurationsobjekt' },
  { t: '09:41:12', s: 'EVIDENZ', d: 'Faktenlage verkettet — zitierfähig, revisionsfähig' },
  { t: '09:41:13', s: 'STATUS', d: 'Beweis bereit. Urteil: beim Ingenieur.' },
];

export default function ShiftGateLayout({ venture, next }: { venture: Venture; next: Venture }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const accent = venture.accent;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#07080a] font-[inherit] text-white">
      <ScrollProgress accent={accent} />

      {/* HERO — linksbündig, Slash-Motiv, Terminal rechts */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <VentureCanvas effect="ledger" accent={accent} />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(80% 70% at 30% 40%, transparent 0%, #07080a 95%)' }}
        />
        <Topbar label="Beweis-Protokoll" />

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:px-12"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400"
            >
              {venture.category} · read-only · betreiber-blind
            </motion.p>
            <h1 className="mt-6 text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="block"
              >
                <span className="text-gray-500">/</span> Shift
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="block"
              >
                Gate<span className="text-gray-500"> AI</span>
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 border-l-2 border-white/30 pl-5 text-xl font-light text-gray-200 md:text-2xl"
            >
              {venture.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
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

          {/* Terminal-Fenster mit getippten Evidenzzeilen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="overflow-hidden rounded-xl border border-white/15 bg-black/70 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="ml-3 font-mono text-xs text-gray-500">shiftgate — evidence.log</span>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.5, delayChildren: 1.2 } } }}
              className="space-y-3 p-5 font-mono text-[13px] leading-relaxed"
            >
              {TERMINAL_LINES.map((l, i) => (
                <motion.p
                  key={i}
                  variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-gray-600">{l.t}</span>{' '}
                  <span className="font-bold text-white">[{l.s}]</span>{' '}
                  <span className="text-gray-400">{l.d}</span>
                </motion.p>
              ))}
              <motion.span
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="inline-block"
              >
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block h-4 w-2 translate-y-0.5 bg-white"
                />
              </motion.span>
            </motion.div>
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

      {/* STATEMENT — Prüfbericht-Rahmen */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-36">
        <div className="border border-white/15 p-8 md:p-14">
          <p className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
            <span>Befund 01 — Warum</span>
            <span>Vertraulichkeit: öffentlich</span>
          </p>
          <ScrollStatement text={venture.intro} />
        </div>
      </section>

      {/* PROBLEME — CASE FILES */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.problemTitle} />
          </h2>
          <div className="mt-16 space-y-10">
            {venture.problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="group grid gap-4 border-l-2 border-white/25 pl-6 transition-colors hover:border-white md:grid-cols-[160px_1fr] md:gap-10"
              >
                <p className="font-mono text-xs uppercase leading-loose tracking-[0.2em] text-gray-500">
                  Case File
                  <br />
                  <span className="text-2xl font-bold text-white">
                    №{String(i + 1).padStart(3, '0')}
                  </span>
                </p>
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-400">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW — Hash-Chain */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.flowTitle} />
          </h2>
          <div className="mt-16">
            {venture.flow.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className="rounded-lg border border-white/15 bg-white/[0.03] p-6 font-mono transition-colors hover:border-white/40 md:p-8">
                  <p className="text-xs text-gray-500">
                    block {String(i + 1).padStart(2, '0')} ·{' '}
                    <span className="text-gray-400">
                      #
                      {Array.from({ length: 12 }, (_, k) =>
                        '4f9ce2a17b3d'.charAt((i * 5 + k) % 12),
                      ).join('')}
                    </span>
                  </p>
                  <h3 className="mt-3 font-sans text-xl font-bold text-white">{s.label}</h3>
                  <p className="mt-2 font-sans leading-relaxed text-gray-400">{s.desc}</p>
                </div>
                {i < venture.flow.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mx-auto h-10 w-px origin-top bg-white/30"
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-gray-500">
                      ⛓
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINZIPIEN — Protokoll */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            Protokoll — bindende Grundsätze
          </p>
          <div className="space-y-6">
            {venture.principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="flex items-start gap-5"
              >
                <span className="mt-1 font-mono text-sm font-bold text-white">
                  §{i + 1}
                </span>
                <p className="flex-1 border-b border-white/10 pb-6 text-lg font-light leading-relaxed text-gray-200">
                  {p}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NextFooter accent={accent} next={next} />
    </div>
  );
}
