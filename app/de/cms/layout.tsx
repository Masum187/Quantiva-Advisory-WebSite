import type { Metadata } from 'next';
import { noIndexRobots } from '../../lib/noIndexRobots';

export const metadata: Metadata = noIndexRobots;

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
