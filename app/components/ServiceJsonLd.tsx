import JsonLd from './JsonLd';
import {
  breadcrumbListJsonLd,
  serviceJsonLd,
  servicesBreadcrumb,
  type SiteLang,
} from '../lib/seo';

export default function ServiceJsonLd({ lang, slug }: { lang: SiteLang; slug: string }) {
  return (
    <>
      <JsonLd data={serviceJsonLd(lang, slug)} />
      <JsonLd data={breadcrumbListJsonLd(lang, servicesBreadcrumb(lang, slug))} />
    </>
  );
}
