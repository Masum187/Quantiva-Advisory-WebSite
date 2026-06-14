'use client';

import { Database, Settings, TrendingUp, Users } from 'lucide-react';
import { ValmaxServicePage } from './ValmaxServicePage';

interface ERPCRMPageProps {
  lang: 'de' | 'en';
}

export default function ERPCRMPage({ lang }: ERPCRMPageProps) {
  const content = {
    de: {
      hero: {
        badge: 'ERP & CRM Services',
        title: 'Enterprise Resource Planning & Customer Relationship Management',
        subtitle: 'Integrierte Systeme für nahtlose Geschäftsprozesse und Kundenbeziehungen',
        icon: Database,
      },
      intro: {
        title: 'Moderne ERP- und CRM-Lösungen für den Mittelstand',
        description: 'Wir implementieren und optimieren ERP- und CRM-Systeme, die perfekt auf Ihre Geschäftsprozesse abgestimmt sind. Von SAP S/4HANA über Microsoft Dynamics bis hin zu Salesforce – wir begleiten Sie von der Strategieentwicklung bis zum Go-Live.',
      },
      services: {
        title: 'Unsere Leistungen',
        items: [
          {
            icon: Database,
            title: 'ERP-Implementierung',
            description: 'Vollständige Implementierung von SAP S/4HANA, Microsoft Dynamics 365, oder Oracle NetSuite mit Best-Practice-Prozessen.',
          },
          {
            icon: Users,
            title: 'CRM-Optimierung',
            description: 'Salesforce, Microsoft Dynamics CRM, oder HubSpot-Implementierung für 360°-Kundensicht und Sales Automation.',
          },
          {
            icon: Settings,
            title: 'System-Integration',
            description: 'Nahtlose Integration zwischen ERP, CRM, E-Commerce und weiteren Geschäftssystemen via API und Middleware.',
          },
          {
            icon: TrendingUp,
            title: 'Prozessoptimierung',
            description: 'Business Process Reengineering und Workflow-Automation für maximale Effizienz in Finance, Supply Chain und Vertrieb.',
          },
        ],
      },
      outcomes: {
        title: 'Ihre Vorteile',
        items: [
          'End-to-End-Prozesse: Von Angebot bis Rechnung in einem System',
          'Echtzeit-Transparenz: Live-Dashboards für alle Geschäftsbereiche',
          'Skalierbarkeit: Cloud-native Architekturen, die mit Ihnen wachsen',
          'Compliance: DSGVO-konforme Datenhaltung und Audit-Trails',
          'ROI in 12-18 Monaten: Durch Prozessautomatisierung und Fehlerreduktion',
        ],
      },
      tags: {
        title: 'Technologien & Plattformen',
        items: ['SAP S/4HANA', 'Microsoft Dynamics 365', 'Salesforce', 'Oracle NetSuite', 'Odoo', 'HubSpot', 'Zoho CRM'],
      },
      cta: {
        title: 'Bereit für integrierte Geschäftsprozesse?',
        description: 'Lassen Sie uns gemeinsam Ihre ERP- und CRM-Strategie entwickeln.',
        button: 'Jetzt Beratung anfragen',
      },
    },
    en: {
      hero: {
        badge: 'ERP & CRM Services',
        title: 'Enterprise Resource Planning & Customer Relationship Management',
        subtitle: 'Integrated systems for seamless business processes and customer relationships',
        icon: Database,
      },
      intro: {
        title: 'Modern ERP and CRM Solutions for Mid-Market',
        description: 'We implement and optimize ERP and CRM systems perfectly aligned with your business processes. From SAP S/4HANA to Microsoft Dynamics and Salesforce – we guide you from strategy to go-live.',
      },
      services: {
        title: 'Our Services',
        items: [
          {
            icon: Database,
            title: 'ERP Implementation',
            description: 'Full implementation of SAP S/4HANA, Microsoft Dynamics 365, or Oracle NetSuite with best-practice processes.',
          },
          {
            icon: Users,
            title: 'CRM Optimization',
            description: 'Salesforce, Microsoft Dynamics CRM, or HubSpot implementation for 360° customer view and sales automation.',
          },
          {
            icon: Settings,
            title: 'System Integration',
            description: 'Seamless integration between ERP, CRM, e-commerce and other business systems via API and middleware.',
          },
          {
            icon: TrendingUp,
            title: 'Process Optimization',
            description: 'Business process reengineering and workflow automation for maximum efficiency in finance, supply chain and sales.',
          },
        ],
      },
      outcomes: {
        title: 'Your Benefits',
        items: [
          'End-to-end processes: From quote to invoice in one system',
          'Real-time transparency: Live dashboards for all business areas',
          'Scalability: Cloud-native architectures that grow with you',
          'Compliance: GDPR-compliant data management and audit trails',
          'ROI in 12-18 months: Through process automation and error reduction',
        ],
      },
      tags: {
        title: 'Technologies & Platforms',
        items: ['SAP S/4HANA', 'Microsoft Dynamics 365', 'Salesforce', 'Oracle NetSuite', 'Odoo', 'HubSpot', 'Zoho CRM'],
      },
      cta: {
        title: 'Ready for integrated business processes?',
        description: 'Let us develop your ERP and CRM strategy together.',
        button: 'Request consultation now',
      },
    },
  }[lang];

  return <ValmaxServicePage content={content} lang={lang} />;
}
