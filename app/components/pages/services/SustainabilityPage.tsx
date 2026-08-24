'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingDown, BarChart, CheckCircle, ArrowRight, Recycle, Sun, Droplet } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';

interface SustainabilityPageProps {
  lang: 'de' | 'en';
}

export default function SustainabilityPage({ lang }: SustainabilityPageProps) {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-emerald-900/40 via-black to-black py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.15),_transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-emerald-200">
              <Leaf className="h-4 w-4" />
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
                  className="group rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-black/80 p-8 transition-all hover:border-emerald-500/50"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-emerald-500/20 p-4">
                    <Icon className="h-8 w-8 text-emerald-400" />
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
      <section className="py-20 bg-gradient-to-b from-black to-emerald-950/20">
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
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-emerald-400" />
                  <p className="text-gray-200">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedCard direction="up">
            <h2 className="mb-12 text-center text-4xl font-bold">{content.standards.title}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {content.standards.items.map((standard, index) => (
                <motion.div
                  key={standard}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-200"
                >
                  {standard}
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedCard direction="up" className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/40 to-black p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">{content.cta.title}</h2>
            <p className="mb-8 text-xl text-gray-300">{content.cta.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/70"
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

