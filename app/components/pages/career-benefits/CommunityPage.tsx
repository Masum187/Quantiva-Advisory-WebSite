'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, HeartHandshake, Users } from 'lucide-react';
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
 * "Orbit" – warm, people-centric community theme: deep warm-brown canvas,
 * amber/orange accents, orbiting connection dots around the hero and a
 * staggered, offset card grid that feels like a group photo wall.
 */
export default function CommunityPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);

  const benefit = careerBenefits['community'];
  const content = benefit[lang];
  const ui = getBenefitUiStrings(lang);
  const navigationItems = getNavigationItems(lang);

  const itemDirs: Dir[] = ['up', 'down', 'up', 'down', 'up', 'down'];

  const eyebrow =
    'text-xs font-semibold uppercase tracking-[0.3em] text-amber-400';

  const spin = (duration: number, reverse = false) =>
    prefersReducedMotion
      ? undefined
      : {
          rotate: reverse ? -360 : 360,
          transition: { duration, repeat: Infinity, ease: 'linear' as const },
        };

  return (
    <div className="min-h-screen bg-[#140d08] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={careerHref(lang)}
          className={`inline-flex items-center gap-2 text-sm text-amber-100/70 rounded-full border border-amber-400/20 px-5 py-2.5 hover:text-amber-200 hover:border-amber-400/50 transition-colors duration-300 mb-16 ${focusRing} focus-visible:ring-amber-400`}
          whileHover={prefersReducedMotion ? undefined : { x: -4 }}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          {ui.back}
        </motion.a>

        {/* Hero with orbit motif */}
        <div className="relative mb-28 md:mb-36 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <motion.p {...reveal} className={`${eyebrow} mb-6 flex items-center gap-2`}>
              <HeartHandshake className="w-4 h-4" aria-hidden="true" />
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
              className="text-lg md:text-2xl text-amber-50/80 max-w-2xl leading-relaxed mb-10"
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
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-amber-400 text-amber-950 font-semibold hover:bg-amber-300 transition-colors duration-300 ${focusRing} focus-visible:ring-amber-400`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaApply}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href={careerHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:border-amber-400/60 hover:text-amber-200 transition-colors duration-300 ${focusRing} focus-visible:ring-amber-400`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaPositions}
              </motion.a>
            </motion.div>
          </div>

          {/* Orbiting connection dots */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative hidden lg:block w-80 h-80 mx-auto"
          >
            <div className="absolute inset-0 rounded-full border border-amber-400/20" />
            <div className="absolute inset-10 rounded-full border border-amber-400/15" />
            <div className="absolute inset-20 rounded-full border border-orange-400/15" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center">
              <Users className="w-7 h-7 text-amber-300" />
            </div>
            <motion.div animate={spin(24)} className="absolute inset-0">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400" />
            </motion.div>
            <motion.div animate={spin(18, true)} className="absolute inset-10">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-orange-400" />
            </motion.div>
            <motion.div animate={spin(30)} className="absolute inset-20">
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-200" />
            </motion.div>
          </div>
        </div>

        {/* Intro */}
        <motion.div {...zoomIn()} className="mb-28">
          <div className="border-l-4 border-amber-400 rounded-r-3xl bg-amber-400/[0.05] pl-8 pr-8 py-8 md:py-10 max-w-4xl">
            <p className="text-lg md:text-2xl text-amber-50/90 leading-relaxed">
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
              className="rounded-2xl border border-amber-400/20 bg-gradient-to-b from-amber-400/[0.08] to-transparent p-6"
            >
              <p className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">
                {fact.value}
              </p>
              <p className="text-sm text-amber-50/70 leading-snug">{fact.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefit items – staggered, offset people grid */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-12 max-w-2xl">
            <p className={`${eyebrow} mb-4`}>{content.badge}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {content.itemsTitle}
            </h2>
            <p className="text-lg text-amber-50/70">{content.itemsSubtitle}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(itemDirs[index % itemDirs.length], (index % 3) * 0.12)}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -8, rotate: index % 2 === 0 ? -1 : 1 }
                }
                className={`rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:border-amber-400/50 hover:bg-amber-400/[0.06] transition-colors duration-300 ${
                  index % 3 === 1 ? 'lg:translate-y-8' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex w-11 h-11 rounded-full bg-amber-400/15 text-amber-300 items-center justify-center font-bold mb-6"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-amber-50/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature: rituals */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-12 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {content.featureTitle}
            </h2>
            <p className="text-lg text-amber-50/70">{content.featureSubtitle}</p>
          </motion.div>

          <div className="space-y-4">
            {content.featureItems.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(index % 2 === 0 ? 'left' : 'right', index * 0.08)}
                className="group grid gap-4 md:grid-cols-[160px_1fr_1.4fr] md:items-baseline rounded-2xl border border-amber-400/15 bg-gradient-to-r from-amber-400/[0.06] to-transparent p-6 md:p-8 hover:border-amber-400/40 transition-colors duration-300"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
                  {item.meta}
                </p>
                <h3 className="text-2xl font-bold group-hover:text-amber-200 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-amber-50/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        {content.faq && (
          <div className="mb-28 max-w-3xl">
            <motion.div {...reveal} className="mb-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {ui.faqTitle}
              </h2>
              <p className="text-lg text-amber-50/70">{ui.faqSubtitle}</p>
            </motion.div>

            <div className="space-y-4">
              {content.faq.map((entry, index) => (
                <motion.div
                  key={entry.question}
                  {...slideZoom('up', index * 0.08)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
                >
                  <h3 className="text-lg font-bold mb-3 text-amber-100">{entry.question}</h3>
                  <p className="text-amber-50/70 leading-relaxed">{entry.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <motion.div {...zoomIn()}>
          <div className="relative rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 via-transparent to-orange-500/10 p-10 md:p-16 overflow-hidden">
            <motion.div
              aria-hidden="true"
              animate={spin(40)}
              className="pointer-events-none absolute -right-24 -top-24 w-72 h-72 rounded-full border border-amber-400/20"
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400/70" />
            </motion.div>
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {content.ctaTitle}
              </h2>
              <p className="text-lg md:text-xl text-amber-50/80 mb-8 max-w-2xl">
                {content.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={applyHref(lang)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-amber-400 text-amber-950 font-semibold hover:bg-amber-300 transition-colors duration-300 ${focusRing} focus-visible:ring-amber-400`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  {ui.ctaApply}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </motion.a>
                <motion.a
                  href={careerHref(lang)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:border-amber-400/60 hover:text-amber-200 transition-colors duration-300 ${focusRing} focus-visible:ring-amber-400`}
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
