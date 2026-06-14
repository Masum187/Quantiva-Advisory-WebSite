# Quantiva-Content-Inventur

Stand: 2026-06-14

## Grundsatz

- Alle Quantiva-Texte, Slugs, Routen, Datenquellen, Integrationen und API-Funktionen bleiben erhalten.
- Valmax wird nur als visuelle Referenz genutzt: Layout, Rhythmus, Typografie, Farben, Komponentenlogik.
- Keine Valmax-Originaltexte werden in Quantiva-Inhalte uebernommen.
- Keine neuen Kundenlogos oder Social-/Partnerclaims werden erfunden.

## Route-Inventur

### Root und Locale

| Route | Quelle | Status |
| --- | --- | --- |
| `/` | `app/page.tsx` | Redirect nach `/de`, bleibt 1:1 |
| `/de` | `app/de/page.tsx` + `QuantivaWebsite` | Visuell neu, Inhalt bleibt |
| `/en` | `app/en/page.tsx` + `QuantivaWebsite` | Visuell neu, Inhalt bleibt |

### Allgemeine Seiten

| Route | Quelle | Original-Snippets | Reskin-Entscheidung |
| --- | --- | --- | --- |
| `/de/about` | `app/de/about/page.tsx` | "Das sind Wir", "Die Zukunft der digitalen Transformation", "Unsere Mission", "Unsere Vision" | Inhalte/Sektionen erhalten, Hero/Values/CTA im Valmax-Stil |
| `/en/about` | `app/en/about/page.tsx` | "About Quantiva Advisory", "Mission", "Vision", "Ready for your digital transformation?" | Inhalte/Sektionen erhalten, Hero/Values/CTA im Valmax-Stil |
| `/de/team` | `app/de/team/page.tsx` | "Unsere Visionary Leadership", "MEET OUR LEADERSHIP" | Inhalte/Cloudinary-Media erhalten, visuelle Cards/CTA neu |
| `/en/team` | `app/en/team/page.tsx` | "Our Visionary Leadership", "The experts behind Quantiva" | Inhalte/Cloudinary-Media erhalten, visuelle Cards/CTA neu |
| `/de/career` | `app/de/career/page.tsx` + `CareerPage` | "Karriere", Job-Positionen aus `content.json`/Jobs | Funktionen/Form behalten, Karriere-UI neu rahmen |
| `/en/career` | `app/en/career/page.tsx` + `CareerPage` | "Career", "Join our team" | Funktionen/Form behalten, Karriere-UI neu rahmen |
| `/de/search` | `SearchPageClient` | "Suche", Content/Services/Branchen durchsuchen | Suchfunktion erhalten, Ergebnisliste optisch angleichen |
| `/en/search` | `SearchPageClient` | "Search", "Discover content, services and industry solutions" | Suchfunktion erhalten, Ergebnisliste optisch angleichen |
| `/de/strategy-consulting` | eigene Page | Strategie-/Karriere-/Consulting-Sektionen | Inhalt und LaserCursor-Kontext erhalten, visuelle Patterns vereinheitlichen |
| `/en/strategy-consulting` | eigene Page | "Early Ownership", "Mentoring & Certifications" | Inhalt und LaserCursor-Kontext erhalten, visuelle Patterns vereinheitlichen |
| `/de/video-generation` | eigene Page + API | Video-Prompt/Form, Erfolgs-/Fehlerstates | Funktion/API erhalten, Tool-Oberflaeche neu stylen |
| `/en/video-generation` | eigene Page + API | Video generation UI | Funktion/API erhalten, Tool-Oberflaeche neu stylen |
| `/de/ai-test` | eigene Page + `/api/ai-test` | "Testen Sie verschiedene AI-Modelle: xAI Grok, OpenAI GPT und Claude" | Funktion/API erhalten, Tool-Oberflaeche neu stylen |

### Services

| Route | Original-Snippets | Reskin-Entscheidung |
| --- | --- | --- |
| `/de/services/sap`, `/en/services/sap` | "SAP S/4HANA Consulting", "SAP BTP Integration", "SAP Fiori & UX", "SAP Testing & Quality" | Inhalt erhalten; Detail-Hero, Services, Outcomes und CTA im Capability-Pattern |
| `/de/services/cloud`, `/en/services/cloud` | "Cloud Strategy & Assessment", "Cloud Migration Services", "Cloud Native Development", "Cloud Security & Compliance" | Inhalt erhalten; Card-/Counter-Pattern |
| `/de/services/ai`, `/en/services/ai` | DE: "Use Case Discovery", "Guardrails & Compliance", "MLOps & GenAI"; EN: "AI Strategy & Consulting", "Machine Learning Solutions" | Inhalt und externe Whitepaper-Links erhalten; visuell neu |
| `/de/services/cyber-security`, `/en/services/cyber-security` | "Zero Trust & IAM", "Security Architecture", "Audits & Hardening", "Threat Modeling" | Inhalt und Quellen-Links erhalten; visuell neu |
| `/de/services/digital-strategy`, `/en/services/digital-strategy` | "Digital Strategy Development", "Change Management & Training", "Process Optimization", "Innovation Consulting" | Inhalt erhalten; Capability-Layout |
| `/de/services/microservices`, `/en/services/microservices` | "Microservices Architecture", "API-First Development", "Container & Orchestration", "Transition & Integration" | Inhalt erhalten; technische Blocks neu |
| `/de/services/new-work`, `/en/services/new-work` | "New Work", "Strategy & Organizational Transformation", "Productivity & Collaboration", "Modern Workplace" | Inhalt und eigene Contact-Section erhalten; visuell integrieren |
| `/de/services/erp-crm`, `/en/services/erp-crm` | "ERP & CRM Services", SAP/Microsoft Dynamics/Salesforce | Page-Component erhalten, Valmax-Layout |
| `/de/services/sustainability`, `/en/services/sustainability` | "Sustainability Consulting", ESG/CO2/CSRD | Page-Component erhalten, Valmax-Layout |
| `/de/services/test-automation`, `/en/services/test-automation` | "Testautomatisierung"/"Test Automation", CI/CD, Performance, Security Testing | Page-Component erhalten, Valmax-Layout |
| `/de/services/change-management`, `/en/services/change-management` | "Change Management & Training" | Page-Component erhalten, Valmax-Layout |

### Industries

| Route | Quelle | Original-Snippets | Reskin-Entscheidung |
| --- | --- | --- | --- |
| `/de/industries/[slug]` | `industryDetails.ts` + `IndustryLandingPage` | "Digitale Fertigung für den Mittelstand", "Regulatorisch robust. Digital skalierbar.", "Von Forschung bis Patientenversorgung digital führend" | Daten, Kontakte, Cases, Technologies erhalten; Valmax-Industry-Pinned-Hero/Service-Slider-Pattern |
| `/en/industries/[slug]` | `industryDetails.ts` + `IndustryLandingPage` | "Digital Manufacturing for Mid-Market Champions", "Regulatory Resilient. Digitally Scalable." | Daten, Kontakte, Cases, Technologies erhalten; Valmax-Industry-Pattern |

### Cases und Content Hub

| Route | Quelle | Original-Snippets | Reskin-Entscheidung |
| --- | --- | --- | --- |
| `/de/cases` | `cases.json`, eigene Page | "Angebote & Cases", Case-Karten, SEO/JSON-LD | Case-Daten/SEO erhalten; Grid/Featured-Case neu |
| `/en/cases` | `cases.json`, eigene Page | "References & Cases", "Success stories from various industries and technologies." | Case-Daten/SEO erhalten; Grid/Featured-Case neu |
| `/de/content` | `ContentHubPage` | "Content Hub – Quantiva Advisory", "Impulse, Playbooks und Projekteinblicke" | Filter/Suche erhalten; Insights-Pattern |
| `/en/content` | `ContentHubPage` | "Insights, playbooks and project takeaways" | Filter/Suche erhalten; Insights-Pattern |
| `/de/content/[slug]` | `ContentPostPage` | Post-Titel, Excerpt, Related Posts | Inhalt/Related Posts erhalten; Artikeltypografie neu |
| `/en/content/[slug]` | `ContentPostPage` | Post-Titel, Excerpt, Related Posts | Inhalt/Related Posts erhalten; Artikeltypografie neu |

### CMS/Admin-nahe Routen

| Route | Funktion | Reskin-Entscheidung |
| --- | --- | --- |
| `/de/cms/mcp-dashboard` | Mock-MCP Dashboard, Content Management, Video Generation, Performance Analysis | Funktion erhalten, falls angefasst nur UI-Tokens |
| `/de/cms/video-generator` | Video-Generator mit Cloudinary-Upload/URL Copy | Funktion erhalten |
| `/de/cms/video-management` | Video-Management, Download, Copy, Delete Mock | Funktion erhalten |

## Homepage-Content

Quelle: `app/lib/data/content.json` und `app/components/QuantivaWebsite.tsx`.

### Hero

- DE:
  - Titel: "Digitale Transformation für den Mittelstand"
  - Subline: "SAP · Cloud · KI · Compliance-fit"
  - Highlight: "Planbar. Sicher. Skalierbar."
  - Beschreibung: "Wir modernisieren SAP-Landschaften, bauen Cloud-Betriebsmodelle auf und bringen KI-Anwendungen in die Fläche – speziell für mittelständische Marktführer."
  - CTAs: "Jetzt Beraten lassen", "Projekte ansehen"
- EN:
  - Title: "Mid-Market Transformation that Delivers"
  - Subline: "SAP · Cloud · AI · Compliance-ready"
  - Highlight: "Predictable. Secure. Scalable."
  - Description: "We upgrade SAP cores, build cloud operating models and ship AI use cases that create measurable value for European mid-market leaders."
  - CTAs: "Get Consulting Now", "View Projects"
- Bleibt 1:1 textlich erhalten.
- Wird im Valmax-Hero-Frame mit großen Typo-/Media-/Counter-Mustern neu aufgebaut.

### About/Trust/Team

- Bestehend:
  - "Über Quantiva"
  - "Wir verbinden Strategie, Engineering und Enablement für messbare Ergebnisse. Sicher, compliant und skalierbar."
  - Team CTA: "Erfahren Sie wer hinter Quantiva Advisory steht" / "Learn who stands behind Quantiva Advisory"
  - Proof: Partnerstatus, KPIs, Kundenstimmen aus Cases.
- Text bleibt erhalten.
- Proof-Wall wird als ehrliche KPI-/Partner-/Case-Marquee Alternative gebaut. Keine neuen Logos.

### Services

Services aus `content.json`:

- SAP Services
- Cloud Solutions
- AI & Machine Learning
- System Integration
- Cyber Security
- New Work

Beschreibungen bleiben 1:1 erhalten. Die visuelle Darstellung wird zu Capability-Blöcken mit Counter und Chips.

### Industries

Aus `industries.ts`:

- DE: Finanzdienstleistungen, Automotive, Health & Life Sciences, Retail & E-Commerce.
- EN: Financial Services, Automotive & Mobility, Health & Life Sciences, Retail & E-Commerce.
- Projektzahlen und Unsplash-Bilder bleiben erhalten.
- Darstellung wird im Valmax-Industry-Grid/Media-Hover-Stil neu gebaut.

### References/Testimonials

- Quelle: `cases.json`, nur Cases mit `quote`.
- Keine Zitate werden erfunden.
- Existing `ReferencesSlider` filtert auf Cases mit Quote und nutzt Titel, Subtitle, Results.
- Wird als Valmax-artige Testimonial-/Case-Story-Sektion neu gerahmt.

### CTA, Contact, Meeting

- CTA-Texte bleiben:
  - DE: "Bereit für den nächsten Schritt?"
  - EN: "Ready for the next step?"
- Contact-Inhalte aus `content.json` bleiben:
  - DE: "Kontakt aufnehmen", "Lassen Sie uns über Ihr Projekt sprechen"
  - EN: "Get in Touch", "Let's talk about your project"
- Meeting/Calendly bleibt:
  - Titel: "Termin vereinbaren" / "Schedule a Meeting"
  - URL: `https://calendly.com/quantivaadvisory`
- Form-Funktion:
  - `ContactForm.tsx` sendet an `/api/contact`.
  - Homepage nutzt derzeit eine lokale Demo-Form in `QuantivaWebsite.tsx`; konservative Entscheidung: nicht entfernen, sondern bei Reskin möglichst auf die echte `ContactForm`-Komponente migrieren, weil sie bestehende API/reCAPTCHA-Funktion erhält.

## Funktionen und Integrationen

### Bleibt 1:1 erhalten

- i18n via `/de` und `/en` Routes sowie `LanguageProvider`.
- `ContentProvider` und zentrale JSON-Content-Hooks.
- `/api/contact`:
  - Rate Limit: 10 Requests/Stunde/IP.
  - Honeypot.
  - reCAPTCHA-Verification via `RECAPTCHA_SECRET_KEY`.
  - Validierung von Name, Email, Message.
  - Success/Error JSON.
- `ContactForm.tsx`:
  - Client-Validierung.
  - reCAPTCHA Script.
  - POST `/api/contact`.
  - Success/Error UI.
- Calendly Inline Widget:
  - Script `https://assets.calendly.com/assets/external/widget.js`.
  - CSS `https://assets.calendly.com/assets/external/widget.css`.
  - Fallback-Link und Analytics Event.
- Vercel Analytics und Speed Insights in `app/layout.tsx`.
- Lokale `analytics` Utility:
  - Navigation clicks.
  - Language switch.
  - Case view.
  - Contact form submit.
  - Calendly open.
- Contentful:
  - SDK/Utils/Hooks, Fallback auf JSON.
  - Migration Script.
- Cloudinary:
  - Asset Utils.
  - CMS video upload/generator API.
  - Team/Video/Case Assets.
- Unsplash:
  - Utility und Remote Images.
- AI APIs:
  - `/api/ai-test` mit OpenAI, Anthropic und xAI.
- Video APIs:
  - `/api/video-generation`.
  - `/api/cms/video-generator`.
  - `/api/cms/upload-video`.
- Sitemap/OG Scripts:
  - `generate:sitemap`
  - `generate:og`
  - `validate:cases:strict`

### Nicht gefunden

- Lemon Squeezy: keine Dependency, keine Route, kein Suchtreffer.
- Stripe/Payments/Checkout: keine aktive Integration gefunden.
- Pricing/TestSuite als eigener Produkt-/Pricing-Flow: kein Route-/Component-Treffer ausser "AI-Pricing" als Fachtext in Branchencontent.
- Newsletter-Funktion: keine Quantiva-eigene Newsletter-Komponente gefunden; Footer hat Contact/Social, Valmax-Newsletter wird nicht 1:1 uebernommen.

## Assets

### Lokale Assets

- Favicons/PWA:
  - `favicon.ico`, `favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `logo192.png`, `logo512.png`, `site.webmanifest`, `manifest.json`.
- Case Images:
  - `public/assets/cases/*.jpg`.
- OG Images:
  - `public/assets/og-default.jpg`
  - `public/assets/og-cases.jpg`
  - `public/assets/og/*.jpg`
- Logo:
  - `public/logo-badge.svg`
- Audio placeholder:
  - `public/audio/README.md`

### Externe Assets

- Cloudinary URLs in `content.json`, team pages und video workflows.
- Unsplash URLs in industry data and capability pages.
- Contentful remote images allowed in Next config.

## Was bleibt 1:1

- Alle Routen und Slugs.
- Alle JSON-Content-Dateien und Case-/Team-/Job-/Post-Daten.
- Alle API-Endpunkte und Request/Response-Vertraege.
- Alle externen URLs fuer Calendly, Cloudinary, Contentful, reCAPTCHA, Analytics.
- Bilingual DE/EN-Struktur.
- SEO-Metadata und JSON-LD-Strukturen, soweit in Pages vorhanden.
- Vorhandene Admin/CMS-Funktionen.

## Was wird im Valmax-Stil neu gebaut

- Globales Farb-/Typografie-/Spacing-System.
- Header und Footer.
- Homepage-Sektionslayout.
- Hero-Frame und Media/Proof-Rhythmus.
- Capability-/Service-Cards mit Counter.
- Industry-Grid und Detailseiten-Hero.
- Stats/Proof Section.
- Testimonials/References.
- Insights/Content Teaser.
- FAQ-Accordion, falls passend auf Homepage/Contact.
- Contact/Form Darstellung.
- Detailseiten-Layouts fuer Services, Industries, Cases, Content.

## Quantiva-spezifisch, nicht direkt bei Valmax vorhanden

- Bilingual App-Router-Struktur mit `/de` und `/en`.
- Calendly Inline Booking auf Homepage.
- Contact API mit Rate-Limit, Honeypot und reCAPTCHA.
- AI Test Tool.
- Video Generation und CMS Video Management.
- Contentful JSON-Fallback-Architektur.
- Cloudinary Asset Management.
- Search Page.
- Career Page mit echter `ContactForm`.
- FloatingDock, CommandPalette, CookieBanner, LaserCursor.

## Offene inhaltliche Fragen

- Einige Partner-/Proof-Angaben wie "SAP PartnerEdge", "Gold Partner", "AWS Select Consulting" sind bereits im Code, aber nicht verifiziert. Sie bleiben nur erhalten, weil der Auftrag Inhaltserhalt verlangt.
- Einige Firmen-/Case-Namen in `cases.json` und `industryDetails.ts` wirken wie Referenzen. Keine neuen Logos werden daraus generiert; vorhandene Texte bleiben.
- Homepage-Kontaktformular ist aktuell eine lokale Demo-Form, während `ContactForm.tsx` die echte API nutzt. Konservative Umsetzung: echte Funktion bevorzugen, Demo-State nicht als einzige Kontaktfunktion belassen.
- Git-Branch-Anlage ist durch `.git`-Schreibschutz im Sandbox-Kontext blockiert; dies wird im `RESKIN_REPORT.md` dokumentiert.
