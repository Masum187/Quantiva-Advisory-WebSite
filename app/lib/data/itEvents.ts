/**
 * Wichtige IT-Events weltweit. Termine stammen von den Veranstalterseiten
 * (Stand September 2026). Teilnahme setzt ihr in eventAttendance.json
 * oder in Contentful als eventAttendance (Feld eventSlug + attending).
 */

export type EventTopic = 'ai' | 'sap' | 'cloud' | 'industry' | 'security';

export interface ItEvent {
  slug: string;
  name: string;
  start: string;
  end: string;
  city: string;
  country: string;
  url: string;
  topics: EventTopic[];
  summaryDe: string;
  summaryEn: string;
  /** Atmospheric card image (cases / project assets — not Quantiva attendance). */
  image: string;
}

export const IT_EVENTS: ItEvent[] = [
  {
    slug: 'dsag-jahreskongress-2026',
    name: 'DSAG-Jahreskongress',
    start: '2026-10-06',
    end: '2026-10-08',
    city: 'Köln',
    country: 'Deutschland',
    url: 'https://dsag.de/events/dsag-jahreskongress-2026/',
    topics: ['sap'],
    summaryDe: 'Der zentrale Kongress der deutschsprachigen SAP-Anwender.',
    summaryEn: 'The flagship congress of the German-speaking SAP user group.',
    image: '/assets/cases/btp-hero.jpg',
  },
  {
    slug: 'it-sa-2026',
    name: 'it-sa Expo & Congress',
    start: '2026-10-27',
    end: '2026-10-29',
    city: 'Nürnberg',
    country: 'Deutschland',
    url: 'https://www.itsa365.de/de-de/it-sa-expo-congress/ueber-die-messe',
    topics: ['security', 'cloud'],
    summaryDe: 'Europas Leitmesse für IT-Sicherheit.',
    summaryEn: 'Europe’s leading trade fair for IT security.',
    image: '/assets/cases/commerzbank-security-hero.jpg',
  },
  {
    slug: 'microsoft-ignite-2026',
    name: 'Microsoft Ignite',
    start: '2026-11-17',
    end: '2026-11-20',
    city: 'San Francisco',
    country: 'USA',
    url: 'https://ignite.microsoft.com/',
    topics: ['ai', 'cloud'],
    summaryDe: 'Microsofts Konferenz für Cloud, Copilot und Unternehmens-IT.',
    summaryEn: 'Microsoft’s conference for cloud, Copilot and enterprise IT.',
    image: '/assets/cases/ibm-enterprise-hero.jpg',
  },
  {
    slug: 'aws-reinvent-2026',
    name: 'AWS re:Invent',
    start: '2026-11-30',
    end: '2026-12-04',
    city: 'Las Vegas',
    country: 'USA',
    url: 'https://aws.amazon.com/events/reinvent/',
    topics: ['cloud', 'ai'],
    summaryDe: 'Die Leitkonferenz von Amazon Web Services.',
    summaryEn: 'Amazon Web Services’ flagship conference.',
    image: '/assets/cases/amazon-aws-hero.jpg',
  },
  {
    slug: 'hannover-messe-2027',
    name: 'Hannover Messe',
    start: '2027-04-05',
    end: '2027-04-08',
    city: 'Hannover',
    country: 'Deutschland',
    url: 'https://www.hannovermesse.de/de/hannover-messe-2027/',
    topics: ['industry', 'ai'],
    summaryDe: 'Weltleitmesse der Industrie — von Fertigung bis industrieller KI.',
    summaryEn: 'The world’s leading industrial fair, from manufacturing to industrial AI.',
    image: '/assets/cases/bmw-manufacturing-hero.jpg',
  },
  {
    slug: 'google-cloud-next-2027',
    name: 'Google Cloud Next',
    start: '2027-04-13',
    end: '2027-04-15',
    city: 'Las Vegas',
    country: 'USA',
    url: 'https://cloud.google.com/next',
    topics: ['cloud', 'ai'],
    summaryDe: 'Googles Konferenz für Cloud, Daten und generative KI.',
    summaryEn: 'Google’s conference for cloud, data and generative AI.',
    image: '/assets/cases/schwarz-it-cloud-hero.jpg',
  },
  {
    slug: 'sap-sapphire-orlando-2027',
    name: 'SAP Sapphire Orlando',
    start: '2027-05-24',
    end: '2027-05-26',
    city: 'Orlando',
    country: 'USA',
    url: 'https://www.sap.com/events.html',
    topics: ['sap', 'ai'],
    summaryDe: 'SAPs Flaggschiff-Event, zusammen mit der ASUG Annual Conference.',
    summaryEn: 'SAP’s flagship event, alongside the ASUG Annual Conference.',
    image: '/assets/cases/btp-delivery-hero.jpg',
  },
  {
    slug: 'sap-sapphire-barcelona-2027',
    name: 'SAP Sapphire Barcelona',
    start: '2027-06-01',
    end: '2027-06-03',
    city: 'Barcelona',
    country: 'Spanien',
    url: 'https://www.sap.com/events.html',
    topics: ['sap', 'ai'],
    summaryDe: 'Sapphire für Europa — Enterprise-Technologie aus europäischer Sicht.',
    summaryEn: 'Sapphire for Europe — enterprise technology from a European perspective.',
    image: '/assets/cases/pwc-consulting-hero.jpg',
  },
];
