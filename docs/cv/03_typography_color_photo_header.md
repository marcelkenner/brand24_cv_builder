# Typography, Color, Photo, And Header

This document expands `docs/project_description.md` sections 5, 6, 7, 8, and 21.

## Color System

Use a restrained corporate palette with one accent color only.

Preferred palette:

- primary text: `#1F2328` or `#222222`
- secondary text: `#4A4F57` or `#555555`
- muted metadata: `#6B7280` or `#70757D`
- dividers: `#D9DDE3` or `#E1E4E8`
- background: `#FFFFFF`
- preferred accent: `#8A1538`
- softer burgundy alternative: `#7A1F3D`
- safe navy fallback: `#1F3A5F`

Target color distribution:

- 85 to 90 percent neutrals
- 10 to 15 percent accent

Accent is allowed for:

- section headings
- subtle dividers
- a small name rule
- links
- a few selected labels

Accent is not allowed for:

- large fills
- body text
- heavy borders
- decorative effects
- repeated icon treatments

## Typography Direction

The typography should feel:

- sharp
- modern
- highly legible
- professional
- premium without luxury styling

Preferred font stacks:

1. Inter for headings and body
2. Aptos Display plus Aptos or Calibri
3. Source Sans 3 for a slightly more editorial tone

Font rules:

- use at most two families
- prefer one family with multiple weights
- avoid serif unless it remains highly restrained
- never use script or novelty display fonts

## Type Scale

Safe default hierarchy:

- name: 26 pt
- professional title line: 11 pt
- section headings: 10.5 pt
- company or role line: 10.5 pt
- body: 10 pt
- metadata: 8.75 pt
- footer or page number if needed: 8 pt

Leading:

- body copy: 1.3 to 1.45
- dense bullets may tighten slightly, but must not feel cramped

Emphasis:

- bold only for the name, one of role or company, and rare critical metrics
- italics only for genuinely secondary context
- keep emphasis sparse so hierarchy stays clean

## Headshot Rules

Use a photo only when the target market or workflow supports it. The default product direction should be able to produce:

- a photo version
- a no-photo version

If a photo is used:

- place it top right
- keep it aligned with the name block
- use a rectangular portrait crop
- show head and upper shoulders
- preserve the clean background
- keep the width around 32 mm
- avoid circular crops, filters, shadows, frames, or strong borders

The photo should support the brand impression, not dominate the page.

## Header Design

The header must contain:

- full name
- professional title or target headline
- city and country, or city only
- phone
- email
- LinkedIn
- portfolio or website when relevant
- optional photo

Header hierarchy:

1. full name
2. professional title
3. contact line
4. photo within the same top band when present

Styling rules:

- the name is the strongest visual element
- the title line is concise and role-specific
- contact items should fit on one line when possible
- links must remain clickable in the digital PDF
- the header needs generous breathing room below it

## Icon Rules

Icons are optional and should be minimal.

Allowed:

- email
- phone
- LinkedIn
- website
- location

If used:

- use small simple line icons
- use one consistent style
- keep them neutral or accent-only

Do not use:

- icons in bullets
- icons in headings
- mixed icon sets

## Implementation Guardrails

For browser and PDF rendering:

- keep all typography tokens explicit and reusable
- avoid dark mode overrides for the document itself
- ensure the no-photo version does not leave an empty reserved block
- keep contact links semantic so digital PDFs preserve click targets
