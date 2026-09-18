import type { Metadata } from 'next';
import CareerLevelScreen from '../../../components/pages/career/CareerLevelScreen';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('en', 'leaders');

export default function EnCareerLeadersPage() {
  return <CareerLevelScreen lang="en" slug="leaders" />;
}
