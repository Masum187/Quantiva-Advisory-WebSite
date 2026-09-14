'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SiteNav from '../../SiteNav';
import ContactForm from '../../ContactForm';
import { EASE, SpotlightCard } from '../projects/detail/shared';
import { getJobListings, type JobListing } from '../../../lib/utils/jobs';
import {
  careerLevels,
  getNextCareerLevel,
  jobMatchesCareerLevel,
  type CareerLevelSlug,
  type Lang,
} from '../../../lib/data/careerLevels';
import {
  FinalCtaFrame,
  GraduatesHero,
  GraduatesOffers,
  GraduatesPath,
  JobsChapterFrame,
  LeadersHero,
  LeadersOffers,
  LeadersPath,
  ProfessionalsHero,
  ProfessionalsOffers,
  ProfessionalsPath,
  StudentsHero,
  StudentsOffers,
  StudentsPath,
} from './levelDirecting';

const ACCENT = '#2dd4bf';
const APPLY_MAILTO = 'mailto:careers@quantiva-advisory.com';

interface CareerLevelPageProps {
  lang: Lang;
  level: CareerLevelSlug;
}

export default function CareerLevelPage({ lang, level }: CareerLevelPageProps) {
  const data = careerLevels[level];
  const copy = data[lang];
  const next = getNextCareerLevel(level);
  const nextCopy = next[lang];

  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  useEffect(() => {
    let mounted = true;
    setJobLoading(true);
    getJobListings(lang)
      .then((listings) => {
        if (mounted) setJobs(listings);
      })
      .catch(() => {
        if (mounted) {
          setJobError(
            lang === 'de'
              ? 'Stellen konnten nicht geladen werden.'
              : 'Unable to load job listings.',
          );
        }
      })
      .finally(() => {
        if (mounted) setJobLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [lang]);

  const filteredJobs = useMemo(
    () => jobs.filter((job) => jobMatchesCareerLevel(job, level)),
    [jobs, level],
  );

  const heroProps = { copy, video: data.video, poster: data.poster, lang };

  return (
    <div className="min-h-screen bg-[#04060b] text-white">
      <SiteNav lang={lang} variant="solid" />

      {level === 'students' ? <StudentsHero {...heroProps} /> : null}
      {level === 'graduates' ? <GraduatesHero {...heroProps} /> : null}
      {level === 'professionals' ? <ProfessionalsHero {...heroProps} /> : null}
      {level === 'leaders' ? <LeadersHero {...heroProps} /> : null}

      {level === 'students' ? <StudentsOffers copy={copy} /> : null}
      {level === 'graduates' ? <GraduatesOffers copy={copy} /> : null}
      {level === 'professionals' ? (
        <ProfessionalsOffers copy={copy} poster={data.poster} />
      ) : null}
      {level === 'leaders' ? <LeadersOffers copy={copy} /> : null}

      {level === 'students' ? <StudentsPath copy={copy} /> : null}
      {level === 'graduates' ? <GraduatesPath copy={copy} /> : null}
      {level === 'professionals' ? <ProfessionalsPath copy={copy} /> : null}
      {level === 'leaders' ? <LeadersPath copy={copy} /> : null}

      <JobsChapterFrame level={level} copy={copy}>
        <div className="space-y-6">
          {jobLoading ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-gray-400">
              {lang === 'de' ? 'Lade offene Positionen …' : 'Loading job openings …'}
            </div>
          ) : jobError ? (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-10 text-center text-red-200">
              {jobError}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <h3 className="text-xl font-light text-white">{copy.emptyTitle}</h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
                {copy.emptyText}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={APPLY_MAILTO}
                  className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-7 py-3.5 font-semibold text-black transition-all duration-300 hover:bg-teal-300"
                >
                  {copy.initiativeCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href={`/${lang}/career`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-teal-400/50"
                >
                  {copy.allJobsCta}
                </Link>
              </div>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
              >
                <SpotlightCard
                  accent={ACCENT}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-teal-400/40"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-light tracking-tight text-white">{job.title}</h3>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
                          {job.location}
                        </span>
                        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
                          {job.employmentType}
                        </span>
                        {job.department ? (
                          <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
                            {job.department}
                          </span>
                        ) : null}
                        {job.seniority ? (
                          <span className="rounded-full border border-teal-400/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-teal-300">
                            {job.seniority}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="self-start rounded-full border border-teal-400/60 px-6 py-3 font-semibold text-teal-300 transition-all duration-300 hover:bg-teal-400 hover:text-black"
                    >
                      {copy.applyCta}
                    </button>
                  </div>
                  <p className="mt-6 leading-relaxed text-gray-400">{job.description}</p>
                </SpotlightCard>
              </motion.div>
            ))
          )}
        </div>
      </JobsChapterFrame>

      <FinalCtaFrame level={level} copy={copy} />

      <section className="relative z-10 overflow-hidden border-t border-white/10 bg-[#04060b] py-24 md:py-32">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[16vw] font-bold uppercase leading-none text-white/[0.04]"
        >
          {nextCopy.eyebrow}
        </span>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400">
            {copy.nextLabel}
          </p>
          <Link href={`/${lang}/career/${next.slug}`} className="group mt-6 inline-block">
            <span className="block text-[clamp(2.2rem,6vw,4.4rem)] font-light leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-teal-300">
              {nextCopy.eyebrow}
            </span>
            <span className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400 transition group-hover:text-white">
              {nextCopy.title}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-[#03050a]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
              {copy.footerQuick}
            </h4>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href={`/${lang}/career`} className="text-sm font-light text-gray-300 transition hover:text-white">
                  {lang === 'de' ? 'Karriere' : 'Careers'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-sm font-light text-gray-300 transition hover:text-white">
                  {lang === 'de' ? 'Über uns' : 'About'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/team`} className="text-sm font-light text-gray-300 transition hover:text-white">
                  Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
              {copy.footerContact}
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm font-light text-gray-300">
              <li>
                <a href={APPLY_MAILTO} className="transition hover:text-white">
                  careers@quantiva-advisory.com
                </a>
              </li>
              <li>
                <Link href={`/${lang}#contact`} className="transition hover:text-white">
                  {lang === 'de' ? 'Kontaktformular' : 'Contact form'}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-light leading-relaxed text-gray-400">Quantiva Advisory</p>
          </div>
        </div>
        <div className="border-t border-white/5 py-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gray-600">
          {copy.footerCopyright}
        </div>
      </footer>

      <AnimatePresence>
        {selectedJob ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0a0d14] p-8"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-light text-white">{selectedJob.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {selectedJob.location} · {selectedJob.employmentType}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-gray-400 hover:border-teal-400/40 hover:text-teal-300"
                  onClick={() => setSelectedJob(null)}
                >
                  {lang === 'de' ? 'Schließen' : 'Close'}
                </button>
              </div>
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6">
                <h4 className="mb-3 text-lg font-semibold text-white">
                  {lang === 'de' ? 'Jetzt direkt bewerben' : 'Apply directly'}
                </h4>
                <p className="mb-4 text-sm text-gray-400">
                  {lang === 'de'
                    ? 'Sende uns kurz deine Kontaktdaten und wir melden uns innerhalb eines Tages.'
                    : 'Share your contact details – we will get back within one business day.'}
                </p>
                <ContactForm lang={lang} jobId={selectedJob.id} jobTitle={selectedJob.title} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
