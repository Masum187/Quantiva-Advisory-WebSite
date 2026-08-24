'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { V3_HOME, type V3Locale } from '../../../lib/data/v3-content';

export default function Capabilities({ locale }: { locale: V3Locale }) {
  const content = V3_HOME[locale].process;
  const reduceMotion = useReducedMotion();

  return (
    <section className="v3-capabilities" aria-labelledby="v3-capabilities-title">
      <header className="v3-section-head">
        <p className="v3-eyebrow">{content.eyebrow}</p>
        <h2 id="v3-capabilities-title">{content.title}</h2>
      </header>

      <ol className="v3-process-list">
        {content.steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={reduceMotion ? false : { opacity: 0.001, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, delay: index * 0.08 }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.li>
        ))}
      </ol>

      <div className="v3-capability-groups">
        {content.groups.map((group, index) => (
          <motion.section
            key={group.title}
            aria-labelledby={`v3-capability-${index}`}
            initial={reduceMotion ? false : { opacity: 0.001, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: index * 0.08 }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3 id={`v3-capability-${index}`}>{group.title}</h3>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </motion.section>
        ))}
      </div>
    </section>
  );
}
