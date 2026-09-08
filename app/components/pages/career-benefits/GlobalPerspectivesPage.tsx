'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Globe2, MapPin, Plane } from 'lucide-react';
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

/**
 * "Night Atlas" – global-perspectives theme: deep night-blue canvas with a
 * dotted world/globe motif, indigo/sky accents and a horizontally scrolling
 * locations & timezone strip.
 */
export default function GlobalPerspectivesPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);

  const benefit = careerBenefits['global-perspectives'];
  const content = benefit[lang];
  const ui = getBenefitUiStrings(lang);
  const navigationItems = getNavigationItems(lang);

  const itemDirs: Dir[] = ['left', 'up', 'right', 'left', 'down', 'right'];

  const eyebrow =
    'text-xs font-semibold uppercase tracking-[0.3em] text-sky-400';

  const orbit = (duration: number) =>
    prefersReducedMotion
      ? undefined
      : {
          rotate: 360,
          transition: { duration, repeat: Infinity, ease: 'linear' as const },
        };

  return (
    <div className="min-h-screen bg-[#030614] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Dotted "world map" texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgba(56,189,248,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-56 right-0 w-[700px] h-[700px] rounded-full bg-indigo-600/15 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={careerHref(lang)}
          className={`inline-flex items-center gap-2 text-sm text-sky-100/70 rounded-full border border-sky-400/25 px-5 py-2.5 hover:text-sky-200 hover:border-sky-400/60 transition-colors duration-300 mb-16 ${focusRing} focus-visible:ring-sky-400`}
          whileHover={prefersReducedMotion ? undefined : { x: -4 }}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          {ui.back}
        </motion.a>

        {/* Hero with dotted globe */}
        <div className="relative mb-28 md:mb-36 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <motion.p {...reveal} className={`${eyebrow} mb-6 flex items-center gap-2`}>
              <Globe2 className="w-4 h-4" aria-hidden="true" />
              {content.badge}
            </motion.p>

            <motion.h1
              {...zoomIn(0.1)}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] mb-8"
            >
              {content.title}
            </motion.h1>

            <motion.p
              {...reveal}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-lg md:text-2xl text-sky-50/80 max-w-2xl leading-relaxed mb-10"
            >
              {content.subtitle}
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href={applyHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sky-400 text-sky-950 font-semibold hover:bg-sky-300 transition-colors duration-300 ${focusRing} focus-visible:ring-sky-400`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaApply}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href={careerHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-sky-400/60 hover:text-sky-200 transition-colors duration-300 ${focusRing} focus-visible:ring-sky-400`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaPositions}
              </motion.a>
            </motion.div>
          </div>

          {/* Dotted globe with orbiting plane */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative hidden lg:block w-80 h-80 mx-auto"
          >
            <div
              className="absolute inset-0 rounded-full border border-sky-400/30"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(56,189,248,0.35) 1.5px, transparent 1.5px)',
                backgroundSize: '18px 18px',
                maskImage: 'radial-gradient(circle, black 60%, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 72%)',
              }}
            />
            {/* Meridian ellipses */}
            <div className="absolute inset-0 rounded-full border border-sky-400/20 scale-x-[0.55]" />
            <div className="absolute inset-0 rounded-full border border-sky-400/15 scale-y-[0.55]" />
            {/* Orbiting plane */}
            <motion.div animate={orbit(20)} className="absolute -inset-6">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 text-sky-300">
                <Plane className="w-5 h-5 rotate-45" />
              </span>
            </motion.div>
          </div>
        </div>

        {/* Intro */}
        <motion.div {...zoomIn()} className="mb-28">
          <div className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-400/[0.06] to-indigo-500/[0.04] p-8 md:p-12 max-w-4xl">
            <p className="text-lg md:text-2xl text-sky-50/90 leading-relaxed">
              {content.intro}
            </p>
          </div>
        </motion.div>

        {/* Facts */}
        <motion.div
          variants={popContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-28"
        >
          {content.facts.map((fact) => (
            <motion.div
              key={fact.label}
              variants={popItem}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center hover:border-sky-400/40 transition-colors duration-300"
            >
              <p className="text-4xl md:text-5xl font-bold text-sky-400 mb-2">{fact.value}</p>
              <p className="text-sm text-sky-50/70 leading-snug">{fact.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefit items */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-12 max-w-2xl">
            <p className={`${eyebrow} mb-4`}>{content.badge}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {content.itemsTitle}
            </h2>
            <p className="text-lg text-sky-50/70">{content.itemsSubtitle}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(itemDirs[index % itemDirs.length], (index % 3) * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-sky-400/50 hover:bg-sky-400/[0.05] transition-colors duration-300"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-sky-400/15 flex items-center justify-center mb-6"
                >
                  <Globe2 className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sky-50/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature: locations & timezone strip */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-12 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {content.featureTitle}
            </h2>
            <p className="text-lg text-sky-50/70">{content.featureSubtitle}</p>
          </motion.div>

          {/* Connecting dotted line */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-9 hidden lg:block border-t-2 border-dotted border-sky-400/30"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {content.featureItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...slideZoom('up', index * 0.09)}
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  className="relative rounded-2xl border border-sky-400/20 bg-[#050a1e] p-7 hover:border-sky-400/60 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      aria-hidden="true"
                      className="w-9 h-9 rounded-full bg-sky-400/15 flex items-center justify-center"
                    >
                      <MapPin className="w-4 h-4 text-sky-400" />
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-400/90">
                      {item.meta}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sky-50/70 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        {content.faq && (
          <div className="mb-28 max-w-3xl">
            <motion.div {...reveal} className="mb-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {ui.faqTitle}
              </h2>
              <p className="text-lg text-sky-50/70">{ui.faqSubtitle}</p>
            </motion.div>

            <div className="space-y-4">
              {content.faq.map((entry, index) => (
                <motion.div
                  key={entry.question}
                  {...slideZoom('up', index * 0.08)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
                >
                  <h3 className="text-lg font-bold mb-3 text-sky-100">{entry.question}</h3>
                  <p className="text-sky-50/70 leading-relaxed">{entry.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <motion.div {...zoomIn()}>
          <div className="relative rounded-3xl border border-sky-400/30 p-10 md:p-16 overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(56,189,248,0.15) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-600/10"
            />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {content.ctaTitle}
              </h2>
              <p className="text-lg md:text-xl text-sky-50/80 mb-8 max-w-2xl">
                {content.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={applyHref(lang)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sky-400 text-sky-950 font-semibold hover:bg-sky-300 transition-colors duration-300 ${focusRing} focus-visible:ring-sky-400`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  {ui.ctaApply}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </motion.a>
                <motion.a
                  href={careerHref(lang)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:border-sky-400/60 hover:text-sky-200 transition-colors duration-300 ${focusRing} focus-visible:ring-sky-400`}
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
