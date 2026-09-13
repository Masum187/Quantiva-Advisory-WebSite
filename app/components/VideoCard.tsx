'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail } from 'lucide-react';

interface VideoCardProps {
  videoUrl: string;
  subtitleUrl?: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  className?: string;
}

export default function VideoCard({
  videoUrl,
  subtitleUrl,
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className = ''
}: VideoCardProps) {
  return (
    <section className={`py-16 bg-transparent ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900/10 to-purple-900/10 border border-teal-500/20 shadow-2xl backdrop-blur-sm"
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-purple-900/20" />
          
          {/* Video Container */}
          <div className="relative aspect-video w-full">
            <video
              className="w-full h-full object-cover opacity-80"
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={(e) => {
                console.error('Video error:', e);
              }}
            >
              {subtitleUrl && (
                <track
                  kind="subtitles"
                  src={subtitleUrl}
                  srcLang="de"
                  label="Deutsch"
                  default
                />
              )}
            </video>
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Play Button Overlay (optional) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 border border-white/30">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {title}
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={primaryButtonLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition-all group"
                >
                  {primaryButtonText}
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={secondaryButtonLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all group"
                >
                  {secondaryButtonText}
                  <Mail className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
