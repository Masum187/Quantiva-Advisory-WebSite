'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';
import { V3_HOME, type V3Locale } from '../../../lib/data/v3-content';

type ServiceItemProps = {
  index: number;
  count: number;
  progress: MotionValue<number>;
  service: { readonly title: string; readonly text: string };
};

function ServiceItem({ index, count, progress, service }: ServiceItemProps) {
  const segment = 1 / count;
  const center = segment * (index + 0.5);
  const opacity = useTransform(
    progress,
    [Math.max(0, center - segment * 0.72), center, Math.min(1, center + segment * 0.72)],
    [0.001, 1, 0.001],
  );
  const y = useTransform(
    progress,
    [Math.max(0, center - segment), center, Math.min(1, center + segment)],
    ['18vh', '0vh', '-18vh'],
  );
  const scale = useTransform(
    progress,
    [Math.max(0, center - segment), center, Math.min(1, center + segment)],
    [0.96, 1, 0.98],
  );
  const panelScaleX = useTransform(
    progress,
    [Math.max(0, center - segment * 0.62), center - segment * 0.12, Math.min(1, center + segment * 0.62)],
    [0, 1, 0],
  );
  const panelOpacity = useTransform(
    progress,
    [Math.max(0, center - segment * 0.62), center - segment * 0.12, Math.min(1, center + segment * 0.62)],
    [0.001, 1, 0.001],
  );

  return (
    <motion.li className="v3-service-card" style={{ opacity, y, scale }}>
      <span>{String(index + 1).padStart(2, '0')}</span>
      <h3>{service.title}</h3>
      <motion.div
        className="v3-service-detail"
        style={{ opacity: panelOpacity, scaleX: panelScaleX }}
      >
        <p>{service.text}</p>
        <i aria-hidden="true">↗</i>
      </motion.div>
    </motion.li>
  );
}

export default function ServicesStage({ locale }: { locale: V3Locale }) {
  const content = V3_HOME[locale].services;
  const stageRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={stageRef}
      className={`v3-services-stage${reduceMotion ? ' v3-services-reduced' : ''}`}
      aria-labelledby="v3-services-title"
    >
      <div className="v3-services-pin">
        <header className="v3-services-header">
          <p className="v3-eyebrow">{content.eyebrow}</p>
          <h2 id="v3-services-title">{content.title}</h2>
        </header>
        <div className="v3-services-window">
          <ol className="v3-services-track">
            {content.items.map((service, index) => reduceMotion ? (
              <li className="v3-service-card" key={service.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <div>
                  <p>{service.text}</p>
                  <i aria-hidden="true">↗</i>
                </div>
              </li>
            ) : (
              <ServiceItem
                key={service.title}
                index={index}
                count={content.items.length}
                progress={scrollYProgress}
                service={service}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
