/**
 * Analytics consent — explicit opt-in.
 * Tracking scripts must not load until consent === true.
 */

export const ANALYTICS_CONSENT_KEY = 'analytics_consent';
export const ANALYTICS_CONSENT_EVENT = 'qa-analytics-consent';
export const ANALYTICS_CONSENT_REOPEN_EVENT = 'qa-analytics-consent-reopen';

function readConsentCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )analytics_consent=(true|false)/);
  return match?.[1] ?? null;
}

function writeConsentCookie(value: 'true' | 'false') {
  if (typeof document === 'undefined') return;
  document.cookie = `${ANALYTICS_CONSENT_KEY}=${value}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

/**
 * True only after explicit accept. Missing or declined = no tracking.
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(ANALYTICS_CONSENT_KEY);
  if (stored === 'true') return true;
  if (stored === 'false') return false;
  return readConsentCookie() === 'true';
}

export function setAnalyticsConsent(consent: boolean) {
  if (typeof window === 'undefined') return;

  const value = consent ? 'true' : 'false';
  localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  writeConsentCookie(value);
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: { consent } }));
}

export function requestConsentBanner() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_REOPEN_EVENT));
}

/**
 * Anonymize IP address (Vercel Analytics does this by default)
 */
export function anonymizeIP(ip: string): string {
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  const ipv6Parts = ip.split(':');
  return ipv6Parts.slice(0, 4).join(':') + '::';
}

export function getAnonymousUserId(): string {
  if (typeof window === 'undefined') return 'anonymous';

  let userId = localStorage.getItem('anonymous_user_id');

  if (!userId) {
    userId = `anon_${Math.random().toString(36).slice(2, 11)}_${Date.now()}`;
    localStorage.setItem('anonymous_user_id', userId);
  }

  return userId;
}

export function clearAnalyticsData() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(ANALYTICS_CONSENT_KEY);
  localStorage.removeItem('anonymous_user_id');
  writeConsentCookie('false');

  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith('ab_test_')) {
      localStorage.removeItem(key);
    }
  });

  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: { consent: false } }));
}

export const privacyConfig = {
  cookieless: true,
  anonymousIP: true,
  noPersonalData: true,
  gdprCompliant: true,
  ccpaCompliant: true,
  optInRequired: true,
  dataRetentionDays: 90,

  trackedData: [
    'Page views',
    'Navigation events',
    'Button clicks',
    'Form submissions (no personal data)',
    'Performance metrics (Web Vitals)',
    'Device type & browser',
    'Geographic location (country/city level)',
    'Referrer URL',
  ],

  notTracked: [
    'Email addresses',
    'Names',
    'Phone numbers',
    'Credit card information',
    'Passwords',
    'Personal messages',
    'Precise geolocation (GPS)',
    'Cross-site tracking',
  ],
};
