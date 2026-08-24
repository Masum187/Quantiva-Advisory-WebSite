'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  FADE_UP,
  MOTION_VIEWPORT,
  STATIC_FINAL,
  STAGGER_CONTAINER,
} from './presets';

type MotionBlockProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

export function MotionReveal({
  children,
  className,
  variants = FADE_UP,
}: MotionBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? STATIC_FINAL : 'visible'}
      viewport={MOTION_VIEWPORT}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({ children, className }: MotionBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? STATIC_FINAL : 'visible'}
      viewport={MOTION_VIEWPORT}
      variants={STAGGER_CONTAINER}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  variants = FADE_UP,
}: MotionBlockProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
