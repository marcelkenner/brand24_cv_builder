import type { CvLocale } from "@/features/cv/domain/cvLocale";
import { cvVersions, type CvVersion } from "@/features/cv/domain/cvVersion";

type CvVersionContent = {
  readonly bestUseCase: string;
  readonly difference: string;
  readonly language: string;
  readonly recruiterTitle: string;
  readonly targetRole: string;
};

const cvVersionContentByLocale: Readonly<
  Record<CvLocale, Record<CvVersion, CvVersionContent>>
> = {
  en: {
    "ai-adoption-manager": {
      bestUseCase:
        "Default recruiter download for AI Adoption Manager and AI enablement applications.",
      difference:
        "The clearest leadership-facing framing, with the strongest narrative for adoption, enablement, and stakeholder communication.",
      language: "English",
      recruiterTitle: "AI Adoption Manager",
      targetRole: "AI adoption leadership and enablement roles",
    },
    "ats-friendly-general": {
      bestUseCase:
        "International ATS submission where parsing simplicity matters more than visual presence.",
      difference:
        "Uses the simplest reading flow while keeping the copy focused on broadly applicable analysis and delivery language.",
      language: "English",
      recruiterTitle: "ATS-Friendly General",
      targetRole: "ATS-sensitive analysis, delivery, and platform roles",
    },
    "leadership-stakeholder": {
      bestUseCase:
        "Leadership and stakeholder review where scan speed matters but seniority should stay visible.",
      difference:
        "Reweights the profile toward alignment, enablement, stakeholder communication, and cross-functional delivery leadership.",
      language: "English",
      recruiterTitle: "Leadership / Stakeholder Version",
      targetRole: "Transformation, AI delivery, and stakeholder-heavy shortlist review",
    },
    "operations-transformation": {
      bestUseCase:
        "Operational and transformation screening where concise comparison across candidates matters most.",
      difference:
        "Reframes the same experience around process improvement, service delivery, documentation discipline, and operational change.",
      language: "English",
      recruiterTitle: "Operations / Transformation Version",
      targetRole: "Operations, process improvement, and transformation-focused applications",
    },
  },
  pl: {
    "ai-adoption-manager": {
      bestUseCase:
        "Domyślna wersja do wysyłki w rekrutacjach na stanowiska związane z AI Adoption i wdrażaniem AI.",
      difference:
        "Najmocniej eksponuje przywództwo, wdrożenie, adopcję i komunikację ze stakeholderami.",
      language: "Polski",
      recruiterTitle: "Wersja AI Adoption Manager",
      targetRole: "Role związane z adopcją AI, wdrożeniami i enablementem",
    },
    "ats-friendly-general": {
      bestUseCase:
        "Wersja do zgłoszeń przez ATS, kiedy liczy się prosty układ i wysoka czytelność parsowania.",
      difference:
        "Najprostszy układ i najbardziej uniwersalny język pod analizę, delivery i pracę z platformami.",
      language: "Polski",
      recruiterTitle: "Wersja ogólna pod ATS",
      targetRole: "Role analityczne, delivery i platformowe z naciskiem na ATS",
    },
    "leadership-stakeholder": {
      bestUseCase:
        "Wersja pod rozmowy ze stakeholderami i liderami, kiedy ważne są czytelność, seniority i wpływ na delivery.",
      difference:
        "Mocniej akcentuje alignment, enablement, komunikację ze stakeholderami i prowadzenie współpracy między zespołami.",
      language: "Polski",
      recruiterTitle: "Wersja leadership / stakeholder",
      targetRole: "Role z obszaru transformacji, delivery AI i współpracy ze stakeholderami",
    },
    "operations-transformation": {
      bestUseCase:
        "Wersja do procesów rekrutacyjnych z naciskiem na operacje, usprawnienia i porównanie kandydatów.",
      difference:
        "Pokazuje to samo doświadczenie przez pryzmat usprawnień procesów, service delivery, dokumentacji i zmian operacyjnych.",
      language: "Polski",
      recruiterTitle: "Wersja operations / transformation",
      targetRole: "Role związane z operacjami, usprawnianiem procesów i transformacją",
    },
  },
};

export function getCvVersionContent(
  locale: CvLocale,
  version: CvVersion,
): CvVersionContent {
  return cvVersionContentByLocale[locale][version];
}

export function getCvVersionContentMap(locale: CvLocale) {
  return cvVersionContentByLocale[locale];
}

export function getLocalizedCvVersions(locale: CvLocale) {
  const metadata = getCvVersionContentMap(locale);

  return cvVersions.map((version) => ({
    ...metadata[version],
    version,
  }));
}
