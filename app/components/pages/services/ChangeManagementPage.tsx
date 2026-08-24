'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, BookOpen, CheckCircle, ArrowRight, Target, Lightbulb, Award } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';

interface ChangeManagementPageProps {
  lang: 'de' | 'en';
}

export default function ChangeManagementPage({ lang }: ChangeManagementPageProps) {
  const content = {
    de: {
      hero: {
        badge: 'Change & Training',
        title: 'Change Management & Training für erfolgreiche Transformationen',
        subtitle: 'Menschen befähigen, Veränderungen gestalten, Akzeptanz schaffen',
      },
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
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-orange-900/40 via-black to-black py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.15),_transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange-500/40 bg-orange-500/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-orange-200">
              <Users className="h-4 w-4" />
              {content.hero.badge}
            </div>
            <h1 className="mb-6 text-5xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              {content.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedCard direction="up" className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-black/80 p-12">
            <h2 className="mb-6 text-3xl font-bold">{content.intro.title}</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              {content.intro.description}
            </p>
          </AnimatedCard>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-4xl font-bold"
          >
            {content.services.title}
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-2">
            {content.services.items.map((service, index) => {
              const Icon = service.icon;
              return (
                <AnimatedCard
                  key={service.title}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.1}
                  className="group rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-black/80 p-8 transition-all hover:border-orange-500/50"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-orange-500/20 p-4">
                    <Icon className="h-8 w-8 text-orange-400" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-black to-orange-950/20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedCard direction="up">
            <h2 className="mb-12 text-center text-4xl font-bold">{content.benefits.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.benefits.items.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6"
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-orange-400" />
                  <p className="text-gray-200">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Approaches Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedCard direction="up">
            <h2 className="mb-12 text-center text-4xl font-bold">{content.approaches.title}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {content.approaches.items.map((approach, index) => (
                <motion.div
                  key={approach}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-full border border-orange-500/30 bg-orange-500/10 px-6 py-3 text-sm font-semibold text-orange-200"
                >
                  {approach}
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedCard direction="up" className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-900/40 to-black p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">{content.cta.title}</h2>
            <p className="mb-8 text-xl text-gray-300">{content.cta.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/70"
            >
              {content.cta.button}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </AnimatedCard>
        </div>
      </section>
    </div>
  );
}

