'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Boxes, ArrowLeft, ArrowUpRight, CheckCircle, Network, Zap, Shield } from 'lucide-react';
import ServiceVideoBackground from '../../../components/ServiceVideoBackground';
import VentureCanvas from '../../../components/pages/projects/VentureCanvas';
import {
  EASE,
  ScrollProgress,
  LetterHeadline,
  MaskedHeadline,
  ScrollStatement,
  SpotlightCard,
  GhostNumber,
  ShineButton,
  SectionLabel,
  AccentOrbs,
} from '../../../components/pages/projects/detail/shared';

const ACCENT = '#34d399';

/* ---------- Mesh diagram (hero, right) ---------- */

const MESH_NODES = [
  { id: 'gateway', x: 50, y: 10 },
  { id: 'auth', x: 14, y: 36 },
  { id: 'orders', x: 50, y: 48 },
  { id: 'billing', x: 86, y: 36 },
  { id: 'events', x: 28, y: 82 },
  { id: 'data', x: 72, y: 84 },
];

const MESH_EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [2, 3],
  [1, 4],
  [2, 4],
  [2, 5],
  [3, 5],
  [4, 5],
];

function MeshDiagram() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Connection lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {MESH_EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={MESH_NODES[a].x}
            y1={MESH_NODES[a].y}
            x2={MESH_NODES[b].x}
            y2={MESH_NODES[b].y}
            stroke={ACCENT}
            strokeOpacity={0.35}
            strokeWidth={0.5}
            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.9 + i * 0.08, ease: EASE }}
          />
        ))}
      </svg>

      {/* Service nodes */}
      {MESH_NODES.map((node, i) => (
        <span
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <motion.span
            className="inline-block rounded-lg border px-3 py-1.5 font-mono text-[11px] backdrop-blur-sm md:text-xs"
            style={{
              borderColor: `${ACCENT}55`,
              background: 'rgba(6,12,10,0.85)',
              color: ACCENT,
              boxShadow: `0 0 24px ${ACCENT}22`,
            }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5 + i * 0.12,
              type: 'spring',
              stiffness: 260,
              damping: 18,
            }}
          >
            {node.id}
          </motion.span>
        </span>
      ))}

      {/* Pulse at the center */}
      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.span
            className="block h-full w-full rounded-full"
            style={{ border: `1px solid ${ACCENT}44` }}
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: 2 }}
          />
        </span>
      )}
    </div>
  );
}

/* ---------- API contract code block ---------- */

const CONTRACT_LINES = [
  { text: 'openapi: 3.1.0', dim: true },
  { text: 'paths:', dim: true },
  { text: '  /orders/{id}:', dim: false },
  { text: '    get:', dim: false },
  { text: '      operationId: getOrder', dim: false },
  { text: '      responses:', dim: false },
  { text: "        '200':  # application/json", dim: false },
  { text: '          $ref: "#/components/schemas/Order"', dim: false },
  { text: 'x-service-mesh:', dim: true },
  { text: '  retries: 3 · timeout: 250ms · mTLS: on', dim: true },
];

function ContractCard() {
  return (
    <SpotlightCard
      accent={ACCENT}
      className="rounded-2xl border border-white/10 bg-[#060c0a]/90 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${ACCENT}88` }} />
        <span className="ml-3 font-mono text-xs text-gray-500">order-service · contract.yaml</span>
      </div>
      <div className="px-5 py-5 font-mono text-[13px] leading-relaxed">
        {CONTRACT_LINES.map((line, i) => (
          <motion.pre
            key={i}
            className="whitespace-pre-wrap break-words"
            style={{ color: line.dim ? '#6b7280' : ACCENT }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.09, ease: EASE }}
          >
            {line.text}
          </motion.pre>
        ))}
      </div>
    </SpotlightCard>
  );
}

/* ---------- Page ---------- */

export default function MicroservicesServicePage() {
  const reduceMotion = useReducedMotion();

  const offerings = [
    {
      icon: Boxes,
      title: 'Microservices Architecture',
      description: 'Modularity for scalability and agility - decomposing monolithic applications into independent, specialized services.',
      features: ['Domain-Driven Design', 'Service Decomposition', 'API Gateway Design', 'Event-Driven Architecture'],
      details: 'Microservices break monolithic applications down into independent, specialized services. They enable companies to respond faster to market changes and unlock new business models. Developed and scaled independently of one another, they enable faster innovation and easier maintenance.',
      benefits: ['Independent development and scaling', 'Faster innovation and time-to-market', 'Easier maintenance and updates', 'Technology-agnostic implementation']
    },
    {
      icon: Network,
      title: 'API-First Development',
      description: 'The bridges of your IT ecosystems - connecting internal and external applications, systems, and partners.',
      features: ['RESTful API Design', 'GraphQL Implementation', 'API Documentation', 'API Testing & Validation'],
      details: 'APIs are core building blocks for process automation, data integration, mobile apps, and platform strategies. They connect internal and external applications, systems, devices, and partners, enabling new business models from SaaS offerings to the platform economy.',
      benefits: ['Seamless system integration', 'Accelerated development', 'New business models', 'Improved developer experience']
    },
    {
      icon: Zap,
      title: 'Container & Orchestration',
      description: 'DevOps & automation - unlocking the full potential with modern DevOps practices.',
      features: ['Docker Containerization', 'Kubernetes Orchestration', 'Service Mesh', 'Auto Scaling'],
      details: 'Microservices and APIs unfold their potential with modern DevOps practices: continuous integration/deployment, automated testing, and monitoring. We establish efficient release cycles, stable operations, and scalable deployments for your growth.',
      benefits: ['Automated deployments', 'Scalable infrastructure', 'Stable operational processes', 'Continuous improvement']
    },
    {
      icon: Shield,
      title: 'Transition & Integration',
      description: 'From the legacy world to a microservice architecture - clear migration strategies and API-driven integrations.',
      features: ['Legacy Modernization', 'Migration Strategy', 'API-driven Integration', 'Change Management'],
      details: 'Moving from monolithic systems to microservices requires clear migration strategies and API-driven integrations. We analyze existing IT landscapes, plan transformations, and provide support from greenfield development to step-by-step modernization.',
      benefits: ['Risk-minimized migration', 'Step-by-step transformation', 'Preservation of existing investments', 'Strategic IT planning']
    }
  ];

  const studies = [
    {
      title: 'ScienceDirect: Enhancing Effectiveness and Security in Microservices Communication (2024)',
      description: 'Examines communication models, performance, sources of failure, and the organizational impact of microservices. Microservices increase flexibility but require a significant shift in development and operations.',
      topic: 'Microservices Architecture',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Arxiv / Computer Science Review: Systematic Mapping Study Microservices Architectures (2021)',
      description: 'Meta-analysis of 200+ scientific publications; identifies key challenges (deployment, service discovery, maintainability, scaling). Recommendation: focus on API design, orchestration, and governance.',
      topic: 'API Design & Governance',
      date: '2021',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Traceable AI / State of API Economy 2025',
      description: 'Market study on the growth and use of APIs in companies worldwide. APIs are drivers of new business models. The number of APIs in use grows by 20–40% annually.',
      topic: 'API Economy',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'BusinessWire / API Management 2024',
      description: 'Examines the influence of APIs on digital business and IT strategies across industries. Companies with an "API-first" strategy are more innovative and faster to market.',
      topic: 'Digital Business',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'NIST Special Publication 800-204: Security Strategies for Microservices',
      description: 'Guidance on architecture and operations strategies for microservices – including API management, error handling, scaling, and service monitoring in DevOps environments.',
      topic: 'Security & Operations',
      date: '2024',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: '8 Predictions for Application Security & Microservices in 2025',
      description: 'Forecast: microservices and APIs are becoming the foundation of innovation and growth, but require new skills and processes. AI and automation drive the next evolutionary step.',
      topic: 'Future Trends',
      date: '2025',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Fixed Background Video */}
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760435639/kling_20251014_Text_to_Video_Title__The_4165_1_t3grxn.mp4"]} overlayClassName="bg-black/55" />

      <div className="relative z-10">
        {/* ---------- Hero: split with mesh diagram ---------- */}
        <section className="relative overflow-hidden">
          <VentureCanvas effect="network" accent={ACCENT} className="absolute inset-0 h-full w-full opacity-25" />
          <AccentOrbs accent={ACCENT} />

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 md:pb-28 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Link
                href="/en"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-gray-400 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to main page
              </Link>
            </motion.div>

            <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
              {/* Left: headline */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                  className="mb-6 inline-flex items-center gap-3 rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.3em]"
                  style={{ borderColor: `${ACCENT}44`, color: ACCENT, background: `${ACCENT}0d` }}
                >
                  <Boxes className="h-4 w-4" />
                  System Integration
                </motion.p>

                <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
                  <LetterHeadline text="System" delay={0.3} />
                  <br />
                  <span style={{ color: ACCENT }}>
                    <LetterHeadline text="Integration" delay={0.6} />
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
                  className="mt-8 max-w-xl text-lg leading-relaxed text-gray-300"
                >
                  API-first architectures, microservices, and seamless system integration.
                  We build modern, scalable, and maintainable IT architectures for your business.
                </motion.p>
              </div>

              {/* Right: service mesh diagram */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              >
                <MeshDiagram />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ---------- Offerings: tile grid ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionLabel num="01" accent={ACCENT}>
              Integration Services
            </SectionLabel>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text="Our Integration Services" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-4 max-w-2xl text-lg text-gray-400"
            >
              Professional system integration for modern enterprises
            </motion.p>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {offerings.map((offering, index) => {
                const Icon = offering.icon;
                return (
                  <motion.div
                    key={offering.title}
                    className={index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, rotate: -3 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 160, damping: 20, delay: (index % 3) * 0.12 }}
                  >
                    <SpotlightCard
                      accent={ACCENT}
                      className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition-colors duration-300 hover:border-white/25"
                    >
                      <GhostNumber index={index} />
                      <div
                        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border"
                        style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}12` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: ACCENT }} />
                      </div>
                      <h3 className="text-xl font-bold">{offering.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-gray-300">{offering.description}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {offering.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-md border px-2.5 py-1 font-mono text-[11px]"
                            style={{ borderColor: `${ACCENT}33`, color: `${ACCENT}dd`, background: `${ACCENT}0a` }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-gray-400">
                        {offering.details}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {offering.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- API contract ---------- */}
        <section className="relative py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <SectionLabel num="02" accent={ACCENT}>
                Contract First
              </SectionLabel>
              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                <MaskedHeadline text="Contracts, Not Guesswork" />
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="mt-5 max-w-lg text-lg leading-relaxed text-gray-400"
              >
                With us, every interface starts with a clean API contract —
                versioned, tested, and secured in the mesh with timeouts, retries, and mTLS.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <ContractCard />
            </motion.div>
          </div>
        </section>

        {/* ---------- Studies ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionLabel num="03" accent={ACCENT}>
              Studies & Insights
            </SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text="Latest Studies & Insights" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-4 max-w-2xl text-lg text-gray-400"
            >
              Research-based insights into microservices and the API economy
            </motion.p>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((study, index) => (
                <motion.article
                  key={study.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
                >
                  <SpotlightCard
                    accent={ACCENT}
                    className="h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-colors duration-300 hover:border-white/25"
                  >
                    <div className="relative h-44 overflow-hidden rounded-t-2xl">
                      <Image
                        src={study.image}
                        alt={study.title}
                        width={400}
                        height={176}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/spot:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <span
                        className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-black"
                        style={{ background: ACCENT }}
                      >
                        {study.topic}
                      </span>
                      <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
                        {study.date}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold leading-snug">{study.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-gray-400">{study.description}</p>
                      <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: ACCENT }}>
                        Read study
                        <ArrowUpRight className="h-4 w-4" />
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Statement ---------- */}
        <section className="relative py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <ScrollStatement text="Interested in detailed study findings? We break monoliths into services that grow independently — and connect them into a mesh that carries your business." />
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="relative border-t border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text="Ready for System Integration?" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-300"
            >
              Let&apos;s develop your integration strategy together and implement it successfully.
            </motion.p>
            <div className="mt-10 flex justify-center">
              <ShineButton href="/en#contact" accent={ACCENT}>
                Request Integration Consulting
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
