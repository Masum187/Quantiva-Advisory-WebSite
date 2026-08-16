'use client';

import Link from 'next/link';
import ContactForm from '../ContactForm';
import { ForgeLocale, forgePath } from '../../lib/data/forge-content';
import ForgePageLayout from './ForgePageLayout';

export default function ForgeContactPage({ locale }: { locale: ForgeLocale }) {
  return (
    <ForgePageLayout
      locale={locale}
      eyebrow="CONTACT"
      title={locale === 'de' ? 'Sprechen wir.' : 'Let’s talk.'}
      lead={
        locale === 'de'
          ? 'Kurz, konkret, ohne Folienmarathon. Wir melden uns innerhalb eines Werktags.'
          : 'Short, concrete, no slide marathon. We reply within one business day.'
      }
    >
      <div className="forge-container grid gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-[var(--forge-line)] bg-[var(--forge-bg-elevated)] p-6 md:p-8 [&_label]:text-[var(--forge-muted)] [&_input]:border-[var(--forge-line)] [&_input]:bg-[var(--forge-bg)] [&_input]:text-[var(--forge-ink)] [&_textarea]:border-[var(--forge-line)] [&_textarea]:bg-[var(--forge-bg)] [&_textarea]:text-[var(--forge-ink)] [&_button]:bg-[var(--forge-signal)] [&_button]:text-[var(--forge-signal-ink)]">
          <ContactForm lang={locale} />
        </div>
        <div>
          <p className="forge-meta">Direct</p>
          <a
            href="mailto:info@quantivaadvisory.com"
            className="mt-4 block text-2xl hover:text-[var(--forge-signal)]"
          >
            info@quantivaadvisory.com
          </a>
          <p className="mt-8 text-sm leading-relaxed text-[var(--forge-muted)]">
            {locale === 'de'
              ? 'Oder starten Sie über Services und Cases, wenn Sie erst Orientierung brauchen.'
              : 'Or start via Services and Cases if you need orientation first.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href={forgePath(locale, '/services')} className="underline-offset-4 hover:underline">
              Services
            </Link>
            <Link href={forgePath(locale, '/cases')} className="underline-offset-4 hover:underline">
              {locale === 'de' ? 'Projekte' : 'Cases'}
            </Link>
          </div>
        </div>
      </div>
    </ForgePageLayout>
  );
}
