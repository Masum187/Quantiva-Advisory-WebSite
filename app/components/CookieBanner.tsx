/**
 * Cookie Banner Component
 * GDPR-compliant opt-in banner for analytics
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ANALYTICS_CONSENT_KEY,
  ANALYTICS_CONSENT_REOPEN_EVENT,
  setAnalyticsConsent,
  privacyConfig,
} from '../lib/utils/privacy';
import { X, Shield } from 'lucide-react';

export default function CookieBanner({ lang = 'de' }: { lang?: 'de' | 'en' }) {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (consent === null) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      setShowDetails(false);
      setShow(true);
    };
    window.addEventListener(ANALYTICS_CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(ANALYTICS_CONSENT_REOPEN_EVENT, reopen);
  }, []);

  if (!show) return null;

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setShow(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setShow(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-[45] bg-black/40 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-6 animate-slide-up pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-h-[min(78dvh,560px)] max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
          <div className="p-4 pb-3 sm:p-6 sm:pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30">
                  <Shield className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                    {lang === 'de' ? 'Ihre Privatsphäre ist uns wichtig' : 'Your privacy matters to us'}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    {lang === 'de'
                      ? 'Analytics nur nach Ihrer Einwilligung'
                      : 'Analytics only after your consent'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDecline}
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-300"
                aria-label={lang === 'de' ? 'Ablehnen und schließen' : 'Decline and close'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-3 sm:px-6 sm:pb-6">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {lang === 'de' ? (
                <>
                  Mit Ihrer Einwilligung nutzen wir <strong>Vercel Analytics</strong> und{' '}
                  <strong>Speed Insights</strong>. Ohne Zustimmung wird kein Tracking-Skript geladen.
                  {showDetails ? (
                    <>
                      {' '}
                      Widerrufen Sie eine zuvor erteilte Einwilligung, wird die Seite neu geladen, damit
                      bereits geladene Skripte entfernt werden. Sie können Ihre Wahl jederzeit über den
                      Banner oder die Datenschutzerklärung ändern.
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  With your consent we use <strong>Vercel Analytics</strong> and{' '}
                  <strong>Speed Insights</strong>. No tracking script is loaded until you accept.
                  {showDetails ? (
                    <>
                      {' '}
                      Withdrawing a previous consent reloads the page so already injected scripts are
                      removed. You can change your choice later via the banner or the privacy policy.
                    </>
                  ) : null}
                </>
              )}
            </p>

            <div className={`${showDetails ? 'mt-4 grid' : 'mt-4 hidden sm:grid'} grid-cols-2 gap-3 sm:grid-cols-4`}>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-teal-400" />
                <span>Opt-in</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-teal-400" />
                <span>Anonyme IPs</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-teal-400" />
                <span>GDPR-konform</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-teal-400" />
                <span>90 Tage Speicherung</span>
              </div>
            </div>

            {showDetails && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs text-gray-600 dark:text-gray-300 space-y-2">
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    {lang === 'de' ? 'Was wir erfassen:' : 'What we collect:'}
                  </strong>
                  <ul className="mt-1 ml-4 list-disc space-y-1">
                    {privacyConfig.trackedData.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">
                    {lang === 'de' ? 'Was wir NICHT erfassen:' : 'What we do not collect:'}
                  </strong>
                  <ul className="mt-1 ml-4 list-disc space-y-1">
                    {privacyConfig.notTracked.slice(0, 5).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="mt-3 min-h-11 text-left text-xs text-teal-600 hover:underline dark:text-teal-400"
            >
              {showDetails
                ? lang === 'de'
                  ? 'Weniger anzeigen'
                  : 'Show less'
                : lang === 'de'
                  ? 'Mehr Details anzeigen'
                  : 'Show more details'}
            </button>
          </div>

          <div className="shrink-0 border-t border-gray-200 px-4 pb-3 pt-3 sm:px-6 sm:pb-4 dark:border-gray-800">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAccept}
                className="min-h-11 flex-1 rounded-xl bg-teal-600 px-6 py-3 font-medium text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-500"
              >
                {lang === 'de' ? 'Akzeptieren' : 'Accept'}
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="min-h-11 flex-1 rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {lang === 'de' ? 'Ablehnen' : 'Decline'}
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
              {lang === 'de' ? 'Mehr Informationen in unserer' : 'More information in our'}{' '}
              <Link
                href={lang === 'de' ? '/de/datenschutz' : '/en/privacy'}
                className="text-teal-600 hover:underline dark:text-teal-400"
              >
                {lang === 'de' ? 'Datenschutzerklärung' : 'privacy policy'}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
