/**
 * Segment-level streaming fallback — cinematic dark canvas, no spinner.
 */
export default function RouteLoading() {
  return (
    <div
      className="relative min-h-[100svh] bg-[#04060b]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 45% at 50% 38%, rgba(45,212,191,0.07) 0%, transparent 62%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden bg-white/[0.06]">
        <div className="route-loading-bar h-full w-1/3 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
      </div>
    </div>
  );
}
