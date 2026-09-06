import {
  Video,
  MessagesSquare,
  Coffee,
  BadgeCheck,
  type LucideIcon,
} from 'lucide-react';

export type Lang = 'de' | 'en';

export interface CareerThemeProps {
  lang: Lang;
}

export const localePath = (lang: Lang, p: string) => `/${lang}${p}`;

export const APPLY_MAILTO = 'mailto:careers@quantiva-advisory.com';

export function getNavigationItems(lang: Lang) {
  return [
    { id: 'home', label: 'Home', href: localePath(lang, '/') },
    { id: 'about', label: lang === 'de' ? 'Über uns' : 'About', href: localePath(lang, '/about') },
    { id: 'services', label: 'Services', href: localePath(lang, '/#services') },
    { id: 'cases', label: lang === 'de' ? 'Projekte' : 'Cases', href: localePath(lang, '/cases') },
    { id: 'team', label: 'Team', href: localePath(lang, '/team') },
    { id: 'career', label: lang === 'de' ? 'Karriere' : 'Career', href: localePath(lang, '/career') },
  ];
}

export interface CareerUiStrings {
  back: string;
  ctaPositions: string;
  ctaApply: string;
  topicsTitle: string;
  topicsSubtitle: string;
  stackTitle: string;
  rolesTitle: string;
  rolesSubtitle: string;
  processTitle: string;
  processSubtitle: string;
  processNote: string;
  finalTitle: string;
  finalSubtitle: string;
}

export function getUiStrings(lang: Lang, areaTitle: string): CareerUiStrings {
  return {
    back: lang === 'de' ? 'Zurück zur Karriere' : 'Back to career',
    ctaPositions: lang === 'de' ? 'Offene Stellen ansehen' : 'View open positions',
    ctaApply: lang === 'de' ? 'Direkt bewerben' : 'Apply directly',
    topicsTitle: lang === 'de' ? 'Woran du arbeitest' : 'What you work on',
    topicsSubtitle:
      lang === 'de'
        ? 'Konkrete Arbeitsfelder statt Buzzwords – das erwartet dich im Projektalltag.'
        : 'Concrete fields of work instead of buzzwords – this is what your project life looks like.',
    stackTitle: lang === 'de' ? 'Dein Tech Stack' : 'Your tech stack',
    rolesTitle: lang === 'de' ? 'Beispiel-Rollen' : 'Example roles',
    rolesSubtitle:
      lang === 'de'
        ? 'Vom Einstieg bis zur Lead-Rolle – so kannst du bei uns arbeiten.'
        : 'From entry level to lead – these are ways to work with us.',
    processTitle: lang === 'de' ? 'Dein Weg zu uns' : 'Your path to us',
    processSubtitle:
      lang === 'de'
        ? 'Kein Assessment-Center, keine Endlos-Schleifen – ein schneller, transparenter Prozess.'
        : 'No assessment center, no endless loops – a fast, transparent process.',
    processNote:
      lang === 'de'
        ? 'Gesamter Prozess in unter 2 Wochen · Bewerbung ohne Anschreiben – CV oder LinkedIn-Profil genügt.'
        : 'Entire process in under 2 weeks · No cover letter needed – your CV or LinkedIn profile is enough.',
    finalTitle: lang === 'de' ? 'Bereit für den nächsten Schritt?' : 'Ready for your next step?',
    finalSubtitle:
      lang === 'de'
        ? `Werde Teil des ${areaTitle}-Teams bei Quantiva Advisory und gestalte die digitale Zukunft des Mittelstands mit.`
        : `Join the ${areaTitle} team at Quantiva Advisory and help shape the digital future of the Mittelstand.`,
  };
}

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function getProcessSteps(lang: Lang): ProcessStep[] {
  return lang === 'de'
    ? [
        {
          icon: Video,
          title: 'Kennenlernen',
          description:
            '30 Minuten Video-Call – wir melden uns innerhalb von 48 Stunden nach deiner Bewerbung.',
        },
        {
          icon: MessagesSquare,
          title: 'Fachgespräch',
          description:
            'Deep-Dive mit dem Team: ein praxisnaher Case aus unserem Projektalltag statt Assessment-Center.',
        },
        {
          icon: Coffee,
          title: 'Team-Match',
          description:
            'Kaffee oder Video-Call mit deinen künftigen Kolleg:innen – du lernst das Team kennen, bevor du zusagst.',
        },
        {
          icon: BadgeCheck,
          title: 'Angebot',
          description:
            'Entscheidung innerhalb von 5 Tagen – mit einem transparenten Gehaltspaket ohne Verhandlungspoker.',
        },
      ]
    : [
        {
          icon: Video,
          title: 'First meeting',
          description:
            'A 30-minute video call – we get back to you within 48 hours of your application.',
        },
        {
          icon: MessagesSquare,
          title: 'Technical interview',
          description:
            'A deep dive with the team: a hands-on case from our real project work instead of an assessment center.',
        },
        {
          icon: Coffee,
          title: 'Team match',
          description:
            'Coffee or a video call with your future colleagues – you meet the team before you commit.',
        },
        {
          icon: BadgeCheck,
          title: 'Offer',
          description:
            'A decision within 5 days – with a transparent salary package and no negotiation games.',
        },
      ];
}

/* ------------------------------------------------------------------ */
/* Motion presets – all disabled when the user prefers reduced motion */
/* ------------------------------------------------------------------ */

export type Dir = 'left' | 'right' | 'up' | 'down';

const dirOffset: Record<Dir, { x: number; y: number }> = {
  left: { x: -90, y: 0 },
  right: { x: 90, y: 0 },
  up: { x: 0, y: 90 },
  down: { x: 0, y: -90 },
};

/**
 * Build the scroll-reveal presets used across all career-area themes.
 * Pass the result of `useReducedMotion()` – every preset degrades to a
 * static (no-movement) variant when reduced motion is preferred.
 */
export function makeMotionPresets(prefersReducedMotion: boolean) {
  // Simple fade/slide-up reveal
  const reveal = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: 'easeOut' as const },
  } as const;

  // Directional slide + zoom entrance
  const slideZoom = (dir: Dir, delay = 0) =>
    ({
      initial: prefersReducedMotion
        ? { opacity: 1, x: 0, y: 0, scale: 1 }
        : { opacity: 0, scale: 0.85, ...dirOffset[dir] },
      whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
    }) as const;

  // Dramatic zoom-in (hero headline, CTA panels)
  const zoomIn = (delay = 0) =>
    ({
      initial: prefersReducedMotion
        ? { opacity: 1, scale: 1 }
        : { opacity: 0, scale: 0.8, y: 24 },
      whileInView: { opacity: 1, scale: 1, y: 0 },
      viewport: { once: true, margin: '-60px' },
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
    }) as const;

  // Pop-in variant for chips/badges (use inside a staggered container)
  const popItem = {
    hidden: prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 260, damping: 18 },
    },
  } as const;

  // Container variants for staggered pop-in children
  const popContainer = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion ? {} : { staggerChildren: 0.06 },
    },
  } as const;

  return { reveal, slideZoom, zoomIn, popItem, popContainer };
}
