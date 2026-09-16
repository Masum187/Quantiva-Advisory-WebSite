import { unstable_cache } from 'next/cache';
import jobsData from '../data/jobs.json';
import { createJobPosting, fetchEntries, isContentfulEnabled } from './contentful';
import type { SupportedLanguage } from './contentHub';

export interface JobListing {
  id: string;
  language: SupportedLanguage;
  title: string;
  department?: string;
  location: string;
  employmentType: string;
  contractType?: string;
  seniority?: string;
  experienceYears?: string;
  remote?: boolean;
  tags?: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  applyUrl?: string;
  publishedAt: string;
}

const FALLBACK_JOBS: JobListing[] = jobsData as unknown as JobListing[];

const mapContentfulJob = (entry: any): JobListing | null => {
  const fields = entry?.fields;
  if (!fields) return null;

  return {
    id: fields.slug || fields.id || entry.sys?.id,
    language: (fields.language || 'de') as SupportedLanguage,
    title: fields.title || '',
    department: fields.department || undefined,
    location: fields.location || '',
    employmentType: fields.employmentType || 'Full-time',
    contractType: fields.contractType || undefined,
    seniority: fields.seniority || undefined,
    experienceYears: fields.experienceYears || undefined,
    remote: typeof fields.remote === 'boolean' ? fields.remote : undefined,
    tags: Array.isArray(fields.tags) ? fields.tags : [],
    description: fields.description || '',
    requirements: Array.isArray(fields.requirements) ? fields.requirements : [],
    benefits: Array.isArray(fields.benefits) ? fields.benefits : [],
    salary: fields.salary || undefined,
    applyUrl: fields.applyUrl || fields.applicationUrl || undefined,
    publishedAt: fields.publishedAt || new Date().toISOString(),
  };
};

const mapFallbackJobs = (lang: SupportedLanguage) =>
  FALLBACK_JOBS.filter((job) => job.language === lang).sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

async function loadJobListings(lang: SupportedLanguage): Promise<JobListing[]> {
  if (!isContentfulEnabled) {
    return mapFallbackJobs(lang);
  }

  const entries = await fetchEntries('jobPosting', {
    'fields.language': lang,
    order: '-fields.publishedAt',
  });

  const jobs = (entries || [])
    .map(mapContentfulJob)
    .filter((job): job is JobListing => Boolean(job && job.language === lang));

  if (!jobs.length) {
    return mapFallbackJobs(lang);
  }

  return jobs;
}

export async function getJobListings(lang: SupportedLanguage): Promise<JobListing[]> {
  return unstable_cache(() => loadJobListings(lang), ['job-listings', lang], {
    tags: ['jobs'],
    revalidate: 300,
  })();
}

export async function submitJobPosting(form: JobListing & { body?: string }) {
  const fields = {
    title: { [form.language]: form.title },
    language: { 'en-US': form.language },
    department: form.department ? { 'en-US': form.department } : undefined,
    location: { 'en-US': form.location },
    employmentType: { 'en-US': form.employmentType },
    seniority: form.seniority ? { 'en-US': form.seniority } : undefined,
    remote: { 'en-US': !!form.remote },
    tags: form.tags ? { 'en-US': form.tags } : undefined,
    description: { [form.language]: form.description },
    requirements: { [form.language]: form.requirements },
    benefits: { [form.language]: form.benefits },
    applyUrl: form.applyUrl ? { 'en-US': form.applyUrl } : undefined,
    publishedAt: { 'en-US': form.publishedAt || new Date().toISOString() },
  } as const;

  return createJobPosting(fields);
}
