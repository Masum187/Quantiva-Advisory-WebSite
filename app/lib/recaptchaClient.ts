const SCRIPT_ATTR = 'data-recaptcha';

export function getRecaptchaSiteKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return key && key.length > 0 ? key : undefined;
}

export function ensureRecaptchaScript(): void {
  const siteKey = getRecaptchaSiteKey();
  if (!siteKey || typeof document === 'undefined') return;
  if (document.querySelector(`script[${SCRIPT_ATTR}]`)) return;

  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
  script.async = true;
  script.defer = true;
  script.setAttribute(SCRIPT_ATTR, 'true');
  document.head.appendChild(script);
}

function waitForGrecaptcha(timeoutMs = 8000): Promise<NonNullable<Window['grecaptcha']> | undefined> {
  if (typeof window === 'undefined') return Promise.resolve(undefined);
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);

  return new Promise((resolve) => {
    const started = Date.now();
    const tick = () => {
      if (window.grecaptcha) {
        resolve(window.grecaptcha);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        resolve(undefined);
        return;
      }
      window.setTimeout(tick, 50);
    };
    tick();
  });
}

export async function getRecaptchaToken(action = 'contact'): Promise<string | undefined> {
  const siteKey = getRecaptchaSiteKey();
  if (!siteKey || typeof window === 'undefined') return undefined;

  ensureRecaptchaScript();
  const grecaptcha = await waitForGrecaptcha();
  if (!grecaptcha) return undefined;

  try {
    await new Promise<void>((resolve) => {
      grecaptcha.ready(() => resolve());
    });
    return await grecaptcha.execute(siteKey, { action });
  } catch (error) {
    console.error('reCAPTCHA token error:', error);
    return undefined;
  }
}
