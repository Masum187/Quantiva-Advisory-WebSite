import type { Metadata } from 'next';
import CareerLevelScreen from '../../../components/pages/career/CareerLevelScreen';
import { careerLevelMetadata } from '../../../lib/careerLevelRoute';

export const metadata: Metadata = careerLevelMetadata('en', 'students');

export default function EnCareerStudentsPage() {
  return <CareerLevelScreen lang="en" slug="students" />;
}
