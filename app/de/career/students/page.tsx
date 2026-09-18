import type { Metadata } from 'next';
import CareerLevelScreen from '../../../components/pages/career/CareerLevelScreen';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('de', 'students');

export default function DeCareerStudentsPage() {
  return <CareerLevelScreen lang="de" slug="students" />;
}
