'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedCard } from '../../services/AnimatedCard';
import { ArrowRight, BarChart3, Briefcase, CheckCircle, Layers, Phone } from 'lucide-react';
import type { IndustryDetail } from '../../../lib/data/industryDetails';

interface IndustryLandingPageProps {
  industry: IndustryDetail;
  lang: 'de' | 'en';
}

export default function IndustryLandingPage({ industry, lang }: IndustryLandingPageProps) {
  const t = {
    de: {
      casesTitle: 'Referenzen & Praxisbeispiele',
      capabilitiesTitle: 'Was wir liefern',
      technologiesTitle: 'Technologien & Plattformen',
      statsTitle: 'Ergebnisse im Überblick',
      contactTitle: 'Ihr Ansprechpartner',
      contactCta: 'Intro-Gespräch vereinbaren',
      focusAreas: 'Fokusthemen',
    },
    en: {
      casesTitle: 'Selected Client Stories',
      capabilitiesTitle: 'What we deliver',
      technologiesTitle: 'Technologies & Platforms',
      statsTitle: 'Results at a glance',
      contactTitle: 'Your contact',
      contactCta: 'Schedule intro call',
      focusAreas: 'Focus topics',
    },
  }[lang];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-teal-900/40 via-black to-black py-32">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.35),_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal-500/40 bg-teal-500/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-teal-200">
              <Layers className="h-4 w-4" />
              {industry.hero.badge}
            </div>
            <h1 className="mb-6 text-4xl font-black uppercase tracking-tight md:text-6xl">
              {industry.hero.title}
            </h1>
            <p className="text-xl text-gray-300 md:text-2xl">
              {industry.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-20 space-y-24">
        {/* Overview */}
        <AnimatedCard direction="up" className="p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-black/80">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold mb-4">{industry.name}</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {industry.overview.introduction}
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-teal-300 mb-3">{t.focusAreas}</h3>
              <ul className="space-y-4">
                {industry.overview.focusAreas.map((area) => (
                  <li key={area.title} className="rounded-2xl border border-teal-500/20 bg-teal-500/10 p-4">
                    <h4 className="font-semibold text-white mb-1">{area.title}</h4>
                    <p className="text-sm text-teal-100/80">{area.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedCard>

        {/* Stats & Technologies */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <AnimatedCard direction="left">
            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">
              {t.statsTitle}
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {industry.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <BarChart3 className="h-6 w-6 text-teal-300 mb-3" />
                  <p className="text-sm uppercase tracking-wider text-gray-400">{stat.label}</p>
                  <p className="mt-2 text-xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>

          <AnimatedCard direction="right" className="p-8 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm">
            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">
              {t.technologiesTitle}
            </h3>
            <div className="flex flex-wrap gap-3">
              {industry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedCard>
        </div>

        {/* Capabilities */}
        <section>
          <AnimatedCard direction="up">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-3">{t.capabilitiesTitle}</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                {industry.overview.introduction}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {industry.capabilities.map((capability, index) => (
                <AnimatedCard
                  key={capability.title}
                  as="article"
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.1}
                  className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-black/80"
                >
                  <div className="mb-4 inline-flex rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-teal-200">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {capability.title}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{capability.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedCard>
        </section>

        {/* Case Studies */}
        <section>
          <AnimatedCard direction="up">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.casesTitle}</h2>
            <div className="grid gap-10 lg:grid-cols-2">
              {industry.caseStudies.map((caseStudy) => (
                <AnimatedCard
                  key={caseStudy.client}
                  as="article"
                  direction="up"
                  className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 to-black"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-widest text-purple-200/80">{caseStudy.client}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{caseStudy.headline}</h3>
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium text-white/80">
                      {caseStudy.impact}
                    </span>
                  </div>
                  <p className="text-gray-200 leading-relaxed">{caseStudy.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedCard>
        </section>

        {/* Contact */}
        <section>
          <AnimatedCard direction="up" className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-teal-900/40 to-black p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t.contactTitle}</h2>
                <p className="text-gray-200 mb-6">
                  {industry.contact.name} · {industry.contact.role}
                </p>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-300" />
                    {industry.contact.email}
                  </p>
                  {industry.contact.phone ? (
                    <p className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-teal-300" />
                      {industry.contact.phone}
                    </p>
                  ) : null}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  {t.contactCta}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
              <div className="relative h-64 w-full overflow-hidden rounded-3xl">
                <Image
                  src={industry.contact.image}
                  alt={industry.contact.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </AnimatedCard>
        </section>
      </main>
    </div>
  );
}
