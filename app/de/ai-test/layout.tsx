import type { Metadata } from 'next';
import { noIndexRobots } from '../../lib/noIndexRobots';

export const metadata: Metadata = noIndexRobots;

export default function AiTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
