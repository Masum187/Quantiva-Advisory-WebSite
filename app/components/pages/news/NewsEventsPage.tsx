'use client';

import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SiteNav from '../../SiteNav';
import HomeFilmLayer from '../home/HomeFilmLayer';
import type { ListedEvent } from '../../../lib/events/loadEvents';
import type { NewsItem, NewsTopic } from '../../../lib/news/itNews';
import type { EventTopic } from '../../../lib/data/itEvents';

const ACCENT = '#2dd4bf';
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Looping people-at-an-event film (career community clip: professionals around
 * a table). Atmospheric only — not labeled as Quantiva staff.
 */
const NETWORKING_FILM = '/assets/career/wellbeing/community.mp4';

const TOPIC_IMAGE: Record<EventTopic | NewsTopic, string> = {
  ai: '/assets/services/ai.jpg',
  sap: '/assets/services/sap.jpg',
  cloud: '/assets/services/cloud.jpg',
  industry: '/assets/cases/bmw-manufacturing-hero.jpg',
  security: '/assets/services/security.jpg',
};

type Lang = 'de' | 'en';
type TopicFilter = 'all' | EventTopic;

const TOPIC_LABEL: Record<Lang, Record<EventTopic | NewsTopic, string>> = {
  de: { ai: 'KI', sap: 'SAP', cloud: 'Cloud', industry: 'Industrie', security: 'Security' },
  en: { ai: 'AI', sap: 'SAP', cloud: 'Cloud', industry: 'Industry', security: 'Security' },
};

const COPY = {
  de: {
    chapter: 'News & Events',
    title: 'Was sich bewegt.',
    sub: 'Aktuelle Meldungen zu KI, SAP und Cloud — und die Termine, die in der Branche zählen. Ob Quantiva dabei ist, steht an jedem Event.',
    newsChapter: '01 — News',
    newsTitle: 'KI, SAP und Cloud.',
    newsEmpty: 'Die Meldungen sind gerade nicht erreichbar. Die Event-Übersicht bleibt verfügbar.',
    eventsChapter: '02 — Events',
    eventsTitle: 'Die wichtigen Termine.',
    eventsSub: 'Weltweite Leitkonferenzen. Die Teilnahme von Quantiva pflegen wir zusätzlich zu jedem Termin.',
    attending: 'Quantiva dabei',
    absent: 'Nicht dabei',
    all: 'Alle',
    onlyAttending: 'Nur mit Quantiva',
    eventsEmpty: 'Für diesen Filter ist noch kein Termin markiert.',
    source: 'Quelle',
    open: 'Öffnen',
  },
  en: {
    chapter: 'News & Events',
    title: 'What is moving.',
    sub: 'Current reporting on AI, SAP and cloud — and the dates that matter in the industry. Whether Quantiva is attending is marked on every event.',
    newsChapter: '01 — News',
    newsTitle: 'AI, SAP and cloud.',
    newsEmpty: 'Headlines are temporarily unavailable. The event list remains in place.',
    eventsChapter: '02 — Events',
    eventsTitle: 'The dates that matter.',
    eventsSub: 'Flagship conferences worldwide. Quantiva attendance is marked on top of each date.',
    attending: 'Quantiva attending',
    absent: 'Not attending',
    all: 'All',
    onlyAttending: 'With Quantiva',
    eventsEmpty: 'No event is marked for this filter yet.',
    source: 'Source',
    open: 'Open',
  },
} as const;

type Copy = (typeof COPY)[Lang];

function formatNewsDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/Berlin',
  }).format(new Date(iso));
}

function formatRange(start: string, end: string, lang: Lang): string {
  const locale = lang === 'de' ? 'de-DE' : 'en-GB';
  const from = new Date(`${start}T12:00:00`);
  const to = new Date(`${end}T12:00:00`);
  const sameMonth = from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear();
  if (sameMonth) {
    const month = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(to);
    return `${from.getDate()}.–${to.getDate()}. ${month}`;
  }
  const fmt = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  return `${fmt.format(from)} – ${fmt.format(to)}`;
}

function Chapter({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em]" style={{ color: ACCENT }}>
      {children}
    </p>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function FlowArrow({ large = false }: { large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center gap-2 text-teal-300/85 transition duration-500 group-hover:translate-x-1.5 group-hover:text-teal-300 group-focus-visible:translate-x-1.5 ${
        large ? 'min-h-12' : 'min-h-10'
      }`}
    >
      <span
        className={`block h-px origin-left bg-teal-300/90 transition duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
          large ? 'w-10 scale-x-75' : 'w-8 scale-x-75'
        }`}
      />
      <ArrowRight className={large ? 'h-8 w-8' : 'h-6 w-6'} strokeWidth={1.5} />
    </span>
  );
}

function CardMedia({
  src,
  alt,
  featured = false,
}: {
  src: string;
  alt: string;
  featured?: boolean;
}) {
  const safeSrc = src || TOPIC_IMAGE.cloud;
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl bg-white/5 ${
        featured
          ? 'h-40 w-full sm:h-48 md:h-full md:min-h-[280px] md:w-[42%]'
          : 'h-28 w-full sm:h-32 md:h-[140px] md:w-[200px]'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local project assets; avoid Image config edge cases */}
      <img
        src={safeSrc}
        alt={alt}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
        loading="lazy"
        decoding="async"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04060b]/50 via-transparent to-transparent md:bg-gradient-to-l"
      />
    </div>
  );
}

export default function NewsEventsPage({
  lang,
  news,
  events,
}: {
  lang: Lang;
  news: NewsItem[];
  events: ListedEvent[];
}) {
  const copy = COPY[lang];
  const reduce = useReducedMotion();
  const [topic, setTopic] = useState<TopicFilter>('all');
  const [onlyAttending, setOnlyAttending] = useState(false);
  const [lead, ...rest] = news;

  const visibleEvents = useMemo(() => {
    return events.filter((event) => {
      if (onlyAttending && !event.attending) return false;
      if (topic !== 'all' && !event.topics.includes(topic)) return false;
      return true;
    });
  }, [events, onlyAttending, topic]);

  const filters: { id: TopicFilter; label: string }[] = [
    { id: 'all', label: copy.all },
    { id: 'ai', label: TOPIC_LABEL[lang].ai },
    { id: 'sap', label: TOPIC_LABEL[lang].sap },
    { id: 'cloud', label: TOPIC_LABEL[lang].cloud },
    { id: 'industry', label: TOPIC_LABEL[lang].industry },
    { id: 'security', label: TOPIC_LABEL[lang].security },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04060b] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute inset-[-8%]"
          initial={reduce ? false : { scale: 1.08 }}
          animate={
            reduce
              ? { scale: 1 }
              : {
                  scale: [1.08, 1.18, 1.08],
                  x: ['0%', '-1.5%', '0%'],
                  y: ['0%', '-1%', '0%'],
                }
          }
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 28, repeat: Infinity, ease: 'linear' }
          }
        >
          <HomeFilmLayer src={NETWORKING_FILM} mode="hero" />
        </motion.div>
        {/* Scrim keeps copy readable while people stay visible in the film. */}
        <div className="absolute inset-0 bg-[#04060b]/58" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(720px circle at 78% 12%, ${ACCENT}32, transparent 58%), radial-gradient(520px circle at 12% 78%, ${ACCENT}16, transparent 55%), linear-gradient(180deg, rgba(4,6,11,0.4) 0%, rgba(4,6,11,0.62) 40%, rgba(4,6,11,0.88) 100%)`,
          }}
        />
      </div>

      <div className="relative z-10">
        <SiteNav lang={lang} variant="solid" />

        <header className="relative overflow-hidden border-b border-white/10">
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36">
            <Chapter>{copy.chapter}</Chapter>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.08 }}
              className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)] font-light leading-[1.02] tracking-tight"
            >
              {copy.title}
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg"
            >
              {copy.sub}
            </motion.p>
          </div>
        </header>

        <section id="news" className="border-b border-white/10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <Chapter>{copy.newsChapter}</Chapter>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-light tracking-tight">{copy.newsTitle}</h2>

            {news.length === 0 ? (
              <p className="mt-10 max-w-xl text-gray-300">{copy.newsEmpty}</p>
            ) : (
              <div className="mt-12 grid gap-4 lg:grid-cols-2">
                {lead ? (
                  <FadeIn className="lg:row-span-2">
                    <NewsCard item={lead} lang={lang} featured sourceLabel={copy.source} />
                  </FadeIn>
                ) : null}
                {rest.map((item, index) => (
                  <FadeIn key={item.id} delay={index * 0.05}>
                    <NewsCard item={item} lang={lang} sourceLabel={copy.source} />
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="events" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <Chapter>{copy.eventsChapter}</Chapter>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-light tracking-tight">
              {copy.eventsTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-gray-300">{copy.eventsSub}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {filters.map((filter) => {
                const active = topic === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setTopic(filter.id)}
                    className="min-h-11 rounded-full border px-4 text-xs uppercase tracking-[0.16em] backdrop-blur-md transition"
                    style={{
                      borderColor: active ? ACCENT : 'rgba(255,255,255,0.16)',
                      color: active ? '#04120f' : '#d1d5db',
                      background: active ? ACCENT : 'rgba(4,6,11,0.65)',
                    }}
                  >
                    {filter.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setOnlyAttending((value) => !value)}
                className="min-h-11 rounded-full border px-4 text-xs uppercase tracking-[0.16em] backdrop-blur-md transition"
                aria-pressed={onlyAttending}
                style={{
                  borderColor: onlyAttending ? ACCENT : 'rgba(255,255,255,0.16)',
                  color: onlyAttending ? ACCENT : '#d1d5db',
                  background: 'rgba(4,6,11,0.65)',
                }}
              >
                {copy.onlyAttending}
              </button>
            </div>

            <div className="mt-10 space-y-4">
              {visibleEvents.length === 0 ? (
                <p className="text-gray-300">{copy.eventsEmpty}</p>
              ) : (
                visibleEvents.map((event, index) => (
                  <FadeIn key={event.slug} delay={Math.min(index * 0.04, 0.24)}>
                    <EventCard event={event} lang={lang} copy={copy} />
                  </FadeIn>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function NewsCard({
  item,
  lang,
  featured = false,
  sourceLabel,
}: {
  item: NewsItem;
  lang: Lang;
  featured?: boolean;
  sourceLabel: string;
}) {
  const reduce = useReducedMotion();
  const image = TOPIC_IMAGE[item.topic];

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex h-full overflow-hidden rounded-2xl border border-white/12 bg-[#04060b]/88 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 ${
        featured
          ? 'min-h-[320px] flex-col gap-4 p-5 md:flex-row md:items-stretch md:gap-3 md:p-7'
          : 'min-h-[180px] flex-col gap-3 p-5 md:flex-row md:items-center md:gap-3 md:p-6'
      }`}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="relative flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-gray-400">
            <span style={{ color: ACCENT }}>{TOPIC_LABEL[lang][item.topic]}</span>
            <span>{formatNewsDate(item.publishedAt, lang)}</span>
          </div>
          <h3
            className={`mt-4 font-light tracking-tight text-white ${
              featured ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl'
            }`}
          >
            {item.title}
          </h3>
        </div>
        <p className="mt-6 truncate text-sm text-gray-300">
          {sourceLabel} · {item.source}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 md:flex-col md:justify-center md:px-1">
        <FlowArrow large={featured} />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-teal-300/70 md:hidden">
          {lang === 'de' ? 'Öffnen' : 'Open'}
        </span>
      </div>
      <CardMedia src={image} alt="" featured={featured} />
    </motion.a>
  );
}

function EventCard({
  event,
  lang,
  copy,
}: {
  event: ListedEvent;
  lang: Lang;
  copy: Copy;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/12 bg-[#04060b]/88 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-300 hover:border-teal-400/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 md:flex-row md:items-center md:gap-3 md:p-6"
      whileHover={reduce ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="min-w-0 flex-1">
        <p className="font-mono text-sm uppercase tracking-[0.14em] text-white">
          {formatRange(event.start, event.end, lang)}
        </p>
        <p className="mt-2 text-sm text-gray-400">
          {event.city}, {event.country}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <h3 className="text-2xl font-light tracking-tight">{event.name}</h3>
          <span
            className="rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em]"
            style={
              event.attending
                ? { background: ACCENT, color: '#04120f' }
                : { border: '1px solid rgba(255,255,255,0.16)', color: '#9ca3af' }
            }
          >
            {event.attending ? copy.attending : copy.absent}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
          {lang === 'de' ? event.summaryDe : event.summaryEn}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {event.topics.map((topic) => (
            <span key={topic} className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gray-400">
              {TOPIC_LABEL[lang][topic]}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-3 md:flex-col md:justify-center md:px-1">
        <FlowArrow />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-teal-300/70 md:hidden">
          {copy.open}
        </span>
      </div>
      <CardMedia src={event.image || TOPIC_IMAGE[event.topics[0] ?? 'cloud']} alt="" />
    </motion.a>
  );
}
