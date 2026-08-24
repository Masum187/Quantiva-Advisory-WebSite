import type { Metadata } from 'next';

export type V3Locale = 'de' | 'en';

export type V3NavItem = {
  href: string;
  label: string;
};

export const V3_NAV: Record<V3Locale, readonly V3NavItem[]> = {
  de: [
    { href: '', label: 'Start' },
    { href: '/services', label: 'Leistungen' },
    { href: '/cases', label: 'Projekte' },
    { href: '/about', label: 'Über uns' },
    { href: '/contact', label: 'Kontakt' },
  ],
  en: [
    { href: '', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/cases', label: 'Cases' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
};

export const V3_MORE_NAV: Record<V3Locale, readonly V3NavItem[]> = {
  de: [
    { href: '/industries', label: 'Branchen' },
    { href: '/team', label: 'Team' },
    { href: '/career', label: 'Karriere' },
  ],
  en: [
    { href: '/industries', label: 'Industries' },
    { href: '/team', label: 'Team' },
    { href: '/career', label: 'Career' },
  ],
};

export const V3_PAGES = {
  de: {
    about: {
      eyebrow: 'Quantiva Advisory · Haltung',
      title: 'Klarheit ist eine Delivery-Disziplin.',
      intro: 'Wir verbinden strategische Perspektive mit operativer Verantwortung – dort, wo Transformation entschieden, getestet und produktiv gesetzt wird.',
    },
    services: {
      eyebrow: 'Leistungen · 01—10',
      title: 'Systeme verändern. Kontrolle behalten.',
      intro: 'Modulare Beratung für komplexe Transformationen: von SAP und Cloud bis Testautomatisierung, Security und Enablement.',
    },
    industries: {
      eyebrow: 'Branchen · Kontext vor Vorlage',
      title: 'Transformation folgt dem Betrieb.',
      intro: 'Wir übersetzen regulatorische, operative und technologische Bedingungen in ein Delivery-System, das zum jeweiligen Umfeld passt.',
    },
    cases: {
      eyebrow: 'Mandate · anonymisierte Archetypen',
      title: 'Die Arbeit zeigt sich im System.',
      intro: 'Keine erfundenen Logos, Namen oder Erfolgszahlen. Stattdessen: wiederkehrende Transformationslagen und die Steuerungsarbeit, die sie belastbar macht.',
    },
    team: {
      eyebrow: 'Team · Verantwortung sichtbar',
      title: 'Kleine Teams. Klare Ownership.',
      intro: 'Quantiva verbindet Beratung, Technologie und Delivery-Steuerung in einem direkten, senioren Arbeitsmodell.',
    },
    career: {
      eyebrow: 'Karriere · Quantiva Advisory',
      title: 'Arbeite dort, wo Entscheidungen Wirkung haben.',
      intro: 'Wir suchen Menschen, die komplexe Programme strukturieren, Verantwortung übernehmen und Wissen im Team verankern.',
    },
    contact: {
      eyebrow: 'Kontakt · Der nächste Schritt',
      title: 'Was muss als Nächstes klar werden?',
      intro: 'Beschreiben Sie uns die Transformation, den Engpass oder die Entscheidung. Wir antworten mit einem konkreten nächsten Schritt.',
    },
  },
  en: {
    about: {
      eyebrow: 'Quantiva Advisory · Point of view',
      title: 'Clarity is a delivery discipline.',
      intro: 'We connect strategic perspective with operational ownership where transformation is decided, tested, and moved into production.',
    },
    services: {
      eyebrow: 'Services · 01—10',
      title: 'Change systems. Keep control.',
      intro: 'Modular advisory for complex transformations: from SAP and cloud to test automation, security, and enablement.',
    },
    industries: {
      eyebrow: 'Industries · Context before templates',
      title: 'Transformation follows operations.',
      intro: 'We translate regulatory, operational, and technology conditions into a delivery system fitted to each environment.',
    },
    cases: {
      eyebrow: 'Engagements · anonymised archetypes',
      title: 'The work becomes visible in the system.',
      intro: 'No invented logos, names, or success metrics. Instead: recurring transformation situations and the control work that makes them resilient.',
    },
    team: {
      eyebrow: 'Team · Visible ownership',
      title: 'Small teams. Clear ownership.',
      intro: 'Quantiva connects advisory, technology, and delivery control through a direct, senior working model.',
    },
    career: {
      eyebrow: 'Career · Quantiva Advisory',
      title: 'Work where decisions have impact.',
      intro: 'We look for people who structure complex programmes, take ownership, and embed knowledge across teams.',
    },
    contact: {
      eyebrow: 'Contact · The next step',
      title: 'What needs to become clear next?',
      intro: 'Tell us about the transformation, constraint, or decision. We will respond with a concrete next step.',
    },
  },
} as const;

export const V3_HOME = {
  de: {
    eyebrow: 'Quantiva Advisory · Transformation mit Kontrolle',
    headlineLead: 'Komplexität',
    headlineSignal: 'in Klarheit',
    headlineEnd: 'verwandeln.',
    summary:
      'Wir verbinden SAP-Transformation, Testmanagement und Cutover-Steuerung zu einem belastbaren Delivery-Modell.',
    cta: 'Gespräch vereinbaren',
    secondaryCta: 'Leistungen entdecken',
    scroll: 'Scroll, um zu entdecken',
    imageLabel: 'Datenlandschaft · Transformation · Kontrolle',
    marquee:
      'S/4HANA · TESTMANAGEMENT · CUTOVER · CLOUD · KI · SECURITY ·',
    projects: {
      eyebrow: 'Ausgewählte Mandate · anonymisiert',
      title: 'Transformation, die in der Ausführung besteht.',
      previewLabel: 'Steuerungslandschaft',
      items: [
        { title: 'S/4HANA Quality Gate', year: '2025', stage: 'Delivery', meta: 'Governance · Readiness · Risiko' },
        { title: 'SIT/UAT Command Center', year: '2025', stage: 'Control', meta: 'Test · Defects · Reporting' },
        { title: 'Cutover Control', year: '2024', stage: 'Execute', meta: 'Planung · Abhängigkeiten · Go-live' },
        { title: 'Hypercare Stabilisierung', year: '2024', stage: 'Handover', meta: 'Triage · Betrieb · Übergabe' },
      ],
    },
    services: {
      eyebrow: 'Leistungsmodell · 01—06',
      title: 'Kontrolle über jede kritische Phase.',
      items: [
        { title: 'S/4HANA Transformation', text: 'Qualitäts-Gates, belastbare Governance und klare Entscheidungen entlang der Transformation.' },
        { title: 'SIT/UAT Testmanagement', text: 'Ein integriertes Steuerungsmodell für Planung, Ausführung, Evidenz und Abnahme.' },
        { title: 'Defect & Hypercare Control', text: 'Priorisierung, Eskalation und Übergabe mit einer gemeinsamen Sicht auf Risiken.' },
        { title: 'Cutover-Planung', text: 'Abhängigkeiten, Verantwortungen und Entscheidungswege für einen kontrollierten Go-live.' },
        { title: 'Testautomatisierung', text: 'Gezielte Automatisierung dort, wo sie Wiederholbarkeit und Geschwindigkeit erhöht.' },
        { title: 'Enablement', text: 'Arbeitsweisen, Standards und Wissen so verankern, dass Teams selbstständig liefern.' },
      ],
    },
    manifesto: {
      eyebrow: 'Unser Prinzip',
      lines: ['Entscheidungen', 'werden sichtbar.', 'Risiken werden', 'steuerbar.'],
      text: 'Wir machen Transformation nachvollziehbar: von der ersten Annahme bis zur produktiven Übergabe. Jede Entscheidung erhält Kontext, Verantwortung und einen überprüfbaren nächsten Schritt.',
    },
    process: {
      eyebrow: 'Delivery System',
      title: 'Ein Rhythmus. Vier kontrollierte Übergänge.',
      steps: [
        { title: 'Analyze', text: 'Ziele, Abhängigkeiten und Risiken in ein gemeinsames Lagebild übersetzen.' },
        { title: 'Design', text: 'Governance, Qualitätskriterien und Entscheidungswege verbindlich definieren.' },
        { title: 'Execute', text: 'Fortschritt und Evidenz führen, Abweichungen früh sichtbar machen.' },
        { title: 'Handover', text: 'Verantwortung, Wissen und offene Punkte kontrolliert in den Betrieb übergeben.' },
      ],
      groups: [
        { title: 'SAP', items: ['Transformation Governance', 'Readiness & Quality Gates', 'Process Assurance'] },
        { title: 'Test', items: ['SIT/UAT Management', 'Defect Control', 'Automation Strategy'] },
        { title: 'Cutover', items: ['Integrated Planning', 'Command Center', 'Hypercare Transition'] },
      ],
    },
    closing: {
      eyebrow: 'Der nächste kontrollierte Schritt',
      title: 'Machen wir Komplexität entscheidbar.',
      cta: 'Projekt besprechen',
      footerLine: 'SAP · TEST · CUTOVER · DELIVERY CONTROL',
      legal: 'Unabhängige Transformationsberatung',
      top: 'Nach oben',
    },
  },
  en: {
    eyebrow: 'Quantiva Advisory · Transformation with control',
    headlineLead: 'Turning',
    headlineSignal: 'complexity',
    headlineEnd: 'into clarity.',
    summary:
      'We connect SAP transformation, test management, and cutover control in one resilient delivery model.',
    cta: 'Start a conversation',
    secondaryCta: 'Explore services',
    scroll: 'Scroll to discover',
    imageLabel: 'Data landscape · Transformation · Control',
    marquee:
      'S/4HANA · TEST MANAGEMENT · CUTOVER · CLOUD · AI · SECURITY ·',
    projects: {
      eyebrow: 'Selected engagements · anonymised',
      title: 'Transformation that holds up in delivery.',
      previewLabel: 'Control landscape',
      items: [
        { title: 'S/4HANA Quality Gate', year: '2025', stage: 'Delivery', meta: 'Governance · Readiness · Risk' },
        { title: 'SIT/UAT Command Center', year: '2025', stage: 'Control', meta: 'Testing · Defects · Reporting' },
        { title: 'Cutover Control', year: '2024', stage: 'Execute', meta: 'Planning · Dependencies · Go-live' },
        { title: 'Hypercare Stabilisation', year: '2024', stage: 'Handover', meta: 'Triage · Operations · Transition' },
      ],
    },
    services: {
      eyebrow: 'Service model · 01—06',
      title: 'Control across every critical phase.',
      items: [
        { title: 'S/4HANA transformation', text: 'Quality gates, resilient governance, and clear decisions throughout transformation.' },
        { title: 'SIT/UAT test management', text: 'An integrated control model for planning, execution, evidence, and sign-off.' },
        { title: 'Defect & hypercare control', text: 'Prioritisation, escalation, and transition through one shared view of risk.' },
        { title: 'Cutover planning', text: 'Dependencies, ownership, and decision paths aligned for a controlled go-live.' },
        { title: 'Test automation', text: 'Focused automation where it improves repeatability, evidence, and speed.' },
        { title: 'Enablement', text: 'Ways of working, standards, and knowledge embedded so teams can deliver independently.' },
      ],
    },
    manifesto: {
      eyebrow: 'Our principle',
      lines: ['Decisions become', 'traceable.', 'Risk becomes', 'controllable.'],
      text: 'We make transformation accountable from the first assumption to operational handover. Every decision has context, ownership, and a verifiable next step.',
    },
    process: {
      eyebrow: 'Delivery system',
      title: 'One rhythm. Four controlled transitions.',
      steps: [
        { title: 'Analyze', text: 'Translate objectives, dependencies, and risk into one shared view.' },
        { title: 'Design', text: 'Define governance, quality criteria, and decision paths that teams can use.' },
        { title: 'Execute', text: 'Lead progress and evidence while surfacing deviations early.' },
        { title: 'Handover', text: 'Transfer ownership, knowledge, and open actions into operations with control.' },
      ],
      groups: [
        { title: 'SAP', items: ['Transformation Governance', 'Readiness & Quality Gates', 'Process Assurance'] },
        { title: 'Test', items: ['SIT/UAT Management', 'Defect Control', 'Automation Strategy'] },
        { title: 'Cutover', items: ['Integrated Planning', 'Command Center', 'Hypercare Transition'] },
      ],
    },
    closing: {
      eyebrow: 'The next controlled step',
      title: 'Make complexity ready for decisions.',
      cta: 'Discuss your programme',
      footerLine: 'SAP · TEST · CUTOVER · DELIVERY CONTROL',
      legal: 'Independent transformation advisory',
      top: 'Back to top',
    },
  },
} as const;

export function v3Path(locale: V3Locale, path = ''): string {
  const normalized = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `/v3/${locale}${normalized}`;
}

export function otherV3Locale(locale: V3Locale): V3Locale {
  return locale === 'de' ? 'en' : 'de';
}

const V3_ORIGIN = 'https://quantivaadvisory.com';

export function v3Metadata(
  locale: V3Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const absolute = (targetLocale: V3Locale) =>
    new URL(v3Path(targetLocale, path), V3_ORIGIN).toString();

  return {
    title,
    description,
    alternates: {
      canonical: absolute(locale),
      languages: {
        'de-DE': absolute('de'),
        'en-US': absolute('en'),
      },
    },
  };
}
