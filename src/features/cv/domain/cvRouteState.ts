import {
  resolveCvPaperVariant,
  type CvPaperVariant,
} from "@/features/cv/domain/paperVariant";
import {
  cvVersionMetadata,
  defaultCvVersion,
  resolveCvVersion,
  type CvVersion,
} from "@/features/cv/domain/cvVersion";
import {
  resolveCvTemplateVariant,
  type CvTemplateVariant,
} from "@/features/cv/domain/cvTemplateVariant";

type SearchParamRecord = Readonly<
  Record<string, string | readonly string[] | undefined>
>;

type SearchParamSource = URLSearchParams | SearchParamRecord;

export type CvShowcaseRouteState = {
  readonly paper: CvPaperVariant;
  readonly template: CvTemplateVariant;
  readonly version: CvVersion;
};

export type CvPrintRouteState = {
  readonly template: CvTemplateVariant;
  readonly version: CvVersion;
};

export const defaultCvShowcaseRouteState: CvShowcaseRouteState = {
  paper: "a4",
  template: cvVersionMetadata[defaultCvVersion].defaultTemplate,
  version: defaultCvVersion,
};

export const defaultCvPrintRouteState: CvPrintRouteState = {
  template: cvVersionMetadata[defaultCvVersion].defaultTemplate,
  version: defaultCvVersion,
};

export function resolveCvShowcaseRouteState(
  source: SearchParamSource,
): CvShowcaseRouteState {
  const version = resolveCvVersion(getSingleSearchParamValue(source, "version"));

  return {
    paper: resolveCvPaperVariant(getSingleSearchParamValue(source, "paper")),
    template: resolveCvTemplateVariant(
      getSingleSearchParamValue(source, "template"),
      cvVersionMetadata[version].defaultTemplate,
    ),
    version,
  };
}

export function resolveCvPrintRouteState(
  source: SearchParamSource,
): CvPrintRouteState {
  const version = resolveCvVersion(getSingleSearchParamValue(source, "version"));

  return {
    template: resolveCvTemplateVariant(
      getSingleSearchParamValue(source, "template"),
      cvVersionMetadata[version].defaultTemplate,
    ),
    version,
  };
}

function getSingleSearchParamValue(
  source: SearchParamSource,
  key: string,
): string | readonly string[] | undefined {
  if (source instanceof URLSearchParams) {
    const values = source.getAll(key);

    return values.length === 1 ? values[0] : undefined;
  }

  return source[key];
}
