'use client';

import contentData from '../../lib/data/content.json';
import { ForgeLocale } from '../../lib/data/forge-content';
import ForgePageLayout from './ForgePageLayout';

export default function ForgeAboutPage({ locale }: { locale: ForgeLocale }) {
  const about = contentData.about[locale];

  return (
    <ForgePageLayout
      locale={locale}
      eyebrow="ABOUT"
      title={about.title.replace(/^Über |^About /, '')}
      lead={about.text}
      ctaHref="/contact"
      ctaLabel={locale === 'de' ? 'Mit uns sprechen' : 'Talk to us'}
    >
      <div className="forge-container grid gap-6 sm:grid-cols-3">
        {Object.values(about.stats).map((stat) => (
          <div key={stat.label} className="border-t border-[var(--forge-line)] pt-6">
            <p className="forge-display text-5xl text-[var(--forge-signal)]">{stat.value}</p>
            <p className="mt-3 text-sm text-[var(--forge-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="forge-container mt-16 max-w-3xl">
        <p className="text-xl leading-relaxed text-[var(--forge-ink)]">
          {locale === 'de'
            ? 'Strategie, Engineering und Enablement in einem Team — damit Transformation nicht in Folien endet, sondern in Produktion.'
            : 'Strategy, engineering, and enablement in one team — so transformation ends in production, not slides.'}
        </p>
      </div>
    </ForgePageLayout>
  );
}
