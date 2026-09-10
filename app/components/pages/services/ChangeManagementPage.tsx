'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Users, BookOpen, ArrowUpRight, Target, Lightbulb } from 'lucide-react';
import ServiceVideoBackground from '../../ServiceVideoBackground';
import {
  EASE,
  ScrollProgress,
  MaskedHeadline,
  ScrollStatement,
  SpotlightCard,
  PulseNode,
  ShineButton,
  SectionLabel,
} from '../projects/detail/shared';

const ACCENT = '#fb923c';

interface ChangeManagementPageProps {
  lang: 'de' | 'en';
}

export default function ChangeManagementPage({ lang }: ChangeManagementPageProps) {
  const reduceMotion = useReducedMotion();

  const content = {
    de: {
      hero: {
        badge: 'Change & Training',
        title: 'Change Management & Training für erfolgreiche Transformationen',
        subtitle: 'Menschen befähigen, Veränderungen gestalten, Akzeptanz schaffen',
      },
      split: { before: 'Heute', after: 'Morgen' },
      intro: {
        title: 'Transformation beginnt bei den Menschen',
        description: 'Technologie allein reicht nicht. Wir begleiten Ihre Mitarbeitenden durch Veränderungsprozesse und befähigen sie, neue Systeme und Prozesse erfolgreich zu nutzen. Mit maßgeschneiderten Trainings, Change-Kommunikation und Adoption-Strategien.',
      },
      services: {
        title: 'Unsere Leistungen',
        items: [
          {
            icon: Target,
            title: 'Change-Strategie',
            description: 'Entwicklung ganzheitlicher Change-Strategien mit Stakeholder-Analyse, Impact-Assessment und Kommunikationsplan.',
          },
          {
            icon: Users,
            title: 'Change-Begleitung',
            description: 'Aktive Begleitung durch Transformationsprozesse mit Change Agents, Workshops und Feedback-Schleifen.',
          },
          {
            icon: BookOpen,
            title: 'Training & Enablement',
            description: 'Maßgeschneiderte Schulungsprogramme, E-Learning-Plattformen und Train-the-Trainer-Konzepte.',
          },
          {
            icon: Lightbulb,
            title: 'Adoption & Coaching',
            description: 'User Adoption Tracking, Power-User-Programme und individuelles Coaching für Führungskräfte.',
          },
        ],
      },
      benefits: {
        title: 'Ihre Vorteile',
        items: [
          'Höhere Akzeptanz: 85%+ User Adoption bei neuen Systemen',
          'Schnellerer ROI: Produktivität steigt 40% schneller',
          'Geringere Widerstände: Proaktive Einbindung aller Stakeholder',
          'Nachhaltiger Erfolg: Veränderungen werden dauerhaft gelebt',
          'Kompetenzaufbau: Mitarbeitende werden zu Change Champions',
        ],
      },
      approaches: {
        title: 'Methoden & Ansätze',
        items: ['ADKAR', 'Kotter 8-Stufen', 'Prosci', 'Agile Change', 'Design Thinking', 'Appreciative Inquiry', 'Lean Change', 'OKR'],
      },
      cta: {
        title: 'Bereit für erfolgreiche Transformation?',
        description: 'Lassen Sie uns Ihre Change-Journey gemeinsam gestalten.',
        button: 'Jetzt Change-Beratung anfragen',
      },
    },
    en: {
      hero: {
        badge: 'Change & Training',
        title: 'Change Management & Training for Successful Transformations',
        subtitle: 'Empower people, shape change, create acceptance',
      },
      split: { before: 'Today', after: 'Tomorrow' },
      intro: {
        title: 'Transformation Starts with People',
        description: 'Technology alone is not enough. We guide your employees through change processes and enable them to successfully use new systems and processes. With tailored training, change communication and adoption strategies.',
      },
      services: {
        title: 'Our Services',
        items: [
          {
            icon: Target,
            title: 'Change Strategy',
            description: 'Development of holistic change strategies with stakeholder analysis, impact assessment and communication plan.',
          },
          {
            icon: Users,
            title: 'Change Support',
            description: 'Active support through transformation processes with change agents, workshops and feedback loops.',
          },
          {
            icon: BookOpen,
            title: 'Training & Enablement',
            description: 'Tailored training programs, e-learning platforms and train-the-trainer concepts.',
          },
          {
            icon: Lightbulb,
            title: 'Adoption & Coaching',
            description: 'User adoption tracking, power user programs and individual coaching for executives.',
          },
        ],
      },
      benefits: {
        title: 'Your Benefits',
        items: [
          'Higher acceptance: 85%+ user adoption for new systems',
          'Faster ROI: Productivity increases 40% faster',
          'Lower resistance: Proactive involvement of all stakeholders',
          'Sustainable success: Changes are lived permanently',
          'Competence building: Employees become change champions',
        ],
      },
      approaches: {
        title: 'Methods & Approaches',
        items: ['ADKAR', 'Kotter 8-Step', 'Prosci', 'Agile Change', 'Design Thinking', 'Appreciative Inquiry', 'Lean Change', 'OKR'],
      },
      cta: {
        title: 'Ready for successful transformation?',
        description: 'Let us shape your change journey together.',
        button: 'Request change consulting now',
      },
    },
  }[lang];

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Fixed Background Video */}
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1762015286/openart-video_b6992003_1761933215657_wgjmwh.mp4"]} overlayClassName="bg-black/55" />

      <div className="relative z-10">
        {/* ---------- Hero: Vorher/Nachher-Split ---------- */}
        <section className="relative overflow-hidden">
          {/* Zwei Hälften als Hintergrund */}
          <div className="absolute inset-0 grid grid-cols-2" aria-hidden="true">
            <div className="bg-black/50 backdrop-grayscale" />
            <div style={{ background: `linear-gradient(135deg, ${ACCENT}14, transparent 70%)` }} />
          </div>

          {/* Animierte Trennlinie */}
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-full w-px origin-top"
            style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}, transparent)` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
          />

          <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
            {/* Labels der beiden Hälften */}
            <div className="mb-14 grid grid-cols-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
                className="pr-8 text-right font-mono text-xs uppercase tracking-[0.4em] text-gray-500"
              >
                {content.split.before}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: EASE }}
                className="pl-8 font-mono text-xs uppercase tracking-[0.4em]"
                style={{ color: ACCENT }}
              >
                {content.split.after}
              </motion.p>
            </div>

            {/* Titel über beide Hälften */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.3em]"
                style={{ borderColor: `${ACCENT}44`, color: ACCENT, background: `${ACCENT}0d` }}
              >
                <Users className="h-4 w-4" />
                {content.hero.badge}
              </motion.p>

              <h1 className="mx-auto max-w-5xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
                <MaskedHeadline text={content.hero.title} />
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
                className="mx-auto mt-8 max-w-2xl text-xl text-gray-300"
              >
                {content.hero.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* ---------- Statement ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-4xl px-6">
            <SectionLabel num="01" accent={ACCENT}>
              {content.intro.title}
            </SectionLabel>
            <div className="mt-8">
              <ScrollStatement text={content.intro.description} />
            </div>
          </div>
        </section>

        {/* ---------- Leistungen: Transformations-Timeline ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text={content.services.title} />
            </h2>

            <div className="relative mt-20">
              {/* Zentrale Linie (links auf Mobile) */}
              <motion.span
                aria-hidden="true"
                className="absolute left-5 top-0 h-full w-px origin-top md:left-1/2"
                style={{ background: `linear-gradient(to bottom, ${ACCENT}88, ${ACCENT}22)` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.6, ease: EASE }}
              />

              <div className="space-y-16">
                {content.services.items.map((service, index) => {
                  const Icon = service.icon;
                  const right = index % 2 === 1;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                      className="relative grid items-center gap-6 pl-14 md:grid-cols-[1fr_auto_1fr] md:gap-10 md:pl-0"
                    >
                      {/* Node auf der Linie */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 md:static md:order-2 md:translate-y-0 md:justify-self-center">
                        <PulseNode index={index} accent={ACCENT} />
                      </span>

                      {/* Karte, abwechselnd links/rechts */}
                      <div
                        className={
                          right
                            ? 'md:order-3'
                            : 'md:order-1 md:justify-self-end'
                        }
                      >
                        <SpotlightCard
                          accent={ACCENT}
                          className="max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition-colors duration-300 hover:border-white/25"
                        >
                          <div
                            className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                            style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}12` }}
                          >
                            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                          </div>
                          <h3 className="text-xl font-bold">{service.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            {service.description}
                          </p>
                        </SpotlightCard>
                      </div>

                      {/* Leere Gegenseite (nur Desktop) */}
                      <div className={right ? 'hidden md:order-1 md:block' : 'hidden md:order-3 md:block'} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Vorteile: Adoption-Reihe ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel num="02" accent={ACCENT}>
              {content.benefits.title}
            </SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text={content.benefits.title} />
            </h2>

            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
              {content.benefits.items.map((benefit, index) => {
                const [headline, ...rest] = benefit.split(':');
                const detail = rest.join(':').trim();
                return (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
                    className="bg-black/70 p-6 backdrop-blur-md"
                  >
                    <p className="text-lg font-bold" style={{ color: ACCENT }}>
                      {headline}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-300">{detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- Methoden & Ansätze ---------- */}
        <section className="relative py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              <MaskedHeadline text={content.approaches.title} />
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {content.approaches.items.map((approach, index) => (
                <motion.span
                  key={approach}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18, delay: index * 0.05 }}
                  className="rounded-full border px-5 py-2.5 font-mono text-sm"
                  style={{ borderColor: `${ACCENT}44`, color: `${ACCENT}dd`, background: `${ACCENT}0d` }}
                >
                  {approach}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="relative border-t border-white/10 py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text={content.cta.title} />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mx-auto mt-6 max-w-xl text-lg text-gray-300"
            >
              {content.cta.description}
            </motion.p>
            <div className="mt-10 flex justify-center">
              <ShineButton href={`/${lang}#contact`} accent={ACCENT}>
                {content.cta.button}
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
