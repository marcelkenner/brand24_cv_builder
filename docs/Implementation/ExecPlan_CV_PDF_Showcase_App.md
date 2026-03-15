# Build CV PDF Showcase App

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

If `docs/plans.md` exists, this plan must cite its repository-relative path and remain consistent with it. This plan was authored against `docs/plans.md` on 2026-03-13 and must continue to follow its required section names, progress tracking, self-contained guidance, and behavioral validation rules.

## Purpose / Big Picture

Build a simple Next.js app that shows a polished CV in the browser and exports the same HTML/CSS layout to PDF through headless Chromium driven by Playwright. After the change, a user can open the app, inspect the CV in a browser-first preview, switch between A4 and US Letter layouts, and download a PDF whose spacing, typography, and print styling closely match the on-screen version. Success is observable by running the app locally, visiting the preview route, and downloading PDFs that preserve the same structure and styling in both supported paper sizes.


## Progress

- [x] (2026-03-13 17:52Z) Read `docs/plans.md` and drafted this ExecPlan in the required format.
- [x] (2026-03-13 17:52Z) Confirmed current repository context: starter Next.js app in `src/app/*`, Playwright already present in `package.json`, no implementation-specific tests or docs yet.
- [x] (2026-03-13 18:49Z) Completed Phase 0 foundation freeze: aligned planning/design docs, verified Playwright Chromium setup command locally, and recorded the initial sample-content and no-photo-first decisions in `docs/Implementation/Phase0_Foundation_Freeze_Decisions.md`.
- [x] (2026-03-13 18:55Z) Completed Phase 1 app skeleton and tokens: replaced the starter landing page, moved root typography to `next/font` Inter variables in `src/app/layout.tsx`, reduced `src/app/globals.css` to global-only rules, and added the initial `src/features/cv/` scaffolding plus token modules.
- [x] (2026-03-13 19:02Z) Completed Phase 2 domain model and sample content: added `src/features/cv/domain/cvDocument.ts`, created the static sample profile in `src/features/cv/data/sampleCvDocument.ts`, and wired the landing shell to display the typed sample data without starting the printable CV renderer.
- [x] (2026-03-13 20:24Z) Completed Phase 3 shared document component: added `src/features/cv/components/CvDocument.tsx` plus `CvDocument.module.css`, rendered the no-photo document preview on `/`, and added Vitest + React Testing Library coverage for the shared renderer.
- [x] (2026-03-13 21:32Z) Completed Phase 4 browser showcase route: replaced the Phase 3 landing shell with `src/features/cv/components/CvShowcasePage.tsx`, validated `paper` query selection on `/`, preserved the shared document renderer for both paper variants, and added unit coverage for showcase routing and paper resolution.
- [x] (2026-03-13 21:58Z) Completed Phase 5 print route: added `src/app/cv/[paper]/page.tsx`, validated route params against the shared paper-variant model, rendered the shared document without showcase chrome, and connected the showcase shell to the live print route.
- [x] (2026-03-13 22:14Z) Completed Phase 6 paper-specific refinement: introduced explicit per-paper layout tokens for the shared renderer, tightened Letter vertical rhythm and margins relative to A4, and added unit coverage for the style mapping so the adaptation stays deliberate.
- [x] (2026-03-13 23:05Z) Completed Phase 7 PDF rendering helper: isolated Playwright paper-format mapping in `src/features/cv/server/paperFormat.ts`, added `src/features/cv/server/renderCvPdf.ts` with Chromium launch, print-route readiness waiting, font settling, and explicit `page.pdf()` options, and covered the helper with unit tests plus a print-route readiness marker.
- [x] (2026-03-13 23:24Z) Completed Phase 8 download API route: added `src/app/api/cv-pdf/route.ts` with `runtime = "nodejs"`, strict `paper` query validation, deterministic `cv-a4.pdf` and `cv-letter.pdf` attachment names, showcase wiring to the live download endpoint, and unit coverage for the HTTP contract.
- [x] (2026-03-13 23:42Z) Completed Phase 9 test harness: added `@playwright/test`, created `playwright.config.ts` with a local Next web server, added `tests/e2e/cv-pdf.spec.ts` to verify real PDF responses for both paper sizes, and exposed the e2e command through `package.json`.
- [x] (2026-03-13 23:58Z) Completed Phase 10 final documentation and verification: updated README and roadmap status, recorded final export behavior notes, reran lint/unit/e2e/build checks, and manually compared print-route screenshots against rasterized PDF output for both paper sizes.


## Surprises & Discoveries

- Observation: The repository is still at the create-next-app starter state.
  Evidence: `src/app/page.tsx`, `src/app/layout.tsx`, and `src/app/globals.css` only contain default scaffold content as of 2026-03-13.

- Observation: Playwright is already installed as a dev dependency, which lowers setup cost for HTML-to-PDF rendering.
  Evidence: `package.json` lists `playwright` at `^1.58.2`.

- Observation: The local design brief asks for both A4 portrait and US Letter portrait outputs, so paper size is not optional scope.
  Evidence: `docs/project_description.md` states that the primary version is A4 portrait and the secondary export is US Letter portrait.

- Observation: Playwright PDF generation defaults to print CSS and defaults paper format to Letter unless overridden.
  Evidence: Context7 lookup against `/microsoft/playwright/v1.58.2` for `Page.pdf` on 2026-03-13.

- Observation: The repository does not currently contain a `.nvmrc` file.
  Evidence: `test -f .nvmrc && cat .nvmrc || echo no-nvmrc` returned `no-nvmrc` on 2026-03-13.

- Observation: Phase 1 can be validated with `npm run lint` and `npm run build` even before the feature-specific tests exist.
  Evidence: both commands completed successfully after the Phase 1 app shell and token changes on 2026-03-13.

- Observation: The typed sample CV data can be introduced and validated before the shared printable CV component exists by surfacing it through the app shell.
  Evidence: the landing shell now reads from `src/features/cv/data/sampleCvDocument.ts`, while `npm run lint` and `npm run build` still pass on 2026-03-13.

- Observation: The repository now contains explicit ASCII layout templates for the planned single-column and restrained two-column variants, so implementation does not need to infer page structure from the prose brief alone.
  Evidence: `docs/cv_templates/single_column_with_photo`, `docs/cv_templates/single_column_without_photo`, `docs/cv_templates/two_column_without_photo`, and `docs/cv_templates/two_column_with_photo` exist on 2026-03-13.

- Observation: Next.js 16 page-level `searchParams` are promise-based, so the Phase 4 showcase route can validate the `paper` query entirely on the server without adding a client-state wrapper.
  Evidence: Context7 lookup against `/vercel/next.js/v16.1.6` on 2026-03-13 documents `searchParams` as `Promise<{ [key: string]: string | string[] | undefined }>` for App Router pages.

- Observation: The preview shell needs horizontal overflow on small screens if the document width stays paper-accurate in the browser, otherwise the preview silently stops matching export dimensions.
  Evidence: `src/features/cv/components/CvShowcasePage.tsx` now wraps `CvDocument` in an overflow container sized from `src/features/cv/config/designTokens.ts`, while `src/features/cv/components/CvDocument.module.css` uses the explicit paper width directly.

- Observation: The print route can be statically enumerated because the supported paper set is closed and already modeled as a readonly union.
  Evidence: `src/app/cv/[paper]/page.tsx` now exports `generateStaticParams()` from `cvPaperVariants`, and `src/features/cv/domain/paperVariant.ts` already defines only `"a4"` and `"letter"` as valid route values.

- Observation: Letter needs explicit vertical compression even though it is slightly wider than A4, because the shorter page height is the binding constraint for the current sample CV.
  Evidence: `src/features/cv/config/designTokens.ts` now gives Letter 14 mm top and bottom margins plus smaller section, rule, and entry gaps, while `src/features/cv/components/cvDocumentStyle.ts` maps those values into the shared document CSS variables.

- Observation: The PDF renderer needs an explicit page-ready contract beyond `page.goto()` so Chromium does not print before the print route and fonts settle.
  Evidence: `src/features/cv/server/renderCvPdf.ts` now waits for `[data-cv-print-ready="true"]` from `src/app/cv/[paper]/page.tsx` and then awaits `document.fonts.ready` before calling `page.pdf()`.

- Observation: The API route should reject unsupported `paper` values instead of defaulting, even though the showcase UI only links valid variants.
  Evidence: `src/app/api/cv-pdf/route.ts` now returns HTTP 400 for missing or invalid `paper` query values, and `tests/unit/cvPdfRoute.test.ts` covers both cases.

- Observation: The export-focused e2e test can stay narrow by using Playwright's `request` fixture instead of browser-page click automation.
  Evidence: `tests/e2e/cv-pdf.spec.ts` now starts the local app through `playwright.config.ts`, calls `/api/cv-pdf?paper=...` directly, and verifies headers plus the `%PDF` binary signature for both variants.

- Observation: The Playwright harness must avoid `next dev` because the local workspace may already hold `.next/dev/lock`.
  Evidence: the first Phase 9 e2e run failed on 2026-03-13 with `Unable to acquire lock at /home/marcel/src/cv-builder/.next/dev/lock`, after which `playwright.config.ts` was updated to run `npm run build && PORT=3101 npm run start` instead.

- Observation: The current sample CV content exports as a two-page PDF for both A4 and Letter, and the lower sections now paginate at entry-row granularity instead of being locked together as one unsplittable block.
  Evidence: print-route measurements captured on 2026-03-14 show A4 keeping the first education entry on page 1, while Letter still begins page 2 at `Education` because the shorter page height cannot fit the heading plus first education row.

- Observation: The print route now needs a measured client-side pagination pass before it is truly export-ready, because break decisions depend on rendered section heights rather than static CSS alone.
  Evidence: `src/features/cv/components/CvPrintDocument.tsx` now waits for fonts, measures `data-cv-section` blocks, marks forced fresh-page starts, waits one animation frame for layout to settle, and only then sets `data-cv-print-ready="true"` for `src/features/cv/server/renderCvPdf.ts`.

- Observation: Section-level measurement alone was not enough to avoid large blank areas, so the print route now needs subsection-aware units inside long sections such as `Professional experience`.
  Evidence: `src/features/cv/components/cvDocumentContent.tsx` now marks `data-cv-unit` elements within each section, `src/features/cv/components/printPagination.ts` plans pages from section headings plus units, and direct print-route inspection on 2026-03-14 showed `experience-1-bullet-3` continuing onto page 2 for A4 instead of moving the entire remaining section as one block.


## Decision Log

- Decision: Scope the feature as a read-only showcase app, not a full CV editor.
  Rationale: The user asked for a simple app that showcases a CV PDF. A static, typed sample document plus browser preview and PDF export is the smallest complete behavior that proves the HTML/CSS-first rendering pipeline.
  Date/Author: 2026-03-13 / Codex

- Decision: Use one shared CV document component for both browser preview and print rendering.
  Rationale: Sharing markup is the core control mechanism behind the requested “what you see in the browser is what you get in the PDF” behavior.
  Date/Author: 2026-03-13 / Codex

- Decision: Use a dedicated print route that Playwright opens in Chromium before calling `page.pdf()`.
  Rationale: Rendering an actual Next.js route keeps CSS loading, font loading, and layout behavior aligned with the browser preview more reliably than assembling detached HTML strings.
  Date/Author: 2026-03-13 / Codex

- Decision: Treat A4 and US Letter as explicit variants selected by route/query state and backed by separate PDF options.
  Rationale: The brief requires both sizes, and Playwright gives exact paper control through `page.pdf({ format })`.
  Date/Author: 2026-03-13 / Codex

- Decision: Plan for an initial no-photo CV variant unless a real headshot asset is added during implementation.
  Rationale: The repository currently has no candidate headshot asset. The export pipeline matters more than asset sourcing for this task, and the brief explicitly allows a no-photo version.
  Date/Author: 2026-03-13 / Codex

- Decision: Lock the initial sample CV to a static, credible corporate profile with only the sections needed to prove the document system.
  Rationale: A concise, realistic sample gives better layout and copy validation than lorem ipsum while keeping Phase 1 and Phase 2 focused on the browser-to-PDF pipeline rather than content sprawl.
  Date/Author: 2026-03-13 / Codex

- Decision: Keep Phase 1 limited to an implementation shell and token foundation instead of starting the shared CV document renderer early.
  Rationale: The roadmap separates skeleton work from the typed CV document and sample data work. Holding that boundary keeps the diff smaller and avoids premature coupling before the domain model exists.
  Date/Author: 2026-03-13 / Codex

- Decision: Model the sample CV with explicit readonly section types, typed contact methods, discriminated photo and date variants, and non-empty arrays for required collections.
  Rationale: This keeps invalid document states harder to express and gives Phase 3 a stable rendering contract instead of a loose bag of optional strings.
  Date/Author: 2026-03-13 / Codex

- Decision: Treat the `docs/cv_templates/` ASCII wireframes as mandatory visual blueprints before document component work continues.
  Rationale: The brief allows multiple layout variants, and the checked-in templates remove ambiguity about section allocation, header behavior, photo placement, and restrained two-column treatment before CSS implementation starts.
  Date/Author: 2026-03-13 / Codex

- Decision: Close Phase 3 by rendering the shared document on the existing landing page instead of introducing the dedicated `/cv/[paper]` route early.
  Rationale: The roadmap makes the route and paper-switching shell a Phase 4 concern. Keeping Phase 3 inside `/` proves the renderer end-to-end with the smallest valid diff and avoids partially implementing the next phase.
  Date/Author: 2026-03-13 / Codex

- Decision: Add Vitest plus React Testing Library as the first automated test harness for component-level rendering checks.
  Rationale: The repository did not previously have a component-test setup, and Phase 3 changes are centered on typed React markup rather than browser automation. This provides direct verification for the new renderer without prematurely building the Phase 5/6 Playwright coverage.
  Date/Author: 2026-03-13 / Codex

- Decision: Implement Phase 4 paper switching through the `/` route query string instead of adding client-local state.
  Rationale: A validated `paper` search param keeps the page URL shareable, follows the Phase 4 “browser showcase route” requirement, and is the smallest valid diff in Next.js 16 because App Router pages already receive `searchParams` on the server.
  Date/Author: 2026-03-13 / Codex

- Decision: Make the Phase 5 print route a statically enumerated dynamic route with explicit runtime validation.
  Rationale: `generateStaticParams()` keeps the allowed route surface precise for `/cv/a4` and `/cv/letter`, while `parseCvPaperVariant()` lets the same paper model validate both query-driven preview state and path-driven print state without duplicating rules.
  Date/Author: 2026-03-13 / Codex

- Decision: Keep Phase 6 paper refinement inside shared style tokens rather than adding paper-specific markup branches.
  Rationale: The roadmap and implementation notes both prioritize one shared markup path. Per-paper spacing and margin tokens are sufficient for the current sample CV and keep PDF export setup simpler for the next phase.
  Date/Author: 2026-03-13 / Codex

- Decision: Make the Phase 7 renderer wait for an explicit print-route marker and font readiness before generating the PDF.
  Rationale: `page.goto()` reaching `domcontentloaded` alone does not prove that the print route markup is fully ready for export. Waiting for a dedicated data attribute plus `document.fonts.ready` keeps the helper deterministic without coupling export behavior to UI components.
  Date/Author: 2026-03-13 / Codex

- Decision: Make the Phase 8 download route require an explicit valid `paper` query parameter instead of silently falling back to A4.
  Rationale: The showcase UI already knows the active paper and can always send a valid value. Rejecting invalid requests keeps the HTTP contract explicit, preserves deterministic filenames, and avoids ambiguous exports from malformed URLs.
  Date/Author: 2026-03-13 / Codex

- Decision: Keep the Phase 9 end-to-end coverage request-driven instead of automating the showcase click flow.
  Rationale: The key risk in this phase is the live HTTP export contract, not anchor-click behavior. Using Playwright's `request` fixture gives smaller, faster, and more deterministic proof that the route returns a real PDF while still exercising the Next app and Playwright-based renderer end to end.
  Date/Author: 2026-03-13 / Codex

- Decision: Start the app for Phase 9 e2e tests with `next build` plus `next start` instead of `next dev`.
  Rationale: A production-style server avoids `.next/dev/lock` conflicts with any existing local dev session and matches the deployment path more closely for the export route.
  Date/Author: 2026-03-13 / Codex

- Decision: Accept the current two-page export for the sample CV instead of forcing additional compression during Phase 10.
  Rationale: Manual comparison showed that the exported PDFs preserve typography, divider placement, and section ordering without clipping, and the 2026-03-14 pagination refinement confirmed that page overflow now happens at the entry level rather than by forcing the entire `Education` section to page 2. Preserving content fidelity is preferable to introducing late-stage spacing distortion without a direct spec requirement for a one-page cap.
  Date/Author: 2026-03-13 / Codex


## Outcomes & Retrospective

The current outcome is a repository-native implementation plan that can be resumed later without prior chat context. Phases 0 through 10 are complete: the planning documents are aligned, Chromium setup has been verified locally through the Playwright install command, the first-pass sample-content boundaries are recorded in `docs/Implementation/Phase0_Foundation_Freeze_Decisions.md`, the starter app has been replaced with a controlled shell wired to root design tokens, the repository contains a typed CV document contract plus a realistic sample profile, the shared no-photo CV renderer appears in the app with component-level test coverage, `/` behaves as a dedicated showcase route with A4/Letter paper switching, `/cv/a4` plus `/cv/letter` render the print-only document route directly, the shared renderer now applies explicit A4-versus-Letter spacing and margin refinements instead of relying on dimension changes alone, `src/features/cv/server/renderCvPdf.ts` can now launch Chromium and return non-empty A4 or Letter PDF bytes from the print route, `src/app/api/cv-pdf/route.ts` now exposes that renderer through stable `cv-a4.pdf` and `cv-letter.pdf` download responses, the checked-in Playwright harness proves that the live route returns real PDFs for both variants, and the final manual comparison confirmed acceptable print-route versus PDF fidelity for both paper sizes. The most important lesson from discovery is that the repository was nearly empty, so the plan had to define both architecture boundaries and validation gates explicitly before feature work could proceed.


## Context and Orientation

This repository currently contains a minimal Next.js App Router application. The only application files are `src/app/page.tsx`, `src/app/layout.tsx`, and `src/app/globals.css`. The starter page is still the default create-next-app screen, so there is no pre-existing CV domain model, no reusable components, no route handlers, and no test harness beyond ESLint.

The technology already present is:

- Next.js 16.1.6 with the App Router in `src/app`
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4 through `@import "tailwindcss"` in `src/app/globals.css`
- Playwright 1.58.2 as a dev dependency

The relevant local planning rules come from `docs/plans.md`. That file requires this plan to be self-contained, to define exact file paths, to explain observable outcomes, and to record progress and decisions as work proceeds.

The relevant design direction comes from `docs/project_description.md`. The important parts for this task are:

- the CV should feel premium, restrained, and corporate rather than playful,
- the layout should be single-column by default,
- spacing and page margins should be explicit rather than improvised,
- the final system must support A4 portrait and US Letter portrait output,
- the styling should avoid decorative effects and prioritize clean typography and disciplined spacing.

The repository also now includes explicit layout wireframes in `docs/cv_templates/`. Those files translate the brief into concrete ASCII composition guides for:

- `docs/cv_templates/single_column_with_photo`
- `docs/cv_templates/single_column_without_photo`
- `docs/cv_templates/two_column_without_photo`
- `docs/cv_templates/two_column_with_photo`

Phase 3 and later rendering work should use those template files as the page-structure source, rather than improvising layout from the prose brief alone.

The requested PDF pipeline is browser-first HTML/CSS rendered through headless Chromium via Playwright. In plain language, this means the app should build the CV as normal web markup and styles first, then ask Chromium to print that same page to PDF. Playwright is the Node library that launches Chromium and invokes `page.pdf()`.


## Plan of Work

First, replace the starter landing page in `src/app/page.tsx` with a small showcase shell that introduces the CV, exposes paper-size controls, and links to the PDF download route. Keep this page thin. It should delegate almost all rendering to a feature folder under `src/features/cv/` so the repository stays organized and each file remains small.

Create a typed CV domain model in `src/features/cv/domain/` and a single sample document in `src/features/cv/data/`. The domain model should use readonly objects and narrow string unions for controlled values such as supported paper sizes. The initial sample should be static repository data, not a form or database-backed model.

Build one shared document renderer in `src/features/cv/components/`. This renderer should accept the CV data and the target paper size, then produce the actual CV markup. Keep the component free of business logic beyond formatting. The screen preview page and the print-only route must both use this same renderer.

Before finalizing the renderer structure, confirm which checked-in template variant is the active implementation target and map its sections directly into the component markup.

Create a dedicated print route in `src/app/cv/[paper]/page.tsx` or an equivalently explicit path. This route should render only the CV document and whatever wrappers are necessary for correct print output. Its CSS must define the paper-specific layout, margins, and print color behavior. The screen page can place the same document inside a neutral preview frame, but the document content itself must stay shared.

Add server-side PDF generation in `src/app/api/cv-pdf/route.ts` plus a small helper module such as `src/features/cv/server/renderCvPdf.ts`. This route should declare `export const runtime = "nodejs"` and launch Chromium through Playwright, open the internal print route for the requested paper size, and then call `page.pdf()` with explicit options. Use `printBackground: true` and explicit `format` values so the output does not silently fall back to Playwright defaults. The route should return the PDF as a downloadable response with a stable filename such as `cv-a4.pdf` or `cv-letter.pdf`.

Keep styling explicit and minimal. Use CSS modules or a feature-scoped stylesheet for the document rather than expanding `src/app/globals.css` into a large file. The plan should preserve the brief’s modern-classic direction and avoid dark mode logic, gradients, shadows, or decorative blocks.

Finish by adding tests, updating `README.md`, and, if implementation details become non-obvious, adding a short feature-specific doc under `docs/` that explains setup and export behavior. The README update must cover browser installation, local development, and the PDF generation command or UI flow.


## Concrete Steps

All commands below run from the repository root: `/home/marcel/src/cv-builder`.

1. Install dependencies and Chromium for Playwright if they are not already present:

       source ~/.nvm/nvm.sh && npm install
       source ~/.nvm/nvm.sh && npx playwright install chromium

   If browser binaries should stay local to the project, use the documented hermetic install form:

       source ~/.nvm/nvm.sh && PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install chromium

2. Replace the starter page and create the feature structure:

       src/app/page.tsx
       src/app/layout.tsx
       src/app/globals.css
       src/app/api/cv-pdf/route.ts
       src/app/cv/[paper]/page.tsx
       src/features/cv/domain/cvDocument.ts
       src/features/cv/data/sampleCvDocument.ts
       src/features/cv/components/CvDocument.tsx
       src/features/cv/components/CvDocument.module.css
       src/features/cv/components/CvShowcasePage.tsx
       src/features/cv/server/renderCvPdf.ts
       src/features/cv/server/paperFormat.ts

   Before implementing the final `src/features/cv/components/CvDocument.tsx` structure, review:

       docs/cv_templates/single_column_with_photo
       docs/cv_templates/single_column_without_photo
       docs/cv_templates/two_column_without_photo
       docs/cv_templates/two_column_with_photo

3. Add test and tool configuration needed for changed behavior. The exact filenames may vary, but the end state should include:

       package.json
       playwright.config.ts
       vitest.config.ts
       tests/e2e/cv-pdf.spec.ts
       tests/unit/paperFormat.test.ts
       tests/unit/CvDocument.test.tsx

   `paperFormat.test.ts` should assert that the supported paper size union maps to the correct Playwright `format` value and rejects unsupported variants at the type boundary. `CvDocument.test.tsx` should assert that the shared component renders the expected top-level sections from the sample data. `cv-pdf.spec.ts` should open the app, trigger the PDF route, and confirm that the response is a PDF with the expected filename and non-trivial byte length.

4. Update developer-facing docs:

       README.md
       docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md
       docs/cv-pdf-showcase.md

   `docs/cv-pdf-showcase.md` is only needed if the final behavior or setup steps are too detailed for the README. If the README can hold all operational guidance clearly, do not add this extra file.

5. Run validation after implementation:

       source ~/.nvm/nvm.sh && npm run lint
       source ~/.nvm/nvm.sh && npm run test:unit
       source ~/.nvm/nvm.sh && npm run test:e2e
       source ~/.nvm/nvm.sh && npm run build

6. Run the app manually and inspect both paper sizes:

       source ~/.nvm/nvm.sh && npm run dev

   Then visit:

       http://localhost:3000/
       http://localhost:3000/cv/a4
       http://localhost:3000/cv/letter
       http://localhost:3000/api/cv-pdf?paper=a4
       http://localhost:3000/api/cv-pdf?paper=letter


## Validation and Acceptance

Validation is complete only when all of the following are true:

- `source ~/.nvm/nvm.sh && npm run lint` succeeds with no ESLint errors.
- `source ~/.nvm/nvm.sh && npm run test:unit` succeeds and covers the paper-format mapping plus the shared CV component render.
- `source ~/.nvm/nvm.sh && npm run test:e2e` succeeds and proves that the PDF route returns `application/pdf` data for both `paper=a4` and `paper=letter`.
- `source ~/.nvm/nvm.sh && npm run build` succeeds, proving the Next.js app and route handlers compile in production mode.
- Running `source ~/.nvm/nvm.sh && npm run dev` and visiting `http://localhost:3000/` shows a browser preview page with:
  - a readable CV laid out in the restrained corporate style from `docs/project_description.md`,
  - a clear way to switch or inspect A4 versus Letter,
  - a download action that requests the PDF route.
- Visiting `http://localhost:3000/cv/a4` and `http://localhost:3000/cv/letter` shows the same shared CV content, with paper-size-specific layout adjustments rather than browser auto-scaling.
- Downloading `http://localhost:3000/api/cv-pdf?paper=a4` produces a PDF named `cv-a4.pdf`.
- Downloading `http://localhost:3000/api/cv-pdf?paper=letter` produces a PDF named `cv-letter.pdf`.
- The downloaded PDFs preserve background colors, dividers, and spacing closely enough that a side-by-side comparison with the corresponding print route does not show obvious layout drift. A practical check is that section breaks, contact row wrapping, and major spacing match the browser preview.

Expected evidence snippets after a correct implementation include:

    > npm run test:e2e
    2 passed

    > curl -I "http://localhost:3000/api/cv-pdf?paper=a4"
    HTTP/1.1 200 OK
    content-type: application/pdf
    content-disposition: attachment; filename="cv-a4.pdf"


## Idempotence and Recovery

Most implementation steps are additive and safe to repeat. Re-running `npm install`, `npx playwright install chromium`, `npm run lint`, `npm run test:unit`, `npm run test:e2e`, and `npm run build` should be safe and should not alter repository state beyond lockfiles, caches, or downloaded browser binaries.

If PDF generation fails midway, debug in this order:

1. Confirm the preview route works in the browser before debugging Playwright.
2. Confirm Chromium is installed with `source ~/.nvm/nvm.sh && npx playwright install chromium`.
3. Confirm the API route uses `runtime = "nodejs"` and not an Edge runtime.
4. Confirm the print route can be opened directly at `/cv/a4` or `/cv/letter`.
5. Confirm the paper query is validated and mapped to an allowed Playwright `format`.

If the PDF layout drifts from the browser preview, adjust the shared document CSS first. Do not fork the markup between preview and print unless a browser limitation is proven and recorded in `Decision Log`.

If test setup expands beyond the smallest valid path, prefer trimming the test stack rather than adding more infrastructure. The goal is a working showcase with reliable validation, not a broad platform build-out.


## Artifacts and Notes

Repository evidence gathered while drafting this plan:

- `package.json` already includes `playwright`, `next`, `react`, `typescript`, and `tailwindcss`.
- `src/app/page.tsx` is still the default Next.js starter page.
- `docs/project_description.md` defines the visual direction and explicitly requires A4 plus US Letter.
- Context7 for Playwright 1.58.2 confirms:
  - `page.pdf()` uses print CSS by default,
  - `printBackground` must be enabled for non-white design details,
  - explicit `format` values such as `A4` and `Letter` are supported,
  - `page.emulateMedia({ media: "screen" })` is only needed if the PDF should use screen CSS instead of print CSS.

Implementation note: because the goal is browser-to-PDF fidelity, prefer print CSS for export and a screen wrapper that does not alter the internal document layout. The internal document component should own spacing and typography; the outer screen shell should only provide chrome such as page background, controls, and centering.


## Interfaces and Dependencies

The end state should include these concrete interfaces and dependencies:

- `src/features/cv/domain/cvDocument.ts`
  - exports a readonly `CvDocument` type for the sample content
  - exports a narrow union for supported paper sizes, for example `"a4" | "letter"`

- `src/features/cv/server/paperFormat.ts`
  - exports a total mapping from the paper-size union to Playwright PDF options
  - rejects unsupported paper values before launching Chromium

- `src/features/cv/components/CvDocument.tsx`
  - renders the actual CV markup shared by preview and print routes
  - accepts the sample document data and selected paper size as props

- `src/app/cv/[paper]/page.tsx`
  - renders the print-target page for a supported paper size
  - performs request-time validation of the route parameter

- `src/features/cv/server/renderCvPdf.ts`
  - owns Chromium launch, page navigation, and the `page.pdf()` call
  - waits until the print route is ready before generating the PDF

- `src/app/api/cv-pdf/route.ts`
  - validates `paper`
  - calls the render helper
  - returns `application/pdf` with an attachment filename

- `playwright`
  - remains the browser automation dependency used for PDF generation

- Additional test dependencies to add during implementation:
  - `@playwright/test` for end-to-end PDF smoke coverage
  - `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` for unit and component tests

- `README.md`
  - documents setup, Chromium installation, development, test commands, and PDF export behavior


Changed on 2026-03-13 by Codex: updated the plan after finishing Phase 10 so it now records the final verification evidence, the accepted two-page export behavior for the sample content, and the fully completed roadmap state.
