export const MOTION_EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const MOTION_EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const MOTION_DURATION = {
  fast: 0.2,
  base: 0.4,
  reveal: 0.7,
  slow: 0.8,
} as const;

export const MOTION_STAGGER = {
  children: 0.08,
  words: 0.06,
} as const;

export const MAX_PARALLAX_SPEED = 0.2;
