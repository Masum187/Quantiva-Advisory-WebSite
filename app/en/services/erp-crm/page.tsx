import ServiceJsonLd from '../../../components/ServiceJsonLd';
import { servicePageMeta } from '../../../lib/seo';
import ERPCRMPage from '../../../components/pages/services/ERPCRMPage';

export const metadata = servicePageMeta('en', 'erp-crm');

export default function Page() {
  return (
    <>
      <ServiceJsonLd lang="en" slug="erp-crm" />
      <ERPCRMPage lang="en" />
    </>
  );
}
