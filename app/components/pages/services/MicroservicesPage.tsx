'use client';

import { Cpu, Network, Share2, Workflow } from 'lucide-react';
import { useLanguage } from '../../QuantivaWebsite';
import { ValmaxServicePage } from './ValmaxServicePage';

export default function MicroservicesPage() {
  const { lang } = useLanguage();
  const subtitle =
    lang === 'de'
      ? 'Wir bauen entkoppelte Plattformen, die Geschwindigkeit, Skalierbarkeit und Wartbarkeit vereinen.'
      : 'We build decoupled platforms that combine speed, scalability and maintainability.';
  const featureHint = lang === 'de' ? 'Architekturdetails anzeigen.' : 'Reveal architecture details.';

  const content = {
    hero: {
      badge: 'Microservices & Integration',
      title: 'Microservices & Integration',
      subtitle,
      icon: Network,
    },
    services: {
      title: lang === 'de' ? 'Unsere Leistungen' : 'Our Services',
      items: [
        { icon: Cpu, title: lang === 'de' ? 'Microservice-Architekturen' : 'Microservice architectures', description: featureHint },
        { icon: Share2, title: lang === 'de' ? 'API- & Event-Landschaften' : 'API & event landscapes', description: featureHint },
        { icon: Workflow, title: lang === 'de' ? 'Automatisierung & DevOps' : 'Automation & DevOps', description: featureHint },
      ],
    },
    outcomes: {
      title: 'Business Impact',
      description:
        lang === 'de'
          ? 'Wir unterstützen Sie vom Architekturdesign bis zum operativen Betrieb, damit Ihre Plattformen wachsen können.'
          : 'We support you from architecture design to operational excellence so your platforms can grow.',
      items: [
        lang === 'de' ? 'Schnellere Release-Zyklen' : 'Faster release cycles',
        lang === 'de' ? 'Erhöhte Systemstabilität' : 'Increased system stability',
        lang === 'de' ? 'Nahtlose Integration bestehender Systeme' : 'Seamless integration of existing systems',
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
