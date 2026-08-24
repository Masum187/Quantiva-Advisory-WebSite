import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ForgeLocale, forgePath } from '../../lib/data/forge-content';

type Props = {
  locale: ForgeLocale;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function ForgePageLayout({
  locale,
  eyebrow,
  title,
  lead,
  children,
  ctaHref,
  ctaLabel,
}: Props) {
  return (
    <div className="pt-[4.5rem]">
      <header className="border-b border-[var(--forge-line)] pb-12 pt-16 md:pb-16 md:pt-20">
        <div className="forge-container max-w-3xl">
          {eyebrow ? <p className="forge-meta">{eyebrow}</p> : null}
          <h1 className="forge-headline mt-4 text-[clamp(2.4rem,6vw,4.2rem)]">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--forge-muted)]">
              {lead}
            </p>
          ) : null}
          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref.startsWith('/v2/') ? ctaHref : forgePath(locale, ctaHref)}
              prefetch={false}
              className="forge-cta mt-8"
            >
              {ctaLabel}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      </header>
      <div className="forge-section !pt-12 md:!pt-16">{children}</div>
    </div>
  );
}
