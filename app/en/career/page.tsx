import JsonLd from '../../components/JsonLd';
import CareerPage from '../../components/pages/CareerPage';
import { breadcrumbListJsonLd, careerBreadcrumb, jobPostingJsonLd, organizationJsonLd, pageMeta } from '../../lib/seo';
import { getJobListings } from '../../lib/utils/jobs';

export const metadata = pageMeta({
  title: 'Careers',
  description:
    'Join our team at Quantiva Advisory. Career paths for students, graduates, professionals and leaders.',
  path: '/career',
  lang: 'en',
});

export default async function Career() {
  const jobs = await getJobListings('en');
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      {jobs.map((job) => (
        <JsonLd key={job.id} data={jobPostingJsonLd(job, 'en')} />
      ))}
      <JsonLd data={breadcrumbListJsonLd('en', careerBreadcrumb('en'))} />
      <CareerPage />
    </>
  );
}
