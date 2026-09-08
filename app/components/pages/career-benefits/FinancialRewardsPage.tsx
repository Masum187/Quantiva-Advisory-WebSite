'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Gem, PiggyBank } from 'lucide-react';
import Navigation from '../../Navigation';
import { careerBenefits, type CareerBenefitFact } from '../../../lib/data/careerBenefits';
import {
  applyHref,
  careerHref,
  focusRing,
  getBenefitUiStrings,
  getNavigationItems,
  makeMotionPresets,
  type CareerThemeProps,
  type Dir,
  type Lang,
} from './shared';
import {
  AuroraBlob,
  FadeUp,
  GrainOverlay,
  MarqueeBand,
  MaskedTextReveal,
  ScrollZoom,
  useHeroChoreography,
} from './motion';

/** Animated stat counter – counts up once when scrolled into view. */
function StatCounter({
  fact,
  lang,
  prefersReducedMotion,
}: {
  fact: CareerBenefitFact;
  lang: Lang;
  prefersReducedMotion: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const target = fact.numeric ?? 0;
  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!inView || fact.numeric === undefined) return;
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, target, fact.numeric, prefersReducedMotion]);

  const formatted =
    fact.numeric !== undefined
      ? `${fact.prefix ?? ''}${display.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')}${fact.suffix ?? ''}`
      : fact.value;

  return (
    <p
      ref={ref}
      className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 mb-3 tabular-nums"
    >
      {formatted}
    </p>
  );
}

/**
 * "Private Bank" – premium financial-rewards theme: rich near-black canvas,
 * gold/teal accents, hairline dividers, animated stat counters and a
 * ledger-style benefits breakdown.
 */
export default function FinancialRewardsPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);
  const { heroRef, textStyle, bgStyle } = useHeroChoreography();

  const benefit = careerBenefits['financial-rewards'];
  const content = benefit[lang];
  const ui = getBenefitUiStrings(lang);
  const navigationItems = getNavigationItems(lang);

  const itemDirs: Dir[] = ['left', 'right', 'up', 'down', 'left', 'right'];

  const eyebrow =
    'text-xs font-semibold uppercase tracking-[0.35em] text-amber-300';

  return (
    <div className="min-h-screen bg-[#0b0a08] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Gold & teal ambiance – slow aurora drift */}
      <AuroraBlob
        className="-top-48 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.07] blur-3xl"
        duration={28}
      />
      <AuroraBlob
        className="bottom-0 -right-40 w-[520px] h-[520px] bg-teal-500/[0.07] blur-3xl"
        duration={24}
        delay={6}
      />
      <AuroraBlob
        className="top-1/2 -left-40 w-[440px] h-[440px] bg-amber-400/[0.05] blur-3xl"
        duration={20}
        delay={10}
      />
      <GrainOverlay className="opacity-[0.05]" />
      {/* Fine diagonal hairlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(251,191,36,0.03) 0, rgba(251,191,36,0.03) 1px, transparent 1px, transparent 32px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={careerHref(lang)}
          className={`inline-flex items-center gap-2 text-sm text-amber-100/60 border border-amber-300/20 px-5 py-2.5 hover:text-amber-200 hover:border-amber-300/50 transition-colors duration-300 mb-16 ${focusRing} focus-visible:ring-amber-300`}
          whileHover={prefersReducedMotion ? undefined : { x: -4 }}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          {ui.back}
        </motion.a>

        {/* Hero with scroll choreography */}
        <div ref={heroRef} className="relative mb-28 md:mb-36 text-center max-w-4xl mx-auto">
          {/* Hero glow zooms while the hero scrolls out */}
          <motion.div
            aria-hidden="true"
            style={bgStyle}
            className="pointer-events-none absolute -inset-x-16 -inset-y-12 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08),transparent_65%)]"
          />

          {/* Hero text lifts & fades while scrolling past */}
          <motion.div style={textStyle} className="relative">
          <motion.p
            {...reveal}
            className={`${eyebrow} mb-6 flex items-center justify-center gap-2`}
          >
            <Gem className="w-4 h-4" aria-hidden="true" />
            {content.badge}
          </motion.p>

          <MaskedTextReveal
            as="h1"
            mode="mount"
            delay={0.1}
            text={content.title}
            wordClassName={() =>
              'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-teal-300'
            }
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] mb-8"
          />

          <motion.p
            {...reveal}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="text-lg md:text-2xl text-gray-300 leading-relaxed mb-10"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={applyHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950 font-semibold hover:from-amber-200 hover:to-amber-300 transition-colors duration-300 ${focusRing} focus-visible:ring-amber-300`}
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </motion.a>
            <motion.a
              href={careerHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold hover:border-amber-300/60 hover:text-amber-200 transition-colors duration-300 ${focusRing} focus-visible:ring-amber-300`}
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaPositions}
            </motion.a>
          </motion.div>
          </motion.div>
        </div>

        {/* Animated stat counters – zoom in on scroll */}
        <div className="mb-28">
          <motion.p {...reveal} className={`${eyebrow} mb-8 text-center`}>
            {ui.factsTitle}
          </motion.p>
          <ScrollZoom className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-amber-300/15 border border-amber-300/15">
            {content.facts.map((fact, index) => (
              <motion.div
                key={fact.label}
                {...slideZoom(index % 2 === 0 ? 'up' : 'down', index * 0.08)}
                className="bg-[#0b0a08] p-8 text-center hover:bg-amber-300/[0.04] transition-colors duration-300"
              >
                <StatCounter
                  fact={fact}
                  lang={lang}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <p className="text-sm text-gray-400 leading-snug">{fact.label}</p>
              </motion.div>
            ))}
          </ScrollZoom>
        </div>

        {/* Marquee divider */}
        <MarqueeBand
          phrases={content.marquee}
          className="border-y border-amber-300/20 bg-amber-300/[0.03] py-6 md:py-8 mb-28"
          textClassName="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-teal-300"
        />

        {/* Intro */}
        <motion.div {...zoomIn()} className="mb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div
              aria-hidden="true"
              className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-8"
            />
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed">
              {content.intro}
            </p>
            <div
              aria-hidden="true"
              className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-8"
            />
          </div>
        </motion.div>

        {/* Benefit items */}
        <div className="mb-28">
          <div className="mb-12 max-w-2xl">
            <FadeUp>
              <p className={`${eyebrow} mb-4`}>{content.badge}</p>
            </FadeUp>
            <MaskedTextReveal
              as="h2"
              text={content.itemsTitle}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            />
            <FadeUp delay={0.25}>
              <p className="text-lg text-gray-400">{content.itemsSubtitle}</p>
            </FadeUp>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(itemDirs[index % itemDirs.length], (index % 3) * 0.1)}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -6, rotateX: 3, rotateY: 3 }
                }
                style={{ transformPerspective: 900 }}
                className="border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 hover:border-amber-300/50 transition-colors duration-300"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 border border-amber-300/30 flex items-center justify-center mb-6"
                >
                  <PiggyBank className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature: ledger-style package breakdown – zooms in on scroll */}
        <div className="mb-28">
          <div className="mb-12 max-w-2xl">
            <MaskedTextReveal
              as="h2"
              text={content.featureTitle}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            />
            <FadeUp delay={0.25}>
              <p className="text-lg text-gray-400">{content.featureSubtitle}</p>
            </FadeUp>
          </div>

          <ScrollZoom>
          <motion.div
            variants={popContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="border border-amber-300/20 divide-y divide-amber-300/10"
          >
            {content.featureItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={popItem}
                className="group grid gap-3 md:grid-cols-[64px_1fr_1.4fr_auto] md:items-center p-6 md:p-8 hover:bg-amber-300/[0.04] transition-colors duration-300"
              >
                <span className="text-sm text-amber-300/60 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl md:text-2xl font-bold group-hover:text-amber-200 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                <span className="justify-self-start md:justify-self-end text-sm font-semibold text-teal-300 border border-teal-300/30 px-3 py-1.5 whitespace-nowrap">
                  {item.meta}
                </span>
              </motion.div>
            ))}
          </motion.div>
          </ScrollZoom>
        </div>

        {/* FAQ */}
        {content.faq && (
          <div className="mb-28 max-w-3xl">
            <div className="mb-10">
              <MaskedTextReveal
                as="h2"
                text={ui.faqTitle}
                className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              />
              <FadeUp delay={0.25}>
                <p className="text-lg text-gray-400">{ui.faqSubtitle}</p>
              </FadeUp>
            </div>

            <div className="space-y-4">
              {content.faq.map((entry, index) => (
                <motion.div
                  key={entry.question}
                  {...slideZoom('up', index * 0.08)}
                  className="border border-white/10 bg-white/[0.02] p-8"
                >
                  <h3 className="text-lg font-bold mb-3 text-amber-100">{entry.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{entry.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <motion.div {...zoomIn()}>
          <div className="relative border border-amber-300/30 bg-gradient-to-br from-amber-400/[0.08] via-transparent to-teal-500/[0.08] p-10 md:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"
            />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {content.ctaTitle}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              {content.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={applyHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950 font-semibold hover:from-amber-200 hover:to-amber-300 transition-colors duration-300 ${focusRing} focus-visible:ring-amber-300`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaApply}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href={careerHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold hover:border-amber-300/60 hover:text-amber-200 transition-colors duration-300 ${focusRing} focus-visible:ring-amber-300`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaPositions}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
