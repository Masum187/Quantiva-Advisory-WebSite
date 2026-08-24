import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import jobs from '../../lib/data/jobs.json';
import { V3_PAGES, v3Path, type V3Locale } from '../../lib/data/v3-content';
import V3PageLayout from './V3PageLayout';

export default function V3CareerPage({ locale }: { locale: V3Locale }) {
  const page = V3_PAGES[locale].career;
  const openRoles = jobs.filter((job) => job.language === locale);

  return (
    <V3PageLayout
      locale={locale}
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      sectionLabel={locale === 'de' ? 'Karriere' : 'Career'}
    >
      <section className="v3-numbered-section" aria-labelledby="v3-career-roles">
        <div className="v3-section-heading">
          <p className="v3-section-index">01 / {locale === 'de' ? 'Offene Rollen' : 'Open roles'}</p>
          <h2 id="v3-career-roles">
            {locale === 'de' ? 'Finde deinen Verantwortungsbereich.' : 'Find your field of ownership.'}
          </h2>
        </div>
        <div className="v3-job-list">
          {openRoles.map((job, index) => (
            <article key={job.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p>{job.department}</p>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <ul aria-label={locale === 'de' ? 'Stellenmerkmale' : 'Role attributes'}>
                  <li>{job.location}</li>
                  <li>{job.employmentType}</li>
                  <li>{job.remote ? 'Remote' : 'On-site'}</li>
                  <li>{job.seniority}</li>
                </ul>
              </div>
              <Link href={v3Path(locale, '/contact')} prefetch={false} aria-label={`${locale === 'de' ? 'Interesse an' : 'Enquire about'} ${job.title}`}>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="v3-editorial-split" aria-labelledby="v3-career-open">
        <p className="v3-section-index">02 / {locale === 'de' ? 'Initiativ' : 'Open application'}</p>
        <div>
          <h2 id="v3-career-open">
            {locale === 'de' ? 'Deine Rolle ist nicht gelistet?' : 'Your role is not listed?'}
          </h2>
          <p className="v3-lead-copy">
            {locale === 'de'
              ? 'Zeig uns, welches Transformationsproblem du lösen kannst und wie du Verantwortung im Delivery-Team übernimmst.'
              : 'Show us which transformation problem you can solve and how you take ownership within a delivery team.'}
          </p>
          <Link className="v3-primary-link" href={v3Path(locale, '/contact')} prefetch={false}>
            {locale === 'de' ? 'Gespräch beginnen' : 'Start a conversation'}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </V3PageLayout>
  );
}
