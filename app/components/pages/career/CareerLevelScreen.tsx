import CareerLevelJsonLd from '../../CareerLevelJsonLd';
import { getJobListings } from '../../../lib/utils/jobs';
import type { CareerLevelSlug, Lang } from '../../../lib/data/careerLevels';
import CareerLevelPage from './CareerLevelPage';

export default async function CareerLevelScreen({
  lang,
  slug,
}: {
  lang: Lang;
  slug: CareerLevelSlug;
}) {
  const jobs = await getJobListings(lang);
  return (
    <>
      <CareerLevelJsonLd lang={lang} slug={slug} />
      <CareerLevelPage lang={lang} level={slug} jobs={jobs} />
    </>
  );
}
