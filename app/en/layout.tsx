import { ContentProvider } from '../lib/contexts/ContentContext';
import { LanguageProvider } from '../components/QuantivaWebsite';
import LaserCursor from '../components/LaserCursor';
import FloatingDock from '../components/FloatingDock';

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <ContentProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-teal-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <LaserCursor />
        <FloatingDock />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </ContentProvider>
    </LanguageProvider>
  );
}

