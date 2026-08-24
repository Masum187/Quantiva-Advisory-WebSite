'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { V3_HOME, v3Path, type V3Locale } from '../../lib/data/v3-content';

const BENJAMIN_EASE = [0.96, -0.02, 0.38, 1.01] as const;

export default function V3Hero({ locale }: { locale: V3Locale }) {
  const content = V3_HOME[locale];
  const year = new Date().getFullYear();
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    if (reduceMotion) {
      setIntroComplete(true);
      return;
    }

    const timer = window.setTimeout(() => setIntroComplete(true), 1150);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const terrainY = useTransform(scrollYProgress, [0, 1], ['0%', '7%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0px', '-70px']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0]);

  const reveal = reduceMotion || introComplete;
  const headlineWords = [
    { text: content.headlineLead, className: undefined },
    { text: content.headlineSignal, className: 'v3-headline-offset' },
    { text: content.headlineEnd, className: 'v3-headline-end' },
  ];

  return (
    <>
      {!reduceMotion && !introComplete ? (
        <motion.div
          className="v3-intro"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15, delay: 1 }}
        >
          <div className="v3-intro-lockup">
            <motion.div
              className="v3-intro-brand"
              initial={{ scale: 3.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: BENJAMIN_EASE }}
            >
              <span className="v3-intro-mark">Q</span>
              <span>Quantiva</span>
            </motion.div>
            <motion.span
              className="v3-intro-advisory"
              initial={{ opacity: 0.001, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.4, ease: BENJAMIN_EASE }}
            >
              Advisory
            </motion.span>
            <motion.span
              className="v3-intro-descriptor"
              initial={{ opacity: 0.001, y: 25, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.36, delay: 0.6, ease: BENJAMIN_EASE }}
            >
              Data · AI · Transformation
            </motion.span>
          </div>
        </motion.div>
      ) : null}

      <section
        ref={heroRef}
        className="v3-hero"
        aria-labelledby="v3-hero-title"
      >
        <motion.div
          className="v3-hero-grid"
          aria-hidden="true"
          style={reduceMotion ? undefined : { y: terrainY }}
        />
        <motion.div
          className="v3-hero-image"
          style={reduceMotion ? undefined : { y: mediaY }}
          initial={false}
          animate={reveal ? { opacity: 1, scale: 1 } : { opacity: 0.001, scale: 0.97 }}
          transition={{ duration: 0.9, delay: 0.08, ease: BENJAMIN_EASE }}
        >
          <Image
            className="v3-hero-media"
            src="/assets/v3/quantiva-data-landscape-orange.jpg"
            alt={content.imageLabel}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 92vw, 330px"
          />
          <span>Q/03</span>
        </motion.div>

        <motion.div
          className="v3-hero-copy"
          style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        >
          <motion.p
            className="v3-eyebrow"
            initial={false}
            animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 18 }}
            transition={{ duration: 0.45 }}
          >
            {content.eyebrow}
          </motion.p>
          <h1 id="v3-hero-title" className="v3-headline">
            {headlineWords.map((word, index) => (
              <motion.span
                key={word.text}
                className={word.className}
                initial={false}
                animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 25 }}
                transition={{ duration: 0.45, delay: index * 0.09 }}
              >
                {index === 1 ? <em>{word.text}</em> : word.text}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          className="v3-hero-bottom"
          initial={false}
          animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0.001, y: 25 }}
          transition={{ duration: 0.45, delay: 0.36 }}
        >
          <div className="v3-year-meta" aria-label={`${year}`}>
            <span>/ {year} /</span>
          </div>
          <a className="v3-scroll-meta" href="#v3-marquee">
            <span>{content.scroll}</span>
            <ArrowDown aria-hidden="true" />
          </a>
          <div className="v3-hero-intro">
            <p>{content.summary}</p>
            <div className="v3-hero-actions">
              <Link className="v3-primary-link" href={v3Path(locale, '/contact')} prefetch={false}>
                {content.cta}
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link className="v3-text-link" href={v3Path(locale, '/services')} prefetch={false}>
                {content.secondaryCta}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
