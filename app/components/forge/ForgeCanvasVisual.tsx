'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/** Full-bleed canvas mock — product visual without cards in the hero. */
export default function ForgeCanvasVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="forge-grid-bg absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(217,255,128,0.08),transparent_55%)]" />
      <motion.div style={{ scale, y, opacity }} className="absolute inset-x-0 bottom-0 top-[28%] md:top-[22%]">
        <div className="mx-auto h-full w-[min(100%,1100px)] px-4 md:px-8">
          <div className="relative h-full overflow-hidden rounded-t-[1.25rem] border border-[var(--forge-line)] border-b-0 bg-[var(--forge-bg-elevated)] shadow-[0_-40px_120px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-2 border-b border-[var(--forge-line)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--forge-faint)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--forge-faint)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--forge-signal)]/70" />
              <span className="ml-3 forge-meta">workspace · sap-cutover · live</span>
            </div>
            <div className="grid h-[calc(100%-2.75rem)] grid-cols-[4.5rem_1fr] md:grid-cols-[13rem_1fr_16rem]">
              <div className="border-r border-[var(--forge-line)] p-3 md:p-4">
                <div className="space-y-2">
                  {['Home', 'Routes', 'Agents', 'Ship'].map((label, i) => (
                    <div
                      key={label}
                      className={`rounded-md px-2 py-2 text-[10px] uppercase tracking-[0.12em] md:text-xs ${
                        i === 1
                          ? 'bg-[rgba(217,255,128,0.12)] text-[var(--forge-signal)]'
                          : 'text-[var(--forge-faint)]'
                      }`}
                    >
                      <span className="hidden md:inline">{label}</span>
                      <span className="md:hidden">{label.slice(0, 1)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative p-4 md:p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="forge-chip">/home</span>
                  <span className="forge-chip">/services/sap</span>
                  <span className="forge-chip">/cutover</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-24 rounded-lg border border-[var(--forge-line)] bg-[var(--forge-bg-soft)] md:h-28"
                      style={{ opacity: 1 - i * 0.12 }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-6 right-6 hidden max-w-[14rem] rounded-xl border border-[var(--forge-line)] bg-[var(--forge-bg)] p-3 md:block">
                  <p className="forge-meta mb-2">Agent · Claude</p>
                  <p className="text-xs leading-relaxed text-[var(--forge-muted)]">
                    Quality gate passed. Promoting release train to preview.
                  </p>
                </div>
              </div>
              <div className="hidden border-l border-[var(--forge-line)] p-4 md:block">
                <p className="forge-meta mb-3">Inspector</p>
                <div className="space-y-2">
                  {['Frame 1440', 'Easing · out', 'Signal #d9ff80'].map((row) => (
                    <div
                      key={row}
                      className="rounded-md border border-[var(--forge-line)] px-3 py-2 text-xs text-[var(--forge-muted)]"
                    >
                      {row}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
