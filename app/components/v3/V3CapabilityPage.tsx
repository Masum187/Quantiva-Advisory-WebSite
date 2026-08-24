import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { ServiceOverview } from '../../lib/data/servicesOverview';
import { v3Path, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3CapabilityPage({
  locale,
  service,
}: {
  locale: V3Locale;
  service: ServiceOverview;
}) {
  const stages = locale === 'de'
    ? [
        ['Analyse', 'Zielbild, Systemgrenzen, Risiken und Abhängigkeiten in ein gemeinsames Lagebild bringen.'],
        ['Design', 'Governance, Architekturentscheidungen und prüfbare Qualitätskriterien definieren.'],
        ['Umsetzung', 'Fortschritt führen, Evidenz sichern und Abweichungen früh entscheidbar machen.'],
        ['Übergabe', 'Ownership, Wissen und offene Punkte kontrolliert in den Betrieb überführen.'],
      ]
    : [
        ['Analyse', 'Bring objectives, system boundaries, risks, and dependencies into one shared view.'],
        ['Design', 'Define governance, architecture decisions, and verifiable quality criteria.'],
        ['Execute', 'Lead progress, secure evidence, and surface deviations early for decisions.'],
        ['Handover', 'Transfer ownership, knowledge, and open actions into operations with control.'],
      ];

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={`${locale === 'de' ? 'Leistung' : 'Capability'} · ${service.tags.join(' · ')}`}
      title={service.title}
      intro={service.description}
      sectionLabel={service.title}
    >
      <section className="v3-editorial-split" aria-labelledby="v3-capability-scope">
        <p className="v3-section-index">01 / Scope</p>
        <div>
          <h2 id="v3-capability-scope">
            {locale === 'de' ? 'Vom Zielbild bis zur kontrollierten Übergabe.' : 'From target state to controlled handover.'}
          </h2>
          <p className="v3-lead-copy">
            {locale === 'de'
              ? 'Wir schneiden das Mandat entlang der tatsächlichen Entscheidungs- und Delivery-Risiken zu. Methoden, Artefakte und Taktung folgen dem Programm – nicht umgekehrt.'
              : 'We shape the engagement around actual decision and delivery risks. Methods, artefacts, and cadence follow the programme—not the other way around.'}
          </p>
        </div>
      </section>

      <section className="v3-numbered-section" aria-labelledby="v3-capability-model">
        <div className="v3-section-heading">
          <p className="v3-section-index">02 / Delivery model</p>
          <h2 id="v3-capability-model">
            {locale === 'de' ? 'Vier kontrollierte Übergänge.' : 'Four controlled transitions.'}
          </h2>
        </div>
        <ol className="v3-editorial-rows">
          {stages.map(([title, text], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <nav className="v3-page-actions" aria-label={locale === 'de' ? 'Leistungsnavigation' : 'Capability navigation'}>
        <Link href={v3Path(locale, '/services')} prefetch={false}>
          <ArrowLeft aria-hidden="true" />
          {locale === 'de' ? 'Alle Leistungen' : 'All services'}
        </Link>
        <Link className="v3-primary-link" href={v3Path(locale, '/contact')} prefetch={false}>
          {locale === 'de' ? 'Mandat besprechen' : 'Discuss an engagement'}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </nav>
    </V3PageLayout>
  );
}
