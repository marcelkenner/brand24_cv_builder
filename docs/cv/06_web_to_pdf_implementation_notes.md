# Web To PDF Implementation Notes

This document translates `docs/project_description.md` into implementation guardrails for the Next.js and Playwright app. It also incorporates current framework guidance confirmed on 2026-03-13 through Context7 for Next.js 16.1.6 and Playwright 1.58.2.

## Purpose

The product goal is not “generate some PDF.” It is to render one controlled HTML/CSS CV document in the browser and export that same document to PDF with minimal layout drift.

That means:

- one shared document markup path
- explicit typography tokens
- explicit paper sizes
- explicit print behavior
- explicit validation between preview and export

## Route And Rendering Model

Prefer this separation:

- a showcase route for the browser preview
- a print-target route that renders only the CV document for a selected paper size
- a Playwright helper and maintenance script that open the print-target route in headless Chromium and write stable static PDF assets for deployment

Current implementation status on 2026-03-15:

- `src/features/cv/server/renderCvPdf.ts` owns Chromium launch and PDF generation
- `scripts/generate-static-cv-pdfs.ts` serves `out/` locally and writes the generated PDFs into `public/generated/cv-pdf/`
- `next.config.ts` uses `output: "export"` so the production deployment stays compatible with Cloudflare Pages static hosting

The shared CV document component should be used by both preview and print routes. Do not maintain separate markup trees for preview and PDF unless a proven browser limitation forces it.

## Typography Setup

Next.js guidance confirmed through Context7 supports defining fonts with `next/font` in the App Router layout and exposing them via CSS variables on the root HTML element. Use that pattern so the same type system applies consistently across preview routes and print routes.

Practical rule:

- define the chosen font family once in `src/app/layout.tsx`
- expose it through CSS variables
- bind the document styles to those variables

This keeps font loading centralized and avoids route-specific drift.

## Print CSS Rules

Playwright’s `page.pdf()` uses print CSS by default. Build the document with print in mind first, then add only minimal screen chrome around it in the showcase page.

Recommended print rules:

- keep the internal document background white
- set page-specific dimensions and margins explicitly
- avoid dark mode logic for the document
- keep section spacing and line lengths token-based
- keep large wrappers splittable in print; reserve `break-inside: avoid` for atomic rows or entries
- prefer normal block flow in print over grid or flex wrappers that span the whole document
- use `-webkit-print-color-adjust: exact` on the printable document so subtle accent and rule colors survive export

Do not depend on browser defaults for print margins or color handling.

## PDF Export Rules

Context7-confirmed Playwright behavior relevant to this app:

- `page.pdf()` defaults to print media
- `printBackground` is off by default, so it must be enabled for styled rules and fills
- `format` defaults to `Letter`, so A4 must be requested explicitly
- `format` accepts exact named paper values such as `A4` and `Letter`

Implementation guardrails:

- always call `page.pdf()` with an explicit format
- always set `printBackground: true`
- emulate `print` media explicitly before export
- wait for an explicit print-route readiness marker after both font loading and any client-side pagination adjustments complete
- set `preferCSSPageSize: true` and zero PDF margins so the route CSS owns the printable frame
- only use `page.emulateMedia({ media: "screen" })` if there is a deliberate reason to export screen CSS instead of print CSS
- validate supported paper sizes before launching Chromium

## Paper Variants

The brief requires:

- A4 portrait
- US Letter portrait

These are separate layout targets, not one layout with implicit scaling. The app should model paper size as an explicit variant in types and routing. The layout should allow line breaks or page flow to differ between the two paper sizes when needed.

Implementation note after Phase 6 on 2026-03-13:

- keep the shared markup identical between A4 and Letter
- express paper refinement through explicit per-paper layout tokens
- for the current sample document, Letter uses tighter top and bottom margins plus reduced section and entry gaps so the shorter page height is handled intentionally rather than by browser scaling

## Design Tokens To Preserve

Carry these brief values into implementation tokens:

- margins: 16 mm top and bottom, 18 mm left and right
- accent: burgundy `#8A1538`
- primary text: `#222222`
- rule color: `#E1E4E8`
- body size: 10 pt
- metadata size: 8.75 pt
- section heading size: 10.5 pt
- spacing scale derived from 4, 8, 12, 16, and 24 pt

If a token changes, document why. Do not silently drift away from the brief.

## Preview Rules

The preview page may add:

- neutral app background
- centering
- paper-size switcher
- download controls

The preview page should not:

- alter the internal document’s spacing system
- introduce display-only typography
- apply decorative cards, shadows, or gradients to the document itself

The screen shell may differ. The printable document should not.

## Validation Rules

Before accepting the implementation:

- compare the browser preview and exported PDF for both A4 and Letter
- verify that contact row wrapping stays intentional
- verify that section breaks and divider placement stay stable
- verify that fonts load before export
- verify that the no-photo path collapses cleanly without header gaps

Use screenshots and actual downloaded PDFs during review. Compilation alone is not evidence.

Phase 10 verification on 2026-03-13 confirmed:

- `/cv/a4` and the generated `cv-a4-*.pdf` exports stay visually aligned on page 1, and the export continues cleanly onto page 2 without forcing the whole `Education` section to move as one block
- `/cv/letter` and the generated `cv-letter-*.pdf` exports keep the same stable first-page structure, but the shorter paper height still causes page 2 to begin at `Education`
- accent color, divider lines, contact row wrapping, and the no-photo header collapse survive export without obvious drift

Pagination refinement on 2026-03-14 changed two implementation guardrails:

- `src/features/cv/components/CvDocument.module.css` now leaves whole sections splittable in print and only protects atomic entries plus skill rows
- `Technical skills` now renders as fixed label/value rows instead of inline text so export spacing does not depend on adjacent text nodes
- print-route measurements on 2026-03-14 show that A4 now keeps the first education entry on page 1, while Letter still starts page 2 at `Education` because the remaining page-1 space cannot fit the heading plus first education row

Measured pagination refinement after that added a print-route controller:

- `src/features/cv/components/CvPrintDocument.tsx` now waits for fonts, measures each rendered section and its printable subsection units, and applies a page layout plan before the route is marked ready
- `src/features/cv/components/printPagination.ts` now plans pagination from section headings plus subsection units instead of whole-section rectangles
- `src/features/cv/components/CvDocument.module.css` uses both section-level and unit-level break markers to force page breaks, reintroduce top gutter, and show repeated continuation headings where a section carries onto the next page
- `src/features/cv/server/renderCvPdf.ts` already waits on the print-ready marker, so the PDF export now naturally waits for this measured pagination pass before calling `page.pdf()`

Current role-specific rule:

- `Professional experience` now uses one printable unit per role, not one per bullet
- if a role does not fit in the remaining page space, the planner moves the whole role to the next page and repeats the section heading there

## Documentation Rules During Build

When implementation begins:

- keep [`docs/Implementation/ExecPlan_CV_PDF_Showcase_App.md`](../Implementation/ExecPlan_CV_PDF_Showcase_App.md) aligned with reality
- update this file if implementation discovers a browser or print constraint that materially changes the approach
- keep `docs/project_description.md` as the source design brief, and use this file as the technical translation layer rather than rewriting the brief itself
