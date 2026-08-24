export type ForgeLocale = 'de' | 'en';

/** Primary chrome — fewer items, clearer hierarchy */
export const FORGE_NAV = {
  de: [
    { href: '', label: 'Home' },
    { href: '/services', label: 'Services' },
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
} as const;

export const FORGE_NAV_MORE = {
  de: [
    { href: '/industries', label: 'Branchen' },
    { href: '/team', label: 'Team' },
    { href: '/career', label: 'Karriere' },
  ],
  en: [
    { href: '/industries', label: 'Industries' },
    { href: '/team', label: 'Team' },
    { href: '/career', label: 'Careers' },
  ],
} as const;

export const FORGE_HOME = {
  de: {
    brand: 'Quantiva',
    badge: 'SAP S/4HANA Transformation',
    metaLeft: 'S/4HANA · SIT/UAT · Cutover',
    metaRight: 'Quantiva Advisory',
    headline: 'SAP-Transformationen, die im Testmanagement nicht kippen.',
    support:
      'Beratung für S/4HANA-Migrationen, SIT- und UAT-Testmanagement sowie eine kontrollierte Cutover-Steuerung.',
    ctaPrimary: 'Erstgespräch vereinbaren',
    ctaSecondary: 'Leistungen ansehen',
    proofLabel: 'Fokus',
    proof: 'S/4HANA-Transformation · SIT/UAT · Cutover · Hypercare',
    featuresEyebrow: 'Leistungsfelder',
    featuresTitle: 'Vier Hebel.\nEin Delivery-Modell.',
    features: [
      {
        n: '01',
        title: 'SAP-Transformation',
        body: 'S/4HANA, BTP und Testautomation mit klaren Quality Gates — ohne parallele Schattenlandschaft.',
      },
      {
        n: '02',
        title: 'Cloud Operating Model',
        body: 'Landing Zones, Platform Teams und FinOps — so, dass Betrieb und Governance mitwachsen.',
      },
      {
        n: '03',
        title: 'KI in Produktion',
        body: 'Use Cases mit Datenfundament, Evaluation und Governance — vom Pilot in den Regelbetrieb.',
      },
      {
        n: '04',
        title: 'Security & Compliance',
        body: 'Risiko, Kontrollen und Nachweispflicht von Anfang an integriert — nicht als Nacharbeit.',
      },
    ],
    closeEyebrow: 'Nächster Schritt',
    closeTitle: 'Kurz abstimmen.\nKlar entscheiden.',
    closeBody:
      'In 30 Minuten klären wir Zielbild, Rahmen und die sinnvollste nächste Lieferung — ohne Pitch-Marathon.',
    closeCta: 'Termin anfragen',
  },
  en: {
    brand: 'Quantiva',
    badge: 'SAP S/4HANA transformation',
    metaLeft: 'S/4HANA · SIT/UAT · Cutover',
    metaRight: 'Quantiva Advisory',
    headline: 'SAP transformations that stay in control through testing.',
    support:
      'Advisory for S/4HANA migrations, SIT and UAT test management, and controlled cutover delivery.',
    ctaPrimary: 'Book an intro call',
    ctaSecondary: 'View services',
    proofLabel: 'Focus',
    proof: 'S/4HANA transformation · SIT/UAT · Cutover · Hypercare',
    featuresEyebrow: 'Capabilities',
    featuresTitle: 'Four levers.\nOne delivery model.',
    features: [
      {
        n: '01',
        title: 'SAP transformation',
        body: 'S/4HANA, BTP, and test automation with clear quality gates — no parallel shadow landscape.',
      },
      {
        n: '02',
        title: 'Cloud operating model',
        body: 'Landing zones, platform teams, and FinOps — so operations and governance scale with you.',
      },
      {
        n: '03',
        title: 'AI in production',
        body: 'Use cases with data foundations, evaluation, and governance — from pilot to steady state.',
      },
      {
        n: '04',
        title: 'Security & compliance',
        body: 'Risk, controls, and evidence built in from day one — not bolted on later.',
      },
    ],
    closeEyebrow: 'Next step',
    closeTitle: 'Align briefly.\nDecide clearly.',
    closeBody:
      'In 30 minutes we clarify target state, constraints, and the most useful next delivery — no pitch marathon.',
    closeCta: 'Request a meeting',
  },
} as const;

export const FORGE_CAPABILITY_POINTS: Record<
  string,
  { de: string[]; en: string[] }
> = {
  sap: {
    de: [
      'S/4HANA Roadmaps mit hybriden Migrationspfaden',
      'BTP-Integration und Event-Architekturen',
      'Cloud ALM, ChaRM und Quality Gates',
      'Testautomation und Cutover-Steuerung',
      'Fiori/UX für hohe Adoption',
    ],
    en: [
      'S/4HANA roadmaps with hybrid migration paths',
      'BTP integration and event architectures',
      'Cloud ALM, ChaRM, and quality gates',
      'Test automation and cutover control',
      'Fiori/UX for high adoption',
    ],
  },
  cloud: {
    de: [
      'Landing Zones auf Azure, AWS und GCP',
      'Operating Model und Platform Teams',
      'FinOps und Kostensteuerung',
      'Migration ohne Big-Bang-Risiko',
      'Observability und Runbooks',
    ],
    en: [
      'Landing zones on Azure, AWS, and GCP',
      'Operating model and platform teams',
      'FinOps and cost control',
      'Migration without big-bang risk',
      'Observability and runbooks',
    ],
  },
  ai: {
    de: [
      'Use-Case-Priorisierung mit Business Case',
      'Datenfundamente und Feature Stores',
      'MLOps und Modell-Governance',
      'GenAI mit Kontrollen und Evaluation',
      'Enablement für Fachbereiche',
    ],
    en: [
      'Use-case prioritization with business case',
      'Data foundations and feature stores',
      'MLOps and model governance',
      'GenAI with controls and evaluation',
      'Enablement for business teams',
    ],
  },
  default: {
    de: [
      'Klare Zielarchitektur und Lieferplan',
      'Messbare Outcomes statt Folien',
      'Security & Compliance mitgedacht',
      'Enablement für nachhaltige Adoption',
      'Übergabe in den Betrieb',
    ],
    en: [
      'Clear target architecture and delivery plan',
      'Measurable outcomes over slides',
      'Security & compliance built in',
      'Enablement for lasting adoption',
      'Handover into operations',
    ],
  },
};

export function forgePath(locale: ForgeLocale, path = ''): string {
  const normalized = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `/v2/${locale}${normalized}`;
}

export function otherLocale(locale: ForgeLocale): ForgeLocale {
  return locale === 'de' ? 'en' : 'de';
}
