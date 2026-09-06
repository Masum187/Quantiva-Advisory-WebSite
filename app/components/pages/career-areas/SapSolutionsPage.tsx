'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
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
} from './shared';

const MARQUEE_ITEMS = ['S/4HANA', '*', 'Clean Core', '#', 'BTP', '™', 'Integration', '—'];

/**
 * "Editorial" – benjamincreative-inspired LIGHT page: warm off-white canvas,
 * huge display typography, parenthesis eyebrows "(SAP bei Quantiva)",
 * numbered index lists "(01)", a marquee band, a giant statement quote
 * and a dark CTA panel as final contrast.
 */
export default function SapSolutionsPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);

  const area = careerAreas['sap-solutions'];
  const content = area[lang];
  const ui = getUiStrings(lang, content.title);
  const processSteps = getProcessSteps(lang);
  const navigationItems = getNavigationItems(lang);

  const eyebrow = lang === 'de' ? '(SAP bei Quantiva)' : '(SAP at Quantiva)';
  const paren = (n: number) => `(${String(n).padStart(2, '0')})`;

  const marqueeHalf = (
    <>
      {Array.from({ length: 3 }).flatMap((_, rep) =>
        MARQUEE_ITEMS.map((item, i) => (
          <span key={`${rep}-${i}`} className="mx-5 md:mx-8 shrink-0">
            {item}
          </span>
        ))
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-neutral-900">
      <Navigation lang={lang} items={navigationItems} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        {/* Back link */}
        <motion.a
          href={localePath(lang, '/career')}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 border-b-2 border-neutral-900 pb-1 hover:opacity-60 transition-opacity duration-300 mb-16"
          whileHover={prefersReducedMotion ? undefined : { x: -5 }}
        >
          <ChevronLeft className="w-4 h-4" />
          {ui.back}
        </motion.a>

        {/* Hero */}
        <div className="mb-24">
          <motion.div {...reveal} className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <p className="text-lg md:text-xl font-medium">{eyebrow}</p>
            <p className="text-sm tracking-widest text-neutral-500">
              / 2026 / {lang === 'de' ? 'Karriere' : 'Career'} /
            </p>
          </motion.div>

          <motion.h1
            {...zoomIn(0.1)}
            className="text-6xl sm:text-7xl md:text-[7.5rem] font-bold tracking-tighter leading-[0.9] mb-10"
          >
            SAP
            <br />
            Solutions<span className="align-top text-3xl md:text-5xl">®</span>
          </motion.h1>

          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <motion.p
              {...reveal}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-xl md:text-2xl leading-relaxed max-w-2xl"
            >
              {content.subtitle}
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href={localePath(lang, '/career#positions')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-[#f4f1ea] font-semibold hover:bg-neutral-700 transition-colors duration-300"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaPositions}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={APPLY_MAILTO}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-neutral-900 text-neutral-900 font-semibold hover:bg-neutral-900 hover:text-[#f4f1ea] transition-colors duration-300"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaApply}
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Intro */}
        <motion.div {...zoomIn()} className="mb-24 border-t-2 border-neutral-900 pt-10">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-16">
            <p className="text-lg font-medium whitespace-nowrap">
              {lang === 'de' ? '(Worum es geht)' : '(What it is about)'}
            </p>
            <p className="text-xl md:text-3xl leading-snug font-medium max-w-3xl">
              {content.intro}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Marquee band – full width, paused/static when reduced motion */}
      <div className="bg-neutral-900 text-[#f4f1ea] py-6 md:py-8 overflow-hidden mb-24">
        <div
          className={`flex whitespace-nowrap text-3xl md:text-6xl font-bold tracking-tight ${
            prefersReducedMotion ? '' : 'animate-marquee'
          }`}
        >
          <div className="flex shrink-0 items-center">{marqueeHalf}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {marqueeHalf}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Topics as editorial index list */}
        <div className="mb-24">
          <motion.div {...reveal} className="mb-12">
            <p className="text-lg font-medium mb-4">
              {lang === 'de' ? '(Arbeitsfelder)' : '(Fields of work)'}
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              {ui.topicsTitle}
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl">{ui.topicsSubtitle}</p>
          </motion.div>

          <div className="border-t border-neutral-900/20">
            {content.topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                {...slideZoom(index % 2 === 0 ? 'up' : 'left', (index % 2) * 0.1)}
                className="group grid gap-3 md:grid-cols-[90px_1fr_1fr] md:gap-10 py-10 border-b border-neutral-900/20"
              >
                <span className="text-lg font-medium text-neutral-500">{paren(index + 1)}</span>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight decoration-2 underline-offset-8 group-hover:underline">
                  {topic.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed md:pt-2">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Giant statement quote */}
        <motion.div {...zoomIn()} className="mb-24 py-10 md:py-16">
          <p className="text-lg font-medium mb-8">
            {lang === 'de' ? '(Statement)' : '(Statement)'}
          </p>
          <blockquote className="text-4xl md:text-7xl font-bold tracking-tighter leading-[1.02] max-w-5xl">
            “{content.subtitle}”
          </blockquote>
        </motion.div>

        {/* Tech stack */}
        <div className="mb-24">
          <motion.div {...reveal} className="mb-10">
            <p className="text-lg font-medium mb-4">{lang === 'de' ? '(Stack)' : '(Stack)'}</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">{ui.stackTitle}</h2>
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
                whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.05 }}
                className="px-6 py-3 rounded-full border-2 border-neutral-900 text-neutral-900 font-semibold hover:bg-neutral-900 hover:text-[#f4f1ea] transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Roles */}
        <div className="mb-24">
          <motion.div {...reveal} className="mb-10">
            <p className="text-lg font-medium mb-4">{lang === 'de' ? '(Rollen)' : '(Roles)'}</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              {ui.rolesTitle}
            </h2>
            <p className="text-lg md:text-xl text-neutral-600">{ui.rolesSubtitle}</p>
          </motion.div>

          <div className="border-t border-neutral-900/20">
            {content.roles.map((role, index) => (
              <motion.a
                key={role}
                href={localePath(lang, '/career#positions')}
                {...slideZoom(index % 2 === 0 ? 'left' : 'right', index * 0.08)}
                whileHover={prefersReducedMotion ? undefined : { x: 8 }}
                className="group flex items-baseline justify-between gap-4 py-8 border-b border-neutral-900/20"
              >
                <span className="flex items-baseline gap-6">
                  <span className="text-lg font-medium text-neutral-500">{paren(index + 1)}</span>
                  <span className="text-2xl md:text-4xl font-bold tracking-tight decoration-2 underline-offset-8 group-hover:underline">
                    {role}
                  </span>
                </span>
                <ArrowRight className="w-6 h-6 shrink-0 self-center group-hover:translate-x-2 transition-transform duration-300" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Application process */}
        <div className="mb-24">
          <motion.div {...reveal} className="mb-14">
            <p className="text-lg font-medium mb-4">
              {lang === 'de' ? '(Bewerbungsprozess)' : '(Application process)'}
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              {ui.processTitle}
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl">{ui.processSubtitle}</p>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  {...slideZoom(index % 2 === 0 ? 'up' : 'down', index * 0.12)}
                  className="border-t-2 border-neutral-900 pt-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-medium text-neutral-500">
                      {paren(index + 1)}
                    </span>
                    <StepIcon className="w-6 h-6 text-neutral-900" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">{step.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-12 text-neutral-600 border border-neutral-900/30 px-6 py-3 inline-block"
          >
            {ui.processNote}
          </motion.p>
        </div>
      </div>

      {/* Dark CTA panel as final contrast */}
      <motion.div {...zoomIn()} className="bg-neutral-900 text-[#f4f1ea]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-lg font-medium mb-6 text-[#f4f1ea]/70">
            {lang === 'de' ? '(Dein nächster Schritt)' : '(Your next step)'}
          </p>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">
            {ui.finalTitle}
          </h2>
          <p className="text-xl md:text-2xl text-[#f4f1ea]/80 mb-10 max-w-3xl">
            {ui.finalSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href={localePath(lang, '/career#positions')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f4f1ea] text-neutral-900 font-semibold hover:bg-white transition-colors duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaPositions}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={APPLY_MAILTO}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#f4f1ea] text-[#f4f1ea] font-semibold hover:bg-[#f4f1ea] hover:text-neutral-900 transition-colors duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
