'use client';

import React from 'react';

interface ClientVideoProps {
  src: string;
  className?: string;
}

export default function ClientVideo({ src, className = '' }: ClientVideoProps) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      onError={(e) => {
        console.error('Video failed to load, using fallback image');
        const videoElement = e.target as HTMLVideoElement;
        videoElement.style.display = 'none';
      }}
      onLoadStart={() => {
        console.log('Video started loading...');
      }}
      onCanPlay={() => {
        console.log('Video can play');
      }}
    />
  );
}
