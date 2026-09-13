import ServiceJsonLd from '../../../components/ServiceJsonLd';
import { servicePageMeta } from '../../../lib/seo';

export const metadata = servicePageMeta('de', 'microservices');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd lang="de" slug="microservices" />
      {children}
    </>
  );
}
