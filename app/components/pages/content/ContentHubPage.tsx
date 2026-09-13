'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Download, FileText, Filter, Newspaper, Search, Tag } from 'lucide-react';
import { AnimatedCard } from '../../services/AnimatedCard';
import { useLanguage } from '../../QuantivaWebsite';
import type { ContentPost, ContentType } from '../../../lib/utils/contentHub';
import SiteNav from '../../SiteNav';

interface ContentHubPageProps {
  lang: 'de' | 'en';
  posts: ContentPost[];
}

const FILTER_ANIMATION = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const formatDate = (date: string, lang: 'de' | 'en') => {
  try {
    return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  } catch {
    return date;
  }
};

export default function ContentHubPage({ lang, posts }: ContentHubPageProps) {
  const { localePath } = useLanguage();
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const { tags, industries, contentTypes } = useMemo(() => {
    const tagSet = new Set<string>();
    const industrySet = new Set<string>();
    const typeSet = new Set<ContentType>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag));
      if (post.industry) industrySet.add(post.industry);
      if (post.contentType) typeSet.add(post.contentType);
    });
    return {
      tags: Array.from(tagSet).sort(),
      industries: Array.from(industrySet).sort(),
      contentTypes: Array.from(typeSet).sort(),
    };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = `${post.title} ${post.excerpt}`.toLowerCase().includes(search.toLowerCase().trim());
      const matchesTag = tagFilter === 'all' || post.tags?.includes(tagFilter);
      const matchesIndustry = industryFilter === 'all' || post.industry === industryFilter;
      const matchesType = typeFilter === 'all' || post.contentType === typeFilter;
      return matchesSearch && matchesTag && matchesIndustry && matchesType;
    });
  }, [posts, search, tagFilter, industryFilter, typeFilter]);

  const featuredPosts = posts.filter((post) => post.featured);
  const heroPost = filteredPosts.find((post) => post.highlight) || filteredPosts[0];
  const secondaryPosts = filteredPosts.filter((post) => post.slug !== heroPost?.slug);

  const contentTypeLabels = {
    de: {
      article: 'Artikel',
      whitepaper: 'Whitepaper',
      'case-study': 'Case Study',
      report: 'Report',
    },
    en: {
      article: 'Article',
      whitepaper: 'Whitepaper',
      'case-study': 'Case Study',
      report: 'Report',
    },
  }[lang];

  const t = {
    de: {
      title: 'Content Hub',
      subtitle: 'Impulse, Playbooks und Projekteinblicke für den Mittelstand',
      searchPlaceholder: 'Suche nach Themen oder Schlagworten',
      tagAll: 'Alle Tags',
      industryAll: 'Alle Branchen',
      typeAll: 'Alle Typen',
      latestStories: 'Aktuelle Beiträge',
      featuredContent: 'Featured Content',
      emptyState: 'Keine Beiträge gefunden. Bitte Filter anpassen.',
      readingTime: (min?: number) => (min ? `${min} Min` : ''),
      download: 'Download',
    },
    en: {
      title: 'Content Hub',
      subtitle: 'Insights, playbooks and project takeaways for mid-market leaders',
      searchPlaceholder: 'Search topics or keywords',
      tagAll: 'All tags',
      industryAll: 'All industries',
      typeAll: 'All types',
      latestStories: 'Latest stories',
      featuredContent: 'Featured Content',
      emptyState: 'No posts found. Adjust your filters.',
      readingTime: (min?: number) => (min ? `${min} min` : ''),
      download: 'Download',
    },
  }[lang];

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav lang={lang} variant="solid" />
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-teal-900/40 via-black to-black">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.25),_transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-teal-500/40 bg-teal-500/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-200">
              <Newspaper className="h-4 w-4" />
              {lang === 'de' ? 'Quantiva Insights' : 'Quantiva Insights'}
            </div>
          </motion.div>

          <motion.h1
            className="mt-8 text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.title}
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base text-gray-300 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-4"
            variants={FILTER_ANIMATION}
            initial="hidden"
            animate="visible"
          >
            <div className="relative flex w-full max-w-xl items-center rounded-full border border-white/20 bg-black/40 px-5 py-3">
              <Search className="h-5 w-5 text-teal-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="ml-3 w-full bg-transparent text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm text-gray-200">
                <FileText className="h-4 w-4 text-blue-300" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-transparent text-sm focus:outline-none"
                >
                  <option value="all">{t.typeAll}</option>
                  {contentTypes.map((type) => (
                    <option key={type} value={type}>
                      {contentTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm text-gray-200">
                <Tag className="h-4 w-4 text-teal-300" />
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="bg-transparent text-sm focus:outline-none"
                >
                  <option value="all">{t.tagAll}</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm text-gray-200">
                <Filter className="h-4 w-4 text-purple-300" />
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="bg-transparent text-sm focus:outline-none"
                >
                  <option value="all">{t.industryAll}</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-20">
        {/* Featured Content Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <motion.h2
              className="mb-10 text-3xl font-bold uppercase tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t.featuredContent}
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <AnimatedCard
                  key={post.slug}
                  as="article"
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.1}
                  className="group relative overflow-hidden rounded-3xl border border-teal-500/30 bg-gradient-to-br from-slate-900/80 to-black/80 shadow-[0_20px_60px_-20px_rgba(45,212,191,0.3)]"
                >
                  <Link href={localePath(`/content/${post.slug}`)} className="flex flex-col h-full">
                    <div className="relative h-48 w-full overflow-hidden">
                      <div
                        className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${post.heroImage || 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop'})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      {post.contentType && (
                        <div className="absolute top-4 right-4 rounded-full border border-teal-400/40 bg-teal-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-200 backdrop-blur-sm">
                          {contentTypeLabels[post.contentType]}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-sm text-gray-300 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {formatDate(post.publishedAt, lang)}
                        </span>
                        {post.downloadUrl && (
                          <span className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300">
                            <Download className="h-4 w-4" />
                            {t.download}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </section>
        )}

        {heroPost ? (
          <section className="mb-20 grid gap-10 lg:grid-cols-[60%_1fr]">
            <AnimatedCard as="article" direction="left" className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-black/80">
              <Link href={localePath(`/content/${heroPost.slug}`)} className="flex h-full flex-col">
                <div className="relative h-64 w-full overflow-hidden sm:h-80">
                  <div
                    className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${heroPost.heroImage || 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-teal-300">
                      <span>{formatDate(heroPost.publishedAt, lang)}</span>
                      {heroPost.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full border border-teal-400/30 px-3 py-1 text-[0.65rem]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                      {heroPost.title}
                    </h2>
                    <p className="mt-4 text-base text-gray-300">
                      {heroPost.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(heroPost.publishedAt, lang)}
                    </span>
                    {heroPost.readingTime ? (
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {t.readingTime(heroPost.readingTime)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            </AnimatedCard>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-200 uppercase tracking-[0.3em]">
                {t.latestStories}
              </h3>
              <div className="grid gap-4">
                {secondaryPosts.slice(0, 3).map((post) => (
                  <AnimatedCard
                    key={post.slug}
                    as="article"
                    direction="right"
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-colors hover:border-teal-400/40"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                      <div
                        className="h-full w-full scale-105 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${post.heroImage || 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=400&auto=format&fit=crop'})` }}
                      />
                    </div>
                    <div className="flex-1">
                      <Link href={localePath(`/content/${post.slug}`)}>
                        <h4 className="text-base font-semibold text-white transition-colors group-hover:text-teal-300">
                          {post.title}
                        </h4>
                      </Link>
                      <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt, lang)}
                        </span>
                        {post.readingTime ? (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {t.readingTime(post.readingTime)}
                          </span>
                        ) : null}
                        {post.tags?.[0] ? (
                          <span className="inline-flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {post.tags[0]}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="space-y-6">
          {secondaryPosts.length > 3 && (
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{secondaryPosts.length} {lang === 'de' ? 'Beiträge' : 'posts'}</span>
            </div>
          )}

          {secondaryPosts.length ? (
            <div className="grid gap-8 sm:grid-cols-2">
              {secondaryPosts.slice(3).map((post, index) => (
                <AnimatedCard
                  key={post.slug}
                  as="article"
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.05}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70"
                >
                  <Link href={localePath(`/content/${post.slug}`)} className="flex h-full flex-col">
                    <div className="relative h-52 w-full overflow-hidden">
                      <div
                        className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${post.heroImage || 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop'})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-teal-300">
                          <span>{formatDate(post.publishedAt, lang)}</span>
                          {post.industry ? <span>{post.industry}</span> : null}
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-white">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-sm text-gray-400 line-clamp-4">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt, lang)}
                        </span>
                        {post.readingTime ? (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {t.readingTime(post.readingTime)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          ) : !heroPost ? (
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-12 text-center text-gray-400">
              {t.emptyState}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
