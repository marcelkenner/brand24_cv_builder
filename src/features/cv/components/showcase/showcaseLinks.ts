import {
  defaultCvLocale,
  type CvLocale,
} from "@/features/cv/domain/cvLocale";
import { getCvPdfAssetPath } from "@/features/cv/domain/cvPdfAsset";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";
import type { CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import {
  cvVersionMetadata,
  defaultCvVersion,
  type CvVersion,
} from "@/features/cv/domain/cvVersion";

export function getShowcaseHref(
  locale: CvLocale,
  paper: CvPaperVariant,
  version: CvVersion,
  template: CvTemplateVariant,
  hash?: string,
) {
  const params = new URLSearchParams();

  if (paper !== "a4") {
    params.set("paper", paper);
  }

  if (locale !== defaultCvLocale) {
    params.set("lang", locale);
  }

  if (version !== defaultCvVersion) {
    params.set("version", version);
  }

  if (template !== cvVersionMetadata[version].defaultTemplate) {
    params.set("template", template);
  }

  const query = params.toString();
  const path = query ? `/?${query}` : "/";

  return hash ? `${path}#${hash}` : path;
}

export function getPrintHref(
  locale: CvLocale,
  paper: CvPaperVariant,
  version: CvVersion,
  template: CvTemplateVariant,
) {
  const params = new URLSearchParams();

  if (version !== defaultCvVersion) {
    params.set("version", version);
  }

  if (locale !== defaultCvLocale) {
    params.set("lang", locale);
  }

  if (template !== cvVersionMetadata[version].defaultTemplate) {
    params.set("template", template);
  }

  const query = params.toString();

  return query ? `/cv/${paper}?${query}` : `/cv/${paper}`;
}

export function getDownloadHref(
  locale: CvLocale,
  paper: CvPaperVariant,
  version: CvVersion,
  template: CvTemplateVariant,
) {
  return getCvPdfAssetPath({
    locale,
    paper,
    template,
    version,
  });
}
