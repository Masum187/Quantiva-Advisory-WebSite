'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Leaf, TrendingDown, BarChart, CheckCircle, ArrowUpRight, Recycle, Sun } from 'lucide-react';
import ServiceVideoBackground from '../../ServiceVideoBackground';
import VentureCanvas from '../projects/VentureCanvas';
import {
  EASE,
  ScrollProgress,
  MaskedHeadline,
  ScrollStatement,
  SpotlightCard,
  ShineButton,
  SectionLabel,
  AccentOrbs,
} from '../projects/detail/shared';

const ACCENT = '#4ade80';

const IMPACT_METRICS = {
  de: [
    { value: '30%', label: 'Kosteneinsparung durch Energieeffizienz' },
    { value: '1–3', label: 'Scope-Erfassung der CO₂-Bilanz' },
    { value: 'CSRD', label: 'Reporting-ready nach EU-Standard' },
    { value: '360°', label: 'Blick auf Ihre Wertschöpfungskette' },
  ],
  en: [
    { value: '30%', label: 'Cost savings through energy efficiency' },
    { value: '1–3', label: 'Scope coverage of carbon accounting' },
    { value: 'CSRD', label: 'Reporting-ready to EU standard' },
    { value: '360°', label: 'View across your value chain' },
  ],
};

interface SustainabilityPageProps {
  lang: 'de' | 'en';
}

export default function SustainabilityPage({ lang }: SustainabilityPageProps) {
  const reduceMotion = useReducedMotion();

  const content = {
    de: {
      hero: {
        badge: 'Sustainability Consulting',
        title: 'Nachhaltige Transformation für zukunftsfähige Unternehmen',
        subtitle: 'ESG-Strategie, CO₂-Reduktion und digitale Nachhaltigkeitsreporting',
      },
      intro: {
        title: 'Nachhaltigkeit als Wettbewerbsvorteil',
        description: 'Wir unterstützen Sie bei der Entwicklung und Umsetzung Ihrer Nachhaltigkeitsstrategie. Von ESG-Reporting über CO₂-Bilanzierung bis hin zu nachhaltigen Lieferketten – wir machen Ihr Unternehmen fit für die Anforderungen von morgen.',
      },
      services: {
        title: 'Unsere Leistungen',
        items: [
          {
            icon: BarChart,
            title: 'ESG-Strategie & Reporting',
            description: 'Entwicklung ESG-konformer Strategien und automatisiertes Reporting nach CSRD, GRI und TCFD-Standards.',
          },
          {
            icon: TrendingDown,
            title: 'CO₂-Bilanzierung',
            description: 'Corporate Carbon Footprint (CCF) und Product Carbon Footprint (PCF) mit Scope 1-3 Erfassung.',
          },
          {
            icon: Recycle,
            title: 'Circular Economy',
            description: 'Implementierung zirkulärer Geschäftsmodelle und Kreislaufwirtschafts-Strategien.',
          },
          {
            icon: Sun,
            title: 'Energiemanagement',
            description: 'ISO 50001-konforme Energiemanagementsysteme und Optimierung des Energieverbrauchs.',
          },
        ],
      },
      benefits: {
        title: 'Ihre Vorteile',
        items: [
          'Regulatorische Compliance: CSRD, EU-Taxonomie, Lieferkettengesetz',
          'Kosteneinsparung: Bis zu 30% durch Energieeffizienz',
          'Investoren-Attraktivität: ESG-Rating-Verbesserung',
          'Risikominimierung: Klimarisiken frühzeitig identifizieren',
          'Markenimage: Nachweisbare Nachhaltigkeitsperformance',
        ],
      },
      standards: {
        title: 'Standards & Frameworks',
        items: ['CSRD', 'GRI', 'TCFD', 'SBTi', 'ISO 14001', 'ISO 50001', 'EU-Taxonomie', 'CDP'],
      },
      cta: {
        title: 'Bereit für nachhaltige Transformation?',
        description: 'Starten Sie Ihre ESG-Journey mit uns.',
        button: 'Jetzt ESG-Assessment anfragen',
      },
    },
    en: {
      hero: {
        badge: 'Sustainability Consulting',
        title: 'Sustainable Transformation for Future-Ready Companies',
        subtitle: 'ESG strategy, CO₂ reduction and digital sustainability reporting',
      },
      intro: {
        title: 'Sustainability as Competitive Advantage',
        description: 'We support you in developing and implementing your sustainability strategy. From ESG reporting to carbon accounting and sustainable supply chains – we prepare your company for tomorrow\'s requirements.',
      },
      services: {
        title: 'Our Services',
        items: [
          {
            icon: BarChart,
            title: 'ESG Strategy & Reporting',
            description: 'Development of ESG-compliant strategies and automated reporting according to CSRD, GRI and TCFD standards.',
          },
          {
            icon: TrendingDown,
            title: 'Carbon Accounting',
            description: 'Corporate Carbon Footprint (CCF) and Product Carbon Footprint (PCF) with Scope 1-3 measurement.',
          },
          {
            icon: Recycle,
            title: 'Circular Economy',
            description: 'Implementation of circular business models and circular economy strategies.',
          },
          {
            icon: Sun,
            title: 'Energy Management',
            description: 'ISO 50001-compliant energy management systems and energy consumption optimization.',
          },
        ],
      },
      benefits: {
        title: 'Your Benefits',
        items: [
          'Regulatory compliance: CSRD, EU Taxonomy, Supply Chain Act',
          'Cost savings: Up to 30% through energy efficiency',
          'Investor attractiveness: ESG rating improvement',
          'Risk minimization: Early identification of climate risks',
          'Brand image: Verifiable sustainability performance',
        ],
      },
      standards: {
        title: 'Standards & Frameworks',
        items: ['CSRD', 'GRI', 'TCFD', 'SBTi', 'ISO 14001', 'ISO 50001', 'EU Taxonomy', 'CDP'],
      },
      cta: {
        title: 'Ready for sustainable transformation?',
        description: 'Start your ESG journey with us.',
        button: 'Request ESG assessment now',
      },
    },
  }[lang];

  const metrics = IMPACT_METRICS[lang];

  return (
    <div className="relative min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Fixed Background Video (kept) */}
      <ServiceVideoBackground
        videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1761924430/video_f85758c6_1761914591442_yszhud.mp4"]}
        overlayClassName="bg-black/55"
      />

      <div className="relative z-10">
        {/* ---------- Hero: Organic Impact ---------- */}
        <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden border-b border-white/10">
          <AccentOrbs accent={ACCENT} />
          <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
            {/* Badge with drawn ring */}
            <div className="relative mx-auto mb-10 flex h-24 w-24 items-center justify-center">
              <svg viewBox="0 0 96 96" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                <motion.circle
                  cx="48"
                  cy="48"
                  r="45"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
                />
              </svg>
              <Leaf className="h-8 w-8" style={{ color: ACCENT }} />
            </div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em]" style={{ color: ACCENT }}>
              {content.hero.badge}
            </p>
            <h1 className="text-[clamp(2.2rem,6vw,4.4rem)] font-black leading-[1.05] tracking-tight">
              <MaskedHeadline text={content.hero.title} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              className="mx-auto mt-8 max-w-2xl text-lg text-gray-300 md:text-xl"
            >
              {content.hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* ---------- Statement with threads canvas ---------- */}
        <section className="relative overflow-hidden py-28 md:py-36">
          <VentureCanvas effect="threads" accent={ACCENT} className="absolute inset-0 h-full w-full opacity-25" />
          <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
            <SectionLabel num="01" accent={ACCENT}>{content.intro.title}</SectionLabel>
            <ScrollStatement
              text={content.intro.description}
              className="mt-10 text-[clamp(1.35rem,2.8vw,2.2rem)] font-light leading-snug"
            />
          </div>
        </section>

        {/* ---------- Offerings: organic asymmetric grid ---------- */}
        <section className="mx-auto max-w-6xl px-6 pb-28 md:px-12">
          <SectionLabel num="02" accent={ACCENT}>{content.services.title}</SectionLabel>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            <MaskedHeadline text={content.services.title} />
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-12">
            {content.services.items.map((service, i) => {
              const Icon = service.icon;
              const wide = i === 0 || i === 3;
              const rounded = i % 2 === 0 ? 'rounded-[3rem]' : 'rounded-[2rem]';
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 26, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: EASE }}
                  className={`${wide ? 'md:col-span-7' : 'md:col-span-5'} ${i === 2 ? 'md:mt-10' : ''}`}
                >
                  <SpotlightCard
                    accent={ACCENT}
                    className={`h-full border border-white/10 bg-[#06110a]/85 p-8 backdrop-blur md:p-10 ${rounded}`}
                  >
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full border"
                      style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}12`, color: ACCENT }}
                    >
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 text-2xl font-bold">{service.title}</h3>
                    <p className="mt-4 leading-relaxed text-gray-300">{service.description}</p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ---------- Impact metrics ---------- */}
        <section className="border-y border-white/10 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.value}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="text-center lg:text-left"
              >
                <p className="text-[clamp(2.8rem,5vw,4.2rem)] font-black leading-none" style={{ color: ACCENT }}>
                  {m.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------- Benefits + standards ---------- */}
        <section className="mx-auto max-w-6xl px-6 py-28 md:px-12">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel num="03" accent={ACCENT}>{content.benefits.title}</SectionLabel>
              <ul className="mt-10 space-y-5">
                {content.benefits.items.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                    <span className="text-gray-200">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel num="04" accent={ACCENT}>{content.standards.title}</SectionLabel>
              <div className="mt-10 flex flex-wrap gap-3">
                {content.standards.items.map((standard, i) => (
                  <motion.span
                    key={standard}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                    className="rounded-full border px-5 py-2.5 font-mono text-sm"
                    style={{ borderColor: `${ACCENT}33`, background: `${ACCENT}0d`, color: '#d1fae5' }}
                  >
                    {standard}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="relative overflow-hidden border-t border-white/10 py-28 text-center md:py-36">
          <AccentOrbs accent={ACCENT} />
          <div className="relative mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-bold md:text-5xl">
              <MaskedHeadline text={content.cta.title} />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-lg text-gray-300"
            >
              {content.cta.description}
            </motion.p>
            <div className="mt-12 flex justify-center">
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
