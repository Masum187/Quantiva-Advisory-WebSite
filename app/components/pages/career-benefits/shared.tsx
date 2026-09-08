/**
 * Shared helpers for the culture & benefits theme pages.
 *
 * Navigation items and motion presets are reused from the career-area
 * pages so that all career subpages behave consistently; this module only
 * adds the benefit-specific UI strings.
 */
export {
  localePath,
  getNavigationItems,
  makeMotionPresets,
  type CareerThemeProps,
  type Dir,
  type Lang,
} from '../career-areas/shared';

import { localePath, type Lang } from '../career-areas/shared';

/** Where the "apply now" CTA of benefit pages leads (contact section). */
export function applyHref(lang: Lang) {
  return localePath(lang, '/#contact');
}

/** Where the "all open positions" CTA of benefit pages leads (career overview). */
export function careerHref(lang: Lang) {
  return localePath(lang, '/career');
}

export interface BenefitUiStrings {
  back: string;
  ctaApply: string;
  ctaPositions: string;
  factsTitle: string;
  faqTitle: string;
  faqSubtitle: string;
}

export function getBenefitUiStrings(lang: Lang): BenefitUiStrings {
  return {
    back: lang === 'de' ? 'Zurück zur Karriere' : 'Back to career',
    ctaApply: lang === 'de' ? 'Jetzt bewerben' : 'Apply now',
    ctaPositions: lang === 'de' ? 'Alle offenen Stellen' : 'All open positions',
    factsTitle: lang === 'de' ? 'Zahlen, die zählen' : 'Numbers that count',
    faqTitle: lang === 'de' ? 'Häufige Fragen' : 'Frequently asked questions',
    faqSubtitle:
      lang === 'de'
        ? 'Ehrliche Antworten auf die Fragen, die uns Bewerber:innen am häufigsten stellen.'
        : 'Honest answers to the questions candidates ask us most often.',
  };
}

/**
 * Shared focus-visible utility so every interactive element on the benefit
 * pages gets a consistent, WCAG-friendly focus indicator.
 */
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';
