import JsonLd from '../../components/JsonLd';
import CareerPage from '../../components/pages/CareerPage';
import { breadcrumbListJsonLd, careerBreadcrumb, jobPostingJsonLd, organizationJsonLd, pageMeta } from '../../lib/seo';
import { getJobListings } from '../../lib/utils/jobs';

export const metadata = pageMeta({
  title: 'Karriere',
  description:
    'Werden Sie Teil unseres Teams bei Quantiva Advisory. Karrierewege für Studierende, Absolventinnen, Professionals und Führungskräfte.',
  path: '/career',
  lang: 'de',
});

export default async function Career() {
  const jobs = await getJobListings('de');
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      {jobs.map((job) => (
        <JsonLd key={job.id} data={jobPostingJsonLd(job, 'de')} />
      ))}
      <JsonLd data={breadcrumbListJsonLd('de', careerBreadcrumb('de'))} />
      <CareerPage jobs={jobs} />
    </>
  );
}
