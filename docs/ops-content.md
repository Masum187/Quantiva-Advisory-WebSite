# Redaktion: News, Stellen, Whitepapers

Kein zweites CMS. Rollen:

| Inhalt | Werkzeug | Wer |
|---|---|---|
| News / Fachbeiträge | Contentful `contentPost` | Marketing |
| Stellen | Contentful `jobPosting` | HR |
| Gated Whitepapers | Cloudinary + `app/lib/data/whitepapers.ts` (später Contentful-Modell `whitepaper`) | Marketing + einmalig Dev |
| Layout / neue Seiten | Git | Entwicklung |
| Video-Spielwiese | `/de/cms` (noindex, `ADMIN_API_SECRET`) | intern |

## Contentful live schalten

Ohne Keys bleibt die Site auf `posts.json` / `jobs.json`. In Vercel setzen:

- `REACT_APP_CONTENTFUL_SPACE_ID`
- `REACT_APP_CONTENTFUL_ACCESS_TOKEN`
- `REACT_APP_CONTENTFUL_ENVIRONMENT` (meist `master`)

Management-Token nur für Skripte, nie `NEXT_PUBLIC`.

## Revalidate nach Publish

Contentful Webhook (Publish/Unpublish) →

`POST https://quantivaadvisory.com/api/revalidate`

Header: `x-revalidate-secret: <REVALIDATE_SECRET>`

Optional Body: `{ "tags": ["content"] }` oder `{ "tags": ["jobs"] }`.

Ohne Secret antwortet die Route mit 401.

## Playbook Publish

1. DE- und EN-Felder füllen (kein DE-only Live-Gang).
2. Slug stabil lassen (Sitemap/Canonical).
3. Preview im Contentful-Web, dann Publish.
4. Webhook invalidiert den Cache; nach ~1 Minute die Live-URL prüfen.
5. Whitepaper-Checkliste bis zum Contentful-Modell: PDF nach Cloudinary (ohne `/pdf/`-Transformation) → Eintrag in `whitepapers.ts` → Karte auf der Service-Seite.

`/de/cms` nicht für News verwenden.
