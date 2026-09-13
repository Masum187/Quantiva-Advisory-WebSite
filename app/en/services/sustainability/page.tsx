import ServiceJsonLd from '../../../components/ServiceJsonLd';
import { servicePageMeta } from '../../../lib/seo';
import SustainabilityPage from '../../../components/pages/services/SustainabilityPage';

export const metadata = servicePageMeta('en', 'sustainability');

export default function Page() {
  return (
    <>
      <ServiceJsonLd lang="en" slug="sustainability" />
      <SustainabilityPage lang="en" />
    </>
  );
}
