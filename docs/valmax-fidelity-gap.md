# Valmax Fidelity Gap

Stand: 2026-06-14

Referenzseiten:

- Homepage: `https://digital-culture.valmax.dev/`
- Capability: `https://digital-culture.valmax.dev/capabilities/brand-strategy/`
- Industry: `https://digital-culture.valmax.dev/industries/automotive/`
- Insights: `https://digital-culture.valmax.dev/insights/`
- Contact: `https://digital-culture.valmax.dev/contact-us/`

Hinweis: Diese Analyse beschreibt Struktur, Verhalten und gemessene visuelle Muster. Valmax-Texte, Bilder, Logos und Claims werden nicht in Quantiva uebernommen.

## Referenzmuster Valmax

### Global

- Referenz nutzt fixed Header bei `top: 10px`, Full-width Container mit ca. `15px` mobilen und groesseren Desktop-Innenabstaenden, harte Vollflaechen, `#111`, `#f7f6ff`, `#5241d4`, `#d9ff80`.
- Typografie: Switzer-aehnlicher Grotesk-Stil, Gewicht `600`, grosse Headlines mit `line-height: 100%-110%`, Subheadings uppercase.
- Animation: `450ms cubic-bezier(0.4, 0, 0.2, 1)`, AOS-Reveals, Lenis Smooth Scroll, GSAP ScrollTrigger, Swiper, Marquee3k.
- Interaktionen: Preloader, fixed/hiding Header, Burger mit zweiter Ebene und Ticker, scrollgepinnten Hero/Capabilities/Industries/Insights, Swiper-Prev/Next, FAQ-Accordion, custom cursor zones, scroll-to-top.

### Homepage-Sektionfolge

1. Preloader mit Prozentzaehler und Linie.
2. Fixed Header mit Logo, Mega-Dropdowns, CTA, Burger-Panel.
3. Hero mit grossem H1, schmalem Textblock, CTA, mobile Scroll-Down, vertikaler Frame-/Video-Sequenz.
4. Social-Proof Pin auf acid-green/violet Hintergrund mit runden Logo-Badges.
5. Brand Manifest mit sticky Media-Hintergrund und grossem Cutout-/Mask-Text.
6. Capabilities als 5 scroll-/slidergesteuerte Full-height Slides mit Media links, Content rechts, Counter `01 / 05`, Prev/Next.
7. Industries als dunkle pinned Section: grosse Linkliste, aktiver Link in green, Hintergrundbild wechselt je Hover/Scroll, Icon erscheint.
8. At-a-glance mit CTA, grossen Zahlen und violetten/circularen Blocks.
9. Testimonials/Partners als Swiper mit runden Slides, Prev/Next, grosse laufende Hintergrund-Wortmarken.
10. Insights als mehrstufige Scroll-Mask: erst heller Titel, dann violet Mask, dann Content/Gallery-Slider.
11. FAQ zweispaltig, lavender Items, Plus/Minus-Icon, versteckte Zusatzfragen plus More-Button.
12. CTA/Contact und Footer mit Linkgruppen, Newsletter-Form, Scroll-to-top und Hintergrund-Marquee.

### Unterseiten

- Capability-Seiten: dunkler/violetter Hero mit Media, Service-Listen-Slider, How-we-work Steps, Outcomes, Success Stories, FAQ, CTA, Footer.
- Industry-Seiten: Full-viewport Image-Hero, Services-We-Deliver Slider, Our-Impact circular cards, Success Stories Slider, Key Focus Areas circular frame, Testimonials, FAQ, CTA, Footer.
- Insights-Seite: kompakter Hero mit grossem Featured-Article-Card, Filter/Load-More Article Grid, Email CTA, Footer.
- Contact-Seite: violet Full-viewport Hero, zentriertes Formular, laufender runder Medien-Slider im Hintergrund, FAQ, Footer.

## Gap gegen aktuellen Quantiva-Stand vor diesem Durchgang

### Global / Tokens

- Bereits ok: Valmax-nahe Farben und Basistokens existieren in `globals.css` und `docs/design-tokens.md`.
- Weicht ab: Header, Cards und viele Sections nutzen noch stark abgerundete Tailwind-Card-Muster statt Valmax-Hairline/Full-bleed-Rhythmus.
- Fehlt: gemeinsame Utility-Animationen fuer Valmax-artige Frame-Sequenz, tickerartige grosse Wortmarken, Scroll-Reveal-Fallbacks und Preloader-State.

### Header / Navigation

- Bereits ok: Sticky Header, CTA, Sprachumschalter und Mobile-Menue existieren.
- Weicht ab: Header ist eine schwebende rounded Bar statt fixed Valmax-Leiste; kein Scroll-hide/show; keine zweite Mobile-Ebene; keine Desktop-Mega-Dropdowns; Burger-Ticker ist nur kleine Textzeile.
- Soll: fixed top header, hide on scroll down, show on scroll up, dark/light theme via Section-Kontext approximiert, desktop hover Mega-Panels fuer Services/Industries, mobile Panel mit grosse uppercase Rows, Sublevel-Accordion und breitem Ticker.

### Preloader

- Bereits ok: keine.
- Fehlt komplett: Prozentzaehler, Linie, First-view Intro.
- Soll: build-sicherer clientseitiger Loader mit schneller Progress-Animation und `prefers-reduced-motion` Fallback.

### Hero

- Bereits ok: grosser Hero, CTA, Media aus Quantiva-Content, Marquee.
- Weicht ab: Hero ist dunkles Zwei-Spalten-Layout mit Card-Mosaik; Valmax ist heller First View mit freigestelltem Frame/Video-Sequence und danach pinned Social-Proof.
- Soll: helle Hero-Startflaeche, grosser H1 links/oben, schmaler Copy rechts/unten, vertikale Frame-Stack-Sequenz aus Quantiva-Medien, Scroll-Down-Kontrolle, anschliessende Social-Proof-Fläche.

### Social Proof / Marquee

- Bereits ok: Marquee ohne erfundene Logos.
- Weicht ab: keine runden Badge-Logos/Proof-Bubbles, kein green/violet Pin-Feeling.
- Soll: echte Quantiva-Signale als runde Badges (keine Valmax-/Fremdlogos erfinden), grosse green/violet Vollflaeche, leichte Float-/Reveal-Animation.

### Brand Manifest

- Bereits ok: ProofSection transportiert Strategie/Engineering-System.
- Weicht ab: keine sticky Media-/Mask-Komposition.
- Soll: Full-viewport Band mit Quantiva-Media-Hintergrund und grossem zentriertem Manifest-Text in Valmax-Proportionen.

### Capabilities

- Bereits ok: Service-Daten, Counter, CTA-Links.
- Weicht ab: aktuell vertikale Card-Liste; Valmax nutzt Full-height Slides, Media links, Content rechts, Pagination und Prev/Next.
- Soll: interaktiver Slider mit 5/6 Quantiva-Capability Slides, Counter, Media, Link-Chips, Prev/Next und Hover-Media-Swaps fuer Unterlinks.

### Industries

- Bereits ok: echte Quantiva-Industries und Links.
- Weicht ab: Bildkarten-Grid statt dunkler pinned Linkliste mit Hintergrundwechsel.
- Soll: dunkle Vollbildsektion mit aktiver Industry, Hintergrund-Media-Swap bei Hover/Fokus, aktive Linkfarbe green, CTA und Counter.

### At A Glance / Stats

- Bereits ok: Stat-Werte aus Content.
- Weicht ab: signal-gruene Grid-Section statt Valmax-violetter kreis-/blockartiger Stats.
- Soll: grosse Zahl dominiert, violette Blocks/Circles, CTA neben/oberhalb, dezente ringartige Background-Struktur.

### Testimonials

- Bereits ok: echte Case-Quotes aus `cases.json`.
- Weicht ab: statisches Master/Sidebar-Layout; kein Prev/Next-Slider, keine runden Slides, keine laufende Hintergrund-Typo.
- Soll: Slider mit Prev/Next/Autoplay, runder Medien-Slide, grosse Quote, Author/Case, laufende grosse Case-Wortmarke im Hintergrund.

### Insights

- Bereits ok: echte `posts.json`-Inhalte.
- Weicht ab: normales 3-Card-Grid; keine Scroll-Mask/Stack-Gallery.
- Soll: dreistufige Valmax-Anmutung mit wiederholtem Titel, violet Mask-/Frame, Galerie-Stack und Content-Slider-Controls.

### FAQ

- Bereits ok: Accordion, Plus/Minus, zweispaltig.
- Weicht ab: Hairline-Liste statt lavender Item-Cards; keine More-Questions-Erweiterung.
- Soll: lavender Karten, violet Icon mit green Plus/Minus, zusaetzliche Fragen hinter More-Button.

### Contact / Calendly

- Bereits ok: Kontaktformular, reCAPTCHA/API und Calendly bleiben funktionsfaehig.
- Weicht ab: dunkle Zweispalte; Valmax Contact ist violet Full-height Hero mit zentriertem Formular und Media-Ticker.
- Soll: violet Contact-Hero-Anmutung, Formular prominent als helle Box, bestehende Form-Submission unveraendert, Calendly getrennt erhalten.

### Footer

- Bereits ok: Linkgruppen, Kontakt, Social, Scroll-to-top, Marquee.
- Weicht ab: kein grosses zentrales Newsletter-Pattern; Layout weniger Valmax-typisch.
- Soll: dunkler Footer mit Logo/Links, Mail-/Kontaktzeile, Bottom-Bar, Scroll-to-top und grossem Hintergrund-Marquee. Newsletter-Submit nur dann echt, wenn Backend vorhanden ist; sonst keine falsche Subscription.

### Mobile / Reduced Motion

- Bereits ok: Mobile Header und globaler reduced-motion Block existieren.
- Weicht ab: Mobile-Panel ist flach; Slider/Pin-Fallbacks fehlen teilweise.
- Soll: alle interaktiven Bereiche bleiben per Button/Accordion steuerbar, große Texte brechen sauber um, motion-reduced deaktiviert Autoplay/Marquee/Preloader-Delay.
