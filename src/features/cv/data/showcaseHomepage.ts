import type { CvLocale } from "@/features/cv/domain/cvLocale";
import { cvVersions, type CvVersion } from "@/features/cv/domain/cvVersion";

import { getCvVersionContentMap } from "./cvVersionContent";

type HomepageVariant = {
  readonly bestUseCase: string;
  readonly difference: string;
  readonly language: string;
  readonly recruiterTitle: string;
  readonly targetRole: string;
  readonly version: CvVersion;
};

type FlowStep = {
  readonly how: string;
  readonly step: string;
  readonly title: string;
  readonly what: string;
  readonly when: string;
};

type FlowSummary = {
  readonly detail: string;
  readonly label: string;
};

type DemonstratesItem = {
  readonly body: string;
  readonly label: string;
  readonly title: string;
};

type BuildOriginStory = {
  readonly body: readonly string[];
  readonly docs: readonly {
    readonly href?: string;
    readonly label: string;
  }[];
  readonly executionPathLabel: string;
  readonly scopeDocsEyebrow: string;
  readonly scopeDocsIntro: string;
  readonly title: string;
  readonly triggerLabel: string;
  readonly workingReferences: readonly {
    readonly href: string;
    readonly label: string;
  }[];
  readonly buildDecisionLabel: string;
};

type BuildFixItem = {
  readonly fix: string;
  readonly impact: string;
  readonly problem: string;
  readonly title: string;
};

type ShowcasePageCopy = {
  readonly buildFixesBadgePrefix: string;
  readonly buildFixesEyebrow: string;
  readonly buildFixesResultLabel: string;
  readonly buildFixesProblemLabel: string;
  readonly buildFixesSolutionLabel: string;
  readonly buildFixesTitle: string;
  readonly demonstratesEyebrow: string;
  readonly demonstratesTitle: string;
  readonly heroBadge: (recruiterTitle: string) => string;
  readonly heroDownload: (recruiterTitle: string) => string;
  readonly heroIntro: string;
  readonly heroLocaleEnglish: string;
  readonly heroLocaleLabel: string;
  readonly heroLocalePolish: string;
  readonly heroOpenWorkspace: string;
  readonly heroProjectEyebrow: string;
  readonly heroTitle: string;
  readonly heroWhyBuilt: string;
  readonly heroHowBuilt: string;
  readonly heroWhatFixed: string;
  readonly howBuiltEyebrow: string;
  readonly howBuiltHowLabel: string;
  readonly howBuiltTitle: string;
  readonly howBuiltWhatLabel: string;
  readonly liveBadge: string;
  readonly workspaceAudioBody: string;
  readonly workspaceAudioLabel: string;
  readonly workspaceAudioTitle: string;
  readonly workspaceBestUseCaseLabel: string;
  readonly workspaceDownload: string;
  readonly workspaceEyebrow: string;
  readonly workspaceLanguageLabel: string;
  readonly workspacePaperLabel: string;
  readonly workspaceSelectorDescription: string;
  readonly workspaceTitle: string;
  readonly workspaceViewOnline: string;
  readonly whyBuiltEyebrow: string;
};

type ShowcaseHomepageContent = {
  readonly buildFixes: readonly BuildFixItem[];
  readonly buildOrigin: BuildOriginStory;
  readonly copy: ShowcasePageCopy;
  readonly demonstrates: readonly DemonstratesItem[];
  readonly flowSteps: readonly FlowStep[];
  readonly flowSummary: readonly FlowSummary[];
  readonly variants: readonly HomepageVariant[];
};

const docs = [
  { label: "docs/project_description.md" },
  { label: "docs/cv/README.md" },
  { label: "docs/cv/01_brand_and_visual_direction.md" },
  { label: "docs/cv/02_layout_and_document_system.md" },
  { label: "docs/cv/03_typography_color_photo_header.md" },
  { label: "docs/cv/04_content_structure_and_copy.md" },
  { label: "docs/cv/05_ats_market_and_delivery.md" },
  { label: "docs/cv/06_web_to_pdf_implementation_notes.md" },
  { label: "docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md" },
  { label: "docs/Implementation/Roadmap_CV_PDF_Showcase_App.md" },
] as const;

const workingReferencesByLocale = {
  en: [
    {
      label: "AGENTS.md format reference",
      href: "https://agents.md/",
    },
    {
      label: "PLANS.md / ExecPlan reference",
      href: "https://developers.openai.com/cookbook/articles/codex_exec_plans/",
    },
  ],
  pl: [
    {
      label: "Referencja formatu AGENTS.md",
      href: "https://agents.md/",
    },
    {
      label: "Referencja PLANS.md / ExecPlan",
      href: "https://developers.openai.com/cookbook/articles/codex_exec_plans/",
    },
  ],
} as const;

const showcaseHomepageContentByLocale: Readonly<
  Record<CvLocale, Omit<ShowcaseHomepageContent, "variants">>
> = {
  en: {
    buildFixes: [
      {
        title: "Random page breaks in PDF output",
        problem:
          "The first print/export pass depended too much on normal browser flow, so long sections could break at awkward points once the document crossed a page boundary. The result looked unpredictable instead of intentionally designed.",
        fix:
          "The first correction was to measure rendered sections on the print route and force a page break before a section when its heading plus first printable unit would overflow the remaining page space. That moved the decision from passive CSS flow to an explicit pagination plan.",
        impact:
          "This stabilized the biggest errors, but it also exposed a second issue: moving whole sections could leave a large empty area at the bottom of page 1 and a heavy content block at the top of page 2.",
      },
      {
        title: "Large blank areas after section-level pagination",
        problem:
          "Section-level planning was still too coarse for dense sections such as professional experience. If an entire section had to move, the previous page could end with a lot of wasted space.",
        fix:
          "The renderer was refined to mark printable subsection units with `data-cv-unit`, then the planner started paging by section heading plus units instead of treating the whole section as one rectangle. In `Professional experience`, each role is now treated as one printable unit, so roles can move cleanly between pages without splitting the whole section too early.",
        impact:
          "Pagination became much more intentional. The print route now measures sections and subsection units, applies the plan to the DOM, shows continuation headings where needed, and only then marks the route ready for Playwright PDF export.",
      },
    ],
    buildOrigin: {
      body: [
        "After seeing the AI Adoption Manager post, the goal was immediate: apply for the role, but do it with something more deliberate than sending another standard PDF. The project needed to feel like a useful recruiting artifact and also demonstrate the kind of AI workflow judgment the role asks for.",
        "The decision was to build a CV PDF renderer with Codex, because it was already part of the day-to-day toolchain. The first research question was not visual. It was technical: what stack gives the most control over browser-to-PDF fidelity. The answer was an HTML/CSS-first CV template rendered to PDF with headless Chromium via Playwright, because that keeps print CSS, fonts, spacing, and browser preview behavior under one system.",
        "With that direction set, the requirements were broken into focused docs, then into an execution plan and roadmap, and the first pass was followed by a back-and-forth refinement cycle to smooth out errors, layout drift, and misalignments.",
      ],
      buildDecisionLabel: "The build decision",
      docs,
      executionPathLabel: "The execution path",
      scopeDocsEyebrow: "Docs That Defined Scope",
      scopeDocsIntro:
        "These files were the main requirement and execution surfaces used to shape the first pass.",
      title: "Why I built this",
      triggerLabel: "The trigger",
      workingReferences: workingReferencesByLocale.en,
    },
    copy: {
      buildFixesBadgePrefix: "Fix",
      buildFixesEyebrow: "What We Fixed",
      buildFixesProblemLabel: "Problem",
      buildFixesResultLabel: "Result",
      buildFixesSolutionLabel: "Fix",
      buildFixesTitle: "Problems we hit and how they were corrected",
      demonstratesEyebrow: "What This Demonstrates",
      demonstratesTitle: "What this project shows in practice",
      heroBadge: (recruiterTitle) => `Built for ${recruiterTitle} review`,
      heroDownload: (recruiterTitle) => `Download ${recruiterTitle} CV`,
      heroHowBuilt: "How I built it",
      heroIntro:
        "I saw the AI Adoption Manager role, decided not to send a generic PDF, and built a browser-first CV workflow that turns one verified Marcel Kenner profile into role-specific previews and production-ready PDF exports.",
      heroLocaleEnglish: "English",
      heroLocaleLabel: "Language",
      heroLocalePolish: "Polski",
      heroOpenWorkspace: "Open CV workspace",
      heroProjectEyebrow: "Personal application project",
      heroTitle: "A recruiter-ready CV build, explained end to end",
      heroWhatFixed: "What we fixed",
      heroWhyBuilt: "Why I built this",
      howBuiltEyebrow: "How I Built It",
      howBuiltHowLabel: "How",
      howBuiltTitle: "Roadmap, implementation phases, and delivery timeline",
      howBuiltWhatLabel: "What",
      liveBadge: "Live",
      whyBuiltEyebrow: "Why I Built This",
      workspaceAudioBody: "No time to read? Listen to the CV instead.",
      workspaceAudioLabel: "Listen to narrator read the CV",
      workspaceAudioTitle: "Listen to narration",
      workspaceBestUseCaseLabel: "Best use case",
      workspaceDownload: "Download PDF",
      workspaceEyebrow: "CV workspace",
      workspaceLanguageLabel: "Language",
      workspacePaperLabel: "Paper",
      workspaceSelectorDescription:
        "Use the selector like a document workspace, not a product grid. Each version changes framing, scan speed, and delivery context while preserving the same verified source profile.",
      workspaceTitle: "Choose the recruiter view",
      workspaceViewOnline: "View online",
    },
    demonstrates: [
      {
        label: "Opportunity recognition",
        title: "Turning a job application into a product decision",
        body:
          "The project started from a concrete application goal, then turned that goal into a useful artifact instead of another static PDF submission.",
      },
      {
        label: "Tooling judgment",
        title: "Choosing a stack that fits the output",
        body:
          "The HTML/CSS-first plus Playwright route was chosen because it gives tighter control over print CSS, fonts, spacing, and browser-to-PDF fidelity.",
      },
      {
        label: "Execution discipline",
        title: "Building from plan to renderer to export",
        body:
          "The implementation followed a documented sequence: scope and docs first, then typed data, shared rendering, print routing, PDF delivery, and verification.",
      },
      {
        label: "Delivery proof",
        title: "Showing that the output actually works",
        body:
          "The final result is recruiter-usable and technically defensible: live preview, print routes, downloadable PDFs, and checks that prove the pipeline holds together.",
      },
    ],
    flowSteps: [
      {
        step: "Phase 0-2",
        title: "Foundation, data model, and source content",
        what:
          "Locked the first release scope, replaced the starter shell, defined the paper and document types, and created the initial Marcel profile as typed repository data.",
        how:
          "Followed the roadmap sequence: foundation freeze, app skeleton and tokens, then domain model and sample content before any PDF work started.",
        when: "Completed on 2026-03-13 between 18:49Z and 19:02Z.",
      },
      {
        step: "Phase 3-4",
        title: "Shared renderer and browser workspace",
        what:
          "Built the reusable CV document component and wrapped it in the homepage workspace with version selection and browser preview.",
        how:
          "Implemented the shared markup first, then added the showcase route so the document could be reviewed in the browser before print and export paths were introduced.",
        when: "Completed on 2026-03-13 at 20:24Z and 21:32Z.",
      },
      {
        step: "Phase 5-6",
        title: "Print route and paper refinement",
        what:
          "Added dedicated print routes for A4 and Letter, then tuned spacing and vertical rhythm so the shorter Letter page still looked deliberate.",
        how:
          "Kept the markup shared and moved paper differences into explicit layout tokens instead of creating separate document branches.",
        when: "Completed on 2026-03-13 at 21:58Z and 22:14Z.",
      },
      {
        step: "Phase 7-8",
        title: "Playwright export and static PDF delivery",
        what:
          "Added the Playwright PDF renderer, then switched delivery to pre-generated static PDF assets so the site can deploy on Cloudflare Pages without a Node runtime.",
        how:
          "Opened the internal print route in headless Chromium, waited for print readiness and loaded fonts, called `page.pdf()` with explicit A4 or Letter settings, and wrote the finished files into the static asset tree.",
        when: "Completed on 2026-03-13 at 23:05Z and 23:24Z.",
      },
      {
        step: "Phase 9-10",
        title: "Test harness and final verification",
        what:
          "Added PDF smoke tests, production-style app startup for Playwright, final documentation updates, and manual preview-versus-export checks.",
        how:
          "Used request-level end-to-end tests for the PDF contract, then closed the loop with lint, unit tests, build verification, and visual comparison of print routes against exported PDFs.",
        when: "Completed on 2026-03-13 at 23:42Z and 23:58Z.",
      },
    ],
    flowSummary: [
      {
        label: "Total build time",
        detail:
          "5 hours 9 minutes from Phase 0 completion at 18:49Z to Phase 10 verification at 23:58Z on 2026-03-13.",
      },
      {
        label: "Implementation window",
        detail:
          "One focused build sequence on 2026-03-13, followed by later iteration to smooth layout and content details.",
      },
    ],
  },
  pl: {
    buildFixes: [
      {
        title: "Losowe podziały stron w PDF",
        problem:
          "Pierwsza wersja eksportu zbyt mocno polegała na zwykłym przepływie przeglądarki, więc dłuższe sekcje mogły łamać się w przypadkowych miejscach po wejściu na kolejną stronę. Efekt wyglądał przypadkowo zamiast celowo.",
        fix:
          "Pierwsza poprawka polegała na mierzeniu sekcji na print route i wymuszaniu podziału strony przed sekcją, jeśli nagłówek wraz z pierwszą jednostką treści nie mieściły się już w pozostałym miejscu. Dzięki temu decyzja o paginacji przestała wynikać z pasywnego flow CSS i stała się świadomym planem.",
        impact:
          "To ustabilizowało największe błędy, ale ujawniło drugi problem: przenoszenie całych sekcji mogło zostawiać dużą pustą przestrzeń na końcu pierwszej strony i zbyt ciężki blok treści na początku drugiej.",
      },
      {
        title: "Zbyt duże puste przestrzenie po paginacji sekcjami",
        problem:
          "Planowanie na poziomie całych sekcji było zbyt zgrubne dla gęstych fragmentów, takich jak doświadczenie zawodowe. Jeśli cała sekcja musiała przejść na następną stronę, poprzednia kończyła się niepotrzebnie dużą pustką.",
        fix:
          "Renderer został dopracowany tak, aby oznaczać mniejsze jednostki wydruku przez `data-cv-unit`, a planner zaczął układać stronę na podstawie nagłówka sekcji i tych jednostek, zamiast traktować sekcję jako jeden prostokąt. W `Doświadczeniu zawodowym` każda rola jest teraz osobną jednostką, więc może przejść na kolejną stronę bez zbyt wczesnego przenoszenia całej sekcji.",
        impact:
          "Paginacja stała się dużo bardziej intencjonalna. Print route mierzy teraz sekcje i jednostki podrzędne, nakłada plan na DOM, pokazuje nagłówki kontynuacji tam, gdzie trzeba, i dopiero potem oznacza stronę jako gotową do eksportu przez Playwright.",
      },
    ],
    buildOrigin: {
      body: [
        "Po zobaczeniu ogłoszenia na stanowisko AI Adoption Manager cel był prosty: aplikować, ale zrobić to w bardziej przemyślany sposób niż wysłanie kolejnego standardowego PDF-a. Ten projekt miał być jednocześnie sensownym artefaktem rekrutacyjnym i demonstracją sposobu pracy z AI, którego wymaga ta rola.",
        "Decyzja była taka, żeby zbudować renderer CV do PDF z pomocą Codex, bo to narzędzie było już częścią codziennego workflow. Pierwsze pytanie badawcze nie było wizualne, tylko techniczne: jaki stack da najlepszą kontrolę nad zgodnością widoku przeglądarkowego z PDF. Odpowiedzią okazał się szablon CV oparty na HTML/CSS i renderowany do PDF przez headless Chromium i Playwright, bo to trzyma print CSS, fonty, spacing i preview przeglądarkowy w jednym systemie.",
        "Kiedy ten kierunek był już ustalony, wymagania zostały rozpisane na konkretne dokumenty, a potem na execution plan i roadmapę. Po pierwszej wersji przyszła iteracja i poprawki, które wygładziły błędy, rozjazdy layoutu i problemy z eksportem.",
      ],
      buildDecisionLabel: "Decyzja o budowie",
      docs,
      executionPathLabel: "Ścieżka realizacji",
      scopeDocsEyebrow: "Dokumenty, które ustawiły zakres",
      scopeDocsIntro:
        "To były główne pliki z wymaganiami i wykonaniem, na których opierała się pierwsza wersja projektu.",
      title: "Dlaczego to zbudowałem",
      triggerLabel: "Impuls",
      workingReferences: workingReferencesByLocale.pl,
    },
    copy: {
      buildFixesBadgePrefix: "Poprawka",
      buildFixesEyebrow: "Co poprawiliśmy",
      buildFixesProblemLabel: "Problem",
      buildFixesResultLabel: "Efekt",
      buildFixesSolutionLabel: "Poprawka",
      buildFixesTitle: "Problemy, na które trafiliśmy, i sposób ich naprawy",
      demonstratesEyebrow: "Co to pokazuje",
      demonstratesTitle: "Co ten projekt pokazuje w praktyce",
      heroBadge: (recruiterTitle) =>
        `Przygotowane pod rekrutację na ${recruiterTitle}`,
      heroDownload: (recruiterTitle) => `Pobierz CV: ${recruiterTitle}`,
      heroHowBuilt: "Jak to zbudowałem",
      heroIntro:
        "Po zobaczeniu roli AI Adoption Manager uznałem, że nie chcę wysyłać kolejnego generycznego PDF-a. Zbudowałem więc browser-first workflow do CV, który zamienia jeden zweryfikowany profil Marcela Kennera w warianty dopasowane do roli i gotowe do użycia eksporty PDF.",
      heroLocaleEnglish: "English",
      heroLocaleLabel: "Język",
      heroLocalePolish: "Polski",
      heroOpenWorkspace: "Otwórz workspace CV",
      heroProjectEyebrow: "Osobisty projekt aplikacyjny",
      heroTitle: "CV gotowe dla rekrutera, pokazane od początku do końca",
      heroWhatFixed: "Co poprawiliśmy",
      heroWhyBuilt: "Dlaczego to zbudowałem",
      howBuiltEyebrow: "Jak to zbudowałem",
      howBuiltHowLabel: "Jak",
      howBuiltTitle: "Roadmapa, etapy implementacji i harmonogram delivery",
      howBuiltWhatLabel: "Co",
      liveBadge: "Na żywo",
      whyBuiltEyebrow: "Dlaczego to zbudowałem",
      workspaceAudioBody:
        "Nie masz czasu czytać? Posłuchaj narracji CV.",
      workspaceAudioLabel: "Posłuchaj narratora czytającego CV",
      workspaceAudioTitle: "Posłuchaj narracji",
      workspaceBestUseCaseLabel: "Najlepszy use case",
      workspaceDownload: "Pobierz PDF",
      workspaceEyebrow: "Workspace CV",
      workspaceLanguageLabel: "Język",
      workspacePaperLabel: "Format",
      workspaceSelectorDescription:
        "Traktuj ten selektor jak workspace dokumentu, a nie grid produktowy. Każda wersja zmienia sposób narracji, tempo skanowania i kontekst delivery, ale opiera się na tym samym zweryfikowanym profilu źródłowym.",
      workspaceTitle: "Wybierz perspektywę dla rekrutera",
      workspaceViewOnline: "Zobacz online",
    },
    demonstrates: [
      {
        label: "Dostrzeganie okazji",
        title: "Zamiana aplikacji o pracę w decyzję produktową",
        body:
          "Projekt zaczął się od konkretnego celu aplikacyjnego, a potem został zamieniony w użyteczny artefakt zamiast kolejnego statycznego PDF-a.",
      },
      {
        label: "Dobór narzędzi",
        title: "Wybór stacku dopasowanego do wyniku",
        body:
          "Ścieżka HTML/CSS-first z Playwright została wybrana dlatego, że daje najlepszą kontrolę nad print CSS, fontami, spacingiem i zgodnością widoku z PDF-em.",
      },
      {
        label: "Dyscyplina wykonawcza",
        title: "Budowa od planu przez renderer do eksportu",
        body:
          "Implementacja szła według udokumentowanej sekwencji: najpierw zakres i dokumenty, potem typowane dane, wspólny renderer, print routing, dostarczenie PDF i weryfikacja.",
      },
      {
        label: "Dowód dostarczenia",
        title: "Pokazanie, że wynik naprawdę działa",
        body:
          "Efekt końcowy jest użyteczny dla rekrutera i technicznie obroniony: live preview, print routes, pobieralne PDF-y i testy potwierdzające, że cały pipeline działa spójnie.",
      },
    ],
    flowSteps: [
      {
        step: "Faza 0-2",
        title: "Fundamenty, model danych i treść źródłowa",
        what:
          "Zamknąłem zakres pierwszego wydania, zastąpiłem starterowy shell, zdefiniowałem typy papieru i dokumentu oraz przygotowałem pierwszy profil Marcela jako typowane dane repozytoryjne.",
        how:
          "Przeszedłem zgodnie z roadmapą: foundation freeze, szkielet aplikacji i tokeny, a dopiero potem model domenowy i treść źródłowa przed rozpoczęciem prac nad PDF.",
        when: "Zrealizowane 2026-03-13 między 18:49Z a 19:02Z.",
      },
      {
        step: "Faza 3-4",
        title: "Wspólny renderer i workspace przeglądarkowy",
        what:
          "Zbudowałem współdzielony komponent CV i osadziłem go w homepage workspace z wyborem wersji oraz podglądem w przeglądarce.",
        how:
          "Najpierw powstał wspólny markup, a dopiero potem showcase route, żeby dokument można było spokojnie obejrzeć w przeglądarce przed dodaniem ścieżek print i export.",
        when: "Zrealizowane 2026-03-13 o 20:24Z i 21:32Z.",
      },
      {
        step: "Faza 5-6",
        title: "Print route i dopracowanie formatów papieru",
        what:
          "Dodałem osobne print routes dla A4 i Letter, a potem dopracowałem spacing i rytm pionowy, tak aby krótszy format Letter nadal wyglądał celowo.",
        how:
          "Markup pozostał wspólny, a różnice między papierami zostały przeniesione do jawnych tokenów layoutu zamiast oddzielnych gałęzi dokumentu.",
        when: "Zrealizowane 2026-03-13 o 21:58Z i 22:14Z.",
      },
      {
        step: "Faza 7-8",
        title: "Eksport przez Playwright i statyczne dostarczanie PDF",
        what:
          "Dodałem renderer PDF oparty na Playwright, a potem przełączyłem dostarczanie na pre-generowane statyczne pliki PDF, żeby całość mogła działać na Cloudflare Pages bez Node runtime.",
        how:
          "Headless Chromium otwiera wewnętrzny print route, czeka na gotowość do druku i załadowane fonty, wywołuje `page.pdf()` z jawnymi ustawieniami A4 lub Letter i zapisuje gotowe pliki do drzewa statycznych assetów.",
        when: "Zrealizowane 2026-03-13 o 23:05Z i 23:24Z.",
      },
      {
        step: "Faza 9-10",
        title: "Harness testowy i końcowa weryfikacja",
        what:
          "Dodałem smoke testy PDF, produkcyjny sposób uruchamiania aplikacji dla Playwright, końcowe aktualizacje dokumentacji i manualne porównanie preview z eksportem.",
        how:
          "Wykorzystałem request-level end-to-end tests do kontraktu PDF, a potem domknąłem całość lintem, testami jednostkowymi, build verification i ręcznym porównaniem print routes z wyeksportowanymi PDF-ami.",
        when: "Zrealizowane 2026-03-13 o 23:42Z i 23:58Z.",
      },
    ],
    flowSummary: [
      {
        label: "Łączny czas budowy",
        detail:
          "5 godzin 9 minut od zakończenia Phase 0 o 18:49Z do weryfikacji Phase 10 o 23:58Z dnia 2026-03-13.",
      },
      {
        label: "Okno implementacji",
        detail:
          "Jedna skupiona sesja budowy 2026-03-13, a później dodatkowe iteracje wygładzające layout i szczegóły treści.",
      },
    ],
  },
};

export function getShowcaseHomepageContent(
  locale: CvLocale,
): ShowcaseHomepageContent {
  const localizedVersionContent = getCvVersionContentMap(locale);

  return {
    ...showcaseHomepageContentByLocale[locale],
    variants: cvVersions.map((version) => ({
      ...localizedVersionContent[version],
      version,
    })),
  };
}

export type {
  BuildFixItem,
  BuildOriginStory,
  DemonstratesItem,
  FlowStep,
  FlowSummary,
  HomepageVariant,
  ShowcaseHomepageContent,
  ShowcasePageCopy,
};
