# CV Builder

Next.js app for a browser-first CV showcase that will render the same HTML/CSS document to PDF through Playwright and headless Chromium.

## Current Status

Phase 10 is complete.

The app currently provides:

- a dedicated showcase shell at `/`
- paper switching on `/` through the `paper` query param (`/` for A4, `/?paper=letter` for Letter)
- dedicated print-only routes at `/cv/a4` and `/cv/letter`
- intentional paper-specific layout tuning so Letter uses tighter vertical rhythm instead of a pure A4 scale-down
- a server-side Playwright PDF helper in `src/features/cv/server/renderCvPdf.ts` that returns non-empty PDF bytes for A4 and Letter
- an isolated server paper-format map in `src/features/cv/server/paperFormat.ts`
- a stable download route at `/api/cv-pdf?paper=a4` or `/api/cv-pdf?paper=letter`
- a Playwright end-to-end harness in `tests/e2e/cv-pdf.spec.ts` that validates real PDF responses from the live route
- root typography configured through `next/font`
- global design-token wiring for the future CV document system
- initial `src/features/cv/` scaffolding for config, domain, data, components, and server helpers
- a typed CV document model and realistic static sample profile for the planned renderer
- a shared printable CV component rendered inside a neutral preview frame for both supported paper sizes
- unit test coverage for paper-variant resolution, the shared document renderer, the showcase shell, the print route, the server paper-format map, the PDF renderer helper, and the download API route

The roadmap implementation is complete. The showcase links to both the print route and the live download route for the currently selected paper size, and the checked-in validation commands now cover unit, end-to-end, and production build checks.

## Commands

Run all Node commands with the required shell prefix:

```bash
source ~/.nvm/nvm.sh && npm run dev
source ~/.nvm/nvm.sh && npm run lint
source ~/.nvm/nvm.sh && npm run test:unit
source ~/.nvm/nvm.sh && npm run test:e2e
source ~/.nvm/nvm.sh && npm run build
source ~/.nvm/nvm.sh && npx playwright install chromium
```

There is no `.nvmrc` file in the repository as of March 13, 2026, so the shell prefix is required but there is no repo-pinned Node version file to read.

## Documentation

- [Implementation docs](./docs/Implementation/README.md)
- [CV design docs](./docs/cv/README.md)
- [Source brief](./docs/project_description.md)

## Development Notes

- `src/app/layout.tsx` owns the root font and app-level CSS variables.
- `src/app/globals.css` should stay limited to global rules.
- CV-specific rendering and export logic belongs under `src/features/cv/`.
- The first release remains a read-only showcase with no-photo-first layout support.
- The shared document preview currently renders on `/` through `src/features/cv/components/CvShowcasePage.tsx` and `src/features/cv/components/CvDocument.tsx`.
- The checked-in sample profile is now tailored to Marcel Kenner for AI Adoption Manager targeting, and the sample document can omit unavailable contact methods or education entries instead of inventing them.
- The print-only document route currently renders at `/cv/[paper]` through `src/app/cv/[paper]/page.tsx`.
- The PDF download route currently renders at `/api/cv-pdf` through `src/app/api/cv-pdf/route.ts` and requires a `paper` query value of `a4` or `letter`.
- Paper-specific document spacing currently comes from `src/features/cv/config/designTokens.ts` and is applied via `src/features/cv/components/cvDocumentStyle.ts`.
- Playwright PDF generation remains isolated to `src/features/cv/server/renderCvPdf.ts`, while `src/app/api/cv-pdf/route.ts` owns the HTTP contract and attachment headers.
- Print pagination now measures subsection units on the print route instead of treating each whole section as one box. `Professional experience` is kept atomic at the role level, so if a role does not fit in the remaining page space the whole role moves to the next page.
- `playwright.config.ts` builds and starts the local Next app on port `3101` for `npm run test:e2e`, and `tests/e2e/cv-pdf.spec.ts` checks the live PDF headers plus `%PDF` file signature.

## Export Notes

- `/api/cv-pdf?paper=a4` downloads `cv-a4.pdf`.
- `/api/cv-pdf?paper=letter` downloads `cv-letter.pdf`.
- With the current sample CV content, both exports remain two-page PDFs.
- Print pagination now runs a measured subsection pass on the print route before PDF export. Whole sections can still move when their heading plus first unit would spill, and `Professional experience` now breaks at whole-role boundaries so roles are not split across pages.
- PDF readiness now waits for that pagination pass to finish, not just for the route HTML and fonts to load.
- Technical skill rows now render as fixed label/value columns instead of inline text, which keeps the PDF spacing stable for entries such as `Commercial systems: Salesforce · HubSpot · Power BI`.
# brand24_cv_builder
