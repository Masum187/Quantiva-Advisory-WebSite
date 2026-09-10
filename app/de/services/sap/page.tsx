'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Database, CheckCircle, Users, Target, Zap, ArrowUpRight, ArrowDown } from 'lucide-react';
import ServiceNavigation from '../../../components/ServiceNavigation';
import WhitepaperCard from '../../../components/WhitepaperCard';
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
} from '../../../components/pages/projects/detail/shared';

const ACCENT = '#3b82f6';

const MARQUEE_KEYWORDS = [
  'S/4HANA',
  'Transformation',
  'BTP',
  'Cloud ALM',
  'Joule KI',
  'Automatisierung',
  'Fiori UX',
  'Integration',
];

/* ---------- Marquee-Band mit SAP-Keywords ---------- */
function SapMarquee() {
  return (
    <div className="overflow-hidden border-y border-white/10 py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="industry-ticker-track flex w-max items-center gap-12">
        {[0, 1].map((clone) => (
          <div key={clone} className="flex items-center gap-12" aria-hidden={clone === 1}>
            {MARQUEE_KEYWORDS.map((word, i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap">
                <span
                  className="text-4xl font-bold uppercase tracking-tight md:text-5xl"
                  style={
                    i % 2 === 0
                      ? { color: ACCENT }
                      : { WebkitTextStroke: `1px ${ACCENT}66`, color: 'transparent' }
                  }
                >
                  {word}
                </span>
                <span style={{ color: ACCENT }} className="text-xs">
                  ◆
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SAPServicePage() {
  const reduceMotion = useReducedMotion();

  // Video rotation state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = useMemo(() => [
    'https://res.cloudinary.com/dbrisux8i/video/upload/v1760435643/kling_20251014_Text_to_Video_Title__The_4174_0_b3juos.mp4',
    'https://res.cloudinary.com/dbrisux8i/video/upload/v1760435639/kling_20251014_Text_to_Video_Title__The_4165_1_t3grxn.mp4',
    'https://res.cloudinary.com/dbrisux8i/video/upload/v1760435634/kling_20251014_Text_to_Video_Title__The_4174_2_llyqsp.mp4'
  ], []);

  // Rotate videos every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [videos]);

  // Handle video play when currentVideoIndex changes
  useEffect(() => {
    videos.forEach((video) => {
      const videoElement = document.querySelector(`video[src="${video}"]`) as HTMLVideoElement;
      if (videoElement) {
        videoElement.pause();
      }
    });
    const currentVideo = document.querySelector(`video[src="${videos[currentVideoIndex]}"]`) as HTMLVideoElement;
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {
        /* Autoplay kann fehlschlagen – Video bleibt dann als Poster stehen */
      });
    }
  }, [currentVideoIndex, videos]);

  const offerings = [
    {
      icon: Database,
      title: 'SAP S/4HANA Beratung',
      description: 'Strategische Beratung für Ihre SAP S/4HANA Transformation mit Fokus auf hybride Ansätze und KI-Integration.',
      features: ['Greenfield vs. Brownfield Analyse', 'ROI-Berechnung', 'Migrationsstrategie', 'Change Management', 'KI-Integration'],
      details: 'Wir unterstützen Sie beim Umstieg sowie der Migration zu SAP S/4HANA – von Strategie über Prozessdesign bis Umsetzung. Laut aktueller Studien setzen bereits zwei Drittel der Unternehmen in der DACH-Region auf S/4HANA, wobei hybride Ansätze dominieren. Die größten Herausforderungen bleiben IT-Landschaftsanpassung und Stammdatenmanagement; der Stellenwert von KI-Integration zur Effizienzsteigerung steigt rapide.',
      benefits: ['Strategische Transformation', 'Hybride Migrationsansätze', 'KI-Integration', 'Reduzierte Risiken', 'Optimierte Prozesse']
    },
    {
      icon: Target,
      title: 'SAP BTP (Business Technology Platform)',
      description: 'Individuelle, integrierte Lösungen auf SAP BTP für Entwicklung, Integration und Analytics.',
      features: ['Entwicklung & Integration', 'Analytics & Reporting', 'Best Practices', 'Automatisierung', 'Erweiterbarkeit'],
      details: 'Wir realisieren für Sie individuelle, integrierte Lösungen auf SAP BTP – für alle Herausforderungen rund um Entwicklung, Integration und Analytics. Moderne Best Practices, Automatisierung und Erweiterbarkeit sind unser Standard.',
      benefits: ['Individuelle Lösungen', 'Nahtlose Integration', 'Moderne Best Practices', 'Automatisierung', 'Skalierbare Architektur']
    },
    {
      icon: Users,
      title: 'SAP Cloud ALM',
      description: 'Application Lifecycle Management speziell für Cloud- und hybride SAP-Umgebungen.',
      features: ['Cloud-basiertes ALM', 'Fiori-UX', 'Best Practices', 'Zentrale Steuerung', 'Nahtlose Integration'],
      details: 'Mit SAP Cloud ALM bieten wir Application Lifecycle Management speziell für Cloud- und hybride SAP-Umgebungen. Das Ganze cloudbasiert und mit moderner Fiori-UX – für eine schnelle Time-to-Value und reduzierten Betriebsaufwand. Zentrale Vorteile: Best Practices, zentrale Steuerung, nahtlose Integration und höchste Transparenz.',
      benefits: ['Schnelle Time-to-Value', 'Reduzierter Betriebsaufwand', 'Zentrale Steuerung', 'Höchste Transparenz', 'Moderne UX']
    },
    {
      icon: Zap,
      title: 'SAP Joule KI-Agenten',
      description: 'Integration intelligenter Agenten für Entwicklung, Testautomatisierung und Prozessautomation.',
      features: ['Entwicklung & Testautomatisierung', 'Prozessautomation', 'SAP Fiori Integration', 'UX-Optimierung', 'KI-Integration'],
      details: 'Unsere Expert:innen integrieren Joule als intelligente Agenten für Entwicklung, Testautomatisierung, Prozessautomation sowie für SAP Fiori und UX – und holen so das Maximum aus Ihren SAP-Investitionen heraus. Diese KI-Integration macht den Wechsel zwischen Tools überflüssig, beschleunigt Innovationen und sorgt für bessere Erkennbarkeit und Steuerbarkeit von Geschäftsprozessen.',
      benefits: ['Maximale SAP-Investitionen', 'Beschleunigte Innovationen', 'Bessere Prozesssteuerung', 'Tool-Integration', 'KI-gestützte Automatisierung']
    },
    {
      icon: CheckCircle,
      title: 'SAP Test Services & Automation',
      description: 'Automatisierung Ihrer SAP-Tests von der Anforderungsaufnahme bis zum Monitoring.',
      features: ['Testautomatisierung', 'Best Practice-Frameworks', 'Cloud & Hybrid', 'Monitoring', 'Nachhaltige Absicherung'],
      details: 'Wir automatisieren Ihre SAP-Tests von der Anforderungsaufnahme bis zum Monitoring. Dabei setzen wir auf Best Practice-Frameworks und sorgen für eine nachhaltige Absicherung Ihrer Projekte – gerade in Cloud- und hybriden Umgebungen.',
      benefits: ['Automatisierte Tests', 'Best Practice-Frameworks', 'Nachhaltige Absicherung', 'Cloud-optimiert', 'Reduzierte Risiken']
    },
    {
      icon: Users,
      title: 'SAP Fiori & UX',
      description: 'Intuitive und moderne Benutzeroberflächen auf Basis von SAP Fiori und neuesten UX-Standards.',
      features: ['SAP Fiori Design', 'SAPUI5 Entwicklung', 'UX-Standards', 'Intuitive Oberflächen', 'Produktivitätsschub'],
      details: 'Wir gestalten intuitive und moderne Benutzeroberflächen auf Basis von SAP Fiori, SAPUI5 und neuesten UX-Standards. Das Ergebnis: optimaler Zugang zu Systemen, hohe Akzeptanz und nachhaltiger Produktivitätsschub für Ihre Teams.',
      benefits: ['Intuitive Benutzeroberflächen', 'Hohe Akzeptanz', 'Produktivitätsschub', 'Moderne UX-Standards', 'Optimale Systemzugriffe']
    }
  ];

  const whitepapers = [
    {
      title: 'SAP S/4HANA Transformation Guide 2025',
      description: 'Umfassender Leitfaden für die S/4HANA-Transformation mit Best Practices, ROI-Berechnung und Migrationsstrategien.',
      topic: 'S/4HANA Transformation',
      date: '2025',
      image: '/assets/whitepapers/sap/s4hana.jpg',
      slug: 'sap-s4hana-transformation'
    },
    {
      title: 'SAP BTP Integration Patterns Whitepaper',
      description: 'Moderne Integrationsmuster und Best Practices für SAP Business Technology Platform mit Architektur-Entscheidungen.',
      topic: 'BTP Integration',
      date: '2025',
      image: '/assets/whitepapers/sap/btp.jpg',
      slug: 'sap-btp-integration'
    },
    {
      title: 'SAP Cloud ALM Best Practices',
      description: 'Application Lifecycle Management für Cloud- und hybride SAP-Umgebungen mit praktischen Implementierungshilfen.',
      topic: 'Cloud ALM',
      date: '2025',
      image: '/assets/whitepapers/sap/cloud-alm.jpg',
      slug: 'sap-cloud-alm'
    },
    {
      title: 'KI & SAP Joule Integration Guide',
      description: 'Roadmap zur Integration von GenAI/Joule in SAP-Lösungen mit Best Practices und Implementierungsstrategien.',
      topic: 'KI & Joule Integration',
      date: '2025',
      image: '/assets/whitepapers/sap/ki-joule.jpg',
      slug: 'sap-ki-joule'
    },
    {
      title: 'SAP Fiori UX Design Guidelines 2025',
      description: 'Neueste UX-Standards und Design-Prinzipien für SAP Fiori Anwendungen mit User Experience Best Practices.',
      topic: 'Fiori UX Design',
      date: '2025',
      image: '/assets/whitepapers/sap/fiori-ux.jpg',
      slug: 'sap-fiori-ux'
    },
    {
      title: 'SAP Test Automation Framework',
      description: 'Best Practices für automatisierte SAP-Tests von der Anforderungsaufnahme bis zum Monitoring in Cloud-Umgebungen.',
      topic: 'Test Automation',
      date: '2025',
      image: '/assets/whitepapers/sap/test-automation.jpg',
      slug: 'sap-test-automation'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Service Navigation */}
      <ServiceNavigation lang="de" serviceTitle="SAP Services" serviceId="sap" />

      {/* Rotating Background Videos (fixed) */}
      <div className="fixed inset-0 z-0">
        {videos.map((video, index) => (
          <video
            key={`video-${index}`}
            src={video}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentVideoIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
            muted
            loop
            playsInline
            preload="auto"
          />
        ))}
        {/* Cinematic overlay for readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* ---------- Hero: Enterprise Command ---------- */}
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 md:px-12">
          <div className="mx-auto w-full max-w-7xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-gray-400"
            >
              <span style={{ color: ACCENT }}>◆</span> Enterprise Command — SAP Services
            </motion.p>

            <h1 className="text-left text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.9] tracking-tight text-white">
              <LetterHeadline text="SAP." />
            </h1>

            <h2 className="mt-6 max-w-3xl text-left text-[clamp(1.3rem,3.2vw,2.4rem)] font-light leading-snug text-gray-200">
              <MaskedHeadline text="End-to-End Beratung für Ihre digitale Transformation — S/4HANA, Cloud Services, KI-Integration und optimale UX." />
            </h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {['S/4HANA', 'BTP', 'Cloud ALM', 'Joule', 'Test Automation', 'Fiori UX'].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gray-300"
                  style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0d` }}
                >
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.span
              className="block"
              animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-6 w-6" style={{ color: ACCENT }} />
            </motion.span>
          </motion.div>
        </section>

        {/* ---------- 01 — Manifest (ScrollStatement) ---------- */}
        <section className="relative bg-black/70 px-6 py-28 backdrop-blur-sm md:px-12 md:py-40">
          <div className="mx-auto max-w-5xl">
            <SectionLabel num="01" accent={ACCENT}>
              Manifest
            </SectionLabel>
            <div className="mt-10">
              <ScrollStatement text="Als erfahrenes Beratungsunternehmen begleiten wir Sie bei allen Herausforderungen rund um SAP — von der SAP S/4HANA Transformation über innovative Cloud Services und KI-Integration bis hin zur Automatisierung und optimalen UX." />
            </div>
          </div>
        </section>

        {/* ---------- 02 — Offerings: Sticky-Split ---------- */}
        <section className="relative bg-black/80 px-6 py-24 backdrop-blur-sm md:px-12 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            {/* Left: sticky intro */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionLabel num="02" accent={ACCENT}>
                Leistungen
              </SectionLabel>
              <h2 className="mt-8 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-white">
                <MaskedHeadline text="Unsere SAP-Services" />
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="mt-6 max-w-md text-lg leading-relaxed text-gray-300"
              >
                Professionelle SAP-Beratung für moderne Unternehmen — sechs Disziplinen, ein
                durchgängiges Zielbild: eine SAP-Landschaft, die Ihr Geschäft beschleunigt.
              </motion.p>
            </div>

            {/* Right: scrolling SpotlightCards */}
            <div className="flex flex-col gap-8">
              {offerings.map((offering, index) => {
                const Icon = offering.icon;
                return (
                  <motion.div
                    key={offering.title}
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, delay: (index % 2) * 0.12, ease: EASE }}
                  >
                    <SpotlightCard
                      accent={ACCENT}
                      className="relative rounded-3xl border border-white/10 bg-slate-950/70 p-8 backdrop-blur-md transition-colors duration-500 hover:border-white/25 md:p-10"
                    >
                      <GhostNumber index={index} />
                      <div className="relative">
                        <div
                          className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border"
                          style={{ borderColor: `${ACCENT}55`, background: `${ACCENT}14` }}
                        >
                          <Icon className="h-7 w-7" style={{ color: ACCENT }} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{offering.title}</h3>
                        <p className="mt-4 leading-relaxed text-gray-300">{offering.description}</p>
                        <p className="mt-4 text-sm leading-relaxed text-gray-400">{offering.details}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {offering.features.map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-gray-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <ul className="mt-6 space-y-2">
                          {offering.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-3 text-sm text-gray-200">
                              <CheckCircle className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- Marquee-Band ---------- */}
        <div className="bg-black/80 backdrop-blur-sm">
          <SapMarquee />
        </div>

        {/* ---------- 03 — Downloadbare Whitepapers ---------- */}
        <section className="relative bg-black/80 px-6 py-24 backdrop-blur-sm md:px-12 md:py-36">
          <div className="mx-auto max-w-7xl">
            <SectionLabel num="03" accent={ACCENT}>
              Wissen
            </SectionLabel>
            <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-white">
              <MaskedHeadline text="Downloadbare Whitepapers" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300"
            >
              Wissenschaftlich fundierte Erkenntnisse und praktische Leitfäden für erfolgreiche
              SAP-Implementierungen
            </motion.p>

            <div className="mt-16 grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whitepapers.map((whitepaper, index) => (
                <motion.div
                  key={whitepaper.slug}
                  className="h-full"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
                >
                  <WhitepaperCard
                    title={whitepaper.title}
                    description={whitepaper.description}
                    topic={whitepaper.topic}
                    date={whitepaper.date}
                    image={whitepaper.image}
                    slug={whitepaper.slug}
                  />
                </motion.div>
              ))}
            </div>

            {/* Studies CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-16 text-center"
            >
              <div
                className="inline-flex flex-wrap items-center justify-center gap-4 rounded-2xl border px-8 py-4 backdrop-blur-sm"
                style={{ borderColor: `${ACCENT}33`, background: `${ACCENT}0d` }}
              >
                <span className="text-white/80">Interesse an detaillierten Studienergebnissen?</span>
                <ShineButton href="/de#contact" accent={ACCENT}>
                  Kontakt aufnehmen
                  <ArrowUpRight className="h-4 w-4" />
                </ShineButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------- 04 — CTA ---------- */}
        <section className="relative overflow-hidden border-t border-white/10 bg-black/85 px-6 py-28 backdrop-blur-sm md:px-12 md:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <SectionLabel num="04" accent={ACCENT}>
              Kontakt
            </SectionLabel>
            <h2 className="mt-8 text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              <MaskedHeadline text="Bereit für Ihre SAP-Services?" className="inline-block" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300"
            >
              Lassen Sie uns gemeinsam Ihre SAP-Strategie entwickeln und erfolgreich umsetzen.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <ShineButton href="/de#contact" accent={ACCENT}>
                SAP-Services anfragen
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
              <Link
                href="/de/capabilities/sap"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Technische Details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
