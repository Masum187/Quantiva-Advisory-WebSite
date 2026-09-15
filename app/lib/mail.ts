/**
 * Shared transactional mail via Brevo (preferred) or Resend.
 * Configure ONE provider plus MAIL_FROM. Never treat a missing key as success.
 */

export function mailConfigured(): boolean {
  return Boolean(
    (process.env.BREVO_API_KEY || process.env.RESEND_API_KEY) && process.env.MAIL_FROM,
  );
}

function parseSender(from: string): { name: string; email: string } {
  const match = from.match(/^(.*)<([^>]+)>\s*$/);
  if (match) {
    return { name: match[1].trim().replace(/^"|"$/g, ''), email: match[2].trim() };
  }
  return { name: 'Quantiva Advisory', email: from.trim() };
}

export type MailAttachment = {
  filename: string;
  content: string;
  contentType?: string;
};

export async function sendMail(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}): Promise<boolean> {
  const from = process.env.MAIL_FROM;
  if (!from) return false;

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
        ...(payload.attachments?.length
          ? {
              attachment: payload.attachments.map((file) => ({
                name: file.filename,
                content: file.content,
              })),
            }
          : {}),
      }),
    });

    if (!res.ok) {
      console.error('Brevo error:', res.status, await res.text());
      return false;
    }
    return true;
  }

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
        ...(payload.attachments?.length
          ? {
              attachments: payload.attachments.map((file) => ({
                filename: file.filename,
                content: file.content,
              })),
            }
          : {}),
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

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
