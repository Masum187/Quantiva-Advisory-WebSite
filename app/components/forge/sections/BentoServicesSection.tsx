'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Bot,
  Bug,
  CalendarClock,
  ClipboardCheck,
  Database,
  GraduationCap,
} from 'lucide-react';
import type { PointerEvent } from 'react';
import type { ForgeLocale } from '../../../lib/data/forge-content';
import {
  MOTION_DURATION,
  MOTION_EASE_OUT,
  MOTION_STAGGER,
} from '../../../lib/motion';

const SERVICES = {
  de: [
    {
      number: '01',
      title: 'S/4HANA-Migrationsbegleitung',
      body: 'Strukturierte Begleitung von der Systemanalyse über die Migrationsplanung bis zur kontrollierten Übergabe.',
      detail: 'Systembild · Abhängigkeiten · Freigaben',
      layout: 'lg:col-span-2 lg:row-span-2',
    },
    {
      number: '02',
      title: 'Testmanagement SIT & UAT',
      body: 'Testkonzept, Planung, Durchführung und nachvollziehbare Abnahme.',
      detail: 'SIT · UAT · Teststatus',
      layout: 'lg:col-span-1',
    },
    {
      number: '03',
      title: 'Fehler- und Hypercare-Steuerung',
      body: 'Priorisierung, Verantwortlichkeiten und transparente Nachverfolgung.',
      detail: 'Triage · Lösung · Stabilisierung',
      layout: 'lg:col-span-1',
    },
    {
      number: '04',
      title: 'Cutover-Planung',
      body: 'Integrierter Ablaufplan mit Abhängigkeiten, Entscheidungspunkten und Rückfalloptionen.',
      detail: 'Ablauf · Bereitschaft · Übergabe',
      layout: 'lg:col-span-2',
    },
    {
      number: '05',
      title: 'Testautomatisierung',
      body: 'Gezielte Automatisierung stabiler, wiederkehrender Testabläufe.',
      detail: 'Auswahl · Umsetzung · Betrieb',
      layout: 'lg:col-span-1',
    },
    {
      number: '06',
      title: 'Schulung & Enablement',
      body: 'Rollenbezogene Befähigung für Fachbereiche, Testteams und Betriebsorganisation.',
      detail: 'Rollen · Methoden · Übergabe',
      layout: 'lg:col-span-3',
    },
  ],
  en: [
    {
      number: '01',
      title: 'S/4HANA migration support',
      body: 'Structured support from system analysis and migration planning through to controlled handover.',
      detail: 'System view · Dependencies · Approvals',
      layout: 'lg:col-span-2 lg:row-span-2',
    },
    {
      number: '02',
      title: 'SIT & UAT test management',
      body: 'Test strategy, planning, execution, and traceable acceptance.',
      detail: 'SIT · UAT · Test status',
      layout: 'lg:col-span-1',
    },
    {
      number: '03',
      title: 'Defect and hypercare control',
      body: 'Prioritization, ownership, and transparent follow-up.',
      detail: 'Triage · Resolution · Stabilization',
      layout: 'lg:col-span-1',
    },
    {
      number: '04',
      title: 'Cutover planning',
      body: 'Integrated runbook with dependencies, decision points, and fallback options.',
      detail: 'Sequence · Readiness · Handover',
      layout: 'lg:col-span-2',
    },
    {
      number: '05',
      title: 'Test automation',
      body: 'Targeted automation of stable, repeatable test flows.',
      detail: 'Selection · Delivery · Operations',
      layout: 'lg:col-span-1',
    },
    {
      number: '06',
      title: 'Training & enablement',
      body: 'Role-based enablement for business teams, test teams, and operations.',
      detail: 'Roles · Methods · Handover',
      layout: 'lg:col-span-3',
    },
  ],
} as const;

const SERVICE_ICONS = [
  Database,
  ClipboardCheck,
  Bug,
  CalendarClock,
  Bot,
  GraduationCap,
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_STAGGER.children,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 1, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.reveal,
      ease: MOTION_EASE_OUT,
    },
  },
  hover: {
    y: -2,
    transition: {
      duration: MOTION_DURATION.fast,
      ease: MOTION_EASE_OUT,
    },
  },
};

const iconVariants: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 4,
    scale: 1.06,
    transition: {
      duration: MOTION_DURATION.fast,
      ease: MOTION_EASE_OUT,
    },
  },
};

function updateGlowPosition(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`);
}

export default function BentoServicesSection({ locale }: { locale: ForgeLocale }) {
  const reduceMotion = useReducedMotion();
  const services = SERVICES[locale];

  return (
    <section
      className="forge-section border-t border-[var(--forge-line)]"
      aria-labelledby="bento-services-title"
    >
      <div className="forge-container">
        <div className="max-w-3xl">
          <p className="forge-meta">
            {locale === 'de' ? 'Leistungen' : 'Services'}
          </p>
          <h2
            id="bento-services-title"
            className="forge-headline mt-4 text-balance text-[clamp(2.25rem,5vw,4.5rem)]"
          >
            {locale === 'de'
              ? 'Steuerung dort, wo Transformationen kippen können.'
              : 'Control where transformations are most at risk.'}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--forge-muted)]">
            {locale === 'de'
              ? 'Quantiva verbindet SAP-Transformation und Testmanagement zu einem durchgängigen Liefermodell.'
              : 'Quantiva connects SAP transformation and test management in one continuous delivery model.'}
          </p>
        </div>

        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(11rem,auto))]"
        >
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[index];
            return (
              <motion.article
                key={service.number}
                variants={reduceMotion ? undefined : cardVariants}
                whileHover={reduceMotion ? undefined : 'hover'}
                onPointerMove={updateGlowPosition}
                className={`forge-bento-card group ${service.layout}`}
              >
                <div className="relative z-10 flex h-full min-h-52 flex-col p-6 lg:min-h-0 lg:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <p className="forge-meta text-[var(--accent)]">
                      {service.number}
                    </p>
                    <motion.span
                      variants={reduceMotion ? undefined : iconVariants}
                      className="grid size-11 shrink-0 place-items-center rounded-xl border border-[var(--forge-line-strong)] bg-[rgba(255,255,255,0.025)] text-[var(--forge-muted)] group-hover:border-[rgba(79,143,255,0.32)] group-hover:text-[var(--accent)]"
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </motion.span>
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className="max-w-[18ch] break-words text-[clamp(1.35rem,2vw,2rem)] font-medium leading-tight tracking-[-0.04em]">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--forge-muted)]">
                      {service.body}
                    </p>
                    <p className="mt-5 text-[0.68rem] uppercase tracking-[0.13em] text-[var(--forge-faint)]">
                      {service.detail}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
