'use client';

/**
 * Visible marker that CMS / AI / video admin UIs are not a production CMS.
 */
export default function DemoModeBanner({
  lang = 'de',
}: {
  lang?: 'de' | 'en';
}) {
  const label =
    lang === 'de'
      ? 'Demo / nicht produktiv — interne Werkzeuge, keine produktiven Inhalte.'
      : 'Demo / not production — internal tools, not a live CMS.';

  return (
    <div
      role="status"
      className="sticky top-0 z-[80] border-b border-amber-400/40 bg-amber-500/15 px-4 py-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber-200"
    >
      {label}
    </div>
  );
}
