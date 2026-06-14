'use client';

import { BarChart2, Compass, Layers, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../QuantivaWebsite';
import { ValmaxServicePage } from './ValmaxServicePage';

export default function DigitalStrategyPage() {
  const { lang } = useLanguage();
  const subtitle =
    lang === 'de'
      ? 'Wir gestalten datengetriebene Strategien für digitale Geschäftsmodelle und Transformation.'
      : 'We craft data-driven strategies for digital business models and transformation.';
  const featureHint = lang === 'de' ? 'Strategische Insights anzeigen.' : 'Reveal strategic insights.';

  const content = {
    hero: {
      badge: 'Digital Strategy',
      title: 'Digital Strategy',
      subtitle,
      icon: Lightbulb,
    },
    services: {
      title: lang === 'de' ? 'Unsere Leistungen' : 'Our Services',
      items: [
        { icon: BarChart2, title: lang === 'de' ? 'Digitale Wachstumsstrategien' : 'Digital growth strategies', description: featureHint },
        { icon: Layers, title: lang === 'de' ? 'Produkt- & Plattformdesign' : 'Product & platform design', description: featureHint },
        { icon: Compass, title: lang === 'de' ? 'Roadmaps & Operating Models' : 'Roadmaps & operating models', description: featureHint },
      ],
    },
    outcomes: {
      title: lang === 'de' ? 'Ergebnisorientiert' : 'Outcome oriented',
      description:
        lang === 'de'
          ? 'Gemeinsam entwickeln wir belastbare Strategien, die Ihr Geschäft skalierbar und resilient machen.'
          : 'Together we develop resilient strategies that make your business scalable and resilient.',
      items: [
        lang === 'de' ? 'Messbare OKRs & KPI-Strukturen' : 'Measurable OKRs & KPI structures',
        lang === 'de' ? 'Time-to-Value Optimierung' : 'Time-to-value optimisation',
        lang === 'de' ? 'Change Enablement & Buy-in' : 'Change enablement & buy-in',
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
