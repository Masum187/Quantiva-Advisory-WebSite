'use client';

/**
 * WEFTLINE — „Weave“-Layout.
 * Poster-Hero: riesige Typo unten links über Faden-Canvas.
 * Probleme als Grün-vs-Realität-Gegenüberstellung, Flow als horizontaler
 * Faden mit Stationen abwechselnd über/unter der Linie, Process-Pack-Chips.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, CheckCircle2, XCircle } from 'lucide-react';
import VentureCanvas from '../VentureCanvas';
import type { Venture } from '../../../../lib/data/projects';
import {
  EASE,
  ScrollProgress,
  Topbar,
  MaskedHeadline,
  TiltCard,
  LogoPanel,
  MarqueeBand,
  ScrollStatement,
  NextFooter,
  SectionLabel,
} from './shared';

const PACKS = ['O2C', 'P2P', 'R2R', 'Plan-to-Produce', 'Warehouse-to-Ship', 'Hire-to-Retire', 'Service-to-Cash'];

export default function WeftlineLayout({ venture, next }: { venture: Venture; next: Venture }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const accent = venture.accent;

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const titleX = useTransform(heroProgress, [0, 1], [0, -80]);

  return (
    <div className="min-h-screen bg-[#04101f] text-white">
      <ScrollProgress accent={accent} />

      {/* HERO — Poster: Typo unten links */}
      <section ref={heroRef} className="relative flex h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <VentureCanvas effect="threads" accent={accent} />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #04101fcc 0%, transparent 35%, transparent 55%, #04101f 100%)`,
          }}
        />
        <Topbar label={venture.category} />

        {/* Logo-Karte oben rechts */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="absolute right-6 top-24 z-10 hidden md:right-12 md:block"
        >
          <TiltCard
            accent={accent}
            className="relative w-[240px] overflow-hidden rounded-xl border border-white/15"
          >
            <LogoPanel venture={venture} sizes="240px" />
          </TiltCard>
        </motion.div>

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity, x: reduceMotion ? 0 : titleX }}
          className="relative z-10 mt-auto px-6 pb-16 md:px-12 md:pb-20"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-mono text-xs uppercase tracking-[0.35em]"
            style={{ color: accent }}
          >
            Business Flow Assurance
          </motion.p>
          <h1 className="mt-4 text-[clamp(3.4rem,12vw,11rem)] font-bold uppercase leading-[0.85] tracking-tight">
            <MaskedHeadline text="Weft" />
            <span className="block" style={{ color: accent }}>
              <MaskedHeadline text="line" />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
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
            Warum
          </SectionLabel>
        </div>
        <ScrollStatement text={venture.intro} />
      </section>

      {/* GRÜN vs. REALITÄT */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel num="02" accent={accent}>
            Problemraum
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.problemTitle} />
          </h2>

          {/* Gegenüberstellung */}
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.05] p-8"
            >
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Was die Systeme melden
              </p>
              <div className="mt-6 space-y-3 font-mono text-sm text-gray-300">
                <p>ERP · IDoc verbucht <span className="float-right text-emerald-300">✓ OK</span></p>
                <p>Middleware · Nachricht zugestellt <span className="float-right text-emerald-300">✓ OK</span></p>
                <p>WMS · Auftrag angelegt <span className="float-right text-emerald-300">✓ OK</span></p>
                <p>Monitoring · keine Alerts <span className="float-right text-emerald-300">✓ OK</span></p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="rounded-2xl border p-8"
              style={{ borderColor: `${accent}44`, background: `${accent}0a` }}
            >
              <p
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em]"
                style={{ color: accent }}
              >
                <XCircle className="h-4 w-4" />
                Was tatsächlich passiert ist
              </p>
              <div className="mt-6 space-y-3 font-mono text-sm text-gray-300">
                <p>Lieferung · nicht avisiert <span className="float-right" style={{ color: accent }}>✗ FEHLT</span></p>
                <p>Rechnung · hängt in Klärung <span className="float-right" style={{ color: accent }}>✗ OFFEN</span></p>
                <p>Kundenauftrag · Folgebeleg fehlt <span className="float-right" style={{ color: accent }}>✗ STILL</span></p>
                <p className="text-gray-400">Kein System hat einen Fehler gemeldet.</p>
              </div>
            </motion.div>
          </div>

          {/* Die drei Probleme darunter */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {venture.problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <h3 className="border-t-2 pt-4 text-lg font-bold text-white" style={{ borderColor: `${accent}66` }}>
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeBand venture={venture} />

      {/* FLOW — Stationen am Faden, abwechselnd oben/unten */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel num="03" accent={accent}>
            Funktionsweise
          </SectionLabel>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.flowTitle} />
          </h2>

          {/* Desktop: horizontaler Faden */}
          <div className="relative mt-24 hidden md:block">
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 1000 60"
              preserveAspectRatio="none"
              className="absolute left-0 right-0 top-1/2 h-[60px] w-full -translate-y-1/2"
            >
              <motion.path
                d="M0,30 C 120,10 200,50 320,30 S 560,10 680,30 S 900,50 1000,30"
                fill="none"
                stroke={accent}
                strokeWidth="1.5"
                strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </motion.svg>
            <div className="relative grid grid-cols-5 gap-4">
              {venture.flow.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.18, ease: EASE }}
                  className={`flex flex-col ${i % 2 === 0 ? 'justify-end pb-16' : 'justify-start pt-16'}`}
                  style={{ minHeight: '260px' }}
                >
                  <div
                    className="rounded-xl border border-white/10 bg-[#071a30]/90 p-5 backdrop-blur-sm"
                    style={{ boxShadow: `0 20px 60px -30px ${accent}44` }}
                  >
                    <span className="font-mono text-xs" style={{ color: accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-bold text-white">{s.label}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400">{s.desc}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`mx-auto w-px flex-none ${i % 2 === 0 ? 'order-last h-10' : 'order-first h-10'}`}
                    style={{ background: `${accent}55` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertikale Liste */}
          <div className="mt-14 space-y-6 md:hidden">
            {venture.flow.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="font-mono text-xs" style={{ color: accent }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-bold text-white">{s.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Process Packs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="mt-20 flex flex-wrap items-center gap-3"
          >
            <span className="mr-2 font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
              Process Packs:
            </span>
            {PACKS.map((pack, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-full border px-4 py-1.5 font-mono text-xs transition-colors hover:bg-white/5"
                style={{ borderColor: `${accent}44`, color: accent }}
              >
                {pack}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRINZIPIEN */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <SectionLabel num="04" accent={accent}>
            Prinzipien
          </SectionLabel>
          <div className="mt-12 space-y-0 divide-y divide-white/10 border-y border-white/10">
            {venture.principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="group flex items-baseline gap-8 py-7 transition-transform duration-300 hover:translate-x-2"
              >
                <span className="font-mono text-sm" style={{ color: accent }}>
                  ─{String(i + 1).padStart(2, '0')}
                </span>
                <p className="flex-1 text-lg font-light leading-relaxed text-gray-200 md:text-xl">
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
