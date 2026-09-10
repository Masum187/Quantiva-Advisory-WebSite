'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import ServiceNavigation from '../../../components/ServiceNavigation';
import VentureCanvas from '../../../components/pages/projects/VentureCanvas';
import {
  EASE,
  ScrollProgress,
  LetterHeadline,
  ScrollStatement,
  ShineButton,
  SectionLabel,
} from '../../../components/pages/projects/detail/shared';

const ACCENT = '#f87171';

const SCAN_LINES: { text: string; status: 'ok' | 'alert' | 'info' }[] = [
  { text: '[SCAN] Perimeter geprüft — 4 Zonen, 0 offene Ports', status: 'ok' },
  { text: '[SCAN] Identitäten validiert — MFA aktiv', status: 'ok' },
  { text: '[ALERT] 3 veraltete Zertifikate erkannt', status: 'alert' },
  { text: '[SCAN] Angriffsfläche modelliert — 12 Vektoren', status: 'info' },
  { text: '[OK] Remediation-Plan erstellt', status: 'ok' },
];

const PRINCIPLES = [
  { value: 'Zero Trust', label: 'Never trust, always verify — jede Anfrage wird geprüft.' },
  { value: '24/7', label: 'Kontinuierliches Monitoring statt punktueller Audits.' },
  { value: 'Defense in Depth', label: 'Mehrschichtige Kontrollen von Netzwerk bis Identität.' },
  { value: 'Compliance', label: 'Regulatorische Anforderungen als Mindeststandard, nicht als Ziel.' },
];

export default function CyberSecurityServicePage() {
  const reduceMotion = useReducedMotion();

  const offerings = [
    {
      title: 'Zero Trust & IAM',
      description: 'Implementierung moderner Zero Trust-Frameworks und Identity Access Management für maximale Sicherheit.',
      features: ['Multi-Factor Authentication', 'Role-Based Access Control', 'Identity Governance', 'Single Sign-On'],
      details: 'Zero Trust folgt dem Prinzip "Never trust, always verify" und minimiert Angriffsflächen durch systematische Identitäts- und Geräteauthentifizierung. Unsere IAM-Lösungen sorgen für nahtlose Benutzerauthentifizierung und granulare Berechtigungskontrolle.',
      benefits: ['Minimierung von Angriffsflächen', 'Compliance & Datenschutz', 'Granulare Zugriffskontrolle', 'Skalierbare Sicherheitsarchitektur'],
    },
    {
      title: 'Security Architecture',
      description: 'Aufbau einer resilienten und skalierbaren Sicherheitsarchitektur für Ihr Unternehmen.',
      features: ['Network Segmentation', 'Cloud Security', 'API Security', 'Security by Design'],
      details: 'Wir entwickeln ganzheitliche Sicherheitsarchitekturen, die Netzwerk- und Cloud-Security integrieren. Durch Security-by-Design und API-Absicherung schaffen wir langfristigen Schutz vor Sicherheitslücken und steigern die Effizienz durch Automatisierung.',
      benefits: ['Langfristiger Schutz vor Sicherheitslücken', 'Effizienzsteigerung durch Automatisierung', 'Skalierbare Architektur', 'Integration neuer Technologien'],
    },
    {
      title: 'Audits & Hardening',
      description: 'Systematische Sicherheitsüberprüfungen und Absicherung Ihrer Infrastruktur gegen moderne Bedrohungen.',
      features: ['Security Assessments', 'Penetration Testing', 'Vulnerability Management', 'Compliance Audits'],
      details: 'Regelmäßige Audits und Hardening-Maßnahmen sind die Basis für nachhaltigen Schutz. Wir führen umfassende Sicherheits-Assessments durch und erstellen automatisierte Schwachstellen-Scans mit konkreten Remediation-Strategien.',
      benefits: ['Nachhaltiger Schutz durch regelmäßige Überprüfungen', 'Automatisierte Schwachstellen-Scans', 'Konkrete Remediation-Strategien', 'Compliance mit regulatorischen Anforderungen'],
    },
    {
      title: 'Threat Modeling',
      description: 'Proaktive Identifikation und Bewertung von Sicherheitsrisiken in Ihren Systemen.',
      features: ['Risk Assessment', 'Attack Surface Analysis', 'Security Controls', 'Incident Response'],
      details: 'Threat Modeling ermöglicht die systematische Analyse von Bedrohungen und Risiken. Wir modellieren potenzielle Angreifer und Angriffswege, priorisieren Risiken und entwickeln proaktive Gegenmaßnahmen für Ihre Sicherheitsstrategie.',
      benefits: ['Proaktive Entwicklung von Gegenmaßnahmen', 'Anpassung an tatsächliche Gefährdungslage', 'Systematische Risikobewertung', 'Kontinuierliche Verbesserung der Sicherheitsstrategie'],
    },
  ];

  const studies = [
    {
      title: 'ZTNA Studie von techconsult (2024)',
      description: 'Zeigt, wie Zero Trust traditionelle Sicherheitsansätze ablöst, besonders durch Cloud und Remote Work. Analysiert Herausforderungen und Erfolgsfaktoren.',
      topic: 'Zero Trust & IAM',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'PwC Digital Trust Insights (2022)',
      description: 'Nur ein Drittel der Unternehmen weltweit schätzt die eigene Cyber-Abwehr als „gut bis sehr gut" ein. Defizite bei Integration neuer Technologien.',
      topic: 'Security Architecture',
      date: '2022',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'TÜV Cybersecurity Studie 2025',
      description: 'Zeigt die Zunahme KI-gestützter Angriffe und mangelnde Verteidigung. Regelmäßige Audits und Hardening dringend empfohlen.',
      topic: 'Audits & Hardening',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'KI-basierte Cyber Security Risikoanalyse (SCS 2025)',
      description: 'Evaluierung von künstlicher Intelligenz zur automatischen Risikoerkennung und Bedrohungsmodellierung.',
      topic: 'Threat Modeling',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Trendstudie IAM in deutschen KMU (2023)',
      description: 'Ermittelt Bewusstsein für Risiken durch unbefugten Zugriff und Akzeptanz von IAM-Lösungen im Mittelstand.',
      topic: 'Zero Trust & IAM',
      date: '2023',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Threat Modeling – Johner Institut (2024)',
      description: 'Beschreibt systematisches Auffinden und Beseitigen von Risiken durch iterative, kontinuierliche Bedrohungsmodellierung.',
      topic: 'Threat Modeling',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black">
      <ScrollProgress accent={ACCENT} />
      <ServiceNavigation lang="de" serviceTitle="Cyber Security" serviceId="security" />

      {/* Fixed Background Video — stark abgedunkelt */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <video
          src="https://res.cloudinary.com/dbrisux8i/video/upload/v1760385739/kling_20251014_Text_to_Video_Scene_1__M_930_0_1_djdrj2.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10">
        {/* Hero — Terminal / Audit */}
        <section className="relative flex min-h-screen items-center py-32">
          <div className="mx-auto w-full max-w-3xl px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="text-center font-mono text-xs uppercase tracking-[0.4em] text-gray-500"
            >
              <span style={{ color: ACCENT }}>●</span> Cyber Security — Perimeter
            </motion.p>

            <h1 className="mt-8 text-center text-[clamp(2.6rem,7vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
              <LetterHeadline text="Cyber Security" delay={0.3} />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
              className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-gray-400"
            >
              Ganzheitliche Sicherheitskonzepte, Compliance und Risikomanagement. Wir schützen Ihre
              digitalen Assets und gewährleisten die Sicherheit Ihrer IT-Infrastruktur.
            </motion.p>

            {/* Threat-Scan-Terminal */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
              className="mt-14 overflow-hidden rounded-xl border border-white/15 bg-black/90 shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${ACCENT}88` }} />
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
                  quantiva@perimeter — audit
                </span>
              </div>
              <motion.div
                className="space-y-2 px-5 py-5 font-mono text-xs sm:text-sm"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.35, delayChildren: 1.6 } } }}
              >
                {SCAN_LINES.map((line) => (
                  <motion.p
                    key={line.text}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    transition={{ duration: 0.4 }}
                    className={
                      line.status === 'alert'
                        ? 'text-red-400'
                        : line.status === 'ok'
                          ? 'text-emerald-400'
                          : 'text-gray-400'
                    }
                  >
                    {line.text}
                  </motion.p>
                ))}
                <motion.p
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-500"
                >
                  {'>'} _
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Offerings — Case Files */}
        <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <SectionLabel num="01" accent={ACCENT}>
            Unsere Sicherheits-Dienstleistungen
          </SectionLabel>
          <div className="mt-14 space-y-16">
            {offerings.map((offering, index) => (
              <motion.article
                key={offering.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="group border-l-2 border-white/15 pl-6 transition-colors duration-300 hover:border-red-400/70 sm:pl-10"
              >
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
                  <span style={{ color: ACCENT }}>№{String(index + 1).padStart(3, '0')}</span> — Akte
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">{offering.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-gray-300">{offering.description}</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-400">{offering.details}</p>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-500">Leistungen</p>
                    <ul className="mt-3 space-y-2">
                      {offering.features.map((feature) => (
                        <li key={feature} className="flex items-baseline gap-3 text-sm text-gray-200">
                          <span className="font-mono text-xs" style={{ color: ACCENT }}>+</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-500">Ihre Vorteile</p>
                    <ul className="mt-3 space-y-2">
                      {offering.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-baseline gap-3 text-sm text-gray-200">
                          <span className="font-mono text-xs text-gray-500">▸</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Statement */}
        <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <ScrollStatement text="Sicherheit ist kein Zustand, sondern ein Prozess. Jede Architektur wird geprüft, jede Identität verifiziert, jede Bedrohung modelliert — bevor sie zum Vorfall wird." />
        </section>

        {/* Radar-Block — Prinzipien */}
        <section className="relative overflow-hidden border-y border-white/10 py-28 md:py-36">
          <VentureCanvas effect="radar" accent={ACCENT} className="absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl px-6">
            <SectionLabel num="02" accent={ACCENT}>
              Prinzipien der Verteidigung
            </SectionLabel>
            <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
              {PRINCIPLES.map((principle, index) => (
                <motion.div
                  key={principle.value}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
                  className="border-t border-white/15 pt-5"
                >
                  <p className="text-2xl font-bold text-white md:text-3xl">{principle.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{principle.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Studien — Dossier */}
        <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <SectionLabel num="03" accent={ACCENT}>
            Aktuelle Studien &amp; Insights
          </SectionLabel>
          <p className="mt-6 max-w-2xl text-gray-400">
            Wissenschaftlich fundierte Erkenntnisse zur aktuellen Cyber Security Landschaft.
          </p>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {studies.map((study, index) => (
              <motion.article
                key={study.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
                className="group flex items-start gap-5 py-6 transition-colors duration-300 hover:bg-white/[0.03] sm:items-center"
              >
                <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-md border border-white/10 sm:block">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="96px"
                    className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
                    <span style={{ color: ACCENT }}>{study.date}</span> — {study.topic}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">{study.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{study.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Bereit für <span style={{ color: ACCENT }}>maximale Sicherheit?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
              Lassen Sie uns gemeinsam Ihre Cyber Security Strategie entwickeln und erfolgreich umsetzen.
            </p>
            <div className="mt-10 flex justify-center">
              <ShineButton href="/de#contact" accent={ACCENT}>
                Sicherheitsberatung anfragen
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
