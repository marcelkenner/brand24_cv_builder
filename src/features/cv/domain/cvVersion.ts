import type { CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";

export const cvVersions = [
  "ai-adoption-manager",
  "ats-friendly-general",
  "leadership-stakeholder",
  "operations-transformation",
] as const;

export type CvVersion = (typeof cvVersions)[number];

type CvVersionMetadata = {
  readonly bestUseCase: string;
  readonly defaultTemplate: CvTemplateVariant;
  readonly difference: string;
  readonly language: string;
  readonly recruiterTitle: string;
  readonly targetRole: string;
};

export const defaultCvVersion = "ai-adoption-manager";

export const cvVersionMetadata: Readonly<Record<CvVersion, CvVersionMetadata>> = {
  "ai-adoption-manager": {
    bestUseCase:
      "Default recruiter download for AI Adoption Manager and AI enablement applications.",
    defaultTemplate: "single-column-with-photo",
    difference:
      "The clearest leadership-facing framing, with the strongest narrative for adoption, enablement, and stakeholder communication.",
    language: "English",
    recruiterTitle: "AI Adoption Manager",
    targetRole: "AI adoption leadership and enablement roles",
  },
  "ats-friendly-general": {
    bestUseCase:
      "International ATS submission where parsing simplicity matters more than visual presence.",
    defaultTemplate: "single-column-with-photo",
    difference:
      "Uses the simplest reading flow while keeping the copy focused on broadly applicable analysis and delivery language.",
    language: "English",
    recruiterTitle: "ATS-Friendly General",
    targetRole: "ATS-sensitive analysis, delivery, and platform roles",
  },
  "leadership-stakeholder": {
    bestUseCase:
      "Leadership and stakeholder review where scan speed matters but seniority should stay visible.",
    defaultTemplate: "two-column-with-photo",
    difference:
      "Reweights the profile toward alignment, enablement, stakeholder communication, and cross-functional delivery leadership.",
    language: "English",
    recruiterTitle: "Leadership / Stakeholder Version",
    targetRole: "Transformation, AI delivery, and stakeholder-heavy shortlist review",
  },
  "operations-transformation": {
    bestUseCase:
      "Operational and transformation screening where concise comparison across candidates matters most.",
    defaultTemplate: "two-column-with-photo",
    difference:
      "Reframes the same experience around process improvement, service delivery, documentation discipline, and operational change.",
    language: "English",
    recruiterTitle: "Operations / Transformation Version",
    targetRole: "Operations, process improvement, and transformation-focused applications",
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
