/**
 * Server-side whitepaper registry.
 *
 * The download URLs (Cloudinary) are intentionally NOT rendered anywhere on
 * the website – prospects only receive them via the e-mail sent by
 * /api/whitepaper. Keep this file out of client components.
 *
 * TODO: Replace the `url` placeholders with the real Cloudinary delivery
 * URLs of the PDFs (Cloudinary Media Library → asset → "Copy URL").
 */
export type WhitepaperEntry = {
  slug: string;
  title: string;
  /** Cloudinary delivery URL of the PDF. */
  url: string;
};

export const whitepapers: WhitepaperEntry[] = [
  {
    slug: 'sap-s4hana-transformation',
    title: 'SAP S/4HANA Transformation Guide 2025',
    url: 'REPLACE_WITH_CLOUDINARY_URL',
  },
  {
    slug: 'sap-btp-integration',
    title: 'SAP BTP Integration Patterns Whitepaper',
    url: 'REPLACE_WITH_CLOUDINARY_URL',
  },
  {
    slug: 'sap-cloud-alm',
    title: 'SAP Cloud ALM Best Practices',
    // fl_attachment sorgt dafür, dass das PDF als Download mit sauberem Dateinamen kommt
    url: 'https://res.cloudinary.com/dbrisux8i/image/upload/fl_attachment:SAP-Cloud-ALM-Best-Practices/v1788989580/03-cloud-alm-2026_o7dsbd.pdf',
  },
  {
    slug: 'sap-ki-joule',
    title: 'KI & SAP Joule Integration Guide',
    url: 'REPLACE_WITH_CLOUDINARY_URL',
  },
  {
    slug: 'sap-fiori-ux',
    title: 'SAP Fiori UX Design Guidelines 2025',
    url: 'REPLACE_WITH_CLOUDINARY_URL',
  },
  {
    slug: 'sap-test-automation',
    title: 'SAP Test Automation Framework',
    url: 'REPLACE_WITH_CLOUDINARY_URL',
  },
];

export function getWhitepaper(slug: string): WhitepaperEntry | null {
  return whitepapers.find((w) => w.slug === slug) ?? null;
}
