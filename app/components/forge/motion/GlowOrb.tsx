'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../../lib/cn';
import { MOTION_EASE_IN_OUT } from '../../../lib/motion';

type GlowOrbProps = {
  className?: string;
  color?: 'accent' | 'secondary';
  float?: boolean;
};

const colorClasses = {
  accent: 'bg-[var(--accent-glow)]',
  secondary: 'bg-[var(--accent-secondary)]',
} as const;

export default function GlowOrb({
  className,
  color = 'accent',
  float = true,
}: GlowOrbProps) {
  const reduceMotion = useReducedMotion();
  const shouldFloat = float && !reduceMotion;

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute size-80 rounded-full opacity-30 blur-[120px]',
        colorClasses[color],
        className,
      )}
      animate={
        shouldFloat
          ? {
              x: [0, 16, 0],
              y: [0, -20, 0],
              scale: [1, 1.04, 1],
            }
          : undefined
      }
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: MOTION_EASE_IN_OUT,
      }}
    />
  );
}
