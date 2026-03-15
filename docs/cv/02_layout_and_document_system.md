# Layout And Document System

This document expands `docs/project_description.md` sections 3, 4, 19, 20, and 28.

## Format Requirements

Required page variants:

- A4 portrait is the master layout.
- US Letter portrait is a separate adaptation.

The Letter version must be adjusted intentionally. Do not auto-scale the A4 version and accept whatever line breaks happen. The two versions should share the same visual system, but line wrapping and section breaks may differ.

## Page Count Rules

- Target one page when the candidate’s experience supports it.
- Allow two pages when needed for credible content.
- Never reduce typography or spacing just to force one page.
- If a second page exists, it must feel designed rather than like overflow.

## Output Expectations

The brief requires:

- an editable source layout
- a shareable PDF
- an ATS-friendly Word version with the same hierarchy and content

For the app implementation, the main on-screen and PDF showcase should reflect the designed version first. The ATS-friendly version remains a separate deliverable and should not lower the quality of the designed version.

## Layout Architecture

Default layout:

- single-column

Reason:

- most executive visual tone
- strongest readability
- lowest ATS risk
- best fit for a formal headshot

Two-column is acceptable only as a restrained exception. If used later, keep the left column narrow, the right column dominant, and avoid any dark or heavy sidebar treatment.

## Page Geometry

Recommended A4 margins:

- top: 16 mm
- bottom: 16 mm
- left: 18 mm
- right: 18 mm

Acceptable margin range from the brief:

- top and bottom: 14 mm to 18 mm
- left and right: 16 mm to 20 mm

Use explicit dimensions in CSS and print settings. Do not rely on approximate visual spacing alone.

## Spacing System

Use a strict spacing scale:

- 4 pt for micro spacing
- 8 pt for standard spacing
- 12 pt for medium spacing
- 16 pt for section spacing
- 24 pt for major separation

Nothing on the page should be spaced “by eye” if it can be derived from this system.

## Density Rules

The page should feel efficient and premium. It must not look sparse, and it must not look packed.

Reject layouts that create:

- orphan headings at the bottom of a page
- single stranded bullets on the next page
- long text walls
- large empty regions caused by photo placement
- inconsistent left edges
- irregular baseline rhythm

At 50% zoom, the document should still look balanced and easy to scan within a few seconds.

## Divider Rules

Dividers are allowed only when subtle.

Use:

- 0.5 pt to 1 pt horizontal rules
- neutral grey or restrained accent color

Appropriate uses:

- below the header
- between major sections when the page needs separation

Do not use:

- thick rules
- boxed sections
- many stacked dividers

## Default Build Specification

Unless another document overrides it for a specific implementation reason, use these defaults:

- Format: A4 portrait
- Layout: single-column
- Margins: 16 mm top and bottom, 18 mm left and right
- Font family: Inter
- Name: 26 pt, SemiBold
- Body: 10 pt, Regular
- Metadata: 8.75 pt
- Section headings: 10.5 pt, SemiBold, burgundy
- Colors: text `#222222`, secondary `#555555`, rules `#E1E4E8`, accent `#8A1538`
- Dividers: thin 0.75 pt rules only where needed
- Header photo: top right, 32 mm wide, rectangular, no border or at most a 0.5 pt neutral hairline
- Contact line: single row with separators
- Summary length: 60 to 80 words
- Competencies: 10 to 12 items, no ratings
- Experience bullets: 3 to 6 per recent role, quantified when possible
- Education: concise
- ATS variant: no photo, simplified single-column Word format

## Implementation Implications

For the app:

- A4 and Letter should be explicit document modes.
- Each mode should have its own paper settings and its own final layout review.
- Preview and PDF should use the same internal layout system.
- Screen chrome may differ, but the document box itself should not silently change between preview and export.
