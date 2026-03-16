import type { CvDocument } from "@/features/cv/domain/cvDocument";
import {
  defaultCvLocale,
  type CvLocale,
} from "@/features/cv/domain/cvLocale";
import type { CvVersion } from "@/features/cv/domain/cvVersion";

import { cvDocumentsByVersionEn } from "./cvVersions.en";
import { cvDocumentsByVersionPl } from "./cvVersions.pl";

const cvDocumentsByLocale = {
  en: cvDocumentsByVersionEn,
  pl: cvDocumentsByVersionPl,
} as const satisfies Record<CvLocale, Record<CvVersion, CvDocument>>;

export function getCvDocument(
  version: CvVersion,
  locale: CvLocale = defaultCvLocale,
): CvDocument {
  return cvDocumentsByLocale[locale][version];
}
