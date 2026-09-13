import type { Metadata } from 'next';
import CareerLevelJsonLd from '../../../components/CareerLevelJsonLd';
import CareerLevelPage from '../../../components/pages/career/CareerLevelPage';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('en', 'graduates');

export default function EnCareerGraduatesPage() {
  return (
    <>
      <CareerLevelJsonLd lang="en" slug="graduates" />
      <CareerLevelPage lang="en" level="graduates" />
    </>
  );
}
