export type CareerBenefitSlug =
  | 'mental-health'
  | 'community'
  | 'physical-health'
  | 'purpose'
  | 'career-development'
  | 'global-perspectives'
  | 'financial-rewards';

export interface CareerBenefitItem {
  title: string;
  description: string;
}

export interface CareerBenefitFact {
  /** Display value, e.g. "24/7" or "€2.000" */
  value: string;
  label: string;
  /** Optional numeric target for animated counters */
  numeric?: number;
  prefix?: string;
  suffix?: string;
}

export interface CareerBenefitFaqItem {
  question: string;
  answer: string;
}

export interface CareerBenefitFeatureItem {
  title: string;
  description: string;
  /** Small meta text – used differently per theme (time, amount, location …) */
  meta?: string;
}

export interface CareerBenefitContent {
  /** Hero eyebrow/badge */
  badge: string;
  /** Hero headline */
  title: string;
  /** Hero subline (also used as meta description) */
  subtitle: string;
  /** 2–4 sentences: what this means at Quantiva */
  intro: string;
  itemsTitle: string;
  itemsSubtitle: string;
  items: CareerBenefitItem[];
  facts: CareerBenefitFact[];
  /** Distinctive themed section */
  featureTitle: string;
  featureSubtitle: string;
  featureItems: CareerBenefitFeatureItem[];
  /** Optional FAQ */
  faq?: CareerBenefitFaqItem[];
  ctaTitle: string;
  ctaSubtitle: string;
}

export interface CareerBenefit {
  slug: CareerBenefitSlug;
  de: CareerBenefitContent;
  en: CareerBenefitContent;
}

export const careerBenefits: Record<CareerBenefitSlug, CareerBenefit> = {
  'mental-health': {
    slug: 'mental-health',
    de: {
      badge: 'Wohlbefinden',
      title: 'Mental Health',
      subtitle:
        'Gute Beratung braucht einen klaren Kopf – wir nehmen mentale Gesundheit genauso ernst wie Projektziele.',
      intro:
        'Consulting kann intensiv sein – das wissen wir. Deshalb haben wir bei Quantiva Advisory Strukturen geschaffen, die mentale Gesundheit nicht dem Zufall überlassen: von zusätzlichen freien Tagen über anonyme Beratung bis zu geschützten Fokuszeiten ohne Meetings. Nicht als Feigenblatt, sondern als fester Teil unserer Arbeitskultur, den Führungskräfte aktiv vorleben.',
      itemsTitle: 'Was wir konkret tun',
      itemsSubtitle:
        'Keine Obstkorb-Rhetorik – das sind die Maßnahmen, die du ab Tag eins nutzen kannst.',
      items: [
        {
          title: 'Mental-Health-Tage',
          description:
            'Zwei zusätzliche freie Tage pro Jahr, die du spontan und ohne Begründung nehmen kannst – wenn der Kopf eine Pause braucht, bevor der Körper sie einfordert.',
        },
        {
          title: 'EAP: anonyme Beratung',
          description:
            'Über unser Employee Assistance Program erreichst du rund um die Uhr psychologische Berater:innen – anonym, kostenlos und auch für Angehörige in deinem Haushalt.',
        },
        {
          title: 'Flexible Auslastung',
          description:
            'Deine Projektauslastung ist Thema in jedem Staffing-Gespräch. Teilzeitmodelle, reduzierte Reisetätigkeit oder eine Projektpause sind echte Optionen – nicht nur auf dem Papier.',
        },
        {
          title: 'No-Meeting-Fokuszeiten',
          description:
            'Dienstag- und Donnerstagvormittag sind unternehmensweit meetingfrei. Zeit für konzentrierte Arbeit, Lernen oder einfach: weniger Kalender-Tetris.',
        },
        {
          title: 'Resilienz-Trainings',
          description:
            'Workshops zu Stressbewältigung, Abgrenzung im Projektalltag und gesunder Remote-Arbeit – geleitet von externen Coaches, mehrmals im Jahr.',
        },
        {
          title: 'Mental Health First Aiders',
          description:
            'Ausgebildete Ersthelfer:innen für psychische Gesundheit im Team – vertrauliche Ansprechpersonen auf Augenhöhe, wenn du nicht direkt zur Führungskraft gehen willst.',
        },
      ],
      facts: [
        { value: '2', label: 'Mental-Health-Tage pro Jahr – ohne Begründung' },
        { value: '24/7', label: 'EAP-Beratung, anonym & kostenlos' },
        { value: '2×', label: 'meetingfreie Vormittage pro Woche' },
        { value: '100%', label: 'vertraulich – nichts landet in deiner Akte' },
      ],
      featureTitle: 'Eine Woche mit Luft zum Atmen',
      featureSubtitle:
        'Mentale Gesundheit entsteht nicht durch ein Benefit-PDF, sondern durch den Rhythmus des Arbeitsalltags. So sieht er bei uns aus.',
      featureItems: [
        {
          title: 'Fokus statt Fragmentierung',
          description:
            'Zwei geschützte Vormittage pro Woche ohne Meetings – dein Kalender gehört dir, nicht den Terminserien anderer.',
          meta: 'Di & Do',
        },
        {
          title: 'Auslastungs-Check',
          description:
            'Kurzes wöchentliches Signal an dein Staffing: grün, gelb oder rot. Bei Gelb wird gesprochen, bei Rot wird gehandelt – innerhalb von 48 Stunden.',
          meta: 'wöchentlich',
        },
        {
          title: 'Pulse Check',
          description:
            'Anonyme Stimmungsabfrage im Team. Die Ergebnisse werden offen geteilt und in der Retro besprochen – nicht in der Schublade abgelegt.',
          meta: 'monatlich',
        },
        {
          title: 'Recharge',
          description:
            'Nach intensiven Projektphasen wie einem Go-Live gibt es bewusste Erholungsfenster, bevor das nächste Projekt startet.',
          meta: 'nach Go-Lives',
        },
      ],
      faq: [
        {
          question: 'Muss ich für einen Mental-Health-Tag einen Grund angeben?',
          answer:
            'Nein. Du trägst ihn wie Urlaub ein – ohne Begründung, ohne Rückfragen. Wir vertrauen dir, dass du am besten weißt, wann du ihn brauchst.',
        },
        {
          question: 'Ist das EAP wirklich anonym?',
          answer:
            'Ja. Das Programm wird von einem externen, unabhängigen Anbieter betrieben. Quantiva erfährt weder, wer es nutzt, noch worum es geht – wir sehen nur eine anonyme Gesamtstatistik.',
        },
        {
          question: 'Was passiert, wenn ich im Projekt dauerhaft überlastet bin?',
          answer:
            'Dann ist das ein Staffing-Problem, kein persönliches Versagen. Gemeinsam mit deinem Staffing-Partner justieren wir Auslastung, Rollenzuschnitt oder Projektbesetzung – notfalls auch mitten im Projekt.',
        },
      ],
      ctaTitle: 'Arbeiten, ohne dich aufzureiben',
      ctaSubtitle:
        'Werde Teil eines Teams, das Leistung und Erholung nicht gegeneinander ausspielt – bei Quantiva Advisory gehört beides zusammen.',
    },
    en: {
      badge: 'Wellbeing',
      title: 'Mental Health',
      subtitle:
        'Good consulting needs a clear head – we take mental health as seriously as project goals.',
      intro:
        'Consulting can be intense – we know that. That is why Quantiva Advisory has built structures that do not leave mental health to chance: from extra days off and anonymous counseling to protected focus time without meetings. Not as window dressing, but as a fixed part of our working culture that leaders actively model.',
      itemsTitle: 'What we actually do',
      itemsSubtitle:
        'No fruit-basket rhetoric – these are the measures you can use from day one.',
      items: [
        {
          title: 'Mental health days',
          description:
            'Two additional days off per year that you can take spontaneously and without giving a reason – when your head needs a break before your body demands one.',
        },
        {
          title: 'EAP: anonymous counseling',
          description:
            'Through our Employee Assistance Program you can reach psychological counselors around the clock – anonymous, free of charge and open to family members in your household.',
        },
        {
          title: 'Flexible workloads',
          description:
            'Your project workload is part of every staffing conversation. Part-time models, reduced travel or a project break are real options – not just words on paper.',
        },
        {
          title: 'No-meeting focus time',
          description:
            'Tuesday and Thursday mornings are meeting-free across the company. Time for deep work, learning, or simply: less calendar Tetris.',
        },
        {
          title: 'Resilience trainings',
          description:
            'Workshops on stress management, setting boundaries in project work and healthy remote habits – run by external coaches several times a year.',
        },
        {
          title: 'Mental health first aiders',
          description:
            'Trained mental health first aiders within the team – confidential peers you can talk to when you would rather not go straight to your manager.',
        },
      ],
      facts: [
        { value: '2', label: 'mental health days per year – no reason needed' },
        { value: '24/7', label: 'EAP counseling, anonymous & free' },
        { value: '2×', label: 'meeting-free mornings per week' },
        { value: '100%', label: 'confidential – nothing ends up in your file' },
      ],
      featureTitle: 'A week with room to breathe',
      featureSubtitle:
        'Mental health is not created by a benefits PDF, but by the rhythm of everyday work. This is what ours looks like.',
      featureItems: [
        {
          title: 'Focus over fragmentation',
          description:
            'Two protected mornings per week without meetings – your calendar belongs to you, not to other people’s recurring invites.',
          meta: 'Tue & Thu',
        },
        {
          title: 'Workload check',
          description:
            'A short weekly signal to your staffing partner: green, yellow or red. Yellow triggers a conversation, red triggers action – within 48 hours.',
          meta: 'weekly',
        },
        {
          title: 'Pulse check',
          description:
            'An anonymous team mood survey. Results are shared openly and discussed in the retro – not filed away in a drawer.',
          meta: 'monthly',
        },
        {
          title: 'Recharge',
          description:
            'After intense project phases such as a go-live, there are deliberate recovery windows before the next engagement starts.',
          meta: 'after go-lives',
        },
      ],
      faq: [
        {
          question: 'Do I have to give a reason for a mental health day?',
          answer:
            'No. You book it like vacation – no explanation, no questions asked. We trust you to know best when you need it.',
        },
        {
          question: 'Is the EAP really anonymous?',
          answer:
            'Yes. The program is run by an external, independent provider. Quantiva never learns who uses it or what it is about – we only see anonymous aggregate statistics.',
        },
        {
          question: 'What happens if I am permanently overloaded on a project?',
          answer:
            'Then that is a staffing problem, not a personal failure. Together with your staffing partner we adjust workload, role scope or project setup – mid-project if necessary.',
        },
      ],
      ctaTitle: 'Work without wearing yourself out',
      ctaSubtitle:
        'Join a team that refuses to trade performance against recovery – at Quantiva Advisory, the two belong together.',
    },
  },

  community: {
    slug: 'community',
    de: {
      badge: 'Miteinander',
      title: 'Beziehungsorientiert',
      subtitle:
        'Beratung ist Teamsport – wir sorgen dafür, dass du nie allein auf dem Spielfeld stehst.',
      intro:
        'Wer verteilt über Projekte, Kundenstandorte und Homeoffice arbeitet, braucht mehr als ein Org-Chart, um sich zugehörig zu fühlen. Bei Quantiva Advisory investieren wir bewusst in Beziehungen: mit einem Buddy ab Tag eins, aktiven Communities, regelmäßigen Team-Events und Ritualen, die remote genauso funktionieren wie im Büro in Düsseldorf.',
      itemsTitle: 'So wächst Zugehörigkeit',
      itemsSubtitle:
        'Sechs Bausteine, mit denen aus Kolleg:innen ein Team wird – egal von wo du arbeitest.',
      items: [
        {
          title: 'Buddy-Programm',
          description:
            'Ab deinem ersten Tag begleitet dich ein Buddy aus einem anderen Team durch die ersten sechs Monate – für alle Fragen, die man der Führungskraft nicht stellen mag.',
        },
        {
          title: 'Communities of Practice',
          description:
            'Ob SAP, Cloud, AI oder Consulting-Handwerk: In unseren Fach-Communities teilst du Wissen über Projektgrenzen hinweg – mit eigenem Budget und fester Zeit im Kalender.',
        },
        {
          title: 'Team-Events',
          description:
            'Quartalsweise Team-Events, Sommerfest und Winter-Offsite mit allen Kolleg:innen – geplant von wechselnden Crews, damit es nie das immergleiche Format gibt.',
        },
        {
          title: 'Employee Resource Groups',
          description:
            'Women in Tech, Queer @ Quantiva und unser Eltern-Netzwerk schaffen Räume für Austausch und tragen Themen direkt in die Geschäftsführung.',
        },
        {
          title: 'Remote-inklusive Rituale',
          description:
            'Coffee Roulette, hybride Town Halls und Meeting-Regeln, die Remote-Teilnehmende gleichberechtigt einbinden – Zugehörigkeit hängt bei uns nicht vom Standort ab.',
        },
        {
          title: 'Office als Treffpunkt',
          description:
            'Unser Büro in Düsseldorf ist kein Anwesenheitsnachweis, sondern Treffpunkt: Community Days, Projekt-Kickoffs und Afterworks geben dir gute Gründe hinzukommen – keine Pflicht.',
        },
      ],
      facts: [
        { value: '10+', label: 'aktive Communities & ERGs' },
        { value: 'Tag 1', label: 'dein Buddy wartet schon auf dich' },
        { value: '4', label: 'große Team-Events pro Jahr' },
        { value: '100%', label: 'remote-inklusiv – jedes Ritual funktioniert hybrid' },
      ],
      featureTitle: 'Rituale, die uns verbinden',
      featureSubtitle:
        'Gemeinschaft entsteht nicht auf Zuruf, sondern durch verlässliche Anlässe. Das sind unsere.',
      featureItems: [
        {
          title: 'Coffee Roulette',
          description:
            'Jede Woche lost dich unser Bot mit einer zufälligen Kollegin oder einem zufälligen Kollegen zusammen – 20 Minuten Kaffee, kein Arbeitsthema nötig.',
          meta: 'wöchentlich',
        },
        {
          title: 'Town Hall',
          description:
            'Zahlen, Projekte, Entscheidungen – die Geschäftsführung beantwortet jede Frage live. Hybrid, aufgezeichnet und mit anonymer Fragenbox.',
          meta: 'monatlich',
        },
        {
          title: 'Community Day',
          description:
            'Ein Tag im Quartal, an dem alle Communities parallel im Düsseldorfer Office tagen – mit gemeinsamem Abschluss und Afterwork.',
          meta: 'quartalsweise',
        },
        {
          title: 'Sommerfest & Winter-Offsite',
          description:
            'Zwei Fixpunkte im Jahr mit dem gesamten Unternehmen – inklusive Partner:innen beim Sommerfest und zwei Übernachtungen beim Offsite.',
          meta: '2× im Jahr',
        },
      ],
      faq: [
        {
          question: 'Ich arbeite fast vollständig remote – bin ich dann außen vor?',
          answer:
            'Nein. Alle Rituale sind hybrid angelegt, Reisen zu Team-Events und Community Days gelten als Arbeitszeit und werden vollständig übernommen.',
        },
        {
          question: 'Kann ich eine eigene Community gründen?',
          answer:
            'Ja. Drei Interessierte genügen – dann gibt es Budget, einen Slot im Kalender und Unterstützung beim Aufbau. So sind auch unsere Bouldering-Crew und das Eltern-Netzwerk entstanden.',
        },
      ],
      ctaTitle: 'Finde dein Team',
      ctaSubtitle:
        'Bei Quantiva Advisory triffst du Menschen, die Wissen teilen statt horten – und die sich auch nach Feierabend noch etwas zu sagen haben.',
    },
    en: {
      badge: 'Togetherness',
      title: 'Relationship-oriented',
      subtitle:
        'Consulting is a team sport – we make sure you are never alone on the pitch.',
      intro:
        'When you work across projects, client sites and home offices, you need more than an org chart to feel you belong. At Quantiva Advisory we deliberately invest in relationships: a buddy from day one, active communities, regular team events and rituals that work remotely just as well as in our Düsseldorf office.',
      itemsTitle: 'How belonging grows',
      itemsSubtitle:
        'Six building blocks that turn colleagues into a team – wherever you work from.',
      items: [
        {
          title: 'Buddy program',
          description:
            'From your first day, a buddy from another team accompanies you through your first six months – for all the questions you would rather not ask your manager.',
        },
        {
          title: 'Communities of practice',
          description:
            'Whether SAP, cloud, AI or the craft of consulting: our communities share knowledge across project boundaries – with their own budget and protected time in the calendar.',
        },
        {
          title: 'Team events',
          description:
            'Quarterly team events, a summer party and a winter offsite with the whole company – planned by rotating crews so it is never the same format twice.',
        },
        {
          title: 'Employee resource groups',
          description:
            'Women in Tech, Queer @ Quantiva and our parents’ network create spaces for exchange and bring their topics directly to the management team.',
        },
        {
          title: 'Remote-inclusive rituals',
          description:
            'Coffee roulette, hybrid town halls and meeting rules that put remote participants on equal footing – belonging does not depend on your location here.',
        },
        {
          title: 'The office as a meeting place',
          description:
            'Our Düsseldorf office is not an attendance tracker but a meeting place: community days, project kickoffs and afterworks give you good reasons to come – never an obligation.',
        },
      ],
      facts: [
        { value: '10+', label: 'active communities & ERGs' },
        { value: 'Day 1', label: 'your buddy is already waiting for you' },
        { value: '4', label: 'company-wide events per year' },
        { value: '100%', label: 'remote-inclusive – every ritual works hybrid' },
      ],
      featureTitle: 'Rituals that connect us',
      featureSubtitle:
        'Community does not appear on demand – it grows through reliable occasions. These are ours.',
      featureItems: [
        {
          title: 'Coffee roulette',
          description:
            'Every week our bot matches you with a random colleague – 20 minutes of coffee, no work talk required.',
          meta: 'weekly',
        },
        {
          title: 'Town hall',
          description:
            'Numbers, projects, decisions – the management team answers every question live. Hybrid, recorded, and with an anonymous question box.',
          meta: 'monthly',
        },
        {
          title: 'Community day',
          description:
            'One day per quarter when all communities meet in parallel at the Düsseldorf office – with a shared wrap-up and afterwork.',
          meta: 'quarterly',
        },
        {
          title: 'Summer party & winter offsite',
          description:
            'Two fixed highlights a year with the entire company – partners included at the summer party, two overnight stays at the offsite.',
          meta: 'twice a year',
        },
      ],
      faq: [
        {
          question: 'I work almost fully remote – will I be left out?',
          answer:
            'No. All rituals are designed hybrid-first, and travel to team events and community days counts as working time and is fully covered.',
        },
        {
          question: 'Can I start my own community?',
          answer:
            'Yes. Three interested people are enough – then you get budget, a slot in the calendar and support to get started. That is exactly how our bouldering crew and the parents’ network came to be.',
        },
      ],
      ctaTitle: 'Find your team',
      ctaSubtitle:
        'At Quantiva Advisory you will meet people who share knowledge instead of hoarding it – and who still have things to talk about after hours.',
    },
  },

  'physical-health': {
    slug: 'physical-health',
    de: {
      badge: 'Energie',
      title: 'Körperliche Gesundheit',
      subtitle:
        'Dein Körper trägt dich durch jedes Projekt – wir sorgen dafür, dass er dabei stark bleibt.',
      intro:
        'Acht Stunden Schreibtisch, Workshops, Reisen: Beratung fordert auch den Körper. Deshalb unterstützt Quantiva Advisory dich mit einem bezuschussten Sport-Abo, ergonomischer Ausstattung fürs Homeoffice, jährlichen Gesundheits-Checks und einem JobRad – und mit Sport-Communities, in denen Bewegung mehr Spaß macht als allein.',
      itemsTitle: 'Dein Gesundheits-Setup',
      itemsSubtitle:
        'Vom Schreibtisch bis zur Boulderhalle – diese Bausteine halten dich in Bewegung.',
      items: [
        {
          title: 'Urban Sports Club',
          description:
            'Wir bezuschussen deine Urban-Sports-Club-Mitgliedschaft mit 40 € im Monat – Gym, Schwimmen, Yoga oder Bouldern, in ganz Deutschland und flexibel kündbar.',
        },
        {
          title: 'Ergonomie im Homeoffice',
          description:
            'Höhenverstellbarer Schreibtisch, ergonomischer Stuhl und externer Monitor gehören zur Standardausstattung – finanziert über dein Equipment-Budget, geliefert bis an die Tür.',
        },
        {
          title: 'Gesundheits-Checkup',
          description:
            'Einmal im Jahr übernehmen wir einen umfassenden Gesundheits-Check inklusive Blutbild und Seh-Test – während der Arbeitszeit, bei einem Anbieter deiner Wahl.',
        },
        {
          title: 'JobRad-Leasing',
          description:
            'Lease dein Wunschrad – vom Gravelbike bis zum Lastenrad – steuerbegünstigt über die Gehaltsabrechnung, inklusive Versicherung und Inspektion.',
        },
        {
          title: 'Sport-Communities',
          description:
            'Running Crew, Bouldern und der jährliche Firmenlauf: Bei uns findest du Trainingspartner:innen auf jedem Level – der Spaß zählt, nicht die Bestzeit.',
        },
        {
          title: 'Vorsorge & Impfangebote',
          description:
            'Grippeschutzimpfung im Herbst, Bildschirmarbeitsplatz-Brille bei Bedarf und ergonomische Beratung für dein Setup – organisiert von uns, bezahlt von uns.',
        },
      ],
      facts: [
        { value: '€40', label: 'monatlicher Zuschuss zum Urban Sports Club', numeric: 40, prefix: '€' },
        { value: '1×', label: 'Gesundheits-Checkup pro Jahr – in der Arbeitszeit' },
        { value: '3', label: 'aktive Sport-Communities', numeric: 3 },
        { value: '100%', label: 'ergonomisches Homeoffice-Setup inklusive', numeric: 100, suffix: '%' },
      ],
      featureTitle: 'Gemeinsam in Bewegung',
      featureSubtitle:
        'Allein trainieren kann jeder – zusammen macht es mehr Spaß. Hier findest du Anschluss.',
      featureItems: [
        {
          title: 'Running Crew',
          description:
            'Lockerer 5–8-km-Lauf am Rhein, alle Tempi willkommen – danach gibt es Apfelschorle statt Protokoll.',
          meta: 'Mi · 18:00',
        },
        {
          title: 'Bouldern',
          description:
            'Gemeinsame Session in der Boulderhalle – Einsteiger:innen bekommen eine Intro von erfahrenen Kolleg:innen.',
          meta: 'Fr · 17:30',
        },
        {
          title: 'Firmenlauf Düsseldorf',
          description:
            'Einmal im Jahr laufen wir als Team beim Firmenlauf – Startgebühr, Trikot und das Grillen danach gehen auf uns.',
          meta: 'jährlich',
        },
        {
          title: 'Active Break',
          description:
            'Fünfzehn Minuten Mobility und Stretching per Video-Call – perfekt gegen den Schreibtisch-Rücken, Kamera optional.',
          meta: 'Mo & Do · 12:30',
        },
      ],
      ctaTitle: 'Stark ins nächste Projekt',
      ctaSubtitle:
        'Bring deine Energie in ein Team, das Gesundheit nicht dem Kalender opfert – Quantiva Advisory hält dich in Bewegung.',
    },
    en: {
      badge: 'Energy',
      title: 'Physical Health',
      subtitle:
        'Your body carries you through every project – we make sure it stays strong along the way.',
      intro:
        'Eight hours at a desk, workshops, travel: consulting challenges the body, too. That is why Quantiva Advisory supports you with a subsidized sports membership, ergonomic home-office equipment, annual health checkups and a leased bike – plus sports communities that make exercise more fun than going it alone.',
      itemsTitle: 'Your health setup',
      itemsSubtitle:
        'From your desk to the bouldering gym – these building blocks keep you moving.',
      items: [
        {
          title: 'Urban Sports Club',
          description:
            'We subsidize your Urban Sports Club membership with €40 per month – gym, swimming, yoga or bouldering, all across Germany and flexible to cancel.',
        },
        {
          title: 'Ergonomics at home',
          description:
            'A height-adjustable desk, an ergonomic chair and an external monitor are standard equipment – financed through your equipment budget and delivered to your door.',
        },
        {
          title: 'Health checkup',
          description:
            'Once a year we cover a comprehensive health check including blood panel and eye test – during working hours, at a provider of your choice.',
        },
        {
          title: 'Bike leasing',
          description:
            'Lease the bike you want – from gravel bike to cargo bike – tax-efficiently through payroll, insurance and servicing included.',
        },
        {
          title: 'Sports communities',
          description:
            'Running crew, bouldering and the annual corporate run: you will find training partners at every level – fun counts, not personal bests.',
        },
        {
          title: 'Prevention & vaccinations',
          description:
            'Flu shots in autumn, screen-work glasses when needed and ergonomic advice for your setup – organized by us, paid by us.',
        },
      ],
      facts: [
        { value: '€40', label: 'monthly Urban Sports Club subsidy', numeric: 40, prefix: '€' },
        { value: '1×', label: 'health checkup per year – on working time' },
        { value: '3', label: 'active sports communities', numeric: 3 },
        { value: '100%', label: 'ergonomic home-office setup included', numeric: 100, suffix: '%' },
      ],
      featureTitle: 'Moving together',
      featureSubtitle:
        'Anyone can train alone – together it is simply more fun. This is where you plug in.',
      featureItems: [
        {
          title: 'Running crew',
          description:
            'An easy 5–8 km run along the Rhine, all paces welcome – followed by apple spritzer instead of meeting minutes.',
          meta: 'Wed · 6 pm',
        },
        {
          title: 'Bouldering',
          description:
            'A joint session at the bouldering gym – beginners get an intro from experienced colleagues.',
          meta: 'Fri · 5:30 pm',
        },
        {
          title: 'Düsseldorf corporate run',
          description:
            'Once a year we run the corporate run as a team – entry fee, jersey and the barbecue afterwards are on us.',
          meta: 'annually',
        },
        {
          title: 'Active break',
          description:
            'Fifteen minutes of mobility and stretching via video call – perfect against desk back, camera optional.',
          meta: 'Mon & Thu · 12:30',
        },
      ],
      ctaTitle: 'Strong into your next project',
      ctaSubtitle:
        'Bring your energy to a team that refuses to sacrifice health to the calendar – Quantiva Advisory keeps you moving.',
    },
  },

  purpose: {
    slug: 'purpose',
    de: {
      badge: 'Sinn & Richtung',
      title: 'Zielgerichtet',
      subtitle:
        'Du willst wissen, wofür du morgens arbeitest – wir geben dir Ziele, die diesen Namen verdienen.',
      intro:
        'Sinn entsteht nicht durch ein Poster im Flur. Bei Quantiva Advisory weißt du, woran das Unternehmen arbeitet, warum dein Projekt dazu beiträgt und woran dein Erfolg gemessen wird. Unsere Mission: den deutschen Mittelstand digital souverän machen – mit transparenten OKRs, einer ehrlichen Feedback-Kultur und einem Nachhaltigkeits-Engagement, das über Kompensationszertifikate hinausgeht.',
      itemsTitle: 'Woran du dich orientieren kannst',
      itemsSubtitle:
        'Mission, Ziele, Feedback und Verantwortung – so übersetzen wir Sinn in Alltag.',
      items: [
        {
          title: 'Eine Mission, die trägt',
          description:
            'Wir machen den Mittelstand digital souverän – unabhängig von Hyperscaler-Lock-ins und Berater-Abhängigkeit. Jedes Projekt zahlt erkennbar auf dieses Ziel ein.',
        },
        {
          title: 'Transparente OKRs',
          description:
            'Quartalsweise Objectives & Key Results – vom Unternehmensziel bis zum Teamziel für alle einsehbar. Du siehst jederzeit, wie dein Beitrag ins große Bild passt.',
        },
        {
          title: 'Feedback-Kultur',
          description:
            'Quartalsweise Entwicklungsgespräche und 360°-Feedback nach jedem Projekt – statt eines Jahresgesprächs, an das sich im Dezember niemand mehr erinnert.',
        },
        {
          title: 'Werte mit Konsequenz',
          description:
            'Unsere vier Werte sind Entscheidungskriterien, keine Wanddeko: Sie fließen in Staffing, Beförderungen und auch in die Frage ein, welche Kunden wir annehmen.',
        },
        {
          title: 'Nachhaltigkeit im Alltag',
          description:
            'Bahn vor Flug, CO₂-Bilanz pro Projekt und Green-IT-Beratung als eigenes Angebot – Nachhaltigkeit ist bei uns Arbeitsweise, nicht Marketingkapitel.',
        },
        {
          title: 'Impact-Tage',
          description:
            'Zwei bezahlte Tage pro Jahr für gemeinnütziges Engagement – ob Pro-bono-Beratung für NGOs, Coding-Workshops für Schüler:innen oder dein eigenes Herzensprojekt.',
        },
      ],
      facts: [
        { value: '4', label: 'Werte, die in echte Entscheidungen einfließen' },
        { value: '100%', label: 'transparente OKRs – vom Unternehmen bis ins Team' },
        { value: '2', label: 'bezahlte Impact-Tage pro Jahr' },
        { value: '4×', label: 'Feedback- & Entwicklungsgespräche im Jahr' },
      ],
      featureTitle: 'Unsere Werte – und was sie im Alltag bedeuten',
      featureSubtitle:
        'Vier Leitplanken, an denen wir Entscheidungen ausrichten. Nicht perfekt, aber ernst gemeint.',
      featureItems: [
        {
          title: 'Klarheit vor Buzzwords',
          description:
            'Wir erklären Technologie so, dass Entscheidungen möglich werden – beim Kunden wie intern. Wer etwas nicht einfach erklären kann, hat es noch nicht fertig gedacht.',
          meta: 'Wert 01',
        },
        {
          title: 'Verantwortung statt Absicherung',
          description:
            'Wir empfehlen, was dem Kunden nützt – auch wenn es weniger Beratungstage bedeutet. Absicherungs-Folien schreiben andere.',
          meta: 'Wert 02',
        },
        {
          title: 'Lernen als Haltung',
          description:
            'Jedes Projekt endet mit einer ehrlichen Retro. Fehler werden analysiert, nicht versteckt – und geteiltes Wissen zählt mehr als gehütetes.',
          meta: 'Wert 03',
        },
        {
          title: 'Wirkung vor Auslastung',
          description:
            'Wir messen Erfolg am Ergebnis beim Kunden, nicht an fakturierten Stunden. Deshalb sagen wir auch mal Nein zu einem Projekt, das nur den Umsatz mehrt.',
          meta: 'Wert 04',
        },
      ],
      faq: [
        {
          question: 'Wie entstehen die OKRs – top-down oder gemeinsam?',
          answer:
            'Die Unternehmens-Objectives schlägt die Geschäftsführung vor, die Teams formulieren ihre Key Results selbst. Vor jedem Quartal gibt es einen offenen Review, in dem jede:r Einwände einbringen kann.',
        },
        {
          question: 'Was passiert mit meinem Feedback wirklich?',
          answer:
            'Jedes Quartalsgespräch endet mit konkreten Vereinbarungen, die im nächsten Gespräch überprüft werden. Team-Feedback aus den Pulse Checks wird in den Retros öffentlich besprochen.',
        },
        {
          question: 'Wie ernst ist das Nachhaltigkeits-Engagement?',
          answer:
            'Messbar ernst: Bahn ist Standard bei Inlandsreisen, wir bilanzieren CO₂ pro Projekt und unsere Geschäftsführung hat Nachhaltigkeitsziele in den eigenen OKRs.',
        },
      ],
      ctaTitle: 'Arbeite an etwas, das bleibt',
      ctaSubtitle:
        'Wenn du Ziele willst, die mehr sind als Umsatzvorgaben, bist du bei Quantiva Advisory richtig.',
    },
    en: {
      badge: 'Meaning & direction',
      title: 'Purpose-driven',
      subtitle:
        'You want to know what you get up for in the morning – we give you goals worthy of the name.',
      intro:
        'Purpose is not created by a poster in the hallway. At Quantiva Advisory you know what the company is working towards, why your project contributes to it and how your success is measured. Our mission: making the German Mittelstand digitally sovereign – with transparent OKRs, an honest feedback culture and a sustainability commitment that goes beyond offset certificates.',
      itemsTitle: 'What you can navigate by',
      itemsSubtitle:
        'Mission, goals, feedback and responsibility – this is how we translate purpose into everyday work.',
      items: [
        {
          title: 'A mission that carries',
          description:
            'We make the Mittelstand digitally sovereign – independent of hyperscaler lock-ins and consultant dependency. Every project visibly contributes to this goal.',
        },
        {
          title: 'Transparent OKRs',
          description:
            'Quarterly objectives & key results – visible to everyone, from company goals down to team goals. You can always see how your contribution fits the bigger picture.',
        },
        {
          title: 'Feedback culture',
          description:
            'Quarterly development talks and 360° feedback after every project – instead of one annual review nobody remembers by December.',
        },
        {
          title: 'Values with consequences',
          description:
            'Our four values are decision criteria, not wall decoration: they shape staffing, promotions and even the question of which clients we take on.',
        },
        {
          title: 'Sustainability in practice',
          description:
            'Train before plane, a CO₂ balance per project and green-IT consulting as a dedicated offering – sustainability is how we work, not a marketing chapter.',
        },
        {
          title: 'Impact days',
          description:
            'Two paid days per year for community engagement – pro-bono consulting for NGOs, coding workshops for students, or a cause of your own choosing.',
        },
      ],
      facts: [
        { value: '4', label: 'values that shape real decisions' },
        { value: '100%', label: 'transparent OKRs – from company to team level' },
        { value: '2', label: 'paid impact days per year' },
        { value: '4×', label: 'feedback & development talks per year' },
      ],
      featureTitle: 'Our values – and what they mean day to day',
      featureSubtitle:
        'Four guardrails we align decisions with. Not perfect, but meant seriously.',
      featureItems: [
        {
          title: 'Clarity over buzzwords',
          description:
            'We explain technology so that decisions become possible – for clients and internally. If you cannot explain it simply, you have not finished thinking it through.',
          meta: 'Value 01',
        },
        {
          title: 'Responsibility over cover',
          description:
            'We recommend what benefits the client – even when it means fewer billable days. Let others write the cover-your-back slides.',
          meta: 'Value 02',
        },
        {
          title: 'Learning as an attitude',
          description:
            'Every project ends with an honest retro. Mistakes are analyzed, not hidden – and shared knowledge counts more than guarded knowledge.',
          meta: 'Value 03',
        },
        {
          title: 'Impact over utilization',
          description:
            'We measure success by outcomes at the client, not by billed hours. That is why we sometimes say no to a project that would only grow revenue.',
          meta: 'Value 04',
        },
      ],
      faq: [
        {
          question: 'How are OKRs created – top-down or together?',
          answer:
            'Company objectives are proposed by the management team; the teams formulate their own key results. Before each quarter there is an open review where anyone can raise objections.',
        },
        {
          question: 'What actually happens with my feedback?',
          answer:
            'Every quarterly talk ends with concrete agreements that are reviewed in the next one. Team feedback from the pulse checks is discussed openly in the retros.',
        },
        {
          question: 'How serious is the sustainability commitment?',
          answer:
            'Measurably serious: trains are the default for domestic travel, we track CO₂ per project, and our management team carries sustainability goals in their own OKRs.',
        },
      ],
      ctaTitle: 'Work on something that lasts',
      ctaSubtitle:
        'If you want goals that are more than revenue targets, Quantiva Advisory is the right place for you.',
    },
  },

  'career-development': {
    slug: 'career-development',
    de: {
      badge: 'Wachstum',
      title: 'Bereit für deine Karriere',
      subtitle:
        'Vom ersten Projekt bis zur Principal-Rolle – mit Budget, Mentoring und einem Pfad, den du selbst steuerst.',
      intro:
        'Deine Entwicklung ist bei Quantiva Advisory kein Nebenprodukt der Projektarbeit, sondern hat eigene Zeit, eigenes Budget und eine klare Struktur: 2.000 € Lernbudget plus fünf Lerntage im Jahr, bezahlte Zertifizierungen von SAP über AWS bis Azure, eine feste Mentorin oder einen festen Mentor ab Tag eins – und Karrierepfade, in denen die Fachlaufbahn genauso weit führt wie die Führungslaufbahn.',
      itemsTitle: 'Deine Entwicklungs-Bausteine',
      itemsSubtitle:
        'Sechs Instrumente, mit denen du dein nächstes Level erreichst – in deinem Tempo.',
      items: [
        {
          title: 'Lernbudget & Lerntage',
          description:
            '2.000 € und fünf Arbeitstage pro Jahr für Kurse, Bücher, Konferenzen oder Coaching – du entscheidest, was dich weiterbringt, ohne Genehmigungs-Marathon.',
        },
        {
          title: 'Zertifizierungen',
          description:
            'SAP-, AWS- und Azure-Zertifizierungen inklusive Prüfungsgebühren, Lernmaterial und Vorbereitungszeit während der Arbeitszeit – auch beim zweiten Anlauf.',
        },
        {
          title: 'Mentoring ab Tag eins',
          description:
            'Ein:e erfahrene:r Mentor:in außerhalb deiner Projektlinie begleitet deine Entwicklung – mit halbjährlichen Development Talks und ehrlichem Karriere-Sparring.',
        },
        {
          title: 'Klare Karrierepfade',
          description:
            'Von Junior bis Principal mit transparenten Kriterien pro Level – und der Wahl zwischen Fach- und Führungslaufbahn, gleichwertig in Gehalt und Ansehen.',
        },
        {
          title: 'Quantiva Academy',
          description:
            'Interne Trainings, Brownbag-Sessions und Zertifizierungs-Lerngruppen – von Kolleg:innen für Kolleg:innen, jede Woche im Kalender.',
        },
        {
          title: 'Konferenzen',
          description:
            'Eine Fachkonferenz pro Jahr on top zum Lernbudget – ob DSAG-Jahreskongress, AWS Summit oder KubeCon. Wer spricht statt nur zuhört, bekommt Extra-Vorbereitungszeit.',
        },
      ],
      facts: [
        { value: '€2.000', label: 'Lernbudget pro Jahr – frei einsetzbar' },
        { value: '5', label: 'zusätzliche Lerntage jährlich' },
        { value: '60+', label: 'aktive Zertifizierungen im Team' },
        { value: '2', label: 'gleichwertige Laufbahnen: Fach & Führung' },
      ],
      featureTitle: 'Dein Weg: von Junior bis Principal',
      featureSubtitle:
        'Fünf Level, transparente Kriterien – und an jeder Station die Wahl, wie es weitergeht.',
      featureItems: [
        {
          title: 'Junior Consultant',
          description:
            'Du lernst das Handwerk: erste Projektmodule, enge Begleitung durch Mentor:in und Buddy, erste Zertifizierung im ersten Jahr.',
          meta: 'Level 01',
        },
        {
          title: 'Consultant',
          description:
            'Du übernimmst eigene Arbeitspakete und Kundenkontakt – und entwickelst dein fachliches Profil in einer unserer Practices.',
          meta: 'Level 02',
        },
        {
          title: 'Senior Consultant',
          description:
            'Du verantwortest Teilprojekte, führst fachlich kleine Teams und gibst dein Wissen in der Academy weiter.',
          meta: 'Level 03',
        },
        {
          title: 'Lead Consultant',
          description:
            'Du steuerst komplette Projekte oder entwickelst als Expert:in ein Fachgebiet strategisch weiter – hier trennen sich Fach- und Führungspfad.',
          meta: 'Level 04',
        },
        {
          title: 'Principal',
          description:
            'Du prägst Angebote, Methoden und Kundenbeziehungen des gesamten Unternehmens – als Führungskraft oder als fachliche Autorität.',
          meta: 'Level 05',
        },
      ],
      faq: [
        {
          question: 'Wie schnell kann ich das nächste Level erreichen?',
          answer:
            'Es gibt keine Mindestverweildauer. Beförderungen basieren auf den transparenten Level-Kriterien und werden zweimal im Jahr entschieden – dein:e Mentor:in bereitet den Case gemeinsam mit dir vor.',
        },
        {
          question: 'Was passiert, wenn ich durch eine Zertifizierungsprüfung falle?',
          answer:
            'Wir übernehmen auch den zweiten Versuch – inklusive zusätzlicher Vorbereitungszeit. Prüfungsangst soll keine Karrierefrage sein.',
        },
        {
          question: 'Muss ich irgendwann in die Führungsrolle wechseln?',
          answer:
            'Nein. Die Fachlaufbahn führt bis Principal und ist in Gehaltsband und Sichtbarkeit der Führungslaufbahn gleichgestellt. Tiefe Expertise ist bei uns kein Karriere-Sackgassenschild.',
        },
      ],
      ctaTitle: 'Dein nächstes Level wartet',
      ctaSubtitle:
        'Bring deine Neugier mit – Budget, Mentoring und einen klaren Pfad bekommst du von uns.',
    },
    en: {
      badge: 'Growth',
      title: 'Career Ready',
      subtitle:
        'From your first project to a principal role – with budget, mentoring and a path you steer yourself.',
      intro:
        'At Quantiva Advisory, your development is not a by-product of project work – it has its own time, its own budget and a clear structure: a €2,000 learning budget plus five learning days per year, paid certifications from SAP to AWS and Azure, a dedicated mentor from day one – and career paths where the expert track goes just as far as the leadership track.',
      itemsTitle: 'Your development building blocks',
      itemsSubtitle:
        'Six instruments to reach your next level – at your own pace.',
      items: [
        {
          title: 'Learning budget & learning days',
          description:
            '€2,000 and five working days per year for courses, books, conferences or coaching – you decide what moves you forward, without an approval marathon.',
        },
        {
          title: 'Certifications',
          description:
            'SAP, AWS and Azure certifications including exam fees, study material and preparation time during working hours – second attempts included.',
        },
        {
          title: 'Mentoring from day one',
          description:
            'An experienced mentor outside your project line accompanies your development – with semi-annual development talks and honest career sparring.',
        },
        {
          title: 'Clear career paths',
          description:
            'From junior to principal with transparent criteria per level – and the choice between expert and leadership track, equal in salary and standing.',
        },
        {
          title: 'Quantiva Academy',
          description:
            'Internal trainings, brownbag sessions and certification study groups – by colleagues, for colleagues, every week in the calendar.',
        },
        {
          title: 'Conferences',
          description:
            'One professional conference per year on top of your learning budget – DSAG annual congress, AWS Summit or KubeCon. Speakers get extra preparation time.',
        },
      ],
      facts: [
        { value: '€2,000', label: 'learning budget per year – yours to allocate' },
        { value: '5', label: 'additional learning days annually' },
        { value: '60+', label: 'active certifications across the team' },
        { value: '2', label: 'equal tracks: expert & leadership' },
      ],
      featureTitle: 'Your path: from junior to principal',
      featureSubtitle:
        'Five levels, transparent criteria – and at every station, the choice of where to go next.',
      featureItems: [
        {
          title: 'Junior Consultant',
          description:
            'You learn the craft: first project modules, close support from your mentor and buddy, first certification within year one.',
          meta: 'Level 01',
        },
        {
          title: 'Consultant',
          description:
            'You own work packages and client contact – and sharpen your professional profile in one of our practices.',
          meta: 'Level 02',
        },
        {
          title: 'Senior Consultant',
          description:
            'You are responsible for sub-projects, lead small teams on the subject-matter side and share your knowledge in the Academy.',
          meta: 'Level 03',
        },
        {
          title: 'Lead Consultant',
          description:
            'You run entire projects or strategically develop a field of expertise – this is where the expert and leadership paths diverge.',
          meta: 'Level 04',
        },
        {
          title: 'Principal',
          description:
            'You shape offerings, methods and client relationships of the whole company – as a leader or as a subject-matter authority.',
          meta: 'Level 05',
        },
      ],
      faq: [
        {
          question: 'How quickly can I reach the next level?',
          answer:
            'There is no minimum tenure. Promotions are based on the transparent level criteria and decided twice a year – your mentor prepares the case together with you.',
        },
        {
          question: 'What happens if I fail a certification exam?',
          answer:
            'We cover the second attempt as well – including additional preparation time. Exam nerves should never be a career question.',
        },
        {
          question: 'Do I eventually have to move into a leadership role?',
          answer:
            'No. The expert track goes all the way to principal and matches the leadership track in salary band and visibility. Deep expertise is not a career dead end here.',
        },
      ],
      ctaTitle: 'Your next level is waiting',
      ctaSubtitle:
        'Bring your curiosity – the budget, the mentoring and a clear path are on us.',
    },
  },

  'global-perspectives': {
    slug: 'global-perspectives',
    de: {
      badge: 'Über Grenzen hinaus',
      title: 'Globale Perspektiven',
      subtitle:
        'Mittelstand heißt nicht Provinz – arbeite an internationalen Rollouts, aus dem Land deiner Wahl.',
      intro:
        'Unsere Kunden sind Weltmarktführer aus dem deutschen Mittelstand – ihre Werke, Tochtergesellschaften und Rollouts sind international. Bei Quantiva Advisory arbeitest du an Projekten von Wien bis Warschau, kannst bis zu 30 Tage im Jahr aus dem EU-Ausland arbeiten und entwickelst dich in Sprachkursen und cross-border Teams weiter. Die Welt wird größer, ohne dass du den Arbeitgeber wechseln musst.',
      itemsTitle: 'Deine Welt bei Quantiva',
      itemsSubtitle:
        'Internationale Projekte, flexible Arbeitsorte und Teams über Zeitzonen hinweg.',
      items: [
        {
          title: 'Internationale Projekte',
          description:
            'S/4HANA-Template-Rollouts in europäische Tochtergesellschaften, Cloud-Migrationen für Standorte von Porto bis Posen – Hidden Champions denken international, du auch.',
        },
        {
          title: 'Workation-Policy',
          description:
            'Bis zu 30 Tage pro Jahr aus dem EU-Ausland arbeiten – unbürokratisch beantragt, steuerlich und versicherungstechnisch von uns geklärt.',
        },
        {
          title: 'Cross-Border-Teams',
          description:
            'Du arbeitest mit Nearshore-Kolleg:innen in Warschau und Porto in gemischten Projektteams – mit englischsprachiger Dokumentation und gemeinsamen Retros.',
        },
        {
          title: 'Sprachkurse',
          description:
            'Business English mit Trainer:in, Deutschkurse für internationale Kolleg:innen und eine Sprachlern-App-Lizenz für alles darüber hinaus – während der Arbeitszeit.',
        },
        {
          title: 'Internationale Communities',
          description:
            'Austausch mit Partner-Beratungen in unserem europäischen Netzwerk: gemeinsame Trainings, Peer-Reviews und ein jährliches Cross-Company-Meetup.',
        },
        {
          title: 'Relocation-Support',
          description:
            'Du ziehst für uns nach Deutschland? Wir unterstützen bei Visum, Anmeldung und Wohnungssuche – und dein Buddy spricht deine Sprache.',
        },
      ],
      facts: [
        { value: '30', label: 'Workation-Tage im EU-Ausland pro Jahr' },
        { value: '9', label: 'Länder mit aktiven Projekten' },
        { value: '12', label: 'Nationalitäten im Team' },
        { value: '3', label: 'Zeitzonen im täglichen Doing' },
      ],
      featureTitle: 'Wo wir arbeiten',
      featureSubtitle:
        'Von unserem Zuhause in Düsseldorf über Projektstandorte bis zu Workation-Favoriten – eine Auswahl.',
      featureItems: [
        {
          title: 'Düsseldorf',
          description: 'Unser Hauptsitz und Treffpunkt – Community Days, Kickoffs und Rheinblick.',
          meta: 'HQ · UTC+1',
        },
        {
          title: 'Wien',
          description: 'S/4HANA-Rollout bei der österreichischen Tochter eines Maschinenbauers.',
          meta: 'Projekt · UTC+1',
        },
        {
          title: 'Warschau',
          description: 'Unser Nearshore-Partnerteam für Entwicklung und 2nd-Level-Support.',
          meta: 'Partner · UTC+1',
        },
        {
          title: 'Porto',
          description: 'Cloud-Engineering-Hub unseres Partnernetzwerks – und beliebtes Workation-Ziel.',
          meta: 'Partner · UTC+0',
        },
        {
          title: 'Zürich',
          description: 'Security- und Compliance-Projekte für Schweizer Mittelständler.',
          meta: 'Projekt · UTC+1',
        },
        {
          title: 'Lissabon',
          description: 'Workation-Favorit im Team – Meerblick und stabile Zeitzone inklusive.',
          meta: 'Workation · UTC+0',
        },
      ],
      faq: [
        {
          question: 'Wie viel muss ich reisen?',
          answer:
            'Weniger als das Beratungs-Klischee vermuten lässt: Die meisten Projekte laufen hybrid mit gezielten Vor-Ort-Terminen. Deine Reisebereitschaft besprechen wir im Staffing – nicht umgekehrt.',
        },
        {
          question: 'Wie funktioniert die Workation konkret?',
          answer:
            'Kurzer Antrag im Tool, Freigabe innerhalb weniger Tage. Sozialversicherung (A1) und steuerliche Rahmenbedingungen für EU-Länder haben wir zentral geklärt – du buchst nur noch die Unterkunft.',
        },
        {
          question: 'Brauche ich perfektes Englisch?',
          answer:
            'Nein – solides Arbeitsniveau reicht, den Rest entwickelst du in unseren Kursen. In cross-border Projekten wirst du schneller sicher, als du denkst.',
        },
      ],
      ctaTitle: 'Arbeite über Grenzen hinweg',
      ctaSubtitle:
        'Internationale Projekte, Workation und ein Team aus zwölf Nationen – deine Perspektive fehlt noch.',
    },
    en: {
      badge: 'Beyond borders',
      title: 'Global Perspectives',
      subtitle:
        'Mittelstand does not mean provincial – work on international rollouts, from the country of your choice.',
      intro:
        'Our clients are world market leaders from the German Mittelstand – their plants, subsidiaries and rollouts are international. At Quantiva Advisory you work on projects from Vienna to Warsaw, can work up to 30 days per year from other EU countries and grow through language courses and cross-border teams. Your world gets bigger without you having to change employers.',
      itemsTitle: 'Your world at Quantiva',
      itemsSubtitle:
        'International projects, flexible places of work and teams across time zones.',
      items: [
        {
          title: 'International projects',
          description:
            'S/4HANA template rollouts to European subsidiaries, cloud migrations for sites from Porto to Poznań – hidden champions think internationally, and so will you.',
        },
        {
          title: 'Workation policy',
          description:
            'Work up to 30 days per year from other EU countries – requested without red tape, with tax and insurance questions sorted out by us.',
        },
        {
          title: 'Cross-border teams',
          description:
            'You work in mixed project teams with nearshore colleagues in Warsaw and Porto – with English-language documentation and shared retros.',
        },
        {
          title: 'Language courses',
          description:
            'Business English with a trainer, German courses for international colleagues and a language-app license for everything beyond – during working hours.',
        },
        {
          title: 'International communities',
          description:
            'Exchange with partner consultancies in our European network: joint trainings, peer reviews and an annual cross-company meetup.',
        },
        {
          title: 'Relocation support',
          description:
            'Moving to Germany to join us? We help with visa, registration and finding a flat – and your buddy speaks your language.',
        },
      ],
      facts: [
        { value: '30', label: 'workation days in EU countries per year' },
        { value: '9', label: 'countries with active projects' },
        { value: '12', label: 'nationalities on the team' },
        { value: '3', label: 'time zones in day-to-day work' },
      ],
      featureTitle: 'Where we work',
      featureSubtitle:
        'From our home base in Düsseldorf to project sites and workation favorites – a selection.',
      featureItems: [
        {
          title: 'Düsseldorf',
          description: 'Our headquarters and meeting place – community days, kickoffs and a view of the Rhine.',
          meta: 'HQ · UTC+1',
        },
        {
          title: 'Vienna',
          description: 'S/4HANA rollout at the Austrian subsidiary of a machine manufacturer.',
          meta: 'Project · UTC+1',
        },
        {
          title: 'Warsaw',
          description: 'Our nearshore partner team for development and second-level support.',
          meta: 'Partner · UTC+1',
        },
        {
          title: 'Porto',
          description: 'Cloud engineering hub of our partner network – and a popular workation destination.',
          meta: 'Partner · UTC+0',
        },
        {
          title: 'Zurich',
          description: 'Security and compliance projects for Swiss mid-sized companies.',
          meta: 'Project · UTC+1',
        },
        {
          title: 'Lisbon',
          description: 'The team’s workation favorite – sea view and a stable time zone included.',
          meta: 'Workation · UTC+0',
        },
      ],
      faq: [
        {
          question: 'How much do I have to travel?',
          answer:
            'Less than the consulting cliché suggests: most projects run hybrid with targeted on-site days. Your travel preferences are part of the staffing conversation – not the other way around.',
        },
        {
          question: 'How does the workation work in practice?',
          answer:
            'A short request in the tool, approval within a few days. Social security (A1) and tax conditions for EU countries are handled centrally – all you book is the accommodation.',
        },
        {
          question: 'Do I need perfect English?',
          answer:
            'No – a solid working level is enough, and you develop the rest in our courses. In cross-border projects you gain confidence faster than you think.',
        },
      ],
      ctaTitle: 'Work across borders',
      ctaSubtitle:
        'International projects, workation and a team of twelve nationalities – your perspective is still missing.',
    },
  },

  'financial-rewards': {
    slug: 'financial-rewards',
    de: {
      badge: 'Fair & transparent',
      title: 'Finanzielle Vergütung',
      subtitle:
        'Gute Arbeit verdient ein gutes Paket – transparent, planbar und ohne Verhandlungspoker.',
      intro:
        'Über Geld spricht man nicht? Wir schon. Bei Quantiva Advisory sind die Gehaltsbänder pro Level intern offengelegt, das Bonusmodell folgt einer nachvollziehbaren Formel und die betriebliche Altersvorsorge bekommt einen echten Zuschuss statt des gesetzlichen Minimums. Dein Angebot kalkulieren wir fair von Anfang an – Verhandlungsgeschick sollte nicht über dein Gehalt entscheiden.',
      itemsTitle: 'Dein Paket im Überblick',
      itemsSubtitle:
        'Sechs Bausteine, die zusammen mehr ergeben als eine Zahl im Arbeitsvertrag.',
      items: [
        {
          title: 'Transparente Gehaltsbänder',
          description:
            'Für jedes Karrierelevel gibt es ein intern einsehbares Gehaltsband, das wir jährlich gegen Marktdaten prüfen – gleiches Level, gleiches Band, keine Ausnahmen nach Sympathie.',
        },
        {
          title: 'Bonusmodell',
          description:
            'Bis zu 10 % Jahresbonus aus Unternehmens- und persönlichen Zielen – die Formel kennst du ab Tag eins, die Auszahlung kommt verlässlich im April.',
        },
        {
          title: 'Betriebliche Altersvorsorge',
          description:
            'Wir legen 20 % Arbeitgeberzuschuss auf deine bAV-Beiträge drauf – deutlich mehr als die gesetzlichen 15 % – inklusive unabhängiger Erstberatung.',
        },
        {
          title: 'Equipment-Budget',
          description:
            'MacBook oder ThinkPad, dazu 1.000 € Homeoffice-Budget für Schreibtisch, Stuhl und Monitor – Ersatz und Upgrades alle drei Jahre.',
        },
        {
          title: 'Mitarbeiter:innen werben',
          description:
            '3.000 € Prämie für jede erfolgreiche Empfehlung – die Hälfte bei Vertragsunterschrift, die andere nach bestandener Probezeit.',
        },
        {
          title: 'Extras, die sich summieren',
          description:
            'Deutschlandticket, Corporate Benefits, Verpflegungszuschuss an Office-Tagen und 30 Tage Urlaub mit der Option, weitere fünf zuzukaufen.',
        },
      ],
      facts: [
        { value: '€3.000', label: 'Prämie pro erfolgreicher Empfehlung', numeric: 3000, prefix: '€' },
        { value: '20%', label: 'Arbeitgeberzuschuss zur bAV', numeric: 20, suffix: '%' },
        { value: '30', label: 'Urlaubstage – plus 5 zukaufbar', numeric: 30 },
        { value: '€1.000', label: 'Homeoffice-Budget on top zum Laptop', numeric: 1000, prefix: '€' },
      ],
      featureTitle: 'So setzt sich dein Paket zusammen',
      featureSubtitle:
        'Keine versteckten Fußnoten – die Bausteine deiner Vergütung, offen aufgeschlüsselt.',
      featureItems: [
        {
          title: 'Fixgehalt',
          description:
            'Marktgerechtes Grundgehalt im transparenten Band deines Levels – jährlich überprüft, unabhängig von Verhandlungsgeschick.',
          meta: 'Band je Level',
        },
        {
          title: 'Jahresbonus',
          description:
            '50 % Unternehmensziele, 50 % persönliche Ziele aus deinen Quartalsgesprächen – anteilig auch bei unterjährigem Einstieg.',
          meta: 'bis zu 10 %',
        },
        {
          title: 'Altersvorsorge',
          description:
            'bAV mit 20 % Zuschuss plus vermögenswirksame Leistungen – auf Wunsch mit unabhängiger Beratung eingerichtet.',
          meta: '20 % Zuschuss',
        },
        {
          title: 'Ausstattung & Mobilität',
          description:
            'Laptop nach Wahl, 1.000 € Homeoffice-Budget, Deutschlandticket und JobRad-Leasing – vom ersten Tag an.',
          meta: 'ab Tag 1',
        },
        {
          title: 'Empfehlungsprämie',
          description:
            'Du kennst jemanden, der zu uns passt? 3.000 € Dankeschön – unser bestes Recruiting seid ihr.',
          meta: '€3.000',
        },
      ],
      faq: [
        {
          question: 'Kann ich mein Gehalt trotzdem verhandeln?',
          answer:
            'Innerhalb des Bandes deines Levels ja – aber das Band selbst ist fix. So verhindern wir, dass zwei Personen mit gleicher Leistung unterschiedlich bezahlt werden, nur weil eine härter verhandelt hat.',
        },
        {
          question: 'Was passiert mit dem Bonus, wenn das Jahr schlecht läuft?',
          answer:
            'Der Unternehmensanteil kann sinken, dein persönlicher Anteil bleibt von deinen eigenen Zielen abhängig. Die Zielerreichung legen wir quartalsweise offen – du wirst im April nie überrascht.',
        },
        {
          question: 'Wann steigt mein Gehalt?',
          answer:
            'Mit jedem Levelaufstieg wechselst du ins nächste Band. Zusätzlich prüfen wir alle Bänder einmal jährlich gegen aktuelle Marktdaten und passen sie bei Bedarf für alle an.',
        },
      ],
      ctaTitle: 'Ein Paket, das zu deiner Leistung passt',
      ctaSubtitle:
        'Transparente Bänder, planbarer Bonus, echte Vorsorge – lass uns über Zahlen reden, offen und von Anfang an.',
    },
    en: {
      badge: 'Fair & transparent',
      title: 'Financial Rewards',
      subtitle:
        'Good work deserves a good package – transparent, predictable and free of negotiation games.',
      intro:
        'Money is not something you talk about? We do. At Quantiva Advisory, salary bands per level are disclosed internally, the bonus model follows a formula you can actually understand, and the company pension gets a real employer contribution instead of the legal minimum. Your offer is calculated fairly from the start – negotiation skills should not determine your salary.',
      itemsTitle: 'Your package at a glance',
      itemsSubtitle:
        'Six building blocks that add up to more than a number in your contract.',
      items: [
        {
          title: 'Transparent salary bands',
          description:
            'Every career level has an internally visible salary band that we benchmark against market data annually – same level, same band, no exceptions based on likability.',
        },
        {
          title: 'Bonus model',
          description:
            'Up to 10% annual bonus based on company and personal goals – you know the formula from day one, and payout arrives reliably in April.',
        },
        {
          title: 'Company pension (bAV)',
          description:
            'We add a 20% employer contribution to your company pension payments – well above the statutory 15% – including independent initial advice.',
        },
        {
          title: 'Equipment budget',
          description:
            'MacBook or ThinkPad, plus a €1,000 home-office budget for desk, chair and monitor – with replacements and upgrades every three years.',
        },
        {
          title: 'Referral bonus',
          description:
            '€3,000 for every successful referral – half at contract signing, the other half after the probation period.',
        },
        {
          title: 'Extras that add up',
          description:
            'Deutschlandticket, corporate benefits platform, meal allowance on office days and 30 days of vacation with the option to buy five more.',
        },
      ],
      facts: [
        { value: '€3,000', label: 'bonus per successful referral', numeric: 3000, prefix: '€' },
        { value: '20%', label: 'employer contribution to company pension', numeric: 20, suffix: '%' },
        { value: '30', label: 'vacation days – plus 5 purchasable', numeric: 30 },
        { value: '€1,000', label: 'home-office budget on top of your laptop', numeric: 1000, prefix: '€' },
      ],
      featureTitle: 'How your package is composed',
      featureSubtitle:
        'No hidden footnotes – the building blocks of your compensation, openly broken down.',
      featureItems: [
        {
          title: 'Base salary',
          description:
            'A market-rate base salary within the transparent band of your level – reviewed annually, independent of negotiation skills.',
          meta: 'band per level',
        },
        {
          title: 'Annual bonus',
          description:
            '50% company goals, 50% personal goals from your quarterly talks – pro-rated if you join mid-year.',
          meta: 'up to 10%',
        },
        {
          title: 'Pension',
          description:
            'Company pension with a 20% employer top-up plus capital-forming benefits – set up with independent advice if you wish.',
          meta: '20% top-up',
        },
        {
          title: 'Equipment & mobility',
          description:
            'Laptop of your choice, €1,000 home-office budget, Deutschlandticket and bike leasing – from day one.',
          meta: 'from day 1',
        },
        {
          title: 'Referral bonus',
          description:
            'Know someone who would fit right in? €3,000 as a thank-you – you are our best recruiting channel.',
          meta: '€3,000',
        },
      ],
      faq: [
        {
          question: 'Can I still negotiate my salary?',
          answer:
            'Within the band of your level, yes – but the band itself is fixed. This prevents two people with the same performance from being paid differently just because one negotiated harder.',
        },
        {
          question: 'What happens to the bonus in a bad year?',
          answer:
            'The company share can decrease; your personal share still depends on your own goals. Goal attainment is shared quarterly – you will never be surprised in April.',
        },
        {
          question: 'When does my salary increase?',
          answer:
            'With every level promotion you move into the next band. In addition, we benchmark all bands against current market data once a year and adjust them for everyone when needed.',
        },
      ],
      ctaTitle: 'A package that matches your performance',
      ctaSubtitle:
        'Transparent bands, a predictable bonus, real pension provision – let’s talk numbers, openly and from the start.',
    },
  },
};

export const careerBenefitSlugs = Object.keys(careerBenefits) as CareerBenefitSlug[];

export function getCareerBenefit(slug: string): CareerBenefit | undefined {
  return (careerBenefits as Record<string, CareerBenefit>)[slug];
}
