'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import type { ForgeLocale } from '../../../lib/data/forge-content';
import { forgePath } from '../../../lib/data/forge-content';

export default function FinalCtaSection({ locale }: { locale: ForgeLocale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.1, 0.38, 0.16]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--forge-line)] py-28 md:py-40"
      aria-labelledby="final-cta-title"
    >
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? { opacity: 0.22 } : { opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] blur-[150px]"
      />
      <div className="forge-grid-bg pointer-events-none absolute inset-0 opacity-50" />

      <div className="forge-container relative flex flex-col items-center text-center">
        <p className="forge-meta text-[var(--fg-muted)]">
          {locale === 'de' ? 'Nächster Schritt' : 'Next step'}
        </p>
        <h2
          id="final-cta-title"
          className="forge-headline mt-5 max-w-[13ch] text-balance text-[clamp(2.75rem,7vw,6rem)]"
        >
          {locale === 'de'
            ? 'Das nächste Quality Gate beginnt mit einem klaren Gespräch.'
            : 'The next quality gate starts with a clear conversation.'}
        </h2>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--forge-muted)] md:text-lg">
          {locale === 'de'
            ? 'In einem ersten Termin klären wir Ausgangslage, Zielbild und den sinnvollsten nächsten Schritt.'
            : 'In an initial call, we clarify the current situation, target state, and the most useful next step.'}
        </p>
        <Link
          href={forgePath(locale, '/contact')}
          prefetch={false}
          className="forge-cta forge-final-cta mt-10"
        >
          {locale === 'de' ? 'Erstgespräch vereinbaren' : 'Book an intro call'}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
