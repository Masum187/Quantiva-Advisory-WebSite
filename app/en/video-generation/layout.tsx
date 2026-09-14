import type { Metadata } from 'next';
import DemoModeBanner from '../../components/DemoModeBanner';
import { noIndexRobots } from '../../lib/noIndexRobots';

export const metadata: Metadata = noIndexRobots;

export default function VideoGenerationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoModeBanner lang="en" />
      {children}
    </>
  );
}
