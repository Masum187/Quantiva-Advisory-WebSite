#!/bin/zsh
# Pipeline for the 7 wellbeing-card clips:
# 1) remove baked-in UI text from the screenshot crops (Nano Banana image edit)
# 2) animate the cleaned images with Kling 3.0 (image-to-video)
# Results land in /tmp/career-videos as JSON job files.
set -u
cd "$(dirname "$0")/.."
OUT=/tmp/career-videos
mkdir -p "$OUT"

EDIT_PROMPT="Remove all overlaid UI text, headings, paragraphs and buttons from the image. Reconstruct the photo underneath naturally and seamlessly. Do not change anything else: keep the people, lighting, colors and composition exactly as they are."

clean() {
  local name="$1"
  echo "=== clean $name ==="
  higgsfield generate create nano_banana_2 \
    --prompt "$EDIT_PROMPT" \
    --image "$OUT/wb-$name.png" \
    --wait --wait-timeout 15m --json > "$OUT/clean-$name.json" 2> "$OUT/clean-$name.err"
  echo "=== clean $name: exit $? ==="
}

animate() {
  local name="$1"; shift
  local prompt="$1"; shift
  echo "=== video $name ==="
  higgsfield generate create kling3_0 \
    --prompt "$prompt" \
    --start-image "$OUT/cleaned-$name.png" \
    --duration 5 \
    --aspect_ratio 16:9 \
    --sound off \
    --wait --wait-timeout 25m --json > "$OUT/video-$name.json" 2> "$OUT/video-$name.err"
  echo "=== video $name: exit $? ==="
}

case "${1:-all}" in
  clean)
    clean mental-health
    clean physical-health
    clean purpose
    clean career-development
    clean global-perspectives
    clean rewards
    echo "CLEAN_DONE"
    ;;
  animate)
    animate mental-health "A woman meditates cross-legged on a wooden deck in a sunlit bamboo forest; leaves sway gently, light rays shift softly through the trees, her shoulders rise and fall with slow calm breaths; static camera with a very subtle push-in; serene, cinematic"
    animate community "Four colleagues sit around a bright office table with laptops, talking and laughing naturally; subtle gestures, one nods, another types briefly; soft daylight through the windows; gentle camera drift; warm, cinematic"
    animate physical-health "People training in a neon-lit gym with magenta and violet lights; a woman lunges in the foreground, others move in the background, neon reflections pulse subtly; dynamic but smooth motion; slow camera push-in; energetic, cinematic"
    animate purpose "A woman arranges colorful sticky notes on a glass wall while a colleague watches from his desk; she places one note, steps back and gestures while explaining; soft office light; gentle camera drift; focused, cinematic"
    animate career-development "A man wearing a VR headset in a modern library turns his head slowly, exploring a virtual interface; faint holographic code screens flicker beside him; bookshelves in soft focus; slow camera push-in; futuristic, cinematic"
    animate global-perspectives "A laptop with glowing code on a desk in front of a panoramic night skyline; city lights twinkle, faint steam rises from the coffee cup, the code scrolls subtly; slow camera drift; atmospheric, cinematic"
    animate rewards "A team of colleagues celebrates around a laptop, one raises a fist in triumph, the others laugh and clap naturally; warm office light; subtle handheld-style camera movement; joyful, cinematic"
    echo "ANIMATE_DONE"
    ;;
esac
