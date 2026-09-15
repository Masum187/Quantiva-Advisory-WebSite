# Google- und Bing-Sichtbarkeit

Technik (Sitemap, Canonicals, JSON-LD) ist im Repo. Indexierung scheitert, solange die Canonical-Domain nicht auf das Vercel-Projekt zeigt.

## 1. Custom-Domain

`SITE_URL` / `NEXT_PUBLIC_SITE_URL` ist `https://quantivaadvisory.com`.

1. In Vercel: Project → Settings → Domains → `quantivaadvisory.com` und `www` hinzufügen.
2. DNS beim Registrar auf die von Vercel genannten Records setzen.
3. Prüfen: `https://quantivaadvisory.com/de` muss HTTP 200 liefern (nicht `DEPLOYMENT_NOT_FOUND`).
4. Erst danach Search Console auf dieser Domain anlegen — nicht auf der `*.vercel.app`-Preview.

## 2. Search Console

1. Property vom Typ Domain oder URL-Präfix `https://quantivaadvisory.com`.
2. Verifikation: DNS-TXT **oder** HTML-Token.
3. HTML-Token in Vercel als `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` setzen (landet im Root-`<head>`).
4. Sitemap einreichen: `https://quantivaadvisory.com/sitemap.xml`.
5. URL Inspection für Home, 2–3 Services, Career, About.

Bing Webmaster analog; Token als `NEXT_PUBLIC_BING_SITE_VERIFICATION`.

## 3. Inhalt (kein Code)

- Eine Zielseite pro Kernangebot (existierende Service-Seiten).
- Content Hub: 1–2 Fachartikel pro Monat zu den Queries, für die ihr gefunden werden wollt.
- Interne Links: Home → Service → Case → Whitepaper.
- Ads erst nach 4–8 Wochen organischer GSC-Baseline.

## 4. Schema

Die Startseite rendert `Organization` + `WebSite`/`SearchAction` (`/de/search?q=`). Service-Seiten rendern `Service` + Breadcrumbs. Stellen haben `JobPosting`.
