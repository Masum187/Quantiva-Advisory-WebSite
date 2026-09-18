import type { Metadata } from 'next';
import CareerLevelScreen from '../../../components/pages/career/CareerLevelScreen';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('de', 'leaders');

export default function DeCareerLeadersPage() {
  return <CareerLevelScreen lang="de" slug="leaders" />;
}
