import ServiceJsonLd from '../../../components/ServiceJsonLd';
import { servicePageMeta } from '../../../lib/seo';

export const metadata = servicePageMeta('en', 'sap');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd lang="en" slug="sap" />
      {children}
    </>
  );
}
