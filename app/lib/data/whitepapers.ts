/**
 * Server-side whitepaper registry.
 *
 * The download URLs (Cloudinary) are intentionally NOT rendered anywhere on
 * the website – prospects only receive them via the e-mail sent by
 * /api/whitepaper. Keep this file out of client components.
 *
 * `fl_attachment:<name>` makes Cloudinary deliver the PDF as a download with
 * a clean filename instead of opening it inline.
 */
export type WhitepaperEntry = {
  slug: string;
  title: string;
  /** Cloudinary delivery URL of the PDF. */
  url: string;
};

const CLOUD = 'https://res.cloudinary.com/dbrisux8i/image/upload';

export const whitepapers: WhitepaperEntry[] = [
  {
    slug: 'sap-s4hana-transformation',
    title: 'SAP S/4HANA Transformation Guide 2025',
    url: `${CLOUD}/fl_attachment:SAP-S4HANA-Transformation-Guide/v1788989580/01-s4hana-transformation-2026_tyyilv.pdf`,
  },
  {
    slug: 'sap-btp-integration',
    title: 'SAP BTP Integration Patterns Whitepaper',
    url: `${CLOUD}/fl_attachment:SAP-BTP-Integration-Patterns/v1788989580/02-btp-integration-2026_nhl762.pdf`,
  },
  {
    slug: 'sap-cloud-alm',
    title: 'SAP Cloud ALM Best Practices',
    url: `${CLOUD}/fl_attachment:SAP-Cloud-ALM-Best-Practices/v1788989580/03-cloud-alm-2026_o7dsbd.pdf`,
  },
  {
    slug: 'sap-ki-joule',
    title: 'KI & SAP Joule Integration Guide',
    url: `${CLOUD}/fl_attachment:KI-SAP-Joule-Integration-Guide/v1788989580/04-joule-ki-integration-2026_jtfpat.pdf`,
  },
  {
    slug: 'sap-fiori-ux',
    title: 'SAP Fiori UX Design Guidelines 2025',
    url: `${CLOUD}/fl_attachment:SAP-Fiori-UX-Design-Guidelines/v1788989580/05-fiori-ux-2026_vrhwhs.pdf`,
  },
  {
    slug: 'sap-test-automation',
    title: 'SAP Test Automation Framework',
    url: `${CLOUD}/fl_attachment:SAP-Test-Automation-Framework/v1788989580/06-testautomatisierung-2026_odixjq.pdf`,
  },

  // ── KI / AI & Machine Learning ─────────────────────────────────────────
  // Hinweis: Für diese Assets ist `fl_attachment` durch die Cloudinary-
  // Einstellung „Strict transformations“ nicht freigegeben (liefert 401).
  // Die PDFs werden daher ohne Transformation ausgeliefert (öffnen inline).
  {
    slug: 'ai-use-case-discovery',
    title: 'AI Use Case Discovery Whitepaper (2025)',
    url: `${CLOUD}/v1789081342/07-ai-use-case-discovery-2026_drlxye.pdf`,
  },
  {
    slug: 'ai-compliance-guardrails',
    title: 'AI Compliance & Guardrails (2025)',
    url: `${CLOUD}/v1789081341/08-ai-compliance-guardrails-2026_ohkeol.pdf`,
  },
  {
    slug: 'ai-mlops-genai-cases',
    title: 'MLOps & GenAI Summit Case Studies (2025)',
    url: `${CLOUD}/v1789081342/09-mlops-genai-praxis-2026_ldeb13.pdf`,
  },
  {
    slug: 'ai-use-case-erfolgsfaktoren',
    title: 'AI Use Case Erfolgsfaktoren (2025)',
    url: `${CLOUD}/v1789081342/10-ai-use-case-erfolgsfaktoren-2026_jbfznm.pdf`,
  },
  {
    slug: 'ai-eu-ai-act-guide',
    title: 'EU AI Act Implementation Guide (2025)',
    url: `${CLOUD}/v1789081342/11-eu-ai-act-umsetzung-2026_eftdum.pdf`,
  },
  {
    slug: 'ai-genai-business-impact',
    title: 'Generative AI Business Impact Study (2025)',
    url: `${CLOUD}/v1789081342/12-genai-business-impact-2026_iypxpi.pdf`,
  },

  // ── Systemintegration & Microservices ──────────────────────────────────
  // Ebenfalls ohne fl_attachment (Strict transformations, siehe oben).
  {
    slug: 'integration-microservices-architektur',
    title: 'Microservices Architecture & Communication Study',
    url: `${CLOUD}/v1789108767/13-microservices-architektur-2026_qjuo1u.pdf`,
  },
  {
    slug: 'integration-api-design-governance',
    title: 'API Design & Governance Mapping Study',
    url: `${CLOUD}/v1789108767/14-api-design-governance-2026_zljb53.pdf`,
  },
  {
    slug: 'integration-api-economy',
    title: 'State of API Economy 2025',
    url: `${CLOUD}/v1789108767/15-api-economy-2026_jg4yau.pdf`,
  },
  {
    slug: 'integration-digital-business',
    title: 'APIs & Digital Business Strategy Report',
    url: `${CLOUD}/v1789108767/16-digital-business-api-plattformen-2026_e7ksgl.pdf`,
  },
  {
    slug: 'integration-api-security',
    title: 'Security Strategies for Microservices (NIST SP 800-204)',
    url: `${CLOUD}/v1789108767/17-api-security-operations-2026_goe6ya.pdf`,
  },
  {
    slug: 'integration-api-trends',
    title: 'Application Security & Microservices Trends 2025',
    url: `${CLOUD}/v1789108767/18-api-microservices-trends-2026_rvu1p9.pdf`,
  },
];

export function getWhitepaper(slug: string): WhitepaperEntry | null {
  return whitepapers.find((w) => w.slug === slug) ?? null;
}
