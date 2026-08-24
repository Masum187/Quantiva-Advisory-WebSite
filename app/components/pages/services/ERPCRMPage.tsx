'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Users, TrendingUp, Zap, CheckCircle, ArrowRight, Settings, BarChart } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';

interface ERPCRMPageProps {
  lang: 'de' | 'en';
}

export default function ERPCRMPage({ lang }: ERPCRMPageProps) {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-purple-900/40 via-black to-black py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.15),_transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-purple-500/40 bg-purple-500/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-purple-200">
              <Database className="h-4 w-4" />
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
                  className="group rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-black/80 p-8 transition-all hover:border-purple-500/50"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-purple-500/20 p-4">
                    <Icon className="h-8 w-8 text-purple-400" />
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
      <section className="py-20 bg-gradient-to-b from-black to-purple-950/20">
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
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-purple-400" />
                  <p className="text-gray-200">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedCard direction="up">
            <h2 className="mb-12 text-center text-4xl font-bold">{content.technologies.title}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {content.technologies.items.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-200"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatedCard direction="up" className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-black p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">{content.cta.title}</h2>
            <p className="mb-8 text-xl text-gray-300">{content.cta.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/70"
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

