import { cvPaperVariants, type CvPaperVariant } from "@/features/cv/domain/paperVariant";
import {
  cvTemplateVariants,
  type CvTemplateVariant,
} from "@/features/cv/domain/cvTemplateVariant";
import { cvVersions, type CvVersion } from "@/features/cv/domain/cvVersion";

export type CvPdfAssetTarget = {
  readonly paper: CvPaperVariant;
  readonly template: CvTemplateVariant;
  readonly version: CvVersion;
};

const cvPdfAssetBasePath = "/generated/cv-pdf" as const;

export function getCvPdfFilename({
  paper,
  template,
  version,
}: CvPdfAssetTarget) {
  return `cv-${paper}-${version}-${template}.pdf`;
}

export function getCvPdfAssetPath(target: CvPdfAssetTarget) {
  return `${cvPdfAssetBasePath}/${getCvPdfFilename(target)}`;
}

export function getStaticCvPdfTargets(): readonly CvPdfAssetTarget[] {
  return cvPaperVariants.flatMap((paper) =>
    cvVersions.flatMap((version) =>
      cvTemplateVariants.map((template) => ({
        paper,
        template,
        version,
      })),
    ),
  );
}
