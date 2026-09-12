'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Boxes, ArrowLeft, ArrowUpRight, CheckCircle, Network, Zap, Shield } from 'lucide-react';
import WhitepaperCard from '../../../components/WhitepaperCard';
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

/* ---------- Mesh-Diagramm (Hero, rechts) ---------- */

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
      {/* Verbindungslinien */}
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

      {/* Service-Nodes */}
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

      {/* Puls im Zentrum */}
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

/* ---------- API-Contract-Codeblock ---------- */

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

/* ---------- Seite ---------- */

export default function MicroservicesServicePage() {
  const reduceMotion = useReducedMotion();

  const offerings = [
    {
      icon: Boxes,
      title: 'Microservices Architecture',
      description: 'Modularität für Skalierbarkeit und Agilität - Zerlegung monolithischer Anwendungen in eigenständige, spezialisierte Dienste.',
      features: ['Domain-Driven Design', 'Service Decomposition', 'API Gateway Design', 'Event-Driven Architecture'],
      details: 'Microservices zerlegen monolithische Anwendungen in eigenständige, spezialisierte Dienste. Diese ermöglichen es Unternehmen, schneller auf Marktveränderungen zu reagieren und neue Geschäftsmodelle zu erschließen. Unabhängig voneinander entwickel- und skalierbar, ermöglichen sie schnellere Innovation und einfachere Wartung.',
      benefits: ['Unabhängige Entwicklung und Skalierung', 'Schnellere Innovation und Time-to-Market', 'Einfachere Wartung und Updates', 'Technologieoffene Implementierung']
    },
    {
      icon: Network,
      title: 'API-First Development',
      description: 'Die Brücken Ihrer IT-Ökosysteme - Verbindung interner und externer Anwendungen, Systeme und Partner.',
      features: ['RESTful API Design', 'GraphQL Implementation', 'API Documentation', 'API Testing & Validation'],
      details: 'APIs sind zentrale Bausteine für Prozessautomatisierung, Datenintegration, Mobile Apps und Plattformstrategien. Sie verbinden interne und externe Anwendungen, Systeme, Geräte und Partner und ermöglichen neue Geschäftsmodelle von SaaS-Angeboten bis zur Plattform-Ökonomie.',
      benefits: ['Nahtlose Systemintegration', 'Beschleunigte Entwicklung', 'Neue Geschäftsmodelle', 'Verbesserte Developer Experience']
    },
    {
      icon: Zap,
      title: 'Container & Orchestration',
      description: 'DevOps & Automatisierung - Entfaltung des vollen Potenzials mit modernen DevOps-Praktiken.',
      features: ['Docker Containerization', 'Kubernetes Orchestration', 'Service Mesh', 'Auto Scaling'],
      details: 'Microservices und APIs entfalten ihr Potenzial mit modernen DevOps-Praktiken: Continuous Integration/Deployment, Automatisierung von Testing und Monitoring. Wir etablieren effiziente Release-Zyklen, stabile Betriebsprozesse und skalierbare Deployments für Ihr Wachstum.',
      benefits: ['Automatisierte Deployments', 'Skalierbare Infrastruktur', 'Stabile Betriebsprozesse', 'Kontinuierliche Verbesserung']
    },
    {
      icon: Shield,
      title: 'Transition & Integration',
      description: 'Von der Legacy-Welt zur Microservice-Architektur - klare Migrationsstrategien und API-getriebene Integrationen.',
      features: ['Legacy Modernization', 'Migration Strategy', 'API-driven Integration', 'Change Management'],
      details: 'Der Wechsel von monolithischen Systemen zu Microservices erfordert klare Migrationsstrategien und API-getriebene Integrationen. Wir analysieren bestehende IT-Landschaften, planen Transformationen und unterstützen von der "Greenfield"-Entwicklung bis zur schrittweisen Modernisierung.',
      benefits: ['Risikominimierte Migration', 'Schrittweise Transformation', 'Bewahrung bestehender Investitionen', 'Strategische IT-Planung']
    }
  ];

  const whitepapers = [
    {
      title: 'ScienceDirect: Enhancing Effectiveness and Security in Microservices Communication (2024)',
      description: 'Untersucht Kommunikationsmodelle, Performance, Fehlerquellen und die organisatorische Wirkung von Microservices. Microservices steigern Flexibilität, erfordern aber einen deutlichen Wandel in Entwicklung und Betrieb.',
      topic: 'Microservices Architecture',
      date: '2024',
      image: '/assets/whitepapers/integration/microservices-architecture.jpg',
      slug: 'integration-microservices-architektur'
    },
    {
      title: 'Arxiv / Computer Science Review: Systematic Mapping Study Microservices Architectures (2021)',
      description: 'Meta-Analyse von 200+ wissenschaftlichen Publikationen; identifiziert zentrale Herausforderungen (Deployment, Service Discovery, Maintainability, Skalierung). Empfehlung: Fokus auf API-Design, Orchestrierung und Governance.',
      topic: 'API Design & Governance',
      date: '2021',
      image: '/assets/whitepapers/integration/api-design-governance.jpg',
      slug: 'integration-api-design-governance'
    },
    {
      title: 'Traceable AI / State of API Economy 2025',
      description: 'Marktstudie zu Wachstum und Nutzung von APIs in Unternehmen weltweit. APIs sind Treiber neuer Geschäftsmodelle. Die Zahl der genutzten APIs wächst jährlich um 20–40%.',
      topic: 'API Economy',
      date: '2025',
      image: '/assets/whitepapers/integration/api-economy.jpg',
      slug: 'integration-api-economy'
    },
    {
      title: 'BusinessWire / API Management 2024',
      description: 'Untersucht den Einfluss von APIs auf Digital Business und IT-Strategien in verschiedenen Branchen. Unternehmen mit "API-first"-Strategie sind innovationsstärker und schneller am Markt.',
      topic: 'Digital Business',
      date: '2024',
      image: '/assets/whitepapers/integration/digital-business.jpg',
      slug: 'integration-digital-business'
    },
    {
      title: 'NIST Special Publication 800-204: Security Strategies for Microservices',
      description: 'Leitfaden zu Architektur- und Betriebsstrategien für Microservices – einschließlich API-Management, Fehlerhandling, Skalierung und Service-Monitoring in DevOps-Umgebungen.',
      topic: 'Security & Operations',
      date: '2024',
      image: '/assets/whitepapers/integration/api-security-operations.jpg',
      slug: 'integration-api-security'
    },
    {
      title: '8 Vorhersagen für Application Security & Microservices in 2025',
      description: 'Prognose: Microservices und APIs werden zur Basis von Innovation und Wachstum, erfordern aber neue Skills und Prozesse. KI und Automatisierung treiben den nächsten Evolutionsschritt.',
      topic: 'Future Trends',
      date: '2025',
      image: '/assets/whitepapers/integration/api-trends.jpg',
      slug: 'integration-api-trends'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Fixed Background Video */}
      <ServiceVideoBackground videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1760435639/kling_20251014_Text_to_Video_Title__The_4165_1_t3grxn.mp4"]} overlayClassName="bg-black/55" />

      <div className="relative z-10">
        {/* ---------- Hero: Split mit Mesh-Diagramm ---------- */}
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
                href="/de"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-gray-400 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Zurück zur Hauptseite
              </Link>
            </motion.div>

            <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
              {/* Links: Headline */}
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
                  API-First Architekturen, Microservices und nahtlose Systemintegration.
                  Wir schaffen moderne, skalierbare und wartbare IT-Architekturen für Ihr Unternehmen.
                </motion.p>
              </div>

              {/* Rechts: Service-Mesh-Diagramm */}
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

        {/* ---------- Offerings: Kachel-Grid ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionLabel num="01" accent={ACCENT}>
              Integrations-Dienstleistungen
            </SectionLabel>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text="Unsere Integrations-Dienstleistungen" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-4 max-w-2xl text-lg text-gray-400"
            >
              Professionelle Systemintegration für moderne Unternehmen
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

        {/* ---------- API-Contract ---------- */}
        <section className="relative py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <SectionLabel num="02" accent={ACCENT}>
                Contract First
              </SectionLabel>
              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                <MaskedHeadline text="Verträge statt Vermutungen" />
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="mt-5 max-w-lg text-lg leading-relaxed text-gray-400"
              >
                Jede Schnittstelle beginnt bei uns mit einem sauberen API-Contract —
                versioniert, getestet und im Mesh mit Timeouts, Retries und mTLS abgesichert.
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

        {/* ---------- Studien ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionLabel num="03" accent={ACCENT}>
              Studien & Whitepaper
            </SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text="Studien & Whitepaper" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-4 max-w-2xl text-lg text-gray-400"
            >
              Wissenschaftlich fundierte Erkenntnisse zu Microservices und API-Economy — als Whitepaper direkt in Ihr Postfach
            </motion.p>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whitepapers.map((wp, index) => (
                <motion.div
                  key={wp.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
                >
                  <WhitepaperCard
                    title={wp.title}
                    description={wp.description}
                    topic={wp.topic}
                    date={wp.date}
                    image={wp.image}
                    slug={wp.slug}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Statement ---------- */}
        <section className="relative py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <ScrollStatement text="Interesse an detaillierten Studienergebnissen? Wir zerlegen Monolithen in Services, die unabhängig wachsen — und verbinden sie zu einem Mesh, das Ihr Geschäft trägt." />
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="relative border-t border-white/10 py-24">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              <MaskedHeadline text="Bereit für System-Integration?" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-300"
            >
              Lassen Sie uns gemeinsam Ihre Integrations-Strategie entwickeln und erfolgreich umsetzen.
            </motion.p>
            <div className="mt-10 flex justify-center">
              <ShineButton href="/de#contact" accent={ACCENT}>
                Integrations-Beratung anfragen
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
