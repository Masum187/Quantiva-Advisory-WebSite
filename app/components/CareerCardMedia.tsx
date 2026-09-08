'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type CareerCardMediaProps = {
  /** Poster/fallback image (also shown with prefers-reduced-motion). */
  image: string;
  /** Optional looping clip; when set it plays muted while the card is visible. */
  video?: string;
  alt: string;
  /** Extra classes for the media element (defaults to fill-style cover). */
  className?: string;
  sizes?: string;
};

/**
 * Fill-media for career cards: plays a looping, muted video while the card is
 * in the viewport and falls back to the still image when no video is set or
 * the user prefers reduced motion.
 */
export default function CareerCardMedia({
  image,
  video,
  alt,
  className = 'object-cover transition-transform duration-500 group-hover:scale-105',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: CareerCardMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  if (!video || reduceMotion) {
    return <Image src={image} alt={alt} fill className={className} sizes={sizes} />;
  }

  return (
    <video
      ref={videoRef}
      src={video}
      poster={image}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
