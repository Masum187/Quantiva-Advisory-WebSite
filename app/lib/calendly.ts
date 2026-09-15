export const DEFAULT_CALENDLY_URL = 'https://calendly.com/quantivaadvisory';

/** Prefer a concrete event type; fall back to the org profile. */
export function getCalendlyUrl(): string {
  const event = process.env.NEXT_PUBLIC_CALENDLY_EVENT_URL?.trim();
  const profile = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  return event || profile || DEFAULT_CALENDLY_URL;
}

export function calendlyWidgetUrl(): string {
  const base = getCalendlyUrl();
  const join = base.includes('?') ? '&' : '?';
  return `${base}${join}hide_event_type_details=1&hide_gdpr_banner=1`;
}
