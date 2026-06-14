'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { industriesDe, industriesEn } from '../../lib/data/industries';
import { useLanguage } from '../QuantivaWebsite';

interface IndustriesSectionProps {
  lang: 'de' | 'en';
}

function Counter({ index, total }: { index: number; total: number }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.14em] text-current/55">
      {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  );
}

export default function IndustriesSection({ lang }: IndustriesSectionProps) {
  const industries = lang === 'de' ? industriesDe : industriesEn;
  const { localePath } = useLanguage();
  const headline = lang === 'de' ? 'Branchen-Expertise' : 'Industry Expertise';
  const subline =
    lang === 'de'
      ? 'Wir begleiten mittelständische Marktführer in regulierten und wachstumsstarken Branchen.'
      : 'We partner with mid-market leaders in regulated and fast-scaling industries.';

  return (
    <section className="bg-[#f7f6ff] py-20 text-black lg:py-28" id="industries">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-black/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
              <Briefcase className="h-4 w-4" />
              {lang === 'de' ? 'Mittelstand Branchen' : 'Mid-Market Verticals'}
            </div>
            <h2 className="mt-6 text-[clamp(2.7rem,5vw,4.4rem)] font-semibold leading-none">
              {headline}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-black/65">{subline}</p>
        </motion.div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Link
                href={localePath(`/industries/${industry.slug}`)}
                className="group block h-full bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/18" />
                </div>
                <div className="p-6">
                  <Counter index={index + 1} total={industries.length} />
                  <h3 className="mt-6 text-2xl font-semibold leading-tight">
                    {industry.title}
                  </h3>
                  <p className="mt-3 text-sm text-black/60">{industry.description}</p>
                  <div className="mt-6 inline-flex rounded-full border border-black/12 px-3 py-1 text-xs uppercase tracking-[0.12em] text-black/55">
                    {industry.projects}+ {lang === 'de' ? 'Projekte' : 'projects'}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
