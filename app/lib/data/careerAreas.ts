export type CareerAreaSlug =
  | 'technology-engineering'
  | 'sap-solutions'
  | 'cloud-infrastructure'
  | 'cyber-security'
  | 'artificial-intelligence';

export interface CareerAreaTopic {
  title: string;
  description: string;
}

export interface CareerAreaContent {
  /** Hero headline */
  title: string;
  /** Hero subline (also used as meta description) */
  subtitle: string;
  /** 2–3 sentences: what this area does at Quantiva */
  intro: string;
  /** Concrete fields of work */
  topics: CareerAreaTopic[];
  /** Technology chips */
  stack: string[];
  /** Example roles incl. level */
  roles: string[];
}

export interface CareerArea {
  slug: CareerAreaSlug;
  de: CareerAreaContent;
  en: CareerAreaContent;
}

export const careerAreas: Record<CareerAreaSlug, CareerArea> = {
  'technology-engineering': {
    slug: 'technology-engineering',
    de: {
      title: 'Technology & Engineering',
      subtitle:
        'Du baust die Systeme, auf denen der Mittelstand läuft – von der Architektur bis zur Pipeline.',
      intro:
        'Im Bereich Technology & Engineering entwickelst du bei Quantiva Advisory individuelle Software und moderne Plattformen für mittelständische Unternehmen. Du arbeitest end-to-end: von der Architekturentscheidung über sauberen Code bis zur automatisierten Auslieferung. Dabei verbindest du Engineering-Exzellenz mit einem klaren Blick für den Geschäftsnutzen unserer Kunden.',
      topics: [
        {
          title: 'Microservices & APIs',
          description:
            'Du entwirfst und baust verteilte Systeme mit sauberen Schnittstellen – Domain-driven, versioniert und dokumentiert, damit Fachbereiche und Systeme zuverlässig zusammenspielen.',
        },
        {
          title: 'Plattform-Engineering',
          description:
            'Du baust interne Entwicklerplattformen und Self-Service-Infrastruktur, mit denen Kundenteams schneller und sicherer liefern – Golden Paths statt Ticket-Ping-Pong.',
        },
        {
          title: 'Test-Automatisierung & Qualität',
          description:
            'Du verankerst Qualität im Prozess: Unit-, Integrations- und E2E-Tests, Contract Testing und Quality Gates in der CI/CD-Pipeline statt manueller Abnahmen.',
        },
        {
          title: 'Moderne Frontends',
          description:
            'Du entwickelst performante, barrierearme Web-Anwendungen mit React und Next.js – von internen Fachanwendungen bis zu kundenseitigen Portalen.',
        },
        {
          title: 'DevOps & CI/CD',
          description:
            'Du automatisierst Build, Test und Deployment, bringst Observability in den Betrieb und sorgst dafür, dass Releases zum Routinevorgang werden.',
        },
        {
          title: 'Legacy-Modernisierung',
          description:
            'Du zerlegst gewachsene Monolithen Schritt für Schritt, migrierst Altsysteme in tragfähige Zielarchitekturen und hältst dabei den laufenden Betrieb stabil.',
        },
      ],
      stack: [
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Java',
        'Spring Boot',
        'PostgreSQL',
        'Docker',
        'Kubernetes',
        'GitHub Actions',
      ],
      roles: [
        'Software Engineer (m/w/d)',
        'Senior Full-Stack Engineer (m/w/d)',
        'Lead Platform Engineer (m/w/d)',
      ],
    },
    en: {
      title: 'Technology & Engineering',
      subtitle:
        'You build the systems the Mittelstand runs on – from architecture to pipeline.',
      intro:
        'In Technology & Engineering at Quantiva Advisory you build custom software and modern platforms for mid-sized companies. You work end-to-end: from architecture decisions through clean code to automated delivery. Along the way you combine engineering excellence with a clear focus on the business value we create for our clients.',
      topics: [
        {
          title: 'Microservices & APIs',
          description:
            'You design and build distributed systems with clean interfaces – domain-driven, versioned and documented, so business units and systems interact reliably.',
        },
        {
          title: 'Platform Engineering',
          description:
            'You build internal developer platforms and self-service infrastructure that let client teams ship faster and more safely – golden paths instead of ticket ping-pong.',
        },
        {
          title: 'Test Automation & Quality',
          description:
            'You anchor quality in the process: unit, integration and end-to-end tests, contract testing and quality gates in the CI/CD pipeline instead of manual sign-offs.',
        },
        {
          title: 'Modern Frontends',
          description:
            'You develop fast, accessible web applications with React and Next.js – from internal line-of-business tools to customer-facing portals.',
        },
        {
          title: 'DevOps & CI/CD',
          description:
            'You automate build, test and deployment, bring observability into operations and make releases a routine event.',
        },
        {
          title: 'Legacy Modernization',
          description:
            'You decompose grown monoliths step by step, migrate legacy systems into sustainable target architectures and keep day-to-day operations stable while doing it.',
        },
      ],
      stack: [
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Java',
        'Spring Boot',
        'PostgreSQL',
        'Docker',
        'Kubernetes',
        'GitHub Actions',
      ],
      roles: [
        'Software Engineer (m/f/d)',
        'Senior Full-Stack Engineer (m/f/d)',
        'Lead Platform Engineer (m/f/d)',
      ],
    },
  },

  'sap-solutions': {
    slug: 'sap-solutions',
    de: {
      title: 'SAP Solutions',
      subtitle:
        'Du gestaltest S/4HANA-Transformationen im Mittelstand – Clean Core statt Altlasten.',
      intro:
        'Im Bereich SAP Solutions begleitest du mittelständische Unternehmen von ECC nach S/4HANA – von der Prozessaufnahme über das Zielbild bis zum Go-Live. Du berätst Fachbereiche, entwickelst Erweiterungen auf der SAP BTP und sorgst dafür, dass der Kern sauber bleibt. SAP ist bei Quantiva kein Silo: Du arbeitest eng mit unseren Cloud-, Security- und AI-Teams zusammen.',
      topics: [
        {
          title: 'S/4HANA-Transformationen',
          description:
            'Du steuerst Brownfield-, Greenfield- und selektive Migrationen: Prozessanalyse, Fit-to-Standard-Workshops, Datenmigration und Cutover-Planung bis zum Go-Live.',
        },
        {
          title: 'Clean Core & Extensibility',
          description:
            'Du hältst den S/4HANA-Kern upgradefähig: Erweiterungen entstehen released-API-basiert – On-Stack mit RAP oder Side-by-Side auf der BTP statt als klassische Modifikation.',
        },
        {
          title: 'BTP-Entwicklung',
          description:
            'Du entwickelst Anwendungen und Services auf der SAP Business Technology Platform – mit CAP, Node.js oder Java, sauber integriert in die bestehende Systemlandschaft.',
        },
        {
          title: 'Integration',
          description:
            'Du verbindest SAP mit der Nicht-SAP-Welt: Schnittstellen mit der SAP Integration Suite, Event-getriebene Architekturen und stabile API-Strategien für hybride Landschaften.',
        },
        {
          title: 'Fiori & User Experience',
          description:
            'Du bringst moderne Oberflächen in die SAP-Welt: Fiori Elements und SAPUI5-Apps, die Anwender:innen im Alltag wirklich schneller machen.',
        },
        {
          title: 'Prozessberatung Logistik & Finance',
          description:
            'Du optimierst Kernprozesse in Einkauf, Produktion, Vertrieb und Rechnungswesen – nah am Fachbereich und mit Blick auf das, was der Standard schon kann.',
        },
      ],
      stack: [
        'SAP S/4HANA',
        'SAP BTP',
        'ABAP (RAP)',
        'SAP CAP',
        'SAP Fiori',
        'SAPUI5',
        'SAP Integration Suite',
        'SAP Datasphere',
      ],
      roles: [
        'Consultant SAP Logistics (m/w/d)',
        'SAP BTP Developer (m/w/d)',
        'Senior SAP S/4HANA Architect (m/w/d)',
      ],
    },
    en: {
      title: 'SAP Solutions',
      subtitle:
        'You shape S/4HANA transformations for the Mittelstand – clean core instead of legacy baggage.',
      intro:
        'In SAP Solutions you guide mid-sized companies from ECC to S/4HANA – from process discovery through target design to go-live. You advise business departments, build extensions on SAP BTP and make sure the core stays clean. SAP is not a silo at Quantiva: you work closely with our cloud, security and AI teams.',
      topics: [
        {
          title: 'S/4HANA Transformations',
          description:
            'You drive brownfield, greenfield and selective migrations: process analysis, fit-to-standard workshops, data migration and cutover planning all the way to go-live.',
        },
        {
          title: 'Clean Core & Extensibility',
          description:
            'You keep the S/4HANA core upgrade-ready: extensions are built on released APIs – on-stack with RAP or side-by-side on BTP instead of classic modifications.',
        },
        {
          title: 'BTP Development',
          description:
            'You build applications and services on the SAP Business Technology Platform – with CAP, Node.js or Java, cleanly integrated into the existing landscape.',
        },
        {
          title: 'Integration',
          description:
            'You connect SAP with the non-SAP world: interfaces with SAP Integration Suite, event-driven architectures and stable API strategies for hybrid landscapes.',
        },
        {
          title: 'Fiori & User Experience',
          description:
            'You bring modern interfaces into the SAP world: Fiori Elements and SAPUI5 apps that genuinely make users faster in their daily work.',
        },
        {
          title: 'Process Consulting Logistics & Finance',
          description:
            'You optimize core processes in procurement, production, sales and accounting – close to the business and with an eye on what the standard already offers.',
        },
      ],
      stack: [
        'SAP S/4HANA',
        'SAP BTP',
        'ABAP (RAP)',
        'SAP CAP',
        'SAP Fiori',
        'SAPUI5',
        'SAP Integration Suite',
        'SAP Datasphere',
      ],
      roles: [
        'Consultant SAP Logistics (m/f/d)',
        'SAP BTP Developer (m/f/d)',
        'Senior SAP S/4HANA Architect (m/f/d)',
      ],
    },
  },

  'cloud-infrastructure': {
    slug: 'cloud-infrastructure',
    de: {
      title: 'Cloud & Infrastructure',
      subtitle:
        'Du baust Cloud-Fundamente, die skalieren – sicher, automatisiert und kosteneffizient.',
      intro:
        'Im Bereich Cloud & Infrastructure bringst du mittelständische Unternehmen sicher in die Cloud – und sorgst dafür, dass sie dort effizient bleiben. Du entwirfst Landing Zones, automatisierst Infrastruktur als Code und baust Container-Plattformen für geschäftskritische Workloads. Vom ersten Assessment bis zum laufenden Betrieb übernimmst du Verantwortung für tragfähige Architekturen.',
      topics: [
        {
          title: 'Cloud-Strategie & Betriebsmodelle',
          description:
            'Du entwickelst Cloud-Zielbilder und Betriebsmodelle für den Mittelstand: Welche Workloads wohin, wer betreibt was, und wie bleibt das Ganze steuerbar.',
        },
        {
          title: 'Landing Zones & Governance',
          description:
            'Du baust sichere, mandantenfähige Cloud-Fundamente auf Azure und AWS – mit Policies, Netzwerk-Design und Identity-Konzepten, die Audits standhalten.',
        },
        {
          title: 'Kubernetes & Container-Plattformen',
          description:
            'Du konzipierst und betreibst Kubernetes-Plattformen für geschäftskritische Anwendungen – inklusive GitOps-Deployments, Autoscaling und Observability.',
        },
        {
          title: 'Infrastructure as Code',
          description:
            'Du automatisierst Infrastruktur vollständig mit Terraform und CI/CD-Pipelines – reproduzierbar, versioniert und ohne manuelle Klick-Konfiguration.',
        },
        {
          title: 'Migration & Modernisierung',
          description:
            'Du migrierst Workloads aus dem eigenen Rechenzentrum in die Cloud – von Rehost bis Replatform, inklusive SAP-nahen Systemen und Datenbanken.',
        },
        {
          title: 'FinOps & Kostensteuerung',
          description:
            'Du machst Cloud-Kosten transparent und steuerbar: Tagging-Strategien, Rightsizing, Commitments und ein Reporting, das CFO und Engineering gleichermaßen verstehen.',
        },
      ],
      stack: [
        'Microsoft Azure',
        'AWS',
        'Terraform',
        'Kubernetes',
        'Docker',
        'ArgoCD',
        'Linux',
        'Prometheus',
        'Grafana',
        'Azure DevOps',
      ],
      roles: [
        'Cloud Engineer (m/w/d)',
        'Senior Cloud Architect (m/w/d)',
        'Lead DevOps Engineer (m/w/d)',
      ],
    },
    en: {
      title: 'Cloud & Infrastructure',
      subtitle:
        'You build cloud foundations that scale – secure, automated and cost-efficient.',
      intro:
        'In Cloud & Infrastructure you take mid-sized companies safely into the cloud – and make sure they operate efficiently once they are there. You design landing zones, automate infrastructure as code and build container platforms for business-critical workloads. From the first assessment to day-two operations, you own architectures that last.',
      topics: [
        {
          title: 'Cloud Strategy & Operating Models',
          description:
            'You develop cloud target pictures and operating models for the Mittelstand: which workloads go where, who operates what, and how it all stays governable.',
        },
        {
          title: 'Landing Zones & Governance',
          description:
            'You build secure, multi-tenant cloud foundations on Azure and AWS – with policies, network design and identity concepts that hold up in audits.',
        },
        {
          title: 'Kubernetes & Container Platforms',
          description:
            'You design and run Kubernetes platforms for business-critical applications – including GitOps deployments, autoscaling and observability.',
        },
        {
          title: 'Infrastructure as Code',
          description:
            'You automate infrastructure end-to-end with Terraform and CI/CD pipelines – reproducible, versioned and free of manual click-ops.',
        },
        {
          title: 'Migration & Modernization',
          description:
            'You migrate workloads from on-premises data centers into the cloud – from rehost to replatform, including SAP-adjacent systems and databases.',
        },
        {
          title: 'FinOps & Cost Control',
          description:
            'You make cloud spend transparent and controllable: tagging strategies, rightsizing, commitments and reporting that both CFO and engineering understand.',
        },
      ],
      stack: [
        'Microsoft Azure',
        'AWS',
        'Terraform',
        'Kubernetes',
        'Docker',
        'ArgoCD',
        'Linux',
        'Prometheus',
        'Grafana',
        'Azure DevOps',
      ],
      roles: [
        'Cloud Engineer (m/f/d)',
        'Senior Cloud Architect (m/f/d)',
        'Lead DevOps Engineer (m/f/d)',
      ],
    },
  },

  'cyber-security': {
    slug: 'cyber-security',
    de: {
      title: 'Cyber Security',
      subtitle:
        'Du schützt den Mittelstand – von der Schwachstelle bis zur Zertifizierung.',
      intro:
        'Im Bereich Cyber Security machst du mittelständische Unternehmen widerstandsfähig gegen Angriffe – technisch und organisatorisch. Du findest Schwachstellen, bevor Angreifer es tun, baust Identity- und Detection-Architekturen auf und begleitest Kunden zu ISO 27001 und durch die NIS2-Anforderungen. Security ist bei Quantiva von Anfang an Teil jeder Cloud-, SAP- und Software-Lösung.',
      topics: [
        {
          title: 'Security-Assessments & Penetrationstests',
          description:
            'Du analysierst IT-Landschaften, Anwendungen und Cloud-Umgebungen auf Schwachstellen und übersetzt Findings in priorisierte, umsetzbare Maßnahmenpläne.',
        },
        {
          title: 'Identity & Access Management',
          description:
            'Du konzipierst und implementierst IAM-Architekturen: zentrale Identitäten, rollenbasierte Berechtigungen, MFA und Privileged Access Management – auch für hybride SAP-Landschaften.',
        },
        {
          title: 'SIEM & Security Operations',
          description:
            'Du baust Detection- und Response-Fähigkeiten auf: Log-Anbindung, Use-Case-Entwicklung in Microsoft Sentinel und der Weg zu einem funktionierenden SOC-Betrieb.',
        },
        {
          title: 'ISO 27001 & NIS2',
          description:
            'Du begleitest Kunden zur Zertifizierungsreife: ISMS-Aufbau, Gap-Analysen, Risikomanagement und die pragmatische Umsetzung der NIS2-Pflichten im Mittelstand.',
        },
        {
          title: 'Cloud Security',
          description:
            'Du härtest Azure- und AWS-Umgebungen: Security-Baselines, Posture Management und sichere Architekturmuster für Workloads und Landing Zones.',
        },
        {
          title: 'Security Awareness & Notfallübungen',
          description:
            'Du machst Organisationen handlungsfähig: Phishing-Simulationen, Awareness-Formate und Tabletop-Übungen, damit im Ernstfall jeder Handgriff sitzt.',
        },
      ],
      stack: [
        'Microsoft Entra ID',
        'Microsoft Sentinel',
        'Microsoft Defender',
        'Splunk',
        'Nessus',
        'Burp Suite',
        'ISO 27001',
        'NIS2',
        'Zero Trust',
      ],
      roles: [
        'Security Consultant (m/w/d)',
        'IAM Engineer (m/w/d)',
        'Senior Security Architect (m/w/d)',
      ],
    },
    en: {
      title: 'Cyber Security',
      subtitle:
        'You protect the Mittelstand – from vulnerability to certification.',
      intro:
        'In Cyber Security you make mid-sized companies resilient against attacks – technically and organizationally. You find vulnerabilities before attackers do, build identity and detection architectures and guide clients to ISO 27001 and through NIS2 requirements. At Quantiva, security is part of every cloud, SAP and software solution from day one.',
      topics: [
        {
          title: 'Security Assessments & Penetration Testing',
          description:
            'You analyze IT landscapes, applications and cloud environments for vulnerabilities and translate findings into prioritized, actionable remediation plans.',
        },
        {
          title: 'Identity & Access Management',
          description:
            'You design and implement IAM architectures: central identities, role-based access, MFA and privileged access management – including hybrid SAP landscapes.',
        },
        {
          title: 'SIEM & Security Operations',
          description:
            'You build detection and response capabilities: log onboarding, use-case development in Microsoft Sentinel and the path to a working SOC operation.',
        },
        {
          title: 'ISO 27001 & NIS2',
          description:
            'You take clients to certification readiness: ISMS setup, gap analyses, risk management and pragmatic implementation of NIS2 obligations in mid-sized companies.',
        },
        {
          title: 'Cloud Security',
          description:
            'You harden Azure and AWS environments: security baselines, posture management and secure architecture patterns for workloads and landing zones.',
        },
        {
          title: 'Security Awareness & Incident Exercises',
          description:
            'You make organizations response-ready: phishing simulations, awareness formats and tabletop exercises so that everyone knows what to do when it counts.',
        },
      ],
      stack: [
        'Microsoft Entra ID',
        'Microsoft Sentinel',
        'Microsoft Defender',
        'Splunk',
        'Nessus',
        'Burp Suite',
        'ISO 27001',
        'NIS2',
        'Zero Trust',
      ],
      roles: [
        'Security Consultant (m/f/d)',
        'IAM Engineer (m/f/d)',
        'Senior Security Architect (m/f/d)',
      ],
    },
  },

  'artificial-intelligence': {
    slug: 'artificial-intelligence',
    de: {
      title: 'Artificial Intelligence',
      subtitle:
        'Du bringst KI in den Mittelstand – produktiv, messbar und verantwortungsvoll.',
      intro:
        'Im Bereich Artificial Intelligence entwickelst du KI-Lösungen, die im Mittelstand wirklich produktiv gehen – vom ersten Use-Case-Workshop bis zum betriebenen System. Du baust GenAI-Anwendungen und RAG-Systeme auf Unternehmensdaten, etablierst MLOps-Praktiken und sorgst mit AI-Governance dafür, dass der Einsatz sicher und regelkonform bleibt. KI verzahnst du dabei eng mit den SAP-, Cloud- und Datenlandschaften unserer Kunden.',
      topics: [
        {
          title: 'GenAI-Use-Cases',
          description:
            'Du identifizierst und bewertest KI-Anwendungsfälle mit echtem Business Case – von der Angebotsanalyse bis zur Service-Automatisierung – und bringst sie vom Prototyp in die Produktion.',
        },
        {
          title: 'RAG-Systeme',
          description:
            'Du baust Retrieval-Augmented-Generation-Lösungen auf Unternehmenswissen: Dokumenten-Pipelines, Vektorsuche, Prompt-Design und Evaluierung der Antwortqualität.',
        },
        {
          title: 'MLOps & LLMOps',
          description:
            'Du industrialisierst den Modell-Lebenszyklus: Versionierung, automatisiertes Deployment, Monitoring von Qualität und Kosten sowie kontrollierte Rollouts.',
        },
        {
          title: 'AI-Governance & EU AI Act',
          description:
            'Du entwickelst Leitplanken für den verantwortungsvollen KI-Einsatz: Risikoklassifizierung nach EU AI Act, Datenschutz, Transparenz und interne KI-Richtlinien.',
        },
        {
          title: 'Datenplattformen & Analytics',
          description:
            'Du schaffst die Datenbasis für KI: Datenpipelines, Lakehouse-Architekturen und Analytics-Lösungen, die aus verstreuten Quellsystemen nutzbares Wissen machen.',
        },
        {
          title: 'KI in SAP-Prozessen',
          description:
            'Du bringst KI dorthin, wo die Geschäftsprozesse laufen: intelligente Automatisierung in S/4HANA-Prozessen und Erweiterungen über SAP AI Core und die BTP.',
        },
      ],
      stack: [
        'Python',
        'LangChain',
        'Azure OpenAI',
        'Hugging Face',
        'PyTorch',
        'MLflow',
        'pgvector',
        'Databricks',
        'SAP AI Core',
      ],
      roles: [
        'AI Engineer (m/w/d)',
        'Data Scientist (m/w/d)',
        'Senior AI Solution Architect (m/w/d)',
      ],
    },
    en: {
      title: 'Artificial Intelligence',
      subtitle:
        'You bring AI to the Mittelstand – productive, measurable and responsible.',
      intro:
        'In Artificial Intelligence you build AI solutions that actually reach production in mid-sized companies – from the first use-case workshop to the operated system. You develop GenAI applications and RAG systems on top of enterprise data, establish MLOps practices and use AI governance to keep adoption safe and compliant. You tightly integrate AI with our clients’ SAP, cloud and data landscapes.',
      topics: [
        {
          title: 'GenAI Use Cases',
          description:
            'You identify and evaluate AI use cases with a real business case – from proposal analysis to service automation – and take them from prototype to production.',
        },
        {
          title: 'RAG Systems',
          description:
            'You build retrieval-augmented generation solutions on enterprise knowledge: document pipelines, vector search, prompt design and answer-quality evaluation.',
        },
        {
          title: 'MLOps & LLMOps',
          description:
            'You industrialize the model lifecycle: versioning, automated deployment, monitoring of quality and cost, and controlled rollouts.',
        },
        {
          title: 'AI Governance & EU AI Act',
          description:
            'You develop guardrails for responsible AI adoption: risk classification under the EU AI Act, data protection, transparency and internal AI policies.',
        },
        {
          title: 'Data Platforms & Analytics',
          description:
            'You create the data foundation for AI: data pipelines, lakehouse architectures and analytics solutions that turn scattered source systems into usable knowledge.',
        },
        {
          title: 'AI in SAP Processes',
          description:
            'You bring AI to where business processes run: intelligent automation in S/4HANA processes and extensions via SAP AI Core and BTP.',
        },
      ],
      stack: [
        'Python',
        'LangChain',
        'Azure OpenAI',
        'Hugging Face',
        'PyTorch',
        'MLflow',
        'pgvector',
        'Databricks',
        'SAP AI Core',
      ],
      roles: [
        'AI Engineer (m/f/d)',
        'Data Scientist (m/f/d)',
        'Senior AI Solution Architect (m/f/d)',
      ],
    },
  },
};

export const careerAreaSlugs = Object.keys(careerAreas) as CareerAreaSlug[];

export function getCareerArea(slug: string): CareerArea | undefined {
  return (careerAreas as Record<string, CareerArea>)[slug];
}
