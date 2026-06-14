'use client';

import { Cloud, Server, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../../QuantivaWebsite';
import { ValmaxServicePage } from './ValmaxServicePage';

export default function CloudPage() {
  const { lang } = useLanguage();
  const subtitle =
    lang === 'de'
      ? 'Skalierbare Cloud-Architekturen und DevOps-Enablement für moderne IT-Infrastrukturen.'
      : 'Scalable cloud architectures and DevOps enablement for modern IT infrastructures.';
  const featureHint = lang === 'de' ? 'Details anzeigen.' : 'Reveal details.';

  const content = {
    hero: {
      badge: lang === 'de' ? 'Cloud-Lösungen' : 'Cloud Solutions',
      title: lang === 'de' ? 'Cloud-Lösungen' : 'Cloud Solutions',
      subtitle,
      icon: Cloud,
    },
    services: {
      title: lang === 'de' ? 'Unsere Leistungen' : 'Our Services',
      items: [
        { icon: Cloud, title: lang === 'de' ? 'Cloud Migration' : 'Cloud Migration', description: featureHint },
        { icon: Server, title: lang === 'de' ? 'Infrastructure as Code' : 'Infrastructure as Code', description: featureHint },
        { icon: Zap, title: lang === 'de' ? 'DevOps & CI/CD' : 'DevOps & CI/CD', description: featureHint },
        { icon: Shield, title: lang === 'de' ? 'Cloud Security' : 'Cloud Security', description: featureHint },
      ],
    },
    outcomes: {
      title: lang === 'de' ? 'Cloud Plattformen' : 'Cloud Platforms',
      description:
        lang === 'de'
          ? 'Wir unterstützen Sie bei der Auswahl und Implementierung der richtigen Cloud-Plattform für Ihre Anforderungen.'
          : 'We support you in selecting and implementing the right cloud platform for your requirements.',
      items: [
        lang === 'de' ? 'AWS, Azure, Google Cloud' : 'AWS, Azure, Google Cloud',
        lang === 'de' ? 'Multi-Cloud & Hybrid-Cloud' : 'Multi-cloud & hybrid cloud',
        lang === 'de' ? 'Kostenoptimierung' : 'Cost optimization',
      ],
    },
    cta: {
      title: lang === 'de' ? 'Jetzt Beratung anfragen' : 'Request consultation now',
      description: subtitle,
      button: lang === 'de' ? 'Jetzt Beratung anfragen' : 'Request consultation now',
    },
  };

  return <ValmaxServicePage content={content} lang={lang} />;
}
