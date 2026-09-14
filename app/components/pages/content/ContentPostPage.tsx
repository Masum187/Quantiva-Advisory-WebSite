'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Download, Share2, Tag } from 'lucide-react';
import { useLanguage } from '../../QuantivaWebsite';
import type { ContentPost } from '../../../lib/utils/contentHub';
import SiteNav from '../../SiteNav';

interface ContentPostPageProps {
  lang: 'de' | 'en';
  post: ContentPost;
  related: ContentPost[];
}

const t = {
  de: {
    back: 'Zurück zum Content Hub',
    related: 'Weitere Beiträge',
    share: 'Teilen',
    copied: 'Link kopiert',
    download: 'Download',
    readingTime: (min?: number) => (min ? `${min} Min Lesedauer` : ''),
  },
  en: {
    back: 'Back to Content Hub',
    related: 'Related posts',
    share: 'Share',
    copied: 'Link copied',
    download: 'Download',
    readingTime: (min?: number) => (min ? `${min} min read` : ''),
  },
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

export default function ContentPostPage({ lang, post, related }: ContentPostPageProps) {
  const { localePath } = useLanguage();
  const dict = t[lang];
  const paragraphs = post.body?.split(/\n\n+/).filter(Boolean) ?? [];
  const [shareLabel, setShareLabel] = useState(dict.share);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareLabel(dict.copied);
      window.setTimeout(() => setShareLabel(dict.share), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setShareLabel(dict.copied);
        window.setTimeout(() => setShareLabel(dict.share), 2000);
      } catch {
        /* user cancelled share or clipboard unavailable */
      }
    }
  };

  return (
    <article className="min-h-screen bg-black text-white">
      <SiteNav lang={lang} variant="solid" />
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-900/80 via-black to-black">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.2),_transparent_60%)]" />
        <div className="relative mx-auto grid max-w-5xl gap-12 px-6 py-20 lg:grid-cols-[60%_1fr]">
          <div>
            <Link
              href={localePath('/content')}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-300 hover:border-teal-400/40 hover:text-teal-300"
            >
              <ArrowLeft className="h-4 w-4" /> {dict.back}
            </Link>

            <motion.h1
              className="mt-6 text-4xl font-bold leading-tight sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {post.title}
            </motion.h1>

            <motion.p
              className="mt-5 text-lg text-gray-300"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-400"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt, lang)}
              </span>
              {post.readingTime ? (
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {dict.readingTime(post.readingTime)}
                </span>
              ) : null}
              {post.tags?.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                  <Tag className="h-3 w-3" /> {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative h-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.heroImage || '/assets/og-default.jpg'})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 flex gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-200 hover:border-teal-400/40 hover:text-teal-200"
              >
                <Share2 className="mr-2 inline h-3 w-3" /> {shareLabel}
              </button>
              {post.downloadUrl ? (
                <a
                  href={post.downloadUrl}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-200 hover:border-teal-400/40 hover:text-teal-200"
                >
                  <Download className="mr-2 inline h-3 w-3" /> {dict.download}
                </a>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 text-base leading-relaxed text-gray-200">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-6">
            {paragraph}
          </p>
        ))}
      </div>

      {related.length ? (
        <section className="border-t border-white/10 bg-black/60 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-gray-400">
              {dict.related}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.slice(0, 4).map((item, index) => (
                <motion.article
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-teal-300">
                      <span>{formatDate(item.publishedAt, lang)}</span>
                      {item.tags?.[0] ? <span>{item.tags[0]}</span> : null}
                    </div>
                    <Link href={localePath(`/content/${item.slug}`)}>
                      <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-teal-300">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="mt-3 text-sm text-gray-400 line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(item.publishedAt, lang)}
                    </span>
                    {item.readingTime ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dict.readingTime(item.readingTime)}
                      </span>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
