'use client';

import { AlertTriangle, KeyRound, Lock, Shield } from 'lucide-react';
import { useLanguage } from '../../QuantivaWebsite';
import { ValmaxServicePage } from './ValmaxServicePage';

export default function CyberSecurityPage() {
  const { lang } = useLanguage();
  const subtitle =
    lang === 'de'
      ? 'Ganzheitliche Sicherheitsstrategien und operative Exzellenz für kritische IT-Landschaften.'
      : 'Holistic security strategies and operational excellence for critical IT landscapes.';
  const featureHint = lang === 'de' ? 'Sicherheitsvorteile anzeigen.' : 'Reveal the security benefits.';

  const content = {
    hero: {
      badge: 'Cyber Security',
      title: 'Cyber Security',
      subtitle,
      icon: Shield,
    },
    services: {
      title: lang === 'de' ? 'Unsere Leistungen' : 'Our Services',
      items: [
        { icon: Lock, title: lang === 'de' ? 'Zero Trust Frameworks' : 'Zero Trust Frameworks', description: featureHint },
        { icon: AlertTriangle, title: lang === 'de' ? 'Threat Detection & Response' : 'Threat Detection & Response', description: featureHint },
        { icon: KeyRound, title: lang === 'de' ? 'Identity & Access Management' : 'Identity & Access Management', description: featureHint },
      ],
    },
    outcomes: {
      title: lang === 'de' ? 'Schutz für Ihr Unternehmen' : 'Protection for your business',
      description:
        lang === 'de'
          ? 'Wir etablieren Security-by-Design und sorgen für Resilienz gegen moderne Bedrohungen.'
          : 'We establish security-by-design principles and ensure resilience against modern threats.',
      items: [
        lang === 'de' ? '24/7 Monitoring & Incident Response' : '24/7 monitoring & incident response',
        lang === 'de' ? 'Compliance & Audit Readiness' : 'Compliance & audit readiness',
        lang === 'de' ? 'Security Awareness & Training' : 'Security awareness & training',
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
