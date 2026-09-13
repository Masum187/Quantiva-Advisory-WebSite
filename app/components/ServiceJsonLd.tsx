import JsonLd from './JsonLd';
import { breadcrumbListJsonLd, servicesBreadcrumb, type SiteLang } from '../lib/seo';

export default function ServiceJsonLd({ lang, slug }: { lang: SiteLang; slug: string }) {
  return <JsonLd data={breadcrumbListJsonLd(lang, servicesBreadcrumb(lang, slug))} />;
}
