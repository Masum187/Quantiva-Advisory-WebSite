'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Dumbbell, Zap } from 'lucide-react';
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

/**
 * "Kinetic" – high-energy physical-health theme: near-black canvas with
 * neon magenta/violet accents, skewed display headline, fast springy
 * entrances and oversized stat numbers.
 */
export default function PhysicalHealthPage({ lang }: CareerThemeProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const { reveal, slideZoom, zoomIn, popItem, popContainer } =
    makeMotionPresets(prefersReducedMotion);
  const { heroRef, textStyle, bgStyle } = useHeroChoreography();

  const benefit = careerBenefits['physical-health'];
  const content = benefit[lang];
  const ui = getBenefitUiStrings(lang);
  const navigationItems = getNavigationItems(lang);

  const itemDirs: Dir[] = ['left', 'right', 'up', 'down', 'left', 'right'];

  const eyebrow =
    'text-xs font-bold uppercase tracking-[0.35em] text-fuchsia-400';

  // Fast, springy kinetic entrance
  const kinetic = (index: number) =>
    ({
      initial: prefersReducedMotion
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: 70, scale: 0.9 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      viewport: { once: true, margin: '-50px' },
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 20,
        delay: prefersReducedMotion ? 0 : index * 0.07,
      },
    }) as const;

  return (
    <div className="min-h-screen bg-[#0a050d] text-white relative overflow-hidden">
      <Navigation lang={lang} items={navigationItems} />

      {/* Neon drifting aurora + diagonal energy stripe */}
      <AuroraBlob
        className="-top-32 left-1/4 w-[560px] h-[560px] bg-fuchsia-600/15 blur-3xl"
        duration={20}
        drift={70}
      />
      <AuroraBlob
        className="top-2/3 -right-32 w-[480px] h-[480px] bg-violet-600/15 blur-3xl"
        duration={26}
        delay={4}
        drift={70}
      />
      <AuroraBlob
        className="bottom-10 -left-24 w-[400px] h-[400px] bg-fuchsia-500/10 blur-3xl"
        duration={23}
        delay={8}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        <motion.a
          href={careerHref(lang)}
          className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-fuchsia-200/80 border-2 border-fuchsia-500/30 px-5 py-2.5 -skew-x-6 hover:border-fuchsia-400 hover:text-fuchsia-200 transition-colors duration-300 mb-16 ${focusRing} focus-visible:ring-fuchsia-400`}
          whileHover={prefersReducedMotion ? undefined : { x: -5 }}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span className="skew-x-6">{ui.back}</span>
        </motion.a>

        {/* Hero with scroll choreography */}
        <div ref={heroRef} className="relative mb-28 md:mb-36">
          {/* Hero glow zooms 1 → 1.15 while the hero scrolls out */}
          <motion.div
            aria-hidden="true"
            style={bgStyle}
            className="pointer-events-none absolute -inset-x-10 -inset-y-16 bg-[radial-gradient(ellipse_at_30%_20%,rgba(217,70,239,0.14),transparent_60%)]"
          />

          {/* Hero text lifts & fades while scrolling past */}
          <motion.div style={textStyle} className="relative">
          <motion.p {...reveal} className={`${eyebrow} mb-6 flex items-center gap-2`}>
            <Zap className="w-4 h-4" aria-hidden="true" />
            {content.badge}
          </motion.p>

          <MaskedTextReveal
            as="h1"
            mode="mount"
            delay={0.05}
            text={content.title}
            wordClassName={() =>
              'bg-gradient-to-r from-fuchsia-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent pr-[0.08em]'
            }
            className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] mb-8 italic"
          />

          <motion.p
            {...reveal}
            transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
            className="text-lg md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-10"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={applyHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-fuchsia-500 text-white font-black uppercase tracking-wider -skew-x-6 hover:bg-fuchsia-400 transition-colors duration-300 ${focusRing} focus-visible:ring-fuchsia-400`}
              whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              <span className="skew-x-6 inline-flex items-center gap-2">
                {ui.ctaApply}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </span>
            </motion.a>
            <motion.a
              href={careerHref(lang)}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-black uppercase tracking-wider -skew-x-6 hover:border-fuchsia-400 hover:text-fuchsia-300 transition-colors duration-300 ${focusRing} focus-visible:ring-fuchsia-400`}
              whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              <span className="skew-x-6">{ui.ctaPositions}</span>
            </motion.a>
          </motion.div>
          </motion.div>
        </div>

        {/* Bold stat numbers – zoom in on scroll */}
        <div className="mb-28">
          <motion.p {...reveal} className={`${eyebrow} mb-8`}>
            {ui.factsTitle}
          </motion.p>
          <ScrollZoom className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-fuchsia-500/20 border border-fuchsia-500/20">
            {content.facts.map((fact, index) => (
              <motion.div
                key={fact.label}
                {...kinetic(index)}
                className="bg-[#0a050d] p-8 hover:bg-fuchsia-500/[0.08] transition-colors duration-300"
              >
                <p className="text-5xl md:text-7xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-fuchsia-300 mb-3">
                  {fact.value}
                </p>
                <p className="text-sm text-gray-400 leading-snug">{fact.label}</p>
              </motion.div>
            ))}
          </ScrollZoom>
        </div>

        {/* Marquee divider */}
        <MarqueeBand
          phrases={content.marquee}
          className="border-y-2 border-fuchsia-500/25 bg-fuchsia-500/[0.06] py-6 md:py-8 mb-28 -skew-y-1"
          textClassName="text-3xl md:text-6xl font-black uppercase italic tracking-tight text-fuchsia-300"
        />

        {/* Intro */}
        <motion.div {...zoomIn()} className="mb-28">
          <div className="border-l-4 border-fuchsia-500 pl-6 md:pl-10 max-w-4xl">
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed">
              {content.intro}
            </p>
          </div>
        </motion.div>

        {/* Benefit items */}
        <div className="mb-28">
          <div className="mb-12 max-w-2xl">
            <FadeUp>
              <p className={`${eyebrow} mb-4`}>{content.badge}</p>
            </FadeUp>
            <MaskedTextReveal
              as="h2"
              text={content.itemsTitle}
              className="text-4xl md:text-6xl font-black uppercase italic tracking-tight mb-4"
              wordClassName={() => 'pr-[0.08em]'}
            />
            <FadeUp delay={0.25}>
              <p className="text-lg text-gray-400">{content.itemsSubtitle}</p>
            </FadeUp>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideZoom(itemDirs[index % itemDirs.length], (index % 3) * 0.08)}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -8, rotateX: 4, rotateY: index % 2 === 0 ? 4 : -4 }
                }
                style={{ transformPerspective: 800 }}
                className="border border-white/10 bg-white/[0.03] p-8 hover:border-fuchsia-500/60 hover:bg-fuchsia-500/[0.06] transition-colors duration-300"
              >
                <div
                  aria-hidden="true"
                  className="w-11 h-11 -skew-x-6 bg-fuchsia-500/15 flex items-center justify-center mb-6"
                >
                  <Dumbbell className="w-5 h-5 text-fuchsia-400 skew-x-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature: sports communities strip */}
        <div className="mb-28">
          <div className="mb-12 max-w-2xl">
            <MaskedTextReveal
              as="h2"
              text={content.featureTitle}
              className="text-4xl md:text-6xl font-black uppercase italic tracking-tight mb-4"
              wordClassName={() => 'pr-[0.08em]'}
            />
            <FadeUp delay={0.25}>
              <p className="text-lg text-gray-400">{content.featureSubtitle}</p>
            </FadeUp>
          </div>

          <motion.div
            variants={popContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {content.featureItems.map((item) => (
              <motion.div
                key={item.title}
                variants={popItem}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.03 }}
                className="relative border-2 border-fuchsia-500/25 bg-gradient-to-b from-fuchsia-500/[0.08] to-transparent p-7 hover:border-fuchsia-400/60 transition-colors duration-300"
              >
                {item.meta && (
                  <p className="inline-block text-xs font-black uppercase tracking-[0.2em] text-fuchsia-950 bg-fuchsia-400 px-2.5 py-1 -skew-x-6 mb-5">
                    <span className="inline-block skew-x-6">{item.meta}</span>
                  </p>
                )}
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div {...zoomIn()}>
          <div className="relative border-2 border-fuchsia-500/40 p-10 md:p-16 overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-600/15 via-transparent to-violet-600/15"
            />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight mb-4">
                {content.ctaTitle}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                {content.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={applyHref(lang)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-fuchsia-500 text-white font-black uppercase tracking-wider -skew-x-6 hover:bg-fuchsia-400 transition-colors duration-300 ${focusRing} focus-visible:ring-fuchsia-400`}
                  whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.03 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <span className="skew-x-6 inline-flex items-center gap-2">
                    {ui.ctaApply}
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </span>
                </motion.a>
                <motion.a
                  href={careerHref(lang)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-black uppercase tracking-wider -skew-x-6 hover:border-fuchsia-400 hover:text-fuchsia-300 transition-colors duration-300 ${focusRing} focus-visible:ring-fuchsia-400`}
                  whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.03 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <span className="skew-x-6">{ui.ctaPositions}</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
