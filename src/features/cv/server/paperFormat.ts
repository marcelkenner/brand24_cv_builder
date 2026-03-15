import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";

type CvPdfPaperFormat = "A4" | "Letter";

export const cvPaperFormats: Readonly<Record<CvPaperVariant, CvPdfPaperFormat>> =
  {
    a4: "A4",
    letter: "Letter",
  };

export function getCvPaperFormat(paper: CvPaperVariant): CvPdfPaperFormat {
  return cvPaperFormats[paper];
}
