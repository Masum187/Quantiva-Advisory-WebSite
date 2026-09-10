import { NextRequest, NextResponse } from 'next/server';
import { getWhitepaper } from '../../lib/data/whitepapers';

/**
 * Whitepaper request endpoint.
 *
 * Flow: the form on the SAP service page posts the prospect's data + the
 * whitepaper slug. We validate, then send the download link BY E-MAIL only
 * (the Cloudinary URL never appears in the browser), plus an internal lead
 * notification.
 *
 * Required environment variables (Vercel → Project Settings → Environment
 * Variables). Configure ONE mail provider:
 *   BREVO_API_KEY      – API key from https://brevo.com (EU provider, preferred)
 *   RESEND_API_KEY     – alternative: API key from https://resend.com
 *   MAIL_FROM          – verified sender, e.g. "Quantiva Advisory <mail@quantivaadvisory.com>"
 *   LEAD_NOTIFY_EMAIL  – internal recipient for lead notifications (optional)
 */

// Simple in-memory rate limiting (same pattern as /api/contact)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(req: NextRequest): boolean {
  const forwarded = req.headers.get('x-forwarded-for');
  const key = forwarded ? forwarded.split(',')[0] : 'unknown';
  const now = Date.now();
  const record = requestCounts.get(key);

  if (!record || now > record.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

function mailConfigured(): boolean {
  return Boolean(
    (process.env.BREVO_API_KEY || process.env.RESEND_API_KEY) && process.env.MAIL_FROM
  );
}

/** Parse MAIL_FROM in the form `Name <mail@domain.de>` (or just `mail@domain.de`). */
function parseSender(from: string): { name: string; email: string } {
  const match = from.match(/^(.*)<([^>]+)>\s*$/);
  if (match) {
    return { name: match[1].trim().replace(/^"|"$/g, ''), email: match[2].trim() };
  }
  return { name: 'Quantiva Advisory', email: from.trim() };
}

async function sendMail(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const from = process.env.MAIL_FROM;
  if (!from) return false;

  // Preferred: Brevo (EU provider, GDPR-compliant, EU data centers)
  const brevoKey = process.env.BREVO_API_KEY;
  if (brevoKey) {
    const sender = parseSender(from);
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender,
        to: [{ email: payload.to }],
        subject: payload.subject,
        htmlContent: payload.html,
        ...(payload.replyTo ? { replyTo: { email: payload.replyTo } } : {}),
      }),
    });

    if (!res.ok) {
      console.error('Brevo error:', res.status, await res.text());
      return false;
    }
    return true;
  }

  // Fallback: Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text());
      return false;
    }
    return true;
  }

  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  try {
    if (!checkRateLimit(req)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { slug, firstName, lastName, email, company, phone, honeypot } = body;

    // Honeypot (bot protection)
    if (honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    // Validation
    if (!firstName || firstName.length < 2 || firstName.length > 80) {
      return NextResponse.json({ error: 'Ungültiger Vorname' }, { status: 400 });
    }
    if (!lastName || lastName.length < 2 || lastName.length > 80) {
      return NextResponse.json({ error: 'Ungültiger Nachname' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse' }, { status: 400 });
    }
    if (!company || company.length < 2 || company.length > 120) {
      return NextResponse.json({ error: 'Ungültiger Firmenname' }, { status: 400 });
    }

    const whitepaper = getWhitepaper(String(slug ?? ''));
    if (!whitepaper) {
      return NextResponse.json({ error: 'Unbekanntes Whitepaper' }, { status: 400 });
    }

    if (!whitepaper.url || whitepaper.url === 'REPLACE_WITH_CLOUDINARY_URL') {
      console.error(`Whitepaper URL not configured for slug: ${whitepaper.slug}`);
      return NextResponse.json(
        { error: 'Dieses Whitepaper ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns direkt.' },
        { status: 503 }
      );
    }

    if (!mailConfigured()) {
      console.error('Mail service not configured (BREVO_API_KEY/RESEND_API_KEY + MAIL_FROM missing)');
      return NextResponse.json(
        { error: 'Der Versand ist derzeit nicht möglich. Bitte kontaktieren Sie uns direkt.' },
        { status: 503 }
      );
    }

    const safeFirst = escapeHtml(firstName);
    const safeLast = escapeHtml(lastName);
    const safeCompany = escapeHtml(company);

    // 1) E-mail with the download link to the prospect
    const sent = await sendMail({
      to: email,
      subject: `Ihr Whitepaper: ${whitepaper.title}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #0f766e;">Quantiva Advisory</h2>
          <p>Guten Tag ${safeFirst} ${safeLast},</p>
          <p>vielen Dank für Ihr Interesse. Hier ist Ihr angefordertes Whitepaper:</p>
          <p style="margin: 28px 0;">
            <a href="${whitepaper.url}"
               style="background: linear-gradient(90deg, #0d9488, #7c3aed); color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold;">
              ${escapeHtml(whitepaper.title)} herunterladen
            </a>
          </p>
          <p>Bei Fragen zu den Inhalten oder zu unseren SAP-Services stehen wir Ihnen gerne zur Verfügung – antworten Sie einfach auf diese E-Mail.</p>
          <p>Mit besten Grüßen<br/>Ihr Quantiva Advisory Team</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;"/>
          <p style="font-size: 12px; color: #737373;">
            Sie erhalten diese E-Mail, weil Sie das Whitepaper über quantivaadvisory.com angefordert haben.
          </p>
        </div>
      `,
    });

    if (!sent) {
      return NextResponse.json(
        { error: 'Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut.' },
        { status: 502 }
      );
    }

    // 2) Internal lead notification (failure here must not affect the prospect)
    const leadRecipient = process.env.LEAD_NOTIFY_EMAIL;
    if (leadRecipient) {
      sendMail({
        to: leadRecipient,
        subject: `Neuer Whitepaper-Lead: ${whitepaper.title}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif;">
            <h3>Neue Whitepaper-Anfrage</h3>
            <table cellpadding="4">
              <tr><td><b>Whitepaper</b></td><td>${escapeHtml(whitepaper.title)}</td></tr>
              <tr><td><b>Name</b></td><td>${safeFirst} ${safeLast}</td></tr>
              <tr><td><b>E-Mail</b></td><td>${escapeHtml(email)}</td></tr>
              <tr><td><b>Unternehmen</b></td><td>${safeCompany}</td></tr>
              <tr><td><b>Telefon</b></td><td>${escapeHtml(phone || '–')}</td></tr>
              <tr><td><b>Zeitpunkt</b></td><td>${new Date().toISOString()}</td></tr>
            </table>
          </div>
        `,
      }).catch((err) => console.error('Lead notification failed:', err));
    }

    return NextResponse.json({
      success: true,
      message: 'Das Whitepaper wurde an Ihre E-Mail-Adresse gesendet.',
    });
  } catch (error) {
    console.error('Whitepaper request error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
