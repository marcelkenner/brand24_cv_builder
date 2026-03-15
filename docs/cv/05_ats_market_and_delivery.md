# ATS, Market Variants, And Delivery

This document expands `docs/project_description.md` sections 18, 25, 26, and 30.

## ATS Rules

The designed CV should stay ATS-conscious, and the ATS-friendly version should remain simpler still.

Must do:

- use real text
- keep reading order logical
- use conventional section headings
- use simple bullet characters
- keep links clickable
- avoid unnecessary layout complexity in the ATS variant

Must not do in the ATS variant:

- no tables for main content
- no charts
- no icons replacing labels
- no image-only text
- no critical information hidden in headers or footers

The designed PDF and ATS-friendly version must contain the same underlying content, even if formatting differs.

## Market Variants

Prepare at least:

- a photo version for markets where photos are accepted
- a no-photo version for UK, US, or ATS-sensitive usage

The no-photo version is not a fallback afterthought. It is a first-class variant and should look intentional.

## Privacy And Compliance

Do not include the following unless the target market clearly requires them:

- date of birth
- marital status
- nationality
- full home address
- national ID numbers
- gender

If this information appears in source material, omit it by default.

## Final Quality-Control Checklist

Before approving a final version, confirm:

- the name is the strongest visual element
- the photo does not overpower the page
- hierarchy scans instantly
- section headings are fully consistent
- dates use one format
- punctuation style is consistent
- bullet alignment is consistent
- line breaks are intentional
- accent usage is restrained
- margins are even
- spacing follows a system
- widows and orphans are controlled where possible
- PDF links are clickable
- the ATS version has no layout traps
- spelling, capitalization, and tense are consistent
- the result feels premium, modern, formal, and credible

## Required Deliverables

The final package must include:

- designed CV with photo
- designed CV without photo
- ATS-friendly Word version
- export-ready PDF files
- editable source file
- reusable typography, color, and spacing styles

## App-Specific Delivery Notes

For the current app scope:

- the showcase should expose typed recruiter-facing CV versions against one verified source CV
- the no-photo path should remain a first-class variant, not a fallback export
- ATS export requirements should influence content structure, not flatten the designed browser/PDF preview

Current implementation status in this repository:

- the Marcel Kenner source CV now drives four recruiter-facing versions:
  - `ai-adoption-manager`
  - `ats-friendly-general`
  - `leadership-stakeholder`
  - `operations-transformation`
- each version resolves to a default template, but preview, print, and PDF export still accept an explicit template override
- the ATS-friendly version defaults to the photo single-column template and reorders content for a simpler scan path
- the leadership / stakeholder version defaults to the photo two-column template and reweights copy toward alignment and enablement
- the operations / transformation version defaults to the photo two-column template and reweights copy toward workflow improvement and service delivery

If ATS support is implemented later, keep it as a parallel output path rather than compromising the designed version’s visual system.
