export const projectOverview = {
  completedFoundations: [
    "Starter landing page replaced with a controlled project shell",
    "Root font configured once through next/font CSS variables",
    "Global CSS reduced to global-only concerns",
    "Initial CV feature folders and token modules created",
    "Typed CV domain model and static sample profile added",
    "Shared printable CV document rendered on the landing page",
  ],
  featureFolders: [
    "src/features/cv/components",
    "src/features/cv/config",
    "src/features/cv/data",
    "src/features/cv/domain",
    "src/features/cv/server",
  ],
  nextDeliverables: [
    "Dedicated A4 and Letter print route",
    "Preview shell controls for paper switching",
    "Playwright-backed PDF export",
    "Route and export coverage for the print and PDF flow",
  ],
  referenceDocs: [
    "docs/project_description.md",
    "docs/cv/02_layout_and_document_system.md",
    "docs/cv/03_typography_color_photo_header.md",
    "docs/cv/04_content_structure_and_copy.md",
    "docs/cv/05_ats_market_and_delivery.md",
    "docs/cv_templates/single_column_without_photo",
    "docs/Implementation/Phase0_Foundation_Freeze_Decisions.md",
  ],
} as const;
