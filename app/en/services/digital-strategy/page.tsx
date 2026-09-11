'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ServiceVideoBackground from '../../../components/ServiceVideoBackground';
import {
  EASE,
  ScrollProgress,
  MaskedHeadline,
  ScrollStatement,
  ShineButton,
  SectionLabel,
} from '../../../components/pages/projects/detail/shared';

const ACCENT = '#fbbf24';
const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

const ROADMAP = [
  { step: 'Analysis', copy: 'Assess where you stand: capture maturity, processes, and capabilities.' },
  { step: 'Strategy', copy: 'Set the course: define the roadmap, business case, and priorities.' },
  { step: 'Enablement', copy: 'Train your teams: workshops, training sessions, and knowledge transfer.' },
  { step: 'Scaling', copy: 'Measure the impact: support adoption and sustain success.' },
];

export default function DigitalStrategyServicePage() {
  const reduceMotion = useReducedMotion();

  const offerings = [
    {
      title: 'Digital Strategy Development',
      description: 'Development of a tailored digital strategy for your company',
      features: ['Digital Maturity Assessment', 'Technology Roadmap', 'Business Case Analysis', 'Strategic Planning'],
    },
    {
      title: 'Change Management & Training',
      description: 'Guiding your organization through digital transformation',
      features: ['Stakeholder Management', 'Communication Strategy', 'Training Programs', 'Adoption Support'],
    },
    {
      title: 'Process Optimization',
      description: 'Analysis and optimization of your business processes',
      features: ['Process Mapping', 'Gap Analysis', 'Automation Opportunities', 'Performance Metrics'],
    },
    {
      title: 'Innovation Consulting',
      description: 'Identification and implementation of innovative technologies',
      features: ['Technology Scouting', 'Innovation Labs', 'Pilot Projects', 'ROI Measurement'],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black">
      <ScrollProgress accent={ACCENT} />
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1762103900/grok-video-dda3f51a-7efb-453a-a311-9467a101e4a0_rteefh.mp4"]} />

      <div className="relative z-10">
        {/* Hero — magazine cover, centered */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link
              href="/en"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-gray-400 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to main page
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-16 font-mono text-sm tracking-[0.5em]"
            style={{ color: ACCENT }}
          >
            N° I — ENABLEMENT &amp; TRAINING
          </motion.p>

          <motion.span
            aria-hidden="true"
            className="mt-8 h-px w-40 origin-center bg-white/30"
            initial={{ scaleX: reduceMotion ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          />

          <h1 className="mt-10 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-extralight uppercase leading-[1.05] tracking-[0.12em] text-white">
            <MaskedHeadline text="Enablement & Training" />
          </h1>

          <motion.span
            aria-hidden="true"
            className="mt-10 h-px w-40 origin-center bg-white/30"
            initial={{ scaleX: reduceMotion ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
            className="mt-10 max-w-xl text-lg font-light leading-relaxed tracking-wide text-gray-300"
          >
            Workshops, training, and knowledge transfer for your teams. We empower your
            people to shape the digital transformation successfully.
          </motion.p>
        </section>

        {/* Offerings — numbered editorial list */}
        <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <SectionLabel num="01" accent={ACCENT}>
            Our Enablement Services
          </SectionLabel>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {offerings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: EASE }}
                className="group py-10 transition-transform duration-500 hover:translate-x-2 md:py-12"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:gap-12">
                  <span
                    className="w-14 shrink-0 font-mono text-2xl font-light tracking-widest"
                    style={{ color: ACCENT }}
                  >
                    {ROMAN[index]}
                  </span>
                  <div>
                    <h3 className="text-2xl font-extralight tracking-wide text-white md:text-3xl">
                      {offering.title}
                    </h3>
                    <p className="mt-3 font-light leading-relaxed text-gray-400">
                      {offering.description}
                    </p>
                    <p className="mt-4 text-sm font-light tracking-wide text-gray-500">
                      {offering.features.join('  ·  ')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pull quote */}
        <section className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
          <ScrollStatement
            text="Strategy is not a document — it is an organization's ability to hold its course and empower its people."
            className="text-[clamp(1.6rem,3.6vw,2.8rem)] font-extralight leading-snug tracking-wide"
          />
        </section>

        {/* Roadmap — ascending staircase */}
        <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <SectionLabel num="02" accent={ACCENT}>
            The Path — Step by Step
          </SectionLabel>
          <div className="mt-14">
            {ROADMAP.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
                className="border-t border-white/15 py-8"
                style={{ marginLeft: `${index * 8}%` }}
              >
                <p className="font-mono text-xs tracking-[0.4em]" style={{ color: ACCENT }}>
                  {ROMAN[index]}
                </p>
                <h4 className="mt-2 text-xl font-extralight uppercase tracking-[0.2em] text-white md:text-2xl">
                  {item.step}
                </h4>
                <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-gray-400">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-extralight tracking-wide text-white md:text-5xl">
              Ready for <span style={{ color: ACCENT }}>digital transformation?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light text-gray-300">
              Let&apos;s develop your digital strategy together and empower your teams.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ShineButton href="/en#contact" accent={ACCENT}>
                Request Strategy Consulting
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
              <Link
                href="/en/capabilities/digital-strategy"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Technical Details →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
