/**
 * Public contact details. Do not invent phone numbers or registry IDs.
 * Phone is only shown when NEXT_PUBLIC_CONTACT_PHONE is set.
 */

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@quantiva-advisory.com';

export const CAREERS_EMAIL =
  process.env.NEXT_PUBLIC_CAREERS_EMAIL || 'careers@quantiva-advisory.com';

export const CONTACT_PHONE_DISPLAY = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || '';

export const CONTACT_PHONE_HREF = CONTACT_PHONE_DISPLAY
  ? CONTACT_PHONE_DISPLAY.replace(/[^\d+]/g, '')
  : '';

export const SITE_DOMAIN = 'quantivaadvisory.com';

export type SocialLink = { label: string; href: string };

const linkedIn = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
const twitter = process.env.NEXT_PUBLIC_TWITTER_URL?.trim();
const github = process.env.NEXT_PUBLIC_GITHUB_URL?.trim();

/** Only include social profiles that are explicitly configured — no placeholder networks. */
export const SOCIAL_LINKS: SocialLink[] = [
  ...(linkedIn ? [{ label: 'LinkedIn', href: linkedIn }] : []),
  ...(twitter ? [{ label: 'Twitter', href: twitter }] : []),
  ...(github ? [{ label: 'GitHub', href: github }] : []),
];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}
