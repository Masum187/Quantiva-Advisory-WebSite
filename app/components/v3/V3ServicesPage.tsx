import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { servicesOverview } from '../../lib/data/servicesOverview';
import { V3_PAGES, v3Path, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3ServicesPage({ locale }: { locale: V3Locale }) {
  const page = V3_PAGES[locale].services;
  const services = servicesOverview.filter((service) => service.language === locale);

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sectionLabel={locale === 'de' ? 'Leistungen' : 'Services'}
    >
      <section className="v3-numbered-section" aria-labelledby="v3-services-title">
        <div className="v3-section-heading">
          <p className="v3-section-index">01 / {locale === 'de' ? 'Capability Index' : 'Capability index'}</p>
          <h2 id="v3-services-title">
            {locale === 'de' ? 'Ein System aus fokussierten Fähigkeiten.' : 'One system of focused capabilities.'}
          </h2>
        </div>
        <ol className="v3-link-rows">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link href={v3Path(locale, `/services/${service.slug}`)} prefetch={false}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul aria-label={locale === 'de' ? 'Schwerpunkte' : 'Focus areas'}>
                    {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </V3PageLayout>
  );
}
