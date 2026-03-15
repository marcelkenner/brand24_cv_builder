# CV Documentation Set

This folder breaks `docs/project_description.md` into focused working documents. The original brief remains the source specification. These files exist to make implementation, review, and content preparation easier without changing the brief’s intent.

Use this folder as follows:

- Read [`docs/project_description.md`](../project_description.md) first for the full source brief.
- Use this folder when a narrower topic needs direct decisions, review, or implementation guidance.
- Keep these files aligned with the source brief. If one file changes a rule, update the source brief or remove the drift.

Documentation map:

- [`01_brand_and_visual_direction.md`](./01_brand_and_visual_direction.md)
  Covers objective, role positioning, visual personality, explicit anti-patterns, and the one-sentence creative direction.
- [`02_layout_and_document_system.md`](./02_layout_and_document_system.md)
  Covers document format, page architecture, spacing, density, divider rules, and the default build specification.
- [`03_typography_color_photo_header.md`](./03_typography_color_photo_header.md)
  Covers color, typography, headshot treatment, header design, and icon rules.
- [`04_content_structure_and_copy.md`](./04_content_structure_and_copy.md)
  Covers section order, writing rules, content requirements, prioritization, and copywriting guidance.
- [`05_ats_market_and_delivery.md`](./05_ats_market_and_delivery.md)
  Covers ATS constraints, market variants, privacy rules, quality control, and final deliverables.
- [`06_web_to_pdf_implementation_notes.md`](./06_web_to_pdf_implementation_notes.md)
  Translates the brief into concrete Next.js and Playwright implementation guardrails for the HTML/CSS-first PDF app.

Section coverage from the source brief:

- Sections 1, 2, 27 map to `01_brand_and_visual_direction.md`.
- Sections 3, 4, 19, 20, 28 map to `02_layout_and_document_system.md`.
- Sections 5, 6, 7, 8, 21 map to `03_typography_color_photo_header.md`.
- Sections 9 through 17, 22 through 24, and 29 map to `04_content_structure_and_copy.md`.
- Sections 18, 25, 26, and 30 map to `05_ats_market_and_delivery.md`.
- The implementation-facing translation of the brief lives in `06_web_to_pdf_implementation_notes.md`.
- Section 31 remains in `docs/project_description.md` as the source specification for homepage product positioning, dual-mode narrative, and the ASCII homepage wireframe until the app-shell docs are split further.
