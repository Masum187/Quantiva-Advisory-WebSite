export type ForgeLocale = 'de' | 'en';

export const FORGE_NAV = {
  de: [
    { href: '', label: 'Home' },
    { href: '/about', label: 'Über uns' },
    { href: '/services', label: 'Services' },
    { href: '/industries', label: 'Branchen' },
    { href: '/cases', label: 'Projekte' },
    { href: '/team', label: 'Team' },
    { href: '/career', label: 'Karriere' },
    { href: '/contact', label: 'Kontakt' },
  ],
  en: [
    { href: '', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/industries', label: 'Industries' },
    { href: '/cases', label: 'Cases' },
    { href: '/team', label: 'Team' },
    { href: '/career', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

export const FORGE_HOME = {
  de: {
    brand: 'Quantiva',
    meta: 'SAP · CLOUD · KI · S.0108.16.26',
    headline: 'Transformation,\ndie sich bauen lässt.',
    support:
      'SAP-Landschaften, Cloud-Betriebsmodelle und KI — für mittelständische Marktführer, die messbar liefern.',
    ctaPrimary: 'Gespräch buchen',
    ctaSecondary: 'Services',
    proof: '45+ Projekte · DACH Mittelstand · ISO-ready Delivery',
    featuresTitle: 'Gebaut auf dem,\nwas Sie schon nutzen.',
    features: [
      {
        n: '01',
        title: 'SAP-Kern modernisieren',
        body: 'S/4HANA, BTP und Testautomation — ohne Parallelwelt, mit klaren Quality Gates.',
      },
      {
        n: '02',
        title: 'Cloud, die trägt',
        body: 'Landing Zones, Operating Model und FinOps — skalierbar, auditierbar, finanzierbar.',
      },
      {
        n: '03',
        title: 'KI in die Fläche',
        body: 'Use Cases mit Datenfundament und Governance — nicht Demo-Theater.',
      },
      {
        n: '04',
        title: 'Security by Design',
        body: 'Compliance und Risiko von Anfang an mitgedacht — nicht als Nachtrag.',
      },
    ],
    closeTitle: 'Bereit für den nächsten Schritt?',
    closeBody: 'Ein kurzes Erstgespräch. Klare nächste Schritte. Kein Pitch-Deck-Marathon.',
    closeCta: 'Kontakt aufnehmen',
  },
  en: {
    brand: 'Quantiva',
    meta: 'SAP · CLOUD · AI · S.0108.16.26',
    headline: 'Transformation\nyou can ship.',
    support:
      'SAP landscapes, cloud operating models, and AI — for mid-market leaders who need measurable delivery.',
    ctaPrimary: 'Book a call',
    ctaSecondary: 'Services',
    proof: '45+ projects · DACH mid-market · ISO-ready delivery',
    featuresTitle: 'Built on what\nyou already run.',
    features: [
      {
        n: '01',
        title: 'Modernize the SAP core',
        body: 'S/4HANA, BTP, and test automation — no parallel universe, with clear quality gates.',
      },
      {
        n: '02',
        title: 'Cloud that holds',
        body: 'Landing zones, operating model, and FinOps — scalable, auditable, fundable.',
      },
      {
        n: '03',
        title: 'AI into production',
        body: 'Use cases with data foundations and governance — not demo theater.',
      },
      {
        n: '04',
        title: 'Security by design',
        body: 'Compliance and risk from day one — not bolted on later.',
      },
    ],
    closeTitle: 'Ready for the next step?',
    closeBody: 'A short first call. Clear next steps. No pitch-deck marathon.',
    closeCta: 'Get in touch',
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
