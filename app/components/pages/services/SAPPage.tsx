'use client';

import { Database, Layers, Settings, Workflow } from 'lucide-react';
import { useLanguage } from '../../QuantivaWebsite';
import { ValmaxServicePage } from './ValmaxServicePage';

export default function SAPPage() {
  const { lang } = useLanguage();
  const subtitle =
    lang === 'de'
      ? 'End-to-End Beratung und Implementierung von SAP-Lösungen für nachhaltige Geschäftsprozesse.'
      : 'End-to-end consulting and implementation of SAP solutions for sustainable business processes.';
  const featureHint = lang === 'de' ? 'Mehr über diese Leistung erfahren.' : 'Discover more about this service.';

  const content = {
    hero: {
      badge: 'SAP Services',
      title: 'SAP Services',
      subtitle,
      icon: Database,
    },
    services: {
      title: lang === 'de' ? 'Unsere Leistungen' : 'Our Services',
      items: [
        { icon: Layers, title: lang === 'de' ? 'SAP S/4HANA Transformation' : 'SAP S/4HANA Transformation', description: featureHint },
        { icon: Workflow, title: lang === 'de' ? 'Process Automation' : 'Process Automation', description: featureHint },
        { icon: Settings, title: lang === 'de' ? 'Integration & Customizing' : 'Integration & Customizing', description: featureHint },
      ],
    },
    outcomes: {
      title: 'Business Outcomes',
      description:
        lang === 'de'
          ? 'Wir verbinden funktionale Expertise mit technischer Exzellenz, um Ihre SAP-Landschaft zukunftssicher zu machen.'
          : 'We combine functional expertise with technical excellence to future-proof your SAP landscape.',
      items: [
        lang === 'de' ? 'Beschleunigte Prozesse & Transparenz' : 'Accelerated processes & transparency',
        lang === 'de' ? 'Nahtlose Systemintegration' : 'Seamless system integration',
        lang === 'de' ? 'Skalierbare Architekturen' : 'Scalable architectures',
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
