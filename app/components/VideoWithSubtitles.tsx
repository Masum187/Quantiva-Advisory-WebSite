'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SubtitleEntry {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

interface VideoWithSubtitlesProps {
  videoUrl: string;
  subtitleUrl: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function VideoWithSubtitles({
  videoUrl,
  subtitleUrl,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true
}: VideoWithSubtitlesProps) {
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const subtitleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Parse SRT content
  const parseSRT = useCallback((srtContent: string): SubtitleEntry[] => {
    const entries: SubtitleEntry[] = [];
    const blocks = srtContent.trim().split(/\n\s*\n/);

    blocks.forEach((block, index) => {
      const lines = block.trim().split('\n');
      if (lines.length >= 3) {
        const id = parseInt(lines[0]) || index + 1;
        const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
        
        if (timeMatch) {
          const startTime = parseTimeToSeconds(timeMatch[1]);
          const endTime = parseTimeToSeconds(timeMatch[2]);
          const text = lines.slice(2).join(' ').replace(/<[^>]*>/g, ''); // Remove HTML tags
          
          entries.push({
            id,
            startTime,
            endTime,
            text
          });
        }
      }
    });

    return entries.sort((a, b) => a.startTime - b.startTime);
  }, []);

  // Convert SRT time format to seconds
  const parseTimeToSeconds = (timeString: string): number => {
    const [time, milliseconds] = timeString.split(',');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const millisecondsNum = Number(milliseconds);
    return hours * 3600 + minutes * 60 + seconds + millisecondsNum / 1000;
  };

  // Load subtitles from Cloudinary
  useEffect(() => {
    async function loadSubtitles() {
      if (!subtitleUrl) return;
      try {
        setIsLoading(true);
        const response = await fetch(subtitleUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to load subtitles: ${response.status}`);
        }
        
        const srtContent = await response.text();
        const parsedSubtitles = parseSRT(srtContent);
        setSubtitles(parsedSubtitles);
        setError(null);
      } catch (err) {
        console.error('Error loading subtitles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load subtitles');
      } finally {
        setIsLoading(false);
      }
    }

    if (subtitleUrl) {
      loadSubtitles();
    }
  }, [subtitleUrl, parseSRT]);

  // Update current subtitle based on video time
  useEffect(() => {
    const updateSubtitle = () => {
      if (!videoRef.current || subtitles.length === 0) return;

      const currentTime = videoRef.current.currentTime;
      const activeSubtitle = subtitles.find(
        subtitle => currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
      );

      setCurrentSubtitle(activeSubtitle?.text || '');
    };

    const startSubtitleTracking = () => {
      if (subtitleIntervalRef.current) {
        clearInterval(subtitleIntervalRef.current);
      }
      
      subtitleIntervalRef.current = setInterval(updateSubtitle, 100); // Update every 100ms
    };

    const stopSubtitleTracking = () => {
      if (subtitleIntervalRef.current) {
        clearInterval(subtitleIntervalRef.current);
        subtitleIntervalRef.current = null;
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('play', startSubtitleTracking);
      video.addEventListener('pause', stopSubtitleTracking);
      video.addEventListener('ended', stopSubtitleTracking);
      video.addEventListener('timeupdate', updateSubtitle);
    }

    return () => {
      stopSubtitleTracking();
      if (video) {
        video.removeEventListener('play', startSubtitleTracking);
        video.removeEventListener('pause', stopSubtitleTracking);
        video.removeEventListener('ended', stopSubtitleTracking);
        video.removeEventListener('timeupdate', updateSubtitle);
      }
    };
  }, [subtitles]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (subtitleIntervalRef.current) {
        clearInterval(subtitleIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Video Player */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover rounded-lg"
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => setError('Failed to load video')}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-3 text-white">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Loading video...</span>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center rounded-lg">
          <div className="text-center text-white">
            <div className="text-red-400 mb-2">⚠️</div>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Subtitle Display */}
      {currentSubtitle && !isLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 max-w-4xl mx-4">
            <p className="text-white text-lg font-medium text-center leading-relaxed">
              {currentSubtitle}
            </p>
          </div>
        </motion.div>
      )}

      {/* Subtitle Controls */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2 text-white text-sm">
            <div className={`w-2 h-2 rounded-full ${subtitles.length > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
            <span>{subtitles.length > 0 ? 'Subtitles loaded' : 'No subtitles'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
