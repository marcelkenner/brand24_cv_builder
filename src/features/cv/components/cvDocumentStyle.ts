import type { CSSProperties } from "react";

import { cvDesignTokens } from "@/features/cv/config/designTokens";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";

type CvDocumentStyle = CSSProperties & {
  readonly "--cv-document-body-size": string;
  readonly "--cv-document-entry-gap": string;
  readonly "--cv-document-heading-size": string;
  readonly "--cv-document-height": string;
  readonly "--cv-document-margin-bottom": string;
  readonly "--cv-document-margin-left": string;
  readonly "--cv-document-margin-right": string;
  readonly "--cv-document-margin-top": string;
  readonly "--cv-document-metadata-size": string;
  readonly "--cv-document-name-size": string;
  readonly "--cv-document-rule-margin-bottom": string;
  readonly "--cv-document-rule-margin-top": string;
  readonly "--cv-document-section-gap": string;
  readonly "--cv-document-spacing-major": string;
  readonly "--cv-document-spacing-medium": string;
  readonly "--cv-document-spacing-micro": string;
  readonly "--cv-document-spacing-standard": string;
  readonly "--cv-document-title-size": string;
  readonly "--cv-document-width": string;
};

export function getDocumentStyle(paper: CvPaperVariant): CvDocumentStyle {
  const frame = cvDesignTokens.paperFrames[paper];
  const layout = cvDesignTokens.paperLayouts[paper];

  return {
    "--cv-document-body-size": cvDesignTokens.typography.bodySize,
    "--cv-document-entry-gap": layout.entryGap,
    "--cv-document-heading-size": cvDesignTokens.typography.headingSize,
    "--cv-document-height": frame.height,
    "--cv-document-margin-bottom": layout.margins.bottom,
    "--cv-document-margin-left": layout.margins.left,
    "--cv-document-margin-right": layout.margins.right,
    "--cv-document-margin-top": layout.margins.top,
    "--cv-document-metadata-size": cvDesignTokens.typography.metadataSize,
    "--cv-document-name-size": cvDesignTokens.typography.nameSize,
    "--cv-document-rule-margin-bottom": layout.ruleGapBottom,
    "--cv-document-rule-margin-top": layout.ruleGapTop,
    "--cv-document-section-gap": layout.sectionGap,
    "--cv-document-spacing-major": cvDesignTokens.spacing.major,
    "--cv-document-spacing-medium": cvDesignTokens.spacing.medium,
    "--cv-document-spacing-micro": cvDesignTokens.spacing.micro,
    "--cv-document-spacing-standard": cvDesignTokens.spacing.standard,
    "--cv-document-title-size": cvDesignTokens.typography.titleSize,
    "--cv-document-width": frame.width,
  };
}
