'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ChevronLeft, GraduationCap, Rocket } from 'lucide-react';
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

const SKILL_CHIPS = [
  'SAP S/4HANA',
  'SAP BTP',
  'AWS Solutions Architect',
  'Azure Administrator',
  'Kubernetes (CKA)',
  'Scrum Master',
  'TOGAF',
  'ISO 27001 Lead Auditor',
  'TypeScript',
  'Python',
  'Terraform',
  'Machine Learning',
];

/**
 * "Learning Path" – career-development theme: deep blue canvas, cyan
 * accents, skill chips and a vertical progress line that draws itself as
 * you scroll along the junior→principal path.
 */
export default function CareerDevelopmentPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);

  const benefit = careerBenefits['career-development'];
  const content = benefit[lang];
  const ui = getBenefitUiStrings(lang);
  const navigationItems = getNavigationItems(lang);

  const itemDirs: Dir[] = ['up', 'left', 'right', 'up', 'left', 'right'];
  const { heroRef, textStyle, bgStyle } = useHeroChoreography();

  // Progress line that draws on scroll along the career path
  const pathRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ['start 0.75', 'end 0.55'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const eyebrow =
    'text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400';

  return (
    <div className="min-h-screen bg-[#040a18] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Blue depth glows – slow aurora drift */}
      <AuroraBlob
        className="-top-40 -right-32 w-[620px] h-[620px] bg-cyan-500/10 blur-3xl"
        duration={26}
      />
      <AuroraBlob
        className="top-1/2 -left-40 w-[520px] h-[520px] bg-blue-600/10 blur-3xl"
        duration={30}
        delay={5}
      />
      <AuroraBlob
        className="bottom-10 right-1/4 w-[440px] h-[440px] bg-cyan-400/[0.06] blur-3xl"
        duration={21}
        delay={9}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={careerHref(lang)}
          className={`inline-flex items-center gap-2 text-sm text-cyan-100/70 rounded-lg border border-cyan-400/25 px-5 py-2.5 hover:text-cyan-200 hover:border-cyan-400/60 transition-colors duration-300 mb-16 ${focusRing} focus-visible:ring-cyan-400`}
          whileHover={prefersReducedMotion ? undefined : { x: -4 }}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          {ui.back}
        </motion.a>

        {/* Hero with scroll choreography */}
        <div ref={heroRef} className="relative mb-28 md:mb-36">
          {/* Hero glow zooms while the hero scrolls out */}
          <motion.div
            aria-hidden="true"
            style={bgStyle}
            className="pointer-events-none absolute -inset-x-10 -inset-y-14 bg-[radial-gradient(ellipse_at_25%_25%,rgba(34,211,238,0.10),transparent_60%)]"
          />

          {/* Hero text lifts & fades while scrolling past */}
          <motion.div style={textStyle} className="relative">
          <motion.p {...reveal} className={`${eyebrow} mb-6 flex items-center gap-2`}>
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            {content.badge}
          </motion.p>

          <MaskedTextReveal
            as="h1"
            mode="mount"
            delay={0.1}
            text={content.title}
            wordClassName={(_word, index, total) =>
              index === total - 1
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400'
                : undefined
            }
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] mb-8 max-w-3xl"
          />

          <motion.p
            {...reveal}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="text-lg md:text-2xl text-blue-50/80 max-w-2xl leading-relaxed mb-10"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={applyHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-400 text-cyan-950 font-semibold hover:bg-cyan-300 transition-colors duration-300 ${focusRing} focus-visible:ring-cyan-400`}
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </motion.a>
            <motion.a
              href={careerHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:border-cyan-400/60 hover:text-cyan-200 transition-colors duration-300 ${focusRing} focus-visible:ring-cyan-400`}
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
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-8 md:p-12 max-w-4xl">
            <p className="text-lg md:text-2xl text-blue-50/90 leading-relaxed">
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
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-cyan-400/40 transition-colors duration-300"
              >
                <p className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{fact.value}</p>
                <p className="text-sm text-blue-50/70 leading-snug">{fact.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </ScrollZoom>

        {/* Marquee divider */}
        <MarqueeBand
          phrases={content.marquee}
          className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] py-6 md:py-8 mb-28"
          textClassName="text-3xl md:text-5xl font-bold tracking-tight text-cyan-200/90"
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
              <p className="text-lg text-blue-50/70">{content.itemsSubtitle}</p>
            </FadeUp>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(itemDirs[index % itemDirs.length], (index % 3) * 0.1)}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -6, rotateX: 3, rotateY: -3 }
                }
                style={{ transformPerspective: 900 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 hover:border-cyan-400/50 transition-colors duration-300"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-lg bg-cyan-400/15 flex items-center justify-center mb-6"
                >
                  <Rocket className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-50/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill chips */}
        <div className="mb-28">
          <motion.p {...reveal} className={`${eyebrow} mb-8`}>
            {lang === 'de' ? 'Skills & Zertifizierungen im Team' : 'Skills & certifications on the team'}
          </motion.p>
          <motion.div
            variants={popContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap gap-3"
          >
            {SKILL_CHIPS.map((chip) => (
              <motion.span
                key={chip}
                variants={popItem}
                whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.05 }}
                className="text-sm text-blue-50/90 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] px-5 py-2.5 hover:border-cyan-400/70 hover:text-cyan-200 transition-colors duration-300"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Feature: career path with scroll-drawn progress line */}
        <div className="mb-28">
          <div className="mb-14 max-w-2xl">
            <MaskedTextReveal
              as="h2"
              text={content.featureTitle}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            />
            <FadeUp delay={0.25}>
              <p className="text-lg text-blue-50/70">{content.featureSubtitle}</p>
            </FadeUp>
          </div>

          <div ref={pathRef} className="relative pl-12 md:pl-20">
            {/* Static track */}
            <div
              aria-hidden="true"
              className="absolute left-4 md:left-8 top-2 bottom-2 w-1 rounded-full bg-white/10"
            />
            {/* Progress line drawing on scroll */}
            <motion.div
              aria-hidden="true"
              style={{
                scaleY: prefersReducedMotion ? 1 : lineScale,
                transformOrigin: 'top',
              }}
              className="absolute left-4 md:left-8 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"
            />

            <div className="space-y-10">
              {content.featureItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...slideZoom('right', index * 0.05)}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-cyan-400/40 transition-colors duration-300"
                >
                  {/* Node on the line */}
                  <span
                    aria-hidden="true"
                    className="absolute top-9 -left-[42px] md:-left-[58px] w-5 h-5 rounded-full bg-[#040a18] border-2 border-cyan-400"
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-3">
                    {item.meta}
                  </p>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-blue-50/70 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
                <p className="text-lg text-blue-50/70">{ui.faqSubtitle}</p>
              </FadeUp>
            </div>

            <div className="space-y-4">
              {content.faq.map((entry, index) => (
                <motion.div
                  key={entry.question}
                  {...slideZoom('up', index * 0.08)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
                >
                  <h3 className="text-lg font-bold mb-3 text-cyan-100">{entry.question}</h3>
                  <p className="text-blue-50/70 leading-relaxed">{entry.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <motion.div {...zoomIn()}>
          <div className="relative rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-600/10 p-10 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {content.ctaTitle}
            </h2>
            <p className="text-lg md:text-xl text-blue-50/80 mb-8 max-w-2xl">
              {content.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={applyHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-400 text-cyan-950 font-semibold hover:bg-cyan-300 transition-colors duration-300 ${focusRing} focus-visible:ring-cyan-400`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaApply}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href={careerHref(lang)}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:border-cyan-400/60 hover:text-cyan-200 transition-colors duration-300 ${focusRing} focus-visible:ring-cyan-400`}
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
