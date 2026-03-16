# Add Polish-Language Website Variant

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

If `docs/plans.md` exists, this plan must cite its repository-relative path and remain consistent with it. This plan was authored against `docs/plans.md` on 2026-03-16 and must continue to follow its required section names, progress tracking, self-contained guidance, and behavioral validation rules.

## Purpose / Big Picture

Add a Polish-language variant of the current CV showcase so a visitor can open the site in Polish, review the CV and surrounding recruiter-facing copy in Polish, open the print route in Polish, and download Polish PDF assets without breaking the current English experience. The completed change is observable by opening `/?lang=pl`, confirming that the homepage workspace and CV content render in Polish, opening `/cv/a4?lang=pl`, and downloading a Polish static PDF asset whose filename clearly identifies the Polish variant.


## Progress

- [x] (2026-03-16 10:05Z) Read `docs/plans.md`, `README.md`, the existing implementation docs, and the current CV feature files needed to scope localization work.
- [x] (2026-03-16 10:05Z) Drafted this ExecPlan in `docs/Implementation/ExecPlan_Polish_Language_Variant.md`.
- [x] (2026-03-16 11:18Z) Introduced a typed locale model and threaded locale through showcase routing, print routing, download links, PDF asset naming, and Playwright PDF rendering.
- [x] (2026-03-16 11:24Z) Moved website and CV content behind locale-aware data accessors and added checked-in Polish copy for the homepage, section labels, recruiter-facing metadata, and all four CV variants.
- [x] (2026-03-16 11:46Z) Regenerated English and Polish static PDF assets, added locale-focused unit and e2e coverage, updated README and implementation docs, and verified the exported site at `/?lang=pl` plus `/cv/a4?lang=pl`.


## Surprises & Discoveries

- Observation: The repository already separates route state, PDF asset naming, CV data, and homepage copy, but English strings still live in several different files.
  Evidence: English user-facing copy is currently spread across `src/features/cv/data/showcaseHomepage.ts`, `src/features/cv/domain/cvVersion.ts`, `src/features/cv/data/sampleCvDocument.ts`, `src/features/cv/data/cvVersions.ts`, and `src/features/cv/domain/cvDocument.ts`.

- Observation: The exported site is static, and the homepage already resolves `paper`, `version`, and `template` from URL query parameters on the client.
  Evidence: `next.config.ts` sets `output: "export"`, `src/app/page.tsx` uses `dynamic = "force-static"`, and `src/features/cv/components/routes/CvShowcaseRouteClient.tsx` resolves state from `useSearchParams()`.

- Observation: Static PDF generation currently enumerates only paper, version, and template, so locale-aware downloads require explicit changes in both asset-target modeling and the generator script.
  Evidence: `src/features/cv/domain/cvPdfAsset.ts` defines `CvPdfAssetTarget` without locale, and `scripts/generate-static-cv-pdfs.ts` loops over `getStaticCvPdfTargets()` and writes one PDF per current target.

- Observation: The current English implementation treats section labels as domain constants, which will block full document localization if left unchanged.
  Evidence: `src/features/cv/domain/cvDocument.ts` exports `cvSectionLabels` as a fixed English `Record<CvSectionKey, string>`.

- Observation: The static export can support the Polish website variant without new routes, as long as `lang` is resolved on the client and preserved in generated download and print links.
  Evidence: `src/app/page.tsx` already uses the client-side route resolver, and the implemented `/?lang=pl` runtime check against `out/` returned a Polish hero heading plus Polish workspace content on 2026-03-16.

- Observation: Locale-aware PDF assets must be distinguished in filenames because the static generator writes all outputs into the same `public/generated/cv-pdf/` and `out/generated/cv-pdf/` directories.
  Evidence: `src/features/cv/domain/cvPdfAsset.ts` now emits `-pl` suffixes for Polish assets, and `npm run refresh:static-pdfs` generated both `cv-a4-ai-adoption-manager-single-column-with-photo.pdf` and `cv-a4-ai-adoption-manager-single-column-with-photo-pl.pdf` on 2026-03-16.


## Decision Log

- Decision: Treat this request as a Polish-language variant of the existing website and CV export pipeline, not as a Polish-market visual redesign.
  Rationale: The current repository already has a stable visual system and export workflow. The smallest correct interpretation is language localization of the existing experience.
  Date/Author: 2026-03-16 / Codex

- Decision: Add locale selection through a new `lang` query parameter and keep the current route structure intact.
  Rationale: The site already resolves `paper`, `version`, and `template` through query parameters on a static export. Extending that pattern is the smallest valid change and avoids introducing a second route tree such as `/pl/...`.
  Date/Author: 2026-03-16 / Codex

- Decision: Keep `version` and `template` slugs unchanged and localize only display copy and document content.
  Rationale: The slugs are already part of route state, tests, and static asset generation. Translating display text without translating slugs minimizes churn and preserves current internal identifiers.
  Date/Author: 2026-03-16 / Codex

- Decision: Store Polish copy as checked-in repository data rather than using runtime machine translation.
  Rationale: The app is a static export with deterministic PDF outputs. Checked-in translations keep outputs reviewable, testable, and stable.
  Date/Author: 2026-03-16 / Codex

- Decision: Write the Polish copy in natural day-to-day professional Polish, not as a literal word-for-word translation from English.
  Rationale: The value of the Polish variant depends on it sounding like something a Polish-speaking recruiter or hiring manager would actually read in normal business communication. Literal translation would make the CV and website feel foreign even if technically correct.
  Date/Author: 2026-03-16 / Codex

- Decision: Preserve existing English PDF asset filenames and add explicit `-pl` suffixes for Polish assets.
  Rationale: This keeps existing English links stable while making Polish assets unmistakable in the generated file tree.
  Date/Author: 2026-03-16 / Codex


## Outcomes & Retrospective

The Polish-language variant is now implemented. The site supports `lang=pl` on the homepage and print route, the homepage copy and all four CV variants are localized into natural day-to-day professional Polish, and the static PDF generator now produces both English and Polish asset sets without breaking existing English filenames. The most important lesson from the work is that the repository already had the right architectural seams for localization, but the strings had to be pulled out of several different files before the locale model became coherent. Verification now covers locale parsing, route-state resolution, localized rendering, locale-aware PDF asset naming, generated Polish PDF binaries, and a runtime browser check against the exported site.


## Context and Orientation

This repository is a Next.js 16 App Router application that exports a static site from `out/`. The homepage route is `src/app/page.tsx`; it renders a suspended client-side route resolver so the static export can still react to URL query parameters at runtime. The print route is `src/app/cv/[paper]/page.tsx`; it statically enumerates `a4` and `letter`, then delegates print rendering to the CV feature code.

The relevant feature code lives under `src/features/cv/`. The route-state parser is `src/features/cv/domain/cvRouteState.ts`. It currently resolves `paper`, `version`, and `template`, and it provides defaults for both the showcase and print route. PDF asset naming lives in `src/features/cv/domain/cvPdfAsset.ts`, and the static asset generation workflow lives in `scripts/generate-static-cv-pdfs.ts`.

The current CV content is not centralized into one locale bundle. The homepage narrative copy is in `src/features/cv/data/showcaseHomepage.ts`. The recruiter-facing version metadata is mixed into `src/features/cv/domain/cvVersion.ts`. The base English CV copy is in `src/features/cv/data/sampleCvDocument.ts`, and the tailored English variants are assembled in `src/features/cv/data/cvVersions.ts`. Section headings such as `Professional summary` and `Languages` are still fixed English labels in `src/features/cv/domain/cvDocument.ts`. The shared browser and print renderers consume these sources through `src/features/cv/components/CvShowcasePage.tsx`, `src/features/cv/components/CvDocument.tsx`, `src/features/cv/components/cvDocumentContent.tsx`, `src/features/cv/components/routes/CvShowcaseRouteContent.tsx`, and `src/features/cv/components/routes/CvPrintRouteContent.tsx`.

For this plan, “locale” means the language variant of the current site. It does not change the visual template, paper size, or recruiter-facing version slug. It only changes user-visible text, document content, and the generated Polish PDF asset selection. The initial locale set should be closed and typed as English plus Polish only.


## Plan of Work

Start by introducing a dedicated locale model in a new file `src/features/cv/domain/cvLocale.ts`. That file should define the closed locale union, default locale, a parser, and metadata needed by the UI. Then update `src/features/cv/domain/cvRouteState.ts` so both the showcase and print route state include locale, resolving a new `lang` query parameter and falling back to English when absent or invalid. Update `src/features/cv/components/routes/CvShowcaseRouteClient.tsx`, `src/features/cv/components/routes/CvShowcaseRouteContent.tsx`, `src/features/cv/components/routes/CvPrintRouteClient.tsx`, and `src/features/cv/components/routes/CvPrintRouteContent.tsx` so locale flows from the URL into both the browser and print render paths.

Next, move English-only copy out of domain constants and into locale-aware data modules. Replace the fixed `cvSectionLabels` export in `src/features/cv/domain/cvDocument.ts` with a locale-aware label lookup, for example through a new `src/features/cv/data/cvSectionLabels.ts`. Move recruiter-facing version metadata strings out of `src/features/cv/domain/cvVersion.ts` into a new locale-aware data module such as `src/features/cv/data/cvVersionMetadata.ts`, while keeping `cvVersion.ts` responsible only for typed slugs, defaults, and parsers. Do the same for homepage narrative copy currently stored in `src/features/cv/data/showcaseHomepage.ts`, keeping the existing data shape but resolving it from locale-specific source objects.

Then split the CV content into locale-aware sources. Keep shared structural data, identifiers, photo configuration, template defaults, and paper support unchanged, but create Polish text for the document header, summary, competencies, experience bullets, language labels, and technical skill labels. This Polish copy must read like normal professional Polish used in day-to-day hiring and workplace communication, not like a literal sentence-by-sentence translation. The smallest maintainable shape is to keep the current `CvDocument` type and introduce a new accessor such as `getCvDocument(version, locale)` in `src/features/cv/data/cvVersions.ts`, backed by checked-in English and Polish copy modules. Update all CV render entry points, including `src/features/cv/components/CvShowcasePage.tsx`, `src/features/cv/components/CvDocument.tsx`, `src/features/cv/components/cvDocumentContent.tsx`, and `src/features/cv/components/CvPrintDocument.tsx`, so they receive locale and render the correct copy without changing markup structure.

After content is localized, thread locale through link generation and PDF asset generation. Update `src/features/cv/components/showcase/showcaseLinks.ts` so showcase, print, and download URLs retain `lang=pl` when Polish is active. Update `src/features/cv/domain/cvPdfAsset.ts` to add locale to the asset target model and to emit filenames that keep current English names unchanged while appending `-pl` for Polish assets. Then update `src/features/cv/server/renderCvPdf.ts` so print URLs include `lang=pl` when rendering Polish PDFs, and update `scripts/generate-static-cv-pdfs.ts` so it generates Polish assets alongside the existing English set.

Finish by adding tests and documentation. Add unit tests for locale parsing and defaults, route-state resolution, localized asset naming, localized CV document lookup, and localized UI rendering. Extend the PDF end-to-end smoke coverage so at least one A4 Polish asset and one Letter Polish asset are requested from the static export and verified as real PDFs. Update `README.md` so it explains the new `lang=pl` switch, the Polish print route, and the refreshed static PDF generation output. If implementation-specific guidance becomes non-obvious, update `docs/Implementation/README.md` to link this plan and mention the locale-aware asset set.


## Concrete Steps

All commands below run from the repository root: `/home/marcel/src/cv-builder`.

1. Create the locale model and route-state plumbing, then verify the new parsing logic with focused unit tests.

       source ~/.nvm/nvm.sh && npm run test:unit -- tests/unit/cvLocale.test.ts tests/unit/cvRouteState.test.ts

   Expected outcome: tests prove that `lang=pl` resolves to Polish, invalid locale values fall back to English, and existing `paper`, `version`, and `template` behavior remains unchanged.

2. Move website copy and CV content behind locale-aware data accessors, then verify rendering in unit tests.

       source ~/.nvm/nvm.sh && npm run test:unit -- tests/unit/cvVersions.test.ts tests/unit/CvShowcasePage.test.tsx tests/unit/CvDocument.test.tsx tests/unit/CvPrintPage.test.tsx

   Expected outcome: test assertions can find Polish text in both the homepage workspace and the print document when locale is Polish, while existing English assertions still pass.

3. Extend download links, asset naming, and static PDF generation to include Polish assets.

       source ~/.nvm/nvm.sh && npm run test:unit -- tests/unit/cvPdfAsset.test.ts tests/unit/renderCvPdf.test.ts
       source ~/.nvm/nvm.sh && npm run build
       source ~/.nvm/nvm.sh && npm run refresh:static-pdfs

   Expected outcome: the build succeeds, PDF generation writes new Polish files into `public/generated/cv-pdf/` and `out/generated/cv-pdf/`, and filenames for the Polish variant end with `-pl.pdf`.

4. Run end-to-end PDF verification against the exported site.

       source ~/.nvm/nvm.sh && npm run test:e2e

   Expected outcome: the smoke suite verifies the current English assets plus at least one Polish A4 PDF and one Polish Letter PDF, and each checked file begins with the `%PDF` signature.

5. Manually verify the locale switch in the app and print route during local development.

       source ~/.nvm/nvm.sh && npm run dev

   Then open these URLs in a browser:

       http://localhost:3000/
       http://localhost:3000/?lang=pl
       http://localhost:3000/cv/a4
       http://localhost:3000/cv/a4?lang=pl

   Expected outcome: the English routes stay unchanged, the Polish routes show Polish homepage and CV copy, and the Polish print route remains visually aligned with the English layout.


## Validation and Acceptance

The change is complete only when all of the following are true:

- `source ~/.nvm/nvm.sh && npm run lint` passes from `/home/marcel/src/cv-builder`.
- `source ~/.nvm/nvm.sh && npm run test:unit` passes and includes new locale-focused coverage for `cvLocale`, route-state parsing, localized document lookup, localized asset naming, and Polish UI rendering.
- `source ~/.nvm/nvm.sh && npm run build` passes for the static export.
- `source ~/.nvm/nvm.sh && npm run refresh:static-pdfs` completes and creates Polish files such as `public/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo-pl.pdf` and `public/generated/cv-pdf/cv-letter-operations-transformation-two-column-with-photo-pl.pdf`.
- `source ~/.nvm/nvm.sh && npm run test:e2e` passes and verifies that the exported Polish files return HTTP 200, `content-type: application/pdf`, and a `%PDF` file signature.
- Manual browser verification shows English copy on `/` and Polish copy on `/?lang=pl`, with matching print-route behavior on `/cv/a4` and `/cv/a4?lang=pl`.
- Manual content review confirms the Polish homepage and CV text use natural, day-to-day professional Polish phrasing rather than literal English sentence structure or obvious calques.
- Manual download verification confirms that the Polish workspace points to a Polish PDF asset path and that opening the file shows Polish CV content rather than English text under a Polish URL.

Failure signals that mean the implementation is incomplete or wrong include: English-only section labels still appearing under `lang=pl`; the workspace switching to Polish while the print route stays English; generated PDF filenames colliding with existing English filenames; the static export dropping the `lang=pl` state from showcase, print, or download links; or Polish copy that reads like a literal translation instead of natural business Polish.


## Idempotence and Recovery

Adding locale-aware data files and route-state code is safe to repeat because these are ordinary source edits. If route parsing or rendering fails mid-way, rerun the focused unit tests first instead of rebuilding the entire site; the most important early recovery commands are `npm run test:unit -- tests/unit/cvLocale.test.ts tests/unit/cvRouteState.test.ts` and `npm run test:unit -- tests/unit/CvShowcasePage.test.tsx tests/unit/CvDocument.test.tsx`.

`npm run build` and `npm run test:e2e` are safe to rerun. `npm run refresh:static-pdfs` is intentionally destructive only to the generated PDF directories because `scripts/generate-static-cv-pdfs.ts` recreates `public/generated/cv-pdf/` and `out/generated/cv-pdf/` before writing fresh output. If Polish assets are only partially generated, rerun `source ~/.nvm/nvm.sh && npm run refresh:static-pdfs` after fixing the locale bug instead of trying to repair files manually.

If the locale rollout introduces regression risk, keep the implementation recoverable by landing it in this order: typed locale model first, then data extraction, then rendering, then asset generation, then docs. That sequence makes it possible to stop after each milestone with the repository in a testable state.


## Artifacts and Notes

Representative URLs after implementation:

- English homepage: `/`
- Polish homepage: `/?lang=pl`
- English print route: `/cv/a4`
- Polish print route: `/cv/a4?lang=pl`
- English default PDF asset: `/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo.pdf`
- Polish default PDF asset: `/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo-pl.pdf`

Representative repository outputs after implementation:

    public/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo.pdf
    public/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo-pl.pdf
    out/generated/cv-pdf/cv-letter-operations-transformation-two-column-with-photo-pl.pdf

Representative acceptance evidence from the browser:

    http://localhost:3000/?lang=pl
    -> homepage hero, workspace metadata, section navigation, and CV body text are rendered in Polish

    http://localhost:3000/cv/a4?lang=pl
    -> print route shows the same Polish CV content without switching layout or paper styling


## Interfaces and Dependencies

The implementation should end with these explicit interfaces and contracts in place:

- `src/features/cv/domain/cvLocale.ts`
  Must export the closed locale union, default locale, parser, and any locale metadata needed by the UI.

- `src/features/cv/domain/cvRouteState.ts`
  Must extend `CvShowcaseRouteState` and `CvPrintRouteState` to include locale, and `resolveCvShowcaseRouteState()` plus `resolveCvPrintRouteState()` must parse `lang`.

- `src/features/cv/data/cvVersionMetadata.ts`
  Must provide locale-aware recruiter-facing metadata for every `CvVersion`.

- `src/features/cv/data/cvSectionLabels.ts`
  Must provide locale-aware section labels for every `CvSectionKey`.

- `src/features/cv/data/cvVersions.ts`
  Must expose a locale-aware CV document accessor, preferably `getCvDocument(version, locale)`, with checked-in English and Polish content.

- `src/features/cv/components/showcase/showcaseLinks.ts`
  Must preserve `lang=pl` in showcase and print URLs and must return a Polish asset path when locale is Polish.

- `src/features/cv/domain/cvPdfAsset.ts`
  Must add locale to `CvPdfAssetTarget`, enumerate Polish static targets, and generate filenames that distinguish Polish assets from English assets.

- `src/features/cv/server/renderCvPdf.ts`
  Must accept locale, include it in the print-route URL, and keep the current Playwright PDF readiness contract intact.

- `scripts/generate-static-cv-pdfs.ts`
  Must generate both English and Polish PDF asset copies for every supported target combination defined by the asset model.

- `tests/unit/cvLocale.test.ts`
  Must verify locale parsing and fallback behavior.

- `tests/unit/cvRouteState.test.ts`
  Must verify that `lang`, `paper`, `version`, and `template` resolve together without regressions.

- `tests/e2e/cv-pdf.spec.ts`
  Must verify that selected Polish static assets are served as real PDFs from the exported site.

- `README.md`
  Must document the `lang=pl` switch, the Polish print route, and the regenerated static PDF asset workflow.


Changed on 2026-03-16 by Codex: marked the Polish-language implementation complete, updated the progress/outcome sections, and recorded the final locale-routing and PDF-asset discoveries after verification.
