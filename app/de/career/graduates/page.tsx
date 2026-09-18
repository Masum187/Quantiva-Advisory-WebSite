import type { Metadata } from 'next';
import CareerLevelScreen from '../../../components/pages/career/CareerLevelScreen';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('de', 'graduates');

export default function DeCareerGraduatesPage() {
  return <CareerLevelScreen lang="de" slug="graduates" />;
}
