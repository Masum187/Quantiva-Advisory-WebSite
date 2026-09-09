#!/bin/zsh
# Generates looping clips for the 6 homepage service cards (Kling 3.0 image-to-video).
set -u
cd "$(dirname "$0")/.."
OUT=/tmp/service-videos
mkdir -p "$OUT"

animate() {
  local name="$1"; shift
  local prompt="$1"; shift
  echo "=== video $name ==="
  higgsfield generate create kling3_0 \
    --prompt "$prompt" \
    --start-image "$OUT/$name.png" \
    --duration 5 \
    --aspect_ratio 16:9 \
    --sound off \
    --wait --wait-timeout 25m --json > "$OUT/video-$name.json" 2> "$OUT/video-$name.err"
  echo "=== video $name: exit $? ==="
}

animate sap "Business consultants around a glass conference table with a large blue holographic interface floating above it; the hologram flickers, rotates slowly and pulses with data, people gesture subtly while discussing; city skyline behind the windows; slow camera push-in; cinematic"
animate cloud "A network of glowing golden data cubes connected by fiber-optic strands in dark blue space; pulses of light travel along the connections between the cubes, particles drift; slow camera drift forward; futuristic, cinematic"
animate ai "A glowing brain made of orange and purple particle networks in dark space; the particles shimmer and pulse, synapses light up in waves, the brain rotates very slowly; floating particle orbs drift by; slow camera push-in; cinematic"
animate integration "A symmetric network of translucent glowing cubes connected by light strands with a bright pulsing core in the center; energy pulses radiate outward from the core along the connections; slow camera drift; futuristic, cinematic"
animate security "A neon purple holographic shield with a glowing padlock surrounded by floating translucent security interface panels; the shield pulses rhythmically, circuit lines light up, panels flicker subtly; dark background with drifting soft blobs; slow camera push-in; cinematic"
animate new-work "A glowing purple holographic hub with people icons connected to floating app panels; the connections pulse with light, panels flicker softly, soft gradient blobs drift in the dark background; slow camera drift; futuristic, cinematic"

echo "ANIMATE_DONE"
