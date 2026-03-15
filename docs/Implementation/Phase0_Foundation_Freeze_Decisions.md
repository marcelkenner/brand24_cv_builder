# Phase 0 Foundation Freeze Decisions

This document records the decisions required to close Phase 0 of the CV PDF showcase app roadmap. It is a small, implementation-facing contract for what the first build will and will not do.

## Scope Locked For First Implementation Pass

The first implementation pass is:

- a read-only Next.js showcase app
- one shared HTML/CSS CV document rendered in the browser
- one dedicated print route for paper-specific rendering
- one Playwright-backed PDF export path using headless Chromium
- two supported paper sizes: A4 portrait and US Letter portrait

The first implementation pass is not:

- a CV editor
- a persistence layer
- an auth flow
- a CMS integration
- an ATS Word export generator inside the app
- a photo-upload workflow

## Source Documents To Follow

The implementation must stay aligned with these documents:

- `docs/project_description.md`
- `docs/cv/01_brand_and_visual_direction.md`
- `docs/cv/02_layout_and_document_system.md`
- `docs/cv/03_typography_color_photo_header.md`
- `docs/cv/04_content_structure_and_copy.md`
- `docs/cv/05_ats_market_and_delivery.md`
- `docs/cv/06_web_to_pdf_implementation_notes.md`
- `docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md`
- `docs/Implementation/Roadmap_CV_PDF_Showcase_App.md`

## Initial Sample CV Content Boundaries

The initial sample CV should be static repository data and should represent a credible corporate candidate rather than lorem ipsum.

The sample CV must include:

- name
- target professional headline
- location
- email
- phone
- LinkedIn
- professional summary
- core competencies
- professional experience
- education
- languages
- technical skills

The sample CV may include certifications only if the sample remains concise and improves the hiring story. The sample CV should omit optional sections unless they materially improve realism without increasing layout risk.

The sample content should be written to target:

- consulting
- strategy
- business development
- operations
- finance-adjacent corporate roles

The sample should be concise enough to fit the default designed version cleanly, with A4 as the master target and Letter as the second paper variant to refine afterward.

## Variant Decision

The default implementation order is:

1. no-photo version
2. photo variant only after the no-photo layout is stable and a real asset exists

Reason:

- the repository currently has no approved headshot asset
- the no-photo variant is stricter because it cannot rely on a visual anchor in the header
- the brief explicitly requires a no-photo version for ATS-sensitive markets

The first browser preview and first exported PDFs should therefore work without a headshot.

## Environment Verification Completed In Phase 0

Phase 0 verified the following local prerequisites:

- `node_modules` exists in the repository
- Playwright CLI is available at version `1.58.2`
- Chromium install command ran successfully using `source ~/.nvm/nvm.sh && npx playwright install chromium`
- no `.nvmrc` file is present in the repository as of 2026-03-13, so the shell prefix remains required but there is no repo-pinned Node version file to honor

## Carry-Forward Constraints For Phase 1

Phase 1 must preserve these decisions:

- keep `src/app/layout.tsx` responsible for root typography setup
- keep `src/app/globals.css` small and global-only
- keep CV-specific styling outside `globals.css`
- keep paper size as an explicit typed variant
- do not add editing or persistence code
- do not add a photo-specific layout dependency to the first document render
