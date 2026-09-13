'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { videoPosterFor } from '../../../lib/videoPoster';
import { ACCENT } from './homeCopy';

export default function HomeFilmLayer({
  src,
  className = '',
  mode = 'hero',
}: {
  src: string;
  className?: string;
  mode?: 'hero' | 'lazy';
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = !!useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [preload, setPreload] = useState<'none' | 'metadata'>(
    mode === 'hero' ? 'metadata' : 'none',
  );
  const poster = videoPosterFor(src);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed) return;

    if (reduceMotion) {
      el.pause();
      return;
    }

    if (mode === 'hero') {
      void el.play().catch(() => {});
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPreload('metadata');
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode, failed, reduceMotion]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!failed ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay={false}
          muted
          loop
          playsInline
          preload={reduceMotion ? 'none' : preload}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background: `radial-gradient(90% 70% at 60% 30%, ${ACCENT}14 0%, transparent 55%), radial-gradient(70% 60% at 20% 80%, ${ACCENT}0d 0%, transparent 60%), #04060b`,
          }}
        />
      )}
    </div>
  );
}
