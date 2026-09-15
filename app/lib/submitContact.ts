import { isValidEmail } from './contact';
import { getRecaptchaToken } from './recaptchaClient';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  lang: 'de' | 'en';
  honeypot?: string;
  recaptchaToken?: string;
  jobTitle?: string;
  jobId?: string;
};

export type ContactSubmitResult = {
  ok: boolean;
  status: number;
  message?: string;
  error?: string;
};

export function validateContactClient(data: ContactPayload): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return data.lang === 'de' ? 'Bitte geben Sie Ihren Namen ein.' : 'Please enter your name.';
  }
  if (!isValidEmail(data.email)) {
    return data.lang === 'de'
      ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
      : 'Please enter a valid email address.';
  }
  if (!data.message || data.message.trim().length < 10) {
    return data.lang === 'de'
      ? 'Bitte geben Sie eine Nachricht ein (mindestens 10 Zeichen).'
      : 'Please enter a message (at least 10 characters).';
  }
  return null;
}

export async function submitContact(data: ContactPayload): Promise<ContactSubmitResult> {
  const recaptchaToken = data.recaptchaToken ?? (await getRecaptchaToken('contact'));
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, recaptchaToken }),
  });

  const body = (await response.json().catch(() => ({}))) as {
    message?: string;
    error?: string;
  };

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error:
        body.error ||
        (data.lang === 'de'
          ? 'Senden fehlgeschlagen. Bitte versuchen Sie es später erneut.'
          : 'Sending failed. Please try again later.'),
    };
  }

  return {
    ok: true,
    status: response.status,
    message: body.message,
  };
}

export async function submitApplication(
  data: ContactPayload & { cv?: File | null },
): Promise<ContactSubmitResult> {
  const recaptchaToken = data.recaptchaToken ?? (await getRecaptchaToken('apply'));
  const form = new FormData();
  form.set('name', data.name);
  form.set('email', data.email);
  form.set('message', data.message);
  form.set('lang', data.lang);
  form.set('honeypot', data.honeypot ?? '');
  form.set('recaptchaToken', recaptchaToken ?? '');
  if (data.jobTitle) form.set('jobTitle', data.jobTitle);
  if (data.jobId) form.set('jobId', data.jobId);
  if (data.cv) form.set('cv', data.cv);

  const response = await fetch('/api/jobs/apply', {
    method: 'POST',
    body: form,
  });

  const body = (await response.json().catch(() => ({}))) as {
    message?: string;
    error?: string;
  };

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error:
        body.error ||
        (data.lang === 'de'
          ? 'Senden fehlgeschlagen. Bitte versuchen Sie es später erneut.'
          : 'Sending failed. Please try again later.'),
    };
  }

  return {
    ok: true,
    status: response.status,
    message: body.message,
  };
}
