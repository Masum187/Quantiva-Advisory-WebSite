'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import ServiceNavigation from '../../../components/ServiceNavigation';
import VentureCanvas from '../../../components/pages/projects/VentureCanvas';
import {
  EASE,
  ScrollProgress,
  LetterHeadline,
  ScrollStatement,
  ShineButton,
  SectionLabel,
} from '../../../components/pages/projects/detail/shared';

const ACCENT = '#f87171';

const SCAN_LINES: { text: string; status: 'ok' | 'alert' | 'info' }[] = [
  { text: '[SCAN] Perimeter checked — 4 zones, 0 open ports', status: 'ok' },
  { text: '[SCAN] Identities validated — MFA active', status: 'ok' },
  { text: '[ALERT] 3 outdated certificates detected', status: 'alert' },
  { text: '[SCAN] Attack surface modeled — 12 vectors', status: 'info' },
  { text: '[OK] Remediation plan created', status: 'ok' },
];

const PRINCIPLES = [
  { value: 'Zero Trust', label: 'Never trust, always verify — every request is checked.' },
  { value: '24/7', label: 'Continuous monitoring instead of one-off audits.' },
  { value: 'Defense in Depth', label: 'Layered controls from network to identity.' },
  { value: 'Compliance', label: 'Regulatory requirements as the baseline, not the goal.' },
];

export default function CyberSecurityServicePage() {
  const reduceMotion = useReducedMotion();

  const offerings = [
    {
      title: 'Zero Trust & IAM',
      description: 'Implementation of modern Zero Trust frameworks and identity access management for maximum security.',
      features: ['Multi-Factor Authentication', 'Role-Based Access Control', 'Identity Governance', 'Single Sign-On'],
      details: 'Zero Trust follows the principle of "Never trust, always verify" and minimizes attack surfaces through systematic identity and device authentication. Our IAM solutions provide seamless user authentication and granular permission control.',
      benefits: ['Minimized attack surfaces', 'Compliance & data protection', 'Granular access control', 'Scalable security architecture'],
    },
    {
      title: 'Security Architecture',
      description: 'Building a resilient, scalable security architecture for your enterprise.',
      features: ['Network Segmentation', 'Cloud Security', 'API Security', 'Security by Design'],
      details: 'We design holistic security architectures that integrate network and cloud security. Through security by design and API hardening, we create long-term protection against vulnerabilities and increase efficiency through automation.',
      benefits: ['Long-term protection against vulnerabilities', 'Efficiency gains through automation', 'Scalable architecture', 'Integration of new technologies'],
    },
    {
      title: 'Audits & Hardening',
      description: 'Systematic security reviews and hardening of your infrastructure against modern threats.',
      features: ['Security Assessments', 'Penetration Testing', 'Vulnerability Management', 'Compliance Audits'],
      details: 'Regular audits and hardening measures are the foundation of lasting protection. We conduct comprehensive security assessments and set up automated vulnerability scans with concrete remediation strategies.',
      benefits: ['Lasting protection through regular reviews', 'Automated vulnerability scans', 'Concrete remediation strategies', 'Compliance with regulatory requirements'],
    },
    {
      title: 'Threat Modeling',
      description: 'Proactive identification and assessment of security risks across your systems.',
      features: ['Risk Assessment', 'Attack Surface Analysis', 'Security Controls', 'Incident Response'],
      details: 'Threat modeling enables the systematic analysis of threats and risks. We model potential attackers and attack paths, prioritize risks, and develop proactive countermeasures for your security strategy.',
      benefits: ['Proactive development of countermeasures', 'Alignment with your actual threat landscape', 'Systematic risk assessment', 'Continuous improvement of your security strategy'],
    },
  ];

  const studies = [
    {
      title: 'ZTNA Study by techconsult (2024)',
      description: 'Shows how Zero Trust is replacing traditional security approaches, driven by cloud and remote work. Analyzes challenges and success factors.',
      topic: 'Zero Trust & IAM',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'PwC Digital Trust Insights (2022)',
      description: 'Only a third of companies worldwide rate their own cyber defense as "good to very good". Deficits in integrating new technologies.',
      topic: 'Security Architecture',
      date: '2022',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'TÜV Cybersecurity Study 2025',
      description: 'Highlights the rise of AI-powered attacks and inadequate defenses. Regular audits and hardening strongly recommended.',
      topic: 'Audits & Hardening',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'AI-Based Cyber Security Risk Analysis (SCS 2025)',
      description: 'Evaluation of artificial intelligence for automated risk detection and threat modeling.',
      topic: 'Threat Modeling',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Trend Study: IAM in German SMEs (2023)',
      description: 'Assesses awareness of risks from unauthorized access and the adoption of IAM solutions in the mid-market.',
      topic: 'Zero Trust & IAM',
      date: '2023',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Threat Modeling – Johner Institute (2024)',
      description: 'Describes the systematic discovery and elimination of risks through iterative, continuous threat modeling.',
      topic: 'Threat Modeling',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black">
      <ScrollProgress accent={ACCENT} />
      <ServiceNavigation lang="en" serviceTitle="Cyber Security" serviceId="security" />

      {/* Fixed Background Video — heavily darkened */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <video
          src="https://res.cloudinary.com/dbrisux8i/video/upload/v1760385739/kling_20251014_Text_to_Video_Scene_1__M_930_0_1_djdrj2.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10">
        {/* Hero — Terminal / Audit */}
        <section className="relative flex min-h-screen items-center py-32">
          <div className="mx-auto w-full max-w-3xl px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="text-center font-mono text-xs uppercase tracking-[0.4em] text-gray-500"
            >
              <span style={{ color: ACCENT }}>●</span> Cyber Security — Perimeter
            </motion.p>

            <h1 className="mt-8 text-center text-[clamp(2.6rem,7vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
              <LetterHeadline text="Cyber Security" delay={0.3} />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
              className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-gray-400"
            >
              Holistic security concepts, compliance, and risk management. We protect your
              digital assets and safeguard the security of your IT infrastructure.
            </motion.p>

            {/* Threat scan terminal */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
              className="mt-14 overflow-hidden rounded-xl border border-white/15 bg-black/90 shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${ACCENT}88` }} />
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
                  quantiva@perimeter — audit
                </span>
              </div>
              <motion.div
                className="space-y-2 px-5 py-5 font-mono text-xs sm:text-sm"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.35, delayChildren: 1.6 } } }}
              >
                {SCAN_LINES.map((line) => (
                  <motion.p
                    key={line.text}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    transition={{ duration: 0.4 }}
                    className={
                      line.status === 'alert'
                        ? 'text-red-400'
                        : line.status === 'ok'
                          ? 'text-emerald-400'
                          : 'text-gray-400'
                    }
                  >
                    {line.text}
                  </motion.p>
                ))}
                <motion.p
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-500"
                >
                  {'>'} _
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Offerings — Case Files */}
        <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <SectionLabel num="01" accent={ACCENT}>
            Our Security Services
          </SectionLabel>
          <div className="mt-14 space-y-16">
            {offerings.map((offering, index) => (
              <motion.article
                key={offering.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="group border-l-2 border-white/15 pl-6 transition-colors duration-300 hover:border-red-400/70 sm:pl-10"
              >
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
                  <span style={{ color: ACCENT }}>№{String(index + 1).padStart(3, '0')}</span> — Case File
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">{offering.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-gray-300">{offering.description}</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-400">{offering.details}</p>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-500">Services</p>
                    <ul className="mt-3 space-y-2">
                      {offering.features.map((feature) => (
                        <li key={feature} className="flex items-baseline gap-3 text-sm text-gray-200">
                          <span className="font-mono text-xs" style={{ color: ACCENT }}>+</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-500">Your Benefits</p>
                    <ul className="mt-3 space-y-2">
                      {offering.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-baseline gap-3 text-sm text-gray-200">
                          <span className="font-mono text-xs text-gray-500">▸</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Statement */}
        <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <ScrollStatement text="Security is not a state but a process. Every architecture is audited, every identity verified, every threat modeled — before it becomes an incident." />
        </section>

        {/* Radar block — principles */}
        <section className="relative overflow-hidden border-y border-white/10 py-28 md:py-36">
          <VentureCanvas effect="radar" accent={ACCENT} className="absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl px-6">
            <SectionLabel num="02" accent={ACCENT}>
              Principles of Defense
            </SectionLabel>
            <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
              {PRINCIPLES.map((principle, index) => (
                <motion.div
                  key={principle.value}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
                  className="border-t border-white/15 pt-5"
                >
                  <p className="text-2xl font-bold text-white md:text-3xl">{principle.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{principle.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Studies — Dossier */}
        <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <SectionLabel num="03" accent={ACCENT}>
            Latest Studies &amp; Insights
          </SectionLabel>
          <p className="mt-6 max-w-2xl text-gray-400">
            Research-backed insights into the current cyber security landscape.
          </p>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {studies.map((study, index) => (
              <motion.article
                key={study.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
                className="group flex items-start gap-5 py-6 transition-colors duration-300 hover:bg-white/[0.03] sm:items-center"
              >
                <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-md border border-white/10 sm:block">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="96px"
                    className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
                    <span style={{ color: ACCENT }}>{study.date}</span> — {study.topic}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">{study.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{study.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Ready for <span style={{ color: ACCENT }}>maximum security?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300">
              Let&apos;s develop your cyber security strategy together and execute it successfully.
            </p>
            <div className="mt-10 flex justify-center">
              <ShineButton href="/en#contact" accent={ACCENT}>
                Request security consulting
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
