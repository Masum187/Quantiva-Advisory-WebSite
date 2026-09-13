'use client';

/**
 * ServiceNavigation — Kompatibilitäts-Hülle.
 * Rendert die einheitliche SiteNav im Startseiten-Stil.
 * serviceTitle/serviceId bleiben aus API-Kompatibilität erhalten,
 * werden aber nicht mehr angezeigt: die Navigation ist überall identisch.
 */

import React from 'react';
import SiteNav from './SiteNav';

interface ServiceNavigationProps {
  lang: 'de' | 'en';
  serviceTitle?: string;
  serviceId?: string;
}

export default function ServiceNavigation({ lang }: ServiceNavigationProps) {
  return <SiteNav lang={lang} variant="solid" />;
}
