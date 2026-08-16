import { Instrument_Serif, Manrope } from 'next/font/google';
import ForgeShell from '../../components/forge/ForgeShell';
import { ContentProvider } from '../../lib/contexts/ContentContext';
import type { ForgeLocale } from '../../lib/data/forge-content';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-forge-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-forge-sans',
  display: 'swap',
});

export default function ForgeLocaleLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: ForgeLocale;
}) {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <ContentProvider>
        <ForgeShell locale={locale}>{children}</ForgeShell>
      </ContentProvider>
    </div>
  );
}
