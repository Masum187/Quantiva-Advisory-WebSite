import type { Metadata } from 'next';
import CareerLevelJsonLd from '../../../components/CareerLevelJsonLd';
import CareerLevelPage from '../../../components/pages/career/CareerLevelPage';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('de', 'students');

export default function DeCareerStudentsPage() {
  return (
    <>
      <CareerLevelJsonLd lang="de" slug="students" />
      <CareerLevelPage lang="de" level="students" />
    </>
  );
}
