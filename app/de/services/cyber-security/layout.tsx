import ServiceJsonLd from '../../../components/ServiceJsonLd';
import { servicePageMeta } from '../../../lib/seo';

export const metadata = servicePageMeta('de', 'cyber-security');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd lang="de" slug="cyber-security" />
      {children}
    </>
  );
}
