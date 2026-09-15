export type LeadSource = 'whitepaper' | 'contact' | 'meeting' | 'application';
export type LeadList = 'leads' | 'applicants';

export type LeadInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  company?: string;
  phone?: string;
  lang?: 'de' | 'en';
  source: LeadSource;
  list?: LeadList;
  extra?: Record<string, string | undefined>;
};

function splitName(name?: string): { firstName?: string; lastName?: string } {
  if (!name?.trim()) return {};
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

function listId(list: LeadList): number | undefined {
  const raw =
    list === 'applicants' ? process.env.BREVO_LIST_APPLICANTS : process.env.BREVO_LIST_LEADS;
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** Upsert a Brevo contact. Never throws; missing key is a no-op. */
export async function upsertBrevoContact(lead: LeadInput): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey || !lead.email) return false;

  const fromName = splitName(lead.name);
  const firstName = lead.firstName || fromName.firstName;
  const lastName = lead.lastName || fromName.lastName;
  const list = lead.list ?? (lead.source === 'application' ? 'applicants' : 'leads');
  const id = listId(list);

  const attributes: Record<string, string> = {};
  if (firstName) attributes.FIRSTNAME = firstName;
  if (lastName) attributes.LASTNAME = lastName;
  if (lead.company) attributes.COMPANY = lead.company;
  if (lead.phone) attributes.SMS = lead.phone.replace(/[^\d+]/g, '');
  attributes.LANG = lead.lang === 'en' ? 'EN' : 'DE';
  attributes.SOURCE = lead.source.toUpperCase();
  if (lead.extra) {
    for (const [key, value] of Object.entries(lead.extra)) {
      if (value) attributes[key] = value;
    }
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: lead.email,
        updateEnabled: true,
        attributes,
        ...(id ? { listIds: [id] } : {}),
      }),
    });

    if (!res.ok && res.status !== 204) {
      console.error('Brevo contact upsert failed:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('Brevo contact upsert error:', error);
    return false;
  }
}
