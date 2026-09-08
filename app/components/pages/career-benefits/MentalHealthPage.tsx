'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Leaf, Wind } from 'lucide-react';
import Navigation from '../../Navigation';
import { careerBenefits } from '../../../lib/data/careerBenefits';
import {
  applyHref,
  careerHref,
  focusRing,
  getBenefitUiStrings,
  getNavigationItems,
  localePath,
  makeMotionPresets,
  type CareerThemeProps,
  type Dir,
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

/**
 * "Deep Breath" – calm, airy wellbeing theme: dark sage/teal canvas, soft
 * radial gradients, a slow breathing pulse motif and generously rounded,
 * frosted cards. Everything moves slowly and gently.
 */
export default function MentalHealthPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);
  const { heroRef, textStyle, bgStyle } = useHeroChoreography();

  const benefit = careerBenefits['mental-health'];
  const content = benefit[lang];
  const ui = getBenefitUiStrings(lang);
  const navigationItems = getNavigationItems(lang);

  const itemDirs: Dir[] = ['left', 'up', 'right', 'left', 'down', 'right'];

  // Slow "breathing" loop for the decorative pulse rings
  const breathe = (scaleTo: number, duration: number, delay = 0) =>
    prefersReducedMotion
      ? undefined
      : {
          scale: [1, scaleTo, 1],
          opacity: [0.5, 0.9, 0.5],
          transition: {
            duration,
            delay,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };

  const eyebrow =
    'text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/90';

  return (
    <div className="min-h-screen bg-[#07130f] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Slowly drifting aurora background */}
      <AuroraBlob
        className="-top-48 -left-32 w-[640px] h-[640px] bg-emerald-500/10 blur-3xl"
        duration={26}
      />
      <AuroraBlob
        className="top-1/3 -right-48 w-[560px] h-[560px] bg-teal-400/10 blur-3xl"
        duration={30}
        delay={4}
      />
      <AuroraBlob
        className="bottom-0 left-1/4 w-[480px] h-[480px] bg-emerald-400/[0.06] blur-3xl"
        duration={22}
        delay={8}
      />
      <GrainOverlay className="opacity-[0.04]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={careerHref(lang)}
          className={`inline-flex items-center gap-2 text-sm text-emerald-100/70 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 hover:text-emerald-200 hover:border-emerald-300/40 transition-colors duration-500 mb-16 ${focusRing} focus-visible:ring-emerald-300`}
          whileHover={prefersReducedMotion ? undefined : { x: -4 }}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          {ui.back}
        </motion.a>

        {/* Hero with breathing rings + scroll choreography */}
        <div ref={heroRef} className="relative mb-28 md:mb-36">
          {/* Background motif zooms 1 → 1.15 while the hero scrolls out */}
          <motion.div
            aria-hidden="true"
            style={bgStyle}
            className="pointer-events-none absolute right-0 top-0 hidden md:block w-72 h-72 -translate-y-8"
          >
            <motion.div
              animate={breathe(1.15, 7)}
              className="absolute inset-0 rounded-full border border-emerald-300/25"
            />
            <motion.div
              animate={breathe(1.25, 7, 0.6)}
              className="absolute inset-8 rounded-full border border-teal-300/20"
            />
            <motion.div
              animate={breathe(1.12, 7, 1.2)}
              className="absolute inset-16 rounded-full bg-emerald-400/10"
            />
          </motion.div>

          {/* Hero text lifts & fades while scrolling past */}
          <motion.div style={textStyle}>
          <motion.p {...reveal} className={`${eyebrow} mb-6 flex items-center gap-2`}>
            <Leaf className="w-4 h-4" aria-hidden="true" />
            {content.badge}
          </motion.p>

          <MaskedTextReveal
            as="h1"
            mode="mount"
            delay={0.1}
            text={content.title}
            suffix={<span className="text-emerald-300">.</span>}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] mb-8 max-w-3xl"
          />

          <motion.p
            {...reveal}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="text-lg md:text-2xl text-emerald-50/80 max-w-2xl leading-relaxed mb-10"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={applyHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-300 text-emerald-950 font-semibold hover:bg-emerald-200 transition-colors duration-500 ${focusRing} focus-visible:ring-emerald-300`}
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </motion.a>
            <motion.a
              href={careerHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-emerald-300/50 hover:text-emerald-200 transition-colors duration-500 ${focusRing} focus-visible:ring-emerald-300`}
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaPositions}
            </motion.a>
          </motion.div>
          </motion.div>
        </div>

        {/* Intro */}
        <motion.div {...zoomIn()} className="mb-28">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-14 max-w-4xl">
            <p className={`${eyebrow} mb-5`}>{lang === 'de' ? 'Warum uns das wichtig ist' : 'Why this matters to us'}</p>
            <p className="text-lg md:text-2xl text-emerald-50/90 leading-relaxed">
              {content.intro}
            </p>
          </div>
        </motion.div>

        {/* Facts – zoom in on scroll */}
        <ScrollZoom className="mb-28">
          <motion.div
            variants={popContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {content.facts.map((fact) => (
              <motion.div
                key={fact.label}
                variants={popItem}
                className="rounded-3xl border border-emerald-300/15 bg-emerald-400/[0.05] p-6 text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-emerald-300 mb-2">
                  {fact.value}
                </p>
                <p className="text-sm text-emerald-50/70 leading-snug">{fact.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </ScrollZoom>

        {/* Marquee divider */}
        <MarqueeBand
          phrases={content.marquee}
          className="rounded-[2.5rem] border border-emerald-300/15 bg-emerald-400/[0.05] py-6 md:py-8 mb-28"
          textClassName="text-3xl md:text-5xl font-bold tracking-tight text-emerald-200/90"
        />

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
              <p className="text-lg text-emerald-50/70">{content.itemsSubtitle}</p>
            </FadeUp>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(itemDirs[index % itemDirs.length], (index % 3) * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-emerald-300/40 hover:bg-emerald-400/[0.05] transition-colors duration-500"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-emerald-400/15 flex items-center justify-center mb-6"
                >
                  <Wind className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-emerald-50/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature: a week with room to breathe – zooms in on scroll */}
        <div className="mb-28">
          <div className="mb-12 max-w-2xl">
            <MaskedTextReveal
              as="h2"
              text={content.featureTitle}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            />
            <FadeUp delay={0.25}>
              <p className="text-lg text-emerald-50/70">{content.featureSubtitle}</p>
            </FadeUp>
          </div>

          <ScrollZoom className="grid gap-6 md:grid-cols-2">
            {content.featureItems.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(index % 2 === 0 ? 'left' : 'right', (index % 2) * 0.12)}
                className="relative rounded-[2rem] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/[0.07] to-teal-400/[0.03] p-8 md:p-10 overflow-hidden"
              >
                <motion.div
                  aria-hidden="true"
                  animate={breathe(1.3, 8, index * 0.8)}
                  className="pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-emerald-300/10"
                />
                {item.meta && (
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300 mb-4">
                    {item.meta}
                  </p>
                )}
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-emerald-50/75 leading-relaxed relative">{item.description}</p>
              </motion.div>
            ))}
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
                <p className="text-lg text-emerald-50/70">{ui.faqSubtitle}</p>
              </FadeUp>
            </div>

            <div className="space-y-4">
              {content.faq.map((entry, index) => (
                <motion.div
                  key={entry.question}
                  {...slideZoom('up', index * 0.08)}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
                >
                  <h3 className="text-lg font-bold mb-3 text-emerald-100">
                    {entry.question}
                  </h3>
                  <p className="text-emerald-50/70 leading-relaxed">{entry.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <motion.div {...zoomIn()}>
          <div className="relative rounded-[2.5rem] border border-emerald-300/25 bg-gradient-to-br from-emerald-400/10 via-transparent to-teal-400/10 p-10 md:p-16 overflow-hidden text-center">
            <motion.div
              aria-hidden="true"
              animate={breathe(1.2, 9)}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-emerald-300/15"
            />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {content.ctaTitle}
              </h2>
              <p className="text-lg md:text-xl text-emerald-50/80 mb-10 max-w-2xl mx-auto">
                {content.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={applyHref(lang)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-300 text-emerald-950 font-semibold hover:bg-emerald-200 transition-colors duration-500 ${focusRing} focus-visible:ring-emerald-300`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  {ui.ctaApply}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </motion.a>
                <motion.a
                  href={localePath(lang, '/career')}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-emerald-300/50 hover:text-emerald-200 transition-colors duration-500 ${focusRing} focus-visible:ring-emerald-300`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  {ui.ctaPositions}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
