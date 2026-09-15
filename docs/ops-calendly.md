# Calendly: Termine in Brevo

## Event-Typ

In Calendly ein konkretes Event anlegen (z. B. 30-Min-Erstgespräch, DE/EN, Puffer, Host).

Vercel:

- `NEXT_PUBLIC_CALENDLY_EVENT_URL` = Event-URL (bevorzugt)
- sonst `NEXT_PUBLIC_CALENDLY_URL` = Profil-URL (heutiger Fallback)

Die Startseite (`#meeting`) bindet diese URL im Widget ein.

## Webhook → CRM

1. Calendly → Integrations → Webhooks.
2. URL: `https://quantivaadvisory.com/api/calendly/webhook`
3. Events: `invitee.created`, `invitee.canceled`
4. Signing Key als `CALENDLY_WEBHOOK_SIGNING_KEY` in Vercel.

Ohne Key antwortet Production mit 503. Mit Key wird die Signatur geprüft; der Invitee landet in Brevo (Liste `BREVO_LIST_LEADS`, Attribute `MEETING_TYPE`, `MEETING_STATUS`).
