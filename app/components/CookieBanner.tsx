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
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setShow(false)}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {lang === 'de' ? 'Ihre Privatsphäre ist uns wichtig' : 'Your privacy matters to us'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {lang === 'de'
                      ? 'Analytics nur nach Ihrer Einwilligung'
                      : 'Analytics only after your consent'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                aria-label="Schließen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {lang === 'de' ? (
                <>
                  Mit Ihrer Einwilligung nutzen wir <strong>Vercel Analytics</strong> und{' '}
                  <strong>Speed Insights</strong>. Ohne Zustimmung wird kein Tracking-Skript geladen.
                  Widerrufen Sie eine zuvor erteilte Einwilligung, wird die Seite neu geladen, damit
                  bereits geladene Skripte entfernt werden. Sie können Ihre Wahl jederzeit über den
                  Banner oder die Datenschutzerklärung ändern.
                </>
              ) : (
                <>
                  With your consent we use <strong>Vercel Analytics</strong> and{' '}
                  <strong>Speed Insights</strong>. No tracking script is loaded until you accept.
                  Withdrawing a previous consent reloads the page so already injected scripts are
                  removed. You can change your choice later via the banner or the privacy policy.
                </>
              )}
            </p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                  <strong className="text-gray-900 dark:text-white">Was wir erfassen:</strong>
                  <ul className="mt-1 ml-4 list-disc space-y-1">
                    {privacyConfig.trackedData.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Was wir NICHT erfassen:</strong>
                  <ul className="mt-1 ml-4 list-disc space-y-1">
                    {privacyConfig.notTracked.slice(0, 5).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-3 text-xs text-teal-600 dark:text-teal-400 hover:underline"
            >
              {showDetails ? 'Weniger anzeigen' : 'Mehr Details anzeigen'}
            </button>
          </div>

          <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 rounded-xl bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-500 transition shadow-lg shadow-teal-500/20"
            >
              {lang === 'de' ? 'Akzeptieren' : 'Accept'}
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {lang === 'de' ? 'Ablehnen' : 'Decline'}
            </button>
          </div>

          <div className="px-6 pb-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            {lang === 'de' ? 'Mehr Informationen in unserer' : 'More information in our'}{' '}
            <Link
              href={lang === 'de' ? '/de/datenschutz' : '/en/privacy'}
              className="text-teal-600 dark:text-teal-400 hover:underline"
            >
              {lang === 'de' ? 'Datenschutzerklärung' : 'privacy policy'}
            </Link>
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
