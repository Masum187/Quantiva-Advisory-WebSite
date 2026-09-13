import type { Metadata } from 'next';
import { noIndexRobots } from '../lib/noIndexRobots';

export const metadata: Metadata = noIndexRobots;

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
