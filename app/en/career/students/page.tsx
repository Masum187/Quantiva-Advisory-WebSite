import type { Metadata } from 'next';
import CareerLevelJsonLd from '../../../components/CareerLevelJsonLd';
import CareerLevelPage from '../../../components/pages/career/CareerLevelPage';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('en', 'students');

export default function EnCareerStudentsPage() {
  return (
    <>
      <CareerLevelJsonLd lang="en" slug="students" />
      <CareerLevelPage lang="en" level="students" />
    </>
  );
}
