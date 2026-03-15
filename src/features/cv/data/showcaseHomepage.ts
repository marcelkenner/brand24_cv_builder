import {
  cvVersions,
  cvVersionMetadata,
  type CvVersion,
} from "@/features/cv/domain/cvVersion";

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
  readonly title: string;
  readonly workingReferences: readonly {
    readonly href: string;
    readonly label: string;
  }[];
};

type BuildFixItem = {
  readonly fix: string;
  readonly impact: string;
  readonly problem: string;
  readonly title: string;
};

export const homepageSectionLinks = [
  { href: "#workspace", label: "CV workspace" },
  { href: "#demonstrates", label: "What this demonstrates" },
  { href: "#why-i-built-this", label: "Why I built this" },
  { href: "#how-i-built-it", label: "How I built it" },
  { href: "#what-we-fixed", label: "What we fixed" },
] as const;

export const homepageVariants: readonly HomepageVariant[] = cvVersions.map(
  (version) => ({
    bestUseCase: cvVersionMetadata[version].bestUseCase,
    difference: cvVersionMetadata[version].difference,
    language: cvVersionMetadata[version].language,
    recruiterTitle: cvVersionMetadata[version].recruiterTitle,
    targetRole: cvVersionMetadata[version].targetRole,
    version,
  }),
);

export const homepageDemonstrates: readonly DemonstratesItem[] = [
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
] as const;

export const homepageBuildOrigin: BuildOriginStory = {
  title: "Why I built this",
  body: [
    "After seeing the AI Adoption Manager post, the goal was immediate: apply for the role, but do it with something more deliberate than sending another standard PDF. The project needed to feel like a useful recruiting artifact and also demonstrate the kind of AI workflow judgment the role asks for.",
    "The decision was to build a CV PDF renderer with Codex, because it was already part of the day-to-day toolchain. The first research question was not visual. It was technical: what stack gives the most control over browser-to-PDF fidelity. The answer was an HTML/CSS-first CV template rendered to PDF with headless Chromium via Playwright, because that keeps print CSS, fonts, spacing, and browser preview behavior under one system.",
    "With that direction set, the requirements were broken into focused docs, then into an execution plan and roadmap, and the first pass was followed by a back-and-forth refinement cycle to smooth out errors, layout drift, and misalignments.",
  ],
  docs: [
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
  ],
  workingReferences: [
    {
      label: "AGENTS.md format reference",
      href: "https://agents.md/",
    },
    {
      label: "PLANS.md / ExecPlan reference",
      href: "https://developers.openai.com/cookbook/articles/codex_exec_plans/",
    },
  ],
} as const;

export const homepageFlowSteps: readonly FlowStep[] = [
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
    title: "Playwright export and download API",
    what:
      "Added the Node-side PDF renderer and exposed it through a stable HTTP download route with explicit paper validation and deterministic filenames.",
    how:
      "Opened the internal print route in headless Chromium, waited for print readiness and loaded fonts, then called `page.pdf()` with explicit A4 or Letter settings.",
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
] as const;

export const homepageFlowSummary: readonly FlowSummary[] = [
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
] as const;

export const homepageBuildFixes: readonly BuildFixItem[] = [
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
] as const;
