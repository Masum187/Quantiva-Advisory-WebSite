'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  FORGE_CAPABILITY_POINTS,
  ForgeLocale,
  forgePath,
} from '../../lib/data/forge-content';
import ForgePageLayout from './ForgePageLayout';

type Props = {
  locale: ForgeLocale;
  slug: string;
  title: string;
  description: string;
  tags?: string[];
};

export default function ForgeCapabilityPage({
  locale,
  slug,
  title,
  description,
  tags = [],
}: Props) {
  const points =
    FORGE_CAPABILITY_POINTS[slug]?.[locale] ?? FORGE_CAPABILITY_POINTS.default[locale];

  return (
    <ForgePageLayout
      locale={locale}
      eyebrow={tags.slice(0, 3).join(' · ') || 'SERVICE'}
      title={title}
      lead={description}
      ctaHref="/contact"
      ctaLabel={locale === 'de' ? 'Projekt anfragen' : 'Inquire'}
    >
      <div className="forge-container grid gap-12 lg:grid-cols-[1fr_0.85fr]">
        <ol className="space-y-0">
          {points.map((point, i) => (
            <li
              key={point}
              className="flex gap-5 border-t border-[var(--forge-line)] py-6"
            >
              <span className="forge-meta w-10 shrink-0 text-[var(--forge-signal)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-lg leading-relaxed text-[var(--forge-ink)]">{point}</p>
            </li>
          ))}
        </ol>
        <aside className="h-fit rounded-2xl border border-[var(--forge-line)] bg-[var(--forge-bg-elevated)] p-6 md:p-8">
          <p className="forge-meta">Next step</p>
          <p className="mt-4 text-xl leading-snug">
            {locale === 'de'
              ? 'Kurz den Kontext skizzieren — wir melden uns mit einem konkreten Vorschlag.'
              : 'Share a short context — we reply with a concrete proposal.'}
          </p>
          <Link href={forgePath(locale, '/contact')} className="forge-cta mt-8">
            {locale === 'de' ? 'Kontakt' : 'Contact'}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={forgePath(locale, '/services')}
            className="mt-4 block text-sm text-[var(--forge-muted)] hover:text-[var(--forge-ink)]"
          >
            ← {locale === 'de' ? 'Alle Services' : 'All services'}
          </Link>
        </aside>
      </div>
    </ForgePageLayout>
  );
}
