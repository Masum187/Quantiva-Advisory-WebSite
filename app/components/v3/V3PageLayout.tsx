import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowDown } from 'lucide-react';
import { v3Path, type V3Locale } from '../../lib/data/v3-content';
import ClosingFooter from './sections/ClosingFooter';

type V3PageLayoutProps = {
  locale: V3Locale;
  eyebrow: string;
  title: string;
  intro: string;
  sectionLabel: string;
  children: ReactNode;
};

export default function V3PageLayout({
  locale,
  eyebrow,
  title,
  intro,
  sectionLabel,
  children,
}: V3PageLayoutProps) {
  return (
    <>
      <header className="v3-page-hero">
        <div className="v3-page-crumb">
          <Link href={v3Path(locale)} prefetch={false}>
            {locale === 'de' ? 'Start' : 'Home'}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{sectionLabel}</span>
        </div>
        <p className="v3-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="v3-page-intro">
          <p>{intro}</p>
          <span className="v3-page-arrow" aria-hidden="true">
            <ArrowDown aria-hidden="true" />
          </span>
        </div>
      </header>

      <div id="v3-page-content" className="v3-page-content">
        {children}
      </div>
      <ClosingFooter locale={locale} />
    </>
  );
}
