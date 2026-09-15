import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { upsertBrevoContact } from '../../../lib/leads';

function verifySignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(',').map((part) => {
      const [key, ...rest] = part.split('=');
      return [key.trim(), rest.join('=').trim()];
    }),
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const digest = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
  const a = Buffer.from(digest);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

type CalendlyPayload = {
  event?: string;
  payload?: {
    email?: string;
    name?: string;
    timezone?: string;
    scheduled_event?: {
      name?: string;
      start_time?: string;
      end_time?: string;
    };
    cancel_url?: string;
  };
};

export async function POST(req: NextRequest) {
  const secret = process.env.CALENDLY_WEBHOOK_SIGNING_KEY?.trim();
  const rawBody = await req.text();

  if (secret) {
    const header = req.headers.get('calendly-webhook-signature');
    if (!verifySignature(rawBody, header, secret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 });
  }

  let body: CalendlyPayload;
  try {
    body = JSON.parse(rawBody) as CalendlyPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const event = body.event ?? '';
  const invitee = body.payload;
  const email = invitee?.email;

  if (!email || !event.startsWith('invitee.')) {
    return NextResponse.json({ ok: true });
  }

  const meetingName = invitee.scheduled_event?.name ?? 'Calendly';
  const start = invitee.scheduled_event?.start_time ?? '';
  const status = event === 'invitee.canceled' ? 'CANCELED' : 'BOOKED';

  await upsertBrevoContact({
    email,
    name: invitee.name,
    source: 'meeting',
    list: 'leads',
    extra: {
      MEETING_TYPE: meetingName,
      MEETING_START: start,
      MEETING_STATUS: status,
    },
  });

  return NextResponse.json({ ok: true });
}
