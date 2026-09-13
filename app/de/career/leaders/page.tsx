import type { Metadata } from 'next';
import CareerLevelJsonLd from '../../../components/CareerLevelJsonLd';
import CareerLevelPage from '../../../components/pages/career/CareerLevelPage';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('de', 'leaders');

export default function DeCareerLeadersPage() {
  return (
    <>
      <CareerLevelJsonLd lang="de" slug="leaders" />
      <CareerLevelPage lang="de" level="leaders" />
    </>
  );
}
