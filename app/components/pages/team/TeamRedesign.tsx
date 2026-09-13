'use client';

/**
 * Team-Seite — neue Designsprache (analog HomeRedesign / Venture-Detailseiten):
 * dunkler Grund #04060b, Teal-Akzent #2dd4bf, Mono-Uppercase-Kapitel-Labels,
 * white/10-Borders, Mouse-Glow-Karten, große font-light Headlines.
 * Zweisprachig über das COPY-Wörterbuch — /de und /en teilen dieselbe Komponente.
 */

import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import SiteNav from '../../SiteNav';

const ACCENT = '#2dd4bf';
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Lang = 'de' | 'en';

/* ---------- Typen ---------- */

interface LeaderCopy {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  linkedin: string;
  email: string;
  objectPosition: string;
}

interface ValueCopy {
  title: string;
  description: string;
  points: string[];
}

interface MemberCopy {
  name: string;
  role: string;
  department: string;
  image: string;
  why: string;
}

interface TeamCopy {
  hero: { chapter: string; title: string; sub: string };
  leadership: { chapter: string; title: string; contact: string };
  values: { chapter: string; title: string; sub: string; items: ValueCopy[] };
  team: { chapter: string; title: string; sub: string; hint: string };
  cta: { title: string; sub: string; button: string };
}

/* ---------- Sprachunabhängige Daten ---------- */

const LEADER_META = [
  {
    image: 'https://res.cloudinary.com/dbrisux8i/image/upload/v1760346416/image3_l0nj0f.jpg',
    linkedin: 'https://linkedin.com/in/gulnur-patan',
    email: 'gulnur@quantiva-advisory.com',
    objectPosition: 'center 30%',
  },
  {
    image: 'https://res.cloudinary.com/dbrisux8i/image/upload/v1760221471/generated-image_30_r8cjtq.png',
    linkedin: 'https://linkedin.com/in/michael-weber',
    email: 'michael@quantiva-advisory.com',
    objectPosition: 'center 25%',
  },
];

const MEMBER_IMAGES = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
];

/* ---------- COPY ---------- */

const COPY: Record<Lang, TeamCopy & { leaders: LeaderCopy[]; members: MemberCopy[] }> = {
  de: {
    hero: {
      chapter: 'Team',
      title: 'Die Menschen hinter Quantiva.',
      sub: 'Beraterinnen, Architekten, Analystinnen — ein Team, das Transformation nicht nur empfiehlt, sondern baut.',
    },
    leadership: { chapter: '01 — Führung', title: 'Wer den Kurs setzt.', contact: 'Kontakt' },
    values: {
      chapter: '02 — Werte',
      title: 'Woran wir uns messen lassen.',
      sub: 'Vier Prinzipien, die jede Entscheidung tragen.',
      items: [
        {
          title: 'Excellence',
          description: 'Höchste Qualität in allem, was wir tun.',
          points: ['Höchste Standards', 'Qualitätskontrolle', 'Best Practices'],
        },
        {
          title: 'Zusammenarbeit',
          description: 'Gemeinsam mehr erreichen.',
          points: ['Teamgeist', 'Offene Kommunikation', 'Gemeinsame Erfolge'],
        },
        {
          title: 'Innovation',
          description: 'Zukunftsorientierte Lösungen.',
          points: ['Kreative Lösungen', 'Zukunftstechnologien', 'Agilität'],
        },
        {
          title: 'Wachstum',
          description: 'Kontinuierliche Weiterentwicklung.',
          points: ['Ständige Verbesserung', 'Persönliche Entwicklung', 'Karriere-Wachstum'],
        },
      ],
    },
    team: {
      chapter: '03 — Team',
      title: 'Die Expertinnen und Experten.',
      sub: 'Acht Perspektiven, ein Anspruch — lernen Sie das Team kennen.',
      hint: 'Hover oder Tippen für die persönliche Vorstellung',
    },
    cta: {
      title: 'Werden Sie Teil unseres Teams.',
      sub: 'Wir suchen talentierte Menschen, die mit uns die Zukunft gestalten möchten.',
      button: 'Offene Stellen ansehen',
    },
    leaders: [
      {
        name: 'Gülnur Patan',
        role: 'CEO & Gründerin',
        bio: 'Visionäre Führungskraft mit 15+ Jahren Erfahrung in der digitalen Transformation. Expertin für strategische Beratung und innovative Technologielösungen.',
        expertise: ['Strategische Beratung', 'Digitale Transformation', 'Leadership'],
        ...LEADER_META[0],
      },
      {
        name: 'Dr. Michael Weber',
        role: 'CTO & Technischer Leiter',
        bio: 'Technologie-Visionär mit Expertise in KI, Cloud-Architekturen und modernen Entwicklungsmethoden. Treibt Innovation voran.',
        expertise: ['KI & Machine Learning', 'Cloud Architecture', 'DevOps'],
        ...LEADER_META[1],
      },
    ],
    members: [
      {
        name: 'Francja Albertijn',
        role: 'Strategieberaterin',
        department: 'Business & Strategie',
        image: MEMBER_IMAGES[0],
        why: 'Bei Quantiva endet Strategie nicht auf der Folie — wir bauen mit, was wir empfehlen. Genau diese Ehrlichkeit hat mich überzeugt.',
      },
      {
        name: 'Roseness Simmons',
        role: 'Technologieberaterin',
        department: 'Digitale Lösungen',
        image: MEMBER_IMAGES[1],
        why: 'Ich liebe es, wenn Technologie Probleme wirklich löst, statt neue zu schaffen. Hier darf ich Lösungen bauen, die im Alltag der Kunden bestehen.',
      },
      {
        name: 'Florian Emmanuel',
        role: 'Finanzberater',
        department: 'CFO Services',
        image: MEMBER_IMAGES[2],
        why: 'Zahlen erzählen Geschichten — bei Quantiva hören wir ihnen zu, bevor wir entscheiden. Diese Sorgfalt findet man selten.',
      },
      {
        name: 'Emmanuel Di Invideo',
        role: 'Datenanalyst',
        department: 'Analytics & Insights',
        image: MEMBER_IMAGES[3],
        why: 'Daten sind nur so gut wie die Fragen, die man ihnen stellt. Hier arbeite ich mit Menschen, die die richtigen Fragen stellen.',
      },
      {
        name: 'Leonett Andrew',
        role: 'Prozessberater',
        department: 'Operations',
        image: MEMBER_IMAGES[4],
        why: 'Gute Prozesse sieht man nicht — sie funktionieren einfach. Quantiva gibt mir den Raum, genau daran zu arbeiten.',
      },
      {
        name: 'Sarah Mitchell',
        role: 'HR-Beraterin',
        department: 'People & Culture',
        image: MEMBER_IMAGES[5],
        why: 'Transformation gelingt nur mit den Menschen, nie gegen sie. Dass dieser Satz hier wirklich gelebt wird, ist der Grund, warum ich bleibe.',
      },
      {
        name: 'Michael Chen',
        role: 'IT-Architekt',
        department: 'Technology',
        image: MEMBER_IMAGES[6],
        why: 'Ich baue gern Systeme, die auch in fünf Jahren noch tragen. Bei Quantiva zählt Substanz mehr als Buzzwords — das passt zu mir.',
      },
      {
        name: 'Anna Schmidt',
        role: 'Marketing-Strategin',
        department: 'Growth & Marketing',
        image: MEMBER_IMAGES[7],
        why: 'Wachstum entsteht, wenn Marke und Leistung dasselbe versprechen. Bei Quantiva muss ich nichts schönreden — das ist ein Luxus.',
      },
    ],
  },
  en: {
    hero: {
      chapter: 'Team',
      title: 'The people behind Quantiva.',
      sub: 'Consultants, architects, analysts — a team that doesn’t just recommend transformation, but builds it.',
    },
    leadership: { chapter: '01 — Leadership', title: 'Who sets the course.', contact: 'Contact' },
    values: {
      chapter: '02 — Values',
      title: 'What we hold ourselves to.',
      sub: 'Four principles behind every decision.',
      items: [
        {
          title: 'Excellence',
          description: 'The highest quality in everything we do.',
          points: ['Highest standards', 'Quality control', 'Best practices'],
        },
        {
          title: 'Collaboration',
          description: 'Achieving more together.',
          points: ['Team spirit', 'Open communication', 'Shared successes'],
        },
        {
          title: 'Innovation',
          description: 'Future-oriented solutions.',
          points: ['Creative solutions', 'Future technologies', 'Agility'],
        },
        {
          title: 'Growth',
          description: 'Continuous development.',
          points: ['Continuous improvement', 'Personal development', 'Career growth'],
        },
      ],
    },
    team: {
      chapter: '03 — Team',
      title: 'The experts.',
      sub: 'Eight perspectives, one standard — meet the team.',
      hint: 'Hover or tap for a personal introduction',
    },
    cta: {
      title: 'Become part of our team.',
      sub: 'We are looking for talented people who want to shape the future with us.',
      button: 'View open positions',
    },
    leaders: [
      {
        name: 'Gülnur Patan',
        role: 'CEO & Founder',
        bio: 'Visionary leader with 15+ years of experience in digital transformation. Expert in strategic consulting and innovative technology solutions.',
        expertise: ['Strategic Consulting', 'Digital Transformation', 'Leadership'],
        ...LEADER_META[0],
      },
      {
        name: 'Dr. Michael Weber',
        role: 'CTO & Technical Lead',
        bio: 'Technology visionary with expertise in AI, cloud architectures, and modern development methods. Drives innovation forward.',
        expertise: ['AI & Machine Learning', 'Cloud Architecture', 'DevOps'],
        ...LEADER_META[1],
      },
    ],
    members: [
      {
        name: 'Francja Albertijn',
        role: 'Strategy Consultant',
        department: 'Business & Strategy',
        image: MEMBER_IMAGES[0],
        why: 'At Quantiva, strategy doesn’t end on a slide — we help build what we recommend. That honesty is exactly what won me over.',
      },
      {
        name: 'Roseness Simmons',
        role: 'Technology Consultant',
        department: 'Digital Solutions',
        image: MEMBER_IMAGES[1],
        why: 'I love it when technology actually solves problems instead of creating new ones. Here I get to build solutions that hold up in our clients’ everyday work.',
      },
      {
        name: 'Florian Emmanuel',
        role: 'Financial Consultant',
        department: 'CFO Services',
        image: MEMBER_IMAGES[2],
        why: 'Numbers tell stories — at Quantiva we listen to them before we decide. That kind of care is rare.',
      },
      {
        name: 'Emmanuel Di Invideo',
        role: 'Data Analyst',
        department: 'Analytics & Insights',
        image: MEMBER_IMAGES[3],
        why: 'Data is only as good as the questions you ask it. Here I work with people who ask the right questions.',
      },
      {
        name: 'Leonett Andrew',
        role: 'Process Consultant',
        department: 'Operations',
        image: MEMBER_IMAGES[4],
        why: 'You don’t see good processes — they simply work. Quantiva gives me the space to work on exactly that.',
      },
      {
        name: 'Sarah Mitchell',
        role: 'HR Consultant',
        department: 'People & Culture',
        image: MEMBER_IMAGES[5],
        why: 'Transformation only succeeds with people, never against them. The fact that this is truly lived here is why I stay.',
      },
      {
        name: 'Michael Chen',
        role: 'IT Architect',
        department: 'Technology',
        image: MEMBER_IMAGES[6],
        why: 'I like building systems that still carry the load five years from now. At Quantiva, substance counts more than buzzwords — that suits me.',
      },
      {
        name: 'Anna Schmidt',
        role: 'Marketing Strategist',
        department: 'Growth & Marketing',
        image: MEMBER_IMAGES[7],
        why: 'Growth happens when brand and delivery make the same promise. At Quantiva I never have to oversell anything — that’s a luxury.',
      },
    ],
  },
};

/* ---------- Bausteine ---------- */

function ChapterLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }}
      className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400"
    >
      <span style={{ color: ACCENT }}>◆</span> {children}
    </motion.p>
  );
}

function Headline({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`mt-4 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-white ${className}`}
    >
      {children}
    </motion.h2>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Karte mit Mouse-Glow (Spotlight) analog HomeRedesign-Muster. */
function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} className={`group/glow relative overflow-hidden ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), ${ACCENT}14, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ---------- Team-Mitglied-Karte mit Hover-/Tap-Vorstellung ---------- */

function MemberCard({
  member,
  index,
  active,
  onActivate,
  onDeactivate,
  onToggle,
}: {
  member: MemberCopy;
  index: number;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  // Sanftes Herumschweben wie in der alten Version: pro Mitglied leicht
  // unterschiedliche Dauer/Amplitude/Delay für ein organisches Gesamtbild.
  const floatDuration = 3.6 + (index % 3) * 0.6; // 3.6–4.8s
  const floatY = 8 + (index % 4) * 3; // 8–17px
  const floatX = (index % 2 === 0 ? 1 : -1) * (3 + (index % 3)); // ±3–5px
  const floating =
    reduceMotion || active
      ? { y: 0, x: 0 } // beim Hover/Tap pausieren → Overlay steht ruhig
      : { y: [-floatY, floatY], x: [floatX, -floatX] };

  return (
    <Reveal delay={(index % 4) * 0.08}>
      {/* Floating auf dem Wrapper — Hover-Ziel und Overlay liegen innen */}
      <motion.div
        animate={floating}
        transition={
          reduceMotion || active
            ? { duration: 0.4, ease: 'easeOut' }
            : {
                duration: floatDuration,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: index * 0.25,
              }
        }
      >
      <div
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors duration-300 hover:border-teal-400/30"
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={active}
        aria-label={member.name}
      >
        {/* Portrait */}
        <div className="relative mx-auto mb-5 h-32 w-32 md:h-36 md:w-36">
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `${ACCENT}2e` }}
          />
          <div
            className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/10 transition-all duration-300 group-hover:ring-teal-400/50"
            style={active ? { boxShadow: `0 0 40px -8px ${ACCENT}66` } : undefined}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={160}
              height={160}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Basis-Info */}
        <h3 className="text-base font-semibold text-white">{member.name}</h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
          {member.role}
        </p>
        <p className="mt-1 text-xs text-gray-400">{member.department}</p>

        {/* Hover-/Tap-Vorstellung */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-[#04060b]/90 px-5 py-6 text-center backdrop-blur"
            >
              <h4 className="text-base font-semibold text-white">{member.name}</h4>
              <p
                className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                {member.role}
              </p>
              <p className="mt-4 text-[13px] italic leading-relaxed text-gray-300">
                &bdquo;{member.why}&ldquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.div>
    </Reveal>
  );
}

/* ---------- Hauptkomponente ---------- */

export default function TeamRedesign({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const [activeMember, setActiveMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#04060b] text-white">
      <SiteNav lang={lang} variant="solid" />

      {/* ---------- Hero ---------- */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(700px circle at 80% -10%, ${ACCENT}14, transparent 60%)`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36">
          <ChapterLabel>{copy.hero.chapter}</ChapterLabel>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5rem)] font-light leading-[1.02] tracking-tight"
          >
            {copy.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg"
          >
            {copy.hero.sub}
          </motion.p>
        </div>
      </header>

      {/* ---------- 01 — Führung ---------- */}
      <section className="relative border-b border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <ChapterLabel>{copy.leadership.chapter}</ChapterLabel>
          <Headline>{copy.leadership.title}</Headline>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {copy.leaders.map((leader, i) => (
              <Reveal key={leader.name} delay={i * 0.12}>
                <GlowCard className="h-full rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-teal-400/30">
                  <div className="relative h-80 overflow-hidden md:h-96">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: leader.objectPosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-[#04060b]/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <span className="font-mono text-xs text-white/60">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="mt-2 text-2xl font-light tracking-tight text-white md:text-3xl">
                        {leader.name}
                      </h3>
                      <p
                        className="mt-1 font-mono text-xs uppercase tracking-[0.25em]"
                        style={{ color: ACCENT }}
                      >
                        {leader.role}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-sm leading-relaxed text-gray-400">{leader.bio}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {leader.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex gap-3">
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-teal-400/40 hover:bg-white/5"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                      <a
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
                        style={{ background: ACCENT }}
                      >
                        <Mail className="h-4 w-4" />
                        {copy.leadership.contact}
                      </a>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 02 — Werte ---------- */}
      <section className="relative border-b border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <ChapterLabel>{copy.values.chapter}</ChapterLabel>
          <Headline>{copy.values.title}</Headline>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-400 md:text-base">
              {copy.values.sub}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.values.items.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <GlowCard className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-teal-400/30">
                  <span className="font-mono text-sm" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 text-xl font-light tracking-tight text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{value.description}</p>
                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                    {value.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[13px] text-gray-400">
                        <span aria-hidden="true" className="mt-[3px] text-[10px]" style={{ color: ACCENT }}>
                          ◆
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 03 — Team ---------- */}
      <section className="relative border-b border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <ChapterLabel>{copy.team.chapter}</ChapterLabel>
          <Headline>{copy.team.title}</Headline>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-400 md:text-base">
              {copy.team.sub}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-600">
              {copy.team.hint}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.members.map((member, i) => (
              <MemberCard
                key={member.name}
                member={member}
                index={i}
                active={activeMember === i}
                onActivate={() => setActiveMember(i)}
                onDeactivate={() => setActiveMember((cur) => (cur === i ? null : cur))}
                onToggle={() => setActiveMember((cur) => (cur === i ? null : i))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at 50% 120%, ${ACCENT}18, transparent 65%)`,
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
          <Headline className="!mt-0">{copy.cta.title}</Headline>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
              {copy.cta.sub}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href={`/${lang}/career`}
              className="group mt-10 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-black transition-transform hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: ACCENT }}
            >
              {copy.cta.button}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
