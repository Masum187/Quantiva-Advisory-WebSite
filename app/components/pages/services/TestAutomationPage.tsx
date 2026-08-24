'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bug, Zap, Target, CheckCircle, ArrowRight, Code, BarChart, Shield } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';

interface TestAutomationPageProps {
  lang: 'de' | 'en';
}

export default function TestAutomationPage({ lang }: TestAutomationPageProps) {
  const content = {
    de: {
      hero: {
        badge: 'Test Automation',
        title: 'Intelligente Testautomatisierung für fehlerfreie Software',
        subtitle: 'KI-gestützte QA-Prozesse für schnellere Releases und höhere Qualität',
      },
      intro: {
        title: 'Automatisierte Qualitätssicherung auf Enterprise-Niveau',
        description: 'Wir implementieren End-to-End-Testautomatisierung mit modernsten Tools und KI-Unterstützung. Von Unit-Tests über API-Testing bis hin zu UI-Automation – wir sorgen für fehlerfreie Software-Releases bei maximaler Geschwindigkeit.',
      },
      services: {
        title: 'Unsere Leistungen',
        items: [
          {
            icon: Code,
            title: 'Test-Framework-Design',
            description: 'Aufbau skalierbarer Test-Frameworks mit Selenium, Cypress, Playwright oder Appium für Web, Mobile und Desktop.',
          },
          {
            icon: Zap,
            title: 'CI/CD-Integration',
            description: 'Nahtlose Integration in Jenkins, GitLab CI, Azure DevOps oder GitHub Actions für kontinuierliches Testing.',
          },
          {
            icon: Target,
            title: 'Performance Testing',
            description: 'Load-, Stress- und Endurance-Tests mit JMeter, Gatling oder K6 für optimale System-Performance.',
          },
          {
            icon: Shield,
            title: 'Security Testing',
            description: 'Automatisierte Sicherheitstests mit OWASP ZAP, Burp Suite und statischer Code-Analyse (SAST/DAST).',
          },
        ],
      },
      benefits: {
        title: 'Ihre Vorteile',
        items: [
          '70% schnellere Release-Zyklen durch parallele Test-Execution',
          '90% Testabdeckung für kritische Geschäftsprozesse',
          'Frühzeitige Fehlererkennung: Bugs werden in Dev-Phase gefunden',
          'Reduzierte QA-Kosten: Bis zu 60% Einsparung durch Automation',
          'Kontinuierliche Qualität: Automatische Regression-Tests bei jedem Commit',
        ],
      },
      technologies: {
        title: 'Tools & Frameworks',
        items: ['Selenium', 'Cypress', 'Playwright', 'Appium', 'JMeter', 'Gatling', 'Postman', 'K6', 'TestNG', 'JUnit', 'PyTest', 'Robot Framework'],
      },
      cta: {
        title: 'Bereit für fehlerfreie Software?',
        description: 'Lassen Sie uns Ihre Test-Strategie optimieren.',
        button: 'Jetzt QA-Assessment anfragen',
      },
    },
    en: {
      hero: {
        badge: 'Test Automation',
        title: 'Intelligent Test Automation for Error-Free Software',
        subtitle: 'AI-powered QA processes for faster releases and higher quality',
      },
      intro: {
        title: 'Automated Quality Assurance at Enterprise Level',
        description: 'We implement end-to-end test automation with cutting-edge tools and AI support. From unit tests to API testing and UI automation – we ensure error-free software releases at maximum speed.',
      },
      services: {
        title: 'Our Services',
        items: [
          {
            icon: Code,
            title: 'Test Framework Design',
            description: 'Building scalable test frameworks with Selenium, Cypress, Playwright or Appium for web, mobile and desktop.',
          },
          {
            icon: Zap,
            title: 'CI/CD Integration',
            description: 'Seamless integration into Jenkins, GitLab CI, Azure DevOps or GitHub Actions for continuous testing.',
          },
          {
            icon: Target,
            title: 'Performance Testing',
            description: 'Load, stress and endurance tests with JMeter, Gatling or K6 for optimal system performance.',
          },
          {
            icon: Shield,
            title: 'Security Testing',
            description: 'Automated security testing with OWASP ZAP, Burp Suite and static code analysis (SAST/DAST).',
          },
        ],
      },
      benefits: {
        title: 'Your Benefits',
        items: [
          '70% faster release cycles through parallel test execution',
          '90% test coverage for critical business processes',
          'Early bug detection: Issues found in dev phase',
          'Reduced QA costs: Up to 60% savings through automation',
          'Continuous quality: Automatic regression tests with every commit',
        ],
      },
      technologies: {
        title: 'Tools & Frameworks',
        items: ['Selenium', 'Cypress', 'Playwright', 'Appium', 'JMeter', 'Gatling', 'Postman', 'K6', 'TestNG', 'JUnit', 'PyTest', 'Robot Framework'],
      },
      cta: {
        title: 'Ready for error-free software?',
        description: 'Let us optimize your test strategy.',
        button: 'Request QA assessment now',
      },
    },
  }[lang];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-green-900/40 via-black to-black py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.15),_transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-green-500/40 bg-green-500/10 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-green-200">
              <Bug className="h-4 w-4" />
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
                  className="group rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-black/80 p-8 transition-all hover:border-green-500/50"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-green-500/20 p-4">
                    <Icon className="h-8 w-8 text-green-400" />
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
      <section className="py-20 bg-gradient-to-b from-black to-green-950/20">
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
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-400" />
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
                  className="rounded-full border border-green-500/30 bg-green-500/10 px-6 py-3 text-sm font-semibold text-green-200"
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
          <AnimatedCard direction="up" className="rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-900/40 to-black p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">{content.cta.title}</h2>
            <p className="mb-8 text-xl text-gray-300">{content.cta.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-green-500/50 transition-all hover:shadow-xl hover:shadow-green-500/70"
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

