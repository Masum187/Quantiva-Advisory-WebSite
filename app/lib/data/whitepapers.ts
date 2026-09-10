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
];

export function getWhitepaper(slug: string): WhitepaperEntry | null {
  return whitepapers.find((w) => w.slug === slug) ?? null;
}
