# CV Builder

Next.js app for a browser-first CV showcase that renders the same HTML/CSS document to PDF through Playwright and headless Chromium, while presenting the project as an AI-assisted resume tailoring case study.

## Current Status

Phase 10 is complete.

The app currently provides:

- a layout-driven homepage at `/` with a value-first recruiter hero, sticky section navigation, and a narrative AI case-study structure
- a Polish-language homepage variant at `/?lang=pl` that localizes the website copy and recruiter workspace without changing the visual system
- a top-of-page English/Polski selector that switches language while preserving the active paper, version, and template selection
- a split-view CV workspace with a left-side variant selector and a large live preview with sticky view/listen/download actions
- paper switching on `/` through the `paper` query param (`/` for A4, `/?paper=letter` for Letter)
- language switching on `/` through the `lang` query param (`/` for English, `/?lang=pl` for Polish)
- recruiter-facing version switching on `/` through the `version` query param (`/` for AI Adoption Manager, `/?version=ats-friendly-general`, `/?version=leadership-stakeholder`, `/?version=operations-transformation`)
- template switching on `/` through the `template` query param, with each version resolving to its own default layout/photo treatment when `template` is omitted
- four recruiter-facing Marcel Kenner CV versions with actual content tailoring, not just relabeled layouts:
  - `ai-adoption-manager`
  - `ats-friendly-general`
  - `leadership-stakeholder`
  - `operations-transformation`
- all four checked-in templates driven by the same Marcel Kenner source CV:
  - `single-column-with-photo`
  - `single-column-without-photo`
  - `two-column-with-photo`
  - `two-column-without-photo`
- dedicated print-only routes at `/cv/a4` and `/cv/letter`, with optional `lang`, `version`, and `template` query selection
- intentional paper-specific layout tuning so Letter uses tighter vertical rhythm instead of a pure A4 scale-down
- a server-side Playwright PDF helper in `src/features/cv/server/renderCvPdf.ts` that returns non-empty PDF bytes for A4 and Letter
- an isolated server paper-format map in `src/features/cv/server/paperFormat.ts`
- pre-generated static PDF assets under `/generated/cv-pdf/`, covering every supported paper, language, version, and template combination for static hosting
- a Cloudflare Pages-ready static export configuration through `next.config.ts`, `.node-version`, and `wrangler.jsonc`
- a Playwright end-to-end harness in `tests/e2e/cv-pdf.spec.ts` that validates real English and Polish PDF assets from the exported site
- root typography configured through `next/font`
- global design-token wiring for the future CV document system
- initial `src/features/cv/` scaffolding for config, domain, data, components, and server helpers
- a typed CV document model and realistic static sample profile for the planned renderer
- a shared printable CV component rendered inside a neutral preview frame for both supported paper sizes
- unit test coverage for paper-variant resolution, the shared document renderer, the showcase shell, the print route, the server paper-format map, the PDF renderer helper, and the download API route

The roadmap implementation is complete. The showcase links to both the print route and the static PDF asset for the currently selected paper size, and the checked-in validation commands now cover unit, end-to-end, and production build checks.

## Commands

Run all Node commands with the required shell prefix:

```bash
source ~/.nvm/nvm.sh && npm run dev
source ~/.nvm/nvm.sh && npm run lint
source ~/.nvm/nvm.sh && npm run test:unit
source ~/.nvm/nvm.sh && npm run test:e2e
source ~/.nvm/nvm.sh && npm run build
source ~/.nvm/nvm.sh && npm run preview:static -- --port 4173
source ~/.nvm/nvm.sh && npm run refresh:static-pdfs
source ~/.nvm/nvm.sh && npm run cf:dev
source ~/.nvm/nvm.sh && npm run cf:deploy
source ~/.nvm/nvm.sh && npx playwright install chromium
```

Cloudflare Pages should use Node `22.16.0`, which is pinned in `.node-version`.

## Documentation

- [Implementation docs](./docs/Implementation/README.md)
- [CV design docs](./docs/cv/README.md)
- [Cloudflare Pages deployment](./docs/Implementation/Cloudflare_Pages_Deployment.md)
- [Source brief](./docs/project_description.md)

## Development Notes

- `src/app/layout.tsx` owns the root font and app-level CSS variables.
- `src/app/globals.css` should stay limited to global rules.
- CV-specific rendering and export logic belongs under `src/features/cv/`.
- The current release remains a read-only showcase with four checked-in Marcel CV versions rendered across the four checked-in template variants.
- The shared document preview currently renders on `/` and `/?lang=pl` through `src/features/cv/components/CvShowcasePage.tsx` and `src/features/cv/components/CvDocument.tsx`.
- The homepage now combines a concise recruiter/download hero, a split-view preview workspace, origin-story context for how the build started, a roadmap-based implementation timeline, and a short implementation-fixes section in one route.
- The workspace action row now also exposes a native audio player for `public/Marcel_CV_audio-enhanced-v2.mp3`, so readers can listen to a narrated CV read-through without leaving the page.
- The site favicon now uses the resume-check icon asset at `public/favicon-resume-check.svg`.
- The app now builds as a static export in `out/`, and the live route state for `lang`, `paper`, `version`, and `template` is resolved client-side so the exported Pages build can still react to URL query parameters.
- Homepage utility controls, metadata rows, structured narrative chips, and external reference links now use restrained outline Heroicons to improve scanability without turning the page into an icon-heavy UI.
- The source brief in `docs/project_description.md` now reflects the workspace-first and narrative-section homepage structure.
- The checked-in source profile is Marcel Kenner, and the app now derives four recruiter-facing CV versions from that same verified experience base without inventing unsupported facts.
- The Marcel source CV now includes the checked-in headshot asset at `public/new_pfp1.jpg`, and every recruiter-facing CV version defaults to a photo-including template.
- The versioned CV data lives in `src/features/cv/data/cvVersions.ts`, which now resolves English or Polish document content by locale, while `src/features/cv/domain/cvVersion.ts` owns the typed recruiter-facing version slugs and default template mapping.
- The print-only document route currently renders at `/cv/[paper]` through `src/app/cv/[paper]/page.tsx` and accepts the optional `lang`, `version`, and `template` query parameters.
- PDF downloads now resolve to static assets through `src/features/cv/domain/cvPdfAsset.ts` and `src/features/cv/components/showcase/showcaseLinks.ts`, with the actual files generated into `public/generated/cv-pdf/` and distinguished by `-pl` suffixes for Polish assets.
- Paper-specific document spacing currently comes from `src/features/cv/config/designTokens.ts` and is applied via `src/features/cv/components/cvDocumentStyle.ts`.
- Playwright PDF generation remains isolated to `src/features/cv/server/renderCvPdf.ts`, while `scripts/generate-static-cv-pdfs.ts` owns the static asset generation workflow used before deployment.
- Print pagination now measures subsection units on the print route instead of treating each whole section as one box. `Professional experience` is kept atomic at the role level, so if a role does not fit in the remaining page space the whole role moves to the next page.
- `playwright.config.ts` builds the static export and serves `out/` on port `3101` for `npm run test:e2e`, and `tests/e2e/cv-pdf.spec.ts` checks the exported PDF assets for a valid `%PDF` file signature.

## Export Notes

- `/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo.pdf` serves the default A4 download.
- `/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo-pl.pdf` serves the default Polish A4 download.
- `/generated/cv-pdf/cv-letter-ai-adoption-manager-single-column-with-photo.pdf` serves the default Letter download.
- `/generated/cv-pdf/cv-letter-ai-adoption-manager-single-column-with-photo-pl.pdf` serves the default Polish Letter download.
- `/generated/cv-pdf/cv-a4-ats-friendly-general-single-column-with-photo.pdf` serves the A4 ATS-friendly download.
- `/generated/cv-pdf/cv-a4-leadership-stakeholder-two-column-with-photo.pdf` serves the A4 leadership download.
- `/generated/cv-pdf/cv-letter-operations-transformation-two-column-with-photo.pdf` serves the Letter operations download.
- `/generated/cv-pdf/cv-letter-operations-transformation-two-column-with-photo-pl.pdf` serves the Polish Letter operations download.
- `npm run refresh:static-pdfs` rebuilds the site, serves the export locally, and regenerates every supported PDF asset into both `public/generated/cv-pdf/` and `out/generated/cv-pdf/`.
- The generated asset set now includes both English and Polish variants for every supported paper, version, and template combination.
- With the current sample CV content, both exports remain two-page PDFs.
- Print pagination now runs a measured subsection pass on the print route before PDF export. Whole sections can still move when their heading plus first unit would spill, and `Professional experience` now breaks at whole-role boundaries so roles are not split across pages.
- PDF readiness now waits for that pagination pass to finish, not just for the route HTML and fonts to load.
- Technical skill rows now render as fixed label/value columns instead of inline text, which keeps the PDF spacing stable for entries such as `Commercial systems: Salesforce · HubSpot · Power BI`.
# brand24_cv_builder
