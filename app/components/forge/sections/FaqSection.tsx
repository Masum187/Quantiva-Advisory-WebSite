'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { ForgeLocale } from '../../../lib/data/forge-content';

const FAQ_ITEMS = {
  de: [
    {
      question: 'Wann sollte das Testmanagement in einer S/4HANA-Transformation starten?',
      answer:
        'Sobald Umfang, Prozessverantwortung und Systemgrenzen konkretisiert werden. Frühe Einbindung verhindert, dass Testdaten, Umgebungen und Abhängigkeiten erst kurz vor der Durchführung sichtbar werden.',
    },
    {
      question: 'Wie trennt Quantiva SIT und UAT?',
      answer:
        'SIT prüft das integrierte Zusammenspiel von Prozessen und Systemen. UAT bestätigt die fachliche Nutzbarkeit durch die verantwortlichen Fachbereiche. Beide Stufen erhalten eigene Ziele, Kriterien und Freigaben.',
    },
    {
      question: 'Übernimmt Quantiva auch die Fehlersteuerung?',
      answer:
        'Ja. Dazu gehören Triage, Priorisierung, Verantwortungszuordnung, Statusführung und die Vorbereitung belastbarer Entscheidungen.',
    },
    {
      question: 'Was gehört zu einer kontrollierten Cutover-Planung?',
      answer:
        'Ein abgestimmter Ablaufplan mit Abhängigkeiten, Verantwortlichen, Entscheidungspunkten, Kommunikationswegen und vorbereiteten Rückfalloptionen.',
    },
    {
      question: 'Kann bestehende Testautomatisierung weiterverwendet werden?',
      answer:
        'Das wird anhand der Prozessstabilität, Wartbarkeit und technischen Eignung bewertet. Automatisiert werden bevorzugt wiederkehrende Abläufe mit dauerhaftem Nutzen.',
    },
  ],
  en: [
    {
      question: 'When should test management start in an S/4HANA transformation?',
      answer:
        'As soon as scope, process ownership, and system boundaries become concrete. Early involvement prevents test data, environments, and dependencies from surfacing shortly before execution.',
    },
    {
      question: 'How does Quantiva separate SIT and UAT?',
      answer:
        'SIT verifies integrated process and system behavior. UAT confirms business usability through accountable business teams. Each level receives its own objectives, criteria, and approvals.',
    },
    {
      question: 'Can Quantiva manage defects as well?',
      answer:
        'Yes. This includes triage, prioritization, ownership, status control, and preparation of reliable decisions.',
    },
    {
      question: 'What belongs in a controlled cutover plan?',
      answer:
        'An aligned runbook with dependencies, owners, decision points, communication paths, and prepared fallback options.',
    },
    {
      question: 'Can existing test automation be reused?',
      answer:
        'It is assessed for process stability, maintainability, and technical fit. Repeatable flows with lasting value are preferred for automation.',
    },
  ],
} as const;

export default function FaqSection({ locale }: { locale: ForgeLocale }) {
  const items = FAQ_ITEMS[locale];

  return (
    <section
      className="forge-section border-t border-[var(--forge-line)]"
      aria-labelledby="faq-title"
    >
      <div className="forge-container grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="forge-meta">FAQ</p>
          <h2
            id="faq-title"
            className="forge-headline mt-4 max-w-[12ch] text-[clamp(2.25rem,5vw,4.25rem)]"
          >
            {locale === 'de' ? 'Klarheit vor dem Start.' : 'Clarity before starting.'}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--forge-muted)]">
            {locale === 'de'
              ? 'Die wichtigsten Fragen zu S/4HANA-Testmanagement und Cutover-Steuerung.'
              : 'Key questions about S/4HANA test management and cutover control.'}
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="border-t border-[var(--forge-line)]">
          {items.map((item, index) => (
            <Accordion.Item
              key={item.question}
              value={`item-${index + 1}`}
              className="border-b border-[var(--forge-line)]"
            >
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="group flex min-h-20 w-full items-center justify-between gap-6 py-5 text-left text-base font-medium tracking-[-0.02em] text-[var(--forge-ink)] outline-none md:text-lg">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="size-5 shrink-0 text-[var(--forge-muted)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content className="forge-accordion-content overflow-hidden text-[var(--forge-muted)]">
                <div className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed md:text-base">
                  {item.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
