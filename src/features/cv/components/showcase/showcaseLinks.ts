import { cvPaperMetadata, type CvPaperVariant } from "@/features/cv/domain/paperVariant";
import type { CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import {
  cvVersionMetadata,
  defaultCvVersion,
  type CvVersion,
} from "@/features/cv/domain/cvVersion";

export const cvPaperMetadataEntries = Object.entries(cvPaperMetadata) as readonly [
  CvPaperVariant,
  (typeof cvPaperMetadata)[CvPaperVariant],
][];

export function getShowcaseHref(
  paper: CvPaperVariant,
  version: CvVersion,
  template: CvTemplateVariant,
  hash?: string,
) {
  const params = new URLSearchParams();

  if (paper !== "a4") {
    params.set("paper", paper);
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
  paper: CvPaperVariant,
  version: CvVersion,
  template: CvTemplateVariant,
) {
  const params = new URLSearchParams();

  if (version !== defaultCvVersion) {
    params.set("version", version);
  }

  if (template !== cvVersionMetadata[version].defaultTemplate) {
    params.set("template", template);
  }

  const query = params.toString();

  return query ? `/cv/${paper}?${query}` : `/cv/${paper}`;
}

export function getDownloadHref(
  paper: CvPaperVariant,
  version: CvVersion,
  template: CvTemplateVariant,
) {
  const params = new URLSearchParams({
    paper,
  });

  if (version !== defaultCvVersion) {
    params.set("version", version);
  }

  if (template !== cvVersionMetadata[version].defaultTemplate) {
    params.set("template", template);
  }

  return `/api/cv-pdf?${params.toString()}`;
}
