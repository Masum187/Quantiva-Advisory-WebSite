#!/bin/zsh
# Generates the remaining five career-card clips via Higgsfield Kling 3.0 (image-to-video).
set -u
cd "$(dirname "$0")/.."
OUT=/tmp/career-videos
mkdir -p "$OUT"

generate() {
  local name="$1"; shift
  local prompt="$1"; shift
  echo "=== $name: submitting ==="
  higgsfield generate create kling3_0 \
    --prompt "$prompt" \
    --start-image "$OUT/$name.png" \
    --duration 5 \
    --aspect_ratio 16:9 \
    --sound off \
    --wait --wait-timeout 25m --json > "$OUT/$name.json" 2> "$OUT/$name.err"
  echo "=== $name: exit $? ==="
}

generate technology-engineering "Engineer wearing a white hard hat soldering a circuit board in an electronics lab; a thin wisp of solder smoke rises, LEDs on the board blink, faint blue holographic schematics flicker above the board; slow camera push-in; natural subtle hand movement; cinematic"
generate sap-solutions "Team of consultants talking and smiling together in front of large glowing data screens in a dark operations room; the screens flicker with streaming data and charts; subtle natural body movement; gentle camera drift; cinematic"
generate cloud-infrastructure "A man in a dark suit walks slowly away from the camera down a glowing data center corridor; server rack lights blink cyan and blue, light streaks pulse along the corridor; slow steady camera follow; cinematic"
generate cyber-security "IT security analyst working at his desk in a dark room while a large red holographic shield pulses and slowly rotates in front of code-filled monitors; code scrolls on the screens, red light flickers softly; subtle camera drift; cinematic"
generate artificial-intelligence "Two white humanoid robots examine a glowing blue neural network hologram floating between them in a bright lab; the network pulses and nodes light up, the robots move their heads subtly; slow camera push-in; cinematic"

echo "ALL_DONE"
