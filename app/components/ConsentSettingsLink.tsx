'use client';

import { requestConsentBanner } from '../lib/utils/privacy';

export default function ConsentSettingsLink({ lang }: { lang: 'de' | 'en' }) {
  return (
    <button
      type="button"
      onClick={() => requestConsentBanner()}
      className="mt-4 text-sm font-light text-teal-300 underline-offset-4 transition hover:text-teal-200 hover:underline"
    >
      {lang === 'de' ? 'Cookie-Einstellungen öffnen' : 'Open cookie settings'}
    </button>
  );
}
