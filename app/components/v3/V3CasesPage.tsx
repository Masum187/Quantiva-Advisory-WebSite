import { V3_PAGES, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3CasesPage({ locale }: { locale: V3Locale }) {
  const page = V3_PAGES[locale].cases;
  const cases = locale === 'de'
    ? [
        ['S/4HANA Quality Gate', 'SAP Transformation', 'Ein unabhängiges Lagebild verbindet Readiness, Risiken, Entscheidungen und belastbare Freigabekriterien.'],
        ['SIT/UAT Command Center', 'Test & Evidence', 'Planung, Ausführung, Defects und Abnahmen werden in einem gemeinsamen Steuerungsrhythmus geführt.'],
        ['Integrated Cutover Control', 'Go-live & Transition', 'Abhängigkeiten, Runbook, Entscheidungswege und Business Readiness werden bis zur Übergabe synchronisiert.'],
        ['Hypercare Stabilisierung', 'Operations Handover', 'Triage, Priorisierung und Knowledge Transfer schaffen eine kontrollierte Bewegung in den Regelbetrieb.'],
        ['Cloud Guardrail Design', 'Cloud & Governance', 'Plattformteams erhalten klare Leitplanken für Delivery, Kostenkontrolle, Sicherheit und Audit-Evidenz.'],
        ['AI Product Readiness', 'AI & Data Products', 'Use Case, Datenverantwortung, Modellrisiko und Betriebsfähigkeit werden vor Skalierung gemeinsam geprüft.'],
      ]
    : [
        ['S/4HANA Quality Gate', 'SAP transformation', 'An independent view connects readiness, risk, decisions, and resilient release criteria.'],
        ['SIT/UAT Command Centre', 'Test & evidence', 'Planning, execution, defects, and sign-off run through one shared control cadence.'],
        ['Integrated Cutover Control', 'Go-live & transition', 'Dependencies, runbook, decision paths, and business readiness stay synchronised through handover.'],
        ['Hypercare Stabilisation', 'Operations handover', 'Triage, prioritisation, and knowledge transfer create a controlled move into steady-state operations.'],
        ['Cloud Guardrail Design', 'Cloud & governance', 'Platform teams receive clear guardrails for delivery, cost control, security, and audit evidence.'],
        ['AI Product Readiness', 'AI & data products', 'Use case, data ownership, model risk, and operability are assessed together before scaling.'],
      ];

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sectionLabel={locale === 'de' ? 'Projekte' : 'Cases'}
    >
      <section className="v3-numbered-section" aria-labelledby="v3-cases-title">
        <div className="v3-section-heading">
          <p className="v3-section-index">01 / {locale === 'de' ? 'Engagement-Archetypen' : 'Engagement archetypes'}</p>
          <h2 id="v3-cases-title">
            {locale === 'de' ? 'Typische Lagen. Spezifische Steuerung.' : 'Recurring situations. Specific control.'}
          </h2>
        </div>
        <ol className="v3-case-grid">
          {cases.map(([title, category, description], index) => (
            <li key={title}>
              <div>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{category}</p>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
        <p className="v3-disclosure">
          {locale === 'de'
            ? 'Alle Darstellungen sind anonymisierte Mandatstypen. Es werden keine Kundenbeziehungen, Kennzahlen oder Referenzen behauptet.'
            : 'All representations are anonymised engagement types. No client relationships, metrics, or endorsements are claimed.'}
        </p>
      </section>
    </V3PageLayout>
  );
}
