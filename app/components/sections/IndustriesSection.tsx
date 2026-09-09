'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { industriesDe, industriesEn } from '../../lib/data/industries';
import Link from 'next/link';
import { useLanguage } from '../QuantivaWebsite';

/**
 * Card media: plays looping, muted video(s) when the card is in the viewport.
 * Supports a single clip or two clips as a split screen. Falls back to the
 * still image whenever the user prefers reduced motion.
 */
function IndustryCardMedia({
  image,
  video,
  splitVideos,
  playbackRate = 1,
  alt,
}: {
  image: string;
  video?: string;
  splitVideos?: [string, string];
  playbackRate?: number;
  alt: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || reduceMotion) return;

    const videos = Array.from(wrapper.querySelectorAll('video'));
    videos.forEach((v) => {
      v.playbackRate = playbackRate;
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        videos.forEach((v) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(wrapper);
    return () => io.disconnect();
  }, [reduceMotion, playbackRate]);

  const sources = splitVideos ?? (video ? [video] : []);

  if (sources.length === 0 || reduceMotion) {
    return (
      <Image
        src={image}
        alt={alt}
        width={400}
        height={256}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    );
  }

  return (
    <div ref={wrapperRef} className="flex h-full w-full" aria-label={alt}>
      {sources.map((src) => (
        <video
          key={src}
          src={src}
          poster={sources.length === 1 ? image : undefined}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full min-w-0 flex-1 object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ))}
    </div>
  );
}

interface IndustriesSectionProps {
  lang: 'de' | 'en';
}

export default function IndustriesSection({ lang }: IndustriesSectionProps) {
  const industries = lang === 'de' ? industriesDe : industriesEn;
  const { localePath } = useLanguage();
  const headline = lang === 'de' ? 'Branchen-Expertise' : 'Industry Expertise';
  const subline =
    lang === 'de'
      ? 'Wir begleiten mittelständische Marktführer in regulierten und wachstumsstarken Branchen.'
      : 'We partner with mid-market leaders in regulated and fast-scaling industries.';

  return (
    <section className="relative bg-black py-20" id="industries">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.08),_transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-teal-500/40 bg-teal-500/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-200">
            <Briefcase className="h-4 w-4" />
            {lang === 'de' ? 'Mittelstand Branchen' : 'Mid-Market Verticals'}
          </div>
          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">{headline}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300 md:text-lg">{subline}</p>
        </motion.div>

        {/* Framed box with an endless marquee running left to right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="industries-marquee relative mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] py-8 shadow-[0_40px_120px_-60px_rgba(45,212,191,0.35)] backdrop-blur"
        >
          <div className="industries-marquee-track">
            {[false, true].map((isClone) => (
              <div
                key={isClone ? 'clone' : 'original'}
                className="flex shrink-0 gap-8 px-4"
                aria-hidden={isClone || undefined}
              >
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={localePath(`/industries/${industry.slug}`)}
                    tabIndex={isClone ? -1 : undefined}
                    className="group relative block w-[320px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-900/60 transition-transform duration-500 hover:-translate-y-1 md:w-[360px]"
                  >
                    <div className="relative h-56 overflow-hidden md:h-64">
                      <IndustryCardMedia
                        image={industry.image}
                        video={industry.video}
                        splitVideos={industry.splitVideos}
                        playbackRate={industry.playbackRate}
                        alt={industry.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white">{industry.title}</h3>
                      <p className="mt-2 text-sm text-gray-400">{industry.description}</p>
                      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-gray-400">
                        <span>{industry.projects}+ {lang === 'de' ? 'Projekte' : 'projects'}</span>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Fade edges so the cards dissolve at the box borders */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent md:w-24" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent md:w-24" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
