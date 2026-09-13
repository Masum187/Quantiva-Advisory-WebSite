'use client';

/**
 * Navigation — Kompatibilitäts-Hülle.
 * Rendert die einheitliche SiteNav im Startseiten-Stil.
 * Die frühere items-Prop bleibt aus API-Kompatibilität erhalten,
 * wird aber ignoriert: die Navigation ist überall identisch.
 */

import React from 'react';
import SiteNav from './SiteNav';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationProps {
  lang: 'de' | 'en';
  items?: NavigationItem[];
}

export default function Navigation({ lang }: NavigationProps) {
  return <SiteNav lang={lang} variant="solid" />;
}
