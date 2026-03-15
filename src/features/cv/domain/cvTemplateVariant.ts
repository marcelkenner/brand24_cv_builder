export const cvTemplateVariants = [
  "single-column-with-photo",
  "single-column-without-photo",
  "two-column-with-photo",
  "two-column-without-photo",
] as const;

export type CvTemplateVariant = (typeof cvTemplateVariants)[number];
export type CvTemplateLayout = "single-column" | "two-column";

type CvTemplateMetadata = {
  readonly description: string;
  readonly label: string;
  readonly layout: CvTemplateLayout;
  readonly usesPhoto: boolean;
};

export const defaultCvTemplateVariant = "single-column-with-photo";

export const cvTemplateMetadata: Readonly<
  Record<CvTemplateVariant, CvTemplateMetadata>
> = {
  "single-column-with-photo": {
    description: "Primary single-column flow with Marcel's headshot in the header.",
    label: "Single column with photo",
    layout: "single-column",
    usesPhoto: true,
  },
  "single-column-without-photo": {
    description: "Single-column ATS-safe layout with the same Marcel content and no photo.",
    label: "Single column without photo",
    layout: "single-column",
    usesPhoto: false,
  },
  "two-column-with-photo": {
    description: "Restrained two-column layout with Marcel's headshot in the header band.",
    label: "Two column with photo",
    layout: "two-column",
    usesPhoto: true,
  },
  "two-column-without-photo": {
    description: "Restrained two-column layout with the same Marcel content and no photo.",
    label: "Two column without photo",
    layout: "two-column",
    usesPhoto: false,
  },
};

export function isCvTemplateVariant(value: string): value is CvTemplateVariant {
  return cvTemplateVariants.includes(value as CvTemplateVariant);
}

export function parseCvTemplateVariant(value: string): CvTemplateVariant | null {
  return isCvTemplateVariant(value) ? value : null;
}

export function resolveCvTemplateVariant(
  value: string | readonly string[] | undefined,
  fallbackTemplate: CvTemplateVariant = defaultCvTemplateVariant,
): CvTemplateVariant {
  const candidate =
    typeof value === "string"
      ? value
      : Array.isArray(value) && value.length === 1
        ? value[0]
        : undefined;

  return candidate ? (parseCvTemplateVariant(candidate) ?? fallbackTemplate) : fallbackTemplate;
}
