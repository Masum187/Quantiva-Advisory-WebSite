'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EASE, SpotlightCard } from '../projects/detail/shared';
import type { CareerLevelCopy, CareerLevelOffer, Lang } from '../../../lib/data/careerLevels';

const ACCENT = '#2dd4bf';

export function useMotionOff() {
  return !!useReducedMotion();
}

function LevelVideo({
  src,
  poster,
  className = '',
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const reduce = useMotionOff();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (reduce) {
      el.pause();
      return;
    }
    void el.play().catch(() => {});
  }, [reduce]);

  return (
    <video
      ref={videoRef}
      autoPlay={!reduce}
      muted
      loop
      playsInline
      preload={reduce ? 'none' : 'metadata'}
      poster={poster}
      aria-hidden="true"
      className={`h-full w-full object-cover ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function HeroCtas({ copy, lang }: { copy: CareerLevelCopy; lang: Lang }) {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <a
        href="#jobs"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-400 px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-500/30"
      >
        {copy.jobsCta}
        <ArrowRight className="h-4 w-4" />
      </a>
      <Link
        href={`/${lang}/career`}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition hover:border-teal-400/50 hover:bg-white/5"
      >
        <ArrowLeft className="h-4 w-4" />
        {copy.backCta}
      </Link>
    </div>
  );
}

interface HeroProps {
  copy: CareerLevelCopy;
  video: string;
  poster: string;
  lang: Lang;
}

interface BlockProps {
  copy: CareerLevelCopy;
  children?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* students — Discover                                                 */
/* ------------------------------------------------------------------ */

export function StudentsHero({ copy, video, poster, lang }: HeroProps) {
  const reduce = useMotionOff();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 180]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, reduce ? 1 : 0]);

  return (
    <header ref={ref} className="relative isolate min-h-[96svh] overflow-hidden">
      <motion.div style={{ y: videoY }} className="absolute inset-[-8%] will-change-transform">
        <motion.div
          className="h-full w-full"
          animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <LevelVideo src={video} poster={poster} />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-[#04060b]/55 to-black/20" />
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative mx-auto flex min-h-[96svh] max-w-5xl flex-col justify-end px-6 pb-28 pt-32 md:px-12 md:pb-36"
      >
        <motion.span
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-mono text-xs uppercase tracking-[0.45em] text-teal-400"
        >
          {copy.chapter} — {copy.eyebrow}
        </motion.span>
        <motion.h1
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: EASE, delay: 0.12 }}
          className="mt-8 text-[clamp(2.8rem,8vw,5.6rem)] font-light leading-[1.02] tracking-tight"
        >
          {copy.title}
        </motion.h1>
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: EASE, delay: 0.22 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-gray-300 md:text-xl"
        >
          {copy.pitch}
        </motion.p>
        <HeroCtas copy={copy} lang={lang} />
      </motion.div>
    </header>
  );
}

export function DiscoverReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useMotionOff();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function StudentsOffers({ copy }: BlockProps) {
  return (
    <section className="relative border-t border-white/10 py-32 md:py-44">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <DiscoverReveal>
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-gray-400">
            <span style={{ color: ACCENT }}>01</span> — {copy.offersChapter}
          </p>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.05] tracking-tight">
            {copy.offersTitle}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
            {copy.offersSubtitle}
          </p>
        </DiscoverReveal>
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {copy.offers.map((offer, index) => (
            <DiscoverReveal key={offer.title} delay={index * 0.1}>
              <OfferCard offer={offer} index={index} />
            </DiscoverReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudentsPath({ copy }: BlockProps) {
  return (
    <section className="relative border-t border-white/10 py-32 md:py-44">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <DiscoverReveal>
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-gray-400">
            <span style={{ color: ACCENT }}>02</span> — {copy.pathChapter}
          </p>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.05] tracking-tight">
            {copy.pathTitle}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400">{copy.pathSubtitle}</p>
        </DiscoverReveal>
        <ol className="mt-20 grid gap-10 md:grid-cols-2">
          {copy.path.map((step, index) => (
            <DiscoverReveal key={step.title} delay={index * 0.1}>
              <li className="list-none border-t border-white/10 pt-8">
                <span className="font-mono text-sm text-teal-400">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-xl font-light text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{step.description}</p>
              </li>
            </DiscoverReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* graduates — Launch                                                  */
/* ------------------------------------------------------------------ */

export function GraduatesHero({ copy, video, poster, lang }: HeroProps) {
  const reduce = useMotionOff();
  return (
    <header className="relative isolate min-h-[88svh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.05, ease: [0.77, 0, 0.18, 1] }}
      >
        <LevelVideo src={video} poster={poster} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04060b]/85 via-[#04060b]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-transparent to-black/20" />
      </motion.div>
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 z-10 w-px bg-teal-400 shadow-[0_0_24px_#2dd4bf]"
          initial={{ left: '0%' }}
          animate={{ left: '100%' }}
          transition={{ duration: 1.05, ease: [0.77, 0, 0.18, 1] }}
        />
      )}
      <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-28 md:px-12 md:pb-28">
        <motion.span
          initial={reduce ? { opacity: 1 } : { opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.35 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-teal-400"
        >
          {copy.chapter} — {copy.eyebrow}
        </motion.span>
        <motion.h1
          initial={reduce ? { opacity: 1 } : { opacity: 0, x: -56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          className="mt-5 max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)] font-light leading-[1.02] tracking-tight"
        >
          {copy.title}
        </motion.h1>
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.55 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg"
        >
          {copy.pitch}
        </motion.p>
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.62 }}
        >
          <HeroCtas copy={copy} lang={lang} />
        </motion.div>
      </div>
    </header>
  );
}

export function LaunchReveal({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const reduce = useMotionOff();
  const fromLeft = index % 2 === 0;
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, x: fromLeft ? -72 : 72 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function GraduatesOffers({ copy }: BlockProps) {
  const reduce = useMotionOff();
  return (
    <section className="relative border-t border-white/10 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <LaunchReveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400">
            <span style={{ color: ACCENT }}>01</span> — {copy.offersChapter}
          </p>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.05] tracking-tight">
            {copy.offersTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">{copy.offersSubtitle}</p>
        </LaunchReveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {copy.offers.map((offer, index) => (
            <LaunchReveal key={offer.title} index={index}>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-2xl hover:shadow-[0_0_48px_rgba(45,212,191,0.2)]"
              >
                <OfferCard offer={offer} index={index} />
              </motion.div>
            </LaunchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GraduatesPath({ copy }: BlockProps) {
  const reduce = useMotionOff();
  return (
    <section className="relative border-t border-white/10 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <LaunchReveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400">
            <span style={{ color: ACCENT }}>02</span> — {copy.pathChapter}
          </p>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.05] tracking-tight">
            {copy.pathTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-gray-400">{copy.pathSubtitle}</p>
        </LaunchReveal>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {copy.path.map((step, index) => (
            <LaunchReveal key={step.title} index={index}>
              <motion.li
                whileHover={reduce ? undefined : { scale: 1.03 }}
                className="list-none border-t border-teal-400/30 pt-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-400/10 font-mono text-sm text-teal-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{step.description}</p>
              </motion.li>
            </LaunchReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* professionals — Focus                                               */
/* ------------------------------------------------------------------ */

export function ProfessionalsHero({ copy, video, poster, lang }: HeroProps) {
  const reduce = useMotionOff();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rawScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.16]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-1.2, 0]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 24 });
  const rotate = useSpring(rawRotate, { stiffness: 80, damping: 24 });

  return (
    <header ref={ref} className="relative isolate min-h-[90svh] overflow-hidden">
      <motion.div style={{ scale, rotate }} className="absolute inset-[-6%] origin-center will-change-transform">
        <LevelVideo src={video} poster={poster} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-[#04060b]/70 to-black/35" />
      <div className="relative mx-auto flex min-h-[90svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-28 md:px-16 md:pb-28">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-teal-400">
          {copy.chapter} — {copy.eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[1.06] tracking-tight">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-gray-400 md:text-base">{copy.pitch}</p>
        <HeroCtas copy={copy} lang={lang} />
      </div>
    </header>
  );
}

export function ProfessionalsOffers({ copy, poster }: BlockProps & { poster: string }) {
  const reduce = useMotionOff();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0.1, 0.95], reduce ? ['0%', '0%'] : ['0%', '-58%']);

  return (
    <section ref={ref} className="relative h-[240vh] border-t border-white/10">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl items-start gap-10 px-6 md:px-12">
          <span
            aria-hidden="true"
            className="hidden shrink-0 font-mono text-[5.5rem] leading-none text-white/[0.07] lg:block"
          >
            01
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400">{copy.offersChapter}</p>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-light tracking-tight">
              {copy.offersTitle}
            </h2>
            <p className="mt-3 max-w-lg text-sm text-gray-400">{copy.offersSubtitle}</p>
          </div>
        </div>
        <div className="mt-12 flex items-stretch gap-6 pl-6 md:pl-12">
          <div className="relative hidden h-[52vh] w-[28vw] shrink-0 overflow-hidden rounded-2xl border border-white/10 lg:block">
            <Image src={poster} alt="" fill sizes="28vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] to-transparent" />
          </div>
          <motion.div style={{ x }} className="flex gap-5 will-change-transform">
            {copy.offers.map((offer, index) => (
              <div key={offer.title} className="w-[min(78vw,22rem)] shrink-0">
                <OfferCard offer={offer} index={index} className="h-full min-h-[280px]" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ProfessionalsPath({ copy }: BlockProps) {
  return (
    <section className="relative border-t border-white/10 py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl gap-12 px-6 md:px-12">
        <span
          aria-hidden="true"
          className="sticky top-32 hidden h-min shrink-0 font-mono text-[5.5rem] leading-none text-white/[0.07] lg:block"
        >
          02
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400">{copy.pathChapter}</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-light tracking-tight">
            {copy.pathTitle}
          </h2>
          <p className="mt-3 max-w-lg text-sm text-gray-400">{copy.pathSubtitle}</p>
          <ol className="mt-14 space-y-10">
            {copy.path.map((step, index) => (
              <li key={step.title} className="grid gap-4 border-t border-white/10 pt-8 md:grid-cols-[5rem_1fr]">
                <span className="font-mono text-2xl text-teal-400">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-xl font-light text-white">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* leaders — Command                                                   */
/* ------------------------------------------------------------------ */

export function LeadersHero({ copy, video, poster, lang }: HeroProps) {
  const reduce = useMotionOff();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.15, 1]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.25, 0.7]);

  return (
    <div ref={ref} className="relative h-[175vh]">
      <header className="sticky top-0 isolate h-svh overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0 origin-center will-change-transform">
          <LevelVideo src={video} poster={poster} />
        </motion.div>
        <motion.div className="absolute inset-0 bg-[#04060b]" style={{ opacity: overlay }} />
        <div className="relative flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0, letterSpacing: '0.55em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
              className="font-mono text-xs uppercase text-teal-400"
            >
              {copy.chapter} — {copy.eyebrow}
            </motion.p>
            <motion.h1
              initial={reduce ? { opacity: 1 } : { opacity: 0, letterSpacing: '0.22em' }}
              animate={{ opacity: 1, letterSpacing: '0.01em' }}
              transition={{ duration: 1.6, delay: 0.55, ease: EASE }}
              className="mt-8 text-[clamp(3rem,8vw,6rem)] font-light leading-[0.98] tracking-tight"
            >
              {copy.title}
            </motion.h1>
            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 1.05 }}
              className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg"
            >
              {copy.pitch}
            </motion.p>
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.25 }}
              className="flex justify-center"
            >
              <HeroCtas copy={copy} lang={lang} />
            </motion.div>
          </div>
        </div>
      </header>
    </div>
  );
}

export function LeadersOffers({ copy }: BlockProps) {
  return (
    <section className="relative z-10 -mt-[18vh] border-t border-white/10 bg-[#04060b] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-gray-400">
          <span style={{ color: ACCENT }}>01</span> — {copy.offersChapter}
        </p>
        <h2 className="mt-6 max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)] font-light leading-[1.04] tracking-tight">
          {copy.offersTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-base text-gray-400">{copy.offersSubtitle}</p>
        <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
          {copy.offers.map((offer, index) => (
            <div key={offer.title} className="bg-[#04060b] p-8 md:p-10">
              <span className="font-mono text-xs text-teal-400">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-2xl font-light text-white">{offer.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadersPath({ copy }: BlockProps) {
  const reduce = useMotionOff();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] });
  const line = useSpring(useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]), {
    stiffness: 60,
    damping: 22,
  });

  return (
    <section ref={ref} className="relative z-10 border-t border-white/10 bg-[#04060b] py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-gray-400">
          <span style={{ color: ACCENT }}>02</span> — {copy.pathChapter}
        </p>
        <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-light tracking-tight">{copy.pathTitle}</h2>
        <p className="mt-5 text-base text-gray-400">{copy.pathSubtitle}</p>
        <div className="relative mt-16 pl-10">
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: line }}
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-teal-400"
          />
          <ol className="space-y-14">
            {copy.path.map((step, index) => (
              <li key={step.title} className="relative">
                <span className="absolute -left-10 top-1.5 h-3.5 w-3.5 rounded-full border border-teal-400 bg-[#04060b]" />
                <span className="font-mono text-xs text-teal-400">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-2xl font-light text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared card + jobs chapter wrappers                                 */
/* ------------------------------------------------------------------ */

function OfferCard({
  offer,
  index,
  className = '',
}: {
  offer: CareerLevelOffer;
  index: number;
  className?: string;
}) {
  return (
    <SpotlightCard
      accent={ACCENT}
      className={`h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-teal-400/40 ${className}`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal-400">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-4 text-xl font-light tracking-tight text-white md:text-2xl">{offer.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-400">{offer.description}</p>
    </SpotlightCard>
  );
}

export function JobsChapterFrame({
  level,
  copy,
  children,
}: {
  level: 'students' | 'graduates' | 'professionals' | 'leaders';
  copy: CareerLevelCopy;
  children: React.ReactNode;
}) {
  if (level === 'students') {
    return (
      <section id="jobs" className="relative scroll-mt-28 border-t border-white/10 py-32 md:py-44">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <DiscoverReveal>
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-gray-400">
              <span style={{ color: ACCENT }}>03</span> — {copy.jobsChapter}
            </p>
            <h2 className="mt-8 text-[clamp(2.1rem,5vw,3.6rem)] font-light tracking-tight">{copy.jobsTitle}</h2>
            <p className="mt-6 max-w-xl text-gray-400">{copy.jobsSubtitle}</p>
          </DiscoverReveal>
          <div className="mt-16">{children}</div>
        </div>
      </section>
    );
  }

  if (level === 'graduates') {
    return (
      <section id="jobs" className="relative scroll-mt-28 border-t border-white/10 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <LaunchReveal>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400">
              <span style={{ color: ACCENT }}>03</span> — {copy.jobsChapter}
            </p>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3.4rem)] font-light tracking-tight">{copy.jobsTitle}</h2>
            <p className="mt-4 max-w-2xl text-gray-400">{copy.jobsSubtitle}</p>
          </LaunchReveal>
          <div className="mt-12">{children}</div>
        </div>
      </section>
    );
  }

  if (level === 'professionals') {
    return (
      <section id="jobs" className="relative scroll-mt-28 border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl gap-12 px-6 md:px-12">
          <span
            aria-hidden="true"
            className="sticky top-32 hidden h-min font-mono text-[5.5rem] leading-none text-white/[0.07] lg:block"
          >
            03
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400">{copy.jobsChapter}</p>
            <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-light tracking-tight">{copy.jobsTitle}</h2>
            <p className="mt-3 max-w-lg text-sm text-gray-400">{copy.jobsSubtitle}</p>
            <div className="mt-12">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="jobs" className="relative z-10 scroll-mt-28 border-t border-white/10 bg-[#04060b] py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-gray-400">
          <span style={{ color: ACCENT }}>03</span> — {copy.jobsChapter}
        </p>
        <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-light tracking-tight">{copy.jobsTitle}</h2>
        <p className="mt-5 text-gray-400">{copy.jobsSubtitle}</p>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function FinalCtaFrame({
  level,
  copy,
}: {
  level: 'students' | 'graduates' | 'professionals' | 'leaders';
  copy: CareerLevelCopy;
}) {
  const reduce = useMotionOff();
  const cta = (
    <>
      <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.05] tracking-tight">{copy.finalTitle}</h2>
      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-400">{copy.finalSubtitle}</p>
      <a
        href="mailto:careers@quantiva-advisory.com"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-teal-400 px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-500/30"
      >
        {copy.finalCta}
        <ArrowRight className="h-4 w-4" />
      </a>
    </>
  );

  if (level === 'graduates') {
    return (
      <section className="relative overflow-hidden border-t border-white/10 py-20 md:py-24">
        <LaunchReveal>
          <div className="mx-auto max-w-4xl px-6 text-center md:px-12">{cta}</div>
        </LaunchReveal>
      </section>
    );
  }

  if (level === 'leaders') {
    return (
      <section className="relative z-10 overflow-hidden border-t border-white/10 bg-[#04060b] py-32 text-center">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, letterSpacing: '0.12em' }}
          whileInView={{ opacity: 1, letterSpacing: '0em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mx-auto max-w-4xl px-6"
        >
          {cta}
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-t border-white/10 py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(600px circle at 50% 120%, ${ACCENT}18, transparent 65%)` }}
      />
      <DiscoverReveal>
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">{cta}</div>
      </DiscoverReveal>
    </section>
  );
}
