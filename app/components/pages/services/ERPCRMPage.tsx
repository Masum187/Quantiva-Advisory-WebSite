'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Database, Users, TrendingUp, Settings, CheckCircle, ArrowUpRight } from 'lucide-react';
import ServiceVideoBackground from '../../ServiceVideoBackground';
import {
  EASE,
  ScrollProgress,
  LetterHeadline,
  MaskedHeadline,
  ScrollStatement,
  SpotlightCard,
  GhostNumber,
  ShineButton,
  SectionLabel,
} from '../projects/detail/shared';

const ACCENT = '#60a5fa';

const MODULE_KEYWORDS = ['ERP', 'CRM', 'FI', 'CO', 'SD', 'MM', 'HCM', 'BI', 'API', 'EDI'];

interface ERPCRMPageProps {
  lang: 'de' | 'en';
}

export default function ERPCRMPage({ lang }: ERPCRMPageProps) {
  const reduceMotion = useReducedMotion();

  const content = {
    de: {
      hero: {
        badge: 'ERP & CRM Services',
        title: 'Enterprise Resource Planning & Customer Relationship Management',
        subtitle: 'Integrierte Systeme für nahtlose Geschäftsprozesse und Kundenbeziehungen',
      },
      intro: {
        title: 'Moderne ERP- und CRM-Lösungen für den Mittelstand',
        description: 'Wir implementieren und optimieren ERP- und CRM-Systeme, die perfekt auf Ihre Geschäftsprozesse abgestimmt sind. Von SAP S/4HANA über Microsoft Dynamics bis hin zu Salesforce – wir begleiten Sie von der Strategieentwicklung bis zum Go-Live.',
      },
      services: {
        title: 'Unsere Leistungen',
        items: [
          {
            icon: Database,
            title: 'ERP-Implementierung',
            description: 'Vollständige Implementierung von SAP S/4HANA, Microsoft Dynamics 365, oder Oracle NetSuite mit Best-Practice-Prozessen.',
          },
          {
            icon: Users,
            title: 'CRM-Optimierung',
            description: 'Salesforce, Microsoft Dynamics CRM, oder HubSpot-Implementierung für 360°-Kundensicht und Sales Automation.',
          },
          {
            icon: Settings,
            title: 'System-Integration',
            description: 'Nahtlose Integration zwischen ERP, CRM, E-Commerce und weiteren Geschäftssystemen via API und Middleware.',
          },
          {
            icon: TrendingUp,
            title: 'Prozessoptimierung',
            description: 'Business Process Reengineering und Workflow-Automation für maximale Effizienz in Finance, Supply Chain und Vertrieb.',
          },
        ],
      },
      benefits: {
        title: 'Ihre Vorteile',
        items: [
          'End-to-End-Prozesse: Von Angebot bis Rechnung in einem System',
          'Echtzeit-Transparenz: Live-Dashboards für alle Geschäftsbereiche',
          'Skalierbarkeit: Cloud-native Architekturen, die mit Ihnen wachsen',
          'Compliance: DSGVO-konforme Datenhaltung und Audit-Trails',
          'ROI in 12-18 Monaten: Durch Prozessautomatisierung und Fehlerreduktion',
        ],
      },
      technologies: {
        title: 'Technologien & Plattformen',
        items: ['SAP S/4HANA', 'Microsoft Dynamics 365', 'Salesforce', 'Oracle NetSuite', 'Odoo', 'HubSpot', 'Zoho CRM'],
      },
      cta: {
        title: 'Bereit für integrierte Geschäftsprozesse?',
        description: 'Lassen Sie uns gemeinsam Ihre ERP- und CRM-Strategie entwickeln.',
        button: 'Jetzt Beratung anfragen',
      },
    },
    en: {
      hero: {
        badge: 'ERP & CRM Services',
        title: 'Enterprise Resource Planning & Customer Relationship Management',
        subtitle: 'Integrated systems for seamless business processes and customer relationships',
      },
      intro: {
        title: 'Modern ERP and CRM Solutions for Mid-Market',
        description: 'We implement and optimize ERP and CRM systems perfectly aligned with your business processes. From SAP S/4HANA to Microsoft Dynamics and Salesforce – we guide you from strategy to go-live.',
      },
      services: {
        title: 'Our Services',
        items: [
          {
            icon: Database,
            title: 'ERP Implementation',
            description: 'Full implementation of SAP S/4HANA, Microsoft Dynamics 365, or Oracle NetSuite with best-practice processes.',
          },
          {
            icon: Users,
            title: 'CRM Optimization',
            description: 'Salesforce, Microsoft Dynamics CRM, or HubSpot implementation for 360° customer view and sales automation.',
          },
          {
            icon: Settings,
            title: 'System Integration',
            description: 'Seamless integration between ERP, CRM, e-commerce and other business systems via API and middleware.',
          },
          {
            icon: TrendingUp,
            title: 'Process Optimization',
            description: 'Business process reengineering and workflow automation for maximum efficiency in finance, supply chain and sales.',
          },
        ],
      },
      benefits: {
        title: 'Your Benefits',
        items: [
          'End-to-end processes: From quote to invoice in one system',
          'Real-time transparency: Live dashboards for all business areas',
          'Scalability: Cloud-native architectures that grow with you',
          'Compliance: GDPR-compliant data management and audit trails',
          'ROI in 12-18 months: Through process automation and error reduction',
        ],
      },
      technologies: {
        title: 'Technologies & Platforms',
        items: ['SAP S/4HANA', 'Microsoft Dynamics 365', 'Salesforce', 'Oracle NetSuite', 'Odoo', 'HubSpot', 'Zoho CRM'],
      },
      cta: {
        title: 'Ready for integrated business processes?',
        description: 'Let us develop your ERP and CRM strategy together.',
        button: 'Request consultation now',
      },
    },
  }[lang];

  const [titleLineA, titleLineB] = content.hero.title.split(' & ');

  return (
    <div className="relative min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Fixed Background Video (kept) */}
      <ServiceVideoBackground
        videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760435634/kling_20251014_Text_to_Video_Title__The_4174_2_llyqsp.mp4"]}
        overlayClassName="bg-black/60"
      />

      <div className="relative z-10">
        {/* ---------- Hero: Backbone Stack ---------- */}
        <section className="relative flex min-h-[92svh] items-center border-b border-white/10">
          {/* Layer bars — the system stack */}
          <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 space-y-8 px-6 md:px-12">
            {[0.9, 0.72, 0.55, 0.4, 0.28].map((w, i) => (
              <motion.div
                key={i}
                className="h-px origin-left md:h-[2px]"
                style={{ width: `${w * 100}%`, background: `linear-gradient(90deg, ${ACCENT}55, transparent)` }}
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.14, ease: EASE }}
              />
            ))}
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-6 py-28 md:px-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em]"
              style={{ color: ACCENT }}
            >
              <Database className="h-4 w-4" />
              {content.hero.badge}
            </motion.p>
            <h1 className="max-w-4xl text-[clamp(2.2rem,6vw,4.6rem)] font-black uppercase leading-[1.02] tracking-tight">
              <LetterHeadline text={titleLineA} delay={0.3} />
              <br />
              <span style={{ color: ACCENT }}>&amp;</span>{' '}
              <LetterHeadline text={titleLineB} delay={0.9} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
              className="mt-8 max-w-2xl text-lg text-gray-300 md:text-xl"
            >
              {content.hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* ---------- Intro statement ---------- */}
        <section className="mx-auto max-w-5xl px-6 py-28 md:px-12">
          <SectionLabel num="01" accent={ACCENT}>{content.intro.title}</SectionLabel>
          <ScrollStatement
            text={content.intro.description}
            className="mt-8 text-[clamp(1.35rem,2.8vw,2.2rem)] font-light leading-snug"
          />
        </section>

        {/* ---------- Offerings: sticky-stacking deck ---------- */}
        <section className="mx-auto max-w-5xl px-6 pb-32 md:px-12">
          <SectionLabel num="02" accent={ACCENT}>{content.services.title}</SectionLabel>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            <MaskedHeadline text={content.services.title} />
          </h2>
          <div className="mt-14 space-y-10 pb-24">
            {content.services.items.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="sticky" style={{ top: 96 + i * 44 }}>
                  <SpotlightCard
                    accent={ACCENT}
                    className="relative rounded-2xl border border-white/10 bg-[#070c17]/95 p-8 backdrop-blur md:p-12"
                  >
                    <GhostNumber index={i} />
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-10">
                      <span
                        className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border"
                        style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}14`, color: ACCENT }}
                      >
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
                          Layer {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold md:text-3xl">{service.title}</h3>
                        <p className="mt-4 max-w-2xl leading-relaxed text-gray-300">{service.description}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- Integration ribbon ---------- */}
        <section className="border-y border-white/10 py-6" aria-label={content.technologies.title}>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="industry-ticker-track flex w-max items-center gap-10">
              {[0, 1].map((clone) => (
                <div key={clone} className="flex items-center gap-10" aria-hidden={clone === 1}>
                  {[...MODULE_KEYWORDS, ...content.technologies.items].map((item, i) => (
                    <span key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                      <span
                        className="font-mono text-xl font-bold uppercase tracking-widest md:text-2xl"
                        style={i % 2 === 0 ? { color: ACCENT } : { WebkitTextStroke: `1px ${ACCENT}66`, color: 'transparent' }}
                      >
                        {item}
                      </span>
                      <span style={{ color: `${ACCENT}88` }} className="text-xs">·</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Benefits ---------- */}
        <section className="mx-auto max-w-5xl px-6 py-28 md:px-12">
          <SectionLabel num="03" accent={ACCENT}>{content.benefits.title}</SectionLabel>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {content.benefits.items.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                <p className="text-gray-200">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="border-t border-white/10 py-28 text-center md:py-36">
          <div className="mx-auto max-w-3xl px-6">
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
