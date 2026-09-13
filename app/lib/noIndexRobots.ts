import type { Metadata } from 'next';

/** Shared metadata for internal / legacy routes that must stay out of the index. */
export const noIndexRobots: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
