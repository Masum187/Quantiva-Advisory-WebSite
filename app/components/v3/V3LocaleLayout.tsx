import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';
import type { V3Locale } from '../../lib/data/v3-content';
import V3Shell from './V3Shell';
import V3SmoothScroll from './V3SmoothScroll';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-v3-sans',
  display: 'swap',
});

export default function V3LocaleLayout({
  children,
  locale,
}: {
  children: ReactNode;
  locale: V3Locale;
}) {
  return (
    <div className={geist.variable}>
      <V3SmoothScroll>
        <V3Shell locale={locale}>{children}</V3Shell>
      </V3SmoothScroll>
    </div>
  );
}
