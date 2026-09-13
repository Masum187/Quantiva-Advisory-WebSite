import type { Metadata } from 'next';

export const SITE_URL = 'https://quantivaadvisory.com';
export const SITE_NAME = 'Quantiva Advisory';
export const OG_DEFAULT = '/assets/og/og-default.jpg';
export const OG_CASES = '/assets/og/og-cases.jpg';

export type SiteLang = 'de' | 'en';

export type PageMetaInput = {
  title: string;
  description: string;
  /** Path without locale prefix, e.g. `/career` or `/`. */
  path: string;
  lang: SiteLang;
  image?: string;
};

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function localePath(lang: SiteLang, path: string): string {
  if (path === '/' || path === '') return `/${lang}`;
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${suffix}`;
}

export function brandedTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function localeFromHtmlLangHeader(value: string | null): SiteLang {
  return value === 'en' ? 'en' : 'de';
}

export function pageMeta({
  title,
  description,
  path,
  lang,
  image,
}: PageMetaInput): Metadata {
  const fullTitle = brandedTitle(title);
  const localized = localePath(lang, path);
  const dePath = localePath('de', path);
  const enPath = localePath('en', path);
  const ogImage = image ?? OG_DEFAULT;
  const imageUrl = absoluteUrl(ogImage);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: localized,
      languages: {
        'de-DE': dePath,
        en: enPath,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: localized,
      siteName: SITE_NAME,
      locale: lang === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: lang === 'de' ? ['en_US'] : ['de_DE'],
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

type Copy = { title: string; description: string };

const SERVICE_COPY: Record<string, Record<SiteLang, Copy>> = {
  ai: {
    de: {
      title: 'AI & Machine Learning',
      description:
        'End-to-End KI-Beratung: Use Case Discovery, Guardrails & Compliance, MLOps und GenAI – von der Idee bis zur Produktion.',
    },
    en: {
      title: 'AI & Machine Learning',
      description:
        'End-to-end AI consulting: use case discovery, guardrails and compliance, MLOps and GenAI – from concept to production.',
    },
  },
  cloud: {
    de: {
      title: 'Cloud Solutions',
      description:
        'Multi-Cloud-Strategien für AWS, Azure und GCP: Landing Zones, Migration, FinOps und ein skalierbares Operating Model.',
    },
    en: {
      title: 'Cloud Solutions',
      description:
        'Multi-cloud strategies for AWS, Azure and GCP: landing zones, migration, FinOps and a scalable operating model.',
    },
  },
  'cyber-security': {
    de: {
      title: 'Cyber Security',
      description:
        'Ganzheitliche Sicherheitskonzepte, Zero Trust, SOC-Modernisierung und ISO-27001-Programme für belastbare IT-Landschaften.',
    },
    en: {
      title: 'Cyber Security',
      description:
        'Holistic security concepts, zero trust, SOC modernisation and ISO 27001 programmes for resilient IT landscapes.',
    },
  },
  'digital-strategy': {
    de: {
      title: 'Digitale Strategie & Enablement',
      description:
        'Workshops, Schulungen und Know-how-Transfer: Wir befähigen Teams, digitale Transformation nachhaltig selbst zu gestalten.',
    },
    en: {
      title: 'Digital Strategy & Enablement',
      description:
        'Workshops, training and knowledge transfer: we enable teams to own digital transformation for the long term.',
    },
  },
  microservices: {
    de: {
      title: 'Microservices & Systemintegration',
      description:
        'API-First-Architekturen, Microservices und nahtlose Systemintegration für skalierbare, wartbare IT-Landschaften.',
    },
    en: {
      title: 'Microservices & System Integration',
      description:
        'API-first architectures, microservices and seamless system integration for scalable, maintainable IT landscapes.',
    },
  },
  'new-work': {
    de: {
      title: 'New Work',
      description:
        'Digitaler Arbeitsplatz, Collaboration und neue Arbeitskultur: Agilität und Zusammenarbeit in Ihrem Unternehmen freisetzen.',
    },
    en: {
      title: 'New Work',
      description:
        'Digital workplace, collaboration and a new working culture: unlock agility and teamwork across your organisation.',
    },
  },
  sap: {
    de: {
      title: 'SAP Services',
      description:
        'End-to-End SAP-Beratung für S/4HANA, BTP, Cloud ALM, Joule und Fiori UX – Transformation mit messbarem Ergebnis.',
    },
    en: {
      title: 'SAP Services',
      description:
        'End-to-end SAP consulting for S/4HANA, BTP, Cloud ALM, Joule and Fiori UX – transformation with measurable outcomes.',
    },
  },
  'erp-crm': {
    de: {
      title: 'ERP & CRM Services',
      description:
        'Enterprise Resource Planning und CRM für den Mittelstand: SAP S/4HANA, Microsoft Dynamics und Salesforce.',
    },
    en: {
      title: 'ERP & CRM Services',
      description:
        'Enterprise resource planning and CRM for mid-market organisations: SAP S/4HANA, Microsoft Dynamics and Salesforce.',
    },
  },
  sustainability: {
    de: {
      title: 'Sustainability Consulting',
      description:
        'Nachhaltige Transformation für zukunftsfähige Unternehmen: ESG-Strategie, CO₂-Bilanzierung und CSRD-Reporting.',
    },
    en: {
      title: 'Sustainability Consulting',
      description:
        'Sustainable transformation for future-ready companies: ESG strategy, carbon accounting and CSRD reporting.',
    },
  },
  'change-management': {
    de: {
      title: 'Change Management & Training',
      description:
        'Change Management und Training für erfolgreiche Transformationen: Menschen befähigen, Veränderungen gestalten.',
    },
    en: {
      title: 'Change Management & Training',
      description:
        'Change management and training for successful transformations: empower people, shape change.',
    },
  },
  'test-automation': {
    de: {
      title: 'Testautomatisierung',
      description:
        'Intelligente Testautomatisierung für belastbare Software: CI/CD-Integration, Performance- und Security-Testing.',
    },
    en: {
      title: 'Test Automation',
      description:
        'Intelligent test automation for reliable software: CI/CD integration, performance testing and security testing.',
    },
  },
};

export function servicePageMeta(lang: SiteLang, slug: string): Metadata {
  const copy = SERVICE_COPY[slug]?.[lang];
  if (!copy) {
    return pageMeta({
      title: SITE_NAME,
      description:
        lang === 'de'
          ? 'Professionelle Beratung für SAP, Cloud, AI, Integration und Cyber Security.'
          : 'Professional consulting for SAP, Cloud, AI, Integration and Cyber Security.',
      path: `/services/${slug}`,
      lang,
    });
  }
  return pageMeta({
    title: copy.title,
    description: copy.description,
    path: `/services/${slug}`,
    lang,
  });
}

export function serviceTitle(lang: SiteLang, slug: string): string {
  return SERVICE_COPY[slug]?.[lang]?.title ?? slug;
}

export const ORGANIZATION_SAME_AS = [
  'https://linkedin.com/company/quantiva',
  'https://twitter.com/quantiva',
  'https://github.com/quantiva',
] as const;

export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(OG_DEFAULT),
    sameAs: [...ORGANIZATION_SAME_AS],
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbListJsonLd(lang: SiteLang, items: BreadcrumbItem[]): Record<string, unknown> {
  const crumbs: BreadcrumbItem[] = [{ name: lang === 'de' ? 'Start' : 'Home', path: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(lang, item.path)),
    })),
  };
}

export type JobPostingInput = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  employmentType: string;
  remote?: boolean;
  location?: string;
};

export function jobPostingJsonLd(job: JobPostingInput, lang: SiteLang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.publishedAt,
    employmentType: job.employmentType,
    jobLocationType: job.remote ? 'TELECOMMUTE' : 'ON_SITE',
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocation: job.location
      ? {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: job.location,
            addressCountry: 'DE',
          },
        }
      : undefined,
    applicantLocationRequirements: job.remote
      ? {
          '@type': 'Country',
          name: 'Germany',
        }
      : undefined,
    identifier: {
      '@type': 'PropertyValue',
      name: SITE_NAME,
      value: job.id,
    },
    url: `${SITE_URL}${localePath(lang, '/career')}#${job.id}`,
  };
}

export function articleJsonLd(input: {
  title: string;
  excerpt?: string;
  publishedAt?: string;
  author?: string;
  image?: string | null;
  tags?: string[];
  url: string;
  lang: SiteLang;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.excerpt,
    datePublished: input.publishedAt,
    author: input.author ? [{ '@type': 'Person', name: input.author }] : undefined,
    image: input.image || undefined,
    url: input.url,
    keywords: input.tags?.join(', '),
    inLanguage: input.lang === 'de' ? 'de-DE' : 'en-US',
  };
}

export function servicesBreadcrumb(lang: SiteLang, slug: string): BreadcrumbItem[] {
  return [
    { name: 'Services', path: '/#services' },
    { name: serviceTitle(lang, slug), path: `/services/${slug}` },
  ];
}

export function careerBreadcrumb(lang: SiteLang): BreadcrumbItem[] {
  return [{ name: lang === 'de' ? 'Karriere' : 'Careers', path: '/career' }];
}

export function careerChildBreadcrumb(lang: SiteLang, name: string, path: string): BreadcrumbItem[] {
  return [...careerBreadcrumb(lang), { name, path }];
}
