'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Compass } from 'lucide-react';
import Navigation from '../../Navigation';
import { careerBenefits } from '../../../lib/data/careerBenefits';
import {
  applyHref,
  careerHref,
  focusRing,
  getBenefitUiStrings,
  getNavigationItems,
  makeMotionPresets,
  type CareerThemeProps,
  type Dir,
} from './shared';
import {
  AuroraBlob,
  FadeUp,
  MarqueeBand,
  MaskedTextReveal,
  ScrollZoom,
  useHeroChoreography,
} from './motion';

/** Sticky-note accent palette for the values timeline (light section). */
const stickyStyles = [
  { bg: 'bg-yellow-200', rotate: 'md:-rotate-2' },
  { bg: 'bg-pink-200', rotate: 'md:rotate-1' },
  { bg: 'bg-emerald-200', rotate: 'md:-rotate-1' },
  { bg: 'bg-sky-200', rotate: 'md:rotate-2' },
];

/**
 * "Editorial" – purpose theme with magazine-like typography: dark canvas
 * for hero and benefits, then a deliberately LIGHT paper-toned section with
 * sticky-note value cards along a vertical timeline.
 */
export default function PurposePage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);
  const { heroRef, textStyle, bgStyle } = useHeroChoreography();

  const benefit = careerBenefits['purpose'];
  const content = benefit[lang];
  const ui = getBenefitUiStrings(lang);
  const navigationItems = getNavigationItems(lang);

  const itemDirs: Dir[] = ['left', 'right', 'left', 'right', 'left', 'right'];

  const eyebrow =
    'text-xs font-semibold uppercase tracking-[0.35em] text-purple-300';

  return (
    <div className="min-h-screen bg-[#0d0a14] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Drifting aurora background */}
      <AuroraBlob
        className="-top-40 left-1/3 w-[560px] h-[560px] bg-purple-600/10 blur-3xl"
        duration={26}
      />
      <AuroraBlob
        className="top-[40rem] -right-40 w-[480px] h-[480px] bg-purple-400/[0.07] blur-3xl"
        duration={30}
        delay={6}
      />
      <AuroraBlob
        className="bottom-20 -left-32 w-[420px] h-[420px] bg-violet-600/[0.08] blur-3xl"
        duration={22}
        delay={10}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        {/* Back link */}
        <motion.a
          href={careerHref(lang)}
          className={`inline-flex items-center gap-2 text-sm text-purple-100/70 border-b border-purple-300/30 pb-1 hover:text-purple-200 hover:border-purple-300 transition-colors duration-300 mb-16 ${focusRing} focus-visible:ring-purple-300`}
          whileHover={prefersReducedMotion ? undefined : { x: -4 }}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          {ui.back}
        </motion.a>

        {/* Editorial hero with scroll choreography */}
        <div ref={heroRef} className="relative mb-28 md:mb-32">
          {/* Hero glow zooms while the hero scrolls out */}
          <motion.div
            aria-hidden="true"
            style={bgStyle}
            className="pointer-events-none absolute -inset-x-8 -inset-y-12 bg-[radial-gradient(ellipse_at_20%_30%,rgba(168,85,247,0.10),transparent_60%)]"
          />

          {/* Hero text lifts & fades while scrolling past */}
          <motion.div style={textStyle} className="relative">
          <motion.p {...reveal} className={`${eyebrow} mb-6 flex items-center gap-2`}>
            <Compass className="w-4 h-4" aria-hidden="true" />
            {content.badge}
          </motion.p>

          <MaskedTextReveal
            as="h1"
            mode="mount"
            delay={0.1}
            text={content.title}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-4 max-w-4xl"
          />

          <motion.p
            {...reveal}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="text-2xl md:text-4xl font-normal italic text-purple-200/80 tracking-normal mb-8 max-w-4xl"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={applyHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-purple-400 text-purple-950 font-semibold hover:bg-purple-300 transition-colors duration-300 ${focusRing} focus-visible:ring-purple-300`}
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </motion.a>
            <motion.a
              href={careerHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-semibold hover:border-purple-300/60 hover:text-purple-200 transition-colors duration-300 ${focusRing} focus-visible:ring-purple-300`}
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaPositions}
            </motion.a>
          </motion.div>
          </motion.div>
        </div>

        {/* Intro – editorial two-column layout with drop-cap feel */}
        <motion.div {...zoomIn()} className="mb-28 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 max-w-5xl">
          <p className={`${eyebrow} md:pt-2`}>
            {lang === 'de' ? 'Standpunkt' : 'Point of view'}
          </p>
          <p className="text-lg md:text-2xl text-purple-50/90 leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:text-purple-300 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            {content.intro}
          </p>
        </motion.div>

        {/* Facts – editorial rule lines, zoom in on scroll */}
        <ScrollZoom className="mb-28">
        <motion.div
          variants={popContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/15"
        >
          {content.facts.map((fact) => (
            <motion.div
              key={fact.label}
              variants={popItem}
              className="border-b border-white/15 p-6 lg:border-b-0 lg:border-r lg:last:border-r-0 border-r odd:border-r lg:odd:border-r"
            >
              <p className="text-4xl md:text-5xl font-bold text-purple-300 mb-2">
                {fact.value}
              </p>
              <p className="text-sm text-purple-50/60 leading-snug">{fact.label}</p>
            </motion.div>
          ))}
        </motion.div>
        </ScrollZoom>

        {/* Marquee divider */}
        <MarqueeBand
          phrases={content.marquee}
          className="border-y border-purple-300/25 py-6 md:py-8 mb-28"
          textClassName="text-3xl md:text-5xl font-bold tracking-tight text-purple-200/90"
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
              <p className="text-lg text-purple-50/60">{content.itemsSubtitle}</p>
            </FadeUp>
          </div>

          <div className="border-t border-white/10">
            {content.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(itemDirs[index % itemDirs.length], (index % 2) * 0.1)}
                className="group grid gap-3 md:grid-cols-[80px_1fr_1.3fr] md:gap-10 items-baseline py-8 md:py-10 border-b border-white/10 hover:bg-purple-400/[0.05] transition-colors duration-300 px-2 md:px-4"
              >
                <span className="text-sm text-purple-300/70 font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-purple-200 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-purple-50/60 leading-relaxed group-hover:text-purple-50/80 transition-colors duration-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHT editorial section: values timeline with sticky notes */}
      <section className="relative bg-[#f6f3ec] text-gray-900 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <FadeUp>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-700 mb-4">
                {lang === 'de' ? 'Unsere Werte' : 'Our values'}
              </p>
            </FadeUp>
            <MaskedTextReveal
              as="h2"
              text={content.featureTitle}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900"
            />
            <FadeUp delay={0.25}>
              <p className="text-lg text-gray-600">{content.featureSubtitle}</p>
            </FadeUp>
          </div>

          {/* Vertical timeline */}
          <div className="relative pl-8 md:pl-0">
            <div
              aria-hidden="true"
              className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gray-300"
            />
            <div className="space-y-12 md:space-y-16">
              {content.featureItems.map((item, index) => {
                const sticky = stickyStyles[index % stickyStyles.length];
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={item.title}
                    {...slideZoom(isLeft ? 'left' : 'right', 0.05)}
                    className={`relative md:w-[calc(50%-3rem)] ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    {/* Timeline dot */}
                    <span
                      aria-hidden="true"
                      className={`absolute top-8 w-3.5 h-3.5 rounded-full bg-purple-600 ring-4 ring-[#f6f3ec] -left-[31px] md:left-auto ${
                        isLeft ? 'md:-right-[55px]' : 'md:-left-[55px]'
                      }`}
                    />
                    <div
                      className={`${sticky.bg} ${sticky.rotate} rounded-sm shadow-[0_14px_30px_rgba(0,0,0,0.12)] p-8 md:p-10`}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-700/70 mb-3">
                        {item.meta}
                      </p>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
                <p className="text-lg text-purple-50/60">{ui.faqSubtitle}</p>
              </FadeUp>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {content.faq.map((entry, index) => (
                <motion.div key={entry.question} {...slideZoom('up', index * 0.08)} className="py-8">
                  <h3 className="text-lg font-bold mb-3 text-purple-100">{entry.question}</h3>
                  <p className="text-purple-50/60 leading-relaxed">{entry.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <motion.div {...zoomIn()}>
          <div className="relative rounded-lg border border-purple-300/30 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-800/10 p-10 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {content.ctaTitle}
            </h2>
            <p className="text-lg md:text-xl text-purple-50/80 mb-8 max-w-2xl">
              {content.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={applyHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-purple-400 text-purple-950 font-semibold hover:bg-purple-300 transition-colors duration-300 ${focusRing} focus-visible:ring-purple-300`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaApply}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href={careerHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white font-semibold hover:border-purple-300/60 hover:text-purple-200 transition-colors duration-300 ${focusRing} focus-visible:ring-purple-300`}
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
