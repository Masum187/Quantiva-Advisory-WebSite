'use client';

/**
 * Gemeinsame Bausteine der Venture-Detailseiten.
 * Jede Seite hat ein eigenes Layout — hier liegen nur die Primitives.
 */

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
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Venture } from '../../../../lib/data/projects';

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Scroll-Progressbar ---------- */
export function ScrollProgress({ accent }: { accent: string }) {
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

/* ---------- Topbar ---------- */
export function Topbar({ label = 'Quantiva Ventures' }: { label?: string }) {
  return (
    <div className="relative z-10 flex items-center justify-between gap-6 px-6 pt-8 md:px-12">
      <Link
        href="/de/cases"
        className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-gray-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Portfolio
      </Link>
      <span className="truncate text-right font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
        {label}
      </span>
    </div>
  );
}

/* ---------- Buchstaben-Reveal ---------- */
/** Buchstaben werden pro Wort gruppiert (whitespace-nowrap), damit lange
 *  Überschriften nur an Wortgrenzen umbrechen — nie mitten im Wort. */
export function LetterHeadline({ text, delay = 0.35 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  let charIndex = 0;
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
      className="inline-block"
      aria-label={text}
    >
      {words.map((word, w) => {
        const chars = Array.from(word);
        const node = (
          <span key={w} className="inline-block whitespace-nowrap" aria-hidden="true">
            {chars.map((c, i) => {
              charIndex += 1;
              return (
                <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { y: '115%', rotate: 8, opacity: 0 },
                      visible: { y: 0, rotate: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.8, ease: EASE }}
                  >
                    {c}
                  </motion.span>
                </span>
              );
            })}
            {w < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
        return node;
      })}
    </motion.span>
  );
}

/* ---------- Wort-Maskenreveal ---------- */
export function MaskedHeadline({ text, className = '' }: { text: string; className?: string }) {
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

/* ---------- 3D-Tilt-Karte mit Glanz-Sweep ---------- */
export function TiltCard({
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
      ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
      rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 12);
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

/* ---------- Logo-Karte (Inhalt für TiltCard o.ä.) ---------- */
export function LogoPanel({ venture, sizes }: { venture: Venture; sizes: string }) {
  return (
    <div style={{ background: venture.logoBg }}>
      <div className="relative m-5 aspect-[5/2]">
        <Image
          src={venture.logo}
          alt={venture.name}
          fill
          priority
          sizes={sizes}
          className="object-contain"
        />
      </div>
    </div>
  );
}

/* ---------- Spotlight-Karte ---------- */
export function SpotlightCard({
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

/* ---------- Marquee-Band ---------- */
export function MarqueeBand({ venture }: { venture: Venture }) {
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
                      : { WebkitTextStroke: `1px ${venture.accent}66`, color: 'transparent' }
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

/* ---------- Scroll-Statement ---------- */
export function ScrollStatement({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className || 'text-[clamp(1.4rem,3vw,2.4rem)] font-light leading-snug'}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <StatementWord key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </StatementWord>
        );
      })}
    </p>
  );
}

function StatementWord({
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

/* ---------- Parallax-Ghost-Nummer ---------- */
export function GhostNumber({ index, className = '' }: { index: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <motion.span
      ref={ref}
      style={{ y }}
      className={
        className ||
        'pointer-events-none absolute -right-4 -top-8 select-none text-[clamp(5rem,10vw,8rem)] font-bold leading-none text-white/[0.05]'
      }
      aria-hidden="true"
    >
      {String(index + 1).padStart(2, '0')}
    </motion.span>
  );
}

/* ---------- Pulsierender Node ---------- */
export function PulseNode({
  index,
  accent,
  label,
}: {
  index: number;
  accent: string;
  label?: string;
}) {
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
        {label ?? index + 1}
      </span>
    </span>
  );
}

/* ---------- Shine-Button ---------- */
export function ShineButton({
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

/* ---------- Footer mit Next-Projekt + CTA ---------- */
export function NextFooter({ accent, next }: { accent: string; next: Venture }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  return (
    <section ref={ref} className="relative overflow-hidden border-t border-white/10 py-28 md:py-40">
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
  );
}

/* ---------- Sektions-Label ---------- */
export function SectionLabel({
  num,
  accent,
  children,
}: {
  num: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500"
    >
      <span style={{ color: accent }}>{num}</span> — {children}
    </motion.p>
  );
}

/* ---------- Schwebende Akzent-Orbs ---------- */
export function AccentOrbs({ accent }: { accent: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
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
  );
}
