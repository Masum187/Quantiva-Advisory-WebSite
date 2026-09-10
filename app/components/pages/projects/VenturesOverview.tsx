'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import CommandPalette from '../../CommandPalette';
import Navigation from '../../Navigation';
import { ventures } from '../../../lib/data/projects';

const EASE = [0.16, 1, 0.3, 1] as const;

function MaskedWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden pb-1 align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function VenturesOverview() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const navigationItems = [
    { id: 'home', label: 'Home', href: '/de' },
    { id: 'about', label: 'Über uns', href: '/de/about' },
    { id: 'services', label: 'Services', href: '/de#services' },
    { id: 'search', label: 'Suche', href: '/de/search' },
    { id: 'cases', label: 'Projekte', href: '/de/cases' },
    { id: 'team', label: 'Team', href: '/de/team' },
    { id: 'career', label: 'Karriere', href: '/de#career' },
  ];

  const active = ventures.find((v) => v.slug === hovered) ?? null;

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <CommandPalette />
      <Navigation lang="de" items={navigationItems} />

      {/* Hero */}
      <header className="relative overflow-hidden px-6 pb-16 pt-36 md:pb-24 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 70% 10%, rgba(45,212,191,0.10), transparent 70%), radial-gradient(40% 40% at 15% 80%, rgba(129,140,248,0.08), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-teal-300"
          >
            <span className="text-teal-500">[</span> Venture Studio <span className="text-teal-500">]</span>
          </motion.p>
          <h1 className="mt-6 text-[clamp(2.6rem,7.5vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-tight">
            <MaskedWord text="Proof" delay={0.05} /> <MaskedWord text="statt" delay={0.12} />{' '}
            <MaskedWord text="Promise." delay={0.19} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400"
          >
            Acht Produkte, ein Prinzip: Jede Aussage braucht einen Beleg. Vom Einordnen über das
            Beweisen bis zum Governen — das Portfolio der Quantiva GmbH.
          </motion.p>
        </div>
      </header>

      {/* Verb-Ticker */}
      <div className="border-y border-white/10 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="industry-ticker-track flex w-max items-center gap-10">
          {[0, 1].map((clone) => (
            <div key={clone} className="flex items-center gap-10" aria-hidden={clone === 1}>
              {ventures.map((v) => (
                <span key={v.slug} className="flex items-center gap-10 whitespace-nowrap">
                  <span className="font-mono text-sm uppercase tracking-[0.3em] text-gray-500">
                    {v.verb}
                  </span>
                  <span style={{ color: v.accent }} className="text-xs">
                    ◆
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Projektliste */}
      <main className="relative mx-auto max-w-7xl px-6 pb-40 pt-16">
        {/* Schwebende Logo-Preview (Desktop) */}
        <AnimatePresence mode="wait">
          {active && !reduceMotion && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="pointer-events-none fixed right-[8%] top-1/2 z-30 hidden w-[360px] -translate-y-1/2 overflow-hidden rounded-2xl border border-white/15 shadow-2xl lg:block"
              style={{ boxShadow: `0 40px 120px -30px ${active.accent}66` }}
            >
              <div className="relative" style={{ background: active.logoBg }}>
                <div className="relative m-6 aspect-[5/2]">
                  <Image
                    src={active.logo}
                    alt={active.name}
                    fill
                    sizes="360px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div
                className="flex items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ background: '#0a0f1d', color: active.accent }}
              >
                <span>{active.category}</span>
                <span className="font-mono text-gray-500">{active.verb}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {ventures.map((v, i) => (
            <motion.div
              key={v.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: EASE }}
            >
              <Link
                href={`/de/cases/${v.slug}`}
                onMouseEnter={() => setHovered(v.slug)}
                onMouseLeave={() => setHovered(null)}
                className="group relative block py-8 transition-colors md:py-10"
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="w-12 font-mono text-sm text-gray-600 transition-colors group-hover:text-gray-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Mobile Logo-Thumb */}
                  <span
                    className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 lg:hidden"
                    style={{ background: v.logoBg }}
                  >
                    <span className="absolute inset-2">
                      <Image src={v.logo} alt="" fill sizes="80px" className="object-contain" />
                    </span>
                  </span>

                  <span className="flex-1">
                    <span
                      className="block text-[clamp(1.8rem,5vw,4.2rem)] font-bold uppercase leading-none tracking-tight text-gray-200 transition-all duration-300 group-hover:translate-x-3"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                    >
                      <span className="group-hover:hidden">{v.name}</span>
                      <span className="hidden group-hover:inline" style={{ color: v.accent }}>
                        {v.name}
                      </span>
                    </span>
                    <span className="mt-2 block text-sm text-gray-500 md:text-base">
                      {v.tagline}
                    </span>
                  </span>

                  <span className="hidden font-mono text-xs uppercase tracking-[0.25em] text-gray-600 md:block">
                    {v.category}
                  </span>

                  <ArrowUpRight
                    className="h-6 w-6 shrink-0 text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    style={{ color: hovered === v.slug ? v.accent : undefined }}
                  />
                </div>

                {/* Akzentlinie beim Hover */}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: v.accent }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Abschluss-CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-24 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            Gemeinsame Maschine
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-2xl font-light leading-relaxed text-gray-300">
            Read-only Ingest → Kernmodell mit Herkunft → Regel-Engine → Findings mit Beleg je
            Aussage. <span className="text-white">Eine Evidenz-Maschine, mehrere Märkte.</span>
          </p>
          <Link
            href="/de#contact"
            className="mt-10 inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-teal-400/60 hover:bg-teal-400/10"
          >
            Mit uns sprechen
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
