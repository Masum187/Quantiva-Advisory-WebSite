'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Calendar, FileText, BriefcaseIcon, BookOpen, Phone, X } from 'lucide-react';
import { useLanguage } from './QuantivaWebsite';
import { usePathname } from 'next/navigation';

const hiddenRoutes = ['/admin', '/cms'];

export default function FloatingDock() {
  const { lang, localePath } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const shouldHide = useMemo(() => {
    return hiddenRoutes.some((segment) => pathname?.includes(segment));
  }, [pathname]);

  const shortcuts = useMemo(() => {
    if (lang === 'de') {
      return [
        {
          id: 'contact',
          label: 'Beratung anfragen',
          description: 'Direkter Kontakt zum Quantiva-Team',
          href: localePath('/#contact'),
          icon: Phone,
        },
        {
          id: 'content',
          label: 'Content Hub',
          description: 'Playbooks & Insights erleben',
          href: localePath('/content'),
          icon: BookOpen,
        },
        {
          id: 'cases',
          label: 'Referenzen',
          description: 'Projekte & Outcomes entdecken',
          href: localePath('/cases'),
          icon: FileText,
        },
        {
          id: 'career',
          label: 'Karriere',
          description: 'Offene Stellen ansehen',
          href: localePath('/career'),
          icon: BriefcaseIcon,
        },
      ];
    }

    return [
      {
        id: 'contact',
        label: 'Talk to us',
        description: 'Book a call with the team',
        href: localePath('/#contact'),
        icon: Calendar,
      },
      {
        id: 'content',
        label: 'Content Hub',
        description: 'Guides & playbooks for mid-market leaders',
        href: localePath('/content'),
        icon: BookOpen,
      },
      {
        id: 'cases',
        label: 'Cases',
        description: 'See how other clients scale',
        href: localePath('/cases'),
        icon: FileText,
      },
      {
        id: 'career',
        label: 'Careers',
        description: 'Join the Quantiva journey',
        href: localePath('/career'),
        icon: BriefcaseIcon,
      },
    ];
  }, [lang, localePath]);

  if (shouldHide) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      <motion.div
        initial={false}
        animate={{ scale: open ? 1.15 : 1, opacity: open ? 0.45 : 0.25 }}
        className="pointer-events-none absolute bottom-0 right-0 h-36 w-36 rounded-full bg-gradient-to-br from-teal-500/40 to-purple-500/20 blur-3xl"
      />
      <AnimatePresence>
        {open && (
          <motion.div
            className="pointer-events-auto flex flex-col gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {shortcuts.map((shortcut, index) => {
              const Icon = shortcut.icon;
              return (
                <motion.div
                  key={shortcut.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={shortcut.href}
                    className="group block w-64 rounded-2xl border border-white/15 bg-slate-900/90 p-4 shadow-lg shadow-teal-500/10 transition hover:border-teal-400/40 hover:shadow-teal-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300 group-hover:bg-teal-500/25 group-hover:text-teal-100 transition">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {shortcut.label}
                        </p>
                        <p className="text-xs text-gray-400">
                          {shortcut.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="pointer-events-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 via-teal-400 to-purple-500 text-white shadow-xl shadow-teal-500/30 transition hover:scale-110 hover:shadow-teal-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
        aria-expanded={open}
        aria-label={open ? 'Close floating menu' : 'Open floating menu'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
