# Repo-Inventur: Quantiva Advisory

Stand: 2026-06-14

## Ausgangslage

- Repo: `/Users/herijeanmasum/Developer/quantiva-Advisory`
- Git-Status vor Inventur: `main...origin/main`, keine uncommitted Änderungen sichtbar.
- Ziel der Inventur: technischen Ist-Zustand dokumentieren, bevor der reine visuelle Reskin im Valmax-Stil umgesetzt wird.

## Framework und Build

- Framework: Next.js App Router, `app/`-Verzeichnis.
- Paket: `quantiva-website`, Version `0.1.0`, `private: true`.
- Runtime-Anforderung: Node `>=20.0.0`.
- React: `react`/`react-dom` `^19.2.0`.
- Next.js: `^15.1.0`.
- TypeScript: `^5.9.3`.
- Dev-Command: `npm run dev` -> `next dev`.
- Produktionsbuild: `npm run build` -> `next build`.
- Start: `npm start` -> `next start`.
- Lint-Script: `npm run lint` -> `next lint`.
- Postbuild: `generate:sitemap`, `generate:og` und `validate:cases:strict`.
- Bundle Analyse: `@next/bundle-analyzer` mit `ANALYZE=true`.

## CSS-, UI- und Animationsstack

- Styling: Tailwind CSS `^3.4.18`, `postcss`, `autoprefixer`.
- Globale Styles: `app/globals.css`.
- Tailwind Config: `tailwind.config.js`.
- Bestehende Designbasis:
  - dunkler Hintergrund (`black`, `slate-900/950`)
  - teal Akzent (`#0f766e`, `#14b8a6`, Tailwind `teal-*`)
  - Gradients, Glassmorphism, runde Cards (`rounded-2xl`, `rounded-3xl`)
  - eigene Keyframes: `float`, `gradient-shift`, `float-particle`, `fadeIn`, `slideUp`, Laser-Cursor-Effekte.
- Animationen: Framer Motion `^12.23.22`, lokale Components wie `SlideIn` und `AnimatedCard`.
- Icons: `lucide-react` und `@heroicons/react`.
- Charts/Visualisierung: `recharts`, `mermaid`.
- UI-Library: keine shadcn/ui-Struktur; UI ist überwiegend lokal mit Tailwind-Komponenten gebaut.

## Next.js-Konfiguration

- `next.config.js`:
  - `reactStrictMode: true`
  - `distDir: '.next'`
  - `outputFileTracingRoot: __dirname`
  - `turbopack: {}`
  - Image Remote Patterns: Contentful, Cloudinary, Unsplash.
  - CSP/Header-Konfiguration für Google reCAPTCHA/Tag Manager, Contentful, OpenAI, Cloudinary, Unsplash.
  - Redirects:
    - `/home` -> `/`
    - `/de/karriere` -> `/de/career`
    - `/en/careers` -> `/en/career`
  - Environment Mapping für Contentful, Cloudinary und reCAPTCHA.
- `middleware.ts` vorhanden; i18n wird laut README/Config dort bzw. im App Router behandelt.

## Routing

### Root und Locale

- `/` -> Redirect nach `/de`.
- Locale-Layouts:
  - `app/de/layout.tsx`
  - `app/en/layout.tsx`
- Locale-Homepages:
  - `/de`
  - `/en`

### Öffentliche Seiten

- `/de/about`, `/en/about`
- `/de/team`, `/en/team`
- `/de/career`, `/en/career`
- `/de/cases`, `/en/cases`
- `/de/content`, `/en/content`
- `/de/content/[slug]`, `/en/content/[slug]`
- `/de/search`, `/en/search`
- `/de/strategy-consulting`, `/en/strategy-consulting`
- `/de/video-generation`, `/en/video-generation`
- `/de/ai-test`

### Services

- `/de/services/ai`, `/en/services/ai`
- `/de/services/cloud`, `/en/services/cloud`
- `/de/services/sap`, `/en/services/sap`
- `/de/services/cyber-security`, `/en/services/cyber-security`
- `/de/services/digital-strategy`, `/en/services/digital-strategy`
- `/de/services/erp-crm`, `/en/services/erp-crm`
- `/de/services/microservices`, `/en/services/microservices`
- `/de/services/new-work`, `/en/services/new-work`
- `/de/services/sustainability`, `/en/services/sustainability`
- `/de/services/test-automation`, `/en/services/test-automation`
- `/de/services/change-management`, `/en/services/change-management`

### Industries

- `/de/industries/[slug]`
- `/en/industries/[slug]`

### CMS/Admin-nahe Routen

- `/de/cms/mcp-dashboard`
- `/de/cms/video-generator`
- `/de/cms/video-management`

### API Routes

- `POST /api/contact`
- `/api/ai-test`
- `/api/video-generation`
- `/api/cms/upload-video`
- `/api/cms/video-generator`

## Content- und Datenquellen

- Zentrale Website-Texte: `app/lib/data/content.json`.
- Cases: `app/lib/data/cases.json`.
- Team: `app/lib/data/team.json`.
- Jobs: `app/lib/data/jobs.json`.
- Content Hub/Posts: `app/lib/data/posts.json`.
- Service-Übersicht: `app/lib/data/servicesOverview.ts`.
- Branchen-Übersicht: `app/lib/data/industries.ts`.
- Branchen-Details: `app/lib/data/industryDetails.ts`.
- Taxonomie: `app/lib/data/taxonomy.json`.
- Content Context: `app/lib/contexts/ContentContext.tsx` mit Helper-Hooks für Hero, Navigation, Services, Contact, Meeting, Careers, Footer und Team.

## Zentrale Komponenten

- `app/components/QuantivaWebsite.tsx`: große Client-Komponente für Homepage, LanguageContext, Sections, Cases-Exports und Footer.
- `app/components/Navigation.tsx`: separate Navigation für viele Unterseiten.
- `app/components/ContactForm.tsx`: funktionale Kontaktformular-Komponente mit reCAPTCHA und `/api/contact`; wird nicht überall genutzt.
- `app/components/sections/IndustriesSection.tsx`: Branchen-Grid.
- `app/components/ReferencesSlider.tsx`: Referenzen/Case-Slider.
- `app/components/AIImageSlider.tsx`: visueller Slider im Hero.
- `app/components/services/AnimatedCard.tsx`: wiederverwendbare Framer-Motion-Card.
- Weitere Funktionskomponenten: `CookieBanner`, `CommandPalette`, `VideoCard`, `ClientVideo`, `VideoWithSubtitles`, `Mermaid`, `ProjectRoadmap`, `LaserCursor`, `FloatingDock`.

## Homepage-Sektionen

Quelle: `app/components/QuantivaWebsite.tsx`.

- Sticky Header mit Quantiva-Logo, Navigation, Sprachwechsel und Kontakt-CTA.
- Hero mit Badge/Subline, H1, Highlight, Beschreibung, primärem Kontakt-CTA, sekundärem Projekt-CTA, `AIImageSlider` und Statistikzeile.
- `TrustSignals`: Partner-/Proof-Badges, KPI-Karten und Case-basierte Testimonials.
- `AboutTeaser`: kurzer Über-Quantiva-Teaser mit Video.
- `TeamSection`: Link zur Teamseite.
- `IndustriesSection`: Branchenkarten aus `industries.ts`.
- Services Grid: sechs Servicekarten aus `content.json`.
- `ReferencesSlider`: Referenzen/Case-Slider.
- CTA-Band.
- Kontaktformular-Sektion: lokale State-Demo-Form in `QuantivaWebsite.tsx`.
- Meeting/Calendly-Sektion: lädt Calendly Widget/CSS und nutzt `content.json` Meeting-URL.
- Footer mit Quick Links, Kontakt und Social Links aus `content.json`.

## Bestehende Integrationen und Funktionen

- Contentful: Dependencies und Utility/Hooks vorhanden; env mapping in `next.config.js`.
- Cloudinary: Asset-URLs und Utility vorhanden.
- Unsplash: Remote Image Pattern und Utility vorhanden.
- Google reCAPTCHA: `ContactForm.tsx` lädt Script abhängig von `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`; CSP erlaubt Google.
- Calendly: `MeetingCalendlySection` lädt externes Widget und CSS.
- Analytics: `@vercel/analytics`, `@vercel/speed-insights`, lokale `analytics` Utility.
- AI SDK/OpenAI/Anthropic/xAI Dependencies und `/api/ai-test`.
- Video Generation/CMS API-Routen.
- Sitemap und OG-Image-Generierung via Scripts/Postbuild.

## Bestehende visuelle Risiken für den Reskin

- Es gibt doppelte Navigationslogik: inline in `QuantivaWebsite.tsx` und separat in `Navigation.tsx`.
- Es gibt doppelte Kontaktformularlogik: lokale Demo-Form in `QuantivaWebsite.tsx` und echte API-Form-Komponente `ContactForm.tsx`.
- Viele Unterseiten nutzen eigene Layout- und Farbmuster, überwiegend dark/teal/purple gradients.
- Mehrere Komponenten sind Client Components und animieren mit Framer Motion; Reskin muss bestehende Interaktionen erhalten.
- Inhalte sind zweisprachig teils zentral in JSON, teils direkt in Seiten-Komponenten hinterlegt.

## Konservative Umsetzungsannahme

- Alle Routen, Textquellen, API-Routen, Integrationen und Form-/Calendly-/CMS-Funktionen bleiben erhalten.
- Der Reskin ändert visuelle Struktur, Klassen und Komponentenstile, aber keine Route-Namen, Slugs, JSON-Inhalte oder externen Integrations-URLs.
- Falls eine Sektion nicht eindeutig Valmax-äquivalent ist, wird sie im Valmax-Pattern neu gerahmt statt entfernt.
