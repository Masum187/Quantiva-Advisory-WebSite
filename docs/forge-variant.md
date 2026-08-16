# Forge-Variante (parallel zu Valmax)

## Zweck

Die Forge-Variante ist ein **paralleles Design** unter `/v2`, inspiriert von [UI8 Forge](https://ui8.ai/forge/).  
Die bestehende Valmax-Site unter `/de` und `/en` bleibt unangetastet.

## Git-Freeze

| Artefakt | Wert |
|----------|------|
| Tag | `valmax-freeze-2026-08-16` |
| Branch | `feat/forge-canvas-variant` |
| Valmax-Code | unverändert (`QuantivaWebsite.tsx`, `/de`, `/en`) |

Tag lokal gesetzt; push mit:

```bash
git push origin valmax-freeze-2026-08-16
git push -u origin feat/forge-canvas-variant
```

## URLs

| Variante | Pfad |
|----------|------|
| Valmax (Production) | `/de`, `/en` |
| Forge (Preview) | `/v2/de`, `/v2/en` |
| Forge Root | `/v2` → Redirect `/v2/de` |

Beispiele:

- Home: `/v2/de`
- Services: `/v2/de/services`, `/v2/de/services/sap`
- Branchen: `/v2/de/industries/financial-services`
- Kontakt: `/v2/de/contact`

## Code-Lage (nur additiv)

- `app/forge.css` — Tokens (dunkler Canvas, Lime-Signal, Display/Sans)
- `app/components/forge/*` — Shell, Home, Pages, Capability/Industry Templates
- `app/lib/data/forge-content.ts` — Copy / Nav / Helpers
- `app/v2/**` — Route-Tree
- `app/globals.css` — nur `@import './forge.css';` (Valmax-Regeln bleiben)

## Design-Notizen

- Brand „Quantiva“ im Hero dominant; eine Headline; ein CTA-Paar; ein full-bleed Canvas-Visual
- Features als `01–04`, keine Card-Wände
- Fonts: Instrument Serif (Display) + Manrope (UI) — nicht Inter
- Akzent: `#d9ff80` (kein Violett-Default)

## Cutover später (ohne Valmax zu löschen)

1. Vercel Preview des Branches prüfen
2. Optional: Domain-Alias `/` → Forge, Valmax weiter unter `/classic/de` verschieben **oder** Feature-Flag
3. Valmax-Tag behalten; Löschen erst nach bewusster Entscheidung

Empfehlung: Cutover als eigener PR — nicht in diesem Branch erzwingen.

## Preview-Link

Die Forge-Footer verlinken zurück auf Valmax (`/de` bzw. `/en`).  
Valmax selbst wurde **nicht** geändert (Freeze). Einstieg in Forge: direkt `/v2/de` oder Vercel Preview URL + `/v2/de`.
