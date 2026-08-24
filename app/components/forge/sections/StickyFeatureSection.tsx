'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { ScanSearch, ShieldCheck, Waypoints } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ForgeLocale } from '../../../lib/data/forge-content';
import { MOTION_DURATION, MOTION_EASE_OUT } from '../../../lib/motion';
import Reveal from '../motion/Reveal';

const SECTION_STEPS = {
  de: [
    {
      number: '01',
      title: 'Analysieren',
      body: 'Prozesse, Systemlandschaft und vorhandene Testabdeckung werden gemeinsam aufgenommen. Daraus entsteht ein belastbares Bild von Abhängigkeiten und Risiken.',
      visualTitle: 'System- und Testbild',
      rows: [
        { label: 'Prozesse', status: 'Aufgenommen' },
        { label: 'Schnittstellen', status: 'Zugeordnet' },
        { label: 'Testabdeckung', status: 'Bewertet' },
      ],
    },
    {
      number: '02',
      title: 'Absichern',
      body: 'Testkonzept, SIT- und UAT-Steuerung sowie Fehlerbehandlung werden in einem klaren Delivery-Rhythmus zusammengeführt.',
      visualTitle: 'Teststeuerung',
      rows: [
        { label: 'SIT', status: 'Gesteuert' },
        { label: 'UAT', status: 'Abgestimmt' },
        { label: 'Fehler', status: 'Priorisiert' },
      ],
    },
    {
      number: '03',
      title: 'Übergeben',
      body: 'Cutover, Hypercare und dokumentierte Freigaben sichern den Übergang in den Betrieb — mit klaren Verantwortlichkeiten.',
      visualTitle: 'Betriebsübergang',
      rows: [
        { label: 'Cutover', status: 'Orchestriert' },
        { label: 'Freigabe', status: 'Dokumentiert' },
        { label: 'Hypercare', status: 'Übergeben' },
      ],
    },
  ],
  en: [
    {
      number: '01',
      title: 'Analyze',
      body: 'Processes, system landscape, and existing test coverage are assessed together to create a reliable view of dependencies and risks.',
      visualTitle: 'System and test view',
      rows: [
        { label: 'Processes', status: 'Captured' },
        { label: 'Interfaces', status: 'Mapped' },
        { label: 'Test coverage', status: 'Assessed' },
      ],
    },
    {
      number: '02',
      title: 'Secure',
      body: 'Test strategy, SIT and UAT control, and defect handling are brought together in one clear delivery rhythm.',
      visualTitle: 'Test control',
      rows: [
        { label: 'SIT', status: 'Controlled' },
        { label: 'UAT', status: 'Aligned' },
        { label: 'Defects', status: 'Prioritized' },
      ],
    },
    {
      number: '03',
      title: 'Hand over',
      body: 'Cutover, hypercare, and documented approvals secure the transition into operations with clear ownership.',
      visualTitle: 'Operational handover',
      rows: [
        { label: 'Cutover', status: 'Orchestrated' },
        { label: 'Approval', status: 'Documented' },
        { label: 'Hypercare', status: 'Handed over' },
      ],
    },
  ],
} as const;

const STEP_ICONS = [ScanSearch, ShieldCheck, Waypoints] as const;
const STEP_COUNT = 3;

type Step = (typeof SECTION_STEPS)[ForgeLocale][number];

function renderStepVisual(step: Step, index: number, locale: ForgeLocale) {
  const Icon = STEP_ICONS[index];

  return (
    <div
      className="forge-panel relative overflow-hidden p-5 sm:p-7"
      role="img"
      aria-label={`${locale === 'de' ? 'Beispielansicht' : 'Example view'}: ${step.visualTitle}`}
    >
      <div className="forge-grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">
        <div className="flex items-start justify-between gap-6 border-b border-[var(--forge-line)] pb-5">
          <div>
            <p className="forge-meta">
              {locale === 'de' ? 'Beispielansicht' : 'Example view'}
            </p>
            <h3 className="mt-2 text-xl font-medium tracking-[-0.03em]">
              {step.visualTitle}
            </h3>
          </div>
          <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-[rgba(79,143,255,0.3)] bg-[rgba(79,143,255,0.1)] text-[var(--accent)]">
            <Icon className="size-5" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {step.rows.map((row, rowIndex) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-5 rounded-xl border border-[var(--forge-line)] bg-[rgba(255,255,255,0.02)] px-4 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[var(--forge-line-strong)] text-[0.65rem] text-[var(--forge-faint)]">
                  {rowIndex + 1}
                </span>
                <span className="truncate text-sm text-[var(--forge-ink)]">
                  {row.label}
                </span>
              </div>
              <span className="forge-chip shrink-0 border-[rgba(79,143,255,0.24)] text-[var(--accent)]">
                {row.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-[rgba(79,143,255,0.22)] bg-[rgba(79,143,255,0.07)] px-4 py-3">
          <span className="size-2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent-glow)]" />
          <span className="text-xs tracking-wide text-[var(--forge-muted)]">
            {locale === 'de'
              ? 'Nachvollziehbar dokumentiert'
              : 'Documented and traceable'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StickyFeatureSection({ locale }: { locale: ForgeLocale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const steps = SECTION_STEPS[locale];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIndex = Math.min(
      STEP_COUNT - 1,
      Math.floor(progress * STEP_COUNT),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeStep = steps[activeIndex];
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: MOTION_DURATION.base, ease: MOTION_EASE_OUT };

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--forge-line)]"
      aria-label={locale === 'de' ? 'Delivery-Modell' : 'Delivery model'}
      data-active-step={activeIndex}
    >
      <div className="forge-container py-20 lg:hidden">
        <p className="forge-meta">
          {locale === 'de' ? 'Delivery-Modell' : 'Delivery model'}
        </p>
        <h2
          className="forge-headline mt-4 max-w-[15ch] text-[clamp(2.25rem,10vw,3.5rem)]"
        >
          {locale === 'de'
            ? 'Drei Schritte. Ein kontrollierter Übergang.'
            : 'Three steps. One controlled transition.'}
        </h2>

        <div className="mt-14 space-y-16">
          {steps.map((step, index) => (
            <Reveal key={step.number}>
              <article>
                <p className="forge-meta text-[var(--accent)]">{step.number}</p>
                <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em]">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--forge-muted)]">
                  {step.body}
                </p>
                <div className="mt-7">
                  {renderStepVisual(step, index, locale)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="forge-grid-bg pointer-events-none absolute inset-0 opacity-40" />
          <div className="forge-container relative grid grid-cols-[2.5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] items-center gap-12 xl:gap-20">
            <div className="flex flex-col items-center gap-3" aria-hidden="true">
              {steps.map((step, index) => (
                <div key={step.number} className="relative h-14 w-px bg-[var(--forge-line)]">
                  <motion.span
                    className="absolute inset-0 origin-top bg-[var(--accent)]"
                    animate={{ scaleY: index === activeIndex ? 1 : 0 }}
                    transition={transition}
                  />
                </div>
              ))}
            </div>

            <div>
              <p className="forge-meta">
                {locale === 'de' ? 'Delivery-Modell' : 'Delivery model'}
              </p>
              <h2
                className="forge-headline mt-4 max-w-[13ch] text-[clamp(2.5rem,4vw,4.75rem)]"
              >
                {locale === 'de'
                  ? 'Von der Analyse bis zur sicheren Übergabe.'
                  : 'From analysis to a secure handover.'}
              </h2>

              <div className="mt-12 min-h-52">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article
                    key={activeStep.number}
                    initial={reduceMotion ? false : { opacity: 1, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                    transition={transition}
                  >
                    <p className="forge-meta text-[var(--accent)]">
                      {activeStep.number}
                    </p>
                    <h3 className="mt-4 text-4xl font-medium tracking-[-0.04em]">
                      {activeStep.title}
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--forge-muted)]">
                      {activeStep.body}
                    </p>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>

            <div className="min-h-[28rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeStep.number}
                  initial={reduceMotion ? false : { opacity: 1, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={transition}
                >
                  {renderStepVisual(activeStep, activeIndex, locale)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
