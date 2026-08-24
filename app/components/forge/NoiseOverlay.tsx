export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="forge-noise pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-overlay"
    />
  );
}
