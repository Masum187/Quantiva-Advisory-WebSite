'use client';

import type { LucideIcon } from 'lucide-react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type ServiceCard = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

type ServiceContent = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    icon: LucideIcon;
  };
  intro?: {
    title: string;
    description: string;
  };
  services: {
    title: string;
    items: ServiceCard[];
  };
  outcomes: {
    title: string;
    description?: string;
    items: string[];
  };
  tags?: {
    title: string;
    items: string[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

interface ValmaxServicePageProps {
  content: ServiceContent;
  lang: 'de' | 'en';
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function ValmaxServicePage({ content, lang }: ValmaxServicePageProps) {
  const HeroIcon = content.hero.icon;
  const ctaHref = `/${lang}#contact`;
  const framedItems = content.services.items.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f7f6ff] text-[#050505]">
      <section className="relative isolate overflow-hidden bg-black px-4 pt-28 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.75) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 pb-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              <HeroIcon className="h-4 w-4 text-[#d9ff80]" />
              {content.hero.badge}
            </div>
            <h1 className="max-w-5xl hyphens-auto text-[clamp(2.55rem,9vw,7.8rem)] font-semibold uppercase leading-[0.9] tracking-normal text-white [overflow-wrap:anywhere]">
              {content.hero.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
              {content.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/15 bg-[#f7f6ff] p-4 text-black shadow-[0_28px_90px_rgba(0,0,0,.35)]"
          >
            <div className="rounded-[1.35rem] bg-black p-4 text-white">
              <div className="mb-12 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/55">
                <span>Quantiva</span>
                <span>{lang === 'de' ? 'Beratung' : 'Advisory'}</span>
              </div>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#d9ff80] text-black">
                <HeroIcon className="h-10 w-10" />
              </div>
              <div className="mt-10 space-y-3">
                {framedItems.map((item, index) => (
                  <div key={item.title} className="flex items-center justify-between rounded-full border border-white/15 px-4 py-3 text-sm">
                    <span className="max-w-[13rem] truncate text-white/82">{item.title}</span>
                    <span className="font-mono text-[#d9ff80]">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {content.intro && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 border-b border-black/12 pb-16 lg:grid-cols-[0.72fr_1.28fr]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">{content.hero.badge}</p>
            <div>
              <h2 className="max-w-4xl hyphens-auto text-4xl font-semibold uppercase leading-[0.95] [overflow-wrap:anywhere] md:text-6xl">
                {content.intro.title}
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-black/68">{content.intro.description}</p>
            </div>
          </div>
        </section>
      )}

      <section className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-3xl hyphens-auto text-4xl font-semibold uppercase leading-none [overflow-wrap:anywhere] md:text-6xl">{content.services.title}</h2>
            <p className="font-mono text-sm text-white/45">
              01/{String(content.services.items.length).padStart(2, '0')}
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/12 md:grid-cols-2">
            {content.services.items.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group min-h-[220px] bg-black p-6 transition-colors hover:bg-[#d9ff80] hover:text-black md:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono text-sm text-white/42 transition-colors group-hover:text-black/42">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-black/15 group-hover:bg-black group-hover:text-[#d9ff80]">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold uppercase leading-tight">{service.title}</h3>
                  {service.description && (
                    <p className="mt-4 max-w-xl leading-7 text-white/62 transition-colors group-hover:text-black/68">
                      {service.description}
                    </p>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
              {lang === 'de' ? 'Ergebnisse' : 'Outcomes'}
            </p>
            <h2 className="mt-4 hyphens-auto text-4xl font-semibold uppercase leading-none [overflow-wrap:anywhere] md:text-6xl">{content.outcomes.title}</h2>
            {content.outcomes.description && (
              <p className="mt-8 text-lg leading-8 text-black/65">{content.outcomes.description}</p>
            )}
          </div>
          <div className="space-y-3">
            {content.outcomes.items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex items-start gap-4 rounded-full border border-black/12 bg-white px-5 py-4 shadow-[0_16px_50px_rgba(0,0,0,.05)]"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#5241d4]" />
                <p className="leading-7 text-black/72">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {content.tags && (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl border-t border-black/12 pt-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="hyphens-auto text-3xl font-semibold uppercase [overflow-wrap:anywhere] md:text-5xl">{content.tags.title}</h2>
              <span className="font-mono text-sm text-black/35">
                {String(content.tags.items.length).padStart(2, '0')}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {content.tags.items.map((tag) => (
                <span key={tag} className="rounded-full border border-black/14 bg-white px-5 py-3 text-sm font-semibold text-black/72">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d9ff80]">
              {lang === 'de' ? 'Nächster Schritt' : 'Next step'}
            </p>
            <h2 className="mt-4 max-w-4xl hyphens-auto text-4xl font-semibold uppercase leading-none [overflow-wrap:anywhere] md:text-6xl">{content.cta.title}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{content.cta.description}</p>
          </div>
          <a
            href={ctaHref}
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#d9ff80] px-7 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-white"
          >
            {content.cta.button}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
