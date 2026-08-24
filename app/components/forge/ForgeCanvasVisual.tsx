import type { ForgeLocale } from '../../lib/data/forge-content';

const STREAMS = [
  { id: 'O2C', pct: 92, status: 'Ready' },
  { id: 'S2P', pct: 78, status: 'In test' },
  { id: 'R2R', pct: 64, status: 'Design' },
  { id: 'P2M', pct: 88, status: 'Ready' },
];

const COPY = {
  de: {
    board: 'Programmsteuerung · S/4HANA Cutover · Welle 2',
    live: 'Live',
    workstreams: 'Arbeitsbereiche',
    navigation: ['Übersicht', 'Testdurchführung', 'Fehler', 'Cutover', 'Steuerung'],
    chips: ['QG-3 freigegeben', 'Abdeckung 87,5 %', '7 Bereiche'],
    stats: [
      { k: 'Varianten', v: '304' },
      { k: 'Schritte', v: '10,3k' },
      { k: 'Offene Fehler', v: '12' },
    ],
    qualityGate: 'Quality Gate',
    gates: ['DoR / DoD', 'Regressionstest', 'Cutover-Probe', 'Freigabe ausstehend'],
    nextMilestone: 'Nächster Meilenstein',
    milestone: 'Go-Live-Bereitschaft · Kalenderwoche 38',
  },
  en: {
    board: 'Program control · S/4HANA Cutover · Wave 2',
    live: 'Live',
    workstreams: 'Workstreams',
    navigation: ['Overview', 'Test execution', 'Defects', 'Cutover', 'Governance'],
    chips: ['QG-3 passed', 'Coverage 87.5%', '7 streams'],
    stats: [
      { k: 'Variants', v: '304' },
      { k: 'Steps', v: '10.3k' },
      { k: 'Open defects', v: '12' },
    ],
    qualityGate: 'Quality gate',
    gates: ['DoR / DoD', 'Regression pack', 'Cutover rehearsal', 'Sign-off pending'],
    nextMilestone: 'Next milestone',
    milestone: 'Go-live readiness · Calendar week 38',
  },
} as const;

/** Product-style program board using only Quantiva service context. */
export default function ForgeCanvasVisual({ locale }: { locale: ForgeLocale }) {
  const copy = COPY[locale];
  return (
    <div
      className="forge-panel pointer-events-none relative min-h-[25rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
      role="img"
      aria-label={
        locale === 'de'
          ? 'Beispiel einer S/4HANA-Test- und Cutover-Steuerung'
          : 'Example of S/4HANA test and cutover control'
      }
    >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--forge-line)] px-4 py-3 md:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-[var(--forge-signal)]/80" />
                </div>
                <p className="truncate text-[0.7rem] font-medium tracking-wide text-[var(--forge-muted)]">
                  {copy.board}
                </p>
              </div>
              <span className="forge-chip forge-chip-live shrink-0">{copy.live}</span>
            </div>

            <div className="grid min-h-[22rem] grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)_13rem] lg:grid-cols-[15rem_minmax(0,1fr)_14.5rem]">
              <aside className="hidden border-r border-[var(--forge-line)] p-4 md:block">
                <p className="forge-meta mb-4">{copy.workstreams}</p>
                <div className="space-y-1.5">
                  {copy.navigation.map((label, i) => (
                      <div
                        key={label}
                        className={`rounded-lg px-3 py-2.5 text-[0.8rem] ${
                          i === 1
                            ? 'bg-[rgba(79,143,255,0.1)] text-[var(--forge-signal)]'
                            : 'text-[var(--forge-faint)]'
                        }`}
                      >
                        {label}
                      </div>
                    ))}
                </div>
              </aside>

              <div className="min-w-0 p-4 md:p-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {copy.chips.map((chip) => (
                    <span key={chip} className="forge-chip">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mb-4 grid grid-cols-3 gap-2 md:gap-3">
                  {copy.stats.map((stat) => (
                    <div
                      key={stat.k}
                      className="rounded-xl border border-[var(--forge-line)] bg-[rgba(255,255,255,0.02)] px-3 py-3"
                    >
                      <p className="text-[0.6rem] uppercase leading-tight tracking-[0.1em] text-[var(--forge-faint)] sm:text-[0.65rem] sm:tracking-[0.12em]">
                        {stat.k}
                      </p>
                      <p className="mt-1 text-xl font-medium tracking-tight text-[var(--forge-ink)] md:text-2xl">
                        {stat.v}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5">
                  {STREAMS.map((stream) => (
                    <div key={stream.id} className="rounded-xl border border-[var(--forge-line)] px-3 py-2.5">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-[0.8rem] font-medium text-[var(--forge-ink)]">
                          {stream.id}
                        </span>
                        <span className="text-[0.7rem] text-[var(--forge-faint)]">{stream.status}</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-[var(--forge-signal)]"
                          style={{ width: `${stream.pct}%`, opacity: 0.85 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="hidden border-l border-[var(--forge-line)] p-4 md:block">
                <p className="forge-meta mb-4">{copy.qualityGate}</p>
                <div className="space-y-2">
                  {copy.gates.map((label, index) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-lg border border-[var(--forge-line)] px-3 py-2.5"
                    >
                      <span className="text-[0.78rem] text-[var(--forge-muted)]">{label}</span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          index < 2 ? 'bg-[var(--forge-signal)]' : 'bg-white/20'
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-[rgba(79,143,255,0.24)] bg-[rgba(79,143,255,0.07)] p-3">
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--forge-signal)]">
                    {copy.nextMilestone}
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-snug text-[var(--forge-ink)]">
                    {copy.milestone}
                  </p>
                </div>
              </aside>
            </div>
    </div>
  );
}
