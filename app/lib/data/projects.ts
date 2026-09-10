/**
 * Venture-/Projektportfolio der Quantiva GmbH.
 *
 * Inhalte basieren auf den Produktdefinitionen der internen Knowledge Bases
 * (Confluence), redaktionell aufbereitet für die Website — ohne vertrauliche
 * Status-, Validierungs- oder Preisangaben.
 */

export type VentureEffect = 'network' | 'threads' | 'radar' | 'ledger';

export type VentureFlowStep = {
  label: string;
  desc: string;
};

export type Venture = {
  slug: string;
  name: string;
  /** Pfad zum Logo-Motiv unter public/ */
  logo: string;
  /** Logo liegt auf dunklem Grund */
  darkLogo: boolean;
  /** Hintergrundfarbe des Logo-Motivs (für object-contain-Karten) */
  logoBg: string;
  category: string;
  verb: string;
  tagline: string;
  intro: string;
  /** Akzentfarbe des Projekts (hex) */
  accent: string;
  /** Signature-Canvas-Effekt der Detailseite */
  effect: VentureEffect;
  problemTitle: string;
  problems: { title: string; text: string }[];
  flowTitle: string;
  flow: VentureFlowStep[];
  principles: string[];
};

export const ventures: Venture[] = [
  {
    slug: 'solutiongate',
    name: 'SolutionGate',
    logo: '/assets/projects/solutiongate.jpg',
    logoBg: '#000f28',
    darkLogo: true,
    category: 'AI Problem Intelligence',
    verb: 'identifizieren',
    tagline: 'Find the problems worth solving. Prove what works.',
    intro:
      'Unternehmen haben nicht zu wenige Ideen. Ihnen fehlt Transparenz darüber, welche Probleme relevant sind, welche Lösungen existieren und welche Maßnahmen tatsächlich Wirkung erzeugen. SolutionGate identifiziert, strukturiert und bewertet operative Unternehmensprobleme wirtschaftlich — und begleitet die Lösung bis zum messbaren Ergebnis.',
    accent: '#2dd4bf',
    effect: 'network',
    problemTitle: 'Fünf Probleme, ein Muster',
    problems: [
      {
        title: 'Problem Fragmentation',
        text: 'Qualitätsmeldung, Ticket, Audit Finding, Excel, E-Mail: Das Wissen existiert — verteilt über Systeme, Abteilungen und Köpfe. Niemand kann belastbar sagen, was die 30 teuersten ungelösten Probleme sind.',
      },
      {
        title: 'Problem Duplication',
        text: 'Mehrere Werke oder Teams lösen unabhängig dasselbe Problem. Jede Doppellösung ist doppelt bezahlte Arbeit — plus der entgangene Skaleneffekt der besseren Variante.',
      },
      {
        title: 'Weak Prioritization',
        text: 'Priorisiert wird nach Lautstärke oder Hierarchie statt nach wirtschaftlichem Impact, Risiko und Lösbarkeit. Wer am lautesten eskaliert, gewinnt Budget.',
      },
      {
        title: 'Solution Discovery Gap',
        text: 'Unklar, ob intern bereits eine Lösung existiert, ob es passende Anbieter oder Alternativen gibt — oder ob ein anderes Werk das Problem längst gelöst hat.',
      },
      {
        title: 'Execution Gap',
        text: 'Kein strukturierter Weg von Idee über Evaluation, PoC und Business Case bis zu Entscheidung und Rollout. Initiativen versanden zwischen PowerPoint und Pilot.',
      },
    ],
    flowTitle: 'Vom Signal zum Outcome',
    flow: [
      { label: 'Signal', desc: 'Operative Systeme enthalten Problem-Signale, bevor jemand eine Initiative formuliert.' },
      { label: 'Problem', desc: 'Signale werden zu strukturierten, vergleichbaren Problemen verdichtet.' },
      { label: 'Business Impact', desc: 'Jedes Problem erhält eine wirtschaftliche Bewertung — Kosten, Risiko, Häufigkeit.' },
      { label: 'Solution', desc: 'Interne und externe Lösungen werden systematisch verbunden.' },
      { label: 'Evaluation & PoC', desc: 'Kandidaten werden strukturiert getestet statt politisch entschieden.' },
      { label: 'Decision & Outcome', desc: 'Entscheidung, Rollout und tatsächliche Wirkung bleiben messbar verknüpft.' },
    ],
    principles: [
      'Time-to-Validated-Solution ist die zentrale Messgröße — nicht die Anzahl eingereichter Ideen.',
      'Problem Intelligence ist wertvoller als Idea Management.',
      'Der Datenwert entsteht aus der Verbindung Problem → Kontext → Lösung → Entscheidung → Ergebnis.',
      'Funktioniert bereits für einen einzelnen Kunden — ohne Marketplace-Liquidität.',
    ],
  },
  {
    slug: 'shiftgate',
    name: 'ShiftGate AI',
    logo: '/assets/projects/shiftgate.jpg',
    logoBg: '#f0f2ed',
    darkLogo: false,
    category: 'SAP Evidence & Proof',
    verb: 'beweisen',
    tagline: 'Kein Change ohne Beweis.',
    intro:
      'Ihre Systeme sagen, der Change war sauber. ShiftGate AI beweist es: der read-only, betreiber-blinde, manipulationsgeschützte und revisionsfähige Zustands- und Change-Beweis für SAP-Landschaften — vorbereitet für Audit- und Rechtsprüfungen.',
    accent: '#e2e8f0',
    effect: 'ledger',
    problemTitle: 'Warum Beweis statt Behauptung',
    problems: [
      {
        title: 'Rekonstruktion frisst Tage',
        text: 'Wenn etwas schiefgeht, beginnt die Suche: Wer hat wann was geändert, und was war vorher der Zustand? Die Faktenlage zusammenzutragen kostet Stunden bis Tage — pro Fall.',
      },
      {
        title: 'Systeme belegen sich nicht selbst',
        text: 'Logs sind verstreut, überschreibbar und ohne Kontext. Ein Betreiber, der sich selbst attestiert, ist kein Beweis.',
      },
      {
        title: 'Audits brauchen Verkettung',
        text: 'Prüfungen verlangen eine lückenlose, nachvollziehbare Kette — nicht Screenshots und Erinnerungen.',
      },
    ],
    flowTitle: 'Die Beweiskette',
    flow: [
      { label: 'Beobachten', desc: 'Read-only Anbindung an die SAP-Landschaft — ShiftGate ändert nichts, nie.' },
      { label: 'Erfassen', desc: 'Zustands- und Change-Daten werden systematisch aufgenommen.' },
      { label: 'Verketten', desc: 'Jeder Eintrag wird manipulationsgeschützt und revisionsfähig verkettet.' },
      { label: 'Belegen', desc: 'Die vollständige, zitierfähige Faktenlage entsteht in Minuten statt Stunden.' },
      { label: 'Prüfen', desc: 'Vorbereitet für Audit- und Rechtsprüfungen — das Urteil bleibt beim Ingenieur.' },
    ],
    principles: [
      'Der Beweis ist das Produkt — nicht das Ändern.',
      'Betreiber-blind by design: Wer betreibt, kann nicht unbemerkt eingreifen.',
      'Die vollständige, zitierfähige Faktenlage in Minuten statt Stunden.',
      'Das Urteil bleibt beim Ingenieur — ShiftGate liefert Evidenz, keine Interpretation.',
    ],
  },
  {
    slug: 'lumena',
    name: 'LUMENA AI',
    logo: '/assets/projects/lumena.jpg',
    logoBg: '#fffffd',
    darkLogo: false,
    category: 'AI Governance · EU AI Act',
    verb: 'governen',
    tagline: 'Compliance-by-Proof für KI-Systeme.',
    intro:
      'LUMENA AI testet KI-Systeme technisch gegen konkrete EU-AI-Act-Artikel und erzeugt auditierbare Evidenz — Compliance-by-Proof statt Selbstauskunft. Und es schlägt datenbasiert vor, welche KI sich wirtschaftlich lohnt.',
    accent: '#818cf8',
    effect: 'radar',
    problemTitle: 'Die Governance-Lücke',
    problems: [
      {
        title: 'Selbstauskunft ist kein Nachweis',
        text: 'Fragebögen und Policies belegen nicht, wie sich ein KI-System tatsächlich verhält. Der EU AI Act verlangt mehr als gute Absichten.',
      },
      {
        title: 'Artikel sind konkret — Prüfungen selten',
        text: 'Transparenzpflichten, Robustheit, Human Oversight: Die Anforderungen sind präzise formuliert, werden aber selten technisch getestet.',
      },
      {
        title: 'Welche KI lohnt sich überhaupt?',
        text: 'Vor der Governance-Frage steht die Investitionsfrage. Ohne Datenbasis bleibt die Use-Case-Auswahl Bauchgefühl.',
      },
    ],
    flowTitle: 'Zwei Wedges, ein System',
    flow: [
      { label: 'Anbinden', desc: 'Das KI-System wird technisch angebunden — EU-souverän, EU-only Hosting.' },
      { label: 'Testen', desc: 'Konkrete EU-AI-Act-Artikel werden technisch geprüft, nicht abgefragt.' },
      { label: 'Evidenz erzeugen', desc: 'Jeder Test erzeugt auditierbare, nachvollziehbare Evidenz.' },
      { label: 'Use-Cases bewerten', desc: 'Datenbasierte Vorschläge, welche KI sich mit welchem ROI lohnt.' },
      { label: 'Governen', desc: 'LUMENA governt das Dazwischen — von der Idee bis zum konformen Betrieb.' },
    ],
    principles: [
      'Compliance-by-Proof: technische Tests gegen konkrete Artikel, nicht Checklisten.',
      'EU-souverän — EU-only Hosting, betreiber-blinde Architektur.',
      'Auditierbare Evidenz als Ergebnis, nicht als Nebenprodukt.',
      'Wedge 2: Use-Case-Generierung mit ROI — welche KI lohnt sich wirklich?',
    ],
  },
  {
    slug: 'procuvera',
    name: 'Procuvera',
    logo: '/assets/projects/procuvera.jpg',
    logoBg: '#0e1330',
    darkLogo: true,
    category: 'Spend & Compliance Governance',
    verb: 'steuern',
    tagline: 'Flaggt Risiko, urteilt nicht.',
    intro:
      'Procuvera governt Spend und Compliance in Transformationsprogrammen, die externe Beratung einkaufen — präventiv im Einsatzmoment, nicht reaktiv im Buchungsmoment. Off-Contract-Spend, Lieferantenkonzentration, ANÜ- und Werkvertrags-Risiken werden sichtbar, bevor sie teuer werden.',
    accent: '#fb923c',
    effect: 'radar',
    problemTitle: 'Das Finanzsystem sieht es zu spät',
    problems: [
      {
        title: 'Reaktiv im Buchungsmoment',
        text: 'ERP-Systeme governen das Finanzdokument — wenn gebucht wird, ist der Einsatz längst gelaufen. Procuvera governt den Einsatz selbst.',
      },
      {
        title: 'Off-Contract-Spend',
        text: 'Ist der eingesetzte Externe durch einen gültigen Rahmenvertrag für genau diesen Scope gedeckt? Meist weiß es niemand genau.',
      },
      {
        title: 'Arbeitsrechtliche Grauzonen',
        text: 'ANÜ, Werkvertrag, Scheinselbstständigkeit: Risiken entstehen im Einsatzalltag — und werden erst im Audit sichtbar.',
      },
      {
        title: 'Konzentration & Laufzeiten',
        text: 'Lieferantenkonzentration und auslaufende Rahmenverträge gefährden Programme schleichend.',
      },
    ],
    flowTitle: 'Governance im Einsatzmoment',
    flow: [
      { label: 'Erfassen', desc: 'Programme, Streams, Rahmenverträge, Einsätze und Kosten werden zusammengeführt.' },
      { label: 'Abgleichen', desc: 'Jeder Einsatz wird gegen Vertragsdeckung und Scope geprüft.' },
      { label: 'Flaggen', desc: 'ANÜ-/Werkvertrags-Signale und Compliance-Lücken werden markiert — als Risiko, nicht als Urteil.' },
      { label: 'Überwachen', desc: 'Lieferantenkonzentration und Vertragslaufzeiten bleiben kontinuierlich im Blick.' },
      { label: 'Steuern', desc: 'PMO, Einkauf und Legal entscheiden auf gemeinsamer Faktenbasis.' },
    ],
    principles: [
      'Flaggt Risiko, fällt keine Rechtsurteile — die juristische Bewertung bleibt bei Legal.',
      'Präventiv im Einsatzmoment statt reaktiv im Buchungsmoment.',
      'SAP-unabhängig im Kern, connector-basiert an der Datenkante.',
      'Für PMO, CFO, Einkauf und HR/Legal — eine gemeinsame Faktenbasis.',
    ],
  },
  {
    slug: 'limen',
    name: 'LIMEN',
    logo: '/assets/projects/limen.jpg',
    logoBg: '#fefefe',
    darkLogo: false,
    category: 'Regulatory Product Classification',
    verb: 'einordnen',
    tagline: 'Regulatory Compliance Simplified.',
    intro:
      'Limen — lateinisch: die Schwelle. Ein Musselintuch ist eine Textilie. Ein Schmusetuch ist Spielzeug. Gleiche Fabrik, gleicher Stoff — aber zwei völlig verschiedene Pflichtenwelten. LIMEN ordnet Produkte rechtlich ein, bevor sie in der EU in Verkehr gehen: deterministisch, stichtagsgenau, mit lückenloser Nachweiskette.',
    accent: '#60a5fa',
    effect: 'ledger',
    problemTitle: 'Die teure Reihenfolge',
    problems: [
      {
        title: 'Erst bestellen, dann erfahren',
        text: 'Händler erfahren die rechtliche Einordnung ihres Produkts heute in umgekehrter Reihenfolge: bestellen, verkaufen, Beanstandung.',
      },
      {
        title: 'Die Klassifikation ist der teure Teil',
        text: 'Die Pflichtenliste steht im Gesetz — Fleißarbeit. Der wertvolle Teil ist die Einordnung: Als was gilt dieses Produkt rechtlich?',
      },
      {
        title: 'Recht ändert sich stichtagsgenau',
        text: 'GPSR, PPWR, Spielzeug-Verordnung: Jede Regel hat Rechtsgrundlage und Gültigkeitszeitraum. Ändert sich das Regelwerk, müssen betroffene Produkte neu bewertet werden.',
      },
    ],
    flowTitle: 'Vom Produkt zur Nachweiskette',
    flow: [
      { label: 'Produktakte', desc: 'Alles, was über ein Produkt bekannt ist: Rohdaten, Dokumente, Lieferantenangaben, Bilder.' },
      { label: 'Merkmalsextraktion', desc: 'Strukturierte Extraktion typisierter Merkmale — mit Konfidenz und Fundstelle je Feld.' },
      { label: 'Regelauswertung', desc: 'Deterministisch, zum Stichtag, ohne LLM im Entscheidungspfad. Gleicher Input ergibt immer dasselbe Ergebnis.' },
      { label: 'Begründeter Befund', desc: 'Der vollständige Regelpfad mit Rechtsgrundlage wird offengelegt — verständlich formuliert.' },
      { label: 'Freigabe', desc: 'Kein Artefakt verlässt das System ohne Zeichnung durch eine fachkundige Person.' },
      { label: 'Nachweissatz', desc: 'Jede Auswertung wird unveränderlich verkettet — das Beweismittel gegenüber Marktüberwachung und Marktplatz.' },
    ],
    principles: [
      'Deterministischer Kern, probabilistische Ränder — kein LLM im Entscheidungspfad.',
      'Vier Ergebniszustände: entschieden, unentschieden, eskaliert — und ehrlich „normativ unbestimmt“.',
      'Ein System, das sagt „hier ist die Rechtslage strittig“, ist wertvoller als eines, das rät.',
      'Neubewertung bei Regelwerksänderung: Bindung und Haftungsschutz zugleich.',
    ],
  },
  {
    slug: 'veya',
    name: 'Veya',
    logo: '/assets/projects/veya.jpg',
    logoBg: '#000000',
    darkLogo: true,
    category: 'Workforce Progression',
    verb: 'befähigen',
    tagline: 'Progression, die man beweisen kann.',
    intro:
      'Veya optimiert nicht das Füllen einer Schicht, sondern die nachweisbare wirtschaftliche Progression einer Person. Die Leitfrage: Welche reale nächste Action erweitert unter einem selbst gewählten Ziel den nachweisbaren Opportunity-Raum?',
    accent: '#f4f4f5',
    effect: 'network',
    problemTitle: 'Profile sind keine Progression',
    problems: [
      {
        title: 'Deklarierte Identität',
        text: 'Netzwerke zeigen, was Menschen über sich sagen. Sie zeigen nicht, was jemand nachweislich getan hat — und was daraus erreichbar wird.',
      },
      {
        title: 'Bewerbung statt Entwicklung',
        text: 'Jobboards vermitteln auf vorhandene Stellen. Der Weg dorthin — welche Action welche Fähigkeit belegt — bleibt unsichtbar.',
      },
      {
        title: 'Scores ohne Substanz',
        text: 'Globale Personenscores reduzieren Menschen auf eine Zahl. Veya kennt keine Scores — nur belegte Fähigkeiten und erreichbare Möglichkeiten.',
      },
    ],
    flowTitle: 'Der Progressionsgraph',
    flow: [
      { label: 'Action', desc: 'Reale Arbeit, reale Einsätze — Veya ist an der Entstehung beteiligt.' },
      { label: 'Evidence', desc: 'Jede Action erzeugt Nachweise mit Provenance — nachvollziehbar, nicht behauptet.' },
      { label: 'Capability', desc: 'Aus Evidence entstehen belegte Fähigkeiten. Keine strategische Capability ohne Evidence.' },
      { label: 'Opportunity', desc: 'Fähigkeiten schalten die nächste erreichbare Opportunity frei — und der Kreislauf beginnt von vorn.' },
    ],
    principles: [
      'Keine strategisch wichtige Capability ohne Evidence — Evidence braucht Provenance.',
      'Keine globalen Personenscores. Keine Persönlichkeit als Capability.',
      'UNKNOWN ist keine Unfähigkeit.',
      'Jede Transition ist versioniert und auditierbar.',
    ],
  },
  {
    slug: 'nuvora',
    name: 'Nuvora',
    logo: '/assets/projects/nuvora.jpg',
    logoBg: '#fefefc',
    darkLogo: false,
    category: 'Computational Workforce Capacity',
    verb: 'berechnen',
    tagline: 'Workforce-Kapazität als berechenbares Modell.',
    intro:
      'Nuvora ist kein Staffing-Portal, sondern ein Computational Model of Workforce Capacity: Sieben aufeinander aufbauende Schichten machen aus Personaldaten belastbare Antworten — welche Kapazität existiert wirklich, was ist erlaubt, was passiert bei Veränderung?',
    accent: '#4ade80',
    effect: 'threads',
    problemTitle: 'Kapazität ist mehr als Kopfzahl',
    problems: [
      {
        title: 'Verfügbar heißt nicht einsetzbar',
        text: 'Qualifikation, Berechtigung, Einsatzkontext, Regeneration: Reale Einsetzbarkeit ist ein vielschichtiges Modell — kein Spaltenwert.',
      },
      {
        title: 'Entscheidungen ohne Reproduzierbarkeit',
        text: 'Werden Workforce-Entscheidungen zweimal getroffen, kommen oft zwei Ergebnisse heraus. Ein berechenbares Modell macht sie reproduzierbar.',
      },
      {
        title: 'Was-wäre-wenn bleibt Bauchgefühl',
        text: 'Was passiert bei Ausfall, Verschiebung, neuer Anforderung? Ohne Simulation bleibt die Antwort Spekulation.',
      },
    ],
    flowTitle: 'Sieben Schichten',
    flow: [
      { label: 'R1 · Semantics', desc: 'Was kann überhaupt repräsentiert werden? Das semantische Fundament.' },
      { label: 'R2 · Eligibility', desc: 'Was ist erlaubt? Regeln und Berechtigungen entscheiden.' },
      { label: 'R3 · Readiness', desc: 'Was ist jetzt wahr? Der aktuelle Zustand.' },
      { label: 'R4 · Capacity', desc: 'Welche Kapazität existiert tatsächlich? Die Berechnung.' },
      { label: 'R5 · Optimization', desc: 'Was sollten wir tun? Die Optimierung.' },
      { label: 'R6 · Counterfactual', desc: 'Was passiert, wenn wir es tun? Die Simulation.' },
      { label: 'R7 · Execution & Memory', desc: 'Was ist tatsächlich passiert? Das System lernt aus der Ausführung.' },
    ],
    principles: [
      'R1 represents. R2 decides. R3 determines state. R4 computes. R5 optimizes. R6 simulates. R7 learns.',
      'Hypothesen werden ausdrücklich von nachgewiesenen Aussagen getrennt.',
      'Privacy und Autorisierung sind Architektur, keine Einstellung.',
      'Spezifikationstiefe ist kein Beweis für Produktreife — Evidenz entscheidet.',
    ],
  },
  {
    slug: 'weftline',
    name: 'WEFTLINE',
    logo: '/assets/projects/weftline.jpg',
    logoBg: '#031539',
    darkLogo: true,
    category: 'Business Flow Assurance',
    verb: 'verifizieren',
    tagline: 'Your systems say it worked. WEFTLINE verifies the business flow actually did.',
    intro:
      'WEFTLINE überwacht geschäftskritische End-to-End-Prozessketten über ERP-, Integrations- und Umsystemgrenzen hinweg — und erkennt, wenn erwartete Geschäftszustände nicht eintreten. Auch dann, wenn die beteiligten Systeme technisch keinen Fehler melden.',
    accent: '#38bdf8',
    effect: 'threads',
    problemTitle: 'Der stille Fehler',
    problems: [
      {
        title: 'Grün heißt nicht gut',
        text: 'Jedes System meldet Erfolg — und trotzdem fehlt die Lieferung, hängt die Rechnung, stockt der Prozess. Der Fehler ist geschäftlich, nicht technisch.',
      },
      {
        title: 'Tagelange Klärung',
        text: 'Wenn eine Kette reißt, binden Mehrtagesfälle mehrere Experten in stundenlangen Klärungsrunden — das Problem ist die Zuordnung, nicht das Warten.',
      },
      {
        title: 'Monitoring sieht Systeme, nicht Ketten',
        text: 'Observability erzeugt Signale pro System. Niemand verifiziert, ob der Geschäftsfluss über alle Grenzen hinweg tatsächlich passiert ist.',
      },
    ],
    flowTitle: 'Erwartung gegen Wirklichkeit',
    flow: [
      { label: 'Scenario Graph', desc: 'Die Prozesskette wird als erwarteter Geschäftsfluss modelliert — von Order-to-Cash bis Hire-to-Retire.' },
      { label: 'Expectation Engine', desc: 'Erwartungsregeln definieren, welche Geschäftszustände wann eintreten müssen.' },
      { label: 'Soll-Ist-Abgleich', desc: 'Zyklischer Abgleich über System- und Herstellergrenzen hinweg.' },
      { label: 'Befund', desc: 'Weicht die Wirklichkeit ab, entsteht ein Befund mit Pfad, Betroffenheit und Coverage.' },
      { label: 'Übergabe', desc: 'Der Befund geht strukturiert an das vorhandene ITSM — Koexistenz statt Verdrängung.' },
    ],
    principles: [
      'Herstellerneutraler Kern, vendorspezifische Connectors — SAP ist der Anfang, nicht die Grenze.',
      'Process Packs: O2C, P2P, R2R, Plan-to-Produce, Warehouse-to-Ship, Hire-to-Retire.',
      'WEFTLINE erzeugt keine Signale — es verifiziert Geschäftszustände.',
      'Koexistenz mit dem vorhandenen ITSM statt Verdrängung.',
    ],
  },
];

export function getVenture(slug: string): Venture | null {
  return ventures.find((v) => v.slug === slug) ?? null;
}

export function getNextVenture(slug: string): Venture {
  const idx = ventures.findIndex((v) => v.slug === slug);
  return ventures[(idx + 1) % ventures.length];
}
