import ServiceJsonLd from '../../../components/ServiceJsonLd';
import { servicePageMeta } from '../../../lib/seo';
import ChangeManagementPage from '../../../components/pages/services/ChangeManagementPage';

export const metadata = servicePageMeta('en', 'change-management');

export default function Page() {
  return (
    <>
      <ServiceJsonLd lang="en" slug="change-management" />
      <ChangeManagementPage lang="en" />
    </>
  );
}
