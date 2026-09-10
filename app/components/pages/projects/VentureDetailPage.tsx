'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowDown } from 'lucide-react';
import VentureCanvas from './VentureCanvas';
import type { Venture } from '../../../lib/data/projects';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Wort-für-Wort-Maskenreveal für große Headlines.
 * Der Observer sitzt auf dem (nicht geclippten) Wrapper; die Wörter selbst
 * animieren über Varianten — sonst feuert whileInView nie, weil die
 * verschobenen Wörter vom overflow-hidden verdeckt sind.
 */
function MaskedHeadline({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ visible: { transition: { staggerChildren: 0.055 } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="mr-[0.28em] inline-block"
            variants={{ hidden: { y: '112%' }, visible: { y: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Statement, das sich beim Scrollen Wort für Wort einfärbt. */
function ScrollStatement({ text, accent }: { text: string; accent: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });
  const words = text.split(' ');
  return (
    <p ref={ref} className="text-[clamp(1.4rem,3vw,2.4rem)] font-light leading-snug">
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} accent={accent}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
  accent: string;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  void accent;
  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block text-white">
      {children}
    </motion.span>
  );
}

export default function VentureDetailPage({
  venture,
  next,
}: {
  venture: Venture;
  next: Venture;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const canvasScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, -90]);

  const accent = venture.accent;

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      {/* ---------- HERO ---------- */}
      <section ref={heroRef} className="relative flex h-[100svh] flex-col overflow-hidden">
        <motion.div
          style={{ scale: reduceMotion ? 1 : canvasScale }}
          className="absolute inset-0"
        >
          <VentureCanvas effect={venture.effect} accent={accent} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(70% 60% at 50% 40%, transparent 0%, #05070f 100%), radial-gradient(40% 35% at 50% 45%, ${accent}14, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* Topbar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-8 md:px-12">
          <Link
            href="/de/cases"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-gray-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Portfolio
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
            Quantiva Ventures
          </span>
        </div>

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity, y: reduceMotion ? 0 : heroY }}
          className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
        >
          {/* Logo-Karte */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mb-10 w-[240px] overflow-hidden rounded-2xl border border-white/15 md:w-[320px]"
            style={{ boxShadow: `0 50px 140px -40px ${accent}55`, background: venture.logoBg }}
          >
            <div className="relative m-5 aspect-[5/2]">
              <Image
                src={venture.logo}
                alt={venture.name}
                fill
                priority
                sizes="(max-width: 768px) 240px, 320px"
                className="object-contain"
              />
            </div>
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
            <MaskedHeadline text={venture.name} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="mt-6 max-w-xl text-lg text-gray-300 md:text-xl"
          >
            {venture.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
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

      {/* ---------- STATEMENT ---------- */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-40">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
          <span style={{ color: accent }}>01</span> — Warum
        </p>
        <ScrollStatement text={venture.intro} accent={accent} />
      </section>

      {/* ---------- PROBLEME ---------- */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            <span style={{ color: accent }}>02</span> — Problemraum
          </p>
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
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
              >
                <span
                  className="pointer-events-none absolute -right-4 -top-8 select-none text-[clamp(5rem,10vw,8rem)] font-bold leading-none text-white/[0.05]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-bold md:text-2xl" style={{ color: accent }}>
                  {p.title}
                </h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-gray-300">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FLOW ---------- */}
      <section className="relative border-t border-white/10 py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(50% 40% at 50% 30%, ${accent}0d, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            <span style={{ color: accent }}>03</span> — Funktionsweise
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text={venture.flowTitle} />
          </h2>

          <div className="relative mt-20">
            {/* animierte Verbindungslinie */}
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.6, ease: EASE }}
              className="absolute bottom-6 left-[19px] top-6 w-px origin-top md:left-1/2"
              style={{ background: `linear-gradient(${accent}88, ${accent}22)` }}
            />
            <div className="space-y-14">
              {venture.flow.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`relative flex items-start gap-6 md:w-1/2 ${
                    i % 2 === 0
                      ? 'md:pr-14 md:text-right'
                      : 'md:ml-auto md:flex-row-reverse md:pl-14 md:text-left'
                  }`}
                >
                  <span
                    className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-bold"
                    style={{
                      borderColor: `${accent}66`,
                      background: '#0a0f1d',
                      color: accent,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className={i % 2 === 0 ? 'md:flex-1' : 'md:flex-1'}>
                    <h3 className="text-lg font-bold text-white md:text-xl">{s.label}</h3>
                    <p className="mt-2 leading-relaxed text-gray-400">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRINZIPIEN ---------- */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            <span style={{ color: accent }}>04</span> — Prinzipien
          </p>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {venture.principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="group flex items-baseline gap-6 py-7 transition-transform duration-300 hover:translate-x-2 md:gap-10"
              >
                <span className="font-mono text-sm text-gray-600">
                  P{String(i + 1).padStart(2, '0')}
                </span>
                <p className="flex-1 text-lg font-light leading-relaxed text-gray-200 md:text-xl">
                  {p}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NEXT / CTA ---------- */}
      <section className="relative overflow-hidden border-t border-white/10 py-28 md:py-40">
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[16vw] font-bold uppercase leading-none text-white/[0.04]"
          aria-hidden="true"
        >
          {next.name}
        </span>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            Nächstes Projekt
          </p>
          <Link href={`/de/cases/${next.slug}`} className="group mt-6 inline-block">
            <span
              className="block text-[clamp(2.4rem,7vw,5.5rem)] font-bold uppercase leading-none tracking-tight text-white transition-colors duration-300"
              style={{ ['--hov' as never]: next.accent }}
            >
              <span className="transition-colors duration-300 group-hover:text-[color:var(--hov)]">
                {next.name}
              </span>
            </span>
            <span className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400 transition group-hover:text-white">
              {next.tagline}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/de/cases"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Alle Projekte
            </Link>
            <Link
              href="/de#contact"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-black transition hover:opacity-90"
              style={{ background: accent }}
            >
              Mit uns sprechen
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
