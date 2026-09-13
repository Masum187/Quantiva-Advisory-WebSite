import type { Metadata } from 'next';
import CareerLevelJsonLd from '../../../components/CareerLevelJsonLd';
import CareerLevelPage from '../../../components/pages/career/CareerLevelPage';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('en', 'professionals');

export default function EnCareerProfessionalsPage() {
  return (
    <>
      <CareerLevelJsonLd lang="en" slug="professionals" />
      <CareerLevelPage lang="en" level="professionals" />
    </>
  );
}
