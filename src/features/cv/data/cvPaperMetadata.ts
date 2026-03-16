import type { CvLocale } from "@/features/cv/domain/cvLocale";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";

type LocalizedCvPaperMetadata = {
  readonly dimensions: string;
  readonly label: string;
};

const localizedCvPaperMetadata: Readonly<
  Record<CvLocale, Record<CvPaperVariant, LocalizedCvPaperMetadata>>
> = {
  en: {
    a4: {
      dimensions: "210 x 297 mm",
      label: "A4 Portrait",
    },
    letter: {
      dimensions: "8.5 x 11 in",
      label: "US Letter Portrait",
    },
  },
  pl: {
    a4: {
      dimensions: "210 x 297 mm",
      label: "A4 pionowo",
    },
    letter: {
      dimensions: "8.5 x 11 in",
      label: "US Letter pionowo",
    },
  },
};

export function getLocalizedCvPaperMetadata(
  locale: CvLocale,
  paper: CvPaperVariant,
) {
  return localizedCvPaperMetadata[locale][paper];
}
