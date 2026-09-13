import JsonLd from './JsonLd';
import { careerLevels, type CareerLevelSlug } from '../lib/data/careerLevels';
import { breadcrumbListJsonLd, careerChildBreadcrumb, type SiteLang } from '../lib/seo';

export default function CareerLevelJsonLd({ lang, slug }: { lang: SiteLang; slug: CareerLevelSlug }) {
  const name = careerLevels[slug][lang].metaTitle;
  return <JsonLd data={breadcrumbListJsonLd(lang, careerChildBreadcrumb(lang, name, `/career/${slug}`))} />;
}
