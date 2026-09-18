import type { Metadata } from 'next';
import CareerLevelScreen from '../../../components/pages/career/CareerLevelScreen';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('en', 'graduates');

export default function EnCareerGraduatesPage() {
  return <CareerLevelScreen lang="en" slug="graduates" />;
}
