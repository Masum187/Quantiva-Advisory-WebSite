'use client';

import React from 'react';
import { useLanguage } from '../../QuantivaWebsite';
import { Shield, Lock, AlertTriangle, KeyRound, CheckCircle, ArrowRight } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';

export default function CyberSecurityPage() {
  const { lang, localePath } = useLanguage();

  const featureHint = lang === 'de' ? 'Sicherheitsvorteile anzeigen.' : 'Reveal the security benefits.';
  const listHint = lang === 'de' ? 'Mehr erfahren' : 'Learn more';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-black to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-teal-400" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {lang === 'de' ? 'Cyber Security' : 'Cyber Security'}
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            {lang === 'de' 
              ? 'Ganzheitliche Sicherheitsstrategien und operative Exzellenz für kritische IT-Landschaften.'
              : 'Holistic security strategies and operational excellence for critical IT landscapes.'}
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
                  { icon: Lock, title: lang === 'de' ? 'Zero Trust Frameworks' : 'Zero Trust Frameworks' },
                  { icon: AlertTriangle, title: lang === 'de' ? 'Threat Detection & Response' : 'Threat Detection & Response' },
                  { icon: KeyRound, title: lang === 'de' ? 'Identity & Access Management' : 'Identity & Access Management' },
                ].map((item, idx) => (
                  <AnimatedCard
                    key={item.title}
                    direction={idx % 2 === 0 ? 'left' : 'right'}
                    delay={idx * 0.08}
                    className="group relative overflow-hidden rounded-2xl border border-teal-500/30 bg-slate-900/70 p-5 shadow-lg shadow-teal-500/10 transition-all duration-500 hover:border-teal-400/60 focus-within:border-teal-400/60"
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/30 to-indigo-500/20 border border-teal-400/50">
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
                {lang === 'de' ? 'Schutz für Ihr Unternehmen' : 'Protection for your business'}
              </h2>
              <p className="text-gray-300 mb-6">
                {lang === 'de'
                  ? 'Wir etablieren Security-by-Design und sorgen für Resilienz gegen moderne Bedrohungen.'
                  : 'We establish security-by-design principles and ensure resilience against modern threats.'}
              </p>
              <ul className="space-y-5">
                {[
                  lang === 'de' ? '24/7 Monitoring & Incident Response' : '24/7 monitoring & incident response',
                  lang === 'de' ? 'Compliance & Audit Readiness' : 'Compliance & audit readiness',
                  lang === 'de' ? 'Security Awareness & Training' : 'Security awareness & training',
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


