'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { FORGE_HOME, ForgeLocale, forgePath } from '../../lib/data/forge-content';
import ForgeCanvasVisual from './ForgeCanvasVisual';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ForgeHome({ locale }: { locale: ForgeLocale }) {
  const t = FORGE_HOME[locale];
  const reduce = useReducedMotion();

  return (
    <>
      <section className="relative min-h-svh overflow-hidden pt-[4.25rem]">
        <ForgeCanvasVisual />
        <div className="relative z-10 forge-container flex min-h-[calc(100svh-4.25rem)] flex-col justify-between pb-10 pt-10 md:pb-14 md:pt-16">
          <div className="max-w-3xl">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="forge-meta"
            >
              {t.meta}
            </motion.p>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="forge-display mt-6 text-[clamp(3.5rem,12vw,7.5rem)] text-[var(--forge-ink)]"
            >
              {t.brand}
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease }}
              className="forge-display mt-4 max-w-[18ch] whitespace-pre-line text-[clamp(2.25rem,5.5vw,3.75rem)] text-[var(--forge-ink)]"
            >
              {t.headline}
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-6 max-w-md text-base leading-relaxed text-[var(--forge-muted)] md:text-lg"
            >
              {t.support}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href={forgePath(locale, '/contact')} className="forge-cta">
                {t.ctaPrimary}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link href={forgePath(locale, '/services')} className="forge-cta-ghost">
                {t.ctaSecondary}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>

          <p className="forge-meta relative z-10 mt-16 md:mt-0">{t.proof}</p>
        </div>
      </section>

      <section className="forge-section border-t border-[var(--forge-line)]">
        <div className="forge-container">
          <h2 className="forge-display max-w-[14ch] whitespace-pre-line text-[clamp(2.5rem,6vw,4.5rem)]">
            {t.featuresTitle}
          </h2>
          <div className="mt-16 grid gap-0 md:grid-cols-2">
            {t.features.map((feature, index) => (
              <motion.article
                key={feature.n}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: index * 0.06, ease }}
                className="border-t border-[var(--forge-line)] py-10 md:px-6 md:odd:border-r"
              >
                <p className="forge-meta text-[var(--forge-signal)]">{feature.n}</p>
                <h3 className="mt-4 text-2xl font-medium tracking-tight md:text-3xl">{feature.title}</h3>
                <p className="mt-4 max-w-md text-[var(--forge-muted)] leading-relaxed">{feature.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="forge-section border-t border-[var(--forge-line)]">
        <div className="forge-container flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="forge-display text-[clamp(2.25rem,5vw,3.75rem)]">{t.closeTitle}</h2>
            <p className="mt-4 text-[var(--forge-muted)] leading-relaxed">{t.closeBody}</p>
          </div>
          <Link href={forgePath(locale, '/contact')} className="forge-cta">
            {t.closeCta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
