import type { Metadata } from 'next';
import CareerLevelScreen from '../../../components/pages/career/CareerLevelScreen';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('de', 'professionals');

export default function DeCareerProfessionalsPage() {
  return <CareerLevelScreen lang="de" slug="professionals" />;
}
