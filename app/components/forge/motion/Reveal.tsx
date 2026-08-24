'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { MOTION_DURATION, MOTION_EASE_OUT } from '../../../lib/motion';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export default function Reveal({ children, delay = 0, y = 24 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 1, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: MOTION_DURATION.reveal,
        delay,
        ease: MOTION_EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}
