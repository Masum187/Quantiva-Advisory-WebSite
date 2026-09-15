import { NextRequest, NextResponse } from 'next/server';
import { CAREERS_EMAIL } from '../../../lib/contact';
import { upsertBrevoContact } from '../../../lib/leads';
import { escapeHtml, mailConfigured, sendMail } from '../../../lib/mail';
import { verifyRecaptcha } from '../../../lib/recaptchaServer';

const MAX_CV_BYTES = 8 * 1024 * 1024;
const ALLOWED_CV = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const requestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(req: NextRequest): boolean {
  const forwarded = req.headers.get('x-forwarded-for');
  const key = forwarded ? forwarded.split(',')[0] : 'unknown';
  const now = Date.now();
  const record = requestCounts.get(key);
  if (!record || now > record.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (record.count >= 8) return false;
  record.count++;
  return true;
}

async function uploadCvToCloudinary(
  file: File,
): Promise<{ url: string; filename: string } | undefined> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) return undefined;

  const { v2: cloudinary } = await import('cloudinary');
  cloudinary.config({ cloud_name: cloud, api_key: key, api_secret: secret });

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    resource_type: 'raw',
    folder: 'applications',
    public_id: `cv-${Date.now()}`,
  });
  return { url: result.secure_url, filename: file.name };
}

async function forwardGreenhouse(input: {
  email: string;
  name: string;
  jobId: string;
  message: string;
  cvUrl?: string;
}): Promise<void> {
  const token = process.env.GREENHOUSE_HARVEST_API_KEY?.trim();
  const greenhouseJob = process.env.GREENHOUSE_JOB_ID?.trim();
  if (!token || !greenhouseJob) return;

  const auth = Buffer.from(`${token}:`).toString('base64');
  const res = await fetch('https://harvest.greenhouse.io/v1/candidates', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      'On-Behalf-Of': process.env.GREENHOUSE_ON_BEHALF_OF ?? '0',
    },
    body: JSON.stringify({
      first_name: input.name.split(/\s+/)[0],
      last_name: input.name.split(/\s+/).slice(1).join(' ') || input.name,
      email_addresses: [{ value: input.email, type: 'personal' }],
      applications: [
        {
          job_id: Number(greenhouseJob) || input.jobId,
          notes: input.message,
        },
      ],
      website_addresses: input.cvUrl ? [{ value: input.cvUrl, type: 'other' }] : [],
    }),
  });
  if (!res.ok) {
    console.error('Greenhouse forward failed:', res.status, await res.text());
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!checkRateLimit(req)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const form = await req.formData();
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const honeypot = String(form.get('honeypot') ?? '');
    const lang = form.get('lang') === 'en' ? 'en' : 'de';
    const jobTitle = String(form.get('jobTitle') ?? '').trim();
    const jobId = String(form.get('jobId') ?? '').trim();
    const recaptchaToken = String(form.get('recaptchaToken') ?? '');
    const cv = form.get('cv');

    if (honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 10) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }
    if (!(await verifyRecaptcha(recaptchaToken || undefined))) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }
    if (!mailConfigured()) {
      return NextResponse.json(
        {
          error:
            lang === 'de'
              ? 'Der Versand ist derzeit nicht konfiguriert.'
              : 'Mail delivery is not configured.',
        },
        { status: 503 },
      );
    }

    let attachment:
      | { filename: string; content: string; contentType?: string }
      | undefined;
    let cvUrl: string | undefined;

    if (cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_CV_BYTES || (cv.type && !ALLOWED_CV.has(cv.type))) {
        return NextResponse.json(
          {
            error:
              lang === 'de'
                ? 'Bitte laden Sie ein PDF oder Word-Dokument (max. 8 MB) hoch.'
                : 'Please upload a PDF or Word document (max. 8 MB).',
          },
          { status: 400 },
        );
      }
      const uploaded = await uploadCvToCloudinary(cv).catch((err) => {
        console.error('CV Cloudinary upload failed:', err);
        return undefined;
      });
      cvUrl = uploaded?.url;
      const buffer = Buffer.from(await cv.arrayBuffer());
      attachment = {
        filename: cv.name || 'cv.pdf',
        content: buffer.toString('base64'),
        contentType: cv.type,
      };
    }

    const notifyTo = process.env.CAREERS_NOTIFY_EMAIL || CAREERS_EMAIL;
    const sent = await sendMail({
      to: notifyTo,
      replyTo: email,
      subject:
        lang === 'de'
          ? `Neue Bewerbung: ${jobTitle || 'Karriere'}`
          : `New application: ${jobTitle || 'Careers'}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 560px;">
          <h2 style="color: #0f766e;">Quantiva Advisory</h2>
          <p>${lang === 'de' ? 'Neue Bewerbung' : 'New application'}</p>
          <table cellpadding="4">
            <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
            <tr><td><b>E-Mail</b></td><td>${escapeHtml(email)}</td></tr>
            <tr><td><b>${lang === 'de' ? 'Stelle' : 'Role'}</b></td><td>${escapeHtml(jobTitle || '–')}</td></tr>
            <tr><td><b>Job-ID</b></td><td>${escapeHtml(jobId || '–')}</td></tr>
            <tr><td><b>${lang === 'de' ? 'Nachricht' : 'Message'}</b></td><td>${escapeHtml(message).replace(/\n/g, '<br/>')}</td></tr>
            ${cvUrl ? `<tr><td>CV</td><td><a href="${cvUrl}">${escapeHtml(cvUrl)}</a></td></tr>` : ''}
          </table>
        </div>
      `,
      attachments: attachment ? [attachment] : undefined,
    });

    if (!sent) {
      return NextResponse.json(
        {
          error:
            lang === 'de' ? 'Der Versand ist fehlgeschlagen.' : 'Delivery failed. Please try again.',
        },
        { status: 502 },
      );
    }

    await upsertBrevoContact({
      email,
      name,
      lang,
      source: 'application',
      list: 'applicants',
      extra: { JOB_ID: jobId, JOB_TITLE: jobTitle },
    });

    await forwardGreenhouse({ email, name, jobId, message, cvUrl }).catch((err) =>
      console.error(err),
    );

    return NextResponse.json({
      success: true,
      message:
        lang === 'de'
          ? 'Vielen Dank für Ihre Bewerbung. Wir melden uns in Kürze.'
          : 'Thank you for your application. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Job apply error:', error);
    return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
  }
}
