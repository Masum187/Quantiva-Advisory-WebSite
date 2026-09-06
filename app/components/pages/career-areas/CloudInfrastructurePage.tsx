'use client';

import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ChevronLeft, Cloud } from 'lucide-react';
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

/**
 * "Sky Gradient" – deep indigo/blue climate instead of teal/purple:
 * slowly drifting glow orbs, glassmorphism cards in a staggered layout
 * and a scroll parallax hero (headline moves slower than the content).
 */
export default function CloudInfrastructurePage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);

  const area = careerAreas['cloud-infrastructure'];
  const content = area[lang];
  const ui = getUiStrings(lang, content.title);
  const processSteps = getProcessSteps(lang);
  const navigationItems = getNavigationItems(lang);

  // Hero parallax: the headline scrolls slower than the rest
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  const topicDirs: Dir[] = ['left', 'up', 'right', 'down', 'left', 'right'];

  const glassCard =
    'rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15';

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Sky gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-indigo-950/80 to-[#0a0e27]"
      />

      {/* Slowly drifting glow orbs (static when reduced motion) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-32 w-[520px] h-[520px] rounded-full bg-indigo-600/25 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 60, -20, 0], y: [0, 40, 80, 0] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[30rem] -right-40 w-[460px] h-[460px] rounded-full bg-cyan-500/15 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -70, 30, 0], y: [0, -50, 20, 0] }
        }
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-40 left-1/3 w-[380px] h-[380px] rounded-full bg-blue-600/15 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 50, -50, 0], y: [0, -30, 30, 0] }
        }
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={localePath(lang, '/career')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/15 text-white hover:border-cyan-300/50 hover:text-cyan-200 transition-colors duration-300 mb-16"
          whileHover={prefersReducedMotion ? undefined : { x: -5 }}
        >
          <ChevronLeft className="w-4 h-4" />
          {ui.back}
        </motion.a>

        {/* Hero with parallax headline */}
        <div ref={heroRef} className="text-center mb-28">
          <motion.div
            style={prefersReducedMotion ? undefined : { y: headlineY, opacity: headlineOpacity }}
          >
            <motion.div {...zoomIn()}>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/15 border border-indigo-400/30 backdrop-blur-sm mb-8">
                <Cloud className="w-5 h-5 text-cyan-300" />
                <span className="font-semibold text-indigo-100">{content.title}</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  {content.title}
                </span>
              </h1>
            </motion.div>
          </motion.div>

          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-indigo-100/80 max-w-3xl mx-auto leading-relaxed mb-10"
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/40 transition-shadow duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaPositions}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={APPLY_MAILTO}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.06] backdrop-blur-sm border-2 border-indigo-400/30 text-white font-semibold hover:bg-indigo-500/15 transition-colors duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
            </motion.a>
          </motion.div>
        </div>

        {/* Intro – glass panel */}
        <motion.div {...zoomIn()} className="mb-28 max-w-4xl mx-auto">
          <div className={`${glassCard} p-8 md:p-10 hover:border-cyan-300/30 transition-colors duration-500`}>
            <p className="text-lg md:text-xl text-indigo-50/90 leading-relaxed">
              {content.intro}
            </p>
          </div>
        </motion.div>

        {/* Topics – staggered glass cards */}
        <div className="mb-28">
          <motion.div {...reveal} className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                {ui.topicsTitle}
              </span>
            </h2>
            <p className="text-xl text-indigo-100/70 max-w-3xl mx-auto">{ui.topicsSubtitle}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                {...slideZoom(topicDirs[index % topicDirs.length], (index % 3) * 0.12)}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -10, scale: 1.03, transition: { duration: 0.3 } }
                }
                className={`${glassCard} group p-8 hover:border-cyan-300/40 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 ${
                  index % 2 === 1 ? 'lg:mt-12' : ''
                }`}
              >
                <span className="block text-sm font-semibold text-cyan-300/80 mb-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-200 transition-colors duration-300">
                  {topic.title}
                </h3>
                <p className="text-indigo-100/70 text-sm leading-relaxed">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-28">
          <motion.h2 {...reveal} className="text-4xl md:text-6xl font-bold tracking-tight mb-12 text-center">
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              {ui.stackTitle}
            </span>
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
                className="px-6 py-3 rounded-full bg-white/[0.06] backdrop-blur-sm border border-indigo-400/30 text-indigo-50 font-semibold hover:border-cyan-300/60 hover:bg-indigo-500/15 transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Roles */}
        <div className="mb-28 max-w-3xl mx-auto">
          <motion.div {...reveal} className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                {ui.rolesTitle}
              </span>
            </h2>
            <p className="text-xl text-indigo-100/70">{ui.rolesSubtitle}</p>
          </motion.div>

          <div className="space-y-4">
            {content.roles.map((role, index) => (
              <motion.a
                key={role}
                href={localePath(lang, '/career#positions')}
                {...slideZoom(index % 2 === 0 ? 'left' : 'right', index * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { x: 8, scale: 1.02 }}
                className={`${glassCard} group flex items-center justify-between p-6 hover:border-cyan-300/40 hover:shadow-xl hover:shadow-indigo-500/15 transition-colors duration-300`}
              >
                <span className="font-semibold group-hover:text-cyan-200 transition-colors duration-300">
                  {role}
                </span>
                <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Application process */}
        <div className="mb-28">
          <motion.div {...reveal} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                {ui.processTitle}
              </span>
            </h2>
            <p className="text-xl text-indigo-100/70 max-w-3xl mx-auto">{ui.processSubtitle}</p>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ originX: 0 }}
              className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent hidden lg:block"
            />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 relative z-10">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    {...slideZoom(index % 2 === 0 ? 'up' : 'down', index * 0.15)}
                    className={index % 2 === 1 ? 'lg:mt-10' : ''}
                  >
                    <div className="flex justify-center lg:justify-start mb-6">
                      <div className="w-16 h-16 rounded-full bg-indigo-500/15 border border-indigo-400/40 backdrop-blur-sm flex items-center justify-center relative">
                        <StepIcon className="w-6 h-6 text-cyan-300" />
                        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-indigo-100/70 text-sm leading-relaxed">
                        {step.description}
                      </p>
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
            <p className="inline-block px-6 py-3 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-sm text-indigo-100/80 text-sm">
              {ui.processNote}
            </p>
          </motion.div>
        </div>

        {/* Final CTA – glass panel */}
        <motion.div {...zoomIn()} className="text-center">
          <div className={`${glassCard} inline-block p-8 md:p-12 hover:border-cyan-300/30 transition-colors duration-500`}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{ui.finalTitle}</h2>
            <p className="text-xl text-indigo-100/80 mb-8 max-w-2xl mx-auto">{ui.finalSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={localePath(lang, '/career#positions')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/40 transition-shadow duration-300"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaPositions}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={APPLY_MAILTO}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.06] backdrop-blur-sm border-2 border-indigo-400/30 text-white font-semibold hover:bg-indigo-500/15 transition-colors duration-300"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaApply}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
