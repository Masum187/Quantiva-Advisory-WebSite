'use client';

import { Bug, Code, Shield, Target, Zap } from 'lucide-react';
import { ValmaxServicePage } from './ValmaxServicePage';

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
        icon: Bug,
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
      outcomes: {
        title: 'Ihre Vorteile',
        items: [
          '70% schnellere Release-Zyklen durch parallele Test-Execution',
          '90% Testabdeckung für kritische Geschäftsprozesse',
          'Frühzeitige Fehlererkennung: Bugs werden in Dev-Phase gefunden',
          'Reduzierte QA-Kosten: Bis zu 60% Einsparung durch Automation',
          'Kontinuierliche Qualität: Automatische Regression-Tests bei jedem Commit',
        ],
      },
      tags: {
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
        icon: Bug,
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
      outcomes: {
        title: 'Your Benefits',
        items: [
          '70% faster release cycles through parallel test execution',
          '90% test coverage for critical business processes',
          'Early bug detection: Issues found in dev phase',
          'Reduced QA costs: Up to 60% savings through automation',
          'Continuous quality: Automatic regression tests with every commit',
        ],
      },
      tags: {
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

  return <ValmaxServicePage content={content} lang={lang} />;
}
