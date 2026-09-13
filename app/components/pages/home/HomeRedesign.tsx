'use client';

/**
 * Startseite — Cinematic Brand-Film.
 * Hero + Nav bleiben im ersten Chunk; Below-the-fold wird per next/dynamic nachgeladen.
 */

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getVentures } from '../../../lib/data/projects';
import type { Lang } from '../../../lib/data/projects';
import SiteNav from '../../SiteNav';
import HomeFilmLayer from './HomeFilmLayer';
import { ACCENT, COPY, EASE, FILM_HERO } from './homeCopy';

const HomeBelowFold = dynamic(() => import('./HomeBelowFold'), { ssr: true });

function WordRotator({ words }: { words: [string, string, string] }) {
  const [idx, setIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length, reduceMotion]);

  if (reduceMotion) {
    return <span className="text-white">{words.join(' ')}</span>;
  }

  return (
    <span className="relative inline-block" style={{ minWidth: '5.2em' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[idx]}
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-0.3em', filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-block"
          style={{ color: idx === 2 ? ACCENT : '#ffffff' }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function HomeRedesign({ lang = 'de' }: { lang?: Lang }) {
  const c = COPY[lang];
  const ventures = getVentures(lang);
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const filmScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const filmOpacity = useTransform(heroProgress, [0, 0.9], [1, 0.15]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -90]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#04060b] text-white antialiased">
      <SiteNav lang={lang} variant="overlay" />

      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <motion.div style={{ scale: reduceMotion ? 1 : filmScale, opacity: reduceMotion ? 1 : filmOpacity }} className="absolute inset-0">
          <HomeFilmLayer src={FILM_HERO} mode="hero" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #04060bE6 0%, transparent 22%, #04060b55 55%, #04060bF7 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(75deg, #04060bCC 0%, #04060b55 38%, transparent 65%), radial-gradient(120% 90% at 50% 50%, transparent 55%, #04060b99 100%)',
            }}
          />
        </motion.div>

        <motion.div
          style={{ y: reduceMotion ? 0 : heroTextY, opacity: reduceMotion ? 1 : heroTextOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-24 pt-32 md:pb-32"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="font-mono text-[0.65rem] uppercase tracking-[0.5em] text-gray-400"
          >
            {c.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
            className="mt-6 text-[clamp(3rem,10vw,8.5rem)] font-light leading-[1.02] tracking-[-0.02em]"
          >
            <WordRotator words={c.hero.words} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
            className="mt-6 font-mono text-sm uppercase tracking-[0.4em]"
            style={{ color: ACCENT }}
          >
            {c.hero.motto}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35, ease: EASE }}
            className="mt-8 flex max-w-2xl flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12"
          >
            <p className="max-w-xl text-lg font-light leading-relaxed text-gray-300">
              {c.hero.positioning}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.55, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              href="#contact"
              className="group relative overflow-hidden rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black"
              style={{ background: ACCENT }}
            >
              <span className="relative inline-flex items-center gap-2">
                {c.hero.ctaPrimary}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white"
            >
              {c.hero.ctaSecondary}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 right-6 z-10 hidden items-center gap-4 md:flex"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-gray-400">
            {c.hero.scrollHint}
          </span>
          <motion.span
            aria-hidden="true"
            className="block h-14 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent"
            animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      <HomeBelowFold copy={c} lang={lang} ventures={ventures} />
    </div>
  );
}
