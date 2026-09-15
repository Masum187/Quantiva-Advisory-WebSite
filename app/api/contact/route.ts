import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CONTACT_EMAIL } from '../../lib/contact';
import { upsertBrevoContact } from '../../lib/leads';
import { escapeHtml, mailConfigured, sendMail } from '../../lib/mail';
import { verifyRecaptcha } from '../../lib/recaptchaServer';

const requestCounts = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  message: z.string().trim().min(10).max(5000),
  honeypot: z.string().optional(),
  lang: z.enum(['de', 'en']).optional(),
  recaptchaToken: z.string().optional(),
});

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip ?? 'unknown';
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(key);

  if (!record || now > record.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const rateLimitKey = getRateLimitKey(req);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const parsed = contactSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    const { name, email, message, honeypot, lang, recaptchaToken } = parsed.data;
    const locale = lang === 'en' ? 'en' : 'de';

    if (honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    const recaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    if (!mailConfigured()) {
      return NextResponse.json(
        {
          error:
            locale === 'de'
              ? 'Der Versand ist derzeit nicht konfiguriert. Bitte schreiben Sie uns direkt per E-Mail.'
              : 'Mail delivery is not configured. Please contact us directly by email.',
        },
        { status: 503 },
      );
    }

    const notifyTo = process.env.LEAD_NOTIFY_EMAIL || CONTACT_EMAIL;

    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const subject =
      locale === 'de' ? `Neue Kontaktanfrage von ${name}` : `New contact request from ${name}`;

    const sent = await sendMail({
      to: notifyTo,
      replyTo: email,
      subject,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #0f766e;">Quantiva Advisory</h2>
          <p>${locale === 'de' ? 'Neue Kontaktanfrage' : 'New contact request'}</p>
          <table cellpadding="4">
            <tr><td><b>Name</b></td><td>${safeName}</td></tr>
            <tr><td><b>E-Mail</b></td><td>${escapeHtml(email)}</td></tr>
            <tr><td><b>${locale === 'de' ? 'Nachricht' : 'Message'}</b></td><td>${safeMessage}</td></tr>
            <tr><td><b>${locale === 'de' ? 'Zeitpunkt' : 'Time'}</b></td><td>${new Date().toISOString()}</td></tr>
          </table>
        </div>
      `,
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

    await upsertBrevoContact({
      email,
      name,
      lang: locale,
      source: 'contact',
      list: 'leads',
    });

    return NextResponse.json({
      success: true,
      message:
        locale === 'de'
          ? 'Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.'
          : 'Thank you for your message. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
