export const cvPaperVariants = ["a4", "letter"] as const;

export type CvPaperVariant = (typeof cvPaperVariants)[number];

type CvPaperMetadata = {
  readonly dimensions: string;
  readonly label: string;
};

export const cvPaperMetadata: Readonly<
  Record<CvPaperVariant, CvPaperMetadata>
> = {
  a4: {
    dimensions: "210 x 297 mm",
    label: "A4 Portrait",
  },
  letter: {
    dimensions: "8.5 x 11 in",
    label: "US Letter Portrait",
  },
};

export function isCvPaperVariant(value: string): value is CvPaperVariant {
  return value === "a4" || value === "letter";
}

export function parseCvPaperVariant(value: string): CvPaperVariant | null {
  return isCvPaperVariant(value) ? value : null;
}

export function resolveCvPaperVariant(
  value: string | readonly string[] | undefined,
): CvPaperVariant {
  const candidate =
    typeof value === "string"
      ? value
      : Array.isArray(value) && value.length === 1
        ? value[0]
        : undefined;

  return candidate ? (parseCvPaperVariant(candidate) ?? "a4") : "a4";
}
