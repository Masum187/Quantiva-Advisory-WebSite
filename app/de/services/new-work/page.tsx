'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import ServiceNavigation from '../../../components/ServiceNavigation';
import ServiceVideoBackground from '../../../components/ServiceVideoBackground';
import {
  EASE,
  ScrollProgress,
  MaskedHeadline,
  ScrollStatement,
  ShineButton,
  SectionLabel,
} from '../../../components/pages/projects/detail/shared';

const ACCENT = '#f472b6';

/* ---------- Animierte Trennlinie ---------- */
function Rule({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px origin-left bg-white/25 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}

/* ---------- Inhalte (deutsche Texte, unverändert) ---------- */

const ARBEITSWELT = [
  {
    title: 'Strategie & Organisations-Transformation',
    text: 'Es gibt keine New Work Schablone, die auf jedes Unternehmen passt. Wir entwickeln mit Ihnen den für Sie passenden Ansatz für Mensch & Kultur, Organisation & Prozesse.',
  },
  {
    title: 'Productivity & Collaboration',
    text: 'Die neue Arbeitswelt ist geprägt von Zusammenarbeit über Abteilungs- und Unternehmensgrenzen hinaus. Für eine produktive Kollaboration braucht es moderne Arbeitsmethoden und die richtigen digitalen Tools.',
  },
  {
    title: 'Modern Workplace',
    text: 'Mit der Arbeitswelt ändern sich auch die Anforderungen an den digitalen Arbeitsplatz. Wie sieht ein Modern Workplace aus, der zu Ihrem Unternehmen und den Mitarbeitern passt?',
  },
];

const LOESUNGEN = [
  {
    title: 'Strategie & Transformation',
    text: 'Entwicklung eines individuellen New Work Konzepts für Ihr Unternehmen. Von der Analyse der aktuellen Situation bis zur schrittweisen Umsetzung.',
    points: [
      'Organisationsanalyse & Zieldefinition',
      'Change Management & Kommunikation',
      'Rollout-Strategie & Erfolgsmessung',
    ],
  },
  {
    title: 'Digital Workplace',
    text: 'Modernisierung Ihrer IT-Infrastruktur für flexible und sichere Arbeitsplätze. Microsoft 365, Collaboration Tools und moderne Arbeitsumgebungen.',
    points: [
      'Microsoft 365 & Teams Integration',
      'Cloud-basierte Arbeitsplätze',
      'Mobile Device Management',
    ],
  },
  {
    title: 'Collaboration & Productivity',
    text: 'Optimierung der Zusammenarbeit durch moderne Arbeitsmethoden, agile Prozesse und digitale Kollaborationstools.',
    points: [
      'Agile Arbeitsmethoden & Scrum',
      'Projektmanagement Tools',
      'Virtuelle Teamarbeit',
    ],
  },
];

const PRINZIPIEN = [
  {
    title: 'Steigerte Produktivität',
    text: 'Flexible Arbeitszeiten und -orte führen zu höherer Motivation und Effizienz der Mitarbeiter.',
  },
  {
    title: 'Bessere Work-Life-Balance',
    text: 'Mitarbeiter können Beruf und Privatleben besser vereinbaren, was zu höherer Zufriedenheit führt.',
  },
  {
    title: 'Globaler Talentpool',
    text: 'Zugang zu internationalen Talenten durch remote-freundliche Arbeitsmodelle.',
  },
  {
    title: 'Zukunftssicherheit',
    text: 'Frühe Anpassung an veränderte Arbeitswelten macht Ihr Unternehmen zukunftsfähig.',
  },
];

export default function NewWorkPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress accent={ACCENT} />

      {/* Service Navigation */}
      <ServiceNavigation lang="de" serviceTitle="New Work" serviceId="enablement" />

      {/* Fixed Background Video */}
      <ServiceVideoBackground
        videos={["https://res.cloudinary.com/dbrisux8i/video/upload/v1761924430/video_f85758c6_1761914591442_yszhud.mp4"]}
        overlayClassName="bg-black/60"
      />

      <div className="relative z-10">
        {/* ---------- Hero: zentriert, luftig, editorial ---------- */}
        <section className="relative flex min-h-[88vh] items-center justify-center py-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="font-mono text-xs uppercase tracking-[0.5em] text-gray-400"
            >
              New <span style={{ color: ACCENT }}>Work</span>
            </motion.p>

            <Rule className="mx-auto mt-8 w-16" delay={0.4} />

            <h1 className="mt-10 text-[clamp(2.6rem,6.5vw,5rem)] font-extralight leading-[1.08] tracking-wide">
              <MaskedHeadline text="Agilität und Zusammenarbeit freisetzen" />
            </h1>

            <Rule className="mx-auto mt-10 w-32" delay={0.7} />

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
              className="mx-auto mt-10 max-w-2xl text-lg font-light leading-relaxed tracking-wide text-gray-300"
            >
              Wir setzen Agilität und Zusammenarbeit in Ihrem Unternehmen frei und machen damit
              jeden einzelnen Mitarbeiter produktiver. Durch den optimalen digitalen Arbeitsplatz
              sowie eine Arbeitsweise und -kultur, die Zusammenarbeit und Vernetzung fördert.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
              className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-b pb-1 text-sm font-light uppercase tracking-[0.25em] transition-colors hover:text-white"
                style={{ borderColor: ACCENT, color: `${ACCENT}dd` }}
              >
                Jetzt Beraten lassen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-light uppercase tracking-[0.25em] text-gray-300 transition-colors hover:border-white hover:text-white"
              >
                Lösungen entdecken
              </a>
            </motion.div>
          </div>
        </section>

        {/* ---------- Statement ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-3xl px-6">
            <ScrollStatement
              text="New Work ist mehr als nur Homeoffice oder flexible Arbeitszeiten. Es geht um eine grundlegende Transformation der Arbeitsweise, die Zusammenarbeit über Abteilungs- und Unternehmensgrenzen hinaus ermöglicht und jeden Mitarbeiter produktiver macht."
              className="text-center text-[clamp(1.4rem,3vw,2.2rem)] font-extralight leading-relaxed tracking-wide"
            />
          </div>
        </section>

        {/* ---------- Die neue Arbeitswelt: nummerierte editoriale Liste ---------- */}
        <section className="relative py-24">
          <div className="mx-auto max-w-5xl px-6">
            <SectionLabel num="01" accent={ACCENT}>
              Die neue Arbeitswelt
            </SectionLabel>
            <h2 className="mt-6 text-4xl font-extralight tracking-wide md:text-5xl">
              <MaskedHeadline text="Die neue Arbeitswelt" />
            </h2>

            <div className="mt-16">
              {ARBEITSWELT.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
                  className="group grid gap-6 border-t border-white/15 py-12 md:grid-cols-[80px_1fr_1.2fr] md:gap-10"
                >
                  <span
                    className="font-mono text-sm tracking-widest transition-colors duration-300"
                    style={{ color: `${ACCENT}99` }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl font-light tracking-wide transition-colors duration-300 group-hover:text-white md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="font-light leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                    {item.text}
                  </p>
                </motion.div>
              ))}
              <Rule className="w-full" />
            </div>
          </div>
        </section>

        {/* ---------- Lösungen: große alternierende Editorial-Zeilen ---------- */}
        <section id="solutions" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionLabel num="02" accent={ACCENT}>
              New Work Lösungen
            </SectionLabel>
            <h2 className="mt-6 max-w-3xl text-4xl font-extralight tracking-wide md:text-5xl">
              <MaskedHeadline text="Unsere New Work Lösungen" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-5 max-w-2xl text-lg font-light tracking-wide text-gray-400"
            >
              Maßgeschneiderte Ansätze für die Transformation Ihrer Arbeitswelt
            </motion.p>

            <div className="mt-20">
              {LOESUNGEN.map((solution, index) => {
                const flipped = index % 2 === 1;
                return (
                  <motion.article
                    key={solution.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="grid items-center gap-10 border-t border-white/15 py-20 md:grid-cols-2 md:gap-16"
                  >
                    {/* Text */}
                    <div className={flipped ? 'md:order-2' : ''}>
                      <h3 className="text-3xl font-extralight tracking-wide md:text-4xl">
                        {solution.title}
                      </h3>
                      <p className="mt-6 font-light leading-relaxed text-gray-300">
                        {solution.text}
                      </p>
                      <ul className="mt-8 space-y-4">
                        {solution.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-4 font-light tracking-wide text-gray-300"
                          >
                            <Check className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Große Ziffer */}
                    <div
                      className={`flex items-center justify-center ${
                        flipped ? 'md:order-1 md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                        className="select-none text-[clamp(8rem,20vw,15rem)] font-extralight leading-none"
                        style={{
                          WebkitTextStroke: `1px ${ACCENT}66`,
                          color: 'transparent',
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.span>
                    </div>
                  </motion.article>
                );
              })}
              <Rule className="w-full" />
            </div>
          </div>
        </section>

        {/* ---------- Prinzipien: große Pull-Quotes ---------- */}
        <section className="relative py-28">
          <div className="mx-auto max-w-5xl px-6">
            <SectionLabel num="03" accent={ACCENT}>
              Warum New Work?
            </SectionLabel>
            <h2 className="mt-6 text-4xl font-extralight tracking-wide md:text-5xl">
              <MaskedHeadline text="Warum New Work?" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-5 max-w-2xl text-lg font-light tracking-wide text-gray-400"
            >
              Die Vorteile einer modernen Arbeitsweise für Ihr Unternehmen
            </motion.p>

            <div className="mt-24 space-y-28">
              {PRINZIPIEN.map((principle, index) => {
                const right = index % 2 === 1;
                return (
                  <motion.blockquote
                    key={principle.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: EASE }}
                    className={`max-w-3xl ${right ? 'ml-auto text-right' : 'text-left'}`}
                  >
                    <span
                      aria-hidden="true"
                      className="mb-4 block font-serif text-6xl leading-none"
                      style={{ color: `${ACCENT}77` }}
                    >
                      &ldquo;
                    </span>
                    <p className="text-[clamp(1.6rem,3.6vw,2.6rem)] font-extralight leading-snug tracking-wide text-white">
                      {principle.title}
                    </p>
                    <p className="mt-6 max-w-xl font-light leading-relaxed text-gray-400 tracking-wide inline-block">
                      {principle.text}
                    </p>
                  </motion.blockquote>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section id="contact" className="relative border-t border-white/10 py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl font-extralight tracking-wide md:text-5xl">
              <MaskedHeadline text="Bereit für New Work?" />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed tracking-wide text-gray-300"
            >
              Lassen Sie uns gemeinsam Ihre Arbeitswelt transformieren und das volle Potenzial
              Ihrer Teams freisetzen.
            </motion.p>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <ShineButton href="mailto:info@quantiva-advisory.com" accent={ACCENT}>
                Jetzt Beraten lassen
                <ArrowUpRight className="h-4 w-4" />
              </ShineButton>
              <a
                href="tel:+49123456789"
                className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-light uppercase tracking-[0.25em] text-gray-300 transition-colors hover:border-white hover:text-white"
              >
                Kostenloses Beratungsgespräch
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
