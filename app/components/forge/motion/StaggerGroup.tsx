'use client';

import { Children, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  MOTION_DURATION,
  MOTION_EASE_OUT,
  MOTION_STAGGER,
} from '../../../lib/motion';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_STAGGER.children,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.reveal,
      ease: MOTION_EASE_OUT,
    },
  },
};

export default function StaggerGroup({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : containerVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={reduceMotion ? undefined : itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
