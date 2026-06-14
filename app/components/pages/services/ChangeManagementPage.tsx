'use client';

import { BookOpen, Lightbulb, Target, Users } from 'lucide-react';
import { ValmaxServicePage } from './ValmaxServicePage';

interface ChangeManagementPageProps {
  lang: 'de' | 'en';
}

export default function ChangeManagementPage({ lang }: ChangeManagementPageProps) {
  const content = {
    de: {
      hero: {
        badge: 'Change & Training',
        title: 'Change Management & Training für erfolgreiche Transformationen',
        subtitle: 'Menschen befähigen, Veränderungen gestalten, Akzeptanz schaffen',
        icon: Users,
      },
      intro: {
        title: 'Transformation beginnt bei den Menschen',
        description: 'Technologie allein reicht nicht. Wir begleiten Ihre Mitarbeitenden durch Veränderungsprozesse und befähigen sie, neue Systeme und Prozesse erfolgreich zu nutzen. Mit maßgeschneiderten Trainings, Change-Kommunikation und Adoption-Strategien.',
      },
      services: {
        title: 'Unsere Leistungen',
        items: [
          {
            icon: Target,
            title: 'Change-Strategie',
            description: 'Entwicklung ganzheitlicher Change-Strategien mit Stakeholder-Analyse, Impact-Assessment und Kommunikationsplan.',
          },
          {
            icon: Users,
            title: 'Change-Begleitung',
            description: 'Aktive Begleitung durch Transformationsprozesse mit Change Agents, Workshops und Feedback-Schleifen.',
          },
          {
            icon: BookOpen,
            title: 'Training & Enablement',
            description: 'Maßgeschneiderte Schulungsprogramme, E-Learning-Plattformen und Train-the-Trainer-Konzepte.',
          },
          {
            icon: Lightbulb,
            title: 'Adoption & Coaching',
            description: 'User Adoption Tracking, Power-User-Programme und individuelles Coaching für Führungskräfte.',
          },
        ],
      },
      outcomes: {
        title: 'Ihre Vorteile',
        items: [
          'Höhere Akzeptanz: 85%+ User Adoption bei neuen Systemen',
          'Schnellerer ROI: Produktivität steigt 40% schneller',
          'Geringere Widerstände: Proaktive Einbindung aller Stakeholder',
          'Nachhaltiger Erfolg: Veränderungen werden dauerhaft gelebt',
          'Kompetenzaufbau: Mitarbeitende werden zu Change Champions',
        ],
      },
      tags: {
        title: 'Methoden & Ansätze',
        items: ['ADKAR', 'Kotter 8-Stufen', 'Prosci', 'Agile Change', 'Design Thinking', 'Appreciative Inquiry', 'Lean Change', 'OKR'],
      },
      cta: {
        title: 'Bereit für erfolgreiche Transformation?',
        description: 'Lassen Sie uns Ihre Change-Journey gemeinsam gestalten.',
        button: 'Jetzt Change-Beratung anfragen',
      },
    },
    en: {
      hero: {
        badge: 'Change & Training',
        title: 'Change Management & Training for Successful Transformations',
        subtitle: 'Empower people, shape change, create acceptance',
        icon: Users,
      },
      intro: {
        title: 'Transformation Starts with People',
        description: 'Technology alone is not enough. We guide your employees through change processes and enable them to successfully use new systems and processes. With tailored training, change communication and adoption strategies.',
      },
      services: {
        title: 'Our Services',
        items: [
          {
            icon: Target,
            title: 'Change Strategy',
            description: 'Development of holistic change strategies with stakeholder analysis, impact assessment and communication plan.',
          },
          {
            icon: Users,
            title: 'Change Support',
            description: 'Active support through transformation processes with change agents, workshops and feedback loops.',
          },
          {
            icon: BookOpen,
            title: 'Training & Enablement',
            description: 'Tailored training programs, e-learning platforms and train-the-trainer concepts.',
          },
          {
            icon: Lightbulb,
            title: 'Adoption & Coaching',
            description: 'User adoption tracking, power user programs and individual coaching for executives.',
          },
        ],
      },
      outcomes: {
        title: 'Your Benefits',
        items: [
          'Higher acceptance: 85%+ user adoption for new systems',
          'Faster ROI: Productivity increases 40% faster',
          'Lower resistance: Proactive involvement of all stakeholders',
          'Sustainable success: Changes are lived permanently',
          'Competence building: Employees become change champions',
        ],
      },
      tags: {
        title: 'Methods & Approaches',
        items: ['ADKAR', 'Kotter 8-Step', 'Prosci', 'Agile Change', 'Design Thinking', 'Appreciative Inquiry', 'Lean Change', 'OKR'],
      },
      cta: {
        title: 'Ready for successful transformation?',
        description: 'Let us shape your change journey together.',
        button: 'Request change consulting now',
      },
    },
  }[lang];

  return <ValmaxServicePage content={content} lang={lang} />;
}
