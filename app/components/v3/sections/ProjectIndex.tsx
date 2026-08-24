'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { V3_HOME, type V3Locale } from '../../../lib/data/v3-content';

export default function ProjectIndex({ locale }: { locale: V3Locale }) {
  const content = V3_HOME[locale].projects;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
  const previewScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.025, 1.04]);

  return (
    <section ref={sectionRef} className="v3-projects" aria-labelledby="v3-projects-title">
      <header className="v3-section-head">
        <p className="v3-eyebrow">{content.eyebrow}</p>
        <h2 id="v3-projects-title">{content.title}</h2>
      </header>

      <div className="v3-project-layout">
        <ol className="v3-project-list">
          {content.items.map((project, index) => (
            <motion.li
              key={project.title}
              initial={reduceMotion ? false : { opacity: 0.001, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, delay: index * 0.08 }}
            >
              <article className="v3-project-row" tabIndex={0}>
                <span className="v3-project-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{project.title}</h3>
                <p>{project.meta}</p>
                <div className="v3-project-meta">
                  <span>{project.year}</span>
                  <span>{project.stage}</span>
                </div>
              </article>
            </motion.li>
          ))}
        </ol>

        <motion.div
          className="v3-project-preview"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0.001, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="v3-project-preview-image"
            style={reduceMotion ? undefined : { y: previewY, scale: previewScale }}
          />
          <span>{content.previewLabel}</span>
          <strong>Q/INDEX</strong>
          <p>{content.title}</p>
        </motion.div>
      </div>
    </section>
  );
}
