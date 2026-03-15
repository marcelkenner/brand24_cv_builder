# CV PDF Showcase Development Roadmap

This roadmap defines the exact implementation order for the CV PDF showcase app. It is intended to be used together with [`ExecPlan_CV_PDF_Showcase_App.md`](./ExecPlan_CV_PDF_Showcase_App.md), `docs/project_description.md`, and the focused CV docs under `docs/cv/`.

## Planning Assumptions

This sequence assumes:

- one engineer is driving the first implementation pass,
- the scope remains the current read-only showcase app,
- no external CMS, database, or authentication is introduced,
- the first release targets browser preview plus Playwright PDF export,
- the no-photo variant is required in the first delivery, while ATS Word export remains documented but not implemented inside the app unless scope changes.

The timeline below is relative, not calendar-based. It is the exact order of work, with estimated effort blocks for sequencing. If a phase slips, do not overlap later phases unless the listed gate for the earlier phase is complete.

## Reference File Map

Core planning and design references used across multiple phases:

- `docs/project_description.md`
- `docs/cv/README.md`
- `docs/cv/01_brand_and_visual_direction.md`
- `docs/cv/02_layout_and_document_system.md`
- `docs/cv/03_typography_color_photo_header.md`
- `docs/cv/04_content_structure_and_copy.md`
- `docs/cv/05_ats_market_and_delivery.md`
- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `docs/cv_templates/single_column_with_photo`
- `docs/cv_templates/single_column_without_photo`
- `docs/cv_templates/two_column_without_photo`
- `docs/cv_templates/two_column_with_photo`
- `docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md`
- `docs/Implementation/Phase0_Foundation_Freeze_Decisions.md`
- `docs/Implementation/Roadmap_CV_PDF_Showcase_App.md`

Primary implementation files expected by this roadmap:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/cv/[paper]/page.tsx`
- `src/app/api/cv-pdf/route.ts`
- `src/features/cv/config/designTokens.ts`
- `src/features/cv/domain/cvDocument.ts`
- `src/features/cv/domain/paperVariant.ts`
- `src/features/cv/data/projectOverview.ts`
- `src/features/cv/data/sampleCvDocument.ts`
- `src/features/cv/components/CvAppShell.tsx`
- `src/features/cv/components/shell/CvAppShellHero.tsx`
- `src/features/cv/components/shell/CvAppShellFoundationGrid.tsx`
- `src/features/cv/components/shell/CvAppShellDeliveryGrid.tsx`
- `src/features/cv/components/shell/CvSectionHeading.tsx`
- `src/features/cv/components/CvDocument.tsx`
- `src/features/cv/components/CvDocument.module.css`
- `src/features/cv/components/CvShowcasePage.tsx`
- `src/features/cv/server/installCommands.ts`
- `src/features/cv/server/paperFormat.ts`
- `src/features/cv/server/renderCvPdf.ts`
- `README.md`
- `package.json`

## Exact Development Order

### Phase 0: Foundation Freeze

Estimated effort: 0.5 day

Goal:

- lock the implementation scope, design rules, and document structure before writing app code

Tasks:

1. confirm `docs/project_description.md` remains the source design brief
2. confirm `docs/cv/06_web_to_pdf_implementation_notes.md` remains the technical translation layer
3. confirm `docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md` remains the execution spec
4. create or confirm the required ASCII layout templates in `docs/cv_templates/` before app code starts
5. install dependencies and Chromium if needed
6. decide the initial sample CV content boundaries and the default no-photo-first approach

Reference files:

- `docs/project_description.md`
- `docs/cv/README.md`
- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `docs/cv_templates/single_column_with_photo`
- `docs/cv_templates/single_column_without_photo`
- `docs/cv_templates/two_column_without_photo`
- `docs/cv_templates/two_column_with_photo`
- `docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md`
- `docs/Implementation/Phase0_Foundation_Freeze_Decisions.md`
- `package.json`

Gate to exit Phase 0:

- the docs are internally aligned
- the required layout templates exist in `docs/cv_templates/` for the planned variants
- the team agrees that the first release is a read-only showcase with browser preview and PDF export
- Playwright Chromium installation is working locally

### Phase 1: App Skeleton And Tokens

Estimated effort: 0.5 to 1 day

Goal:

- replace the starter app with the minimal project skeleton required for the feature

Tasks:

1. replace the default content in `src/app/page.tsx`
2. update `src/app/layout.tsx` with the chosen font setup using `next/font` and CSS variables
3. simplify `src/app/globals.css` so it only contains truly global rules
4. create the `src/features/cv/` folder structure for domain, data, components, and server helpers
5. define initial design tokens for spacing, type, colors, and paper-size variants

Reference files:

- `docs/cv/02_layout_and_document_system.md`
- `docs/cv/03_typography_color_photo_header.md`
- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/features/cv/config/designTokens.ts`
- `src/features/cv/domain/paperVariant.ts`
- `src/features/cv/data/phaseOneOverview.ts`
- `src/features/cv/components/CvAppShell.tsx`
- `src/features/cv/server/installCommands.ts`

Gate to exit Phase 1:

- the app boots into a controlled shell instead of the create-next-app starter page
- root typography and global styling are defined once and ready for both preview and print routes

### Phase 2: Domain Model And Sample Content

Estimated effort: 0.5 day

Goal:

- define the typed CV data model before rendering

Tasks:

1. create `src/features/cv/domain/cvDocument.ts`
2. model supported paper sizes as a narrow union
3. model optional sections so invalid content states are hard to express
4. create `src/features/cv/data/sampleCvDocument.ts`
5. ensure sample content follows `docs/cv/04_content_structure_and_copy.md`

Reference files:

- `docs/cv/04_content_structure_and_copy.md`
- `docs/cv/05_ats_market_and_delivery.md`
- `src/features/cv/domain/cvDocument.ts`
- `src/features/cv/data/sampleCvDocument.ts`
- `src/features/cv/data/projectOverview.ts`

Gate to exit Phase 2:

- the sample CV can drive rendering without placeholder shape churn
- paper variants are type-safe

### Phase 3: Shared Document Component

Estimated effort: 1 day

Goal:

- build the printable CV document once, without PDF generation yet

Tasks:

1. create `src/features/cv/components/CvDocument.tsx`
2. create `src/features/cv/components/CvDocument.module.css`
3. implement header, summary, competencies, experience, education, languages, and skills
4. keep markup semantic and text-based for future ATS alignment
5. implement the no-photo path first so layout works with the stricter variant
6. use the approved `docs/cv_templates/` wireframes as the visual blueprint instead of inventing layout structure during implementation

Reference files:

- `docs/cv/01_brand_and_visual_direction.md`
- `docs/cv/02_layout_and_document_system.md`
- `docs/cv/03_typography_color_photo_header.md`
- `docs/cv/04_content_structure_and_copy.md`
- `docs/cv/05_ats_market_and_delivery.md`
- `docs/cv_templates/single_column_with_photo`
- `docs/cv_templates/single_column_without_photo`
- `docs/cv_templates/two_column_without_photo`
- `docs/cv_templates/two_column_with_photo`
- `src/features/cv/components/CvDocument.tsx`
- `src/features/cv/components/CvDocument.module.css`
- `src/features/cv/data/sampleCvDocument.ts`

Gate to exit Phase 3:

- the CV renders correctly inside a local page
- the document visually matches the brief’s hierarchy and restraint
- no part of the layout depends on PDF generation to look correct

### Phase 4: Browser Showcase Route

Estimated effort: 0.5 to 1 day

Goal:

- wrap the shared document in a browser preview experience

Tasks:

1. create a thin showcase component such as `src/features/cv/components/CvShowcasePage.tsx`
2. add a neutral preview shell around the document
3. add paper-size switching between A4 and Letter
4. add links or buttons for print route inspection and future PDF download
5. keep the shell separate from the document styling

Reference files:

- `docs/cv/02_layout_and_document_system.md`
- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `src/app/page.tsx`
- `src/features/cv/components/CvShowcasePage.tsx`
- `src/features/cv/components/CvDocument.tsx`

Gate to exit Phase 4:

- visiting `/` shows a usable CV preview
- switching paper size updates the preview mode without mutating the underlying content model

### Phase 5: Print Route

Estimated effort: 0.5 day

Goal:

- expose a dedicated route that renders only the printable document

Tasks:

1. create `src/app/cv/[paper]/page.tsx`
2. validate the route parameter
3. render the shared document component with the selected paper size
4. add print-specific wrappers and CSS behavior only where necessary
5. verify A4 first, then Letter

Reference files:

- `docs/cv/02_layout_and_document_system.md`
- `docs/cv/03_typography_color_photo_header.md`
- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `src/app/cv/[paper]/page.tsx`
- `src/features/cv/components/CvDocument.tsx`
- `src/features/cv/domain/cvDocument.ts`

Gate to exit Phase 5:

- `/cv/a4` and `/cv/letter` both render directly
- the print route is clean enough for Playwright to open without extra app chrome

### Phase 6: Paper-Specific Refinement

Estimated effort: 0.5 to 1 day

Goal:

- make A4 and Letter intentionally different where line wrapping and page flow require it

Tasks:

1. confirm A4 layout against the default brief
2. refine Letter layout so it does not look auto-scaled
3. tune contact line wrapping, section breaks, and vertical rhythm
4. confirm no-photo layout remains stable in both paper modes

Reference files:

- `docs/project_description.md`
- `docs/cv/02_layout_and_document_system.md`
- `docs/cv/03_typography_color_photo_header.md`
- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `src/app/cv/[paper]/page.tsx`
- `src/features/cv/components/CvDocument.module.css`

Gate to exit Phase 6:

- both paper modes look deliberate in the browser
- no major spacing drift remains between A4 and Letter

### Phase 7: PDF Rendering Helper

Estimated effort: 0.5 day

Goal:

- generate a PDF from the print route in Node using Playwright

Tasks:

1. create `src/features/cv/server/paperFormat.ts`
2. map paper variants to explicit Playwright `format` values
3. create `src/features/cv/server/renderCvPdf.ts`
4. launch Chromium, open the print route, wait for readiness, and call `page.pdf()`
5. enable `printBackground: true` and exact print color handling

Reference files:

- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md`
- `src/features/cv/server/paperFormat.ts`
- `src/features/cv/server/renderCvPdf.ts`
- `src/app/cv/[paper]/page.tsx`
- `package.json`

Gate to exit Phase 7:

- the server helper returns non-empty PDF bytes for A4 and Letter
- export logic stays isolated from UI components

### Phase 8: Download API Route

Estimated effort: 0.5 day

Goal:

- expose PDF export through a stable HTTP interface

Tasks:

1. create `src/app/api/cv-pdf/route.ts`
2. force Node runtime
3. validate the `paper` query parameter
4. call the PDF render helper
5. return `application/pdf` with a deterministic attachment filename

Reference files:

- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `src/app/api/cv-pdf/route.ts`
- `src/features/cv/server/renderCvPdf.ts`
- `src/features/cv/server/paperFormat.ts`

Gate to exit Phase 8:

- `/api/cv-pdf?paper=a4` downloads `cv-a4.pdf`
- `/api/cv-pdf?paper=letter` downloads `cv-letter.pdf`

### Phase 9: Test Harness

Estimated effort: 1 day

Goal:

- protect the core logic and exported behavior

Tasks:

1. add unit test tooling if not already configured
2. add unit tests for paper format mapping
3. add component tests for the shared document structure
4. add Playwright end-to-end tests for PDF response behavior
5. make the test commands part of `package.json`

Reference files:

- `docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md`
- `src/features/cv/server/paperFormat.ts`
- `src/features/cv/components/CvDocument.tsx`
- `src/app/api/cv-pdf/route.ts`
- `package.json`
- `playwright.config.ts`
- `vitest.config.ts`
- `tests/unit/paperFormat.test.ts`
- `tests/unit/CvDocument.test.tsx`
- `tests/e2e/cv-pdf.spec.ts`

Gate to exit Phase 9:

- unit and end-to-end tests pass locally
- at least one test proves that the PDF route returns a real PDF response

### Phase 10: Final Documentation And Verification

Estimated effort: 0.5 day

Goal:

- finish the release as a documented, repeatable system

Tasks:

1. update `README.md` with setup, development, and PDF export instructions
2. update the ExecPlan progress and findings
3. update docs if implementation discovered print or browser constraints
4. run lint, tests, and production build
5. manually compare browser preview and exported PDF for both paper sizes

Reference files:

- `README.md`
- `docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md`
- `docs/Implementation/Roadmap_CV_PDF_Showcase_App.md`
- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `src/app/page.tsx`
- `src/app/cv/[paper]/page.tsx`
- `src/app/api/cv-pdf/route.ts`

Gate to exit Phase 10:

- docs match actual behavior
- all configured checks pass
- manual preview versus PDF comparison is acceptable for both paper sizes

## Critical Path

The critical path is:

1. Phase 1
2. Phase 2
3. Phase 3
4. Phase 5
5. Phase 6
6. Phase 7
7. Phase 8
8. Phase 9
9. Phase 10

Phase 4 is important for usability review, but PDF export technically depends more directly on the print route than on the preview shell. Even so, keep Phase 4 before PDF work so visual review happens earlier and layout mistakes are cheaper to catch.

## Do Not Reorder These Steps

Do not:

- start PDF rendering before the print route exists
- start Letter tuning before A4 is visually stable
- add end-to-end tests before the API route can return a PDF
- add ATS-specific implementation paths before the designed showcase is stable
- introduce editing, persistence, or auth before the read-only showcase is complete

## Recommended Delivery Cadence

If work proceeds cleanly, the first implementation pass should land in this cadence:

- Day 1: Phases 0 through 2
- Day 2: Phases 3 and 4
- Day 3: Phases 5 and 6
- Day 4: Phases 7 and 8
- Day 5: Phases 9 and 10

This is an estimate, not a promise. If layout fidelity becomes difficult, spend the extra time in Phases 3, 5, and 6 rather than rushing to PDF export.

## Definition Of “Ready For Next Phase”

Move to the next phase only when:

- the current phase’s gate is satisfied,
- the current code compiles,
- the current docs still match reality,
- no unresolved design drift from `docs/project_description.md` remains in the touched area.

## Roadmap Status

Current status as of 2026-03-13:

- completed: planning and design documentation
- completed: ASCII layout templates for single-column and restrained two-column variants in `docs/cv_templates/`
- completed: Phase 0 foundation freeze
- completed: Phase 1 app skeleton and tokens
- completed: Phase 2 domain model and sample content
- completed: Phase 3 shared document component
- completed: Phase 4 browser showcase route
- completed: Phase 5 print route
- completed: Phase 6 paper-specific refinement
- completed: Phase 7 PDF rendering helper
- completed: Phase 8 download API route
- completed: Phase 9 test harness
- completed: Phase 10 final documentation and verification
