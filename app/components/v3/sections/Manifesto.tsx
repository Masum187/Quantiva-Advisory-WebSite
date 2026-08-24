'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { V3_HOME, type V3Locale } from '../../../lib/data/v3-content';

export default function Manifesto({ locale }: { locale: V3Locale }) {
  const content = V3_HOME[locale].manifesto;
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;

  return (
    <section className="v3-manifesto" aria-labelledby="v3-manifesto-title">
      <p className="v3-eyebrow">{content.eyebrow}</p>
      <h2 id="v3-manifesto-title">
        {content.lines.map((line, lineIndex) => (
          <span key={line} className={lineIndex % 2 ? 'v3-manifesto-signal' : undefined}>
            {line.split(' ').map((word) => {
              const index = wordIndex++;
              return (
                <motion.span
                  className="v3-manifesto-word"
                  key={`${word}-${index}`}
                  initial={reduceMotion ? false : { opacity: 0.001, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.75 }}
                  transition={{ duration: 0.9, delay: index * 0.055 }}
                >
                  {word}&nbsp;
                </motion.span>
              );
            })}
          </span>
        ))}
      </h2>
      <motion.div
        className="v3-manifesto-bar"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0.001, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.9 }}
      />
      <motion.p
        className="v3-manifesto-copy"
        initial={reduceMotion ? false : { opacity: 0.001, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9 }}
      >
        {content.text}
      </motion.p>
    </section>
  );
}
