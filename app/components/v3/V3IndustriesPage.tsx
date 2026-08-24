import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { industriesDe, industriesEn } from '../../lib/data/industries';
import { V3_PAGES, v3Path, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3IndustriesPage({ locale }: { locale: V3Locale }) {
  const page = V3_PAGES[locale].industries;
  const industries = locale === 'de' ? industriesDe : industriesEn;

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sectionLabel={locale === 'de' ? 'Branchen' : 'Industries'}
    >
      <section className="v3-numbered-section" aria-labelledby="v3-industries-title">
        <div className="v3-section-heading">
          <p className="v3-section-index">01 / {locale === 'de' ? 'Branchenfelder' : 'Industry fields'}</p>
          <h2 id="v3-industries-title">
            {locale === 'de' ? 'Unterschiedliche Bedingungen. Ein klares Steuerungsprinzip.' : 'Different conditions. One clear control principle.'}
          </h2>
        </div>
        <div className="v3-industry-grid">
          {industries.map((industry, index) => (
            <Link key={industry.slug} href={v3Path(locale, `/industries/${industry.slug}`)} prefetch={false}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div className={`v3-industry-signal v3-industry-signal-${index + 1}`} aria-hidden="true" />
              <h3>{industry.title}</h3>
              <p>{industry.description}</p>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </V3PageLayout>
  );
}
