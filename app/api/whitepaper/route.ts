import { NextRequest, NextResponse } from 'next/server';
import { getWhitepaper } from '../../lib/data/whitepapers';
import { upsertBrevoContact } from '../../lib/leads';
import { escapeHtml, mailConfigured, sendMail } from '../../lib/mail';
import { verifyRecaptcha } from '../../lib/recaptchaServer';

/**
 * Whitepaper request endpoint.
 *
 * Flow: the form posts prospect data + slug. We validate, then send the
 * download link BY E-MAIL only, plus an internal lead notification.
 *
 * Required environment variables. Configure ONE mail provider:
 *   BREVO_API_KEY      – API key from https://brevo.com (EU provider, preferred)
 *   RESEND_API_KEY     – alternative: API key from https://resend.com
 *   MAIL_FROM          – verified sender
 *   LEAD_NOTIFY_EMAIL  – internal recipient for lead notifications (optional)
 */

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

export async function POST(req: NextRequest) {
  try {
    if (!checkRateLimit(req)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { slug, firstName, lastName, email, company, phone, honeypot, lang, recaptchaToken } = body;
    const locale = lang === 'en' ? 'en' : 'de';

    if (honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    if (!firstName || firstName.length < 2 || firstName.length > 80) {
      return NextResponse.json(
        { error: locale === 'de' ? 'Ungültiger Vorname' : 'Invalid first name' },
        { status: 400 },
      );
    }
    if (!lastName || lastName.length < 2 || lastName.length > 80) {
      return NextResponse.json(
        { error: locale === 'de' ? 'Ungültiger Nachname' : 'Invalid last name' },
        { status: 400 },
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json(
        { error: locale === 'de' ? 'Ungültige E-Mail-Adresse' : 'Invalid email address' },
        { status: 400 },
      );
    }
    const recaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      return NextResponse.json(
        { error: locale === 'de' ? 'Sicherheitsprüfung fehlgeschlagen.' : 'Security check failed.' },
        { status: 400 },
      );
    }

    if (!company || company.length < 2 || company.length > 120) {
      return NextResponse.json(
        { error: locale === 'de' ? 'Ungültiger Firmenname' : 'Invalid company name' },
        { status: 400 },
      );
    }

    const whitepaper = getWhitepaper(String(slug ?? ''));
    if (!whitepaper) {
      return NextResponse.json(
        { error: locale === 'de' ? 'Unbekanntes Whitepaper' : 'Unknown whitepaper' },
        { status: 400 },
      );
    }

    if (!whitepaper.url || whitepaper.url === 'REPLACE_WITH_CLOUDINARY_URL') {
      console.error(`Whitepaper URL not configured for slug: ${whitepaper.slug}`);
      return NextResponse.json(
        {
          error:
            locale === 'de'
              ? 'Dieses Whitepaper ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns direkt.'
              : 'This whitepaper is currently unavailable. Please contact us directly.',
        },
        { status: 503 },
      );
    }

    if (!mailConfigured()) {
      console.error('Mail service not configured (BREVO_API_KEY/RESEND_API_KEY + MAIL_FROM missing)');
      return NextResponse.json(
        {
          error:
            locale === 'de'
              ? 'Der Versand ist derzeit nicht möglich. Bitte kontaktieren Sie uns direkt.'
              : 'Delivery is currently unavailable. Please contact us directly.',
        },
        { status: 503 },
      );
    }

    const safeFirst = escapeHtml(firstName);
    const safeLast = escapeHtml(lastName);
    const safeCompany = escapeHtml(company);
    const safeTitle = escapeHtml(whitepaper.title);

    const prospect =
      locale === 'en'
        ? {
            subject: `Your whitepaper: ${whitepaper.title}`,
            html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #0f766e;">Quantiva Advisory</h2>
          <p>Hello ${safeFirst} ${safeLast},</p>
          <p>thank you for your interest. Here is the whitepaper you requested:</p>
          <p style="margin: 28px 0;">
            <a href="${whitepaper.url}"
               style="background: linear-gradient(90deg, #0d9488, #7c3aed); color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold;">
              Download ${safeTitle}
            </a>
          </p>
          <p>If you have questions about the content or our services, just reply to this email.</p>
          <p>Best regards<br/>The Quantiva Advisory team</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;"/>
          <p style="font-size: 12px; color: #737373;">
            You received this email because you requested the whitepaper on quantivaadvisory.com.
          </p>
        </div>
      `,
          }
        : {
            subject: `Ihr Whitepaper: ${whitepaper.title}`,
            html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #0f766e;">Quantiva Advisory</h2>
          <p>Guten Tag ${safeFirst} ${safeLast},</p>
          <p>vielen Dank für Ihr Interesse. Hier ist Ihr angefordertes Whitepaper:</p>
          <p style="margin: 28px 0;">
            <a href="${whitepaper.url}"
               style="background: linear-gradient(90deg, #0d9488, #7c3aed); color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold;">
              ${safeTitle} herunterladen
            </a>
          </p>
          <p>Bei Fragen zu den Inhalten oder zu unseren Services stehen wir Ihnen gerne zur Verfügung – antworten Sie einfach auf diese E-Mail.</p>
          <p>Mit besten Grüßen<br/>Ihr Quantiva Advisory Team</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;"/>
          <p style="font-size: 12px; color: #737373;">
            Sie erhalten diese E-Mail, weil Sie das Whitepaper über quantivaadvisory.com angefordert haben.
          </p>
        </div>
      `,
          };

    const sent = await sendMail({
      to: email,
      subject: prospect.subject,
      html: prospect.html,
    });

    if (!sent) {
      return NextResponse.json(
        {
          error:
            locale === 'de'
              ? 'Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut.'
              : 'Delivery failed. Please try again later.',
        },
        { status: 502 },
      );
    }

    const leadRecipient = process.env.LEAD_NOTIFY_EMAIL;
    if (leadRecipient) {
      await sendMail({
        to: leadRecipient,
        subject:
          locale === 'en'
            ? `New whitepaper lead: ${whitepaper.title}`
            : `Neuer Whitepaper-Lead: ${whitepaper.title}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif;">
            <h3>${locale === 'en' ? 'New whitepaper request' : 'Neue Whitepaper-Anfrage'}</h3>
            <table cellpadding="4">
              <tr><td><b>Whitepaper</b></td><td>${safeTitle}</td></tr>
              <tr><td><b>Name</b></td><td>${safeFirst} ${safeLast}</td></tr>
              <tr><td><b>E-Mail</b></td><td>${escapeHtml(email)}</td></tr>
              <tr><td><b>${locale === 'en' ? 'Company' : 'Unternehmen'}</b></td><td>${safeCompany}</td></tr>
              <tr><td><b>${locale === 'en' ? 'Phone' : 'Telefon'}</b></td><td>${escapeHtml(phone || '–')}</td></tr>
              <tr><td><b>${locale === 'en' ? 'Language' : 'Sprache'}</b></td><td>${locale}</td></tr>
              <tr><td><b>${locale === 'en' ? 'Time' : 'Zeitpunkt'}</b></td><td>${new Date().toISOString()}</td></tr>
            </table>
          </div>
        `,
      }).catch((err) => console.error('Lead notification failed:', err));
    }

    await upsertBrevoContact({
      email,
      firstName,
      lastName,
      company,
      phone,
      lang: locale,
      source: 'whitepaper',
      list: 'leads',
      extra: { WHITEPAPER: whitepaper.slug },
    });

    return NextResponse.json({
      success: true,
      message:
        locale === 'en'
          ? 'The whitepaper has been sent to your email address.'
          : 'Das Whitepaper wurde an Ihre E-Mail-Adresse gesendet.',
    });
  } catch (error) {
    console.error('Whitepaper request error:', error);
    return NextResponse.json(
      {
        error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      },
      { status: 500 },
    );
  }
}
