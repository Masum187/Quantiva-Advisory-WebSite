'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Sparkles } from 'lucide-react';
import Navigation from '../../Navigation';
import { careerAreas } from '../../../lib/data/careerAreas';
import {
  APPLY_MAILTO,
  getNavigationItems,
  getProcessSteps,
  getUiStrings,
  localePath,
  makeMotionPresets,
  type CareerThemeProps,
  type Dir,
} from './shared';

// Deterministic particle positions (percentages) so SSR and client match
const PARTICLES = [
  { left: '12%', top: '18%', delay: 0 },
  { left: '82%', top: '12%', delay: 1.2 },
  { left: '68%', top: '38%', delay: 0.6 },
  { left: '24%', top: '52%', delay: 2.1 },
  { left: '90%', top: '60%', delay: 1.6 },
  { left: '45%', top: '25%', delay: 0.3 },
  { left: '8%', top: '72%', delay: 2.6 },
  { left: '60%', top: '80%', delay: 1.0 },
];

/**
 * "Neural Glow" – dark canvas with a purple→pink→amber climate:
 * animated gradient headline, pulsing glow orbs, floating particles
 * and topic cards with gradient borders that intensify on hover.
 */
export default function ArtificialIntelligencePage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);

  const area = careerAreas['artificial-intelligence'];
  const content = area[lang];
  const ui = getUiStrings(lang, content.title);
  const processSteps = getProcessSteps(lang);
  const navigationItems = getNavigationItems(lang);

  const topicDirs: Dir[] = ['up', 'left', 'right', 'down', 'up', 'right'];

  const gradientText =
    'bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent';
  const animatedGradientText = `${gradientText} bg-[length:200%_200%] ${
    prefersReducedMotion ? '' : 'animate-gradient-shift'
  }`;

  return (
    <div className="min-h-screen bg-[#0a0512] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Pulsing glow orbs (static when reduced motion) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-3xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[28rem] -right-24 w-[420px] h-[420px] rounded-full bg-pink-600/15 blur-3xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-32 left-10 w-[360px] h-[360px] rounded-full bg-amber-500/10 blur-3xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Floating particle dots */}
      {!prefersReducedMotion &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute w-1.5 h-1.5 rounded-full bg-pink-300/60"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -24, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 6 + (i % 3) * 2, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={localePath(lang, '/career')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-purple-400/25 text-white hover:border-pink-400/50 hover:text-pink-200 transition-colors duration-300 mb-16"
          whileHover={prefersReducedMotion ? undefined : { x: -5 }}
        >
          <ChevronLeft className="w-4 h-4" />
          {ui.back}
        </motion.a>

        {/* Hero */}
        <div className="text-center mb-28">
          <motion.div {...zoomIn()}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-amber-400/15 border border-purple-400/30 mb-8">
              <Sparkles className="w-5 h-5 text-pink-300" />
              <span className="font-semibold">{content.title}</span>
            </div>
          </motion.div>

          <motion.h1
            {...zoomIn(0.1)}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className={animatedGradientText}>{content.title}</span>
          </motion.h1>

          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={localePath(lang, '/career#positions')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/40 transition-shadow duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaPositions}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={APPLY_MAILTO}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border-2 border-purple-400/30 text-white font-semibold hover:bg-purple-500/15 hover:border-pink-400/50 transition-colors duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
            </motion.a>
          </motion.div>
        </div>

        {/* Intro – gradient border panel */}
        <motion.div {...zoomIn()} className="mb-28 max-w-4xl mx-auto">
          <div className="rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/50 via-pink-500/35 to-amber-400/35">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#120a1e] p-8 md:p-10">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">{content.intro}</p>
            </div>
          </div>
        </motion.div>

        {/* Topics – gradient border cards */}
        <div className="mb-28">
          <motion.div {...reveal} className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className={gradientText}>{ui.topicsTitle}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{ui.topicsSubtitle}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                {...slideZoom(topicDirs[index % topicDirs.length], (index % 3) * 0.12)}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -8, scale: 1.02, transition: { duration: 0.3 } }
                }
                className="group h-full rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 via-pink-500/25 to-amber-400/25 hover:from-purple-400 hover:via-pink-400 hover:to-amber-300 hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-500"
              >
                <div className="h-full rounded-[calc(1rem-1px)] bg-[#120a1e] p-7">
                  <span className={`block text-4xl font-black mb-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500 ${gradientText}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-pink-200 transition-colors duration-300">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{topic.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Central statement line */}
        <motion.div {...zoomIn()} className="mb-28 text-center py-8 md:py-14">
          <p className={`text-3xl md:text-6xl font-bold tracking-tight leading-tight max-w-5xl mx-auto ${animatedGradientText}`}>
            {content.subtitle}
          </p>
        </motion.div>

        {/* Tech stack */}
        <div className="mb-28">
          <motion.h2 {...reveal} className="text-4xl md:text-6xl font-bold tracking-tight mb-12 text-center">
            <span className={gradientText}>{ui.stackTitle}</span>
          </motion.h2>

          <motion.div
            variants={popContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-wrap justify-center gap-4"
          >
            {content.stack.map((tech) => (
              <motion.span
                key={tech}
                variants={popItem}
                whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.08 }}
                className="rounded-full p-[1px] bg-gradient-to-r from-purple-500/50 via-pink-500/40 to-amber-400/40 hover:from-purple-400 hover:via-pink-400 hover:to-amber-300 transition-all duration-300"
              >
                <span className="block px-6 py-3 rounded-full bg-[#120a1e] font-semibold text-gray-100">
                  {tech}
                </span>
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Roles */}
        <div className="mb-28 max-w-3xl mx-auto">
          <motion.div {...reveal} className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className={gradientText}>{ui.rolesTitle}</span>
            </h2>
            <p className="text-xl text-gray-300">{ui.rolesSubtitle}</p>
          </motion.div>

          <div className="space-y-4">
            {content.roles.map((role, index) => (
              <motion.a
                key={role}
                href={localePath(lang, '/career#positions')}
                {...slideZoom(index % 2 === 0 ? 'left' : 'right', index * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { x: 8, scale: 1.02 }}
                className="group block rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/40 via-pink-500/30 to-amber-400/30 hover:from-purple-400 hover:via-pink-400 hover:to-amber-300 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300"
              >
                <span className="flex items-center justify-between rounded-[calc(1rem-1px)] bg-[#120a1e] p-6">
                  <span className="font-semibold group-hover:text-pink-200 transition-colors duration-300">
                    {role}
                  </span>
                  <ArrowRight className="w-5 h-5 text-pink-400 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Application process */}
        <div className="mb-28">
          <motion.div {...reveal} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className={gradientText}>{ui.processTitle}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{ui.processSubtitle}</p>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ originX: 0 }}
              className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent hidden lg:block"
            />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 relative z-10">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.div key={step.title} {...slideZoom(index % 2 === 0 ? 'up' : 'down', index * 0.15)}>
                    <div className="flex justify-center lg:justify-start mb-6">
                      <div className="w-16 h-16 rounded-full p-[1px] bg-gradient-to-br from-purple-500/60 via-pink-500/50 to-amber-400/50">
                        <div className="w-full h-full rounded-full bg-[#120a1e] flex items-center justify-center relative">
                          <StepIcon className="w-6 h-6 text-pink-300" />
                          <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-12 text-center"
          >
            <p className="inline-block px-6 py-3 rounded-full bg-white/5 border border-purple-400/25 text-gray-300 text-sm">
              {ui.processNote}
            </p>
          </motion.div>
        </div>

        {/* Final CTA – gradient border panel */}
        <motion.div {...zoomIn()} className="text-center">
          <div className="inline-block rounded-3xl p-[1px] bg-gradient-to-r from-purple-500/60 via-pink-500/50 to-amber-400/50">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#120a1e] p-8 md:p-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                <span className={gradientText}>{ui.finalTitle}</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{ui.finalSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={localePath(lang, '/career#positions')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/40 transition-shadow duration-300"
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  {ui.ctaPositions}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={APPLY_MAILTO}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border-2 border-purple-400/30 text-white font-semibold hover:bg-purple-500/15 hover:border-pink-400/50 transition-colors duration-300"
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  {ui.ctaApply}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
