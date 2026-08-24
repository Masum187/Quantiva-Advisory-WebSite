'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef, type CSSProperties } from 'react';
import { FORGE_HOME, ForgeLocale, forgePath } from '../../lib/data/forge-content';
import { MOTION_DURATION, MOTION_EASE_OUT } from '../../lib/motion';
import ForgeCanvasVisual from './ForgeCanvasVisual';
import GlowOrb from './motion/GlowOrb';
import BentoServicesSection from './sections/BentoServicesSection';
import FaqSection from './sections/FaqSection';
import FinalCtaSection from './sections/FinalCtaSection';
import ProcessTimelineSection from './sections/ProcessTimelineSection';
import StickyFeatureSection from './sections/StickyFeatureSection';

export default function ForgeHome({ locale }: { locale: ForgeLocale }) {
  const t = FORGE_HOME[locale];
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const headlineWords = t.headline.split(/\s+/);

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-svh overflow-hidden pb-20 pt-[7rem] md:pb-28 md:pt-[9rem]"
      >
        <div className="forge-grid-bg pointer-events-none absolute inset-0 opacity-70" />
        <GlowOrb className="-left-32 -top-28 size-[30rem]" />
        <GlowOrb
          color="secondary"
          className="-right-40 top-[36%] size-[34rem]"
        />

        <div className="forge-container relative z-10 flex flex-col items-center">
          <div className="mx-auto flex max-w-[68rem] flex-col items-center text-center">
            <p className="forge-chip border-[rgba(79,143,255,0.3)] bg-[rgba(79,143,255,0.08)] text-[var(--fg)]">
              <span className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" />
              {t.badge}
            </p>

            <h1 className="forge-headline mt-7 max-w-[15ch] text-balance text-[clamp(2.75rem,7vw,6.5rem)]">
              {headlineWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="forge-hero-word mr-[0.22em] inline-block last:mr-0"
                  style={{ '--word-index': index } as CSSProperties}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="mt-7 max-w-[42rem] text-balance text-[1rem] leading-relaxed text-[var(--forge-muted)] md:text-[1.15rem]">
              {t.support}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={forgePath(locale, '/contact')}
                prefetch={false}
                className="forge-cta"
              >
                {t.ctaPrimary}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={forgePath(locale, '/services')}
                prefetch={false}
                className="forge-cta-ghost"
              >
                {t.ctaSecondary}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div
            className="mt-16 w-full [perspective:1200px] md:mt-20"
            aria-label={locale === 'de' ? 'Produktdemo' : 'Product demo'}
          >
            <motion.div
              style={reduce ? undefined : { rotateX, scale, opacity }}
              className="origin-top"
            >
              <motion.div
                initial={reduce ? false : { opacity: 1, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: MOTION_DURATION.slow,
                  delay: 0.8,
                  ease: MOTION_EASE_OUT,
                }}
              >
                <ForgeCanvasVisual locale={locale} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-y border-[var(--forge-line)] bg-[var(--forge-bg)]">
        <div className="forge-container flex flex-col gap-2 py-5 md:flex-row md:items-center md:justify-between">
          <p className="forge-meta">{t.proofLabel}</p>
          <p className="text-[0.8rem] tracking-wide text-[var(--forge-muted)]">{t.proof}</p>
        </div>
      </div>

      <StickyFeatureSection locale={locale} />

      <BentoServicesSection locale={locale} />

      <ProcessTimelineSection locale={locale} />

      <FaqSection locale={locale} />

      <FinalCtaSection locale={locale} />
    </>
  );
}
