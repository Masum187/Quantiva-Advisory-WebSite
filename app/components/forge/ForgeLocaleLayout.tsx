import { Geist, Instrument_Serif } from 'next/font/google';
import ForgeShell from '../../components/forge/ForgeShell';
import NoiseOverlay from '../../components/forge/NoiseOverlay';
import SmoothScroll from '../../components/forge/SmoothScroll';
import { ContentProvider } from '../../lib/contexts/ContentContext';
import type { ForgeLocale } from '../../lib/data/forge-content';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-forge-display',
  display: 'swap',
});

const sans = Geist({
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
      <SmoothScroll>
        <NoiseOverlay />
        <ContentProvider>
          <ForgeShell locale={locale}>{children}</ForgeShell>
        </ContentProvider>
      </SmoothScroll>
    </div>
  );
}
