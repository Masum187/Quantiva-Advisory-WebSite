export type CareerLevelSlug = 'students' | 'graduates' | 'professionals' | 'leaders';

export type Lang = 'de' | 'en';

export interface CareerLevelOffer {
  title: string;
  description: string;
}

export interface CareerLevelStep {
  title: string;
  description: string;
}

export interface CareerLevelCopy {
  chapter: string;
  eyebrow: string;
  title: string;
  pitch: string;
  metaTitle: string;
  metaDescription: string;
  offersChapter: string;
  offersTitle: string;
  offersSubtitle: string;
  offers: CareerLevelOffer[];
  pathChapter: string;
  pathTitle: string;
  pathSubtitle: string;
  path: CareerLevelStep[];
  jobsChapter: string;
  jobsTitle: string;
  jobsSubtitle: string;
  emptyTitle: string;
  emptyText: string;
  applyCta: string;
  jobsCta: string;
  backCta: string;
  allJobsCta: string;
  initiativeCta: string;
  finalTitle: string;
  finalSubtitle: string;
  finalCta: string;
  nextLabel: string;
  footerQuick: string;
  footerContact: string;
  footerCopyright: string;
}

export interface CareerLevel {
  slug: CareerLevelSlug;
  video: string;
  poster: string;
  /** Lowercased tokens matched against seniority, title, type, tags. */
  matchers: string[];
  de: CareerLevelCopy;
  en: CareerLevelCopy;
}

export const careerLevels: Record<CareerLevelSlug, CareerLevel> = {
  students: {
    slug: 'students',
    video: '/assets/career/levels/students.mp4',
    poster: '/assets/career/levels/students-poster.jpg',
    matchers: [
      'intern',
      'internship',
      'praktikum',
      'praktikant',
      'werkstudent',
      'working student',
      'student',
      'dual',
      'thesis',
      'abschlussarbeit',
    ],
    de: {
      chapter: '01',
      eyebrow: 'Studierende',
      title: 'Praxis, bevor das Studium endet.',
      pitch:
        'Praktika, Werkstudent:innen-Stellen und Abschlussarbeiten im echten Mittelstands-Projekt – nicht am Rand, sondern im Delivery-Team. Du lernst das Handwerk der Beratung, bevor du dich festlegst.',
      metaTitle: 'Praktika & Studium',
      metaDescription:
        'Praktika, Werkstudent:innen-Rollen und Abschlussarbeiten bei Quantiva Advisory – praxisnah in SAP, Cloud, AI und Cyber Security.',
      offersChapter: 'Für dich',
      offersTitle: 'Was wir Studierenden bieten.',
      offersSubtitle:
        'Kein Kaffeekochen, keine Schattenplätze. Du arbeitest an Modulen, die beim Kunden ankommen.',
      offers: [
        {
          title: 'Praktika mit Verantwortung',
          description:
            'Drei bis sechs Monate im Projekt: Prozessaufnahme, Workshops, Dokumentation und erste eigene Arbeitspakete – begleitet von einer festen Mentorin oder einem Mentor.',
        },
        {
          title: 'Werkstudent:in im Delivery',
          description:
            'Zehn bis zwanzig Stunden pro Woche in SAP, Cloud, AI oder Security. Du bleibst im Studium und sammelst trotzdem kontinuierliche Projekterfahrung.',
        },
        {
          title: 'Abschlussarbeiten mit Praxispartner',
          description:
            'Bachelor- oder Masterarbeit an einer echten Fragestellung unserer Kunden – mit Zugang zu Daten, Reviews durch Consultants und der Option auf Übernahme.',
        },
        {
          title: 'Mentoring ab Woche eins',
          description:
            'Ein:e Consultant außerhalb deiner Projektlinie beantwortet die Fragen, die man im Daily nicht stellt – von Tooling bis Karrierebild.',
        },
        {
          title: 'Community statt Einzelkämpfer',
          description:
            'Coffee Roulette, Communities of Practice und studentische Peers. Du gehörst zum Team, auch wenn dein Vertrag befristet ist.',
        },
      ],
      pathChapter: 'Dein Weg',
      pathTitle: 'Vier Schritte – ohne Assessment-Center.',
      pathSubtitle: 'Transparent, schnell, auf Augenhöhe. Dein CV oder LinkedIn-Profil reicht.',
      path: [
        {
          title: 'Bewerbung',
          description:
            'CV oder LinkedIn, optional ein kurzer Hinweis, warum Quantiva. Wir antworten innerhalb von 48 Stunden.',
        },
        {
          title: 'Gespräch',
          description:
            '30 Minuten Video-Call mit Recruiting und einer Person aus dem Fachteam. Kein Case-Marathon, sondern ein echtes Kennenlernen.',
        },
        {
          title: 'Onboarding',
          description:
            'Laptop, Zugänge, Buddy und ein klarer Auftrag für die ersten zwei Wochen – bevor du ins Kundenprojekt gehst.',
        },
        {
          title: 'Wachstum',
          description:
            'Feedback nach jedem Monat, Einladung zur Academy und – wenn es passt – der direkte Weg ins Graduate-Programm.',
        },
      ],
      jobsChapter: 'Offene Stellen',
      jobsTitle: 'Aktuelle Praktika & Werkstudent:innen-Rollen.',
      jobsSubtitle: 'Gefiltert auf studentische Einstiege. Weitere Rollen findest du auf der Karriere-Übersicht.',
      emptyTitle: 'Gerade keine studentische Stelle ausgeschrieben.',
      emptyText:
        'Wir stellen Praktika und Werkstudent:innen-Rollen laufend nach Projektlage ein. Eine Initiativbewerbung landet direkt beim People-Team.',
      applyCta: 'Jetzt bewerben',
      jobsCta: 'Offene Stellen',
      backCta: 'Zurück zur Karriere',
      allJobsCta: 'Alle Stellen ansehen',
      initiativeCta: 'Initiativ bewerben',
      finalTitle: 'Starte, bevor das Zeugnis da ist.',
      finalSubtitle:
        'Bring Neugier und ein Semester mit – das Handwerk, das Mentoring und die Projekte bekommst du von uns.',
      finalCta: 'Initiativ bewerben',
      nextLabel: 'Nächste Stufe',
      footerQuick: 'Direkt',
      footerContact: 'Kontakt',
      footerCopyright: '© 2026 Quantiva Advisory. Alle Rechte vorbehalten.',
    },
    en: {
      chapter: '01',
      eyebrow: 'Students',
      title: 'Practice before the degree is done.',
      pitch:
        'Internships, working-student roles and theses inside real Mittelstand delivery – not on the sidelines. You learn the craft of consulting before you commit.',
      metaTitle: 'Students & Internships',
      metaDescription:
        'Internships, working-student roles and theses at Quantiva Advisory – hands-on in SAP, Cloud, AI and Cyber Security.',
      offersChapter: 'For you',
      offersTitle: 'What we offer students.',
      offersSubtitle:
        'No coffee runs, no shadowing seats. You work on modules that reach the client.',
      offers: [
        {
          title: 'Internships with ownership',
          description:
            'Three to six months on a live project: process discovery, workshops, documentation and your first work packages – guided by a dedicated mentor.',
        },
        {
          title: 'Working student in delivery',
          description:
            'Ten to twenty hours a week in SAP, Cloud, AI or Security. You stay in your studies and still build continuous project experience.',
        },
        {
          title: 'Theses with a practice partner',
          description:
            'A bachelor or master thesis on a real client question – with data access, consultant reviews and a path to a full-time offer.',
        },
        {
          title: 'Mentoring from week one',
          description:
            'A consultant outside your project line answers the questions you would rather not ask in the daily – from tooling to career picture.',
        },
        {
          title: 'Community, not lone wolf',
          description:
            'Coffee roulette, communities of practice and student peers. You belong to the team even on a fixed-term contract.',
        },
      ],
      pathChapter: 'Your path',
      pathTitle: 'Four steps – no assessment center.',
      pathSubtitle: 'Transparent, fast, at eye level. Your CV or LinkedIn profile is enough.',
      path: [
        {
          title: 'Apply',
          description:
            'CV or LinkedIn, optionally a short note on why Quantiva. We reply within 48 hours.',
        },
        {
          title: 'Conversation',
          description:
            'A 30-minute video call with recruiting and someone from the practice. No case marathon – a real conversation.',
        },
        {
          title: 'Onboarding',
          description:
            'Laptop, access, a buddy and a clear brief for the first two weeks – before you join a client project.',
        },
        {
          title: 'Growth',
          description:
            'Monthly feedback, an invitation to the Academy and – if it fits – a direct path into the graduate programme.',
        },
      ],
      jobsChapter: 'Open roles',
      jobsTitle: 'Current internships & working-student roles.',
      jobsSubtitle: 'Filtered to student entry points. Further roles live on the careers overview.',
      emptyTitle: 'No student role is open right now.',
      emptyText:
        'We open internships and working-student roles as projects demand. An unsolicited application goes straight to the people team.',
      applyCta: 'Apply now',
      jobsCta: 'Open roles',
      backCta: 'Back to careers',
      allJobsCta: 'View all roles',
      initiativeCta: 'Apply unsolicited',
      finalTitle: 'Start before the diploma arrives.',
      finalSubtitle:
        'Bring curiosity and a semester – the craft, the mentoring and the projects are on us.',
      finalCta: 'Apply unsolicited',
      nextLabel: 'Next level',
      footerQuick: 'Direct',
      footerContact: 'Contact',
      footerCopyright: '© 2026 Quantiva Advisory. All rights reserved.',
    },
  },

  graduates: {
    slug: 'graduates',
    video: '/assets/career/levels/graduates.mp4',
    poster: '/assets/career/levels/graduates-poster.jpg',
    matchers: [
      'graduate',
      'trainee',
      'junior',
      'entry',
      'einstieg',
      'career starter',
      'associate',
      'berufseinsteiger',
    ],
    de: {
      chapter: '02',
      eyebrow: 'Berufseinsteiger:innen',
      title: 'Der Einstieg, der trägt.',
      pitch:
        'Nach dem Studium willst du nicht drei Jahre zusehen. Unser Graduate- und Junior-Pfad bringt dich in echte Projekte, mit Academy, Mentor:in und Kriterien, die du selbst steuern kannst.',
      metaTitle: 'Einstiegsprogramme',
      metaDescription:
        'Graduate-Programm und Junior-Consulting bei Quantiva Advisory – Rotation, Academy und ein klarer Weg vom Einstieg zum Consultant.',
      offersChapter: 'Programme',
      offersTitle: 'Was der Einstieg bei uns bedeutet.',
      offersSubtitle:
        'Kein Schattenjahr. Du lieferst, lernst strukturiert und weißt, woran das nächste Level hängt.',
      offers: [
        {
          title: 'Graduate-Programm',
          description:
            'Zwölf bis achtzehn Monate mit zwei bis drei Rotationen über Practices – SAP, Cloud, AI oder Security. Du baust Breite auf, bevor du Tiefe wählst.',
        },
        {
          title: 'Junior Consultant',
          description:
            'Direkteinstieg in eine Practice, wenn du schon weißt, wohin. Eigene Arbeitspakete ab Monat zwei, Kundenkontakt ab Quartal eins.',
        },
        {
          title: 'Quantiva Academy',
          description:
            'Wöchentliche Trainings, Zertifizierungs-Lerngruppen und Brownbags. SAP, AWS, Azure und Consulting-Handwerk – während der Arbeitszeit.',
        },
        {
          title: 'Buddy und Mentor:in',
          description:
            'Ein Buddy für den Alltag, ein:e Mentor:in für die Entwicklung. Halbjährliche Development Talks, keine Jahresgespräch-Überraschung.',
        },
        {
          title: 'Transparente Level',
          description:
            'Junior, Consultant, Senior – mit Kriterien, die intern einsehbar sind. Keine Mindestverweildauer, Beförderung zweimal im Jahr.',
        },
      ],
      pathChapter: 'Dein Weg',
      pathTitle: 'Vom Angebot bis zum ersten Kunden.',
      pathSubtitle: 'Unter zwei Wochen bis zur Entscheidung. Ohne Assessment-Center.',
      path: [
        {
          title: 'Bewerbung',
          description:
            'CV oder LinkedIn genügt. Ein Anschreiben ist optional – uns interessiert, woran du gearbeitet hast.',
        },
        {
          title: 'Gespräch',
          description:
            'Kennenlernen plus ein praxisnaher Mini-Case aus unserem Projektalltag. Kein Powerpoint-Theater.',
        },
        {
          title: 'Onboarding',
          description:
            'Zwei Wochen Academy, Staffing-Gespräch und der erste Projekteinsatz mit klarer Rolle – nicht als Lückenfüller.',
        },
        {
          title: 'Wachstum',
          description:
            'Erste Zertifizierung im ersten Jahr, Development Talks alle sechs Monate, Wechsel ins nächste Level ohne Wartezeit.',
        },
      ],
      jobsChapter: 'Offene Stellen',
      jobsTitle: 'Einstiegsprogramme & Junior-Rollen.',
      jobsSubtitle: 'Gefiltert auf Graduate, Trainee und Junior. Die volle Liste liegt auf der Karriere-Seite.',
      emptyTitle: 'Aktuell kein offenes Einstiegsprogramm.',
      emptyText:
        'Graduate- und Junior-Rollen öffnen wir meist zum Frühjahr und Herbst. Schreib uns initiativ – wir merken uns starke Profile.',
      applyCta: 'Jetzt bewerben',
      jobsCta: 'Offene Stellen',
      backCta: 'Zurück zur Karriere',
      allJobsCta: 'Alle Stellen ansehen',
      initiativeCta: 'Initiativ bewerben',
      finalTitle: 'Dein erstes Kapitel in der Beratung.',
      finalSubtitle:
        'Bring Abschluss und Haltung mit. Programm, Mentoring und den ersten Kundenauftrag legen wir bereit.',
      finalCta: 'Initiativ bewerben',
      nextLabel: 'Nächste Stufe',
      footerQuick: 'Direkt',
      footerContact: 'Kontakt',
      footerCopyright: '© 2026 Quantiva Advisory. Alle Rechte vorbehalten.',
    },
    en: {
      chapter: '02',
      eyebrow: 'Graduates',
      title: 'An entry that actually carries.',
      pitch:
        'After university you do not want three years of watching. Our graduate and junior path puts you on live projects – with Academy, a mentor and criteria you can steer yourself.',
      metaTitle: 'Entry programmes',
      metaDescription:
        'Graduate programme and junior consulting at Quantiva Advisory – rotations, Academy and a clear path from entry to consultant.',
      offersChapter: 'Programmes',
      offersTitle: 'What joining us actually means.',
      offersSubtitle:
        'No shadow year. You deliver, learn with structure and know what the next level requires.',
      offers: [
        {
          title: 'Graduate programme',
          description:
            'Twelve to eighteen months with two or three rotations across practices – SAP, Cloud, AI or Security. You build breadth before you choose depth.',
        },
        {
          title: 'Junior consultant',
          description:
            'A direct start in one practice if you already know your direction. Your own work packages from month two, client contact from quarter one.',
        },
        {
          title: 'Quantiva Academy',
          description:
            'Weekly trainings, certification study groups and brownbags. SAP, AWS, Azure and the craft of consulting – on working time.',
        },
        {
          title: 'Buddy and mentor',
          description:
            'A buddy for everyday questions, a mentor for development. Semi-annual development talks, no end-of-year surprise.',
        },
        {
          title: 'Transparent levels',
          description:
            'Junior, Consultant, Senior – with criteria visible internally. No minimum tenure; promotions twice a year.',
        },
      ],
      pathChapter: 'Your path',
      pathTitle: 'From offer to first client.',
      pathSubtitle: 'A decision in under two weeks. No assessment center.',
      path: [
        {
          title: 'Apply',
          description:
            'CV or LinkedIn is enough. A cover letter is optional – we care about what you have already built.',
        },
        {
          title: 'Conversation',
          description:
            'A first meeting plus a short, practical case from our real project work. No slide theatre.',
        },
        {
          title: 'Onboarding',
          description:
            'Two weeks of Academy, a staffing conversation and a first assignment with a clear role – not as a gap-filler.',
        },
        {
          title: 'Growth',
          description:
            'First certification in year one, development talks every six months, and a move to the next level without a waiting period.',
        },
      ],
      jobsChapter: 'Open roles',
      jobsTitle: 'Entry programmes & junior roles.',
      jobsSubtitle: 'Filtered to graduate, trainee and junior. The full list lives on the careers page.',
      emptyTitle: 'No entry programme is open right now.',
      emptyText:
        'Graduate and junior roles usually open in spring and autumn. Write to us unsolicited – we remember strong profiles.',
      applyCta: 'Apply now',
      jobsCta: 'Open roles',
      backCta: 'Back to careers',
      allJobsCta: 'View all roles',
      initiativeCta: 'Apply unsolicited',
      finalTitle: 'Your first chapter in consulting.',
      finalSubtitle:
        'Bring the degree and the attitude. The programme, the mentoring and the first client brief are ready.',
      finalCta: 'Apply unsolicited',
      nextLabel: 'Next level',
      footerQuick: 'Direct',
      footerContact: 'Contact',
      footerCopyright: '© 2026 Quantiva Advisory. All rights reserved.',
    },
  },

  professionals: {
    slug: 'professionals',
    video: '/assets/career/levels/professionals.mp4',
    poster: '/assets/career/levels/professionals-poster.jpg',
    matchers: ['professional', 'mid-level', 'midlevel', 'experienced', 'mid level'],
    de: {
      chapter: '03',
      eyebrow: 'Berufserfahrene',
      title: 'Tiefe, die den Mittelstand bewegt.',
      pitch:
        'Du denkst in Architekturen, nicht in Folien. Als erfahrene:r Consultant übernimmst du Module, führst fachlich und baust Practices mit – ohne in eine Führungsrolle gezwungen zu werden.',
      metaTitle: 'Karrierewege für Berufserfahrene',
      metaDescription:
        'Experten-Tracks, Projektverantwortung und Practice-Aufbau bei Quantiva Advisory – für Consultants mit Substanz.',
      offersChapter: 'Karrierewege',
      offersTitle: 'Was wir erfahrenen Profis bieten.',
      offersSubtitle:
        'Fachlaufbahn und Führungslaufbahn sind gleichwertig. Tiefe Expertise ist bei uns kein Sackgassenschild.',
      offers: [
        {
          title: 'Experten-Tracks bis Principal',
          description:
            'Consultant, Senior, Lead, Principal – mit transparenten Kriterien. Du kannst tief im Fach bleiben und trotzdem Gehalt, Sichtbarkeit und Einfluss wachsen lassen.',
        },
        {
          title: 'Eigene Module, echte Kunden',
          description:
            'Du verantwortest Arbeitspakete und Teilprojekte end-to-end: von der Zielarchitektur bis zur Abnahme. Kein Slide-Consulting ohne Delivery.',
        },
        {
          title: 'Practice mitgestalten',
          description:
            'Methoden, Angebote, Academy-Sessions: Erfahrene bringen ihr Wissen ins Unternehmen, nicht nur ins Kundenprojekt.',
        },
        {
          title: 'Lernbudget, das du selbst steuerst',
          description:
            '2.000 € plus fünf Lerntage, bezahlte Zertifizierungen und eine Fachkonferenz im Jahr – ohne Genehmigungs-Marathon.',
        },
        {
          title: 'Lateraleinstieg mit Onboarding',
          description:
            'Wer aus Industrie oder anderer Beratung kommt, bekommt Staffing-Klarheit, einen Buddy und 90 Tage zum Einfinden – nicht Sink-or-swim.',
        },
      ],
      pathChapter: 'Dein Weg',
      pathTitle: 'Vom ersten Gespräch bis zur ersten Staffing-Runde.',
      pathSubtitle: 'Wir respektieren, dass du schon weißt, wie Beratung funktioniert.',
      path: [
        {
          title: 'Bewerbung',
          description:
            'CV, LinkedIn oder ein kurzer Hinweis auf relevante Projekte. Wir lesen Profile, keine Motivationsschreiben.',
        },
        {
          title: 'Fachgespräch',
          description:
            'Deep-Dive mit Peers aus der Practice. Ein Fall aus unserem Alltag, keine Standard-Case-Batterie.',
        },
        {
          title: 'Onboarding',
          description:
            'Staffing-Gespräch in der ersten Woche, klare Rolle, Zugang zu Communities und Academy – dann Projekt.',
        },
        {
          title: 'Wachstum',
          description:
            'Development Talks, 360°-Feedback nach Projekten und ein Level-Pfad, den du mit deiner Mentorin oder deinem Mentor steuerst.',
        },
      ],
      jobsChapter: 'Offene Stellen',
      jobsTitle: 'Rollen für Berufserfahrene.',
      jobsSubtitle: 'Gefiltert auf Professional-Level. Senior- und Lead-Rollen findest du unter Führungskräfte.',
      emptyTitle: 'Keine Professional-Rolle ist gerade offen.',
      emptyText:
        'Wir staffen erfahrene Consultants projektgetrieben. Eine Initiativbewerbung mit deinem Schwerpunkt landet beim Practice Lead.',
      applyCta: 'Jetzt bewerben',
      jobsCta: 'Offene Stellen',
      backCta: 'Zurück zur Karriere',
      allJobsCta: 'Alle Stellen ansehen',
      initiativeCta: 'Initiativ bewerben',
      finalTitle: 'Bring deine Tiefe ins nächste Projekt.',
      finalSubtitle:
        'Wenn du Substanz lieber auslieferst als verkaufst, ist Quantiva Advisory der richtige Ort.',
      finalCta: 'Initiativ bewerben',
      nextLabel: 'Nächste Stufe',
      footerQuick: 'Direkt',
      footerContact: 'Kontakt',
      footerCopyright: '© 2026 Quantiva Advisory. Alle Rechte vorbehalten.',
    },
    en: {
      chapter: '03',
      eyebrow: 'Experienced professionals',
      title: 'Depth that moves the Mittelstand.',
      pitch:
        'You think in architectures, not decks. As an experienced consultant you own modules, lead on the subject and help shape practices – without being pushed into people management.',
      metaTitle: 'Career paths for professionals',
      metaDescription:
        'Expert tracks, project ownership and practice building at Quantiva Advisory – for consultants with substance.',
      offersChapter: 'Career paths',
      offersTitle: 'What we offer experienced professionals.',
      offersSubtitle:
        'Expert and leadership tracks are equal. Deep expertise is not a career dead end here.',
      offers: [
        {
          title: 'Expert tracks to principal',
          description:
            'Consultant, Senior, Lead, Principal – with transparent criteria. You can stay deep in the craft and still grow salary, visibility and influence.',
        },
        {
          title: 'Your modules, real clients',
          description:
            'You own work packages and sub-projects end-to-end: from target architecture to sign-off. No slide consulting without delivery.',
        },
        {
          title: 'Shape the practice',
          description:
            'Methods, offerings, Academy sessions: experienced people bring their knowledge into the firm, not only into the client project.',
        },
        {
          title: 'A learning budget you steer',
          description:
            '€2,000 plus five learning days, paid certifications and one professional conference a year – without an approval marathon.',
        },
        {
          title: 'Lateral hire onboarding',
          description:
            'If you join from industry or another consultancy, you get staffing clarity, a buddy and 90 days to settle in – not sink-or-swim.',
        },
      ],
      pathChapter: 'Your path',
      pathTitle: 'From first conversation to first staffing.',
      pathSubtitle: 'We respect that you already know how consulting works.',
      path: [
        {
          title: 'Apply',
          description:
            'CV, LinkedIn or a short note on relevant projects. We read profiles, not motivation letters.',
        },
        {
          title: 'Peer conversation',
          description:
            'A deep dive with peers from the practice. A case from our day-to-day, not a standard case battery.',
        },
        {
          title: 'Onboarding',
          description:
            'A staffing conversation in week one, a clear role, access to communities and the Academy – then the project.',
        },
        {
          title: 'Growth',
          description:
            'Development talks, 360° feedback after projects and a level path you steer with your mentor.',
        },
      ],
      jobsChapter: 'Open roles',
      jobsTitle: 'Roles for experienced professionals.',
      jobsSubtitle: 'Filtered to professional level. Senior and lead roles live under Leadership.',
      emptyTitle: 'No professional role is open right now.',
      emptyText:
        'We staff experienced consultants as projects demand. An unsolicited application with your focus goes to the practice lead.',
      applyCta: 'Apply now',
      jobsCta: 'Open roles',
      backCta: 'Back to careers',
      allJobsCta: 'View all roles',
      initiativeCta: 'Apply unsolicited',
      finalTitle: 'Bring your depth to the next project.',
      finalSubtitle:
        'If you would rather deliver substance than sell it, Quantiva Advisory is the right place.',
      finalCta: 'Apply unsolicited',
      nextLabel: 'Next level',
      footerQuick: 'Direct',
      footerContact: 'Contact',
      footerCopyright: '© 2026 Quantiva Advisory. All rights reserved.',
    },
  },

  leaders: {
    slug: 'leaders',
    video: '/assets/career/levels/leaders.mp4',
    poster: '/assets/career/levels/leaders-poster.jpg',
    matchers: [
      'senior',
      'lead',
      'principal',
      'leadership',
      'manager',
      'director',
      'partner',
      'head of',
      'führung',
    ],
    de: {
      chapter: '04',
      eyebrow: 'Führungskräfte',
      title: 'Führung, die liefert.',
      pitch:
        'Du siehst das System hinter dem Projekt. Bei Quantiva führst du Practices, Kundenbeziehungen und Menschen – mit einem Leadership-Programm, das Wirkung vor Auslastung stellt.',
      metaTitle: 'Leadership-Programme',
      metaDescription:
        'Leadership-Programm, Practice- und P&L-Verantwortung bei Quantiva Advisory – für Führungskräfte, die Beratung bauen, nicht nur steuern.',
      offersChapter: 'Leadership',
      offersTitle: 'Was Führung bei uns heißt.',
      offersSubtitle:
        'Keine Folien-Hierarchie. Du trägst Ergebnis, Kultur und die nächste Generation – und wirst dafür ausgebildet.',
      offers: [
        {
          title: 'Leadership-Programm',
          description:
            'Staffing, Feedback, schwierige Kundengespräche, wirtschaftliche Steuerung: ein strukturiertes Programm mit externen Coaches und internen Peers.',
        },
        {
          title: 'Practice- und P&L-Verantwortung',
          description:
            'Du baust ein Angebot, ein Team oder eine Region – mit echten Zahlen, nicht nur mit einer Folie im QBR.',
        },
        {
          title: 'Thought Leadership',
          description:
            'Whitepaper, Konferenz-Slots und Kundenformate. Wer spricht statt nur zuzuhören, bekommt Vorbereitungszeit und Sichtbarkeit.',
        },
        {
          title: 'Die nächste Generation formen',
          description:
            'Mentoring, Academy-Leitung, Hiring: Führung heißt bei uns, dass andere durch dich besser werden – messbar in Development Talks.',
        },
        {
          title: 'Pfad in die Partnerschaft',
          description:
            'Transparente Kriterien für Principal und Partner. Einfluss auf Kundenwahl, Werte und die Frage, welche Projekte wir ablehnen.',
        },
      ],
      pathChapter: 'Dein Weg',
      pathTitle: 'Ein Prozess auf Augenhöhe.',
      pathSubtitle: 'Wir sprechen über Wirkung, nicht über Titelinflation.',
      path: [
        {
          title: 'Bewerbung',
          description:
            'Profil plus zwei, drei Mandate, auf die du stolz bist. Wir wollen sehen, was du gebaut hast – nicht nur, wen du geführt hast.',
        },
        {
          title: 'Dialog',
          description:
            'Gespräch mit der Geschäftsführung und einem Practice Lead. Strategie, Kultur, wirtschaftliche Erwartungen – offen auf dem Tisch.',
        },
        {
          title: 'Onboarding',
          description:
            '90-Tage-Plan, Staffing-Rechte, Zugang zu Zahlen und das Leadership-Programm ab dem ersten Quartal.',
        },
        {
          title: 'Wirkung',
          description:
            'OKRs, die du mitformst. Quartalsreviews, in denen Auslastung nicht das einzige Maß ist.',
        },
      ],
      jobsChapter: 'Offene Stellen',
      jobsTitle: 'Senior-, Lead- und Leadership-Rollen.',
      jobsSubtitle: 'Gefiltert auf Seniority Senior und Lead. Weitere Level liegen auf der Karriere-Übersicht.',
      emptyTitle: 'Keine Leadership-Rolle ist gerade offen.',
      emptyText:
        'Führungspositionen besetzen wir bewusst selten und gezielt. Eine vertrauliche Initiativbewerbung erreicht die Geschäftsführung.',
      applyCta: 'Jetzt bewerben',
      jobsCta: 'Offene Stellen',
      backCta: 'Zurück zur Karriere',
      allJobsCta: 'Alle Stellen ansehen',
      initiativeCta: 'Initiativ bewerben',
      finalTitle: 'Führe dort, wo Beratung gebaut wird.',
      finalSubtitle:
        'Wenn du Practices, Menschen und Ergebnisse tragen willst, sprechen wir gern – vertraulich und ohne Folienritual.',
      finalCta: 'Gespräch vereinbaren',
      nextLabel: 'Nächste Stufe',
      footerQuick: 'Direkt',
      footerContact: 'Kontakt',
      footerCopyright: '© 2026 Quantiva Advisory. Alle Rechte vorbehalten.',
    },
    en: {
      chapter: '04',
      eyebrow: 'Leaders',
      title: 'Leadership that delivers.',
      pitch:
        'You see the system behind the project. At Quantiva you lead practices, client relationships and people – with a leadership programme that puts impact ahead of utilization.',
      metaTitle: 'Leadership programmes',
      metaDescription:
        'Leadership programme, practice and P&L ownership at Quantiva Advisory – for leaders who build consulting, not just steer it.',
      offersChapter: 'Leadership',
      offersTitle: 'What leadership means here.',
      offersSubtitle:
        'No slide hierarchy. You carry outcomes, culture and the next generation – and you are trained for it.',
      offers: [
        {
          title: 'Leadership programme',
          description:
            'Staffing, feedback, hard client conversations, commercial steering: a structured programme with external coaches and internal peers.',
        },
        {
          title: 'Practice and P&L ownership',
          description:
            'You build an offering, a team or a region – with real numbers, not just a slide in the QBR.',
        },
        {
          title: 'Thought leadership',
          description:
            'White papers, conference slots and client formats. Those who speak rather than only listen get preparation time and visibility.',
        },
        {
          title: 'Shape the next generation',
          description:
            'Mentoring, Academy leadership, hiring: leadership here means others get better because of you – measured in development talks.',
        },
        {
          title: 'A path to partnership',
          description:
            'Transparent criteria for principal and partner. Influence on which clients we take, which values we keep and which projects we decline.',
        },
      ],
      pathChapter: 'Your path',
      pathTitle: 'A process at eye level.',
      pathSubtitle: 'We talk about impact, not title inflation.',
      path: [
        {
          title: 'Apply',
          description:
            'Your profile plus two or three mandates you are proud of. We want to see what you built – not only whom you managed.',
        },
        {
          title: 'Dialogue',
          description:
            'A conversation with the management team and a practice lead. Strategy, culture, commercial expectations – on the table.',
        },
        {
          title: 'Onboarding',
          description:
            'A 90-day plan, staffing rights, access to the numbers and the leadership programme from the first quarter.',
        },
        {
          title: 'Impact',
          description:
            'OKRs you help shape. Quarterly reviews in which utilization is not the only measure.',
        },
      ],
      jobsChapter: 'Open roles',
      jobsTitle: 'Senior, lead and leadership roles.',
      jobsSubtitle: 'Filtered to senior and lead seniority. Other levels live on the careers overview.',
      emptyTitle: 'No leadership role is open right now.',
      emptyText:
        'We fill leadership seats rarely and deliberately. A confidential unsolicited application reaches the management team.',
      applyCta: 'Apply now',
      jobsCta: 'Open roles',
      backCta: 'Back to careers',
      allJobsCta: 'View all roles',
      initiativeCta: 'Apply unsolicited',
      finalTitle: 'Lead where consulting is built.',
      finalSubtitle:
        'If you want to carry practices, people and outcomes, we would like to talk – confidentially and without a slide ritual.',
      finalCta: 'Start a conversation',
      nextLabel: 'Next level',
      footerQuick: 'Direct',
      footerContact: 'Contact',
      footerCopyright: '© 2026 Quantiva Advisory. All rights reserved.',
    },
  },
};

export const careerLevelSlugs = Object.keys(careerLevels) as CareerLevelSlug[];

export function isCareerLevelSlug(slug: string): slug is CareerLevelSlug {
  return (careerLevelSlugs as readonly string[]).includes(slug);
}

export function getCareerLevel(slug: string): CareerLevel | undefined {
  return isCareerLevelSlug(slug) ? careerLevels[slug] : undefined;
}

export function getNextCareerLevel(slug: CareerLevelSlug): CareerLevel {
  const index = careerLevelSlugs.indexOf(slug);
  const nextSlug = careerLevelSlugs[(index + 1) % careerLevelSlugs.length];
  return careerLevels[nextSlug];
}

export function jobMatchesCareerLevel(
  job: {
    title: string;
    seniority?: string;
    employmentType?: string;
    contractType?: string;
    experienceYears?: string;
    tags?: string[];
  },
  slug: CareerLevelSlug,
): boolean {
  const level = careerLevels[slug];
  const haystack = [
    job.seniority,
    job.employmentType,
    job.contractType,
    job.title,
    job.experienceYears,
    ...(job.tags ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return level.matchers.some((token) => haystack.includes(token));
}
