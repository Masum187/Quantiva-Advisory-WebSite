import type { Lang } from '../../../lib/data/projects';

export const ACCENT = '#2dd4bf';
export { getCalendlyUrl } from '../../../lib/calendly';
export const FILM_HERO = '/assets/home/brand-film-hero.mp4';
export const FILM_INTERLUDE = '/assets/home/brand-film-interlude.mp4';
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  SOCIAL_LINKS,
} from '../../../lib/contact';


export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ServiceMeta {
  accent: string;
  path: string;
}

export interface ServiceCopy {
  name: string;
  desc: string;
}

export interface PrincipleCopy {
  title: string;
  text: string;
}

export interface ContactCopy {
  chapter: string;
  title: string;
  sub: string;
  name: string;
  email: string;
  message: string;
  submit: string;
  success: string;
  error: string;
}

export interface MeetingCopy {
  chapter: string;
  title: string;
  sub: string;
  fallbackHint: string;
  fallbackButton: string;
}

export interface FooterCopy {
  quickLinksTitle: string;
  quickLinks: NavItem[];
  contactTitle: string;
  socialTitle: string;
  copyright: string;
  legal: { imprint: NavItem; privacy: NavItem };
  phoneOnRequest: string;
}

export interface HomeCopy {
  nav: NavItem[];
  navCta: string;
  langSwitch: { label: string; href: string };
  hero: {
    eyebrow: string;
    words: [string, string, string];
    motto: string;
    positioning: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
  };
  manifesto: { chapter: string; lead: string[]; accentWords: string[] };
  interlude: { quote: string; source: string };
  services: { chapter: string; title: string; items: ServiceCopy[] };
  industries: { chapter: string; title: string; sub: string; projectsLabel: string };
  ventures: {
    chapter: string;
    title: string;
    sub: string;
    allProjects: string;
    tabs: { id: VentureGroup | 'all'; label: string }[];
  };
  principles: { chapter: string; items: [PrincipleCopy, PrincipleCopy, PrincipleCopy] };
  contact: ContactCopy;
  meeting: MeetingCopy;
  footer: FooterCopy;
}

/* ---------- Venture-Gruppen (sprachunabhängig) ---------- */

export type VentureGroup = 'ai' | 'sap' | 'workforce';

export const VENTURE_GROUPS: Record<string, VentureGroup> = {
  solutiongate: 'ai',
  lumena: 'ai',
  procuvera: 'ai',
  limen: 'ai',
  shiftgate: 'sap',
  weftline: 'sap',
  veya: 'workforce',
  nuvora: 'workforce',
};

/* ---------- Service-Metadaten (sprachunabhängig) ---------- */

export const SERVICE_META: ServiceMeta[] = [
  { accent: '#3b82f6', path: '/services/sap' },
  { accent: '#a78bfa', path: '/services/ai' },
  { accent: '#38bdf8', path: '/services/cloud' },
  { accent: '#f87171', path: '/services/cyber-security' },
  { accent: '#fbbf24', path: '/services/digital-strategy' },
  { accent: '#34d399', path: '/services/microservices' },
  { accent: '#f472b6', path: '/services/new-work' },
  { accent: '#fb923c', path: '/services/change-management' },
  { accent: '#60a5fa', path: '/services/erp-crm' },
  { accent: '#4ade80', path: '/services/sustainability' },
  { accent: '#2dd4bf', path: '/services/test-automation' },
];

/* ---------- COPY ---------- */

export const COPY: Record<Lang, HomeCopy> = {
  de: {
    nav: [
      { id: 'about', label: 'Über uns', href: '/de/about' },
      { id: 'services', label: 'Services', href: '#services' },
      { id: 'cases', label: 'Projekte', href: '/de/cases' },
      { id: 'team', label: 'Team', href: '/de/team' },
      { id: 'career', label: 'Karriere', href: '/de/career' },
    ],
    navCta: 'Kontakt',
    langSwitch: { label: 'EN', href: '/en' },
    hero: {
      eyebrow: 'Quantiva Advisory — Advisory × Venture Studio',
      words: ['Beraten.', 'Bauen.', 'Beweisen.'],
      motto: 'Proof statt Promise.',
      positioning:
        'Wir begleiten Transformation im Mittelstand — und bauen die Produkte, die unsere Empfehlungen beweisbar machen.',
      ctaPrimary: 'Mit uns sprechen',
      ctaSecondary: 'Unsere Services',
      scrollHint: 'Der Film beginnt beim Scrollen',
    },
    manifesto: {
      chapter: 'Kapitel 01 — Der Anspruch',
      lead: [
        'Wir liefern Beratung, die sich an', 'Ergebnissen', 'messen lässt — nicht an Folien.',
        'Unsere eigenen Produkte sind der', 'Beweis,', 'dass wir können, was wir empfehlen.',
      ],
      accentWords: ['Ergebnissen', 'Beweis,'],
    },
    interlude: {
      quote: 'Transformation, die im Mittelstand ankommt: messbar, auditierbar, ehrlich.',
      source: 'Quantiva Advisory',
    },
    services: {
      chapter: 'Kapitel 02 — Services',
      title: 'Elf Disziplinen. Ein Anspruch.',
      items: [
        { name: 'SAP Services', desc: 'Transformation, Cutover und Betrieb — mit überprüfbaren Zwischenständen.' },
        { name: 'KI & Machine Learning', desc: 'KI-Lösungen mit messbarem Nutzen — von der Use-Case-Auswahl bis zum Betrieb.' },
        { name: 'Cloud Solutions', desc: 'Architektur, Migration und Betrieb — sicher, skalierbar, souverän.' },
        { name: 'Cyber Security', desc: 'Sicherheit als Architektur — von der Analyse bis zur Audit-Readiness.' },
        { name: 'Digital Strategy', desc: 'Strategien mit Umsetzungspfad — priorisiert nach Wirkung, nicht nach Mode.' },
        { name: 'Systemintegration & Microservices', desc: 'Saubere Schnittstellen und Services, die Ihre Landschaft entkoppeln.' },
        { name: 'New Work & Enablement', desc: 'Teams befähigen statt Tools verteilen — Adoption, die bleibt.' },
        { name: 'Change Management', desc: 'Veränderung strukturiert begleiten — vom Stakeholder bis zum Go-Live.' },
        { name: 'ERP & CRM', desc: 'Kernprozesse harmonisieren — durchgängig vom Lead bis zur Buchung.' },
        { name: 'Sustainability', desc: 'Nachhaltigkeit berichtsfähig machen — Daten, Prozesse, Nachweise.' },
        { name: 'Testautomatisierung', desc: 'Qualität automatisiert absichern — schneller releasen, ruhiger schlafen.' },
      ],
    },
    industries: {
      chapter: 'Kapitel 03 — Branchen',
      title: 'Branchen-Expertise',
      sub: 'Wir begleiten mittelständische Marktführer in regulierten und wachstumsstarken Branchen.',
      projectsLabel: 'Projekte',
    },
    ventures: {
      chapter: 'Kapitel 04 — Venture Studio',
      title: 'Wir bauen, was wir empfehlen.',
      sub: 'Acht eigene Produkte — jedes ein Beweis, dass unsere Beratung funktioniert.',
      allProjects: 'Alle Projekte ansehen',
      tabs: [
        { id: 'all', label: 'Alle' },
        { id: 'ai', label: 'KI & Governance' },
        { id: 'sap', label: 'SAP & Prozesse' },
        { id: 'workforce', label: 'Workforce' },
      ],
    },
    principles: {
      chapter: 'Kapitel 05 — Woran Sie uns erkennen',
      items: [
        { title: 'Evidenz statt Meinung', text: 'Jede Empfehlung muss belegbar sein — mit Daten, nicht mit Lautstärke.' },
        { title: 'Mittelstand im Fokus', text: 'Lösungen, die zu Ihren Strukturen passen — pragmatisch statt überdimensioniert.' },
        { title: 'Sicherheit & Compliance', text: 'Audit-Readiness und EU-Souveränität sind Architektur, kein Nachtrag.' },
      ],
    },
    contact: {
      chapter: 'Kapitel 06 — Kontakt',
      title: 'Sprechen wir über Ihr Vorhaben.',
      sub: 'Erzählen Sie uns, wo Sie stehen — wir antworten mit einem konkreten nächsten Schritt.',
      name: 'Ihr Name',
      email: 'Ihre E-Mail',
      message: 'Ihre Nachricht',
      submit: 'Nachricht senden',
      success: 'Vielen Dank! Wir melden uns zeitnah bei Ihnen.',
      error: 'Bitte füllen Sie alle Felder aus.',
    },
    meeting: {
      chapter: 'Kapitel 07 — Termin',
      title: 'Direkt einen Termin buchen',
      sub: 'Kostenloses Erstgespräch — 30 Minuten, ohne Umwege.',
      fallbackHint: 'Widget lädt nicht? Öffnen Sie Calendly direkt:',
      fallbackButton: 'Calendly öffnen',
    },
    footer: {
      quickLinksTitle: 'Quick Links',
      quickLinks: [
        { id: 'home', label: 'Home', href: '/de' },
        { id: 'about', label: 'Über uns', href: '/de/about' },
        { id: 'services', label: 'Services', href: '/de#services' },
        { id: 'cases', label: 'Projekte', href: '/de/cases' },
        { id: 'team', label: 'Team', href: '/de/team' },
        { id: 'career', label: 'Karriere', href: '/de/career' },
      ],
      contactTitle: 'Kontakt',
      socialTitle: 'Folgen Sie uns',
      copyright: '© 2026 Quantiva Advisory. Alle Rechte vorbehalten.',
      legal: {
        imprint: { id: 'imprint', label: 'Impressum', href: '/de/impressum' },
        privacy: { id: 'privacy', label: 'Datenschutz', href: '/de/datenschutz' },
      },
      phoneOnRequest: 'Telefon auf Anfrage',
    },
  },
  en: {
    nav: [
      { id: 'about', label: 'About us', href: '/en/about' },
      { id: 'services', label: 'Services', href: '#services' },
      { id: 'cases', label: 'Projects', href: '/en/cases' },
      { id: 'team', label: 'Team', href: '/en/team' },
      { id: 'career', label: 'Careers', href: '/en/career' },
    ],
    navCta: 'Contact',
    langSwitch: { label: 'DE', href: '/de' },
    hero: {
      eyebrow: 'Quantiva Advisory — Advisory × Venture Studio',
      words: ['Advise.', 'Build.', 'Prove.'],
      // Markenmotto — bleibt auch auf Englisch wörtlich erhalten.
      motto: 'Proof statt Promise.',
      positioning:
        'We guide mid-market transformation — and build the products that make our recommendations provable.',
      ctaPrimary: 'Talk to us',
      ctaSecondary: 'Our services',
      scrollHint: 'The film begins as you scroll',
    },
    manifesto: {
      chapter: 'Chapter 01 — The Standard',
      lead: [
        'We deliver consulting measured by', 'outcomes', '— not by slides.',
        'Our own products are the', 'proof', 'that we can do what we recommend.',
      ],
      accentWords: ['outcomes', 'proof'],
    },
    interlude: {
      quote: 'Transformation that lands in the mid-market: measurable, auditable, honest.',
      source: 'Quantiva Advisory',
    },
    services: {
      chapter: 'Chapter 02 — Services',
      title: 'Eleven disciplines. One standard.',
      items: [
        { name: 'SAP Services', desc: 'Transformation, cutover, and operations — with verifiable interim results.' },
        { name: 'AI & Machine Learning', desc: 'AI solutions with measurable value — from use-case selection to operations.' },
        { name: 'Cloud Solutions', desc: 'Architecture, migration, and operations — secure, scalable, sovereign.' },
        { name: 'Cyber Security', desc: 'Security as architecture — from analysis to audit readiness.' },
        { name: 'Digital Strategy', desc: 'Strategies with an execution path — prioritized by impact, not by fashion.' },
        { name: 'System Integration & Microservices', desc: 'Clean interfaces and services that decouple your landscape.' },
        { name: 'New Work & Enablement', desc: 'Enable teams instead of distributing tools — adoption that lasts.' },
        { name: 'Change Management', desc: 'Guide change with structure — from stakeholders to go-live.' },
        { name: 'ERP & CRM', desc: 'Harmonize core processes — end to end, from lead to booking.' },
        { name: 'Sustainability', desc: 'Make sustainability reportable — data, processes, evidence.' },
        { name: 'Test Automation', desc: 'Automated quality assurance — release faster, sleep better.' },
      ],
    },
    industries: {
      chapter: 'Chapter 03 — Industries',
      title: 'Industry Expertise',
      sub: 'We partner with mid-market leaders in regulated and fast-scaling industries.',
      projectsLabel: 'projects',
    },
    ventures: {
      chapter: 'Chapter 04 — Venture Studio',
      title: 'We build what we recommend.',
      sub: 'Eight products of our own — each one proof that our consulting works.',
      allProjects: 'View all projects',
      tabs: [
        { id: 'all', label: 'All' },
        { id: 'ai', label: 'AI & Governance' },
        { id: 'sap', label: 'SAP & Processes' },
        { id: 'workforce', label: 'Workforce' },
      ],
    },
    principles: {
      chapter: 'Chapter 05 — What sets us apart',
      items: [
        { title: 'Evidence over opinion', text: 'Every recommendation must be verifiable — with data, not volume.' },
        { title: 'Mid-market focus', text: 'Solutions that fit your structures — pragmatic instead of oversized.' },
        { title: 'Security & compliance', text: 'Audit readiness and EU sovereignty are architecture, not an afterthought.' },
      ],
    },
    contact: {
      chapter: 'Chapter 06 — Contact',
      title: 'Let’s talk about your initiative.',
      sub: 'Tell us where you stand — we respond with a concrete next step.',
      name: 'Your name',
      email: 'Your email',
      message: 'Your message',
      submit: 'Send message',
      success: 'Thank you! We will get back to you shortly.',
      error: 'Please fill in all fields.',
    },
    meeting: {
      chapter: 'Chapter 07 — Meeting',
      title: 'Book a meeting directly',
      sub: 'Free initial consultation — 30 minutes, no detours.',
      fallbackHint: 'Widget not loading? Open Calendly directly:',
      fallbackButton: 'Open Calendly',
    },
    footer: {
      quickLinksTitle: 'Quick links',
      quickLinks: [
        { id: 'home', label: 'Home', href: '/en' },
        { id: 'about', label: 'About us', href: '/en/about' },
        { id: 'services', label: 'Services', href: '/en#services' },
        { id: 'cases', label: 'Projects', href: '/en/cases' },
        { id: 'team', label: 'Team', href: '/en/team' },
        { id: 'career', label: 'Careers', href: '/en/career' },
      ],
      contactTitle: 'Contact',
      socialTitle: 'Follow us',
      copyright: '© 2026 Quantiva Advisory. All rights reserved.',
      legal: {
        imprint: { id: 'imprint', label: 'Imprint', href: '/en/imprint' },
        privacy: { id: 'privacy', label: 'Privacy', href: '/en/privacy' },
      },
      phoneOnRequest: 'Phone on request',
    },
  },
};
