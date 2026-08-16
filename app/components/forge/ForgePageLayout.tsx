'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ForgeLocale, forgePath } from '../../lib/data/forge-content';

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  locale: ForgeLocale;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function ForgePageLayout({
  locale,
  eyebrow,
  title,
  lead,
  children,
  ctaHref,
  ctaLabel,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="pt-[4.25rem]">
      <header className="forge-section border-b border-[var(--forge-line)] !pb-12 !pt-16">
        <div className="forge-container max-w-4xl">
          {eyebrow ? <p className="forge-meta">{eyebrow}</p> : null}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="forge-display mt-4 text-[clamp(2.75rem,7vw,5rem)]"
          >
            {title}
          </motion.h1>
          {lead ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--forge-muted)]">{lead}</p>
          ) : null}
          {ctaHref && ctaLabel ? (
            <Link href={ctaHref.startsWith('/v2/') ? ctaHref : forgePath(locale, ctaHref)} className="forge-cta mt-8">
              {ctaLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      </header>
      <div className="forge-section !pt-12">{children}</div>
    </div>
  );
}
