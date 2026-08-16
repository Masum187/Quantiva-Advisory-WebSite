'use client';

import Link from 'next/link';
import jobsData from '../../lib/data/jobs.json';
import { ForgeLocale, forgePath } from '../../lib/data/forge-content';
import ForgePageLayout from './ForgePageLayout';

type Job = {
  id: string;
  language: string;
  title: string;
  department: string;
  location: string;
  description: string;
  tags?: string[];
};

export default function ForgeCareerPage({ locale }: { locale: ForgeLocale }) {
  const jobs = (jobsData as Job[]).filter((j) => j.language === locale);

  return (
    <ForgePageLayout
      locale={locale}
      eyebrow="CAREERS"
      title={locale === 'de' ? 'Mitbauen.' : 'Build with us.'}
      lead={
        locale === 'de'
          ? 'Wenige Rollen, hohe Verantwortung. Remote-first, DACH-Fokus.'
          : 'Few roles, high ownership. Remote-first, DACH focus.'
      }
      ctaHref="/contact"
      ctaLabel={locale === 'de' ? 'Initiativ bewerben' : 'Open application'}
    >
      <div className="forge-container">
        <ul className="divide-y divide-[var(--forge-line)] border-y border-[var(--forge-line)]">
          {jobs.map((job, index) => (
            <li key={job.id} className="py-8">
              <p className="forge-meta text-[var(--forge-signal)]">
                {String(index + 1).padStart(2, '0')} · {job.department} · {job.location}
              </p>
              <h2 className="mt-3 text-2xl tracking-tight md:text-3xl">{job.title}</h2>
              <p className="mt-3 max-w-3xl text-[var(--forge-muted)] leading-relaxed">
                {job.description}
              </p>
              {job.tags?.length ? (
                <p className="forge-meta mt-4">{job.tags.join(' · ')}</p>
              ) : null}
            </li>
          ))}
        </ul>
        {jobs.length === 0 ? (
          <p className="text-[var(--forge-muted)]">
            {locale === 'de'
              ? 'Aktuell keine offenen Rollen — schreiben Sie uns initiativ.'
              : 'No open roles right now — reach out anyway.'}
          </p>
        ) : null}
        <Link
          href={forgePath(locale, '/contact')}
          className="mt-10 inline-block text-sm text-[var(--forge-muted)] hover:text-[var(--forge-ink)]"
        >
          {locale === 'de' ? 'Kontakt →' : 'Contact →'}
        </Link>
      </div>
    </ForgePageLayout>
  );
}
