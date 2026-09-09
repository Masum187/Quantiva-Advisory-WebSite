'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type Contact3DViewerProps = {
  /** Path to the GLB model of the person (full body). */
  model: string;
  /** Fallback/poster image shown while loading or with reduced motion. */
  image: string;
  alt: string;
};

/**
 * Interactive full-body 3D figure of a contact person.
 * Uses <model-viewer> (loaded client-side only): auto-rotates and can be
 * dragged. Falls back to the still portrait when the user prefers reduced
 * motion or the component has not hydrated yet.
 */
export default function Contact3DViewer({ model, image, alt }: Contact3DViewerProps) {
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);

    // Register the <model-viewer> custom element client-side only.
    import('@google/model-viewer')
      .then(() => setReady(true))
      .catch(() => setReady(false));

    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!ready || reduceMotion) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 360px"
        className="object-cover"
      />
    );
  }

  return (
    <model-viewer
      src={model}
      poster={image}
      alt={alt}
      camera-controls
      auto-rotate
      auto-rotate-delay={0}
      rotation-per-second="20deg"
      environment-image="neutral"
      shadow-intensity="1"
      shadow-softness="0.9"
      camera-orbit="0deg 88deg 100%"
      touch-action="pan-y"
      interaction-prompt="none"
      exposure="1.25"
      tone-mapping="aces"
      loading="eager"
      style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
    />
  );
}
