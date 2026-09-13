import type { Metadata } from 'next';
import CareerLevelJsonLd from '../../../components/CareerLevelJsonLd';
import CareerLevelPage from '../../../components/pages/career/CareerLevelPage';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('de', 'graduates');

export default function DeCareerGraduatesPage() {
  return (
    <>
      <CareerLevelJsonLd lang="de" slug="graduates" />
      <CareerLevelPage lang="de" level="graduates" />
    </>
  );
}
