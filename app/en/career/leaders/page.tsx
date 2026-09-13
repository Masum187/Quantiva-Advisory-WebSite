import type { Metadata } from 'next';
import CareerLevelJsonLd from '../../../components/CareerLevelJsonLd';
import CareerLevelPage from '../../../components/pages/career/CareerLevelPage';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('en', 'leaders');

export default function EnCareerLeadersPage() {
  return (
    <>
      <CareerLevelJsonLd lang="en" slug="leaders" />
      <CareerLevelPage lang="en" level="leaders" />
    </>
  );
}
