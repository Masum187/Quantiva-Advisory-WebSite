'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ForgeLocale } from '../../../lib/data/forge-content';
import Reveal from '../motion/Reveal';

const PROCESS_STEPS = {
  de: [
    {
      number: '01',
      title: 'Zielbild',
      body: 'Umfang, Systemgrenzen, Rollen und Entscheidungswege werden gemeinsam festgelegt.',
    },
    {
      number: '02',
      title: 'Testkonzept',
      body: 'Teststufen, Abdeckung, Umgebungen und Freigabekriterien werden konkretisiert.',
    },
    {
      number: '03',
      title: 'SIT & UAT',
      body: 'Durchführung, Status und Fehlerbehandlung laufen in einem abgestimmten Rhythmus.',
    },
    {
      number: '04',
      title: 'Cutover',
      body: 'Ablauf, Abhängigkeiten und Entscheidungspunkte werden in einem Runbook gebündelt.',
    },
    {
      number: '05',
      title: 'Hypercare',
      body: 'Stabilisierung, offene Punkte und Verantwortlichkeiten werden dokumentiert übergeben.',
    },
  ],
  en: [
    {
      number: '01',
      title: 'Target state',
      body: 'Scope, system boundaries, roles, and decision paths are defined together.',
    },
    {
      number: '02',
      title: 'Test strategy',
      body: 'Test levels, coverage, environments, and acceptance criteria are made concrete.',
    },
    {
      number: '03',
      title: 'SIT & UAT',
      body: 'Execution, status, and defect handling follow one aligned delivery rhythm.',
    },
    {
      number: '04',
      title: 'Cutover',
      body: 'Sequence, dependencies, and decision points are consolidated in one runbook.',
    },
    {
      number: '05',
      title: 'Hypercare',
      body: 'Stabilization, open items, and ownership are documented and handed over.',
    },
  ],
} as const;

export default function ProcessTimelineSection({ locale }: { locale: ForgeLocale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const steps = PROCESS_STEPS[locale];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--forge-line)]"
      aria-label={locale === 'de' ? 'Projektverlauf' : 'Project flow'}
    >
      <div className="forge-container py-20 lg:hidden">
        <p className="forge-meta">{locale === 'de' ? 'Projektverlauf' : 'Project flow'}</p>
        <h2 className="forge-headline mt-4 text-[clamp(2.25rem,10vw,3.5rem)]">
          {locale === 'de'
            ? 'Ein durchgängiger Weg bis in den Betrieb.'
            : 'One continuous path into operations.'}
        </h2>
        <div className="relative mt-12 space-y-10 border-l border-[var(--forge-line)] pl-7">
          {steps.map((step) => (
            <Reveal key={step.number}>
              <article className="relative">
                <span className="absolute -left-[2.05rem] top-1 size-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" />
                <p className="forge-meta text-[var(--accent)]">{step.number}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--forge-muted)]">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative hidden h-[220vh] lg:block motion-reduce:h-auto">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:py-28">
          <div className="forge-grid-bg pointer-events-none absolute inset-0 opacity-40" />
          <div className="forge-container relative">
            <div className="max-w-3xl">
              <p className="forge-meta">
                {locale === 'de' ? 'Projektverlauf' : 'Project flow'}
              </p>
              <h2 className="forge-headline mt-4 text-[clamp(2.5rem,5vw,4.75rem)]">
                {locale === 'de'
                  ? 'Ein durchgängiger Weg bis in den Betrieb.'
                  : 'One continuous path into operations.'}
              </h2>
            </div>

            <motion.div
              style={reduceMotion ? undefined : { x }}
              className="mt-16 flex w-max gap-4 motion-reduce:w-full motion-reduce:flex-wrap"
            >
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="forge-panel flex min-h-72 w-[28rem] shrink-0 flex-col p-7 motion-reduce:w-[calc(33.333%-0.75rem)]"
                >
                  <div className="flex items-center justify-between border-b border-[var(--forge-line)] pb-5">
                    <p className="forge-meta text-[var(--accent)]">{step.number}</p>
                    <span className="size-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" />
                  </div>
                  <div className="mt-auto pt-10">
                    <h3 className="text-3xl font-medium tracking-[-0.04em]">{step.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--forge-muted)]">
                      {step.body}
                    </p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
