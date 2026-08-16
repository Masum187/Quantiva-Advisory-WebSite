'use client';

import Link from 'next/link';
import casesData from '../../lib/data/cases.json';
import { ForgeLocale, forgePath } from '../../lib/data/forge-content';
import ForgePageLayout from './ForgePageLayout';

type CaseItem = {
  slug: string;
  titleDe: string;
  titleEn: string;
  subtitleDe: string;
  subtitleEn: string;
  industry: string;
  category: string;
};

export default function ForgeCasesPage({ locale }: { locale: ForgeLocale }) {
  const items = (casesData as CaseItem[]).slice(0, 12);

  return (
    <ForgePageLayout
      locale={locale}
      eyebrow="CASES"
      title={locale === 'de' ? 'Ausgewählte Projekte.' : 'Selected work.'}
      lead={
        locale === 'de'
          ? 'Ergebnisse statt Broschüren. Eine kurze Auswahl.'
          : 'Outcomes over brochures. A short selection.'
      }
      ctaHref="/contact"
      ctaLabel={locale === 'de' ? 'Ähnliches anfragen' : 'Ask for similar'}
    >
      <div className="forge-container">
        <ul className="divide-y divide-[var(--forge-line)] border-y border-[var(--forge-line)]">
          {items.map((item, index) => {
            const title = locale === 'de' ? item.titleDe : item.titleEn;
            const body = locale === 'de' ? item.subtitleDe : item.subtitleEn;
            return (
              <li key={item.slug} className="py-8">
                <p className="forge-meta text-[var(--forge-signal)]">
                  {String(index + 1).padStart(2, '0')} · {item.industry} · {item.category}
                </p>
                <h2 className="mt-3 text-2xl tracking-tight md:text-3xl">{title}</h2>
                <p className="mt-3 max-w-3xl text-[var(--forge-muted)] leading-relaxed">{body}</p>
              </li>
            );
          })}
        </ul>
        <Link
          href={forgePath(locale, '/contact')}
          className="mt-10 inline-block text-sm text-[var(--forge-muted)] hover:text-[var(--forge-ink)]"
        >
          {locale === 'de' ? 'Projekt besprechen →' : 'Discuss a project →'}
        </Link>
      </div>
    </ForgePageLayout>
  );
}
