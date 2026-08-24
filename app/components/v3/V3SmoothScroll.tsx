'use client';

import { useEffect, type ReactNode } from 'react';

export default function V3SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;

    if (reducedMotion || !desktop) {
      return;
    }

    let disposed = false;
    let frame = 0;
    let lenis: import('lenis').default | undefined;

    void import('lenis').then(({ default: Lenis }) => {
      if (disposed) {
        return;
      }

      lenis = new Lenis({
        duration: 1.1,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        smoothWheel: true,
      });

      const update = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(update);
      };

      frame = requestAnimationFrame(update);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return children;
}
