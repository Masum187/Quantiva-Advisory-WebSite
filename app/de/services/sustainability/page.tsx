import ServiceJsonLd from '../../../components/ServiceJsonLd';
import { servicePageMeta } from '../../../lib/seo';
import SustainabilityPage from '../../../components/pages/services/SustainabilityPage';

export const metadata = servicePageMeta('de', 'sustainability');

export default function Page() {
  return (
    <>
      <ServiceJsonLd lang="de" slug="sustainability" />
      <SustainabilityPage lang="de" />
    </>
  );
}
