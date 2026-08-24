'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { MAX_PARALLAX_SPEED } from '../../../lib/motion';

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number;
};

export default function ParallaxLayer({
  children,
  speed = 0.15,
}: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const safeSpeed = Math.min(Math.max(speed, 0), MAX_PARALLAX_SPEED);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${safeSpeed * 100}%`],
  );

  return (
    <div ref={containerRef}>
      <motion.div style={reduceMotion ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
