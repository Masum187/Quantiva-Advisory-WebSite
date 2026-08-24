'use client';

import React from 'react';
import { useLanguage } from '../../QuantivaWebsite';
import { Database, Layers, Workflow, Settings, CheckCircle, ArrowRight } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';

export default function SAPPage() {
  const { lang, localePath } = useLanguage();

  const featureHint = lang === 'de' ? 'Mehr über diese Leistung erfahren.' : 'Discover more about this service.';
  const listHint = lang === 'de' ? 'Mehr erfahren' : 'Learn more';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-black to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-12 h-12 text-teal-400" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {lang === 'de' ? 'SAP Services' : 'SAP Services'}
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {lang === 'de' 
              ? 'End-to-End Beratung und Implementierung von SAP-Lösungen für nachhaltige Geschäftsprozesse.'
              : 'End-to-end consulting and implementation of SAP solutions for sustainable business processes.'}
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
                  { icon: Layers, title: lang === 'de' ? 'SAP S/4HANA Transformation' : 'SAP S/4HANA Transformation' },
                  { icon: Workflow, title: lang === 'de' ? 'Process Automation' : 'Process Automation' },
                  { icon: Settings, title: lang === 'de' ? 'Integration & Customizing' : 'Integration & Customizing' },
                ].map((item, idx) => (
                  <AnimatedCard
                    key={item.title}
                    direction={idx % 2 === 0 ? 'left' : 'right'}
                    delay={idx * 0.08}
                    className="group relative overflow-hidden rounded-2xl border border-teal-500/30 bg-slate-900/70 p-5 shadow-lg shadow-teal-500/10 transition-all duration-500 hover:border-teal-400/60 focus-within:border-teal-400/60"
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/30 to-emerald-500/20 border border-teal-400/50">
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
                {lang === 'de' ? 'Business Outcomes' : 'Business Outcomes'}
              </h2>
              <p className="text-gray-300 mb-6">
                {lang === 'de'
                  ? 'Wir verbinden funktionale Expertise mit technischer Exzellenz, um Ihre SAP-Landschaft zukunftssicher zu machen.'
                  : 'We combine functional expertise with technical excellence to future-proof your SAP landscape.'}
              </p>
              <ul className="space-y-5">
                {[
                  lang === 'de' ? 'Beschleunigte Prozesse & Transparenz' : 'Accelerated processes & transparency',
                  lang === 'de' ? 'Nahtlose Systemintegration' : 'Seamless system integration',
                  lang === 'de' ? 'Skalierbare Architekturen' : 'Scalable architectures',
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


