import type { SupportedLanguage } from '../utils/contentHub';

export type IndustryCaseStudy = {
  client: string;
  headline: string;
  impact: string;
  description: string;
};

export type IndustryStat = {
  label: string;
  value: string;
};

export type IndustryCapability = {
  title: string;
  description: string;
};

export type IndustryContact = {
  name: string;
  role: string;
  image: string;
  email: string;
  phone?: string;
};

export type IndustryDetail = {
  slug: string;
  language: SupportedLanguage;
  name: string;
  hero: {
    title: string;
    subtitle: string;
    badge: string;
  };
  overview: {
    introduction: string;
    focusAreas: IndustryCapability[];
  };
  stats: IndustryStat[];
  technologies: string[];
  capabilities: IndustryCapability[];
  caseStudies: IndustryCaseStudy[];
  contact: IndustryContact;
};

export const industryDetails: IndustryDetail[] = [
  {
    slug: 'manufacturing',
    language: 'de',
    name: 'Manufacturing & Industrie 4.0',
    hero: {
      title: 'Digitale Fertigung für den Mittelstand',
      subtitle: 'Vom Shopfloor bis zum Boardroom: Wir vernetzen Prozesse, Daten und Menschen in Ihrer Produktion.',
      badge: 'Industry 4.0',
    },
    overview: {
      introduction:
        'Wir begleiten Maschinenbau, Automotive-Zulieferer und Prozessfertiger auf ihrem Weg zu resilienten, datengesteuerten Fabriken. Fokus: End-to-End-Transparenz, automatisierte Qualitätskontrollen und skalierbare Shopfloor-IT.',
      focusAreas: [
        { title: 'Smart Factory Enablement', description: 'Digitale Zwillinge, Edge-Anwendungen und KI-gestützte Qualitätskontrolle.' },
        { title: 'Supply-Chain-Resilience', description: 'Planung, S&OP und automatisierte Disposition über alle Wertschöpfungspartner hinweg.' },
        { title: 'Workforce Augmentation', description: 'Connected Worker Plattformen, AR-gestützte Wartung und Skill-Mapping.' },
      ],
    },
    stats: [
      { label: 'Produktivität', value: '+24 % OEE in 12 Monaten' },
      { label: 'Automatisierung', value: '35 automatisierte Prüfstationen' },
      { label: 'Time-to-Insight', value: '< 15 Minuten Shopfloor Reporting' },
    ],
    technologies: ['SAP Digital Manufacturing', 'Microsoft Azure IoT', 'PTC ThingWorx', 'IGNION Edge', 'Snowflake', 'UiPath'],
    capabilities: [
      { title: 'Operational Excellence', description: 'Von Lean-Analysen über MES-Rollouts bis zu IoT-Sensorik.' },
      { title: 'Adaptive Planning', description: 'KI-basierte Bedarfsprognosen und automatisierte Kapazitätsplanung.' },
      { title: 'Sustainability Reporting', description: 'CO₂-Tracking auf Maschinenebene, Energieoptimierung und Compliance.' },
    ],
    caseStudies: [
      {
        client: 'Liebherr Components',
        headline: 'Predictive Quality für die Fräsfertigung',
        impact: 'Fehlerquote um 37 % reduziert, Nacharbeit -21 %',
        description: 'KI-basierte Auswertung von Prozessparametern mit Echtzeitrückmeldung an Maschinenführer:innen und integrierter SPC.',
      },
      {
        client: 'BMW Group',
        headline: 'Digitale Shopfloor Assistenz',
        impact: '35 Werke mit Edge-Infrastruktur ausgestattet',
        description: 'Einheitliche Plattform für Werkerführung, Maintenance und Materialtracking – integriert in SAP EWM und MES.',
      },
    ],
    contact: {
      name: 'Dr. Michael Weber',
      role: 'Industry Lead Manufacturing',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop',
      email: 'm.weber@quantivaadvisory.com',
      phone: undefined,
    },
  },
  {
    slug: 'manufacturing',
    language: 'en',
    name: 'Manufacturing & Industry 4.0',
    hero: {
      title: 'Digital Manufacturing for Mid-Market Champions',
      subtitle: 'From shop floor to board room: We connect processes, data and people in your production network.',
      badge: 'Industry 4.0',
    },
    overview: {
      introduction:
        'We guide machinery, automotive suppliers and process manufacturers on their journey to resilient, data-driven factories. Focus: end-to-end transparency, automated quality control and scalable shopfloor IT landscapes.',
      focusAreas: [
        { title: 'Smart Factory Enablement', description: 'Digital twins, edge automation and AI-driven quality inspections.' },
        { title: 'Supply Chain Resilience', description: 'Planning, S&OP and automated replenishment across all partners.' },
        { title: 'Workforce Augmentation', description: 'Connected worker platforms, AR-guided maintenance and skill mapping.' },
      ],
    },
    stats: [
      { label: 'Productivity', value: '+24 % OEE within 12 months' },
      { label: 'Automation', value: '35 automated inspection stations' },
      { label: 'Time-to-Insight', value: '< 15 min shopfloor reporting' },
    ],
    technologies: ['SAP Digital Manufacturing', 'Microsoft Azure IoT', 'PTC ThingWorx', 'IGNION Edge', 'Snowflake', 'UiPath'],
    capabilities: [
      { title: 'Operational Excellence', description: 'From lean assessments to MES rollouts and IoT sensor integration.' },
      { title: 'Adaptive Planning', description: 'AI-based demand forecasts and automated capacity planning.' },
      { title: 'Sustainability Reporting', description: 'Machine-level CO₂ tracking, energy optimisation and compliance.' },
    ],
    caseStudies: [
      {
        client: 'Liebherr Components',
        headline: 'Predictive Quality in Milling Operations',
        impact: 'Scrap reduced by 37 %, rework -21 %',
        description: 'AI-based process parameter analytics with real-time feedback to operators and integrated SPC workflows.',
      },
      {
        client: 'BMW Group',
        headline: 'Digital Shopfloor Assistance',
        impact: 'Edge infrastructure deployed to 35 plants',
        description: 'Unified platform for worker guidance, maintenance and material tracking integrated with SAP EWM and MES.',
      },
    ],
    contact: {
      name: 'Dr. Michael Weber',
      role: 'Industry Lead Manufacturing',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop',
      email: 'michael.weber@quantivaadvisory.com',
      phone: undefined,
    },
  },
  {
    slug: 'financial-services',
    language: 'de',
    name: 'Finanzdienstleistungen',
    hero: {
      title: 'Regulatorisch robust. Digital skalierbar.',
      subtitle: 'Von Kernbankensystemen über digitale Vertriebskanäle bis zu RegTech – wir modernisieren Finanzhäuser mit Geschwindigkeit und Compliance.',
      badge: 'Financial Services',
    },
    overview: {
      introduction:
        'Wir unterstützen Banken, Versicherer und FinTechs beim Aufbau moderner Plattformen. Schwerpunkt: Cloud-Transformation, KI-gestützte Risikoanalysen und digitale Kundenerlebnisse.',
      focusAreas: [
        { title: 'Core Modernisation', description: 'SAP Fioneer, Mambu, Thought Machine – Migration und Integration ohne Betriebsunterbrechung.' },
        { title: 'RegTech & Compliance', description: 'Automatisierte Meldewesenprozesse, Echtzeit AML und ESG-konformes Reporting.' },
        { title: 'Digital Customer Journeys', description: 'Omnichannel-Banking, Embedded Finance und personalisierte Produkte.' },
      ],
    },
    stats: [
      { label: 'Time-to-Market', value: '-40 % Launch-Zeit für neue Produkte' },
      { label: 'Compliance', value: '100 % automatisierte Meldungen (BaFin/ECB)' },
      { label: 'Customer NPS', value: '+18 Punkte innerhalb von 9 Monaten' },
    ],
    technologies: ['SAP Fioneer', 'Mambu', 'Azure Financial Services Cloud', 'Snowflake', 'Databricks', 'SAS Viya'],
    capabilities: [
      { title: 'Cloud Banking Platforms', description: 'Zielarchitekturen, Migration und Betrieb hybrider Plattformen.' },
      { title: 'Risk & Compliance Automation', description: 'KI-gestützte Risikoanalysen, AML-Workflows und ESG-Scoring.' },
      { title: 'Digital Sales Enablement', description: 'Self-Service-Plattformen, Robo Advisory und API-basierte Partner-Ökosysteme.' },
    ],
    caseStudies: [
      {
        client: 'DZ BANK',
        headline: 'Cloud Data Mesh für Marktdaten',
        impact: '80 % schnellere Bereitstellung regulatorischer Reports',
        description: 'Implementierung eines Data Mesh inkl. automatisierter Data Lineage und Audit Trails auf Snowflake.',
      },
      {
        client: 'Hamburger Sparkasse',
        headline: 'Omnichannel-Transformation Retail Banking',
        impact: '+22 % digitaler Produktabschluss in Q1',
        description: 'Neues Mobile- und Web-Banking mit API-Gateway, Personalisation Engine und Echtzeit-Insights.',
      },
    ],
    contact: {
      name: 'Gülnur Patan',
      role: 'Partnerin Financial Services',
      image: 'https://res.cloudinary.com/dbrisux8i/image/upload/v1760346416/image3_l0nj0f.jpg',
      email: 'g.patan@quantivaadvisory.com',
      phone: undefined,
    },
  },
  {
    slug: 'financial-services',
    language: 'en',
    name: 'Financial Services',
    hero: {
      title: 'Regulatory Resilient. Digitally Scalable.',
      subtitle: 'From core banking modernisation to digital distribution and RegTech – we modernise financial institutions with speed and compliance.',
      badge: 'Financial Services',
    },
    overview: {
      introduction:
        'We support banks, insurers and FinTechs in building modern platforms. Focus: cloud transformation, AI-supported risk analytics and digital customer experiences.',
      focusAreas: [
        { title: 'Core Modernisation', description: 'SAP Fioneer, Mambu, Thought Machine – migrations and integration without outages.' },
        { title: 'RegTech & Compliance', description: 'Automated regulatory reporting, real-time AML and ESG-compliant disclosures.' },
        { title: 'Digital Customer Journeys', description: 'Omnichannel banking, embedded finance and personalised offerings.' },
      ],
    },
    stats: [
      { label: 'Time-to-Market', value: '-40 % launch time for new products' },
      { label: 'Compliance', value: '100 % automated regulatory filings' },
      { label: 'Customer NPS', value: '+18 points within 9 months' },
    ],
    technologies: ['SAP Fioneer', 'Mambu', 'Azure Financial Services Cloud', 'Snowflake', 'Databricks', 'SAS Viya'],
    capabilities: [
      { title: 'Cloud Banking Platforms', description: 'Target architectures, migration and operation of hybrid platforms.' },
      { title: 'Risk & Compliance Automation', description: 'AI-driven risk analytics, AML workflows and ESG scoring.' },
      { title: 'Digital Sales Enablement', description: 'Self-service platforms, robo advisory and API-first partner ecosystems.' },
    ],
    caseStudies: [
      {
        client: 'DZ BANK',
        headline: 'Cloud Data Mesh for Market Data',
        impact: '80 % faster delivery of regulatory reports',
        description: 'Implementation of a Snowflake-based data mesh including automated data lineage and audit trails.',
      },
      {
        client: 'Hamburger Sparkasse',
        headline: 'Omnichannel Transformation',
        impact: '+22 % digital product conversion in Q1',
        description: 'New mobile and web banking platform with API gateway, personalisation engine and real-time insights.',
      },
    ],
    contact: {
      name: 'Gülnur Patan',
      role: 'Partner Financial Services',
      image: 'https://res.cloudinary.com/dbrisux8i/image/upload/v1760346416/image3_l0nj0f.jpg',
      email: 'gulnur.patan@quantivaadvisory.com',
      phone: undefined,
    },
  },
  {
    slug: 'health-life-sciences',
    language: 'de',
    name: 'Health & Life Sciences',
    hero: {
      title: 'Von Forschung bis Patientenversorgung digital führend',
      subtitle: 'Wir verbinden Pharma, MedTech und Kliniken mit regulatorisch sauberen, datengetriebenen Plattformen.',
      badge: 'Life Sciences',
    },
    overview: {
      introduction:
        'Wir liefern End-to-End-Lösungen für Forschung, Produktion und Versorgung. Schwerpunkt: klinische Studien, GxP-konforme Produktion und patientenzentrierte Services.',
      focusAreas: [
        { title: 'Clinical Acceleration', description: 'Digitale Studienplattformen, eConsent und Datenintegration (FHIR, HL7).' },
        { title: 'Smart Manufacturing', description: 'MES/EBR-Modernisierung, IoT-gestützte Batch-Dokumentation, Validierung.' },
        { title: 'Patient Experience', description: 'Omnichannel Patientenportale, Telemedizin und personalisierte Therapiebegleitung.' },
      ],
    },
    stats: [
      { label: 'Time-to-Study', value: '-30 % Setup-Zeit klinischer Studien' },
      { label: 'Right First Time', value: '99,2 % Batch-Release-Genauigkeit' },
      { label: 'Patient Adherence', value: '+26 % Therapieadhärenz durch digitale Begleiter' },
    ],
    technologies: ['SAP S/4HANA for Pharmaceuticals', 'Veeva Vault', 'Microsoft Cloud for Healthcare', 'ServiceNow', 'Snowflake', 'AWS HealthLake'],
    capabilities: [
      { title: 'Regulatory Platforms', description: 'CSV/GAMP 5-konforme Plattformen, Data Integrity und Audit-Trails.' },
      { title: 'Connected Supply Chain', description: 'Temperatur- und Herkunftstracking, Serialisierung, GxP-Logistik.' },
      { title: 'Digital Therapeutics', description: 'Mobile Companion Apps, Remote Monitoring und KI-gestützte Patientensegmente.' },
    ],
    caseStudies: [
      {
        client: 'Sartorius',
        headline: 'Digitale Batch-Record Transformation',
        impact: 'Release-Zeiten -41 %, Audit Findings 0',
        description: 'Implementierung eines EBR-Systems inkl. rollenbasierter Workflows, IoT-Sensorik und automatisierter Dokumentation.',
      },
      {
        client: 'Phoenix Pharma',
        headline: 'Omnichannel Patientenplattform',
        impact: '+18 % Service-Nutzung in 6 Monaten',
        description: 'Patient Journey Plattform mit Telemedizin, Chatbots und Integrationen zu Apotheken-Netzwerk und ERP.',
      },
    ],
    contact: {
      name: 'Francja Albertijn',
      role: 'Partnerin Life Sciences',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
      email: 'f.albertijn@quantivaadvisory.com',
    },
  },
  {
    slug: 'health-life-sciences',
    language: 'en',
    name: 'Health & Life Sciences',
    hero: {
      title: 'Digital leaders from lab to patient',
      subtitle: 'We connect pharma, medtech and care providers with compliant, data-driven platforms.',
      badge: 'Life Sciences',
    },
    overview: {
      introduction:
        'We deliver end-to-end solutions across R&D, manufacturing and patient engagement. Focus: clinical acceleration, GxP-compliant production and patient-centric services.',
      focusAreas: [
        { title: 'Clinical Acceleration', description: 'Digital trial platforms, eConsent and interoperability (FHIR, HL7).' },
        { title: 'Smart Manufacturing', description: 'MES/EBR modernisation, IoT-enabled batch documentation and validation.' },
        { title: 'Patient Experience', description: 'Omnichannel portals, telemedicine and personalised care journeys.' },
      ],
    },
    stats: [
      { label: 'Time-to-Study', value: '-30 % clinical study setup time' },
      { label: 'Right First Time', value: '99.2 % batch release accuracy' },
      { label: 'Patient Adherence', value: '+26 % therapy adherence via digital companions' },
    ],
    technologies: ['SAP S/4HANA for Pharmaceuticals', 'Veeva Vault', 'Microsoft Cloud for Healthcare', 'ServiceNow', 'Snowflake', 'AWS HealthLake'],
    capabilities: [
      { title: 'Regulatory Platforms', description: 'CSV/GAMP 5 compliant platforms, data integrity and audit trails.' },
      { title: 'Connected Supply Chain', description: 'Cold-chain monitoring, serialisation, GxP logistics.' },
      { title: 'Digital Therapeutics', description: 'Mobile companion apps, remote monitoring and AI-driven patient cohorts.' },
    ],
    caseStudies: [
      {
        client: 'Sartorius',
        headline: 'Digital Batch Record Transformation',
        impact: 'Release time -41 %, zero audit findings',
        description: 'Implementation of an EBR platform including role-based workflows, IoT sensor integration and automated documentation.',
      },
      {
        client: 'Phoenix Pharma',
        headline: 'Omnichannel Patient Platform',
        impact: '+18 % service adoption within 6 months',
        description: 'Patient journey platform with telehealth, chatbots and integration into pharmacy network and ERP.',
      },
    ],
    contact: {
      name: 'Francja Albertijn',
      role: 'Partner Life Sciences',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
      email: 'francja.albertijn@quantivaadvisory.com',
    },
  },
  {
    slug: 'retail-ecommerce',
    language: 'de',
    name: 'Retail & E-Commerce',
    hero: {
      title: 'Omnichannel Retail, das skaliert',
      subtitle: 'Wir gestalten End-to-End Customer Journeys mit Echtzeit-Inventory, Personalisierung und resilienten Fulfillment-Prozessen.',
      badge: 'Retail Innovation',
    },
    overview: {
      introduction:
        'Wir verbinden stationären Handel, E-Commerce und Marktplätze zu einer einheitlichen Experience. Fokus: Echtzeit-Inventory, AI-Pricing und Supply-Chain-Resilienz.',
      focusAreas: [
        { title: 'Unified Commerce', description: 'Headless Commerce, API-first POS und digitalisierte Store Operations.' },
        { title: 'Data-Driven Marketing', description: 'Customer Data Platforms, AI-basierte Kampagnen und Loyalty-as-a-Service.' },
        { title: 'Smart Fulfillment', description: 'Micro-Fulfillment, Dark Stores und automatisierte Returns.' },
      ],
    },
    stats: [
      { label: 'Conversion', value: '+19 % Omnichannel Conversion' },
      { label: 'Inventory Accuracy', value: '98 % Bestandsgenauigkeit' },
      { label: 'Fulfillment Cost', value: '-27 % pro Bestellung' },
    ],
    technologies: ['commercetools', 'SAP CAR', 'Salesforce Commerce Cloud', 'Algolia', 'Segment', 'Contentful'],
    capabilities: [
      { title: 'Customer 360 & Loyalty', description: 'CDP-Implementierungen, Personalisation und Loyalty-Plattformen.' },
      { title: 'Intelligent Merchandising', description: 'Dynamic Pricing, KI-gestützte Empfehlungen und Sortimentsplanung.' },
      { title: 'Operational Excellence', description: 'Dark Store-Konzepte, Click & Collect und automatisierte Retourenprozesse.' },
    ],
    caseStudies: [
      {
        client: 'Galaxis Retail Group',
        headline: 'Unified Commerce Experience',
        impact: '+23 % Warenkorbwert, +31 % App Nutzung',
        description: 'Headless Commerce Architektur mit Echtzeit-Bestand, personalisierten Produktfeeds und integriertem Loyalty-System.',
      },
      {
        client: 'Migros',
        headline: 'KI-gestützte Logistiksteuerung',
        impact: '-18 % Out-of-Stock, +12 % Lieferpünktlichkeit',
        description: 'Machine-Learning zur Bedarfsprognose, Routenoptimierung und automatisierten Nachschubsteuerung für 400 Filialen.',
      },
    ],
    contact: {
      name: 'Sarah Martinez',
      role: 'Industry Lead Retail & Consumer',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop',
      email: 's.martinez@quantivaadvisory.com',
    },
  },
  {
    slug: 'retail-ecommerce',
    language: 'en',
    name: 'Retail & E-Commerce',
    hero: {
      title: 'Scaling omnichannel retail experiences',
      subtitle: 'We design end-to-end customer journeys with real-time inventory, personalisation and resilient fulfilment operations.',
      badge: 'Retail Innovation',
    },
    overview: {
      introduction:
        'We connect brick-and-mortar, e-commerce and marketplaces into one experience. Focus: unified commerce, AI pricing and supply-chain resilience.',
      focusAreas: [
        { title: 'Unified Commerce', description: 'Headless commerce, API-first POS and digitised store operations.' },
        { title: 'Data-Driven Marketing', description: 'Customer data platforms, AI campaigns and loyalty-as-a-service.' },
        { title: 'Smart Fulfilment', description: 'Micro-fulfilment, dark stores and automated returns.' },
      ],
    },
    stats: [
      { label: 'Conversion', value: '+19 % omnichannel conversion' },
      { label: 'Inventory Accuracy', value: '98 % stock accuracy' },
      { label: 'Fulfilment Cost', value: '-27 % per order' },
    ],
    technologies: ['commercetools', 'SAP CAR', 'Salesforce Commerce Cloud', 'Algolia', 'Segment', 'Contentful'],
    capabilities: [
      { title: 'Customer 360 & Loyalty', description: 'CDP implementations, personalisation and loyalty platforms.' },
      { title: 'Intelligent Merchandising', description: 'Dynamic pricing, AI recommendations and assortment planning.' },
      { title: 'Operational Excellence', description: 'Dark store concepts, click & collect and automated returns.' },
    ],
    caseStudies: [
      {
        client: 'Galaxis Retail Group',
        headline: 'Unified Commerce Experience',
        impact: '+23 % basket size, +31 % app usage',
        description: 'Headless commerce architecture with real-time inventory, personalised product feeds and integrated loyalty system.',
      },
      {
        client: 'Migros',
        headline: 'AI-driven logistics control',
        impact: '-18 % out-of-stock, +12 % on-time delivery',
        description: 'Machine learning for demand prediction, route optimisation and automated replenishment across 400 stores.',
      },
    ],
    contact: {
      name: 'Sarah Martinez',
      role: 'Industry Lead Retail & Consumer',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&auto=format&fit=crop',
      email: 'sarah.martinez@quantivaadvisory.com',
    },
  },
];

export function getIndustryDetail(slug: string, lang: SupportedLanguage): IndustryDetail | null {
  return industryDetails.find((industry) => industry.slug === slug && industry.language === lang) || null;
}

export function getIndustrySlugs(lang: SupportedLanguage): string[] {
  return industryDetails.filter((industry) => industry.language === lang).map((industry) => industry.slug);
}
