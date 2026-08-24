import type { TargetAndTransition, Variants, ViewportOptions } from 'framer-motion';

export const MOTION_VIEWPORT: ViewportOptions = {
  once: true,
  margin: '-80px',
};

export const MOTION_TRANSITION = {
  duration: 0.8,
  ease: 'easeOut' as const,
};

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: MOTION_TRANSITION },
};

export const FADE_UP_20: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: MOTION_TRANSITION },
};

export const FADE_UP_50: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: MOTION_TRANSITION },
};

export const FADE_LEFT_20: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: MOTION_TRANSITION },
};

export const FADE_UP_SUBTLE: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: MOTION_TRANSITION },
};

export const DRAMATIC_RISE: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: MOTION_TRANSITION },
};

export const SPLIT_LEFT: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: MOTION_TRANSITION },
};

export const SPLIT_RIGHT: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: MOTION_TRANSITION },
};

export const SPRING_SPLIT_LEFT: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
};

export const SPRING_SPLIT_RIGHT: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
};

export const STRONG_SPLIT_LEFT: Variants = {
  hidden: { opacity: 0, x: -160, y: 100 },
  visible: { opacity: 1, x: 0, y: 0, transition: MOTION_TRANSITION },
};

export const STRONG_SPLIT_RIGHT: Variants = {
  hidden: { opacity: 0, x: 160, y: 100 },
  visible: { opacity: 1, x: 0, y: 0, transition: MOTION_TRANSITION },
};

export const STRONG_SPLIT_RIGHT_STAGGER: Variants = {
  hidden: { opacity: 0, x: 160, y: 100 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      ...MOTION_TRANSITION,
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const STATIC_FINAL: TargetAndTransition = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
};

export const ARROW_NUDGE: TargetAndTransition = {
  x: [0, 5, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
