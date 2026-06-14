# RESKIN_REPORT: Quantiva Advisory Valmax-Reskin

## Update 2026-06-14: Fidelity-Durchgang 2

Ziel dieses Durchgangs war nicht ein weiterer grober Re-Skin, sondern eine deutlich engere Nachbildung von Valmax-Struktur und -Verhalten mit Quantiva-eigenen Inhalten.

### Neu umgesetzt

- `docs/valmax-fidelity-gap.md` neu erstellt: Soll/Ist-Gap pro Valmax-Sektion, Unterseitentyp und Interaktionsmuster.
- `app/components/QuantivaWebsite.tsx` deutlich nachgeschärft:
  - Clientseitiger Preloader mit Prozentanzeige, Fortschrittslinie, Session-Fallback und `prefers-reduced-motion`-Ausnahme.
  - Fixed Header mit Scroll-hide/show, Desktop-Mega-Panels für Capabilities und Industries, Mobile-Panel mit Sublevel-Accordion und Ticker.
  - Hero von dunklem Card-Mosaik auf helle Valmax-nahe First-View-Struktur mit freigestellter Frame-Sequenz, großer Headline, separatem Copy/CTA-Block und Scroll-Down-Trigger umgebaut.
  - Social-Proof-Fläche als acid-green/violet Vollbildsektion mit runden echten Quantiva-Signal-Badges statt erfundener Kundenlogos.
  - Brand-Manifest-Sektion als Full-viewport Media/Text-Band ergänzt.
  - Capabilities von statischer Card-Liste auf interaktiven Slider mit Prev/Next, Auto-Advance, Counter, Media-Swap und Hover-Thumbnails umgebaut.
  - Industries von Grid-Karten auf dunkle Valmax-nahe Linkliste mit Hover-/Focus-Hintergrundwechsel und aktivem Green-State umgebaut.
  - Stats/At-a-glance in violette, versetzte Blocks mit ringartigem Background überführt.
  - Testimonials auf runden Slider mit Prev/Next, Auto-Advance, Case-Tabs und laufender Hintergrund-Wortmarke umgestellt.
  - Insights von 3er-Grid auf mehrstufige violet Mask-/Gallery-Slider-Anmutung umgebaut.
  - FAQ auf lavender Cards, violetten Plus/Minus-Trigger und More-Questions-Erweiterung umgestellt.
  - Contact auf violet Full-height Hero mit hellem Formular und laufendem Media-Ring angepasst; `ContactForm`-Submit, Honeypot, reCAPTCHA und API-Vertrag bleiben unverändert.
  - Footer mit großem Hintergrund-Marquee, stärkerer Linkgruppen-Hierarchie und symbolischem Back-to-top nachgeschärft.
  - Framer-Motion-Marquees und Auto-Advance-Elemente respektieren `prefers-reduced-motion` und bleiben dann statisch.
- `app/components/ContactForm.tsx`: Nur Field-/Button-Optik an Valmax-Radius, Padding und Focus-States angepasst; keine funktionale Änderung.

### Bewusst nicht 1:1

- Keine Valmax-Texte, Claims, Kundenlogos, Bilder, Videos oder Masken-Assets wurden kopiert.
- Keine erfundenen Logos oder Kundenbeziehungen ergänzt. Proof-Badges nutzen nur Quantiva-nahe Leistungs-/Technologie-Signale.
- Kein GSAP/Lenis/Swiper-Paket wurde nachinstalliert; sichtbare Slider-, Pin-/Reveal- und Marquee-Muster wurden mit vorhandenen React/Framer-Motion-Mitteln umgesetzt.
- Footer-Newsletter wurde nicht als echte Subscription nachgebaut, weil im Quantiva-Repo kein Newsletter-Backend vorhanden ist. Stattdessen bleibt der Kontakt-Mail-Link ehrlich funktional.
- Detailseiten behalten ihre bestehenden Quantiva-Routen und gemeinsamen Hüllen; dieser Durchgang fokussiert die Homepage-Fidelity und dokumentiert Detailseiten-Gaps in `docs/valmax-fidelity-gap.md`.

### Verifikation

- `npm run build`: erfolgreich.
- Build generierte 65 Routen und lief inklusive `postbuild` (`generate:sitemap`, `generate:og`, `validate:cases:strict`) durch.
- Bestehende Warnungen bleiben Daten-/Tooling-Warnungen zu `baseline-browser-mapping` und `caniuse-lite`; keine neuen Build- oder TypeScript-Fehler.

### Manuell im Browser prüfen

- `/de` und `/en`: Preloader, Header hide/show, Mega-Menüs, Mobile-Menü, Hero-Frame-Sequenz, Social-Proof, Capability-Slider, Industry-Hover, Testimonial/Insight-Slider, FAQ-More-Button, ContactForm und Footer.
- Kontaktformular mit echter reCAPTCHA-Konfiguration in der Zielumgebung testen.
- Mobile Breakpoints besonders bei sehr langen deutschen Service-/Industry-Titeln prüfen.

## 1. Was geändert

- `app/components/QuantivaWebsite.tsx`: Homepage komplett visuell neu gerahmt mit schwarzem Hero, großen typografischen Frames, Media-Frame, Capability-Cards mit Countern, Industry-Grid, Stats, Testimonials, Insights, FAQ-Accordion, Contact/Calendly und Footer im Valmax-inspirierten Pattern.
- `app/components/Navigation.tsx` und `app/components/ServiceNavigation.tsx`: Navigation als kompakter dunkler Header mit Pill-Navigation, Sprachumschalter, CTA und Mobile-Menü neu gestaltet.
- `app/components/ContactForm.tsx`: Nur Styling auf Valmax-nahe Inputs/Buttons/Statusflächen angepasst. Submit-Logik, Honeypot, reCAPTCHA und API-Vertrag bleiben gleich.
- `app/components/pages/industries/IndustryLandingPage.tsx` und `app/components/sections/IndustriesSection.tsx`: Industry-Landing und Industry-Grid in Hero-/Counter-/Detail-Patterns neu aufgebaut.
- `app/components/pages/services/ValmaxServicePage.tsx`: Neue gemeinsame Präsentationskomponente für Service-Detailseiten.
- Service-Seiten unter `app/components/pages/services/*`: AI, Cloud, Cyber Security, Digital Strategy, Microservices, SAP, ERP/CRM, Sustainability, Test Automation und Change Management nutzen jetzt die gemeinsame Valmax-Service-Hülle.
- `tailwind.config.js` und `app/globals.css`: Quantiva/Valmax-nahe Design-Tokens, Akzentfarben, Shadows, Marquee-Keyframes, Fokus- und Scrollbar-Styles ergänzt.
- `app/de/layout.tsx` und `app/en/layout.tsx`: Skip-Link-Fokus an neue Token angepasst.
- `docs/repo-inventur.md`, `docs/design-tokens.md`, `docs/quantiva-content-inventur.md`: Geforderte Inventuren und Token-Dokumentation erstellt.
- `public/sitemap.xml`: Wurde durch das vorhandene `postbuild`-Skript neu generiert; dabei wurden `lastmod`-Werte auf `2026-06-14` aktualisiert.

## 2. Was unangetastet

- Routenstruktur bleibt erhalten: `/de`, `/en`, Service-Routen, Industry-Routen, Content-Routen, Cases, Team, About, Career, Search, CMS-/Video-/AI-Test-Routen und API-Routen.
- Kontaktfunktion bleibt erhalten: `app/api/contact/route.ts`, FormData-Felder, Honeypot und reCAPTCHA-Validierung wurden nicht geändert.
- Calendly-Integration bleibt erhalten: Widget-Script und URL aus `content.json` werden weiter genutzt.
- Analytics-Kontext bleibt erhalten: `AnalyticsProvider`, `PerformanceMonitoring`, `ConsentManager`, `useAnalytics` und Event-Tracking bleiben im Einsatz.
- Contentful-/CMS-/Video-/AI-Test-/Cloudinary-/Unsplash-Konfiguration wurde nicht geändert.
- Keine Package-Versionen wurden geändert und es wurde kein neues npm-Paket installiert.
- Kein Push wurde ausgeführt.

## 3. Quantiva-Inhalte 1:1 erhalten

- Bestehende Quantiva-Texte aus `content.json`, `cases.json`, `posts.json`, `industries.ts`, `industryDetails.ts` und den Service-Komponenten wurden nicht durch Valmax-Texte ersetzt.
- Valmax wurde nur als visuelle Referenz genutzt: Layout, Rhythmus, Farben, Typografie-Skala, Counter, Marquee, Hero-Frame, Accordion- und Card-Patterns.
- Keine Valmax-Claims oder Valmax-Originaltexte wurden in Quantiva-Seiten übernommen.

## 4. Neue Valmax-Stil-Komponenten

- Hero-Frame mit großer Uppercase-Typografie, Medien-/Signalframe und Counter-Liste.
- Logo-/Signal-Marquee ohne erfundene Kundenlogos.
- Capability-Cards mit `01/05`-ähnlichen Countern.
- Industry-Grid mit schwarzen und hellen Flächen, harten Hairlines und Hover-Zuständen.
- FAQ-Accordion auf der Homepage.
- Gemeinsames Service-Detailseitenlayout mit Hero, Intro, Services, Outcomes, Tags und CTA.
- Kontaktbereich mit dunkler Introfläche und heller Formularfläche.

## 5. Offene Entscheidungen / Annahmen bei Mehrdeutigkeit

- Feature-Branch konnte nicht erstellt werden: `git checkout -b feat/valmax-design-replica` scheiterte an gesperrten `.git`-Schreibrechten (`unable to create directory for .git/refs/heads/feat/valmax-design-replica`). Konservativ wurde im bestehenden Worktree weitergearbeitet, ohne Branches zu löschen oder Änderungen zu verwerfen.
- Der Commit wurde nach Report-Erstellung versucht, konnte aber nicht erstellt werden, weil bereits die Branch-Erstellung erneut scheiterte.
- Valmax-spezifische Kundenlogo-Walls wurden nicht übernommen. Quantiva nutzt stattdessen vorhandene Proof-/Case-/Industry-Signale, damit keine Logos erfunden werden.
- Pricing, Lemon Squeezy und Stripe wurden in der Codebase nicht als vorhandene Funktionen gefunden. Deshalb wurde nichts in dieser Richtung entfernt oder ergänzt.
- Der Dev-Server wurde gemäß Headless-Vorgabe nicht gestartet. Es wurde ausschließlich mit `npm run build` verifiziert.
- Eine visuelle Browser-Verifikation gegen `localhost` wurde nicht durchgeführt, weil kein Dev-Server laufen sollte. Der Mensch sollte die unten gelisteten Routen manuell durchklicken.

## 6. TODO-Liste / manuelle Klickprüfung

- `/de` und `/en`: Homepage Hero, Marquee, Services, Industries, FAQ, Kontaktformular und Calendly prüfen.
- `/de/services/ai`, `/de/services/cloud`, `/de/services/cyber-security`, `/de/services/digital-strategy`, `/de/services/microservices`, `/de/services/sap`, `/de/services/erp-crm`, `/de/services/sustainability`, `/de/services/test-automation`, `/de/services/change-management` plus EN-Pendants prüfen.
- `/de/industries/manufacturing`, `/de/industries/financial-services`, `/de/industries/health-life-sciences`, `/de/industries/retail-ecommerce` plus EN-Pendants prüfen.
- `/de/about`, `/de/team`, `/de/cases`, `/de/content`, `/de/search`, `/de/video-generation`, `/de/ai-test` plus EN-Pendants auf visuelle Konsistenz prüfen.
- Kontaktformular mit echter reCAPTCHA-Konfiguration erst in einer passenden Umgebung testen.

## 7. Verifikation

- `npm run build`: erfolgreich.
- Next.js kompilierte und generierte 65 Routen.
- `postbuild` lief durch: `generate:sitemap`, `generate:og` und `validate:cases:strict`.
- Build-Warnungen waren bestehende Datenaktualitätswarnungen zu `baseline-browser-mapping` und `caniuse-lite`; keine Build- oder TypeScript-Fehler.

## 8. Branch + Commit

- Gewünschter Branch: `feat/valmax-design-replica`
- Aktueller Branch laut Ausführungskontext: `feat/valmax-design-replica`
- Dieser zweite Fidelity-Durchgang hat keine Git-Aktionen ausgeführt: kein Branch, kein Commit, kein Push.
- Git-Finalisierung bleibt bewusst beim Menschen, weil `.git` im Sandbox-Kontext gesperrt ist.

## Analysierte Valmax-Referenzen

- `https://digital-culture.valmax.dev/`
- `https://digital-culture.valmax.dev/capabilities/ux-ui-design/`
- `https://digital-culture.valmax.dev/industries/automotive/`
- `https://digital-culture.valmax.dev/insights/`
- `https://digital-culture.valmax.dev/contact-us/`
