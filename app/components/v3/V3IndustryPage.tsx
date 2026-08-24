import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { IndustryShowcase } from '../../lib/data/industries';
import { v3Path, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3IndustryPage({
  locale,
  industry,
}: {
  locale: V3Locale;
  industry: IndustryShowcase;
}) {
  const lenses = locale === 'de'
    ? [
        ['Betrieb', 'Kritische Prozesse, Verfügbarkeitsanforderungen und Übergabefenster bestimmen das Vorgehen.'],
        ['Kontrolle', 'Regulatorik, Evidenz und Freigaben werden direkt in das Delivery-Modell integriert.'],
        ['Veränderung', 'Technologie, Prozesse und Adoption werden als zusammenhängende Übergänge gesteuert.'],
      ]
    : [
        ['Operations', 'Critical processes, availability requirements, and transition windows shape the approach.'],
        ['Control', 'Regulation, evidence, and approvals are integrated directly into the delivery model.'],
        ['Change', 'Technology, process, and adoption are controlled as connected transitions.'],
      ];

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={`${locale === 'de' ? 'Branche' : 'Industry'} · ${industry.description}`}
      title={industry.title}
      intro={locale === 'de'
        ? 'Wir verbinden Branchenkontext mit einem kontrollierten Transformationsmodell – ohne externe Bildwelten oder generische Blaupausen.'
        : 'We connect industry context with a controlled transformation model—without external imagery or generic blueprints.'}
      sectionLabel={industry.title}
    >
      <section className="v3-industry-detail" aria-labelledby="v3-industry-context">
        <div className="v3-industry-detail-signal" aria-hidden="true">
          <span>{industry.slug.replaceAll('-', ' / ')}</span>
        </div>
        <div>
          <p className="v3-section-index">01 / Context</p>
          <h2 id="v3-industry-context">
            {locale === 'de' ? 'Kontext wird zur Steuerungslogik.' : 'Context becomes control logic.'}
          </h2>
          <p className="v3-lead-copy">
            {locale === 'de'
              ? `Für ${industry.title} übersetzen wir ${industry.description} in klare Verantwortungen, Qualitätskriterien und belastbare Übergaben.`
              : `For ${industry.title}, we translate ${industry.description} into clear ownership, quality criteria, and resilient handovers.`}
          </p>
        </div>
      </section>

      <section className="v3-numbered-section" aria-labelledby="v3-industry-lenses">
        <div className="v3-section-heading">
          <p className="v3-section-index">02 / {locale === 'de' ? 'Drei Perspektiven' : 'Three lenses'}</p>
          <h2 id="v3-industry-lenses">
            {locale === 'de' ? 'Was jedes Mandat strukturieren muss.' : 'What every engagement must structure.'}
          </h2>
        </div>
        <ol className="v3-editorial-rows">
          {lenses.map(([title, text], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <nav className="v3-page-actions" aria-label={locale === 'de' ? 'Branchennavigation' : 'Industry navigation'}>
        <Link href={v3Path(locale, '/industries')} prefetch={false}>
          <ArrowLeft aria-hidden="true" />
          {locale === 'de' ? 'Alle Branchen' : 'All industries'}
        </Link>
        <Link className="v3-primary-link" href={v3Path(locale, '/contact')} prefetch={false}>
          {locale === 'de' ? 'Kontext besprechen' : 'Discuss your context'}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </nav>
    </V3PageLayout>
  );
}
