'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ShieldAlert } from 'lucide-react';
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
 * "Terminal" – pure black security aesthetic: mono labels throughout,
 * green accent (#22c55e) with sparse warning red, blinking cursor,
 * scanline hero and topics rendered as terminal windows.
 */
export default function CyberSecurityPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);

  const area = careerAreas['cyber-security'];
  const content = area[lang];
  const ui = getUiStrings(lang, content.title);
  const processSteps = getProcessSteps(lang);
  const navigationItems = getNavigationItems(lang);

  const topicDirs: Dir[] = ['left', 'right', 'up', 'down', 'left', 'right'];

  const sectionLabel =
    'font-mono text-xs uppercase tracking-[0.35em] text-green-500';

  // Blinking cursor – solid block when reduced motion
  const cursor = (
    <motion.span
      aria-hidden="true"
      className="inline-block w-[0.6em] h-[1.1em] bg-green-500 align-text-bottom ml-1"
      animate={prefersReducedMotion ? undefined : { opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
    />
  );

  const terminalDots = (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
    </span>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={localePath(lang, '/career')}
          className="inline-flex items-center gap-2 font-mono text-sm text-green-500/80 border border-green-500/30 rounded-none px-4 py-2 hover:bg-green-500/10 hover:text-green-400 transition-colors duration-300 mb-16"
          whileHover={prefersReducedMotion ? undefined : { x: -5 }}
        >
          <ChevronLeft className="w-4 h-4" />
          {ui.back}
        </motion.a>

        {/* Hero with scanlines */}
        <div className="relative mb-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(34,197,94,0.05) 0px, rgba(34,197,94,0.05) 1px, transparent 1px, transparent 4px)',
            }}
          />
          <div className="relative">
            <motion.p {...reveal} className="font-mono text-sm md:text-base text-green-500 mb-6">
              &gt; security_clearance: granted{cursor}
            </motion.p>

            <motion.h1
              {...zoomIn(0.1)}
              className="text-5xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95] mb-8"
            >
              {content.title}
            </motion.h1>

            <motion.p
              {...reveal}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="font-mono text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed mb-6"
            >
              {content.subtitle}
            </motion.p>

            <motion.p
              {...reveal}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-red-500/80 mb-10 flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
              {lang === 'de' ? 'Bedrohungslage: aktiv' : 'threat level: active'}
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href={localePath(lang, '/career#positions')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-green-500 text-black font-mono font-bold uppercase tracking-wider hover:bg-green-400 transition-colors duration-300"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaPositions}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={APPLY_MAILTO}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none border border-green-500/40 text-green-400 font-mono font-bold uppercase tracking-wider hover:bg-green-500/10 transition-colors duration-300"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaApply}
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Intro – terminal window */}
        <motion.div {...zoomIn()} className="mb-28 max-w-4xl">
          <div className="rounded-none border border-green-500/25 bg-black">
            <div className="flex items-center justify-between border-b border-green-500/25 px-4 py-2.5">
              {terminalDots}
              <span className="font-mono text-xs text-green-500/60">~/quantiva/security/readme.md</span>
            </div>
            <div className="p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-green-500 mb-4">
                &gt; cat mission.txt
              </p>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">{content.intro}</p>
            </div>
          </div>
        </motion.div>

        {/* Topics – terminal boxes */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-12">
            <p className={`${sectionLabel} mb-4`}>&gt; ls ./missions</p>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              {ui.topicsTitle}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">{ui.topicsSubtitle}</p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                {...slideZoom(topicDirs[index % topicDirs.length], (index % 3) * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className="group rounded-none border border-green-500/20 bg-black hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-green-500/20 px-4 py-2.5">
                  {terminalDots}
                  <span className="font-mono text-xs text-green-500/60">
                    topic_{String(index + 1).padStart(2, '0')}.sh
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-mono text-lg font-bold text-green-400 mb-3 group-hover:text-green-300 transition-colors duration-300">
                    <span aria-hidden="true">&gt; </span>
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{topic.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-10">
            <p className={`${sectionLabel} mb-4`}>&gt; which --all tools</p>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
              {ui.stackTitle}
            </h2>
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
                className="font-mono text-sm text-green-400 rounded-none border border-green-500/30 bg-green-500/5 px-5 py-2.5 hover:bg-green-500/15 hover:border-green-500/60 transition-colors duration-300"
              >
                [ {tech} ]
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Roles */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-10">
            <p className={`${sectionLabel} mb-4`}>&gt; whoami --future</p>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              {ui.rolesTitle}
            </h2>
            <p className="text-lg text-gray-400">{ui.rolesSubtitle}</p>
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            {content.roles.map((role, index) => (
              <motion.a
                key={role}
                href={localePath(lang, '/career#positions')}
                {...slideZoom(index % 2 === 0 ? 'left' : 'right', index * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { x: 8 }}
                className="group flex items-center justify-between gap-4 rounded-none border border-green-500/20 bg-black p-5 hover:border-green-500/60 hover:bg-green-500/5 transition-colors duration-300"
              >
                <span className="font-mono text-base md:text-lg text-gray-200 group-hover:text-green-400 transition-colors duration-300">
                  <span className="text-green-500" aria-hidden="true">
                    &gt;{' '}
                  </span>
                  {role}
                </span>
                <ArrowRight className="w-5 h-5 shrink-0 text-green-500 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Application process */}
        <div className="mb-28">
          <motion.div {...reveal} className="mb-14">
            <p className={`${sectionLabel} mb-4`}>&gt; run ./application_pipeline</p>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              {ui.processTitle}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">{ui.processSubtitle}</p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  {...slideZoom(index % 2 === 0 ? 'up' : 'down', index * 0.12)}
                  className="rounded-none border border-green-500/20 bg-black hover:border-green-500/50 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between border-b border-green-500/20 px-4 py-2.5">
                    <span className="font-mono text-xs text-green-500/70">
                      step_{String(index + 1).padStart(2, '0')}
                    </span>
                    <StepIcon className="w-4 h-4 text-green-500/80" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-mono text-lg font-bold text-green-400 mb-3">
                      <span aria-hidden="true">$ </span>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-8 font-mono text-sm text-gray-400 border border-green-500/20 rounded-none px-5 py-3 inline-block"
          >
            <span className="text-green-500" aria-hidden="true">
              #{' '}
            </span>
            {ui.processNote}
          </motion.p>
        </div>

        {/* Final CTA – terminal window */}
        <motion.div {...zoomIn()}>
          <div className="rounded-none border border-green-500/30 bg-black">
            <div className="flex items-center justify-between border-b border-green-500/30 px-4 py-2.5">
              {terminalDots}
              <span className="font-mono text-xs text-green-500/60">~/quantiva/join_us</span>
            </div>
            <div className="p-8 md:p-14">
              <p className="font-mono text-sm text-green-500 mb-6">
                &gt; ./apply --team security{cursor}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
                {ui.finalTitle}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">{ui.finalSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={localePath(lang, '/career#positions')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none bg-green-500 text-black font-mono font-bold uppercase tracking-wider hover:bg-green-400 transition-colors duration-300"
                  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  {ui.ctaPositions}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={APPLY_MAILTO}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none border border-green-500/40 text-green-400 font-mono font-bold uppercase tracking-wider hover:bg-green-500/10 transition-colors duration-300"
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
