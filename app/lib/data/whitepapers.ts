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
    url: 'REPLACE_WITH_CLOUDINARY_URL',
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
