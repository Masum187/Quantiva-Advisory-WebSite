'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Terminal } from 'lucide-react';
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
 * "Engineering Grid" – Forge-inspired dark product-marketing look:
 * near-black canvas, fine grid lines, mono meta chips, cyan neon accents
 * and topics rendered as a numbered index list instead of cards.
 */
export default function TechnologyEngineeringPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);

  const area = careerAreas['technology-engineering'];
  const content = area[lang];
  const ui = getUiStrings(lang, content.title);
  const processSteps = getProcessSteps(lang);
  const navigationItems = getNavigationItems(lang);

  const heroChips = ['TypeScript', 'K8s', 'CI/CD', 'Cloud-native', 'End-to-End'];
  const topicDirs: Dir[] = ['left', 'right', 'left', 'right', 'left', 'right'];

  const monoLabel =
    'font-mono text-xs uppercase tracking-[0.25em] text-cyan-400';

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Fine grid-line background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Soft cyan glow top-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={localePath(lang, '/career')}
          className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 border border-white/15 px-4 py-2 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors duration-300 mb-16"
          whileHover={prefersReducedMotion ? undefined : { x: -5 }}
        >
          <ChevronLeft className="w-4 h-4" />
          {ui.back}
        </motion.a>

        {/* Hero */}
        <div className="mb-28">
          <motion.p {...reveal} className={`${monoLabel} mb-6`}>
            {'// engineering'}
          </motion.p>

          <motion.h1
            {...zoomIn(0.1)}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-8"
          >
            {content.title.split(' & ').map((part, i, arr) => (
              <React.Fragment key={part}>
                {i > 0 && <span className="text-cyan-400"> &amp; </span>}
                {part}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-lg md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8"
          >
            {content.subtitle}
          </motion.p>

          {/* Mono meta-chip row */}
          <motion.div
            variants={popContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {heroChips.map((chip) => (
              <motion.span
                key={chip}
                variants={popItem}
                className="font-mono text-xs text-cyan-300 border border-cyan-400/25 bg-cyan-400/5 px-3 py-1.5"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={localePath(lang, '/career#positions')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaPositions}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={APPLY_MAILTO}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold hover:border-cyan-400/60 hover:text-cyan-300 transition-colors duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
            </motion.a>
          </motion.div>
        </div>

        {/* Intro */}
        <motion.div {...zoomIn()} className="mb-28">
          <div className="border-l-2 border-cyan-400 pl-6 md:pl-10 max-w-4xl">
            <p className={`${monoLabel} mb-4`}>[ intro ]</p>
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed">
              {content.intro}
            </p>
          </div>
        </motion.div>

        {/* Topics – numbered index rows instead of cards */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-10">
            <p className={`${monoLabel} mb-4`}>{'// what_you_build'}</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {ui.topicsTitle}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">{ui.topicsSubtitle}</p>
          </motion.div>

          <div className="border-t border-white/10">
            {content.topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                {...slideZoom(topicDirs[index % topicDirs.length], (index % 2) * 0.1)}
                className="group grid gap-3 md:grid-cols-[100px_1fr_1.1fr] md:gap-8 items-baseline py-8 md:py-10 px-2 md:px-4 border-b border-white/10 hover:bg-cyan-400/[0.06] transition-colors duration-300"
              >
                <span className="font-mono text-sm md:text-base text-cyan-400/70 group-hover:text-cyan-300 transition-colors duration-300">
                  [ {String(index + 1).padStart(2, '0')} ]
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                  {topic.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                  {topic.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-10">
            <p className={`${monoLabel} mb-4`}>{'// stack'}</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{ui.stackTitle}</h2>
          </motion.div>

          <motion.div
            variants={popContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-wrap gap-3"
          >
            {content.stack.map((tech) => (
              <motion.span
                key={tech}
                variants={popItem}
                whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.06 }}
                className="font-mono text-sm text-gray-200 border border-white/20 bg-white/[0.03] px-5 py-2.5 hover:border-cyan-400/60 hover:text-cyan-300 transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Roles */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-10">
            <p className={`${monoLabel} mb-4`}>{'// roles'}</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {ui.rolesTitle}
            </h2>
            <p className="text-lg text-gray-400">{ui.rolesSubtitle}</p>
          </motion.div>

          <div className="border-t border-white/10">
            {content.roles.map((role, index) => (
              <motion.a
                key={role}
                href={localePath(lang, '/career#positions')}
                {...slideZoom(index % 2 === 0 ? 'left' : 'right', index * 0.08)}
                whileHover={prefersReducedMotion ? undefined : { x: 8 }}
                className="group flex items-center justify-between gap-4 py-6 px-2 md:px-4 border-b border-white/10 hover:bg-cyan-400/[0.06] transition-colors duration-300"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-cyan-400/70">
                    [ {String(index + 1).padStart(2, '0')} ]
                  </span>
                  <span className="text-xl md:text-2xl font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                    {role}
                  </span>
                </span>
                <ArrowRight className="w-5 h-5 shrink-0 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Application process */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-14">
            <p className={`${monoLabel} mb-4`}>{'// hiring_pipeline'}</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {ui.processTitle}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">{ui.processSubtitle}</p>
          </motion.div>

          <div className="grid gap-px bg-white/10 border border-white/10 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  {...slideZoom(index % 2 === 0 ? 'up' : 'down', index * 0.12)}
                  className="bg-[#050505] p-8 hover:bg-cyan-400/[0.05] transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm text-cyan-400">
                      [ {String(index + 1).padStart(2, '0')} ]
                    </span>
                    <StepIcon className="w-5 h-5 text-cyan-400/80" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-8 font-mono text-sm text-gray-400 border border-white/10 px-5 py-3 inline-block"
          >
            {ui.processNote}
          </motion.p>
        </div>

        {/* Final CTA */}
        <motion.div {...zoomIn()}>
          <div className="relative border border-cyan-400/30 p-10 md:p-16 overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative">
              <p className={`${monoLabel} mb-6 flex items-center gap-2`}>
                <Terminal className="w-4 h-4" />
                {'// join_the_team'}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {ui.finalTitle}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                {ui.finalSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={localePath(lang, '/career#positions')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors duration-300"
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  {ui.ctaPositions}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={APPLY_MAILTO}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold hover:border-cyan-400/60 hover:text-cyan-300 transition-colors duration-300"
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
