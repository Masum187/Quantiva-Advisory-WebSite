# Design-Tokens: Valmax-inspirierter Quantiva-Reskin

Stand: 2026-06-14

## Analysierte Referenzseiten

- Homepage: `https://digital-culture.valmax.dev/`
- Capability: `https://digital-culture.valmax.dev/capabilities/ux-ui-design/`
- Industry: `https://digital-culture.valmax.dev/industries/automotive/`
- Insights: `https://digital-culture.valmax.dev/insights/`
- Contact: `https://digital-culture.valmax.dev/contact-us/`

Hinweis: Es wurde keine WordPress-CSS-Regel kopiert. Die folgenden Werte sind abstrahierte Design-Tokens und Pattern-Ableitungen fuer das bestehende Next.js/Tailwind-System.

## Visuelle Leitidee

- Hochkontrastiger Editorial-/Consulting-Look.
- Wenige, harte Flächen statt Glow-/Glassmorphism-Dominanz.
- Große Typografie, knappe Subheadings, klare Counter.
- Medienflächen als echte Strukturtraeger: Hero-Frames, Slider, Cards, Teaser.
- Interaktion ueber Hover, Scroll-Reveal, Slider-/Accordion-States und Counter wie `01 / 05`.
- Quantiva-Inhalte bleiben unveraendert; nur Darstellungs- und Layoutsystem wird neu gefasst.

## Farben

### Core

- `ink`: `#050505` - Haupt-Hintergrund, fast schwarz.
- `ink-soft`: `#111111` - dunkle Karten/Flaechen.
- `ink-muted`: `#252525` - Header, Burger-Menue, Sekundaerflaechen.
- `paper`: `#ffffff` - helle Sektionen und Text auf dunklem Grund.
- `paper-soft`: `#f7f6ff` - sehr helles lavender-tinted Panel.
- `mist`: `#ebe9fa` - zarte Linien/Tags auf hellem Grund.
- `line`: `rgba(17, 17, 17, 0.14)` und `rgba(255, 255, 255, 0.18)`.

### Akzente

- `signal`: `#d9ff80` - acid-green Primary Accent, CTA, active State, Counter.
- `signal-soft`: `#f0f7e0` - helle Akzentflaeche.
- `violet`: `#5241d4` - tiefer violetter Kontrast fuer Step/Slider Panels.
- `violet-soft`: `#dedafe` - weicher violet/lavender Hint.
- `blue`: `#0078a8` - sparsam fuer technische Links/Focus, nicht dominant.

### Text

- Dunkler Text: `#111111`.
- Sekundaerer dunkler Text: `rgba(17, 17, 17, 0.70)`.
- Heller Text: `#ffffff`.
- Sekundaerer heller Text: `rgba(255, 255, 255, 0.72)`.
- Tertiaerer heller Text: `rgba(255, 255, 255, 0.55)`.

### Nutzung

- Seiten wechseln zwischen dunklen und hellen Vollbreiten-Sektionen.
- Keine teal/purple Gradients als Hauptmotiv.
- Teal aus dem alten Quantiva-Design wird nicht als Primaerfarbe genutzt; es darf nur in Legacy-Assets/Logo erhalten bleiben, wenn es funktional vorhanden ist.
- Accent-Gruen sparsam und präzise: CTA, aktive Filter, Counter, kleine Chips, Linie im Hero-Frame.

## Typografie

### Font Stack

Valmax nutzt Switzer. Im Quantiva-Repo wird ohne neuen Font-Download ein kompatibler Stack verwendet:

```css
font-family: "Inter", "Helvetica Neue", Arial, Helvetica, sans-serif;
```

Optional, falls spaeter lokal eingebunden:

```css
font-family: "Switzer", "Inter", "Helvetica Neue", Arial, sans-serif;
```

### Skala

- Display/Hero: `clamp(3rem, 8vw, 6.25rem)`, line-height `0.95-1.0`, font-weight `700-800`.
- H1 Detailseiten: `clamp(3rem, 7vw, 5.5rem)`, line-height `1`.
- H2: `clamp(2.5rem, 5vw, 4.375rem)`, line-height `1`.
- H3/Card Title: `clamp(1.75rem, 3vw, 2.5rem)`, line-height `1.1`.
- H4/H5: `1.25rem-1.625rem`, line-height `1.15-1.2`.
- Body large: `1.125rem`, line-height `1.45`.
- Body: `1rem`, line-height `1.5`.
- Small/subheading: `0.75rem-0.875rem`, uppercase, tracking `0.08em-0.14em`.

### Regeln

- Keine viewport-getriebene Fontsize ausserhalb `clamp()` fuer echte Headlines.
- Keine negativen Letter-Spacings in neuen Komponenten.
- Subheadings kurz, uppercase, mit klaren Counter-/Kategorie-Labels.
- Lange Quantiva-Texte bleiben erhalten, werden aber in schmalere Textspalten gesetzt.

## Spacing

8px-Grid, mit Valmax-nahen großen rhythmischen Abstaenden:

- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-5`: 20px
- `space-6`: 24px
- `space-8`: 32px
- `space-10`: 40px
- `space-12`: 48px
- `space-16`: 64px
- `space-20`: 80px
- `space-24`: 96px
- `space-32`: 128px

Layout:

- Max content width: `1440px`.
- Full container padding desktop: `32px`.
- Full container padding mobile: `16px`.
- Section padding desktop: `96px-144px`.
- Section padding mobile: `64px-80px`.
- Hero min-height: `calc(100svh - header)`, mit mobile fallback `min-height: 720px` nur wenn noetig.

## Radius und Borders

- Default Card Radius: `8px`.
- Media Frame Radius: `10px-14px`.
- Buttons/Inputs: `999px` fuer Pills oder `8px` fuer Forms.
- Keine tief verschachtelten Cards.
- Lines: 1px Hairline Borders, schwarz/weiß mit Transparenz.

## Buttons

- Primary: dunkle oder acid-green Pill mit Arrow-Icon.
- Secondary: transparente Pill mit Border.
- Tertiary: Textlink plus Arrow.
- Hover: Arrow verschiebt sich 4px nach rechts, Hintergrund invertiert oder Accent-Flaeche wird sichtbar.
- Fokus: sichtbarer Ring in `signal` oder `violet`, nicht nur Farbwechsel.

## Component-Patterns

### Header

- Sticky Top Header mit kompakter, leicht abgerundeter dunkler Leiste.
- Links als Textnavigation, CTA rechts.
- Mobile Burger mit Vollscreen-/Panel-Menue und Marquee-/Ticker-Zeile.
- Mega-Menue-Information wird in Quantiva nicht neu erfunden; vorhandene Nav-Items bleiben erhalten.

### Hero

- Full-viewport Struktur.
- Linke oder obere Copy mit sehr großem H1.
- Hero-Frame/Media-Cluster als strukturierendes Element, nicht als dekorative Card.
- Dezente schwarze Overlay-Schicht ueber Medien.
- Scroll-Down-Indikator als kleine runde/lineare Markierung.

### Logo-/Proof-Marquee

- Nur echte Quantiva-Assets/Referenzen verwenden.
- Keine erfundenen Logos.
- Wenn Logos nicht belastbar sind: ehrliche Proof-Zeile, z. B. Partnerstatus/KPIs/Case-Kategorien.

### Capabilities

- Vertikale oder horizontale Capability-Blöcke mit Counter `01 / 05`.
- Kategorie oben klein, Titel groß, Beschreibung kompakt.
- Unterlinks/Tags als pillartige Chips.
- Aktiver Block kann hell, violet oder signal-farbig sein.

### Industries

- Listen-/Grid-Hybrid:
  - Textliste mit Hover-Media oder
  - kompakte Bildkarten mit klaren Titeln.
- Keine überdekorierten Karten; Media + Titel + kurze Beschreibung + Counter/Project Badge reichen.

### Stats

- "At a glance" Pattern mit 3-4 sehr großen Zahlen.
- Zahl dominiert, Label klein darunter.
- CTA daneben oder darunter, nicht in separater Marketing-Card.

### Testimonials

- Große Quote, Autor/Role klein.
- Slider-/Tab-Steuerung über Namen oder Counter.
- Keine frei erfundenen Kundenzitate; nur Case-Daten aus `cases.json`.

### Insights

- Featured Article oben, Artikel-Liste darunter.
- Filter als kompakte Chips oder rechte Sticky-Liste.
- Karten mit Media Ratio 16:9, Kategorie, Titel, Autor/Datum.

### FAQ

- Zweispaltiges Layout: Titel links, Accordion rechts.
- Fragen als große Zeilen mit Plus/Minus-Trigger.
- Antworten erscheinen inline; keine separaten Karten.

### Contact

- Dunkle Hero-/Form-Section.
- Formfelder in 2-Spalten-Grid auf Desktop, 1-Spalte mobil.
- Labels sichtbar oder als kleine uppercase Field Labels.
- Bestehende Quantiva-Formsubmission bleibt unverändert.
- Optionaler Medien-Slider neben Formular, wenn vorhandene Assets funktionieren.

### Footer

- Heller oder dunkler Footer mit Top-Row Logo/Links, Newsletter/Contact-Zeile, Bottom-Bar.
- Scroll-to-top-Button klein und symbolisch.
- Keine neuen Social-URLs erfinden.

## Animation

- Standard Transition: `450ms cubic-bezier(0.4, 0, 0.2, 1)`.
- Reveal: opacity + translateY 24-40px, Dauer `600-800ms`.
- Hover: translateY `-4px`, media scale `1.04`.
- Marquee: lineare Bewegung, langsam, nur fuer Logo/Proof oder Footer-Stripe.
- Counter/Slider: aktiver Index `01 / 05`; Navigation mit Prev/Next.
- FAQ: Höhe/Opacity transition `300-450ms`.
- Respektiere `prefers-reduced-motion`.

## Responsive

- Breakpoint fuer mobile Struktur: `1024px`.
- Mobile:
  - Header-Menue collapses.
  - H1 max ca. `3rem`.
  - Slider werden zu scrollbaren Stacks.
  - Pinned/Sticky Effekte werden deaktiviert.
- Desktop:
  - Full-width Sections, breite Medienflächen.
  - Sticky/Counter/Slider patterns aktiv, aber mit Next/Framer Motion einfach und build-sicher umgesetzt.

## Umsetzung in Quantiva

- Tailwind Theme um Tokens erweitern.
- Global CSS auf Valmax-inspirierte Basisvariablen, Scrollbar und Utility-Klassen umstellen.
- Navigation und Footer optisch vereinheitlichen.
- Homepage mit folgenden Valmax-Patterns neu rahmen:
  - Hero-Frame
  - Proof/Trust-Marquee ohne erfundene Logos
  - Capability-Cards mit Counter
  - Industry-Grid
  - Stats
  - Testimonials
  - Insights/Content Teaser
  - FAQ-Accordion
  - CTA
  - Contact/Calendly
- Detailseiten: vorhandene Texte/Sektionen behalten, aber Hero, Content-Blocks, Cards, Tags, CTA im neuen Pattern stylen.
