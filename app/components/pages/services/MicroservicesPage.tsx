'use client';

import React from 'react';
import { useLanguage } from '../../QuantivaWebsite';
import { Network, Cpu, Share2, Workflow, CheckCircle, ArrowRight } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';

export default function MicroservicesPage() {
  const { lang, localePath } = useLanguage();

  const featureHint = lang === 'de' ? 'Architekturdetails anzeigen.' : 'Reveal architecture details.';
  const listHint = lang === 'de' ? 'Mehr erfahren' : 'Learn more';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-black to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Network className="w-12 h-12 text-teal-400" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {lang === 'de' ? 'Microservices & Integration' : 'Microservices & Integration'}
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {lang === 'de' 
              ? 'Wir bauen entkoppelte Plattformen, die Geschwindigkeit, Skalierbarkeit und Wartbarkeit vereinen.'
              : 'We build decoupled platforms that combine speed, scalability and maintainability.'}
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
                  { icon: Cpu, title: lang === 'de' ? 'Microservice-Architekturen' : 'Microservice architectures' },
                  { icon: Share2, title: lang === 'de' ? 'API- & Event-Landschaften' : 'API & event landscapes' },
                  { icon: Workflow, title: lang === 'de' ? 'Automatisierung & DevOps' : 'Automation & DevOps' },
                ].map((item, idx) => (
                  <AnimatedCard
                    key={item.title}
                    direction={idx % 2 === 0 ? 'left' : 'right'}
                    delay={idx * 0.08}
                    className="group relative overflow-hidden rounded-2xl border border-teal-500/30 bg-slate-900/70 p-5 shadow-lg shadow-teal-500/10 transition-all duration-500 hover:border-teal-400/60 focus-within:border-teal-400/60"
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/30 to-cyan-500/20 border border-teal-400/50">
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
                {lang === 'de' ? 'Business Impact' : 'Business Impact'}
              </h2>
              <p className="text-gray-300 mb-6">
                {lang === 'de'
                  ? 'Wir unterstützen Sie vom Architekturdesign bis zum operativen Betrieb, damit Ihre Plattformen wachsen können.'
                  : 'We support you from architecture design to operational excellence so your platforms can grow.'}
              </p>
              <ul className="space-y-5">
                {[
                  lang === 'de' ? 'Schnellere Release-Zyklen' : 'Faster release cycles',
                  lang === 'de' ? 'Erhöhte Systemstabilität' : 'Increased system stability',
                  lang === 'de' ? 'Nahtlose Integration bestehender Systeme' : 'Seamless integration of existing systems',
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


