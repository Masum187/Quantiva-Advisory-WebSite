'use client';

import React from 'react';
import { useLanguage } from '../../QuantivaWebsite';
import { Lightbulb, BarChart2, Layers, Compass, CheckCircle, ArrowRight } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';

export default function DigitalStrategyPage() {
  const { lang, localePath } = useLanguage();

  const featureHint = lang === 'de' ? 'Strategische Insights anzeigen.' : 'Reveal strategic insights.';
  const listHint = lang === 'de' ? 'Mehr erfahren' : 'Learn more';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-black to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-12 h-12 text-teal-400" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {lang === 'de' ? 'Digital Strategy' : 'Digital Strategy'}
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {lang === 'de' 
              ? 'Wir gestalten datengetriebene Strategien für digitale Geschäftsmodelle und Transformation.'
              : 'We craft data-driven strategies for digital business models and transformation.'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {lang === 'de' ? 'Unsere Leistungen' : 'Our Services'}
              </h2>
              <div className="space-y-6">
                {[
                  { icon: BarChart2, title: lang === 'de' ? 'Digitale Wachstumsstrategien' : 'Digital growth strategies' },
                  { icon: Layers, title: lang === 'de' ? 'Produkt- & Plattformdesign' : 'Product & platform design' },
                  { icon: Compass, title: lang === 'de' ? 'Roadmaps & Operating Models' : 'Roadmaps & operating models' },
                ].map((item, idx) => (
                  <AnimatedCard
                    key={item.title}
                    direction={idx % 2 === 0 ? 'left' : 'right'}
                    delay={idx * 0.08}
                    className="group relative overflow-hidden rounded-2xl border border-teal-500/30 bg-slate-900/70 p-5 shadow-lg shadow-teal-500/10 transition-all duration-500 hover:border-teal-400/60 focus-within:border-teal-400/60"
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/30 to-fuchsia-500/20 border border-teal-400/50">
                        <item.icon className="w-6 h-6 text-teal-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-sm text-gray-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                          {featureHint}
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {lang === 'de' ? 'Ergebnisorientiert' : 'Outcome oriented'}
              </h2>
              <p className="text-gray-300 mb-6">
                {lang === 'de'
                  ? 'Gemeinsam entwickeln wir belastbare Strategien, die Ihr Geschäft skalierbar und resilient machen.'
                  : 'Together we develop resilient strategies that make your business scalable and resilient.'}
              </p>
              <ul className="space-y-5">
                {[
                  lang === 'de' ? 'Messbare OKRs & KPI-Strukturen' : 'Measurable OKRs & KPI structures',
                  lang === 'de' ? 'Time-to-Value Optimierung' : 'Time-to-value optimisation',
                  lang === 'de' ? 'Change Enablement & Buy-in' : 'Change enablement & buy-in',
                ].map((item, idx) => (
                  <AnimatedCard
                    key={item}
                    as="li"
                    direction={idx % 2 === 0 ? 'right' : 'left'}
                    delay={0.15 + idx * 0.08}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5 shadow-inner shadow-slate-900/80 transition-all duration-500 hover:border-teal-400/40 focus-within:border-teal-400/40"
                    tabIndex={0}
                  >
                    <CheckCircle className="w-5 h-5 text-teal-300 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-base text-white">{item}</span>
                      <span className="mt-2 block text-sm text-gray-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        {listHint}
                      </span>
                    </div>
                  </AnimatedCard>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <a
              href={localePath('/#contact')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-500 rounded-xl font-semibold transition"
            >
              {lang === 'de' ? 'Jetzt Beratung anfragen' : 'Request consultation now'}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


