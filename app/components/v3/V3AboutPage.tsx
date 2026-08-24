import content from '../../lib/data/content.json';
import { V3_PAGES, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3AboutPage({ locale }: { locale: V3Locale }) {
  const page = V3_PAGES[locale].about;
  const about = content.about[locale];
  const values = content.values[locale].items;
  const principles = locale === 'de'
    ? [
        ['Kontext', 'Wir beginnen mit Abhängigkeiten, Entscheidungswegen und realen Betriebsbedingungen.'],
        ['Evidenz', 'Fortschritt wird durch prüfbare Ergebnisse sichtbar, nicht durch Statusfarben allein.'],
        ['Ownership', 'Jede kritische Entscheidung hat eine verantwortliche Person und einen nächsten Schritt.'],
      ]
    : [
        ['Context', 'We begin with dependencies, decision paths, and real operating conditions.'],
        ['Evidence', 'Progress becomes visible through verifiable outcomes, not status colours alone.'],
        ['Ownership', 'Every critical decision has an accountable owner and a next step.'],
      ];

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sectionLabel={locale === 'de' ? 'Über uns' : 'About'}
    >
      <section className="v3-editorial-split" aria-labelledby="v3-about-position">
        <p className="v3-section-index">01 / {locale === 'de' ? 'Position' : 'Position'}</p>
        <div>
          <h2 id="v3-about-position">{about.title}</h2>
          <p className="v3-lead-copy">{about.text}</p>
        </div>
      </section>

      <section className="v3-numbered-section" aria-labelledby="v3-about-principles">
        <div className="v3-section-heading">
          <p className="v3-section-index">02 / {locale === 'de' ? 'Arbeitsweise' : 'Working model'}</p>
          <h2 id="v3-about-principles">
            {locale === 'de' ? 'Drei Regeln für belastbare Delivery.' : 'Three rules for resilient delivery.'}
          </h2>
        </div>
        <ol className="v3-editorial-rows">
          {principles.map(([title, text], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="v3-card-grid" aria-labelledby="v3-about-values">
        <div className="v3-section-heading">
          <p className="v3-section-index">03 / {content.values[locale].title}</p>
          <h2 id="v3-about-values">
            {locale === 'de' ? 'Werte werden in Entscheidungen sichtbar.' : 'Values become visible in decisions.'}
          </h2>
        </div>
        <div className="v3-typographic-grid">
          {values.map((value, index) => (
            <article key={value.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>
    </V3PageLayout>
  );
}
