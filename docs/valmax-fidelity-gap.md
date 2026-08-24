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

## Durchgang 3: Live-Messung und Umsetzung

Quelle: HTML/CSS der Valmax-Homepage und Referenz-Unterseiten am 2026-06-14. Zusaetzlich wurde ein Playwright-Computed-Style-Lauf vorbereitet; Chromium konnte in der Sandbox wegen macOS-Mach-Port-Rechten nicht starten. Die belastbaren Sollwerte unten stammen deshalb aus Live-HTML und `style.min.css`, nicht aus kopierten CSS-Regeln.

### Gemessene Sollwerte

- Container: `container-full` max `90rem`/`1440px`, mobile Padding `0.9375rem`, Desktop Padding `1.25rem`.
- Header: fixed `top: .625rem`, Hide-Transition `.45s cubic-bezier(0.4,0,0.2,1)`, Desktop-Hoehe ca. `5.1875rem`, Nav-Pill weiss, Link-Padding `.9375rem 1.25rem`, Font `0.875rem`, Radius `.625rem`.
- Typografie: H1 Desktop `4.375rem`, mobile `3rem`; H2 Desktop `3.375rem`, mobile `2.5rem`; Manifest `5.0625rem`; Weight `600`; Line-Height `100%-120%`.
- Buttons: Radius `.625rem`, Font `0.875rem`, Padding `1.1875rem 1rem`; Arrow-Buttons `3.25rem`.
- Hero: Start-Spalte max `24.375rem`, End-Spalte max `23.125rem`, Gap `1.75rem`, Frame `14.454375rem x 20.5rem`, max `40svh`.
- Social Proof: Outer `#d9ff80`, inner/max `90rem` `#5241d4`, Title weiss, Wrapper min `100vh`, runde Logos/Badges absolut positioniert.
- Brand Manifest: sticky Media `100vh`, paper Mask `#f7f6ff`, Text max `65.625rem`, Display `5.0625rem`.
- Capabilities: Section `#111`, Item min `100vh`, Media Radius `.875rem`, Info-Breite `37rem`, Info-Padding `1.25rem 1.75rem 1.25rem 3rem`, Links min `4.375rem`.
- Industries: sticky `100vh`, dunkler Hintergrund, linke Headline, Linkliste ca. `40.3125rem`, Link-Font bis `3.125rem`, Line-Height `140%`, active `#d9ff80`.
- At-a-glance: helle Flaeche mit violetten Ring-/Circle-Elementen, Stats-Bloecke `#5241d4`, Zahlen `#d9ff80` ca. `3.75rem`.
- Testimonials: wrapper `100vh`, linke Textspalte `24.0625rem`, runde Slides `36.875rem`, wechselnde Hintergruende `#d9ff80`/`#dedafe`, grosse laufende Wortmarke.
- Insights: drei Step-Anmutungen, Violet `#5241d4`, Gallery `35.25rem x 21.1875rem`, Mask-Proportion `290/436`, Transitions `.45s`.
- FAQ: Wrapper-Padding `5.625rem`, linke Spalte `27.1875rem`, rechte Spalte `50.5rem`, Item Radius `.625rem`, Frage min `6.625rem`, Item-BG `#ebe9fa`.
- Contact: Violet Hero `#5241d4`, zentriertes Formular max `37.125rem`, Form-Padding `1.5rem`, Media-Ticker im Hintergrund.
- Footer: Dark `#111`, Padding `2.5rem 0 1.25rem`, Scroll-top `3.25rem`, Bottom-Bar mit `8.5625rem` Abstand auf Desktop, Hintergrund-Marquee.

## Erreicht nach Durchgang 3

### Global / Tokens

- Homepage nutzt jetzt gemeinsame Valmax-nahe Konstanten fuer Section-Padding (`5.625rem` Desktop), H1/H2/Manifest-Skala und `0.4/0/0.2/1` Easing.
- Die alte uebergrosse Quantiva-Hero-/H2-Skala wurde auf die gemessenen Valmax-Werte reduziert.

### Header / Navigation

- Desktop-Header wurde von einer dunklen Gesamtbar auf getrennte Valmax-nahe Elemente umgestellt: Logo-Pill, weisse Nav-Pill, separater CTA/Language-Button, `top: 10px`, Desktop-Hoehe `5.1875rem`.
- Mega-Menues bleiben erhalten, sind aber als eigenes dunkles Panel unter der weissen Nav-Pill gerahmt.
- Mobile-Menue nutzt jetzt eine zweite Ebene mit Back-Button statt flachem Accordion; Ticker bleibt unten erhalten.

### Preloader

- Prozentzaehler, Fortschrittslinie, Session-Fallback und `prefers-reduced-motion` bleiben umgesetzt.

### Hero

- Hero-Spalten, Frame-Proportion und Frame-Hoehe wurden auf die gemessenen Valmax-Werte gezogen: `24.375rem / frame / 23.125rem`, Gap `1.75rem`, Frame `231/328`, max `40svh`.
- H1 ist jetzt auf Valmax-H1-Skala statt uebergrossem Marketing-Hero gesetzt.

### Social Proof / Marquee

- Social-Proof-Farbarchitektur ist jetzt outer green und inner violet wie Valmax; Title/CTA sitzen auf der violetten Flaeche.
- Runde Quantiva-Signal-Badges bleiben bewusst ohne fremde Logos.

### Brand Manifest

- Brand Manifest ist von dunkler Bildbuehne auf helle `#f7f6ff`-Mask-Anmutung umgestellt.
- Textgroesse und Max-Breite folgen `5.0625rem` / `65.625rem`; Quantiva-Media wird als Text-/Mask-Fuellung verwendet.

### Capabilities

- Section-Hintergrund ist jetzt `#111`; Slide-Layout nutzt Media links und Info-Panel rechts mit `37rem` Breite und `4.375rem` Link-Hoehe.
- Counter, Prev/Next, Auto-Advance, Hover-Media und Service-Links bleiben funktional.

### Industries

- Linkliste wurde auf Valmax-Proportionen reduziert: dunkle Vollbildsektion, linke Headline, rechte Liste max `40.3125rem`, active green, Background-Media-Swap bei Hover/Fokus.
- Beschreibungen sind im Linkbereich nicht mehr sichtbar dominant, damit die Liste naeher an Valmax bleibt.

### At A Glance / Stats

- Hintergrund ist jetzt hell mit violetten Ringstrukturen statt signal-gruener Vollflaeche.
- Stats sind kompaktere violette Blocks mit grossen acid-green Zahlen.

### Testimonials

- Layout ist jetzt Valmax-naeher: linke Titel-/Nav-Spalte, grosse runde aktive Slide rechts, Quote/Autor im Kreis, wechselnde green/lavender Backgrounds und laufende Wortmarke.
- Echte Quantiva-Case-Quotes bleiben die einzige Datenquelle.

### Insights

- Top-Step und Violet-Step verwenden die gemessene H2-Skala.
- Galerie wurde vom vertikalen Phone-Frame auf Valmax-nahe horizontale `35.25rem x 21.1875rem`-Proportion umgestellt.

### FAQ

- FAQ-Spalten, Item-Hoehe, Radius, Lavender-BG und sticky Headline folgen den gemessenen Werten.
- More-Questions-Erweiterung bleibt erhalten.

### Contact / Calendly

- Contact-Hero bleibt violet mit zentriertem Formular `37.125rem` und bestehendem `ContactForm`-Submit, Honeypot, reCAPTCHA und API-Vertrag.
- Calendly bleibt als getrennte funktionsfaehige Sektion erhalten.

### Footer

- Footer-Struktur bleibt dunkel mit Linkgruppen, Kontaktzeile, grossem Hintergrund-Marquee und symbolischem Scroll-to-top.
- Keine unechte Newsletter-Subscription wurde gebaut.

### Mobile / Reduced Motion

- Mobile-Panel hat jetzt Valmax-naehere Root-/Sublevel-Navigation.
- Slider, Marquees und Auto-Advance respektieren weiter `prefers-reduced-motion`.

## Bewusster Rest-Gap

- Keine Valmax-Texte, Bilder, Kundenlogos, SVG-Masken, Video-Frames oder Logo-Dateien wurden uebernommen. Exakte Hero-/Insights-Masken und Logo-Walls bleiben deshalb visuell approximiert.
- Keine neuen GSAP-, Lenis- oder Swiper-Abhaengigkeiten wurden installiert. Pinning/Scroll-Timeline-Timing bleibt mit React/Framer-Motion und CSS angenaehert statt Engine-identisch.
- Valmax-Newsletter/Footer-Form wurde nicht als Fake-Funktion nachgebaut, weil Quantiva kein Newsletter-Backend im Repo hat.
- Detailseiten bleiben funktions- und routentreu; dieser Durchgang hat die Homepage nachgeschaerft.
- Lokale Browser-Screenshot-Verifikation wurde wegen Vorgabe "kein Dev-Server" nicht ausgefuehrt. Externe Headless-Computed-Style-Messung per Playwright scheiterte an Sandbox-Rechten, Build-Verifikation ist erfolgreich.
