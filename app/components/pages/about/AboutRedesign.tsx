'use client';

/**
 * „Über uns“ — komplette Neugestaltung.
 * Kernaussage: Proof statt Promise — Quantiva berät nicht nur, Quantiva
 * baut und beweist. Cineastische Designsprache wie die Venture-Seiten.
 * Herzstück: die CEO-Video-Bühne (Event-Ansprache, 30 Sekunden).
 */

import React, { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Play, Pause, Volume2 } from 'lucide-react';
import Navigation from '../../Navigation';
import CommandPalette from '../../CommandPalette';
import VentureCanvas from '../projects/VentureCanvas';
import {
  EASE,
  ScrollProgress,
  LetterHeadline,
  MaskedHeadline,
  ScrollStatement,
  SpotlightCard,
  ShineButton,
} from '../projects/detail/shared';

const ACCENT = '#2dd4bf';

const navigationItems = [
  { id: 'home', label: 'Home', href: '/de' },
  { id: 'about', label: 'Über uns', href: '/de/about' },
  { id: 'services', label: 'Services', href: '/de#services' },
  { id: 'search', label: 'Suche', href: '/de/search' },
  { id: 'cases', label: 'Projekte', href: '/de/cases' },
  { id: 'team', label: 'Team', href: '/de/team' },
  { id: 'career', label: 'Karriere', href: '/de#career' },
];

const PILLARS = [
  {
    kicker: 'Advisory',
    title: 'Wir beraten mit Haftung fürs Ergebnis',
    text: 'SAP-Transformation, Cutover, Prozess- und Test-Exzellenz: Wir begleiten Programme nicht mit Folien, sondern mit überprüfbaren Zwischenständen. Jede Empfehlung muss einem Beweis standhalten.',
    href: '/de#services',
    linkLabel: 'Unsere Services',
  },
  {
    kicker: 'Venture Studio',
    title: 'Wir bauen die Produkte, die wir vermissen',
    text: 'Acht Ventures, eine gemeinsame Maschine: ein Evidence-Core, der Signale sammelt, Probleme beweist und Entscheidungen auditierbar macht — von SolutionGate bis WEFTLINE.',
    href: '/de/cases',
    linkLabel: 'Alle Projekte',
  },
];

const PRINCIPLES = [
  'Evidenz schlägt Meinung — jede Aussage muss belegbar sein.',
  'Wir bauen nur, was ein echtes, bewiesenes Problem löst.',
  'Systeme flaggen Risiko und liefern Beweise — das Urteil bleibt beim Menschen.',
  'EU-Souveränität ist Architektur, keine Marketingfolie.',
  'Ehrliches Scheitern ist billiger als schöner Schein: Kill-Kriterien gehören zu jedem Vorhaben.',
];

const STATS = [
  { value: '15+', label: 'Jahre Erfahrung' },
  { value: '200+', label: 'Erfolgreiche Projekte' },
  { value: '8', label: 'Eigene Ventures' },
  { value: '99%', label: 'Projekt-Erfolgsrate' },
];

const CEO_POSTER = 'https://res.cloudinary.com/dbrisux8i/image/upload/v1760346416/image3_l0nj0f.jpg';
const CEO_VIDEO = '/assets/about/ceo-event.mp4';

/* ---------- CEO-Video-Bühne ---------- */
function CeoStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => {
          setPlaying(true);
          setStarted(true);
        })
        .catch(() => setUnavailable(true));
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: EASE }}
      className="group relative mx-auto max-w-5xl"
    >
      {/* Bühnenlicht */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-[3rem] blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${ACCENT}18, transparent 70%)` }}
      />
      <div
        className="relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
        style={{ boxShadow: `0 60px 160px -50px ${ACCENT}44` }}
      >
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={CEO_POSTER}
            preload="metadata"
            playsInline
            onEnded={() => setPlaying(false)}
            onError={() => setUnavailable(true)}
          >
            <source src={CEO_VIDEO} type="video/mp4" />
          </video>

          {/* Overlay vor dem Start */}
          {!started && (
            <button
              onClick={toggle}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-t from-black/80 via-black/30 to-black/40 transition-colors hover:from-black/70"
              aria-label="CEO-Video abspielen"
            >
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex h-24 w-24 items-center justify-center rounded-full border text-black"
                style={{ background: ACCENT, borderColor: `${ACCENT}` }}
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1px solid ${ACCENT}88` }}
                  animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <Play className="ml-1 h-9 w-9" fill="currentColor" />
              </motion.span>
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-gray-200">
                <Volume2 className="h-4 w-4" style={{ color: ACCENT }} />
                {unavailable ? 'Video folgt in Kürze' : '30 Sekunden — Motto & Vision'}
              </span>
            </button>
          )}

          {/* Pause/Play nach dem Start */}
          {started && (
            <button
              onClick={toggle}
              className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              aria-label={playing ? 'Pausieren' : 'Abspielen'}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
            </button>
          )}
        </div>

        {/* Untertitel-Leiste */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
          <div>
            <p className="font-bold text-white">Gülnur Patan</p>
            <p className="text-sm text-gray-400">CEO &amp; Gründerin, Quantiva Advisory</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
            Keynote · Motto &amp; Vision · 0:30
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Verb-Band ---------- */
function VerbBand() {
  const words = ['beraten', 'bauen', 'beweisen'];
  return (
    <div className="overflow-hidden border-y border-white/10 py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="industry-ticker-track flex w-max items-center gap-12">
        {[0, 1].map((clone) => (
          <div key={clone} className="flex items-center gap-12" aria-hidden={clone === 1}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap">
                {words.map((w, k) => (
                  <span key={k} className="flex items-center gap-12">
                    <span
                      className="text-4xl font-bold uppercase tracking-tight md:text-5xl"
                      style={
                        k === 2
                          ? { color: ACCENT }
                          : { WebkitTextStroke: `1px ${ACCENT}66`, color: 'transparent' }
                      }
                    >
                      {w}
                    </span>
                    <span style={{ color: ACCENT }} className="text-xs">
                      ◆
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutRedesign() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const canvasScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, -80]);

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <CommandPalette />
      <Navigation lang="de" items={navigationItems} />
      <ScrollProgress accent={ACCENT} />

      {/* HERO */}
      <section ref={heroRef} className="relative flex h-[100svh] flex-col overflow-hidden">
        <motion.div style={{ scale: reduceMotion ? 1 : canvasScale }} className="absolute inset-0">
          <VentureCanvas effect="network" accent={ACCENT} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(70% 60% at 50% 40%, transparent 0%, #05070f 100%), radial-gradient(40% 35% at 50% 45%, ${ACCENT}10, transparent 70%)`,
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity, y: reduceMotion ? 0 : heroY }}
          className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-20 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-[0.4em]"
            style={{ color: ACCENT }}
          >
            Über Quantiva
          </motion.p>
          <h1 className="mt-6 text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.95] tracking-tight">
            <LetterHeadline text="Proof statt" delay={0.4} />
            <span className="block" style={{ color: ACCENT }}>
              <LetterHeadline text="Promise." delay={1} />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
            className="mt-8 max-w-2xl text-lg text-gray-300 md:text-xl"
          >
            Wir sind Beratung und Venture Studio in einem Haus: Wir begleiten Transformation —
            und bauen die Produkte, die Entscheidungen beweisbar machen.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="relative z-10 flex justify-center pb-8"
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-5 w-5 text-gray-500" />
          </motion.span>
        </motion.div>
      </section>

      {/* MANIFEST */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-40">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
          <span style={{ color: ACCENT }}>01</span> — Das Manifest
        </p>
        <ScrollStatement text="Zu viele Programme werden auf Basis von Meinungen gestartet und auf Basis von Folien für erfolgreich erklärt. Wir haben Quantiva gegründet, um das umzudrehen: Jede Empfehlung, jedes Produkt und jede Entscheidung muss einem Beweis standhalten — messbar, auditierbar, ehrlich." />
      </section>

      {/* CEO-VIDEO */}
      <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            <span style={{ color: ACCENT }}>02</span> — Die Botschaft
          </p>
          <h2 className="mt-4 text-center text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text="Unsere CEO. Unser Warum." />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-gray-400">
            Gülnur Patan über das Motto und die Vision von Quantiva — in 30 Sekunden,
            live vor Publikum.
          </p>
          <div className="mt-14">
            <CeoStage />
          </div>
        </div>
      </section>

      <VerbBand />

      {/* ZWEI SÄULEN */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            <span style={{ color: ACCENT }}>03</span> — Ein Haus, zwei Kräfte
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text="Beraten und Bauen" />
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              >
                <SpotlightCard
                  accent={ACCENT}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-9 transition-colors hover:border-white/20 md:p-11"
                >
                  <span
                    className="font-mono text-xs uppercase tracking-[0.3em]"
                    style={{ color: ACCENT }}
                  >
                    {p.kicker}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-white md:text-3xl">{p.title}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-gray-300">{p.text}</p>
                  <Link
                    href={p.href}
                    className="group/link mt-8 inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-[color:var(--acc)]"
                    style={{ ['--acc' as never]: ACCENT }}
                  >
                    {p.linkLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINZIPIEN */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-500">
            <span style={{ color: ACCENT }}>04</span> — Woran wir uns messen lassen
          </p>
          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                className="group relative flex items-baseline gap-6 overflow-hidden py-7 transition-transform duration-300 hover:translate-x-2 md:gap-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `${ACCENT}88` }}
                />
                <span className="font-mono text-sm text-gray-600 transition-colors group-hover:text-[color:var(--acc)]" style={{ ['--acc' as never]: ACCENT }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="flex-1 text-lg font-light leading-relaxed text-gray-200 md:text-xl">
                  {p}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-white/10 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="text-center"
            >
              <p
                className="text-5xl font-bold tracking-tight md:text-6xl"
                style={{ color: ACCENT }}
              >
                {s.value}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/10 py-28 md:py-40">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-bold uppercase leading-none text-white/[0.04]"
        >
          Quantiva
        </span>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold uppercase tracking-tight">
            <MaskedHeadline text="Lassen Sie uns etwas beweisen." />
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Ob Transformation oder Produktidee: Wir starten mit dem Problem — und hören erst auf,
            wenn die Wirkung belegt ist.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <ShineButton href="/de#contact" accent={ACCENT}>
              Mit uns sprechen
              <ArrowUpRight className="h-4 w-4" />
            </ShineButton>
            <Link
              href="/de/cases"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Unsere Projekte
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
