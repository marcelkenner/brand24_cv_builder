import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";

const colors = {
  accent: "#8A1538",
  appBackground: "#F4EEE9",
  rule: "#E1E4E8",
  surface: "#FFFFFF",
  text: "#222222",
  textMuted: "#555555",
} as const;

const spacing = {
  major: "24px",
  medium: "16px",
  micro: "4px",
  standard: "8px",
} as const;

const typography = {
  bodySize: "10pt",
  headingSize: "10.5pt",
  metadataSize: "8.75pt",
  nameSize: "26pt",
  titleSize: "11pt",
} as const;

const paperFrames: Readonly<
  Record<CvPaperVariant, { readonly height: string; readonly width: string }>
> = {
  a4: {
    height: "297mm",
    width: "210mm",
  },
  letter: {
    height: "11in",
    width: "8.5in",
  },
};

const paperLayouts: Readonly<
  Record<
    CvPaperVariant,
    {
      readonly entryGap: string;
      readonly margins: {
        readonly bottom: string;
        readonly left: string;
        readonly right: string;
        readonly top: string;
      };
      readonly ruleGapBottom: string;
      readonly ruleGapTop: string;
      readonly sectionGap: string;
    }
  >
> = {
  a4: {
    entryGap: "12pt",
    margins: {
      bottom: "16mm",
      left: "18mm",
      right: "18mm",
      top: "16mm",
    },
    ruleGapBottom: "16pt",
    ruleGapTop: "12pt",
    sectionGap: "16px",
  },
  letter: {
    entryGap: "8pt",
    margins: {
      bottom: "14mm",
      left: "18mm",
      right: "18mm",
      top: "14mm",
    },
    ruleGapBottom: "12pt",
    ruleGapTop: "8pt",
    sectionGap: "12px",
  },
};

export const cvDesignTokens = {
  colors,
  margins: paperLayouts.a4.margins,
  paperFrames,
  paperLayouts,
  spacing,
  typography,
} as const;

export const cvRootVariables = {
  "--cv-color-accent": colors.accent,
  "--cv-color-app-background": colors.appBackground,
  "--cv-color-muted": colors.textMuted,
  "--cv-color-rule": colors.rule,
  "--cv-color-surface": colors.surface,
  "--cv-color-text": colors.text,
} as const;
