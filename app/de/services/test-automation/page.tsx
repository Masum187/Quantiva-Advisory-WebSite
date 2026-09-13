import ServiceJsonLd from '../../../components/ServiceJsonLd';
import { servicePageMeta } from '../../../lib/seo';
import TestAutomationPage from '../../../components/pages/services/TestAutomationPage';

export const metadata = servicePageMeta('de', 'test-automation');

export default function Page() {
  return (
    <>
      <ServiceJsonLd lang="de" slug="test-automation" />
      <TestAutomationPage lang="de" />
    </>
  );
}
