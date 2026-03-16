import type { CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";

export const cvVersions = [
  "ai-adoption-manager",
  "ats-friendly-general",
  "leadership-stakeholder",
  "operations-transformation",
] as const;

export type CvVersion = (typeof cvVersions)[number];

type CvVersionMetadata = {
  readonly defaultTemplate: CvTemplateVariant;
};

export const defaultCvVersion = "ai-adoption-manager";

export const cvVersionMetadata: Readonly<Record<CvVersion, CvVersionMetadata>> = {
  "ai-adoption-manager": {
    defaultTemplate: "single-column-with-photo",
  },
  "ats-friendly-general": {
    defaultTemplate: "single-column-with-photo",
  },
  "leadership-stakeholder": {
    defaultTemplate: "two-column-with-photo",
  },
  "operations-transformation": {
    defaultTemplate: "two-column-with-photo",
  },
};

export function isCvVersion(value: string): value is CvVersion {
  return cvVersions.includes(value as CvVersion);
}

export function parseCvVersion(value: string): CvVersion | null {
  return isCvVersion(value) ? value : null;
}

export function resolveCvVersion(
  value: string | readonly string[] | undefined,
): CvVersion {
  const candidate =
    typeof value === "string"
      ? value
      : Array.isArray(value) && value.length === 1
        ? value[0]
        : undefined;

  return candidate
    ? (parseCvVersion(candidate) ?? defaultCvVersion)
    : defaultCvVersion;
}
