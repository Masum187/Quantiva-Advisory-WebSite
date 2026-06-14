'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle,
  Layers,
  Phone,
} from 'lucide-react';
import type { IndustryDetail } from '../../../lib/data/industryDetails';

interface IndustryLandingPageProps {
  industry: IndustryDetail;
  lang: 'de' | 'en';
}

function Counter({ index, total }: { index: number; total: number }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.14em] text-current/55">
      {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  );
}

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${dark ? 'text-white/55' : 'text-black/55'}`}>
      {children}
    </p>
  );
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
      overview: 'Branchenueberblick',
    },
    en: {
      casesTitle: 'Selected Client Stories',
      capabilitiesTitle: 'What we deliver',
      technologiesTitle: 'Technologies & Platforms',
      statsTitle: 'Results at a glance',
      contactTitle: 'Your contact',
      contactCta: 'Schedule intro call',
      focusAreas: 'Focus topics',
      overview: 'Industry overview',
    },
  }[lang];

  const heroImage = industry.contact.image;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={industry.contact.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/62 to-[#050505]/24" />
        </div>
        <div className="relative mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-end px-4 pb-20 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-5xl"
          >
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/16 bg-white/8 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/72">
              <Layers className="h-4 w-4" />
              {industry.hero.badge}
            </div>
            <h1 className="text-[clamp(3.4rem,8vw,6.4rem)] font-semibold leading-[0.95]">
              {industry.hero.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-white/74">
              {industry.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <div>
            <Kicker>{t.overview}</Kicker>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {industry.name}
            </h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-black/70">
              {industry.overview.introduction}
            </p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-black/10 bg-black/10">
              {industry.overview.focusAreas.map((area, index) => (
                <div key={area.title} className="bg-[#f7f6ff] p-6">
                  <Counter index={index + 1} total={industry.overview.focusAreas.length} />
                  <h3 className="mt-6 text-2xl font-semibold">{area.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-black/64">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:py-28">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Kicker dark>{t.statsTitle}</Kicker>
              <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
                {t.capabilitiesTitle}
              </h2>
            </div>
            <div className="flex max-w-xl flex-wrap gap-2">
              {industry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white/62"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-px overflow-hidden rounded-[10px] border border-white/12 bg-white/12 sm:grid-cols-3 lg:grid-cols-1">
              {industry.stats.map((stat, index) => (
                <div key={stat.label} className="bg-[#111] p-6">
                  <BarChart3 className="h-6 w-6 text-[#d9ff80]" />
                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              {industry.capabilities.map((capability, index) => (
                <motion.article
                  key={capability.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="rounded-[10px] border border-white/12 bg-white p-6 text-black"
                >
                  <div className="flex items-start justify-between gap-6">
                    <Counter index={index + 1} total={industry.capabilities.length} />
                    <Briefcase className="h-5 w-5 text-black/45" />
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold leading-tight">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-black/64">
                    {capability.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6ff] text-black">
        <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:py-28">
          <div className="mb-12">
            <Kicker>{t.casesTitle}</Kicker>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {t.casesTitle}
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[10px] border border-black/10 bg-black/10 lg:grid-cols-2">
            {industry.caseStudies.map((caseStudy, index) => (
              <article key={caseStudy.client} className="min-h-[360px] bg-white p-8">
                <div className="flex items-start justify-between gap-6">
                  <Counter index={index + 1} total={industry.caseStudies.length} />
                  <span className="rounded-full bg-[#d9ff80] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]">
                    {caseStudy.impact}
                  </span>
                </div>
                <p className="mt-12 text-sm font-semibold uppercase tracking-[0.12em] text-black/45">
                  {caseStudy.client}
                </p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight">
                  {caseStudy.headline}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-black/64">
                  {caseStudy.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d9ff80] text-black">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 md:px-8 lg:grid-cols-[1fr_360px] lg:items-center lg:py-28">
          <div>
            <Kicker>{t.contactTitle}</Kicker>
            <h2 className="mt-5 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {industry.contact.name}
            </h2>
            <p className="mt-5 text-xl text-black/70">{industry.contact.role}</p>
            <div className="mt-8 grid gap-3 text-base">
              <p className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5" />
                {industry.contact.email}
              </p>
              {industry.contact.phone ? (
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  {industry.contact.phone}
                </p>
              ) : null}
            </div>
            <a
              href={`mailto:${industry.contact.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              {t.contactCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] border border-black/12">
            <Image
              src={industry.contact.image}
              alt={industry.contact.name}
              fill
              sizes="(max-width: 1024px) 100vw, 360px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
