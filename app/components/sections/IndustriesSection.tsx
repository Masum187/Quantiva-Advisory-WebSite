'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { industriesDe, industriesEn } from '../../lib/data/industries';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

/** State for the channel page transition triggered by a card click. */
type ChannelTransition = {
  x: number;
  y: number;
  href: string;
  slug: string;
};

export default function IndustriesSection({ lang }: IndustriesSectionProps) {
  const industries = lang === 'de' ? industriesDe : industriesEn;
  const { localePath } = useLanguage();
  const router = useRouter();
  const [channel, setChannel] = useState<ChannelTransition | null>(null);
  const headline = lang === 'de' ? 'Branchen-Expertise' : 'Industry Expertise';
  const subline =
    lang === 'de'
      ? 'Wir begleiten mittelständische Marktführer in regulierten und wachstumsstarken Branchen.'
      : 'We partner with mid-market leaders in regulated and fast-scaling industries.';

  // Card click: open the subpage through a channel/tunnel that expands
  // from the card center. With reduced motion, navigate directly instead.
  const handleCardClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    slug: string
  ) => {
    if (channel) {
      e.preventDefault();
      return;
    }
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return; // default link navigation
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setChannel({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      href,
      slug,
    });
    router.prefetch(href);
  };

  useEffect(() => {
    if (!channel) return;
    const t = window.setTimeout(() => router.push(channel.href), 750);
    return () => window.clearTimeout(t);
  }, [channel, router]);

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
                    onClick={(e) =>
                      handleCardClick(
                        e,
                        localePath(`/industries/${industry.slug}`),
                        industry.slug
                      )
                    }
                    className={`group relative block w-[320px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-900/60 transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.06] hover:border-teal-400/50 hover:shadow-[0_30px_90px_-30px_rgba(45,212,191,0.5)] md:w-[360px] ${
                      channel && channel.slug === industry.slug && !isClone
                        ? 'z-20 scale-110'
                        : channel
                          ? 'opacity-40'
                          : ''
                    }`}
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

      {/* Channel transition: rings + fill expand from the clicked card and
          swallow the screen before the subpage loads. */}
      <AnimatePresence>
        {channel && (
          <div className="fixed inset-0 z-[100]" aria-hidden="true">
            {/* Expanding teal rings (the "channel" walls) */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-teal-400/70"
                style={{
                  left: channel.x,
                  top: channel.y,
                  width: 24,
                  height: 24,
                  x: '-50%',
                  y: '-50%',
                }}
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 160, opacity: 0 }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
            {/* Glow core at the click point */}
            <motion.div
              className="absolute rounded-full bg-teal-400/40 blur-2xl"
              style={{
                left: channel.x,
                top: channel.y,
                width: 120,
                height: 120,
                x: '-50%',
                y: '-50%',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 6, opacity: [0, 1, 0.6] }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
            {/* Black fill that closes the channel and covers the screen */}
            <motion.div
              className="absolute rounded-full bg-black"
              style={{
                left: channel.x,
                top: channel.y,
                width: 24,
                height: 24,
                x: '-50%',
                y: '-50%',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 200 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.7, 0, 0.84, 0] }}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
