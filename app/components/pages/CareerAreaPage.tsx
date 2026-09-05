'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Navigation from '../Navigation';
import {
  ArrowRight,
  ChevronLeft,
  Code,
  Database,
  Cloud,
  Shield,
  Brain,
  Video,
  MessagesSquare,
  Coffee,
  BadgeCheck,
  type LucideIcon,
} from 'lucide-react';
import { careerAreas, type CareerAreaSlug } from '../../lib/data/careerAreas';

const areaIcons: Record<CareerAreaSlug, LucideIcon> = {
  'technology-engineering': Code,
  'sap-solutions': Database,
  'cloud-infrastructure': Cloud,
  'cyber-security': Shield,
  'artificial-intelligence': Brain,
};

interface CareerAreaPageProps {
  lang: 'de' | 'en';
  slug: CareerAreaSlug;
}

export default function CareerAreaPage({ lang, slug }: CareerAreaPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const localePath = (p: string) => `/${lang}${p}`;

  const area = careerAreas[slug];
  const content = area[lang];
  const AreaIcon = areaIcons[slug];

  // Scroll-reveal helpers – no movement when reduced motion is preferred
  const reveal = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
  } as const;

  // Directional slide + zoom entrance (cards fly in from all four sides)
  type Dir = 'left' | 'right' | 'up' | 'down';
  const dirOffset: Record<Dir, { x: number; y: number }> = {
    left: { x: -90, y: 0 },
    right: { x: 90, y: 0 },
    up: { x: 0, y: 90 },
    down: { x: 0, y: -90 },
  };
  const slideZoom = (dir: Dir, delay = 0) =>
    ({
      initial: prefersReducedMotion
        ? { opacity: 1, x: 0, y: 0, scale: 1 }
        : { opacity: 0, scale: 0.85, ...dirOffset[dir] },
      whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
    }) as const;

  // Dramatic zoom-in (hero headline, CTA panel)
  const zoomIn = (delay = 0) =>
    ({
      initial: prefersReducedMotion
        ? { opacity: 1, scale: 1 }
        : { opacity: 0, scale: 0.8, y: 24 },
      whileInView: { opacity: 1, scale: 1, y: 0 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
    }) as const;

  // Pop-in for chips/badges (spring)
  const popItem = {
    hidden: prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 260, damping: 18 },
    },
  } as const;

  // Card entrance direction cycles: left → bottom → right → top …
  const topicDirs: Dir[] = ['left', 'up', 'right', 'down', 'left', 'right'];

  // Alternating accent styles so the cards don't all look the same
  const topicAccents = [
    {
      border: 'hover:border-teal-400/50',
      title: 'group-hover:text-teal-300',
      shadow: 'hover:shadow-teal-500/25',
      number: 'from-teal-400 to-cyan-300',
      glow: 'from-teal-500/10 via-transparent to-transparent',
    },
    {
      border: 'hover:border-purple-400/50',
      title: 'group-hover:text-purple-300',
      shadow: 'hover:shadow-purple-500/25',
      number: 'from-purple-400 to-fuchsia-300',
      glow: 'from-purple-500/10 via-transparent to-transparent',
    },
    {
      border: 'hover:border-pink-400/50',
      title: 'group-hover:text-pink-300',
      shadow: 'hover:shadow-pink-500/25',
      number: 'from-pink-400 to-rose-300',
      glow: 'from-pink-500/10 via-transparent to-transparent',
    },
  ] as const;

  const navigationItems = [
    { id: 'home', label: 'Home', href: localePath('/') },
    { id: 'about', label: lang === 'de' ? 'Über uns' : 'About', href: localePath('/about') },
    { id: 'services', label: 'Services', href: localePath('/#services') },
    { id: 'cases', label: lang === 'de' ? 'Projekte' : 'Cases', href: localePath('/cases') },
    { id: 'team', label: 'Team', href: localePath('/team') },
    { id: 'career', label: lang === 'de' ? 'Karriere' : 'Career', href: localePath('/career') },
  ];

  const ui = {
    back: lang === 'de' ? 'Zurück zur Karriere' : 'Back to career',
    ctaPositions: lang === 'de' ? 'Offene Stellen ansehen' : 'View open positions',
    ctaApply: lang === 'de' ? 'Direkt bewerben' : 'Apply directly',
    topicsTitle: lang === 'de' ? 'Woran du arbeitest' : 'What you work on',
    topicsSubtitle:
      lang === 'de'
        ? 'Konkrete Arbeitsfelder statt Buzzwords – das erwartet dich im Projektalltag.'
        : 'Concrete fields of work instead of buzzwords – this is what your project life looks like.',
    stackTitle: lang === 'de' ? 'Dein Tech Stack' : 'Your tech stack',
    rolesTitle: lang === 'de' ? 'Beispiel-Rollen' : 'Example roles',
    rolesSubtitle:
      lang === 'de'
        ? 'Vom Einstieg bis zur Lead-Rolle – so kannst du bei uns arbeiten.'
        : 'From entry level to lead – these are ways to work with us.',
    processTitle: lang === 'de' ? 'Dein Weg zu uns' : 'Your path to us',
    processSubtitle:
      lang === 'de'
        ? 'Kein Assessment-Center, keine Endlos-Schleifen – ein schneller, transparenter Prozess.'
        : 'No assessment center, no endless loops – a fast, transparent process.',
    processNote:
      lang === 'de'
        ? 'Gesamter Prozess in unter 2 Wochen · Bewerbung ohne Anschreiben – CV oder LinkedIn-Profil genügt.'
        : 'Entire process in under 2 weeks · No cover letter needed – your CV or LinkedIn profile is enough.',
    finalTitle:
      lang === 'de' ? 'Bereit für den nächsten Schritt?' : 'Ready for your next step?',
    finalSubtitle:
      lang === 'de'
        ? `Werde Teil des ${content.title}-Teams bei Quantiva Advisory und gestalte die digitale Zukunft des Mittelstands mit.`
        : `Join the ${content.title} team at Quantiva Advisory and help shape the digital future of the Mittelstand.`,
  };

  const processSteps =
    lang === 'de'
      ? [
          {
            icon: Video,
            title: 'Kennenlernen',
            description:
              '30 Minuten Video-Call – wir melden uns innerhalb von 48 Stunden nach deiner Bewerbung.',
          },
          {
            icon: MessagesSquare,
            title: 'Fachgespräch',
            description:
              'Deep-Dive mit dem Team: ein praxisnaher Case aus unserem Projektalltag statt Assessment-Center.',
          },
          {
            icon: Coffee,
            title: 'Team-Match',
            description:
              'Kaffee oder Video-Call mit deinen künftigen Kolleg:innen – du lernst das Team kennen, bevor du zusagst.',
          },
          {
            icon: BadgeCheck,
            title: 'Angebot',
            description:
              'Entscheidung innerhalb von 5 Tagen – mit einem transparenten Gehaltspaket ohne Verhandlungspoker.',
          },
        ]
      : [
          {
            icon: Video,
            title: 'First meeting',
            description:
              'A 30-minute video call – we get back to you within 48 hours of your application.',
          },
          {
            icon: MessagesSquare,
            title: 'Technical interview',
            description:
              'A deep dive with the team: a hands-on case from our real project work instead of an assessment center.',
          },
          {
            icon: Coffee,
            title: 'Team match',
            description:
              'Coffee or a video call with your future colleagues – you meet the team before you commit.',
          },
          {
            icon: BadgeCheck,
            title: 'Offer',
            description:
              'A decision within 5 days – with a transparent salary package and no negotiation games.',
          },
        ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation */}
      <Navigation lang={lang} items={navigationItems} />

      {/* Decorative background glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-96 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back Link */}
        <motion.a
          href={localePath('/career')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 mb-12"
          whileHover={prefersReducedMotion ? undefined : { x: -5 }}
        >
          <ChevronLeft className="w-4 h-4" />
          {ui.back}
        </motion.a>

        {/* Hero */}
        <div className="text-center mb-24">
          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4, y: -20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 backdrop-blur-sm mb-8">
              <AreaIcon className="w-6 h-6 text-teal-400" />
              <span className="text-white font-semibold">{content.title}</span>
            </div>
          </motion.div>

          <motion.h1
            {...zoomIn(0.1)}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {content.title}
            </span>
          </motion.h1>

          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
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
              href={localePath('/career#positions')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaPositions}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:careers@quantiva-advisory.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-teal-500/30 text-white font-semibold rounded-xl hover:bg-teal-500/10 transition-all duration-300"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {ui.ctaApply}
            </motion.a>
          </motion.div>
        </div>

        {/* Intro */}
        <motion.div {...zoomIn()} className="mb-24 max-w-4xl mx-auto">
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-black/60 via-black/40 to-black/60 border border-white/10 backdrop-blur-xl hover:border-teal-400/30 hover:shadow-2xl hover:shadow-teal-500/10 transition-colors duration-500"
          >
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {content.intro}
            </p>
          </motion.div>
        </motion.div>

        {/* Topics */}
        <div className="mb-24">
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === 'de' ? (
                <>
                  Woran du{' '}
                  <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                    arbeitest
                  </span>
                </>
              ) : (
                <>
                  What you{' '}
                  <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                    work on
                  </span>
                </>
              )}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{ui.topicsSubtitle}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.topics.map((topic, index) => {
              const accent = topicAccents[index % topicAccents.length];
              return (
                <motion.div
                  key={topic.title}
                  {...slideZoom(topicDirs[index % topicDirs.length], (index % 3) * 0.12)}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -10,
                          rotateX: 4,
                          rotateY: index % 2 === 0 ? 4 : -4,
                          scale: 1.03,
                          transition: { duration: 0.3 },
                        }
                  }
                  style={{ transformPerspective: 900 }}
                  className={`group relative h-full p-8 rounded-2xl bg-gradient-to-br from-black/60 via-black/40 to-black/60 border border-white/10 backdrop-blur-xl ${accent.border} transition-all duration-500 hover:shadow-2xl ${accent.shadow}`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  {/* Big index number for visual variety */}
                  <span
                    className={`absolute top-5 right-6 text-5xl font-black bg-gradient-to-br ${accent.number} bg-clip-text text-transparent opacity-20 group-hover:opacity-60 transition-opacity duration-500 select-none`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="relative z-10">
                    <h3
                      className={`text-xl font-bold text-white mb-3 ${accent.title} transition-colors duration-300 pr-14`}
                    >
                      {topic.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{topic.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          >
            {lang === 'de' ? 'Dein ' : 'Your '}
            <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </motion.h2>

          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: prefersReducedMotion ? {} : { staggerChildren: 0.06 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-wrap justify-center gap-4"
          >
            {content.stack.map((tech, index) => (
              <motion.div
                key={tech}
                variants={popItem}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.15, rotate: index % 2 === 0 ? 2 : -2, y: -4 }
                }
                className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-400/30 text-white font-semibold hover:border-teal-400/60 hover:bg-teal-500/30 hover:shadow-lg hover:shadow-teal-500/30 transition-colors duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Roles */}
        <div className="mb-24 max-w-3xl mx-auto">
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === 'de' ? (
                <>
                  Beispiel-
                  <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                    Rollen
                  </span>
                </>
              ) : (
                <>
                  Example{' '}
                  <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                    roles
                  </span>
                </>
              )}
            </h2>
            <p className="text-xl text-gray-300">{ui.rolesSubtitle}</p>
          </motion.div>

          <div className="space-y-4">
            {content.roles.map((role, index) => (
              <motion.a
                key={role}
                href={localePath('/career#positions')}
                {...slideZoom(index % 2 === 0 ? 'left' : 'right', index * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { x: 8, scale: 1.02 }}
                className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-black/60 via-black/40 to-black/60 border border-white/10 backdrop-blur-xl hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-500/15 transition-colors duration-300"
              >
                <span className="text-white font-semibold group-hover:text-teal-300 transition-colors duration-300">
                  {role}
                </span>
                <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Application Process – "Dein Weg zu uns" */}
        <div className="mb-24">
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === 'de' ? (
                <>
                  Dein Weg{' '}
                  <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                    zu uns
                  </span>
                </>
              ) : (
                <>
                  Your path{' '}
                  <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                    to us
                  </span>
                </>
              )}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{ui.processSubtitle}</p>
          </motion.div>

          <div className="relative">
            {/* Connecting line (desktop) – grows from left to right on scroll */}
            <motion.div
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ originX: 0 }}
              className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent hidden lg:block"
            />

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 relative z-10">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    {...slideZoom(index % 2 === 0 ? 'up' : 'down', index * 0.15)}
                    className="relative"
                  >
                    {/* Numbered circle – pops in with a spring */}
                    <div className="flex justify-center lg:justify-start mb-6">
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? { scale: 1, rotate: 0 }
                            : { scale: 0, rotate: -90 }
                        }
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                          type: 'spring',
                          stiffness: 240,
                          damping: 14,
                          delay: prefersReducedMotion ? 0 : 0.2 + index * 0.15,
                        }}
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { scale: 1.15, rotate: 6, transition: { duration: 0.25 } }
                        }
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-400/40 backdrop-blur-sm flex items-center justify-center relative"
                      >
                        <StepIcon className="w-6 h-6 text-teal-400" />
                        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white text-sm font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                      </motion.div>
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Process note */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-12 text-center"
          >
            <p className="inline-block px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-gray-300 text-sm">
              {ui.processNote}
            </p>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div {...zoomIn()} className="text-center">
          <div className="inline-block p-8 md:p-12 rounded-3xl bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-pink-500/10 border border-teal-400/20 backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {ui.finalTitle}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{ui.finalSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={localePath('/career#positions')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                {ui.ctaPositions}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:careers@quantiva-advisory.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-teal-500/30 text-white font-semibold rounded-xl hover:bg-teal-500/10 transition-all duration-300"
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
