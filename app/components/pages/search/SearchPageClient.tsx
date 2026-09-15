'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import elasticlunr from 'elasticlunr';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import type { SearchItem } from '../../../lib/utils/searchIndex';
import SiteNav from '../../SiteNav';

interface SearchPageClientProps {
  items: SearchItem[];
  lang: 'de' | 'en';
}

export default function SearchPageClient({ items, lang }: SearchPageClientProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const index = useMemo(() => {
    const idx = elasticlunr<SearchItem>(function () {
      this.setRef('id');
      this.addField('title');
      this.addField('description');
      this.addField('category');
      this.addField('tags');
    });

    items.forEach((item) => idx.addDoc(item));
    return idx;
  }, [items]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return items.slice(0, 12);
    }

    const matches = index
      .search(query, {
        expand: true,
        fields: {
          title: { boost: 3 },
          description: { boost: 2 },
          tags: { boost: 2 },
          category: { boost: 1 },
        },
      })
      .map((res) => res.doc);

    return matches;
  }, [index, items, query]);

  const copy = {
    de: {
      title: 'Globale Suche',
      subtitle: 'Finde Inhalte, Services und Branchenlösungen auf einen Blick.',
      placeholder: 'Nach Themen, Services oder Branchen suchen …',
      results: 'Treffer',
      empty: 'Keine Treffer. Bitte Suchbegriff anpassen.',
    },
    en: {
      title: 'Global Search',
      subtitle: 'Discover content, services and industry solutions instantly.',
      placeholder: 'Search topics, services or industries …',
      results: 'results',
      empty: 'No matches. Try another query.',
    },
  }[lang];

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav lang={lang} variant="solid" />
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-purple-900/40 via-black to-black py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.2),_transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/40 bg-purple-500/10">
              <Sparkles className="h-6 w-6 text-purple-300" />
            </div>
            <h1 className="text-4xl font-bold md:text-5xl">{copy.title}</h1>
            <p className="mt-4 text-lg text-gray-300">{copy.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-12 max-w-3xl"
          >
            <div className="relative overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur">
              <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-200" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.placeholder}
                className="w-full bg-transparent px-16 py-5 text-lg text-white placeholder:text-gray-400 focus:outline-none"
                autoFocus
              />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-6 text-sm text-gray-400" role="status" aria-live="polite">
          {results.length} {copy.results}
        </div>

        {results.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-gray-300" role="status" aria-live="polite">
            {copy.empty}
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-black/80"
              >
                <Link href={result.href} className="block p-6 transition hover:bg-white/5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-purple-200">
                        {result.category}
                      </span>
                      <h2 className="mt-4 text-2xl font-semibold text-white">{result.title}</h2>
                      <p className="mt-2 text-sm text-gray-300">{result.description}</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-purple-300" />
                  </div>
                  {result.tags.length ? (
                    <div className="mt-5 flex flex-wrap gap-2 text-xs text-gray-400">
                      {result.tags.slice(0, 6).map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
