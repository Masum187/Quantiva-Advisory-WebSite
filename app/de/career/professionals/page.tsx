import type { Metadata } from 'next';
import CareerLevelJsonLd from '../../../components/CareerLevelJsonLd';
import CareerLevelPage from '../../../components/pages/career/CareerLevelPage';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('de', 'professionals');

export default function DeCareerProfessionalsPage() {
  return (
    <>
      <CareerLevelJsonLd lang="de" slug="professionals" />
      <CareerLevelPage lang="de" level="professionals" />
    </>
  );
}
