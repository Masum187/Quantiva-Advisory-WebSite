# HR intern (außerhalb der Website)

Karrierestufen auf der Site (Studierende → Führung) sind Marketing. **Gehalt, Bonus, Benefits, Headcount-Kosten pro Jahr** gehören in ein HRIS, nicht ins Next.js-Repo.

## Empfohlene Trennung

| Thema | System |
|---|---|
| Öffentliche Stellen + Bewerbung | Website + Contentful + `/api/jobs/apply` → Mail, Brevo-Liste `applicants`, optional Greenhouse |
| Pipeline, Interviews, Verträge | Personio Recruiting oder Greenhouse |
| Gehalt, variable Kosten/Jahr, Stellenplan | Personio HR / DATEV |

Die Website speichert keine Kostensätze und zeigt keine internen Bänder.

## Nächster organisatorischer Schritt

1. Personio (oder DATEV + separates ATS) anlegen.
2. Eine Quelle für Stellen: ATS → Contentful-Webhook **oder** HR pflegt nur Contentful.
3. Optional `GREENHOUSE_HARVEST_API_KEY` + `GREENHOUSE_JOB_ID` in Vercel, dann leitet `/api/jobs/apply` zusätzlich an Greenhouse weiter.
