'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import ServiceNavigation from '../../../components/ServiceNavigation';
import ServiceVideoBackground from '../../../components/ServiceVideoBackground';
import {
  EASE,
  ScrollProgress,
  LetterHeadline,
  ScrollStatement,
  SpotlightCard,
  GhostNumber,
  PulseNode,
  ShineButton,
  SectionLabel,
  AccentOrbs,
} from '../../../components/pages/projects/detail/shared';

const ACCENT = '#38bdf8';

const LEVELS = [
  { label: 'IaaS', title: 'Infrastructure', copy: 'Compute, network, and storage as an elastic foundation.' },
  { label: 'PaaS', title: 'Platform', copy: 'Managed services and pipelines accelerate development.' },
  { label: 'SaaS', title: 'Applications', copy: 'Cloud-native software that scales with your business.' },
  { label: 'FinOps', title: 'Governance', copy: 'Cost transparency and governance across every layer.' },
];

export default function CloudServicePage() {
  const reduceMotion = useReducedMotion();

  const offerings = [
    {
      title: 'Cloud Strategy & Assessment',
      description: 'Strategic planning and assessment of your cloud transformation',
      features: ['Cloud Readiness Assessment', 'Multi-Cloud Strategy', 'Cost Optimization', 'Migration Planning'],
    },
    {
      title: 'Cloud Migration Services',
      description: 'Professional migration of your workloads to the cloud',
      features: ['Lift & Shift Migration', 'Replatforming', 'Refactoring', 'Data Migration'],
    },
    {
      title: 'Cloud Native Development',
      description: 'Development of cloud-native applications and microservices',
      features: ['Container Orchestration', 'Serverless Computing', 'DevOps Pipelines', 'Auto Scaling'],
    },
    {
      title: 'Cloud Security & Compliance',
      description: 'Comprehensive security concepts for cloud environments',
      features: ['Identity & Access Management', 'Data Protection', 'Security Monitoring', 'Compliance Auditing'],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black">
      <ScrollProgress accent={ACCENT} />
      <ServiceNavigation lang="en" serviceTitle="Cloud Solutions" serviceId="cloud" />
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760346430/kling_20251009_Image_to_Video_A_confiden_4908_0_bimwvi.mp4"]} />

      <div className="relative z-10">
        {/* Hero — poster, aligned bottom left */}
        <section className="relative flex min-h-screen items-end overflow-hidden">
          <AccentOrbs accent={ACCENT} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-12 md:pb-28">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="font-mono text-xs uppercase tracking-[0.35em]"
              style={{ color: ACCENT }}
            >
              Cloud Solutions — Elevation
            </motion.p>
            <h1 className="mt-6 text-[clamp(3rem,9vw,7.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
              <span className="block">
                <LetterHeadline text="Cloud" delay={0.3} />
              </span>
              <span className="block" style={{ color: ACCENT }}>
                <LetterHeadline text="Solutions" delay={0.55} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-gray-300"
            >
              AWS, Azure, GCP — multi-cloud strategies, migration, and optimization of your
              cloud infrastructure. We help you unlock the full potential of the cloud.
            </motion.p>
          </div>
        </section>

        {/* Statement */}
        <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <ScrollStatement text="The cloud is not a place but a way of operating. Those who master it gain speed, resilience, and cost control all at once." />
        </section>

        {/* Offerings — floating, staggered layers */}
        <section className="mx-auto max-w-7xl px-6 pb-28 md:px-12">
          <SectionLabel num="01" accent={ACCENT}>
            Our Cloud Services
          </SectionLabel>
          <div className="mt-12 space-y-10 md:space-y-16">
            {offerings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className={`w-full max-w-2xl ${index % 2 === 1 ? 'md:ml-auto' : ''}`}
              >
                <SpotlightCard
                  accent={ACCENT}
                  className="relative rounded-3xl border border-white/10 bg-slate-950/80 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-sky-400/40 md:p-10"
                >
                  <GhostNumber index={index} />
                  <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
                    Layer {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-white md:text-3xl">{offering.title}</h3>
                  <p className="mt-4 leading-relaxed text-gray-300">{offering.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {offering.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-gray-200">
                        <CheckCircle className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cloud layers — vertical line with pulse nodes */}
        <section className="border-t border-white/10 bg-black/60 py-28 backdrop-blur-sm">
          <div className="mx-auto max-w-3xl px-6">
            <SectionLabel num="02" accent={ACCENT}>
              From Foundation to Governance
            </SectionLabel>
            <div className="relative mt-14 pl-5">
              <motion.span
                aria-hidden="true"
                className="absolute bottom-5 left-[39px] top-5 w-px origin-top"
                style={{ background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT}22)` }}
                initial={{ scaleY: reduceMotion ? 1 : 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, ease: EASE }}
              />
              <div className="space-y-12">
                {LEVELS.map((level, index) => (
                  <motion.div
                    key={level.label}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
                    className="flex items-start gap-6"
                  >
                    <PulseNode index={index} accent={ACCENT} label={String(index + 1)} />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
                        {level.label}
                      </p>
                      <h4 className="mt-1 text-xl font-semibold text-white">{level.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">{level.copy}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Ready for the <span style={{ color: ACCENT }}>cloud future?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
              Let&apos;s develop your cloud strategy together and execute it successfully.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ShineButton href="/en#contact" accent={ACCENT}>
                Request cloud consulting
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
              <a
                href="/en/capabilities/cloud"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Technical details →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
