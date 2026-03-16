import type { CvDocument } from "@/features/cv/domain/cvDocument";
import type { CvVersion } from "@/features/cv/domain/cvVersion";

const polishBaseCvDocument = {
  competencies: [
    "Adopcja i wdrażanie AI",
    "Identyfikacja przypadków użycia AI",
    "Analiza biznesowa",
    "Inżynieria wymagań",
    "Usprawnianie procesów i workflow",
    "Projektowanie integracji systemowych",
    "Projektowanie rozwiązań opartych na API",
    "Współpraca ze stakeholderami",
    "Wsparcie backlogu i delivery",
    "Wsparcie UAT i wdrożeń",
    "Dokumentacja procesowa i wiedzy",
    "Komunikacja wielojęzyczna",
  ],
  experience: [
    {
      bullets: [
        "Prowadzę analizę end-to-end dla inicjatyw ubezpieczeniowych i wewnętrznych projektów AI, przekładając cele biznesowe na zakres, user stories, specyfikacje funkcjonalne i scenariusze testowe.",
        "Wyszukuję obszary, w których AI może realnie usprawnić pracę zespołów i przełożyć się na mierzalną wartość operacyjną.",
        "Definiuję przypadki użycia dla wewnętrznych asystentów AI i współprojektuję rozwiązania typu RAG oparte na rozproszonych źródłach danych.",
        "Projektuję integracje API między systemami core insurance, aplikacjami frontendowymi i usługami wspierającymi, uwzględniając kontrakty danych, reguły biznesowe i przypadki brzegowe.",
        "Współpracuję z developerami, architektami, UX, QA i product ownerami przy walidacji rozwiązań, UAT i przygotowaniu wdrożeń zgodnie z ograniczeniami biznesowymi i regulacyjnymi.",
      ],
      company: "ERGO Technology & Services",
      companySummary:
        "Organizacja technologiczna dla branży ubezpieczeniowej realizująca inicjatywy bancassurance, life insurance, ESG, customer portal i wewnętrzne wdrożenia AI.",
      dates: {
        end: "Obecnie",
        kind: "current",
        start: "kwi 2024",
      },
      location: "Warszawa, Polska (zdalnie)",
      title: "Analityk Systemowo-Biznesowy",
    },
    {
      bullets: [
        "Przekładałem cele biznesowe na zadania w Jira, kryteria akceptacji i szczegóły funkcjonalne dla zespołów rozwijających rozwiązania bancassurance.",
        "Utrzymywałem wymagania, przepływy procesów i kontekst decyzyjny w Confluence, tak aby zespoły delivery pracowały na jednej, aktualnej bazie wiedzy.",
        "Współpracowałem z developerami, projektantami UX i architektami przy dopracowywaniu koncepcji rozwiązania, usuwaniu niejasności i wsparciu wdrożeń.",
        "Prowadziłem refinementy, wspierałem testy i zbierałem feedback od stakeholderów, aby potwierdzić zgodność dostarczonej funkcjonalności z oczekiwaniami.",
      ],
      company: "ERGO Technology & Services",
      dates: {
        end: "kwi 2024",
        kind: "closed",
        start: "lip 2022",
      },
      location: "Warszawa, Polska",
      title: "Młodszy Analityk Systemowo-Biznesowy",
    },
    {
      bullets: [
        "Wspierałem użytkowników anglo-, polsko- i niemieckojęzycznych w środowisku enterprise 24/7, obsługując zgłoszenia L1/L2, troubleshooting i eskalacje.",
        "Pracowałem w środowiskach Microsoft enterprise, w tym Windows Server, Exchange, Office 365, Active Directory oraz Azure Active Directory.",
        "Zbudowałem od podstaw uporządkowaną bazę wiedzy z opisami ścieżek diagnostycznych i powtarzalnych sposobów rozwiązywania problemów.",
      ],
      company: "Sharp Europe",
      dates: {
        end: "lip 2022",
        kind: "closed",
        start: "lip 2021",
      },
      location: "Warszawa, Polska",
      title: "Analityk IT Service Desk",
    },
    {
      bullets: [
        "Wspierałem użytkowników Airbus Commercial i ITERGO na 1st i 2nd line service desk, zapewniając zdalny troubleshooting, routing zgłoszeń i koordynację z resolver groups.",
        "Brałem udział w przejściu procesu z Berlina do Poznania, wspierając transfer wiedzy, onboarding i wdrożenie nowych analityków.",
        "Pracowałem z ServiceNow i BMC Remedy, tworząc artykuły knowledge base i rozwiązując zgłoszenia eskalowane.",
      ],
      company: "Computacenter",
      companySummary:
        "Wsparcie operacyjne service desk dla Airbus Commercial i ITERGO.",
      dates: {
        end: "lip 2021",
        kind: "closed",
        start: "lis 2019",
      },
      location: "Poznań, Polska",
      title: "Analityk IT (1st i 2nd line support)",
    },
  ],
  header: {
    contactMethods: [
      {
        href: "mailto:marcel.kenner@outlook.com",
        kind: "email",
        label: "E-mail",
        value: "marcel.kenner@outlook.com",
      },
      {
        href: "tel:+48732450969",
        kind: "phone",
        label: "Telefon",
        value: "+48 732 450 969",
      },
      {
        href: "https://www.linkedin.com/in/marcel-kenner/",
        kind: "linkedin",
        label: "LinkedIn",
        value: "https://www.linkedin.com/in/marcel-kenner/",
      },
    ],
    fullName: "Marcel Kenner",
    location: "Poznań, woj. wielkopolskie, Polska",
    photo: {
      alt: "Zdjęcie Marcela Kennera",
      assetPath: "/new_pfp1.jpg",
      kind: "asset",
      placement: "top-right",
      shape: "rectangle",
      widthMm: 32,
    },
    professionalHeadline:
      "Analityk Systemowo-Biznesowy | Platformy enterprise",
  },
  id: "cv_marcel_kenner_ai_adoption_manager",
  languages: [
    {
      language: "Angielski",
      proficiency: "Biegły",
    },
    {
      language: "Niemiecki",
      proficiency: "Biegły",
    },
    {
      language: "Polski",
      proficiency: "Biegły",
    },
  ],
  sectionOrder: [
    "summary",
    "competencies",
    "experience",
    "languages",
    "technicalSkills",
  ],
  summary: {
    sentences: [
      "Analityk biznesowo-systemowy z ponad 5-letnim doświadczeniem w przekładaniu złożonych potrzeb biznesowych na konkretne rozwiązania na etapie discovery, projektowania, delivery, wdrożeń i wsparcia.",
      "Mam doświadczenie w obszarach insurance, ESG, customer portal i platform enterprise.",
      "Wspieram wdrażanie AI poprzez asystentów AI, rozwiązania typu RAG i usprawnienia workflow po stronie biznesowej.",
      "Łączę analizę biznesową, myślenie integracyjne i sprawną komunikację ze stakeholderami w kilku językach.",
    ],
  },
  supportedPapers: ["a4", "letter"],
  targetRoles: [
    "AI Adoption Manager",
    "Analityk biznesowy AI",
    "AI Delivery Enablement",
    "Wdrożenia enterprise AI",
    "Transformacja cyfrowa",
  ],
  technicalSkills: [
    {
      items: [
        "Identyfikacja use case'ów AI",
        "Wewnętrzny enablement AI",
        "Asystenci AI",
        "Workflow typu RAG",
        "Wsparcie wiedzy zależne od kontekstu",
      ],
      label: "Adopcja AI i workflow wspierane przez AI",
    },
    {
      items: [
        "Analiza wymagań",
        "Epiki i user stories w Jira",
        "Kryteria akceptacji",
        "Wsparcie backlogu",
        "Specyfikacje funkcjonalne",
        "Wsparcie UAT",
      ],
      label: "Analiza i delivery",
    },
    {
      items: [
        "Projektowanie integracji API",
        "Kontrakty danych",
        "Confluence",
        "Dokumentacja procesów",
        "Dokumentacja systemowa",
      ],
      label: "Systemy i dokumentacja",
    },
  ],
} as const satisfies CvDocument;

const [
  currentRole,
  juniorAnalystRole,
  sharpRole,
  computacenterRole,
] = polishBaseCvDocument.experience;

const atsFriendlyGeneralCvDocument = {
  ...polishBaseCvDocument,
  competencies: [
    "Analiza biznesowa",
    "Inżynieria wymagań",
    "Usprawnianie procesów",
    "Dokumentowanie workflow",
    "Projektowanie integracji systemowych",
    "Projektowanie rozwiązań opartych na API",
    "Komunikacja ze stakeholderami",
    "Wsparcie backlogu i delivery",
    "Wsparcie UAT i wdrożeń",
    "Zarządzanie wiedzą",
    "Obsługa procesów operacyjnych",
    "Komunikacja wielojęzyczna",
  ],
  experience: [
    {
      ...currentRole,
      bullets: [
        "Przekładam cele biznesowe na zakres, user stories, specyfikacje funkcjonalne i scenariusze testowe dla inicjatyw ubezpieczeniowych oraz wewnętrznych projektów AI.",
        "Wskazuję możliwości usprawnień workflow, w tym use case'y AI o mierzalnym wpływie operacyjnym.",
        "Definiuję przypadki użycia dla wewnętrznych asystentów i rozwiązań knowledge retrieval opartych na rozproszonych źródłach danych.",
        "Projektuję integracje API między systemami core insurance, aplikacjami frontendowymi i usługami wspierającymi.",
        "Wspieram developerów, architektów, UX, QA i product ownerów podczas refinementu, UAT oraz przygotowania wdrożeń.",
      ],
    },
    juniorAnalystRole,
    sharpRole,
    {
      ...computacenterRole,
      bullets: [
        "Wspierałem użytkowników Airbus Commercial i ITERGO w ramach 1st i 2nd line service desk, zapewniając zdalny troubleshooting, routing zgłoszeń i koordynację z resolver groups.",
        "Współtworzyłem przejście procesu z Berlina do Poznania poprzez transfer wiedzy, wdrożenie analityków i szkolenie nowych członków zespołu.",
        "Pracowałem z ServiceNow i BMC Remedy, utrzymując artykuły knowledge base i rozwiązując zgłoszenia eskalowane.",
      ],
    },
  ],
  header: {
    ...polishBaseCvDocument.header,
    professionalHeadline:
      "Analityk Biznesowo-Systemowy | Usprawnianie procesów | Platformy enterprise",
  },
  id: "cv_marcel_kenner_ats_friendly_general",
  sectionOrder: [
    "summary",
    "experience",
    "competencies",
    "technicalSkills",
    "languages",
  ],
  summary: {
    sentences: [
      "Analityk biznesowo-systemowy z ponad 5-letnim doświadczeniem w przekładaniu potrzeb biznesowych na uporządkowane wymagania, przepływy procesów, szczegóły funkcjonalne i wsparcie delivery w obszarach insurance oraz platform enterprise.",
      "Moje doświadczenie obejmuje discovery, wsparcie backlogu, testy, wdrożenia, dokumentację i komunikację ze stakeholderami w kilku językach.",
      "Pracuję na styku usprawnień workflow wspieranych przez AI, projektowania rozwiązań API i koordynacji operacyjnej bez zmieniania zweryfikowanej chronologii i zakresu doświadczenia.",
      "Mam także zaplecze w enterprise IT support, budowie knowledge base i współpracy między zespołami w języku angielskim, niemieckim i polskim.",
    ],
  },
  targetRoles: [
    "Analityk biznesowy",
    "Analityk systemowy",
    "Analityk transformacji cyfrowej",
    "Analityk usprawnień procesów",
    "Analityk platform enterprise",
  ],
  technicalSkills: [
    {
      items: [
        "Analiza wymagań",
        "Epiki i user stories w Jira",
        "Kryteria akceptacji",
        "Wsparcie backlogu",
        "Specyfikacje funkcjonalne",
        "Wsparcie UAT",
      ],
      label: "Analiza i delivery",
    },
    {
      items: [
        "Projektowanie integracji API",
        "Kontrakty danych",
        "Confluence",
        "Dokumentacja procesów",
        "Dokumentacja systemowa",
      ],
      label: "Systemy i dokumentacja",
    },
    {
      items: [
        "Usprawnianie workflow",
        "Wewnętrzny enablement AI",
        "Asystenci AI",
        "Workflow typu RAG",
        "Wsparcie wiedzy zależne od kontekstu",
      ],
      label: "Usprawnienia wspierane przez AI",
    },
  ],
} as const satisfies CvDocument;

const leadershipStakeholderCvDocument = {
  ...polishBaseCvDocument,
  competencies: [
    "Adopcja i enablement AI",
    "Zarządzanie stakeholderami",
    "Facylitacja współpracy między zespołami",
    "Strategia wymagań",
    "Analiza biznesowa",
    "Projektowanie integracji systemowych",
    "Usprawnianie workflow i procesów",
    "Wsparcie backlogu i delivery",
    "Wsparcie UAT i wdrożeń",
    "Dokumentowanie decyzji",
    "Identyfikacja przypadków użycia AI",
    "Komunikacja wielojęzyczna",
  ],
  experience: [
    {
      ...currentRole,
      bullets: [
        "Prowadzę analizę dla inicjatyw ubezpieczeniowych i wewnętrznych projektów AI, przekładając cele biznesowe na gotowy do decyzji zakres, user stories, specyfikacje funkcjonalne i scenariusze testowe.",
        "Wspólnie ze stakeholderami biznesowymi i zespołami delivery definiuję usprawnienia workflow wspierane przez AI oraz przypadki użycia dla wewnętrznych asystentów.",
        "Współprojektuję przepływy wiedzy typu RAG oparte na rozproszonych źródłach danych, uwzględniając adopcję, governance i dopasowanie operacyjne.",
        "Projektuję integracje API między systemami core insurance, aplikacjami frontendowymi i usługami wspierającymi, doprecyzowując kontrakty danych, reguły biznesowe i zależności delivery.",
        "Współpracuję z developerami, architektami, UX, QA i product ownerami, aby uzgodnić kierunek rozwiązania, wesprzeć UAT i przygotowanie wdrożenia oraz utrzymać zgodność z ograniczeniami biznesowymi.",
      ],
    },
    {
      ...juniorAnalystRole,
      bullets: [
        "Przekładałem cele biznesowe na zadania w Jira, kryteria akceptacji i szczegóły funkcjonalne dla zespołów rozwijających rozwiązania bancassurance.",
        "Utrzymywałem wymagania, przepływy procesów i kontekst decyzyjny w Confluence, aby biznes i delivery pracowały na jednym aktualnym źródle prawdy.",
        "Współpracowałem z developerami, UX designerami i architektami przy dopracowywaniu koncepcji rozwiązań, usuwaniu niejasności i wsparciu wdrożeń.",
        "Prowadziłem refinementy, wspierałem testy i zbierałem feedback od stakeholderów, aby potwierdzić zgodność dostarczonej funkcjonalności z oczekiwanym efektem biznesowym.",
      ],
    },
    sharpRole,
    computacenterRole,
  ],
  header: {
    ...polishBaseCvDocument.header,
    professionalHeadline:
      "Analityk Biznesowo-Systemowy | Wdrażanie AI | Stakeholder Delivery",
  },
  id: "cv_marcel_kenner_leadership_stakeholder",
  summary: {
    sentences: [
      "Analityk biznesowo-systemowy z ponad 5-letnim doświadczeniem w prowadzeniu discovery, alignmentu i wsparcia delivery dla platform ubezpieczeniowych, inicjatyw AI i zmian enterprise.",
      "Pracuję na styku biznesu, architektów, developerów, UX i QA, zamieniając niejednoznaczne cele na wykonalny zakres, wymagania gotowe do decyzji i plan wdrożenia.",
      "Mam doświadczenie we wdrażaniu AI, wewnętrznych asystentach AI i przepływach wiedzy typu RAG, gdzie o sukcesie decydują komunikacja, governance i dopasowanie operacyjne.",
      "Łączę uporządkowaną analizę, komunikację na poziomie zarządczym i sprawne zarządzanie stakeholderami w języku angielskim, niemieckim i polskim.",
    ],
  },
  targetRoles: [
    "AI Adoption Manager",
    "Lider wdrożeń AI",
    "Analityk transformacji",
    "Lider delivery dla stakeholderów",
    "Lead Business Analyst",
  ],
  technicalSkills: [
    {
      items: [
        "Identyfikacja use case'ów AI",
        "Wewnętrzny enablement AI",
        "Asystenci AI",
        "Workflow typu RAG",
        "Wsparcie wiedzy zależne od kontekstu",
      ],
      label: "Leadership i enablement",
    },
    {
      items: [
        "Analiza wymagań",
        "Refinement międzyzespołowy",
        "Kryteria akceptacji",
        "Wsparcie backlogu",
        "Specyfikacje funkcjonalne",
        "Wsparcie UAT",
      ],
      label: "Orkiestracja delivery",
    },
    {
      items: [
        "Projektowanie integracji API",
        "Kontrakty danych",
        "Confluence",
        "Dokumentacja procesów",
        "Dokumentacja systemowa",
      ],
      label: "Systemy i governance",
    },
  ],
} as const satisfies CvDocument;

const operationsTransformationCvDocument = {
  ...polishBaseCvDocument,
  competencies: [
    "Usprawnianie operacji",
    "Usprawnianie workflow i procesów",
    "Analiza biznesowa",
    "Inżynieria wymagań",
    "Koordynacja service delivery",
    "Projektowanie integracji systemowych",
    "Zarządzanie wiedzą",
    "Dokumentacja procesów i wiedzy",
    "Wsparcie UAT i wdrożeń",
    "Wsparcie backlogu i delivery",
    "Identyfikacja przypadków użycia AI",
    "Komunikacja wielojęzyczna",
  ],
  experience: [
    {
      ...currentRole,
      bullets: [
        "Przekładam cele biznesowe na zakres, user stories, specyfikacje funkcjonalne i scenariusze testowe dla inicjatyw ubezpieczeniowych oraz wewnętrznych projektów AI.",
        "Identyfikuję wąskie gardła w workflow i definiuję use case'y AI o realnym wpływie operacyjnym.",
        "Projektuję przypadki użycia dla wewnętrznych asystentów i przepływów wiedzy typu RAG, które poprawiają dostęp do kontekstu biznesowego.",
        "Projektuję integracje API między systemami core insurance, aplikacjami frontendowymi i usługami wspierającymi, obejmując kontrakty danych, reguły biznesowe i przypadki brzegowe.",
        "Wspieram delivery poprzez refinement, UAT, przygotowanie wdrożeń i koordynację działań między developerami, architektami, UX, QA i product ownerami.",
      ],
    },
    {
      ...juniorAnalystRole,
      bullets: [
        "Przekładałem cele biznesowe na zadania w Jira, kryteria akceptacji i szczegóły funkcjonalne dla zespołów rozwijających rozwiązania bancassurance.",
        "Utrzymywałem wymagania, przepływy procesów i kontekst decyzyjny w Confluence, aby zespoły delivery miały dostęp do jasnej i aktualnej bazy wiedzy.",
        "Współpracowałem z developerami, UX designerami i architektami przy dopracowywaniu koncepcji rozwiązań, usuwaniu niejasności i wsparciu wdrożeń.",
        "Prowadziłem refinementy, wspierałem testy i zbierałem feedback od stakeholderów, aby potwierdzić zgodność dostarczonej funkcjonalności z oczekiwanym efektem biznesowym.",
      ],
    },
    {
      ...sharpRole,
      bullets: [
        "Wspierałem użytkowników anglo-, polsko- i niemieckojęzycznych w środowisku enterprise 24/7, obsługując troubleshooting, eskalacje i zgłoszenia L1/L2.",
        "Pracowałem w środowiskach Microsoft enterprise, w tym Windows Server, Exchange, Office 365, Active Directory oraz Azure Active Directory.",
        "Zbudowałem od podstaw uporządkowaną bazę wiedzy z opisami ścieżek diagnostycznych i powtarzalnych sposobów rozwiązywania problemów.",
      ],
    },
    {
      ...computacenterRole,
      bullets: [
        "Wspierałem użytkowników Airbus Commercial i ITERGO w ramach 1st i 2nd line service desk, zapewniając zdalny troubleshooting, routing zgłoszeń i koordynację z resolver groups.",
        "Wspierałem przejście procesu z Berlina do Poznania poprzez transfer wiedzy, wdrożenie analityków i szkolenie nowych członków zespołu.",
        "Pracowałem z ServiceNow i BMC Remedy, tworząc artykuły knowledge base i rozwiązując zgłoszenia eskalowane.",
      ],
    },
  ],
  header: {
    ...polishBaseCvDocument.header,
    professionalHeadline:
      "Analityk Biznesowo-Systemowy | Usprawnianie operacji | Service Delivery",
  },
  id: "cv_marcel_kenner_operations_transformation",
  summary: {
    sentences: [
      "Analityk biznesowo-systemowy z ponad 5-letnim doświadczeniem w usprawnianiu workflow operacyjnego, jakości wymagań i service delivery w środowiskach insurance oraz enterprise support.",
      "Przekładam potrzeby biznesowe na czytelne user stories, specyfikacje, dokumentację procesową i wsparcie wdrożeń, które zmniejszają niejednoznaczność po stronie delivery.",
      "W codziennej pracy łączę usprawnienia wspierane przez AI, myślenie integracyjne i dyscyplinę w zarządzaniu wiedzą.",
      "Moje fundamenty to enterprise service desk, transfer wiedzy i wsparcie użytkowników w języku angielskim, niemieckim i polskim.",
    ],
  },
  targetRoles: [
    "Analityk transformacji operacyjnej",
    "Analityk usprawnień procesów",
    "Analityk biznesowy",
    "Analityk service delivery",
    "Analityk delivery transformacyjnego",
  ],
  technicalSkills: [
    {
      items: [
        "Usprawnianie workflow",
        "Mapowanie procesów",
        "Analiza wymagań",
        "Wsparcie backlogu",
        "Specyfikacje funkcjonalne",
        "Wsparcie UAT",
      ],
      label: "Operacje i transformacja",
    },
    {
      items: [
        "Koordynacja service delivery",
        "Budowa knowledge base",
        "Wsparcie wdrożeń",
        "Komunikacja ze stakeholderami",
        "Wsparcie użytkowników w wielu językach",
      ],
      label: "Delivery i wsparcie",
    },
    {
      items: [
        "Projektowanie integracji API",
        "Kontrakty danych",
        "Wewnętrzny enablement AI",
        "Workflow typu RAG",
        "Dokumentacja systemowa",
      ],
      label: "Systemy i przepływy wiedzy",
    },
  ],
} as const satisfies CvDocument;

export const cvDocumentsByVersionPl = {
  "ai-adoption-manager": polishBaseCvDocument,
  "ats-friendly-general": atsFriendlyGeneralCvDocument,
  "leadership-stakeholder": leadershipStakeholderCvDocument,
  "operations-transformation": operationsTransformationCvDocument,
} as const satisfies Record<CvVersion, CvDocument>;
