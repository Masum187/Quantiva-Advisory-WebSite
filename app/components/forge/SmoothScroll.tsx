'use client';

import { useEffect, type ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopViewport = window.matchMedia('(min-width: 1024px)').matches;

    if (reduceMotion || !desktopViewport) {
      return;
    }

    let disposed = false;
    let lenis: import('lenis').default | undefined;
    let animationFrameId = 0;

    void import('lenis').then(({ default: Lenis }) => {
      if (disposed) {
        return;
      }

      lenis = new Lenis({
        duration: 1.2,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        smoothWheel: true,
      });

      const update = (time: number) => {
        lenis?.raf(time);
        animationFrameId = requestAnimationFrame(update);
      };

      animationFrameId = requestAnimationFrame(update);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      lenis?.destroy();
    };
  }, []);

  return children;
}
