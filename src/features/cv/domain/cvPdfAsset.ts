import {
  cvLocales,
  defaultCvLocale,
  type CvLocale,
} from "@/features/cv/domain/cvLocale";
import { cvPaperVariants, type CvPaperVariant } from "@/features/cv/domain/paperVariant";
import {
  cvTemplateVariants,
  type CvTemplateVariant,
} from "@/features/cv/domain/cvTemplateVariant";
import { cvVersions, type CvVersion } from "@/features/cv/domain/cvVersion";

export type CvPdfAssetTarget = {
  readonly locale: CvLocale;
  readonly paper: CvPaperVariant;
  readonly template: CvTemplateVariant;
  readonly version: CvVersion;
};

const cvPdfAssetBasePath = "/generated/cv-pdf" as const;

export function getCvPdfFilename({
  locale,
  paper,
  template,
  version,
}: CvPdfAssetTarget) {
  const localeSuffix = locale === defaultCvLocale ? "" : `-${locale}`;

  return `cv-${paper}-${version}-${template}${localeSuffix}.pdf`;
}

export function getCvPdfAssetPath(target: CvPdfAssetTarget) {
  return `${cvPdfAssetBasePath}/${getCvPdfFilename(target)}`;
}

export function getStaticCvPdfTargets(): readonly CvPdfAssetTarget[] {
  return cvLocales.flatMap((locale) =>
    cvPaperVariants.flatMap((paper) =>
      cvVersions.flatMap((version) =>
        cvTemplateVariants.map((template) => ({
          locale,
          paper,
          template,
          version,
        })),
      ),
    ),
  );
}
