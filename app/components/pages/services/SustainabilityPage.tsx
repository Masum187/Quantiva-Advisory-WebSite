'use client';

import { BarChart, Leaf, Recycle, Sun, TrendingDown } from 'lucide-react';
import { ValmaxServicePage } from './ValmaxServicePage';

interface SustainabilityPageProps {
  lang: 'de' | 'en';
}

export default function SustainabilityPage({ lang }: SustainabilityPageProps) {
  const content = {
    de: {
      hero: {
        badge: 'Sustainability Consulting',
        title: 'Nachhaltige Transformation für zukunftsfähige Unternehmen',
        subtitle: 'ESG-Strategie, CO₂-Reduktion und digitale Nachhaltigkeitsreporting',
        icon: Leaf,
      },
      intro: {
        title: 'Nachhaltigkeit als Wettbewerbsvorteil',
        description: 'Wir unterstützen Sie bei der Entwicklung und Umsetzung Ihrer Nachhaltigkeitsstrategie. Von ESG-Reporting über CO₂-Bilanzierung bis hin zu nachhaltigen Lieferketten – wir machen Ihr Unternehmen fit für die Anforderungen von morgen.',
      },
      services: {
        title: 'Unsere Leistungen',
        items: [
          {
            icon: BarChart,
            title: 'ESG-Strategie & Reporting',
            description: 'Entwicklung ESG-konformer Strategien und automatisiertes Reporting nach CSRD, GRI und TCFD-Standards.',
          },
          {
            icon: TrendingDown,
            title: 'CO₂-Bilanzierung',
            description: 'Corporate Carbon Footprint (CCF) und Product Carbon Footprint (PCF) mit Scope 1-3 Erfassung.',
          },
          {
            icon: Recycle,
            title: 'Circular Economy',
            description: 'Implementierung zirkulärer Geschäftsmodelle und Kreislaufwirtschafts-Strategien.',
          },
          {
            icon: Sun,
            title: 'Energiemanagement',
            description: 'ISO 50001-konforme Energiemanagementsysteme und Optimierung des Energieverbrauchs.',
          },
        ],
      },
      outcomes: {
        title: 'Ihre Vorteile',
        items: [
          'Regulatorische Compliance: CSRD, EU-Taxonomie, Lieferkettengesetz',
          'Kosteneinsparung: Bis zu 30% durch Energieeffizienz',
          'Investoren-Attraktivität: ESG-Rating-Verbesserung',
          'Risikominimierung: Klimarisiken frühzeitig identifizieren',
          'Markenimage: Nachweisbare Nachhaltigkeitsperformance',
        ],
      },
      tags: {
        title: 'Standards & Frameworks',
        items: ['CSRD', 'GRI', 'TCFD', 'SBTi', 'ISO 14001', 'ISO 50001', 'EU-Taxonomie', 'CDP'],
      },
      cta: {
        title: 'Bereit für nachhaltige Transformation?',
        description: 'Starten Sie Ihre ESG-Journey mit uns.',
        button: 'Jetzt ESG-Assessment anfragen',
      },
    },
    en: {
      hero: {
        badge: 'Sustainability Consulting',
        title: 'Sustainable Transformation for Future-Ready Companies',
        subtitle: 'ESG strategy, CO₂ reduction and digital sustainability reporting',
        icon: Leaf,
      },
      intro: {
        title: 'Sustainability as Competitive Advantage',
        description: 'We support you in developing and implementing your sustainability strategy. From ESG reporting to carbon accounting and sustainable supply chains – we prepare your company for tomorrow\'s requirements.',
      },
      services: {
        title: 'Our Services',
        items: [
          {
            icon: BarChart,
            title: 'ESG Strategy & Reporting',
            description: 'Development of ESG-compliant strategies and automated reporting according to CSRD, GRI and TCFD standards.',
          },
          {
            icon: TrendingDown,
            title: 'Carbon Accounting',
            description: 'Corporate Carbon Footprint (CCF) and Product Carbon Footprint (PCF) with Scope 1-3 measurement.',
          },
          {
            icon: Recycle,
            title: 'Circular Economy',
            description: 'Implementation of circular business models and circular economy strategies.',
          },
          {
            icon: Sun,
            title: 'Energy Management',
            description: 'ISO 50001-compliant energy management systems and energy consumption optimization.',
          },
        ],
      },
      outcomes: {
        title: 'Your Benefits',
        items: [
          'Regulatory compliance: CSRD, EU Taxonomy, Supply Chain Act',
          'Cost savings: Up to 30% through energy efficiency',
          'Investor attractiveness: ESG rating improvement',
          'Risk minimization: Early identification of climate risks',
          'Brand image: Verifiable sustainability performance',
        ],
      },
      tags: {
        title: 'Standards & Frameworks',
        items: ['CSRD', 'GRI', 'TCFD', 'SBTi', 'ISO 14001', 'ISO 50001', 'EU Taxonomy', 'CDP'],
      },
      cta: {
        title: 'Ready for sustainable transformation?',
        description: 'Start your ESG journey with us.',
        button: 'Request ESG assessment now',
      },
    },
  }[lang];

  return <ValmaxServicePage content={content} lang={lang} />;
}
