'use client';

import { useTeam } from '../../lib/contexts/ContentContext';
import { ForgeLocale } from '../../lib/data/forge-content';
import ForgePageLayout from './ForgePageLayout';

export default function ForgeTeamPage({ locale }: { locale: ForgeLocale }) {
  const team = useTeam();

  return (
    <ForgePageLayout
      locale={locale}
      eyebrow="TEAM"
      title={locale === 'de' ? 'Wer dahinter steht.' : 'Who’s behind it.'}
      lead={
        locale === 'de'
          ? 'Interdisziplinär, delivery-first — ohne Beratungs-Theater.'
          : 'Cross-disciplinary, delivery-first — no consulting theater.'
      }
      ctaHref="/career"
      ctaLabel={locale === 'de' ? 'Karriere' : 'Careers'}
    >
      <div className="forge-container grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <article
            key={member.id}
            className="border-t border-[var(--forge-line)] py-8 sm:px-4"
          >
            <p className="forge-meta text-[var(--forge-signal)]">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h2 className="mt-3 text-xl tracking-tight">{member.name}</h2>
            <p className="mt-2 text-sm text-[var(--forge-muted)]">
              {locale === 'de' ? member.roleDe : member.roleEn}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--forge-faint)]">
              {locale === 'de' ? member.expertiseDe : member.expertiseEn}
            </p>
          </article>
        ))}
      </div>
    </ForgePageLayout>
  );
}
