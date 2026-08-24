'use client';

import { useEffect, useState } from 'react';

type ServiceVideoBackgroundProps = {
  /** One or more video URLs. With multiple videos, they cross-fade in rotation. */
  videos: string[];
  /** Rotation interval in milliseconds (only relevant with multiple videos). */
  rotateMs?: number;
  /** Tailwind classes for the readability overlay on top of the video. */
  overlayClassName?: string;
};

export default function ServiceVideoBackground({
  videos,
  rotateMs = 8000,
  overlayClassName = 'bg-black/40',
}: ServiceVideoBackgroundProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (videos.length < 2) return;

    const id = window.setInterval(
      () => setCurrent((index) => (index + 1) % videos.length),
      rotateMs
    );
    return () => window.clearInterval(id);
  }, [videos, rotateMs]);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {videos.map((src, index) => (
        <video
          key={src}
          src={src}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload={index === 0 ? 'auto' : 'metadata'}
        />
      ))}
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
