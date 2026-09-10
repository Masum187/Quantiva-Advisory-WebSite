'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bug, ArrowUpRight, CheckCircle } from 'lucide-react';
import ServiceVideoBackground from '../../ServiceVideoBackground';
import {
  EASE,
  ScrollProgress,
  LetterHeadline,
  MaskedHeadline,
  ScrollStatement,
  ShineButton,
  SectionLabel,
  PulseNode,
} from '../projects/detail/shared';

const ACCENT = '#2dd4bf';

const CONSOLE_LINES = [
  { symbol: '✓', name: 'regression-suite', status: 'PASSED', ok: true },
  { symbol: '✓', name: 'e2e-checkout', status: 'PASSED', ok: true },
  { symbol: '✓', name: 'api-contract-tests', status: 'PASSED', ok: true },
  { symbol: '✓', name: 'visual-diff', status: 'PASSED', ok: true },
  { symbol: '⠿', name: 'performance', status: 'RUNNING', ok: false },
];

const PIPELINE_STEPS = {
  de: ['Plan', 'Automatisieren', 'Ausführen', 'Reporten'],
  en: ['Plan', 'Automate', 'Execute', 'Report'],
};

interface TestAutomationPageProps {
  lang: 'de' | 'en';
}

export default function TestAutomationPage({ lang }: TestAutomationPageProps) {
  const reduceMotion = useReducedMotion();

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
            title: 'Test-Framework-Design',
            description: 'Aufbau skalierbarer Test-Frameworks mit Selenium, Cypress, Playwright oder Appium für Web, Mobile und Desktop.',
          },
          {
            title: 'CI/CD-Integration',
            description: 'Nahtlose Integration in Jenkins, GitLab CI, Azure DevOps oder GitHub Actions für kontinuierliches Testing.',
          },
          {
            title: 'Performance Testing',
            description: 'Load-, Stress- und Endurance-Tests mit JMeter, Gatling oder K6 für optimale System-Performance.',
          },
          {
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
            title: 'Test Framework Design',
            description: 'Building scalable test frameworks with Selenium, Cypress, Playwright or Appium for web, mobile and desktop.',
          },
          {
            title: 'CI/CD Integration',
            description: 'Seamless integration into Jenkins, GitLab CI, Azure DevOps or GitHub Actions for continuous testing.',
          },
          {
            title: 'Performance Testing',
            description: 'Load, stress and endurance tests with JMeter, Gatling or K6 for optimal system performance.',
          },
          {
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

  const pipeline = PIPELINE_STEPS[lang];

  return (
    <div className="relative min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Fixed Background Video (kept), dimmed for console readability */}
      <ServiceVideoBackground
        videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760435643/kling_20251014_Text_to_Video_Title__The_4174_0_b3juos.mp4"]}
        overlayClassName="bg-black/70"
      />

      <div className="relative z-10">
        {/* ---------- Hero: headline + test-run console ---------- */}
        <section className="relative flex min-h-[92svh] items-center border-b border-white/10">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-28 md:px-12 lg:grid-cols-2">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em]"
                style={{ color: ACCENT }}
              >
                <Bug className="h-4 w-4" />
                {content.hero.badge}
              </motion.p>
              <h1 className="text-[clamp(1.4rem,3vw,2.4rem)] font-black uppercase leading-[1.1] tracking-tight">
                <LetterHeadline text={content.hero.title} delay={0.3} />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.4, ease: EASE }}
                className="mt-8 max-w-xl text-lg text-gray-300"
              >
                {content.hero.subtitle}
              </motion.p>
            </div>

            {/* Console card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              className="rounded-xl border border-white/10 bg-[#050a09]/95 shadow-2xl backdrop-blur"
              style={{ boxShadow: `0 40px 120px -40px ${ACCENT}33` }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-3 font-mono text-xs text-gray-500">quantiva-qa — test run</span>
              </div>
              <motion.div
                className="space-y-2.5 px-5 py-6 font-mono text-sm"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.35, delayChildren: 0.9 } } }}
              >
                {CONSOLE_LINES.map((line) => (
                  <motion.p
                    key={line.name}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="truncate text-gray-300">
                      <span className="mr-3" style={{ color: line.ok ? ACCENT : '#facc15' }}>{line.symbol}</span>
                      {line.name}
                    </span>
                    <span className="shrink-0" style={{ color: line.ok ? ACCENT : '#facc15' }}>
                      {line.status}
                    </span>
                  </motion.p>
                ))}
                <motion.p
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="flex items-center pt-2 text-gray-500"
                >
                  <span className="mr-2">$</span>
                  <motion.span
                    aria-hidden="true"
                    className="inline-block h-4 w-2"
                    style={{ background: ACCENT }}
                    animate={reduceMotion ? undefined : { opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  />
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ---------- Statement ---------- */}
        <section className="mx-auto max-w-5xl px-6 py-28 md:px-12">
          <SectionLabel num="01" accent={ACCENT}>{content.intro.title}</SectionLabel>
          <ScrollStatement
            text={content.intro.description}
            className="mt-8 text-[clamp(1.35rem,2.8vw,2.2rem)] font-light leading-snug"
          />
        </section>

        {/* ---------- Offerings: pass/fail checklist rows ---------- */}
        <section className="mx-auto max-w-6xl px-6 pb-28 md:px-12">
          <SectionLabel num="02" accent={ACCENT}>{content.services.title}</SectionLabel>
          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            <MaskedHeadline text={content.services.title} />
          </h2>
          <div className="mt-14 border-t border-white/10">
            {content.services.items.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                className="group grid gap-4 border-b border-white/10 py-8 pl-5 transition-colors hover:bg-white/[0.03] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10"
                style={{ borderLeft: `2px solid ${ACCENT}44` }}
              >
                <span className="font-mono text-sm text-gray-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-bold transition-colors group-hover:text-white md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-3xl leading-relaxed text-gray-400">{service.description}</p>
                </div>
                <span
                  className="inline-flex w-fit items-center rounded border px-3 py-1 font-mono text-xs font-bold tracking-widest"
                  style={{ borderColor: `${ACCENT}55`, background: `${ACCENT}12`, color: ACCENT }}
                >
                  PASS
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------- Pipeline strip ---------- */}
        <section className="border-y border-white/10 py-20">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <motion.span
                aria-hidden="true"
                className="absolute left-5 top-0 hidden h-px w-full origin-left md:block md:top-5"
                style={{ background: `linear-gradient(90deg, ${ACCENT}66, ${ACCENT}11)` }}
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.4, ease: EASE }}
              />
              {pipeline.map((step, i) => (
                <div key={step} className="relative flex items-center gap-4 md:flex-col md:items-start">
                  <PulseNode index={i} accent={ACCENT} />
                  <span className="font-mono text-sm uppercase tracking-[0.25em] text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Benefits + tools ---------- */}
        <section className="mx-auto max-w-6xl px-6 py-28 md:px-12">
          <SectionLabel num="03" accent={ACCENT}>{content.benefits.title}</SectionLabel>
          <ul className="mt-10 max-w-3xl space-y-5">
            {content.benefits.items.map((benefit, i) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, y: 12 }}
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

          <div className="mt-20">
            <SectionLabel num="04" accent={ACCENT}>{content.technologies.title}</SectionLabel>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.technologies.items.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                  className="rounded border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-gray-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
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
