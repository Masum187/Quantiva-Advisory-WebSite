/**
 * UnsplashImage Component
 * 
 * Professional React component for displaying Unsplash images with:
 * - Next.js Image optimization
 * - Automatic attribution (required by Unsplash)
 * - Download tracking
 * - Blur hash placeholder
 * - Error handling with fallback
 */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getAttribution, trackDownload, type UnsplashPhoto } from '../lib/utils/unsplash';

interface UnsplashImageProps {
  photo: UnsplashPhoto | string; // Can be photo object or static URL
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  showAttribution?: boolean;
  attributionPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  onLoad?: () => void;
}

export default function UnsplashImage({
  photo,
  alt,
  className = '',
  fill,
  width,
  height,
  sizes,
  priority,
  showAttribution = true,
  attributionPosition = 'bottom-right',
  onLoad,
}: UnsplashImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if photo is a string (static URL) or UnsplashPhoto object
  const isStaticUrl = typeof photo === 'string';
  const imageUrl = isStaticUrl ? photo : photo.urls.regular;
  const blurDataUrl = !isStaticUrl && photo.blur_hash 
    ? `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${photo.width}" height="${photo.height}"><rect width="100%" height="100%" fill="${photo.color}"/></svg>`).toString('base64')}`
    : undefined;

  // Track download when component mounts (Unsplash API requirement)
  useEffect(() => {
    if (!isStaticUrl && photo.links?.download_location) {
      trackDownload(photo.links.download_location);
    }
  }, [isStaticUrl, photo]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    console.error('Failed to load Unsplash image:', imageUrl);
  };

  // Attribution for Unsplash photos
  const attribution = !isStaticUrl ? getAttribution(photo) : null;

  // Position classes for attribution
  const positionClasses = {
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Image */}
      <Image
        src={imageError ? '/assets/og/og-default.jpg' : imageUrl}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        placeholder={blurDataUrl ? 'blur' : undefined}
        blurDataURL={blurDataUrl}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className="object-cover"
      />

      {/* Loading state */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Attribution (Unsplash requirement) */}
      {showAttribution && attribution && imageLoaded && !imageError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`absolute ${positionClasses[attributionPosition]} z-10`}
        >
          <a
            href={attribution.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60 backdrop-blur-sm rounded-md text-white text-xs hover:bg-black/80 transition-colors duration-200"
          >
            <span className="opacity-90 group-hover:opacity-100">
              Photo by <span className="font-semibold">{attribution.photographerName}</span>
            </span>
            <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
          </a>
        </motion.div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          <div className="text-center">
            <p>Failed to load image</p>
            <p className="text-xs mt-1">Using fallback</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Simplified wrapper for static Unsplash URLs
 */
export function StaticUnsplashImage({
  src,
  alt,
  className = '',
  fill,
  width,
  height,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <UnsplashImage
      photo={src}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      showAttribution={false} // Static URLs don't need attribution
    />
  );
}






