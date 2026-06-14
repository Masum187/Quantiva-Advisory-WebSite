'use client';

import { Brain, Cpu, Sparkles, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../QuantivaWebsite';
import { ValmaxServicePage } from './ValmaxServicePage';

export default function AIPage() {
  const { lang } = useLanguage();
  const subtitle =
    lang === 'de'
      ? 'KI-gestützte Lösungen zur Automatisierung und Wertschöpfung für Ihr Unternehmen.'
      : 'AI-powered solutions for automation and value creation for your business.';
  const featureHint = lang === 'de' ? 'Jetzt Details entdecken.' : 'Discover details now.';

  const content = {
    hero: {
      badge: lang === 'de' ? 'Künstliche Intelligenz' : 'Artificial Intelligence',
      title: lang === 'de' ? 'Künstliche Intelligenz (AI)' : 'Artificial Intelligence (AI)',
      subtitle,
      icon: Brain,
    },
    services: {
      title: lang === 'de' ? 'Unsere Leistungen' : 'Our Services',
      items: [
        { icon: Sparkles, title: lang === 'de' ? 'Machine Learning Modelle' : 'Machine Learning Models', description: featureHint },
        { icon: TrendingUp, title: lang === 'de' ? 'Predictive Analytics' : 'Predictive Analytics', description: featureHint },
        { icon: Cpu, title: lang === 'de' ? 'Natural Language Processing' : 'Natural Language Processing', description: featureHint },
        { icon: Brain, title: lang === 'de' ? 'Computer Vision' : 'Computer Vision', description: featureHint },
      ],
    },
    outcomes: {
      title: lang === 'de' ? 'Einsatzbereiche' : 'Use Cases',
      description:
        lang === 'de'
          ? 'Künstliche Intelligenz transformiert Geschäftsprozesse und schafft neue Möglichkeiten für Innovation und Effizienz.'
          : 'Artificial intelligence transforms business processes and creates new opportunities for innovation and efficiency.',
      items: [
        lang === 'de' ? 'Intelligente Automatisierung' : 'Intelligent automation',
        lang === 'de' ? 'Datengetriebene Entscheidungen' : 'Data-driven decisions',
        lang === 'de' ? 'Personalisierte Kundenerlebnisse' : 'Personalized customer experiences',
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
