'use client';

import React, { useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowDown } from 'lucide-react';
import VentureCanvas from './VentureCanvas';
import type { Venture } from '../../../lib/data/projects';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Scroll-Progressbar (fixiert oben, Akzentfarbe)                     */
/* ------------------------------------------------------------------ */
function ScrollProgress({ accent }: { accent: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left"
      style={{ scaleX, background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Buchstaben-Reveal für den Produktnamen                             */
/* ------------------------------------------------------------------ */
function LetterHeadline({ text }: { text: string }) {
  const chars = Array.from(text);
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.35 } } }}
      className="inline-block"
      aria-label={text}
    >
      {chars.map((c, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '115%', rotate: 8, opacity: 0 },
              visible: { y: 0, rotate: 0, opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {c === ' ' ? '\u00A0' : c}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Wort-für-Wort-Maskenreveal für Sektions-Headlines                  */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  3D-Tilt-Karte (Logo im Hero) mit Glanz-Sweep                       */
/* ------------------------------------------------------------------ */
function TiltCard({
  children,
  accent,
  className = '',
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry.set(px * 16);
      rx.set(-py * 12);
    },
    [rx, ry, reduceMotion],
  );
  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: 'preserve-3d',
        perspective: 800,
        boxShadow: `0 50px 140px -40px ${accent}55`,
      }}
      className={className}
    >
      {children}
      {/* Glanz-Sweep */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        initial={{ x: '-130%' }}
        animate={reduceMotion ? undefined : { x: '130%' }}
        transition={{ duration: 2.4, delay: 1.2, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)',
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spotlight-Karte: Radialer Lichtkegel folgt der Maus                */
/* ------------------------------------------------------------------ */
function SpotlightCard({
  children,
  accent,
  className = '',
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative overflow-hidden ${className}`}
      style={{ ['--spot' as never]: `${accent}14` }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), var(--spot), transparent 65%)',
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee-Band mit Name + Verb                                       */
/* ------------------------------------------------------------------ */
function MarqueeBand({ venture }: { venture: Venture }) {
  const items = Array.from({ length: 6 });
  return (
    <div className="overflow-hidden border-y border-white/10 py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="industry-ticker-track flex w-max items-center gap-12">
        {[0, 1].map((clone) => (
          <div key={clone} className="flex items-center gap-12" aria-hidden={clone === 1}>
            {items.map((_, i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap">
                <span
                  className="text-4xl font-bold uppercase tracking-tight md:text-5xl"
                  style={
                    i % 2 === 0
                      ? { color: venture.accent }
                      : {
                          WebkitTextStroke: `1px ${venture.accent}66`,
                          color: 'transparent',
                        }
                  }
                >
                  {venture.name}
                </span>
                <span className="font-mono text-sm uppercase tracking-[0.35em] text-gray-500">
                  {venture.verb}
                </span>
                <span style={{ color: venture.accent }} className="text-xs">
                  ◆
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Statement: färbt sich beim Scrollen Wort für Wort ein              */
/* ------------------------------------------------------------------ */
function ScrollStatement({ text }: { text: string }) {
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
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
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
}: {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.3em] inline-block text-white">
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax-Ghost-Nummer in den Problem-Karten                        */
/* ------------------------------------------------------------------ */
function GhostNumber({ index }: { index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <motion.span
      ref={ref}
      style={{ y }}
      className="pointer-events-none absolute -right-4 -top-8 select-none text-[clamp(5rem,10vw,8rem)] font-bold leading-none text-white/[0.05]"
      aria-hidden="true"
    >
      {String(index + 1).padStart(2, '0')}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Pulsierender Flow-Node                                             */
/* ------------------------------------------------------------------ */
function FlowNode({ index, accent }: { index: number; accent: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${accent}55` }}
          animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35, ease: 'easeOut' }}
        />
      )}
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-bold"
        style={{ borderColor: `${accent}66`, background: '#0a0f1d', color: accent }}
      >
        {index + 1}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA-Button mit Shine-Sweep                                         */
/* ------------------------------------------------------------------ */
function ShineButton({
  href,
  accent,
  children,
}: {
  href: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 font-semibold text-black transition-transform hover:scale-[1.03] active:scale-[0.98]"
      style={{ background: accent }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover/btn:translate-x-[130%]"
      />
      {children}
    </Link>
  );
}

/* ================================================================== */
/*  Detailseite                                                        */
/* ================================================================== */
export default function VentureDetailPage({
  venture,
  next,
}: {
  venture: Venture;
  next: Venture;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const canvasScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, -90]);

  // Parallax für den Ghost-Text im Footer
  const { scrollYProgress: nextProgress } = useScroll({
    target: nextRef,
    offset: ['start end', 'end start'],
  });
  const ghostX = useTransform(nextProgress, [0, 1], ['-6%', '6%']);

  const accent = venture.accent;

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <ScrollProgress accent={accent} />

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

        {/* Schwebende Akzent-Orbs */}
        {!reduceMotion && (
          <>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-[12%] top-[22%] h-40 w-40 rounded-full blur-3xl"
              style={{ background: `${accent}22` }}
              animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[18%] right-[10%] h-56 w-56 rounded-full blur-3xl"
              style={{ background: `${accent}15` }}
              animate={{ y: [0, 26, 0], x: [0, -18, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />
          </>
        )}

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
          {/* Logo-Karte mit 3D-Tilt + rotierendem Akzentring */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mb-10"
          >
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[28px]"
                style={{
                  background: `conic-gradient(from 0deg, transparent 0%, ${accent}44 12%, transparent 28%)`,
                  filter: 'blur(6px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              />
            )}
            <TiltCard
              accent={accent}
              className="relative w-[240px] overflow-hidden rounded-2xl border border-white/15 md:w-[320px]"
            >
              <div style={{ background: venture.logoBg }}>
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
              </div>
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

      {/* ---------- STATEMENT ---------- */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-40">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 font-mono text-xs uppercase tracking-[0.35em] text-gray-500"
        >
          <span style={{ color: accent }}>01</span> — Warum
        </motion.p>
        <ScrollStatement text={venture.intro} />
      </section>

      {/* ---------- MARQUEE ---------- */}
      <MarqueeBand venture={venture} />

      {/* ---------- PROBLEME ---------- */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500"
          >
            <span style={{ color: accent }}>02</span> — Problemraum
          </motion.p>
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

      {/* ---------- FLOW ---------- */}
      <section className="relative border-t border-white/10 py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(50% 40% at 50% 30%, ${accent}0d, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500"
          >
            <span style={{ color: accent }}>03</span> — Funktionsweise
          </motion.p>
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
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`relative flex items-start gap-6 md:w-1/2 ${
                    i % 2 === 0
                      ? 'md:pr-14 md:text-right'
                      : 'md:ml-auto md:flex-row-reverse md:pl-14 md:text-left'
                  }`}
                >
                  <FlowNode index={i} accent={accent} />
                  <div className="md:flex-1">
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
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500"
          >
            <span style={{ color: accent }}>04</span> — Prinzipien
          </motion.p>
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
                {/* Akzentlinie beim Hover */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `${accent}88` }}
                />
                <span
                  className="font-mono text-sm text-gray-600 transition-colors duration-300"
                  style={{ color: undefined }}
                >
                  <span className="transition-colors duration-300 group-hover:hidden">
                    P{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden group-hover:inline" style={{ color: accent }}>
                    P{String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <p className="flex-1 text-lg font-light leading-relaxed text-gray-200 md:text-xl">
                  {p}
                </p>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 -translate-x-2 text-gray-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  style={{ color: accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NEXT / CTA ---------- */}
      <section
        ref={nextRef}
        className="relative overflow-hidden border-t border-white/10 py-28 md:py-40"
      >
        <motion.span
          style={{ x: reduceMotion ? 0 : ghostX }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[16vw] font-bold uppercase leading-none text-white/[0.04]"
          aria-hidden="true"
        >
          {next.name}
        </motion.span>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500"
          >
            Nächstes Projekt
          </motion.p>
          <Link href={`/de/cases/${next.slug}`} className="group mt-6 inline-block">
            <span
              className="block text-[clamp(2.4rem,7vw,5.5rem)] font-bold uppercase leading-none tracking-tight text-white transition-colors duration-300"
              style={{ ['--hov' as never]: next.accent }}
            >
              <span className="transition-colors duration-300 group-hover:text-[color:var(--hov)]">
                <MaskedHeadline text={next.name} />
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
            <ShineButton href="/de#contact" accent={accent}>
              Mit uns sprechen
              <ArrowUpRight className="h-4 w-4" />
            </ShineButton>
          </div>
        </div>
      </section>
    </div>
  );
}
