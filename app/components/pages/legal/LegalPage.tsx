import Link from 'next/link';
import SiteNav from '../../SiteNav';
import ConsentSettingsLink from '../../ConsentSettingsLink';
import { CONTACT_EMAIL, SITE_DOMAIN } from '../../../lib/contact';
import type { SiteLang } from '../../../lib/seo';

export type LegalKind = 'imprint' | 'privacy';

// TODO: Ergänzen, sobald amtlich vorliegend — nicht erfinden:
// - ladungsfähige Anschrift
// - vertretungsberechtigte Person
// - Handelsregister (Gericht + HRB)
// - USt-IdNr.

const COPY: Record<
  SiteLang,
  Record<
    LegalKind,
    {
      kicker: string;
      title: string;
      updated: string;
      sections: { heading: string; paragraphs: string[] }[];
    }
  >
> = {
  de: {
    imprint: {
      kicker: 'Rechtliches',
      title: 'Impressum',
      updated: 'Stand: September 2026',
      sections: [
        {
          heading: 'Angaben gemäß § 5 DDG',
          paragraphs: [
            'Quantiva Advisory',
            `Website: https://${SITE_DOMAIN}`,
            `E-Mail: ${CONTACT_EMAIL}`,
            'Ladungsfähige Anschrift: Kontakt erfolgt derzeit elektronisch über die oben genannte E-Mail-Adresse. Die Anschrift wird veröffentlicht, sobald sie feststeht.',
          ],
        },
        {
          heading: 'Kontakt',
          paragraphs: [
            `Elektronische Kontaktaufnahme: ${CONTACT_EMAIL}. Eine Telefonnummer nennen wir auf Anfrage.`,
          ],
        },
        {
          heading: 'Weitere Pflichtangaben nach § 5 DDG',
          paragraphs: [
            'Vertretung, Handelsregister (Gericht und Nummer) und Umsatzsteuer-Identifikationsnummer sind noch nicht veröffentlicht. Es werden keine Register-, Steuer- oder Adressdaten vorweggenommen.',
          ],
        },
        {
          heading: 'Haftung für Inhalte und Links',
          paragraphs: [
            'Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Für Inhalte verlinkter externer Websites übernehmen wir keine Gewähr. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.',
          ],
        },
        {
          heading: 'Urheberrecht',
          paragraphs: [
            'Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der gesetzlichen Schranken bedürfen der schriftlichen Zustimmung von Quantiva Advisory.',
          ],
        },
      ],
    },
    privacy: {
      kicker: 'Rechtliches',
      title: 'Datenschutzerklärung',
      updated: 'Stand: September 2026',
      sections: [
        {
          heading: 'Verantwortliche Stelle',
          paragraphs: [
            `Verantwortlich für die Datenverarbeitung auf dieser Website ist Quantiva Advisory, erreichbar unter ${CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'Diese Website wird bei Vercel betrieben. Beim Aufruf werden technisch notwendige Server-Logs (z. B. IP-Adresse, Zeitpunkt, aufgerufene URL) verarbeitet, soweit dies für die Auslieferung und Sicherheit der Website erforderlich ist.',
          ],
        },
        {
          heading: 'Kontakt- und Bewerbungsformulare',
          paragraphs: [
            'Wenn Sie uns über ein Formular schreiben, verarbeiten wir Name, E-Mail-Adresse, Nachricht und – bei Bewerbungen – den Stellenbezug, um Ihre Anfrage zu beantworten. Der Versand erfolgt über Brevo und/oder Resend. Ohne diese Angaben können wir die Anfrage nicht bearbeiten. Zum Schutz vor Missbrauch setzen wir Google reCAPTCHA (v3) ein; dabei werden Daten an Google übermittelt.',
          ],
        },
        {
          heading: 'Whitepaper-Anfragen',
          paragraphs: [
            'Bei der Anforderung eines Whitepapers verarbeiten wir Vor- und Nachname, geschäftliche E-Mail, Unternehmen und optional Telefon, um den Download-Link zuzusenden und die Anfrage intern zuzuordnen. Der Versand erfolgt über Brevo und/oder Resend. Die PDF-Datei selbst wird über Cloudinary ausgeliefert.',
          ],
        },
        {
          heading: 'Analytics (nur nach Einwilligung)',
          paragraphs: [
            'Vercel Analytics und Vercel Speed Insights werden ausschließlich nach Ihrer ausdrücklichen Einwilligung geladen. Ohne Zustimmung wird kein Tracking-Skript eingebunden. Widerrufen Sie eine zuvor erteilte Einwilligung, wird die Seite neu geladen, damit bereits geladene Tracking-Skripte vollständig entfernt werden. Der Widerruf gilt mit dem Speichern und nach dem Neuladen. Sie können Ihre Wahl jederzeit über den Banner oder den Link „Cookie-Einstellungen“ auf dieser Seite ändern.',
          ],
        },
        {
          heading: 'Termine (Calendly)',
          paragraphs: [
            'Wenn Sie einen Termin über das eingebettete Calendly-Widget buchen, gelten zusätzlich die Datenschutzhinweise von Calendly. Es werden die für die Terminvereinbarung erforderlichen Daten an Calendly übermittelt.',
          ],
        },
        {
          heading: 'Medien und Dateien (Cloudinary)',
          paragraphs: [
            'Bilder, Videos und Whitepaper-PDFs werden über Cloudinary ausgeliefert. Beim Abruf dieser Dateien verarbeitet Cloudinary technisch notwendige Verbindungsdaten (z. B. IP-Adresse), um die Inhalte bereitzustellen.',
          ],
        },
        {
          heading: 'Ihre Rechte',
          paragraphs: [
            'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Beschwerden können Sie an eine Datenschutzaufsichtsbehörde richten.',
            `Anfragen zum Datenschutz senden Sie an ${CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
  },
  en: {
    imprint: {
      kicker: 'Legal',
      title: 'Imprint',
      updated: 'Last updated: September 2026',
      sections: [
        {
          heading: 'Information according to § 5 DDG',
          paragraphs: [
            'Quantiva Advisory',
            `Website: https://${SITE_DOMAIN}`,
            `Email: ${CONTACT_EMAIL}`,
            'Service address: contact is currently electronic via the email above. The postal address will be published once it is confirmed.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            `Electronic contact: ${CONTACT_EMAIL}. A phone number is available on request.`,
          ],
        },
        {
          heading: 'Further details required by § 5 DDG',
          paragraphs: [
            'Authorised representative, commercial register (court and number) and VAT identification number are not published yet. No register, tax or address data is assumed in advance.',
          ],
        },
        {
          heading: 'Liability for content and links',
          paragraphs: [
            'We are responsible for our own content on these pages under general law. We do not accept liability for content on external websites we link to. Operators of those sites are solely responsible for their content.',
          ],
        },
        {
          heading: 'Copyright',
          paragraphs: [
            'Content and works published on this website are protected by German copyright law. Reproduction, adaptation or distribution beyond statutory limits requires written consent from Quantiva Advisory.',
          ],
        },
      ],
    },
    privacy: {
      kicker: 'Legal',
      title: 'Privacy Policy',
      updated: 'Last updated: September 2026',
      sections: [
        {
          heading: 'Controller',
          paragraphs: [
            `The controller for data processing on this website is Quantiva Advisory, reachable at ${CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'This website is hosted by Vercel. Technical server logs (for example IP address, time, requested URL) are processed as required to deliver and secure the site.',
          ],
        },
        {
          heading: 'Contact and application forms',
          paragraphs: [
            'If you write to us via a form, we process your name, email address, message and — for applications — the related role, so we can respond. Delivery uses Brevo and/or Resend. We cannot process the request without this information. To prevent abuse we use Google reCAPTCHA (v3); this transmits data to Google.',
          ],
        },
        {
          heading: 'Whitepaper requests',
          paragraphs: [
            'When you request a whitepaper we process first and last name, business email, company and optionally phone in order to send the download link and assign the lead internally. Delivery uses Brevo and/or Resend. The PDF itself is served via Cloudinary.',
          ],
        },
        {
          heading: 'Analytics (opt-in only)',
          paragraphs: [
            'Vercel Analytics and Vercel Speed Insights load only after your explicit consent. No tracking script is embedded beforehand. If you withdraw a previous consent, the page reloads so already injected tracking scripts are fully removed. Withdrawal takes effect on save and after reload. You can change your choice at any time via the banner or the “Open cookie settings” link on this page.',
          ],
        },
        {
          heading: 'Meetings (Calendly)',
          paragraphs: [
            'If you book a meeting through the embedded Calendly widget, Calendly’s privacy notice also applies. Data required to schedule the meeting is transmitted to Calendly.',
          ],
        },
        {
          heading: 'Media and files (Cloudinary)',
          paragraphs: [
            'Images, videos and whitepaper PDFs are delivered via Cloudinary. When those files are requested, Cloudinary processes technically necessary connection data (for example IP address) to serve the content.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'You have the right to access, rectification, erasure, restriction of processing, data portability and objection. You may lodge a complaint with a data protection supervisory authority.',
            `Privacy requests: ${CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
  },
};

export default function LegalPage({ lang, kind }: { lang: SiteLang; kind: LegalKind }) {
  const copy = COPY[lang][kind];
  const homeHref = `/${lang}`;
  const otherHref =
    kind === 'imprint'
      ? lang === 'de'
        ? '/de/datenschutz'
        : '/en/privacy'
      : lang === 'de'
        ? '/de/impressum'
        : '/en/imprint';
  const otherLabel =
    kind === 'imprint'
      ? lang === 'de'
        ? 'Datenschutz'
        : 'Privacy'
      : lang === 'de'
        ? 'Impressum'
        : 'Imprint';

  return (
    <div className="min-h-screen bg-[#04060b] text-white">
      <SiteNav lang={lang} variant="solid" />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-16">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-teal-300">{copy.kicker}</p>
        <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.8rem)] font-light tracking-tight">{copy.title}</h1>
        <p className="mt-3 text-sm text-gray-500">{copy.updated}</p>

        <div className="mt-12 space-y-12">
          {copy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-light text-white">{section.heading}</h2>
              <span aria-hidden="true" className="mt-3 block h-px w-10 bg-teal-400" />
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-sm font-light leading-relaxed text-gray-300">
                  {paragraph}
                </p>
              ))}
              {kind === 'privacy' && section.heading.toLowerCase().includes('analytics') ? (
                <ConsentSettingsLink lang={lang} />
              ) : null}
            </section>
          ))}
        </div>

        <nav className="mt-16 flex flex-wrap gap-6 border-t border-white/10 pt-8 text-sm text-gray-400">
          <Link href={homeHref} className="transition hover:text-teal-300">
            {lang === 'de' ? 'Zur Startseite' : 'Back to home'}
          </Link>
          <Link href={otherHref} className="transition hover:text-teal-300">
            {otherLabel}
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-teal-300">
            {CONTACT_EMAIL}
          </a>
        </nav>
      </article>
    </div>
  );
}
