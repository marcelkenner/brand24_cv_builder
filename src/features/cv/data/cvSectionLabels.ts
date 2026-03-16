import type { CvLocale } from "@/features/cv/domain/cvLocale";
import type { CvSectionKey } from "@/features/cv/domain/cvDocument";

const cvSectionLabelsByLocale: Readonly<
  Record<CvLocale, Record<CvSectionKey, string>>
> = {
  en: {
    certifications: "Certifications",
    competencies: "Core competencies",
    education: "Education",
    experience: "Professional experience",
    languages: "Languages",
    summary: "Professional summary",
    technicalSkills: "Technical skills",
  },
  pl: {
    certifications: "Certyfikaty",
    competencies: "Kluczowe kompetencje",
    education: "Wykształcenie",
    experience: "Doświadczenie zawodowe",
    languages: "Języki",
    summary: "Podsumowanie zawodowe",
    technicalSkills: "Umiejętności techniczne",
  },
};

export function getCvSectionLabels(locale: CvLocale) {
  return cvSectionLabelsByLocale[locale];
}

export function getCvSectionLabel(locale: CvLocale, sectionKey: CvSectionKey) {
  return cvSectionLabelsByLocale[locale][sectionKey];
}
