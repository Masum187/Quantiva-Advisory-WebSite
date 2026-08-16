'use client';

import Link from 'next/link';
import { industriesDe, industriesEn } from '../../lib/data/industries';
import { ForgeLocale, forgePath } from '../../lib/data/forge-content';
import ForgePageLayout from './ForgePageLayout';

type Props = {
  locale: ForgeLocale;
  slug: string;
};

export default function ForgeIndustryPage({ locale, slug }: Props) {
  const list = locale === 'de' ? industriesDe : industriesEn;
  const industry = list.find((i) => i.slug === slug);

  if (!industry) {
    return (
      <ForgePageLayout
        locale={locale}
        eyebrow="INDUSTRY"
        title={locale === 'de' ? 'Branche nicht gefunden' : 'Industry not found'}
      >
        <div className="forge-container">
          <Link href={forgePath(locale, '/services')} className="text-[var(--forge-muted)]">
            ← Services
          </Link>
        </div>
      </ForgePageLayout>
    );
  }

  return (
    <ForgePageLayout
      locale={locale}
      eyebrow="INDUSTRY"
      title={industry.title}
      lead={industry.description}
      ctaHref="/contact"
      ctaLabel={locale === 'de' ? 'Branchenprojekt anfragen' : 'Inquire'}
    >
      <div className="forge-container grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="forge-meta text-[var(--forge-signal)]">
            {industry.projects}+ {locale === 'de' ? 'Projekte' : 'projects'}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--forge-muted)]">
            {locale === 'de'
              ? 'Wir kennen die Regulierungs- und Delivery-Realität dieser Branche — und liefern SAP-, Cloud- und KI-Vorhaben entsprechend.'
              : 'We know the regulatory and delivery reality of this industry — and ship SAP, cloud, and AI work accordingly.'}
          </p>
          <ol className="mt-10 space-y-0">
            {(locale === 'de'
              ? [
                  'Branchenspezifische Prozesskenntnis',
                  'Compliance und Audit-Pfade',
                  'Integration in bestehende Landschaften',
                  'Enablement für Fachbereiche',
                ]
              : [
                  'Industry-specific process knowledge',
                  'Compliance and audit paths',
                  'Integration into existing landscapes',
                  'Enablement for business teams',
                ]
            ).map((point, i) => (
              <li key={point} className="flex gap-5 border-t border-[var(--forge-line)] py-5">
                <span className="forge-meta w-10 text-[var(--forge-signal)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-lg">{point}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="h-fit rounded-2xl border border-[var(--forge-line)] bg-[var(--forge-bg-elevated)] p-6">
          <p className="forge-meta">Also explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            {list
              .filter((i) => i.slug !== slug)
              .map((i) => (
                <Link
                  key={i.slug}
                  href={forgePath(locale, `/industries/${i.slug}`)}
                  className="text-[var(--forge-muted)] hover:text-[var(--forge-ink)]"
                >
                  {i.title}
                </Link>
              ))}
          </div>
        </aside>
      </div>
    </ForgePageLayout>
  );
}
