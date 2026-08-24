'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { V3_HOME, V3_MORE_NAV, V3_NAV, v3Path, type V3Locale } from '../../../lib/data/v3-content';

const BENJAMIN_EASE = [0.96, -0.02, 0.38, 1.01] as const;

export default function ClosingFooter({ locale }: { locale: V3Locale }) {
  const content = V3_HOME[locale].closing;
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="v3-closing" aria-labelledby="v3-closing-title">
        <p className="v3-eyebrow">{content.eyebrow}</p>
        <motion.div
          className="v3-closing-lockup"
          initial={reduceMotion ? false : { opacity: 0.001, scale: 0.82 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 1, ease: BENJAMIN_EASE }}
        >
          <span aria-hidden="true">(</span>
          <h2 id="v3-closing-title">{content.title}</h2>
          <span aria-hidden="true">)</span>
        </motion.div>
        <motion.div
          className="v3-closing-action"
          initial={reduceMotion ? false : { opacity: 0.001, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.12 }}
        >
          <Link href={v3Path(locale, '/contact')} prefetch={false}>
          {content.cta}
          <ArrowUpRight aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
      <footer className="v3-footer">
        <div className="v3-footer-main">
          <div>
            <Link className="v3-wordmark" href={v3Path(locale)} prefetch={false}>
              Quantiva<span>Advisory</span>
            </Link>
            <p>{content.footerLine}</p>
          </div>
          <nav aria-label={locale === 'de' ? 'Fußnavigation' : 'Footer navigation'}>
            {[...V3_NAV[locale].slice(1), ...V3_MORE_NAV[locale]].map((item) => (
              <Link key={item.href} href={v3Path(locale, item.href)} prefetch={false}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="v3-footer-meta">
          <span>© {year} · {content.legal}</span>
          <a href="#v3-main">{content.top} ↑</a>
        </div>
      </footer>
    </>
  );
}
