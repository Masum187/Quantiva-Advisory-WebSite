'use client';

/**
 * Shared motion primitives for the career subpages (culture & benefits +
 * career areas), modelled on the benjamincreative.me motion language:
 *
 * - MaskedTextReveal: word-by-word masked headline reveal (expo-out)
 * - ScrollZoom: scroll-linked scale/opacity entrance with spring smoothing
 * - useHeroChoreography: hero text lifts & fades while the background zooms
 * - AuroraBlob / GrainOverlay: slow, continuously drifting theme background
 * - MarqueeBand: infinite horizontally-looping text ticker
 * - FadeUp: staged copy reveal for body text and list items
 *
 * Every primitive degrades to a fully static presentation when the user
 * prefers reduced motion.
 */

import { useRef, type CSSProperties, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type Variants,
} from 'framer-motion';

/** Signature expo-out easing (cubic-bezier(0.16, 1, 0.3, 1)). */
export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* MaskedTextReveal                                                    */
/* ------------------------------------------------------------------ */

const maskedTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  blockquote: motion.blockquote,
} as const;

export type MaskedTag = keyof typeof maskedTags;

export interface MaskedTextRevealProps {
  /** Semantic tag to render – defaults to h2. */
  as?: MaskedTag;
  /** Text to split into words. Use "\n" for explicit line breaks. */
  text: string;
  className?: string;
  /** Optional per-word class (e.g. gradient on the last word). */
  wordClassName?: (word: string, index: number, total: number) => string | undefined;
  /**
   * "mount" animates immediately (hero H1), "inView" animates once when
   * scrolled into view (section headings). Defaults to "inView".
   */
  mode?: 'mount' | 'inView';
  delay?: number;
  /** Stagger between words – defaults to 0.07s. */
  stagger?: number;
  /** Decorative suffix (e.g. an accent dot) revealed with the last word. */
  suffix?: ReactNode;
}

const maskedWordVariants: Variants = {
  hidden: { y: '110%', rotate: 2.5 },
  visible: {
    y: '0%',
    rotate: 0,
    transition: { duration: 0.9, ease: EXPO_OUT },
  },
};

/**
 * Splits a headline into words, each inside an overflow-hidden wrapper;
 * the words slide up from below the mask with a slight rotation and a
 * per-word stagger. Renders as a proper heading tag and keeps the full
 * text accessible via aria-label.
 */
export function MaskedTextReveal({
  as = 'h2',
  text,
  className,
  wordClassName,
  mode = 'inView',
  delay = 0,
  stagger = 0.07,
  suffix,
}: MaskedTextRevealProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const lines = text.split('\n');
  const allWords = lines.flatMap((line) => line.split(' ').filter(Boolean));
  const totalWords = allWords.length;

  if (prefersReducedMotion) {
    const StaticTag = as;
    let staticIndex = 0;
    return (
      <StaticTag className={className}>
        {lines.map((line, li) => (
          <span key={li} className={lines.length > 1 ? 'block' : undefined}>
            {line
              .split(' ')
              .filter(Boolean)
              .map((word, wi, arr) => {
                const idx = staticIndex++;
                return (
                  <span key={wi} className={wordClassName?.(word, idx, totalWords)}>
                    {word}
                    {wi < arr.length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            {li === lines.length - 1 ? suffix : null}
          </span>
        ))}
      </StaticTag>
    );
  }

  const MotionTag = maskedTags[as] as typeof motion.div;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const trigger =
    mode === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : {
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once: true, margin: '-80px' },
        };

  let wordIndex = 0;
  return (
    <MotionTag
      className={className}
      aria-label={text.replace(/\n/g, ' ')}
      variants={containerVariants}
      {...trigger}
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className={lines.length > 1 ? 'block' : undefined}>
          {line
            .split(' ')
            .filter(Boolean)
            .map((word, wi, arr) => {
              const idx = wordIndex++;
              return (
                <span key={wi}>
                  <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                    <motion.span
                      variants={maskedWordVariants}
                      className={`inline-block origin-left will-change-transform ${
                        wordClassName?.(word, idx, totalWords) ?? ''
                      }`}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {wi < arr.length - 1 ? ' ' : ''}
                </span>
              );
            })}
          {li === lines.length - 1 && suffix !== undefined && (
            <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
              <motion.span
                variants={maskedWordVariants}
                className="inline-block will-change-transform"
              >
                {suffix}
              </motion.span>
            </span>
          )}
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollZoom                                                          */
/* ------------------------------------------------------------------ */

export interface ScrollZoomProps {
  children: ReactNode;
  className?: string;
  /** Scale at the start of the entrance – defaults to 0.92. */
  from?: number;
  /** Scale once fully entered – defaults to 1. */
  to?: number;
}

/**
 * Scroll-linked zoom: the block scales from `from` to `to` (plus fades in)
 * while it enters the viewport, smoothed with a spring so it feels fluid.
 */
export function ScrollZoom({ children, className, from = 0.92, to = 1 }: ScrollZoomProps) {
  const prefersReducedMotion = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.45'],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [from, to]), {
    stiffness: 110,
    damping: 24,
  });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 110,
    damping: 24,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReducedMotion ? undefined : { scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero scroll choreography                                            */
/* ------------------------------------------------------------------ */

export interface HeroChoreography {
  /** Attach to the hero section container. */
  heroRef: React.RefObject<HTMLDivElement | null>;
  /** Apply to the hero text block – lifts ~60px and fades while scrolling out. */
  textStyle: MotionStyle | undefined;
  /** Apply to the hero background/media layer – zooms 1 → 1.15 simultaneously. */
  bgStyle: MotionStyle | undefined;
}

/**
 * The classic "hero dissolves" effect: while the hero scrolls out of view
 * the text lifts and fades, the background zooms in. Returns undefined
 * styles (no movement) under reduced motion.
 */
export function useHeroChoreography(): HeroChoreography {
  const prefersReducedMotion = !!useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.15]), {
    stiffness: 90,
    damping: 24,
  });

  return {
    heroRef,
    textStyle: prefersReducedMotion ? undefined : { y: textY, opacity: textOpacity },
    bgStyle: prefersReducedMotion ? undefined : { scale: bgScale },
  };
}

/* ------------------------------------------------------------------ */
/* Animated background layer                                           */
/* ------------------------------------------------------------------ */

export interface AuroraBlobProps {
  /** Position, size and theme colour (e.g. "-top-48 -left-32 w-[640px] h-[640px] bg-emerald-500/10 blur-3xl"). */
  className: string;
  /** Loop duration in seconds (18–30s recommended) – defaults to 24. */
  duration?: number;
  delay?: number;
  /** Drift distance in px – defaults to 60. */
  drift?: number;
  style?: CSSProperties;
}

/**
 * A slowly drifting aurora/gradient blob. Decorative only (aria-hidden,
 * pointer-events-none) and completely static under reduced motion.
 */
export function AuroraBlob({ className, duration = 24, delay = 0, drift = 60, style }: AuroraBlobProps) {
  const prefersReducedMotion = !!useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={style}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              x: [0, drift, -drift * 0.5, 0],
              y: [0, -drift * 0.6, drift * 0.4, 0],
              scale: [1, 1.12, 0.95, 1],
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : { duration, delay, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  );
}

/** Subtle static film-grain overlay (decorative, non-animated). */
export function GrainOverlay({ className = 'opacity-[0.05]' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: '180px 180px',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* MarqueeBand                                                         */
/* ------------------------------------------------------------------ */

const MARQUEE_SEPARATORS = ['*', '#', '™'] as const;

export interface MarqueeBandProps {
  /** Theme phrases – interleaved with * / # / ™ separators. */
  phrases: string[];
  /** Band container styling (background, text colour, padding). */
  className?: string;
  /** Track typography (size, weight, tracking). */
  textClassName?: string;
  /** Seconds for one loop – defaults to 26. */
  duration?: number;
}

/**
 * Infinite horizontally-looping text ticker (Benjamin's "Be Real * Be
 * Creative # Be Bold ™" band). The animated track is aria-hidden with a
 * visually-hidden static alternative; the loop is disabled under
 * reduced motion.
 */
export function MarqueeBand({
  phrases,
  className = '',
  textClassName = 'text-3xl md:text-5xl font-bold tracking-tight',
  duration = 26,
}: MarqueeBandProps) {
  const prefersReducedMotion = !!useReducedMotion();

  const trackItems = phrases.flatMap((phrase, i) => [
    phrase,
    MARQUEE_SEPARATORS[i % MARQUEE_SEPARATORS.length],
  ]);

  const half = (
    <>
      {Array.from({ length: 3 }).flatMap((_, rep) =>
        trackItems.map((item, i) => (
          <span key={`${rep}-${i}`} className="mx-5 md:mx-8 shrink-0">
            {item}
          </span>
        ))
      )}
    </>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Screen-reader friendly static alternative */}
      <p className="sr-only">{phrases.join(' · ')}</p>

      <div
        aria-hidden="true"
        className={`flex whitespace-nowrap ${textClassName} ${
          prefersReducedMotion ? '' : 'animate-marquee'
        }`}
        style={prefersReducedMotion ? undefined : { animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{half}</div>
        {!prefersReducedMotion && <div className="flex shrink-0 items-center">{half}</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FadeUp – staged copy reveals                                        */
/* ------------------------------------------------------------------ */

export interface FadeUpProps {
  children: ReactNode;
  className?: string;
  /** Delay after the section heading's mask reveal. */
  delay?: number;
  /** Rise distance in px – defaults to 24. */
  y?: number;
}

/**
 * Body copy / list-item reveal: fades up ~24px with a small delay after
 * its heading's mask reveal (viewport once).
 */
export function FadeUp({ children, className, delay = 0, y = 24 }: FadeUpProps) {
  const prefersReducedMotion = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : delay, ease: EXPO_OUT }}
    >
      {children}
    </motion.div>
  );
}
