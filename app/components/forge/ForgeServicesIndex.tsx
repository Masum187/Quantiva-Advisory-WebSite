'use client';

import Link from 'next/link';
import { servicesOverview } from '../../lib/data/servicesOverview';
import { ForgeLocale, forgePath } from '../../lib/data/forge-content';
import ForgePageLayout from './ForgePageLayout';

export default function ForgeServicesIndex({ locale }: { locale: ForgeLocale }) {
  const items = servicesOverview.filter((s) => s.language === locale);

  return (
    <ForgePageLayout
      locale={locale}
      eyebrow="SERVICES"
      title={locale === 'de' ? 'Was wir liefern.' : 'What we ship.'}
      lead={
        locale === 'de'
          ? 'Wenige Angebote, klare Outcomes. Kein Katalog-Rauschen.'
          : 'Few offerings, clear outcomes. No catalog noise.'
      }
    >
      <div className="forge-container">
        <ul className="divide-y divide-[var(--forge-line)] border-y border-[var(--forge-line)]">
          {items.map((service, index) => (
            <li key={service.slug}>
              <Link
                href={forgePath(locale, `/services/${service.slug}`)}
                className="group flex flex-col gap-3 py-8 transition md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <div className="flex items-baseline gap-5">
                  <span className="forge-meta text-[var(--forge-signal)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-2xl tracking-tight group-hover:text-[var(--forge-signal)] md:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-[var(--forge-muted)]">{service.description}</p>
                  </div>
                </div>
                <span className="forge-meta shrink-0 md:pt-1">
                  {service.tags.slice(0, 2).join(' · ')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ForgePageLayout>
  );
}
